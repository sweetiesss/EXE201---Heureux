import { Navigate, Route, Routes } from "react-router-dom";

import { Outlet } from "react-router-dom";

import { useEffect, useState } from "react";
import { StudentLayout, StudentLayoutNoDateSide } from "../../layout/Layouts";
import GeneralPages from "./GeneralPages";
import TasksPages from "./TasksPages";
import ReportsPages from "./ReportsPages";
import DashboardPages from "./DashboardPages";
import APIServices from "../../../services/APIServices.ts";
import ChosenRoom from "./ChosenRoom.jsx";

export default function StudentHome() {
  const [task, setTask] = useState([]);
  const [sectionsData, setSectionsData] = useState();
  const [taskesShowedData, setTaskesShowedData] = useState();
  const teamId = 1;
  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await APIServices.getAPI(
          `/class-service/task/team/${teamId}`
        );
        setTask(result);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);
  useEffect(() => {
    const getSection = () => {
      if (task.length > 0) {
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
  return (
    <div className="">
      <Routes>
        <Route path="/*">
          <Route index element={<Navigate to="room" />} />
          <Route path="room" element={<ChosenRoom />} />
          <Route path="/*" element={<StudentLayout />}>
            <Route path="general" element={<GeneralPages taskesDataArrayList={taskesShowedData} sectionsDataArrayList={sectionsData}/>} />
            <Route path="reports" element={<ReportsPages />} />
            <Route path="tasks" element={<TasksPages taskesDataArrayList={taskesShowedData} sectionsDataArrayList={sectionsData} />} />
            <Route path="dashboard" element={<DashboardPages />} />
          </Route>
        </Route>
      </Routes>
    </div>
  );
}
