import PropTypes from "prop-types";
import { useState, useEffect } from "react";

// material-ui
import { useTheme } from "@mui/material/styles";

// third-party
import Chart from "react-apexcharts";

// chart options
const areaChartOptions = {
  chart: {
    height: 450,
    type: "area",
    toolbar: {
      show: false,
    },
  },
  dataLabels: {
    enabled: false,
  },
  stroke: {
    curve: "smooth",
    width: 2,
  },
  grid: {
    strokeDashArray: 0,
  },
};

// ==============================|| INCOME AREA CHART ||============================== //

const IncomeAreaChart = ({ slot, monthlySales, dailySales, months, days }) => {
  const theme = useTheme();
  const { primary, secondary } = theme.palette.text;
  const line = theme.palette.divider;

  const [options, setOptions] = useState(areaChartOptions);

  useEffect(() => {
    setOptions((prevState) => ({
      ...prevState,
      colors: [theme.palette.primary.main, theme.palette.primary[700]],
      xaxis: {
        categories:
          slot === "month"
            ? [...months]
            : [...days],
        labels: {
          style: {
            colors: [
              secondary,
              secondary,
              secondary,
              secondary,
              secondary,
              secondary,
              secondary,
              secondary,
              secondary,
              secondary,
              secondary,
              secondary,
            ],
          },
        },
        axisBorder: {
          show: true,
          color: line,
        },
        tickAmount: slot === "month" ? 11 : 7,
      },
      yaxis: {
        labels: {
          style: {
            colors: [secondary],
          },
        },
      },
      grid: {
        borderColor: line,
      },
      tooltip: {
        theme: "light",
      },
    }));
  }, [primary, secondary, line, theme, slot, days, months, dailySales, monthlySales]);

  const [series, setSeries] = useState([
    {
      name: "Sales",
      data:
          slot === "month"
            ? [0,0,0,0,0,0,0,0,0,0,0,0]
            : [0,0,0,0,0,0,0,0,0,0,0,0],
    }
  ]);
  useEffect(() => {
    setSeries([
      {
        name: "Sales",
        data:
          slot === "month"
            ? [...monthlySales]
            : [...dailySales],
      }
    ]);
  }, [slot, days, months, dailySales, monthlySales]);

  return (
    <Chart
      options={options}
      series={series}
      type="area"
      height={450}
      style={{
        backgroundColor: "white",
        borderRadius: "15px",
        border: "1px solid #cccccc",
        boxShadow: "1px 3px 6px 0px #00000017"
      }}
    />
  );
};

IncomeAreaChart.propTypes = {
  slot: PropTypes.string,
};

export default IncomeAreaChart;
