
import axios from "axios";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../Context/AuthContext";
import { ToastContext } from "../Context/ToastContext ";
import { useTranslation } from "react-i18next";
import i18next from "i18next";

const useRequestPasswordReset = () => {
 
  const { baseUrlMis, reqHeaders,setIsLoading } =
    useContext(AuthContext);
  const navigate = useNavigate();
  const { showToast } = useContext(ToastContext);
  const { language } = i18next
  const { t } = useTranslation();
  const ResetPass = (email) => {
    console.log(email);
    
    if (!email) {
      showToast("error",t("AuthMsg.emailRequired"))
      return;
    }
    setIsLoading(true);
    axios
      .post(
        `${baseUrlMis}/request-password-reset/`,
        {
          email
        },
        {
          headers: {
            Authorization: reqHeaders,
          },
        }
      )
      .then((res) => {
      
       
        
  
        showToast("success",  res.data.message || t("AuthMsg.checkMail"));
        setTimeout(() => {
          navigate("/sendOtp");
        }, 600);
      })
      .catch((error) => {
     console.log(error);
     
        showToast("error", error?.response?.statusText ||  t("AuthMsg.invaildEmail"));
      })
      .finally(() => {
        setIsLoading(false);
      });
  };
  return { ResetPass };
};

export default useRequestPasswordReset;