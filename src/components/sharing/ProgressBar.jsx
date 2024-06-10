export function SimpleProgressBar({ percentage, bgColor }) {
    const mainContainer={
        width:"100%",
        display:"flex",
        alignItems:"Center",
        color:`var(--${bgColor})`
    }
  const containerStyles = {
    height: "0.5rem",
    width: "100%",
    backgroundColor: "#e0e0de",
    borderRadius: 50,
    margin: 50,
  };

  const fillerStyles = {
    height: "100%",
    width: `${percentage}%`,
    backgroundColor: `var(--${bgColor})`,
    borderRadius: "inherit",
    textAlign: "right",
  };

  const labelStyles = {
    padding: 5,
    color: "white",
    fontWeight: "bold",
  };
  return (
    <div style={mainContainer}>
      <div style={containerStyles}>
        <div style={fillerStyles}>
          <span style={labelStyles} />
        </div>
      </div>
      <p className="text-sm text-nowrap -translate-y-[15%] font-semibold">03 days left</p>
    </div>
  );
}
