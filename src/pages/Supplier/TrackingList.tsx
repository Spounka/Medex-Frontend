import { useTranslation } from "react-i18next";
import { BsTruck } from "react-icons/bs";

import { useState, useEffect } from "react";

import { Link } from "react-router-dom";

import useAxios from "../../utils/useAxios";

import userImage from "../../assets/images/user.png";

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
        <main className="px-0 px-md-3">
            <section>
                <div className="container">
                    <div className="row">
                        <h2 className="fw-bold d-flex align-items-center gap-2 dashboard__title">
                            <BsTruck size="2.5rem" />
                            {t("supplier_sidebar.tracking")}
                        </h2>
                    </div>
                    <div className="row">
                        {orderItems.length > 0 ? (
                            <div className="col-12 mt-3">
                                <div className="table-responsive">
                                    <table className="table table-hover max-vw-100 rounded bg-white shadow dashboard__orders-list">
                                        <thead className="dashboard__orders-table-header">
                                            <tr>
                                                <th># ID</th>
                                                <th className="text-nowrap">
                                                    {t(
                                                        "supplier_pages.update_product.buyer",
                                                    )}
                                                </th>
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
                                                    <tr key={order?.id}>
                                                        <td className="text-nowrap">
                                                            {order?.id}
                                                        </td>
                                                        <td className="text-nowrap">
                                                            <div className="d-flex align-items-center gap-2">
                                                                <img
                                                                    src={
                                                                        order.user.profile
                                                                            ?.profile_picture
                                                                            ? `
                                                            ${
                                                                import.meta.env
                                                                    .VITE_BACKEND_URL +
                                                                order.user.profile
                                                                    .profile_picture
                                                            }
                                                            `
                                                                            : `${userImage}`
                                                                    }
                                                                    className="rounded-circle border"
                                                                    width={30}
                                                                    height={30}
                                                                />
                                                                {order.user.full_name}
                                                            </div>
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
                                                            <Link
                                                                to={`/supplier/tracking/${order?.id}`}
                                                                state={{
                                                                    order: order,
                                                                }}
                                                            >
                                                                {t(
                                                                    "supplier_pages.dashboard.view",
                                                                )}
                                                            </Link>
                                                        </td>
                                                    </tr>
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

                                        {Array.from(Array(totalPages).keys()).map(
                                            (num) => (
                                                <li
                                                    className="page-item"
                                                    key={num}
                                                >
                                                    <button
                                                        onClick={() =>
                                                            setCurrentPage(num + 1)
                                                        }
                                                        className="page-link"
                                                    >
                                                        {num + 1}
                                                    </button>
                                                </li>
                                            ),
                                        )}
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
                </div>
            </section>
        </main>
    );
};

export default TrackingList;
