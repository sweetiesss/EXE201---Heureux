import { useContext, useEffect, useState } from "react";
import APIServices from "../../../services/APIServices.ts";
import DataContext from "../../../components/setting/ContextData.js";
import { useNavigate } from "react-router-dom";
import { format } from "date-fns";

export default function ChosenRoom() {
  const [classes, setClasses] = useState([]);
  const [classInfor, setClassInfor] = useState();

  const [team, setTeam] = useState();
  const [yourTeam, setYourTeam] = useState();
  const [classId, setClassId] = useState();

  const dataContext = useContext(DataContext);
  const nav = useNavigate();

  useEffect(() => {
    const fetchApiClasses = async () => {
      try {
        const getClasses = await APIServices.getAPI(
          "/class-service/class/get-all?page=0&size=100&sort=name"
        );
        setClasses(getClasses?.content || []);
      } catch (e) {
        console.log(e);
      }
    };
    const fetchApiClassByUserID = async () => {
      try {
        const classByUserId = await APIServices.getAPI(
          "/class-service/class-user/team/" + dataContext.data.id
        );
        setClassInfor(classByUserId);
      } catch (e) {
        console.log(e);
      }
    };
    fetchApiClasses();
    fetchApiClassByUserID();
  }, []);

  const handleJoinClass = async (e, item) => {
    try {
      e.preventDefault();
      if (item) {
        const teamByUserId = await APIServices.getAPI(
          "/class-service/team/" + item?.id
        );
        setTeam(teamByUserId);
        setClassId(item?.id);
      }
    } catch (e) {
      console.log(e);
    }
  };

  const handleJoinTeam = (e, item) => {
    try {
      e.preventDefault();
      let submitForm = {};
      console.log(item);
      if (item) {
        submitForm = {
          teamId: item?.id,
          flag: item?.flag,
          classId: classId,
        };
        dataContext.setOthersId(submitForm);
        nav("../student/general");
      }
    } catch (e) {
      console.log(e);
    }
  };
  const handleCloseTeam = () => {
    setTeam([]);
    setClassId(-1);
  };

  return (
    <div className="w-full h-full">
      {team && (
        <div className="absolute w-full h-full  flex items-center z-20  justify-center ">
          <div className="w-full h-full bg-black opacity-50 absolute "></div>
          <div className="flex w-[58%] flex-wrap max-h-[40rem]  overflow-auto relative z-10 bg-white pb-[2rem] px-[1rem] rounded-xl shadow-xl">
            <div
              className="absolute right-[0.8rem] top-0 text-2xl font-semibold"
              onClick={handleCloseTeam}
            >
              x
            </div>
            {team.map((item) => (
              <div
                className="w-[17rem] h-[10rem] bg-white border-[var(--login\_button)] border-[0.15rem] rounded-xl min-h-[12rem] mt-[2rem] flex cursor-pointer mx-[1rem]"
                onClick={(e) => handleJoinTeam(e, item)}
              >
                <div className="w-[6rem] h-full"></div>
                <div className="p-[1rem]">
                  <div className="w-full text-xl font-semibold text-left text-orange-400">
                    {item?.name}
                  </div>
                  <div>{item?.project_name}</div>
                  <div>MemberSize: {item?.size}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="flex w-full h-full items-center justify-center relative">
        <div className="flex w-[60%] flex-wrap mt-[5rem] max-h-[40rem] overflow-auto">
          {classes &&
            classes.map((item) => (
              <div
                className="w-[17rem] bg-white border-[var(--login\_button)] border-[0.15rem] rounded-xl min-h-[12rem] mt-[1rem] flex cursor-pointer mx-[1rem]"
                onClick={(e) => handleJoinClass(e, item)}
              >
                <div className="w-[6rem] h-full"></div>
                <div className="p-[1rem]">
                  <div className="w-full text-xl font-semibold text-left text-orange-400">
                    {item?.className}
                  </div>
                  <div className="text-[#5e5e5e]">{item?.createdBy}</div>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}
