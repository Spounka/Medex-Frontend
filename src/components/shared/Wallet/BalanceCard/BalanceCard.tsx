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
                <p>{company}</p>
                <hr className="text-white bg-white" />
                <p className="pt-5">
                    {balance} {t("sar")}
                </p>
            </div>
        </div>
    );
};

export default BalanceCard;
