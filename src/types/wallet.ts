import { TempUser } from "./user";
import { TFunction } from "i18next";

export interface Order {
    id: string;
}

export interface ReturnRequest {
    id: string;
}

export interface Wallet {
    id: string;
    user: TempUser;
    balance: number;
}

export interface Transaction {
    id: string;
    user: TempUser;
    wallet: Wallet;
    amount: number;
    transaction_type: "P" | "R" | "W";
    transaction_status: "A" | "D" | "P" | null;
    order: Order | null;
    return_order: ReturnRequest | null;
    receipt: string | null;
    created: string;
}

export interface StatsData {
    total_transactions: number;
    total_withdrawal_amount: number;
    pending_transactions: number;
    accepted_transactions: number;
    monthly_accepted_transactions: number[];
    monthly_denied_transactions: number[];
    monthly_pending_transactions: number[];
}

export interface Result {
    wallet: Wallet;
    transactions: Transaction[];
    stats: StatsData;
}

export type WalletResponseData = {
    count: number;
    next: string | null;
    previous: string | null;
    results: Result;
};

export interface TransactionTableProps {
    t: TFunction;
    data: Transaction[];
    currentPage: number;
    totalPages: number;
    setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
}

export interface TransactionChartProps {
    months: Array<string>;
    approvedTransactions: Array<number>;
    deniedTransactions: Array<number>;
    pendingTransactions: Array<number>;
}
