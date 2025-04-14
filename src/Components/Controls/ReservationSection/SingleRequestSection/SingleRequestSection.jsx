import { Breadcrumb } from "react-bootstrap";
import AddModal from "../../../Shared/AddModal/AddModal";
import GeneralTable from "../../../Shared/GeneralTable/GeneralTable";
import CreateSingleRequestSection from "./CreateSingleRequestSection";
import { useTranslation } from "react-i18next";

const SingleRequestSection = () => {
  const { t } = useTranslation();
//   const { showState, handleClose, setShowState, setModelState } =
//     useContext(ModalContext);

  //   const handleShowAdd = () => {
  //     setShowState("createVendor");
  //   };
  //   const { vendors } = useVendor();

  // data of table
  const columns = [
    {
      name: "Customer Name En",
      visible: true,
      selector: (row) => row.customer_info.pms_customer_en.customer_name_en,
      sortable: true,
      reorder: true,
      cell: (row) => (
        <div className="d-flex justify-content-between align-items-center w-100">
          <div className="w-50">
            {row.customer_info.pms_customer_en.customer_name_en}
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
      name: "Email",
      selector: (row) => row.vendor_email,
      sortable: true,
      visible: true,
    },
    {
      name: "Phone",
      selector: (row) => row.vendor_mobile,
      sortable: true,
      visible: true,
    },
    {
      name: "What’s app",
      selector: (row) => row.vendor_whatsapp_phone,
      sortable: true,
      visible: true,
    },
  ];

  // filter data and egnore null values
  //   const filteredRows = vendors?.filter(
  //     (row) =>
  //       row?.customer_info?.pms_customer_en?.customer_name_en &&
  //       row?.customer_info?.pms_customer_ar?.customer_name_ar
  //   );

  // call functions of Seasons

  return (
    <>
      <div className="px-content mb-auto">
        <div className="px-card pb-2 mt-4">
          <div className="card-head d-flex p-4 pb-0 flex-wrap align-items-center">
            <div className="w-100 d-flex flex-wrap align-items-center">
              <div className="breadcrumbs-list mb-2 w-100">
                <Breadcrumb>
                  {/* <Breadcrumb.Item href="#">Home</Breadcrumb.Item> */}
                  <Breadcrumb.Item>Reservations</Breadcrumb.Item>
                  <Breadcrumb.Item active>Single Requests</Breadcrumb.Item>
                </Breadcrumb>
              </div>
              <h4>Single Requests</h4>
              {/* Button trigger modal */}
              <button
                type="button"
                className="px-btn px-blue-btn create-btn ms-auto"
                // onClick={handleShowAdd}
              >
                add new Requset
              </button>

              {/* <AddModal
                name="createVendor"
                showState={showState}
                handleClose={handleClose}
                title="Create New Request"
                component={
                  <CreateSingleRequestSection />
                  //  getBlackLists={getBlackLists}
                }
              /> */}
            </div>
          </div>
          {/* start table */}
          {/* <GeneralTable columns={columns} filteredRows={filteredRows} /> */}
          {/* end table */}
        </div>
      </div>
    </>
  );
};

export default SingleRequestSection;
