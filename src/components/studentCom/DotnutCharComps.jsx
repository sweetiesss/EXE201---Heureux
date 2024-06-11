import { Doughnut } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { format } from "date-fns";

ChartJS.register(CategoryScale, ArcElement, Title, Tooltip, Legend);

export default function DotnutCharComps({
  className,
  textColor,
  backgroundColor,
  isTitle,
  isLegend,
}) {
  const getTextColor = window
    .getComputedStyle(document.documentElement)
    .getPropertyValue("--task-progress-text-color");
  const getNonePercentColor = window
    .getComputedStyle(document.documentElement)
    .getPropertyValue("--task-progress-none-background-color");
  const parentStyle = {
    background: "var(--task-progress-background-color)",
    borderRadius: "5%",
  };

  const data = {
    labels: ["Red", "main"],
    datasets: [
      {
        label: "My First Dataset",
        data: [50, 50],
        backgroundColor: [getTextColor, getNonePercentColor],
        borderColor: [getTextColor, getNonePercentColor],
        hoverOffset: 4,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    cutout: "80%",

    plugins: {
      legend: {
        display: isLegend,
        position: "bottom",
        labels:{
          padding:30
        }
      },
      tooltip: {
        enabled: false,
      },
      title: {
        display: isTitle,
        text: "Task progess",
        color: getTextColor,
        font: {
          size: 18,
        },
        padding: {
          top: 0,
          bottom: 10,
        },
      },
      border: {
        display: false,
      },
    },
  };

  const percentage = 50;
  const toDay = format(new Date(), "dd/MM");

  //   const showDay=toDay.getDate()+'/'+toDay.getMonth();
  return (
    <div
      style={parentStyle}
      className={`${
        className && className
      } shadow-xl flex justify-center  relative`}
    >
      <Doughnut data={data} options={options} />
      <div
        className={`absolute m-auto flex flex-col top-[50%]  ${isLegend?" -translate-y-[50%]":" -translate-y-[15%]"}  left-0 right-0 items-center `}
        style={{ color: getTextColor }}
      >
        <p className="text-lg font-semibold">{percentage && percentage}%</p>
        <p className="" style={{ fontSize: "0.9rem" }}>
          {toDay && toDay}
        </p>
      </div>
    </div>
  );
}
