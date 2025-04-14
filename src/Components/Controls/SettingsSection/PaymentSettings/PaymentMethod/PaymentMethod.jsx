import { useTranslation } from "react-i18next";
import DynamicSectionForTabs from "../../../../Shared/DynamicSectionForTabs/DynamicSectionForTabs";
import CreatePaymentMethod from "./CreatePaymentMethod";
import DropdownActions from "../../../../Shared/DropdownActions/DropdownActions";
import DeleteModal from "../../../../Shared/DeleteModal/DeleteModal";
import axios from "axios";
import { AuthContext } from "../../../../Helpers/Context/AuthContext";
import { useContext, useEffect, useState } from "react";
import { ToastContext } from "../../../../Helpers/Context/ToastContext ";
import { Modal } from "react-bootstrap";
import { useForm } from "react-hook-form";

const PaymentMethod = () => {
  const { t } = useTranslation();
  const [deleteModalState, setDeleteModalState] = useState({
    isOpen: false,
    PmethodId: null,
  });
  const organization_id = localStorage.getItem('organization_id');

  const { showToast } = useContext(ToastContext);
  const { baseUrlPms, Headers } = useContext(AuthContext);
  const [data, setData] = useState([]);
  const [editModalState, setEditModalState] = useState({
    isOpen: false,
    rowData: null,
    isEditMode: true
  });
    const [branchesTags, setBranchesTags] = useState([]);
    const [collectedId, setCollectedId] = useState([]);
    const { reset } = useForm({ mode: "all" });
  const handleDeleteModal = (id) => {
    setDeleteModalState({ isOpen: true, PmethodId: id });
  };
  const closeModal = () => setDeleteModalState({ isOpen: false, PmethodId: null });
  const fetchData = () => {
    axios.get(`${baseUrlPms}/payment_method/all/`, { headers: Headers })
      .then(res => setData(res.data))
      .catch(err => console.log(err));
  };

  useEffect(() => {
    fetchData();
  }, []);
  const handleEditModal = (row) => {
    
    
    const formattedData = {
      id: row.id,
      payment_method_name_en: row?.pms_payment_method_en?.payment_method_name_en || "",
      payment_method_name_ar: row?.pms_payment_method_ar?.payment_method_name_ar || "",
    };
    setEditModalState({ isOpen: true, rowData: formattedData });
  };
  const columnsConfig = [
    {
      name: t("englishName"),
      visible: true,
      selector: (row) => row?.pms_payment_method_en?.payment_method_name_en,
      sortable: true,
      reorder: true,
      cell: (row) => (
        <div className="d-flex justify-content-between align-items-center w-100">
          <div className="w-50">
            {row?.pms_payment_method_en?.payment_method_name_en}
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
      selector: (row) => row.pms_payment_method_ar?.payment_method_name_ar,
      sortable: true, visible: true,
    },
  ];

  const filterFn = (row) =>

    row?.pms_payment_method_en?.payment_method_name_en &&
    row?.pms_payment_method_ar?.payment_method_name_ar


  const deletePaymentMethod = () => {
    const { PmethodId } = deleteModalState;
    if (!PmethodId) return;
    axios.delete(`${baseUrlPms}/payment_method/${PmethodId}/delete`, { headers: Headers }).then((res) => {
      console.log(res);
      closeModal();
      showToast("success", t("msg.removePaymentMethodMsg"));
      fetchData();
    }).catch((err) => {
      console.log(err);
      showToast("error", t("msg.errorMessage"))
    })
  }
  // Function to close the edit modal
  const closeEditModal = () => {
    setEditModalState({ isOpen: false, rowData: null });
    fetchData();
  };
  const fetchBranchesForSelectedPaymentMethod = (paymentMethodId) => {
    axios.get(`${baseUrlPms}/payment_method_branch/all/`, {
      params: {
        payment_method_id: paymentMethodId,
        organization_id: organization_id
      },
      headers: Headers
    }).then((res) => {
      const branchesInfo = res.data.map((branch) => branch.branch_info.pms_branch_en.branch_name_en);
      const IdforPaymentMethod = res.data.map((id) => id.id)
      setCollectedId(IdforPaymentMethod);
      setBranchesTags(branchesInfo);
    }).catch((error) => {
      console.log(error);
    })
  }
  return (

    <>
     <DynamicSectionForTabs
        data={data}
        fetchData={fetchData}
        createComponent={<CreatePaymentMethod refetch={fetchData} />}
        translationKey="paymentTab.paymentMethod"
        columnsConfig={columnsConfig}
        filterFn={filterFn}
      />
      {deleteModalState.isOpen && (
        <DeleteModal
          show={deleteModalState.isOpen}
          closeModal={closeModal}
          fun={deletePaymentMethod}
        />
      )}
       {editModalState.isOpen && (
            <Modal show={editModalState.isOpen} onHide={closeEditModal} centered >
              <Modal.Header closeButton >
                <h4>
                  Edit Room Type
                </h4>
              </Modal.Header>
              <Modal.Body>
                <CreatePaymentMethod
                  key={editModalState.rowData?.id || "new"}
                  initialData={editModalState.rowData}
                  onClose={closeEditModal}
                  isEditMode={true}
                  fetchBranchesForSelectedPaymentMethod={fetchBranchesForSelectedPaymentMethod}
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
};

export default PaymentMethod;