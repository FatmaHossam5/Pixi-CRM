import { useContext, useEffect, useState } from "react";
import { ModalContext } from "../../../../../Helpers/Context/ModalContext";
import axios from "axios";
import AddModal from "../../../../../Shared/AddModal/AddModal";
import CreateRooms from "./CreateRooms";
import GeneralTable from "../../../../../Shared/GeneralTable/GeneralTable";
import { AuthContext } from "../../../../../Helpers/Context/AuthContext";
import CreateSingleRooms from "./CreateSingleRooms";
import CreateMultipulRooms from "./CreateMultipulRooms";
import { useTranslation } from "react-i18next";
import ReusableSection from "../../../../../Shared/ReusableSection/ReusableSection";
import { useData } from "../../../../../Helpers/Context/useData";

const Rooms = () => {
  const { t } = useTranslation();
  const { showState, handleClose, setShowState } = useContext(ModalContext);
  console.log(showState);
  const { data, fetchData } = useData();
  const showSingleRoom = () => {
    setShowState("SingleRoom");
    console.log("Showing Single Room");
  };

  const showRoom = (x) => {
    setShowState(x);

  };
  const showMultipleRoom = () => {
    setShowState("MultipleRoom");
    console.log("Showing Multiple Room");
  };
  // context
  const { baseUrlPms, Headers } = useContext(AuthContext);

  // data of table
  const   getColumns = (t) =>  [
    {
      name: t("englishName"),
      visible: true,
      selector: (row) => row?.pms_room_en?.room_name_en,
      sortable: true,
      reorder: true,
      cell: (row) => (
        <div className="d-flex justify-content-between align-items-center w-100">
          <div className="w-50">{row.pms_room_en.room_name_en}</div>
          <div className="dropdown align-center w-60">
            <button
              className="btn dropdown-toggle"
              type="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              <i className="fa-regular fa-ellipsis actions"></i>
            </button>
            <ul className="dropdown-menu">
              <li>
                <a className="dropdown-item">
                  <i className="fa-kit fa-edit"></i>{t("edit")}
                </a>
              </li>
              <li>
                <a className="dropdown-item text-danger">
                  <i className="fa-kit fa-delete"></i>{t("delete")}
                </a>
              </li>
            </ul>
          </div>
        </div>
      ),
    },

    {
      name: t("arabicName"),
      selector: (row) => row.pms_room_ar.room_name_ar,
      sortable: true, visible: true,
    },
    {
      name: t("roomType"),
      selector: (row) => row.room_type_info.pms_room_type_en.room_type_name_en,
      sortable: true, visible: true,
    },
    {
      name: t("roomView"),
      selector: (row) =>
        row?.view_type_info?.pms_view_type_en.view_type_name_en,
      sortable: true, visible: true,
    },
    {
      name: t("floor"),
      selector: (row) => row.floor_info.pms_floor_en.floor_name_en,
      sortable: true, visible: true,
    },
    {
      name: t("building"),
      selector: (row) =>
        row.floor_info?.building_info.pms_building_en.building_name_en,
      sortable: true, visible: true,
    },
    {
      name: t("branch"),
      selector: (row) =>
        row.floor_info?.building_info.branch_info.pms_branch_en.branch_name_en,
      sortable: true, visible: true,
    },
  ];

  // building API
  const [rooms, setRooms] = useState();
  const getRooms = () => {
    axios
      .get(`${baseUrlPms}/room/all/`, {
        headers: Headers,
      })
      .then((res) => {
        setRooms(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const filterFn = (row) =>row?.pms_room_en?.room_name_en && row?.pms_room_ar?.room_name_ar

  // call functions of rooms
  useEffect(() => {
    getRooms();
  }, []);

  return (
    <>
     <ReusableSection
        endpoint='room/all/'
        filterFn={filterFn}
        getColumns={getColumns}
        data={data}
        fetchData={fetchData}
      />

    </>
  );
};

export default Rooms;
