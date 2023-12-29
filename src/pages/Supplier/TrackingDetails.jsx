import { useState, useEffect } from "react";

import { useLocation, useParams, useNavigate } from "react-router-dom";

import useAxios from "../../utils/useAxios";
import { useTranslation } from "react-i18next";

import { GetState, GetCity, GetCountries } from "react-country-state-city";

import { IoTicketOutline } from "react-icons/io5";
import {
    MdOutlineCalendarMonth,
    MdProductionQuantityLimits,
    MdOutlinePriceCheck,
    MdOutlineNextPlan,
} from "react-icons/md";
import { TbListDetails } from "react-icons/tb";
import { BsTruck } from "react-icons/bs";

import { toast } from "react-toastify";

const TrackingDetails = () => {
    const { t } = useTranslation();

    const location = useLocation();
    const params = useParams();
    const navigate = useNavigate();

    const [country, setCountry] = useState("");
    const [state, setState] = useState("");
    const [city, setCity] = useState("");

    const api = useAxios();

    const [order, setOrder] = useState({});

    const getOrder = async () => {
        let orderState = location?.state?.order;

        if (orderState) {
            setOrder(location?.state?.order);

            GetCountries()
                .then((res) => {
                    let c = res.find(
                        (x) =>
                            x.id ==
                            parseInt(
                                location?.state?.order?.user?.shipping_address
                                    ?.country
                            )
                    );
                    setCountry(c?.name);
                })
                .then(() => {
                    return GetState(
                        parseInt(
                            location?.state?.order?.user?.shipping_address
                                ?.country
                        )
                    ).then((res) => {
                        if (res.length > 0) {
                            let s = res.find(
                                (x) =>
                                    x.id ==
                                    parseInt(
                                        location?.state?.order?.user
                                            ?.shipping_address?.state
                                    )
                            );
                            setState(s?.name);
                        }
                    });
                })
                .then(() => {
                    return GetCity(
                        parseInt(
                            location?.state?.order?.user?.shipping_address
                                ?.country
                        ),
                        parseInt(
                            location?.state?.order?.user?.shipping_address
                                ?.state
                        )
                    ).then((res) => {
                        if (res.length > 0) {
                            let c = res.find(
                                (x) =>
                                    x.id ==
                                    parseInt(
                                        location?.state?.order?.user
                                            ?.shipping_address?.city
                                    )
                            );
                            setCity(c?.name);
                        }
                    });
                });
        } else {
            const orderID = params?.id;

            try {
                const response = await api.get(
                    `${import.meta.env.VITE_BACKEND_URL}/api/order/${orderID}/`
                );
                setOrder(response.data);

                GetCountries()
                    .then((res) => {
                        let c = res.find(
                            (x) =>
                                x.id ==
                                parseInt(
                                    response.data?.user?.shipping_address
                                        ?.country
                                )
                        );
                        setCountry(c?.name);
                    })
                    .then(() => {
                        return GetState(
                            parseInt(
                                response.data?.user?.shipping_address?.country
                            )
                        ).then((res) => {
                            if (res.length > 0) {
                                let s = res.find(
                                    (x) =>
                                        x.id ==
                                        parseInt(
                                            response.data?.user
                                                ?.shipping_address?.state
                                        )
                                );
                                setState(s?.name);
                            }
                        });
                    })
                    .then(() => {
                        return GetCity(
                            parseInt(
                                response.data?.user?.shipping_address?.country
                            ),
                            parseInt(
                                response.data?.user?.shipping_address?.state
                            )
                        ).then((res) => {
                            if (res.length > 0) {
                                let c = res.find(
                                    (x) =>
                                        x.id ==
                                        parseInt(
                                            response.data?.user
                                                ?.shipping_address?.city
                                        )
                                );
                                setCity(c?.name);
                            }
                        });
                    });
            } catch (err) {
                navigate("/not-found/");
            }
        }
    };

    const handleAdvance = async (id) => {
        await api
            .post(import.meta.env.VITE_BACKEND_URL + "/api/order/advance/", {
                id: id,
            })
            .then(async () => {
                toast.success(`${t("supplier_pages.order_details.success")}!`);
                await api
                    .get(`${import.meta.env.VITE_BACKEND_URL}/api/order/${id}/`)
                    .then((res) => {
                        setOrder(res.data);
                    });
            });
    };

    useEffect(() => {
        getOrder();
    }, []);

    return (
        <main className="px-0 px-md-3">
            <section>
                <h2 className="fw-bold d-flex align-items-center gap-2 dashboard__title mb-4">
                    <TbListDetails size="2.3rem" />
                    {t("supplier_pages.order_details.title")}
                </h2>
                <div className="row row-flex">
                    <div className="col-12">
                        <div className="card shadow content">
                            <div className="card-body">
                                <h4 className="detail__title m-0 py-2">
                                    {order?.product?.name}
                                </h4>
                                <p className="mt-3 text-xs d-flex align-items-center gap-2">
                                    <IoTicketOutline size="1.3rem" />
                                    SKU: {order?.product?.sku}
                                </p>
                                <p className="text-xs d-flex align-items-center gap-2">
                                    <MdOutlineCalendarMonth size="1.3rem" />
                                    {t(
                                        "supplier_pages.order_details.ordered"
                                    )}: {order?.created_date}
                                </p>

                                <p className="text-xs d-flex align-items-center gap-2">
                                    <MdProductionQuantityLimits size="1.3rem" />
                                    {t("buyer_pages.cart.qty")}:{" "}
                                    {order?.quantity}
                                </p>

                                <h6 className="text-xs d-flex align-items-center gap-2">
                                    <MdOutlinePriceCheck size="1.3rem" />
                                    {t(
                                        "supplier_pages.quote_list.price_tot"
                                    )}{" "}
                                    {order?.final_price} {t("sar")}
                                </h6>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section>
                <div className="row my-5">
                    <div className="col-12">
                        <h2 className="fw-bold d-flex align-items-center gap-2 dashboard__title mb-4">
                            <BsTruck size="2.3rem" />
                            {t("supplier_pages.order_details.status")}
                        </h2>
                        <div className="card shadow">
                            <div className="card-body">
                                <div className="container">
                                    <div className="row py-5 px-md-4">
                                        <div className="col-12">
                                            <div className="step-indicator">
                                                <div className="step step1 active">
                                                    <div className="step-icon">
                                                        1
                                                    </div>
                                                    <p>
                                                        {t(
                                                            "supplier_pages.order_details.or"
                                                        )}
                                                    </p>
                                                </div>
                                                <div
                                                    className={`indicator-line ${
                                                        order?.shipping_status ===
                                                            "P" ||
                                                        order?.shipping_status ===
                                                            "OTW" ||
                                                        order?.shipping_status ===
                                                            "DE"
                                                            ? "active"
                                                            : ""
                                                    }`}
                                                ></div>
                                                <div
                                                    className={`step step2 ${
                                                        order?.shipping_status ===
                                                            "P" ||
                                                        order?.shipping_status ===
                                                            "OTW" ||
                                                        order?.shipping_status ===
                                                            "DE"
                                                            ? "active"
                                                            : ""
                                                    }`}
                                                >
                                                    <div className="step-icon">
                                                        2
                                                    </div>
                                                    <p className="stepper__text-2">
                                                        {t(
                                                            "supplier_pages.order_details.p"
                                                        )}
                                                    </p>
                                                </div>
                                                <div
                                                    className={`indicator-line ${
                                                        order?.shipping_status ===
                                                            "OTW" ||
                                                        order?.shipping_status ===
                                                            "DE"
                                                            ? "active"
                                                            : ""
                                                    }`}
                                                ></div>
                                                <div
                                                    className={`step step3 ${
                                                        order?.shipping_status ===
                                                            "OTW" ||
                                                        order?.shipping_status ===
                                                            "DE"
                                                            ? "active"
                                                            : ""
                                                    }`}
                                                >
                                                    <div className="step-icon">
                                                        3
                                                    </div>
                                                    <p>
                                                        {t(
                                                            "supplier_pages.order_details.otw"
                                                        )}
                                                    </p>
                                                </div>
                                                <div
                                                    className={`indicator-line ${
                                                        order?.shipping_status ==
                                                            "DE" && "active"
                                                    }`}
                                                ></div>
                                                <div
                                                    className={`step step4 ${
                                                        order?.shipping_status ==
                                                            "DE" && "active"
                                                    }`}
                                                >
                                                    <div className="step-icon">
                                                        4
                                                    </div>
                                                    <p>
                                                        {t(
                                                            "supplier_pages.order_details.de"
                                                        )}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="card-footer py-3">
                                <div className="d-flex justify-content-center align-items-center">
                                    <button
                                        className="btn btn-primary d-flex align-items-center gap-2"
                                        onClick={() => handleAdvance(order?.id)}
                                    >
                                        <MdOutlineNextPlan size="1.3rem" />
                                        {t("supplier_pages.order_details.next")}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
};

export default TrackingDetails;
