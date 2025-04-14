import React, { useContext, useEffect, useState } from "react";
import GeneralTable from "../../Shared/GeneralTable/GeneralTable";
import AddModal from "../../Shared/AddModal/AddModal";
import { ModalContext } from "../../Helpers/Context/ModalContext";
import axios from "axios";
import { AuthContext } from "../../Helpers/Context/AuthContext";
import AssignTask from "../../Controls/HouseKeeping/AssignTask";
import { useTranslation } from "react-i18next";
import i18next from "i18next";
import DeleteModal from "../../Shared/DeleteModal/DeleteModal";

const Housekeeping = () => {
  const { t } = useTranslation();
  const { language } = i18next;
  const { baseUrlPms, Headers } = useContext(AuthContext);

  const {
    showState,
    handleClose,
    setShowState,
    modelState,
    setModelState,
    closeModal,
  } = useContext(ModalContext);

  const handleShowAdd = () => {
    setShowState("housekeeping");
  };

  const [housekeepingId, setHousekeepingId] = useState();
  const viewHousekeeping = (id) => {
    setShowState("ViewDetails");
    setHousekeepingId(id);
    console.log(id);
  };

  const [houseKeep, setHouseKeep] = useState();
  const houseKeeping = () => {
    axios
      .get(`${baseUrlPms}/housekeeping/all/`, {
        headers: Headers,
      })
      .then((res) => {
        setHouseKeep(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // data of table
  const columns = [
    {
      name: t("room"),
      visible: true,
      selector: (row) =>
        language === "ar"
          ? row?.room_info?.pms_room_ar?.room_name_ar
          : row?.room_info?.pms_room_en?.room_name_en,
      sortable: true,
      reorder: true,
      cell: (row) => (
        <div className="d-flex justify-content-between align-items-center w-100">
          <div className="w-50">
            {language === "ar"
              ? row?.room_info?.pms_room_ar?.room_name_ar
              : row?.room_info?.pms_room_en?.room_name_en}
          </div>
          <div className="dropdown align-center w-60">
            <button
              className="btn dropdown-toggle"
              type="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              <i className="fa-regular fa-ellipsis actions"></i>
            </button>
            <ul className="dropdown-menu"> <li>
              <a className="dropdown-item">View</a>
            </li>
              <li>
                <a className="dropdown-item">{t("edit")}</a>
              </li>
              <li>
                <button
                  className="dropdown-item text-danger"
                  onClick={() => {
                    deleteTask(row.id);
                  }}
                >
                  {t("delete")}
                </button>
              </li>
            </ul>
          </div>
        </div>
      ),
    },

    {
      name: t("floor"),
      visible: true,
      selector: (row) =>
        language === "ar"
          ? row?.room_info?.floor_info?.pms_floor_ar.floor_name_ar
          : row?.room_info?.floor_info?.pms_floor_en.floor_name_en,
      sortable: true,
    },
    {
      name: t("status"),
      visible: true,
      selector: (row) =>
        language === "ar"
          ? row?.room_info.room_room_status_info.room_status_info
            .pms_room_status_ar.room_status_name_ar
          : row?.room_info.room_room_status_info.room_status_info
            .pms_room_status_en.room_status_name_en,
      sortable: true,
    },
  ];

  // filter data and egnore null values
  const filteredRows = houseKeep?.filter(
    (row) => row?.room_info?.pms_room_en?.room_name_en
  );

  const deleteTask = (id) => {
    setModelState({ status: "delete" });
    console.log(id);
  };

  const handleDelete = () => {
    console.log("delete task");
  };

  useEffect(() => {
    houseKeeping();
  }, []);

  return (
    <>
      <DeleteModal
        show={modelState.status === "delete"}
        closeModal={closeModal}
        fun={handleDelete}
        text={"task"}
      />
      <div className="px-content mb-auto">
        <div className="px-card pb-2 mt-4">
          <div className="card-head d-flex p-4 pb-0 flex-wrap align-items-center">
            <div className="w-100 d-flex flex-wrap align-items-center">
              <h4>{t("housekeeping")}</h4>
              {/* Button trigger modal */}
              <button
                type="button"
                className="px-btn px-blue-btn create-btn ms-auto"
                onClick={handleShowAdd}
              >
                {` ${t("createNew")} ${t("housekeepingSection.task")}`}
              </button>

              <AddModal
                name="housekeeping"
                showState={showState}
                handleClose={handleClose}
                title={`${t("createNew")} ${t("housekeepingSection.task")}`}
                component={
                  <AssignTask houseKeeping={houseKeeping} />
                  //  getBlackLists={getBlackLists}
                }
              />
              <AddModal
                name="ViewDetails"
                showState={showState}
                handleClose={handleClose}
                title="View Housekeeping Task"
                component={
                  <AssignTask housekeepingId={housekeepingId} />
                }
              />
            </div>
          </div>
          {/* start table */}
          <GeneralTable columns={columns} filteredRows={filteredRows} />
          {/* end table */}
        </div>
      </div>
    </>
  );
};

export default Housekeeping;
