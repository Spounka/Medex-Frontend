import {
    Chart,
    CategoryScale,
    LinearScale,
    PointElement,
    BarElement,
    Filler,
    Tooltip,
    Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

Chart.register(
    CategoryScale,
    LinearScale,
    PointElement,
    BarElement,
    Filler,
    Tooltip,
    Legend
);

const CategoriesPurchases = (props) => {
    const { categoriesPurchases, totalCategoriesPurchases } = props;

    const capitalizedLabels = categoriesPurchases.map(
        (category) => category.charAt(0).toUpperCase() + category.slice(1)
    );

    const data = {
        labels: capitalizedLabels,
        datasets: [
            {
                data: totalCategoriesPurchases,
                label: "Total Purchases",
                backgroundColor: "#0C60FF",
            },
        ],
    };

    const options = {
        responsive: true,
        maintainAspectRatio: false,
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
            type="bar"
            className="dashboard__chart"
            options={options}
            data={data}
        />
    );
};

export default CategoriesPurchases;
