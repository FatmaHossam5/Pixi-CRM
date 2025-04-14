import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { AuthContext } from "../../../../Helpers/Context/AuthContext";
import { ToastContext } from "../../../../Helpers/Context/ToastContext ";
import DeleteModal from "../../../../Shared/DeleteModal/DeleteModal";
import DropdownActions from "../../../../Shared/DropdownActions/DropdownActions";
import DynamicSectionForTabs from "../../../../Shared/DynamicSectionForTabs/DynamicSectionForTabs";
import CreateAccountType from "./CreateAccountType";
const AccountType = () => {
  const { t } = useTranslation();
  const [deleteModalState, setDeleteModalState] = useState({
    isOpen: false,
    PaccountTypeId: null,
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
    setDeleteModalState({ isOpen: true, PaccountTypeId: id });
  };
  const closeModal = () => setDeleteModalState({ isOpen: false, PaccountTypeId: null });
  const fetchData = () => {
    axios.get(`${baseUrlPms}/account_type/all/`, { headers: Headers })
      .then(res => setData(res.data))
      .catch(err => console.log(err));
  };

  useEffect(() => {
    fetchData();
  }, []);
  const handleEditModal = (row) => {
console.log(row);


    const formattedData = {
      id: row.id,
      account_type_name_en: row?.pms_account_type_en
      ?.account_type_name_en || "",
      account_type_name_ar: row?.pms_account_type_ar?.account_type_name_ar || "",
    };
    setEditModalState({ isOpen: true, rowData: formattedData });
  };
  const columnsConfig = [
    {
      name: t("englishName"),
      visible: true,
      selector: (row) => row?.pms_account_type_en?.account_type_name_en,
      sortable: true,
      reorder: true,
      cell: (row) => (
        <div className="d-flex justify-content-between align-items-center w-100">
          <div className="w-50">
            {row?.pms_account_type_en?.account_type_name_en}
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
      selector: (row) => row.pms_account_type_ar?.account_type_name_ar,
      sortable: true, visible: true,
    },
  ];

  const filterFn = (row) =>

    row?.pms_account_type_en?.account_type_name_en &&
    row.pms_account_type_ar?.account_type_name_ar


  const deleteAccountType = () => {
    const { PaccountTypeId } = deleteModalState;
    if (!PaccountTypeId) return;
    axios.delete(`${baseUrlPms}/account_type/${PaccountTypeId}/delete`, { headers: Headers }).then((res) => {
      console.log(res);
      closeModal();
      showToast("success", t("msg.removeAccountTypeMsg"));
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
  const fetchBranchesForSelectedAccountType = (PaccountTypeId) => {
    axios.get(`${baseUrlPms}/account_type_branch/all/`, {
      params: {
        account_type_id: PaccountTypeId,
        organization_id: organization_id
      },
      headers: Headers
    }).then((res) => {
      const branchesInfo = res.data.map((branch) => branch.branch_info.pms_branch_en.branch_name_en);
      const IdforAccountType = res.data.map((id) => id.id)
      setCollectedId(IdforAccountType);
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
        createComponent={<CreateAccountType refetch={fetchData} />}
        translationKey="paymentTab.accountType"
        columnsConfig={columnsConfig}
        filterFn={filterFn}
      />
      {deleteModalState.isOpen && (
        <DeleteModal
          show={deleteModalState.isOpen}
          closeModal={closeModal}
          fun={deleteAccountType}
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
            <CreateAccountType
              key={editModalState.rowData?.id || "new"}
              initialData={editModalState.rowData}
              onClose={closeEditModal}
              isEditMode={true}
              fetchBranchesForSelectedAccountType={fetchBranchesForSelectedAccountType}
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

export default AccountType;
