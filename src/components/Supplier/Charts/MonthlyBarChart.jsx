import { Bar } from "react-chartjs-2";

const MonthlyBarChart = ({ slot, monthlySales, dailySales, months, days }) => {
  const data = {
    labels: slot === "month" ? ["jan", "Fab", "Mar", "Apr", "Jun", "Jul"] : [...days],
    datasets: [
      {
        data: slot === "month" ? [423, 535, 726, 188, 100, 745] : [...dailySales],
        backgroundColor: "#2c77df",
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
      height={205}
      style={{
        padding: "10px",
        backgroundColor: "white",
        borderRadius: "15px",
        border: "1px solid #cccccc",
        boxShadow: "1px 3px 6px 0px #00000017",
      }}
    />
  );
};

export default MonthlyBarChart;
