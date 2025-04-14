import React, { useContext, useState } from 'react';
import { AuthContext } from '../../../../../Helpers/Context/AuthContext';
import DropdownActions from '../../../../../Shared/DropdownActions/DropdownActions';
import ReusableSection from '../../../../../Shared/ReusableSection/ReusableSection';
import { useData } from '../../../../../Helpers/Context/useData';
import { useTranslation } from 'react-i18next';
import { ToastContext } from '../../../../../Helpers/Context/ToastContext ';
import DeleteModal from '../../../../../Shared/DeleteModal/DeleteModal';
import axios from 'axios';
import { Modal } from 'react-bootstrap';
import CreateBedType from './CreateBedType';

const BedType = () => {

    const { baseUrlPms, Headers } = useContext(AuthContext);
    const { data, fetchData } = useData('bed_type/all/', Headers);
    const { t } = useTranslation();
    const { showToast } = useContext(ToastContext);
    const [deleteModalState, setDeleteModalState] = useState({
        isOpen: false,
        bedTypeId: null,
      });
      const [editModalState, setEditModalState] = useState({
        isOpen: false,
        rowData: null,
        isEditMode: true,
      });
      const [branchesTags, setBranchesTags] = useState([]);
  const [collectedId, setCollectedId] = useState([]);
      // Close delete modal
      const closeModal = () => setDeleteModalState({ isOpen: false, bedTypeId: null });
    
      // Handle delete modal open
      const handleDeleteModal = (id) => {
        setDeleteModalState({ isOpen: true, bedTypeId: id });
      };
      const handleEditModal = (row) => {
        const formattedData = {
          id: row.id,
          bed_type_name_ar: row?.pms_bed_type_ar?.bed_type_name_ar || '',
          bed_type_name_en: row?.pms_bed_type_en?.bed_type_name_en || '',
        };
        setEditModalState({ isOpen: true, rowData: formattedData });
      };
    
      const closeEditModal = () => {
        setEditModalState({ isOpen: false, rowData: null });
        fetchData();
      };

    const filterFn = (row) => row?.pms_bed_type_en?.bed_type_name_en &&
        row?.pms_bed_type_ar?.bed_type_name_ar;




    // data of table
    const getColumns = (t) => [
        {
            name: t("englishName"),
            selector: (row) => row.pms_bed_type_en.bed_type_name_en,
            sortable: true,
            reorder: true,
            visible: true,
            cell: (row) => (
                <div className="d-flex justify-content-between align-items-center w-100">
                    <div className="w-50">{row.pms_bed_type_en.bed_type_name_en}</div>
                    <DropdownActions 
                    onDelete={() => handleDeleteModal(row.id)}
                    onEdit={() => handleEditModal(row)}
                    
                    
                    />
                </div>
            ),
        },

        {
            name: t("arabicName"),
            selector: (row) => row.pms_bed_type_ar.bed_type_name_ar,
            sortable: true,
            visible: true,
        },


    ];





    const deletebedType = () => {
        const { bedTypeId } = deleteModalState;
        if (!bedTypeId) return;
    
        axios
          .delete(`${baseUrlPms}/bed_type/${bedTypeId}/delete/`, { headers: Headers })
          .then(() => {
            showToast("success", t("msg.removebedTypeMsg"));
            closeModal();
            fetchData();
          })
          .catch((error) => {
            console.error("Error deleting room type:", error);
            // Add user feedback here, e.g., a toast message
          });
      };

  const fetchBranchesForSelectedBedType = async (bedTypeId) => {
    try {
      const response = await axios.get(`${baseUrlPms}/bed_type_branch/all/`, {
        params: { bed_type_id: bedTypeId },
        headers: Headers,
      });

      const branchesInfo = response.data.map((branch) => branch.branch_info.pms_branch_en.branch_name_en);
      const collectedBranchIds = response.data.map((branch) => branch.id);

      setBranchesTags(branchesInfo);
      setCollectedId(collectedBranchIds);
    } catch (error) {
      console.error('Error fetching branches:', error);
    }
  };

    return (
        <>
            {/* ReusableSection for rendering the table with provided configurations */}
            <ReusableSection data={data} filterFn={filterFn} getColumns={getColumns} headers={Headers} />
            {deleteModalState.isOpen && (
        <DeleteModal
          show={deleteModalState.isOpen}
          closeModal={closeModal}
          fun={deletebedType}
        />
      )}
       {editModalState.isOpen && (
        <Modal show={editModalState.isOpen} onHide={closeEditModal} centered>
          <Modal.Header closeButton>
            <h4>Edit Bed Type</h4>
          </Modal.Header>
          <Modal.Body>
            <CreateBedType
              key={editModalState.rowData?.id || 'new'}
              initialData={editModalState.rowData}
              onClose={closeEditModal}
              isEditMode={true}
              fetchBranchesForSelectedBedType={fetchBranchesForSelectedBedType}
              branchesTags={branchesTags}
              collectedId={collectedId}
              setCollectedId={setCollectedId}
            />
          </Modal.Body>
        </Modal>
      )}
        </>
    );
}

export default BedType