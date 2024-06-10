import { useState } from "react";
import { Button as CustButtom } from "../../../components/sharing";
import {
  PiFileText,
  PiShapes,
  PiUserFocus,
  PiEnvelope,
  PiCaretRight,
  PiPlusCircle ,
} from "react-icons/pi";
import { useNavigate } from "react-router-dom";
import {
  Input as CustInput,
  Link as CusLink,
} from "../../../components/sharing";
import "../../../styles/select.css";
export default function ChooseProject({ setSubmitform }) {
  const nav = useNavigate();
  const [needMentor, checkNeedMentor] = useState(false);
  const [form, setForm] = useState({
    projectName: "",
    projectType: "",
    yourPosition: "",
    mentorEmail: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log(form);
  };
  const handleInput = (e) => {
    const { value, name } = e.target;
    setForm((e) => ({ ...e, [name]: value }));
  };
  return (
    <div className="flex flex-col justify-start items-center ">
      <p className="text-[var(--login\_button)] font-semibold text-4xl mt-[3rem]">
        Create your project
      </p>
      <form className="flex flex-col " onSubmit={handleSubmit}>
        <CustInput
          inputName="projectName"
          inputValue={form.projectName}
          functed={handleInput}
          newClassName="mt-[3rem]"
          typeInput="text"
          placeHolder="Project name"
          fIcon={PiFileText}
          fIconNewClass={"text-3xl"}
          bgColoredName="login_button"
          inputClassName="border-[1.5px] w-[20rem] rounded-md h-[3rem]"
        />
        <div className="relative mt-[1.5rem] border-[1.5px] w-[20rem] rounded-md h-[3rem] border-[var(--login\_button)]">
          <div className="absolute inset-y-0 left-0 pl-[1rem] flex items-center text-3xl">
            <PiShapes />
          </div>
          <select
            className="w-full h-full rounded-md pl-[3rem] cursor-pointer"
            placeHolder="Project Type"
            style={
              form.projectType === ""
                ? { color: "#a0a7b2" }
                : { color: "black" }
            }
            name="projectType"
            value={form.projectType}
            onChange={handleInput}
          >
            <option value="" disabled selected>
              Project type
            </option>
            <hr />
            <option className="text-black" value="test01">
              Test 01
            </option>
            <option className="text-black" value="test02">
              Test 02
            </option>
            <option className="text-black" value="test03">
              Test 03
            </option>
          </select>
        </div>
        <CustInput
          inputName="yourPosition"
          inputValue={form.yourPosition}
          functed={handleInput}
          newClassName="mt-[1.5rem]"
          typeInput="text"
          placeHolder="Your position"
          fIcon={PiUserFocus}
          fIconNewClass={"text-3xl"}
          bgColoredName="login_button"
          inputClassName="border-[1.5px] w-[20rem] rounded-md h-[3rem]"
        />
        {needMentor ? (
          <CustInput
            inputName="mentorEmail"
            inputValue={form.mentorEmail}
            functed={handleInput}
            newClassName="mt-[1.5rem]"
            typeInput="text"
            placeHolder="Mentor's email"
            fIcon={PiEnvelope}
            fIconNewClass={"text-3xl"}
            bgColoredName="login_button"
            inputClassName="border-[1.5px] w-[20rem] rounded-md h-[3rem]"
          />
        ) : (
          <CusLink
            funcDo={() => checkNeedMentor(true)}
            textColoredName="login_button"
            content="Add mentor's email"
            newClassName="w-fit ml-[1rem] mt-[1.5rem]"
            fIcon={PiPlusCircle}
            fIconClassName="text-3xl mr-[1rem]"
          />
        )}

        <CustButtom
          content="Continue"
          newClassName={
            "w-[20rem] mt-[3rem] font-normal py-4 justify-center text-white  rounded-xl"
          }
          bgColoredName="login_button"
          bIcon={PiCaretRight}
        />
      </form>
    </div>
  );
}
