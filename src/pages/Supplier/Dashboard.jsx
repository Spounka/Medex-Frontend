import { FaArrowTrendDown, FaArrowTrendUp } from "react-icons/fa6";

import { Link } from "react-router-dom";

import userImage from "../../assets/images/user.png";

import MonthlyBarChart from "../../components/Supplier/Charts/IncomeAreaChart";
import IncomeBarChart from "../../components/Supplier/Charts/IncomeBarChart";

import { Button } from "@mui/material";
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

    const [currentMonthlySales, setCurrentMonthlySales] = useState([]);
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

                setMonths(res.data.results.stats.monthly_sales[0]);
                setMonthlySales(res.data.results.stats.monthly_sales[1]);

                setDays(res.data.results.stats.daily_sales[0]);
                setDailySales(res.data.results.stats.daily_sales[1]);

                setMonthlySales(
                    res.data.results.stats.current_monthly_sales[0]
                );
                setPercentagePreviousMonthlySales(
                    Math.round(
                        parseFloat(
                            res.data.results.stats.current_monthly_sales[1]
                        )
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
                    <h2 className="d-flex align-items-center gap-2 dashboard__title">
                        {t("supplier_pages.dashboard.title")}
                    </h2>
                    <div className={`d-flex flex-wrap as`}>
                        <div className="mt-3">
                            <div className="p-4 dashboard__stats-card">
                                <div className="row">
                                    <div className="col-9">
                                        <div className="mb-4">
                                            <h5 className="card-title mb-0 dashboard__stats-card-title">
                                                {t(
                                                    "supplier_pages.dashboard.new_orders"
                                                )}
                                            </h5>
                                        </div>
                                        <div className="d-flex align-items-center gap-3">
                                            <h2 className="d-flex align-items-center mb-0 dashboard__stats-card-text">
                                                {monthlySalesCount > 0
                                                    ? monthlySalesCount
                                                    : 0}
                                            </h2>
                                            <div
                                                className="d-flex align-items-center gap-1 px-3 py-1"
                                                style={
                                                    percentagePreviousMonthlySalesCount >
                                                    0
                                                        ? {
                                                              borderRadius:
                                                                  "5px",
                                                              color: "white",
                                                              backgroundColor:
                                                                  "#2c77df",
                                                          }
                                                        : {
                                                              borderRadius:
                                                                  "5px",
                                                              color: "white",
                                                              backgroundColor:
                                                                  "#faad14",
                                                          }
                                                }
                                            >
                                                {Math.abs(
                                                    percentagePreviousMonthlySalesCount
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
                                                {t(
                                                    "supplier_pages.dashboard.new_buyers"
                                                )}
                                            </h5>
                                        </div>
                                        <div className="d-flex align-items-center gap-3">
                                            <h2 className="mb-0 dashboard__stats-card-text">
                                                {monthlyBuyersCount > 0
                                                    ? monthlyBuyersCount
                                                    : 0}
                                            </h2>
                                            <div
                                                className="d-flex align-items-center gap-1 px-3 py-1"
                                                style={
                                                    percentagePreviousMonthlySalesCount >
                                                    0
                                                        ? {
                                                              borderRadius:
                                                                  "5px",
                                                              color: "white",
                                                              backgroundColor:
                                                                  "#2c77df",
                                                          }
                                                        : {
                                                              borderRadius:
                                                                  "5px",
                                                              color: "white",
                                                              backgroundColor:
                                                                  "#faad14",
                                                          }
                                                }
                                            >
                                                {Math.abs(
                                                    percentagePreviousMonthlyBuyersCount
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
                                                {t(
                                                    "supplier_pages.dashboard.monthly"
                                                )}
                                            </h5>
                                        </div>
                                        <div className="d-flex align-items-center gap-3">
                                            <h2 className="d-flex align-items-center mb-0  dashboard__stats-card-text">
                                                {currentMonthlySales > 0
                                                    ? currentMonthlySales
                                                    : 0}{" "}
                                                {t("sar")}
                                            </h2>
                                            <div
                                                className="d-flex align-items-center gap-1 px-3 py-1"
                                                style={
                                                    percentagePreviousMonthlySalesCount >
                                                    0
                                                        ? {
                                                              borderRadius:
                                                                  "5px",
                                                              color: "white",
                                                              backgroundColor:
                                                                  "#2c77df",
                                                          }
                                                        : {
                                                              borderRadius:
                                                                  "5px",
                                                              color: "white",
                                                              backgroundColor:
                                                                  "#faad14",
                                                          }
                                                }
                                            >
                                                {Math.abs(
                                                    percentagePreviousMonthlySales
                                                )}
                                                %
                                                {percentagePreviousMonthlySales >
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
                                            <h5 className="card-title mb-0  dashboard__stats-card-title">
                                                {t(
                                                    "supplier_pages.dashboard.messages"
                                                )}
                                            </h5>
                                        </div>
                                        <div className="d-flex align-items-center gap-3">
                                            <h2 className="d-flex align-items-center mb-0  dashboard__stats-card-text">
                                                {monthlyThreadsCount > 0
                                                    ? monthlyThreadsCount
                                                    : 0}
                                            </h2>
                                            <div
                                                className="d-flex align-items-center gap-1 px-3 py-1"
                                                style={
                                                    percentagePreviousMonthlySalesCount >
                                                    0
                                                        ? {
                                                              borderRadius:
                                                                  "5px",
                                                              color: "white",
                                                              backgroundColor:
                                                                  "#2c77df",
                                                          }
                                                        : {
                                                              borderRadius:
                                                                  "5px",
                                                              color: "white",
                                                              backgroundColor:
                                                                  "#faad14",
                                                          }
                                                }
                                            >
                                                {Math.abs(
                                                    percentagePreviousMonthlyThreadsCount
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
            <section className="py-5">
                <div className="container-fluid">
                    <div className="d-flex gap-5 justify-content-between ad">
                        <div className="col-lg-7 as">
                            <div className="d-flex justify-content-between">
                                <h2 className="d-flex align-items-center gap-2 dashboard__title">
                                    {t("supplier_pages.dashboard.report")}
                                </h2>
                                <div>
                                    <Button
                                        size="medium"
                                        onClick={() => setSlot("month")}
                                        color={
                                            slot === "month"
                                                ? "primary"
                                                : "inherit"
                                        }
                                        variant={
                                            slot === "month"
                                                ? "outlined"
                                                : "text"
                                        }
                                    >
                                        Month
                                    </Button>
                                    <Button
                                        size="medium"
                                        onClick={() => setSlot("week")}
                                        color={
                                            slot === "week"
                                                ? "primary"
                                                : "inherit"
                                        }
                                        variant={
                                            slot === "week"
                                                ? "outlined"
                                                : "text"
                                        }
                                    >
                                        Week
                                    </Button>
                                </div>
                            </div>
                            <div className="col-12 mt-3">
                                <MonthlyBarChart slot={slot} />
                            </div>
                        </div>
                        <div className="col-lg-4 as">
                            <div className="d-flex justify-content-between">
                                <h2
                                    className="d-flex align-items-center gap-2 dashboard__title"
                                    style={{ textWrap: "nowrap" }}
                                >
                                    {t("supplier_pages.dashboard.income")}
                                </h2>
                            </div>
                            <div className="col-12 mt-3">
                                <IncomeBarChart />
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="py-3">
                <div className="container-fluid">
                    <div className="row">
                        <h2 className="d-flex align-items-center gap-2 dashboard__title">
                            {t("supplier_pages.dashboard.recent")}
                        </h2>
                        {orderItems.length > 0 ? (
                            <div className="col-12 mt-3">
                                <div
                                    className="table-responsive p-2"
                                    style={{
                                        backgroundColor: "white",
                                        borderRadius: "15px",
                                        border: "1px solid rgb(204, 204, 204)",
                                        boxShadow:
                                            "rgba(0, 0, 0, 0.09) 1px 3px 6px 0px",
                                    }}
                                >
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
                                                        "supplier_pages.update_product.buyer"
                                                    )}
                                                </th>
                                                <th
                                                    style={{
                                                        fontWeight: "500",
                                                    }}
                                                    className="text-nowrap"
                                                >
                                                    {t(
                                                        "buyer_pages.cart.product"
                                                    )}
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
                                                    {t(
                                                        "buyer_pages.cart.total"
                                                    )}
                                                </th>
                                                <th
                                                    style={{
                                                        fontWeight: "500",
                                                    }}
                                                    className="text-nowrap"
                                                >
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
                                    <ul
                                        className="pagination justify-content-end mt-3"
                                        style={{
                                            backgroundColor: "white",
                                            borderRadius: "7px",
                                            border: "1px solid rgb(204, 204, 204)",
                                            boxShadow:
                                                "rgba(0, 0, 0, 0.09) 1px 3px 6px 0px",
                                        }}
                                    >
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
