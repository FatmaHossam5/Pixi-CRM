import React, { useContext, useEffect } from 'react'
import {AuthContext} from '../../Helpers/Context/AuthContext'
import {ToastContext} from '../../Helpers/Context/ToastContext '
import { useTranslation } from 'react-i18next';
import {useData} from '../../Helpers/Context/useData'
import { useForm } from 'react-hook-form';
import useModalState from '../../Helpers/Hook/useModalState';
import useFetchBranches from '../../Helpers/Hook/useFetchBranches';
import axios from 'axios';
import DropdownActions from '../DropdownActions/DropdownActions'
import ConfigurableTable from '../ConfigurableTable/ConfigurableTable';
import ModalWrapper from '../ModalWrapper/ModalWrapper';
import DeleteModal from '../DeleteModal/DeleteModal'
export default function UnifiedSection({ sectionType, endpoint, fetchBranchesUrl,filterFn,getColumnsFn}) {
    console.log(getColumnsFn);
    
    const { baseUrlPms, Headers } = useContext(AuthContext);
    const { showToast } = useContext(ToastContext);
    const { t } = useTranslation();
    const { data, fetchData } = useData();
    const { reset } = useForm({ mode: "all" });
    const { modalState: deleteModalState, openModal: openDeleteModal, closeModal: closeDeleteModal } = useModalState();
    const { modalState: editModalState, openModal: openEditModal, closeModal: closeEditModal } = useModalState();
    const { branchesTags, collectedId, fetchBranches } = useFetchBranches(fetchBranchesUrl,
        { organization_id: localStorage.getItem("organization_id") }, Headers);


    useEffect(() => {
        fetchBranches();
    }, []);

  const deleteEntity = () => {
    const { data: { id } } = deleteModalState;
    if (!id) return;
    axios
      .delete(`${baseUrlPms}/${sectionType}/${id}/delete/`, { headers: Headers })
      .then(() => {
        showToast("success", t(`msg.remove${sectionType}Msg`));
        closeDeleteModal();
        fetchData();
      })
      .catch((error) => console.error("Error deleting entity:", error));
  };
//   const getColumns = () => [
//     {
//       name: t("englishName"),
//       selector: (row) =>row?.pms_room_type_en?.room_type_name_en
//       ,
//       sortable: true,
//       visible:true,
//       cell: (row) => (
//         <div className="d-flex justify-content-between align-items-center w-100">
//           <div>{row.pms_room_type_en?.room_type_name_en}</div>
//           <DropdownActions
//             onDelete={() => openDeleteModal(row)}
//             onEdit={() => openEditModal(row)}
//           />
//         </div>
//       ),
//     },
//     { name: t("arabicName"), selector: (row) => row.pms_room_type_ar.room_type_name_ar
        
//     , sortable: true, visible:true,
//     },
//   ];

console.log(data);
const getColumns=getColumnsFn(t, openDeleteModal, openEditModal)
console.log(getColumns);

    return (
       <>
       <ConfigurableTable
         data={data}
         fetchData={fetchData}
         filterFn={filterFn}
         getColumns={getColumns} 
         endpoint={endpoint}
       
       
       />
         {deleteModalState.isOpen && (
        <DeleteModal
          show={deleteModalState.isOpen}
          closeModal={closeDeleteModal}
          fun={deleteEntity}
        />
      )}
      {editModalState.isOpen && (
        <ModalWrapper isOpen={editModalState.isOpen} onClose={closeEditModal} title={t(`edit${sectionType}`)}>
          {/* Pass form component */}
        </ModalWrapper>
      )}
       </>
    )
}
