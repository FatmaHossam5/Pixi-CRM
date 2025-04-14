// import { useContext, useEffect, useState } from "react";
// import { useForm } from "react-hook-form";
// import { AuthContext } from "../../Helpers/Context/AuthContext";
// import Button from "../../Shared/Button/Button";
// import axios from "axios";
// import Loader from "../../Shared/Loader/Loader";
// import { useNavigate } from "react-router-dom";
// import InputOne from "../../Shared/InputOne/InputOne";
// import { useTranslation } from "react-i18next";
// import i18next from "i18next";
// import { ToastContext } from "../../Helpers/Context/ToastContext ";
// function ResetPasswordSection() {
//   const {
//     register,
//     handleSubmit,
//     watch,
//     formState: { errors },
//   } = useForm({ mode: "all" });
//   const [modelState, setModelState] = useState({
//     status: "close",
//     message: "",
//   });
//   const { t } = useTranslation();
//   const { language } = i18next;
//   const { showToast } = useContext(ToastContext);

//   const { baseUrlMis, reqHeaders, setDisabledBtn, setIsLoading, isLoading } =
//     useContext(AuthContext);
//   const handleClose = () => setModelState({ status: "close", message: "" });
//   const navigate = useNavigate();
//   const [isShow, setIsShow] = useState(false);

//   const NewPass = (data) => {
//     setIsLoading(true);
//     const userEmail = localStorage.getItem("userEmail");
//     axios
//       .post(
//         `${baseUrlMis}/reset-password/`,
//         {
//           email: userEmail,
//           new_password: data.new_password,
//           confirm_password: data.confirm_password,
//         },
//         {
//           headers: {
//             Authorization: reqHeaders,
//           },
//         }
//       )
//       .then((res) => {
//         showToast('success', t("AuthMsg.resetSuccess"));


//         setTimeout(() => {
//           navigate("/login");
//           localStorage.removeItem("userEmail");
//         }, 800);
//       })
//       .catch((error) => {
//         showToast('error', t("AuthMsg.resetError"));
//       })
//       .finally(() => {
//         setIsLoading(false);
//       });
//   };

//   useEffect(() => {
//     if (watch("confirm_password").length && watch("new_password").length > 0) {
//       setDisabledBtn(false);
//     } else {
//       setDisabledBtn(true);
//     }
//   }, [watch("confirm_password"), watch("new_password")]);

//   return (
//     <>

//       <div className="col-12">
//         <div className="sign-container d-flex justify-content-center align-items-center flex-column">
//           <div className="logo sign-logo text-center">PMS</div>
//           <div className="px-card w-30 p-5">
//             <form className="d-flex flex-wrap" onSubmit={handleSubmit(NewPass)}>
//               <div className="form-title w-100 d-flex align-items-center flex-column">
//                 <h3 className="sign-title">{`${t("createNew")} ${t("password_placeholder")}`}</h3>
//                 <p className="sign-subtitle">{t("resetPassword.newPasswordTitle")}</p>
//               </div>
//               <div className="form-inputs d-flex flex-column w-100 mb-3">
    
//                 <InputOne
//                   type={isShow ? "text" : "password"}
//                   placeholder={t("resetPassword.newPassword")}
//                   register={register}
//                   name="new_password"
//                   errors={errors.new_password}
//                   isPasswordToggle
//                   isShow={isShow}
//                   setIsShow={setIsShow}
//                 />
          
//                 <InputOne
//                   type={isShow ? "text" : "password"}
//                   placeholder={t("resetPassword.reEnterNewPassword")}
//                   register={register}
//                   name="confirm_password"
//                   errors={errors.confirm_password}
//                   isPasswordToggle
//                   isShow={isShow}
//                   setIsShow={setIsShow}
//                 />
//               </div>

//               {isLoading ? <Loader /> : <Button text={t("createNew")} type="submit" />}
//             </form>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// }

// export default ResetPasswordSection;

import { useContext, useState } from "react";
import { useForm, useWatch } from "react-hook-form";
import { AuthContext } from "../../Helpers/Context/AuthContext";
import Button from "../../Shared/Button/Button";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ToastContext } from "../../Helpers/Context/ToastContext ";
import InputOne from "../../Shared/InputOne/InputOne";
import Loader from "../../Shared/Loader/Loader";
import UseLocalStorageState from "../../Helpers/Hook/useLocalStorageState";
import { useTranslation } from "react-i18next";
function ResetPasswordSection() {
  const {
    register,
    handleSubmit,
    watch,
    control,
    formState: { errors },
  } = useForm({ mode: "all" });

  const { baseUrlMis, reqHeaders, setIsLoading, isLoading } =useContext(AuthContext);
  const navigate = useNavigate();


  const { showToast } = useContext(ToastContext);
  const { t } = useTranslation(); 
  const confirm_password=useWatch({control,name:'confirm_password'});
  const new_password=useWatch({control,name:'new_password'});
  const isDisabled = !(new_password?.length > 0 && confirm_password?.length > 0);
 
const [userEmail]=UseLocalStorageState('userEmail')
  const NewPass = (data) => {
    setIsLoading(true);
 
    axios
      .post(
        `${baseUrlMis}/reset-password/`,
        {
          email: userEmail,
          new_password: data.new_password,
          confirm_password: data.confirm_password,
        },
        {
          headers: {
            Authorization: reqHeaders,
          },
        }
      )
      .then((res) => {
    
        showToast("success",res?.data?.message ||t("AuthMsg.resetSuccess"))
        setTimeout(() => {
          navigate("/login");
          localStorage.removeItem("userEmail");
        }, 800);
      })
      .catch((error) => {
      console.log(error);
      
        showToast("error",error.response?.data?.email[0] || t("AuthMsg.resetError"))
      })
      .finally(() => {
        setIsLoading(false);
      });
  };



  return (
    <>

      <div className="col-12">
        <div className="sign-container d-flex justify-content-center align-items-center flex-column">
          <div className="logo sign-logo text-center">PMS</div>
          <div className="px-card w-30 p-5">
            <form className="d-flex flex-wrap" onSubmit={handleSubmit(NewPass)}>
              <div className="form-title w-100 d-flex align-items-center flex-column">
                <h3 className="sign-title">{`${t("createNew")} ${t("password_placeholder")}`}</h3>
                <p className="sign-subtitle">{t("resetPassword.newPasswordTitle")}</p>
              </div>
              <div className="form-inputs d-flex flex-column w-100 mb-3">
            
                <InputOne
                  type={"password"}
                  placeholder={t("resetPassword.newPassword")}
                  register={register}
                  name="new_password"
                  errors={errors.new_password}
                  validationRules={{required: t("validation.newPasswordRequired"),
                     minLength: { value: 8, message:  t("validation.newPasswordMinLength") },
                  pattern: {
                    value: /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])/,
                    message: t("validation.newPasswordPattern"),
                  },}}
                 
                />
           
                <InputOne
                  type={"password"}
                  placeholder={t("resetPassword.reEnterNewPassword")}
                  register={register}
                  name="confirm_password"
                  errors={errors.confirm_password}
                  validationRules={{
                    required:t("validation.newPasswordRequired"),
                    validate: (value) => value === watch("new_password") || t("validation.passwordsDoNotMatch")
                  }}
                
                />
              </div>

              {isLoading ? <Loader /> : <Button  text={t("createNew")} type="submit"  disabled={isDisabled} />}
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default ResetPasswordSection;
