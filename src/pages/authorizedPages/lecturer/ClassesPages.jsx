import { useEffect, useRef, useState } from "react";
import {
  AddSectionTab,
  TaskHolderComps,
} from "../../../components/studentCom/TaskHolderComps.jsx";
import APIServices from "../../../services/APIServices.ts";
import { ReportBoxShort } from "../../../components/studentCom/BoxComps.jsx";

export default function ClassesPages({
  taskesDataArrayList,
  sectionsDataArrayList,
}) {
  const [classes, setClasses] = useState([1, 2, 3, 4]);
  return (
    <div className="w-full h-full">
      <div className="grid " style={{gridTemplateColumns:"auto auto auto",gridGap:"1rem"}}>
        {classes && 
          classes.map((item) => (
            <ReportBoxShort
              title={"Proposal"}
              bgColor={"report_color"}
              newClassName="w-[17rem] shadow-xl  h-[10rem] mr-[2rem] mt-[2rem] "
              dateCreate={new Date()}
              isOpen={true}
            />
          ))}
          <ReportBoxShort
              title={"Proposal"}
              bgColor={"report_color"}
              newClassName="w-[17rem] shadow-xl  h-[10rem] mr-[2rem] mt-[2rem]"
              dateCreate={new Date()}
              isOpen={false}
            />
      </div>
    </div>
  );
}
