import { useContext, useState } from "react";
import { AuthContext } from "../../../../../Helpers/Context/AuthContext";
import DropdownActions from "../../../../../Shared/DropdownActions/DropdownActions";
import ReusableSection from "../../../../../Shared/ReusableSection/ReusableSection";
import { useData } from "../../../../../Helpers/Context/useData";
import { useTranslation } from "react-i18next";
import axios from "axios";
import DeleteModal from "../../../../../Shared/DeleteModal/DeleteModal";
import { ToastContext } from "../../../../../Helpers/Context/ToastContext ";
import { Modal } from "react-bootstrap";
import CreateItem from "./CreateItem";

const ItemSection = () => {
  const { t } = useTranslation();

  const { baseUrlPms, Headers } = useContext(AuthContext);
  const { showToast } = useContext(ToastContext);

  // API endpoint for fetching Product
  const { data, fetchData } = useData('product/all/', Headers);
  const [deleteModalState, setDeleteModalState] = useState({
    isOpen: false,
    itemId: null,
  });

  const [editModalState, setEditModalState] = useState({
    isOpen: false,
    rowData: null,
  });

    // Close Delete Modal
    const closeModal = () => {
      setDeleteModalState({ isOpen: false, itemId: null });
    };
  
    // Open Delete Modal
    const handleDeleteModal = (itemId) => {
      console.log(itemId);
      
      setDeleteModalState({ isOpen: true, itemId });
    };
      // Delete Item
  const deleteItem = async () => {
    const { itemId } = deleteModalState;
    if (!itemId) return;

    try {
      await axios.delete(`${baseUrlPms}/product/${itemId}/delete/`, {
        headers: Headers,
      });
      showToast("success", t("msg.removeMealPlanMsg"));
      fetchData(); // Refresh the data
      closeModal();
    } catch (error) {
      console.error("Error deleting item:", error);
    }
  };
  
  // Handle edit modal open
  const handleEditModal = (row) => {
    console.log(row);
    
    const formattedData = {
      id: row.id,
      product_name_en: row?.pms_product_en?.product_name_en || '',
      product_description_en: row?.pms_product_en?.product_description_en || '',
      product_name_ar: row?.pms_product_ar?.product_name_ar || '',
      product_description_ar: row?.pms_product_ar?.product_description_ar || '',
      category_id: row.category_id || '',
   
      product_total_quantity: row.product_total_quantity || '',
    };
    setEditModalState({ isOpen: true, rowData: formattedData });
  };

  // Close edit modal
  const closeEditModal = () => {
    setEditModalState({ isOpen: false, rowData: null });
    fetchData();
  };

  // Filter function to validate row data before rendering
  const filterFn = (row) => row?.pms_product_en?.product_name_en &&
    row?.pms_product_ar?.product_name_ar
  // data of table
  const getColumns = (t) => [
    {
      name: t("englishName"),
      visible: true,
      selector: (row) => row?.pms_product_en?.product_name_en,
      sortable: true,
      reorder: true,
      cell: (row) => (
        <div className="d-flex justify-content-between align-items-center w-100">
          <div className="w-50">{row?.pms_product_en?.product_name_en}</div>
          <DropdownActions 
            onDelete={() => handleDeleteModal(row.id)}
            onEdit={() => handleEditModal(row)}
          
          />
        </div>
      ),
    },

    {
      name: t("arabicName"),
      selector: (row) =>  row?.pms_product_ar?.product_name_ar,
      sortable: true,
       visible: true,
    },
    {
      name: t("inventories.category"),
      visible: true,
      selector: (row) => row?.category_info?.pms_category_en.category_name_en,
      sortable: true,
    },
    {
      name: t("inventories.minQuantity"),
      selector: (row) => row?.product_total_quantity,
      sortable: true, visible: true,
    },
  ];



  return (
    <>
      {/* ReusableSection for rendering the table with provided configurations */}
      <ReusableSection 
      data={data}
       filterFn={filterFn}
        getColumns={getColumns} />
              {/* Delete Modal */}
      {deleteModalState.isOpen && (
        <DeleteModal
          show={deleteModalState.isOpen}
          closeModal={closeModal}
          fun={deleteItem}
        />
      )}
         {/* Edit Modal */}
         {editModalState.isOpen && (
        <Modal show={editModalState.isOpen} onHide={closeEditModal} centered>
          <Modal.Header closeButton>
            <h4>{t("editItem")}</h4>
          </Modal.Header>
          <Modal.Body>
            <CreateItem
              isEditMode={true}
              initialData={editModalState.rowData}
              onClose={closeEditModal}
            />
          </Modal.Body>
        </Modal>
      )}

    </>
  );
};

export default ItemSection;
