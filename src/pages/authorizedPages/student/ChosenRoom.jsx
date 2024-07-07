import { useContext, useEffect, useState } from "react";
import APIServices from "../../../services/APIServices.ts";
import DataContext from "../../../components/setting/ContextData.js";
import { useNavigate } from "react-router-dom";

export default function ChosenRoom() {
  const [classes, setClasses] = useState([]);
  const [classInfor, setClassInfor] = useState();

  const [team, setTeam] = useState();
  const [yourTeam, setYourTeam] = useState();
  const [classId, setClassId] = useState();
  const cloneId = 1;
  const dataContext = useContext(DataContext);
  const nav=useNavigate();

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
          "/class-service/class-user/team/" + cloneId
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
      console.log(item);
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
        nav("../general");
      }
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div className="w-full h-full">
      {team && (
        <div className="absolute w-full h-full bg-black opacity-50 flex justify-around items-center z-20">
          {team.map((item) => (
            <div className="w-[20rem] bg-white border-[var(--login\_button)] border-[0.15rem] rounded-xl min-h-[10rem]">
              <div className="w-full text-xl font-semibold text-center">
                {item?.name}
              </div>
              <div>{item?.project_name}</div>
              <div>MemberSize: {item?.size}</div>
              <button onClick={(e) => handleJoinTeam(e, item)}>Join Now</button>
            </div>
          ))}
        </div>
      )}

      <div className="flex w-full h-full items-center justify-around relative">
        {classes &&
          classes.map((item) => (
            <div className="w-[20rem] bg-white border-[var(--login\_button)] border-[0.15rem] rounded-xl min-h-[10rem]">
              <div className="w-full text-xl font-semibold text-center">
                {item?.className}
              </div>
              <div>{item?.createDate}</div>
              <button onClick={(e) => handleJoinClass(e, item)}>
                Join Now
              </button>
            </div>
          ))}
      </div>
    </div>
  );
}
