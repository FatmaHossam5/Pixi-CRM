import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import { ModalContext } from "../../../../Helpers/Context/ModalContext";
import { AuthContext } from "../../../../Helpers/Context/AuthContext";
import axios from "axios";
import FromButton from "../../../../Shared/FromButton/FromButton";

const CreatePaymentStatement = ({ getPaymentStatement }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({ mode: "all" });

  const { setModelState, handleClose } = useContext(ModalContext);

  const {
    baseUrlPms,
    Headers,
    userId,
    setIsLoading,
    setIsDisabled,
    isDisabled,
  } = useContext(AuthContext);

  const createStatement = async (data) => {
    setIsLoading(true);
    setIsDisabled(true);

    try {
      const paymentStatementData = await axios.post(
        `${baseUrlPms}/payment_statement/store/`,

        { created_by: userId, updated_by: userId },
        {
          headers: Headers,
        }
      );

      const statementId = paymentStatementData.data.data.id;

      const paymentStatementDataAr = await axios.post(
        `${baseUrlPms}/payment_statement_ar/store/`,
        {
          pms_payment_statement_id: statementId,
          payment_statement_name_ar: data.payment_statement_name_ar,
        },
        {
          headers: Headers,
        }
      );

      const paymentStatementDataEn = await axios.post(
        `${baseUrlPms}/payment_statement_en/store/`,
        {
          pms_payment_statement_id: statementId,
          payment_statement_name_en: data.payment_statement_name_en,
        },
        {
          headers: Headers,
        }
      );

      if (
        (paymentStatementData.status &&
          paymentStatementDataAr.status &&
          paymentStatementDataEn.status === 200) ||
        201
      ) {
        setModelState({
          status: "success",
          message: "Statement created successfully!",
        });
      }
    } catch (error) {
      setModelState({
        status: "error",
        message: "Invaild data",
      });
    } finally {
      handleClose();
      reset();
      setIsLoading(false);
      setIsDisabled(false);
      setTimeout(() => getPaymentStatement(), 100);
    }
  };

  return (
    <>
      <form
        className="d-flex flex-wrap justify-content-end "
        onSubmit={handleSubmit(createStatement)}
      >
        <div className="form-inputs d-flex w-100 px-3">
          <div className="input-package mt-3 pe-2 d-flex flex-column w-50">
            <label className="mb-2" htmlFor>
              Statement English Name
            </label>
            <input
              type="text"
              placeholder="Enter Statement name"
              className={`px-form-input w-100 ${
                isDisabled ? "disabled-input" : ""
              }`}
              disabled={isDisabled}
              {...register("payment_statement_name_en", {
                required: true,
                pattern: /^[A-Za-z\s]+(?:\d+)?$/,
              })}
            />
            {errors?.payment_statement_name_en?.type === "required" && (
              <p className="text-danger ">{t("input.fieldRequired")}</p>
            )}
            {errors?.payment_statement_name_en?.type === "pattern" && (
              <p className="text-danger ">{t("input.onlyEnglishAllowed")}</p>
            )}
          </div>
          <div className="input-package mt-3 ps-2 d-flex flex-column w-50">
            <label className="mb-2"> Statement Arabic Name</label>
            <input
              type="text"
              placeholder="Enter Statement name"
              className={`px-form-input w-100 ${
                isDisabled ? "disabled-input" : ""
              }`}
              {...register("payment_statement_name_ar", {
                required: true,
                pattern: /^[\u0600-\u06FF\s]+(?:\d+)?$/,
              })}
              disabled={isDisabled}
            />
            {errors?.payment_statement_name_ar?.type === "required" && (
              <p className="text-danger ">{t("input.fieldRequired")}</p>
            )}
            {errors?.payment_statement_name_ar?.type === "pattern" && (
              <p className="text-danger ">{t("input.onlyArabicAllowed")}</p>
            )}
          </div>
        </div>

        <FromButton reset={reset} />
      </form>
    </>
  );
};

export default CreatePaymentStatement;
