import { useContext } from "react";
import { AuthContext } from "../../Helpers/Context/AuthContext";

function  Button({text ,type ,onClick, disabled, className = ""}) {

  

  return (
    <>
      <button
        className={`sign-up-btn px-btn px-blue-btn w-100 ${className} ${
          disabled ? "px-disabled-btn" : ""
        }`}
        type={type || "button"}
        disabled={disabled}
        onClick={disabled ? undefined : onClick} 
      >
       { text}
       
      </button>
    </>
  );
}

export default Button;



