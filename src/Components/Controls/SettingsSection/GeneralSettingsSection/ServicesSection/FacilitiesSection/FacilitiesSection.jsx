import { useContext, useState } from "react";
import { AuthContext } from "../../../../../Helpers/Context/AuthContext";
import ReusableSection from "../../../../../Shared/ReusableSection/ReusableSection";
import DropdownActions from "../../../../../Shared/DropdownActions/DropdownActions";
import { useData } from "../../../../../Helpers/Context/useData";
import DeleteModal from "../../../../../Shared/DeleteModal/DeleteModal";
import axios from "axios";
import { ToastContext } from "../../../../../Helpers/Context/ToastContext ";
import { useTranslation } from "react-i18next";
import CreateFacilitiesSection from "./CreateFacility";
import { useForm } from "react-hook-form";
import { Modal } from "react-bootstrap";

const FacilitiesSection = () => {

  const { baseUrlPms, Headers } = useContext(AuthContext);
  const { data, fetchData } = useData();
  const[deleteModalState,setDeleteModalState]=useState({
   isOpen:false,
   facilityId:null
  });
  const [editModalState, setEditModalState] = useState({
    isOpen: false,
    rowData: null,
    isEditMode: true
  });
  const { showToast } = useContext(ToastContext);
  const { t } = useTranslation();
  const { reset } = useForm({ mode: "all" });

    // Filtering function to validate facility rows
    const filterFn = (row) => 
      row?.pms_facility_en?.facility_name_en &&
      row?.pms_facility_ar?.facility_name_ar 
    
 // Define columns for the facilities table
const handleDeleteModal=(id)=>{
setDeleteModalState({isOpen:true,facilityId:id})
}
const closeModal=()=>{
  setDeleteModalState({isOpen:false,facilityId:null})
  fetchData();
}
const deleteFacility=()=>{
  const{facilityId}=deleteModalState;
  if (!facilityId) return;
  axios.delete(`${baseUrlPms}/facility/${facilityId}/delete/`,{headers:Headers}).then((res)=>{
    showToast("success", t("msg.removeFacilityMsg"));
    closeModal();
    fetchData();
    
  })
}

 // Function to open the edit modal with row data
 const handleEditModal = (row) => {
  const formattedData = {
    id: row.id,
    facility_name_en: row?.pms_facility_en?.facility_name_en || "",
    facility_name_ar: row?.pms_facility_ar?.facility_name_ar || "",
    facility_description_en:row?.pms_facility_en?.facility_description_en||"",
    facility_description_ar:row?.pms_facility_ar?.facility_description_ar||""

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
      selector: (row) => row?.pms_facility_en?.facility_name_en,
      sortable: true,
      reorder: true,
      cell: (row) => (
        <div className="d-flex justify-content-between align-items-center w-100">
          <div className="w-50">{row?.pms_facility_en?.facility_name_en}</div>
          <DropdownActions 
          onDelete={()=>handleDeleteModal(row.id)}
          onEdit={()=>handleEditModal(row)}
            />
        </div>
      ),
    },

    {
      name: t("arabicName"),
      selector: (row) => row?.pms_facility_ar?.facility_name_ar,
      sortable: true, visible: true,
    },
    {
      name: t("English Description"),
      selector: (row) => row?.pms_facility_en?.facility_description_en,
      sortable: true, visible: true,
    },
    {
      name: t("Arabic Description"),
      selector: (row) => row?.pms_facility_ar?.facility_description_ar,
      sortable: true, visible: true,
    },
  ];
 


  return (
    <>
      <ReusableSection endpoint='facility/all/'
       filterFn={filterFn} 
       getColumns={getColumns}
       fetchData={fetchData}
       data={data}
        />
        {deleteModalState.isOpen&&
        <DeleteModal
        show={deleteModalState.isOpen}
        closeModal={closeModal}
        fun={deleteFacility}
        />}
      
      {editModalState.isOpen && (
        <Modal show={editModalState.isOpen} onHide={closeEditModal} centered >
          <Modal.Header closeButton>
            <h4>
              Edit Facility
            </h4>
          </Modal.Header>
          <Modal.Body>
            <CreateFacilitiesSection
              key={editModalState.rowData?.id || "new"}
              initialData={editModalState.rowData}
              onClose={closeEditModal}
              isEditMode={true}
              reset={reset}
            />
          </Modal.Body>
        </Modal>
      )}
    </>
  );
};

export default FacilitiesSection;
