import { useContext } from 'react'
import FromButton from '../../../../../Shared/FromButton/FromButton';
import { useForm } from 'react-hook-form';
import { ModalContext } from '../../../../../Helpers/Context/ModalContext';
import { AuthContext } from '../../../../../Helpers/Context/AuthContext';
import axios from 'axios';
import SuccessModal from '../../../../../Shared/SuccessModal/SuccessModal';
import ErrorModal from '../../../../../Shared/ErrorModal/ErrorModal';
import { useTranslation } from 'react-i18next';

const CreateStatus = () => {
  const { t } = useTranslation();

  const {
    register,
    handleSubmit, 
    formState: { errors },
    reset,
  } = useForm({ mode: "all" });

  const { modelState, closeModal, setModelState, handleClose } =
    useContext(ModalContext);

  const { baseUrlPms, Headers, userId } = useContext(AuthContext);

  const createStatus = async (data) => {
    try {
      const statusData = await axios.post(
        `${baseUrlPms}/maintenance_status/store/`,
        {
          created_by: userId,
          updated_by: userId,
        },
        {
          headers: Headers,
        }
      );

      const statusId = statusData.data.data.id;

      await axios.post(
        `${baseUrlPms}/maintenance_status_ar/store/`,
        {
            pms_maintenance_status_id: statusId,
            maintenance_status_name_ar: data?.maintenance_status_name_ar,
        },
        {
          headers: Headers,
        }
      );

      await axios.post(
        `${baseUrlPms}/maintenance_status_en/store/`,
        {
            pms_maintenance_status_id: statusId,
            maintenance_status_name_en: data?.maintenance_status_name_en,
        },
        {
          headers: Headers,
        }
      );

      handleClose();

      setModelState({
        status: "success",
        message: "Status created successfully!",
      });

      reset(); // Reset form after successful submission
    } catch (error) {
      setModelState({
        status: "error",
        message: "An error occurred while creating the Status.",
      }); 
    }
  };

  return (
    <>
     
      <form
        className="d-flex flex-wrap justify-content-end"
        onSubmit={handleSubmit(createStatus)}
      >
        <div className="form-inputs d-flex w-100">
          <div className="input-package mt-3 pe-2 d-flex flex-column w-50">
            <label className="mb-2" htmlFor="maintenance_status_name_en">
            Status English Name
            </label>
            <input
              type="text"
              placeholder={t("input.englishPlaceholder")}
              className="px-form-input w-100"
              {...register("maintenance_status_name_en", {
                required: true,
                pattern: /^[A-Za-z\s]+(?:\d+)?$/,
              })}
            />
            {errors?.maintenance_status_name_en?.type === "required" && (
              <p className="text-danger">{t("input.fieldRequired")}</p>
            )}
            {errors?.maintenance_status_name_en?.type === "pattern" && (
              <p className="text-danger">{t("input.onlyEnglishAllowed")}</p>
            )}
          </div>
          <div className="input-package mt-3 ps-2 d-flex flex-column w-50">
            <label className="mb-2" htmlFor="maintenance_status_name_ar">
            Status Arabic Name
            </label>
            <input
              type="text"
              placeholder={t("input.arabicPlaceholder")}
              className="px-form-input w-100"
              {...register("maintenance_status_name_ar", {
                required: true,
                pattern: /^[\u0600-\u06FF\s]+(?:\d+)?$/,
              })}
            />
            {errors?.maintenance_status_name_ar?.type === "required" && (
              <p className="text-danger">{t("input.fieldRequired")}</p>
            )}
            {errors?.maintenance_status_name_ar?.type === "pattern" && (
              <p className="text-danger">{t("input.onlyArabicAllowed")}</p>
            )}
          </div>
        </div>

        <FromButton />
      </form>
    </>
  );
}

export default CreateStatus
