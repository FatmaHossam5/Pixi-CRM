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
import CreateSpecialization from "./CreateSpecialization";
import { useForm } from "react-hook-form";

const Specialization = () => {

  const { baseUrlPms, Headers } = useContext(AuthContext);
  const [deleteModalState, setDeleteModalState] = useState({
    isOpen: false,
    specializationId: null,
  });
  const { showToast } = useContext(ToastContext);
  const { t } = useTranslation();
  const { fetchData } = useData();

  const [editModalState, setEditModalState] = useState({
    isOpen: false,
    rowData: null,
    isEditMode: true
  });
  const { reset } = useForm({ mode: "all" });

  // Function to open the edit modal with row data
  const handleEditModal = (row) => {
    console.log(row);

    const formattedData = {
      id: row.id,
      maintenance_type_ar: row.pms_maintenance_type_ar?.maintenance_type_ar || "",
      maintenance_type_en: row.pms_maintenance_type_en?.maintenance_type_en || "",
    };
    setEditModalState({ isOpen: true, rowData: formattedData });
  };
  // Function to close the edit modal
  const closeEditModal = () => {
    setEditModalState({ isOpen: false, rowData: null });
    fetchData();

  };
  // API endpoint for fetching room Views

  const { data } = useData('maintenance_type/all/', Headers)
  // Filter function to validate row data before rendering
  const filterFn = (row) => row?.pms_maintenance_type_en?.maintenance_type_en &&
    row?.pms_maintenance_type_ar?.maintenance_type_ar
  const handleDeleteModal = (id) => {
    setDeleteModalState({ isOpen: true, specializationId: id });
  };
  const closeModal = () => setDeleteModalState({ isOpen: false, specializationId: null });
  const deletespecialization = () => {
    const { specializationId } = deleteModalState;
    if (!specializationId) return;

    axios
      .delete(`${baseUrlPms}/maintenance_type/${specializationId}/delete/`, { headers: Headers })
      .then(() => {
        showToast("success", t("msg.removeSpecializationMsg"));
        closeModal();
        fetchData();
      })
      .catch((error) => {
        console.error("Error deleting room type:", error);
        // Add user feedback here, e.g., a toast message
      });
  };
  // data of table
  const getColumns = (t) => [
    {
      name: t("englishName"),
      visible: true,
      selector: (row) => row.pms_maintenance_type_en.maintenance_type_en,
      sortable: true,
      reorder: true,
      cell: (row) => (
        <div className="d-flex justify-content-between align-items-center w-100">
          <div className="w-50">
            {row?.pms_maintenance_type_en?.maintenance_type_en}
          </div>
          <DropdownActions
            onDelete={() => handleDeleteModal(row.id)}
            onEdit={() => handleEditModal(row)}


          />
        </div>
      ),
    },

    {
      name: t("arabicName"),
      selector: (row) => row?.pms_maintenance_type_ar?.maintenance_type_ar,
      sortable: true, visible: true,
    },
  ];



  return (
    <>
      {/* ReusableSection for rendering the table with provided configurations */}
      <ReusableSection data={data} filterFn={filterFn} getColumns={getColumns} headers={Headers} />
      {deleteModalState.isOpen && (
        <DeleteModal
          show={deleteModalState.isOpen}
          closeModal={closeModal}
          fun={deletespecialization}
        />
      )}
      {editModalState.isOpen && (
        <Modal show={editModalState.isOpen} onHide={closeEditModal} centered >
          <Modal.Header closeButton>
            <h4>
              Edit Specialization
            </h4>
          </Modal.Header>
          <Modal.Body>
            <CreateSpecialization
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

export default Specialization;
