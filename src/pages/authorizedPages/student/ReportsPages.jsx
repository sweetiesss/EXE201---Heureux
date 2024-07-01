import { useEffect, useState } from "react";
import {
  ReportBoxLong,
  ReportBoxShort,
} from "../../../components/studentCom/BoxComps";
import "../../../styles/Scrollbar.css";
import APIServices from "../../../services/APIServices.ts";

export default function ReportsPages() {
  const [data,setData]=useState();
  const teamId=1;
  const arrayOfReport = [
    {
      title: "test",
      submited: 2,
      comment: 1,
    },
    {
      title: "test1",
      submited: 3,
      comment: 4,
    },
    {
      title: "test2",
      submited: 6,
      comment: 3,
    },
    {
      title: "test3",
      submited: 1,
      comment: 0,
    },
    {
      title: "test4",
      submited: 0,
      comment: 0,
    },
  ];
  const d = new Date();
  const isOpen = true;
  useEffect(()=>{
    const fetchData=async()=>{
      try {
        const result = await APIServices.getAPI(`/class-service/report/team/${teamId}?pageNo=0&pageSize=100&sortField=id&ascending=true`);
        setData(result);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
    fetchData();
  },[])
  console.log(data);
  return (

      <div className="grid  w-full gap-[3rem] grid-cols-2 pb-[8rem] overflow-y-scroll h-full pr-[2rem] scrollball-nonBackground">
        <ReportBoxLong
          title={"Proposal"}
          bgColor={"report_color"}
          newClassName=" shadow-xl"
          arrayOfContent={arrayOfReport}
          dateCreate={d}
          taskTitle={"Character design for goof long"}
          isOpen={isOpen}
          percentage={40}
          percentageColor={"login_button"}
        />

        <ReportBoxLong
          title={"Proposal"}
          bgColor={"report_color"}
          newClassName=" shadow-xl"
          arrayOfContent={arrayOfReport}
          dateCreate={d}
          taskTitle={"Character design for goof long"}
          isOpen={false}
        />
        <ReportBoxLong
          title={"Proposal"}
          bgColor={"report_color"}
          newClassName=" shadow-xl"
          arrayOfContent={arrayOfReport}
          dateCreate={d}
          taskTitle={"Character design for goof long"}
          isOpen={false}
        />
        <ReportBoxLong
          title={"Proposal"}
          bgColor={"report_color"}
          newClassName=" shadow-xl"
          arrayOfContent={arrayOfReport}
          dateCreate={d}
          taskTitle={"Character design for goof long"}
          isOpen={false}
        />
        <ReportBoxLong
          title={"Proposal"}
          bgColor={"report_color"}
          newClassName=" shadow-xl"
          arrayOfContent={arrayOfReport}
          dateCreate={d}
          taskTitle={"Character design for goof long"}
          isOpen={false}
        />
        <ReportBoxLong
          title={"Proposal"}
          bgColor={"report_color"}
          newClassName=" shadow-xl"
          arrayOfContent={arrayOfReport}
          dateCreate={d}
          taskTitle={"Character design for goof long"}
          isOpen={false}
        />
        <ReportBoxLong
          title={"Proposal"}
          bgColor={"report_color"}
          newClassName=" shadow-xl"
          arrayOfContent={arrayOfReport}
          dateCreate={d}
          taskTitle={"Character design for goof long"}
          isOpen={false}
        />
    </div>
  );
}
