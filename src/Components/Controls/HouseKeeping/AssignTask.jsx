import axios from "axios";
import FromButton from "../../Shared/FromButton/FromButton";
import { AuthContext } from "../../Helpers/Context/AuthContext";
import { useContext, useEffect, useState } from "react";
import { ModalContext } from "../../Helpers/Context/ModalContext";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import i18next from "i18next";

import { ToastContext } from "../../Helpers/Context/ToastContext ";

import EditButton from "../../Shared/EditBuuton/EditButton";


const AssignTask = ({ houseKeeping, housekeepingId }) => {
  const { t } = useTranslation();
  const { language } = i18next;
  const { showToast } = useContext(ToastContext);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm({ mode: "all" });

  const { modelState, handleClose, setModelState } = useContext(ModalContext);

  const {
    baseUrlPms,
    Headers,
    userId,
    setIsLoading,
    setIsDisabled,
    isDisabled,
  } = useContext(AuthContext);

  const createPurchase = async (data) => {
    setIsLoading(true);
    setIsDisabled(true);
    try {
      const itemData = await axios.post(
        `${baseUrlPms}/housekeeping/store/`,
        {
          created_by: userId,
          updated_by: userId,
          housekeeper_id: data.housekeeper_id,
          housekeeper_task_id: data.housekeeper_task_id,
          room_id: data.room_id,
          is_done: false,
        },
        {
          headers: Headers,
        }
      );

      if (
        // eslint-disable-next-line no-constant-condition
        itemData.status == 200 ||
        201
      ) {
        showToast('success', itemData.data.message || t("msg.assign"));
      }
    } catch (error) {
      showToast('error', t("msg.errorMessage"));

    } finally {
      handleClose();
      reset();
      setIsLoading(false);
      setIsDisabled(false);
      houseKeeping();
    }
  };

  const editHouseKeeping = async (data) => {
    console.log(data);
  };
  const [housekeepers, setHousekeepers] = useState();
  const getHousekeeper = () => {
    axios
      .get(`${baseUrlPms}/housekeeper/all/`, {
        headers: Headers,
      })
      .then((res) => {
        setHousekeepers(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const [houseKeeperTasks, setHouseKeeperTasks] = useState([]);

  const getHouseKeeperTask = () => {
    axios
      .get(`${baseUrlPms}/housekeeper_task/all/`, {
        headers: Headers,
      })
      .then((res) => {
        setHouseKeeperTasks(res.data);
      })
      .catch((error) => { });
  };

  const [rooms, setRooms] = useState([]);
  const getRooms = () => {
    axios
      .get(`${baseUrlPms}/room/all/`, {
        headers: Headers,
      })
      .then((res) => {
        setRooms(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const houseKeepingData = () => {
    axios
      .get(`${baseUrlPms}/housekeeping/${housekeepingId}/show/`, {
        headers: Headers,
      })
      .then((res) => {
        // setCustomerInfo(res.data);
        console.log(res.data);

        setValue("housekeeper_id", res?.data?.housekeeper_info?.id);
        setValue("housekeeper_task_id", res?.data?.housekeeper_task_info?.id);
        setValue("room_id", res?.data?.room_info?.id);
      })
      .catch((error) => { });
  };

  useEffect(() => {
    getHousekeeper();
    getHouseKeeperTask();
    houseKeepingData();
    getRooms();
  }, []);

  return (
    <>
      <form
        className={`d-flex flex-wrap justify-content-end ${isDisabled ? "disabled-layer" : ""
          }`}
        onSubmit={handleSubmit(createPurchase)}
      >
        <div className="form-inputs d-flex w-100">
          <div className="input-package mt-3 pe-2 d-flex flex-column w-50">
            <label className="mb-2">{t("housekeepingSection.housekeeper")}</label>
            <select
              name="category"
              className="px-login-input"
              {...register("housekeeper_id", {
                required: true,
              })}
              disabled={isDisabled}
            >
              <option value="">{`${t("selectInput.choose")} ${t("housekeepingSection.houseKeeper")}`}</option>
              {housekeepers &&
                housekeepers.map((houseKeeper) => (
                  <option key={houseKeeper.id} value={houseKeeper.id}>
                    {language === "ar" ? houseKeeper?.pms_housekeeper_ar?.housekeeper_name_ar : houseKeeper?.pms_housekeeper_en?.housekeeper_name_en}
                  </option>
                ))}
            </select>
            {errors?.housekeeper_id?.type === "required" && (
              <p className="text-danger ">{t("input.fieldRequired")}</p>
            )}
          </div>
          <div className="input-package mt-3 pe-2 d-flex flex-column w-50">
            <label className="mb-2">{t("housekeepingSection.task")}</label>
            <select
              name="Task"
              className="px-login-input"
              {...register("housekeeper_task_id", {
                required: true,
              })}
              disabled={isDisabled}
            >
              <option value="">{`${t("selectInput.choose")} ${t("housekeepingSection.task")}`}</option>
              {houseKeeperTasks &&
                houseKeeperTasks.map((houseKeeper) => (
                  <option key={houseKeeper.id} value={houseKeeper.id}>
                    {language === "ar" ?
                      houseKeeper?.pms_housekeeper_task_ar
                        ?.housekeeper_task_name_ar : houseKeeper?.pms_housekeeper_task_en
                        ?.housekeeper_task_name_en
                    }
                  </option>
                ))}
            </select>
            {errors?.housekeeper_task_id?.type === "required" && (
              <p className="text-danger ">{t("input.fieldRequired")}</p>
            )}
          </div>
        </div>

        <div className="form-inputs d-flex w-100">
          <div className="input-package mt-3 pe-2 d-flex flex-column w-100">
            <label className="mb-2">
              {t("BlacklistSection.notes")}
            </label>
            <textarea
              type="text"
              // placeholder="quantity"
              className="px-form-input w-100 "
              onScroll={false}
              //   {...register("number_of_items")}
              disabled={isDisabled}
            />
          </div> 
          <div className="input-package mt-3 pe-2 d-flex flex-column w-100">
            <label className="mb-2">Room</label>
            <select
              name="Room"
              className="px-login-input"
              {...register("room_id", {
                required: true,
              })}
              disabled={isDisabled}
            >
              <option value="">Select room</option>
              {rooms &&
                rooms.map((room) => (
                  <option key={room.id} value={room.id}>
                    {room?.pms_room_en?.room_name_en}
                  </option>
                ))}
            </select>
            {errors?.housekeeper_task_id?.type === "required" && (
              <p className="text-danger ">field is required</p>
            )}
          </div>
        </div>
        {housekeepingId ? <EditButton /> : <FromButton reset={reset} />}
      </form>
    </>
  );
};

export default AssignTask;
