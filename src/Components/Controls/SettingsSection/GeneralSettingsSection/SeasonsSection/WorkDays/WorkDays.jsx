

import { useContext, useMemo, useState } from "react";
import ReusableSection from "../../../../../Shared/ReusableSection/ReusableSection";
import { useData } from "../../../../../Helpers/Context/useData";
import DropdownActions from "../../../../../Shared/DropdownActions/DropdownActions";
import DeleteModal from "../../../../../Shared/DeleteModal/DeleteModal";
import axios from "axios";
import { ToastContext } from "../../../../../Helpers/Context/ToastContext ";
import { AuthContext } from "../../../../../Helpers/Context/AuthContext";
import { useTranslation } from "react-i18next";



const WorkDays = () => {
  // Create mock data for ReusableSection

  const{data,fetchData}=useData();
   const { showToast } = useContext(ToastContext);
   const { baseUrlPms, Headers } = useContext(AuthContext);
   const { t } = useTranslation();
    const [deleteModalState, setDeleteModalState] = useState({
      isOpen: false,
      daysId: null
    })
  
  const weekendsData = data.map((item) => {
    const weekendDays = item.weekend_info.weekend_date
      .split(", ") // Handle multiple dates in a single field
      .map((date) => new Date(date).toLocaleDateString("en-US", { weekday: "short" })) // Convert to day names
      .join(", "); // Join back for display
      const workDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]
      .filter((day) => !weekendDays.includes(day))
      .join(", ");
    return {
      ...item,
      weekendDays,
      workDays, // Add the converted day names
    };
  });

  const filterFn = (row) =>{
    console.log(row);
    
    return row?.weekendDays && row.workDays;
    
    
    
  } 
  const handleDeleteModal = (id) => {
    console.log(id);

    setDeleteModalState({
      isOpen: true,
      daysId: id

    })
  }
  const closeModal = () => setDeleteModalState({ isOpen: false, daysId: null });
  const deleteWeekendDay=()=>{
    const { daysId } = deleteModalState;
    axios
      .delete(`${baseUrlPms}/weekend_branch_season/${daysId}/delete/`, { headers: Headers })
      .then(() => {
       
        showToast("success", t("msg.removeAddOnMsg"));
        closeModal();
        fetchData();
      })
      .catch((error) => {
        console.error("Error deleting add-on:", error);
        showToast("error", t("msg.errorMessage"));
      });
  }
  const getColumns = (t) => [
    {
      name: t("Weekends"),
      visible: true,
      selector: (row) => row.weekendDays, // Use the transformed field
      sortable: true,
      reorder: true,
      cell: (row) => (
        <div className="d-flex justify-content-between align-items-center w-100">
          <div className="w-50">{row.weekendDays || "N/A"}</div>
          <DropdownActions onDelete={()=>handleDeleteModal(row.id)} />
        </div>
      ),
    },
    {
      name: t("workdays"),
      selector: (row) => row.workDays || "N/A",
      sortable: true,
      visible: true,
    },
  ];
  




  return (<>
    <ReusableSection
      data={weekendsData}
      endpoint='weekend_branch_season/all/'
      filterFn={filterFn}
      getColumns={getColumns}
      fetchData={fetchData}
  
    />
              {deleteModalState.isOpen && <DeleteModal
        show={deleteModalState.isOpen}
        closeModal={closeModal}
        fun={deleteWeekendDay}

      />}
  </>

  );
};

export default WorkDays;
