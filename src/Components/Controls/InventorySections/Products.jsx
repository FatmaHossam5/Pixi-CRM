import { Breadcrumb } from "react-bootstrap";
import AddModal from "../../Shared/AddModal/AddModal";
import GeneralTable from "../../Shared/GeneralTable/GeneralTable";
import { useContext, useEffect, useState } from "react";
import { ModalContext } from "../../Helpers/Context/ModalContext";
import CreateItem from "./../SettingsSection/GeneralSettingsSection/InventorySection/ItemSection/CreateItem";
import axios from "axios";
import { AuthContext } from "../../Helpers/Context/AuthContext";
import CreatePurchase from "./CreatePurchase";
import DeleteModal from "../../Shared/DeleteModal/DeleteModal";
import { useTranslation } from "react-i18next";
import i18next from "i18next";

const Products = () => {
  const { t } = useTranslation();
  const { baseUrlPms, Headers } = useContext(AuthContext);
  const { language } = i18next;

  const {
    showState,
    handleClose,
    modelState,
    closeModal,
    setShowState,
    setModelState,
  } = useContext(ModalContext);

  const handleShowAdd = () => {
    setShowState("createProduct");
  };

  const addPurchase = () => {
    setShowState("createPurchase");
  };
  const deleteProduct = (id) => {
    setModelState({ status: "delete" });
    console.log(id);
  };

  const handleDelete = () => {
    console.log("delete product");
  };

  const [products, setProducts] = useState();
  const getProducts_Vendor = () => {
    axios
      .get(`${baseUrlPms}/product_vendor/all/`, {
        headers: Headers,
      })
      .then((res) => {
        setProducts(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // data of table
  const columns = [
    {
      name: t("englishName"),
      visible: true,
      selector: (row) => row?.product_info?.pms_product_en?.product_name_en,
      sortable: true,
      reorder: true,
      cell: (row) => (
        <div className="d-flex justify-content-between align-items-center w-100">
          <div className="w-50">
            {row?.product_info?.pms_product_en?.product_name_en}
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
                <a className="dropdown-item">{t("edit")}</a>
              </li>
              <li>
                <button
                  className="dropdown-item text-danger"
                  onClick={() => deleteProduct(row.id)}
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
      selector: (row) => row?.product_info?.pms_product_ar?.product_name_ar,
      sortable: true,
      visible: true,
    },
    {
      name: t("inventories.minQuantity"),
      selector: (row) => row?.product_info?.margin,
      sortable: true,
      visible: true,
    },
    // {
    //   name: "Unit Price",
    //   selector: (row) => row?.margin,
    // },
    {
      name: t("inventories.vendor"),
      selector: (row) => (language === "ar" ? row?.vendor_info?.pms_vendor_ar?.vendor_name_ar : row?.vendor_info?.pms_vendor_en?.vendor_name_en),
      sortable: true,
      visible: true,
    },
  ];

  // filter data and egnore null values
  const filteredRows = products?.filter(
    (row) =>
      row?.product_info.pms_product_en.product_name_en &&
      row?.product_info.pms_product_ar.product_name_ar
  );

  useEffect(() => {
    getProducts_Vendor();
  }, []);

  return (
    <>
      <DeleteModal
        show={modelState.status === "delete"}
        closeModal={closeModal}
        fun={handleDelete}
        text={"product"}
      />
      <div className="px-content mb-auto">
        <div className="px-card pb-2 mt-4">
          <div className="card-head d-flex p-4 pb-0 flex-wrap align-items-center">
            <div className="w-100 d-flex flex-wrap align-items-center">
              <div className="breadcrumbs-list mb-2 w-100">
                <Breadcrumb>
                  {/* <Breadcrumb.Item href="#">Home</Breadcrumb.Item> */}
                  <Breadcrumb.Item>{t("inventory")}</Breadcrumb.Item>
                  <Breadcrumb.Item active>{t("inventories.products")}</Breadcrumb.Item>
                </Breadcrumb>
              </div>
              <h4>{t("inventories.products")}</h4>
              {/* Button trigger modal */}
              <button
                type="button"
                className="px-btn px-white-btn create-btn ms-auto"
                onClick={handleShowAdd}
              >
                {` ${t("createNew")} ${t("inventories.product")}`}
              </button>
              <button
                type="button"
                className="px-btn px-blue-btn create-btn ms-3"
                onClick={addPurchase}
              >
                {t("inventories.Purchase")}
              </button>

              <AddModal
                name="createProduct"
                showState={showState}
                handleClose={handleClose}
                title={`${t('createNew')} ${t("inventories.product")}`}
                component={
                  <CreateItem />
                }
              />
              <AddModal
                name="createPurchase"
                showState={showState}
                handleClose={handleClose}
                title={t('inventories.createPurchase')}
                component={
                  <CreatePurchase getProducts_Vendor={getProducts_Vendor} />
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

export default Products;
