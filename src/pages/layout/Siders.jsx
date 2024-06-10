import { Link as CustLink } from "../../components/sharing";
import {
  PiFileText,
  PiCheckSquareOffset,
  PiStack,
  PiChartLine,
  PiPower,
} from "react-icons/pi";
import Heuruex from "../../assets/icon/heuruex.png";
import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
export function LeftSider() {
  const location = useLocation();
  const [onPages, setPages] = useState();

  useEffect(() => {
    const locations=location.pathname.split("/");
    setPages(locations[locations.length-1]);
  }, [location]);
  const nav = useNavigate();
  return (
    <div className="h-full w-full flex flex-col justify-between text-[var(--login\_button)]">
      <div>
        <div>
          <CustLink
            newClassName="w-fit ml-[1rem] py-[1.5rem] pr-[1rem] text-lg "
            linkTo="general"
            funcDo={() => {
              setPages("general");
            }}
            content="Heureux"
            logoImg={Heuruex}
            textColoredName={"login_button"}
            fIconClassName={"mr-[1rem]"}
          ></CustLink>
        </div>
        <div className="w-full border-[1.5px] border-white"></div>
        <div
          className={`flex items-center mt-[1.5rem]  ${
            onPages === "general"
              ? "pl-[2rem] ml-[1rem] py-[0.7rem] bg-white  rounded-s-full"
              : "pl-[1rem] hover:bg-white py-[0.5rem] cursor-pointer"
          }  transition-all`}
          onClick={() => {
            setPages("general");
            nav("general");
          }}
        >
          <label>
            <PiFileText className="text-xl mr-[0.5rem]" />
          </label>
          <p>General</p>
        </div>
        <div
          className={`flex items-center mt-[1.5rem]  ${
            onPages === "tasks"
              ? "pl-[2rem] ml-[1rem] py-[0.7rem] bg-white  rounded-s-full"
              : "pl-[1rem] hover:bg-white py-[0.5rem] cursor-pointer"
          } transition-all`}
          onClick={() => {
            setPages("tasks");
            nav("tasks");
          }}
        >
          <label>
            <PiCheckSquareOffset className="text-xl mr-[0.5rem]" />
          </label>
          <p>Tasks</p>
        </div>
        <div
          className={`flex items-center mt-[1.5rem]  ${
            onPages === "reports"
              ? "pl-[2rem] ml-[1rem] py-[0.7rem] bg-white  rounded-s-full"
              : "pl-[1rem] hover:bg-white py-[0.5rem] cursor-pointer"
          } transition-all`}
          onClick={() => {
            setPages("reports");
            nav("reports");
          }}
        >
          <label>
            <PiStack className="text-xl mr-[0.5rem]" />
          </label>
          <p>Reports</p>
        </div>
        <div
          className={`flex items-center mt-[1.5rem]  ${
            onPages === "dashboard"
              ? "pl-[2rem] ml-[1rem] py-[0.7rem] bg-white  rounded-s-full"
              : "pl-[1rem] hover:bg-white py-[0.5rem] cursor-pointer"
          } transition-all`}
          onClick={() => {
            setPages("dashboard");
            nav("dashboard");
          }}
        >
          <label>
            <PiChartLine className="text-xl mr-[0.5rem]" />
          </label>
          <p>Dashboard</p>
        </div>
      </div>
      <div>
        <div className="w-full border-[1.5px] border-white"></div>

        <div
          className="flex items-center justify-start pl-[1rem] pr-[1.5rem] mb-[3rem] py-[1rem] hover:bg-white cursor-pointer transition-all"
          onClick={() => {
            nav("");
          }}
        >
          <label>
            <PiPower className="text-xl mr-[0.5rem]" />
          </label>
          <p>Log out</p>
        </div>
      </div>
    </div>
  );
}
export function RightSiderDateTime() {
  return (
    <div className="h-full   flex flex-col bg-[var(--sider\_color)] ">
      <div>Month</div>
      <div>Upcomming</div>
      <div>View all upcomming</div>
    </div>
  );
}
export function RightSiderMember() {
  return (
    <div className="h-full   flex flex-col  ">
      <div>member</div>
      <div>member</div>
      <div>member</div>
    </div>
  );
}
