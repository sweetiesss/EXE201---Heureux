import { useNavigate } from "react-router-dom";

import {
  Button as CustButtom,
  Link as CustLink,
  Input as CustInput,
} from "../../components/sharing";
import { PiEnvelopeLight, PiKeyLight, PiUserCircle } from "react-icons/pi";
import ggIcon from "../../assets/icon/google.png";
import mcrsIcon from "../../assets/icon/MicrosftIcon.png";
import { useState } from "react";

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

function Mcrsfsvg() {
  return (
    <div className="rounded-full relative bg-white p-4">
      <img
        src={mcrsIcon}
        className="w-auto h-[70%] absolute inset-0 m-auto"
        alt="Microsoft Icon"
      />
    </div>
  );
}
export default function SignupPages() {
  const [form, setForm] = useState({
    UserName: "",
    EduEmail: "",
    password: "",
  });
  const nav = useNavigate();

  const handleInput = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(form);
  };
  return (
    <div className="flex flex-col justify-start items-center h-[85%]">
      <p className="text-[var(--login\_button)] font-semibold text-3xl mt-[3rem]">
        Sign up
      </p>
      <form>
        <CustInput
          inputName={"UserName"}
          inputValue={form.UserName}
          functed={handleInput}
          newClassName="mt-[3rem]"
          typeInput="text"
          placeHolder="Username"
          fIcon={PiUserCircle}
          bgColoredName="login_button"
          inputClassName="border-[1.5px] w-[20rem] rounded-md h-[3rem]"
        />
        <CustInput
          inputName={"EduEmail"}
          inputValue={form.EduEmail}
          functed={handleInput}
          newClassName="mt-[1rem]"
          typeInput="text"
          placeHolder="Education email"
          fIcon={PiEnvelopeLight}
          bgColoredName="login_button"
          inputClassName="border-[1.5px] w-[20rem] rounded-md h-[3rem]"
        />
        <CustInput
          inputName={"password"}
          inputValue={form.password}
          functed={handleInput}
          newClassName="mt-[1rem]"
          typeInput="password"
          placeHolder="Password"
          fIcon={PiKeyLight}
          bgColoredName="login_button"
          inputClassName="border-[1.5px] w-[20rem] rounded-md h-[3rem]"
        />
        <CustButtom
          functed={handleSubmit}
          content="Sign up"
          bgColoredName="login_button"
          newClassName="text-white w-full justify-center py-2 rounded-md h-[3rem] mt-[1rem]"
        />
      </form>
      <CustLink
        content="Forgot my password"
        textColoredName="login_button"
        newClassName="w-fit mt-[1rem]"
      />
      <CustButtom
        content="Continue with Google"
        newClassName={
          " w-[20rem] h-[3rem] text-nowrap font-normal px-[20%]  text-white rounded-full mt-[1rem]"
        }
        fIcon={Ggsvg}
        bgColoredName="login_button"
      />
      {/* <CustButtom
        content="Continue with Microsoft"
        newClassName={
          " w-[20rem] h-[3rem] text-nowrap font-normal px-[20%]  text-white rounded-full mt-[1rem]"
        }
        fIcon={Mcrsfsvg}
        bgColoredName="login_button"
      /> */}
    </div>
  );
}
