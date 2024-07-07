import { useEffect, useRef, useState } from "react";
import RocketColoredShort from "../../assets/icon/ShortRocket.png";
import {
  PiChatDots,
  PiListBullets,
  PiCheckCircleFill,
  PiXCircleFill,
  PiPlusCircleFill,
  PiCheckCircleBold,
  PiCoffeeFill,
  PiPlus,
  PiPlusCircleBold,
  PiWarningBold,
} from "react-icons/pi";

import { useGSAP } from "@gsap/react";

import "../../styles/Task.css";
import "../../styles/Scrollbar.css";
import { SimpleProgressBar } from "../sharing/ProgressBar";
import { formatDistance, formatDistanceToNowStrict } from "date-fns";

export function ReportBoxShort({
  title,
  newClassName,
  commentNum,
  submitionNum,
  date,
  img,
  bgColor,
  textColor,
  arrayOfContent,
  dateCreate,
  isOpen,
}) {
  const boxStyle = isOpen
    ? {
        "--backgroundColor": `var(--${bgColor ? bgColor : "report_color"})`,
        "--textColor": `var(--${textColor ? textColor : "report_textColor"})`,
        "--dateTimeColor": `var(--${
          textColor ? textColor : "report_dateTime_color"
        })`,
      }
    : {
        "--backgroundColor": `var(--report_color_notOpened)`,
        "--textColor": `black`,
        "--dateTimeColor": `var(--report_dateTime_color_notOpened)`,
      };

  const monthFormatter = new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "2-digit",
  });
  const monthNameShort = monthFormatter.format(dateCreate);

  const timeFormatter = new Intl.DateTimeFormat("en-US", {
    hour: "2-digit",
    minute: "2-digit",
  });
  const timeDateShort = timeFormatter.format(dateCreate);
  return (
    <div
      className={`${
        newClassName && newClassName
      } min-w-[13rem] flex relative justify-end min-h-[8rem] rounded-xl bg-[var(--backgroundColor)]`}
      style={boxStyle}
    >
      <img
        src={RocketColoredShort}
        className="h-full w-auto absolute overflow-auto left-0"
        style={isOpen ? {} : { filter: "grayscale(100%)" }}
      />
      <div className="mr-[1rem] my-[0.5rem] flex flex-col justify-between">
        <div>
          <p
            className="font-bold"
            style={{
              color: "var(--textColor)",
            }}
          >
            {title}
          </p>
          <div>
            {arrayOfContent ? (
              <div className="flex w-full justify-between mt-[0.3rem]">
                <div className="flex items-center">
                  <div
                    className="bg-white rounded-full text-xs p-1"
                    style={{
                      color: `var(--${
                        textColor ? textColor : "report-textColror"
                      })`,
                    }}
                  >
                    <PiChatDots />
                  </div>
                  {arrayOfContent?.comment && (
                    <div className="ml-[0.2rem] text-xs">
                      {arrayOfContent?.comment}
                    </div>
                  )}
                </div>
                <div className="flex items-center">
                  <div
                    className="bg-white rounded-full text-xs p-1"
                    style={{
                      color: `var(--${
                        textColor ? textColor : "report-textColror"
                      })`,
                    }}
                  >
                    <PiListBullets />
                  </div>

                  {arrayOfContent?.submited && (
                    <div className="ml-[0.2rem] text-xs">
                      {arrayOfContent?.submited}
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <p className="text-sm mt-[0.5rem] text-gray-500">Not yet</p>
            )}
          </div>
        </div>

        <div className="flex flex-col items-end text-xs text-[var(--dateTimeColor)]">
          <p className="text-xs">{monthNameShort && monthNameShort}</p>
          <p className="text-sm">{timeDateShort && timeDateShort}</p>
        </div>
      </div>
    </div>
  );
}

export function ReportBoxLong({
  title,
  newClassName,
  commentNum,
  submitionNum,
  date,
  img,
  bgColor,
  textColor,
  arrayOfContent,
  dateCreate,
  isOpen,
  percentage,
  percentageColor,
}) {
  const boxStyle = isOpen
    ? {
        "--backgroundColor": `var(--${bgColor ? bgColor : "report_color"})`,
        "--textColor": `var(--${textColor ? textColor : "report_textColor"})`,
        "--dateTimeColor": `var(--${
          textColor ? textColor : "report_dateTime_color"
        })`,
      }
    : {
        "--backgroundColor": `var(--report_color_notOpened)`,
        "--textColor": `black`,
        "--dateTimeColor": `var(--report_dateTime_color_notOpened)`,
      };

  const monthFormatter = new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "2-digit",
  });
  const monthNameShort = monthFormatter.format(dateCreate);
  var monthUsed = [];
  if (monthNameShort) {
    monthUsed = monthNameShort.split(" ");
  }

  return (
    <div
      className={`${
        newClassName && newClassName
      } min-w-[13rem] flex relative justify-start min-h-[13rem] rounded-xl bg-[var(--backgroundColor)] text-[--textColor] pr-[1rem]`}
      style={boxStyle}
    >
      <img
        src={RocketColoredShort}
        className="h-full w-auto absolute overflow-auto left-0"
        style={isOpen ? {} : { filter: "grayscale(100%)" }}
      />
      <div className="ml-[10rem] flex flex-col h-[80%] w-[60%] mt-[1rem] pr-[1rem]">
        <div className="font-semibold text-2xl">Proposal: RESEARCH</div>
        <div className="max-h-[3.3rem] overflow-y-hidden scrollball-nonBackground mt-[1rem]">
          This is firt report of the subect, make sure that you are complete
          it.This is firt report of the subect, make sure that you are complete
          it.
        </div>
        <div className="flex items-center  mt-[0.5rem]">
          <div className="w-fit mr-[0.5rem]">
            <div
              className="bg-white rounded-full p-[5px] text-base"
              style={{
                color: `var(--${textColor ? textColor : "report-textColror"})`,
              }}
            >
              <PiListBullets />
            </div>
          </div>
          <div>2</div>
        </div>
      </div>
      <div className="flex flex-col items-center mt-[1rem]">
        <div className="w-[4rem] h-[4rem] bg-white text-center pt-[1rem] text-3xl rounded-xl text">
          {monthUsed.length != 0 && monthUsed[1]}
        </div>
        <div className="text-xl mt-[0.5rem]">
          {monthUsed.length != 0 && monthUsed[0]}
        </div>
      </div>
      <div className="absolute -bottom-[2rem] pl-[7rem] pr-[2rem] w-full">
        <SimpleProgressBar percentage={percentage} bgColor={percentageColor} />
      </div>
    </div>
  );
}

export function TasksHolderComps({
  newClassName,
  arrayOfContent,
  textColor,
  taskTitle,
}) {
  const taskContainer = useRef();
  const [centered, setCentered] = useState(0);
  const [data, setData] = useState([]);

  const boxStyle = {};
  const documetFontSize = window.getComputedStyle(
    document.documentElement
  ).fontSize;
  let fontSize = 16;
  if (documetFontSize) {
    fontSize = parseFloat(documetFontSize);
  }

  useEffect(() => {
    setData(arrayOfContent || []);
  }, [arrayOfContent]);
 

  function TaskBoxContainer({ title, status }) {
    var bgColor = "#F1F2F4";
    var fontColor = "rgb(0,0,0)";
    var Icon = "";
    var statusTitle = "";
    if (status) {
      if (status === "Success") {
        bgColor = "rgb(13,203,61)";
        fontColor = "rgb(255,255,255)";
        Icon = PiCheckCircleBold;
        statusTitle = "Complete";
      } else if (status === "OnGoing") {
        bgColor = "rgb(255,192,0)";
        fontColor = "rgb(255,255,255)";
        Icon = PiCoffeeFill;
        statusTitle = "OnGoing";
      } else if (status === "Urgent") {
        bgColor = "rgb(255,0,0)";
        fontColor = "rgb(255,255,255)";
        Icon = PiWarningBold;
        statusTitle = "Urgent";
      } else {
        bgColor = "rgb(255,0,0)";
        fontColor = "rgb(255,255,255)";
        Icon = PiWarningBold;
        statusTitle = "ERROR";
      }
    }
    return (
      <div
        className="flex justify-center rounded-xl px-[0.5rem] items-center opacity-70"
        style={{ backgroundColor: bgColor, color: fontColor }}
      >
        <Icon className="mr-[0.3rem] text-xs" />
        <p className=" text-xs">{statusTitle}</p>
      </div>
    );
  }

  return (
    <div
      className={`${
        newClassName && newClassName
      } min-w-[15.5rem] bg-[#ffe5d4]  w-auto flex flex-col relative min-h-[10.5rem] rounded-xl bg-[var(--backgroundColor)] overflow-hidden`}
      style={boxStyle}
    >
      <div className="h-[2.5rem] bg-orange-500 w-full text-white px-[2rem] flex items-center ">
        <p className="overflow-hidden text-nowrap text-ellipsis w-full">
          {taskTitle ? taskTitle : "Tasks"}
        </p>
      </div>
      <div className="relative w-full" ref={taskContainer}>
        {data ? (
          data.map((box, index) => (
            <div
              key={index}
              className={`bg-white absolute task   ${
                centered === index
                  ? "task-center"
                  : centered - 1 === index && centered - 1 >= 0
                  ? "task-top"
                  : centered + 1 === index && centered + 1 <= data.length
                  ? "task-bottom"
                  : "hidden"
              } transition-all  min-h-[3rem] px-[0.5rem] py-[0.3rem] rounded-xl shadow-xl`}
              onClick={(e) => setCentered(index)}
            >
              <div className="flex justify-between items-center">
                <p>{box?.name}</p>
                <p
                  className="text-gray-700"
                  style={{ fontSize: "0.6rem", lineHeight: "1rem" }}
                >
                  {new Date(
                    box?.endDate.split("-")[0],
                    box?.endDate.split("-")[1] - 1,
                    box?.endDate.split("-")[2]
                  ) < new Date()
                    ? `${formatDistanceToNowStrict(
                        new Date(
                          box?.endDate.split("-")[0],
                          box?.endDate.split("-")[1] - 1,
                          box?.endDate.split("-")[2]
                        )
                      )} ago`
                    : `${formatDistanceToNowStrict(
                        new Date(
                          box?.endDate.split("-")[0],
                          box?.endDate.split("-")[1] - 1,
                          box?.endDate.split("-")[2]
                        )
                      )} left`}
                </p>
              </div>
              <div className="flex justify-between">
                <div className="flex">
                  <PiXCircleFill className="text-red-500 text-2xl" />
                  <p className="text-sm opacity-50">{box?.assignee}</p>
                </div>
                <div className="flex">
                  <TaskBoxContainer status={box?.status} />
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="flex  text-center items-center justify-center mt-[3rem]">
            <h2>No task here</h2>
            <PiPlusCircleFill className="text-green-500 text-2xl ml-[1rem]" />
          </div>
        )}
      </div>
    </div>
  );
}
