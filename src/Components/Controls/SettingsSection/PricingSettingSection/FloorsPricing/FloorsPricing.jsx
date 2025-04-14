import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../../../Helpers/Context/AuthContext";
import { ModalContext } from "../../../../Helpers/Context/ModalContext";
import AddModal from "../../../../Shared/AddModal/AddModal";
import CreateFloorsPricing from "./CreateFloorsPricing";
import GeneralTable from "../../../../Shared/GeneralTable/GeneralTable";
import axios from "axios";
import { useTranslation } from "react-i18next";


const FloorsPricing = () => {
  const { t } = useTranslation();
  const { showState, handleClose, setShowState } = useContext(ModalContext);

  const handleShowAdd = () => {
    setShowState("floors-pricing");
  };

  // context
  const { baseUrlPms, Headers, orgId } = useContext(AuthContext);

  // data of table
  const columns = [
    {
      name: "Floor",

      selector: (row) => row?.floor_info?.pms_floor_en?.floor_name_en,
      sortable: true,
      reorder: true,
      cell: (row) => (
        <div className="d-flex justify-content-between align-items-center w-100">
          <div className="w-50">
            {row?.floor_info?.pms_floor_en?.floor_name_en}
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
      cell: (row) => `${row.floor_price} $`
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

 // Floor pricing API
 const [floorsPricing, setFloorsPricing] = useState();
 const getFloorsPricing = () => {
   axios
     .get(`${baseUrlPms}/floor_pricing_rule/all/`, {
       headers: Headers,
     })
     .then((res) => {
       setFloorsPricing(res.data);
       console.log(res.data);
       
     })
     .catch((error) => {
       console.log(error);
     });
 };

    // filter data and egnore null values
    const filteredRows = floorsPricing?.filter(
      (row) =>
        row?.floor_info?.pms_floor_ar?.floor_name_ar &&
        row?.floor_info?.pms_floor_en?.floor_name_en
    );

   // call functions of Status
  useEffect(() => {
    getFloorsPricing();
  }, []);
  return (
    <>
      <div
        className="tab-pane fade show active"
        id="pills-floors-pricing"
        role="tabpanel"
        aria-labelledby="pills-floors-pricing-tab"
        tabIndex={0}
      >
        <div className="px-card">
          <div className="card-head d-flex p-4 align-items-center">
            <h3 className="mb-0 px-sub-taps w-50 me-auto">Pricing</h3>

            <Link to="floorPricing" className="px-btn px-blue-btn ms-3">
              create new floor price
            </Link>

            <AddModal
              name="floors-pricing"
              showState={showState}
              handleClose={handleClose}
              title="Create New floor price"
              component={
                <CreateFloorsPricing
                // getHotels={getHotels} Hotels={Hotels}
                />
              }
            />
          </div>

          {/*------------- start sub-taps content ----------------*/}
          <div className="tab-content" id="pills-tabContent">
            <div
              className="tab-pane fade show active"
              id="pills-floors-pricing"
              role="tabpanel"
              aria-labelledby="pills-floors-pricing-tab"
              tabIndex={0}
            >
              {/* component */}

              <GeneralTable
                 filteredRows={filteredRows} columns={columns}
              />
            </div>
          </div>
          {/*--------------- end sub-taps cntent ----------------*/}
        </div>
      </div>
    </>
  );
};

export default FloorsPricing;
