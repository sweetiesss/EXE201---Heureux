import { useNavigate } from "react-router-dom";
import "../../styles/Link.css";

export default function Link({
  content,
  newClassName,
  linkTo,
  funcDo,
  textColoredName,
  isValid,
  logoImg,
  bIcon: BIcon,
  bIconClassName,
  fIcon: FIcon,
  fIconClassName,

}) {
  const nav = useNavigate();
  const linkHolderStyle = {
    color: `var(--${textColoredName ? textColoredName : "default"})`,
  };
  const linkMainStyle = {
    "--this_link_color": `var(--${
      textColoredName ? textColoredName : "default"
    })`,

  };

  return (
    <div
      className={`link-holder ${newClassName && newClassName}`}
      style={linkHolderStyle}
      onClick={() => {
        funcDo && funcDo(); 
        linkTo && nav(linkTo);
      }}
    >
      {logoImg && (
        <img
          className="w-[3rem] pointer-events-none"
          src={logoImg && logoImg}
        />
      )}
      {FIcon && <FIcon className={fIconClassName}/>}
      <span
        id="linking"
        className={` link-main  pointer-events-none flex items-center mx-[0.5rem]`}
        style={linkMainStyle}
      >
        {content ? content : "Content"}
        {BIcon && <BIcon />}
      </span>
    </div>
  );
}
