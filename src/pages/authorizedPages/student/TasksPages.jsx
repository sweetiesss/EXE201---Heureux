import { useEffect, useRef, useState } from "react";
import { AddSectionTab, TaskHolderComps } from "../../../components/studentCom/TaskHolderComps";
import APIServices from "../../../services/APIServices.ts";

export default function TasksPages({}) {
  const itemReft = useRef(null);
  const [isMouseDown, setMouseDown] = useState(false);
  const [startX, setStartX] = useState(false);
  const [scrollLeft, setScrollLeft] = useState(false);
  const [data,setData]=useState();
  const teamId=1;
  const items = [
    { title: "heelo",status:"Succes" },
    { title: "heelo2",status:"OnGoing" },
    { title: "heelo3",status:"Urgent" },
    { title: "heelo4" },
    { title: "heelo5" },
    { title: "heelo6" },
    { title: "heelo6" },
    { title: "heelo6" },
    { title: "heelo6" },
    { title: "heelo6" },
  ];
  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await APIServices.getAPI(`/class-service/task/team/${teamId}`);
        setData(result);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  const handleMouseDown = (e) => {
    setMouseDown(true);
    // setStartX(e.pageX - -itemReft.current.offsetLeft);
    setStartX(e.pageX -itemReft.current.offsetLeft);
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
    const walk = (x - startX) ;
    itemReft.current.scrollLeft = scrollLeft - walk;
  };
  return (
    <div
      className="h-full w-full flex  overflow-x-scroll max-w-[100%] "
      ref={itemReft}
      onMouseDown={handleMouseDown}
      onMouseLeave={handleMouseLeave}
      onMouseUp={handleMouseUp}
      onMouseMove={handleMouseMove}
    >
      <TaskHolderComps titleColor={"#FF9347"} bodyColor={"#FFE5D4"} arrayList={data&&data}/>
      <TaskHolderComps />
      <TaskHolderComps />
      <TaskHolderComps />
      <AddSectionTab/>
    </div>
  );
}
