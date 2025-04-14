import axios from "axios";
import React, { useContext } from "react";
import { useForm, useWatch } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { AuthContext } from "../../../../../Helpers/Context/AuthContext";
import { ModalContext } from "../../../../../Helpers/Context/ModalContext";
import { ToastContext } from "../../../../../Helpers/Context/ToastContext ";
import { useData } from "../../../../../Helpers/Context/useData";
import FromButton from "../../../../../Shared/FromButton/FromButton";
import InputForrModal from "../../../../../Shared/InputForModal/InputForrModal";

const CreateHousekeepingTask = ({ isEditMode,
  onClose,
  initialData }) => {
  
    
  const { t } = useTranslation();
  const { showToast } = useContext(ToastContext);
  const { baseUrlPms, Headers, userId, setIsLoading, setIsDisabled, isLoading } = useContext(AuthContext);
  const { handleClose } = useContext(ModalContext);
  const { fetchData } = useData();


  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors }
  } = useForm({
    defaultValues: isEditMode
      ? {
        housekeeper_task_name_en: initialData?.housekeeper_task_name_en || "",
        housekeeper_task_name_ar: initialData?.housekeeper_task_name_ar || ""

      }
      : {},
    mode: 'all',
  });
  const houseKeeperId = isEditMode ? initialData?.id : null;
  const HouseKeepingTaskNameAr = useWatch({ control, name: 'housekeeper_task_name_ar' });
  const HouseKeepingTaskNameEn = useWatch({ control, name: 'housekeeper_task_name_en' });
  const isDisabled = !(HouseKeepingTaskNameAr?.length > 0 && HouseKeepingTaskNameEn?.length > 0);



  const createMainHouseKeeperTask = async (data) => {
    const response = await axios.post(
      `${baseUrlPms}/housekeeper_task/store/`,
      {
        created_by: userId,
        updated_by: userId,
       
      },
      { headers: Headers }
    );
    return response.data.data.id;
  };

  const createHouseKeeperTaskAr = async (houseKeeperId, nameAr) => {
    await axios.post(
      `${baseUrlPms}/housekeeper_task_ar/store/`,
      {
        pms_housekeeper_task_id: houseKeeperId,
        housekeeper_task_name_ar: nameAr,
      },
      { headers: Headers }
    );
  };

  const createHouseKeeperTaskEn = async (houseKeeperId, nameEn) => {
    await axios.post(
      `${baseUrlPms}/housekeeper_task_en/store/`,
      {
        pms_housekeeper_task_id: houseKeeperId,
        housekeeper_task_name_en: nameEn,
      },
      { headers: Headers }
    );
  };

  const handleCreateHouseKeeperTask = async (data) => {
    const isCreating = !isEditMode;




    setIsLoading(true);
    setIsDisabled(true);

    try {
      let houseKeeperId;

      if (isCreating) {
        houseKeeperId = await createMainHouseKeeperTask(data);
        await Promise.all([
          createHouseKeeperTaskAr(houseKeeperId, data.housekeeper_task_name_ar),
          createHouseKeeperTaskEn(houseKeeperId, data.housekeeper_task_name_en),
        ]);

      } else {
        houseKeeperId = initialData.id;
        await Promise.all([
          axios.patch(
            `${baseUrlPms}/housekeeper_task/${houseKeeperId}/update/`,
            {
              ...data,
              updated_by: userId,
              created_by: userId,
            },
            { headers: Headers }
          ),
          axios.patch(
            `${baseUrlPms}/housekeeper_task_ar/${houseKeeperId}/update/`,
            {
              pms_housekeeper_task_id: houseKeeperId,
              housekeeper_task_name_ar: data.housekeeper_task_name_ar,
            },
            { headers: Headers }
          ),
          axios.patch(
            `${baseUrlPms}/housekeeper_task_en/${houseKeeperId}/update/`,
            {
              pms_housekeeper_task_id: houseKeeperId,
              housekeeper_task_name_en: data.housekeeper_task_name_en,
            },
            { headers: Headers }
          ),
        ]);
      }

      showToast('success', t(isCreating ? 'msg.housekeepingTaskMsg' : 'msg.updateHouseKeeperTaskMsg'));
      reset();

      if (!isCreating) {
        onClose();
      }
      handleClose();
      fetchData();
    } catch (error) {
      showToast('error', t('msg.errorMessage'));
      console.error('Error during Channel Booking creation:', error);
    } finally {
      setIsLoading(false);
      setIsDisabled(false);
    }
  };
  return (
    <>

      <form
        className="d-flex flex-wrap justify-content-end"
        onSubmit={handleSubmit(handleCreateHouseKeeperTask)}
      >

        <div className="form-inputs form-margin d-flex w-100">
          <InputForrModal
            label={`${t("housekeepingSection.task")} ${t("input.englishNameLabel")}`}
            type="text"
            placeholder={t("input.englishPlaceholder")}
            register={register}
            name="housekeeper_task_name_en"
            validationRules={{
              required: t('input.fieldRequired'),
              pattern: {
                value: /^[A-Za-z\s]+$/,
                message: t('input.onlyEnglishAllowed'),
              },
            }}
            errors={errors.housekeeper_task_name_en}
            className="pe-2 w-50"
          />
          <InputForrModal
            label={`${t("housekeepingSection.task")} ${t("input.arabicNameLabel")}`}
            type="text"
            placeholder={t('input.arabicPlaceholder')}
            register={register}
            name="housekeeper_task_name_ar"
            validationRules={{
              required: t('input.fieldRequired'),
              pattern: {
                value: /^[\u0600-\u06FF\s]+$/,
                message: t('input.onlyArabicAllowed'),
              },
            }}
            errors={errors.housekeeper_task_name_ar}
            className="ps-2 w-50"
          />
        </div>

        <FromButton reset={reset} isLoading={isLoading} buttonLabel={isEditMode ? t('btn.edit') : t('btn.add')} disabled={isDisabled} />

      </form>
    </>
  );
};

export default CreateHousekeepingTask;















