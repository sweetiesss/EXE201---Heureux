import { useState } from "react";
import { Button as CustButtom } from "../../../components/sharing";
import { PiFlower, PiUmbrella, PiLeaf, PiCaretRight } from "react-icons/pi";
import {  useNavigate } from "react-router-dom";


export default function ChooseSemester({setSubmitform}) {
    const nav=useNavigate();
  const [value, setValue] = useState();
  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitform(value);
    nav("/main/project");
  };
  return (
    <div className="flex flex-col justify-start items-center ">
      <p className="text-[var(--login\_button)] font-semibold text-4xl mt-[3rem]">
        Choose your semester
      </p>
      <form className="flex flex-col " onSubmit={handleSubmit}>
        <label
          htmlFor="spring2024"
          className="border-[1.5px] cursor-pointer mt-[3rem] text-base border-[var(--login\_button)] w-[20rem] flex items-center justify-start py-3 pl-5 rounded-xl h-[3rem]"
          style={
            value === "spring2024"
              ? { backgroundColor: "var(--login_button)", color: "white" }
              : {}
          }
        >
          <PiFlower className="text-3xl mr-[1rem]" /> Spring 2024
        </label>
        <input
          onChange={(e) => setValue(e.target.value)}
          id="spring2024"
          type="radio"
          name="semester"
          className="hidden"
          value="spring2024"
        />
        <label
          htmlFor="summer2024"
          className="border-[1.5px] cursor-pointer mt-[1.5rem] text-base border-[var(--login\_button)] w-[20rem] flex items-center justify-start py-3 pl-5 rounded-xl h-[3rem]"
          style={
            value === "summer2024"
              ? { backgroundColor: "var(--login_button)", color: "white" }
              : {}
          }
        >
          <PiUmbrella className="text-3xl mr-[1rem]" />
          Summer 2024
        </label>
        <input
          onChange={(e) => setValue(e.target.value)}
          id="summer2024"
          value="summer2024"
          type="radio"
          name="semester"
          className="hidden"
        />
        <label
          htmlFor="fall2024"
          className="border-[1.5px] cursor-pointer mt-[1.5rem] text-base border-[var(--login\_button)] w-[20rem] flex items-center justify-start py-3 pl-5 rounded-xl h-[3rem]"
          style={
            value === "fall2024"
              ? { backgroundColor: "var(--login_button)", color: "white" }
              : {}
          }
        >
          <PiLeaf className="text-3xl mr-[1rem]" />
          Fall 2024
        </label>
        <input
          onChange={(e) => setValue(e.target.value)}
          id="fall2024"
          value="fall2024"
          type="radio"
          name="semester"
          className="hidden"
        />
        <CustButtom
          content="Continue"
          newClassName={
            "w-[20rem] mt-[3rem] font-normal py-4 justify-center text-white  rounded-xl h-[3rem]"
          }
          bgColoredName="login_button"
          bIcon={PiCaretRight}
        />
      </form>
    </div>
  );
}
