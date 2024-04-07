import React from "react";
import "./MobileBalanceCard.css";

import walletIcon from "../../../../assets/images/wallet.png";
import { useTranslation } from "react-i18next";

interface MobileBalanceCardProps {
    company: string;
    balance: number;
}

const MobileBalanceCard: React.FC<MobileBalanceCardProps> = ({ company, balance }) => {
    const { t } = useTranslation();

    return (
        <div className="balance__card-mobile">
            <div className="card_info">
                <p>{company}</p>
                <p>
                    {balance} {t("sar")}
                </p>
            </div>

            <div className="chip-mobile">
                <svg
                    role="img"
                    viewBox="0 0 100 100"
                    aria-label="Chip"
                >
                    <use href="#chip-lines" />
                </svg>
            </div>

            <svg id="chip-mobile">
                <g id="chip-lines">
                    <polyline points="0,50 35,50" />
                    <polyline points="0,20 20,20 35,35" />
                    <polyline points="50,0 50,35" />
                    <polyline points="65,35 80,20 100,20" />
                    <polyline points="100,50 65,50" />
                    <polyline points="35,35 65,35 65,65 35,65 35,35" />
                    <polyline points="0,80 20,80 35,65" />
                    <polyline points="50,100 50,65" />
                    <polyline points="65,65 80,80 100,80" />
                </g>
            </svg>
        </div>
    );
};

export default MobileBalanceCard;
