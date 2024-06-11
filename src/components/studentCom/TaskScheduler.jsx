import { format, addMonths, subMonths, startOfWeek, addDays } from "date-fns";
import { useEffect, useState } from "react";
import "../../styles/Scheduler.css";
import { PiCaretLeftBold, PiCaretRightBold } from "react-icons/pi";
export default function TaskScheduler() {
  const currentDate = new Date();
  const [showCurrentDate, setShowCurrentDate] = useState(currentDate);
  const [monthGap, setMonthGap] = useState(1);
  const [showPreviousMonth, setShowPreviousMonth] = useState(() =>
    format(subMonths(currentDate, 1), "MMMM yyyy").split(" ")
  );
  const [showCurrentMonth, setShowCurrentMonth] = useState(() =>
    format(currentDate, "MMMM yyyy").split(" ")
  );
  const [showNextMonth, setShowNextMonth] = useState(() =>
    format(addMonths(currentDate, 1), "MMMM yyyy").split(" ")
  );
  const [daysAWeek, setDaysAWeek] = useState([]);

  useEffect(() => {
    setShowPreviousMonth(() =>
      format(subMonths(currentDate, monthGap), "MMMM yyyy").split(" ")
    );
    setShowCurrentMonth(() =>
      format(subMonths(currentDate, monthGap - 1), "MMMM yyyy").split(" ")
    );
    setShowNextMonth(() =>
      format(subMonths(currentDate, monthGap - 2), "MMMM yyyy").split(" ")
    );
  }, [monthGap]);

  useEffect(() => {
    const getWeekDays = (date) => {
      const start = startOfWeek(date);

      const days = Array.from({ length: 7 }).map((_, i) => {
        return format(addDays(start, i), "eee-dd");
      });

      return days;
    };
    setDaysAWeek(getWeekDays(currentDate));
  }, [showCurrentDate]);

  const previousMonth = (e) => {
    e.preventDefault();

    const pM = document.getElementById("PREVIOUSMOTNH");
    if (pM) pM.style.animation = "previousToCurrent 0.2s ";
    const cM = document.getElementById("CURRENTMONTH");
    if (cM) cM.style.animation = "currentToNext 0.2s ";
    const nM = document.getElementById("NEXTMONTH");
    if (nM) nM.style.animation = "nextToGone 0.2s ";
    const handleAnimationEnd = () => {
      pM.style.animation = "";
      cM.style.animation = "";
      nM.style.animation = "";
      pM.removeEventListener("animationend", handleAnimationEnd);
      setMonthGap((prev) => prev + 1);
    };

    pM.addEventListener("animationend", handleAnimationEnd);
  };
  const nextMonth = (e) => {
    e.preventDefault();

    const pM = document.getElementById("PREVIOUSMOTNH");
    if (pM) pM.style.animation = "previousToGone 0.2s ";
    const cM = document.getElementById("CURRENTMONTH");
    if (cM) cM.style.animation = "currentToPrevious 0.2s ";
    const nM = document.getElementById("NEXTMONTH");
    if (nM) nM.style.animation = "nextToCurrent 0.2s ";
    const handleAnimationEnd = () => {
      pM.style.animation = "";
      cM.style.animation = "";
      nM.style.animation = "";
      pM.removeEventListener("animationend", handleAnimationEnd);
      setMonthGap((prev) => prev - 1);
    };

    pM.addEventListener("animationend", handleAnimationEnd);
  };

  console.log(daysAWeek);

  return (
    <div className="bg-[var(--liner-day-chart-background-color)] w-full rounded-xl shadow-xl h-[19rem] flex flex-col text-[var(--liner-day-chart-font-color)]">
      <div className="h-[5rem] border-b-[0.2rem] border-black border-[var(--liner-day-chart-font-color)] flex justify-between items-center px-[2rem]">
        <div
          className="flex items-center  hover:cursor-pointer"
          onClick={previousMonth}
        >
          <PiCaretLeftBold className="text-black text-xl" />
          <div className="text-black" id="PREVIOUSMOTNH">
            {showPreviousMonth[0]}
          </div>
        </div>
        <div className="text-2xl" id="CURRENTMONTH">
          {showCurrentMonth[0]}
        </div>
        <div
          className="flex items-center hover:cursor-pointer"
          onClick={nextMonth}
        >
          <div className="text-black " id="NEXTMONTH">
            {showNextMonth[0]}
          </div>
          <PiCaretRightBold className="text-black text-xl" />
        </div>
      </div>
      <div className="flex justify-between py-[1rem] px-[2rem] h-[14rem]">
        <div className="h-full flex items-center text-2xl bg-white rounded-xl shadow-md drop bg"><PiCaretLeftBold/></div>
        {daysAWeek &&
          daysAWeek.map((item) => {
            const date = item.split("-");
            return (
              <div className="flex flex-col items-center">
                <div>{date[0]}</div>
                <div>{date[1]}</div>
                <div className="h-full border-r-[0.15rem] border-black opacity-[0.2] border-dashed"></div>
              </div>
            );
          })}
        <div className="h-full flex items-center text-2xl bg-white rounded-xl shadow-md drop bg"><PiCaretRightBold/></div>
      </div>
    </div>
  );
}
