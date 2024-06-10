import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export default function LineChartComps() {
  const getTextColor = window
    .getComputedStyle(document.documentElement)
    .getPropertyValue("--liner-day-chart-font-color");
  const parentStyle = {
    width: "26rem",
    height: "15rem",
    background: "var(--liner-day-chart-background-color)",
    borderRadius: "5%",
    padding: "1rem",
  };

  const data = {
    labels: [
      ["Mon", "01"],
      ["Tue", "02"],
      ["Wed", "03"],
      ["Thu ", "04"],
      ["Fri", "05"],
      ["Sat", "06"],
      ["Sun", "07"],
    ],
    datasets: [
      {
        label: "Work time",
        data: [3, 5, 2, 4, 3, 4, 6], // Example data, adjust as needed
        fill: false,
        backgroundColor: "rgba(54, 162, 235, 0.2)",
        borderColor: "rgba(54, 162, 235, 1)",
        tension: 0.4, // Adjusts the curve of the line
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: true,
        text: "Work time",
        color: getTextColor,
        padding: {
          bottom: 20,
        },
        font: {
          size: 20,
        },
      },
    },
    scales: {
      x: {
        ticks: {
          color: getTextColor,
          font: {
            weight: "bolder",
            size:18
          },
        },
        display: true,
        border: {
          display: true,
          dash: [10, 10],
          dashOffset: 1,
          width: 0,
        },
        grid: {
          lineWidth: 2,
        },
      },
      y: {
        display: false,
        beginAtZero: true,
      },
    },
  };

  return (
    <div style={parentStyle} className="shadow-xl">
      <Line data={data} options={options} />
    </div>
  );
}
