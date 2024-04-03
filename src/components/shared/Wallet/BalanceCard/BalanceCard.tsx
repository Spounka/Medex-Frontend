import React from "react";
import "./BalanceCard.css";

import walletIcon from "../../../../assets/images/wallet.png";
import { useTranslation } from "react-i18next";

interface BalanceCardProps {
    company: string;
    balance: number;
}

const BalanceCard: React.FC<BalanceCardProps> = ({ company, balance }) => {
    const { t } = useTranslation();

    return (
        <div className="wallet__card-front">
            <img
                className="cardLogo"
                src={walletIcon}
                alt="Card Logo"
            />

            <div className="chip">
                <svg
                    role="img"
                    viewBox="0 0 100 100"
                    aria-label="Chip"
                >
                    <use href="#chip-lines" />
                </svg>
            </div>
            <svg
                className="contactless"
                viewBox="0 0 24 24"
                aria-label="Contactless"
            >
                <use href="#contactless" />
            </svg>
            <div className="wallet__text-container">
                <h4 className="wallet__company w-100 text-center">{company}</h4>
                <h5 className="wallet__balance w-100 text-center">
                    {balance} {t("sar")}
                </h5>
            </div>

            <svg id="chip">
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

            <svg id="contactless">
                <path
                    stroke="none"
                    d="M0 0h24v24H0z"
                    fill="none"
                />
                <path d="M9.172 15.172a4 4 0 0 1 5.656 0" />
                <path d="M6.343 12.343a8 8 0 0 1 11.314 0" />
                <path d="M3.515 9.515c4.686 -4.687 12.284 -4.687 17 0" />
            </svg>
        </div>
    );
};

export default BalanceCard;
