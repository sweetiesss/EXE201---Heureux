import { ReportBoxShort } from "../../../components/studentCom/BoxComps";
import { Link as CusLink } from "../../../components/sharing";
import { PiCaretRight, PiPlusBold } from "react-icons/pi";
import { TasksHolderComps } from "../../../components/studentCom/BoxComps";
import LineChartComps from "../../../components/studentCom/LineChartComps";
import TaskAssigned from "../../../components/studentCom/TaskAssigned";
import DotnutCharComps from "../../../components/studentCom/DotnutCharComps";
import InforBoxCol from "../../../components/studentCom/InforBoxComp";

export default function GeneralPages({}) {
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

  return (
    <div className="flex flex-col justify-around items-start h-full">
      <div className=" flex items-start justify-between w-full">
        <div className="max-w-[50%]">
          <div className="mb-[2rem] flex items-center w-full justify-between">
            <p className="font-bold text-xl">Report</p>
            <CusLink
              linkTo=""
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
            <p className="font-bold text-xl">Task</p>
            <CusLink
              linkTo=""
              content="View more"
              newClassName="w-fit text-sm  font-medium "
              textColoredName="login_button"
              bIcon={PiCaretRight}
            />
          </div>
          <div className="flex ">
            <TasksHolderComps
              title={"Proposal"}
              bgColor={"report_color"}
              newClassName="w-[48%] shadow-xl mr-[1.5rem]"
              arrayOfContent={arrayOfReport}
              dateCreate={d}
              taskTitle={"Character design for goof long"}
              isOpen={isOpen}
            />
            <TasksHolderComps
              title={"Proposal"}
              bgColor={"report_color"}
              newClassName="w-[48%] shadow-xl"
              dateCreate={d}
            />
          </div>
        </div>
        <div className="max-w-[50%] ">
          <div className="mb-[2rem] flex items-center justify-between">
            <p className="font-bold">Dashboard</p>
            <CusLink
              linkTo=""
              content="View more"
              newClassName="w-fit text-sm  font-medium "
              textColoredName="login_button"
              bIcon={PiCaretRight}
            />
          </div>
          <LineChartComps isTitle={true} />
          <div className="w-full flex justify-between mt-[2rem]">
            <DotnutCharComps className="w-[47%] shadow-xl h-[10.5rem] px-[1rem] pt-[1rem] pb-[0.5rem]" isTitle={true} isLegend={false}/>
            <TaskAssigned className="w-[47%] h-[10.5rem] rounded-xl bg-[var(--task-assigned-background-color)] text-[var(--task-assigned-text-color)]" title="Tasks" body="You are assigned" number="04"/>
          </div>
        </div>
      </div>
      <div className="w-full flex-col  flex">
        <p className="font-bold text-xl mb-[2rem]">Team member</p>
        <div className="flex justify-around w-full  bg-[var(--sider\_color)] h-[10rem] rounded-xl items-center">
          <InforBoxCol name="Vung A Dinh" title="Environment design" />
          <InforBoxCol name="Vung A Dinh" title="Environment design" />
          <InforBoxCol name="Vung A Dinh" title="Environment design" />
          <div className="bg-yellow-500 w-[4rem] h-[4rem] rounded-full text-sm flex justify-center items-center">
            <PiPlusBold className="text-3xl" />
          </div>
        </div>
      </div>
    </div>
  );
}
