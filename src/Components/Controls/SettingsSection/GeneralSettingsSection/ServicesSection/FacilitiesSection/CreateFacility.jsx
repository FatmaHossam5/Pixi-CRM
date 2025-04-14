import axios from "axios";
import FromButton from "../../../../../Shared/FromButton/FromButton";
import { useContext, useEffect } from "react";
import { useForm, useWatch } from "react-hook-form";
import { AuthContext } from "../../../../../Helpers/Context/AuthContext";
import { ModalContext } from "../../../../../Helpers/Context/ModalContext";
import { useTranslation } from "react-i18next";
import { ToastContext } from "../../../../../Helpers/Context/ToastContext ";
import { useData } from "../../../../../Helpers/Context/useData";
import InputForrModal from "../../../../../Shared/InputForModal/InputForrModal";

const CreateFacilitiesSection = ({
  initialData,
  onClose,
  isEditMode,
}) => {
  const { t } = useTranslation();
  const { showToast } = useContext(ToastContext);
  const { fetchData } = useData();



  const { register, handleSubmit, formState: { errors }, reset, control } = useForm({
    defaultValues: isEditMode ? {
      facility_name_en: initialData?.facility_name_en || "",
      facility_name_ar: initialData?.facility_name_ar || "",
      facility_description_en: initialData?.facility_description_en || "",
      facility_description_ar: initialData?.facility_description_ar || ""
    } : {}, mode: "all"
  });


  const { handleClose } = useContext(ModalContext);
  const facilityEn = useWatch({ control, name: 'facility_name_en' });
  const facilityDescriptionEn = useWatch({ control, name: 'facility_description_en' });
  const isDisabled = !(facilityEn?.length > 0 && facilityDescriptionEn?.length > 0);
  const { baseUrlPms, Headers, userId, setIsLoading, setIsDisabled, isLoading } = useContext(AuthContext);
  const facilityId = isEditMode ? initialData?.id : null;
  //   const createFacility = async (data) => {
  //     const isCreating = !isEditMode;
  //     setIsLoading(true);
  //     setIsDisabled(true);
  //     try {
  //      let facilityId;
  //       if(isCreating){
  //         const facilityData = await axios.post(
  //           `${baseUrlPms}/facility/store/`,
  //           {
  //             created_by: userId,
  //             updated_by: userId,
  //           },
  //           {
  //             headers: Headers,
  //           }
  //         );

  //         const facilityId = facilityData.data.data.id;
  //         const facilityDataAr = await axios.post(
  //           `${baseUrlPms}/facility_ar/store/`,
  //           {
  //             pms_facility_id: facilityId,
  //             facility_name_ar: data.facility_name_ar,
  //             facility_description_ar: data.facility_description_ar,
  //           },
  //           {
  //             headers: Headers,
  //           }
  //         );

  //         const facilityDataEn = await axios.post(
  //           `${baseUrlPms}/facility_en/store/`,
  //           {
  //             pms_facility_id: facilityId,
  //             facility_name_en: data.facility_name_en,
  //             facility_description_en: data.facility_description_en,
  //           },
  //           {
  //             headers: Headers,
  //           }
  //         );
  //       }

  // else{
  //   facilityId=initialData.id
  //   await Promise.all([
  //     axios.patch(`${baseUrlPms}/facility/${facilityId}/update/`, {
  //       ...data,
  //       updated_by: userId,
  //       created_by: userId,
  //     }, { headers: Headers }),
  //     axios.patch(`${baseUrlPms}/facility_ar/${facilityId}/update/`, {
  //       pms_facility_id: facilityId,
  //       facility_name_ar: data.facility_name_ar,
  //       facilit_description_ar:data.facilit_description_ar
  //     }, { headers: Headers }),
  //     axios.patch(`${baseUrlPms}/facility_en/${facilityId}/update/`, {
  //       pms_facility_id: facilityId,
  //       facility_name_en: data.facility_name_en,
  //       facilit_description_aen:data.facilit_description_aen
  //     }, { headers: Headers }),
  //   ]);
  // }


  //        {
  //         showToast('success', t("msg.facilityMsg"));
  //         handleClose();
  //         fetchData();

  //       }
  //     } catch (error) {
  //       showToast('error', t("msg.errorMessage"));
  //     } finally {
  //       handleClose();
  //       reset();
  //       setIsLoading(false);
  //       setIsDisabled(false);
  //     }
  //   };


  const createFacility = async (data) => {
    setIsLoading(true);
    setIsDisabled(true);

    try {
      let isCreating=!isEditMode
      if (isCreating) {
        // Create new facility
        const { data: facilityResponse } = await axios.post(
          `${baseUrlPms}/facility/store/`,
          { created_by: userId, updated_by: userId },
          { headers: Headers }
        );


        const facilityId = facilityResponse?.data?.id;


        await Promise.all([
          axios.post(
            `${baseUrlPms}/facility_ar/store/`,
            {
              pms_facility_id: facilityId,
              facility_name_ar: data.facility_name_ar,
              facility_description_ar: data.facility_description_ar,
            },
            { headers: Headers }
          ),
          axios.post(
            `${baseUrlPms}/facility_en/store/`,
            {
              pms_facility_id: facilityId,
              facility_name_en: data.facility_name_en,
              facility_description_en: data.facility_description_en,
            },
            { headers: Headers }
          ),
        ]);
      } else {
        // Update existing facility
        const facilityId = initialData.id;

        await Promise.all([
          axios.patch(
            `${baseUrlPms}/facility/${facilityId}/update/`,
            { ...data, updated_by: userId, created_by: userId },
            { headers: Headers }
          ),
          axios.patch(
            `${baseUrlPms}/facility_ar/${facilityId}/update/`,
            {
              pms_facility_id: facilityId,
              facility_name_ar: data.facility_name_ar,
              facility_description_ar: data.facility_description_ar,
            },
            { headers: Headers }
          ),
          axios.patch(
            `${baseUrlPms}/facility_en/${facilityId}/update/`,
            {
              pms_facility_id: facilityId,
              facility_name_en: data.facility_name_en,
              facility_description_en: data.facility_description_en,
            },
            { headers: Headers }
          ),
        ]);
      }
      showToast("success", t(!isEditMode ? "msg.facilityMsg" : "msg.updatefacilityMsg"));
      reset({});

      if (isEditMode) { onClose() }
      handleClose();
      fetchData();
    } catch (error) {
      console.log(error);
      
      showToast("error", t("msg.errorMessage"));
    } finally {
      reset();
      setIsLoading(false);
      setIsDisabled(false);
    }
  };

  useEffect(() => {
    if (isEditMode && initialData) {
      reset({
        facility_name_en: initialData?.facility_name_en || "",
        facility_name_ar: initialData?.facility_name_ar || "",
        facility_description_en: initialData?.facility_description_en || "",
        facility_description_ar: initialData?.facility_description_ar || "",
      });
    }
  }, [isEditMode, initialData, reset]);

  return (
    <>
      <form
        className={`d-flex flex-wrap justify-content-end `}
        onSubmit={handleSubmit(createFacility)}
      >
        <div className={`form-inputs d-flex w-100 `}>
          <InputForrModal
            label={`${t("Facility")} ${t("input.englishNameLabel")}`}
            type="text"
            placeholder={t("input.englishPlaceholder")}
            register={register}
            name="facility_name_en"
            validationRules={{
              required: t("input.fieldRequired"),
              pattern: {
                value: /^[A-Za-z\s]+$/,
                message: t("input.onlyEnglishAllowed"),
              },
            }}
            errors={errors.facility_name_en}

            className="pe-2 w-50"
          />
          <InputForrModal
            label={`${t("Facility")} ${t("input.arabicNameLabel")}`}
            type="text"
            placeholder={t("input.arabicPlaceholder")}
            register={register}
            name="facility_name_ar"
            validationRules={{
              required: t("input.fieldRequired"),
              pattern: {
                value: /^[\u0600-\u06FF\s]+$/,
                message: t("input.onlyArabicAllowed"),
              },
            }}
            errors={errors.facility_name_ar}
            className="ps-2 w-50"
          />
        </div>
        <div className="form-inputs d-flex w-100">
          <InputForrModal
            label={`${t("facilityForms.englishNameDescription")}`}
            type="text"
            placeholder={t("input.englishDescriptionPlaceholder")}
            register={register}
            name="facility_description_en"
            validationRules={{
              required: t("input.fieldRequired"),
              pattern: {
                value: /^[A-Za-z\s]+$/,
                message: t("input.onlyEnglishAllowed"),
              },
            }}
            errors={errors.facility_description_en}

            className="pe-2 w-50"
          />
          <InputForrModal
            label={t("facilityForms.arabicNameDescription")}
            type="text"
            placeholder={t("input.arabicDescriptionPlaceholder")}
            register={register}
            name="facility_description_ar"
            validationRules={{
              required: t("input.fieldRequired"),
              pattern: {
                value: /^[\u0600-\u06FF\s]+$/,
                message: t("input.onlyArabicAllowed"),
              },
            }}
            errors={errors.facility_description_ar}
            className="ps-2 w-50"
          />

        </div>

        <FromButton reset={reset} isLoading={isLoading} buttonLabel={isEditMode ? "Edit Facility" : "Add Facility"} disabled={isDisabled} />
      </form>
    </>
  );
};

export default CreateFacilitiesSection;
