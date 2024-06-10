import { Route, Routes } from "react-router-dom";
import ChooseSemester from "./ChooseSemester";

import { Outlet } from "react-router-dom";
import { LogoHeader } from "../../layout/Header";
import { useState } from "react";
import ChooseProject from "./ChooseProject";
import ChooseCollaborators from "./ChooseCollaborators";

function MainLayout() {
  return (
    <div>
      <Outlet />
    </div>
  );
}
export default function Main() {
    const [submitForm,setSubmitform]=useState({
        semesterChoosen:"",
        projectChoosen:"",
        collaboratorsChoosen:"",
    });

    const readForm=()=>{
       console.log(submitForm);
    }
  return (
    <div>
      <div className="h-[15%]">
        <LogoHeader />
      </div>
      <div className="h-[85%]">
        <Routes>
          <Route element={<MainLayout />}>
            <Route path="semester" element={<ChooseSemester setSubmitform={setSubmitform}/>} />
            <Route path="project" element={<ChooseProject setSubmitform={setSubmitform} readForm={readForm}/>} />
            <Route path="collaborators" element={<ChooseCollaborators setSubmitform={setSubmitform} readForm={readForm}/>} />
          </Route>
        </Routes>
      </div>
    </div>
  );
}
