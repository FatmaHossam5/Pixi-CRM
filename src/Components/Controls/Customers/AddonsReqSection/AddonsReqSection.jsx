import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { AuthContext } from "../../../Helpers/Context/AuthContext";
import GeneralTable from "../../../Shared/GeneralTable/GeneralTable";
import { useTranslation } from "react-i18next";

const AddonsReqSection = () => {
  const { t } = useTranslation();
  const { baseUrlPms, Headers } = useContext(AuthContext);
  const { requestId } = useParams();
  const [addonsRequests, setAddonsRequests] = useState([]);

  const getAddonsRequests = () => {
    axios
      .get(`${baseUrlPms}/request_addons/all/?request_id=${requestId}`, {
        headers: Headers,
      })
      .then((res) => {
        setAddonsRequests(res.data);

        localStorage.setItem(
          "CusId",
          res.data[0].request_info.customer_info.id
        );
      })
      .catch((error) => {});
  };

  const filteredRows = addonsRequests?.filter(
    (row) =>
      row?.addons_info?.pms_addons_en?.addons_name_en &&
      row?.addons_info?.pms_addons_ar?.addons_name_ar
  );

  const columns = [
    {
      name: "Service Name",
      visible: true,
      selector: (row) => row.addons_info?.pms_addons_en?.addons_name_en,
      sortable: true,
      // grow: 2,
      reorder: true,
      cell: (row) => (
        <div className="d-flex justify-content-between align-items-center w-100">
          <div className="w-50">
            {row.addons_info?.pms_addons_en?.addons_name_en}
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
      name: "Price",
      selector: (row) => row.addon_price,
      sortable: true,
      visible: true,
    },
    {
      name: "From",
      selector: (row) => row.addons_start_date,
      sortable: true,
      visible: true,
    },
    {
      name: "To",
      selector: (row) => row.addons_end_date,
      sortable: true,
      visible: true,
    },
  ];

  useEffect(() => {
    getAddonsRequests();
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
            <h3 className="mb-0 px-sub-taps w-50 me-auto">Addons Requests</h3>

            <Link
              to={"createAddonsRequest"}
              className="px-btn px-blue-btn ms-3"
            >
              Add New Addons
            </Link>
          </div>
          {/* component */}

          <GeneralTable filteredRows={filteredRows} columns={columns} />
        </div>
      </div>
    </>
  );
};

export default AddonsReqSection;
