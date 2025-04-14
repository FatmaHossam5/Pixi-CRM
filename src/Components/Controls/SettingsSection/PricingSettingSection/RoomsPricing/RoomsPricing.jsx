import { useContext, useEffect, useState } from "react";
// import AddModal from "../../../../Shared/AddModal/AddModal";
import GeneralTable from "../../../../Shared/GeneralTable/GeneralTable";
// import CreateRoomsPricing from './CreateRoomsPricing';
import { AuthContext } from "../../../../Helpers/Context/AuthContext";
import { ModalContext } from "../../../../Helpers/Context/ModalContext";
import { Link } from "react-router-dom";
import axios from "axios";
import { useTranslation } from "react-i18next";

const RoomsPricing = () => {

  const { t } = useTranslation();
    const { showState, handleClose, setShowState } = useContext(ModalContext);

  const handleShowAdd = () => {
    setShowState("rooms-pricing");
  };

  // context
  const { baseUrlPms, Headers, orgId } = useContext(AuthContext);
  //   const navigate = useNavigate();

  //   const getBranches = (hotelID) => {
  //     navigate(`/dashboard/AllBranches/${hotelID}`);
  //   };

  // data of table
  const columns = [
    {
      name: "Room Type",

      selector: (row) =>
        row.room_type_info?.pms_room_type_en.room_type_name_en,
      sortable: true,
      reorder: true,
      cell: (row) => (
        <div className="d-flex justify-content-between align-items-center w-100">
          <div className="w-50">
            {row.room_type_info?.pms_room_type_en.room_type_name_en}
          </div>
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
                  <i className="fa-kit fa-edit"></i> Edit
                </a>
              </li>
              <li>
                <a className="dropdown-item text-danger">
                  <i className="fa-kit fa-delete"></i> Delete
                </a>
              </li>
            </ul>
          </div>
        </div>
      ),
    },

    {
      name: "Room View",
      selector: (row) =>
        row.view_type_info?.pms_view_type_en?.view_type_name_en,
      sortable: true,
    },
      {
        name: "Floor",
        selector: (row) => row?.floor_info?.pms_floor_en?.floor_name_en,
        sortable: true,
      },
      {
        name: "Building",
        selector: (row) => row?.floor_info?.building_info?.pms_building_en?.building_name_en,
        sortable: true,
      },
      {
        name: "Branch",
        selector: (row) => row?.floor_info?.building_info?.branch_info?.pms_branch_en?.branch_name_en,
        sortable: true,
      },
      {
        name: "Workdays Price",
        cell: (row) => `${row.room_price} $`

      },
      {
        name: "Weekends Prices",
        cell: (row) => (
            <Link
              to="https://www.googleadservices.com/pagead/aclk?sa=L&ai=DChcSEwienJqLzI2HAxWhrmgJHaYsDeEYABAEGgJ3Zg&co=1&ase=2&gclid=CjwKCAjwkJm0BhBxEiwAwT1AXF333ESuTS89jI0owSr8fbhd1YNgJ-BtxSZuDujKRK5zZEA4WuXzfBoCoCYQAvD_BwE&ohost=www.google.com&cid=CAESVeD2R6I3W6a7qtzPm5zWv2h0XKLMMMR6RzjnKnMenmEB62KGIFps8T4wx28O9MOg_gJsRU2i_s6PgGUUetWygMz9Bf6WCFrMf_cezPwriNAiFS5Srmk&sig=AOD64_0IdOKcS-jMZ2NzPHX1gR10Qevozg&q&nis=4&adurl&ved=2ahUKEwiCnJSLzI2HAxVNTKQEHcOlAlkQ0Qx6BAgJEAM"
              className="text-primary text-decoration-underline"
            >
              see all prices
            </Link>
          ),

      },
      {
        name: "Special Days Prices",
        cell: (row) => (
            <Link
              to="https://www.googleadservices.com/pagead/aclk?sa=L&ai=DChcSEwienJqLzI2HAxWhrmgJHaYsDeEYABAEGgJ3Zg&co=1&ase=2&gclid=CjwKCAjwkJm0BhBxEiwAwT1AXF333ESuTS89jI0owSr8fbhd1YNgJ-BtxSZuDujKRK5zZEA4WuXzfBoCoCYQAvD_BwE&ohost=www.google.com&cid=CAESVeD2R6I3W6a7qtzPm5zWv2h0XKLMMMR6RzjnKnMenmEB62KGIFps8T4wx28O9MOg_gJsRU2i_s6PgGUUetWygMz9Bf6WCFrMf_cezPwriNAiFS5Srmk&sig=AOD64_0IdOKcS-jMZ2NzPHX1gR10Qevozg&q&nis=4&adurl&ved=2ahUKEwiCnJSLzI2HAxVNTKQEHcOlAlkQ0Qx6BAgJEAM"
              className="text-primary text-decoration-underline"
            >
              see all prices
            </Link>
          ),

      },
  ];

  // Room pricing API
  const [roomsPricing, setRoomsPricing] = useState();
  const getRoomsPricing = () => {
    axios
      .get(`${baseUrlPms}/room_pricing_rule/all/`, {
        headers: Headers,
      })
      .then((res) => {
        setRoomsPricing(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // const x = !true
  // console.log(x);
  // console.log(0.1+0.2==0.3);

  console.log(roomsPricing);

  // filter data and egnore null values
  const filteredRows = roomsPricing?.filter(
    (row) =>
      row?.room_type_info?.pms_room_type_en.room_type_name_en &&
      row?.view_type_info?.pms_view_type_en?.view_type_name_en
  );

   // call functions of Status
  useEffect(() => {
    getRoomsPricing();
  }, []);

  return (
    <>
      <div
        className="tab-pane fade show active"
        id="pills-rooms-pricing"
        role="tabpanel"
        aria-labelledby="pills-rooms-pricing-tab"
        tabIndex={0}
      >
        <div className="px-card">
          <div className="card-head d-flex p-4 align-items-center">
            <h3 className="mb-0 px-sub-taps w-50 me-auto">Pricing</h3>

            <Link to="roomPricing" className="px-btn px-blue-btn ms-3">
              create new room price
            </Link>
          </div>

          {/*------------- start sub-taps content ----------------*/}
          <div className="tab-content" id="pills-tabContent">
            <div
              className="tab-pane fade show active"
              id="pills-rooms-pricing"
              role="tabpanel"
              aria-labelledby="pills-rooms-pricing-tab"
              tabIndex={0}
            >
              {/* component */}

              <GeneralTable filteredRows={filteredRows} columns={columns} />
            </div>
          </div>
          {/*--------------- end sub-taps cntent ----------------*/}
        </div>
      </div>
    </>
  );
};

export default RoomsPricing;
