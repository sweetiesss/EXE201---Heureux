import { useEffect, useRef, useState } from "react";
import {
  AddSectionTab,
  TaskHolderComps,
} from "../../../components/studentCom/TaskHolderComps";
import APIServices from "../../../services/APIServices.ts";

export default function TasksPages({
  taskesDataArrayList,
  sectionsDataArrayList,
}) {
  const itemReft = useRef(null);
  const [isMouseDown, setMouseDown] = useState(false);
  const [startX, setStartX] = useState(false);
  const [scrollLeft, setScrollLeft] = useState(false);
  const [showedData, setShowedData] = useState([]);
  const [sectionsData, setSectionsData] = useState();
  const [openAddingSection, isOpenAddSection] = useState(false);
  const [newSection, setNewSection] = useState("");
  useEffect(() => {
    setShowedData(taskesDataArrayList || []);
    setSectionsData(sectionsDataArrayList || {});
  }, [taskesDataArrayList]);

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

  const handleCancelAddSection = () => {
    isOpenAddSection(false);
    setNewSection("");
  };
  const hanldeSubmitAddingSection=()=>{
    
  }
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
        </>
      ))}
      {openAddingSection && (
        <div className={`h-full w-[30%] min-w-[30%] mr-[2rem] p-[2rem]`}>
          <div className="h-[6rem] w-full rounded-2xl shadow-lg bg-[rgb(209,219,255)] px-[1rem] flex items-start justify-center flex-col">
            <div className="relative w-full">
              <input
                className="bg-inherit pl-[1rem] pr-[2rem] w-full border-b-[0.1rem] border-black"
                placeholder="Input section name"
                value={newSection}
                onChange={(e) => setNewSection(e.target.value)}
              />
              {newSection !== "" && (
                <div
                  className="absolute -top-[0.25rem] right-[0.5rem] font-semibold text-xl cursor-pointer"
                  onClick={() => setNewSection("")}
                >
                  x
                </div>
              )}
            </div>
            <div className="flex mt-[1rem]">
              <button className="bg-green-500 px-[1rem] py-[0.3rem] rounded-xl mr-[1rem] text-white"
              onClick={hanldeSubmitAddingSection}>
                Add
              </button>
              <button
                className="bg-red-500 px-[1rem] py-[0.3rem] rounded-xl mr-[1rem] text-white"
                onClick={handleCancelAddSection}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      <AddSectionTab addSectionClicked={() => isOpenAddSection(true)} />
    </div>
  );
}
