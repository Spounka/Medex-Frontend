import React, { useState, useEffect, FormEvent } from "react";

import { useTranslation } from "react-i18next";

import useAxios from "../../utils/useAxios";
import { AxiosResponse } from "axios";

import BalanceCard from "../../components/shared/Wallet/BalanceCard/BalanceCard";
import StatsCard from "../../components/shared/Wallet/StatsCard/StatsCard";
import TransactionTable from "../../components/shared/Wallet/TransactionTable/TransactionTable";
import TransactionChart from "../../components/shared/Wallet/TransactionChart/TransactionChart";

import { GrTransaction } from "react-icons/gr";
import { BiMoneyWithdraw } from "react-icons/bi";
import { IoTimerOutline, IoStatsChartOutline } from "react-icons/io5";
import { LuBadgeCheck, LuBanknote } from "react-icons/lu";
import { PiBankBold } from "react-icons/pi";
import { toast } from "react-toastify";

import { WalletResponseData } from "../../types/wallet";

const monthNames: Array<string> = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
];

const Wallet: React.FC = () => {
    const { t, i18n } = useTranslation();

    const [responseData, setResponseData] = useState<WalletResponseData>({});
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    const api = useAxios();

    const [amount, setAmount] = useState<number>(0);

    useEffect(() => {
        fetchData(currentPage);
    }, [currentPage]);

    async function fetchData(page: number): Promise<void> {
        await api
            .get(import.meta.env.VITE_BACKEND_URL + `/api/wallet/?p=${page}`)
            .then((res: AxiosResponse) => {
                setResponseData(res.data);
                setTotalPages(Math.ceil(res.data.count / 10));
            })
            .catch((err) => {
                console.log(err);
            });
    }

    const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
        e.preventDefault();

        if (amount <= 0) {
            toast.error(t("shared.wallet.error"));
            return;
        }

        await api
            .post(
                import.meta.env.VITE_BACKEND_URL + "/api/wallet/withdraw/",
                { amount },
                {
                    headers: {
                        "Accept-Language": i18n.language,
                    },
                },
            )
            .then((res) => {
                const newTransaction = res.data.transaction;
                const updatedTransactions = [
                    newTransaction,
                    ...responseData.results.transactions,
                ];

                const updatedStats = {
                    ...responseData.results.stats,
                    total_transactions: responseData.results.stats.total_transactions + 1,
                    pending_transactions:
                        responseData.results.stats.pending_transactions + 1,
                };

                const updatedResponseData: WalletResponseData = {
                    ...responseData,
                    results: {
                        ...responseData.results,
                        transactions: updatedTransactions,
                        stats: updatedStats,
                    },
                };

                setResponseData(updatedResponseData);

                toast.success(t("shared.wallet.success"));
                setAmount(0);
            })
            .catch((err) => {
                toast.error(err.response.data?.error);
            });
    };

    return (
        <main className="container">
            <section className="py-5">
                <div className="w-100 d-flex flex-column flex-md-row justify-content-between gap-3">
                    <StatsCard
                        text={t("shared.wallet.total")}
                        value={responseData?.results?.stats?.total_transactions}
                        icon={
                            <GrTransaction
                                color="white"
                                size="1.5rem"
                            />
                        }
                        iconBgColorClass="wallet__status-card-icon-color1"
                        lang={i18n.language}
                    />
                    <StatsCard
                        text={t("shared.wallet.withdrawal")}
                        value={responseData?.results?.stats?.total_withdrawal_amount}
                        icon={
                            <BiMoneyWithdraw
                                color="white"
                                size="1.5rem"
                            />
                        }
                        iconBgColorClass="wallet__status-card-icon-color2"
                        lang={i18n.language}
                    />
                    <StatsCard
                        text={t("shared.wallet.pending")}
                        value={responseData?.results?.stats?.pending_transactions}
                        icon={
                            <IoTimerOutline
                                color="white"
                                size="1.5rem"
                            />
                        }
                        iconBgColorClass="wallet__status-card-icon-color3"
                        lang={i18n.language}
                    />
                    <StatsCard
                        text={t("shared.wallet.accepted")}
                        value={responseData?.results?.stats?.accepted_transactions}
                        icon={
                            <LuBadgeCheck
                                color="white"
                                size="1.5rem"
                            />
                        }
                        iconBgColorClass="wallet__status-card-icon-color4"
                        lang={i18n.language}
                    />
                </div>
            </section>
            <section className="py-1">
                <div className="row">
                    <div className="col-12 col-md-5 mt-0 mt-lg-3 d-flex align-items-center">
                        <BalanceCard
                            company={responseData?.results?.wallet?.user?.full_name}
                            balance={responseData?.results?.wallet?.balance}
                        />
                    </div>

                    <div className="col-12 col-md-7 mt-5 mt-md-0">
                        <h2 className="fw-bold d-flex align-items-center gap-2 dashboard__title">
                            <IoStatsChartOutline size="2.5rem" />
                            {t("shared.wallet.stats")}
                        </h2>
                        <TransactionChart
                            months={monthNames}
                            approvedTransactions={
                                responseData?.results?.stats
                                    ?.monthly_accepted_transactions
                            }
                            deniedTransactions={
                                responseData?.results?.stats?.monthly_denied_transactions
                            }
                            pendingTransactions={
                                responseData?.results?.stats?.monthly_pending_transactions
                            }
                        />
                    </div>
                </div>
            </section>
            <section className="py-5">
                <div className="row">
                    <div className="col-12">
                        <TransactionTable
                            t={t}
                            data={responseData?.results?.transactions}
                            currentPage={currentPage}
                            totalPages={totalPages}
                            setCurrentPage={setCurrentPage}
                        />
                    </div>
                </div>
            </section>
            <section className="py-3 mb-5">
                <div className="row">
                    <div className="col-12">
                        <h2 className="fw-bold d-flex align-items-center gap-2 dashboard__title">
                            <PiBankBold size="2.5rem" />
                            {t("shared.wallet.request")}
                        </h2>
                        <p className="text-muted py-3">
                            {t("shared.wallet.withdraw_description")}
                        </p>
                    </div>
                    <div className="col-12 mt-4">
                        <div className="d-flex align-items-center justify-content-center">
                            <button
                                type="button"
                                className="btn btn-outline-primary px-5 d-flex align-items-center gap-3 mx-auto"
                                data-bs-toggle="modal"
                                data-bs-target={`#withdrawModal`}
                            >
                                <LuBanknote size="1.2rem" />
                                {t("shared.wallet.request")}
                            </button>
                            <div
                                className="modal fade"
                                id="withdrawModal"
                                tabIndex={-1}
                                aria-labelledby={`withdrawModal`}
                                aria-hidden="true"
                            >
                                <div className="modal-dialog modal-dialog-scrollable modal-dialog-centered">
                                    <div className="modal-content">
                                        <div className="modal-header">
                                            <h5 className="modal-title">
                                                {t("shared.wallet.request")}
                                            </h5>
                                            <button
                                                type="button"
                                                className="btn-close"
                                                data-bs-dismiss="modal"
                                                aria-label="Close"
                                            ></button>
                                        </div>
                                        <div className="modal-body px-5 pt-4">
                                            <form
                                                onSubmit={handleSubmit}
                                                className="d-flex align-items-center justify-content-between"
                                            >
                                                <div className="d-flex align-items-center gap-2">
                                                    <label
                                                        htmlFor="amount"
                                                        className="form-label mb-0"
                                                    >
                                                        Amount
                                                    </label>
                                                    <input
                                                        type="number"
                                                        className="form-control"
                                                        id="amount"
                                                        value={amount}
                                                        onChange={(e) =>
                                                            setAmount(
                                                                Number(e.target.value),
                                                            )
                                                        }
                                                    />
                                                </div>
                                                <button
                                                    type="submit"
                                                    className="btn btn-primary px-3 d-flex align-items-center gap-3"
                                                >
                                                    {t("shared.wallet.apply")}
                                                </button>
                                            </form>
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

export default Wallet;
