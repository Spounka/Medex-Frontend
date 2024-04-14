import { useTranslation } from "react-i18next";

import useAxios from "../../utils/useAxios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { TbTruckReturn } from "react-icons/tb";
import { FaExclamationTriangle } from "react-icons/fa";

import userImage from "../../assets/images/user.png";

const ReturnRequests = () => {
    const { t } = useTranslation();

    const [returnRequests, setReturnRequests] = useState({});

    const api = useAxios();

    const getReturnRequests = async () => {
        await api
            .get(import.meta.env.VITE_BACKEND_URL + "/api/order/return/list/")
            .then((res) => {
                setReturnRequests(res.data);
                console.log(res.data);
            });
    };

    useEffect(() => {
        getReturnRequests();
    }, []);

    return (
        <main className="container">
            <section className="py-3">
                <h2 className="fw-bold d-flex align-items-center gap-2 dashboard__title">
                    <TbTruckReturn size="2.5rem" />
                    {t("buyer_sidebar.return")}
                </h2>
                <div className="row">
                    {returnRequests.length > 0 ? (
                        returnRequests.map((request) => {
                            return (
                                <div
                                    className="col-12 mt-4"
                                    key={request.id}
                                >
                                    <div
                                        style={{ cursor: "pointer" }}
                                        data-bs-toggle="modal"
                                        data-bs-target={`#returnOrderModal-${request.id}`}
                                    >
                                        <div className="card p-3 shadow">
                                            <div className="d-flex align-items-center justify-content-between">
                                                <div className="d-flex align-items-center gap-4">
                                                    <img
                                                        src={
                                                            request?.product?.product
                                                                ?.thumbnail
                                                        }
                                                        alt="Product"
                                                        className=" rounded-circle border"
                                                        width={60}
                                                        height={60}
                                                    />

                                                    <div className="d-flex flex-column gap-2">
                                                        <h4 className="m-0">
                                                            {
                                                                request?.product?.product
                                                                    ?.name
                                                            }
                                                        </h4>
                                                        <div className="d-flex align-items-center gap-1 gap-md-5">
                                                            <span>
                                                                {t(
                                                                    "buyer_pages.cart.qty",
                                                                )}
                                                                :{" "}
                                                                {
                                                                    request?.product
                                                                        ?.quantity
                                                                }
                                                            </span>
                                                            <span>
                                                                {t(
                                                                    "buyer_pages.cart.total",
                                                                )}
                                                                :{" "}
                                                                {
                                                                    request?.product
                                                                        ?.final_price
                                                                }{" "}
                                                                {t("sar")}
                                                            </span>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="badge bg-primary p-2 fw-bold d-flex align-items-center gap-1">
                                                    {request?.created_date}
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div
                                        className="modal fade"
                                        id={`returnOrderModal-${request.id}`}
                                        tabIndex="-1"
                                        aria-labelledby={`returnOrderModal-${request.id}`}
                                        aria-hidden="true"
                                    >
                                        <div className="modal-dialog modal-xl modal-dialog-scrollable modal-dialog-centered">
                                            <div className="modal-content px-5 py-5">
                                                <div className="modal-body px-5 pt-4">
                                                    <div className="step-indicator mb-5">
                                                        <div className="step step1 active">
                                                            <div className="step-icon">
                                                                1
                                                            </div>
                                                            <p>
                                                                {t(
                                                                    "buyer_pages.order_history.applied",
                                                                )}
                                                            </p>
                                                        </div>

                                                        {request?.status !== "DEC" ? (
                                                            <>
                                                                <div
                                                                    className={`indicator-line ${
                                                                        request?.status ===
                                                                            "APR" ||
                                                                        request?.status ===
                                                                            "OTW" ||
                                                                        request?.status ===
                                                                            "CMP"
                                                                            ? "active"
                                                                            : ""
                                                                    }`}
                                                                ></div>
                                                                <div
                                                                    className={`step step2 ${
                                                                        request?.status ===
                                                                            "APR" ||
                                                                        request?.status ===
                                                                            "OTW" ||
                                                                        request?.status ===
                                                                            "CMP"
                                                                            ? "active"
                                                                            : ""
                                                                    }`}
                                                                >
                                                                    <div className="step-icon">
                                                                        2
                                                                    </div>
                                                                    <p className="stepper__text-2">
                                                                        {t(
                                                                            "buyer_pages.order_history.approved",
                                                                        )}
                                                                    </p>
                                                                </div>
                                                            </>
                                                        ) : (
                                                            <>
                                                                <div
                                                                    className={`indicator-line ${
                                                                        request?.status ===
                                                                        "DEC"
                                                                            ? "bg-danger"
                                                                            : ""
                                                                    }`}
                                                                ></div>
                                                                <div className="step step2">
                                                                    <div
                                                                        className={`step-icon ${
                                                                            request?.status ===
                                                                            "DEC"
                                                                                ? "bg-danger"
                                                                                : ""
                                                                        }`}
                                                                    >
                                                                        2
                                                                    </div>
                                                                    <p className="stepper__text-2 text-danger">
                                                                        {t(
                                                                            "buyer_pages.order_history.declined",
                                                                        )}
                                                                    </p>
                                                                </div>
                                                            </>
                                                        )}
                                                    </div>
                                                </div>
                                                {request?.status === "DEC" && (
                                                    <div className="modal-footer align-items-start flex-column">
                                                        <h6 className="d-flex gap-2 align-items-center">
                                                            <FaExclamationTriangle />
                                                            {t(
                                                                "buyer_pages.order_history.decline_reason",
                                                            )}
                                                        </h6>
                                                        <p>{request?.decline_reason}</p>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            );
                        })
                    ) : (
                        <p className="mt-3 text-center">
                            {t("supplier_pages.return_list.none")}!
                        </p>
                    )}
                </div>
            </section>
        </main>
    );
};

export default ReturnRequests;
