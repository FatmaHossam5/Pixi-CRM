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

const CreateHousekeepers = ({ isEditMode,
  onClose,
  initialData }) => {
  const { t } = useTranslation();
  const { showToast } = useContext(ToastContext);


  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors }
  } = useForm({
    defaultValues: isEditMode
      ? {
        housekeeper_name_en: initialData?.housekeeper_name_en || "",
        housekeeper_name_ar: initialData?.housekeeper_name_ar || ""

      }
      : {},
    mode: 'all',
  });
  const houseKeeperId = isEditMode ? initialData?.id : null;
  const HouseKeeperTaskNameAr = useWatch({ control, name: 'housekeeper_name_ar' });
  const HouseKeeperTaskNameEn = useWatch({ control, name: 'housekeeper_name_en' });
  const isDisabled = !(HouseKeeperTaskNameAr?.length > 0 && HouseKeeperTaskNameEn?.length > 0);

  const { baseUrlPms, Headers, userId, setIsDisabled, setIsLoading, isLoading } = useContext(AuthContext);
  const { handleClose } = useContext(ModalContext);
  const { fetchData } = useData();
  const createMainHouseKeeper = async (data) => {
    const response = await axios.post(
      `${baseUrlPms}/housekeeper/store/`,
      {
        created_by: userId,
        updated_by: userId,

      },
      { headers: Headers }
    );
    return response.data.data.id;
  };

  const createHouseKeeperAr = async (houseKeeperId, nameAr) => {
    await axios.post(
      `${baseUrlPms}/housekeeper_ar/store/`,
      {
        pms_housekeeper_id: houseKeeperId,
        housekeeper_name_ar: nameAr,
      },
      { headers: Headers }
    );
  };

  const createHouseKeeperEn = async (houseKeeperId, nameEn) => {
    await axios.post(
      `${baseUrlPms}/housekeeper_en/store/`,
      {
        pms_housekeeper_id: houseKeeperId,
        housekeeper_name_en: nameEn,
      },
      { headers: Headers }
    );
  };

  const handleCreateHouseKeeper = async (data) => {
    const isCreating = !isEditMode;




    setIsLoading(true);
    setIsDisabled(true);

    try {
      let houseKeeperId;

      if (isCreating) {
        houseKeeperId = await createMainHouseKeeper(data);
        await Promise.all([
          createHouseKeeperAr(houseKeeperId, data.housekeeper_name_ar),
          createHouseKeeperEn(houseKeeperId, data.housekeeper_name_en),
        ]);

      } else {
        houseKeeperId = initialData.id;
        await Promise.all([
          axios.patch(
            `${baseUrlPms}/housekeeper/${houseKeeperId}/update/`,
            {
              ...data,
              updated_by: userId,
              created_by: userId,
            },
            { headers: Headers }
          ),
          axios.patch(
            `${baseUrlPms}/housekeeper_ar/${houseKeeperId}/update/`,
            {
              pms_housekeeper_id: houseKeeperId,
              housekeeper_name_ar: data.housekeeper_name_ar,
            },
            { headers: Headers }
          ),
          axios.patch(
            `${baseUrlPms}/housekeeper_en/${houseKeeperId}/update/`,
            {
              pms_housekeeper_id: houseKeeperId,
              housekeeper_name_en: data.housekeeper_name_en,
            },
            { headers: Headers }
          ),
        ]);
      }

      showToast('success', t(isCreating ? 'msg.housekeeperMsg' : 'msg.updateHouseKeeperMsg'));
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
  // const createHouseKeeper = async (data) => {
  //   try {
  //     const houseKepperData = await axios.post(
  //       `${baseUrlPms}/housekeeper/store/`,
  //       {
  //         created_by: userId,
  //         updated_by: userId,
  //       },
  //       {
  //         headers: Headers,
  //       }
  //     );

  //     const houseKepperId = houseKepperData.data.data.id;

  //     const houseKepperDataAr = await axios.post(
  //       `${baseUrlPms}/housekeeper_ar/store/`,
  //       {
  //         pms_housekeeper_id: houseKepperId,
  //         housekeeper_name_ar: data.housekeeper_name_ar,
  //       },
  //       {
  //         headers: Headers,
  //       }
  //     );

  //     const houseKepperDataEn = await axios.post(
  //       `${baseUrlPms}/housekeeper_en/store/`,
  //       {
  //         pms_housekeeper_id: houseKepperId,
  //         housekeeper_name_en: data.housekeeper_name_en,
  //       },
  //       {
  //         headers: Headers,
  //       }
  //     );

  //     if (
  //       // eslint-disable-next-line no-constant-condition
  //       (houseKepperData.status &&
  //         houseKepperDataAr.status &&
  //         houseKepperDataEn.status === 200) ||
  //       201
  //     ) {
  //       showToast('success', t("msg.HouseKeeperMsg"));

  //       //   reset()
  //     }
  //   } catch (error) {
  //     showToast('error', t("msg.errorMessage"));
  //   }
  // };

  return (
    <>

      <form
        className="d-flex flex-wrap justify-content-end"
        onSubmit={handleSubmit(handleCreateHouseKeeper)}
      >


        <div className="form-inputs form-margin d-flex w-100">
          <InputForrModal
            label={`${t("housekeepingSection.housekeeper")} ${t("input.englishNameLabel")}`}
            type="text"
            placeholder={t("input.englishPlaceholder")}
            register={register}
            name="housekeeper_name_en"
            validationRules={{
              required: t('input.fieldRequired'),
              pattern: {
                value: /^[A-Za-z\s]+$/,
                message: t('input.onlyEnglishAllowed'),
              },
            }}
            errors={errors.housekeeper_name_en}
            className="pe-2 w-50"
          />
          <InputForrModal
            label={`${t("housekeepingSection.housekeeper")} ${t("input.arabicNameLabel")}`}
            type="text"
            placeholder={t('input.arabicPlaceholder')}
            register={register}
            name="housekeeper_name_ar"
            validationRules={{
              required: t('input.fieldRequired'),
              pattern: {
                value: /^[\u0600-\u06FF\s]+$/,
                message: t('input.onlyArabicAllowed'),
              },
            }}
            errors={errors.housekeeper_name_ar}
            className="ps-2 w-50"
          />
        </div>
        <FromButton reset={reset} isLoading={isLoading} buttonLabel={isEditMode ? t('btn.edit') : t('btn.add')} disabled={isDisabled} />      </form>
    </>
  );
};

export default CreateHousekeepers;
