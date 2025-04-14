import React, { useContext, useEffect, useState } from "react";
import { ModalContext } from "../../../../Helpers/Context/ModalContext";
import { AuthContext } from "../../../../Helpers/Context/AuthContext";
import CreatePaymentStatement from "./CreatePaymentStatement";
import axios from "axios";
import AddModal from "../../../../Shared/AddModal/AddModal";
import GeneralTable from "../../../../Shared/GeneralTable/GeneralTable";
import { useTranslation } from "react-i18next";

const PaymentStatement = () => {
  const { t } = useTranslation();
  // context
  const { baseUrlPms, Headers } = useContext(AuthContext);
  const { showState, handleClose, setShowState } = useContext(ModalContext);
  const handleShowAdd = () => {
    setShowState("PaymentStatement");
  };

  // Payment Method API
  const [paymentStatement, setPaymentStatement] = useState([]);
  const getPaymentStatement = () => {
    axios
      .get(`${baseUrlPms}/payment_statement/all/`, {
        headers: Headers,
      })
      .then((res) => {
        setPaymentStatement(res.data);

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
      selector: (row) =>
        row?.pms_payment_statement_en?.payment_statement_name_en,
      sortable: true,
      reorder: true,
      cell: (row) => (
        <div className="d-flex justify-content-between align-items-center w-100">
          <div className="w-50">
            {row?.pms_payment_statement_en?.payment_statement_name_en}
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
      name: t("arabicName"),
      selector: (row) =>
        row.pms_payment_statement_ar?.payment_statement_name_ar,
      sortable: true, visible: true,
    },
  ];

  // filter data and egnore null values
  const filteredRows = paymentStatement?.filter(
    (row) =>
      row?.pms_payment_statement_en?.payment_method_name_en &&
      row?.pms_payment_statement_ar?.payment_statement_name_ar
  );

  // call functions of Status
  useEffect(() => {
    getPaymentStatement();
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
            <h3 className="mb-0 px-sub-taps w-50 me-auto">Payment Statement</h3>

            <button onClick={handleShowAdd} className="px-btn px-blue-btn ms-3">
              Add New Payment Statement
            </button>

            <AddModal
              name="PaymentStatement"
              showState={showState}
              handleClose={handleClose}
              title="Create New Payment Statement"
              component={
                <CreatePaymentStatement
                  getPaymentStatement={getPaymentStatement}
                />
              }
            />
          </div>

          {/*------------- start sub-taps content ----------------*/}
          <div className="tab-content" id="pills-tabContent">
            <div
              className="tab-pane fade show active"
              id="pills-Hotel"
              role="tabpanel"
              aria-labelledby="pills-Hotel-tab"
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

export default PaymentStatement;
