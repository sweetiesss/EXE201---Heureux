import { ReportBoxShort } from "../../../components/studentCom/BoxComps";
import { Link as CusLink } from "../../../components/sharing";
import { PiCaretRight, PiPlusBold } from "react-icons/pi";
import { TasksHolderComps } from "../../../components/studentCom/BoxComps";
import LineChartComps from "../../../components/studentCom/LineChartComps";
import TaskAssigned from "../../../components/studentCom/TaskAssigned";
import DotnutCharComps from "../../../components/studentCom/DotnutCharComps";
import InforBoxCol from "../../../components/studentCom/InforBoxComp";
import { useContext, useEffect, useState } from "react";
import UnitOfWork from "../../../services/UnitOfWork.ts";
import DataContext from "../../../components/setting/ContextData.js";
import APIServices from "../../../services/APIServices.ts";

export default function GeneralPages({ taskesDataArrayList, yourAsignData }) {
  const [taskes, setTaskes] = useState([]);
  const [sections, setSections] = useState();
  const [members, setMembers] = useState([]);
  const dataContext = useContext(DataContext);

  useEffect(() => {
    setTaskes(taskesDataArrayList || []);
  }, [taskesDataArrayList]);

  useEffect(() => {
    const fetchingTeamMember = async () => {
      try {
        const result = await APIServices.getAPI(
          "/class-service/user_team/user/" + dataContext.othersId.teamId
        );
        setMembers(result);
      } catch (e) {}
    };
    fetchingTeamMember();
  }, []);

  const groupedData =
    taskes && taskes.length > 0
      ? taskes.reduce((acc, item) => {
          if (!acc[item.section]) {
            acc[item.section] = [];
          }
          acc[item.section].push(item);
          return acc;
        }, {})
      : {};

  const latestSections = Object.entries(groupedData)
    .sort(([sectionA], [sectionB]) => {
      if (sectionA > sectionB) return -1;
      if (sectionA < sectionB) return 1;
      return 0;
    })
    .slice(0, 2);

  const d = new Date();
  const isOpen = true;
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
  ];

  return (
    <div className="w-full h-full">
      <div className=" flex items-start justify-between w-full">
        <div className="w-[48%] ">
          <div className="mb-[2rem] flex items-center w-full justify-between">
            <p className="font-bold text-xl">Classes</p>
            <CusLink
              linkTo="../reports"
              content="View more"
              newClassName="w-fit text-sm  font-medium  "
              textColoredName="login_button"
              bIcon={PiCaretRight}
            />
          </div>
          <div className="flex w-full justify-between items-center">
            <ReportBoxShort
              title={"Proposal"}
              bgColor={"report_color"}
              newClassName="w-[48%] shadow-xl  h-[10rem]"
              arrayOfContent={{ comment: 2, submited: 1 }}
              dateCreate={d}
              isOpen={isOpen}
            />
            <ReportBoxShort
              title={"Proposal"}
              bgColor={"report_color"}
              newClassName="w-[48%] shadow-xl  h-[10rem]"
              dateCreate={d}
            />
          </div>
          <div className="mb-[2rem] flex items-center mt-[3rem]  w-full justify-between">
            <p className="font-bold text-xl">Report Project</p>
            <CusLink
              linkTo="../tasks"
              content="View more"
              newClassName="w-fit text-sm  font-medium "
              textColoredName="login_button"
              bIcon={PiCaretRight}
            />
          </div>

          <div className="flex w-full justify-between">
            <ReportBoxShort
              title={"Proposal"}
              bgColor={"report_color"}
              newClassName="w-[48%] shadow-xl  h-[10rem]"
              arrayOfContent={{ comment: 2, submited: 1 }}
              dateCreate={d}
              isOpen={isOpen}
            />
            <ReportBoxShort
              title={"Proposal"}
              bgColor={"report_color"}
              newClassName="w-[48%] shadow-xl  h-[10rem]"
              dateCreate={d}
            />
          </div>
          <div className="flex w-full justify-between mt-[2rem]">
            <ReportBoxShort
              title={"Proposal"}
              bgColor={"report_color"}
              newClassName="w-[48%] shadow-xl  h-[10rem]"
              arrayOfContent={{ comment: 2, submited: 1 }}
              dateCreate={d}
              isOpen={isOpen}
            />
            <ReportBoxShort
              title={"Proposal"}
              bgColor={"report_color"}
              newClassName="w-[48%] shadow-xl  h-[10rem]"
              dateCreate={d}
            />
          </div>
        </div>
        <div className="w-[48%] ">
          <div className="mb-[2rem] flex items-center justify-between">
            <p className="font-bold">Dashboard</p>
            <CusLink
              linkTo="../dashboard"
              content="View more"
              newClassName="w-fit text-sm  font-medium "
              textColoredName="login_button"
              bIcon={PiCaretRight}
            />
          </div>
          <LineChartComps isTitle={true} />
          <div className="w-full flex justify-between mt-[2rem]">
            <DotnutCharComps
              className="w-[47%] shadow-xl h-[10.5rem] px-[1rem] pt-[1rem] pb-[0.5rem]"
              isTitle={true}
              isLegend={false}
            />
            <TaskAssigned
              className="w-[47%] h-[10.5rem] rounded-xl bg-[var(--task-assigned-background-color)] text-[var(--task-assigned-text-color)]"
              title="Tasks"
              body="You are assigned"
              number={yourAsignData}
            />
          </div>
          <div className="w-full h-[10.5rem] flex-col justify-between rounded-xl bg-[var(--liner-day-chart-background-color)] text-[var(--liner-day-chart-font-color)] p-[1rem] mt-[1.5rem]">
            <div className="text-center w-full text-xl h-[2.5rem] font-semibold">
              Total Students
            </div>
            <div className="flex justify-evenly h-[6rem]">
              <div className="text-center w-[10rem]">
                <div className="text-xl text-black">Students</div>
                <div className="text-3xl font-semibold mt-[1rem]  ">100</div>
              </div>
              <div className="h-full border-r-[0.2rem] border-[var(--liner-day-chart-font-color)]" />
              <div className="text-center w-[10rem]">
                <div className="text-xl text-black">Classes</div>
                <div className="text-3xl font-semibold mt-[1rem]  ">100</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
