import React from "react";

function Button({ type = "button", text, handleClick = () => { }, className = "", isActive = false, icon, iconStyle, isGameBtn, rounded, children, disabled }) {

  // round game button
  if (rounded) {
    return <div className="flex flex-col items-center cursor-pointer z-50">
      <p className="text-white font-semibold"> {text}</p>
      <div className={`gradient-border ${className} rounded-full`}>
        <div className={`gameRoundButton w-full h-full rounded-full ${icon && "lg:pt-2 lg:pl-2"} ${iconStyle} w-8`} onClick={!disabled ? handleClick : () => { }}>
          {icon == undefined ? children : <img src={icon} alt="Button Icon " width={"90%"} />}
        </div>
      </div>
    </div>
  }

  //  game button gradient button
  if (isGameBtn) {
    return <div className="gradient-border cursor-pointer w-fit  ">
      <button type={type} className={`gameButton ${className} `} onClick={handleClick} disabled={disabled}>
        {text}
      </button>
    </div>

  }

  // normal button
  return (
    <button type={type} onClick={handleClick} className={` ${isActive ? "buttonActive" : isGameBtn ? "gameButton" : "button"} ${className} cursor-pointer`}
      disabled={disabled}
    >
      {
        icon && <img src={icon} alt="button icon" className={`${iconStyle}`}></img>
      }
      <span className="font-semibold text-white">{text}</span>
    </button>
  );
}

export default Button;
