import { Outlet, useLocation } from "react-router-dom";
import { UnauthorizedHeader } from "./Header";
import { LeftSider, RightSiderDateTime, RightSiderMember } from "./Siders";
import { Input as InputCus } from "../../components/sharing";
import { PiMagnifyingGlass, PiPlusBold } from "react-icons/pi";
import { useEffect, useRef, useState } from "react";
import defaultAvatar from "../../assets/img/DefaultAvatar.png";
import AddingStudent from "../../components/studentCom/AddingStudent";

export default function Layouts({ header, footer }) {
  return (
    <div className="w-full h-screen">
      <div className="h-[15%]">
        {header === "unauthorized" && <UnauthorizedHeader />}
        {header === "login" && <UnauthorizedHeader pageType="login" />}
        {header === "home" && <UnauthorizedHeader pageType="home" />}
        {header === "sign up" && <UnauthorizedHeader pageType="sign up" />}
      </div>
      <div className="min-h-[85%] ">
        <Outlet />
      </div>
    </div>
  );
}

export function StudentLayout() {
  const [search, setSearch] = useState();
  const [typeRight, setTypeRight] = useState("");
  const [avatarShowed, setAvatarShowed] = useState(10);
  const [openSetting, setOpenSetting] = useState(false);
  const setting = useRef(null);
  const addTeam = useRef(null);
  //adding
  const [openAddStudent, setOpenAddStudent] = useState(false);
  //clone members
  const cloneMembers=[{
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
  }];

  const handleClickedOusite = (e) => {
    if (setting.current && !setting.current.contains(e.target)) {
      setOpenSetting(false);
    }
    if (addTeam.current && !addTeam.current.contains(e.target)) {
      setOpenAddStudent(false);
    }
  };


  

  useEffect(() => {
    document.addEventListener("mousedown", handleClickedOusite);
    return () => {
      document.removeEventListener("mousedown", handleClickedOusite);
    };
  }, []);
  const toggleSetting = (e) => {
    e.stopPropagation();
    setOpenSetting((prev) => !prev);
  };
  const location = useLocation();
  useEffect(() => {
    const calculateAvatars = () => {
      const avatarHolder = document.getElementById("avatarHolder");
      if (avatarHolder) {
        const documetFontSize = window.getComputedStyle(
          document.documentElement
        ).fontSize;
        let fontSize = 16;
        if (documetFontSize) {
          fontSize = parseFloat(documetFontSize);
        }
        const avatarShowed = Math.floor(
          avatarHolder.clientWidth / fontSize / 3
        );
        setAvatarShowed(avatarShowed);
      }
    };
    calculateAvatars();
    window.addEventListener("resize", calculateAvatars);
    return () => window.removeEventListener("resize", calculateAvatars);
  }, [typeRight]);
  useEffect(() => {
    const calculateRightSide = () => {
      const locations = location.pathname.split("/");

      var page = locations[locations.length - 1];

      if (page === "general") {
        setTypeRight("Date");
      } else if (page === "tasks") {
        setTypeRight("Member");
      } else setTypeRight("");
    };
    calculateRightSide();
  }, [location]);


  return (
    <div className="flex w-full h-[100vh] relative">
      <div className=" h-full bg-[var(--sider\_color)]  w-[11%]  font-semibold">
        <LeftSider />
      </div>

      <div
        className={`${
          typeRight && typeRight == "Date" ? " w-[66%] " : " w-[79%] "
        } flex flex-col  h-full`}
      >
        <div className="pl-[2rem]  flex items-center w-full relative h-[10%]">
          <p className="text-xl font-semibold">Project Name</p>
          <InputCus
            inputValue={search}
            inputName="search"
            functed={(e) => setSearch(e.target.value)}
            newClassName="ml-[2rem] w-[55%]  min-w-[23rem] "
            placeHolder="Find something"
            bgColoredName="login_button"
            fIcon={PiMagnifyingGlass}
            inputClassName="border-[1.5px] w-full rounded-full h-[3rem]"
          />
          <div
            className=" pl-[1rem] flex w-[20%] absolute right-0 "
            id="avatarHolder"
          >
            {Array.from({ length: avatarShowed }, (_, index) => (
              <div
                key={index}
                className="w-[3rem] h-[3rem] ml-[-1rem] bg-yellow-500 rounded-full shadow-lg avatar-shadow"
              ></div>
            ))}
            <div
              className="w-[3rem] h-[3rem] ml-[-1rem] cursor-pointer bg-[var(--sider\_color)] text-[var(--login\_button)] rounded-full shadow-lg avatar-shadow flex justify-center items-center"
              onClick={() => setOpenAddStudent((prev) => !prev)}
            >
              <PiPlusBold className="text-2xl" />
            </div>
          </div>
        </div>
        <div className="h-[88%] px-[2rem]">
          <Outlet />
        </div>
      </div>
      <div className="absolute right-0 top-4 z-10" ref={setting}>
        <div
          className="bg-black  rounded-full w-[4rem] h-[4rem] cursor-pointer mr-[2rem]"
          onClick={toggleSetting}
        >
          <img src={defaultAvatar} />
        </div>
        <div
          className={`absolute bg-white mt-[1rem] w-[22rem] ${
            openSetting ? " block " : " hidden "
          } `}
          style={{ right: "10px", top: "70px" }} // Adjust the position if necessary
        >
          <div></div>
          <div></div>
          <div>Purchase and your memberships.</div>
          <div></div>
        </div>
      </div>
      <div
        className={` ${
          typeRight && typeRight == "Date" ? " w-[23%] " : " w-[10%] "
        }  h-full  `}
        style={{ background: "var(--sider_color)" }}
      >
        {typeRight && typeRight === "Date" ? (
          <RightSiderDateTime />
        ) : (
          <RightSiderMember />
        )}
      </div>
      <AddingStudent addTeam={addTeam} openAddStudent={openAddStudent} setOpenAddStudent={setOpenAddStudent} members={cloneMembers}/>
    </div>
  );
}
