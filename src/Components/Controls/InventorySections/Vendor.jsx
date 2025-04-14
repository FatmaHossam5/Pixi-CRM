import AddModal from "../../Shared/AddModal/AddModal";
import GeneralTable from "../../Shared/GeneralTable/GeneralTable";
import { Breadcrumb } from "react-bootstrap";
import CreateVendor from "../SettingsSection/GeneralSettingsSection/InventorySection/VendorSection/CreateVendor";
import { useContext, useState } from "react";
import { ModalContext } from "../../Helpers/Context/ModalContext";
import useVendor from "../../Helpers/Hook/useVendor";
import DeleteModal from "../../Shared/DeleteModal/DeleteModal";
import { useTranslation } from "react-i18next";

const Vendor = () => {
  const { t } = useTranslation();
  const { modelState, showState, closeModal, handleClose, setShowState, setModelState } =
    useContext(ModalContext);

  const handleShowAdd = () => {
    setShowState("createVendor");
  };
  const { vendors } = useVendor();

  const [vendorId, setVendorId] = useState();
  const viewDetails = (id) => {
    setShowState("ViewDetails");
    setVendorId(id);
    console.log(id);
  };

  const deleteVendor = (id) => {
    setModelState({ status: "delete" });
    console.log(id);

  };

  const handleDelete = () => {
    console.log("delete vendor");
  };

  // data of table
  const columns = [
    {
      name: t("englishName"),
      visible: true,
      selector: (row) => row.pms_vendor_en.vendor_name_en,
      sortable: true,
      reorder: true,
      cell: (row) => (
        <div className="d-flex justify-content-between align-items-center w-100">
          <div className="w-50">{row.pms_vendor_en.vendor_name_en}</div>
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
                  onClick={() => {
                    viewDetails(row.id);
                  }}
                >
                  View
                </button>
              </li>
              <li>
                <a className="dropdown-item">{t("edit")}</a>
              </li>
              <li>
                <button
                  className="dropdown-item text-danger"
                  onClick={() => deleteVendor(row.id)}
                >
                  Delete
                </button>
              </li>
            </ul>
          </div>
        </div>
      ),
    },

    {
      name: t("arabicName"),
      selector: (row) => row.pms_vendor_ar.vendor_name_ar,
      sortable: true,
      visible: true,
    },

    {
      name: t("columns.email"),
      selector: (row) => row.vendor_email,
      sortable: true,
      visible: true,
    },
    {
      name: t("columns.phone"),
      selector: (row) => row.vendor_mobile,
      sortable: true,
      visible: true,
    },
    {
      name: t("columns.watsapp"),
      selector: (row) => row.vendor_whatsapp_phone,
      sortable: true,
      visible: true,
    },
  ];

  // filter data and egnore null values
  const filteredRows = vendors?.filter(
    (row) =>
      row?.pms_vendor_en.vendor_name_en &&
      row?.pms_vendor_ar.vendor_name_ar
  );

  // call functions of Seasons

  return (
    <>
      <DeleteModal
        show={modelState.status === "delete"}
        closeModal={closeModal}
        fun={handleDelete}
        text={t("inventories.vendor")}
      />
      <div className="px-content mb-auto">
        <div className="px-card pb-2 mt-4">
          <div className="card-head d-flex p-4 pb-0 flex-wrap align-items-center">
            <div className="w-100 d-flex flex-wrap align-items-center">
              <div className="breadcrumbs-list mb-2 w-100">
                <Breadcrumb>
                  {/* <Breadcrumb.Item href="#">Home</Breadcrumb.Item> */}
                  <Breadcrumb.Item>{t("inventory")}</Breadcrumb.Item>
                  <Breadcrumb.Item active>{t("inventories.allVendors")}</Breadcrumb.Item>
                </Breadcrumb>
              </div>
              <h4>{t("inventories.allVendors")}</h4>
              {/* Button trigger modal */}
              <button
                type="button"
                className="px-btn px-blue-btn create-btn ms-auto"
                onClick={handleShowAdd}
              >
                {`${t("selectInput.add")} ${t("inventories.theVendor")}`}
              </button>

              <AddModal
                name="createVendor"
                showState={showState}
                handleClose={handleClose}
                title={`${t('createNew')} ${t("vendor")}`}
                component={
                  <CreateVendor />

                }
              />

              <AddModal
                name="ViewDetails"
                showState={showState}
                handleClose={handleClose}
                title="Edit vendor"
                component={
                  <CreateVendor vendorId={vendorId} />

                  //  getBlackLists={getBlackLists}
                }
              />
            </div>
          </div>
          {/* start table */}
          <GeneralTable columns={columns} filteredRows={filteredRows} />
          {/* end table */}
        </div>
      </div>
    </>
  );
};

export default Vendor;
