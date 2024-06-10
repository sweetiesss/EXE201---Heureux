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

export default function DotnutCharComps({ className }) {
  const getTextColor = window
    .getComputedStyle(document.documentElement)
    .getPropertyValue("--task-progress-text-color");
  const getNonePercentColor = window
    .getComputedStyle(document.documentElement)
    .getPropertyValue("--task-progress-none-background-color");
  const parentStyle = {
    background: "var(--task-progress-background-color)",
    borderRadius: "5%",
    padding: "1rem",
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
        display: false,
      },
      tooltip:{
        enabled:false,
      },
      title: {
        display: true,
        text: "Task progess",
        color: getTextColor,
        font: {
          size: 18,
        },
        padding:{
          top:0,
          bottom:10
        },
      },
      border: {
        display: false,
      },
    },
    // scales: {
    //   x: {
    //     ticks: {
    //       color: getTextColor,
    //       font: {
    //         weight: "bolder",
    //         size:18
    //       },
    //     },
    //     display: true,
    //     border: {
    //       display: true,
    //       dash: [10, 10],
    //       dashOffset: 1,
    //       width: 0,
    //     },
    //     grid: {
    //       lineWidth: 2,
    //     },
    //   },
    //   y: {
    //     display: false,
    //     beginAtZero: true,
    //   },
    // },
  };

  const percentage = 50;
  const toDay= format(new Date(), 'dd/MM');
  
//   const showDay=toDay.getDate()+'/'+toDay.getMonth();
  return (
    <div
      style={parentStyle}
      className={`${
        className && className
      } shadow-xl flex justify-center pb-[1rem]  relative`}
    >
      <div className={`absolute m-auto flex flex-col top-[50%] -translate-y-[25%] items-center `} style={{color:getTextColor}}>
        <p className="text-lg font-semibold">{percentage && percentage}%</p>
        <p className="" style={{fontSize:"0.9rem"}}>{toDay&&toDay}</p>
      </div>
      <Doughnut data={data} options={options}/>
    </div>
  );
}
