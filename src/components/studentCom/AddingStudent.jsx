import { useEffect, useState } from "react";
import { ToastError, ToastSuccess } from "../setting/ToastSetting";

export default function AddingStudent({
  addTeam,
  openAddStudent,
  setOpenAddStudent,
  members,
}) {
  const cloneData = [
    {
      id: 1,
      email: "abc@gmail.com",
      username: "abc",
    },
    {
      id: 2,
      email: "def@gmail.com",
      username: "def",
    },
    {
      id: 3,
      email: "ghi@gmail.com",
      username: "ghi",
    },
    {
      id: 4,
      email: "jkl@gmail.com",
      username: "jkl",
    },
    {
      id: 5,
      email: "mno@gmail.com",
      username: "mno",
    },
    {
      id: 6,
      email: "pqr@gmail.com",
      username: "pqr",
    },
    {
      id: 7,
      email: "stu@gmail.com",
      username: "stu",
    },
    {
      id: 8,
      email: "vwx@gmail.com",
      username: "vwx",
    },
    {
      id: 9,
      email: "yz@gmail.com",
      username: "yz",
    },
    {
      id: 10,
      email: "123@gmail.com",
      username: "123",
    },
  ];
  const [addingForm, setAddingForm] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [infor, setDataInfor] = useState();

  useEffect(() => {
    const fetchDataInfor = () => {
      if (infor) {
        const filtered = cloneData.filter(
          (item) =>
            item.email.split("@")[0].includes(infor) ||
            item.username.includes(infor)
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
      check = members.some((value) => value?.id === infor?.id);
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
              className="flex-grow w-[20%]  my-[0.5rem] "
              type="text"
              onChange={(e) => setDataInfor(e.target.value)}
              onKeyDown={hanldeInput}
              value={infor}
              style={{ outline: "none" }}
            />
          </div>
          {filteredData.length > 0 && (
            <div className="absolute -bottom-[6em] bg-white shadow-xl  w-[20rem] border-[var(--login\_button)] border-[0.2rem] p-[1rem]">
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

          <button
            className="h-[3rem] px-[0.5rem] border-[0.2rem] border-[var(--login\_button)] rounded-lg ml-[1rem] text-[var(--login\_button)] font-semibold"
            onClick={() => {
              console.log(addingForm);
            }}
          >
            Add
          </button>
        </div>
        <div className="max-h-[20rem] overflow-y-scroll">
          {members &&
            members.map((member, index) => (
              <div className=" p-[1rem] flex-col " key={index}>
                <div>{member?.username}</div>
                <div>{member?.email}</div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}
