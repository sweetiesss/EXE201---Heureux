import "../../styles/Task.css";
import {
  PiCheckBold,
  PiCheckCircleBold,
  PiCoffeeFill,
  PiPlus,
  PiPlusCircleBold,
  PiWarningBold,
  PiXBold,
} from "react-icons/pi";
import "../../styles/Scrollbar.css";
import { useState } from "react";
export function TaskHolderComps({
  className,
  sectionName,
  titleColor,
  bodyColor,
  taskColor,
  arrayList,
}) {
  const [addSection, openAddSection] = useState(false);
  const taskColorShow = taskColor ? taskColor : "#FFFFFF";
  const titleColorShow = titleColor ? titleColor : "#F1F2F4";
  const bodyColorShow = bodyColor ? bodyColor : "#F1F2F4";
  var Icon = "";
  var statusTitle = "";

  function TaskBoxContainer({ item }) {
    var bgColor = "#F1F2F4";
    var fontColor = "rgb(0,0,0)";
    const upDateTaskStatus = (item) => {
      console.log("Update Task Status called");
      try {
        let submitform = item;
        if (submitform?.status !== "Success") {
          submitform = { ...submitform, status: "Success" };
        }
        console.log(submitform);
      } catch (e) {
        console.log(e);
      }
    };
    if (item?.status) {
      if (item?.status === "Success") {
        bgColor = "rgb(13,203,61)";
        fontColor = "rgb(255,255,255)";
        Icon = PiCheckCircleBold;
        statusTitle = "Complete";
      } else if (item?.status === "OnGoing") {
        bgColor = "rgb(255,192,0)";
        fontColor = "rgb(255,255,255)";
        Icon = PiCoffeeFill;
        statusTitle = "OnGoing";
      } else if (item?.status === "Urgent") {
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
        className="w-[80%] h-fit rounded-2xl shadow-lg flex flex-col my-[1rem]"
        style={{ backgroundColor: taskColorShow }}
      >
        {item?.status && (
          <div
            className=" rounded-t-2xl w-full py-[0.5rem] px-[1rem] flex items-center cursor-pointer"
            style={{ backgroundColor: bgColor, color: fontColor }}
            onClick={(item) => console.log(item)}
          >
            <Icon className="mr-[1rem] text-xl" />
            {statusTitle}
          </div>
        )}
        <div className=" my-[1rem] mx-[1rem] h-full">
          {item?.name && item?.name}
        </div>
      </div>
    );
  }

  return (
    <div className={` h-full w-[30%] min-w-[30%] mr-[2rem] p-[2rem] `}>
      <div
        className="h-[4rem] w-full rounded-t-2xl flex items-center px-[2rem] shadow-lg"
        style={{ backgroundColor: titleColorShow }}
      >
        {sectionName ? (
          sectionName
        ) : (
          <div className="flex items-center font-semibold ">
            <PiPlus className="mr-[1rem]" /> Add Section
          </div>
        )}
      </div>
      <div
        className="h-fit flex flex-col w-full items-center  max-h-[80%] overflow-y-scroll scrollball-nonBackground"
        style={{ backgroundColor: bodyColorShow }}
      >
        {arrayList &&
          arrayList.map((item, index) => {
            return <TaskBoxContainer item={item} key={index} />;
          })}
      </div>
      <div
        className="h-[3rem] w-full rounded-b-2xl flex items-center px-[2rem] shadow-lg"
        style={{ backgroundColor: bodyColorShow }}
      >
        <button className="flex justify-center items-center">
          Add task <PiPlusCircleBold className="ml-[0.5rem]" />
        </button>
      </div>
    </div>
  );
}
export function AddSectionTab({}) {
  const [addSection, openAddSection] = useState(false);
  const [sectionTitle, setSectionTitle] = useState("");

  const titleColorShow = "rgb(209,219,255)";

  function removeAddSection(){
    setSectionTitle("");
    openAddSection(false);
  }

  return (
    <div className="flex  w-[60%] min-w-[30%]">
      {addSection && (
        <div className={` h-full w-full max-w-[45.7%] mr-[2rem] p-[2rem] `}>
          <div
            className="h-[4rem] w-full rounded-2xl flex items-center shadow-lg overflow-hidden"
            style={{ backgroundColor: titleColorShow }}
          >
            <div className="relative flex items-center">
              <input
                className=" border-[0.15rem] border-[var(--login\_button)] rounded-md ml-[1rem] pl-[0.5rem] pr-[2rem] w-[60%]"
                placeholder="Enter list title..."
                value={sectionTitle}
                onChange={(e) => setSectionTitle(e.target.value)}
              />
              {sectionTitle !== "" && (
                <div
                  className="absolute top-[20%] right-[37%] cursor-pointer text-gray-600 hover:text-black "
                  onClick={() => setSectionTitle("")}
                >
                  <PiXBold />
                </div>
              )}
              <button className="ml-[1rem] bg-green-400 p-[0.3rem] text-base rounded-md  hover:opacity-60 active:scale-90"><PiCheckBold /></button>
              <button className="ml-[0.5rem] bg-red-400 p-[0.3rem] text-base rounded-md  hover:opacity-60 active:scale-90 text-white" onClick={removeAddSection}><PiXBold /></button>
            </div>
          </div>
        </div>
      )}
      <div className={` h-full w-full max-w-[45.7%]  mr-[2rem] p-[2rem] `}>
        <div
          className="h-[4rem] w-full rounded-2xl flex items-center shadow-lg overflow-hidden"
          style={{ backgroundColor: titleColorShow }}
        >
          <button
            className="flex pl-[2rem] items-center overflow-hidden font-semibold  w-full h-full"
            onClick={() => {
              openAddSection((prev) => !prev);
            }}
          >
            <PiPlus className="mr-[1rem]" /> Add Section
          </button>
        </div>
      </div>
    </div>
  );
}
