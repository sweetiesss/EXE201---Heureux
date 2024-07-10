import DotnutCharComps from "../../../components/studentCom/DotnutCharComps";
import LineChartComps from "../../../components/studentCom/LineChartComps";
import TaskAssigned from "../../../components/studentCom/TaskAssigned";
import TaskScheduler from "../../../components/studentCom/TaskScheduler";

export default function DashboardPages() {
  return (
    <div className="h-fit w-full pb-[1rem]">
      <div className="flex h-[23rem] w-full justify-between mt-[3rem]">
        <div className="flex justify-between flex-col ">
          <p className="text-xl font-semibold">Work Time</p>
          <LineChartComps className="w-[50rem] h-[20rem] p-[3rem]" />
        </div>
        <div className="flex justify-between flex-col">
          <p className="text-xl font-semibold">Your Assigned</p>

          <TaskAssigned
            className="w-[10rem] h-[9rem] bg-[var(--task-assigned-background-color)] text-[var(--task-assigned-text-color)]"
            title="Tasks"
            body="You are assigned"
            number="04"
          />
          <TaskAssigned
            className="w-[10rem] h-[9rem]  bg-[var(--task-progress-background-color)] text-[var(--task-progress-text-color)]"
            title="Tasks"
            body="You have done"
            number="02"
          />
        </div>
        <div className="flex justify-between flex-col ">
          <p className="text-xl font-semibold">Tasks Progress</p>

          <DotnutCharComps
            className="w-[20rem] shadow-xl h-[20rem] px-[3rem] pt-[3rem] pb-[1rem]"
            isLegend={true}
            percentageSize="text-3xl"
            dateSize="text-xl"
          />
        </div>
      </div>
      <div className="flex h-fit w-full mt-[3rem] justify-between">
        <div className="w-[63.5rem] flex flex-col">
          <p className="text-xl font-semibold mb-[1rem]">Tasks Progress</p>
          <TaskScheduler />
         </div>
        <div className="w-fit flex flex-col">
          <p className="text-xl font-semibold mb-[1rem]">Report Progress</p>
          <DotnutCharComps
            className="w-[20rem] shadow-xl h-[20rem] px-[3rem] pt-[3rem] pb-[1rem]"
            isLegend={true}
            percentageSize="text-3xl"
            dateSize="text-xl"
          />
        </div>
      </div>
    </div>
  );
}
