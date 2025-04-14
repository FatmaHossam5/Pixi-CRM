import { useContext, useState } from "react";
import { AuthContext } from "../../../../../Helpers/Context/AuthContext";
import DropdownActions from "../../../../../Shared/DropdownActions/DropdownActions";
import ReusableSection from "../../../../../Shared/ReusableSection/ReusableSection";
import { useData } from "../../../../../Helpers/Context/useData";
import DeleteModal from "../../../../../Shared/DeleteModal/DeleteModal";
import axios from "axios";
import { ToastContext } from "../../../../../Helpers/Context/ToastContext ";
import { useTranslation } from "react-i18next";
import { Modal } from "react-bootstrap";
import CreateHousekeepers from "./CreateHousekeepers";
import { useForm } from "react-hook-form";
const Housekeepers = () => {

  const { baseUrlPms, Headers } = useContext(AuthContext);
  const [deleteModalState, setDeleteModalState] = useState({
    isOpen: false,
    HouseKeeperId: null,
  });
  const [editModalState, setEditModalState] = useState({
    isOpen: false,
    rowData: null,
    isEditMode: true
  });
  const { showToast } = useContext(ToastContext);
  const { t } = useTranslation();
const { reset } = useForm({ mode: "all" });
  // API endpoint for fetching room Views

  const { data, fetchData } = useData('housekeeper/all/', Headers);
  // Filter function to validate row data before rendering
  const filterFn = (row) => row?.pms_housekeeper_en?.housekeeper_name_en &&
    row?.pms_housekeeper_ar?.housekeeper_name_ar

  const handleDeleteModal = (id) => {
    setDeleteModalState({ isOpen: true, HouseKeeperId: id });
  };

  // Close delete modal
  const closeModal = () => setDeleteModalState({ isOpen: false, HouseKeeperId: null });
   // Function to close the edit modal
   const closeEditModal = () => {
    setEditModalState({ isOpen: false, rowData: null });
    fetchData();

  };

  const deleteHouseKeeper = () => {
    const { HouseKeeperId } = deleteModalState;
    if (!HouseKeeperId) return;

    axios
      .delete(`${baseUrlPms}/housekeeper/${HouseKeeperId}/delete/`, { headers: Headers })
      .then(() => {
        showToast("success", t("msg.removeHouseKeeperMsg"));
        closeModal();
        fetchData();
      })
      .catch((error) => {
        console.error("Error deleting :", error);
        // Add user feedback here, e.g., a toast message
      });
  };
  const handleEditModal = (row) => {

    console.log(row);

    const formattedData = {
      id: row.id,
      housekeeper_name_ar: row?.pms_housekeeper_ar?.housekeeper_name_ar || "",
       housekeeper_name_en: row?.pms_housekeeper_en?.housekeeper_name_en || "",


    };
    setEditModalState({ isOpen: true, rowData: formattedData });
  };
  const getColumns = (t) => [
    {
      name: t("englishName"),
      visible: true,
      selector: (row) => row.pms_housekeeper_en.housekeeper_name_en,
      sortable: true,
      reorder: true,
      cell: (row) => (
        <div className="d-flex justify-content-between align-items-center w-100">
          <div className="w-50">
            {row.pms_housekeeper_en.housekeeper_name_en}
          </div>
          <DropdownActions onDelete={() => handleDeleteModal(row.id)}
            onEdit={() => handleEditModal(row)}
          />
        </div>
      ),
    },

    {
      name: t("arabicName"),
      selector: (row) => row.pms_housekeeper_ar.housekeeper_name_ar,
      sortable: true, visible: true,
    },
  ];



  return (
    <>
      {/* ReusableSection for rendering the table with provided configurations */}
      <ReusableSection data={data} filterFn={filterFn} getColumns={getColumns} />
      {deleteModalState.isOpen && (
        <DeleteModal
          show={deleteModalState.isOpen}
          closeModal={closeModal}
          fun={deleteHouseKeeper}
        />
      )}
        {editModalState.isOpen && (
        <Modal show={editModalState.isOpen} onHide={closeEditModal} centered >
          <Modal.Header closeButton>
            <h4>
              Edit Room View
            </h4>
          </Modal.Header>
          <Modal.Body>
            <CreateHousekeepers
              key={editModalState.rowData?.id || "new"}
              initialData={editModalState.rowData}
              onClose={closeEditModal}
              isEditMode={true}
              reset={reset}
    
            />
          </Modal.Body>
        </Modal>
      )}
    </>
  );
};

export default Housekeepers;
