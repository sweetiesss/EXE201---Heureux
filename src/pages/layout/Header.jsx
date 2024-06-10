import {
  Button as CustButtom,
  Link as CustLink,
} from "../../components/sharing";

import { PiCaretRight } from "react-icons/pi";
import Heuruex from "../../assets/icon/heuruex.png";
import { useNavigate } from "react-router-dom";

export function UnauthorizedHeader({ pageType }) {
  const nav = useNavigate();
const pages=window.location.pathname;

  return (
    <div className="w-full  items-center flex text-base justify-center">
      <div className="w-fit flex px-[10%] font-semibold ">
        <div className="px-[1.7rem] py-[1.5rem] flex relative  h-auto">
          <CustLink
            newClassName="px-[1.7rem] py-[1.5rem] "
            linkTo="/"
            content="Heureux"
            logoImg={Heuruex}
            fIconClassName="mr-[1rem]"
            textColoredName={pages==="/"&&"login_button"}

          ></CustLink>
        </div>
        <div className="w-fit min-w-[400px] flex">
          <CustLink
            newClassName="px-[1.7rem] py-[1.5rem]"
            linkTo="/AboutUs"
            content="About us"
            textColoredName={pages==="/AboutUs"&&"login_button"}
          ></CustLink>
          <CustLink
            newClassName="px-[1.7rem] py-[1.5rem]"
            linkTo="/HowToUse"
            content="How to use"
            textColoredName={pages==="/HowToUse"&&"login_button"}
          ></CustLink>
          <CustLink
            newClassName="px-[1.7rem] py-[1.5rem]"
            linkTo="/Payment"
            content="Payment"
            textColoredName={pages==="/Payment"&&"login_button"}
          ></CustLink>
        </div>
      </div>
      <div className="w-[20%] flex justify-center text-nowrap items-center ">
        {pageType === "login" && (
          <>
            {" "}
            <CustLink
              linkTo="/SignUp "
              content="Sign up"
              newClassName="w-fit font-semibold px-[1rem] mr-5 py-[1.5rem]"
              textColoredName="login_button"
              bIcon={PiCaretRight}
            />
          </>
        )}

        {pageType === "home" && (
          <>
            <CustLink
              linkTo="/Login"
              content="Log in"
              newClassName="w-fit font-semibold px-[1rem] mr-5 py-[1.5rem]"
              textColoredName="login_button"
            />
            <CustButtom
              functed={() => nav("/Signup")}
              content="Sign up"
              newClassName={
                "w-fit  font-normal pr-[20%] px-[30%] py-[5%] text-white  rounded-full"
              }
              bgColoredName="login_button"
              bIcon={PiCaretRight}
            />
          </>
        )}
        {pageType === "sign up" && (
          <>
            <CustLink
              linkTo="Login"
              content="Login"
              newClassName="w-fit font-semibold px-[1rem] mr-5 py-[1.5rem]"
              textColoredName="login_button"
              bIcon={PiCaretRight}
            />
          </>
        )}
      </div>
    </div>
  );
}

export function LogoHeader() {
  const nav = useNavigate();
  return (
    <div className="w-full  items-center flex text-base justify-center">
      <div className="w-fit flex px-[10%] font-semibold ">
        <div className="px-[1.7rem] py-[1.5rem] flex relative  h-auto">
          <CustLink
            newClassName="px-[1.7rem] py-[1.5rem]"
            linkTo="/"
            content="Heureux"
            logoImg={Heuruex}
          ></CustLink>
        </div>
        <div className="min-w-[400px]"></div>
      </div>
      <div className="w-[20%] flex justify-center text-nowrap items-center "></div>
    </div>
  );
}
