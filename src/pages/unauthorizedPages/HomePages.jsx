import { useNavigate } from "react-router-dom";

import {
  Button as CustButtom,
  Link as CustLink,
} from "../../components/sharing";
import ggIcon from "../../assets/icon/google.png";
import homePagesImg from "../../assets/img/HomePageImg.png";


function Ggsvg() {
  return (
    <div className="rounded-full relative bg-white p-4">
      <img
        src={ggIcon}
        className="w-auto h-[70%] absolute inset-0 m-auto"
        alt="Google Icon"
      />
    </div>
  );
}
export default function HomePages() {
  const nav = useNavigate();
  return (
    <div className="h-full w-full flex flex-col items-center justify-between">
      <h3 className="text-[#686868] text-2xl mt-[3rem]">
        Secure task and project management for team
      </h3>
      <h2 className="text-[#686868] text-6xl mt-[2rem]">
        <span className="text-black">Heureux</span> with your work
      </h2>
      <CustButtom
        content="Continue with Google"
        newClassName={
          " w-[18rem] h-[3rem] text-nowrap font-normal px-[20%]  text-white rounded-full mt-[3rem]"
        }
        fIcon={Ggsvg}
        bgColoredName="login_button"
      />
      <CustLink
        linkTo="/Signup"
        textColoredName="login_button"
        content="or sign up with your email address"
        newClassName="w-fit mt-[3rem]"
      ></CustLink>
      <img
        src={homePagesImg}
        className="w-[80%] -translate-x-2 pointer-events-none absolute bottom-0"
      />
    </div>
  );
}
