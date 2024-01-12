import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";

import useAxios from "../../utils/useAxios";

import { IoStatsChart } from "react-icons/io5";

const Statistics = () => {
    const { t } = useTranslation();

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
