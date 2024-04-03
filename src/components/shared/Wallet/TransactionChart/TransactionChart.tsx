import React from "react";
import { Line } from "react-chartjs-2";

import { TransactionChartProps } from "../../../../types/wallet";

const TransactionChart: React.FC<TransactionChartProps> = ({
    months,
    approvedTransactions,
    deniedTransactions,
    pendingTransactions,
}) => {
    if (!approvedTransactions || !deniedTransactions || !pendingTransactions) {
        return <div>Loading...</div>;
    }

    const data = {
        labels: months,
        datasets: [
            {
                label: "Approved Transactions",
                data: approvedTransactions,
                borderColor: "#3A8BFF",
                backgroundColor: "transparent",
            },
            {
                label: "Denied Transactions",
                data: deniedTransactions,
                borderColor: "#FF3A3A",
                backgroundColor: "transparent",
            },
            {
                label: "Pending Transactions",
                data: pendingTransactions,
                borderColor: "#FFC107",
                backgroundColor: "transparent",
            },
        ],
    };

    const options = {
        responsive: true,
        maintainAspectRatio: true,
        scales: {
            y: {
                beginAtZero: true,
                ticks: {
                    stepSize: 1,
                },
            },
        },
    };

    return (
        <Line
            data={data}
            options={options}
        />
    );
};

export default TransactionChart;
