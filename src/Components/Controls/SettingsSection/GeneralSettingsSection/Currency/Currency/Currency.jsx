// 
import { useContext, useState } from "react";
import { AuthContext } from "../../../../../Helpers/Context/AuthContext";
import { useData } from "../../../../../Helpers/Context/useData";
import ReusableSection from "../../../../../Shared/ReusableSection/ReusableSection";
import DropdownActions from "../../../../../Shared/DropdownActions/DropdownActions";
import DeleteModal from "../../../../../Shared/DeleteModal/DeleteModal";
import axios from "axios";
import { ToastContext } from "../../../../../Helpers/Context/ToastContext ";
import { useTranslation } from "react-i18next";

const Currency = () => {
  const { baseUrlPms, Headers } = useContext(AuthContext);
  const { data, fetchData } = useData('currency_saved/all/', Headers);
  const { showToast } = useContext(ToastContext);
  const { t } = useTranslation();

  const [deleteModalState, setDeleteModalState] = useState({
    isOpen: false,
    currencyId: null,
  });

  const closeModal = () => setDeleteModalState({ isOpen: false, currencyId: null });

  // Handle delete modal open
  const handleDeleteModal = (id) => {
    console.log(id);

    setDeleteModalState({ isOpen: true, currencyId: id });
  };


  const deleteCurrency = () => {

    const { currencyId } = deleteModalState;
    console.log(currencyId);

    if (!currencyId) return;

    axios
      .delete(`${baseUrlPms}/currency_saved/${currencyId}/delete/`, { headers: Headers })
      .then(() => {
        showToast("success", t("msg.removeCurrencyMsg"));
        closeModal();
        fetchData();
      })
      .catch((error) => {
        console.error("Error deleting room type:", error);
        // Add user feedback here, e.g., a toast message
      });
  };

  const filterFn = (row) => row?.currency_info?.mis_currency_en?.currency_name_en && row?.currency_info?.mis_currency_ar?.currency_name_ar;
  const getColumns = (t) => [
    {
      name: t("englishName"),
      selector: (row) => row?.currency_info?.mis_currency_en?.currency_name_en,
      sortable: true,
      reorder: true,
      visible: true,
      cell: (row) => (
        <div className="d-flex justify-content-between align-items-center w-100">
          <div className="w-50">{row?.currency_info?.mis_currency_en?.currency_name_en}</div>
          <DropdownActions
            onDelete={() => handleDeleteModal(row.pms_currency_id


            )} />
        </div>
      ),
    },
  ];

  return (
    <>
      <ReusableSection
        data={data}
        getColumns={getColumns}
        filterFn={filterFn}
        fetchData={fetchData}
      />
      <DeleteModal
        show={deleteModalState.isOpen}
        closeModal={closeModal}
        fun={deleteCurrency}
      />
    </>

  );
};

export default Currency;