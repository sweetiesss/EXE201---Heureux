import { useContext, useEffect, useState } from "react";
import { ToastError, ToastSuccess } from "../setting/ToastSetting";
import APIServices from "../../services/APIServices.ts";
import { RefrestApi } from "../../pages/authorizedPages/student/StudentHome.jsx";

export default function AddingStudent({
  addTeam,
  openAddStudent,
  setOpenAddStudent,
  members,
}) {
  const [addingForm, setAddingForm] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [allUser, setAllUser] = useState([]);
  const [infor, setDataInfor] = useState();
  const refreshAPIContext = useContext(RefrestApi);
  const [teamMembers, setTeamMembers] = useState([]);

  useEffect(() => {
    setTeamMembers(members || []);
  }, [members]);

  useEffect(() => {
    const fetchAllUser = async () => {
      try {
        const result = await APIServices.getAPI(
          "/api/User/GetUsers?pageIndex=0&pageSize=100"
        );
        console.log(result);
        setAllUser(result?.items);
      } catch (e) {}
    };
    fetchAllUser();
  }, []);

  useEffect(() => {
    const fetchDataInfor = () => {
      if (infor) {
        const filtered = allUser?.filter(
          (item) =>
            item.email.trim().toLowerCase().split("@")[0].includes(infor) ||
            item.username.trim().toLowerCase().includes(infor)
        );
        setFilteredData(filtered);
      } else {
        setFilteredData([]);
      }
    };

    fetchDataInfor();
  }, [infor]);
  const handleInputAddingForm = (infor) => {
    const newForm = [...addingForm];
    let check = newForm.some((value) => value?.id === infor?.id);
    if (!check && members) {
      check = members.some((value) => value?.userid === infor?.username);
    }
    if (!check) {
      newForm[addingForm.length] = infor;
      setAddingForm(newForm);
      setDataInfor("");
    }
  };
  const handleInputRemoveForm = (infor) => {
    const newForm = addingForm.filter((item) => item.id !== infor?.id);
    if (newForm.length < addingForm.length) {
      setAddingForm(newForm);
    }
  };

  const hanldeInput = (e) => {
    if (infor === "" && e.key === "Backspace" && addingForm?.length > 0) {
      const newform = addingForm.slice(0, -1);
      setAddingForm(newform);
    }
  };
  const handleCloseAddStudent = () => {
    setAddingForm([]);
    setDataInfor("");
    setFilteredData([]);
    setOpenAddStudent(false);
  };

  if (!openAddStudent) return null; // Only render the view if openAddStudent is true

  const handleOnclickAddingTeam = async (e) => {
    e.preventDefault();
    console.log(addingForm);
    try {
      let submitForm = [];
      addingForm.map((item) => {
        submitForm.push(item?.id);
      });
      console.log(submitForm);
      if (submitForm.length > 0) {
        const result = await APIServices.postAPI(
          "/class-service/user_team/1/addUsers",
          submitForm
        );
        console.log(result);
        if (result?.statusCode === 200) {
          refreshAPIContext.refreshing();
          setAddingForm([]);
          setDataInfor("");
          setFilteredData([]);
          ToastSuccess("Adding successfully.");
        }
      }
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div className="w-full h-full absolute top-0 z-20 flex justify-center items-center">
      <div className="relative bg-black opacity-50 w-full h-full"></div>
      <div
        className="bg-white absolute flex flex-col p-4 rounded-xl shadow-xl"
        ref={addTeam}
      >
        <div className=" mb-[2rem] mt-[0.5rem] relative">
          <p className="font-semibold text-2xl">Add Members</p>
          <button
            className="absolute right-0 -top-1 font-semibold text-2xl w-[2rem] hover:text-[var(--login\_button)]"
            onClick={handleCloseAddStudent}
          >
            x
          </button>
        </div>
        <div className="flex ">
          <div className="p-1 px-[1rem] border-[var(--login\_button)] mb-[1rem] border-[0.2rem] relative w-[20rem] flex flex-wrap  rounded-md items-center">
            {addingForm.length > 0 &&
              addingForm.map((inform) => (
                <div className="pl-[1rem] pr-[0.5rem] py-[0.2rem] bg-slate-300 rounded-md flex justify-center items-center mr-[0.5rem] my-[0.5rem] h-[2rem] ">
                  <div className="mr-[0.5rem]">{inform?.username}</div>
                  <div
                    className="w-[1.5rem] cursor-pointer text-center hover:text-blue-500 text-lg "
                    onClick={() => handleInputRemoveForm(inform)}
                  >
                    x
                  </div>
                </div>
              ))}
            <input
              className="flex-grow w-[20%]  my-[0.5rem] relative"
              type="text"
              onChange={(e) => setDataInfor(e.target.value)}
              onKeyDown={hanldeInput}
              value={infor}
              style={{ outline: "none" }}
            />
            {filteredData.length > 0 && (
              <div className="absolute top-[3rem] left-0 bg-white shadow-xl max-h-[12rem] overflow-y-scroll  w-[20rem] border-[var(--login\_button)] border-[0.2rem] p-[1rem]">
                {filteredData.map((value, index) => (
                  <div
                    className="hover:bg-slate-300 p-[1rem] flex-col cursor-pointer"
                    key={index}
                    onClick={() => handleInputAddingForm(value)}
                  >
                    <div>{value?.username}</div>
                    <div>{value?.email}</div>
                  </div>
                ))}
              </div>
            )}
          </div>

          <button
            className="h-[3rem] px-[0.5rem] border-[0.2rem] border-[var(--login\_button)] rounded-lg ml-[1rem] text-[var(--login\_button)] font-semibold"
            onClick={handleOnclickAddingTeam}
          >
            Add
          </button>
        </div>
        <div className="max-h-[20rem] overflow-y-scroll">
          {teamMembers &&
            teamMembers.map((member, index) => (
              <div className=" p-[1rem] flex-col " key={index}>
                <div>{member?.userid}</div>
                <div>{member?.email}</div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}
