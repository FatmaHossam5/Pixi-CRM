import { useContext, useEffect, useState } from "react";
import { ModalContext } from "../../../../../Helpers/Context/ModalContext";
import { AuthContext } from "../../../../../Helpers/Context/AuthContext";
import { Controller, useForm } from "react-hook-form";
import FromButton from "../../../../../Shared/FromButton/FromButton";
import axios from "axios";
import useHotel from "../../../../../Helpers/Hook/useHotel";
// import useBranch from "../../../../Helpers/Hook/useBranch";
import useBuilding from "../../../../../Helpers/Hook/useBuilding";
import useFloor from "../../../../../Helpers/Hook/useFloor";
import { useTranslation } from "react-i18next";
import i18next from "i18next";
import useBranchOld from "../../../../../Helpers/Hook/useBranchOld";

const CreateRooms = ({ getRooms, roomT }) => {

 console.log(roomT)


  const { t } = useTranslation();
  const { language } = i18next;
  const {
    baseUrlPms,
    Headers,
    userId,
    setIsLoading,
    setIsDisabled,
    isDisabled,
  } = useContext(AuthContext);

  const { setModelState, handleClose } = useContext(ModalContext);
  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm({ mode: "all" });

  const { hotels } = useHotel();
  const { branchs, handleHotelChange } = useBranchOld();
  const { building, handleBranchChange, selectedBranch } = useBuilding();
  const { floor, handleFloorChange, selectedBuilding } = useFloor();

  const [generateNumber, setGenerateNumber] = useState();

  const createRoom = async (data) => {
    setIsLoading(true);
    setIsDisabled(true);

    // Condition to check if it's a single room or multiple rooms
    const isMultipleRooms = data.generateNumber && data.generateNumber > 1;

    try {
      // Create the unit reference for the first room (common for both single and multiple)
      const unitRefrenceMain = await axios.post(
        `${baseUrlPms}/unit_reference/store/`,
        {
          created_by: userId,
          updated_by: userId,
        },
        { headers: Headers }
      );

      const mainId = unitRefrenceMain.data.data.id; // First unit reference ID

      // Loop for multiple rooms
      const roomIds = [];
      for (let i = 0; i < (isMultipleRooms ? data.generateNumber : 1); i++) {
        const enNumber = isMultipleRooms ? Number(data.EnglishNameNumber) + i : Number(data.EnglishNameNumber);
        const arNumber = isMultipleRooms ? Number(data.ArabicNameNumber) + i : Number(data.ArabicNameNumber);
        let en, ar;

        // Room name logic based on suffix
        if (data?.EnglishNameSuffix) {
          en = `${data.EnglishNamePrefix}-${enNumber}${`- ${data?.EnglishNameSuffix}`}`;
        } else {
          en = `${data.EnglishNamePrefix}-${enNumber}`;
        }

        if (data?.ArabicNameSuffix) {
          ar = `${data.ArabicNamePrefix}-${arNumber}${`-${data?.ArabicNameSuffix}`}`;
        } else {
          ar = `${data.ArabicNamePrefix}-${arNumber}`;
        }

        // Create room
        const roomData = await axios.post(
          `${baseUrlPms}/room/store/`,
          {
            unit_reference_id: mainId,
            created_by: userId,
            updated_by: userId,
            floor_id: data.floor_id,
            room_type_id: data.room_type_id,
            view_type_id: data.view_type_id,
            bed_type_id: data.bed_type_id,
            number_of_beds: data.number_of_beds,
            is_bed_reservable: false,
          },
          { headers: Headers }
        );

        const roomId = roomData.data.data.unit_reference_id; // Room ID
        roomIds.push(roomId); // Save room ID for future reference

        // Create room names in Arabic and English
        await axios.post(
          `${baseUrlPms}/room_ar/store/`,
          {
            pms_room_id: roomId,
            room_name_ar: ar,
          },
          { headers: Headers }
        );

        await axios.post(
          `${baseUrlPms}/room_en/store/`,
          {
            pms_room_id: roomId,
            room_name_en: en,
          },
          { headers: Headers }
        );

        // Room default price
        await axios.post(
          `${baseUrlPms}/default_room_price/store/`,
          {
            created_by: userId,
            updated_by: userId,
            room_id: roomId,
            default_room_price: data.default_room_price,
          },
          { headers: Headers }
        );

        // Create beds (same for both single and multiple)
        for (let j = 0; j < data.number_of_beds; j++) {
          const unitReferenceBed = await axios.post(
            `${baseUrlPms}/unit_reference/store/`,
            {
              created_by: userId,
              updated_by: userId,
            },
            { headers: Headers }
          );

          const bedUnitReferenceId = unitReferenceBed.data.data.id; // Unit reference ID for bed

          await axios.post(
            `${baseUrlPms}/bed/store/`,
            {
              created_by: userId,
              updated_by: userId,
              room_id: roomId,
              unit_reference_id: bedUnitReferenceId,
            },
            { headers: Headers }
          );
        }
      }

      // If the creation was successful for all rooms and beds
      if (roomIds.length > 0) {
        showToast('success', t("msg.roomMsg"));
      }

    } catch (error) {
      showToast('error', t("msg.errorMessage"));
    } finally {
      handleClose();
      reset();
      getRooms();
      setIsLoading(false);
      setIsDisabled(false);
    }
  };

  // Rooms View API
  const [roomView, setRoomView] = useState();
  const getRoomsView = () => {
    axios
      .get(`${baseUrlPms}/view_type/all/`, {
        headers: Headers,
      })
      .then((res) => {
        setRoomView(res.data);
      })
      .catch((error) => { });
  };

  // Rooms Types API
  const [roomType, setRoomType] = useState();
  const getRoomsType = () => {
    axios
      .get(`${baseUrlPms}/room_type/all/`, {
        headers: Headers,
      })
      .then((res) => {
        setRoomType(res.data);
      })
      .catch((error) => { });
  };

  // Rooms Status API
  const [roomStatus, setRoomStatus] = useState();
  const getRoomsStatus = () => {
    axios
      .get(`${baseUrlPms}/room_status/all/`, {
        headers: Headers,
      })
      .then((res) => {
        setRoomStatus(res.data);
      })
      .catch((error) => { });
  };

  useEffect(() => {
    getRoomsType();
    getRoomsStatus();
    getRoomsView();
  }, []);

  return (
    <>
      <form
        className="d-flex flex-wrap justify-content-end"
        onSubmit={handleSubmit(createRoom)}
      >
        <div className="form-inputs d-flex justify-content-between w-100 px-3">
          <div className="input-package mt-3 pe-2 d-flex flex-column w-35">
            <label className="mb-2 modal-label" htmlFor="EnglishNamePrefix">
              {t("createRoomForm.englishNamePrefix.label")}
            </label>

            <Controller
              name="EnglishNamePrefix"
              control={control}
              rules={{ required: true, pattern: /[A-Za-z]+/ }}
              render={({ field }) => (
                <input
                  className={`px-form-input w-100 ${isDisabled ? "disabled-input" : ""
                    }`}
                  disabled={isDisabled}
                  {...field}
                  placeholder={t("createRoomForm.englishNamePrefix.placeholder")}
                />
              )}
            />
            {errors["EnglishNamePrefix"]?.type == "required" && (
              <p className="text-danger m-0">{t("createRoomForm.englishNamePrefix.required")}</p>
            )}
            {errors["EnglishNamePrefix"]?.type == "pattern" && (
              <p className="text-danger m-0">
                {t("createRoomForm.englishNamePrefix.pattern")}
              </p>
            )}
          </div>
          <div className="input-package mt-3 px-2 d-flex flex-column w-35">
            <label className="mb-2 modal-label" htmlFor="EnglishNameNumber">
              {t("createRoomForm.englishNameNumber.label")}
            </label>

            <Controller
              name="EnglishNameNumber"
              control={control}
              rules={{ required: true, validate: (value) => value > 0 }}
              render={({ field }) => (
                <input
                  className={`px-form-input w-100 ${isDisabled ? "disabled-input" : ""
                    }`}
                  disabled={isDisabled}
                  {...field}
                  placeholder={t("createRoomForm.englishNameNumber.placeholder")}
                  type="number"
                />
              )}
            />
            {errors["EnglishNameNumber"]?.type == "required" && (
              <p className="text-danger m-0">{t("createRoomForm.englishNameNumber.required")}</p>
            )}
            {errors["EnglishNameNumber"]?.type == "validate" && (
              <p className="text-danger m-0">{t("createRoomForm.englishNameNumber.validate")}</p>
            )}
          </div>
          <div className="input-package mt-3 ps-2 d-flex flex-column w-35">
            <label className="mb-2 modal-label" htmlFor="EnglishNameSuffix">
              {t("createRoomForm.englishNameSuffix.label")}
            </label>

            <Controller
              name="EnglishNameSuffix"
              control={control}
              rules={{ pattern: /^[A-Za-z]+$/ }}
              render={({ field }) => (
                <input
                  className={`px-form-input w-100 ${isDisabled ? "disabled-input" : ""
                    }`}
                  disabled={isDisabled}
                  {...field}
                  placeholder={t("createRoomForm.englishNameSuffix.placeholder")}
                />
              )}
            />
            {errors["EnglishNameSuffix"] && (
              <p className="text-danger m-0">  {t("createRoomForm.englishNameSuffix.pattern")} </p>
            )}
          </div>
        </div>

        <div className="form-inputs d-flex justify-content-between w-100 px-3">
          <div className="input-package mt-3 pe-2 d-flex flex-column w-35">
            <label className="mb-2 modal-label" htmlFor="ArabicNamePrefix">
              {t("createRoomForm.arabicNamePrefix.label")}
            </label>

            <Controller
              name="ArabicNamePrefix"
              control={control}
              rules={{ required: true, pattern: /^[\u0600-\u06FF]+/ }}
              render={({ field }) => (
                <input
                  className={`px-form-input w-100 ${isDisabled ? "disabled-input" : ""
                    }`}
                  disabled={isDisabled}
                  {...field}
                  placeholder={t("createRoomForm.arabicNamePrefix.placeholder")}
                />
              )}
            />
            {errors["ArabicNamePrefix"]?.type == "required" && (
              <p className="text-danger m-0">{t("createRoomForm.arabicNamePrefix.required")}</p>
            )}
            {errors["ArabicNamePrefix"]?.type == "pattern" && (
              <p className="text-danger m-0">
                {t("createRoomForm.arabicNamePrefix.pattern")}
              </p>
            )}
          </div>
          <div className="input-package mt-3 px-2 d-flex flex-column w-35">
            <label className="mb-2 modal-label" htmlFor="ArabicNameNumber">
              {t("createRoomForm.arabicNameNumber.label")}
            </label>

            <Controller
              name="ArabicNameNumber"
              control={control}
              rules={{ required: true, validate: (value) => value > 0 }}
              render={({ field }) => (
                <input
                  className={`px-form-input w-100 ${isDisabled ? "disabled-input" : ""
                    }`}
                  disabled={isDisabled}
                  {...field}
                  placeholder={t("createRoomForm.arabicNameNumber.placeholder")}
                  type="number"
                />
              )}
            />
            {errors["ArabicNameNumber"]?.type == "required" && (
              <p className="text-danger m-0">{t("createRoomForm.arabicNameNumber.required")}</p>
            )}
            {errors["ArabicNameNumber"]?.type == "validate" && (
              <p className="text-danger m-0">{t("createRoomForm.arabicNameNumber.validate")}</p>
            )}
          </div>
          <div className="input-package mt-3 ps-2 d-flex flex-column w-35">
            <label className="mb-2 modal-label" htmlFor="ArabicNameSuffix">
              {t("createRoomForm.arabicNameSuffix.label")}
            </label>

            <Controller
              name="ArabicNameSuffix"
              control={control}
              rules={{ pattern: /^[\u0600-\u06FF\s]+$/ }}
              render={({ field }) => (
                <input
                  className={`px-form-input w-100 ${isDisabled ? "disabled-input" : ""
                    }`}
                  disabled={isDisabled}
                  {...field}
                  placeholder={t("createRoomForm.arabicNameSuffix.placeholder")}
                />
              )}
            />
            {errors["ArabicNameSuffix"] && (
              <p className="text-danger m-0"> {t("createRoomForm.arabicNameSuffix.pattern")} </p>
            )}
          </div>
        </div>
        {roomT === "SingleRoom" ?

          <>
  
            <div className="form-inputs d-flex justify-content-between w-100 px-3">
              <div className="input-package mt-3 pe-2 d-flex flex-column w-50">
                <label className="mb-2 modal-label" htmlFor="hotel">
                  {`${t("selectInput.select")} ${t("hotel")}`}
                </label>
                <select
                  name="hotel"
                  id="hotel"
                  className={`px-login-input ${isDisabled ? "disabled-input" : ""}`}
                  disabled={isDisabled}
                  {...register("hotel_id")}
                  onChange={handleHotelChange}
                >
                  <option value="">{`${t("selectInput.choose")} ${t("hotel")}`}</option>
                  {hotels &&
                    hotels.map((hotel) => {
                      return (
                        <option key={hotel.id} value={hotel?.hotel_id}>
                          {language === "ar" ?
                            hotel?.hotel_info?.pms_hotel_ar?.hotel_name_ar :
                            hotel?.hotel_info?.pms_hotel_en?.hotel_name_en}
                        </option>
                      );
                    })}
                </select>
              </div>

              <div className="input-package mt-3 ps-2 d-flex flex-column w-50">
                <label className="mb-2 modal-label" htmlFor="branch">
                  {`${t("selectInput.select")} ${t("branch")}`}
                </label>
                <select
                  name="branch"
                  id="branch"
                  className={`px-login-input ${isDisabled ? "disabled-input" : ""}`}
                  disabled={isDisabled}
                  onChange={handleBranchChange}
                // onChange={(e) => setSelectedBranch(e.target.value)} // You might use a custom handler here if needed

                >
                  <option value="">{`${t("selectInput.choose")} ${t("branch")}`}</option>
                  {branchs &&
                    branchs?.map((branch) => {
                      return (
                        <option key={branch.id} value={branch.id}>
                          {
                            language === "ar" ?
                              branch?.pms_branch_ar?.branch_name_ar :
                              branch?.pms_branch_en?.branch_name_en
                          }
                        </option>
                      );
                    })}
                </select>
              </div>
            </div>

            <div className="form-inputs d-flex justify-content-between w-100 px-3">
              <div className="input-package mt-3 pe-2 d-flex flex-column w-50">
                <label className="mb-2 modal-label" htmlFor="building">
                  {`${t("selectInput.select")} ${t("building")}`}
                </label>
                <select
                  name="building"
                  id="building"
                  className={`px-login-input ${isDisabled ? "disabled-input" : ""}`}
                  {...register("building_id")}
                  onChange={handleFloorChange}
                  disabled={!selectedBranch || isDisabled}
                >
                  <option value="">{`${t("selectInput.choose")} ${t("building")}`}</option>
                  {building &&
                    building.map((build) => {
                      return (
                        <option key={build.id} value={build?.id}>
                          {language === "ar" ?

                            build?.pms_building_ar?.building_name_ar :
                            build?.pms_building_en?.building_name_en}                                        </option>
                      );
                    })}
                </select>
              </div>
              <div className="input-package mt-3 ps-2 d-flex flex-column w-50">
                <label className="mb-2 modal-label" htmlFor="floor">
                  {`${t("selectInput.select")} ${t("floor")}`}
                </label>
                <select
                  name="floor"
                  id="floor"
                  className={`px-login-input ${isDisabled ? "disabled-input" : ""}`}
                  {...register("floor_id", { required: true })}
                  disabled={(!selectedBuilding && !selectedBranch) || isDisabled}
                >
                  <option value="">{`${t("selectInput.choose")} ${t("floor")}`}</option>
                  {floor &&
                    floor.map((Floor) => {
                      return (
                        <option key={floor.id} value={Floor?.id}>
                          {language === "ar" ?
                            Floor?.pms_floor_ar?.floor_name_ar :
                            Floor?.pms_floor_en?.floor_name_en}
                        </option>
                      );
                    })}
                </select>
                {errors?.floor_id?.type === "required" && (
                  <p className="text-danger m-0">{t("input.fieldRequired")}</p>
                )}
              </div>
            </div>

            <div className="form-inputs d-flex justify-content-between w-100 px-3">

              <div className="input-package mt-3  pe-2 d-flex flex-column w-50">
                <label className="mb-2 modal-label" htmlFor="RoomType">
                  {`${t("selectInput.select")} ${t("roomType")}`}
                </label>
                <select
                  name="RoomType"
                  id="RoomType"
                  className={`px-login-input ${isDisabled ? "disabled-input" : ""}`}
                  disabled={isDisabled}
                  {...register("room_type_id", { required: true })}
                >
                  <option value="">{`${t("selectInput.choose")} ${t("roomType")}`}</option>
                  {roomType &&
                    roomType.map((type, index) => {
                      return (
                        <option key={index} value={type?.id}>
                          {language === "ar" ?
                            type?.pms_room_type_ar?.room_type_name_ar :
                            type?.pms_room_type_en?.room_type_name_en}
                        </option>
                      );
                    })}
                </select>
                {errors?.room_type_id?.type === "required" && (
                  <p className="text-danger m-0">{t("input.fieldRequired")}</p>
                )}
              </div>
              <div className="input-package mt-3 ps-2 d-flex flex-column w-50">
                <label className="mb-2 modal-label" htmlFor="RoomView">
                  {`${t("selectInput.select")} ${t("roomView")}`}
                </label>
                <select
                  className={`px-login-input ${isDisabled ? "disabled-input" : ""}`}
                  disabled={isDisabled}
                  {...register("view_type_id", { required: true })}
                >
                  <option value="">{`${t("selectInput.choose")} ${t("roomView")}`}</option>
                  {roomView &&
                    roomView?.map((room, index) => {
                      return (
                        <option key={index} value={room.id}>
                          {language === "ar" ?
                            room.pms_view_type_ar.view_type_name_ar :
                            room.pms_view_type_en.view_type_name_en}
                        </option>
                      );
                    })}
                </select>
                {errors?.view_type_id?.type === "required" && (
                  <p className="text-danger m-0">{t("input.fieldRequired")}</p>
                )}
              </div>
            </div>

            <div className="form-inputs d-flex justify-content-between w-100 px-3">
              <div className="input-package mt-3  pe-2 d-flex flex-column w-50">
                <label className="mb-2 modal-label" htmlFor="RoomType">
                  {`${t("selectInput.select")} ${t("bed-type")}`}
                </label>
                <select
                  name="RoomType"
                  id="RoomType"
                  className={`px-login-input ${isDisabled ? "disabled-input" : ""}`}
                  disabled={isDisabled}
                  {...register("bed_type_id", { required: true })}
                >
                  <option value="">{`${t("selectInput.choose")} ${t("bed-type")}`}</option>
                  {/* {bedType &&
                    bedType?.map((bed, index) => {
                      return (
                        <option key={index} value={bed?.id}>
                          {language === "ar" ?
                            bed?.pms_bed_type_ar?.bed_type_name_ar :
                            bed?.pms_bed_type_en?.bed_type_name_en}
                        </option>
                      );
                    })} */}
                </select>
                {/* {errors?.room_type_id?.type === "required" && (
                            <p className="text-danger m-0">{t("input.fieldRequired")}</p>
                        )} */}
              </div>
              <div className="input-package mt-3 ps-2 d-flex flex-column w-50">
                <label className="mb-2 modal-label" htmlFor="RoomView">
                  {t("createRoomForm.numberOfBeds.label")}

                </label>
                <input
                  type='number'
                  className={`px-form-input w-100 ${isDisabled ? "disabled-input" : ""
                    }`}
                  disabled={isDisabled}
                  placeholder={t("createRoomForm.defaultRoomPrice.placeholder")}
                  {...register("number_of_beds")}
                />
              </div>
            </div>

            <div className="form-inputs d-flex justify-content-between w-100 px-3">

              <div className="input-package mt-3  pe-2 d-flex flex-column w-50">
                <label className="mb-2 modal-label" htmlFor="RoomType">
                  {t("createRoomForm.defaultRoomPrice.label")}
                </label>
                <input
                  type='number'
                  className={`px-form-input w-100 ${isDisabled ? "disabled-input" : ""
                    }`}

                  {...register("default_room_price")}
                  disabled={isDisabled}

                  placeholder={t("createRoomForm.defaultRoomPrice.placeholder")}
                />
              </div>
              <div className="input-package mt-3 ps-2 d-flex align-items-end w-50">
                <div className="check-in mb-2">
                  <input
                    id="remember-me"
                    className="me-2"
                    type="checkbox"
                    {...register("is_bed_reservable")}

                  />
                  <label>{t("createRoomForm.isBedReservable.label")} </label>
                </div>
              </div>
            </div>
          </>

          :


          <>
            <div className="form-inputs d-flex justify-content-between w-100 px-3">
              <div className="input-package mt-3 pe-2 d-flex flex-column w-50">
                <label className="mb-2 modal-label" htmlFor="ArabicNamePrefix">
                  {t("createRoomForm.generateRoom.generateNumber")}
                </label>
                <input
                  id="generateNumber"
                  type="number"
                  placeholder={t("createRoomForm.generateRoom.placeholder")}
                  className={`px-form-input w-100 ${isDisabled ? "disabled-input" : ""
                    }`}
                  disabled={isDisabled}
                  // onFocus={(e)=>setGenerateNumber(e.target.value)}
                  onBlur={(e) => setGenerateNumber(e.target.value)} // and onChange
                />
              </div>
              <div className="input-package mt-3 ps-2 d-flex flex-column w-50">
                <label className="mb-2 modal-label" htmlFor="hotel">
                  {`${t("selectInput.select")} ${t("hotel")}`}
                </label>
                <select
                  name="hotel"
                  id="hotel"
                  className={`px-login-input ${isDisabled ? "disabled-input" : ""}`}
                  disabled={isDisabled}
                  {...register("hotel_id")}
                  onChange={handleHotelChange}
                >
                  <option value="">{`${t("selectInput.choose")} ${t("hotel")}`}</option>
                  {hotels &&
                    hotels.map((hotel) => {
                      return (
                        <option key={hotel.id} value={hotel?.hotel_id}>
                          {language === "ar" ?
                            hotel?.hotel_info?.pms_hotel_ar?.hotel_name_ar :
                            hotel?.hotel_info?.pms_hotel_en?.hotel_name_en}
                        </option>
                      );
                    })}
                </select>
              </div>


            </div>

            <div className="form-inputs d-flex justify-content-between w-100 px-3">
              <div className="input-package mt-3 pe-2 d-flex flex-column w-50">
                <label className="mb-2 modal-label" htmlFor="branch">
                  {`${t("selectInput.select")} ${t("branch")}`}
                </label>
                <select
                  name="branch"
                  id="branch"
                  className={`px-login-input ${isDisabled ? "disabled-input" : ""}`}
                  disabled={isDisabled}
                  onChange={handleBranchChange}
                >
                  <option value="">{`${t("selectInput.choose")} ${t("branch")}`}</option>
                  {branchs &&
                    branchs?.map((branch) => {
                      return (
                        <option key={branch.id} value={branch.id}>
                          {
                            language === "ar" ?
                              branch?.pms_branch_ar?.branch_name_ar :
                              branch?.pms_branch_en?.branch_name_en
                          }
                        </option>
                      );
                    })}
                </select>
              </div>

              <div className="input-package mt-3 ps-2 d-flex flex-column w-50">
                <label className="mb-2 modal-label" htmlFor="building">
                  {`${t("selectInput.select")} ${t("building")}`}
                </label>
                <select
                  name="building"
                  id="building"
                  className={`px-login-input ${isDisabled ? "disabled-input" : ""}`}
                  {...register("building_id")}
                  onChange={handleFloorChange}
                  disabled={!selectedBranch || isDisabled}
                >
                  <option value="">{`${t("selectInput.choose")} ${t("building")}`}</option>
                  {building &&
                    building.map((build) => {
                      return (
                        <option key={build.id} value={build?.id}>
                          {language === "ar" ?

                            build?.pms_building_ar?.building_name_ar :
                            build?.pms_building_en?.building_name_en}                                        </option>
                      );
                    })}
                </select>
              </div>

            </div>

            <div className="form-inputs d-flex justify-content-between w-100 px-3">
              <div className="input-package mt-3 pe-2 d-flex flex-column w-50">
                <label className="mb-2 modal-label" htmlFor="floor">
                  {`${t("selectInput.select")} ${t("floor")}`}
                </label>
                <select
                  name="floor"
                  id="floor"
                  className={`px-login-input ${isDisabled ? "disabled-input" : ""}`}
                  {...register("floor_id", { required: true })}
                  disabled={(!selectedBuilding && !selectedBranch) || isDisabled}
                >
                  <option value="">{`${t("selectInput.choose")} ${t("floor")}`}</option>
                  {floor &&
                    floor.map((Floor) => {
                      return (
                        <option key={floor.id} value={Floor?.id}>
                          {language === "ar" ?
                            Floor?.pms_floor_ar?.floor_name_ar :
                            Floor?.pms_floor_en?.floor_name_en}
                        </option>
                      );
                    })}
                </select>
                {errors?.floor_id?.type === "required" && (
                  <p className="text-danger m-0">{t("input.fieldRequired")}</p>
                )}
              </div>

              <div className="input-package mt-3 ps-2 d-flex flex-column w-50">
                <label className="mb-2 modal-label" htmlFor="RoomType">
                  {`${t("selectInput.select")} ${t("roomType")}`}
                </label>
                <select
                  name="RoomType"
                  id="RoomType"
                  className={`px-login-input ${isDisabled ? "disabled-input" : ""}`}
                  disabled={isDisabled}
                  {...register("room_type_id", { required: true })}
                >
                  <option value="">{`${t("selectInput.choose")} ${t("roomType")}`}</option>
                  {roomType &&
                    roomType.map((type, index) => {
                      return (
                        <option key={index} value={type?.id}>
                          {language === "ar" ?
                            type?.pms_room_type_ar?.room_type_name_ar :
                            type?.pms_room_type_en?.room_type_name_en}
                        </option>
                      );
                    })}
                </select>
                {errors?.room_type_id?.type === "required" && (
                  <p className="text-danger m-0">{t("input.fieldRequired")}</p>
                )}
              </div>

            </div>


            <div className="form-inputs d-flex justify-content-between w-100 px-3">

              <div className="input-package mt-3 pe-2 d-flex flex-column w-50">
                <label className="mb-2 modal-label" htmlFor="RoomView">
                  {`${t("selectInput.select")} ${t("roomView")}`}
                </label>
                <select
                  className={`px-login-input ${isDisabled ? "disabled-input" : ""}`}
                  disabled={isDisabled}
                  {...register("view_type_id", { required: true })}
                >
                  <option value="">{`${t("selectInput.choose")} ${t("roomView")}`}</option>
                  {roomView &&
                    roomView?.map((room, index) => {
                      return (
                        <option key={index} value={room.id}>
                          {language === "ar" ?
                            room.pms_view_type_ar.view_type_name_ar :
                            room.pms_view_type_en.view_type_name_en}
                        </option>
                      );
                    })}
                </select>
                {errors?.view_type_id?.type === "required" && (
                  <p className="text-danger m-0">{t("input.fieldRequired")}</p>
                )}
              </div>

              {/* <div className="input-package mt-3  ps-2 d-flex flex-column w-50">
                <label className="mb-2 modal-label" htmlFor="RoomType">
                  {`${t("selectInput.select")} ${t("bedType")}`}
                </label>
                <select
                  name="RoomType"
                  id="RoomType"
                  className={`px-login-input ${isDisabled ? "disabled-input" : ""}`}
                  disabled={isDisabled}
                  {...register("bed_type_id", { required: true })}
                >
                  <option value="">{`${t("selectInput.choose")} ${t("bedType")}`}</option>
                  {bedType &&
                    bedType.map((bed, index) => {
                      return (
                        <option key={index} value={bed?.id}>
                          {language === "ar" ?
                            bed?.pms_bed_type_ar?.bed_type_name_ar :
                            bed?.pms_bed_type_en?.bed_type_name_en}
                        </option>
                      );
                    })}
                </select>
                {errors?.room_type_id?.type === "required" && (
                            <p className="text-danger m-0">{t("input.fieldRequired")}</p>
                        )}
              </div> */}

            </div>



            <div className="form-inputs d-flex justify-content-between w-100 px-3">

              <div className="input-package mt-3 pe-2 d-flex flex-column w-50">
                <label className="mb-2 modal-label" htmlFor="RoomView">
                  {t("createRoomForm.numberOfBeds.label")}

                </label>
                <input
                  type='number'
                  className={`px-form-input w-100 ${isDisabled ? "disabled-input" : ""
                    }`}
                  disabled={isDisabled}
                  placeholder={t("createRoomForm.defaultRoomPrice.placeholder")}
                  {...register("number_of_beds")}

                />
              </div>

              <div className="input-package mt-3  ps-2 d-flex flex-column w-50">
                <label className="mb-2 modal-label" htmlFor="RoomType">
                  {t("createRoomForm.defaultRoomPrice.label")}
                </label>
                <input
                  type='number'
                  className={`px-form-input w-100 ${isDisabled ? "disabled-input" : ""
                    }`}
                  {...register("default_room_price")}
                  disabled={isDisabled}
                  placeholder={t("createRoomForm.defaultRoomPrice.placeholder")}
                />
              </div>
            </div>

            <div className="form-inputs d-flex justify-content-between w-100 px-3">

              <div className="input-package mt-3 ps-2 d-flex align-items-end w-50">
                <div className="check-in mb-2">
                  <input
                    id="remember-me"
                    className="me-2"
                    type="checkbox"
                    {...register("is_bed_reservable")}

                  />
                  <label>{t("createRoomForm.isBedReservable.label")} </label>
                </div>
              </div>
            </div>
          </>

        }
        <FromButton reset={reset} />
      </form>

      {/* </div> */}
    </>
  );
};

export default CreateRooms;
