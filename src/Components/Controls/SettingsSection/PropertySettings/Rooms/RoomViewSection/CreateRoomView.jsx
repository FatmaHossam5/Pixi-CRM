import axios from "axios";
import { useContext, useEffect } from "react";
import { useForm, useWatch } from "react-hook-form";
import { AuthContext } from "../../../../../Helpers/Context/AuthContext";
import i18next from "i18next";
import { useTranslation } from "react-i18next";
import { ModalContext } from "../../../../../Helpers/Context/ModalContext";
import { ToastContext } from "../../../../../Helpers/Context/ToastContext ";
import { useData } from "../../../../../Helpers/Context/useData.jsx";
import useBranchSelection from "../../../../../Helpers/Hook/useBranchSelection";
import BranchSelector from "../../../../../Shared/BranchSelector/BranchSelector";
import FromButton from "../../../../../Shared/FromButton/FromButton";
import InputForrModal from "../../../../../Shared/InputForModal/InputForrModal";



const CreateRoomView = ({
  fetchBranchesForSelectedRoomView,
  branchesTags,
  collectedId,
  setCollectedId,
  isEditMode,
  onClose,
  initialData }) => {



  const { showToast } = useContext(ToastContext);
  const { t } = useTranslation();
  const { language } = i18next;
  const { reset, handleSubmit, formState: { errors }, register, control } = useForm({
    defaultValues: isEditMode ? {
      view_type_name_en: initialData?.view_type_name_en || "",
      view_type_name_ar: initialData?.view_type_name_ar || "",
    }
      : {}, mode: "all"
  });
  const roomViewId = isEditMode ? initialData?.id : null;
  const roomViewAr = useWatch({ control, name: 'view_type_name_ar' });
  const roomViewEn = useWatch({ control, name: 'view_type_name_en' });
  const isDisabled = !(roomViewAr?.length > 0 && roomViewEn?.length > 0);
  const { fetchData } = useData();
  const { handleClose } = useContext(ModalContext);
  const { baseUrlPms, Headers, userId, setIsLoading, setIsDisabled, isLoading } = useContext(AuthContext);
  const {
    hotels,
    selectedBranches,
    handleToggle,
    handleHotelSelection,
    isBranchChecked,
    isHotelChecked,
    isHotelIndeterminate,
    setSelectedBranches,
  } = useBranchSelection(baseUrlPms, Headers, language, showToast);

  // Function to create Room Type in main API
  const createMainRoomView = async () => {
    const response = await axios.post(
      `${baseUrlPms}/view_type/store/`,
      { created_by: userId, updated_by: userId },
      { headers: Headers }
    );
    return response.data.data.id; // Return Room Type ID
  };
  // Function to create Room Type in Arabic API
  const createRoomViewAr = async (roomViewId, roomViewNameAr) => {
    await axios.post(
      `${baseUrlPms}/view_type_ar/store/`,
      { pms_view_type_id: roomViewId, view_type_name_ar: roomViewNameAr },
      { headers: Headers }
    );
  };
  // Function to create Room Type in English API
  const createRoomViewEn = async (roomViewId, roomViewNameEn) => {
    await axios.post(
      `${baseUrlPms}/view_type_en/store/`,
      {
        pms_view_type_id: roomViewId, view_type_name_en
          : roomViewNameEn
      },
      { headers: Headers }
    );
  };

  // Function to associate Room Type with branches
  const associateRoomViewWithBranches = async (roomViewId) => {
    const allSelectedBranchIds = Object.entries(selectedBranches).flatMap(([hotelName, branches]) =>
      Object.keys(branches).map((branchId) => parseInt(branchId))
    );
    const branchPromises = allSelectedBranchIds.map((branchId) =>
      axios.post(
        `${baseUrlPms}/view_type_branch/store/`,
        {
          created_by: userId,
          updated_by: userId,
          view_type_id: roomViewId,
          branch_id: branchId,
        },
        { headers: Headers }
      )
    );

    await Promise.all(branchPromises); // Wait for all API calls to complete
  };
  // Handle form submission
  const createRoomView = async (data) => {
    const isCreating = !isEditMode;
    // Check if there are any selected branches
    const hasSelectedBranches = Object.values(selectedBranches).some(
      (branches) => Object.keys(branches).length > 0
    );

    if (isCreating && !hasSelectedBranches) {
      showToast("error", t("msg.selectBranchError"));
      return;
    }

    setIsLoading(true);
    setIsDisabled(true);

    try {
      let roomViewId;
      if (isCreating) {
        // Step 1: Create main Room Type and get ID
        const roomViewId = await createMainRoomView();
        // Step 2: Create translations for the Room View
        await Promise.all([
          createRoomViewAr(roomViewId, data.view_type_name_ar),
          createRoomViewEn(roomViewId, data.view_type_name_en)
        ]);
        // Step 3: Associate Room Type with selected branches
        if (hasSelectedBranches) {
          await associateRoomViewWithBranches(roomViewId);
        }
      } else {
        roomViewId = initialData.id;

        await Promise.all([
          axios.patch(`${baseUrlPms}/view_type/${roomViewId}/update/`, {
            ...data,
            updated_by: userId,
            created_by: userId,
          }, { headers: Headers }),
          axios.patch(`${baseUrlPms}/view_type_ar/${roomViewId}/update/`, {
            pms_view_type_id: roomViewId,
            view_type_name_ar: data.view_type_name_ar,
          }, { headers: Headers }),
          axios.patch(`${baseUrlPms}/view_type_en/${roomViewId}/update/`, {
            pms_view_type_id: roomViewId,
            view_type_name_en: data.view_type_name_en,
          }, { headers: Headers }),
        ]);

      }
      // Show success message
      showToast("success", t(isCreating ? "msg.roomViewMsg" : "msg.updateroomViewMsg"));
      reset({});

      setSelectedBranches({});// Clear selected branches
      if (!isCreating) {
        onClose();
      }
      handleClose();
      fetchData();
    }

    catch (error) {
      showToast("error", t("msg.errorMessage"));
      console.error("Error during Room Type creation:", error);
    } finally {
      setIsLoading(false);
      setIsDisabled(false);
    }
  };

  useEffect(() => {
    if (isEditMode && initialData?.id) {
      // Fetch branches only if it's in edit mode and roomTypeId is available
      fetchBranchesForSelectedRoomView(initialData.id);
    }
  }, []);

  return (
    <>
      <form className="d-flex flex-wrap justify-content-end" onSubmit={handleSubmit(createRoomView)}>
        <div className="form-inputs d-flex w-100">
          <div className="input-package mt-3 pe-2 d-flex flex-column w-100">
            <BranchSelector
              mode="RoomView"
              hotels={hotels}
              handleHotelSelection={handleHotelSelection}
              handleToggle={handleToggle}
              isBranchChecked={isBranchChecked}
              isHotelChecked={isHotelChecked}
              isHotelIndeterminate={isHotelIndeterminate}
              fetchBranches={fetchBranchesForSelectedRoomView}
              branchesTags={branchesTags}
              collectedId={collectedId}
              reset={reset}
              setCollectedId={setCollectedId}
              isEditMode={isEditMode}
              itemId={roomViewId}
            />

            <div className="form-inputs form-margin d-flex w-100 custom-form-inputs form-inputs-row">
              <InputForrModal
                label={`${t("roomView")} ${t("input.englishNameLabel")}`}
                type="text"
                placeholder={t("input.englishPlaceholder")}
                register={register}
                name="view_type_name_en"
                validationRules={{
                  required: t("input.fieldRequired"),
                  pattern: {
                    value: /^[A-Za-z\s]+$/,
                    message: t("input.onlyEnglishAllowed"),
                  },
                }}
                errors={errors.view_type_name_en}

                className="pe-2 w-50"
              />
              <InputForrModal
                label={`${t("roomView")} ${t("input.arabicNameLabel")}`}
                type="text"
                placeholder={t("input.arabicPlaceholder")}
                register={register}
                name="view_type_name_ar"
                validationRules={{
                  required: t("input.fieldRequired"),
                  pattern: {
                    value: /^[\u0600-\u06FF\s]+$/,
                    message: t("input.onlyArabicAllowed"),
                  },
                }}
                errors={errors.view_type_name_ar}
                className="ps-2 w-50"
              />
            </div>
            <FromButton reset={reset} isLoading={isLoading} buttonLabel={isEditMode ? "Edit Room View" : "Add Room View"} disabled={isDisabled} />
          </div>
        </div>
      </form>
    </>
  );
};

export default CreateRoomView;
