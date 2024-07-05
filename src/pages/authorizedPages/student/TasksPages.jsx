import { useEffect, useRef, useState } from "react";
import {
  AddSectionTab,
  TaskHolderComps,
} from "../../../components/studentCom/TaskHolderComps";
import APIServices from "../../../services/APIServices.ts";

export default function TasksPages({ taskesDataArrayList,sectionsDataArrayList }) {
  const itemReft = useRef(null);
  const [isMouseDown, setMouseDown] = useState(false);
  const [startX, setStartX] = useState(false);
  const [scrollLeft, setScrollLeft] = useState(false);
  const [showedData, setShowedData] = useState([]);
  const [sectionsData,setSectionsData]=useState();
  const [openAddingSection,isOpenAddSection]=useState(false);
  useEffect(() => {
    setShowedData(taskesDataArrayList||[]);
    setSectionsData(sectionsDataArrayList||{});
  }, [taskesDataArrayList]);
 
  console.log("showedData", showedData);
  

  const handleMouseDown = (e) => {
    setMouseDown(true);
    // setStartX(e.pageX - -itemReft.current.offsetLeft);
    setStartX(e.pageX - itemReft.current.offsetLeft);
    setScrollLeft(itemReft.current.scrollLeft);
  };
  const handleMouseLeave = () => {
    setMouseDown(false);
  };
  const handleMouseUp = () => {
    setMouseDown(false);
  };
  const handleMouseMove = (e) => {
    if (!isMouseDown) return;
    e.preventDefault();
    const x = e.pageX - itemReft.current.offsetLeft;
    const walk = x - startX;
    itemReft.current.scrollLeft = scrollLeft - walk;
  };
  const groupedData = showedData.reduce((acc, item) => {
    if (!acc[item.section]) {
      acc[item.section] = [];
    }
    acc[item.section].push(item);
    return acc;
  }, {});
  return (
    <div
      className="h-full w-full flex  overflow-x-scroll max-w-[100%] "
      ref={itemReft}
      onMouseDown={handleMouseDown}
      onMouseLeave={handleMouseLeave}
      onMouseUp={handleMouseUp}
      onMouseMove={handleMouseMove}
    >
      {Object.entries(groupedData).map(([section, tasks], index) => (
        <>
          <TaskHolderComps
            key={index}
            titleColor={"#FF9347"}
            bodyColor={"#FFE5D4"}
            arrayList={tasks}
            sectionName={section}
          />
          {console.log(section)}
        </>
      ))}
      <AddSectionTab addSectionClicked={(pre)=>isOpenAddSection(!pre)}/>
    </div>
  );
}
