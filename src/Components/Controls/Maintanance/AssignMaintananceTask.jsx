import React, { useContext, useEffect, useState } from "react";
import FromButton from "./../../Shared/FromButton/FromButton";
import axios from "axios";
import { useForm } from "react-hook-form";
import { ModalContext } from "../../Helpers/Context/ModalContext";
import { AuthContext } from "../../Helpers/Context/AuthContext";
import i18next from "i18next";
import { useTranslation } from "react-i18next";

import { ToastContext } from "../../Helpers/Context/ToastContext ";

import EditButton from "../../Shared/EditBuuton/EditButton";


const AssignMaintananceTask = ({ getMaintananceTask, mainTaskId }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm({ mode: "all" });
  const { t } = useTranslation();
  const { language } = i18next;
  const { showToast } = useContext(ToastContext);

  const { modelState, handleClose, setModelState } = useContext(ModalContext);

  const {
    baseUrlPms,
    Headers,
    userId,
    setIsLoading,
    setIsDisabled,
    isDisabled,
  } = useContext(AuthContext);

  const assignTask = async (data) => {
    setIsLoading(true);
    setIsDisabled(true);
    try {
      const assignTask = await axios.post(
        `${baseUrlPms}/maintenance_assignment/store/`,
        {
          created_by: userId,
          updated_by: userId,
          resolved_by: data.resolved_by,
          location_description: data.location_description,
          is_done: false,
        },
        {
          headers: Headers,
        }
      );

      if (
        // eslint-disable-next-line no-constant-condition
        assignTask.status == 200 ||
        201
      ) {

        showToast('success', assignTask.data.message || t("msg.assign"));
      }
    } catch (error) {
      showToast('error', t("msg.errorMessage"));

    } finally {
      handleClose();
      reset();
      setIsLoading(false);
      setIsDisabled(false);
      getMaintananceTask();
    }
  };

  const editTask = (data) => {
    console.log(data);
    console.log("update");
  };
  const [workers, setWorkers] = useState();
  const getWorkers = () => {
    axios
      .get(`${baseUrlPms}/maintenance_worker/all/`, {
        headers: Headers,
      })
      .then((res) => {
        setWorkers(res.data);
        // setFilter(res.data)
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const [specialization, setSpecialization] = useState();
  const getSpecialization = () => {
    axios
      .get(`${baseUrlPms}/maintenance_type/all/`, {
        headers: Headers,
      })
      .then((res) => {
        setSpecialization(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
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

  const MaintananceTaskData = () => {
    axios
      .get(`${baseUrlPms}/maintenance_assignment/${mainTaskId}/show/`, {
        headers: Headers,
      })
      .then((res) => {
        console.log(res.data);

        setValue(
          "maintenance_type_en",
          res?.data?.resolved_by_info.maintenance_type_info?.id
        );
       
        setValue("resolved_by", res?.data?.resolved_by_info?.id);
        // if(){

        // }
        setValue("location_description", res?.data?.updated_by);
        console.log("location_description", res?.data?.updated_by);
      })
      .catch((error) => {});
  };
  useEffect(() => {
    getWorkers();
    getSpecialization();
    getRooms();
    MaintananceTaskData();
  }, []);

  return (
    <>
      <form
        className={`d-flex flex-wrap justify-content-end ${
          isDisabled ? "disabled-layer" : ""
        }`}
        onSubmit={
          mainTaskId ? handleSubmit(editTask) : handleSubmit(assignTask)
        }
      >
        <div className="form-inputs d-flex w-100">
          <div className="input-package mt-3 pe-2 d-flex flex-column w-50">
            <label className="mb-2">{t("maintananceSection.Specialization")}</label>
            <select
              name="speclization"
              className="px-login-input"
              {...register("maintenance_type_en", {})}
              disabled={isDisabled}
            >
              <option value="">{`${t("selectInput.choose")} ${t("maintananceSection.Specialization")}`}</option>
              {specialization &&
                specialization.map((special) => (
                  <option key={special.id} value={special.id}>
                    {language === "ar" ? special?.pms_maintenance_type_ar?.maintenance_type_ar : special?.pms_maintenance_type_en?.maintenance_type_en}
                  </option>
                ))}  
            </select>
          </div>
          <div className="input-package mt-3 pe-2 d-flex flex-column w-50">
            <label className="mb-2">{t("maintananceSection.MaintenanceWorker")}</label>
            <select
              name="Task"
              className="px-login-input"
              {...register("resolved_by", {
                required: true,
              })}
              disabled={isDisabled}
            >
              <option value="">{`${t("selectInput.choose")} ${t("maintananceSection.MaintenanceWorker")}`}</option>
              {workers &&
                workers.map((worker) => (
                  <option key={worker.id} value={worker.id}>
                    { language === "ar" ?  worker?.pms_maintenance_worker_ar
                        ?.maintenance_worker_name_ar
                      : worker?.pms_maintenance_worker_en
                        ?.maintenance_worker_name_en
                    }
                  </option>
                ))}
            </select>
            {/* {errors?.housekeeper_task_id?.type === "required" && (
                  <p className="text-danger ">{t("input.fieldRequired")}</p>
                )} */}
          </div>
        </div>

        <div className="form-inputs d-flex w-100">
          <div className="input-package mt-3 pe-2 d-flex flex-column w-100">
            <label className="mb-2">{t("maintananceSection.location")}</label>
            <select
              name="Task"
              className="px-login-input"
              {...register("location_description", {
                required: true,
              })}
              disabled={isDisabled}
            >
              <option value="">{`${t("selectInput.choose")} ${t("maintananceSection.location")}`}</option>
              {rooms &&
                rooms.map((room) => (
                  <option key={room.id} value={room?.pms_room_en?.room_name_en}>
                    {language === "ar" ? room?.pms_room_ar?.room_name_ar : room?.pms_room_en?.room_name_en}
                  </option>
                ))}
            </select>
          </div>
        </div>
        {mainTaskId ? <EditButton /> : <FromButton reset={reset} />}
      </form>
    </>
  );
};

export default AssignMaintananceTask;
