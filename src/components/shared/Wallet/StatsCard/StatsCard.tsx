import "./StatsCard.css";

import React from "react";

interface StatsCardProps {
    text: string;
    value: number;
    icon: React.ReactNode;
    iconBgColorClass: string;
    lang: string;
}

const StatsCard: React.FC<StatsCardProps> = ({
    icon,
    text,
    value,
    iconBgColorClass,
    lang,
}) => {
    return (
        <div className="w-100 d-flex align-items-center justify-content-start px-3 py-3 shadow-sm rounded wallet__status-card">
            <div className={`p-3 rounded-circle ${iconBgColorClass}`}>{icon}</div>

            <div className={`${lang === "en" ? "ms-4" : "me-4"}`}>
                <div className="wallet__stats-card-number">{value}</div>
                <div className="wallet__stats-card-text">{text}</div>
            </div>
        </div>
    );
};

export default StatsCard;
