import { Route, Routes } from "react-router-dom";
import GeneralPages from "./GeneralPages";
import { LecturerLayout } from "../../layout/Layouts";
import DashboardPages from "../lecturer/DashboardPages";
import ClassesPages from "./ClassesPages";
import ReportsPages from "../lecturer/ReportsPages";
import { PremiumPayment } from "../student/PremiumPayment";

export default function LecturerHome() {
  return (
    <div className="">
      <Routes>
        <Route path="/*" element={<LecturerLayout />}>
          <Route index path="general" element={<GeneralPages />} />
          <Route path="reports" element={<ReportsPages />} />
          <Route path="tasks" element={<ClassesPages />} />
          <Route path="dashboard" element={<DashboardPages />} />
          <Route path="premiumbenefits" element={<PremiumPayment />} />
        </Route>
      </Routes>
    </div>
  );
}
