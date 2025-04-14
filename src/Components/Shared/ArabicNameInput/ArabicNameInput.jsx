import React from "react";
import { useForm } from "react-hook-form";

const ArabicNameInput = ({
  label,
  placeholder,
  name
  

}) => {
    const {
        register,
      
        formState: { errors },

      } = useForm({ mode: "all" });

      console.log(errors);
      
  return (
    <>

<div className="input-package mt-3 ps-2 d-flex flex-column w-50">
            <label className="mb-2">{label} arabic name</label>
            <input
              type="text"
              placeholder={placeholder}
              className="px-form-input w-100 "
              {...register(`${name}`, {
                required: true,
                pattern: /^[\u0600-\u06FF\s]+(?:\d+)?$/,
              })}
            />
            {errors[name]?.type === "required" && (
              <p className="text-danger ">{t("input.fieldRequired")}</p>
            )}
            {errors[name]?.type === "pattern" && (
              <p className="text-danger ">{t("input.onlyArabicAllowed")}</p>
            )}
          </div>


      {/* <div
        className={`mt-4 w-100
        ${errors?.type === "pattern" ? "px-invalid-input" : ""} 
        position-relative`}
      >
        <input
          type={type}
          placeholder={placeholder}
          className={`px-login-input w-100`}
          {...register(name, { required: true, pattern: pattern })}
        />

        {isPasswordToggle && (
          <i
            onClick={() => setIsShow(!isShow)}
            className={
              isShow
                ? "fa-sharp fa-solid fa-eye show-password"
                : "fa-sharp fa-solid fa-eye-slash show-password"
            }
          />
        )}
      </div>
      {errors?.type === "required" && (
        <p className="text-danger m-0 p-0 w-100">{t("input.fieldRequired")}</p>
      )}
      {errors?.type === "pattern" && (
        <p className="text-danger m-0 p-0 w-100">pattern doesn't match</p>
      )} */}
    </>
  );
};

export default ArabicNameInput;
