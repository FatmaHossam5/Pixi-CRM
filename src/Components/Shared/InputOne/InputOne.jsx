


import React, { useState } from 'react';
import { useTranslation } from "react-i18next";
import './InputOne.css'
const InputOne = ({
  type,
  placeholder,
  register,
  name,
  errors,
  validationRules,
  ariaLabel,
  className = ''

}) => {

  const { t, i18n } = useTranslation();
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const isPasswordField = type === 'password';
  const inputDirection = i18n.language === 'ar' ? 'rtl' : 'ltr';
  const textAlign = inputDirection === 'rtl' ? 'right' : 'left';

  return (
    <>
      <div  dir={inputDirection}
        className={`mt-4 w-100 position-relative  ${errors ? 'px-invalid-input' : '' }  ${className}`}>
        {errors && type !== 'password' && <i className="fa-solid fa-circle-exclamation text-danger me-2 exclamation  "></i>}
        <input
          type={isPasswordField && isPasswordVisible ? 'text' : type}
          placeholder={t(placeholder)}
          className={`px-login-input w-100 `}
          {...register(name, validationRules)}
          aria-label={ariaLabel}
          style={{
            direction: inputDirection,
            textAlign, // Align text and placeholder
          }}
          
        />

        {isPasswordField && (
          <i
            onClick={() => setIsPasswordVisible(!isPasswordVisible)}
            className={
              isPasswordVisible
                ? 'fa-sharp fa-solid fa-eye show-password'
                : 'fa-sharp fa-solid fa-eye-slash show-password'
            }
            role="button"
            aria-label={isPasswordVisible ? t('Hide password') : t('Show password')}
            tabIndex={0}
          />
        )}
      </div>

      {errors && <p className="error text-danger  "style={{
            direction: inputDirection, // Ensure direction matches the language
            textAlign, // Align the error text properly
          }}>{errors?.message}</p>}
    </>
  );
};

export default InputOne;
