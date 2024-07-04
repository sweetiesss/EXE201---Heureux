import { useEffect, useState } from "react";
import APIServices from "../../../services/APIServices.ts";

export default function ChosenRoom() {
    const [classes, setClasses] = useState([]);
    const [classInfor, setClassInfor] = useState();
  
    const [team, setTeam] = useState();
    const cloneId = 1;
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
      const fetchApiClass = async () => {
        try {
          const classByUserId = await APIServices.getAPI(
            "/class-service/class-user/team/" + cloneId
          );
          setClassInfor(classByUserId);
        } catch (e) {
          console.log(e);
        }
      };
      const fetchApiTeam = async () => {
        try {
          const teamByUserId = await APIServices.getAPI(
            "/class-service/user_team/team/" + cloneId
          );
          setTeam(teamByUserId);
        } catch (e) {
          console.log(e);
        }
      };
      fetchApiClasses();
      fetchApiClass();
      fetchApiTeam();
    }, []);
  

  
  return (
    <div className="flex w-full h-full items-center justify-around py-[10rem]">
      {classes &&
        classes.map((items) => (
          <div className="w-[20rem] bg-white border-[var(--login\_button)] border-[0.15rem] rounded-xl min-h-[10rem]">
            <div className="w-full text-xl font-semibold text-center">
              {items?.className}
            </div>
            <div>{items?.createDate}</div>
            <button>Join Now</button>
          </div>
        ))}
    </div>
  );
}
