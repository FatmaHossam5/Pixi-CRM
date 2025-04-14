import { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { ModalContext } from "../../../../../Helpers/Context/ModalContext";
import { AuthContext } from "../../../../../Helpers/Context/AuthContext";
import axios from "axios";
import AddModal from "../../../../../Shared/AddModal/AddModal";
import CreateBranchAddOns from "./CreateBranchAddOns";
import GeneralTable from "../../../../../Shared/GeneralTable/GeneralTable";
import { useTranslation } from "react-i18next";

const BranchAddOns = () => {
  const { t } = useTranslation();
  const { branchId } = useParams();
  const { showState, handleClose, setShowState } = useContext(ModalContext);

  const handleShowAdd = () => {
    setShowState("AddOn");
  };
  // context
  const { baseUrlPms, Headers } = useContext(AuthContext);

  // data of table
  const columns = [
    {
      name: "Add On Name",
      visible: true,
      selector: (row) => row.addons_info.pms_addons_en.addons_name_en,
      sortable: true,
      reorder: true,
      cell: (row) => (
        <div className="d-flex justify-content-between align-items-center w-100">
          <div className="w-50">
            {row.addons_info.pms_addons_en.addons_name_en}
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
      name: "Price",visible: true,
      selector: (row) => row.addons_info.addons_price,
      sortable: true,
    },
    {
      name: "Description",visible: true,
      selector: (row) => row.addons_info.pms_addons_en.addons_description_en,
      sortable: true,
    },
  ];

  // Add Ons API
  const [addOns, setAddOns] = useState();
  const getAddOns = () => {
    axios
      .get(`${baseUrlPms}/addons_branch/all/?branch_id=${branchId}`, {
        headers: Headers,
      })
      .then((res) => {
        setAddOns(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // filter data and egnore null values
  const filteredRows = addOns?.filter(
    (row) =>
      row.addons_info.pms_addons_en.addons_name_en &&
      row.addons_info.pms_addons_ar.addons_name_ar
  );

  // call functions of Status
  useEffect(() => {
    getAddOns();
  }, []);

  return (
    <>
      <div
        className="tab-pane fade show active"
        id="pills-add-ons"
        role="tabpanel"
        aria-labelledby="pills-add-ons-tab"
        tabIndex={0}
      >
        <div className="px-card">
          <div className="card-head d-flex p-4 align-items-center">
            <h3 className="mb-0 px-sub-taps w-50 me-auto">All Add Ons</h3>

            <button onClick={handleShowAdd} className="px-btn px-blue-btn ms-3">
              Add New Add ons
            </button>

            <AddModal
              name="AddOn"
              showState={showState}
              handleClose={handleClose}
              title="Create New Add On"
              component={<CreateBranchAddOns
                branchId={branchId} getAddOns={getAddOns} />}
            />
          </div>

          {/*------------- start sub-taps content ----------------*/}
          <div className="tab-content" id="pills-tabContent">
            <div
              className="tab-pane fade show active"
              id="pills-branch"
              role="tabpanel"
              aria-labelledby="pills-branch-tab"
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

export default BranchAddOns;
