import { useContext, useEffect, useState } from "react";
import { ModalContext } from "../../../Helpers/Context/ModalContext";
import { AuthContext } from "../../../Helpers/Context/AuthContext";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import i18next from "i18next";

const RoomProfile = () => {
  const { t } = useTranslation();
  const {language} = i18next;
  const { RoomId } = useParams();

  const { baseUrlPms, Headers, userId } = useContext(AuthContext);
  const {
    showState,
    handleClose,
    setShowState,
    modelState,
    closeModal,
    setModelState,
  } = useContext(ModalContext);

  const [roomDetails, setRoomsDetails] = useState([]);
  const getRoomDetails = () => {
    axios
      .get(`${baseUrlPms}/room/${RoomId}/show/`, {
        headers: Headers,
      })
      .then((res) => {
        setRoomsDetails(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  console.log(roomDetails);

  useEffect(() => {
    getRoomDetails();
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
                    {t("rooms")}
                  </li>
                  <li className="breadcrumbs-item d-flex align-items-center ">
                    <span className="breadcrumbs-separetor ms-2">
                      <i className="fa-kit fa-right" />
                    </span>
                    {t("RoomSection.roomProfile")}
                  </li>
                </ul>
              </div>
              <h4>{language === "ar" ? roomDetails?.pms_room_ar?.room_name_ar : roomDetails?.pms_room_en?.room_name_en}</h4>
              {/* Button trigger modal */}
              <button
                type="button"
                className="px-btn px-white-btn create-btn ms-auto"
                data-bs-toggle="modal"
                data-bs-target="#staticBackdrop"
              >
                {t("delete")}
              </button>
              <button
                type="button"
                className="px-btn px-blue-btn create-btn ms-3"
                data-bs-toggle="modal"
                data-bs-target="#staticBackdrop"
              >
                {t("edit")}
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
                      <h4 className="w-100 modal-title">edit room</h4>
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
                            room arabic name
                          </label>
                          <input
                            type="text"
                            defaultValue="Fl-101"
                            className="px-form-input w-100 m-auto"
                          />
                        </div>
                        <div className="input-package mt-3 ps-2 d-flex flex-column w-50">
                          <label className="mb-2 modal-label" htmlFor>
                            room english name
                          </label>
                          <input
                            type="text"
                            defaultValue="غرفة -1"
                            className="px-form-input w-100 m-auto"
                          />
                        </div>
                      </div>
                      <div className="form-inputs d-flex w-100 px-3">
                        <div className="input-package mt-3 pe-2 d-flex flex-wrap justify-content-between w-50">
                          <label className="w-100" htmlFor>
                            room type
                          </label>
                          <select type="text" className="px-login-input w-100">
                            <option value="single">single</option>
                            <option value="Double">Double</option>
                          </select>
                        </div>
                        <div className="input-package mt-3 ps-2 d-flex flex-wrap justify-content-between w-50">
                          <label className="w-100" htmlFor>
                            room view
                          </label>
                          <select type="text" className="px-login-input w-100">
                            <option value="see view">see view</option>
                            <option value="garden view">garden view</option>
                          </select>
                        </div>
                      </div>
                      <div className="form-inputs d-flex w-100 px-3">
                        <div className="input-package mt-3 pe-2 d-flex flex-wrap justify-content-between w-50">
                          <label className="w-100" htmlFor>
                            building
                          </label>
                          <select type="text" className="px-login-input w-100">
                            <option value="building 1">building 1</option>
                            <option value="building 2">building 2</option>
                          </select>
                        </div>
                        <div className="input-package mt-3 ps-2 d-flex flex-wrap justify-content-between w-50">
                          <label className="w-100" htmlFor>
                            floor
                          </label>
                          <select type="text" className="px-login-input w-100">
                            <option value="floor 1">floor 1</option>
                            <option value="floor2">floor2</option>
                          </select>
                        </div>
                      </div>
                      <div className="form-inputs d-flex w-100 px-3">
                        <div className="input-package mt-3 pe-2 d-flex flex-wrap justify-content-between w-50">
                          <label className="w-100" htmlFor>
                            hotel
                          </label>
                          <select type="text" className="px-login-input w-100">
                            <option value="helton">helton</option>
                            <option value="masa">masa</option>
                          </select>
                        </div>
                        <div className="input-package mt-3 ps-2 d-flex flex-wrap justify-content-between w-50">
                          <label className="w-100" htmlFor>
                            branch
                          </label>
                          <select type="text" className="px-login-input w-100">
                            <option value="branch 1">branch 1</option>
                            <option value="garden view">garden view</option>
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
                {t("maintananceSection.location")}
                  <div className="cell-end ms-auto">.</div>
                </div>
                <div className="content w-80 ms-4">
                  {
                    language === "ar" ? 
                    `${
                      roomDetails?.floor_info?.building_info?.pms_building_ar?.building_name_ar}
                      , ${roomDetails?.floor_info?.pms_floor_ar?.floor_name_ar
                      }`
                    :
                    `${
                      roomDetails?.floor_info?.building_info?.pms_building_en?.building_name_en} 
                      , ${roomDetails?.floor_info?.pms_floor_en?.floor_name_en
                    }`
                  }
                </div>
              </div>
              <div className="card-row d-flex ">
                <div className="object d-flex w-10">
                {t("roomView")}

                  <div className="cell-end ms-auto">.</div>
                </div>
                <div className="content w-80 ms-4">
                  
                     {
                      language === "ar" ? 
                      roomDetails?.view_type_info?.pms_view_type_ar?.view_type_name_ar
                      : roomDetails?.view_type_info?.pms_view_type_en?.view_type_name_en
                  }</div>
              </div>
              <div className="card-row d-flex ">
                <div className="object d-flex w-10">
                {t("roomType")}
                  <div className="cell-end ms-auto">.</div>
                </div>
                <div className="content w-80 ms-4">
                   {
                    language === "ar" ? 
                  roomDetails?.room_type_info?.pms_room_type_ar?.room_type_name_ar
                  :
                  roomDetails?.room_type_info?.pms_room_type_en?.room_type_name_en
                  }
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
                    id="pills-Revenue-and-financials-tab"
                    data-bs-toggle="pill"
                    data-bs-target="#Revenue-and-financials"
                    type="button"
                    role="tab"
                    aria-controls="Revenue-and-financials"
                    aria-selected="false"
                  >
                    {t("RoomSection.revenueAndFinancials")}
                  </button>
                </li>
                <li className="nav-item" role="presentation">
                  <button
                    className="nav-link"
                    id="pills-Housekeeping-tab"
                    data-bs-toggle="pill"
                    data-bs-target="#pills-Housekeeping"
                    type="button"
                    role="tab"
                    aria-controls="pills-Housekeeping"
                    aria-selected="false"
                  >
                    {t("housekeeping")}
                  </button>
                </li>
                <li className="nav-item" role="presentation">
                  <button
                    className="nav-link"
                    id="pills-Maintenance-tab"
                    data-bs-toggle="pill"
                    data-bs-target="#pills-Maintenance"
                    type="button"
                    role="tab"
                    aria-controls="pills-Maintenance"
                    aria-selected="false"
                  >
                   {t("RoomSection.maintenance")}
                  </button>
                </li>
                <li className="nav-item" role="presentation">
                  <button
                    className="nav-link"
                    id="pills-Room-features-tab"
                    data-bs-toggle="pill"
                    data-bs-target="#pills-Room-features"
                    type="button"
                    role="tab"
                    aria-controls="pills-Room-features"
                    aria-selected="false"
                  >
                    {t("RoomSection.roomFeatures")}
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
                  <div className="w-100 d-flex">
                    <a className="ms-auto" href="single-request.html">
                      <button
                        type="button"
                        className="px-btn px-blue-btn create-btn "
                      >
                        create new reservation
                      </button>
                    </a>
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
                      </div>{" "}
                      manage columns <i className="fa-kit fa-down ms-2 mt-1" />
                    </button>
                    <button className="px-btn px-gray-btn text-capitalize d-flex align-items-center justify-content-center ms-3">
                      <div className="btn-icon w-20 pe-1">
                        <i className="fa-kit fa-exports" />
                      </div>{" "}
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
                          <span>customer name</span>
                          <i className="fa-kit fa-sort-by " />
                        </th>
                        <th scope="col">
                          check in <i className="fa-kit fa-sort-by" />
                        </th>
                        <th scope="col">
                          check out
                          <i className="fa-kit fa-sort-by" />
                        </th>
                        <th scope="col">
                          night count
                          <i className="fa-kit fa-sort-by" />
                        </th>
                        <th scope="col">
                          payment method
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
                          Ashraf Galal
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
                                  {" "}
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
                        <td>20-6-2025</td>
                        <td>30-6-2025</td>
                        <td>10</td>
                        <td>cash</td>
                      </tr>
                      <tr>
                        <th
                          scope="row"
                          className="d-flex justify-content-between ps-4 "
                        >
                          Ahmef Fathi
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
                                  {" "}
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
                        <td>25-6-2025</td>
                        <td>30-6-2025</td>
                        <td>5</td>
                        <td>visa</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                {/* end table */}
              </div>
            </div>
            {/*----------- end booking heistory content -----------*/}
            {/*----------- start Revenue And Financials content -----------*/}
            <div
              className="tab-pane fade"
              id="Revenue-and-financials"
              role="tabpanel"
              aria-labelledby="Revenue-and-financials-tab"
              tabIndex={0}
            >
              <div className="px-card">
                <div className="card-head d-flex p-4 pb-0 flex-wrap align-items-center">
                  <div className="w-100 d-flex align-items-center">
                    <a className="ms-auto" href="single-request.html">
                      <button
                        type="button"
                        className="px-btn px-blue-btn create-btn "
                      >
                        create new reservation
                      </button>
                    </a>
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
                      </div>{" "}
                      manage columns <i className="fa-kit fa-down ms-2 mt-1" />
                    </button>
                    <button className="px-btn px-gray-btn text-capitalize d-flex align-items-center justify-content-center ms-3">
                      <div className="btn-icon w-20 pe-1">
                        <i className="fa-kit fa-exports" />
                      </div>{" "}
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
                                  {" "}
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
                                  {" "}
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
                                  {" "}
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
            {/*----------- end Revenue And Financials content -----------*/}
            {/*----------- start Housekeeping content -----------*/}
            <div
              className="tab-pane fade"
              id="pills-Housekeeping"
              role="tabpanel"
              aria-labelledby="pills-Housekeeping-tab"
              tabIndex={0}
            >
              <div className="px-card">
                <div className="card-head d-flex p-4 pb-0 flex-wrap align-items-center">
                  <div className="w-100 d-flex align-items-center">
                    <div className="current-status d-flex">
                      <h5>current status: clean</h5>
                    </div>
                    <button
                      type="button"
                      className="px-btn px-blue-btn create-btn ms-auto"
                      data-bs-toggle="modal"
                      data-bs-target="#building"
                    >
                      assign housekeeping task
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
                      </div>{" "}
                      manage columns <i className="fa-kit fa-down ms-2 mt-1" />
                    </button>
                    <button className="px-btn px-gray-btn text-capitalize d-flex align-items-center justify-content-center ms-3">
                      <div className="btn-icon w-20 pe-1">
                        <i className="fa-kit fa-exports" />
                      </div>{" "}
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
                          housekeeper
                          <i className="fa-kit fa-sort-by " />
                        </th>
                        <th scope="col">
                          day
                          <i className="fa-kit fa-sort-by" />
                        </th>
                        <th scope="col">
                          hour
                          <i className="fa-kit fa-sort-by" />
                        </th>
                        <th scope="col">
                          note
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
                          Ashraf Galal
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
                                  {" "}
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
                        <td>20-6-2025</td>
                        <td>10:00 AM</td>
                        <td>Double check on bed sheets</td>
                      </tr>
                      <tr>
                        <th
                          scope="row"
                          className="d-flex justify-content-between ps-4 "
                        >
                          Ahmef Fathi
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
                                  {" "}
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
                        <td>20-6-2025</td>
                        <td>10:00 AM</td>
                        <td>Need extra towles</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                {/* end table */}
              </div>
            </div>
            {/*----------- end Housekeeping content -----------*/}
            {/*---------- start Maintenance content -----------*/}
            <div
              className="tab-pane fade"
              id="pills-Maintenance"
              role="tabpanel"
              aria-labelledby="pills-Maintenance-tab"
              tabIndex={0}
            >
              <div className="px-card">
                <div className="card-head d-flex p-4 pb-0 flex-wrap align-items-center">
                  <div className="w-100 d-flex align-items-center">
                    <div className="maintenance-status">
                      <h5>Current Status : Needs Maintenance</h5>
                    </div>
                    <button
                      type="button"
                      className="px-btn px-blue-btn create-btn ms-auto"
                      data-bs-toggle="modal"
                      data-bs-target="#room"
                    >
                      Assign Maintenance Task
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
                      </div>{" "}
                      manage columns <i className="fa-kit fa-down ms-2 mt-1" />
                    </button>
                    <button className="px-btn px-gray-btn text-capitalize d-flex align-items-center justify-content-center ms-3">
                      <div className="btn-icon w-20 pe-1">
                        <i className="fa-kit fa-exports" />
                      </div>{" "}
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
                          <span>Maintenance Worker</span>
                          <i className="fa-kit fa-sort-by " />
                        </th>
                        <th scope="col">
                          Item
                          <i className="fa-kit fa-sort-by" />
                        </th>
                        <th scope="col">
                          Date
                          <i className="fa-kit fa-sort-by" />
                        </th>
                        <th scope="col">
                          Time Spent
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
                          Ashraf Galal
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
                                  {" "}
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
                        <td>TV</td>
                        <td>20-6-2025</td>
                        <td>10 Days</td>
                      </tr>
                      <tr>
                        <th
                          scope="row"
                          className="d-flex justify-content-between ps-4 "
                        >
                          Ahmef Fathi
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
                                  {" "}
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
                        <td>Air Conditioning</td>
                        <td>30-6-2025</td>
                        <td>5 Days</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                {/* end table */}
              </div>
            </div>
            {/*----------- end Maintenance content -----------*/}
            {/*---------- start Room Features content -----------*/}
            <div
              className="tab-pane fade"
              id="pills-Room-features"
              role="tabpanel"
              aria-labelledby="pills-Room-features-tab"
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
                      Add Item To Room
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
                      </div>{" "}
                      manage columns <i className="fa-kit fa-down ms-2 mt-1" />
                    </button>
                    <button className="px-btn px-gray-btn text-capitalize d-flex align-items-center justify-content-center ms-3">
                      <div className="btn-icon w-20 pe-1">
                        <i className="fa-kit fa-exports" />
                      </div>{" "}
                      export
                    </button>
                  </div>
                </div>
                {/* start table */}
                <div className="table-responsive px-table-container">
                  <table
                    className="px-table table-borderless w-100"
                    id="Room-features-table"
                  >
                    <thead className="px-thead">
                      <tr className="w-100">
                        <th scope="col">
                          <span>Item Name</span>
                          <i className="fa-kit fa-sort-by " />
                        </th>
                        <th scope="col">
                          Item Quantity
                          <i className="fa-kit fa-sort-by" />
                        </th>
                        <th scope="col">
                          Last Maintaining Date{" "}
                          <i className="fa-kit fa-sort-by" />
                        </th>
                        <th scope="col">
                          Last Maintaining By{" "}
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
                          TV
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
                                  {" "}
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
                        <td>1</td>
                        <td>20-6-2025</td>
                        <td>Ashraf Galal</td>
                      </tr>
                      <tr>
                        <th
                          scope="row"
                          className="d-flex justify-content-between ps-4 "
                        >
                          Safe
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
                                  {" "}
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
                        <td>1</td>
                        <td>30-6-2025</td>
                        <td>Ahmed Fathi</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                {/* end table */}
              </div>
            </div>
            {/*----------- end Room Features content -----------*/}
          </div>
          {/*----------- end taps content ---------------*/}
        </div>
      </div>
    </>
  );
};

export default RoomProfile;
