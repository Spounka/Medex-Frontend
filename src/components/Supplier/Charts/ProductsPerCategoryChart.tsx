import { Chart, CategoryScale, LinearScale, BarElement, Tooltip, Legend } from "chart.js";
import { Bar } from "react-chartjs-2";

Chart.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

const ProductsPerCategoryChart = (props) => {
    const { categories, productCounts } = props;

    const capitalizedCategories = categories.map((category) => {
        const firstLetter = category.charAt(0).toUpperCase();
        const restOfWord = category.slice(1);
        return firstLetter + restOfWord;
    });

    const data = {
        labels: capitalizedCategories,
        datasets: [
            {
                data: productCounts,
                label: "Product Counts",
                backgroundColor: "#3A8BFF",
                hoverBackgroundColor: "#0C60FF",
                barThickness: 20,
            },
        ],
    };

    const options = {
        indexAxis: "y",
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                display: false,
            },
        },
        scales: {
            x: {
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

export default ProductsPerCategoryChart;
