import { useContext, useEffect, useState } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import GeneralTable from "../../../Shared/GeneralTable/GeneralTable";
import { Breadcrumb } from "react-bootstrap";
import axios from "axios";
import { AuthContext } from "../../../Helpers/Context/AuthContext";

const GroupDetails = () => {
  const { GroupId } = useParams();
  const location = useLocation();

  const { baseUrlPms, Headers } = useContext(AuthContext);
  const [groupDetails, setGroupDetails] = useState([]);

  const getGroupDetails = () => {
    axios
      .get(`${baseUrlPms}/request/all/?group_request_id=${GroupId}`, {
        headers: Headers,
      })
      .then((res) => {
        setGroupDetails(res.data);
      })
      .catch((error) => {});
  };

  const filteredRows = groupDetails?.filter(
    (row) => row?.customer_info?.pms_customer_en.customer_name_en
    //  &&
    //   row?.group_owner_info?.pms_customer_en.customer_name_en
  );

  const columns = [
    {
      name: "Customer Name",
      visible: true,
      selector: (row) => row?.customer_info?.pms_customer_en.customer_name_en,
      sortable: true,
      reorder: true,
      cell: (row) => (
        <div className="d-flex justify-content-between align-items-center w-100">
          <div className="w-50">
            {row?.customer_info?.pms_customer_en.customer_name_en}
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
                View
                </a>
              </li>
              <li>
                <a className="dropdown-item">
                Edit
                </a>
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
      name: "Phone",
      selector: (row) => row?.customer_info.customer_mobile,
      sortable: true,visible: true,
    },
    {
      name: "Total",
      selector: (row) => row?.total_reservation_cost,
      sortable: true,visible: true,
    },
  ];

  useEffect(() => {
    getGroupDetails();
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
                  <Breadcrumb.Item>
                  <Link to={"/dashboard/allGroupRequest"}>
                  Group Requests
                  </Link>
                  </Breadcrumb.Item>
                  <Breadcrumb.Item active>
                    {location?.state?.group_request_name_en}
                  </Breadcrumb.Item>
                </Breadcrumb>
              </div>

              <h3 className="mb-0 px-sub-taps w-50 me-auto">
                {location?.state?.group_request_name_en}
              </h3>

              <button className="px-btn px-blue-btn create-btn ms-3">
              <Link
                to={"CreateGroupRequest"}
                className="px-blue-btn"
>                Check in
              </Link>
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
          </div>
          {/* component */}

          <GeneralTable filteredRows={filteredRows} columns={columns} />
        </div>
      </div>
    </>
  );
};

export default GroupDetails;
