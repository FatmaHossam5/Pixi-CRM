import { useContext } from "react";
import { useForm } from "react-hook-form";
import { AuthContext } from "../../../../../Helpers/Context/AuthContext";
import { ModalContext } from "../../../../../Helpers/Context/ModalContext";
import axios from "axios";
import ErrorModal from "../../../../../Shared/ErrorModal/ErrorModal";
import SuccessModal from "../../../../../Shared/SuccessModal/SuccessModal";
import FromButton from "../../../../../Shared/FromButton/FromButton";
import { useTranslation } from "react-i18next";
import { ToastContext } from "../../../../../Helpers/Context/ToastContext ";
import InputForrModal from "../../../../../Shared/InputForModal/InputForrModal";
import { useData } from "../../../../../Helpers/Context/useData";

const CreateDependentType = ({ onClose = () => { }, isEditMode, initialData }) => {
  const { t } = useTranslation();
  const { showToast } = useContext(ToastContext);
console.log(initialData);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: isEditMode
      ? {
        age_group_name_ar: initialData?.age_group_name_ar || "",
        age_group_name_en: initialData?.age_group_name_en || "",
      }
      : {},
  });

  const { modelState, closeModal, setModelState, handleClose } =
    useContext(ModalContext);

  const { baseUrlPms, Headers, userId, setIsLoading, setIsDisabled } = useContext(AuthContext);
const{fetchData}=useData()

  // Create main age group
  const createMainAgeGroup = async () => {
    const response = await axios.post(
      `${baseUrlPms}/age_group/store/`,
      {
        created_by: userId,
        updated_by: userId,
      },
      { headers: Headers }
    );
    return response.data.data.id; // Return the age group ID
  };

  // Create Arabic translation for age group
  const createAgeGroupArabic = async (ageGroupId, ageGroupNameAr) => {
    await axios.post(
      `${baseUrlPms}/age_group_ar/store/`,
      {
        pms_age_group_id: ageGroupId,
        age_group_name_ar: ageGroupNameAr,
      },
      { headers: Headers }
    );
  };

  // Create English translation for age group
  const createAgeGroupEnglish = async (ageGroupId, ageGroupNameEn) => {
    await axios.post(
      `${baseUrlPms}/age_group_en/store/`,
      {
        pms_age_group_id: ageGroupId,
        age_group_name_en: ageGroupNameEn,
      },
      { headers: Headers }
    );
  };
  // Handle form submission
  const handleCreateAgeGroup = async (data) => {
    setIsLoading(true);
    setIsDisabled(true);

    try {
      let ageGroupId;

      if (isEditMode) {
        ageGroupId = initialData.id;

        // Update main vendor details
        await axios.patch(`${baseUrlPms}/age_group/${ageGroupId}/update/`, {
          created_by:userId,
          updated_by: userId,
        }, { headers: Headers });

        // Update localized names
        await Promise.all([
          axios.patch(`${baseUrlPms}/age_group_ar/${ageGroupId}/update/`, {
            pms_age_group_id: ageGroupId,
            age_group_name_ar: data.age_group_name_ar,
          }, { headers: Headers }),
          axios.patch(`${baseUrlPms}/age_group_en/${ageGroupId}/update/`, {
            pms_age_group_id: ageGroupId,
            age_group_name_en: data.age_group_name_en,
          }, { headers: Headers }),
        ]);
      } else {
        // Step 1: Create main age group
        ageGroupId = await createMainAgeGroup();

        // Step 2: Create Arabic and English translations
        await Promise.all([
          createAgeGroupArabic(ageGroupId, data.age_group_name_ar),
          createAgeGroupEnglish(ageGroupId, data.age_group_name_en),
        ]);

    
      }
      showToast("success", t(isEditMode ? "msg.updateGroupMsg" : "msg.ageGroupCreated"));
      reset({});


      if (isEditMode) {
        onClose();
      }
      handleClose();
      fetchData();
   
      reset();
      onClose();
    } catch (error) {
      console.error("Error creating/updating age group:", error);
      showToast("error", "Failed to create/update age group.");
    } finally {
      setIsLoading(false);
      setIsDisabled(false);
    }
  };
  return (
    <>

      <form
        className="d-flex flex-wrap justify-content-end"
        onSubmit={handleSubmit(handleCreateAgeGroup)}
      >

        <div className="form-inputs d-flex w-100">
          {/* English Name */}
          <InputForrModal
            label="Age Group English Name"
            type="text"
            placeholder="Enter English Name"
            register={register}
            name="age_group_name_en"
            validationRules={{
              required: "English name is required",
            }}
            errors={errors.age_group_name_en}
          />

          <InputForrModal
            label="Age Group Arabic Name"
            type="text"
            placeholder="Enter Arabic Name"
            register={register}
            name="age_group_name_ar"
            validationRules={{
              required: "Arabic name is required",
            }}
            errors={errors.age_group_name_ar}
          />
        </div>



        <FromButton reset={reset} buttonLabel={isEditMode ? "Update " : "Add"}/>
      </form>
    </>
  );
}

export default CreateDependentType
