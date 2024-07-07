import { Navigate, Route, Routes } from "react-router-dom";

import { Outlet } from "react-router-dom";

import { createContext, useContext, useEffect, useState } from "react";
import { StudentLayout, StudentLayoutNoDateSide } from "../../layout/Layouts";
import GeneralPages from "./GeneralPages";
import TasksPages from "./TasksPages";
import ReportsPages from "./ReportsPages";
import DashboardPages from "./DashboardPages";
import APIServices from "../../../services/APIServices.ts";
import ChosenRoom from "./ChosenRoom.jsx";
import UnitOfWork from "../../../services/UnitOfWork.ts";
import ReportSubmit from "./ReportSubmit.jsx";
import DataContext from "../../../components/setting/ContextData.js";

export const RefrestApi = createContext();

export default function StudentHome() {

  const auth=useContext(DataContext);
  console.log("auth",auth.data);
  console.log("otherId",auth.othersId);
  const [task, setTask] = useState([]);
  const [sectionsData, setSectionsData] = useState();
  const [taskesShowedData, setTaskesShowedData] = useState();
  const [yourTaskes, setYourTaskes] = useState();
  const [refreshAPI, setRefreshAPI] = useState(false);
  var yourAssigned = 0;
  const teamId = 1;
  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await APIServices.getAPI(
          `/class-service/task/team/${auth.othersId?.teamId}`
        );
        setTask(result);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    const fetchYourDataTaskes = async () => {
      try {
        const result = await  APIServices.getAPI(
          `/class-service/task/user/${auth?.data?.username}`
        );
        if(result)
        setYourTaskes(result);
      } catch (e) {
        console.log(e);
      }
    };
    fetchData();
    fetchYourDataTaskes();
  }, [refreshAPI]);
  useEffect(() => {
    const getSection = () => {
      if (task && task.length > 0) {
        const sections = Array.from(new Set(task.map((item) => item.section)));
        const sectionMap = {};
        sections.forEach((section, index) => {
          sectionMap[section] = index + 1;
        });
        setSectionsData(sectionMap);
        const updatedData = task.map((item) => ({
          ...item,
          sectionId: sectionMap[item.section] || null,
        }));
        setTaskesShowedData(updatedData);
      }
    };
    getSection();
  }, [task]);

  const refreshing=()=>{
    setRefreshAPI(prev=>!prev);
  }

  return (
    <div className="w-full h-full">
      <RefrestApi.Provider value={{refreshAPI,refreshing}}>
        <Routes>
          <Route path="/*">
            <Route index element={<Navigate to="room" />} />
            <Route path="room" element={<ChosenRoom />} />
            <Route path="/*" element={<StudentLayout />}>
              <Route
                path="general"
                element={
                  <GeneralPages taskesDataArrayList={taskesShowedData} yourAsignData={yourTaskes?.length}/>
                }
              />
              <Route path="reports" element={<ReportsPages />} />
              <Route
                path="tasks"
                element={
                  <TasksPages
                    taskesDataArrayList={taskesShowedData}
                    sectionsDataArrayList={sectionsData}
                  />
                }
              />
              <Route path="dashboard" element={<DashboardPages />} />
              <Route path="reportsubmit" element={<ReportSubmit />} />
            </Route>
          </Route>
        </Routes>
      </RefrestApi.Provider>
    </div>
  );
}
