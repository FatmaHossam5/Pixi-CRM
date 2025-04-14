import React from 'react'
import { useTranslation } from 'react-i18next';

export default function InputForrModal({
  label,
  type = "text",
  placeholder,
  register,
  name,
  errors,
  validationRules,
  ariaLabel,
  disabled = false,
  className = "",
}) {
  const { t, i18n } = useTranslation();
  const inputDirection = i18n.language === 'ar' ? 'rtl' : 'ltr';
  const textAlign = inputDirection === 'rtl' ? 'right' : 'left';
  return (
    <div dir={inputDirection} className={`input-package mt-3  d-flex flex-column w-50 `}>

      <label className="mb-2" style={{ direction: inputDirection, textAlign }}> {t(label)}</label>
      <div
        dir={inputDirection}
        className={`position-relative ${errors ? "px-invalid-input" : ""}`}
      >
        {errors && (
          <i className="fa-solid fa-circle-exclamation text-danger me-2 exclamation"></i>
        )}

        <input
          type="text"
          placeholder={t(placeholder)}
          className="px-form-input w-100"
          {...register(name, validationRules)}
          aria-label={ariaLabel}
          style={{
            direction: inputDirection,
            textAlign, // Align text and placeholder
          }}
          disabled={disabled}
        />

      </div>

      {errors && <p className="text-danger" style={{
        direction: inputDirection, // Ensure direction matches the language
        textAlign, // Align the error text properly
      }}>{errors?.message || "Field is required"}</p>}
    </div>
  )
}
