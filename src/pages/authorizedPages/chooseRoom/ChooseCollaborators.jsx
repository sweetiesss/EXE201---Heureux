import { useState } from "react";
import { Button as CustButtom } from "../../../components/sharing";
import {
  PiUserFocus,
  PiEnvelope,
  PiCaretRight,
} from "react-icons/pi";
import { useNavigate } from "react-router-dom";
import {
  Input as CustInput,
} from "../../../components/sharing";


export default function ChooseCollaborators({ setSubmitform }) {
  const nav = useNavigate();
  const [needMentor, checkNeedMentor] = useState(false);
  const [form, setForm] = useState({
    collaboratorEmail: "",
    projectType: "",
    collaboratorPosition: "",
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
        Add collaborators
      </p>
      <form className="flex flex-col items-center" onSubmit={handleSubmit}>
        <div className="mt-[1.5rem]">
          <div
            className="p-[2rem] rounded-xl my-shadow"
          >
            <CustInput
              inputName="collaboratorEmail"
              inputValue={form.collaboratorEmail}
              functed={handleInput}
              newClassName=""
              typeInput="text"
              placeHolder="Email"
              fIcon={PiEnvelope}
              fIconNewClass={"text-3xl"}
              bgColoredName="login_button"
              inputClassName="border-[1.5px] w-[20rem] rounded-md h-[3rem]"
            />
            <CustInput
              inputName="collaboratorPosition"
              inputValue={form.collaboratorPosition}
              functed={handleInput}
              newClassName="mt-[1.5rem]"
              typeInput="text"
              placeHolder="Position"
              fIcon={PiUserFocus}
              fIconNewClass={"text-3xl"}
              bgColoredName="login_button"
              inputClassName="border-[1.5px] w-[20rem] rounded-md h-[3rem]"
            />
          </div>
        </div>
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
