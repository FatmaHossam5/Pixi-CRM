import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../../../Helpers/Context/AuthContext";
import DropdownActions from "../../../../../Shared/DropdownActions/DropdownActions";
import ReusableSection from "../../../../../Shared/ReusableSection/ReusableSection";
import { useData } from "../../../../../Helpers/Context/useData";
import DeleteModal from "../../../../../Shared/DeleteModal/DeleteModal";
import axios from "axios";
import { ModalContext } from "../../../../../Helpers/Context/ModalContext";
import { ToastContext } from "../../../../../Helpers/Context/ToastContext ";
import { useTranslation } from "react-i18next";
import { Modal } from "react-bootstrap";
import CreateAddOn from "./CreateAddOn";
import { error } from "jquery";
import { useForm } from "react-hook-form";
import { useAddOns } from "../../../../../Helpers/Context/AddOnsContext";

const AddonsSection = () => {


  const { baseUrlPms, Headers, setIsLoading } = useContext(AuthContext);
  const { mergedData, fetchAndMergeData, setMergedData } = useAddOns();
  const [deleteModalState, setDeleteModalState] = useState({
    isOpen: false,
    AddOnId: null
  })
  const [editModalState, setEditModalState] = useState({
    isOpen: false,
    rowData: null,
    isEditMode: true
  })

  const { showToast } = useContext(ToastContext);
  const { t } = useTranslation();
  const organization_id = localStorage.getItem('organization_id');
  const { reset } = useForm({ mode: "all" });
  const [branchesTags, setBranchesTags] = useState([]);
  const [collectedId, setCollectedId] = useState([]);

  // Filter function to validate row data before rendering
  const filterFn = (row) => row?.pms_addons_en?.addons_name_en && row?.pms_addons_ar?.addons_name_ar;

  const handleDeleteModal = (id) => {
    console.log(id);

    setDeleteModalState({
      isOpen: true,
      AddOnId: id

    })
  }
  const closeModal = () => setDeleteModalState({ isOpen: false, AddOnId: null });



  // Function to open the edit modal with row data
  const handleEditModal = (row) => {
    const formattedData = {
      id: row.id,
      addons_name_en: row?.pms_addons_en.addons_name_en || "",
      addons_description_en: row?.pms_addons_en?.addons_description_en || "",
      addons_name_ar: row?.pms_addons_ar?.addons_name_ar || "",
      addons_description_ar: row?.pms_addons_ar?.addons_description_ar || "",
      addon_price: row.addon_price || 0,
      availability: row.availability,
      is_require_dependant: row.is_require_dependant
    };
    setEditModalState({ isOpen: true, rowData: formattedData });
  };

  // Function to close the edit modal
  const closeEditModal = () => {
    setEditModalState({ isOpen: false, rowData: null });
    fetchAndMergeData();

  };





  const deleteAddOn = () => {
    const { AddOnId } = deleteModalState;
    axios
      .delete(`${baseUrlPms}/addons/${AddOnId}/delete/`, { headers: Headers })
      .then(() => {
        setMergedData((prev) => prev.filter((addon) => addon.id !== AddOnId)); // Remove item from mergedData
        showToast("success", t("msg.removeAddOnMsg"));
        closeModal();
      })
      .catch((error) => {
        console.error("Error deleting add-on:", error);
        showToast("error", t("msg.errorMessage"));
      });
  };

  const getColumns = (t) => [
    {
      name: t("Add On English Name"),
      visible: true,
      selector: (row) => row.pms_addons_en.addons_name_en,
      sortable: true,
      reorder: true,
      cell: (row) => (
        <div className="d-flex justify-content-between align-items-center w-100">
          <div className="w-50">{row.pms_addons_en.addons_name_en}</div>
          <DropdownActions onDelete={() => handleDeleteModal(row.id)}
            onEdit={() => handleEditModal(row)} />
        </div>
      ),
    },

    {
      name: t("Add On Arabic Name"),
      selector: (row) => row.pms_addons_ar.addons_name_ar,
      sortable: true, visible: true,
    },
    {
      name: t("Add On Price"),
      selector: (row) => row.addon_price,
      sortable: true, visible: true,

    },
  ];



  const fetchBranchesForSelectedAddOn = (addOnId) => {
    axios.get(`${baseUrlPms}/addons_branch/all/`, {
      params: {
        addons_id: addOnId,
        organization_id: organization_id
      },
      headers: Headers
    }).then((res) => {

      const branchesInfo = res.data.map((branch) => branch.branch_info.pms_branch_en.branch_name_en);
      const Idforoomtypeandbranch = res.data.map((id) => id.id)
      setCollectedId(Idforoomtypeandbranch);
      setBranchesTags(branchesInfo);
    }).catch((error) => {
      console.log(error);

    })
  }
  // Fetch initial data
  useEffect(() => {
    fetchAndMergeData();
  }, []);
  return (
    <>
      {/* ReusableSection for rendering the table with provided configurations */}
      <ReusableSection
        key={mergedData.length} // Change the key when data changes to force re-render

        filterFn={filterFn}
        getColumns={getColumns}
        fetchData={fetchAndMergeData}
        data={mergedData} />

      {deleteModalState.isOpen && <DeleteModal
        show={deleteModalState.isOpen}
        closeModal={closeModal}
        fun={deleteAddOn}

      />}
      {editModalState.isOpen && (
        <Modal show={editModalState.isOpen} onHide={closeEditModal} centered >
          <Modal.Header closeButton>
            <h4>
              Edit Room Type
            </h4>
          </Modal.Header>
          <Modal.Body>
            <CreateAddOn
              key={editModalState.rowData?.id || "new"}
              initialData={editModalState.rowData}
              onClose={closeEditModal}
              isEditMode={true}
              fetchBranchesForSelectedAddOn={fetchBranchesForSelectedAddOn}
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

export default AddonsSection;
