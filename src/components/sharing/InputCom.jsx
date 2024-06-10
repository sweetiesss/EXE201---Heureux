import "../../styles/Input.css";

export default function Input({
  content,
  styled,
  bgColoredName,
  newClassName,
  functed,
  isValid,
  fIcon: FIcon,
  fIconNewClass,
  bIcon: BIcon,
  bIconNewClass,
  inputClassName,
  placeHolder,
  typeInput,
  inputName,
  inputValue,
}) {
  const inputHolderStyle = {
    "--backgroundColor": `var(--${bgColoredName ? bgColoredName : "default"})`,
    "--hoveredColor": `var(--${
      bgColoredName ? bgColoredName : "default"
    }_hover)`,
  };

  return (
    <div
      className={`relative ${newClassName && newClassName} input-container`}
      style={inputHolderStyle}
    >
      {FIcon && (
        <label
          className="absolute inset-y-0 left-0 pl-[1rem] flex items-center text-xl label_input"
          style={inputValue ? { color: "black" } : {}}
        >
          <FIcon className={fIconNewClass} />
        </label>
      )}
      <input
        name={`${inputName ? inputName : ""}`}
        value={`${inputValue ? inputValue : ""}`}
        onChange={functed ? functed : () => {}}
        type={`${typeInput ? typeInput : "text"}`}
        placeholder={`${placeHolder ? placeHolder : ""}`}
        className={`input_main py-[0.5rem] ${
          inputClassName && inputClassName
        } ${FIcon && "pl-[3rem]"} ${BIcon ? "pr-[3rem]" : "pr-[1rem]"}`}
      />
    </div>
  );
}
