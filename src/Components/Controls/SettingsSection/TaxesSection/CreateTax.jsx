import { useContext, useEffect } from "react";
import { useForm } from "react-hook-form";
import { ModalContext } from "../../../Helpers/Context/ModalContext";
import { AuthContext } from "../../../Helpers/Context/AuthContext";
import axios from "axios";
import FromButton from "../../../Shared/FromButton/FromButton";

const CreateTax = ({ getTaxes }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    control,
    setValue,
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

  const createTax = async (data) => {
    setIsLoading(true);
    setIsDisabled(true);
    try {
      const taxData = await axios.post(
        `${baseUrlPms}/tax/store/`,
        {
          created_by: userId,
          updated_by: userId,
          tax_percentage: data.tax_percentage,
        },
        {
          headers: Headers,
        }
      );

      const taxId = taxData.data.data.id;

      const taxDataAr = await axios.post(
        `${baseUrlPms}/tax_ar/store/`,
        {
          pms_tax_id: taxId,
          tax_name_ar: data.tax_name_ar,
        },
        {
          headers: Headers,
        }
      );

      const taxDataEn = await axios.post(
        `${baseUrlPms}/tax_en/store/`,
        {
          pms_tax_id: taxId,
          tax_name_en: data.tax_name_en,
        },
        {
          headers: Headers,
        }
      );
      if (
        // eslint-disable-next-line no-constant-condition
        (taxData.status && taxDataEn.status && taxDataAr.status === 200) ||
        201
      ) {
        setModelState({
          status: "success",
          message: "Tax created successfully!",
        });
      }
    } catch (error) {
      setModelState({
        status: "error",
        message:
          error.response?.data?.tax_name_en?.[0] ||
          error.response?.data?.tax_name_ar?.[0],
      });
    } finally {
      handleClose();
      reset();
      setIsLoading(false);
      setIsDisabled(false);
      getTaxes();
    }
  };

  return (
    <>
      <form
        className={`d-flex flex-wrap justify-content-end ${
          isDisabled ? "disabled-layer" : ""
        }`}
        onSubmit={handleSubmit(createTax)}
      >
        <div className="form-inputs d-flex w-100 px-3">
          <div className="input-package mt-3 pe-2 d-flex flex-column w-50">
            <label className="mb-2" htmlFor>
              Tax English Name
            </label>
            <input
              type="text"
              placeholder="Tax english name"
              className="px-form-input w-100 "
              {...register("tax_name_en", {
                required: true,
                pattern: /^[A-Za-z\s]+(?:\d+)?$/,
              })}
              disabled={isDisabled}
            />
            {errors?.tax_name_en?.type === "required" && (
              <p className="text-danger ">field is required</p>
            )}
            {errors?.tax_name_en?.type === "pattern" && (
              <p className="text-danger ">Feild accept only English</p>
            )}
          </div>
          <div className="input-package mt-3 ps-2 d-flex flex-column w-50">
            <label className="mb-2"> Tax Arabic Name</label>
            <input
              type="text"
              placeholder="Tax arabic name"
              className="px-form-input w-100 "
              {...register("tax_name_ar", {
                required: true,
                pattern: /^[\u0600-\u06FF\s]+(?:\d+)?$/,
              })}
              disabled={isDisabled}
            />
            {errors?.tax_name_ar?.type === "required" && (
              <p className="text-danger ">field is required</p>
            )}
            {errors?.tax_name_ar?.type === "pattern" && (
              <p className="text-danger ">Feild accept only Arabic</p>
            )}
          </div>
        </div>
        <div className="form-inputs d-flex w-100 px-3">
          <div className="input-package mt-3 pe-2 d-flex flex-column w-50">
            <label className="mb-2" htmlFor>
              Tax Percentage
            </label>
            <input
              type="number"
              placeholder="Tax Percentage"
              className="px-form-input w-100 "
              {...register("tax_percentage", {
                required: true,
              })}
              disabled={isDisabled}
            />
               {errors?.tax_percentage?.type === "required" && (
              <p className="text-danger ">field is required</p>
            )}
          </div>
        </div>

       <FromButton reset={reset} />
      </form>
    </>
  );
};

export default CreateTax;
