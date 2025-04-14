import { useContext, useEffect, useState  } from "react";
import { AuthContext } from "../../../../../Helpers/Context/AuthContext";
import DropdownActions from "../../../../../Shared/DropdownActions/DropdownActions";
import ReusableSection from "../../../../../Shared/ReusableSection/ReusableSection";
import { useData } from "../../../../../Helpers/Context/useData";
import { useForm } from "react-hook-form";
import axios from "axios";
import { ToastContext } from "../../../../../Helpers/Context/ToastContext ";
import { useTranslation } from "react-i18next";
import DeleteModal from "../../../../../Shared/DeleteModal/DeleteModal";
import { Modal } from "react-bootstrap";
import CreateCategory from "./CreateCategory";


const CategorySection = () => {

  const { baseUrlPms, Headers } = useContext(AuthContext);
  // API endpoint for fetching category
  const { data, fetchData } = useData('category/all/', Headers);

  const [deleteModalState, setDeleteModalState] = useState({
    isOpen: false,
    categoryId: null,
  });
  const [editModalState, setEditModalState] = useState({
    isOpen: false,
    rowData: null,
    isEditMode: true
  });

  const [branchesTags, setBranchesTags] = useState([]);
  const [collectedId, setCollectedId] = useState([]);
  const { reset } = useForm({ mode: "all" });
  const { showToast } = useContext(ToastContext);
  const { t } = useTranslation();

  const closeModal = () => setDeleteModalState({ isOpen: false, categoryId: null });

  // Handle delete modal open
  const handleDeleteModal = (id) => {
    setDeleteModalState({ isOpen: true, categoryId: id });
  };


  // Function to open the edit modal with row data
  const handleEditModal = (row) => {
    console.log(row);

    const formattedData = {
      id: row.id,
      category_name_ar: row.pms_category_ar?.category_name_ar || "",
      category_name_en: row.pms_category_en?.category_name_en || "",
    


    };
    setEditModalState({ isOpen: true, rowData: formattedData });
  };
  // Function to close the edit modal
  const closeEditModal = () => {
    setEditModalState({ isOpen: false, rowData: null });
    fetchData();

  };







  // Filter function to validate row data before rendering
  const filterFn = (row) => row?.pms_category_en?.category_name_en &&
    row?.pms_category_ar?.category_name_ar;

  // data of table
  const getColumns = (t) => [
    {
      name: t("englishName"),
      visible: true,
      selector: (row) => row?.pms_category_en?.category_name_en,
      sortable: true,
      reorder: true,
      cell: (row) => (
        <div className="d-flex justify-content-between align-items-center w-100">
          <div className="w-50">{row?.pms_category_en?.category_name_en}</div>
          <DropdownActions
          
          onDelete={() => handleDeleteModal(row.id)}
            onEdit={() => handleEditModal(row)}
          />
        </div>
      ),
    },

    {
      name: t("arabicName"),
      selector: (row) => row?.pms_category_ar?.category_name_ar,
      sortable: true, visible: true,
    },
  ];

  const deleteCategory = () => {
    const { categoryId } = deleteModalState;
    if (!categoryId) return;

    axios
      .delete(`${baseUrlPms}/category/${categoryId}/delete/`, { headers: Headers })
      .then(() => {
        showToast("success", t("msg.removeCategoryMsg"));
        closeModal();
        fetchData();
      })
      .catch((error) => {
        console.error("Error deleting room type:", error);
        // Add user feedback here, e.g., a toast message
      });
  };
  const fetchBranchesForSelectedCategory = (categoryId) => {
    axios.get(`${baseUrlPms}/category_branch/all/`, {
      params: {
        category_id: categoryId,
      
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
    fetchBranchesForSelectedCategory()
  }, [])
  return (
    <>
      {/* ReusableSection for rendering the table with provided configurations */}
      <ReusableSection
       data={data}
        filterFn={filterFn}
        getColumns={getColumns}

      />
         {deleteModalState.isOpen && (
        <DeleteModal
          show={deleteModalState.isOpen}
          closeModal={closeModal}
          fun={deleteCategory}
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
            <CreateCategory
              key={editModalState.rowData?.id || "new"}
              initialData={editModalState.rowData}
              onClose={closeEditModal}
              isEditMode={true}
            fetchBranchesForSelectedCategory={fetchBranchesForSelectedCategory}
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

export default CategorySection;
