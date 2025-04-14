import { useParams } from "react-router-dom";
import { ModalContext } from "../../../../../Helpers/Context/ModalContext";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../../../Helpers/Context/AuthContext";
import axios from "axios";
import AddModal from "../../../../../Shared/AddModal/AddModal";
import CreateBuildingAmenities from './CreateBuildingAmenities';
import GeneralTable from "../../../../../Shared/GeneralTable/GeneralTable";
import { useTranslation } from "react-i18next";

const BuildingAmenities = () => {
  const { t } = useTranslation();
  const { showState, handleClose, setShowState } = useContext(ModalContext);
  const { buildId } = useParams();

  const handleShowAdd = () => {
    setShowState("Amenity");
  };

  // context
  const { baseUrlPms, Headers } = useContext(AuthContext);

  // data of table
  const columns = [
    {
      name: "Amenity Name",
      visible: true,
      selector: (row) => row.amenity_info.pms_amenity_en.amenity_name_en,
      sortable: true,
      reorder: true,
      cell: (row) => (
        <div className="d-flex justify-content-between align-items-center w-100">
          <div className="w-50">{row.amenity_info.pms_amenity_en.amenity_name_en}</div>
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
                <a className="dropdown-item" >
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
      name: "Description",visible: true,
      selector: (row) => row.amenity_info.pms_amenity_en.facilit_description_en,
      sortable: true,
    },
  
  ];

  // branch API
  const [facilities, setAmenities] = useState();
  const getAmenities = () => {
    axios
      .get(`${baseUrlPms}/amenity_building/all/?building_id=${buildId}`, {
        headers: Headers,
      })
      .then((res) => {
        setAmenities(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // filter data and egnore null values
  const filteredRows = facilities?.filter(
    (row) =>
      row?.amenity_info.pms_amenity_en.amenity_name_en 
    // && row?.pms_branch_ar.branch_name_ar
  );

  // call functions of Status
  useEffect(() => {
    getAmenities();
  }, []);

  return (
    <>
      <div
        className="tab-pane fade show active"
        id="pills-amenity"
        role="tabpanel"
        aria-labelledby="pills-amenity-tab"
        tabIndex={0}
      >
        <div className="px-card">
          <div className="card-head d-flex p-4 align-items-center">
            <h3 className="mb-0 px-sub-taps w-50 me-auto">All Amenities</h3>

            <button onClick={handleShowAdd} className="px-btn px-blue-btn ms-3">
              create new Amenity
            </button>

            <AddModal
              name="Amenity"
              showState={showState}
              handleClose={handleClose}
              title="Create New Amenity"
              component={<CreateBuildingAmenities buildId={buildId} getAmenities={getAmenities} />}
            />
          </div>

          {/*------------- start sub-taps content ----------------*/}
          <div className="tab-content" id="pills-tabContent">
            <div
              className="tab-pane fade show active"
              id="pills-amenity"
              role="tabpanel"
              aria-labelledby="pills-amenity-tab"
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
}

export default BuildingAmenities
