
import axios from "axios";
import i18next from "i18next";
import React, { useContext, useEffect } from "react";
import { useForm, useWatch } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { AuthContext } from "../../../../../Helpers/Context/AuthContext";
import { ModalContext } from "../../../../../Helpers/Context/ModalContext";
import { ToastContext } from "../../../../../Helpers/Context/ToastContext ";
import { useData } from "../../../../../Helpers/Context/useData.jsx";
import useBranchSelection from "../../../../../Helpers/Hook/useBranchSelection";
import BranchSelector from "../../../../../Shared/BranchSelector/BranchSelector";
import FromButton from "../../../../../Shared/FromButton/FromButton";
import InputForrModal from "../../../../../Shared/InputForModal/InputForrModal";
import { debounce } from "lodash";
const CreateRoomType = ({
  initialData,
  onClose,
  isEditMode,
  fetchBranchesForSelectedRoomType,
  branchesTags,
  collectedId,
  setCollectedId }) => {
  const { t } = useTranslation();
  const { language } = i18next;
  const { reset, handleSubmit, formState: { errors }, register, control } = useForm({
    defaultValues: isEditMode ? {
      room_type_name_en: initialData?.room_type_name_en || "",
      room_type_name_ar: initialData?.room_type_name_ar || "",
    }
      : {}, mode: "all"
  });
  const { showToast } = useContext(ToastContext);
  const { baseUrlPms, Headers, userId, setIsLoading, setIsDisabled, isLoading } = useContext(AuthContext);
  const { fetchData } = useData();
  const roomTypeId = isEditMode ? initialData?.id : null;
  const roomTypeAr = useWatch({ control, name: 'room_type_name_ar' });
  const roomTypeEn = useWatch({ control, name: 'room_type_name_en' });
  const isDisabled = !(roomTypeAr?.length > 0 && roomTypeEn?.length > 0);
  const { handleClose } = useContext(ModalContext)
  // Custom hook for branch selection
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
  const debouncedHandleToggle = debounce(handleToggle, 300);
  const debouncedHandleHotelSelection = debounce(handleHotelSelection, 300);
  // Function to create a main room type in the primary API
  const createMainRoomType = async () => {
    const response = await axios.post(
      `${baseUrlPms}/room_type/store/`,
      { created_by: userId, updated_by: userId },
      { headers: Headers }
    );
    return response.data.data.id; // Return Room Type ID
  };

  // Function to create an Arabic version of the room type
  const createRoomTypeAr = async (roomTypeId, roomTypeNameAr) => {
    await axios.post(
      `${baseUrlPms}/room_type_ar/store/`,
      { pms_room_type_id: roomTypeId, room_type_name_ar: roomTypeNameAr },
      { headers: Headers }
    );
  };

  // Function to create an English version of the room type
  const createRoomTypeEn = async (roomTypeId, roomTypeNameEn) => {
    await axios.post(
      `${baseUrlPms}/room_type_en/store/`,
      { pms_room_type_id: roomTypeId, room_type_name_en: roomTypeNameEn },
      { headers: Headers }
    );
  };

  // Function to associate the created room type with selected branches
  const associateRoomTypeWithBranches = async (roomTypeId) => {
    // Collect all selected branch IDs
    const allSelectedBranchIds = Object.entries(selectedBranches).flatMap(([hotelName, branches]) =>
      Object.keys(branches).map((branchId) => parseInt(branchId))
    );
    ;

    // Create association requests for each branch
    const branchPromises = allSelectedBranchIds.map((branchId) =>
      axios.post(
        `${baseUrlPms}/room_type_branch/store/`,
        {
          created_by: userId,
          updated_by: userId,
          room_type_id: roomTypeId,
          branch_id: branchId,
        },
        { headers: Headers }
      )
    );

    await Promise.all(branchPromises); // Wait for all API calls to complete
  };


  // Main handler for form submission
  const createRoomType = async (data) => {
    const isCreating = !isEditMode;
    // Ensure at least one branch is selected
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
      let roomTypeId;
      if (isCreating) {
        // Step 1: Create main Room Type and get ID
        const roomTypeId = await createMainRoomType();
        // Step 2: Create translations for the Room Type
        await Promise.all([
          createRoomTypeAr(roomTypeId, data.room_type_name_ar),
          createRoomTypeEn(roomTypeId, data.room_type_name_en)
        ]);
        // Step 3: Associate Room Type with selected branches
        if (hasSelectedBranches) {
          await associateRoomTypeWithBranches(roomTypeId);
        }
      } else {
        roomTypeId = initialData.id;

        await Promise.all([
          axios.patch(`${baseUrlPms}/room_type/${roomTypeId}/update/`, {
            ...data,
            updated_by: userId,
            created_by: userId,
          }, { headers: Headers }),
          axios.patch(`${baseUrlPms}/room_type_ar/${roomTypeId}/update/`, {
            pms_room_type_id: roomTypeId,
            room_type_name_ar: data.room_type_name_ar,
          }, { headers: Headers }),
          axios.patch(`${baseUrlPms}/room_type_en/${roomTypeId}/update/`, {
            pms_room_type_id: roomTypeId,
            room_type_name_en: data.room_type_name_en,
          }, { headers: Headers }),
        ]);

      }
      // Show success message
      showToast("success", t(isCreating ? "msg.roomTypeMsg" : "msg.updateroomTypeMsg"));
      reset({});

      setSelectedBranches({});// Clear selected branches
      if (!isCreating) {
        onClose();
      }
      handleClose();
      fetchData();
    }
    catch (error) {
      // Show error message
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
      fetchBranchesForSelectedRoomType(initialData.id);
    }
  }, []);


  return (<>
    <form className="d-flex flex-wrap justify-content-end" onSubmit={handleSubmit(createRoomType)}>
      <div className="form-inputs d-flex w-100 ">
        <div className="input-package mt-3 pe-2 d-flex flex-column w-100">
          <BranchSelector
            mode="RoomType"
            hotels={hotels}
            handleHotelSelection={debouncedHandleHotelSelection}
            handleToggle={debouncedHandleToggle}
            isBranchChecked={isBranchChecked}
            isHotelChecked={isHotelChecked}
            isHotelIndeterminate={isHotelIndeterminate}
            fetchBranches={fetchBranchesForSelectedRoomType}
            branchesTags={branchesTags}
            itemId={roomTypeId}
            collectedId={collectedId}
            setCollectedId={setCollectedId}
            isEditMode={isEditMode}
          />
          <div className="form-inputs form-margin d-flex w-100 custom-form-inputs form-inputs-row ">
            <InputForrModal
              label={`${t("roomType")} ${t("input.englishNameLabel")}`}
              type="text"
              placeholder={t("input.englishPlaceholder")}
              register={register}
              name="room_type_name_en"
              validationRules={{
                required: t("input.fieldRequired"),
                pattern: {
                  value: /^[A-Za-z\s]+$/,
                  message: t("input.onlyEnglishAllowed"),
                },
              }}
              errors={errors.room_type_name_en}

              className="pe-2 w-50"
            />
            <InputForrModal
              label={`${t("roomType")} ${t("input.arabicNameLabel")}`}
              type="text"
              placeholder={t("input.arabicPlaceholder")}
              register={register}
              name="room_type_name_ar"
              validationRules={{
                required: t("input.fieldRequired"),
                pattern: {
                  value: /^[\u0600-\u06FF\s]+$/,
                  message: t("input.onlyArabicAllowed"),
                },
              }}
              errors={errors.room_type_name_ar}
              className="ps-2 w-50"
            />
          </div>
          <FromButton reset={reset} isLoading={isLoading} buttonLabel={isEditMode ? "Edit Room Type" : "Add Room Type"} disabled={isDisabled} />
        </div>
      </div>
    </form>

  </>

  );
};

export default CreateRoomType;
