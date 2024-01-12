import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";

import useAxios from "../../utils/useAxios";

import { IoStatsChart } from "react-icons/io5";

const Statistics = () => {
    const { t } = useTranslation();

    const [categories, setCategories] = useState([]);
    const [productCounts, setProductCounts] = useState([]);

    const [totalProducts, setTotalProducts] = useState(0);

    const [customersCount, setCustomersCount] = useState(0);

    const [orderStatistics, setOrderStatistics] = useState({});
    const [quoteStatistics, setQuoteStatistics] = useState({});

    const [salesCount, setSalesCount] = useState({});

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
                setQuoteStatistics(res?.data?.monthly_quotes_statistics);

                setSalesCount(res?.data?.monthly_sales_count);
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
            </section>
        </main>
    );
};

export default Statistics;
