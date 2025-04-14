import { useContext, useState } from "react";
import { AuthContext } from "../../../../../Helpers/Context/AuthContext";
import DropdownActions from "../../../../../Shared/DropdownActions/DropdownActions";
import ReusableSection from "../../../../../Shared/ReusableSection/ReusableSection";
import { useData } from "../../../../../Helpers/Context/useData";
import { useForm } from "react-hook-form";
import { ToastContext } from "../../../../../Helpers/Context/ToastContext ";
import { useTranslation } from "react-i18next";
import axios from "axios";
import DeleteModal from "../../../../../Shared/DeleteModal/DeleteModal";
import { Modal } from "react-bootstrap";
import CreateDependentRelationship from "./CreateDependentRelationship";

const DependentRelationship = () => {

  const { baseUrlPms, Headers } = useContext(AuthContext);
 const { t } = useTranslation();
  const { showToast } = useContext(ToastContext);
  const [deleteModalState, setDeleteModalState] = useState({
    isOpen: false,
    dependantRelationId: null,
  });
  const [editModalState, setEditModalState] = useState({
    isOpen: false,
    rowData: null,
    isEditMode: true
  });


  const { reset } = useForm({ mode: "all" });
  // API endpoint for fetching room Views

  const{data,fetchData}=useData('dependant_relationship/all/',Headers)

  // Filter function to validate row data before rendering
  const filterFn = (row) => row?.pms_dependant_relationship_en?.dependant_relationship_name_en &&
    row?.pms_dependant_relationship_ar?.dependant_relationship_name_ar






    const closeModal = () => setDeleteModalState({ isOpen: false, dependantRelationId: null });

    // Handle delete modal open
    const handleDeleteModal = (id) => {
      console.log(id);
      
      setDeleteModalState({ isOpen: true, dependantRelationId: id });
    };
  
    const handleEditModal = (row) => {
      const formattedData = {
        id: row.id,
        dependant_relationship_name_ar: row.pms_dependant_relationship_ar?.dependant_relationship_name_ar || "",
        dependant_relationship_name_en: row.pms_dependant_relationship_en?.dependant_relationship_name_en || "",
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
      selector: (row) => row.pms_dependant_relationship_en?.dependant_relationship_name_en,
      sortable: true,
      reorder: true,
      cell: (row) => (
        <div className="d-flex justify-content-between align-items-center w-100">
          <div className="w-50">{row.pms_dependant_relationship_en?.dependant_relationship_name_en}</div>
          <DropdownActions
            onDelete={() => handleDeleteModal(row.id)}
            onEdit={() => handleEditModal(row)}

          />
        </div>
      ),
    },

    {
      name: t("arabicName"),
      selector: (row) => row.pms_dependant_relationship_ar?.dependant_relationship_name_ar,
      sortable: true, visible: true,
    },
  ];

  const deleteDependentRelationShip = () => {
    const { dependantRelationId } = deleteModalState;
    if (!dependantRelationId) return;

    axios
      .delete(`${baseUrlPms}/dependant_relationship/${dependantRelationId}/delete/`, { headers: Headers })
      .then(() => {
        showToast("success", t("msg.removeDependentRelationMsg"));
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
      <ReusableSection data={data} filterFn={filterFn} getColumns={getColumns}/>
      {deleteModalState.isOpen && (
        <DeleteModal
          show={deleteModalState.isOpen}
          closeModal={closeModal}
          fun={deleteDependentRelationShip}
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
            <CreateDependentRelationship
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
  )
};

export default DependentRelationship;
