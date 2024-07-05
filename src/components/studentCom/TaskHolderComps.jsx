import "../../styles/Task.css";
import {
  PiCheckCircleBold,
  PiCoffeeFill,
  PiPlus,
  PiPlusCircleBold,
  PiWarningBold,
} from "react-icons/pi";
import "../../styles/Scrollbar.css";

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
  var Icon = "";
  var statusTitle = "";
console.log("here",arrayList);

  function TaskBoxContainer({ title, status }) {
    var bgColor = "#F1F2F4";
    var fontColor = "rgb(0,0,0)";
    
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
      }else{
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
        {status && (
          <div
            className="  rounded-t-2xl w-full py-[0.5rem] px-[1rem] flex items-center"
            style={{ backgroundColor: bgColor, color: fontColor }}
          >
            <Icon className="mr-[1rem] text-xl" />
            {statusTitle}
          </div>
        )}
        <div className=" my-[1rem] mx-[1rem] h-full">{title && title}</div>
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
          arrayList.map((item) => {
            return <TaskBoxContainer title={item?.name} status={item?.status} />;
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
export function AddSectionTab({addSectionClicked}) {
  const titleColorShow ="rgb(209,219,255)";

  return (
    <div className={` h-full w-[30%] min-w-[30%] mr-[2rem] p-[2rem] `}>
      <div
        className="h-[4rem] w-full rounded-2xl flex items-center shadow-lg overflow-hidden"
        style={{backgroundColor:titleColorShow}}
      >
        <button className="flex pl-[2rem] items-center overflow-hidden font-semibold  w-full h-full" onClick={addSectionClicked}>
          <PiPlus className="mr-[1rem]" /> Add Section
        </button>
      </div>
    </div>
  );
}
