// import { useContext, useState } from "react";
// import OtpInput from "react-otp-input";
// import { useForm } from "react-hook-form";
// import Button from "../../Shared/Button/Button";
// import { AuthContext } from "../../Helpers/Context/AuthContext";
// import axios from "axios";
// import RequestPasswordReset from "../../Helpers/Hook/useRequestPasswordReset";
// import Loader from "../../Shared/Loader/Loader";
// import { useNavigate } from "react-router-dom";
// import i18next from "i18next";
// import { useTranslation } from "react-i18next";
// import { ToastContext } from "../../Helpers/Context/ToastContext ";

// function SendOtpSection() {
//   const [otp, setOtp] = useState("");
//   const { baseUrlMis, Headers, setDisabledBtn, setIsLoading, isLoading } =
//     useContext(AuthContext);
//   const [modelState, setModelState] = useState({
//     status: "close",
//     message: "",
//   });
//   const [errorInput, setErrorInput] = useState(false);
//   const handleClose = () => setModelState({ status: "close", message: "" });

//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//   } = useForm({ mode: "all" });

//   const { t } = useTranslation();
//   const { language } = i18next;

//   const navigate = useNavigate();
//   const { showToast } = useContext(ToastContext);

//   const { ResetPass } = RequestPasswordReset();
//   const email = localStorage.getItem("userEmail");
//   let otpData;

//   const sendOTP = async (data) => {
//     otpData = localStorage.getItem("otpData");
//     if (otp != otpData) {
//       setErrorInput(true);
//     } else {
//       setIsLoading(true);
//       try {
//         const response = await axios.post(
//           `${baseUrlMis}/verify-otp/`,
//           {
//             otp: otp,
//             email: email,
//           },
//           {
//             headers: Headers,
//           }
//         );


//         showToast('success', t("AuthMsg.verifyOTP"));

//         navigate("/resetPass");
//         localStorage.removeItem("otpData");
//       } catch (error) {
//         showToast('error', t("AuthMsg.invaildOTP"));
//       } finally {
//         setIsLoading(false);
//       }
//     }
//   };

//   // Function to handle OTP input change
//   const handleOtpChange = (otp) => {
//     setOtp(otp);
//     setErrorInput(false);
//   };

//   if (otp?.length == 6) {
//     setDisabledBtn(false);
//   } else {
//     setDisabledBtn(true);
 
//   }

//   return (
//     <>
//       <div className="col-12">
//         <div className="sign-container d-flex justify-content-center align-items-center flex-column">
//           <div className="logo sign-logo text-center">PMS</div>
//           <div className="px-card w-30 p-5">
//             <form className="d-flex flex-wrap">
//               <div className="form-title w-100 d-flex align-items-center flex-column">
//                 <h3 className="sign-title">{t("otp.title")}</h3>
//                 <p className="sign-subtitle">{t("otp.instruction")}</p>
//               </div>
//               <div className="form-inputs d-flex w-100">
//                 <OtpInput
//                   value={otp}
            
//                   onChange={handleOtpChange}
//                   numInputs={6}
//                   renderSeparator={<span> </span>}
//                   inputStyle={{
//                     width: "10%",
//                     margin: "1rem",
//                     height: "49px",
//                     backgroundColor: "#F6FAFF",
//                     border: "none",
               

//                     borderRadius: "7px",
//                     fontWeight: "600",
//                     fontSize: "24px",
//                     ...(errorInput
//                       ? {
//                         boxShadow: "0px 0px 6px 1px #FF5858",
//                         color: "#FF5858",
//                       }
//                       : { boxShadow: "none", color: "black" }),
//                   }}
//                   className="px-otp-input px-invalid-otp-input"
//                   renderInput={(props) => <input {...props} />}
//                 />
//               </div>

//               {isLoading ? (
//                 <Loader />
//               ) : (
//                 <>
//                   <Button
//                     text={t("resetPassword.title")}
//                     type="button"
//                     onClick={sendOTP}
//                   />
//                   <button
//                     type="button"
//                     className="m-auto mt-3 gray-text bg-transparent border-0"
//                     onClick={() => ResetPass(email)}
//                   >
//                     <i className="fa-light fa-arrows-rotate me-1" />
//                     {t("otp.resend")}
//                   </button>
//                 </>
//               )}
           
//             </form>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// }

// export default SendOtpSection;

import axios from "axios";
import { useContext, useState } from "react";
import OtpInput from "react-otp-input";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../Helpers/Context/AuthContext";
import { ToastContext } from "../../Helpers/Context/ToastContext ";
import UseLocalStorageState from "../../Helpers/Hook/useLocalStorageState";
import useRequestPasswordReset from "../../Helpers/Hook/useRequestPasswordReset";
import Button from "../../Shared/Button/Button";
import Loader from "../../Shared/Loader/Loader";
import { useTranslation } from "react-i18next";


function SendOtpSection() {
  const [otp, setOtp] = useState("");
  const { baseUrlMis, reqHeaders, setIsLoading, isLoading } = useContext(AuthContext);
  const { showToast } = useContext(ToastContext);
  const [errorInput, setErrorInput] = useState(false);
  const navigate = useNavigate();
  const { ResetPass } = useRequestPasswordReset();
  const [Email] = UseLocalStorageState("userEmail");

  const isOtpValid = /^[0-9]{6}$/.test(otp);
  const { t,i18n } = useTranslation();


  const sendOTP = async () => {


    setIsLoading(true);
    try {
      const response = await axios.post(
        `${baseUrlMis}/verify-otp/`,
        {
          otp: otp,
          email: Email,
        },
        {
          headers: {
            Authorization: reqHeaders,
          },
        }
      );
      showToast("success", response.data.message || t("AuthMsg.verifyOTP"));
      navigate("/resetPass");

    } catch (error) {
      console.log(error);
      setErrorInput(true);
      setOtp("");
      showToast("error", error.response?.data?.message ||  t("AuthMsg.invaildOTP"));
    } finally {
      setIsLoading(false);
    }

  };

  // Function to handle OTP input change
  const handleOtpChange = (otp) => {
    setOtp(otp);
    setErrorInput(false);
  };



  return (
    <>
      <div className="col-12">
        <div className="sign-container d-flex justify-content-center align-items-center flex-column">
          <div className="logo sign-logo text-center">PMS</div>
          <div className="px-card w-30 p-5">
            <form className="d-flex flex-wrap">
              <div className="form-title w-100 d-flex align-items-center flex-column">
                <h3 className="sign-title">{t("otp.title")}</h3>
                <p className="sign-subtitle">{t("otp.instruction")}</p>
              </div>
              <div className="form-inputs d-flex w-100 ">
                <OtpInput
                  value={otp}
                  onChange={handleOtpChange}
                  aria-label={t("otp.ariaLabel")}
                  numInputs={6}
                  renderSeparator={<span> </span>}
                  inputStyle={{
                    flex: "1",
                    width: "10%",
                  
                     marginLeft: "0",
             
                    height: "49px",
                    backgroundColor: "#F6FAFF",
                    border: "none",
                    borderRadius: "7px",
                    fontWeight: "600",
                    fontSize: "24px",
                    ...(errorInput
                      ? {
                        boxShadow: "0px 0px 6px 1px #FF5858",
                        color: "#FF5858",
                      }
                      : { boxShadow: "none", color: "black" }),
                  }}
                  containerStyle={{
                    display: "flex", // Ensure the container aligns inputs in a row
                    gap: "1rem", // Adds spacing between inputs
                  }}
                  className="px-otp-input px-invalid-otp-input"
                  renderInput={(props) => <input {...props} />}
                />

              </div>
              {errorInput && (<div className=" col-12  m-auto  ">
                <p className="text-danger my-1 error   " role="alert" 
                dir={i18n.language === "ar" ? "rtl" : "ltr"} // Dynamically set direction
      style={{
        textAlign: i18n.language === "ar" ? "right" : "left", // Adjust alignment
      }}>
                {t("otp.invalid")}
                </p>
              </div>

              )}
              {isLoading ? (
                <Loader />
              ) : (
                <>
                  <Button
                    text={t("otp.submit")}
                    type="button"
                    onClick={sendOTP}
                    disabled={!isOtpValid}
                    aria-disabled={!isOtpValid}
                    className="mt-4 "
                  />
                  <button
                    type="button"
                    className="m-auto mt-3 gray-text bg-transparent border-0"
                    onClick={() => ResetPass(Email)}

                  >
                    <i className="fa-light fa-arrows-rotate me-1" />
                    {t("otp.resend")}
                  </button>
                </>
              )}
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default SendOtpSection;
