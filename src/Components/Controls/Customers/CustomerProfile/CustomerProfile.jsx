import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { ModalContext } from "../../../Helpers/Context/ModalContext";
import { AuthContext } from "../../../Helpers/Context/AuthContext";
import { useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import i18next from "i18next";

const CustomerProfile = () => {
  const { CustomerId } = useParams();

  const { baseUrlPms, Headers, userId } = useContext(AuthContext);
  const {
    showState,
    handleClose,
    setShowState,
    modelState,
    closeModal,
    setModelState,
  } = useContext(ModalContext);
  const { t } = useTranslation();
  const { language } = i18next;

  const [customerDetails, setCustomerDetails] = useState([]);
  const getCustomerDetails = () => {
    axios
      .get(`${baseUrlPms}/customer/${CustomerId}/show/`, {
        headers: Headers,
      })
      .then((res) => {
        setCustomerDetails(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    getCustomerDetails();
  }, []);
  return (
    <>
      <div className="px-content mb-auto">
        <div className="px-card pb-2 mt-4">
          <div className="card-head d-flex p-4 pb-0 flex-wrap align-items-center">
            <div className="w-100 d-flex flex-wrap align-items-center">
              <div className="breadcrumbs-list mb-2 w-100">
                <ul className="d-flex">
                  <li className="breadcrumbs-item d-flex align-items-center">
                    {t("customers")}
                  </li>
                  <li className="breadcrumbs-item d-flex align-items-center ">
                    <span className="breadcrumbs-separetor ms-2">
                      <i className="fa-kit fa-right" />
                    </span>
                    {t("CustomerSection.allCustomers")}
                  </li>
                  <li className="breadcrumbs-item d-flex align-items-center">
                    <span className="breadcrumbs-separetor ms-2">
                      <i className="fa-kit fa-right" />
                    </span>
                    {language === "ar" ? customerDetails?.pms_customer_ar?.customer_name_ar : customerDetails?.pms_customer_en?.customer_name_en}
                  </li>
                  <li className="breadcrumbs-item d-flex align-items-center">
                    <span className="breadcrumbs-separetor ms-2">
                      <i className="fa-kit fa-right" />
                    </span>
                    {t("CustomerSection.profile")}
                  </li>
                  <li className="breadcrumbs-item d-flex align-items-center active-breadcrumbs">
                    <span className="breadcrumbs-separetor ms-2">
                      <i className="fa-kit fa-right" />
                    </span>
                    {t("CustomerSection.bookingHistory")}
                  </li>
                </ul>
              </div>
              <h4> {language === "ar" ? customerDetails?.pms_customer_ar?.customer_name_ar : customerDetails?.pms_customer_en?.customer_name_en}</h4>
              {/* Button trigger modal */}
              <button
                type="button"
                className="px-btn px-white-btn create-btn ms-auto"
                data-bs-toggle="modal"
                data-bs-target="#staticBackdrop"
              >
                {t("edit")}
              </button>
              <button
                type="button"
                className="px-btn px-blue-btn create-btn ms-3"
                data-bs-toggle="modal"
                data-bs-target="#staticBackdrop"
              >
                {t("CustomerSection.customerMenu.checkIn")}
              </button>
              {/* Modal */}
              <div
                className="modal fade"
                id="staticBackdrop"
                data-bs-backdrop="static"
                data-bs-keyboard="false"
                tabIndex={-1}
                aria-labelledby="staticBackdropLabel"
                aria-hidden="true"
              >
                <div className="modal-dialog modal-dialog-centered px-modal">
                  <div className="px-card modal-content p-4 w-50 m-auto">
                    <div className="modal-header">
                      <h4 className="w-100 modal-title">create new customer</h4>
                      <button
                        type="button"
                        className="btn-close"
                        data-bs-dismiss="modal"
                        aria-label="Close"
                      />
                    </div>
                    <form action className="d-flex flex-wrap ">
                      <div className="form-inputs d-flex w-100 px-3">
                        <div className="input-package mt-3 pe-2 d-flex flex-column w-50">
                          <label className="mb-2 modal-label" htmlFor>
                            customer arabic name
                          </label>
                          <input
                            type="text"
                            placeholder="Enter customer's name"
                            className="px-form-input w-100 m-auto"
                          />
                        </div>
                        <div className="input-package mt-3 ps-2 d-flex flex-column w-50">
                          <label className="mb-2 modal-label" htmlFor>
                            customer english name
                          </label>
                          <input
                            type="text"
                            placeholder="Enter customer's name"
                            className="px-form-input w-100 m-auto"
                          />
                        </div>
                      </div>
                      <div className="form-inputs d-flex w-100">
                        <div className="input-package mt-3 d-flex flex-wrap ps-3 w-100">
                          <label className="mb-2 w-100" htmlFor>
                            mobile number
                          </label>
                          <div className="px-flag-dropdown px-form-input w-15 d-flex">
                            <div className="dropdwn-wrapper  d-flex align-items-center">
                              <div className="dropdwn-img p-1 w-45">
                                <img
                                  src="assets/images/Flag_of_Egypt.svg.png"
                                  className="w-100 selected-img"
                                  alt
                                />
                              </div>
                              <div className="selected-text">+02</div>
                            </div>
                            <i className="fa-light fa-angle-down" />
                            <div className="flag-list w-100">
                              <div className="list-item d-flex">
                                <img
                                  className="w-20 m-1"
                                  src="assets/images/Flag_of_Egypt.svg.png"
                                  alt
                                />
                                <div className="text">+02</div>
                              </div>
                              <div className="list-item d-flex">
                                <img
                                  className="w-20 m-1"
                                  src="assets/images/Flag_of_Palestine.svg.png"
                                  alt
                                />
                                <div className="text">+03</div>
                              </div>
                              <div className="list-item d-flex">
                                <img
                                  className="w-20 m-1"
                                  src="assets/images/Flag_of_Qatar_(3-2).svg.png"
                                  alt
                                />
                                <div className="text">+04</div>
                              </div>
                              <div className="list-item d-flex">
                                <img
                                  className="w-20 m-1"
                                  src="assets/images/Flag_of_Egypt.svg.png"
                                  alt
                                />
                                <div className="text">+02</div>
                              </div>
                              <div className="list-item d-flex">
                                <img
                                  className="w-20 m-1"
                                  src="assets/images/Flag_of_Palestine.svg.png"
                                  alt
                                />
                                <div className="text">+03</div>
                              </div>
                              <div className="list-item d-flex">
                                <img
                                  className="w-20 m-1"
                                  src="assets/images/Flag_of_Qatar_(3-2).svg.png"
                                  alt
                                />
                                <div className="text">+04</div>
                              </div>
                              <div className="list-item d-flex">
                                <img
                                  className="w-20 m-1"
                                  src="assets/images/Flag_of_Egypt.svg.png"
                                  alt
                                />
                                <div className="text">+02</div>
                              </div>
                              <div className="list-item d-flex">
                                <img
                                  className="w-20 m-1"
                                  src="assets/images/Flag_of_Palestine.svg.png"
                                  alt
                                />
                                <div className="text">+03</div>
                              </div>
                              <div className="list-item d-flex">
                                <img
                                  className="w-20 m-1"
                                  src="assets/images/Flag_of_Qatar_(3-2).svg.png"
                                  alt
                                />
                                <div className="text">+04</div>
                              </div>
                              <div className="list-item d-flex">
                                <img
                                  className="w-20 m-1"
                                  src="assets/images/Flag_of_Egypt.svg.png"
                                  alt
                                />
                                <div className="text">+02</div>
                              </div>
                              <div className="list-item d-flex">
                                <img
                                  className="w-20 m-1"
                                  src="assets/images/Flag_of_Palestine.svg.png"
                                  alt
                                />
                                <div className="text">+03</div>
                              </div>
                              <div className="list-item d-flex">
                                <img
                                  className="w-20 m-1"
                                  src="assets/images/Flag_of_Qatar_(3-2).svg.png"
                                  alt
                                />
                                <div className="text">+04</div>
                              </div>
                              <div className="list-item d-flex">
                                <img
                                  className="w-20 m-1"
                                  src="assets/images/Flag_of_Egypt.svg.png"
                                  alt
                                />
                                <div className="text">+02</div>
                              </div>
                              <div className="list-item d-flex">
                                <img
                                  className="w-20 m-1"
                                  src="assets/images/Flag_of_Palestine.svg.png"
                                  alt
                                />
                                <div className="text">+03</div>
                              </div>
                              <div className="list-item d-flex">
                                <img
                                  className="w-20 m-1"
                                  src="assets/images/Flag_of_Qatar_(3-2).svg.png"
                                  alt
                                />
                                <div className="text">+04</div>
                              </div>
                            </div>
                          </div>
                          <div className="w-85 px-3">
                            <input
                              type="text"
                              placeholder="Enter mobile number"
                              className="px-form-input w-100"
                            />
                          </div>
                        </div>
                      </div>
                      <div className="form-inputs d-flex w-100 px-3">
                        <div className="input-package mt-3 d-flex flex-column w-100">
                          <label className="mb-2 modal-label" htmlFor>
                            email
                          </label>
                          <input
                            type="text"
                            className="px-form-input"
                            placeholder="Enter email"
                          />
                        </div>
                      </div>
                      <div className="form-inputs d-flex w-100 px-3">
                        <div className="input-package mt-3  d-flex flex-wrap justify-content-between w-100">
                          <label className="w-100" htmlFor>
                            address
                          </label>
                          <select type="text" className="px-login-input w-30 ">
                            <option value>select country</option>
                            <option value="egypt">egypt</option>
                            <option value="sudia arabia">sudia arabia</option>
                          </select>
                          <select type="text" className="px-login-input w-30 ">
                            <option value>select governorate</option>
                            <option value="cairo">cairo</option>
                            <option value="alex">alex</option>
                          </select>
                          <select type="text" className="px-login-input w-30 ">
                            <option value>select city</option>
                            <option value="naser city">naser city</option>
                            <option value="zamalek">zamalek</option>
                          </select>
                        </div>
                      </div>
                      <div className="modal-footer mt-4 w-100">
                        <button
                          type="button"
                          className="px-btn btn px-white-btn"
                          data-bs-dismiss="modal"
                        >
                          Cancel
                        </button>
                        <button type="button" className="px-btn px-blue-btn">
                          save
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
            <div className="profile-data w-100">
              <div className="card-row d-flex ">
                <div className="object d-flex w-10">
                {t("input.phone")}
                  <div className="cell-end ms-auto">.</div>
                </div>
                <div className="content w-80 ms-4">{customerDetails?.customer_mobile}</div>
              </div>
              <div className="card-row d-flex ">
                <div className="object d-flex w-10">
                {t("columns.email")}
                  <div className="cell-end ms-auto">.</div>
                </div>
                <div className="content w-80 ms-4">{customerDetails?.customer_email}</div>
              </div>
              <div className="card-row d-flex ">
                <div className="object d-flex w-10">
                {t("CustomerSection.id")}
                  <div className="cell-end ms-auto">.</div>
                </div>
                <div className="content w-80 ms-4">{customerDetails?.customer_national_id}</div>
              </div>
              <div className="card-row d-flex ">
                <div className="object d-flex w-10">
                {t("geoLocationTabs.country")}
                  <div className="cell-end ms-auto">.</div>
                </div>
                <div className="content d-flex align-items-center w-80 ms-4">
                  {customerDetails?.city_id_info?.governorate_info?.country_info?.pms_country_en?.country_name_en}
                  <div className="country-img ms-2">
                    {/* <img
                      className="w-100"
                      src="assets/images/Flag_of_Egypt.svg.png"
                      alt
                    /> */}
                  </div>
                </div>
              </div>
            </div>
            {/*----------------- start taps -----------------*/}
            <div className="px-taps">
              <ul className="nav nav-pills mt-3" id="pills-tab" role="tablist">
                <li className="nav-item" role="presentation">
                  <button
                    className="nav-link active ms-0"
                    id="pills-booking-history-tab"
                    data-bs-toggle="pill"
                    data-bs-target="#pills-booking-history"
                    type="button"
                    role="tab"
                    aria-controls="pills-booking-history"
                    aria-selected="true"
                  >
                    {t("CustomerSection.bookingHistory")}
                  </button>
                </li>
                <li className="nav-item" role="presentation">
                  <button
                    className="nav-link"
                    id="pills-staying-history-tab"
                    data-bs-toggle="pill"
                    data-bs-target="#pills-staying-history"
                    type="button"
                    role="tab"
                    aria-controls="pills-staying-history"
                    aria-selected="false"
                  >
                    {t("CustomerSection.stayingHistory")}
                  </button>
                </li>
                <li className="nav-item" role="presentation">
                  <button
                    className="nav-link"
                    id="pills-payment-information-tab"
                    data-bs-toggle="pill"
                    data-bs-target="#pills-payment-information"
                    type="button"
                    role="tab"
                    aria-controls="pills-payment-information"
                    aria-selected="false"
                  >
                    {t("CustomerSection.paymentInformation")}
                  </button>
                </li>
                <li className="nav-item" role="presentation">
                  <button
                    className="nav-link"
                    id="pills-preferences-and-feedback-tab"
                    data-bs-toggle="pill"
                    data-bs-target="#pills-preferences-and-feedback"
                    type="button"
                    role="tab"
                    aria-controls="pills-preferences-and-feedback"
                    aria-selected="false"
                  >
                    {t("CustomerSection.preferencesFeedback")}
                  </button>
                </li>
              </ul>
            </div>
            {/*------------------ end taps ------------------*/}
          </div>
        </div>
        <div className="px-card">
          {/*----------- start taps content ---------------*/}
          <div className="tab-content mt-4" id="pills-tabContent">
            {/*----------- start booking heistory content -----------*/}
            <div
              className="tab-pane fade show active"
              id="pills-booking-history"
              role="tabpanel"
              aria-labelledby="pills-booking-history-tab"
              tabIndex={0}
            >
              <div className="px-card">
                <div className="card-head d-flex p-4 pb-0 flex-wrap align-items-center">
                  <div className="w-100 d-flex align-items-center">
                    <button
                      type="button"
                      className="px-btn px-blue-btn create-btn ms-auto"
                      data-bs-toggle="modal"
                      data-bs-target="#staticBackdrop"
                    >
                      create new reservation
                    </button>
                    <div
                      className="modal fade"
                      id="staticBackdrop"
                      data-bs-backdrop="static"
                      data-bs-keyboard="false"
                      tabIndex={-1}
                      aria-labelledby="staticBackdropLabel"
                      aria-hidden="true"
                    >
                      <div className="modal-dialog modal-dialog-centered px-modal">
                        <div className="px-card modal-content p-4 w-50 m-auto">
                          <div className="modal-header">
                            <h4 className="w-100 modal-title">
                              create new hotel
                            </h4>
                            <button
                              type="button"
                              className="btn-close"
                              data-bs-dismiss="modal"
                              aria-label="Close"
                            />
                          </div>
                          <form action className="d-flex flex-wrap ">
                            <div className="form-inputs d-flex w-100 px-3">
                              <div className="input-package mt-3 pe-2 d-flex flex-column w-50">
                                <label className="mb-2 modal-label" htmlFor>
                                  hotel arabic name
                                </label>
                                <input
                                  type="text"
                                  placeholder="Enter hotel's name"
                                  className="px-form-input w-100 m-auto"
                                />
                              </div>
                              <div className="input-package mt-3 ps-2 d-flex flex-column w-50">
                                <label className="mb-2 modal-label" htmlFor>
                                  hotel english name
                                </label>
                                <input
                                  type="text"
                                  placeholder="Enter hotel's name"
                                  className="px-form-input w-100 m-auto"
                                />
                              </div>
                            </div>
                            <div className="form-inputs d-flex w-100 px-3">
                              <div className="input-package mt-3 d-flex flex-column w-100">
                                <label className="mb-2 modal-label" htmlFor>
                                  address
                                </label>
                                <textarea
                                  name
                                  id
                                  className="px-text-area"
                                  placeholder="Enter addresss details"
                                  defaultValue={""}
                                />
                              </div>
                            </div>
                            <div className="form-inputs d-flex w-100">
                              <div className="input-package mt-3 d-flex flex-wrap ps-3 w-100">
                                <label className="mb-2 w-100" htmlFor>
                                  mobile number
                                </label>
                                <div className="px-flag-dropdown px-form-input w-15 d-flex">
                                  <div className="dropdwn-wrapper  d-flex align-items-center">
                                    <div className="dropdwn-img p-1 w-45">
                                      <img
                                        src="assets/images/Flag_of_Egypt.svg.png"
                                        className="w-100 selected-img"
                                        alt
                                      />
                                    </div>
                                    <div className="selected-text">+02</div>
                                  </div>
                                  <i className="fa-light fa-angle-down" />
                                  <div className="flag-list w-100">
                                    <div className="list-item d-flex">
                                      <img
                                        className="w-20 m-1"
                                        src="assets/images/Flag_of_Egypt.svg.png"
                                        alt
                                      />
                                      <div className="text">+02</div>
                                    </div>
                                    <div className="list-item d-flex">
                                      <img
                                        className="w-20 m-1"
                                        src="assets/images/Flag_of_Palestine.svg.png"
                                        alt
                                      />
                                      <div className="text">+03</div>
                                    </div>
                                    <div className="list-item d-flex">
                                      <img
                                        className="w-20 m-1"
                                        src="assets/images/Flag_of_Qatar_(3-2).svg.png"
                                        alt
                                      />
                                      <div className="text">+04</div>
                                    </div>
                                    <div className="list-item d-flex">
                                      <img
                                        className="w-20 m-1"
                                        src="assets/images/Flag_of_Egypt.svg.png"
                                        alt
                                      />
                                      <div className="text">+02</div>
                                    </div>
                                    <div className="list-item d-flex">
                                      <img
                                        className="w-20 m-1"
                                        src="assets/images/Flag_of_Palestine.svg.png"
                                        alt
                                      />
                                      <div className="text">+03</div>
                                    </div>
                                    <div className="list-item d-flex">
                                      <img
                                        className="w-20 m-1"
                                        src="assets/images/Flag_of_Qatar_(3-2).svg.png"
                                        alt
                                      />
                                      <div className="text">+04</div>
                                    </div>
                                    <div className="list-item d-flex">
                                      <img
                                        className="w-20 m-1"
                                        src="assets/images/Flag_of_Egypt.svg.png"
                                        alt
                                      />
                                      <div className="text">+02</div>
                                    </div>
                                    <div className="list-item d-flex">
                                      <img
                                        className="w-20 m-1"
                                        src="assets/images/Flag_of_Palestine.svg.png"
                                        alt
                                      />
                                      <div className="text">+03</div>
                                    </div>
                                    <div className="list-item d-flex">
                                      <img
                                        className="w-20 m-1"
                                        src="assets/images/Flag_of_Qatar_(3-2).svg.png"
                                        alt
                                      />
                                      <div className="text">+04</div>
                                    </div>
                                    <div className="list-item d-flex">
                                      <img
                                        className="w-20 m-1"
                                        src="assets/images/Flag_of_Egypt.svg.png"
                                        alt
                                      />
                                      <div className="text">+02</div>
                                    </div>
                                    <div className="list-item d-flex">
                                      <img
                                        className="w-20 m-1"
                                        src="assets/images/Flag_of_Palestine.svg.png"
                                        alt
                                      />
                                      <div className="text">+03</div>
                                    </div>
                                    <div className="list-item d-flex">
                                      <img
                                        className="w-20 m-1"
                                        src="assets/images/Flag_of_Qatar_(3-2).svg.png"
                                        alt
                                      />
                                      <div className="text">+04</div>
                                    </div>
                                    <div className="list-item d-flex">
                                      <img
                                        className="w-20 m-1"
                                        src="assets/images/Flag_of_Egypt.svg.png"
                                        alt
                                      />
                                      <div className="text">+02</div>
                                    </div>
                                    <div className="list-item d-flex">
                                      <img
                                        className="w-20 m-1"
                                        src="assets/images/Flag_of_Palestine.svg.png"
                                        alt
                                      />
                                      <div className="text">+03</div>
                                    </div>
                                    <div className="list-item d-flex">
                                      <img
                                        className="w-20 m-1"
                                        src="assets/images/Flag_of_Qatar_(3-2).svg.png"
                                        alt
                                      />
                                      <div className="text">+04</div>
                                    </div>
                                  </div>
                                </div>
                                <div className="w-85 px-3">
                                  <input
                                    type="text"
                                    placeholder="Enter mobile number"
                                    className="px-form-input w-100"
                                  />
                                </div>
                              </div>
                            </div>
                            <div className="form-inputs d-flex w-100 px-3">
                              <div className="input-package mt-3 d-flex flex-column w-100">
                                <label className="mb-2 modal-label" htmlFor>
                                  email
                                </label>
                                <input
                                  type="text"
                                  className="px-form-input"
                                  placeholder="Enter email"
                                />
                              </div>
                            </div>
                            <div className="form-inputs d-flex w-100 px-3">
                              <div className="input-package mt-3 d-flex flex-column w-100">
                                <label className="mb-2 modal-label" htmlFor>
                                  website
                                </label>
                                <input
                                  type="text"
                                  className="px-form-input"
                                  placeholder="Enter website"
                                />
                              </div>
                            </div>
                            <div className="form-inputs d-flex w-100 px-3">
                              <div className="input-package  mt-3 d-flex flex-column w-100">
                                <label className="mb-2 " htmlFor="logo">
                                  logoo
                                </label>
                                <label
                                  className="mb-2 custom-upload-label px-form-input d-flex justify-content-center"
                                  htmlFor="logo"
                                >
                                  Add logo
                                  <i className="fa-sharp fa-light fa-plus p-1" />
                                </label>
                                <input
                                  id="logo"
                                  type="file"
                                  className="custom-upload-input"
                                />
                              </div>
                            </div>
                            <div className="modal-footer mt-4 w-100">
                              <button
                                type="button"
                                className="px-btn btn px-white-btn"
                                data-bs-dismiss="modal"
                              >
                                Cancel
                              </button>
                              <button
                                type="button"
                                className="px-btn px-blue-btn"
                              >
                                save
                              </button>
                            </div>
                          </form>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="table-search w-50">
                    <input
                      type="search"
                      className="px-form-input w-100 ps-5"
                      placeholder="search"
                    />
                    <svg
                      className="search-icon"
                      width={20}
                      height={20}
                      viewBox="0 0 20 20"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <circle
                        cx="9.8055"
                        cy="9.8055"
                        r="7.49047"
                        stroke="#939393"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M15.0153 15.4043L17.9519 18.3333"
                        stroke="#939393"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    <svg
                      className="filter-icon"
                      width={24}
                      height={24}
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M4.56517 3C3.70108 3 3 3.71286 3 4.5904V5.52644C3 6.17647 3.24719 6.80158 3.68936 7.27177L8.5351 12.4243L8.53723 12.4211C9.47271 13.3788 9.99905 14.6734 9.99905 16.0233V20.5952C9.99905 20.9007 10.3187 21.0957 10.584 20.9516L13.3436 19.4479C13.7602 19.2204 14.0201 18.7784 14.0201 18.2984V16.0114C14.0201 14.6691 14.539 13.3799 15.466 12.4243L20.3117 7.27177C20.7528 6.80158 21 6.17647 21 5.52644V4.5904C21 3.71286 20.3 3 19.4359 3H4.56517Z"
                        stroke="#939393"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                  <div className="card-head-btns w-50 d-flex my-3 justify-content-end">
                    <button className="px-btn px-gray-btn text-capitalize d-flex">
                      <div className="btn-icon w-10 me-2">
                        <i className="fa-kit fa-manage-column" />
                      </div>
                      manage columns <i className="fa-kit fa-down ms-2 mt-1" />
                    </button>
                    <button className="px-btn px-gray-btn text-capitalize d-flex align-items-center justify-content-center ms-3">
                      <div className="btn-icon w-20 pe-1">
                        <i className="fa-kit fa-exports" />
                      </div>
                      export
                    </button>
                  </div>
                </div>
                {/* start table */}
                <div className="table-responsive px-table-container">
                  <table
                    className="px-table table-borderless "
                    id="booking-history"
                  >
                    <thead className="px-thead">
                      <tr className="w-100">
                        <th scope="col">
                          <span>room number</span>
                          <i className="fa-kit fa-sort-by " />
                        </th>
                        <th scope="col">
                          reservation date <i className="fa-kit fa-sort-by" />
                        </th>
                        <th scope="col">
                          room type
                          <i className="fa-kit fa-sort-by" />
                        </th>
                        <th scope="col">
                          booking channel
                          <i className="fa-kit fa-sort-by" />
                        </th>
                        <th scope="col">
                          payment method
                          <i className="fa-kit fa-sort-by" />
                        </th>
                        <th scope="col">
                          paied
                          <i className="fa-kit fa-sort-by" />
                        </th>
                        <th scope="col">
                          discount
                          <i className="fa-kit fa-sort-by" />
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <th
                          scope="row"
                          className="d-flex justify-content-between ps-4 "
                        >
                          SB (B-1)
                          <div className="dropdown">
                            <a
                              className="btn dropdown-toggle"
                              href="#"
                              role="button"
                              data-bs-toggle="dropdown"
                              aria-expanded="false"
                            >
                              <i className="fa-regular fa-ellipsis actions" />
                            </a>
                            <ul className="dropdown-menu">
                              <li>
                                <a className="dropdown-item" href>
                                  <i className="fa-kit fa-edit" /> edit
                                </a>
                              </li>
                              <li>
                                <a
                                  className="dropdown-item text-danger"
                                  href="#"
                                >
                                  <i className="fa-kit fa-delete" /> delete
                                </a>
                              </li>
                            </ul>
                          </div>
                        </th>
                        <td>س م (م-1)</td>
                        <td>Kempinski soma bay</td>
                        <td>
                          <a className="font-2" href="all-floors.html">
                            <i className="fa-duotone fa-layer-group" />
                          </a>
                        </td>
                        <td>
                          <a
                            className="font-2"
                            href="all-building-facilities.html"
                          >
                            <i className="fa-duotone fa-car-building" />
                          </a>
                        </td>
                        <td>
                          <a
                            className="font-2"
                            href="all-building-amenities.html"
                          >
                            <i className="fa-duotone fa-album-collection-circle-plus" />
                          </a>
                        </td>
                        <td>
                          <a
                            className="font-2"
                            href="all-building-amenities.html"
                          >
                            <i className="fa-duotone fa-album-collection-circle-plus" />
                          </a>
                        </td>
                      </tr>
                      <tr>
                        <th
                          scope="row"
                          className="d-flex justify-content-between ps-4 "
                        >
                          SB (B-2)
                          <div className="dropdown">
                            <a
                              className="btn dropdown-toggle"
                              href="#"
                              role="button"
                              data-bs-toggle="dropdown"
                              aria-expanded="false"
                            >
                              <i className="fa-regular fa-ellipsis actions" />
                            </a>
                            <ul className="dropdown-menu">
                              <li>
                                <a className="dropdown-item" href>
                                  <i className="fa-kit fa-edit" /> edit
                                </a>
                              </li>
                              <li>
                                <a
                                  className="dropdown-item text-danger"
                                  href="#"
                                >
                                  <i className="fa-kit fa-delete" /> delete
                                </a>
                              </li>
                            </ul>
                          </div>
                        </th>
                        <td>س م (م-2)</td>
                        <td>Kempinski soma bay</td>
                        <td>
                          <a className="font-2" href="all-floors.html">
                            <i className="fa-duotone fa-layer-group" />
                          </a>
                        </td>
                        <td>
                          <a
                            className="font-2"
                            href="all-building-facilities.html"
                          >
                            <i className="fa-duotone fa-car-building" />
                          </a>
                        </td>
                        <td>
                          <a
                            className="font-2"
                            href="all-building-amenities.html"
                          >
                            <i className="fa-duotone fa-album-collection-circle-plus" />
                          </a>
                        </td>
                        <td>
                          <a
                            className="font-2"
                            href="all-building-amenities.html"
                          >
                            <i className="fa-duotone fa-album-collection-circle-plus" />
                          </a>
                        </td>
                      </tr>
                      <tr>
                        <th
                          scope="row"
                          className="d-flex justify-content-between ps-4 "
                        >
                          NH (B-1)
                          <div className="dropdown">
                            <a
                              className="btn dropdown-toggle"
                              href="#"
                              role="button"
                              data-bs-toggle="dropdown"
                              aria-expanded="false"
                            >
                              <i className="fa-regular fa-ellipsis actions" />
                            </a>
                            <ul className="dropdown-menu">
                              <li>
                                <a className="dropdown-item" href>
                                  <i className="fa-kit fa-edit" /> edit
                                </a>
                              </li>
                              <li>
                                <a
                                  className="dropdown-item text-danger"
                                  href="#"
                                >
                                  <i className="fa-kit fa-delete" /> delete
                                </a>
                              </li>
                            </ul>
                          </div>
                        </th>
                        <td>ف ن (م-1)</td>
                        <td>Kempinski nile hotel</td>
                        <td>
                          <a className="font-2" href="all-floors.html">
                            <i className="fa-duotone fa-layer-group" />
                          </a>
                        </td>
                        <td>
                          <a
                            className="font-2"
                            href="all-building-facilities.html"
                          >
                            <i className="fa-duotone fa-car-building" />
                          </a>
                        </td>
                        <td>
                          <a
                            className="font-2"
                            href="all-building-amenities.html"
                          >
                            <i className="fa-duotone fa-album-collection-circle-plus" />
                          </a>
                        </td>
                        <td>
                          <a
                            className="font-2"
                            href="all-building-amenities.html"
                          >
                            <i className="fa-duotone fa-album-collection-circle-plus" />
                          </a>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                {/* end table */}
              </div>
            </div>
            {/*----------- end booking heistory content -----------*/}
            {/*----------- start staying history content -----------*/}
            <div
              className="tab-pane fade"
              id="pills-staying-history"
              role="tabpanel"
              aria-labelledby="pills-staying-history-tab"
              tabIndex={0}
            >
              <div className="px-card">
                <div className="card-head d-flex p-4 pb-0 flex-wrap align-items-center">
                  <div className="w-100 d-flex align-items-center">
                    <button
                      type="button"
                      className="px-btn px-blue-btn create-btn ms-auto"
                      data-bs-toggle="modal"
                      data-bs-target="#branch"
                    >
                      create new reservation
                    </button>
                    <div
                      className="modal fade"
                      id="branch"
                      data-bs-backdrop="static"
                      data-bs-keyboard="false"
                      tabIndex={-1}
                      aria-labelledby="branchLabel"
                      aria-hidden="true"
                    >
                      <div className="modal-dialog modal-dialog-centered px-modal">
                        <div className="px-card modal-content p-4 w-50 m-auto">
                          <div className="modal-header">
                            <h4 className="w-100 modal-title">
                              create new branch
                            </h4>
                            <button
                              type="button"
                              className="btn-close"
                              data-bs-dismiss="modal"
                              aria-label="Close"
                            />
                          </div>
                          <form action className="d-flex flex-wrap ">
                            <div className="form-inputs d-flex w-100 px-3">
                              <div className="input-package mt-3 pe-2 d-flex flex-column w-50">
                                <label className="mb-2 modal-label" htmlFor>
                                  branch arabic name
                                </label>
                                <input
                                  type="text"
                                  placeholder="Enter branch's name"
                                  className="px-form-input w-100 m-auto"
                                />
                              </div>
                              <div className="input-package mt-3 ps-2 d-flex flex-column w-50">
                                <label className="mb-2 modal-label" htmlFor>
                                  branch english name
                                </label>
                                <input
                                  type="text"
                                  placeholder="Enter branch's name"
                                  className="px-form-input w-100 m-auto"
                                />
                              </div>
                            </div>
                            <div className="form-inputs d-flex w-100 px-3">
                              <div className="input-package mt-3 d-flex flex-column w-100">
                                <label className="mb-2 modal-label" htmlFor>
                                  hotel
                                </label>
                                <select
                                  name="hotel"
                                  id="hotel"
                                  className="px-login-input"
                                >
                                  <option value>select hotel</option>
                                </select>
                              </div>
                            </div>
                            <div className="px-3 mt-3">
                              <label className=" modal-label" htmlFor="address">
                                address
                              </label>
                            </div>
                            <div className="form-inputs d-flex justify-content-between w-100 px-3">
                              <div className="input-package mt-3 d-flex flex-column w-30">
                                <select
                                  name="country"
                                  id="country"
                                  className="px-login-input"
                                >
                                  <option value>select country</option>
                                </select>
                              </div>
                              <div className="input-package mt-3 d-flex flex-column w-30">
                                <select
                                  name="governorte"
                                  id="governorte"
                                  className="px-login-input"
                                >
                                  <option value>select governorte</option>
                                </select>
                              </div>
                              <div className="input-package mt-3 d-flex flex-column w-30">
                                <select
                                  name="city"
                                  id="city"
                                  className="px-login-input"
                                >
                                  <option value>select city</option>
                                </select>
                              </div>
                            </div>
                            <div className="form-inputs d-flex w-100 px-3">
                              <div className="input-package mt-3 d-flex flex-column w-100">
                                <label className="mb-2 modal-label" htmlFor>
                                  addons
                                </label>
                                <select
                                  name="addons"
                                  id="addons"
                                  className="px-login-input"
                                >
                                  <option value>select addons</option>
                                </select>
                              </div>
                            </div>
                            <div className="form-inputs d-flex w-100">
                              <div className="input-package mt-3 d-flex flex-wrap ps-3 w-100">
                                <label className="mb-2 w-100" htmlFor>
                                  mobile number
                                </label>
                                <div className="px-flag-dropdown px-form-input w-15 d-flex">
                                  <div className="dropdwn-wrapper  d-flex align-items-center">
                                    <div className="dropdwn-img p-1 w-45">
                                      <img
                                        src="assets/images/Flag_of_Egypt.svg.png"
                                        className="w-100 selected-img"
                                        alt
                                      />
                                    </div>
                                    <div className="selected-text">+02</div>
                                  </div>
                                  <i className="fa-light fa-angle-down" />
                                  <div className="flag-list w-100">
                                    <div className="list-item d-flex">
                                      <img
                                        className="w-20 m-1"
                                        src="assets/images/Flag_of_Egypt.svg.png"
                                        alt
                                      />
                                      <div className="text">+02</div>
                                    </div>
                                    <div className="list-item d-flex">
                                      <img
                                        className="w-20 m-1"
                                        src="assets/images/Flag_of_Palestine.svg.png"
                                        alt
                                      />
                                      <div className="text">+03</div>
                                    </div>
                                    <div className="list-item d-flex">
                                      <img
                                        className="w-20 m-1"
                                        src="assets/images/Flag_of_Qatar_(3-2).svg.png"
                                        alt
                                      />
                                      <div className="text">+04</div>
                                    </div>
                                    <div className="list-item d-flex">
                                      <img
                                        className="w-20 m-1"
                                        src="assets/images/Flag_of_Egypt.svg.png"
                                        alt
                                      />
                                      <div className="text">+02</div>
                                    </div>
                                    <div className="list-item d-flex">
                                      <img
                                        className="w-20 m-1"
                                        src="assets/images/Flag_of_Palestine.svg.png"
                                        alt
                                      />
                                      <div className="text">+03</div>
                                    </div>
                                    <div className="list-item d-flex">
                                      <img
                                        className="w-20 m-1"
                                        src="assets/images/Flag_of_Qatar_(3-2).svg.png"
                                        alt
                                      />
                                      <div className="text">+04</div>
                                    </div>
                                    <div className="list-item d-flex">
                                      <img
                                        className="w-20 m-1"
                                        src="assets/images/Flag_of_Egypt.svg.png"
                                        alt
                                      />
                                      <div className="text">+02</div>
                                    </div>
                                    <div className="list-item d-flex">
                                      <img
                                        className="w-20 m-1"
                                        src="assets/images/Flag_of_Palestine.svg.png"
                                        alt
                                      />
                                      <div className="text">+03</div>
                                    </div>
                                    <div className="list-item d-flex">
                                      <img
                                        className="w-20 m-1"
                                        src="assets/images/Flag_of_Qatar_(3-2).svg.png"
                                        alt
                                      />
                                      <div className="text">+04</div>
                                    </div>
                                    <div className="list-item d-flex">
                                      <img
                                        className="w-20 m-1"
                                        src="assets/images/Flag_of_Egypt.svg.png"
                                        alt
                                      />
                                      <div className="text">+02</div>
                                    </div>
                                    <div className="list-item d-flex">
                                      <img
                                        className="w-20 m-1"
                                        src="assets/images/Flag_of_Palestine.svg.png"
                                        alt
                                      />
                                      <div className="text">+03</div>
                                    </div>
                                    <div className="list-item d-flex">
                                      <img
                                        className="w-20 m-1"
                                        src="assets/images/Flag_of_Qatar_(3-2).svg.png"
                                        alt
                                      />
                                      <div className="text">+04</div>
                                    </div>
                                    <div className="list-item d-flex">
                                      <img
                                        className="w-20 m-1"
                                        src="assets/images/Flag_of_Egypt.svg.png"
                                        alt
                                      />
                                      <div className="text">+02</div>
                                    </div>
                                    <div className="list-item d-flex">
                                      <img
                                        className="w-20 m-1"
                                        src="assets/images/Flag_of_Palestine.svg.png"
                                        alt
                                      />
                                      <div className="text">+03</div>
                                    </div>
                                    <div className="list-item d-flex">
                                      <img
                                        className="w-20 m-1"
                                        src="assets/images/Flag_of_Qatar_(3-2).svg.png"
                                        alt
                                      />
                                      <div className="text">+04</div>
                                    </div>
                                  </div>
                                </div>
                                <div className="w-85 px-3">
                                  <input
                                    type="text"
                                    placeholder="Enter mobile number"
                                    className="px-form-input w-100"
                                  />
                                </div>
                              </div>
                            </div>
                            <div className="form-inputs d-flex w-100 px-3">
                              <div className="input-package mt-3 d-flex flex-column w-100">
                                <label className="mb-2 modal-label" htmlFor>
                                  email
                                </label>
                                <input
                                  type="text"
                                  className="px-form-input"
                                  placeholder="Enter email"
                                />
                              </div>
                            </div>
                            <div className="form-inputs d-flex w-100 px-3">
                              <div className="input-package mt-3 d-flex flex-column w-100">
                                <label className="mb-2 modal-label" htmlFor>
                                  website
                                </label>
                                <input
                                  type="text"
                                  className="px-form-input"
                                  placeholder="Enter website"
                                />
                              </div>
                            </div>
                            <div className="form-inputs d-flex w-100 px-3">
                              <div className="input-package  mt-3 d-flex flex-column w-100">
                                <label className="mb-2 " htmlFor="logo">
                                  logo
                                </label>
                                <label
                                  className="mb-2 custom-upload-label px-form-input d-flex justify-content-center"
                                  htmlFor="branchLogo"
                                >
                                  Add logozz
                                  <i className="fa-sharp fa-light fa-plus p-1" />
                                </label>
                                <input
                                  type="file"
                                  id="branchLogo"
                                  className="custom-upload-input"
                                />
                              </div>
                            </div>
                            <div className="modal-footer mt-4 w-100">
                              <button
                                type="button"
                                className="px-btn btn px-white-btn"
                                data-bs-dismiss="modal"
                              >
                                Cancel
                              </button>
                              <button
                                type="button"
                                className="px-btn px-blue-btn"
                              >
                                save
                              </button>
                            </div>
                          </form>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="table-search w-50">
                    <input
                      type="search"
                      className="px-form-input w-100 ps-5"
                      placeholder="search"
                    />
                    <svg
                      className="search-icon"
                      width={20}
                      height={20}
                      viewBox="0 0 20 20"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <circle
                        cx="9.8055"
                        cy="9.8055"
                        r="7.49047"
                        stroke="#939393"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M15.0153 15.4043L17.9519 18.3333"
                        stroke="#939393"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    <svg
                      className="filter-icon"
                      width={24}
                      height={24}
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M4.56517 3C3.70108 3 3 3.71286 3 4.5904V5.52644C3 6.17647 3.24719 6.80158 3.68936 7.27177L8.5351 12.4243L8.53723 12.4211C9.47271 13.3788 9.99905 14.6734 9.99905 16.0233V20.5952C9.99905 20.9007 10.3187 21.0957 10.584 20.9516L13.3436 19.4479C13.7602 19.2204 14.0201 18.7784 14.0201 18.2984V16.0114C14.0201 14.6691 14.539 13.3799 15.466 12.4243L20.3117 7.27177C20.7528 6.80158 21 6.17647 21 5.52644V4.5904C21 3.71286 20.3 3 19.4359 3H4.56517Z"
                        stroke="#939393"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                  <div className="card-head-btns w-50 d-flex my-3 justify-content-end">
                    <button className="px-btn px-gray-btn text-capitalize d-flex">
                      <div className="btn-icon w-10 me-2">
                        <i className="fa-kit fa-manage-column" />
                      </div>
                      manage columns <i className="fa-kit fa-down ms-2 mt-1" />
                    </button>
                    <button className="px-btn px-gray-btn text-capitalize d-flex align-items-center justify-content-center ms-3">
                      <div className="btn-icon w-20 pe-1">
                        <i className="fa-kit fa-exports" />
                      </div>
                      export
                    </button>
                  </div>
                </div>
                {/* start table */}
                <div className="table-responsive px-table-container">
                  <table
                    className="px-table table-borderless w-100"
                    id="staying-history-table"
                  >
                    <thead className="px-thead">
                      <tr className="w-100">
                        <th scope="col">
                          <span>room number</span>
                          <i className="fa-kit fa-sort-by " />
                        </th>
                        <th scope="col">
                          check in date
                          <i className="fa-kit fa-sort-by" />
                        </th>
                        <th scope="col">
                          check out date
                          <i className="fa-kit fa-sort-by" />
                        </th>
                        <th scope="col">
                          night count
                          <i className="fa-kit fa-sort-by" />
                        </th>
                        <th scope="col">
                          dependants
                          <i className="fa-kit fa-sort-by" />
                        </th>
                        <th scope="col">
                          services
                          <i className="fa-kit fa-sort-by" />
                        </th>
                        <th scope="col">
                          addons
                          <i className="fa-kit fa-sort-by" />
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <th
                          scope="row"
                          className="d-flex justify-content-between ps-4 "
                        >
                          SB (B-1)
                          <div className="dropdown">
                            <a
                              className="btn dropdown-toggle"
                              href="#"
                              role="button"
                              data-bs-toggle="dropdown"
                              aria-expanded="false"
                            >
                              <i className="fa-regular fa-ellipsis actions" />
                            </a>
                            <ul className="dropdown-menu">
                              <li>
                                <a className="dropdown-item" href>
                                  <i className="fa-kit fa-edit" /> edit
                                </a>
                              </li>
                              <li>
                                <a
                                  className="dropdown-item text-danger"
                                  href="#"
                                >
                                  <i className="fa-kit fa-delete" /> delete
                                </a>
                              </li>
                            </ul>
                          </div>
                        </th>
                        <td>س م (م-1)</td>
                        <td>01099338665</td>
                        <td>Kempinski soma bay</td>
                        <td>pla pla pla</td>
                        <td>alaa15awad@gmail.com</td>
                        <td>
                          <a className="under-line" href>
                            see all addons
                          </a>
                        </td>
                      </tr>
                      <tr>
                        <th
                          scope="row"
                          className="d-flex justify-content-between ps-4 "
                        >
                          SB (B-2)
                          <div className="dropdown">
                            <a
                              className="btn dropdown-toggle"
                              href="#"
                              role="button"
                              data-bs-toggle="dropdown"
                              aria-expanded="false"
                            >
                              <i className="fa-regular fa-ellipsis actions" />
                            </a>
                            <ul className="dropdown-menu">
                              <li>
                                <a className="dropdown-item" href>
                                  <i className="fa-kit fa-edit" /> edit
                                </a>
                              </li>
                              <li>
                                <a
                                  className="dropdown-item text-danger"
                                  href="#"
                                >
                                  <i className="fa-kit fa-delete" /> delete
                                </a>
                              </li>
                            </ul>
                          </div>
                        </th>
                        <td>س م (م-2)</td>
                        <td>01099338665</td>
                        <td>Kempinski nile branch</td>
                        <td>pla pla pla</td>
                        <td>alaa15awad@gmail.com</td>
                        <td>see all addons</td>
                      </tr>
                      <tr>
                        <th
                          scope="row"
                          className="d-flex justify-content-between ps-4 "
                        >
                          NH (B-1)
                          <div className="dropdown">
                            <a
                              className="btn dropdown-toggle"
                              href="#"
                              role="button"
                              data-bs-toggle="dropdown"
                              aria-expanded="false"
                            >
                              <i className="fa-regular fa-ellipsis actions" />
                            </a>
                            <ul className="dropdown-menu">
                              <li>
                                <a className="dropdown-item" href>
                                  <i className="fa-kit fa-edit" /> edit
                                </a>
                              </li>
                              <li>
                                <a
                                  className="dropdown-item text-danger"
                                  href="#"
                                >
                                  <i className="fa-kit fa-delete" /> delete
                                </a>
                              </li>
                            </ul>
                          </div>
                        </th>
                        <td>ف ن (م-1)</td>
                        <td>01099338665</td>
                        <td>Kempinski soma bay</td>
                        <td>pla pla l a</td>
                        <td>alaa15awad@gmail.com</td>
                        <td>see all addons</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                {/* end table */}
              </div>
            </div>
            {/*----------- end staying history content -----------*/}
            {/*----------- start payment information content -----------*/}
            <div
              className="tab-pane fade"
              id="pills-payment-information"
              role="tabpanel"
              aria-labelledby="pills-payment-information-tab"
              tabIndex={0}
            >
              <div className="px-card">
                <div className="card-head d-flex p-4 pb-0 flex-wrap align-items-center">
                  <div className="w-100 d-flex align-items-center">
                    <button
                      type="button"
                      className="px-btn px-blue-btn create-btn ms-auto"
                      data-bs-toggle="modal"
                      data-bs-target="#building"
                    >
                      create new reservation
                    </button>
                    <div
                      className="modal fade"
                      id="building"
                      data-bs-backdrop="static"
                      data-bs-keyboard="false"
                      tabIndex={-1}
                      aria-labelledby="buildingLabel"
                      aria-hidden="true"
                    >
                      <div className="modal-dialog modal-dialog-centered px-modal">
                        <div className="px-card modal-content p-4 w-50 m-auto">
                          <div className="modal-header">
                            <h4 className="w-100 modal-title">
                              create new building
                            </h4>
                            <button
                              type="button"
                              className="btn-close"
                              data-bs-dismiss="modal"
                              aria-label="Close"
                            />
                          </div>
                          <form action className="d-flex flex-wrap ">
                            <div className="form-inputs d-flex w-100 px-3">
                              <div className="input-package mt-3 pe-2 d-flex flex-column w-50">
                                <label className="mb-2 modal-label" htmlFor>
                                  building arabic name
                                </label>
                                <input
                                  type="text"
                                  placeholder="Enter building's name"
                                  className="px-form-input w-100 m-auto"
                                />
                              </div>
                              <div className="input-package mt-3 ps-2 d-flex flex-column w-50">
                                <label className="mb-2 modal-label" htmlFor>
                                  building english name
                                </label>
                                <input
                                  type="text"
                                  placeholder="Enter building's name"
                                  className="px-form-input w-100 m-auto"
                                />
                              </div>
                            </div>
                            <div className="form-inputs d-flex w-100 px-3">
                              <div className="input-package mt-3 d-flex flex-column pe-2 w-50">
                                <label
                                  className="mb-2 modal-label"
                                  htmlFor="branch"
                                >
                                  hotel
                                </label>
                                <select
                                  name="hotel"
                                  id="hotel"
                                  className="px-login-input"
                                >
                                  <option value>select hotel</option>
                                </select>
                              </div>
                              <div className="input-package mt-3 d-flex flex-column ps-2 w-50">
                                <label
                                  className="mb-2 modal-label"
                                  htmlFor="branch"
                                >
                                  branch
                                </label>
                                <select
                                  name="branch"
                                  id="branch"
                                  className="px-login-input"
                                >
                                  <option value>select branch</option>
                                </select>
                              </div>
                            </div>
                            <div className="form-inputs d-flex w-100 px-3">
                              <div className="input-package mt-3 d-flex flex-column pe-2 w-50">
                                <label
                                  className="mb-2 modal-label"
                                  htmlFor="facility"
                                >
                                  facilities
                                </label>
                                <select
                                  name="facility"
                                  id="facility"
                                  className="px-login-input"
                                >
                                  <option value>select facility</option>
                                </select>
                              </div>
                              <div className="input-package mt-3 d-flex flex-column ps-2 w-50">
                                <label
                                  className="mb-2 modal-label"
                                  htmlFor="amenity"
                                >
                                  amenities
                                </label>
                                <select
                                  name="amenity"
                                  id="amenity"
                                  className="px-login-input"
                                >
                                  <option value>select amenity</option>
                                </select>
                              </div>
                            </div>
                            <div className="modal-footer mt-4 w-100">
                              <button
                                type="button"
                                className="px-btn btn px-white-btn"
                                data-bs-dismiss="modal"
                              >
                                Cancel
                              </button>
                              <button
                                type="button"
                                className="px-btn px-blue-btn"
                              >
                                save
                              </button>
                            </div>
                          </form>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="table-search w-50">
                    <input
                      type="search"
                      className="px-form-input w-100 ps-5"
                      placeholder="search"
                    />
                    <svg
                      className="search-icon"
                      width={20}
                      height={20}
                      viewBox="0 0 20 20"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <circle
                        cx="9.8055"
                        cy="9.8055"
                        r="7.49047"
                        stroke="#939393"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M15.0153 15.4043L17.9519 18.3333"
                        stroke="#939393"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    <svg
                      className="filter-icon"
                      width={24}
                      height={24}
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M4.56517 3C3.70108 3 3 3.71286 3 4.5904V5.52644C3 6.17647 3.24719 6.80158 3.68936 7.27177L8.5351 12.4243L8.53723 12.4211C9.47271 13.3788 9.99905 14.6734 9.99905 16.0233V20.5952C9.99905 20.9007 10.3187 21.0957 10.584 20.9516L13.3436 19.4479C13.7602 19.2204 14.0201 18.7784 14.0201 18.2984V16.0114C14.0201 14.6691 14.539 13.3799 15.466 12.4243L20.3117 7.27177C20.7528 6.80158 21 6.17647 21 5.52644V4.5904C21 3.71286 20.3 3 19.4359 3H4.56517Z"
                        stroke="#939393"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                  <div className="card-head-btns w-50 d-flex my-3 justify-content-end">
                    <button className="px-btn px-gray-btn text-capitalize d-flex">
                      <div className="btn-icon w-10 me-2">
                        <i className="fa-kit fa-manage-column" />
                      </div>
                      manage columns <i className="fa-kit fa-down ms-2 mt-1" />
                    </button>
                    <button className="px-btn px-gray-btn text-capitalize d-flex align-items-center justify-content-center ms-3">
                      <div className="btn-icon w-20 pe-1">
                        <i className="fa-kit fa-exports" />
                      </div>
                      export
                    </button>
                  </div>
                </div>
                {/* start table */}
                <div className="table-responsive px-table-container">
                  <table
                    className="px-table table-borderless w-100"
                    id="payment-information-table"
                  >
                    <thead className="px-thead">
                      <tr className="w-100">
                        <th scope="col">
                          <span>roon number</span>
                          <i className="fa-kit fa-sort-by " />
                        </th>
                        <th scope="col">
                          room charges
                          <i className="fa-kit fa-sort-by" />
                        </th>
                        <th scope="col">
                          payment method
                          <i className="fa-kit fa-sort-by" />
                        </th>
                        <th scope="col">
                          discount
                          <i className="fa-kit fa-sort-by" />
                        </th>
                        <th scope="col">
                          invoices
                          <i className="fa-kit fa-sort-by" />
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <th
                          scope="row"
                          className="d-flex justify-content-between ps-4 "
                        >
                          SB (B-1)
                          <div className="dropdown">
                            <a
                              className="btn dropdown-toggle"
                              href="#"
                              role="button"
                              data-bs-toggle="dropdown"
                              aria-expanded="false"
                            >
                              <i className="fa-regular fa-ellipsis actions" />
                            </a>
                            <ul className="dropdown-menu">
                              <li>
                                <a className="dropdown-item" href>
                                  <i className="fa-kit fa-edit" /> edit
                                </a>
                              </li>
                              <li>
                                <a
                                  className="dropdown-item text-danger"
                                  href="#"
                                >
                                  <i className="fa-kit fa-delete" /> delete
                                </a>
                              </li>
                            </ul>
                          </div>
                        </th>
                        <td>س م (م-1)</td>
                        <td>Kempinski soma bay</td>
                        <td>
                          <a className="font-2" href="all-floors.html">
                            <i className="fa-duotone fa-layer-group" />
                          </a>
                        </td>
                        <td>
                          <a
                            className="font-2"
                            href="all-building-facilities.html"
                          >
                            <i className="fa-duotone fa-car-building" />
                          </a>
                        </td>
                      </tr>
                      <tr>
                        <th
                          scope="row"
                          className="d-flex justify-content-between ps-4 "
                        >
                          SB (B-2)
                          <div className="dropdown">
                            <a
                              className="btn dropdown-toggle"
                              href="#"
                              role="button"
                              data-bs-toggle="dropdown"
                              aria-expanded="false"
                            >
                              <i className="fa-regular fa-ellipsis actions" />
                            </a>
                            <ul className="dropdown-menu">
                              <li>
                                <a className="dropdown-item" href>
                                  <i className="fa-kit fa-edit" /> edit
                                </a>
                              </li>
                              <li>
                                <a
                                  className="dropdown-item text-danger"
                                  href="#"
                                >
                                  <i className="fa-kit fa-delete" /> delete
                                </a>
                              </li>
                            </ul>
                          </div>
                        </th>
                        <td>س م (م-2)</td>
                        <td>Kempinski soma bay</td>
                        <td>
                          <a className="font-2" href="all-floors.html">
                            <i className="fa-duotone fa-layer-group" />
                          </a>
                        </td>
                        <td>
                          <a
                            className="font-2"
                            href="all-building-facilities.html"
                          >
                            <i className="fa-duotone fa-car-building" />
                          </a>
                        </td>
                      </tr>
                      <tr>
                        <th
                          scope="row"
                          className="d-flex justify-content-between ps-4 "
                        >
                          NH (B-1)
                          <div className="dropdown">
                            <a
                              className="btn dropdown-toggle"
                              href="#"
                              role="button"
                              data-bs-toggle="dropdown"
                              aria-expanded="false"
                            >
                              <i className="fa-regular fa-ellipsis actions" />
                            </a>
                            <ul className="dropdown-menu">
                              <li>
                                <a className="dropdown-item" href>
                                  <i className="fa-kit fa-edit" /> edit
                                </a>
                              </li>
                              <li>
                                <a
                                  className="dropdown-item text-danger"
                                  href="#"
                                >
                                  <i className="fa-kit fa-delete" /> delete
                                </a>
                              </li>
                            </ul>
                          </div>
                        </th>
                        <td>ف ن (م-1)</td>
                        <td>Kempinski nile hotel</td>
                        <td>
                          <a className="font-2" href="all-floors.html">
                            <i className="fa-duotone fa-layer-group" />
                          </a>
                        </td>
                        <td>
                          <a
                            className="font-2"
                            href="all-building-facilities.html"
                          >
                            <i className="fa-duotone fa-car-building" />
                          </a>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                {/* end table */}
              </div>
            </div>
            {/*----------- end payment information content -----------*/}
            {/*----------- start preferences and feedback content -----------*/}
            <div
              className="tab-pane fade"
              id="pills-preferences-and-feedback"
              role="tabpanel"
              aria-labelledby="pills-preferences-and-feedback-tab"
              tabIndex={0}
            >
              <div className="px-card">
                <div className="card-head d-flex p-4 pb-0 flex-wrap align-items-center">
                  <div className="w-100 d-flex align-items-center">
                    <button
                      type="button"
                      className="px-btn px-blue-btn create-btn ms-auto"
                      data-bs-toggle="modal"
                      data-bs-target="#room"
                    >
                      create new reservation
                    </button>
                    <div
                      className="modal fade"
                      id="room"
                      data-bs-backdrop="static"
                      data-bs-keyboard="false"
                      tabIndex={-1}
                      aria-labelledby="roomLabel"
                      aria-hidden="true"
                    >
                      <div className="modal-dialog modal-dialog-centered px-modal">
                        <div className="px-card modal-content p-4 w-50 m-auto">
                          <div className="modal-header">
                            <h4 className="w-100 modal-title">
                              create new room
                            </h4>
                            <button
                              type="button"
                              className="btn-close"
                              data-bs-dismiss="modal"
                              aria-label="Close"
                            />
                          </div>
                          <form action className="d-flex flex-wrap ">
                            <div className="form-inputs d-flex justify-content-between w-100 px-3">
                              <div className="input-package mt-3 pe-2 d-flex flex-column w-35">
                                <label
                                  className="mb-2 modal-label"
                                  htmlFor="EnglishNamePrefix"
                                >
                                  English Name Prefix
                                </label>
                                <input
                                  id="EnglishNamePrefix"
                                  type="text"
                                  placeholder="Enter room’s name prefix"
                                  className="px-form-input w-100"
                                />
                              </div>
                              <div className="input-package mt-3 px-2 d-flex flex-column w-35">
                                <label
                                  className="mb-2 modal-label"
                                  htmlFor="EnglishNameNumber"
                                >
                                  English Name Number
                                </label>
                                <input
                                  type="text"
                                  id="EnglishNameNumber"
                                  placeholder="Enter room’s number"
                                  className="px-form-input w-100"
                                />
                              </div>
                              <div className="input-package mt-3 ps-2 d-flex flex-column w-35">
                                <label
                                  className="mb-2 modal-label"
                                  htmlFor="EnglishNameSuffix"
                                >
                                  English Name Suffix
                                </label>
                                <input
                                  type="text"
                                  id="EnglishNameSuffix"
                                  placeholder="Enter room’s name suffix"
                                  className="px-form-input w-100"
                                />
                              </div>
                            </div>
                            <div className="form-inputs d-flex justify-content-between w-100 px-3">
                              <div className="input-package mt-3 pe-2 d-flex flex-column w-35">
                                <label
                                  className="mb-2 modal-label"
                                  htmlFor="ArabicNamePrefix"
                                >
                                  Arabic Name Prefix
                                </label>
                                <input
                                  id="ArabicNamePrefix"
                                  type="text"
                                  placeholder="Enter room’s name prefix"
                                  className="px-form-input w-100"
                                />
                              </div>
                              <div className="input-package mt-3 px-2 d-flex flex-column w-35">
                                <label
                                  className="mb-2 modal-label"
                                  htmlFor="ArabicNameNumber"
                                >
                                  Arabic Name Number
                                </label>
                                <input
                                  type="text"
                                  id="ArabicNameNumber"
                                  placeholder="Enter room’s number"
                                  className="px-form-input w-100"
                                />
                              </div>
                              <div className="input-package mt-3 ps-2 d-flex flex-column w-35">
                                <label
                                  className="mb-2 modal-label"
                                  htmlFor="ArabicNameSuffix"
                                >
                                  Arabic Name Suffix
                                </label>
                                <input
                                  type="text"
                                  id="EnglishNameSuffix"
                                  placeholder="Enter room’s name suffix"
                                  className="px-form-input w-100"
                                />
                              </div>
                            </div>
                            <div className="form-inputs d-flex justify-content-between w-100 px-3">
                              <div className="input-package mt-3 pe-2 d-flex flex-column w-35">
                                <label
                                  className="mb-2 modal-label"
                                  htmlFor="RoomStatus"
                                >
                                  Room Status
                                </label>
                                <select
                                  name="RoomStatus"
                                  id="RoomStatus"
                                  className="px-login-input"
                                >
                                  <option value>Select Room Status</option>
                                </select>
                              </div>
                              <div className="input-package mt-3 px-2 d-flex flex-column w-35">
                                <label
                                  className="mb-2 modal-label"
                                  htmlFor="RoomType"
                                >
                                  Room Type
                                </label>
                                <select
                                  name="RoomType"
                                  id="RoomType"
                                  className="px-login-input"
                                >
                                  <option value>Select Room Type</option>
                                </select>
                              </div>
                              <div className="input-package mt-3 ps-2 d-flex flex-column w-35">
                                <label
                                  className="mb-2 modal-label"
                                  htmlFor="RoomView"
                                >
                                  Room View
                                </label>
                                <select
                                  name="RoomView"
                                  id="RoomView"
                                  className="px-login-input"
                                >
                                  <option value>Select Room View</option>
                                </select>
                              </div>
                            </div>
                            <div className="form-inputs d-flex justify-content-between w-100 px-3">
                              <div className="input-package mt-3 pe-2 d-flex flex-column w-50">
                                <label
                                  className="mb-2 modal-label"
                                  htmlFor="hotel"
                                >
                                  hotel
                                </label>
                                <select
                                  name="hotel"
                                  id="hotel"
                                  className="px-login-input"
                                >
                                  <option value>Select hotel</option>
                                </select>
                              </div>
                              <div className="input-package mt-3 ps-2 d-flex flex-column w-50">
                                <label
                                  className="mb-2 modal-label"
                                  htmlFor="branch"
                                >
                                  branch
                                </label>
                                <select
                                  name="branch"
                                  id="branch"
                                  className="px-login-input"
                                >
                                  <option value>Select branch</option>
                                </select>
                              </div>
                            </div>
                            <div className="form-inputs d-flex justify-content-between w-100 px-3">
                              <div className="input-package mt-3 pe-2 d-flex flex-column w-50">
                                <label
                                  className="mb-2 modal-label"
                                  htmlFor="building"
                                >
                                  building
                                </label>
                                <select
                                  name="building"
                                  id="building"
                                  className="px-login-input"
                                >
                                  <option value>Select building</option>
                                </select>
                              </div>
                              <div className="input-package mt-3 ps-2 d-flex flex-column w-50">
                                <label
                                  className="mb-2 modal-label"
                                  htmlFor="floor"
                                >
                                  floor
                                </label>
                                <select
                                  name="floor"
                                  id="floor"
                                  className="px-login-input"
                                >
                                  <option value>Select floor</option>
                                </select>
                              </div>
                            </div>
                            <div className="form-inputs d-flex justify-content-between w-100 px-3">
                              <div className="input-package mt-3 d-flex flex-column w-100">
                                <label
                                  className="mb-2 modal-label"
                                  htmlFor="ArabicNamePrefix"
                                >
                                  Generate Number Of Rooms
                                </label>
                                <input
                                  id="ArabicNamePrefix"
                                  type="text"
                                  placeholder="Enter number"
                                  className="px-form-input w-100"
                                />
                              </div>
                            </div>
                            <div className="modal-footer mt-4 w-100">
                              <button
                                type="button"
                                className="px-btn btn px-white-btn"
                                data-bs-dismiss="modal"
                              >
                                Cancel
                              </button>
                              <button
                                type="button"
                                className="px-btn px-blue-btn"
                              >
                                save
                              </button>
                            </div>
                          </form>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="table-search w-50">
                    <input
                      type="search"
                      className="px-form-input w-100 ps-5"
                      placeholder="search"
                    />
                    <svg
                      className="search-icon"
                      width={20}
                      height={20}
                      viewBox="0 0 20 20"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <circle
                        cx="9.8055"
                        cy="9.8055"
                        r="7.49047"
                        stroke="#939393"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M15.0153 15.4043L17.9519 18.3333"
                        stroke="#939393"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    <svg
                      className="filter-icon"
                      width={24}
                      height={24}
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M4.56517 3C3.70108 3 3 3.71286 3 4.5904V5.52644C3 6.17647 3.24719 6.80158 3.68936 7.27177L8.5351 12.4243L8.53723 12.4211C9.47271 13.3788 9.99905 14.6734 9.99905 16.0233V20.5952C9.99905 20.9007 10.3187 21.0957 10.584 20.9516L13.3436 19.4479C13.7602 19.2204 14.0201 18.7784 14.0201 18.2984V16.0114C14.0201 14.6691 14.539 13.3799 15.466 12.4243L20.3117 7.27177C20.7528 6.80158 21 6.17647 21 5.52644V4.5904C21 3.71286 20.3 3 19.4359 3H4.56517Z"
                        stroke="#939393"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                  <div className="card-head-btns w-50 d-flex my-3 justify-content-end">
                    <button className="px-btn px-gray-btn text-capitalize d-flex">
                      <div className="btn-icon w-10 me-2">
                        <i className="fa-kit fa-manage-column" />
                      </div>
                      manage columns <i className="fa-kit fa-down ms-2 mt-1" />
                    </button>
                    <button className="px-btn px-gray-btn text-capitalize d-flex align-items-center justify-content-center ms-3">
                      <div className="btn-icon w-20 pe-1">
                        <i className="fa-kit fa-exports" />
                      </div>
                      export
                    </button>
                  </div>
                </div>
                {/* start table */}
                <div className="table-responsive px-table-container">
                  <table
                    className="px-table table-borderless w-100"
                    id="room-table"
                  >
                    <thead className="px-thead">
                      <tr className="w-100">
                        <th scope="col">
                          <span>room number</span>
                          <i className="fa-kit fa-sort-by " />
                        </th>
                        <th scope="col">
                          room view
                          <i className="fa-kit fa-sort-by" />
                        </th>
                        <th scope="col">
                          room type
                          <i className="fa-kit fa-sort-by" />
                        </th>
                        <th scope="col">
                          rate
                          <i className="fa-kit fa-sort-by" />
                        </th>
                        <th scope="col">
                          comments
                          <i className="fa-kit fa-sort-by" />
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <th
                          scope="row"
                          className="d-flex justify-content-between ps-4 "
                        >
                          SB (B-1)
                          <div className="dropdown">
                            <a
                              className="btn dropdown-toggle"
                              href="#"
                              role="button"
                              data-bs-toggle="dropdown"
                              aria-expanded="false"
                            >
                              <i className="fa-regular fa-ellipsis actions" />
                            </a>
                            <ul className="dropdown-menu">
                              <li>
                                <a className="dropdown-item" href>
                                  <i className="fa-kit fa-edit" /> edit
                                </a>
                              </li>
                              <li>
                                <a
                                  className="dropdown-item text-danger"
                                  href="#"
                                >
                                  <i className="fa-kit fa-delete" /> delete
                                </a>
                              </li>
                            </ul>
                          </div>
                        </th>
                        <td>س م (م-1)</td>
                        <td>Kempinski soma bay</td>
                        <td>
                          <a className="font-2" href="all-floors.html">
                            <i className="fa-duotone fa-layer-group" />
                          </a>
                        </td>
                        <td>
                          <a
                            className="font-2"
                            href="all-building-facilities.html"
                          >
                            <i className="fa-duotone fa-car-building" />
                          </a>
                        </td>
                      </tr>
                      <tr>
                        <th
                          scope="row"
                          className="d-flex justify-content-between ps-4 "
                        >
                          SB (B-2)
                          <div className="dropdown">
                            <a
                              className="btn dropdown-toggle"
                              href="#"
                              role="button"
                              data-bs-toggle="dropdown"
                              aria-expanded="false"
                            >
                              <i className="fa-regular fa-ellipsis actions" />
                            </a>
                            <ul className="dropdown-menu">
                              <li>
                                <a className="dropdown-item" href>
                                  <i className="fa-kit fa-edit" /> edit
                                </a>
                              </li>
                              <li>
                                <a
                                  className="dropdown-item text-danger"
                                  href="#"
                                >
                                  <i className="fa-kit fa-delete" /> delete
                                </a>
                              </li>
                            </ul>
                          </div>
                        </th>
                        <td>س م (م-2)</td>
                        <td>Kempinski soma bay</td>
                        <td>
                          <a className="font-2" href="all-floors.html">
                            <i className="fa-duotone fa-layer-group" />
                          </a>
                        </td>
                        <td>
                          <a
                            className="font-2"
                            href="all-building-facilities.html"
                          >
                            <i className="fa-duotone fa-car-building" />
                          </a>
                        </td>
                      </tr>
                      <tr>
                        <th
                          scope="row"
                          className="d-flex justify-content-between ps-4 "
                        >
                          NH (B-1)
                          <div className="dropdown">
                            <a
                              className="btn dropdown-toggle"
                              href="#"
                              role="button"
                              data-bs-toggle="dropdown"
                              aria-expanded="false"
                            >
                              <i className="fa-regular fa-ellipsis actions" />
                            </a>
                            <ul className="dropdown-menu">
                              <li>
                                <a className="dropdown-item" href>
                                  <i className="fa-kit fa-edit" /> edit
                                </a>
                              </li>
                              <li>
                                <a
                                  className="dropdown-item text-danger"
                                  href="#"
                                >
                                  <i className="fa-kit fa-delete" /> delete
                                </a>
                              </li>
                            </ul>
                          </div>
                        </th>
                        <td>ف ن (م-1)</td>
                        <td>Kempinski nile hotel</td>
                        <td>
                          <a className="font-2" href="all-floors.html">
                            <i className="fa-duotone fa-layer-group" />
                          </a>
                        </td>
                        <td>
                          <a
                            className="font-2"
                            href="all-building-facilities.html"
                          >
                            <i className="fa-duotone fa-car-building" />
                          </a>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                {/* end table */}
              </div>
            </div>
            {/*----------- end preferences and feedback content -----------*/}
          </div>
          {/*----------- end taps content ---------------*/}
        </div>
      </div>
    </>
  );
};

export default CustomerProfile;
