import axios from "axios";
import { useContext, useEffect } from "react";
import { useForm, useWatch } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { AuthContext } from "../../../../../Helpers/Context/AuthContext";
import { ModalContext } from "../../../../../Helpers/Context/ModalContext";
import { ToastContext } from "../../../../../Helpers/Context/ToastContext ";
import { useData } from "../../../../../Helpers/Context/useData";
import FromButton from "../../../../../Shared/FromButton/FromButton";
import InputForrModal from "../../../../../Shared/InputForModal/InputForrModal";

const CreateAmenity = ({
  initialData,
  onClose,
  isEditMode
}) => {
  const { t } = useTranslation();
  const { showToast } = useContext(ToastContext);
  const { register, handleSubmit, formState: { errors }, reset,control } =
    useForm({
      defaultValues: isEditMode ? {
        amenity_name_en: initialData?.amenity_name_en || "",
        amenity_name_ar: initialData?.amenity_name_ar || "",
        amenity_description_en: initialData?.amenity_description_en || "",
        amenity_description_ar: initialData?.amenity_description_ar || ""
      } : {}, mode: "all"
    });

  const { handleClose } = useContext(ModalContext);
  const { fetchData } = useData();
  const { baseUrlPms, Headers, userId,
    setIsLoading,
    isLoading,setIsDisabled } = useContext(AuthContext);
  const amenityId = isEditMode ? initialData?.id : null;
  const amenityEn = useWatch({ control, name: 'amenity_name_en' });
  const amenityDescriptionEn = useWatch({ control, name: 'amenity_description_en' });
  const isDisabled = !(amenityEn?.length > 0 && amenityDescriptionEn?.length > 0);

  // const createAmenity = async (data) => {
  //  const isCreating=!isEditMode;
  //   setIsLoading(true);
  //   setIsDisabled(true);

  //   try {
  //     let amenityId;
  //     if(isCreating){
  //       const amenityData = await axios.post(
  //         `${baseUrlPms}/amenity/store/`,
  //         {
  //           created_by: userId,
  //           updated_by: userId,
  //         },
  //         {
  //           headers: Headers,
  //         }
  //       );

  //       const aminityId = amenityData.data.data.id;

  //       const amenityDataAr = await axios.post(
  //         `${baseUrlPms}/amenity_ar/store/`,
  //         {
  //           pms_amenity_id: aminityId,
  //           amenity_name_ar: data.amenity_name_ar,
  //           amenity_description_ar: data.amenity_description_ar,
  //         },
  //         {
  //           headers: Headers,
  //         }
  //       );

  //       const amenityDataEn = await axios.post(
  //         `${baseUrlPms}/amenity_en/store/`,
  //         {
  //           pms_amenity_id: aminityId,
  //           amenity_name_en: data.amenity_name_en,
  //           amenity_description_en: data.amenity_description_en,
  //         },
  //         {
  //           headers: Headers,
  //         }
  //       );
  //     }else{
  //       amenityId=initialData.id
  //       await Promise.all([
  //         axios.patch(`${baseUrlPms}/facility/${amenityId}/update/`, {
  //           ...data,
  //           updated_by: userId,
  //           created_by: userId,
  //         }, { headers: Headers }),
  //         axios.patch(`${baseUrlPms}/facility_ar/${amenityId}/update/`, {
  //           pms_facility_id: amenityId,
  //           facility_name_ar: data.facility_name_ar,
  //           facilit_description_ar:data.facilit_description_ar
  //         }, { headers: Headers }),
  //         axios.patch(`${baseUrlPms}/facility_en/${amenityId}/update/`, {
  //           pms_facility_id: amenityId,
  //           facility_name_en: data.facility_name_en,
  //           facilit_description_aen:data.facilit_description_aen
  //         }, { headers: Headers }),
  //       ]);
  //     }


  //     if (
  //       // eslint-disable-next-line no-constant-condition
  //       (amenityData.status &&
  //         amenityDataAr.status &&
  //         amenityDataEn.status === 200) ||
  //       201
  //     ) {
  //       showToast('success', t("msg.amenityMsg"));
  //       handleClose();
  //       fetchData();
  //     }
  //   } catch (error) {
  //     showToast('error', t("msg.errorMessage"));
  //   } finally {
  //     handleClose();
  //     reset();
  //     setIsLoading(false);
  //     setIsDisabled(false);
  //   }
  // };
  const createAmenity = async (data) => {
    setIsLoading(true);
    setIsDisabled(true);

    try {
      if (!isEditMode) {
        // Create new facility
        const { data: amenityResponse } = await axios.post(
          `${baseUrlPms}/amenity/store/`,
          { created_by: userId, updated_by: userId },
          { headers: Headers }
        );
        const amenityId = amenityResponse.data.id;
        await Promise.all([
          axios.post(
            `${baseUrlPms}/amenity_ar/store/`,
            {
              pms_amenity_id: amenityId,
              amenity_name_ar: data.amenity_name_ar,
              amenity_description_ar: data.amenity_description_ar,
            },
            { headers: Headers }
          ),
          axios.post(
            `${baseUrlPms}/amenity_en/store/`,
            {
              pms_amenity_id: amenityId,
              amenity_name_en: data.amenity_name_en,
              amenity_description_en: data.amenity_description_en,
            },
            { headers: Headers }
          ),
        ]);
      } else {
        // Update existing facility
        const amenityId = initialData.id;

        await Promise.all([
          axios.patch(
            `${baseUrlPms}/amenity/${amenityId}/update/`,
            { ...data, updated_by: userId, created_by: userId },
            { headers: Headers }
          ),
          axios.patch(
            `${baseUrlPms}/amenity_ar/${amenityId}/update/`,
            {
              pms_amenity_id: amenityId,
              amenity_name_ar: data.amenity_name_ar,
              amenity_description_ar: data.amenity_description_ar,
            },
            { headers: Headers }
          ),
          axios.patch(
            `${baseUrlPms}/amenity_en/${amenityId}/update/`,
            {
              pms_amenity_id: amenityId,
              amenity_name_en: data.amenity_name_en,
              amenity_description_en: data.amenity_description_en,
            },
            { headers: Headers }
          ),
        ]);
      }
      showToast("success", t(!isEditMode ? "msg.amenityMsg" : "msg.updateamenityMsg"));
      reset({});

      if (isEditMode) { onClose() }
      handleClose();
      fetchData();

    } catch (error) {
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
        amenity_name_en: initialData?.amenity_name_en || "",
        amenity_name_ar: initialData?.amenity_name_ar || "",
        amenity_description_en: initialData?.amenity_description_en || "",
        amenity_description_ar: initialData?.amenity_description_ar || "",
      });
    }
  }, [isEditMode, initialData, reset]);
  return (
    <>

      <form
        className={`d-flex flex-wrap justify-content-end `}
        onSubmit={handleSubmit(createAmenity)}
      >
        <div className="form-inputs d-flex w-100">
          <InputForrModal
            label={`${t("Amenity")} ${t("input.englishNameLabel")}`}
            type="text"
            placeholder={t("input.englishPlaceholder")}
            register={register}
            name="amenity_name_en"
            validationRules={{
              required: t("input.fieldRequired"),
              pattern: {
                value: /^[A-Za-z\s]+$/,
                message: t("input.onlyEnglishAllowed"),
              },
            }}
            errors={errors.amenity_name_en}

            className="pe-2 w-50"
          />
          <InputForrModal
            label={`${t("Amenity")} ${t("input.arabicNameLabel")}`}
            type="text"
            placeholder={t("input.arabicPlaceholder")}
            register={register}
            name="amenity_name_ar"
            validationRules={{
              required: t("input.fieldRequired"),
              pattern: {
                value: /^[\u0600-\u06FF\s]+$/,
                message: t("input.onlyArabicAllowed"),
              },
            }}
            errors={errors.amenity_name_ar}
            className="ps-2 w-50"
          />
        </div>
        <div className="form-inputs d-flex w-100">
          <InputForrModal
            label={t("amenityForms.englishNameDescription")}
            type="text"
            placeholder={t("input.englishDescriptionPlaceholder")}
            register={register}
            name="amenity_description_en"
            validationRules={{
              required: t("input.fieldRequired"),
              pattern: {
                value: /^[A-Za-z\s]+$/,
                message: t("input.onlyEnglishAllowed"),
              },
            }}
            errors={errors.amenity_description_en}

            className="pe-2 w-50"
          />
          <InputForrModal
            label={t("amenityForms.arabicNameDescription")}
            type="text"
            placeholder={t("input.arabicPlaceholder")}
            register={register}
            name="amenity_description_ar"
            validationRules={{
              required: t("input.fieldRequired"),
              pattern: {
                value: /^[\u0600-\u06FF\s]+$/,
                message: t("input.onlyArabicAllowed"),
              },
            }}
            errors={errors.amenity_description_ar}
            className="ps-2 w-50"
          />

        </div>

        <FromButton reset={reset} isLoading={isLoading} buttonLabel={isEditMode ? "Edit Amenity" : "Add Amenity"} disabled={isDisabled}/>
      </form>
    </>
  );
};

export default CreateAmenity;
