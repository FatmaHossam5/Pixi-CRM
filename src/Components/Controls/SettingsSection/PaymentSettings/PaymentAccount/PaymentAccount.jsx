import React, { useContext, useEffect, useState } from "react";
import { ModalContext } from "../../../../Helpers/Context/ModalContext";
import { AuthContext } from "../../../../Helpers/Context/AuthContext";
import CreatePaymentAccount from "./CreatePaymentAccount";
import axios from "axios";
import AddModal from "../../../../Shared/AddModal/AddModal";
import GeneralTable from "../../../../Shared/GeneralTable/GeneralTable";
import { useTranslation } from "react-i18next";
import DynamicSectionForTabs from "../../../../Shared/DynamicSectionForTabs/DynamicSectionForTabs";
import DropdownActions from "../../../../Shared/DropdownActions/DropdownActions";
import DeleteModal from "../../../../Shared/DeleteModal/DeleteModal";
import { ToastContext } from "../../../../Helpers/Context/ToastContext ";
import { Modal } from "react-bootstrap";
import { useForm } from "react-hook-form";


const PaymentAccount = () => {
  const { t } = useTranslation();
  const [data, setData] = useState([]);
  const [deleteModalState, setDeleteModalState] = useState({
    isOpen: false,
    PaccountId: null,
  });
  const [editModalState, setEditModalState] = useState({
    isOpen: false,
    rowData: null,
    isEditMode: true
  });
  const { showToast } = useContext(ToastContext);
  const organization_id = localStorage.getItem('organization_id');
  const [branchesTags, setBranchesTags] = useState([]);
  const [collectedId, setCollectedId] = useState([]);
  const { reset } = useForm({ mode: "all" });
  const { baseUrlPms, Headers } = useContext(AuthContext);

  const fetchData = () => {
    axios.get(`${baseUrlPms}/payment_account/all/`, { headers: Headers })
      .then(res => setData(res.data))
      .catch(err => console.log(err));
  };

  useEffect(() => {
    fetchData();
  }, []);

  const deletePaymentAccount = () => {

    const { PaccountId } = deleteModalState;

    if (!PaccountId) return;
    axios.delete(`${baseUrlPms}/payment_account/${PaccountId}/delete`, { headers: Headers }).then((res) => {
      console.log(res);
      closeModal();
      showToast("success", t("msg.removeAccountTypeMsg"));
      fetchData();
    }).catch((err) => {
      console.log(err);
      showToast("error", t("msg.errorMessage"))
    })
  }

  const handleDeleteModal = (id) => {
    setDeleteModalState({ isOpen: true, PaccountId: id });
  };
  const closeModal = () => setDeleteModalState({ isOpen: false, PaccountId: null });

  const handleEditModal = (row) => {
    console.log(row);
    const formattedData = {
      id: row.id,
      payment_account_category_id: row?.payment_account_category_id,
      payment_account_number: row?.payment_account_number,
      payment_account_description_ar: row?.pms_payment_account_ar?.payment_account_description_ar,
      payment_account_description_en:row?.pms_payment_account_en?.payment_account_description_en

    };
    setEditModalState({ isOpen: true, rowData: formattedData });
    console.log(formattedData);
    
  };
  const closeEditModal = () => {
    setEditModalState({ isOpen: false, rowData: null });
    fetchData();
  };
  const columnsConfig = [
    {
      name: t("englishName"),
      visible: true,
      selector: (row) => row?.pms_payment_account_en?.payment_account_description_en,
      sortable: true,
      reorder: true,
      cell: (row) => (
        <div className="d-flex justify-content-between align-items-center w-100">
          <div className="w-50">
            {row?.pms_payment_account_en?.payment_account_description_en}
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
      selector: (row) => row.pms_payment_account_ar?.payment_account_description_ar,
      sortable: true, visible: true,
    },
  ];
  const fetchBranchesForSelectedPaymentAccount = (PaccountId) => {
    axios.get(`${baseUrlPms}/payment_account_branch/all/`, {
      params: {
        payment_account_id: PaccountId,
        organization_id: organization_id
      },
      headers: Headers
    }).then((res) => {
      const branchesInfo = res.data.map((branch) => branch.branch_info.pms_branch_en.branch_name_en);
      const IdforPaymentAccount = res.data.map((id) => id.id)
      setCollectedId(IdforPaymentAccount);
      setBranchesTags(branchesInfo);
    }).catch((error) => {
      console.log(error);
    })
  }
  const filterFn = (row) =>

    row?.pms_payment_account_en?.payment_account_description_en &&
    row?.pms_payment_account_ar?.payment_account_description_ar


  return (


    <>
      <DynamicSectionForTabs
        data={data}
        fetchData={fetchData}
        createComponent={<CreatePaymentAccount refetch={fetchData} />}
        translationKey="paymentTab.paymentAccount.paymentAccount"
        columnsConfig={columnsConfig}
        filterFn={filterFn}
      />
      {deleteModalState.isOpen && (
        <DeleteModal
          show={deleteModalState.isOpen}
          closeModal={closeModal}
          fun={deletePaymentAccount}
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
            <CreatePaymentAccount
              key={editModalState.rowData?.id || "new"}
              initialData={editModalState.rowData}
              onClose={closeEditModal}
              isEditMode={true}
              fetchBranchesForSelectedPaymentAccount={fetchBranchesForSelectedPaymentAccount}
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

export default PaymentAccount;
