import { Bar } from "react-chartjs-2";

const MonthlyBarChart = ({ slot, monthlySales, dailySales, months, days }) => {
    const data = {
        labels: slot === "month" ? [...months] : [...days],
        datasets: [
            {
                data: slot === "month" ? [...monthlySales] : [...dailySales],
                backgroundColor: "#var(--theme-color-secondary)",
                fill: true,
                lineTension: 0.5,
            },
        ],
    };

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        curveType: "function",
        plugins: {
            legend: {
                display: false,
            },
        },
        animation: {
            x: {
                type: "number",
                easing: "linear",
                duration: 1000,
            },
            y: {
                type: "number",
                easing: "linear",
                duration: 1000,
            },
        },
        interaction: {
            intersect: false,
        },
        scales: {
            y: {
                beginAtZero: true,
            },
        },
    };

    return (
        <Bar
            type="line"
            className="dashboard__chart w-100"
            options={options}
            data={data}
            height={210}
        />
    );
};

export default MonthlyBarChart;
