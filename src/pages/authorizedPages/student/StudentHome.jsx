import { Route, Routes } from "react-router-dom";
import {
  createContext,
  forwardRef,
  useContext,
  useEffect,
  useState,
} from "react";
import { StudentLayout } from "../../layout/Layouts";
import GeneralPages from "./GeneralPages";
import TasksPages from "./TasksPages";
import ReportsPages from "./ReportsPages";
import DashboardPages from "./DashboardPages";
import APIServices from "../../../services/APIServices.ts";
import ReportSubmit from "./ReportSubmit.jsx";
import DataContext from "../../../components/setting/ContextData.js";
import Dropdown from "../../../components/sharing/Dropdown.jsx";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { PremiumPayment } from "./PremiumPayment.jsx";
import { PiCalendar } from "react-icons/pi";
import {
  ToastError,
  ToastSuccess,
} from "../../../components/setting/ToastSetting.js";
import { format, isAfter, isBefore } from "date-fns";

export const RefrestApi = createContext();

export default function StudentHome() {
  const auth = useContext(DataContext);
  const [task, setTask] = useState([]);
  const [sectionsData, setSectionsData] = useState();
  const [taskesShowedData, setTaskesShowedData] = useState();
  const [yourTaskes, setYourTaskes] = useState();
  const [refreshAPI, setRefreshAPI] = useState(false);
  const [openAddTask, setOpenAddTask] = useState(false);
  const [membersArray, setMembersArray] = useState([]);
  const [formSubmit, setFormSubmit] = useState({
    name: "",
    description: "",
    assignee: "",
    startDate: "",
    endDate: "",
    status: "string",
    priority: "string",
    section: "",
    teamid: auth.othersId.teamId,
  });
  const [sectionSelect, setSectionSelect] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await APIServices.getAPI(
          `/class-service/task/team/${auth.othersId?.teamId}`
        );
        setTask(result);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    const fetchYourDataTaskes = async () => {
      try {
        const result = await APIServices.getAPI(
          `/class-service/task/user/${auth?.data?.username}`
        );
        if (result) setYourTaskes(result);
      } catch (e) {
        console.log(e);
      }
    };
    const fetchingTeamMember = async () => {
      try {
        const result = await APIServices.getAPI(
          "/class-service/user_team/user/" + auth.othersId.teamId
        );
        setMembersArray(result);
      } catch (e) {}
    };
    fetchData();
    fetchYourDataTaskes();
    fetchingTeamMember();
  }, [refreshAPI]);

  useEffect(() => {
    const getSection = () => {
      if (task && task.length > 0) {
        const sections = Array.from(new Set(task.map((item) => item.section)));
        const sectionMap = {};
        sections.forEach((section, index) => {
          sectionMap[section] = index + 1;
        });
        setSectionsData(sectionMap);
        const updatedData = task.map((item) => ({
          ...item,
          sectionId: sectionMap[item.section] || null,
        }));
        setTaskesShowedData(updatedData);
      }
    };
    getSection();
  }, [task]);

  const refreshing = () => {
    setRefreshAPI((prev) => !prev);
  };
  const openTaskAdding = () => {
    setOpenAddTask((prev) => !prev);
  };
  const handleInput = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    setFormSubmit((prev) => ({ ...prev, [name]: value }));
  };
  const hanldeCancelTask = () => {
    setOpenAddTask(false);
    setFormSubmit({
      name: "",
      description: "",
      assignee: "",
      startDate: "",
      endDate: "",
      status: "string",
      priority: "string",
      section: "",
      teamid: auth.othersId.teamId,
    });
    setSectionSelect("");
  };
  const handleCreateTask = async (e) => {
    e.preventDefault(); // Prevent the default form submission behavior

    console.log(sectionSelect);

    let today = new Date();
    const updateStatus = isBefore(today, formSubmit.endDate)
      ? "OnGoing"
      : "Urgent";
    console.log(updateStatus);
    let submitFormFinal = formSubmit;
    submitFormFinal = {
      ...submitFormFinal,
      section:
        submitFormFinal.section === ""
          ? sectionSelect
          : submitFormFinal.section,
      startDate:
        submitFormFinal.startDate === "" ? today : submitFormFinal.startDate,
      status: updateStatus,
    };
    // Check for required fields
    if (submitFormFinal.endDate === "") {
      ToastError("Choose due date for this task");
      return;
    }
    if (isBefore(submitFormFinal.endDate, today)) {
      ToastError("Can't not set the dou date before today.");
      return;
    }
    if (isBefore(submitFormFinal.endDate, submitFormFinal.startDate)) {
      ToastError("Can't not set the dou date before the start date.");
      return;
    }

    if (submitFormFinal.assignee === "") {
      ToastError("Choose assignee for this task");
      return;
    }

    try {
      const result = await APIServices.postAPI(
        "/class-service/task",
        submitFormFinal
      );
      if (result) {
        ToastSuccess("Create successfully");
        hanldeCancelTask();
        refreshing();
      }
      console.log(submitFormFinal);
    } catch (error) {
      console.error("Error creating task:", error);
      ToastError("An error occurred while creating the task.");
    }
  };

  const hanldeSetSection = (value) => {
    setSectionSelect(value);
  };
  const handleStartDate = (value) => {
    setFormSubmit((pre) => ({ ...pre, startDate: value }));
  };
  const handleEndDate = (value) => {
    setFormSubmit((pre) => ({ ...pre, endDate: value }));
  };

  return (
    <div className="w-full h-full relative">
      {openAddTask && (
        <div className=" w-full h-full absolute z-30">
          <div className="absolute w-full h-full bg-black opacity-50 z-10"></div>

          <div className="bg-white h-[20rem] w-[40rem] mx-auto mt-[10rem] rounded-xl shadow-md z-20 relative">
            <div
              className="absolute top-[0.3rem] right-[1rem] font-semibold text-xl cursor-pointer"
              onClick={hanldeCancelTask}
            >
              x
            </div>
            <div className=" z-20  w-fit flex items-center py-[2rem] px-[2rem]">
              <div className="relative">
                <input
                  className=" border-[0.15rem] border-[var(--login\_button)] rounded-md pl-[1rem] pr-[3rem] text-xl w-[15rem] py-[0.2rem]"
                  onChange={handleInput}
                  name="name"
                  value={formSubmit.name}
                  placeholder="Enter task title."
                />
                <div
                  className="absolute top-[0.3rem] right-[1rem] font-semibold text-xl cursor-pointer"
                  onClick={() =>
                    setFormSubmit((prev) => ({ ...prev, name: "" }))
                  }
                >
                  x
                </div>
              </div>
              <div className="ml-[2rem]">
                <Dropdown
                  functionClick={setFormSubmit}
                  arrayList={membersArray}
                  name="assignee"
                  form={formSubmit}
                  text="Unassigned"
                />
              </div>
              <button
                className="ml-[2rem] bg-green-500 px-[2rem] py-[0.8rem] text-white rounded-xl"
                onClick={handleCreateTask}
              >
                Create
              </button>
            </div>
            <div className="w-full border-b-[0.15rem] border-black" />
            <div className="flex w-full  justify-between h-full">
              <div className="w-[60%] pl-[2rem] mt-[1rem]">
                <div className="mb-[0.5rem] text-lg">Description</div>
                <textarea
                  className=" border-[0.15rem] border-[var(--login\_button)] rounded-md p-[1rem] text-xl w-full max-h-[8rem] min-h-[5rem] py-[0.2rem]"
                  value={formSubmit.description}
                  onChange={handleInput}
                  name="description"
                />
              </div>
              <div className="w-[30%] h-[12.8rem] bg-[var(--sider\_color)] rounded-ee-xl">
                <div className="text-lg   mt-[1rem]  ml-[1rem]">Date</div>
                <div className="w-full flex items-center px-[1rem] mt-[1rem]">
                  <div className="text-3xl">
                    <PiCalendar />
                  </div>
                  <DatePicker
                    selected={formSubmit.startDate}
                    onChange={(date) => handleStartDate(date)}
                    placeholderText="Start date"
                    className="w-full bg-inherit"
                  />
                </div>
                <div className="w-full flex items-center px-[1rem] mt-[1rem]">
                  <div className="text-3xl">
                    <PiCalendar />
                  </div>
                  <DatePicker
                    selected={formSubmit.endDate}
                    onChange={(date) => handleEndDate(date)}
                    placeholderText="Due date"
                    className="w-full bg-inherit"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      <RefrestApi.Provider
        value={{ refreshAPI, refreshing, openTaskAdding, hanldeSetSection }}
      >
        <Routes>
          <Route path="/*" element={<StudentLayout />}>
            <Route
              path="general"
              element={
                <GeneralPages
                  taskesDataArrayList={taskesShowedData}
                  yourAsignData={yourTaskes?.length}
                  membersArray={membersArray}
                />
              }
            />
            <Route path="reports" element={<ReportsPages />} />
            <Route
              path="tasks"
              element={
                <TasksPages
                  taskesDataArrayList={taskesShowedData}
                  sectionsDataArrayList={sectionsData}
                />
              }
            />
            <Route path="dashboard" element={<DashboardPages />} />
            <Route path="premiumbenefits" element={<PremiumPayment />} />
            <Route path="reportsubmit" element={<ReportSubmit />} />
          </Route>
        </Routes>
      </RefrestApi.Provider>
    </div>
  );
}
