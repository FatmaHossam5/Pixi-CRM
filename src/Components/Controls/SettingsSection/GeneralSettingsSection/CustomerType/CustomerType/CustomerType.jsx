import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../../../../Helpers/Context/AuthContext';
import DropdownActions from '../../../../../Shared/DropdownActions/DropdownActions';
import ReusableSection from '../../../../../Shared/ReusableSection/ReusableSection';
import { useData } from '../../../../../Helpers/Context/useData';
import { useTranslation } from 'react-i18next';
import { ToastContext } from '../../../../../Helpers/Context/ToastContext ';
import DeleteModal from '../../../../../Shared/DeleteModal/DeleteModal';
import axios from 'axios';
import { Modal } from 'react-bootstrap';
import CreateCustomerType from './CreateCustomerType';
import { useForm } from 'react-hook-form';

const CustomerType = () => {

    const { baseUrlPms, Headers } = useContext(AuthContext);
    // API endpoint for fetching room Views

    const { data, fetchData } = useData('customer_type/all/', Headers);

    const { t } = useTranslation();
    const { showToast } = useContext(ToastContext);

    const [deleteModalState, setDeleteModalState] = useState({
        isOpen: false,
        customerTypeId: null,
    });
    const [editModalState, setEditModalState] = useState({
        isOpen: false,
        rowData: null,
        isEditMode: true
    });
    const [branchesTags, setBranchesTags] = useState([]);
    const [collectedId, setCollectedId] = useState([]);
    const { reset } = useForm({ mode: "all" });
    // Close delete modal
    const closeModal = () => setDeleteModalState({ isOpen: false, customerTypeId: null });

    // Handle delete modal open
    const handleDeleteModal = (id) => {
        setDeleteModalState({ isOpen: true, customerTypeId: id });
    };
    // Function to open the edit modal with row data
    const handleEditModal = (row) => {

        console.log(row);

        const formattedData = {
            id: row.id,
            customer_type_name_ar: row?.pms_customer_type_ar?.customer_type_name_ar || "",
            customer_type_name_en: row?.pms_customer_type_en?.customer_type_name_en || "",
            customer_type_percentage: row?.customer_type_percentage || "",

        };
        setEditModalState({ isOpen: true, rowData: formattedData });
    };
    // Function to close the edit modal
    const closeEditModal = () => {
        setEditModalState({ isOpen: false, rowData: null });
        fetchData();

    };
    // Filter function to validate row data before rendering
    const filterFn = (row) => row?.pms_customer_type_en
        ?.customer_type_name_en &&
        row?.pms_customer_type_ar?.customer_type_name_ar;


    // data of table
    const getColumns = (t) => [
        {
            name: t("englishName"),
            selector: (row) => row?.pms_customer_type_en?.customer_type_name_en,
            sortable: true,
            reorder: true,
            visible: true,
            cell: (row) => (
                <div className="d-flex justify-content-between align-items-center w-100">
                    <div className="w-50">{row?.pms_customer_type_en?.customer_type_name_en}</div>
                    <DropdownActions
                        onDelete={() => handleDeleteModal(row.id)}
                        onEdit={() => handleEditModal(row)}
                    />
                </div>
            ),
        },

        {
            name: t("arabicName"),
            selector: (row) => row?.pms_customer_type_ar?.customer_type_name_ar,
            sortable: true,
            visible: true,
        },

        {
            name: t("percentage.percentage"),
            selector: (row) => row?.customer_type_percentage,
            sortable: true,
            visible: true,
        },
    ];


    const deleteCustomerType = () => {
        const { customerTypeId } = deleteModalState;
        if (!customerTypeId) return;

        axios
            .delete(`${baseUrlPms}/customer_type/${customerTypeId}/delete/`, { headers: Headers })
            .then(() => {
                showToast("success", t("msg.removeCustomerTyprMsg"));
                closeModal();
                fetchData();
            })
            .catch((error) => {
                console.error("Error deleting room type:", error);
                // Add user feedback here, e.g., a toast message
            });
    };
    const fetchBranchesForSelectedCustomerType = (customerTypeId) => {
        console.log(customerTypeId);
        
        axios.get(`${baseUrlPms}/customer_type_branch/all/`, {
            params: {

                customer_type_id: customerTypeId
            },
            headers: Headers
        }).then((res) => {

            const branchesInfo = res.data.map((branch) => branch.branch_info.pms_branch_en.branch_name_en);
           
            
            const IdfochannleBookingandbranch = res.data.map((id) => id.id)
            setCollectedId(IdfochannleBookingandbranch);
            setBranchesTags(branchesInfo);
        }).catch((error) => {
            console.log(error);

        })
    }

    useEffect(() => {
        fetchBranchesForSelectedCustomerType()
    }, [])
    return (
        <>
            {/* ReusableSection for rendering the table with provided configurations */}
            <ReusableSection data={data} filterFn={filterFn} getColumns={getColumns} headers={Headers} />


            {deleteModalState.isOpen && (
                <DeleteModal
                    show={deleteModalState.isOpen}
                    closeModal={closeModal}
                    fun={deleteCustomerType}
                />
            )}

            {editModalState.isOpen && (
                <Modal show={editModalState.isOpen} onHide={closeEditModal} centered >
                    <Modal.Header closeButton>
                        <h4>
                            Edit CustomerType
                        </h4>
                    </Modal.Header>
                    <Modal.Body>
                        <CreateCustomerType
                            key={editModalState.rowData?.id || "new"}
                            initialData={editModalState.rowData}
                            onClose={closeEditModal}
                            isEditMode={true}
                            fetchBranchesForSelectedCustomerType={fetchBranchesForSelectedCustomerType}
                            branchesTags={branchesTags}
                            collectedId={collectedId}
                            reset={reset}
                            setCollectedId={setCollectedId}
                        />
                    </Modal.Body>
                </Modal>
            )}
        </>
    );
}

export default CustomerType