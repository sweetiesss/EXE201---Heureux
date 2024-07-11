import { Link as CustLink } from "../../components/sharing";
import {
  PiFileText,
  PiCheckSquareOffset,
  PiStack,
  PiChartLine,
  PiPower,
} from "react-icons/pi";
import Heuruex from "../../assets/icon/heuruex.png";
import { useContext, useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Calendar from "../../components/sharing/Calendar";
import UpcomingEvent from "../../components/studentCom/UpcomingEvent";
import { useLocalData } from "../../components/setting/useContext";
import DataContext from "../../components/setting/ContextData";
import APIServices from "../../services/APIServices.ts";
export function LeftSider() {
  const location = useLocation();
  const [onPages, setPages] = useState();
  const { setData, supscriptionData } = useLocalData();
  const [permisstion, setPermission] = useState(false);

  useEffect(() => {
    const locations = location.pathname.split("/");
    setPages(locations[locations.length - 1]);
  }, [location]);
  const nav = useNavigate();
  const handleLogOut = () => {
    localStorage.removeItem("DATA");
    localStorage.removeItem("OTHERS");
    localStorage.removeItem("SUPSCRIPTION");
    nav("/");
  };
  useEffect(() => {
    const checkPermisstion = () => {
      if (supscriptionData) {
        setPermission(true);
      }
    };

    checkPermisstion();
  }, [supscriptionData]);
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
        {permisstion && (
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
        )}
        {permisstion && (
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
        )}
      </div>
      <div>
        <div className="w-full border-[1.5px] border-white"></div>

        <div
          className="flex items-center justify-start pl-[1rem] pr-[1.5rem] mb-[3rem] py-[1rem] hover:bg-white cursor-pointer transition-all"
          onClick={() => {
            handleLogOut();
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
export function LeftSiderLecturer() {
  const location = useLocation();
  const [onPages, setPages] = useState();
  const { setData } = useLocalData();

  useEffect(() => {
    const locations = location.pathname.split("/");
    setPages(locations[locations.length - 1]);
  }, [location]);
  const nav = useNavigate();
  const handleLogOut = () => {
    localStorage.removeItem("DATA");
    localStorage.removeItem("OTHERS");
    localStorage.removeItem("SUPSCRIPTION");
    nav("/");
  };
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
          <p>Classes</p>
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
            handleLogOut();
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
  const [events, setEvents] = useState([]);

  const dataContext = useContext(DataContext);
  useEffect(() => {
    const fetchEvent = async () => {
      if (dataContext?.othersId) {
        const result = await APIServices.getAPI(
          "/class-service/event/" + dataContext?.othersId.teamId
        );
        setEvents(result);
      }
    };
    fetchEvent();
  }, []);

  return (
    <div className="h-full w-full  flex flex-col bg-[var(--sider\_color)] px-[1rem] overflow-hidden">
      <div className="w-[100%] flex items-center justify-center mt-[6rem] ">
        <Calendar eventsDataArray={events} />
      </div>
      <div className="mt-[3rem]">
        <UpcomingEvent eventsDataArray={events} />
      </div>
    </div>
  );
}
export function RightSiderMember() {
  return (
    <div className="h-full s  flex flex-col  ">
      <div>member</div>
      <div>member</div>
      <div>member</div>
    </div>
  );
}
