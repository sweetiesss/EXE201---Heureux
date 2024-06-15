// src/Calendar.js
import React, { useState } from "react";
import {
  format,
  addMonths,
  subMonths,
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  addDays,
  isSameMonth,
  isSameDay,
  parse,
  getDay,
} from "date-fns";
import "../../styles/Calendar.css"; // We'll define styles later
import { PiCaretLeftFill, PiCaretRightFill } from "react-icons/pi";

const Calendar = () => {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());
  const today = new Date();

  const renderHeader = () => {
    return (
      <div className="header row mb-[1rem]">
        <div className=" col-start text-3xl text-[var(--login\_button)]">
          <span>{format(currentMonth, "MMMM yyyy")}</span>
        </div>
        <div className="flex w-[25%] justify-between">
          <div
            className=" text-2xl p-[0.2rem] cursor-pointer rounded-full bg-[var(--login\_button)] text-white hover:bg-blue-500 "
            onClick={() => prevMonth()}
          >
            <PiCaretLeftFill />
          </div>
          <div
            className=" text-2xl  p-[0.2rem] cursor-pointer rounded-full bg-[var(--login\_button)] text-white hover:bg-blue-500 "
            onClick={() => nextMonth()}
          >
            <PiCaretRightFill />
          </div>
        </div>
      </div>
    );
  };

  const renderDays = () => {
    const days = [];
    const date = startOfWeek(currentMonth);

    for (let i = 0; i < 7; i++) {
      days.push(
        <div className="col col-center" key={i}>
          {format(addDays(date, i), "eee")}
        </div>
      );
    }

    return <div className="days row">{days}</div>;
  };

  const renderCells = () => {
    const monthStart = startOfMonth(currentMonth);
    const monthEnd = endOfMonth(monthStart);
    const startDate = startOfWeek(monthStart);
    const endDate = endOfWeek(monthEnd);

    const rows = [];
    let days = [];
    let day = startDate;
    let formattedDate = "";

    while (day <= endDate) {
      for (let i = 0; i < 7; i++) {
        formattedDate = format(day, "d");
        const cloneDay = day;
        days.push(
          <div
            className={`col cell ${
              !isSameMonth(day, monthStart)
                ? "disabled"
                : isSameDay(day, selectedDate)
                ? "selected"
                : isSameDay(day, today)
                ? "today"
                : ""
            }`}
            key={day}
            onClick={
              () => onDateClick(cloneDay)
              // console.log(new Date(cloneDay))
            }
          >
            <span className="number">{formattedDate}</span>
            {/* <span className="bg">{formattedDate}</span> */}
          </div>
        );
        day = addDays(day, 1);
      }
      rows.push(
        <div className="row" key={day}>
          {days}
        </div>
      );
      days = [];
    }
    return <div className="body">{rows}</div>;
  };

  const onDateClick = (day) => {
    console.log(day);
    setSelectedDate(new Date(day));
  };

  const nextMonth = () => {
    setCurrentMonth(addMonths(currentMonth, 1));
  };

  const prevMonth = () => {
    setCurrentMonth(subMonths(currentMonth, 1));
  };

  return (
    <div className="calendar">
      {renderHeader()}
      {renderDays()}
      {renderCells()}
    </div>
  );
};

export default Calendar;
