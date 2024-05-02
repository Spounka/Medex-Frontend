import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Link, useNavigate, useParams } from "react-router-dom";
import useAxios from "../../utils/useAxios";

import { GetState, GetCity, GetCountries } from "react-country-state-city";

import userImage from "../../assets/images/user.png";

import {
    MdOutlineEmail,
    MdOutlineLocalShipping,
    MdProductionQuantityLimits,
    MdOutlinePriceCheck,
} from "react-icons/md";
import {
    FaPhoneAlt,
    FaRegCalendarCheck,
    FaRegFlag,
    FaImage,
    FaPhotoVideo,
} from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
import { IoCheckmarkDone } from "react-icons/io5";
import { GiCancel } from "react-icons/gi";
import { toast } from "react-toastify";

const ReturnDetails = () => {
    const { t } = useTranslation();

    const [request, setRequest] = useState({});
    const [country, setCountry] = useState("");
    const [state, setState] = useState("");
    const [city, setCity] = useState("");
    const [reason, setReason] = useState("");

    const params = useParams();

    const navigate = useNavigate();

    const requestID = params?.id;

    const api = useAxios();

    const getRequest = async () => {
        try {
            const response = await api.get(
                `${import.meta.env.VITE_BACKEND_URL}/api/order/return/${requestID}/`,
            );
            setRequest(response.data);

            GetCountries()
                .then((res) => {
                    let c = res.find(
                        (x) =>
                            x.id ==
                            parseInt(response.data?.user?.shipping_address?.country),
                    );
                    setCountry(c?.name);
                })
                .then(() => {
                    return GetState(
                        parseInt(response.data?.user?.shipping_address?.country),
                    ).then((res) => {
                        if (res.length > 0) {
                            let s = res.find(
                                (x) =>
                                    x.id ==
                                    parseInt(
                                        response.data?.user?.shipping_address?.state,
                                    ),
                            );
                            setState(s?.name);
                        }
                    });
                })
                .then(() => {
                    return GetCity(
                        parseInt(response.data?.user?.shipping_address?.country),
                        parseInt(response.data?.user?.shipping_address?.state),
                    ).then((res) => {
                        if (res.length > 0) {
                            let c = res.find(
                                (x) =>
                                    x.id ==
                                    parseInt(response.data?.user?.shipping_address?.city),
                            );
                            setCity(c?.name);
                        }
                    });
                });
        } catch (err) {
            navigate("/not-found/");
        }
    };

    useEffect(() => {
        getRequest();
    }, []);

    const handleApprove = async (e) => {
        e.preventDefault();

        await api
            .post(
                import.meta.env.VITE_BACKEND_URL +
                    `/api/order/return/${requestID}/approve/`,
            )
            .then(() => {
                setRequest((prevState) => ({
                    ...prevState,
                    status: "APR",
                }));

                toast.success(t("supplier_pages.return_request.approve_success"));
            });
    };

    const handleDecline = async (e) => {
        e.preventDefault();
        await api
            .post(
                import.meta.env.VITE_BACKEND_URL +
                    `/api/order/return/${requestID}/decline/`,
                {
                    reason: reason,
                },
            )
            .then(() => {
                let closeBtn = document.querySelector("#closeBtn");

                closeBtn.click();

                setRequest((prevRequest) => ({
                    ...prevRequest,
                    status: "DEC",
                }));

                toast.success(t("supplier_pages.return_request.decline_success"));
            });
    };

    return (
        <main className="px-0 px-md-3">
            <section>
                <div className="container">
                    <div className="row row-flex">
                        <div className="col-12 col-md-6">
                            <div className="card h-100">
                                <div className="card-body">
                                    <div className="d-flex gap-3 align-items-center">
                                        <img
                                            src={
                                                request?.user?.profile?.profile_picture
                                                    ? import.meta.env.VITE_BACKEND_URL +
                                                      request?.user?.profile
                                                          ?.profile_picture
                                                    : userImage
                                            }
                                            alt="Picture"
                                            id="userProfilePicture"
                                            className="rounded-circle shadow border-2 object-fit-cover"
                                            width={80}
                                            height={80}
                                        />
                                        <span>{request?.user?.full_name}</span>
                                    </div>
                                    <div className="mt-4">
                                        <p className="d-flex align-items-center gap-2">
                                            <MdOutlineEmail size="1.2rem" />
                                            {request?.user?.email}
                                        </p>
                                        <p className="d-flex align-items-center gap-2">
                                            <FaPhoneAlt size="1rem" />+
                                            {request?.user?.phone}
                                        </p>
                                        <p className="d-flex align-items-center gap-2">
                                            <FaRegFlag size="1.1rem" />
                                            {country} {state && `, ${state}`}{" "}
                                            {city && `, ${city}`}{" "}
                                            {request?.user?.shipping_address?.postal_code}
                                        </p>
                                        <span className="d-flex align-items-center gap-2">
                                            <FaLocationDot size="1.1rem" />
                                            {request?.user?.shipping_address?.address_1}
                                            {request?.user?.shipping_address
                                                ?.address_2 !== "" &&
                                                `, ${request?.user?.shipping_address?.address_2}`}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-12 col-md-6">
                            <div className="card">
                                <div className="card-body">
                                    <div className="d-flex gap-3 align-items-center">
                                        <img
                                            src={
                                                request?.product?.product?.thumbnail.startsWith(
                                                    import.meta.env.VITE_BACKEND_URL,
                                                )
                                                    ? request?.product?.product?.thumbnail
                                                    : import.meta.env.VITE_BACKEND_URL +
                                                      request?.product?.product?.thumbnail
                                            }
                                            alt="Picture"
                                            id="Product Picture"
                                            className="rounded-circle shadow border-2 object-fit-cover"
                                            width={80}
                                            height={80}
                                        />
                                        <Link
                                            to={`/supplier/products/${request?.product?.product?.sku}`}
                                        >
                                            {request?.product?.product?.name}
                                        </Link>
                                    </div>
                                    <div className="mt-4">
                                        <p className="d-flex align-items-center gap-2">
                                            <FaRegCalendarCheck size="1rem" />
                                            <b>
                                                {t(
                                                    "supplier_pages.order_details.ordered",
                                                )}
                                            </b>
                                            <span>{request?.product?.created_date}</span>
                                        </p>
                                        <div className="d-flex align-items-center gap-2">
                                            <MdOutlineLocalShipping size="1.2rem" />
                                            <b>
                                                {t("supplier_pages.order_details.status")}
                                            </b>
                                            <span>
                                                {request?.product?.shipping_status ==
                                                    "DE" &&
                                                    t("supplier_pages.order_details.de")}
                                                {request?.product?.shipping_status ==
                                                    "OTW" &&
                                                    t("supplier_pages.order_details.otw")}
                                                {request?.product?.shipping_status ==
                                                    "P" &&
                                                    t("supplier_pages.order_details.p")}
                                                {request?.product?.shipping_status ==
                                                    "OR" &&
                                                    t("supplier_pages.order_details.or")}
                                            </span>
                                        </div>
                                        <div className="mt-3 d-flex align-items-center gap-2">
                                            <MdProductionQuantityLimits size="1.2rem" />
                                            <b>{t("buyer_pages.cart.qty")}</b>
                                            <span>{request?.product?.quantity}</span>
                                        </div>
                                        <div className="mt-3 d-flex align-items-center gap-2">
                                            <MdOutlinePriceCheck size="1.3rem" />
                                            <b>
                                                {t("supplier_pages.quote_list.price_tot")}
                                            </b>
                                            <span>
                                                {request?.product?.final_price} {t("sar")}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row mt-1">
                        <div className="col-12">
                            <div className="card">
                                <div className="card-body">
                                    <h5>{t("buyer_pages.return_request.reason")}</h5>
                                    <p>
                                        {request?.reason == "POO" &&
                                            t("buyer_pages.return_request.poor")}

                                        {request?.reason == "WRO" &&
                                            t("buyer_pages.return_request.wrong")}

                                        {request?.reason == "ADD" &&
                                            t("buyer_pages.return_request.address")}
                                    </p>
                                    <h5 className="mt-3">
                                        {t("buyer_pages.return_request.description")}
                                    </h5>
                                    <p>{request?.description}</p>
                                    <h5 className="mt-3">
                                        {t("buyer_pages.return_request.evidence")}
                                    </h5>

                                    <div className="d-flex align-items-center gap-3">
                                        {request?.evidence_files?.map((file, index) => (
                                            <Link
                                                key={index}
                                                to={
                                                    import.meta.env.VITE_BACKEND_URL +
                                                    file.evidence_file
                                                }
                                                target="_blank"
                                            >
                                                <span className="badge border border-primary text-dark d-flex align-items-center gap-2">
                                                    {file.evidence_file
                                                        .toLowerCase()
                                                        .endsWith("mp4") ||
                                                    file.evidence_file
                                                        .toLowerCase()
                                                        .endsWith("wav") ||
                                                    file.evidence_file
                                                        .toLowerCase()
                                                        .endsWith("avi") ? (
                                                        <FaPhotoVideo size="1.5rem" />
                                                    ) : file.evidence_file
                                                          .toLowerCase()
                                                          .endsWith("jpg") ||
                                                      file.evidence_file
                                                          .toLowerCase()
                                                          .endsWith("jpeg") ||
                                                      file.evidence_file
                                                          .toLowerCase()
                                                          .endsWith("png") ? (
                                                        <FaImage size="1.5rem" />
                                                    ) : (
                                                        ""
                                                    )}
                                                    <span>{index + 1}</span>
                                                </span>
                                            </Link>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row my-4">
                        <div className="col-12">
                            <div className="card">
                                {request?.status == "AP" && (
                                    <div className="card-body d-flex justify-content-center gap-5">
                                        <form
                                            method="post"
                                            onSubmit={handleApprove}
                                        >
                                            <button
                                                type="submit"
                                                className="btn btn-outline-success d-flex align-items-center gap-2"
                                            >
                                                <IoCheckmarkDone size="1.3rem" />
                                                <span>
                                                    {t(
                                                        "supplier_pages.return_request.approve",
                                                    )}
                                                </span>
                                            </button>
                                        </form>
                                        <button
                                            type="button"
                                            className="btn btn-outline-danger d-flex align-items-center gap-2"
                                            data-bs-toggle="modal"
                                            data-bs-target="#declineModal"
                                        >
                                            <GiCancel size="1.2rem" />
                                            <span>
                                                {t(
                                                    "supplier_pages.return_request.decline",
                                                )}
                                            </span>
                                        </button>

                                        <div
                                            className="modal fade"
                                            id="declineModal"
                                            tabIndex="-1"
                                            aria-labelledby="declineModalLabel"
                                            aria-hidden="true"
                                        >
                                            <div className="modal-dialog modal-dialog-centered">
                                                <div className="modal-content">
                                                    <form
                                                        method="post"
                                                        onSubmit={handleDecline}
                                                    >
                                                        <div className="modal-body">
                                                            <div className="form-floating">
                                                                <textarea
                                                                    className="form-control"
                                                                    placeholder={t(
                                                                        "supplier_pages.return_request.reason_placeholder",
                                                                    )}
                                                                    id="floatingTextarea2"
                                                                    style={{
                                                                        height: "250px",
                                                                    }}
                                                                    value={reason}
                                                                    onChange={(e) =>
                                                                        setReason(
                                                                            e.target
                                                                                .value,
                                                                        )
                                                                    }
                                                                    required
                                                                ></textarea>
                                                                <label htmlFor="floatingTextarea2">
                                                                    {t(
                                                                        "supplier_pages.return_request.reason",
                                                                    )}
                                                                </label>
                                                            </div>
                                                        </div>
                                                        <div className="modal-footer">
                                                            <button
                                                                type="button"
                                                                className="btn btn-outline-primary"
                                                                data-bs-dismiss="modal"
                                                                id="closeBtn"
                                                            >
                                                                {t(
                                                                    "buyer_pages.profile.cancel",
                                                                )}
                                                            </button>
                                                            <button
                                                                type="submit"
                                                                className="btn btn-danger"
                                                            >
                                                                {t(
                                                                    "supplier_pages.return_request.decline",
                                                                )}
                                                            </button>
                                                        </div>
                                                    </form>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )}
                                {request?.status == "DEC" && (
                                    <div className="card-body text-center">
                                        <h4>
                                            {t("supplier_pages.return_request.status")}
                                        </h4>
                                        <p className="mt-3">
                                            {t(
                                                "supplier_pages.return_request.decline_msg",
                                            )}
                                        </p>
                                    </div>
                                )}

                                {request?.status == "APR" && (
                                    <div className="card-body text-center">
                                        <h4>
                                            {t("supplier_pages.return_request.status")}
                                        </h4>
                                        <p className="mt-3">
                                            {t(
                                                "supplier_pages.return_request.approve_msg",
                                            )}
                                        </p>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
};

export default ReturnDetails;
