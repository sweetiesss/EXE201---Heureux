import { format, addMonths, subMonths, startOfWeek, addDays } from "date-fns";
import { useEffect, useState } from "react";
import "../../styles/Scheduler.css";
import { PiCaretLeftBold, PiCaretRightBold } from "react-icons/pi";

export default function TaskScheduler() {
  const currentDate = new Date();
  const [currentMonth, setCurrentMonth] = useState(currentDate);
  const [daysOfWeek, setDaysOfWeek] = useState([]);

 const todayDay=format(currentDate,"eee-dd");
  const todayMonth=format(currentDate,"MMMM yyyy").split(" ");

  const matchColor = window
    .getComputedStyle(document.documentElement)
    .getPropertyValue("--login\_button");

  useEffect(() => {
    const getWeekDays = (date) => {
      const start = startOfWeek(date);
      return Array.from({ length: 7 }).map((_, i) => format(addDays(start, i), "eee-dd"));
    };
    setDaysOfWeek(getWeekDays(currentMonth));
  }, [currentMonth]);

  const changeMonth = (months) => {
    setCurrentMonth((prev) => addMonths(prev, months));
  };

  const getFormattedMonth = (date) => format(date, "MMMM yyyy").split(" ");

  const handlePreviousMonth = (e) => {
    e.preventDefault();
    changeMonth(-1);
  };

  const handleNextMonth = (e) => {
    e.preventDefault();
    changeMonth(1);
  };

  return (
    <div className="bg-[var(--liner-day-chart-background-color)] w-full rounded-xl shadow-xl h-[20rem] flex flex-col text-[var(--liner-day-chart-font-color)]">
      <div className="h-[5rem] border-b-[0.2rem] border-black border-[var(--liner-day-chart-font-color)] flex justify-between items-center px-[2rem]">
        <div className="flex items-center hover:cursor-pointer" onClick={handlePreviousMonth}>
          <PiCaretLeftBold className="text-black text-xl" />
          <div className="text-black">{getFormattedMonth(subMonths(currentMonth, 1))[0]}</div>
        </div>
        <div className="text-2xl" style={ getFormattedMonth(currentMonth)[0]===todayMonth[0]?{color:"var(--login\_button)",fontWeight:"bold"}:{}}>{getFormattedMonth(currentMonth)[0]}</div>
        <div className="flex items-center hover:cursor-pointer" onClick={handleNextMonth}>
          <div className="text-black">{getFormattedMonth(addMonths(currentMonth, 1))[0]}</div>
          <PiCaretRightBold className="text-black text-xl" />
        </div>
      </div>
      <div className="flex justify-between py-[1rem] px-[2rem] h-[14rem]">
        <div className="h-full flex items-center text-2xl bg-white rounded-xl shadow-md drop bg">
          <PiCaretLeftBold />
        </div>
        {daysOfWeek &&
          daysOfWeek.map((item, index) => {
            const date = item.split("-");
            return (
              <div className={`flex flex-col items-center`} style={ item===todayDay?{color:"var(--login\_button)",fontWeight:"bold"}:{}} key={index}>
                <div>{date[0]}</div>
                <div>{date[1]}</div>
                {index < 7 && (
                  <div className="h-full border-r-[0.15rem] border-black opacity-[0.2] border-dashed"></div>
                )}
              </div>
            );
          })}
        <div className="h-full flex items-center text-2xl bg-white rounded-xl shadow-md drop bg">
          <PiCaretRightBold />
        </div>
      </div>
    </div>
  );
}
