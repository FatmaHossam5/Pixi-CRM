import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { AuthContext } from "../../../../../Helpers/Context/AuthContext";
import { ToastContext } from "../../../../../Helpers/Context/ToastContext ";
import { useData } from "../../../../../Helpers/Context/useData.jsx";
import DeleteModal from "../../../../../Shared/DeleteModal/DeleteModal";
import DropdownActions from "../../../../../Shared/DropdownActions/DropdownActions";
import ReusableSection from "../../../../../Shared/ReusableSection/ReusableSection";
import CreateRoomView from "./CreateRoomView";

const RoomViewSection = () => {

  const { data, fetchData } = useData();
  const [deleteModalState, setDeleteModalState] = useState({
    isOpen: false,
    roomId: null,
  });
  const [editModalState, setEditModalState] = useState({
    isOpen: false,
    rowData: null,
    isEditMode: true
  });
  const { showToast } = useContext(ToastContext);
  const { baseUrlPms, Headers } = useContext(AuthContext);
  const { t } = useTranslation();
  const Hotel_id = localStorage.getItem('Hotel_id');
  const [branchesTags, setBranchesTags] = useState([]);
  const [collectedId, setCollectedId] = useState([]);
  const { reset } = useForm({ mode: "all" });

  // Close delete modal
  const closeModal = () => setDeleteModalState({ isOpen: false, roomId: null });

  // Handle delete modal open
  const handleDeleteModal = (id) => {
    setDeleteModalState({ isOpen: true, roomId: id });
  };


  // Function to open the edit modal with row data
  const handleEditModal = (row) => {
    const formattedData = {
      id: row.id,
      view_type_name_ar: row.pms_view_type_ar?.view_type_name_ar || "",
      view_type_name_en: row.pms_view_type_en?.view_type_name_en || "",
    };
    setEditModalState({ isOpen: true, rowData: formattedData });
  };
  // Function to close the edit modal
  const closeEditModal = () => {
    setEditModalState({ isOpen: false, rowData: null });
    fetchData();

  };

  // Filter function to validate row data before rendering
  const filterFn = (row) =>
    row?.pms_view_type_en?.view_type_name_en &&
    row?.pms_view_type_ar?.view_type_name_ar

  const getColumns = (t) => [
    {
      name: t("englishName"),
      visible: true,
      selector: (row) => row.pms_view_type_en?.view_type_name_en,
      sortable: true,

      reorder: true,
      cell: (row) => (
        <div className="d-flex justify-content-between align-items-center w-100">
          <div className="w-50">{row.pms_view_type_en?.view_type_name_en}</div>
          <DropdownActions
            onDelete={() => handleDeleteModal(row.id)}
            onEdit={() => handleEditModal(row)}

          />
        </div>
      ),
    },

    {
      name: t("arabicName"),
      selector: (row) => row.pms_view_type_ar?.view_type_name_ar,
      sortable: true,
      visible: true,
    },
  ];

  const deleteRoomView = () => {
    const { roomId } = deleteModalState;
    if (!roomId) return;

    axios
      .delete(`${baseUrlPms}/view_type/${roomId}/delete/`, { headers: Headers })
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
  const fetchBranchesForSelectedRoomView = (roomViewId) => {
    axios.get(`${baseUrlPms}/view_type_branch/all/`, {
      params: {
        view_type_id: roomViewId,
        branch_id__hotel_id: Hotel_id
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
    fetchBranchesForSelectedRoomView()
  }, [])
  return (
    <>
      {/* ReusableSection for rendering the table with provided configurations */}
      <ReusableSection
        data={data}
        filterFn={filterFn}
        getColumns={getColumns}
        endpoint='view_type/all/'
        fetchData={fetchData}
      />
      {deleteModalState.isOpen && (
        <DeleteModal
          show={deleteModalState.isOpen}
          closeModal={closeModal}
          fun={deleteRoomView}
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
            <CreateRoomView
              key={editModalState.rowData?.id || "new"}
              initialData={editModalState.rowData}
              onClose={closeEditModal}
              isEditMode={true}
              fetchBranchesForSelectedRoomView={fetchBranchesForSelectedRoomView}
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

export default RoomViewSection;
