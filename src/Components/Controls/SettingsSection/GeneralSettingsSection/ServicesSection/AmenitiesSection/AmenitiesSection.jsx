import { useContext, useState } from "react";
import { AuthContext } from "../../../../../Helpers/Context/AuthContext";
import ReusableSection from "../../../../../Shared/ReusableSection/ReusableSection";
import DropdownActions from "../../../../../Shared/DropdownActions/DropdownActions";
import { useData } from "../../../../../Helpers/Context/useData";
import DeleteModal from "../../../../../Shared/DeleteModal/DeleteModal";
import axios from "axios";
import { ToastContext } from "../../../../../Helpers/Context/ToastContext ";
import { useTranslation } from "react-i18next";
import { Modal } from "react-bootstrap";
import CreateAmenity from "./CreateAmenity";
import { useForm } from "react-hook-form";

const AmenitiesSection = () => {

  const { baseUrlPms, Headers } = useContext(AuthContext);
  // API endpoint for fetching  amenties
  const { data, fetchData } = useData();
  const [deleteModalState, setDeleteModalState] = useState({
    isOpen: false,
    amenityId: null
  });
  const [editModalState, setEditModalState] = useState({
    isOpen: false,
    isEditMode: true,
    rowData: null
  })
  const { showToast } = useContext(ToastContext);
  const { t } = useTranslation();
  const { reset } = useForm({ mode: "all" });
  

  const handleDeleteModal = (id) => {
    console.log(id);

    setDeleteModalState({ isOpen: true, amenityId: id })
  }
  const closeModal=()=>{
    setDeleteModalState({isOpen:false,amenityId:null})
    fetchData();
  }
const deleteAmenity=()=>{
  const{amenityId}=deleteModalState;
  axios.delete(`${baseUrlPms}/amenity/${amenityId}/delete/`,{headers:Headers}).then((res)=>{
    console.log(res);
    showToast("success", t("msg.removeAmenityMsg"));
    closeModal();
    fetchData();
  }).catch((error)=>{
    console.log(error);
    
  })
};
const handleEditModal =(row)=>{
  const formattedData={
    id:row.id,
    amenity_name_ar: row?.pms_amenity_ar?.amenity_name_ar||"",
    amenity_name_en: row?.pms_amenity_en?.amenity_name_en||"",
    amenity_description_en:row?.pms_amenity_en?.amenity_description_en||"",
    amenity_description_ar:row?.pms_amenity_ar?.amenity_description_ar||""
  }
  setEditModalState({
    isOpen:true,
    rowData:formattedData
  })
  
}
const closeEditModal =()=>{
  setEditModalState({
    isOpen:false,
    rowData:null
  });
  fetchData();
}
  // Filter function to validate row data before rendering
  const filterFn = (row) => row?.pms_amenity_en?.amenity_name_en &&
    row?.pms_amenity_ar?.amenity_name_ar
  const getColumns = (t) => [
    {
      name: t("englishName"),
      visible: true,
      selector: (row) => row.pms_amenity_en.amenity_name_en,
      sortable: true,
      // grow: 2,
      reorder: true,
      cell: (row) => (
        <div className="d-flex justify-content-between align-items-center w-100">
          <div className="w-50">{row.pms_amenity_en.amenity_name_en}</div>
          <DropdownActions
         onDelete={()=>handleDeleteModal(row.id)}
         onEdit={()=>handleEditModal(row)}
          />
        </div>
      ),
    },

    {
      name: t("arabicName"),
      selector: (row) => row.pms_amenity_ar.amenity_name_ar,
      sortable: true,
      visible: true,
    },
    {
      name: t("English Description"),
      selector: (row) => row?.pms_amenity_en?.amenity_description_en,
      sortable: true,
      visible: true,
    },
    {
      name: t("Arabic Description"),
      selector: (row) => row?.pms_amenity_ar?.amenity_description_ar,
      sortable: true,
      visible: true,
    },
  ];





  return (
    <>
      {/* ReusableSection for rendering the table with provided configurations */}
      <ReusableSection
        endpoint='amenity/all/'
        filterFn={filterFn}
        getColumns={getColumns}
        data={data}
        fetchData={fetchData}
      />
      {deleteModalState.isOpen &&
       <DeleteModal
        show={deleteModalState.isOpen}
        closeModal={closeModal}
        fun={deleteAmenity}
        

      />}

{editModalState.isOpen && (
        <Modal show={editModalState.isOpen} onHide={closeEditModal} centered >
          <Modal.Header closeButton>
            <h4>
              Edit Amenity
            </h4>
          </Modal.Header>
          <Modal.Body>
            <CreateAmenity
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

export default AmenitiesSection;
