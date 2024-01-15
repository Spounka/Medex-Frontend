import React from "react";
import { Line } from "react-chartjs-2";

const QuoteStatisticsChart = (props) => {
    const { quoteStatistics } = props;

    if (
        !quoteStatistics ||
        !Array.isArray(quoteStatistics) ||
        quoteStatistics.length === 0
    ) {
        return <div>Loading...</div>;
    }

    const monthNames = [
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

    const months = quoteStatistics.map((stat) => monthNames[stat.month - 1]);
    const totalQuotes = quoteStatistics.map((stat) => stat.total_quotes);
    const approvedQuotes = quoteStatistics.map(
        (stat) => stat.total_approved_quotes
    );
    const declinedQuotes = quoteStatistics.map(
        (stat) => stat.total_declined_quotes
    );
    const pendingQuotes = quoteStatistics.map(
        (stat) => stat.total_pending_quotes
    );

    const data = {
        labels: months,
        datasets: [
            {
                label: "Total Quotes",
                data: totalQuotes,
                borderColor: "#3A8BFF",
                backgroundColor: "transparent",
            },
            {
                label: "Approved Quotes",
                data: approvedQuotes,
                borderColor: "#32C48D",
                backgroundColor: "transparent",
            },
            {
                label: "Declined Quotes",
                data: declinedQuotes,
                borderColor: "#FF3E3E",
                backgroundColor: "transparent",
            },
            {
                label: "Pending Quotes",
                data: pendingQuotes,
                borderColor: "#FFA500",
                backgroundColor: "transparent",
            },
        ],
    };

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
            y: {
                beginAtZero: true,
                ticks: {
                    stepSize: 1,
                },
            },
        },
    };

    return <Line data={data} options={options} />;
};

export default QuoteStatisticsChart;
