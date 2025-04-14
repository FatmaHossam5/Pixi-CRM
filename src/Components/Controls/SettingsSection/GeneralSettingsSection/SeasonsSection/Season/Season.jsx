import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../../../Helpers/Context/AuthContext";
import DropdownActions from "../../../../../Shared/DropdownActions/DropdownActions";
import ReusableSection from "../../../../../Shared/ReusableSection/ReusableSection";
import { useData } from "../../../../../Helpers/Context/useData.jsx";
import moment from "moment"; // Importing moment.js for date formatting
import DeleteModal from "../../../../../Shared/DeleteModal/DeleteModal.jsx";
import axios from "axios";
import { ToastContext } from "../../../../../Helpers/Context/ToastContext .jsx";
import { useTranslation } from "react-i18next";
import { Modal } from "react-bootstrap";
import CreateSeason from "./CreateSeason.jsx";
import { useForm } from "react-hook-form";

const Season = () => {
  // context
  const { baseUrlPms, Headers } = useContext(AuthContext);
  const { data, fetchData } = useData();
  
  
  const [deleteModalState, setDeleteModalState] = useState({
    isOpen: false,
    seaseonId: null
  });
  const [editModalState, setEditModalState] = useState({
    isOpen: false,
    rowData: null,
    isEditMode: true
  })
  const { showToast } = useContext(ToastContext);
  const { t } = useTranslation();
  const [collectedId, setCollectedId] = useState([]);
  const [branchesTags, setBranchesTags] = useState([]);
  const { reset } = useForm();

  const formatDate = (date) => {
    return moment(date).format("DD-MM-YYYY"); // Formats the date to DD-MM-YYYY
  };
  const handleDeleteModal = (id) => {
    setDeleteModalState(({
      isOpen: true,
      seaseonId: id
    }))
  }
  const closeModal = () => {
    setDeleteModalState(({
      isOpen: false,
      seaseonId: null
    }))
  }
  const deleteSeason = () => {
    const { seaseonId } = deleteModalState
    axios.delete(`${baseUrlPms}/season/${seaseonId}/delete`, { headers: Headers }).then((res) => {
      console.log(res);
      showToast("success", t("msg.removeSeasonMsg"))
      closeModal();
      fetchData();

    }).catch((error) => {
      console.log(error);

    })
  }

  const handleEditModal = (row) => {
    
    const formattedData = {
      id: row.id,
      season_name_en: row?.pms_season_en?.season_name_en,
      season_name_ar: row?.pms_season_ar?.season_name_ar,
      season_end_date: row?.season_end_date,
      season_start_date: row?.season_start_date,
      created_by: row?.created_by,
      updated_by: row?.updated_by


    }
    setEditModalState({
      isOpen: true, rowData: formattedData
    })
  }
  const closeEditModal = () => {
    setEditModalState({
      isOpen: false,
      rowData: null,

    })
  }
  const fetchBranchesForSelectedSeason = (seaseonId) => {
    axios.get(`${baseUrlPms}/branch_season/all/`, {
      params: {
        season_id: seaseonId,

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
    fetchBranchesForSelectedSeason()
  }, [])
  // Filter function to validate row data before rendering
  const filterFn = (row) => row?.pms_season_en.season_name_en && row?.pms_season_ar.season_name_ar;
  // data of table
  const getColumns = (t) => [
    {
      name: t("englishName"),
      visible: true,
      selector: (row) => row.pms_season_en.season_name_en,
      sortable: true,
      reorder: true,
      cell: (row) => (
        <div className="d-flex justify-content-between align-items-center w-100">
          <div className="w-50">{row.pms_season_en.season_name_en}</div>
          <DropdownActions
            onDelete={() => handleDeleteModal(row.id)}
            onEdit={() => handleEditModal(row)}
          />
        </div>
      ),
    },

    {
      name: t("arabicName"),
      selector: (row) => row.pms_season_ar.season_name_ar,
      sortable: true, visible: true,
    },
    {
      name: t("Start Date"),
      selector: (row) => formatDate(row.season_start_date), // Formats the start date,
      sortable: true, visible: true,
    },
    {
      name: t("End Date"),
      selector: (row) => formatDate(row.season_end_date),
      sortable: true, visible: true,
    },
  ];


  return (
    <>
      {/* ReusableSection for rendering the table with provided configurations */}
      <ReusableSection
        endpoint='season/all/'
        filterFn={filterFn}
        getColumns={getColumns}
        data={data}
        fetchData={fetchData}
      />
      {deleteModalState.isOpen && (
        <DeleteModal
          show={deleteModalState.isOpen}
          closeModal={closeModal}
          fun={deleteSeason}


        />)}
      {editModalState.isOpen && (
        <Modal show={editModalState.isOpen} onHide={closeEditModal} centered >
          <Modal.Header closeButton>
            <h4>
              Edit Season
            </h4>
          </Modal.Header>
          <Modal.Body>
            <CreateSeason
              key={editModalState.rowData?.id || "new"}
              initialData={editModalState.rowData}
              onClose={closeEditModal}
              isEditMode={true}
              fetchBranchesForSelectedSeason={fetchBranchesForSelectedSeason}
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

export default Season;
