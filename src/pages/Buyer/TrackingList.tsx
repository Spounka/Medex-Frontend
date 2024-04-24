import { useTranslation } from "react-i18next";
import { BsTruck } from "react-icons/bs";

import { useState, useEffect } from "react";

import useAxios from "../../utils/useAxios";

const TrackingList = () => {
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
                    <BsTruck size="2.5rem" />
                    {t("buyer_sidebar.tracking")}
                </h2>
                <div className="row">
                    {orderItems.length > 0 ? (
                        <div className="col-12 mt-3">
                            <div className="table-responsive">
                                <table className="table table-hover max-vw-100 rounded bg-white shadow dashboard__orders-list">
                                    <thead className="dashboard__orders-table-header">
                                        <tr>
                                            <th># ID</th>
                                            <th className="text-nowrap">
                                                {t("buyer_pages.cart.product")}
                                            </th>
                                            <th className="text-nowrap">
                                                {t("buyer_pages.cart.qty")}
                                            </th>
                                            <th className="text-nowrap">
                                                {t("buyer_pages.cart.total")}
                                            </th>
                                            <th className="text-nowrap">
                                                {t("buyer_pages.offers_list.status")}
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {orderItems.map((order) => {
                                            return (
                                                <>
                                                    <tr
                                                        className={
                                                            "[&&]:hover:tw-bg-blue"
                                                        }
                                                        key={order?.id}
                                                    >
                                                        <td className="text-nowrap">
                                                            {order?.id}
                                                        </td>
                                                        <td className="text-nowrap">
                                                            {order?.product?.name}
                                                        </td>
                                                        <td className="text-nowrap">
                                                            {order?.quantity}
                                                        </td>
                                                        <td className="text-nowrap">
                                                            {order?.final_price}{" "}
                                                            {t("sar")}
                                                        </td>
                                                        <td className="text-nowrap">
                                                            <button
                                                                type="button"
                                                                className="btn btn-primary btn-sm d-flex align-items-center gap-2"
                                                                // data-bs-toggle="modal"
                                                                // data-bs-target={`#orderModal-${order.id}`}
                                                            >
                                                                <BsTruck size="1.2rem" />
                                                                {t(
                                                                    "supplier_pages.order_details.status",
                                                                )}
                                                            </button>
                                                        </td>
                                                    </tr>

                                                    {/*<div*/}
                                                    {/*    className="modal fade"*/}
                                                    {/*    id={`orderModal-${order.id}`}*/}
                                                    {/*    tabIndex="-1"*/}
                                                    {/*    aria-labelledby={`orderModal-${order.id}`}*/}
                                                    {/*    aria-hidden="true"*/}
                                                    {/*>*/}
                                                    {/*    <div className="modal-dialog modal-xl modal-dialog-scrollable modal-dialog-centered">*/}
                                                    {/*        <div className="modal-content">*/}
                                                    {/*            <div className="modal-body px-5 pt-4">*/}
                                                    {/*                <div className="step-indicator mb-5">*/}
                                                    {/*                    <div className="step step1 active">*/}
                                                    {/*                        <div className="step-icon">*/}
                                                    {/*                            1*/}
                                                    {/*                        </div>*/}
                                                    {/*                        <p>*/}
                                                    {/*                            {t(*/}
                                                    {/*                                "supplier_pages.order_details.or",*/}
                                                    {/*                            )}*/}
                                                    {/*                        </p>*/}
                                                    {/*                    </div>*/}
                                                    {/*                    <div*/}
                                                    {/*                        className={`indicator-line ${*/}
                                                    {/*                            order?.shipping_status ===*/}
                                                    {/*                                "P" ||*/}
                                                    {/*                            order?.shipping_status ===*/}
                                                    {/*                                "OTW" ||*/}
                                                    {/*                            order?.shipping_status ===*/}
                                                    {/*                                "DE"*/}
                                                    {/*                                ? "active"*/}
                                                    {/*                                : ""*/}
                                                    {/*                        }`}*/}
                                                    {/*                    ></div>*/}
                                                    {/*                    <div*/}
                                                    {/*                        className={`step step2 ${*/}
                                                    {/*                            order?.shipping_status ===*/}
                                                    {/*                                "P" ||*/}
                                                    {/*                            order?.shipping_status ===*/}
                                                    {/*                                "OTW" ||*/}
                                                    {/*                            order?.shipping_status ===*/}
                                                    {/*                                "DE"*/}
                                                    {/*                                ? "active"*/}
                                                    {/*                                : ""*/}
                                                    {/*                        }`}*/}
                                                    {/*                    >*/}
                                                    {/*                        <div className="step-icon">*/}
                                                    {/*                            2*/}
                                                    {/*                        </div>*/}
                                                    {/*                        <p className="stepper__text-2">*/}
                                                    {/*                            {t(*/}
                                                    {/*                                "supplier_pages.order_details.p",*/}
                                                    {/*                            )}*/}
                                                    {/*                        </p>*/}
                                                    {/*                    </div>*/}
                                                    {/*                    <div*/}
                                                    {/*                        className={`indicator-line ${*/}
                                                    {/*                            order?.shipping_status ===*/}
                                                    {/*                                "OTW" ||*/}
                                                    {/*                            order?.shipping_status ===*/}
                                                    {/*                                "DE"*/}
                                                    {/*                                ? "active"*/}
                                                    {/*                                : ""*/}
                                                    {/*                        }`}*/}
                                                    {/*                    ></div>*/}
                                                    {/*                    <div*/}
                                                    {/*                        className={`step step3 ${*/}
                                                    {/*                            order?.shipping_status ===*/}
                                                    {/*                                "OTW" ||*/}
                                                    {/*                            order?.shipping_status ===*/}
                                                    {/*                                "DE"*/}
                                                    {/*                                ? "active"*/}
                                                    {/*                                : ""*/}
                                                    {/*                        }`}*/}
                                                    {/*                    >*/}
                                                    {/*                        <div className="step-icon">*/}
                                                    {/*                            3*/}
                                                    {/*                        </div>*/}
                                                    {/*                        <p>*/}
                                                    {/*                            {t(*/}
                                                    {/*                                "supplier_pages.order_details.otw",*/}
                                                    {/*                            )}*/}
                                                    {/*                        </p>*/}
                                                    {/*                    </div>*/}
                                                    {/*                    <div*/}
                                                    {/*                        className={`indicator-line ${*/}
                                                    {/*                            order?.shipping_status ==*/}
                                                    {/*                                "DE" &&*/}
                                                    {/*                            "active"*/}
                                                    {/*                        }`}*/}
                                                    {/*                    ></div>*/}
                                                    {/*                    <div*/}
                                                    {/*                        className={`step step4 ${*/}
                                                    {/*                            order?.shipping_status ==*/}
                                                    {/*                                "DE" &&*/}
                                                    {/*                            "active"*/}
                                                    {/*                        }`}*/}
                                                    {/*                    >*/}
                                                    {/*                        <div className="step-icon">*/}
                                                    {/*                            4*/}
                                                    {/*                        </div>*/}
                                                    {/*                        <p>*/}
                                                    {/*                            {t(*/}
                                                    {/*                                "supplier_pages.order_details.de",*/}
                                                    {/*                            )}*/}
                                                    {/*                        </p>*/}
                                                    {/*                    </div>*/}
                                                    {/*                </div>*/}
                                                    {/*            </div>*/}
                                                    {/*        </div>*/}
                                                    {/*    </div>*/}
                                                    {/*</div>*/}
                                                </>
                                            );
                                        })}
                                    </tbody>
                                </table>
                            </div>
                            <div className="d-flex align-items-center justify-content-end">
                                <ul className="pagination justify-content-end shadow">
                                    <li className="page-item ">
                                        <button
                                            disabled={currentPage === 1}
                                            className={`page-link ${
                                                currentPage === 1 &&
                                                "dashboard__pagination-disabled"
                                            }`}
                                            onClick={() =>
                                                setCurrentPage(() => currentPage - 1)
                                            }
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
                                            onClick={() =>
                                                setCurrentPage(() => currentPage + 1)
                                            }
                                        >
                                            {t("next")}
                                        </button>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    ) : (
                        <p className="mt-3 text-center">
                            {t("buyer_pages.order_history.none")}!
                        </p>
                    )}
                </div>
            </section>
        </main>
    );
};

export default TrackingList;
