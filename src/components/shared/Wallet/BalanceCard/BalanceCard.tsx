import React from "react";
import "./BalanceCard.css";

import { useTranslation } from "react-i18next";

interface BalanceCardProps {
    company: string;
    balance: number;
}

const BalanceCard: React.FC<BalanceCardProps> = ({ company, balance }) => {
    const { t } = useTranslation();

    return (
        <div className="balance__card shadow">
            <div className="card_info">
                <p className={"tw-pb-4"}>{company}</p>
                <hr className="text-white tw-border-b tw-border-b-white" />
                <p className="pt-5">
                    {balance ?? 150} {t("sar")}
                </p>
            </div>
        </div>
    );
};

export default BalanceCard;
