import { useContext } from 'react'
import FromButton from '../../../../../Shared/FromButton/FromButton';
import { useForm } from 'react-hook-form';
import { ModalContext } from '../../../../../Helpers/Context/ModalContext';
import { AuthContext } from '../../../../../Helpers/Context/AuthContext';
import axios from 'axios';
import { useTranslation } from 'react-i18next';
import { ToastContext } from '../../../../../Helpers/Context/ToastContext ';
import { useData } from '../../../../../Helpers/Context/useData';

const CreateWorkers = ( {  initialData,
  onClose,
  isEditMode}) => {
  const { t } = useTranslation();
  const { showToast } = useContext(ToastContext);


  const { register, handleSubmit, formState: { errors }, reset, control } = useForm({
    defaultValues: isEditMode ? {
      maintenance_worker_name_ar: initialData?.maintenance_worker_name_ar || "",
      maintenance_worker_name_en: initialData?.maintenance_worker_name_en || "",
    
    } : {}, mode: "all"
  });

  const { handleClose } =
    useContext(ModalContext);

  const { baseUrlPms, Headers, userId,setIsLoading,setIsDisabled } = useContext(AuthContext);
  const{fetchData}=useData()
   // Function to create Room Type in main API
   const createMainWorker  = async () => {
    const response = await axios.post(
      `${baseUrlPms}/maintenance_worker/store/`,
      { created_by: userId, updated_by: userId },
      { headers: Headers }
    );
    return response.data.data.id; // Return Room Type ID
  };
  // Function to create Room Type in Arabic API
  const createWorkerAr = async (workerId, maintenanceNameAr) => {
    await axios.post(
      `${baseUrlPms}/maintenance_worker_ar/store/`,
      { pms_maintenance_worker_id: workerId, maintenance_worker_name_ar: maintenanceNameAr },
      { headers: Headers }
    );
  };
  // Function to create Room Type in English API
  const createWorkerEn = async (workerId, maintenanceNameEn) => {
    await axios.post(
      `${baseUrlPms}/maintenance_worker_en/store/`,
      {
        pms_maintenance_worker_id: workerId, maintenance_worker_name_en
          : maintenanceNameEn
      },
      { headers: Headers }
    );
  };

  const handleWorkers = async (data) => {
    setIsLoading(true);
    setIsDisabled(true);

    try {
      let workerId;

      if (isEditMode) {
        const workerId = initialData.id;

        await Promise.all([
          axios.patch(
            `${baseUrlPms}/maintenance_worker/${workerId}/update/`,
            { ...data, updated_by: userId, created_by: userId },
            { headers: Headers }
          ),
          axios.patch(
            `${baseUrlPms}/maintenance_worker_ar/${workerId}/update/`,
            {
              pms_maintenance_worker_id: workerId,
              maintenance_worker_name_ar: data.maintenance_worker_name_ar,
             
            },
            { headers: Headers }
          ),
          axios.patch(
            `${baseUrlPms}/maintenance_worker_en/${workerId}/update/`,
            {
              pms_maintenance_worker_id: workerId,
              maintenance_worker_name_en: data.maintenance_worker_name_en,
            },
            { headers: Headers }
          ),
        ]);
        onClose();
      } else {
      
          // Step 1: Create main age group
          workerId = await createMainWorker();

          // Step 2: Create Arabic and English translations
          await Promise.all([
            createWorkerAr(workerId, data.maintenance_worker_name_ar),
            createWorkerEn(workerId, data.maintenance_worker_name_en),
          ]);

       
        
      }
      showToast("success", isEditMode? t("msg.updateWorkernMsg"): t("msg.workersMsg"));
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
        onSubmit={handleSubmit(handleWorkers)}
      >
        <div className="form-inputs d-flex w-100">
          <div className="input-package mt-3 pe-2 d-flex flex-column w-50">
            <label className="mb-2" htmlFor="maintenance_worker_name_en">
              {`${t("maintenanceSection.workers")} ${t("input.englishNameLabel")}`}
            </label>
            <input
              type="text"
              placeholder={t("input.englishPlaceholder")}
              className="px-form-input w-100"
              {...register("maintenance_worker_name_en", {
                required: true,
                pattern: /^[A-Za-z\s]+(?:\d+)?$/,
              })}
            />
            {errors?.maintenance_worker_name_en?.type === "required" && (
              <p className="text-danger">{t("input.fieldRequired")}</p>
            )}
            {errors?.maintenance_worker_name_en?.type === "pattern" && (
              <p className="text-danger">{t("input.onlyEnglishAllowed")}</p>
            )}
          </div>
          <div className="input-package mt-3 ps-2 d-flex flex-column w-50">
            <label className="mb-2" htmlFor="maintenance_worker_name_ar">
              {`${t("maintenanceSection.workers")} ${t("input.arabicNameLabel")}`}
            </label>
            <input
              type="text"
              placeholder={t("input.arabicPlaceholder")}
              className="px-form-input w-100"
              {...register("maintenance_worker_name_ar", {
                required: true,
                pattern: /^[\u0600-\u06FF\s]+(?:\d+)?$/,
              })}
            />
            {errors?.maintenance_worker_name_ar?.type === "required" && (
              <p className="text-danger">{t("input.fieldRequired")}</p>
            )}
            {errors?.maintenance_worker_name_ar?.type === "pattern" && (
              <p className="text-danger">{t("input.onlyArabicAllowed")}</p>
            )}
          </div>
        </div>

        <FromButton reset={reset}  buttonLabel={isEditMode ? "Edit Worker " : "Add Worker  "}/>
      </form>
    </>
  );
}

export default CreateWorkers
