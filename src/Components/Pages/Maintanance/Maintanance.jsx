import React, { useContext, useEffect, useState } from 'react'
import { ModalContext } from '../../Helpers/Context/ModalContext';
import { AuthContext } from '../../Helpers/Context/AuthContext';
import axios from 'axios';
import AssignMaintananceTask from '../../Controls/Maintanance/AssignMaintananceTask';
import AddModal from '../../Shared/AddModal/AddModal';
import GeneralTable from '../../Shared/GeneralTable/GeneralTable';
import { useTranslation } from 'react-i18next';
import i18next from 'i18next';
import DeleteModal from "../../Shared/DeleteModal/DeleteModal";

const Maintanance = () => {
  const { t } = useTranslation();
  const { language } = i18next;
  const { baseUrlPms, Headers } = useContext(AuthContext);

  const {
    showState,
    handleClose,
    setShowState,
    modelState,
    closeModal,
    setModelState,
  } = useContext(ModalContext);

  const handleShowAdd = () => {
    setShowState("maintananceTask");
  };

  const [mainTask, setMainTask] = useState();
  const getMaintananceTask = () => {
    axios
      .get(`${baseUrlPms}/maintenance_assignment/all/`, {
        headers: Headers,
      })
      .then((res) => {
        setMainTask(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const [mainTaskId, setMainTaskId] = useState();
  const editMainTask = (id) => {
    setShowState("editMainTask");
    setMainTaskId(id);
    console.log(id);
  };
  const deleteTask = (id) => {
    setModelState({ status: "delete" });
    console.log(id);
  };

  const handleDelete = () => {
    console.log("delete task");
  };

  // data of table
  const columns = [
    {
      name: t("maintananceSection.MaintenanceWorker"),
      visible: true,
      selector: (row) => (language === "ar" ? row?.resolved_by_info?.pms_maintenance_worker_ar?.maintenance_worker_name_ar : row?.resolved_by_info?.pms_maintenance_worker_en?.maintenance_worker_name_en),
      sortable: true,
      reorder: true,
      cell: (row) => (
        <div className="d-flex justify-content-between align-items-center w-100">
          <div className="w-50">
            {(language === "ar" ? row?.resolved_by_info?.pms_maintenance_worker_ar?.maintenance_worker_name_ar : row?.resolved_by_info?.pms_maintenance_worker_en?.maintenance_worker_name_en)}
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
            <ul className="dropdown-menu">
              <li>
                <button
                  className="dropdown-item"
                  onClick={() => {
                    editMainTask(row.id);
                  }}
                >
                  {t("edit")}
                </button>
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
      name: t("maintananceSection.Specialization"),
      visible: true,
      selector: (row) => (language === "ar" ? row?.resolved_by_info?.maintenance_type_info.pms_maintenance_type_ar.maintenance_type_ar : row?.resolved_by_info?.maintenance_type_info.pms_maintenance_type_en.maintenance_type_en),
      sortable: true,
    },
    {
      name: t("maintananceSection.location"),
      selector: (row) => row?.location_description,
      sortable: true, visible: true,
    },
    {
      name: "status",
      selector: (row) => (row?.is_done == true ? "Done" : "Pending"),
      sortable: true,
    },
  ];

  // filter data and egnore null values
  const filteredRows = mainTask?.filter(
    (row) =>
      row?.resolved_by_info?.pms_maintenance_worker_en
        ?.maintenance_worker_name_en
  );

  useEffect(() => {
    getMaintananceTask();
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
              <h4>{t("maintananceSection.Maintanance")}</h4>
              {/* Button trigger modal */}
              <button
                type="button"
                className="px-btn px-blue-btn create-btn ms-auto"
                onClick={handleShowAdd}
              >
                {`${t("createNew")} ${t("maintananceSection.maintananceTask")}`}
              </button>

              <AddModal
                name="maintananceTask"
                showState={showState}
                handleClose={handleClose}
                title={`${t('createNew')} ${t("maintananceSection.maintananceTask")}`}
                component={
                  <AssignMaintananceTask
                    getMaintananceTask={getMaintananceTask}
                  />
                  //  getBlackLists={getBlackLists}
                }
              />

              <AddModal
                name="editMainTask"
                showState={showState}
                handleClose={handleClose}
                title="Edit New Maintanance Task"
                component={
                  <AssignMaintananceTask mainTaskId={mainTaskId} />
                  //  getBlackLists={getBlackLists}
                }
              />
            </div>
          </div>
          {/* start table */}
          <GeneralTable columns={columns}
            filteredRows={filteredRows}
          />
          <GeneralTable columns={columns} filteredRows={filteredRows} />
          {/* end table */}
        </div>
      </div>
    </>
  );
};

export default Maintanance;
