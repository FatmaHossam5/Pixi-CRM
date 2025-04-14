/* eslint-disable react/prop-types */
import { createContext } from "react";
import { useState } from "react";

export const AuthContext = createContext({});

export default function AuthContextProvider(props) {
  // const baseUrlPms = "http://192.168.1.96:8005/pms";
  const baseUrlPms = "http://192.168.1.96:8009/pms";
  const baseUrlMis = "http://192.168.1.96:8009/mis";
  const base_url='https://tenant1.billiqa.com/api'
  let reqHeaders = `Token ${localStorage.getItem("userToken")}`;
  
  const [disabledBtn, setDisabledBtn] = useState(true);
  const orgId = localStorage.getItem("organization_id");
 
  
  const userId = localStorage.getItem("userId");
 
  
  const admin = localStorage.getItem("userName");

  
  const [isLoading, setIsLoading] = useState(false);
  const [isDisabled, setIsDisabled] = useState(false);
  const [arrayOfWeekends, setArrayOfWeekends] = useState([]);
  const [language, setLanguage] = useState(localStorage.getItem("language") || "en"); // Default to English

  const Headers = {
    Authorization: reqHeaders,
    AgencyUsername: "Pixi_company",
    AgencyPassword: "pbkdf2_sha256$720000$W7JHRlVMe4NBq6kuVE6tsc$h90kUho8jlPX0Ji6kx16biMGiSmIwblznXpkHmRLW04=",
    AgencyToken: "GGVkPCIA8QlqiwhgCGtiulaaB0sg98QLJNaKj5v",

  };
  const changeLanguage = (lng) => {
    setLanguage(lng);
    localStorage.setItem("language", lng); // Persist language in localStorage
    document.documentElement.setAttribute("lang", lng);
    document.documentElement.setAttribute("dir", lng === "ar" ? "rtl" : "ltr");
  };

   let activeLang = localStorage.getItem("language")

  return (
    <AuthContext.Provider
      value={{
        baseUrlPms,
        reqHeaders,
        baseUrlMis,
        setDisabledBtn,
        disabledBtn,
        orgId,
        isLoading,
        setIsLoading,
        Headers,
        userId,
        setIsDisabled,
        isDisabled,
        admin,
        setArrayOfWeekends,
        arrayOfWeekends,
        changeLanguage,
        language,
        activeLang,
        base_url

      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
}
