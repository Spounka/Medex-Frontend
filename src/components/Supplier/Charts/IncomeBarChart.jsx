import { Bar } from "react-chartjs-2";

const MonthlyBarChart = ({dailySales, days }) => {
  const data = {
    labels: [...days],
    datasets: [
      {
        data: [100, 100, 200, 30, 16],
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
