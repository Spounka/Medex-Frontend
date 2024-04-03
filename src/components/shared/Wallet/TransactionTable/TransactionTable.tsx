import React from "react";
import { TransactionTableProps, Transaction } from "../../../../types/wallet";

import "./TransactionTable.css";

import userImage from "../../../../assets/images/user.png";
import { TbChevronLeft, TbChevronRight } from "react-icons/tb";

interface StatusStyle {
    color: string;
    text: string;
}

const getStatusStyle = (
    t: TransactionTableProps["t"],
    status: Transaction["transaction_status"],
): StatusStyle => {
    switch (status) {
        case "P":
            return { color: "warning", text: t("shared.wallet.p") };
        case "A":
            return { color: "success", text: t("shared.wallet.a") };
        default:
            return { color: "danger", text: t("shared.wallet.d") };
    }
};

const getTypeText = (
    t: TransactionTableProps["t"],
    type: Transaction["transaction_type"],
): string => {
    switch (type) {
        case "W":
            return t("shared.wallet.w");
        case "P":
            return t("shared.wallet.pr");
        default:
            return t("shared.wallet.r");
    }
};

const TransactionTable: React.FC<TransactionTableProps> = ({
    t,
    data,
    currentPage,
    totalPages,
    setCurrentPage,
}) => {
    if (data?.length === 0) {
        return (
            <div className="card shadow">
                <div className="card-header border-0">
                    <h3 className="mb-0">{t("shared.wallet.recent")}</h3>
                </div>
                <div className="card-body text-center">
                    <p>{t("shared.wallet.empty")}</p>
                </div>
            </div>
        );
    }
    return (
        <div className="card shadow">
            <div className="card-header border-0">
                <h3 className="mb-0">{t("shared.wallet.recent")}</h3>
            </div>
            <div className="table-responsive">
                <table className="table align-items-center table-flush">
                    <thead className="thead-light">
                        <tr>
                            <th scope="col">{t("shared.wallet.id")}</th>
                            <th scope="col">{t("shared.wallet.user")}</th>
                            <th scope="col">
                                {t("shared.wallet.amount")} ({t("sar")})
                            </th>
                            <th scope="col">{t("shared.wallet.type")}</th>
                            <th scope="col">{t("shared.wallet.status")}</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data?.map((transaction) => {
                            const statusStyle = getStatusStyle(
                                t,
                                transaction.transaction_status,
                            );
                            const typeText = getTypeText(t, transaction.transaction_type);
                            return (
                                <tr key={transaction.id}>
                                    <td>{transaction.id}</td>
                                    <td>
                                        <div className="avatar-group">
                                            <img
                                                alt="User Image"
                                                src={
                                                    transaction.user.profile_picture
                                                        ? transaction.user.profile_picture
                                                        : userImage
                                                }
                                                className="rounded-circle"
                                                width={30}
                                                height={30}
                                            />
                                        </div>
                                    </td>
                                    <td>{transaction.amount}</td>
                                    <td>{typeText}</td>
                                    <td>
                                        <span className="badge badge-dot text-dark mr-4">
                                            <i className={`bg-${statusStyle.color}`}></i>{" "}
                                            {statusStyle.text}
                                        </span>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
            <div className="card-footer py-4">
                <nav aria-label="...">
                    <ul className="pagination justify-content-end mb-0 bg-white">
                        <li className="page-item">
                            <button
                                disabled={currentPage === 1}
                                className={`page-link ${
                                    currentPage === 1 && "dashboard__pagination-disabled"
                                }`}
                                tabIndex={-1}
                                onClick={() => setCurrentPage(() => currentPage - 1)}
                            >
                                <TbChevronLeft size={"1.3rem"} />
                                <span className="sr-only">Previous</span>
                            </button>
                        </li>
                        {Array.from(Array(totalPages).keys()).map((num) => (
                            <li
                                className={`page-item ${num + 1 === currentPage && "active"}  `}
                                key={num}
                            >
                                <button
                                    onClick={() => setCurrentPage(num + 1)}
                                    className="page-link"
                                >
                                    {num + 1}
                                </button>
                            </li>
                        ))}
                        {/* <li className="page-item active">
                            <a
                                className="page-link"
                                href="#"
                            >
                                1
                            </a>
                        </li>
                        <li className="page-item">
                            <a
                                className="page-link"
                                href="#"
                            >
                                2 <span className="sr-only">(current)</span>
                            </a>
                        </li> */}
                        <li className="page-item">
                            <button
                                disabled={currentPage === totalPages}
                                className={`page-link ${
                                    currentPage === totalPages &&
                                    "dashboard__pagination-disabled"
                                }`}
                                onClick={() => setCurrentPage(() => currentPage + 1)}
                            >
                                <TbChevronRight size={"1.3rem"} />
                                <span className="sr-only">Next</span>
                            </button>
                        </li>
                    </ul>
                </nav>
            </div>
        </div>
    );
};

export default TransactionTable;
