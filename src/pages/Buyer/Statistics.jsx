import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";

import useAxios from "../../utils/useAxios";

import { IoStatsChart } from "react-icons/io5";
import { GiReturnArrow } from "react-icons/gi";
import { MdRequestQuote } from "react-icons/md";

import YearlyPayments from "../../components/Buyer/Charts/YearlyPayments";
import YearlyPurchases from "../../components/Buyer/Charts/YearlyPurchases";
import CategoriesPurchases from "../../components/Buyer/Charts/CategoriesPurchases";

const Statistics = () => {
    const { t } = useTranslation();

    const api = useAxios();

    const [months, setMonths] = useState([]);
    const [yearlyPayments, setYearlyPayments] = useState([]);
    const [yearlyPurchases, setYearlyPurchases] = useState([]);
    const [monthlyReturnRequests, setMonthlyReturnRequests] = useState([]);
    const [monthlyRFQ, setMonthlyRFQ] = useState([]);

    const [categoriesPurchases, setCategoriesPurchases] = useState([]);
    const [totalCategoriesPurchases, setTotalCategoriesPurchases] = useState(
        []
    );

    const getStatistics = async () => {
        await api
            .get(import.meta.env.VITE_BACKEND_URL + `/api/stats/buyer/`)
            .then((res) => {
                setMonths(res.data.yearly_payments[0]);
                setYearlyPayments(res.data.yearly_payments[1]);
                setYearlyPurchases(res.data.yearly_purchases);
                setMonthlyReturnRequests(res.data.monthly_return_requests);
                setMonthlyRFQ(res.data.monthly_rfq);
                setCategoriesPurchases(res.data.categories_purchases[0]);
                setTotalCategoriesPurchases(res.data.categories_purchases[1]);
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
                <hr />
                <div className="row mt-3">
                    <div className="col-sm-12 col-lg-6 mt-3">
                        <div className="card p-4 shadow dashboard__stats-card-1">
                            <div className="row">
                                <div className="col-9">
                                    <div className="mb-4">
                                        <h5 className="card-title mb-0 dashboard__stats-card-title">
                                            {t(
                                                "buyer_pages.statistics.return_request"
                                            )}
                                        </h5>
                                    </div>
                                    <div className="d-flex align-items-center gap-5">
                                        <h2 className="d-flex align-items-center mb-0 dashboard__stats-card-text">
                                            {monthlyReturnRequests > 0
                                                ? monthlyReturnRequests
                                                : 0}
                                        </h2>
                                    </div>
                                </div>
                                <div className="col-3 d-flex justify-content-center align-items-center">
                                    <div className="dashboard__stats-card-icon">
                                        <GiReturnArrow />
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
                                        <h5 className="card-title mb-0 dashboard__stats-card-title">
                                            {t("buyer_pages.statistics.rfq")}
                                        </h5>
                                    </div>
                                    <div className="d-flex align-items-center gap-5">
                                        <h2 className="d-flex align-items-center mb-0 dashboard__stats-card-text">
                                            {monthlyRFQ > 0 ? monthlyRFQ : 0}
                                        </h2>
                                    </div>
                                </div>
                                <div className="col-3 d-flex justify-content-center align-items-center">
                                    <div className="dashboard__stats-card-icon">
                                        <MdRequestQuote />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row mt-3">
                    <div className="col-12 mt-5">
                        <h5 className="fw-bold">
                            {t("buyer_pages.statistics.yearly_payments")}
                        </h5>
                    </div>
                    <div className="col-12 mt-1">
                        <YearlyPayments
                            months={months}
                            yearlyPayments={yearlyPayments}
                        />
                    </div>
                </div>
                <div className="row mt-3">
                    <div className="col-12 mt-3">
                        <h5 className="fw-bold">
                            {t("buyer_pages.statistics.yearly_purchases")}
                        </h5>
                    </div>
                    <div className="col-12 mt-1">
                        <YearlyPurchases
                            months={months}
                            yearlyPurchases={yearlyPurchases}
                        />
                    </div>
                </div>
                <div className="row my-3">
                    <div className="col-12 mt-3">
                        <h5 className="fw-bold">
                            {t("buyer_pages.statistics.categories")}
                        </h5>
                    </div>
                    <div className="col-12 mt-1">
                        <CategoriesPurchases
                            categoriesPurchases={categoriesPurchases}
                            totalCategoriesPurchases={totalCategoriesPurchases}
                        />
                    </div>
                </div>
            </section>
        </main>
    );
};

export default Statistics;
