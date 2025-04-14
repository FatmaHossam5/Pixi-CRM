import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../../../Helpers/Context/AuthContext";
import DropdownActions from "../../../../../Shared/DropdownActions/DropdownActions";
import ReusableSection from "../../../../../Shared/ReusableSection/ReusableSection";
import { useData } from "../../../../../Helpers/Context/useData";
import DeleteModal from "../../../../../Shared/DeleteModal/DeleteModal";
import { Modal } from "react-bootstrap";
import CreateVendor from "./CreateVendor";
import axios from "axios";
import { ToastContext } from "../../../../../Helpers/Context/ToastContext ";
import { useTranslation } from "react-i18next";
import { useForm } from "react-hook-form";

const VendorSection = () => {

  const { baseUrlPms, Headers } = useContext(AuthContext);
  const [deleteModalState, setDeleteModalState] = useState({
    isOpen: false,
    vendorId: null,
  });
  const [editModalState, setEditModalState] = useState({
    isOpen: false,
    rowData: null,
    isEditMode: true
  });
  const { showToast } = useContext(ToastContext);
  const { t } = useTranslation();
  const { data, fetchData } = useData('vendor/all/', Headers);
console.log(data);
  const [branchesTags, setBranchesTags] = useState([]);
  const [collectedId, setCollectedId] = useState([]);
  const { reset } = useForm({ mode: "all" });
  // Filter function to validate row data before rendering
  const filterFn = (row) => {
    console.log(row);

    return row?.pms_vendor_en?.vendor_name_en && row?.pms_vendor_ar?.vendor_name_ar;
  }

  // Close delete modal
  const closeModal = () => setDeleteModalState({ isOpen: false, vendorId: null });

  // Handle delete modal open
  const handleDeleteModal = (id) => {
    setDeleteModalState({ isOpen: true, vendorId: id });
  };


  // Function to open the edit modal with row data
  const handleEditModal = (row) => {
    console.log(row);

    const formattedData = {
      id: row.id,
      vendor_name_ar: row.pms_vendor_ar?.vendor_name_ar || "",
      vendor_name_en: row.pms_vendor_en?.vendor_name_en || "",
      vendor_whatsapp_phone: row?.vendor_whatsapp_phone || "",
      vendor_email: row?.vendor_email || "",
      vendor_mobile: row?.vendor_mobile || ""


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
      selector: (row) => row?.pms_vendor_en?.vendor_name_en,
      sortable: true,
      reorder: true,
      cell: (row) => (
        <div className="d-flex justify-content-between align-items-center w-100">
          <div className="w-50">{row?.pms_vendor_en?.vendor_name_en}</div>
          <DropdownActions onDelete={() => handleDeleteModal(row.id)}
            onEdit={() => handleEditModal(row)}
          />
        </div>
      ),
    },

    {
      name: t("arabicName"),
      selector: (row) => row?.pms_vendor_ar?.vendor_name_ar,
      sortable: true,
      visible: true,
    }


  ];

  const deleteVendor = () => {
    const { vendorId } = deleteModalState;
    if (!vendorId) return;

    axios
      .delete(`${baseUrlPms}/vendor/${vendorId}/delete/`, { headers: Headers })
      .then(() => {
        showToast("success", t("msg.removeVendorMsg"));
        closeModal();
        fetchData();
      })
      .catch((error) => {
        console.error("Error deleting room type:", error);
        // Add user feedback here, e.g., a toast message
      });
  };
  const fetchBranchesForSelectedVendor = (vendorId) => {
    axios.get(`${baseUrlPms}/vendor_branch/all/`, {
      params: {
        vendor_id: vendorId,
      
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

  useEffect(() => {
    fetchBranchesForSelectedVendor()
  }, [])
  return (
    <>
      {/* ReusableSection for rendering the table with provided configurations */}
      <ReusableSection

        filterFn={filterFn}
        getColumns={getColumns}
        data={data}
        fetchData={fetchData}

      />
      {deleteModalState.isOpen && (
        <DeleteModal
          show={deleteModalState.isOpen}
          closeModal={closeModal}
          fun={deleteVendor}
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
            <CreateVendor
              key={editModalState.rowData?.id || "new"}
              initialData={editModalState.rowData}
              onClose={closeEditModal}
              isEditMode={true}
            fetchBranchesForSelectedVendor={fetchBranchesForSelectedVendor}
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

export default VendorSection;
