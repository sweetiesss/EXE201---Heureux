import "../../styles/Task.css";
import {
  PiCheckCircleBold,
  PiCoffeeFill,
  PiPlus,
  PiPlusCircleBold,
  PiWarningBold,
} from "react-icons/pi";
import "../../styles/Scrollbar.css";
import APIServices from "../../services/APIServices.ts";
import { useCallback, useContext, useEffect, useState } from "react";
import { RefrestApi } from "../../pages/authorizedPages/student/StudentHome.jsx";
import { isAfter, isBefore } from "date-fns";
import { debounce } from 'lodash';

function TaskBoxContainer({ taskColorShow, item, clicking }) {
  let bgColor = "#F1F2F4";
  let fontColor = "rgb(0,0,0)";
  let IconComponent = null;
  let statusTitle = "";

  if (item?.status) {
    switch (item.status) {
      case "Success":
        bgColor = "rgb(13,203,61)";
        fontColor = "rgb(255,255,255)";
        IconComponent = PiCheckCircleBold;
        statusTitle = "Complete";
        break;
      case "OnGoing":
        bgColor = "rgb(255,192,0)";
        fontColor = "rgb(255,255,255)";
        IconComponent = PiCoffeeFill;
        statusTitle = "OnGoing";
        break;
      case "Urgent":
        bgColor = "rgb(255,0,0)";
        fontColor = "rgb(255,255,255)";
        IconComponent = PiWarningBold;
        statusTitle = "Urgent";
        break;
      default:
        bgColor = "rgb(255,0,0)";
        fontColor = "rgb(255,255,255)";
        IconComponent = PiWarningBold;
        statusTitle = "ERROR";
        break;
    }
  }

  return (
    <div
      className="w-[80%] h-fit rounded-2xl shadow-lg flex flex-col my-[1rem]"
      style={{ backgroundColor: taskColorShow }}
    >
      {item?.status && (
        <div
          className="rounded-t-2xl w-full py-[0.5rem] px-[1rem] flex items-center cursor-pointer"
          style={{ backgroundColor: bgColor, color: fontColor }}
          onClick={clicking}
        >
          {IconComponent && <IconComponent className="mr-[1rem] text-xl" />}
          {statusTitle}
        </div>
      )}
      <div className="my-[1rem] mx-[1rem] h-full">
        {item?.name && item?.name}
      </div>
    </div>
  );
}

export function TaskHolderComps({
  className,
  sectionName,
  titleColor,
  bodyColor,
  taskColor,
  arrayList,
}) {
  const taskColorShow = taskColor ? taskColor : "#FFFFFF";
  const titleColorShow = titleColor ? titleColor : "#F1F2F4";
  const bodyColorShow = bodyColor ? bodyColor : "#F1F2F4";
  const refreshAPI = useContext(RefrestApi);
  const [dataArray, setDataArray] = useState();

  useEffect(() => {
    setDataArray(arrayList || []);
  }, [arrayList]);

  const upDateTaskStatus  =async (item,e) => {
    e.preventDefault();

    try {
      let submitform = item;
      if (submitform?.status !== "Success") {
        submitform = { ...submitform, status: "Success" };
      } else {
        const endDate = submitform?.endDate.split("-");
        const endDateDay = new Date(endDate[0], endDate[1] + 1, endDate[2]);
        if (isAfter(endDateDay, new Date())) {
          submitform = { ...submitform, status: "Urgent" };
        } else if (isBefore(endDateDay, new Date())) {
          submitform = { ...submitform, status: "OnGoing" };
        }
      }
      console.log(submitform);
      await APIServices.putAPI("/class-service/task", submitform);
      refreshAPI?.refreshing();
    } catch (e) {
      console.log(e);
    }
  };

  const debouncedUpdateTaskStatus = useCallback(debounce(upDateTaskStatus, 500), [refreshAPI]);

  return (
    <div
      className={`h-full w-[30%] min-w-[30%] mr-[2rem] p-[2rem] ${className}`}
    >
      <div
        className="h-[4rem] w-full rounded-t-2xl flex items-center px-[2rem] shadow-lg"
        style={{ backgroundColor: titleColorShow }}
      >
        {sectionName ? (
          sectionName
        ) : (
          <div className="flex items-center font-semibold">
            <PiPlus className="mr-[1rem]" /> Add Section
          </div>
        )}
      </div>
      <div
        className="h-fit flex flex-col w-full items-center max-h-[80%] overflow-y-scroll scrollball-nonBackground"
        style={{ backgroundColor: bodyColorShow }}
      >
        {dataArray &&
          dataArray.map((item, index) => (
            <TaskBoxContainer
              taskColorShow={taskColorShow}
              key={index}
              item={item}
              clicking={(e) => debouncedUpdateTaskStatus(item,e)}
            />
          ))}
      </div>
      <div
        className="h-[3rem] w-full rounded-b-2xl flex items-center px-[2rem] shadow-lg"
        style={{ backgroundColor: bodyColorShow }}
      >
        <button
          className="flex justify-center items-center"
          onClick={() => console.log("222")}
        >
          Add task <PiPlusCircleBold className="ml-[0.5rem]" />
        </button>
      </div>
    </div>
  );
}

export function AddSectionTab({ addSectionClicked }) {
  const titleColorShow = "rgb(209,219,255)";

  return (
    <div className={`h-full w-[30%] min-w-[30%] mr-[2rem] p-[2rem]`}>
      <div
        className="h-[4rem] w-full rounded-2xl flex items-center shadow-lg overflow-hidden"
        style={{ backgroundColor: titleColorShow }}
      >
        <button
          className="flex pl-[2rem] items-center overflow-hidden font-semibold w-full h-full"
          onClick={addSectionClicked}
        >
          <PiPlus className="mr-[1rem]" /> Add Section
        </button>
      </div>
    </div>
  );
}
