import { Route, Routes } from "react-router-dom";
import GeneralPages from "./GeneralPages";
import { LecturerLayout } from "../../layout/Layouts";


export default function LecturerHome() {
  return (
    <div className="">
      <Routes>
        <Route path="/*" element={<LecturerLayout />}>
          <Route index path="general" element={<GeneralPages />} />
          {/* <Route path="reports" element={<ReportsPages />} />
          <Route path="tasks" element={<TasksPages />} />
          <Route path="dashboard" element={<DashboardPages />} /> */}
        </Route>
      </Routes>
      hello
    </div>
  );
}
