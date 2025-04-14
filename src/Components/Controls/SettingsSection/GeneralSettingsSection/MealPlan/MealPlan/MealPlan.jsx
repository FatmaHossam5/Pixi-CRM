import React, { useContext, useState } from 'react';
import { AuthContext } from '../../../../../Helpers/Context/AuthContext';
import DropdownActions from '../../../../../Shared/DropdownActions/DropdownActions';
import ReusableSection from '../../../../../Shared/ReusableSection/ReusableSection';
import { useData } from '../../../../../Helpers/Context/useData';
import DeleteModal from "../../../../../Shared/DeleteModal/DeleteModal";
import { Modal, Toast } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import axios from 'axios';
import { ToastContext } from '../../../../../Helpers/Context/ToastContext ';
import CreateMealPlan from './CreateMealPlan';
const MealPlan = () => {
  const { baseUrlPms, Headers } = useContext(AuthContext);
  const { data, fetchData } = useData('accommodation_type/all/', Headers);
  const { t } = useTranslation();
  const { showToast } = useContext(ToastContext);

  const [deleteModalState, setDeleteModalState] = useState({
    isOpen: false,
    mealPlanId: null,
  });

  const [editModalState, setEditModalState] = useState({
    isOpen: false,
    rowData: null,
    isEditMode: true,
  });

  // Close delete modal
  const closeModal = () => setDeleteModalState({ isOpen: false, mealPlanId: null });

  // Handle delete modal open
  const handleDeleteModal = (id) => {
    setDeleteModalState({ isOpen: true, mealPlanId: id });
  };

  // Handle edit modal open
  const handleEditModal = (row) => {
    const formattedData = {
      id: row.id,
      accommodation_type_name_ar: row?.pms_accommodation_type_ar?.accommodation_type_name_ar || '',
      accommodation_type_name_en: row?.pms_accommodation_type_en?.accommodation_type_name_en || '',
    };
    setEditModalState({ isOpen: true, rowData: formattedData });
  };

  // Close edit modal
  const closeEditModal = () => {
    setEditModalState({ isOpen: false, rowData: null });
    fetchData();
  };

  // Filter function to validate row data before rendering
  const filterFn = (row) =>
    row?.pms_accommodation_type_en?.accommodation_type_name_en &&
    row?.pms_accommodation_type_ar?.accommodation_type_name_ar;

  // Data for the table
  const getColumns = (t) => [
    {
      name: t("englishName"),
      selector: (row) => row.pms_accommodation_type_en.accommodation_type_name_en,
      sortable: true,
      reorder: true,
      visible: true,
      cell: (row) => (
        <div className="d-flex justify-content-between align-items-center w-100">
          <div className="w-50">{row.pms_accommodation_type_en.accommodation_type_name_en}</div>
          <DropdownActions
            onDelete={() => handleDeleteModal(row.id)}
            onEdit={() => handleEditModal(row)}
          />
        </div>
      ),
    },
    {
      name: t("arabicName"),
      selector: (row) => row.pms_accommodation_type_ar.accommodation_type_name_ar,
      sortable: true,
      visible: true,
    },
  ];

  const deleteMealPlan = () => {
    const { mealPlanId } = deleteModalState;
    if (!mealPlanId) return;

    axios
      .delete(`${baseUrlPms}/accommodation_type/${mealPlanId}/delete/`, { headers: Headers })
      .then(() => {
        showToast("success", t("msg.removeMealPlanMsg"));
        closeModal();
        fetchData();
      })
      .catch((error) => {
        console.error("Error deleting meal plan:", error);
        showToast('error', t("msg.errorMessage"));
      });
  };

  return (
    <>
      <ReusableSection data={data} filterFn={filterFn} getColumns={getColumns} headers={Headers} />
      {deleteModalState.isOpen && (
        <DeleteModal
          show={deleteModalState.isOpen}
          closeModal={closeModal}
          fun={deleteMealPlan}
        />
      )}
      {editModalState.isOpen && (
        <Modal show={editModalState.isOpen} onHide={closeEditModal} centered>
          <Modal.Header closeButton>
            <h4>{t('editMealPlan')}</h4>
          </Modal.Header>
          <Modal.Body>
            <CreateMealPlan
              key={editModalState.rowData?.id || 'new'}
              initialData={editModalState.rowData}
              onClose={closeEditModal}
              isEditMode={true}
            />
          </Modal.Body>
        </Modal>
      )}
    </>
  );
};

export default MealPlan;
