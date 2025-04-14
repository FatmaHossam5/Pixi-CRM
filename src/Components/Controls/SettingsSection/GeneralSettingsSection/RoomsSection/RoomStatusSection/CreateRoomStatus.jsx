import React, { useContext, useState } from "react";
import ErrorModal from "../../../../../Shared/ErrorModal/ErrorModal";
import SuccessModal from "../../../../../Shared/SuccessModal/SuccessModal";
import { ModalContext } from "../../../../../Helpers/Context/ModalContext";
import { AuthContext } from "../../../../../Helpers/Context/AuthContext";
import axios from "axios";
import FromButton from "../../../../../Shared/FromButton/FromButton";
import { useForm, useWatch } from "react-hook-form";
import { BlockPicker, CirclePicker } from "react-color";
import { useData } from "../../../../../Helpers/Context/useData.jsx";

import { ToastContext } from "../../../../../Helpers/Context/ToastContext ";
import { useTranslation } from "react-i18next";
import useBranchSelection from "../../../../../Helpers/Hook/useBranchSelection";
import i18next from "i18next";
import BranchSelector from "../../../../../Shared/BranchSelector/BranchSelector";
import InputForrModal from "../../../../../Shared/InputForModal/InputForrModal";


const CreateRoomStatus = ({
  initialData,
  onClose,
  isEditMode,
  fetchBranchesForSelectedRoomStatus,
  branchesTags,
  collectedId,
  setCollectedId
}) => {
  const { t } = useTranslation();
  const { language } = i18next;
  const { showToast } = useContext(ToastContext);
  // context
  const {
    baseUrlPms,
    Headers,
    userId,
    setIsLoading,
    isLoading,
    setIsDisabled,

  } = useContext(AuthContext);
  const { handleClose, setModelState } = useContext(ModalContext);

  // react hook form


  const { reset, handleSubmit, formState: { errors }, register, control } = useForm({
    defaultValues: isEditMode ? {
      room_status_name_en: initialData?.room_status_name_en || "",
      room_status_name_ar: initialData?.room_status_name_ar || "",
      room_status_color:initialData?.room_status_color||"#f47373" 
    }
      : {}, mode: "all"
  });
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

  const { fetchData } = useData();
  const roomStatusAr = useWatch({ control, name: 'room_status_name_ar' });
  const roomStatusEn = useWatch({ control, name: 'room_status_name_en' });
  const roomStatusId = isEditMode ? initialData?.id : null;
  const isDisabled = !(roomStatusAr?.length > 0 && roomStatusEn?.length > 0);





  const createMainRoomStatus = async () => {
    const response = await axios.post(
      `${baseUrlPms}/room_status/store/`,
      { created_by: userId, updated_by: userId, room_status_color: background },
      { headers: Headers }
    );
    return response.data.data.id; // Return Room Type ID
  };
  const createRoomStatusAr = async (roomStatusId, roomStatusAr) => {
    await axios.post(
      `${baseUrlPms}/room_status_ar/store/`,
      { pms_room_status_id: roomStatusId, room_status_name_ar: roomStatusAr },
      { headers: Headers }
    );
  };

  const createRoomStatusEn = async (statusId, roomStatusEn) => {
    await axios.post(
      `${baseUrlPms}/room_status_en/store/`,
      {
        pms_room_status_id: statusId, room_status_name_en: roomStatusEn
      },
      { headers: Headers }
    );
  };

  const associateRoomStatusWithBranches = async (statusId) => {
    const allSelectedBranchIds = Object.entries(selectedBranches).flatMap(([hotelName, branches]) =>
      Object.keys(branches).map((branchId) => parseInt(branchId))
    );
    const branchPromises = allSelectedBranchIds.map((branchId) =>
      axios.post(
        `${baseUrlPms}/room_status_branch/store/`,
        {
          created_by: userId,
          updated_by: userId,
          room_status_id: statusId,
          branch_id: branchId,
        },
        { headers: Headers }
      )
    );

    await Promise.all(branchPromises); // Wait for all API calls to complete
  };


  const createRoomStatus = async (data) => {
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
      let roomStatusId;
      if (isCreating) {
        // Step 1: Create main Room Type and get ID
        const roomStatusId = await createMainRoomStatus();
          // Step 2: Create translations for the Room View
      await Promise.all([
        createRoomStatusAr(roomStatusId, data.room_status_name_ar),
        createRoomStatusEn(roomStatusId, data.room_status_name_en)
      ]);
        // Step 3: Associate Room Type with selected branches
        if (hasSelectedBranches) {
          await associateRoomStatusWithBranches(roomStatusId);
        }
      }else{
        roomStatusId = initialData.id;
        await Promise.all([
          axios.patch(`${baseUrlPms}/room_status/${ roomStatusId}/update/`, {
            ...data,
            room_status_color: background,
            updated_by: userId,
            created_by: userId,
          }, { headers: Headers }),
          axios.patch(`${baseUrlPms}/room_status_ar/${ roomStatusId}/update/`, {
            pms_room_status_id:  roomStatusId,
            room_status_name_ar: data.room_status_name_ar,
          }, { headers: Headers }),
          axios.patch(`${baseUrlPms}/room_status_en/${ roomStatusId}/update/`, {
            pms_room_status_id:  roomStatusId,
            room_status_name_en: data.room_status_name_en,
          }, { headers: Headers }),
        ]);
      }

      showToast("success", t(isCreating ? "msg.roomStatusMsg" : "msg.updateroomStatusMsg"));
      reset({});

      setSelectedBranches({});// Clear selected branches
      if (!isCreating) {
        onClose();
      }
      handleClose();
      fetchData();
    }
    // Show success message



    catch (error) {
      showToast("error", t("msg.errorMessage"));
      console.error("Error during Room Type creation:", error);
    } finally {
      setIsLoading(false);
      setIsDisabled(false);
    }
  };



  const [background, setBackground] = useState("#f47373");


  const handleChangeComplete = (color) => {
    setBackground(color.hex);
  };


  return (
    <>
      <form
        className="d-flex flex-wrap justify-content-end"
        onSubmit={handleSubmit(createRoomStatus)}
      >
        <div className='form-inputs d-flex w-100'>
          <div className="input-package mt-3 pe-2 d-flex flex-column w-100">
            <BranchSelector
              mode="RoomStatus"
              hotels={hotels}
              handleHotelSelection={handleHotelSelection}
              handleToggle={handleToggle}
              isBranchChecked={isBranchChecked}
              isHotelChecked={isHotelChecked}
              isHotelIndeterminate={isHotelIndeterminate}
              fetchBranches={fetchBranchesForSelectedRoomStatus}
              branchesTags={branchesTags}
              collectedId={collectedId}
              reset={reset}
            setCollectedId={setCollectedId}
            isEditMode={isEditMode}
            itemId={roomStatusId}
            />
            <div className="form-inputs form-margin d-flex w-100">

              <InputForrModal
                label={`${t("roomStatus")} ${t("input.englishNameLabel")}`}
                type="text"
                placeholder={t("input.englishPlaceholder")}
                register={register}
                name="room_status_name_en"
                validationRules={{
                  required: t("input.fieldRequired"),
                  pattern: {
                    value: /^[A-Za-z\s]+$/,
                    message: t("input.onlyEnglishAllowed"),
                  },
                }}
                errors={errors.room_status_name_en}

                className="pe-2 w-50"
              />
              <InputForrModal
                label={`${t("roomStatus")} ${t("input.arabicNameLabel")}`}
                type="text"
                placeholder={t("input.arabicPlaceholder")}
                register={register}
                name="room_status_name_ar"
                validationRules={{
                  required: t("input.fieldRequired"),
                  pattern: {
                    value: /^[\u0600-\u06FF\s]+(?:\d+)?$/,
                    message: t("input.onlyArabicAllowed"),
                  },
                }}
                errors={errors.room_status_name_ar}

                className="pe-2 w-50"
              />

            </div>
          </div>
        </div>
        <div className="form-inputs form-margin d-flex w-100">
          <div style={{ display: "flex", alignItems: "center" }}>
            <CirclePicker
              styles={{
                width: "100%",
              }}
              colors={["#080", "#F493", "#6189", "#3689"]}
              onChangeComplete={handleChangeComplete}
            />
          </div>
          <div className="dropdown">
            <button
              className="btn btn-secondary dropdown-toggle"
              type="button"
              id="dropdownMenuButton1"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              <i className="fa-kit fa-add" />
            </button>

            {/* Bootstrap dropdown-menu class on the parent container */}
            <div
              className="dropdown-menu p-0"
              aria-labelledby="dropdownMenuButton1"
            >
              {/* BlockPicker inside dropdown */}
              <BlockPicker
                color={background}
                onChangeComplete={handleChangeComplete}
                colors={["#D9E3F0", "#F47373", "#697689"]}
              />
            </div>
          </div>

          <div className="ps-2 d-flex align-items-center">
            <div
              style={{
                width: "30px",
                height: "30px",
                backgroundColor: background, // Apply selected color as background
                border: "1px solid #ccc",
                display: "inline-block",
                marginLeft: "10px",
              }}
            />
          </div>
        </div>
        <FromButton  reset={reset} isLoading={isLoading} buttonLabel={isEditMode ? "Edit Room Status" : "Add Room Status"} disabled={isDisabled} />
      </form>
    </>
  );
};

export default CreateRoomStatus;
