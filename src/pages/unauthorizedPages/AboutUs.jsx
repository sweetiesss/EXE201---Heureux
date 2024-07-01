import { PiCaretRight } from "react-icons/pi";
import image01 from "../../assets/img/Khung 1.png";
import image02 from "../../assets/img/Khung 2.png";
import image03 from "../../assets/img/Khung 3.png";
import image04 from "../../assets/img/Khung 4.png";
import "../../styles/Button.css";
import {
  Button as CustButtom,
  Link as CustLink,
} from "../../components/sharing";
import { Navigate, useNavigate } from "react-router-dom";
export default function AboutUs({}) {
  const nav = useNavigate();
  const buttonHolderStyle = {
    "--backgroundColor": "var(--login_button)",
    "--hoveredColor": "var(--login_button_hover)",
  };
  return (
    <div className="flex w-full justify-center ">
      <div className="max-w-[30%] ml-[12%] mr-[5%]">
        <p className="text-3xl font-medium text-gray-500">About us</p>
        <p className="text-xl my-[2rem] " style={{ lineHeight: "2.2rem" }}>
          Welcome to the assignment and study management website! Our
          comprehensive platform assists instructors and students in organizing,
          tracking, and managing assignments and group work. With a
          user-friendly interface, automatic notifications, and efficient
          results storage, both lecturers and students can save time and enhance
          their learning experience.
        </p>
        <p className="text-xl" style={{ lineHeight: "2.2rem" }}>
          Join us to enjoy convenience and professionalism!” Feel free to let me
          know if you’d like any further adjustments! 😊
        </p>
        <div className="flex w-full justify-evenly mt-[3rem]">
          <div className="button-holder   text-white" style={buttonHolderStyle}>
            <button className="button-main px-[2rem] py-[1rem]  rounded-full" onClick={()=>nav("/Signup")}>
              Sign up now {">"}
            </button>
          </div>
          <div
            className="button-holder  bg-white text-gray-700 "
            style={{ "--outlineActive": "var(--login_button)" }}
          >
            <button className="button-main px-[2rem] py-[1rem] outline-[0.2rem] outline-gray-800  outline rounded-full">
              Take a tour {">"}
            </button>
          </div>
        </div>
      </div>
      <div>
        <div className="grid-container ">
          <div className="grid-item">
            <p className="absolute font-semibold w-full text-center top-[1rem]">
              Create & grade assignments.
            </p>
            <img src={image01} />
          </div>
          <div className="grid-item">
            <p className="absolute font-semibold w-full text-center top-[1rem]">
              Tracking student progress.
            </p>

            <img src={image02} />
          </div>
          <div className="grid-item">
            <p className="absolute font-semibold w-full text-center top-[1rem]">
              Submit assignment online.
            </p>

            <img src={image03} />
          </div>
          <div className="grid-item">
            <p className="absolute font-semibold w-full text-center top-[1rem]">
              Time management & division of work
            </p>
            <img src={image04} />
          </div>
        </div>
      </div>
    </div>
  );
}
