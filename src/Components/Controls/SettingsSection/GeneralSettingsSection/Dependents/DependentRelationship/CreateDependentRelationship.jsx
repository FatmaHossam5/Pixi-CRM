import { useForm } from "react-hook-form";
import { ModalContext } from "../../../../../Helpers/Context/ModalContext";
import { useContext } from "react";
import { AuthContext } from "../../../../../Helpers/Context/AuthContext";
import axios from "axios";
import FromButton from "../../../../../Shared/FromButton/FromButton";
import { useTranslation } from "react-i18next";
import { ToastContext } from "../../../../../Helpers/Context/ToastContext ";
import { useData } from "../../../../../Helpers/Context/useData";

const CreateDependentRelationship = ({ onClose = () => {}, isEditMode, initialData }) => {
  const { t } = useTranslation();
  const { showToast } = useContext(ToastContext);
  const { fetchData } = useData();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: isEditMode
      ? {
          dependant_relationship_name_ar: initialData?.dependant_relationship_name_ar || "",
          dependant_relationship_name_en: initialData?.dependant_relationship_name_en || "",
        }
      : {},
  });

  const { modelState, closeModal, setModelState, handleClose } =
    useContext(ModalContext);

  const { baseUrlPms, Headers, userId ,setIsLoading, setIsDisabled } = useContext(AuthContext);

  const createDependentRelationship = async (data) => {
    try {
      const dependantRelationshipData = await axios.post(
        `${baseUrlPms}/dependant_relationship/store/`,
        {
          created_by: userId,
          updated_by: userId,
        },
        {
          headers: Headers,
        }
      );

      const dependantRelationshipId = dependantRelationshipData.data.data.id;

      await axios.post(
        `${baseUrlPms}/dependant_relationship_ar/store/`,
        {
          pms_dependant_relationship_id: dependantRelationshipId,
          dependant_relationship_name_ar: data.dependant_relationship_name_ar,
        },
        {
          headers: Headers,
        }
      );

      await axios.post(
        `${baseUrlPms}/dependant_relationship_en/store/`,
        {
          pms_dependant_relationship_id: dependantRelationshipId,
          dependant_relationship_name_en: data.dependant_relationship_name_en,
        },
        {
          headers: Headers,
        }
      );

      handleClose();

      showToast('success', t("msg.dependentRelationshipMsg"));

      reset(); // Reset form after successful submission
    } catch (error) {
      showToast('error', "msg.errorMessage");
    }
  };
  const handleCreateOrUpdate = async (data) => {
    setIsLoading(true);
    setIsDisabled(true);

    try {
      let relationshipId;

      if (isEditMode) {
        relationshipId = initialData.id;

        await axios.patch(
          `${baseUrlPms}/dependant_relationship/${relationshipId}/update/`,
          {
            created_by: userId,
            updated_by: userId,
          },
          { headers: Headers }
        );

        await Promise.all([
          axios.patch(`${baseUrlPms}/dependant_relationship_ar/${relationshipId}/update/`, {
            pms_dependant_relationship_id: relationshipId,
            dependant_relationship_name_ar: data.dependant_relationship_name_ar,
          }, { headers: Headers }),
          axios.patch(`${baseUrlPms}/dependant_relationship_en/${relationshipId}/update/`, {
            pms_dependant_relationship_id: relationshipId,
            dependant_relationship_name_en: data.dependant_relationship_name_en,
          }, { headers: Headers }),
        ]);
      } else {
        const response = await axios.post(
          `${baseUrlPms}/dependant_relationship/store/`,
          { created_by: userId, updated_by: userId },
          { headers: Headers }
        );
        relationshipId = response.data.data.id;

        await Promise.all([
          axios.post(`${baseUrlPms}/dependant_relationship_ar/store/`, {
            pms_dependant_relationship_id: relationshipId,
            dependant_relationship_name_ar: data.dependant_relationship_name_ar,
          }, { headers: Headers }),
          axios.post(`${baseUrlPms}/dependant_relationship_en/store/`, {
            pms_dependant_relationship_id: relationshipId,
            dependant_relationship_name_en: data.dependant_relationship_name_en,
          }, { headers: Headers }),
        ]);
      }

      showToast("success", t(isEditMode ? "msg.updateRelationshipMsg" : "msg.relationshipCreated"));
      reset();
      onClose();
      fetchData();
    } catch (error) {
      console.error("Error creating/updating relationship:", error);
      showToast("error", t("msg.errorMessage"));
    } finally {
      setIsLoading(false);
      setIsDisabled(false);
    }
  };
  return (
    <>

      <form
        className="d-flex flex-wrap justify-content-end"
        onSubmit={handleSubmit(handleCreateOrUpdate)}
      >
        <div className="form-inputs d-flex w-100">
          <div className="input-package mt-3 pe-2 d-flex flex-column w-50">
            <label className="mb-2" >
              {`${t("dependentsSection.dependentRelationship")} ${t("input.englishNameLabel")}`}

            </label>
            <input
              type="text"
              placeholder={t("input.englishPlaceholder")}
              className="px-form-input w-100"
              {...register("dependant_relationship_name_en", {
                required: true,
                pattern: /^[A-Za-z\s]+(?:\d+)?$/,
              })}
            />
            {errors.dependant_relationship_name_en?.type === "required" && (
              <p className="text-danger">{t("input.fieldRequired")}</p>
            )}
            {errors.dependant_relationship_name_en?.type === "pattern" && (
              <p className="text-danger">{t("input.onlyEnglishAllowed")}</p>
            )}
          </div>
          <div className="input-package mt-3 ps-2 d-flex flex-column w-50">
            <label className="mb-2" >
              {`${t("dependentsSection.dependentRelationship")} ${t("input.englishNameLabel")}`}

            </label>
            <input
              type="text"
              placeholder={t("input.arabicPlaceholder")}
              className="px-form-input w-100"
              {...register("dependant_relationship_name_ar", {
                required: true,
                pattern: /^[\u0600-\u06FF\s]+(?:\d+)?$/,
              })}
            />
            {errors.dependant_relationship_name_ar?.type === "required" && (
              <p className="text-danger">{t("input.fieldRequired")}</p>
            )}
            {errors.dependant_relationship_name_ar?.type === "pattern" && (
              <p className="text-danger">{t("input.onlyArabicAllowed")}</p>
            )}
          </div>
        </div>

        <FromButton  reset={reset} buttonLabel={isEditMode ? "Update" : "Add"} />
      </form>
    </>
  );
}

export default CreateDependentRelationship;
