import "../../styles/Button.css";

export default function Button({
  content,
  styled,
  bgColoredName,
  newClassName,
  functed,
  isValid,
  fIcon: FIcon,
  bIcon: BIcon,
  outlineCoredName,
}) {
  const buttonHolderStyle = {
    "--backgroundColor": `var(--${bgColoredName ? bgColoredName : "default"})`,
    "--hoveredColor": `var(--${
      bgColoredName ? bgColoredName : "default"
    }_hover)`,
    "--outlineActive": `var(--${outlineCoredName ? outlineCoredName : "white"})`
  };

  return (
    <div className="button-holder">
      <button
        className={` button-main ${newClassName && newClassName}`}
        style={buttonHolderStyle}
        onClick={functed && functed}
      >
        {FIcon && (
          <span className="mr-2">
            <FIcon className="text-xl" />
          </span>
        )}
        {content ? content : "Content"}
        {BIcon && <BIcon className="text-xl" />}
      </button>
    </div>
  );
}
