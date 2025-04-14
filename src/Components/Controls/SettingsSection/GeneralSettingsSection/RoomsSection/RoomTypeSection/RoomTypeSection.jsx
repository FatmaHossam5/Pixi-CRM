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
import CreateRoomType from "./CreateRoomType";
const RoomTypeSection = () => {
  const { baseUrlPms, Headers } = useContext(AuthContext);
  const organization_id = localStorage.getItem('organization_id');
  const [branchesTags, setBranchesTags] = useState([]);
  const [collectedId, setCollectedId] = useState([]);
  const { reset } = useForm({ mode: "all" });
  const { showToast } = useContext(ToastContext);
  const { t } = useTranslation();
  const { data, fetchData } = useData();
  // Custom hook for branch selection
console.log(branchesTags);
console.log(collectedId);
  // Modal state for deletion
  const [deleteModalState, setDeleteModalState] = useState({
    isOpen: false,
    roomId: null,
  });
  const [editModalState, setEditModalState] = useState({
    isOpen: false,
    rowData: null,
    isEditMode: true
  });
  const fetchBranchesForSelectedRoomType = (roomTypeId) => {
    axios.get(`${baseUrlPms}/room_type_branch/all/`, {
      params: {
        room_type_id: roomTypeId,
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
      room_type_name_en: row?.pms_room_type_en?.room_type_name_en || "",
      room_type_name_ar: row?.pms_room_type_ar?.room_type_name_ar || "",
    };
    setEditModalState({ isOpen: true, rowData: formattedData });
  };
  // Function to close the edit modal
  const closeEditModal = () => {
    setEditModalState({ isOpen: false, rowData: null });
    fetchData();
  };
 
  const deleteRoomType = () => {
    const { roomId } = deleteModalState;
    if (!roomId) return;
    axios
      .delete(`${baseUrlPms}/room_type/${roomId}/delete/`, { headers: Headers })
      .then(() => {
        showToast("success", t("msg.removeroomTypeMsg"));
        closeModal();
        fetchData();
      })
      .catch((error) => {
        console.error("Error deleting room type:", error);
        // Add user feedback here, e.g., a toast message
      });
  };
  // Filter function for reusable section
  const filterFn = (row) =>
    row?.pms_room_type_en?.room_type_name_en &&
    row?.pms_room_type_ar?.room_type_name_ar;
  // const closeModal=()=>setIsDeleteOpen(false)
  const getColumns = () => [    {
    name: ("englishName"),
    visible: true,
    selector: (row) => row?.pms_room_type_en?.room_type_name_en,
    sortable: true,
    reorder: true,
   
    cell: (row) => (
      <div className="d-flex justify-content-between align-items-center w-100">
        <div className="w-50">{row?.pms_room_type_en?.room_type_name_en}</div>
        <DropdownActions
            onDelete={() => handleDeleteModal(row.id)}
            onEdit={() => handleEditModal(row)}
            />
            </div>
          ),
        },  {
          name: ("arabicName"), 
          selector: (row) => row.pms_room_type_ar?.room_type_name_ar,
          sortable: true,
          visible: true,
        },
      ];
      useEffect(() => { fetchBranchesForSelectedRoomType() }, [])
      return (
        <>
          {/* ReusableSection for rendering the table with provided configurations */}
          <ReusableSection
            data={data}
            filterFn={filterFn}
            getColumns={getColumns}
            endpoint='room_type/all/'
            fetchData={fetchData}
          />
          {deleteModalState.isOpen && (
            <DeleteModal
              show={deleteModalState.isOpen}
              closeModal={closeModal}
              fun={deleteRoomType}
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
                <CreateRoomType
                  key={editModalState.rowData?.id || "new"}
                  initialData={editModalState.rowData}
                  onClose={closeEditModal}
                  isEditMode={true}
                  fetchBranchesForSelectedRoomType={fetchBranchesForSelectedRoomType}
                  branchesTags={branchesTags}
                  collectedId={collectedId}
                  reset={reset}
                  setCollectedId={setCollectedId}
                 
                />
              </Modal.Body>
            </Modal>
          )}    </>
        );
      };
      
      export default RoomTypeSection;