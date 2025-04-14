import axios from "axios";
import GeneralTable from "../../../Shared/GeneralTable/GeneralTable";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../Helpers/Context/AuthContext";
import { Breadcrumb } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";

const AllGroupRequestsSection = () => {
  const { baseUrlPms, Headers } = useContext(AuthContext);
  const [allGroupRequests, setAllGroupRequests] = useState([]);

  const getAllGroupRequests = () => {
    axios
      .get(`${baseUrlPms}/group_request/all/`, {
        headers: Headers,
      })
      .then((res) => {
        setAllGroupRequests(res.data);
      })
      .catch((error) => {});
  };

  const navigate = useNavigate();

  const details = (id, name) => {
    navigate(`groupDetails/${id}`, { state: name });
  };

  const filteredRows = allGroupRequests?.filter(
    (row) => row?.pms_group_request_en?.group_request_name_en
    //  &&
    //   row?.group_owner_info?.pms_customer_en.customer_name_en
  );

  const columns = [
    {
      name: "Owner Name",
      visible: true,
      selector: (row) =>
        row?.group_owner_info?.pms_customer_en.customer_name_en,
      sortable: true,
      reorder: true,
      cell: (row) => (
        <div className="d-flex justify-content-between align-items-center w-100">
          <div className="w-50">
            {row?.group_owner_info?.pms_customer_en.customer_name_en}
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
                <button
                  className="dropdown-item"
                  onClick={() => details(row.id, row.pms_group_request_en)}
                >
                  View
                </button>
              </li>
              <li>
                <a className="dropdown-item">Edit</a>
              </li>
              <li>
                <a className="dropdown-item">Check In</a>
              </li>
              <li>
                <a className="dropdown-item">Check Out</a>
              </li>
              <li>
                <a className="dropdown-item text-danger">{t("delete")}</a>
              </li>
            </ul>
          </div>
        </div>
      ),
    },

    {
      name: "Group Name",
      selector: (row) => row?.pms_group_request_en?.group_request_name_en,
      sortable: true,
      visible: true,
    },
    {
      name: "From",
      selector: (row) => row?.group_request_start_date,
      sortable: true,
      visible: true,
    },
    {
      name: "To",
      selector: (row) => row?.group_request_end_date,
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
    getAllGroupRequests();
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
                  <Breadcrumb.Item active>Group Requests</Breadcrumb.Item>
                </Breadcrumb>
              </div>

              <h3 className="mb-0 px-sub-taps w-50 me-auto">Group Requests</h3>

              <Link
                to={"CreateGroupRequest"}
                className="px-btn px-blue-btn ms-3"
              >
                Create New Request
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
          </div>
          {/* component */}

          <GeneralTable filteredRows={filteredRows} columns={columns} />
        </div>
      </div>
    </>
  );
};

export default AllGroupRequestsSection;
