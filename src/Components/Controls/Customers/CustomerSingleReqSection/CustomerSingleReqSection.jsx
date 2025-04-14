import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { AuthContext } from "../../../Helpers/Context/AuthContext";
import GeneralTable from "../../../Shared/GeneralTable/GeneralTable";
import { useTranslation } from "react-i18next";

const CustomerSingleReqSection = () => {
  const { t } = useTranslation();
  const { baseUrlPms, Headers } = useContext(AuthContext);
  const { customerId } = useParams();
  const [customerRequests, setCustomerRequests] = useState([]);
  const navigate = useNavigate();

  const getCustomerRequests = () => {
    axios
      .get(`${baseUrlPms}/request/all/?customer_id=${customerId}`, {
        headers: Headers,
      })
      .then((res) => {
        setCustomerRequests(res.data);
        console.log(res.data);
      })
      .catch((error) => {});
  };

  const filteredRows = customerRequests?.filter(
    (row) =>
      row?.customer_info?.pms_customer_en?.customer_name_en &&
      row?.customer_info?.pms_customer_ar?.customer_name_ar
  );
  const addonsRequests = (requestId) => {
    navigate(`/dashboard/customerSingleRqu/addonsReq/${requestId}`);
  };
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
      name: "Date",
      selector: (row) => row.created_at,
      sortable: true,
      visible: true,
    },
    {
      name: "Add Ons",
      selector: (row) => row.addons_count,
      sortable: true,
      visible: true,
      cell: (row) =>
        row.addons_count > 0 ? (
          <div
            onClick={() => addonsRequests(row.id)} // Handle click with row ID
            style={{ cursor: "pointer", color: "blue" }}
          >
            All Addons
          </div>
        ) : (
          <p>none</p>
        ),
    },
    {
      name: "Reservations",
      selector: (row) => "resrvation",
      sortable: true,
      visible: true,
    },
  ];

  useEffect(() => {
    getCustomerRequests();
  }, []);

  return (
    <>
      <div
        className="tab-pane fade show active"
        id="pills-hotel"
        role="tabpanel"
        aria-labelledby="pills-hotel-tab"
        tabIndex={0}
      >
        <div className="px-card">
          <div className="card-head d-flex p-4 align-items-center">
            <h3 className="mb-0 px-sub-taps w-50 me-auto">Single Requests</h3>

            <Link
              to={"createSingleRequest"}
              className="px-btn px-blue-btn ms-3"
            >
              Add New Single Request
            </Link>
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
};

export default CustomerSingleReqSection;
