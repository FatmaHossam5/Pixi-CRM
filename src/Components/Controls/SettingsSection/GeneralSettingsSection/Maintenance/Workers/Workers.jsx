import { useContext, useState } from 'react';
import { AuthContext } from '../../../../../Helpers/Context/AuthContext';
import DropdownActions from '../../../../../Shared/DropdownActions/DropdownActions';
import ReusableSection from '../../../../../Shared/ReusableSection/ReusableSection';
import { useData } from '../../../../../Helpers/Context/useData';
import DeleteModal from '../../../../../Shared/DeleteModal/DeleteModal';
import { Modal } from 'react-bootstrap';
import CreateWorkers from './CreateWorkers';
import axios from 'axios';
import { ToastContext } from '../../../../../Helpers/Context/ToastContext ';
import { useTranslation } from 'react-i18next';
import { useForm } from 'react-hook-form';

const Workers = () => {

  const { baseUrlPms, Headers } = useContext(AuthContext);
  const { showToast } = useContext(ToastContext);
  const { t } = useTranslation();
  const { fetchData } = useData();

  const [editModalState, setEditModalState] = useState({
    isOpen: false,
    rowData: null,
    isEditMode: true
  });
  const { reset } = useForm({ mode: "all" });
  const [deleteModalState, setDeleteModalState] = useState({
    isOpen: false,
    workerId: null,
  });
  // API endpoint for fetching room Views

const{data}=useData('maintenance_worker/all/',Headers)
  // Filter function to validate row data before rendering
  const filterFn = (row) => row?.pms_maintenance_worker_en.maintenance_worker_name_en &&
    row?.pms_maintenance_worker_ar.maintenance_worker_name_ar
    const closeModal = () => setDeleteModalState({ isOpen: false, workerId: null });
    const closeEditModal = () => {
      setEditModalState({ isOpen: false, rowData: null });
      fetchData();
  
    };
    const handleDeleteModal = (id) => {
      setDeleteModalState({ isOpen: true, workerId: id });
    };
  // Function to open the edit modal with row data
  const handleEditModal = (row) => {
    console.log(row);

    const formattedData = {
      id: row.id,
      maintenance_worker_name_ar: row.pms_maintenance_worker_ar?.maintenance_worker_name_ar|| "",
      maintenance_worker_name_en: row.pms_maintenance_worker_en?.maintenance_worker_name_en || "",
    };
    setEditModalState({ isOpen: true, rowData: formattedData });
  };


    const deleteWorker = () => {
      const { workerId } = deleteModalState;
      if (!workerId) return;
  
      axios
        .delete(`${baseUrlPms}/maintenance_worker/${workerId}/delete/`, { headers: Headers })
        .then(() => {
          showToast("success", t("msg.removeWorkerMsg"));
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
      selector: (row) => row.pms_maintenance_worker_en.maintenance_worker_name_en,
      sortable: true,
      reorder: true,
      cell: (row) => (
        <div className="d-flex justify-content-between align-items-center w-100">
          <div className="w-50">{row.pms_maintenance_worker_en.maintenance_worker_name_en}</div>
          <DropdownActions 
          
          onDelete={() => handleDeleteModal(row.id)}
          onEdit={() => handleEditModal(row)}
          />
        </div>
      ),
    },

    {
      name: t("arabicName"),
      selector: (row) => row.pms_maintenance_worker_ar.maintenance_worker_name_ar,
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
          fun={deleteWorker}
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
            <CreateWorkers
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

export default Workers
