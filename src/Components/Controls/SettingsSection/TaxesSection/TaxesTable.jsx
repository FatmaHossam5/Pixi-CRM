import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../Helpers/Context/AuthContext";
import axios from "axios";
import GeneralTable from "../../../Shared/GeneralTable/GeneralTable";
import { ModalContext } from "../../../Helpers/Context/ModalContext";
import AddModal from "../../../Shared/AddModal/AddModal";
import CreateTax from "./CreateTax";

const TaxesTable = () => {
  // context
  const { baseUrlPms, Headers } = useContext(AuthContext);
  const { modelState,showState,closeModal, handleClose, setShowState, setModelState } =
  useContext(ModalContext);

  const handleShowAdd = () => {
    setShowState("createTax");
  };
  const [taxes, setTaxes] = useState();
  const getTaxes = () => {
    axios
      .get(`${baseUrlPms}/tax/all/`, {
        headers: Headers,
      })
      .then((res) => {
        setTaxes(res.data);
        console.log(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // data of table
  const columns = [
    {
      name: "English Name",
      visible: true,
      selector: (row) => row?.pms_tax_en?.tax_name_en,
      sortable: true,
      reorder: true,
      cell: (row) => (
        <div className="d-flex justify-content-between align-items-center w-100">
          <div className="w-50">{row?.pms_tax_en?.tax_name_en}</div>
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
                  <i className="fa-kit fa-edit"></i> Edit
                </a>
              </li>
              <li>
                <a className="dropdown-item text-danger">
                  <i className="fa-kit fa-delete"></i> Delete
                </a>
              </li>
            </ul>
          </div>
        </div>
      ),
    },

    {
      name: "Arabic Name",
      selector: (row) => row.pms_tax_ar.tax_name_ar,
      sortable: true,visible: true,
    },

    {
      name: "Percentage",
      selector: (row) => `${row.tax_percentage} %`,
      sortable: true,visible: true,
    },
  ];

  // filter data and egnore null values
  const filteredRows = taxes?.filter(
    (row) => row?.pms_tax_en?.tax_name_en && row?.pms_tax_ar?.tax_name_ar
  );

  // call functions of Seasons
  useEffect(() => {
    getTaxes();
  }, []);

  return (
    <>
      {/* <DeleteModal
            show={modelState.status === "delete"}
            closeModal={closeModal}
            fun={handleDelete}
            text={"task"}
          /> */}
      <div className="px-content mb-auto">
        <div className="px-card pb-2 mt-4">
          <div className="card-head d-flex p-4 pb-0 flex-wrap align-items-center">
            <div className="w-100 d-flex flex-wrap align-items-center">
              <h4>Taxes</h4>
              {/* Button trigger modal */}
              <button
                type="button"
                className="px-btn px-blue-btn create-btn ms-auto"
                onClick={handleShowAdd}
              >
                add new Tax
              </button>

              <AddModal
                name="createTax"
                showState={showState}
                handleClose={handleClose}
                title="Create New Tax"
                component={
                  <CreateTax getTaxes={getTaxes} />
                 
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

export default TaxesTable;
