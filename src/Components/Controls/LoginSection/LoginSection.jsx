import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { useForm, useWatch } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../Helpers/Context/AuthContext";
import { ToastContext } from "../../Helpers/Context/ToastContext ";
import UseLocalStorageState from "../../Helpers/Hook/useLocalStorageState";
import Button from "../../Shared/Button/Button";
import InputOne from "../../Shared/InputOne/InputOne";
import Loader from "../../Shared/Loader/Loader";
import "./Login.css";






function Login() {
  const { t, i18n } = useTranslation();
  const { showToast } = useContext(ToastContext);
  const { baseUrlMis, Headers, isLoading, setIsLoading } = useContext(AuthContext);
  const [check, setCheck] = useState(false);
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    control
    
  } = useForm({ mode: "all" });
  const [userToken, setUserToken, removeUserToken] = UseLocalStorageState('userToken');
  console.log(userToken);
  
  const [userId, setUserId] = UseLocalStorageState("userId", null);
  const [userName, setUserName] = UseLocalStorageState("userName", "");
  const [organizationId, setOrganizationId] = UseLocalStorageState("organization_id", "");
  const [savedUsername, setSavedUsername, removeSavedUsername] = UseLocalStorageState("user_name", "");
  const [savedPassword, setSavedPassword, removeSavedPassword] = UseLocalStorageState("pms_password", "");
  const navigate = useNavigate();
  const username = useWatch({ control, name: "username" });
  const password = useWatch({ control, name: "password" });
  const isDisabled = !(username?.length > 0 && password?.length > 0);


  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng); // Change language in i18next
    localStorage.setItem('language', lng); // Save to localStorage
    document.documentElement.setAttribute('lang', lng); // Update HTML lang attribute
    document.documentElement.setAttribute('dir', lng === 'ar' ? 'rtl' : 'ltr'); // Update direction for RTL languages
  };



  const storeUserData = (data) => {
    console.log(data);
    
    setUserToken(data.token);
    setUserId(data.user.user_id);
    setUserName(data.user.name);
    setOrganizationId(data.user.organization_id);
  };
 


  const handleRememberMe = (username, password) => {
    if (check) {
      setSavedUsername(username);
      setSavedPassword(password);
    } else {
      removeSavedUsername();
      removeSavedPassword();
    }
  };

  const handleLoginSuccess = (data) => {
    storeUserData(data);
   
    showToast("success", t("login.success"));
    handleRememberMe(data.user.username, data.user.password);
    setTimeout(() => {
      if (data.user.hotel_count > 1) {
        navigate("/selectHotel");
      } else {
        navigate("/dashboard");
        localStorage.setItem("Hotel_id", data.user.hotels[0]?.id);
        localStorage.setItem("Hotel_Name", data.user.hotels[0].pms_hotel_en.hotel_name_en);
      }
    }, 600);
  };
  const handleLoginError = (error) => {
   
    
    const errorMessage =  t("AuthMsg.loginFailed");
    showToast("error", errorMessage);

    // Clear sensitive data on error
    // removeUserToken();
    removeSavedUsername();
    removeSavedPassword();
  };


  const LogIn = (data) => {
    setIsLoading(true);
    axios.post(
      `${baseUrlMis}/login/`,
      { username: data.username, password: data.password },
      { headers: Headers }
    )
    .then((res) => handleLoginSuccess(res.data.data))
    .catch((error) => handleLoginError(error))
    .finally(() => setIsLoading(false));
  };

  useEffect(() => {
    if (savedUsername && savedPassword) {
      setValue("username", savedUsername);
      setValue("password", savedPassword);
      setCheck(true);
    }
  }, [savedUsername, savedPassword, setValue]);


  return (
    <>
      <div className="  col-md-12 ">
        <div
          className=" sign-container d-flex justify-content-center align-items-center flex-column"
          dir={i18n.language === "ar" ? "rtl" : "ltr"}
        >
          <div className="  logo sign-logo text-center">PMS</div>
          <div className="px-card  p-5 col-lg-3 col-md-6 container-sm">
            <form className="d-flex flex-wrap" onSubmit={handleSubmit(LogIn)}>
              <div className="form-title w-100 d-flex align-items-center flex-column">
                <h3 className="sign-title">{t("sign_in")}</h3>
                <p className="sign-subtitle">{t("please_sign_in")}</p>
              </div>
              <div className={`form-inputs d-flex flex-wrap `}>

                <InputOne
                  type="text"
                  placeholder={t("username_placeholder")}
                  register={register}
                  name="username"
                  errors={errors.username}
                 validationRules={{
                  required:t("validation.usernameRequired"),
                  minLength: { value: 4, message: t("validation.usernameMin")},
                  maxLength: { value: 20,  message: t("validation.usernameMax")  },
                  pattern: { value: /^[a-zA-Z][a-zA-Z0-9_]{3,19}$/,  message: t("validation.usernamePattern") },
                  
                 }}
                  aria-label={t("username")}
                 
                />
             
                <InputOne
                  type={"password"}
                  placeholder={t("password_placeholder")}
                  register={register}
                  name="password"
                  errors={errors.password}
                
                  validationRules={{
                    required: t("validation.passwordRequired"),
                    minLength: { value: 8, message: t("validation.passwordMin")},
                    pattern: {
                      value: /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])/,
                      message: t("validation.passwordPattern"),
                    },
                  }}
                  aria-label={t("password")}
                />

                <div className="  d-flex  col-lg-12 justify-content-between rememberForget ">
                <div className="remember-me text-primary my-4   ">
                  <input
                    id="remember-me"
                    type="checkbox"
                    className="me-1"
                    onChange={() => setCheck(!check)}
                    checked={check}
                     aria-label="Remember me"
                  />
                  <label htmlFor="remember-me">{t("remember_me")}</label>
                </div>
                <Link className="text-primary   my-4" to="/forgetPass">
                  {t("forgot_password")}
                </Link>
                </div>
              
              </div>


              {isLoading ? (
             
                  <Loader />
                
              ) : (
                <Button text={t("sign_in_button")} type="submit"  disabled={isDisabled} 
                aria-disabled={isLoading}
                aria-label={isLoading ? "Logging in, please wait" : "Sign in"}/>
              )}

            </form>
            <div className="d-flex justify-content-center mt-2">
            <button
                className="bg-transparent border-0 text-primary me-2"
                onClick={() => changeLanguage(i18n.language === 'ar' ? 'en' : 'ar')}
              >
                 {i18n.language === 'ar' ? 'English' : 'العربية'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;
