import { useState, useEffect } from "react";

import useAxios from "../../utils/useAxios";

import { MdListAlt, MdOutlineCalendarMonth, MdAccessTime } from "react-icons/md";
import { BsTruck } from "react-icons/bs";
import { GiReturnArrow } from "react-icons/gi";
import { FaExclamationTriangle } from "react-icons/fa";

import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

const OrderHistory = () => {
    const { t } = useTranslation();

    const [orderItems, setOrderItems] = useState([]);
    const [totalPages, setTotalPages] = useState(1);
    const [currentPage, setCurrentPage] = useState(1);

    const api = useAxios();

    const getOrderItems = async () => {
        await api
            .get(
                import.meta.env.VITE_BACKEND_URL +
                    `/api/order/orders/?p=${currentPage}&l=20`,
            )
            .then((res) => {
                setOrderItems(res.data.results.results);
                setTotalPages(Math.ceil(res.data.count / 20));
            });
    };

    useEffect(() => {
        getOrderItems();
    }, [currentPage]);

    return (
        <main className="container">
            <section className="py-3">
                <h2 className="fw-bold d-flex align-items-center gap-2 dashboard__title">
                    <MdListAlt size="2.5rem" />
                    {t("buyer_sidebar.order_history")}
                </h2>

                {orderItems.length > 0 ? (
                    <>
                        {orderItems.map((order) => {
                            return (
                                <div
                                    className="card mt-4"
                                    key={order.id}
                                >
                                    <div className="card-body">
                                        <div className="d-flex align-items-center justify-content-between">
                                            <div className="d-flex align-items-center gap-2 gap-md-5">
                                                <div>
                                                    <img
                                                        src={order.product.thumbnail}
                                                        className="object-fit-cover img-fluid order__history-img"
                                                        alt="Product Image"
                                                    />
                                                </div>
                                                <div>
                                                    <div className="card-title d-flex gap-1 gap-md-3">
                                                        <Link
                                                            className="h5 order__history-product-title"
                                                            to={`/products/${order.product.sku}`}
                                                            state={{
                                                                product: order.product,
                                                            }}
                                                        >
                                                            {order.product.name}
                                                        </Link>
                                                        <small className="text-muted pt-0 pt-md-1">
                                                            x {order.quantity}
                                                        </small>
                                                    </div>
                                                    <div className="d-flex align-items-center card-text gap-1 gap-md-4">
                                                        <small className="d-flex align-items-center gap-1 order__history-product-text">
                                                            <MdOutlineCalendarMonth size="1.1rem" />
                                                            {order.created_date}
                                                        </small>
                                                        <small className="d-flex align-items-center gap-1 order__history-product-text">
                                                            <MdAccessTime size="1.1rem" />
                                                            {order.created_time.substring(
                                                                0,
                                                                5,
                                                            )}
                                                        </small>
                                                    </div>

                                                    <div className="d-flex align-items-center gap-4">
                                                        <button
                                                            type="button"
                                                            className="btn btn-primary btn-sm mt-3 d-flex align-items-center gap-2"
                                                            data-bs-toggle="modal"
                                                            data-bs-target={`#orderModal-${order.id}`}
                                                        >
                                                            <BsTruck size="1.2rem" />
                                                            {t(
                                                                "supplier_pages.order_details.status",
                                                            )}
                                                        </button>

                                                        {order.is_return_requested ? (
                                                            <button
                                                                type="button"
                                                                className="btn btn-outline-primary btn-sm mt-3 d-flex align-items-center gap-2"
                                                                data-bs-toggle="modal"
                                                                data-bs-target={`#returnOrderModal-${order.id}`}
                                                            >
                                                                <GiReturnArrow size="1.2rem" />
                                                                {t(
                                                                    "buyer_pages.order_history.return_status",
                                                                )}
                                                            </button>
                                                        ) : (
                                                            order.is_returnable && (
                                                                <Link
                                                                    to={`/account/dashboard/return/${order.id}`}
                                                                    className="btn btn-outline-primary btn-sm mt-3 d-flex align-items-center gap-2"
                                                                >
                                                                    <GiReturnArrow size="1.2rem" />
                                                                    {t(
                                                                        "buyer_pages.order_history.return",
                                                                    )}
                                                                </Link>
                                                            )
                                                        )}
                                                    </div>

                                                    <div
                                                        className="modal fade"
                                                        id={`orderModal-${order.id}`}
                                                        tabIndex="-1"
                                                        aria-labelledby={`orderModal-${order.id}`}
                                                        aria-hidden="true"
                                                    >
                                                        <div className="modal-dialog modal-xl modal-dialog-scrollable modal-dialog-centered">
                                                            <div className="modal-content">
                                                                <div className="modal-body px-5 pt-4">
                                                                    <div className="step-indicator mb-5">
                                                                        <div className="step step1 active">
                                                                            <div className="step-icon">
                                                                                1
                                                                            </div>
                                                                            <p>
                                                                                {t(
                                                                                    "supplier_pages.order_details.or",
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
                                                                                    "supplier_pages.order_details.p",
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
                                                                                    "supplier_pages.order_details.otw",
                                                                                )}
                                                                            </p>
                                                                        </div>
                                                                        <div
                                                                            className={`indicator-line ${
                                                                                order?.shipping_status ==
                                                                                    "DE" &&
                                                                                "active"
                                                                            }`}
                                                                        ></div>
                                                                        <div
                                                                            className={`step step4 ${
                                                                                order?.shipping_status ==
                                                                                    "DE" &&
                                                                                "active"
                                                                            }`}
                                                                        >
                                                                            <div className="step-icon">
                                                                                4
                                                                            </div>
                                                                            <p>
                                                                                {t(
                                                                                    "supplier_pages.order_details.de",
                                                                                )}
                                                                            </p>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <div
                                                        className="modal fade"
                                                        id={`returnOrderModal-${order.id}`}
                                                        tabIndex="-1"
                                                        aria-labelledby={`returnOrderModal-${order.id}`}
                                                        aria-hidden="true"
                                                    >
                                                        <div className="modal-dialog modal-xl modal-dialog-scrollable modal-dialog-centered">
                                                            <div className="modal-content">
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

                                                                        {order?.status !==
                                                                        "DEC" ? (
                                                                            <>
                                                                                <div
                                                                                    className={`indicator-line ${
                                                                                        order?.status ===
                                                                                            "APR" ||
                                                                                        order?.status ===
                                                                                            "OTW" ||
                                                                                        order?.status ===
                                                                                            "CMP"
                                                                                            ? "active"
                                                                                            : ""
                                                                                    }`}
                                                                                ></div>
                                                                                <div
                                                                                    className={`step step2 ${
                                                                                        order?.status ===
                                                                                            "APR" ||
                                                                                        order?.status ===
                                                                                            "OTW" ||
                                                                                        order?.status ===
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
                                                                                        order?.status ===
                                                                                        "DEC"
                                                                                            ? "bg-danger"
                                                                                            : ""
                                                                                    }`}
                                                                                ></div>
                                                                                <div className="step step2">
                                                                                    <div
                                                                                        className={`step-icon ${
                                                                                            order?.status ===
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
                                                                {order?.status ===
                                                                    "DEC" && (
                                                                    <div className="modal-footer align-items-start flex-column">
                                                                        <h6 className="d-flex gap-2 align-items-center">
                                                                            <FaExclamationTriangle />
                                                                            {t(
                                                                                "buyer_pages.order_history.decline_reason",
                                                                            )}
                                                                        </h6>
                                                                        <p>
                                                                            {
                                                                                order?.decline_reason
                                                                            }
                                                                        </p>
                                                                    </div>
                                                                )}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div>
                                                <h5 className="order__history-product-price">
                                                    {order.final_price} {t("sar")}
                                                </h5>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}

                        <ul className="pagination justify-content-center mt-5 mx-auto">
                            <li className="page-item">
                                <button
                                    disabled={currentPage === 1}
                                    className={`page-link ${
                                        currentPage === 1 &&
                                        "dashboard__pagination-disabled"
                                    }`}
                                    onClick={() => setCurrentPage(() => currentPage - 1)}
                                >
                                    {t("previous")}
                                </button>
                            </li>

                            {Array.from(Array(totalPages).keys()).map((num) => (
                                <li
                                    className="page-item"
                                    key={num}
                                >
                                    <button
                                        onClick={() => setCurrentPage(num + 1)}
                                        className="page-link"
                                    >
                                        {num + 1}
                                    </button>
                                </li>
                            ))}
                            <li className="page-item">
                                <button
                                    disabled={currentPage === totalPages}
                                    className={`page-link ${
                                        currentPage === totalPages &&
                                        "dashboard__pagination-disabled"
                                    }`}
                                    onClick={() => setCurrentPage(() => currentPage + 1)}
                                >
                                    {t("next")}
                                </button>
                            </li>
                        </ul>
                    </>
                ) : (
                    <p className="mt-3">{t("buyer_pages.order_history.none")}!</p>
                )}
            </section>
        </main>
    );
};

export default OrderHistory;
