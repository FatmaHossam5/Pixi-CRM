
import { useContext } from "react";
import { useForm, useWatch } from "react-hook-form";
import { AuthContext } from "../../Helpers/Context/AuthContext";
import useRequestPasswordReset from "../../Helpers/Hook/useRequestPasswordReset";
import Button from "../../Shared/Button/Button";
import InputOne from "../../Shared/InputOne/InputOne";
import Loader from "../../Shared/Loader/Loader";
import { useTranslation } from "react-i18next";
import useLocalStorageState from "../../Helpers/Hook/useLocalStorageState";


function ForgetPasswordSection() {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({ mode: "all" });


  const { isLoading } = useContext(AuthContext);
  const { t ,i18n} = useTranslation();
    // const { language } = i18next;
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const [storedEmail, setStoredEmail] = useLocalStorageState("userEmail", "");
  const email = useWatch({ control, name: "email" });
  const isDisabled = !(email?.length > 0);
  const { ResetPass } = useRequestPasswordReset();

  const requestOtp = (data) => {
    setStoredEmail(data.email);
    ResetPass(data.email)
  }

  return (
    <>
      <div className="col-12">
        <div className="sign-container d-flex justify-content-center align-items-center flex-column"
         
        >
          
          <div className="logo sign-logo text-center">PMS</div>
          <div className="px-card w-30 p-5">
            <form
              className="d-flex flex-wrap"
              onSubmit={handleSubmit(requestOtp)}
            >
              <div className="form-title w-100 d-flex align-items-center flex-column">
                <h3 className="sign-title">{t("resetPassword.title")}</h3>
                <p className="sign-subtitle">
                {t("resetPassword.instruction")}
                </p>
              </div>
              <div className="form-inputs d-flex flex-column w-100">

                <InputOne
                  type="email"
                  placeholder={t("input.email")}
                  dir={i18n.language === "ar" ? "rtl" : "ltr"}
                  register={register}
                  name="email"
                  errors={errors.email}
                 
                  validationRules={{
                    required: t("validation.emailRequired"),


                    pattern: {
                      value: emailPattern,
                      message:  t("validation.invalidEmailPattern"),
                    },
                  }}
                
                  aria-label={t("aria.enterEmail")}
                  aria-describedby="email-help-text email-error"
                  aria-invalid={!!errors.email}
                  title={t("aria.emailInfo")}
                />

              </div>
              {isLoading ? <Loader classNames='mt-4'/> : <Button text={t("input.send")} type="submit" disabled={isDisabled} aria-disabled={isDisabled} className="mt-4" />}
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default ForgetPasswordSection;
