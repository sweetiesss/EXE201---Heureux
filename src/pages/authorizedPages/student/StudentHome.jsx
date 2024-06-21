import { Navigate, Route, Routes } from "react-router-dom";

import { Outlet } from "react-router-dom";

import { useState } from "react";
import { StudentLayout, StudentLayoutNoDateSide } from "../../layout/Layouts";
import GeneralPages from "./GeneralPages";
import TasksPages from "./TasksPages";
import ReportsPages from "./ReportsPages";
import DashboardPages from "./DashboardPages";

export default function StudentHome() {
  return (
    <div className="">
      <Routes>
        <Route path="/*" element={<StudentLayout />}>
          <Route index element={<Navigate to="general"/>}/>
          <Route  path="general" element={<GeneralPages />}/>
          <Route path="reports" element={<ReportsPages />} />
          <Route path="tasks" element={<TasksPages />} />
          <Route path="dashboard" element={<DashboardPages />} />
        </Route>
      </Routes>
    </div>
  );
}
