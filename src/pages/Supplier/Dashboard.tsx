import { FaArrowTrendDown, FaArrowTrendUp } from "react-icons/fa6";

import { Link } from "react-router-dom";

import userImage from "../../assets/images/user.png";

import MonthlyBarChart from "../../components/Supplier/Charts/MonthlyBarChart";
import IncomeBarChart from "../../components/Supplier/Charts/IncomeBarChart";

import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import useAxios from "../../utils/useAxios";

const Dashboard = () => {
    const { t } = useTranslation();
    const [slot, setSlot] = useState("week");

    const [orderItems, setOrderItems] = useState([]);
    const [totalPages, setTotalPages] = useState(1);
    const [currentPage, setCurrentPage] = useState(1);

    const [months, setMonths] = useState([]);
    const [monthlySales, setMonthlySales] = useState([]);
    const [days, setDays] = useState([]);
    const [dailySales, setDailySales] = useState([]);
    const [dailySalesCounts, setDailySalesCounts] = useState([]);

    const [currentMonthlySales, setCurrentMonthlySales] = useState([]);

    const [percentagePreviousMonthlySales, setPercentagePreviousMonthlySales] = useState(
        [],
    );

    const [monthlySalesCount, setMonthlySalesCount] = useState([]);
    const [percentagePreviousMonthlySalesCount, setPercentagePreviousMonthlySalesCount] =
        useState([]);

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
                    `/api/order/orders/?p=${currentPage}&stats=${true}`,
            )
            .then((res) => {
                setOrderItems(res.data.results.results);
                setTotalPages(Math.ceil(res.data.count / 10));

                setMonths(res.data.results.stats.monthly_sales[0]);
                setMonthlySales(res.data.results.stats.monthly_sales[1]);

                setCurrentMonthlySales(res.data.results.stats.current_monthly_sales[0]);

                setDays(res.data.results.stats.daily_sales[0]);
                setDailySales(res.data.results.stats.daily_sales[1]);

                setDailySalesCounts(res.data.results.stats.daily_sales_counts);

                setPercentagePreviousMonthlySales(
                    Math.round(
                        parseFloat(res.data.results.stats.current_monthly_sales[1]),
                    ),
                );
                setMonthlySalesCount(res.data.results.stats.monthly_sales_count[0]);
                setPercentagePreviousMonthlySalesCount(
                    Math.round(res.data.results.stats.monthly_sales_count[1]),
                );

                setMonthlyBuyersCount(res.data.results.stats.monthly_buyers_count[0]);
                setPercentagePreviousMonthlyBuyersCount(
                    Math.round(res.data.results.stats.monthly_buyers_count[1]),
                );
                setMonthlyThreadsCount(res.data.results.stats.monthly_threads_count[0]);
                setPercentagePreviousMonthlyThreadsCount(
                    Math.round(res.data.results.stats.monthly_threads_count[1]),
                );
            });
    };

    useEffect(() => {
        getOrderItems();
    }, [currentPage]);

    return (
        <main
            className="x-0 px-md-3 "
            style={{ backgroundColor: "rgb(250, 250, 251)" }}
        >
            <section>
                <div className="container-fluid">
                    <h2 className="d-flex align-items-center gap-2 dashboard__title mt-2">
                        {t("supplier_pages.dashboard.title")}
                    </h2>
                    <div className="d-flex flex-wrap as">
                        <div className="mt-3">
                            <div className="p-4 dashboard__stats-card">
                                <div className="row">
                                    <div className="col-9">
                                        <div className="mb-4">
                                            <h5 className="card-title mb-0 dashboard__stats-card-title">
                                                {t("supplier_pages.dashboard.new_orders")}
                                            </h5>
                                        </div>
                                        <div className="d-flex align-items-center gap-2">
                                            <h2 className="d-flex align-items-center mb-0 dashboard__stats-card-text">
                                                {monthlySalesCount > 0
                                                    ? monthlySalesCount
                                                    : 0}
                                            </h2>
                                            <div
                                                className={`d-flex align-items-center gap-1 px-3 py-1 ${
                                                    percentagePreviousMonthlySalesCount >
                                                    0
                                                        ? "gainColor"
                                                        : "lossColor"
                                                }`}
                                            >
                                                {Math.abs(
                                                    percentagePreviousMonthlySalesCount,
                                                )}
                                                %
                                                {percentagePreviousMonthlySalesCount >
                                                0 ? (
                                                    <FaArrowTrendUp size="1rem" />
                                                ) : (
                                                    <FaArrowTrendDown size="1rem" />
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="mt-3">
                            <div className="p-4 dashboard__stats-card">
                                <div className="row">
                                    <div className="col-9">
                                        <div className="mb-4">
                                            <h5 className="card-title mb-0 dashboard__stats-card-title">
                                                {t("supplier_pages.dashboard.new_buyers")}
                                            </h5>
                                        </div>
                                        <div className="d-flex align-items-center gap-2">
                                            <h2 className="mb-0 dashboard__stats-card-text">
                                                {monthlyBuyersCount > 0
                                                    ? monthlyBuyersCount
                                                    : 0}
                                            </h2>
                                            <div
                                                className={`d-flex align-items-center gap-1 px-3 py-1 ${
                                                    percentagePreviousMonthlyBuyersCount >
                                                    0
                                                        ? "gainColor"
                                                        : "lossColor"
                                                }`}
                                            >
                                                {Math.abs(
                                                    percentagePreviousMonthlyBuyersCount,
                                                )}
                                                %
                                                {percentagePreviousMonthlyBuyersCount >
                                                0 ? (
                                                    <FaArrowTrendUp size="1rem" />
                                                ) : (
                                                    <FaArrowTrendDown size="1rem" />
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="mt-3">
                            <div className="p-4 dashboard__stats-card">
                                <div className="row">
                                    <div className="col-9">
                                        <div className="mb-4">
                                            <h5 className="card-title mb-0 dashboard__stats-card-title">
                                                {t("supplier_pages.dashboard.monthly")}
                                            </h5>
                                        </div>
                                        <div className="d-flex align-items-center gap-2">
                                            <h2 className="d-flex align-items-center mb-0  dashboard__stats-card-text">
                                                {currentMonthlySales > 0
                                                    ? currentMonthlySales
                                                    : 0}{" "}
                                                {t("sar")}
                                            </h2>
                                            <div
                                                className={`d-flex align-items-center gap-1 px-3 py-1 ${
                                                    percentagePreviousMonthlySales > 0
                                                        ? "gainColor"
                                                        : "lossColor"
                                                }`}
                                            >
                                                {Math.abs(percentagePreviousMonthlySales)}
                                                %
                                                {percentagePreviousMonthlySales > 0 ? (
                                                    <FaArrowTrendUp size="1rem" />
                                                ) : (
                                                    <FaArrowTrendDown size="1rem" />
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="mt-3">
                            <div className="p-4 dashboard__stats-card">
                                <div className="row">
                                    <div className="col-9">
                                        <div className="mb-4">
                                            <h5 className="card-title mb-0  dashboard__stats-card-title">
                                                {t("supplier_pages.dashboard.messages")}
                                            </h5>
                                        </div>
                                        <div className="d-flex align-items-center gap-2">
                                            <h2 className="d-flex align-items-center mb-0  dashboard__stats-card-text">
                                                {monthlyThreadsCount > 0
                                                    ? monthlyThreadsCount
                                                    : 0}
                                            </h2>
                                            <div
                                                className={`d-flex align-items-center gap-1 px-3 py-1 ${
                                                    percentagePreviousMonthlyThreadsCount >
                                                    0
                                                        ? "gainColor"
                                                        : "lossColor"
                                                }`}
                                            >
                                                {Math.abs(
                                                    percentagePreviousMonthlyThreadsCount,
                                                )}
                                                %
                                                {percentagePreviousMonthlyThreadsCount >
                                                0 ? (
                                                    <FaArrowTrendUp size="1rem" />
                                                ) : (
                                                    <FaArrowTrendDown size="1rem" />
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="py-4">
                <div className="container-fluid">
                    <div className="d-flex ad">
                        <div
                            className="col-lg-7 as"
                            style={{
                                padding: "20px",
                                backgroundColor: "white",
                                borderRadius: "15px",
                            }}
                        >
                            <div className="d-flex justify-content-between">
                                <h2 className="d-flex align-items-center gap-2 dashboard__title">
                                    {t("supplier_pages.dashboard.report")}
                                </h2>
                                <div className="d-flex gap-2">
                                    <button
                                        className={`${slot === "month" ? "btn btn-outline-primary" : "btn btn-outline-secondary"}`}
                                        onClick={() => setSlot("month")}
                                    >
                                        {t("supplier_pages.dashboard.month")}
                                    </button>

                                    <button
                                        className={`${slot === "week" ? "btn btn-outline-primary" : "btn btn-outline-secondary"}`}
                                        onClick={() => setSlot("week")}
                                    >
                                        {t("supplier_pages.dashboard.week")}
                                    </button>
                                </div>
                            </div>
                            <div className="col-12 mt-3">
                                <MonthlyBarChart
                                    slot={slot}
                                    dailySales={dailySales}
                                    monthlySales={monthlySales}
                                    days={days}
                                    months={months}
                                />
                            </div>
                        </div>
                        <div
                            className="col-lg-4 as dn"
                            style={{
                                padding: "20px",
                                backgroundColor: "white",
                                borderRadius: "15px",
                            }}
                        >
                            <div className="d-flex justify-content-between">
                                <h2 className="d-flex align-items-center gap-2 dashboard__title">
                                    {t("supplier_pages.dashboard.income")}
                                </h2>
                            </div>
                            <div className="col-12 mt-3">
                                <IncomeBarChart
                                    days={days}
                                    dailySales={dailySalesCounts}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="pb-3">
                <div className="container-fluid">
                    <div
                        className=""
                        style={{
                            padding: "20px",
                            backgroundColor: "white",
                            borderRadius: "15px",
                        }}
                    >
                        <h2 className="d-flex align-items-center gap-2 dashboard__title">
                            {t("supplier_pages.dashboard.recent")}
                        </h2>
                        {orderItems.length > 0 ? (
                            <div className="col-12 mt-3">
                                <div className="table-responsive p-2">
                                    <table className="table max-vw-100 rounded bg-white">
                                        <thead>
                                            <tr>
                                                <th
                                                    style={{
                                                        fontWeight: "500",
                                                    }}
                                                >
                                                    #ID
                                                </th>
                                                <th
                                                    className="text-nowrap"
                                                    style={{
                                                        fontWeight: "500",
                                                    }}
                                                >
                                                    {t(
                                                        "supplier_pages.update_product.buyer",
                                                    )}
                                                </th>
                                                <th
                                                    style={{
                                                        fontWeight: "500",
                                                    }}
                                                    className="text-nowrap"
                                                >
                                                    {t("buyer_pages.cart.product")}
                                                </th>
                                                <th
                                                    style={{
                                                        fontWeight: "500",
                                                    }}
                                                    className="text-nowrap"
                                                >
                                                    {t("buyer_pages.cart.qty")}
                                                </th>
                                                <th
                                                    style={{
                                                        fontWeight: "500",
                                                    }}
                                                    className="text-nowrap"
                                                >
                                                    {t("buyer_pages.cart.total")}
                                                </th>
                                                <th
                                                    style={{
                                                        fontWeight: "500",
                                                    }}
                                                    className="text-nowrap"
                                                >
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
                                                                style={{
                                                                    color: "#00cab6",
                                                                }}
                                                                to={`/supplier/order/${order?.id}`}
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
                                    <ul
                                        className="pagination justify-content-end mt-3"
                                        style={{
                                            backgroundColor: "#00cab6",
                                            borderRadius: "7px",
                                        }}
                                    >
                                        <li className="page-item ">
                                            <button
                                                disabled={currentPage === 1}
                                                className={`page-link text-white ${
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
                                                className={`page-link text-white ${
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

export default Dashboard;
