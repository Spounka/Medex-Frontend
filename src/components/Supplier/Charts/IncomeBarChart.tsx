import { Bar } from "react-chartjs-2";

const MonthlyBarChart = ({ dailySales, days }) => {
    const data = {
        labels: [...days],
        datasets: [
            {
                data: [...dailySales],
                backgroundColor: "#faad14",
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
            className="dashboard__chart"
            options={options}
            data={data}
            height={445}
        />
    );
};

export default MonthlyBarChart;
