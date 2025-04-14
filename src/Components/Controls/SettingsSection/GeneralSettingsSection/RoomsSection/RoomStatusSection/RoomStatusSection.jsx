import axios from "axios";
import { useData } from "../../../../../Helpers/Context/useData.jsx";
import DropdownActions from "../../../../../Shared/DropdownActions/DropdownActions";
import ReusableSection from "../../../../../Shared/ReusableSection/ReusableSection";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../../../Helpers/Context/AuthContext";
import { ToastContext } from "../../../../../Helpers/Context/ToastContext ";
import DeleteModal from "../../../../../Shared/DeleteModal/DeleteModal";
import { useTranslation } from "react-i18next";
import { Modal } from "react-bootstrap";
import CreateRoomStatus from "./CreateRoomStatus";
import { useForm } from "react-hook-form";

const RoomStatusSection = () => {

  const { data, fetchData } = useData();
  const { baseUrlPms, Headers } = useContext(AuthContext);
  const Hotel_id = localStorage.getItem('Hotel_id');
  const [branchesTags, setBranchesTags] = useState([]);
  const [collectedId, setCollectedId] = useState([]);
  const { showToast } = useContext(ToastContext);
  const { t } = useTranslation();
  const { reset } = useForm({ mode: "all" });
  const [deleteModalState, setDeleteModalState] = useState({
    isOpen: false,
    roomId: null,
  });
  const [editModalState, setEditModalState] = useState({
    isOpen: false,
    rowData: null,
    isEditMode: true
  });

  const filterFn = (row) => row?.pms_room_status_en?.room_status_name_en &&
    row?.pms_room_status_ar?.room_status_name_ar;


  const handleDeleteModal = (id) => {
    setDeleteModalState({ isOpen: true, roomId: id });
  };
  const closeModal = () => setDeleteModalState({ isOpen: false, roomId: null });

    // Function to open the edit modal with row data
    const handleEditModal = (row) => {
      const formattedData = {
        id: row.id,
        room_status_name_ar:   row?.pms_room_status_ar?.room_status_name_ar || "",
        room_status_name_en:row?.pms_room_status_en?.room_status_name_en || "",
      };
      setEditModalState({ isOpen: true, rowData: formattedData });
    };
    // Function to close the edit modal
    const closeEditModal = () => {
      setEditModalState({ isOpen: false, rowData: null });
      fetchData();
  
    };
  const getColumns = (t) => [
    {
      name: t("englishName"),
      visible: true,
      selector: (row) => row.pms_room_status_en.room_status_name_en,
      sortable: true,

      reorder: true,
      cell: (row) => (
        <div className="d-flex justify-content-between align-items-center w-100">
          <div className="w-50">
            {row.pms_room_status_en.room_status_name_en}
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
      selector: (row) => row.pms_room_status_ar.room_status_name_ar,
      sortable: true, visible: true,
    },
    {
      name: t("roomViewTable.color"),
      selector: (row) => (
        <div style={{
          backgroundColor: row.room_status_color,
          width: "20px",
          height: "20px"
        }}>

        </div>
      ),
      sortable: true,
    },
    {
      name: t("roomViewTable.color"),
      visible: true,
      selector: (row) => (
        <div style={{
          backgroundColor: row.room_status_color,
          width: "20px",
          height: "20px"
        }}>

        </div>
      ),
      sortable: true,
    },
  ];
  const deleteRoomStatus = () => {
    const { roomId } = deleteModalState;
    if (!roomId) return;

    axios
      .delete(`${baseUrlPms}/room_status/${roomId}/delete/`, { headers: Headers })
      .then(() => {
        showToast("success", t("msg.removeroomStatusMsg"));
        closeModal();
        fetchData();
      })
      .catch((error) => {
        console.error("Error deleting room type:", error);
        // Add user feedback here, e.g., a toast message
      });
  };
  const fetchBranchesForSelectedRoomStatus = (roomStatusId) => {
    axios.get(`${baseUrlPms}/room_status_branch/all/`, {
      params: {
        view_type_id: roomStatusId,
        branch_id__hotel_id: Hotel_id
      },
      headers: Headers
    }).then((res) => {
      console.log(res);

      const branchesInfo = res.data.map((branch) => branch.branch_info.pms_branch_en.branch_name_en);
      const Idforoomtypeandbranch = res.data.map((id) => id.id)
      setCollectedId(Idforoomtypeandbranch);
      setBranchesTags(branchesInfo);
    }).catch((error) => {
      console.log(error);

    })
  }
  useEffect(() => {
    fetchBranchesForSelectedRoomStatus()
  }, [])
  return (
    <>
      {/* ReusableSection for rendering the table with provided configurations */}
      <ReusableSection
        endpoint='room_status/all/'
        filterFn={filterFn}
        getColumns={getColumns}
        data={data}
        fetchData={fetchData}
      />
      {deleteModalState.isOpen && (
        <DeleteModal
          show={deleteModalState.isOpen}
          closeModal={closeModal}
          fun={deleteRoomStatus}
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
            <CreateRoomStatus
              key={editModalState.rowData?.id || "new"}
              initialData={editModalState.rowData}
              onClose={closeEditModal}
              isEditMode={true}
              fetchBranchesForSelectedRoomStatus={fetchBranchesForSelectedRoomStatus}
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

export default RoomStatusSection;
