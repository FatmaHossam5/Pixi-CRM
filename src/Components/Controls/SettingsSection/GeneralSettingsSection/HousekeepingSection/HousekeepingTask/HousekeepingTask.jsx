import { useContext, useState } from 'react';
import { AuthContext } from '../../../../../Helpers/Context/AuthContext';
import DropdownActions from '../../../../../Shared/DropdownActions/DropdownActions';
import ReusableSection from '../../../../../Shared/ReusableSection/ReusableSection';
import { useData } from '../../../../../Helpers/Context/useData';
import { Modal } from 'react-bootstrap';
import CreateHousekeepingTask from './CreateHousekeepingTask';
import DeleteModal from '../../../../../Shared/DeleteModal/DeleteModal';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { ToastContext } from '../../../../../Helpers/Context/ToastContext ';

const HousekeepingTask = () => {
  // Context for the authentication
const { baseUrlPms, Headers } = useContext(AuthContext);
const { showToast } = useContext(ToastContext);
const { t } = useTranslation();
const{data,fetchData}=useData('housekeeper_task/all/',Headers);


const { reset } = useForm({ mode: "all" });
const [deleteModalState, setDeleteModalState] = useState({
  isOpen: false,
  HouseKeepId: null,
});
const [editModalState, setEditModalState] = useState({
  isOpen: false,
  rowData: null,
  isEditMode: true
});
   // Close delete modal
   const closeModal = () => setDeleteModalState({ isOpen: false, HouseKeepId: null });

   // Handle delete modal open
   const handleDeleteModal = (id) => {
     setDeleteModalState({ isOpen: true, HouseKeepId: id });
   };
 
 
   // Function to open the edit modal with row data
   const handleEditModal = (row) => {
 
 console.log(row);
 
     const formattedData = {
       id: row.id,
       housekeeper_task_name_ar: row?.pms_housekeeper_task_ar?.housekeeper_task_name_ar || "",
       housekeeper_task_name_en: row?.pms_housekeeper_task_en?.housekeeper_task_name_en || "",
     
 
     };
     setEditModalState({ isOpen: true, rowData: formattedData });
   };
   // Function to close the edit modal
   const closeEditModal = () => {
     setEditModalState({ isOpen: false, rowData: null });
     fetchData();
 
   };
  // Endpoint for the API



const deleteHouseKeeping = () => {
  const { HouseKeepId } = deleteModalState;
  if (!HouseKeepId) return;

  axios
    .delete(`${baseUrlPms}/housekeeper_task/${HouseKeepId}/delete/`, { headers: Headers })
    .then(() => {
      showToast("success", t("msg.removeroomViewMsg"));
      closeModal();
      fetchData();
    })
    .catch((error) => {
      console.error("Error deleting room type:", error);
      // Add user feedback here, e.g., a toast message
    });
};


  // Filter function to validate row data before rendering
  const filterFn = (row) => row?.pms_housekeeper_task_en?.housekeeper_task_name_en &&
    row?.pms_housekeeper_task_ar?.housekeeper_task_name_ar
  // data of table
  const getColumns = (t) => [
    {
      name: t("englishName"),
      visible: true,
      selector: (row) => row.pms_housekeeper_task_en.housekeeper_task_name_en,
      sortable: true,
      reorder: true,
      cell: (row) => (
        <div className="d-flex justify-content-between align-items-center w-100">
          <div className="w-50">{row.pms_housekeeper_task_en.housekeeper_task_name_en}</div>
          <DropdownActions
            onDelete={() => handleDeleteModal(row.id)}
            onEdit={() => handleEditModal(row)}

          />
        </div>
      ),
    },

    {
      name: t("arabicName"),
      selector: (row) => row.pms_housekeeper_task_ar.housekeeper_task_name_ar,
      sortable: true, visible: true,
    },
  ];


  return (
    <>
      {/* ReusableSection for rendering the table with provided configurations */}
      <ReusableSection data={data} filterFn={filterFn} getColumns={getColumns}  />
      {deleteModalState.isOpen && (
        <DeleteModal
          show={deleteModalState.isOpen}
          closeModal={closeModal}
          fun={deleteHouseKeeping}
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
            <CreateHousekeepingTask
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
}

export default HousekeepingTask















