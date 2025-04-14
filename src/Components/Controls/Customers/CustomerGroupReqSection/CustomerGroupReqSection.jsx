import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { AuthContext } from "../../../Helpers/Context/AuthContext";
import GeneralTable from "../../../Shared/GeneralTable/GeneralTable";
import { useTranslation } from "react-i18next";

const CustomerGroupReqSection = () => {
  const { t } = useTranslation();
    const { baseUrlPms, Headers } = useContext(AuthContext);
    const { customerId } = useParams();
    const [customerGroupRequests, setCustomerGroupRequests] = useState([]);
    const getCustomerGroupRequests = () => {
        axios
          .get(
            `${baseUrlPms}/group_request/all/?group_owner_id=${customerId}`,
            {
          
              headers:Headers,
            }
          )
          .then((res) => {
            setCustomerGroupRequests(res.data);
          })
          .catch((error) => {
         
          });
      };
    
    const filteredRows = customerGroupRequests?.filter(
      (row) =>
        row?.pms_group_request_en?.group_request_name_en &&
        row?.pms_group_request_ar?.group_request_name_ar
    );
  
    const columns = [
      {
        name: "Request Id",
        visible: true,
        selector: (row) => row.id,
        sortable: true,
        // grow: 2,
        reorder: true,
        cell: (row) => (
          <div className="d-flex justify-content-between align-items-center w-100">
            <div className="w-50">{row.id}</div>
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
        name: " Group Name",
        selector: (row) => row.created_at,
        sortable: true,
        visible: true,
      },
      {
        name: "From",
        selector: (row) => row.group_request_start_date,
        sortable: true,
        visible: true,
      },
      {
        name: "To",
        selector: (row) => row.group_request_end_date,
        sortable: true,
        visible: true,
      },
     
      {
        name: "Number Of Rooms",
        selector: (row) => row.room_count,
        sortable: true,
        visible: true,
      },
    ];
  
    useEffect(() => {
        getCustomerGroupRequests();
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
              <h3 className="mb-0 px-sub-taps w-50 me-auto">Group Requests</h3>
  
              <button
                //  onClick={handleShowAdd}
                className="px-btn px-blue-btn ms-3"
              >
                Add New Group Request
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

export default CustomerGroupReqSection
