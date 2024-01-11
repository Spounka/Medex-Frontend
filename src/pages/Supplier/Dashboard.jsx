import { FaOpencart, FaCaretDown, FaCaretUp } from "react-icons/fa";
import { PiUsersThree } from "react-icons/pi";
import { BiStats } from "react-icons/bi";
import { TbMessage2, TbReportAnalytics } from "react-icons/tb";
import { MdOutlineSpaceDashboard } from "react-icons/md";
import { AiOutlineFieldTime } from "react-icons/ai";

import { Link } from "react-router-dom";

import userImage from "../../assets/images/user.png";

import YearlySales from "../../components/Supplier/Charts/YearlySales";

import useAxios from "../../utils/useAxios";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

const Dashboard = () => {
    const { t } = useTranslation();

    const [orderItems, setOrderItems] = useState([]);
    const [totalPages, setTotalPages] = useState(1);
    const [currentPage, setCurrentPage] = useState(1);

    const [months, setMonths] = useState([]);
    const [yearlySales, setYearlySales] = useState([]);

    const [monthlySales, setMonthlySales] = useState([]);
    const [percentagePreviousMonthlySales, setPercentagePreviousMonthlySales] =
        useState([]);

    const [monthlySalesCount, setMonthlySalesCount] = useState([]);
    const [
        percentagePreviousMonthlySalesCount,
        setPercentagePreviousMonthlySalesCount,
    ] = useState([]);

    const [monthlyBuyersCount, setMonthlyBuyersCount] = useState([]);
    const [
        percentagePreviousMonthlyBuyersCount,
        setPercentagePreviousMonthlyBuyersCount,
    ] = useState([]);
    const [monthlyThreadsCount, setMonthlyThreadsCount] = useState([]);
    const [
        percentagePreviousMonthlyThreadsCount,
        setPercentagePreviousMonthlyThreadsCount,
    ] = useState([]);

    const api = useAxios();

    const getOrderItems = async () => {
        await api
            .get(
                import.meta.env.VITE_BACKEND_URL +
                    `/api/order/orders/?p=${currentPage}&stats=${true}`
            )
            .then((res) => {
                setOrderItems(res.data.results.results);
                setTotalPages(Math.ceil(res.data.count / 10));
                setMonths(res.data.results.stats.yearly_sales[0]);
                setYearlySales(res.data.results.stats.yearly_sales[1]);
                setMonthlySales(res.data.results.stats.monthly_sales[0]);
                setPercentagePreviousMonthlySales(
                    Math.round(
                        parseFloat(res.data.results.stats.monthly_sales[1])
                    )
                );
                setMonthlySalesCount(
                    res.data.results.stats.monthly_sales_count[0]
                );
                setPercentagePreviousMonthlySalesCount(
                    Math.round(res.data.results.stats.monthly_sales_count[1])
                );

                setMonthlyBuyersCount(
                    res.data.results.stats.monthly_buyers_count[0]
                );
                setPercentagePreviousMonthlyBuyersCount(
                    Math.round(res.data.results.stats.monthly_buyers_count[1])
                );
                setMonthlyThreadsCount(
                    res.data.results.stats.monthly_threads_count[0]
                );
                setPercentagePreviousMonthlyThreadsCount(
                    Math.round(res.data.results.stats.monthly_threads_count[1])
                );
            });
    };

    useEffect(() => {
        getOrderItems();
    }, [currentPage]);

    return (
        <main className="px-0 px-md-3">
            <section>
                <div className="container-fluid">
                    <h2 className="fw-bold d-flex align-items-center gap-2 dashboard__title">
                        <MdOutlineSpaceDashboard size="2.5rem" />
                        {t("supplier_pages.dashboard.title")}
                    </h2>
                    <div className="row">
                        <div className="col-sm-12 col-lg-6 mt-3">
                            <div className="card p-4 shadow dashboard__stats-card-1">
                                <div className="row">
                                    <div className="col-9">
                                        <div className="mb-4">
                                            <h5 className="card-title mb-0 dashboard__stats-card-title">
                                                {t(
                                                    "supplier_pages.dashboard.new_orders"
                                                )}
                                            </h5>
                                        </div>
                                        <div className="d-flex align-items-center gap-5">
                                            <h2 className="d-flex align-items-center mb-0 dashboard__stats-card-text">
                                                {monthlySalesCount > 0
                                                    ? monthlySalesCount
                                                    : 0}
                                            </h2>
                                            <div className="d-flex align-items-center gap-1">
                                                {Math.abs(
                                                    percentagePreviousMonthlySalesCount
                                                )}
                                                <span className="text-muted">
                                                    %
                                                </span>

                                                {percentagePreviousMonthlySalesCount >
                                                0 ? (
                                                    <FaCaretUp
                                                        size="1.7rem"
                                                        className="dashboard__stats-card-success"
                                                    />
                                                ) : (
                                                    <FaCaretDown
                                                        size="1.7rem"
                                                        className="dashboard__stats-card-danger"
                                                    />
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-3 d-flex justify-content-center align-items-center">
                                        <div className="dashboard__stats-card-icon">
                                            <FaOpencart />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-sm-12 col-lg-6 mt-3">
                            <div className="card p-4 shadow dashboard__stats-card-2">
                                <div className="row">
                                    <div className="col-9">
                                        <div className="mb-4">
                                            <h5 className="card-title mb-0  dashboard__stats-card-title">
                                                {t(
                                                    "supplier_pages.dashboard.new_buyers"
                                                )}
                                            </h5>
                                        </div>
                                        <div className="d-flex align-items-center gap-5">
                                            <h2 className="d-flex align-items-center mb-0  dashboard__stats-card-text">
                                                {monthlyBuyersCount > 0
                                                    ? monthlyBuyersCount
                                                    : 0}
                                            </h2>
                                            <div className="d-flex align-items-center gap-1">
                                                {Math.abs(
                                                    percentagePreviousMonthlyBuyersCount
                                                )}
                                                <span className="text-muted">
                                                    %
                                                </span>
                                                {percentagePreviousMonthlyBuyersCount >
                                                0 ? (
                                                    <FaCaretUp
                                                        size="1.7rem"
                                                        className="dashboard__stats-card-success"
                                                    />
                                                ) : (
                                                    <FaCaretDown
                                                        size="1.7rem"
                                                        className="dashboard__stats-card-danger"
                                                    />
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-3 d-flex justify-content-center align-items-center">
                                        <div className="dashboard__stats-card-icon">
                                            <PiUsersThree />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-sm-12 col-lg-6 mt-3">
                            <div className="card p-4 shadow dashboard__stats-card-3">
                                <div className="row">
                                    <div className="col-9">
                                        <div className="mb-4">
                                            <h5 className="card-title mb-0  dashboard__stats-card-title">
                                                {t(
                                                    "supplier_pages.dashboard.monthly"
                                                )}
                                            </h5>
                                        </div>
                                        <div className="d-flex align-items-center gap-5">
                                            <h2 className="d-flex align-items-center mb-0  dashboard__stats-card-text">
                                                {monthlySales > 0
                                                    ? monthlySales
                                                    : 0}{" "}
                                                {t("sar")}
                                            </h2>
                                            <div className="d-flex align-items-center gap-1">
                                                {Math.abs(
                                                    percentagePreviousMonthlySales
                                                )}
                                                <span className="text-muted">
                                                    %
                                                </span>

                                                {percentagePreviousMonthlySales >
                                                0 ? (
                                                    <FaCaretUp
                                                        size="1.7rem"
                                                        className="dashboard__stats-card-success"
                                                    />
                                                ) : (
                                                    <FaCaretDown
                                                        size="1.7rem"
                                                        className="dashboard__stats-card-danger"
                                                    />
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-3 d-flex justify-content-center align-items-center">
                                        <div className="dashboard__stats-card-icon">
                                            <BiStats />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-sm-12 col-lg-6 mt-3">
                            <div className="card p-4 shadow dashboard__stats-card-4">
                                <div className="row">
                                    <div className="col-9">
                                        <div className="mb-4">
                                            <h5 className="card-title mb-0  dashboard__stats-card-title">
                                                {t(
                                                    "supplier_pages.dashboard.messages"
                                                )}
                                            </h5>
                                        </div>
                                        <div className="d-flex align-items-center gap-5">
                                            <h2 className="d-flex align-items-center mb-0  dashboard__stats-card-text">
                                                {monthlyThreadsCount > 0
                                                    ? monthlyThreadsCount
                                                    : 0}
                                            </h2>
                                            <div className="d-flex align-items-center gap-1">
                                                {Math.abs(
                                                    percentagePreviousMonthlyThreadsCount
                                                )}
                                                <span className="text-muted">
                                                    %
                                                </span>
                                                {percentagePreviousMonthlyThreadsCount >
                                                0 ? (
                                                    <FaCaretUp
                                                        size="1.7rem"
                                                        className="dashboard__stats-card-success"
                                                    />
                                                ) : (
                                                    <FaCaretDown
                                                        size="1.7rem"
                                                        className="dashboard__stats-card-danger"
                                                    />
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-3 d-flex justify-content-center align-items-center">
                                        <div className="dashboard__stats-card-icon">
                                            <TbMessage2 />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="py-5">
                <div className="container-fluid">
                    <div className="row">
                        <h2 className="fw-bold d-flex align-items-center gap-2 dashboard__title">
                            <TbReportAnalytics size="2.5rem" />
                            {t("supplier_pages.dashboard.report")}
                        </h2>
                        <div className="col-12 mt-3">
                            <YearlySales
                                months={months}
                                yearlySales={yearlySales}
                            />
                        </div>
                    </div>
                </div>
            </section>

            <section className="py-3">
                <div className="container-fluid">
                    <div className="row">
                        <h2 className="fw-bold d-flex align-items-center gap-2 dashboard__title">
                            <AiOutlineFieldTime size="2.5rem" />
                            {t("supplier_pages.dashboard.recent")}
                        </h2>
                        {orderItems.length > 0 ? (
                            <div className="col-12 mt-3">
                                <div className="table-responsive">
                                    <table className="table table-hover max-vw-100 rounded bg-white shadow dashboard__orders-list">
                                        <thead className="dashboard__orders-table-header">
                                            <tr>
                                                <th># ID</th>
                                                <th className="text-nowrap">
                                                    {t(
                                                        "supplier_pages.update_product.buyer"
                                                    )}
                                                </th>
                                                <th className="text-nowrap">
                                                    {t(
                                                        "buyer_pages.cart.product"
                                                    )}
                                                </th>
                                                <th className="text-nowrap">
                                                    {t("buyer_pages.cart.qty")}
                                                </th>
                                                <th className="text-nowrap">
                                                    {t(
                                                        "buyer_pages.cart.total"
                                                    )}
                                                </th>
                                                <th className="text-nowrap">
                                                    {t(
                                                        "buyer_pages.offers_list.status"
                                                    )}
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
                                                                        order
                                                                            .user
                                                                            .profile
                                                                            ?.profile_picture
                                                                            ? `
                                                            ${
                                                                import.meta.env
                                                                    .VITE_BACKEND_URL +
                                                                order.user
                                                                    .profile
                                                                    .profile_picture
                                                            }
                                                            `
                                                                            : `${userImage}`
                                                                    }
                                                                    className="rounded-circle border"
                                                                    width={30}
                                                                    height={30}
                                                                />
                                                                {
                                                                    order.user
                                                                        .full_name
                                                                }
                                                            </div>
                                                        </td>
                                                        <td className="text-nowrap">
                                                            {
                                                                order?.product
                                                                    ?.name
                                                            }
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
                                                                to={`/supplier/order/${order?.id}`}
                                                                state={{
                                                                    order: order,
                                                                }}
                                                            >
                                                                {t(
                                                                    "supplier_pages.dashboard.view"
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
                                                    setCurrentPage(
                                                        () => currentPage - 1
                                                    )
                                                }
                                            >
                                                {t("previous")}
                                            </button>
                                        </li>

                                        {Array.from(
                                            Array(totalPages).keys()
                                        ).map((num) => (
                                            <li className="page-item" key={num}>
                                                <button
                                                    onClick={() =>
                                                        setCurrentPage(num + 1)
                                                    }
                                                    className="page-link"
                                                >
                                                    {num + 1}
                                                </button>
                                            </li>
                                        ))}
                                        <li className="page-item">
                                            <button
                                                disabled={
                                                    currentPage === totalPages
                                                }
                                                className={`page-link ${
                                                    currentPage ===
                                                        totalPages &&
                                                    "dashboard__pagination-disabled"
                                                }`}
                                                onClick={() =>
                                                    setCurrentPage(
                                                        () => currentPage + 1
                                                    )
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

export default Dashboard;
