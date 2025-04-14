import { useContext, useState } from "react";
import { AuthContext } from "../../../../../Helpers/Context/AuthContext";
import ReusableSection from "../../../../../Shared/ReusableSection/ReusableSection";
import { useData } from "../../../../../Helpers/Context/useData";
import DropdownActions from "../../../../../Shared/DropdownActions/DropdownActions";
import axios from "axios";
import { useTranslation } from "react-i18next";
import { ToastContext } from "../../../../../Helpers/Context/ToastContext ";
import DeleteModal from "../../../../../Shared/DeleteModal/DeleteModal";
import { Modal } from "react-bootstrap";
import CreateDependentType from "./CreateDependentType";
import { useForm } from "react-hook-form";

const DependentType = () => {


  const { baseUrlPms, Headers } = useContext(AuthContext);
  const { t } = useTranslation();
  const { showToast } = useContext(ToastContext);
  const [deleteModalState, setDeleteModalState] = useState({
    isOpen: false,
    dependentTypeId: null,
  });
  const [editModalState, setEditModalState] = useState({
    isOpen: false,
    rowData: null,
    isEditMode: true
  });
  const { data, fetchData } = useData('age_group/all/', Headers);

  const { reset } = useForm({ mode: "all" });
  // Filter function to validate row data before rendering
  const filterFn = (row) => row?.pms_age_group_en?.age_group_name_en &&
    row?.pms_age_group_ar?.age_group_name_ar;
  // Close delete modal
  const closeModal = () => setDeleteModalState({ isOpen: false, dependentTypeId: null });

  // Handle delete modal open
  const handleDeleteModal = (id) => {
    setDeleteModalState({ isOpen: true, dependentTypeId: id });
  };


  // Function to open the edit modal with row data
  const handleEditModal = (row) => {
    console.log(row);

    const formattedData = {
      id: row.id,

      age_group_name_ar: row.pms_age_group_ar?.age_group_name_ar || "",

      age_group_name_en: row.pms_age_group_en?.age_group_name_en || "",
    };
    setEditModalState({ isOpen: true, rowData: formattedData });
  };
  // Function to close the edit modal
  const closeEditModal = () => {
    setEditModalState({ isOpen: false, rowData: null });
    fetchData();

  };

  // data of table
  const getColumns = (t) => [
    {
      name: t("englishName"),
      visible: true,
      selector: (row) => row.pms_age_group_en?.age_group_name_en,
      sortable: true,
      reorder: true,
      cell: (row) => (
        <div className="d-flex justify-content-between align-items-center w-100">
          <div className="w-50">{row.pms_age_group_en?.age_group_name_en}</div>
          <DropdownActions
            onDelete={() => handleDeleteModal(row.id)}
            onEdit={() => handleEditModal(row)}

          />
        </div>
      ),
    },

    {
      name: t("arabicName"),
      visible: true,
      selector: (row) => row.pms_age_group_ar?.age_group_name_ar,
      sortable: true,
    },
  ];

  const deleteDependentType = () => {
    const { dependentTypeId } = deleteModalState;
    if (!dependentTypeId) return;

    axios
      .delete(`${baseUrlPms}/age_group/${dependentTypeId}/delete/`, { headers: Headers })
      .then(() => {
        showToast("success", t("msg.removeDependentTypeMsg"));
        closeModal();
        fetchData();
      })
      .catch((error) => {
        console.error("Error deleting room type:", error);
        // Add user feedback here, e.g., a toast message
      });
  };

  return (
    <>
      {/* ReusableSection for rendering the table with provided configurations */}
      <ReusableSection
        data={data}
        filterFn={filterFn}
        getColumns={getColumns}
      />
      {deleteModalState.isOpen && (
        <DeleteModal
          show={deleteModalState.isOpen}
          closeModal={closeModal}
          fun={deleteDependentType}
        />
      )}
      {editModalState.isOpen && (
        <Modal show={editModalState.isOpen} onHide={closeEditModal} centered >
          <Modal.Header closeButton>
            <h4>
              Edit Dependent Type
            </h4>
          </Modal.Header>
          <Modal.Body>
            <CreateDependentType
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

export default DependentType;
