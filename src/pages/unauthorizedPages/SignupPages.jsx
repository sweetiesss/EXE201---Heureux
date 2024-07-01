import { useNavigate } from "react-router-dom";

import {
  Button as CustButtom,
  Link as CustLink,
  Input as CustInput,
} from "../../components/sharing";
import { PiEnvelopeLight, PiKeyLight, PiUserCircle } from "react-icons/pi";
import ggIcon from "../../assets/icon/google.png";
import mcrsIcon from "../../assets/icon/MicrosftIcon.png";
import { useEffect, useState } from "react";
import "../../styles/Input.css";
import APIServices from "../../services/APIServices.ts";
import {
  ToastError,
  ToastSuccess,
} from "../../components/setting/ToastSetting.js";

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
    username: "",
    email: "",
    password: "",
    dob: "",
    phone: "",
    gender: "",
    roleCode: "",
    address: "update later",
  });
  const [error, setError] = useState({});

  useEffect(() => {
    const checkData = () => {
      let errors = {};

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

      if (form.username.length >= 1 && form.username.length < 6) {
        errors.username = "User name must be at least 6 characters.";
      }

      if (form.password.length >= 1 && form.password.length < 6) {
        errors.password = "Password must be at least 6 characters.";
      }

      if (form.email.length > 0) {
        if (!emailRegex.test(form.email)) {
          errors.email = "Invalid email address.";
        }
      }
      setError(errors);
    };
    checkData();
  }, [form]);

  const nav = useNavigate();

  const handleInput = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(form);
    let errors = {};
    let checkError = false;
    try {
      if (form.username === "") {
        errors.username = "Please enter your user name.";
        checkError = true;
      }
      if (form.password === "") {
        errors.password = "Please enter your password.";
        checkError = true;
      }
      if (form.email === "") {
        errors.email = "Please enter your email.";
        checkError = true;
      }
      if (form.dob === "") {
        errors.dob = "Please choose your date of birth.";
        checkError = true;
      }
      if (form.phone === "") {
        errors.phone = "Please enter your phone number.";
        checkError = true;
      }
      if (form.gender === "") {
        errors.gender = "Please choose your gender.";
        checkError = true;
      }
      if (form.roleCode === "") {
        errors.roleCode = "Please enter your role number.";
        checkError = true;
      }
      if (!checkError) {
        const result = await APIServices.postAPI("api/User/Register", form);

        if (result === 200) {
          ToastSuccess("Sign-up successfully.");
          nav("/Login");
        }
      } else {
        setError((prev) => ({ ...prev, ...errors }));
        console.log(error);
      }
    } catch (e) {
      var text = e?.response?.data?.title;
      console.log(text);
    }
  };
  return (
    <div className="flex flex-col justify-start items-center h-[85%] py-[3rem]">
      <p className="text-[var(--login\_button)] font-semibold text-3xl ">
        Sign up
      </p>
      <form>
        <CustInput
          inputName={"username"}
          inputValue={form.username}
          functed={handleInput}
          newClassName="mt-[3rem]"
          typeInput="text"
          placeHolder="Username"
          fIcon={PiUserCircle}
          bgColoredName="login_button"
          inputClassName="border-[1.5px] w-[20rem] rounded-md h-[3rem]"
        />
        {error?.username && (
          <div className="text-red-500">{error?.username}</div>
        )}
        <CustInput
          inputName={"email"}
          inputValue={form.email}
          functed={handleInput}
          newClassName="mt-[1rem]"
          typeInput="text"
          placeHolder="Education email"
          fIcon={PiEnvelopeLight}
          bgColoredName="login_button"
          inputClassName="border-[1.5px] w-[20rem] rounded-md h-[3rem]"
        />
        {error?.email && <div className="text-red-500">{error?.email}</div>}

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
        {error?.password && (
          <div className="text-red-500">{error?.password}</div>
        )}

        <CustInput
          inputName={"dob"}
          inputValue={form.dob}
          functed={handleInput}
          newClassName="mt-[1rem]"
          typeInput="date"
          fIcon={PiKeyLight}
          bgColoredName="login_button"
          inputClassName={`border-[1.5px] w-[20rem] rounded-md h-[3rem] `}
        />
        {error?.dob && <div className="text-red-500">{error?.dob}</div>}
        <CustInput
          inputName={"phone"}
          inputValue={form.phone}
          functed={handleInput}
          newClassName="mt-[1rem]"
          typeInput="number"
          placeHolder="Phone number"
          fIcon={PiKeyLight}
          bgColoredName="login_button"
          inputClassName="border-[1.5px] w-[20rem] rounded-md h-[3rem]"
        />
         {error?.phone && (
          <div className="text-red-500">{error?.phone}</div>
        )}
        <div
          className="input-container relative border-[1.5px] border-[var(--login\_button)] rounded-md mt-[1rem]"
          style={{
            "--backgroundColor": "var(--login_button)",
            "--hoveredColor": "var(--login_button_hover)",
          }}
        >
          <label
            className="absolute inset-y-0 left-0 pl-[1rem] flex items-center text-xl label_input"
            style={form.gender !== "" ? { color: "black" } : {}}
          >
            <PiKeyLight />
          </label>
          <select
            name="gender"
            onChange={handleInput}
            className="input_main py-[0.5rem] w-[20rem] rounded-md h-[3rem] pl-[3rem]"
            style={form.gender !== "" ? { color: "black" } : {}}
          >
            <option value="">Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Others">Others</option>
          </select>
        </div>
        {error?.gender && (
          <div className="text-red-500">{error?.gender}</div>
        )}
        <div
          className="input-container relative border-[1.5px] border-[var(--login\_button)] rounded-md mt-[1rem]"
          style={{
            "--backgroundColor": "var(--login_button)",
            "--hoveredColor": "var(--login_button_hover)",
          }}
        >
          <label
            className="absolute inset-y-0 left-0 pl-[1rem] flex items-center text-xl label_input"
            style={form.roleCode !== "" ? { color: "black" } : {}}
          >
            <PiKeyLight />
          </label>
          <select
            name="roleCode"
            onChange={handleInput}
            className="input_main py-[0.5rem] w-[20rem] rounded-md h-[3rem] pl-[3rem]"
            style={form.roleCode !== "" ? { color: "black" } : {}}
          >
            <option value="">Your role</option>
            <option value="Student">Student</option>
            <option value="Lecturer">Lecturer</option>
          </select>
        </div>
        {error?.roleCode && (
          <div className="text-red-500">{error?.roleCode}</div>
        )}
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
