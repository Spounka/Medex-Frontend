import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

const UserSpendingsChart = (props) => {
    const { topBuyersStatistics } = props;

    if (
        !topBuyersStatistics ||
        !Array.isArray(topBuyersStatistics) ||
        topBuyersStatistics.length === 0
    ) {
        return <div>Loading...</div>;
    }

    const buyerNames = topBuyersStatistics.map((buyer) => buyer.buyer_name);
    const spendings = topBuyersStatistics.map((buyer) => buyer.total_spent);

    const data = {
        labels: buyerNames,
        datasets: [
            {
                data: spendings,
                backgroundColor: ["#8e65c1", "#00cab6", "#f3c555"],
            },
        ],
    };

    const options = {
        responsive: true,
        maintainAspectRatio: false,
    };

    return (
        <Pie
            data={data}
            options={options}
        />
    );
};

export default UserSpendingsChart;
