import { useNavigate } from "react-router-dom";

import {
  Button as CustButtom,
  Link as CustLink,
  Input as CustInput,
} from "../../components/sharing";
import { PiEnvelopeLight, PiKeyLight } from "react-icons/pi";
import ggIcon from "../../assets/icon/google.png";
import { useEffect, useState } from "react";
import {
  ToastError,
  ToastSuccess,
} from "../../components/setting/ToastSetting";
import APIServices from "../../services/APIServices.ts";
import axios from "axios";
import { useLocalData } from "../../components/setting/useContext.js";

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
export default function LoginPages() {
  const nav = useNavigate();
  const [user, setUser] = useState();
  const { setData, setSupscriptionData } = useLocalData();
  const [form, setForm] = useState({
    emailOrUserName: "",
    password: "",
  });
  const handleInput = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (form.emailOrUserName === "" || form.password === "") {
        ToastError("Enter your email or password");
        return;
      }
      const result = await APIServices.postAPI("api/User/Login", {
        email: form.emailOrUserName,
        password: form.password,
      });

      if (result === 200) {
        const userInfor = await APIServices.getAPI(
          `api/User/GetUser/${form?.emailOrUserName}`
        );
        setData(userInfor);
        if (userInfor) {
          const roleCodeSub = await APIServices.getAPI("/api/Subscription/GetSubcriptions?pageIndex=0&pageSize=10");
          if (roleCodeSub) {
            const userSub = await APIServices.getAPI("/api/UserSubscription/GetUserSubscription?pageIndex=0&pageSize=100");
            if (userSub) {
              const userSubscriptions = userSub.items.filter((trans) => trans.userId === userInfor.id);
              const enrichedSubscriptions = userSubscriptions.map((item) => {
                const matchedRole = roleCodeSub.items.find((role) => role.id === item.subscriptionId);
                return matchedRole
                  ? { ...item, ...matchedRole }
                  : { ...item, name: "Free trial" };
              });
              setSupscriptionData(enrichedSubscriptions);
            }
          }
        }
        if (userInfor?.roleCode === "STUDENT") {
          nav("/ChooseRoom");
          ToastSuccess("Welcome " + userInfor?.username);
        } else {
          nav("/Lecturer");
          ToastSuccess("Welcome " + userInfor?.username);
        }
      }

      // nav("/student/general");
    } catch (e) {}
  };
  return (
    <div className="flex flex-col justify-start items-center ">
      <p className="text-[var(--login\_button)] font-semibold text-3xl mt-[3rem]">
        Log in
      </p>
      <form>
        <CustInput
          inputName="emailOrUserName"
          inputValue={form.emailOrUserName}
          functed={handleInput}
          newClassName="mt-[3rem]"
          typeInput="text"
          placeHolder="Email or Username"
          fIcon={PiEnvelopeLight}
          bgColoredName="login_button"
          inputClassName="border-[1.5px] w-[20rem] rounded-md h-[3rem]"
        />
        <CustInput
          inputName="password"
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
          content="Log in"
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
          " w-[18rem] h-[3rem] text-nowrap font-normal px-[20%]  text-white rounded-full mt-[1rem]"
        }
        fIcon={Ggsvg}
        bgColoredName="login_button"
      />
    </div>
  );
}
