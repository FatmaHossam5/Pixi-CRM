import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { AuthContext } from "../../../Helpers/Context/AuthContext";
import GeneralTable from "../../../Shared/GeneralTable/GeneralTable";
import { Breadcrumb } from "react-bootstrap";
import { t } from "i18next";

const AllSingleRequestsSection = () => {
  const { baseUrlPms, Headers } = useContext(AuthContext);
  const [allRequests, setAllRequests] = useState([]);
  const navigate = useNavigate();

  const getAllRequests = () => {
    axios
      .get(`${baseUrlPms}/request/all/`, {
        headers: Headers,
      })
      .then((res) => {
        setAllRequests(res.data);
        console.log(res.data);
      })
      .catch((error) => {});
  };

  const filteredRows = allRequests?.filter(
    (row) =>
      row?.customer_info?.pms_customer_en?.customer_name_en &&
      row?.customer_info?.pms_customer_ar?.customer_name_ar
  );
  const addonsRequests = (requestId) => {
    navigate(`/dashboard/customerSingleRqu/addonsReq/${requestId}`);
  };
  const columns = [
    {
      name: "Customer Name",
      visible: true,
      selector: (row) => row?.customer_info?.pms_customer_en?.customer_name_en,
      sortable: true,
      reorder: true,
      cell: (row) => (
        <div className="d-flex justify-content-between align-items-center w-100">
          <div className="w-50">
            {row?.customer_info?.pms_customer_en?.customer_name_en}
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
                <a className="dropdown-item">View</a>
              </li>
              <li>
                <a className="dropdown-item">
                   {t("edit")}
                </a>
              </li>
              <li>
                <a className="dropdown-item">Check In</a>
              </li>
              <li>
                <a className="dropdown-item">Check Out</a>
              </li>
              <li>
                <a className="dropdown-item">Add Addon</a>
              </li>
              <li>
                <a className="dropdown-item">Upgrade</a>
              </li>
              <li>
                <a className="dropdown-item">Merge</a>
              </li>
              <li>
                <a className="dropdown-item">Change Room</a>
              </li>
              <li>
                <a className="dropdown-item">Extend</a>
              </li>
              <li>
                <a className="dropdown-item">Add Payment</a>
              </li>

              <li>
                <a className="dropdown-item text-danger">
                   {t("delete")}
                </a>
              </li>
            </ul>
          </div>
        </div>
      ),
    },

    {
      name: "Add Ons",
      selector: (row) => row.addons_count,
      sortable: true,
      visible: true,
      cell: (row) =>
        row.addons_count > 0 ? (
          <div
            // onClick={() => addonsRequests(row.id)} // not approved
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
      selector: (row) => row.reservations_count,
      sortable: true,
      visible: true,
      cell: (row) =>
        row.reservations_count > 0 ? (
          <div
            // onClick={() => addonsRequests(row.id)} // not approved
            style={{ cursor: "pointer", color: "blue" }}
          >
            All Reservations
          </div>
        ) : (
          <p>none</p>
        ),
    },
  ];

  useEffect(() => {
    getAllRequests();
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
            <div className="w-100 d-flex flex-wrap align-items-center">
              <div className="breadcrumbs-list mb-2 w-100">
                <Breadcrumb>
                  {/* <Breadcrumb.Item href="#">Home</Breadcrumb.Item> */}
                  <Breadcrumb.Item>Reservations</Breadcrumb.Item>
                  <Breadcrumb.Item active>Single Requests</Breadcrumb.Item>
                </Breadcrumb>
              </div>
              <h3 className="mb-0 px-sub-taps w-50 me-auto">Single Requests</h3>

              <Link
                to={"createSingleRequest"}
                className="px-btn px-blue-btn ms-3"
              >
                Create New Request
              </Link>
            </div>
          </div>
          {/* component */}

          <GeneralTable filteredRows={filteredRows} columns={columns} />
        </div>
      </div>
    </>
  );
};

export default AllSingleRequestsSection;
