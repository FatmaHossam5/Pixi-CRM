import { useContext } from 'react'
import FromButton from '../../../../../Shared/FromButton/FromButton';
import { useForm } from 'react-hook-form';
import { ModalContext } from '../../../../../Helpers/Context/ModalContext';
import { AuthContext } from '../../../../../Helpers/Context/AuthContext';
import axios from 'axios';
import SuccessModal from '../../../../../Shared/SuccessModal/SuccessModal';
import ErrorModal from '../../../../../Shared/ErrorModal/ErrorModal';
import { useTranslation } from 'react-i18next';
import { ToastContext } from '../../../../../Helpers/Context/ToastContext ';
import useBranchSelection from '../../../../../Helpers/Hook/useBranchSelection';
import { useData } from '../../../../../Helpers/Context/useData';

const CreateSpecialization = ({
  fetchBranchesForSelectedRoomView,
  branchesTags,
  collectedId,
  setCollectedId,
  isEditMode,
  onClose = () => { },
  initialData }) => {
  const { t } = useTranslation();
  const { showToast } = useContext(ToastContext);

  const { reset, handleSubmit, formState: { errors }, register, control } = useForm({
    defaultValues: isEditMode ? {
      maintenance_type_en: initialData?.maintenance_type_en || "",
      maintenance_type_ar: initialData?.maintenance_type_ar || "",
    }
      : {}, mode: "all"
  });

  const { modelState, closeModal, setModelState, handleClose } =
    useContext(ModalContext);

  const { baseUrlPms, Headers, userId,setIsLoading,setIsDisabled } = useContext(AuthContext);

  const {
    hotels,
    selectedBranches,
    handleToggle,
    handleHotelSelection,
    isBranchChecked,
    isHotelChecked,
    isHotelIndeterminate,
    setSelectedBranches,
  } = useBranchSelection(baseUrlPms, Headers, showToast);
  const{fetchData}=useData();


    // Function to create Room Type in main API
    const createMainSpecialization  = async () => {
      const response = await axios.post(
        `${baseUrlPms}/maintenance_type/store/`,
        { created_by: userId, updated_by: userId },
        { headers: Headers }
      );
      return response.data.data.id; // Return Room Type ID
    };
    // Function to create Room Type in Arabic API
    const createSpecializationAr = async (maintenanceTypeId, maintenanceNameAr) => {
      await axios.post(
        `${baseUrlPms}/maintenance_type_ar/store/`,
        { pms_maintenance_type_id: maintenanceTypeId, maintenance_type_ar: maintenanceNameAr },
        { headers: Headers }
      );
    };
    // Function to create Room Type in English API
    const createSpecializationEn = async (maintenanceTypeId, maintenanceNameEn) => {
      await axios.post(
        `${baseUrlPms}/maintenance_type_en/store/`,
        {
          pms_maintenance_type_id: maintenanceTypeId, maintenance_type_en
            : maintenanceNameEn
        },
        { headers: Headers }
      );
    };
  // Handle form submission
  const handleSpecialization = async (data) => {
    setIsLoading(true);
    setIsDisabled(true);

    try {
      let maintenanceTypeId;

      if (isEditMode) {
        const specializationId = initialData.id;

        await Promise.all([
          axios.patch(
            `${baseUrlPms}/maintenance_type/${specializationId}/update/`,
            { ...data, updated_by: userId, created_by: userId },
            { headers: Headers }
          ),
          axios.patch(
            `${baseUrlPms}/maintenance_type_ar/${specializationId}/update/`,
            {
              pms_maintenance_type_id: specializationId,
              maintenance_type_ar: data.maintenance_type_ar,
             
            },
            { headers: Headers }
          ),
          axios.patch(
            `${baseUrlPms}/maintenance_type_en/${specializationId}/update/`,
            {
              pms_maintenance_type_id: specializationId,
              maintenance_type_en: data.maintenance_type_en,
            },
            { headers: Headers }
          ),
        ]);
        onClose();
      } else {
        // Step 1: Create main age group
        maintenanceTypeId = await createMainSpecialization();

        // Step 2: Create Arabic and English translations
        await Promise.all([
          createSpecializationAr(maintenanceTypeId, data.maintenance_type_ar),
          createSpecializationEn(maintenanceTypeId, data.maintenance_type_en),
        ]);

       
        
      }
      showToast("success", isEditMode? t("msg.updateSpecializationMsg"): t("msg.specializationMsg"));
      reset();
      handleClose() // Close the modal;
      fetchData();
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
        onSubmit={handleSubmit(handleSpecialization)}
      >
        <div className="form-inputs d-flex w-100">
          <div className="input-package mt-3 pe-2 d-flex flex-column w-50">
            <label className="mb-2" htmlFor="maintenance_type_en">
              {`${t("maintenanceSection.specialization")} ${t("input.englishNameLabel")}`}
            </label>
            <input
              type="text"
              placeholder={t("input.englishPlaceholder")}
              className="px-form-input w-100"
              {...register("maintenance_type_en", {
                required: true,
                pattern: /^[A-Za-z\s]+(?:\d+)?$/,
              })}
            />
            {errors?.maintenance_type_en?.type === "required" && (
              <p className="text-danger">{t("input.fieldRequired")}</p>
            )}
            {errors?.maintenance_type_en?.type === "pattern" && (
              <p className="text-danger">{t("input.onlyEnglishAllowed")}</p>
            )}
          </div>
          <div className="input-package mt-3 ps-2 d-flex flex-column w-50">
            <label className="mb-2" htmlFor="maintenance_type_ar">
              {`${t("maintenanceSection.specialization")} ${t("input.arabicNameLabel")}`}
            </label>
            <input
              type="text"
              placeholder={t("input.arabicPlaceholder")}
              className="px-form-input w-100"
              {...register("maintenance_type_ar", {
                required: true,
                pattern: /^[\u0600-\u06FF\s]+(?:\d+)?$/,
              })}
            />
            {errors?.maintenance_type_ar?.type === "required" && (
              <p className="text-danger">{t("input.fieldRequired")}</p>
            )}
            {errors?.maintenance_type_ar?.type === "pattern" && (
              <p className="text-danger">{t("input.onlyArabicAllowed")}</p>
            )}
          </div>
        </div>

        <FromButton reset={reset} buttonLabel={isEditMode ? "Edit specialization " : "Add specialization   "} />
      </form>
    </>
  );
}

export default CreateSpecialization
