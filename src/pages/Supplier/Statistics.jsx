import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";

import useAxios from "../../utils/useAxios";

import { IoStatsChart } from "react-icons/io5";
import { FaArrowTrendUp, FaArrowTrendDown } from "react-icons/fa6";

const Statistics = () => {
    const { t } = useTranslation();

    const [categories, setCategories] = useState([]);
    const [productCounts, setProductCounts] = useState([]);

    const [totalProducts, setTotalProducts] = useState(0);

    const [customersCount, setCustomersCount] = useState(0);

    const [orderStatistics, setOrderStatistics] = useState({});
    const [orderStatisticsPercentage, setOrderStatisticsPercentage] = useState(
        {}
    );

    const [quoteStatistics, setQuoteStatistics] = useState({});

    const [salesCount, setSalesCount] = useState({});
    const [salesCountPercentage, setSalesCountPercentage] = useState({});

    const api = useAxios();

    const getStatistics = async () => {
        await api
            .get(import.meta.env.VITE_BACKEND_URL + `/api/stats/supplier/`)
            .then((res) => {
                console.log(res.data);
                setTotalProducts(res?.data?.total_products_count);

                setCategories(res?.data?.categories);
                setProductCounts(res?.data?.products_counts);

                setCustomersCount(res?.data?.monthly_customers_count);

                setOrderStatistics(res?.data?.monthly_orders_statistics);
                setOrderStatisticsPercentage(
                    res?.data?.monthly_orders_statistics_percentage
                );

                setQuoteStatistics(res?.data?.monthly_quotes_statistics);

                setSalesCount(res?.data?.monthly_sales_count);
                setSalesCountPercentage(
                    res?.data?.monthly_sales_count_percentage
                );
            });
    };

    useEffect(() => {
        getStatistics();
    }, []);

    return (
        <main className="container">
            <section className="py-3">
                <h2 className="fw-bold d-flex align-items-center gap-2 dashboard__title">
                    <IoStatsChart size="2rem" />
                    {t("buyer_pages.statistics.title")}
                </h2>
                <h4 className="fw-bold d-flex align-items-center gap-2 dashboard__title mt-5">
                    {t("supplier_pages.statistics.monthly_orders_statistics")}
                </h4>
                <div className={`d-flex flex-wrap as`}>
                    <div className="mt-3">
                        <div className="p-4 dashboard__stats-card">
                            <div className="row">
                                <div className="col-9">
                                    <div className="mb-4">
                                        <h5 className="card-title mb-0 dashboard__stats-card-title">
                                            {t(
                                                "supplier_pages.statistics.orders_max"
                                            )}
                                        </h5>
                                    </div>
                                    <div className="d-flex align-items-center gap-3">
                                        <h2 className="d-flex align-items-center mb-0 dashboard__stats-card-text">
                                            {orderStatistics?.highest_sale > 0
                                                ? orderStatistics?.highest_sale
                                                : 0}
                                        </h2>
                                        <div
                                            className={`d-flex align-items-center gap-1 px-3 py-1 ${
                                                orderStatisticsPercentage?.highest_sale >
                                                0
                                                    ? "gainColor"
                                                    : "lossColor"
                                            }`}
                                        >
                                            {Math.abs(
                                                Math.round(
                                                    orderStatisticsPercentage?.highest_sale
                                                )
                                            )}
                                            %
                                            {orderStatisticsPercentage?.highest_sale >
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
                                                "supplier_pages.statistics.orders_min"
                                            )}
                                        </h5>
                                    </div>
                                    <div className="d-flex align-items-center gap-3">
                                        <h2 className="d-flex align-items-center mb-0 dashboard__stats-card-text">
                                            {orderStatistics?.lowest_sale > 0
                                                ? orderStatistics?.lowest_sale
                                                : 0}
                                        </h2>
                                        <div
                                            className={`d-flex align-items-center gap-1 px-3 py-1 ${
                                                orderStatisticsPercentage?.lowest_sale >
                                                0
                                                    ? "gainColor"
                                                    : "lossColor"
                                            }`}
                                        >
                                            {Math.abs(
                                                Math.round(
                                                    orderStatisticsPercentage?.lowest_sale
                                                )
                                            )}
                                            %
                                            {orderStatisticsPercentage?.lowest_sale >
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
                                                "supplier_pages.statistics.orders_avg"
                                            )}
                                        </h5>
                                    </div>
                                    <div className="d-flex align-items-center gap-3">
                                        <h2 className="d-flex align-items-center mb-0 dashboard__stats-card-text">
                                            {orderStatistics?.average_sale > 0
                                                ? orderStatistics?.average_sale.toFixed(
                                                      2
                                                  )
                                                : 0}
                                        </h2>
                                        <div
                                            className={`d-flex align-items-center gap-1 px-3 py-1 ${
                                                orderStatisticsPercentage?.average_sale >
                                                0
                                                    ? "gainColor"
                                                    : "lossColor"
                                            }`}
                                        >
                                            {Math.abs(
                                                Math.round(
                                                    orderStatisticsPercentage?.average_sale
                                                )
                                            )}
                                            %
                                            {orderStatisticsPercentage?.average_sale >
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
            </section>
        </main>
    );
};

export default Statistics;
