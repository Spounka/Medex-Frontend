import {
    Chart,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Filler,
    Tooltip,
    Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";

Chart.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Filler,
    Tooltip,
    Legend
);

const YearlySales = (props) => {
    const { months, yearlySales } = props;

    const getGradient = (ctx, chartArea) => {
        let gradient, width, height;

        const chartWidth = chartArea.right - chartArea.left;
        const chartHeight = chartArea.bottom - chartArea.top;
        if (!gradient || width !== chartWidth || height !== chartHeight) {
            width = chartWidth;
            height = chartHeight;
            gradient = ctx.createLinearGradient(
                0,
                chartArea.bottom,
                0,
                chartArea.top
            );
            gradient.addColorStop(0, "#0C60FF");
            gradient.addColorStop(0.5, "#3A8BFF");
            gradient.addColorStop(1, "#80B6FF");
        }

        return gradient;
    };

    const data = {
        labels: months,
        datasets: [
            {
                data: yearlySales,
                label: "Monthly Sales (S.A.R)",
                borderColor: function (context) {
                    const chart = context.chart;
                    const { ctx, chartArea } = chart;

                    if (!chartArea) {
                        return;
                    }
                    return getGradient(ctx, chartArea);
                },
                pointBorderColor: "#0C60FF",
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
                display: true,
                position: "bottom",
                labels: {
                    color: "#0C60FF",
                    usePointStyle: true,
                    pointStyle: "line",
                    pointStyleWidth: 40,
                },
            },
        },
        animation: {
            x: {
                type: "number",
                easing: "linear",
                duration: 2500,
            },
            y: {
                type: "number",
                easing: "linear",
                duration: 2500,
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
        <Line
            type="line"
            className="dashboard__chart"
            options={options}
            data={data}
        />
    );
};

export default YearlySales;
