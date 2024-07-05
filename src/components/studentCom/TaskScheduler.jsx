import {
  format,
  addMonths,
  subMonths,
  startOfWeek,
  addDays,
  differenceInDays,
  isSameDay,
  isBefore,
  isAfter,
  addWeeks,
  startOfMonth,
} from "date-fns";
import { useEffect, useState } from "react";
import "../../styles/Scheduler.css";
import { PiCaretLeftBold, PiCaretRightBold } from "react-icons/pi";

export default function TaskScheduler() {
  const currentDate = new Date();
  const [currentMonth, setCurrentMonth] = useState(currentDate);
  const [currentWeek, setCurrentWeek] = useState(startOfWeek(currentDate));
  const [daysOfWeek, setDaysOfWeek] = useState([]);
  const cloneEvents = [
    { startDate: "2024-07-01", endDate: "2024-09-30" },
    { startDate: "2024-07-10", endDate: "2024-10-30" },
    { startDate: "2024-07-03", endDate: "2024-10-30" },
  ];
  const usedColor = ["#36a2eb ", "#fa6e9b", "#ff9347"];

  const todayDay = format(currentDate, "eee-dd-MM-yy");
  const todayMonth = format(currentDate, "MMMM yyyy");

  const matchColor = window
    .getComputedStyle(document.documentElement)
    .getPropertyValue("--login_button");

  useEffect(() => {
    const getWeekDays = (date) => {
      const start = startOfWeek(date);
      return Array.from({ length: 7 }).map((_, i) =>
        format(addDays(start, i), "eee-dd-MM-yy")
      );
    };
    setDaysOfWeek(getWeekDays(currentWeek));
  }, [currentWeek, currentMonth]);

  const changeWeek = (weeks) => {
    setCurrentWeek((prev) => addWeeks(prev, weeks));
  };
  const handlePreviousWeek = (e) => {
    e.preventDefault();
    changeWeek(-1);
  };

  const handleNextWeek = (e) => {
    e.preventDefault();
    changeWeek(1);
  };

  const changeMonth = (months) => {
    setCurrentMonth((prev) => {
      const newMonth = addMonths(prev, months);
      const newWeek = startOfWeek(startOfMonth(newMonth));
      setCurrentWeek(newWeek);
      return newMonth;
    });
  };

  const getFormattedMonth = (date) => format(date, "MMMM yyyy");

  const handlePreviousMonth = (e) => {
    e.preventDefault();
    changeMonth(-1);
  };

  const handleNextMonth = (e) => {
    e.preventDefault();
    changeMonth(1);
  };
  const getTaskPositionAndWidth = (startDate, endDate) => {
    const startOfCurrentWeek = startOfWeek(currentWeek);
    const endOfCurrentWeek = addDays(startOfCurrentWeek, 6);

    const startDateObj = new Date(startDate);
    const endDateObj = new Date(endDate);

    if (
      isBefore(endDateObj, startOfCurrentWeek) ||
      isAfter(startDateObj, endOfCurrentWeek)
    ) {
      return null;
    }

    const startIndex = differenceInDays(startDateObj, startOfCurrentWeek);
    const endIndex = differenceInDays(endDateObj, startOfCurrentWeek);

    const taskStartIndex = Math.max(startIndex, 0);
    const taskEndIndex = Math.min(endIndex, 6);

    const position = (taskStartIndex / 7) * 100;
    const width = ((taskEndIndex - taskStartIndex + 1) / 7) * 100;
    console.log(position);

    return { position, width };
  };

  return (
    <div className="bg-[var(--liner-day-chart-background-color)] w-full rounded-xl shadow-xl h-[20rem] flex flex-col text-[var(--liner-day-chart-font-color)]">
      <div className="h-[5rem] border-b-[0.2rem] border-black border-[var(--liner-day-chart-font-color)] flex justify-between items-center px-[2rem]">
        <div
          className="flex items-center hover:cursor-pointer"
          onClick={handlePreviousMonth}
        >
          <PiCaretLeftBold className="text-black text-xl" />
          <div className="text-black">
            {/* {getFormattedMonth(subMonths(currentWeek, 1))[0]}  */}
            {format(currentWeek, "MMM d")}
          </div>
        </div>
        <div
          className="text-2xl"
          style={
            getFormattedMonth(currentWeek) === todayMonth
              ? { color: "var(--login_button)", fontWeight: "bold" }
              : {}
          }
        >
          {format(currentWeek, "MMM")}
        </div>
        <div
          className="flex items-center hover:cursor-pointer"
          onClick={handleNextMonth}
        >
          <div className="text-black">
            {format(addWeeks(currentWeek, 1), "MMM d")}
          </div>
          <PiCaretRightBold className="text-black text-xl" />
        </div>
      </div>
      <div className="flex justify-between py-[1rem] px-[2rem] h-[14rem]">
        <div
          className="h-full flex items-center text-2xl bg-white rounded-xl shadow-md drop cursor-pointer"
          onClick={handlePreviousWeek}
        >
          <PiCaretLeftBold />
        </div>
        <div className="flex justify-between w-[88%]  relative">
          {daysOfWeek &&
            daysOfWeek.map((item, index) => {
              const date = item.split("-");
              return (
                <div
                  className={`flex flex-col items-center`}
                  style={
                    item === todayDay
                      ? { color: "var(--login_button)", fontWeight: "bold" }
                      : {}
                  }
                  key={index}
                >
                  <div>{date[0]}</div>
                  <div>{date[1]}</div>
                  {index < 7 && (
                    <div className="h-full border-r-[0.15rem] border-black opacity-[0.2] border-dashed"></div>
                  )}
                </div>
              );
            })}
          {cloneEvents.slice(0, 3).map((event, index) => {
            const { position, width } =
              getTaskPositionAndWidth(event.startDate, event.endDate) || {};
            if (position === undefined || width === undefined) return null;
            return (
              <div
                key={index}
                className="absolute h-[2rem]  rounded-md z-20 "
                style={{
                  left: `${position}%`,
                  width: `${width}%`,
                  transform: "translateY(-50%)",
                  top: `${index * 20 + 40}%`,
                  backgroundColor: `${usedColor[index]}`,
                }}
              />
            );
          })}
        </div>

        <div
          className="h-full flex items-center text-2xl bg-white rounded-xl shadow-md drop cursor-pointer"
          onClick={handleNextWeek}
        >
          <PiCaretRightBold />
        </div>
      </div>
    </div>
  );
}
