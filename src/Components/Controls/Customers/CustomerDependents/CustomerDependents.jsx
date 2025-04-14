import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { AuthContext } from "../../../Helpers/Context/AuthContext";
import GeneralTable from "../../../Shared/GeneralTable/GeneralTable";
import { useTranslation } from "react-i18next";

const CustomerDependents = () => {
  const { t } = useTranslation();
    const { baseUrlPms, Headers } = useContext(AuthContext);
    const { customerId } = useParams();
    const [dependents, setDependents] = useState([]);
  
    const getDependents = () => {
      axios
        .get(`${baseUrlPms}/dependant/all/?pms_customer_id=${customerId}`, {
          headers: Headers,
        })
        .then((res) => {
            setDependents(res.data);
        })
        .catch((error) => {});
    };
  
    const filteredRows = dependents?.filter(
      (row) =>
        row?.pms_dependant_en?.dependant_name_en &&
        row?.pms_dependant_ar?.dependant_name_ar
    );
  
    const columns = [
      {
        name: "Dependent English Name",
        visible: true,
        selector: (row) => row.pms_dependant_en?.dependant_name_en,
        sortable: true,
        // grow: 2,
        reorder: true,
        cell: (row) => (
          <div className="d-flex justify-content-between align-items-center w-100">
            <div className="w-50">{row.pms_dependant_en?.dependant_name_en}</div>
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
                  <i className="fa-kit fa-view"></i> View
                </a>
              </li>
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
        name: "Dependent Arabic Name",
        selector: (row) => row.pms_dependant_ar?.dependant_name_ar,
        sortable: true,
        visible: true,
      },
      {
        name: "Type",
        selector: (row) => row.dependant_type_info
        ?.pms_dependant_type_en
        ?.dependant_type_name_en,
        sortable: true,
        visible: true,
      },
      {
        name: "Relationship",
        selector: (row) => row.dependant_relationship_info
        ?.pms_dependant_relationship_en
        ?.dependant_relationship_name_en,
        sortable: true,
        visible: true,
      },
    ];
  
    useEffect(() => {
      getDependents();
    }, []);
  
  
    return (
      <>
        {/* <DisplayModal />
         */}
  
        <div
          className="tab-pane fade show active"
          id="pills-hotel"
          role="tabpanel"
          aria-labelledby="pills-hotel-tab"
          tabIndex={0}
        >
          <div className="px-card">
            <div className="card-head d-flex p-4 align-items-center">
              <h3 className="mb-0 px-sub-taps w-50 me-auto">Dependents</h3>
  
              <button
                //  onClick={handleShowAdd}
                className="px-btn px-blue-btn ms-3"
              >
                Add New Dependent
              </button>
              {/* 
              <AddModal
                name="Hotel"
                showState={showState}
                handleClose={handleClose}
                title="Create New Hotel"
                component={<CreateHotel getHotels={getHotels} />}
              /> */}
            </div>
            {/* component */}
  
            <GeneralTable filteredRows={filteredRows} columns={columns} />
          </div>
        </div>
      </>
    );
}

export default CustomerDependents
