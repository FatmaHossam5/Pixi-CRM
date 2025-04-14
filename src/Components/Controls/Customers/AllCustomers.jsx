import { useContext, useEffect, useMemo, useState } from "react";
import bookingLogo from "../../../assets/images/booking-logo.svg";
import axios from "axios";
import { AuthContext } from "../../Helpers/Context/AuthContext";
import ListTable from "../../Shared/GeneralTable/ListTable";
import { Link, useNavigate } from "react-router-dom";
import CreateCustomer from "./CreateCustomer";
import AddModal from "../../Shared/AddModal/AddModal";
import { ModalContext } from "../../Helpers/Context/ModalContext";
import CheckIn from "./CheckIn/CheckIn";
import { useTranslation } from "react-i18next";
import i18next, { dir } from "i18next";

const AllCustomers = () => {
  const { t } = useTranslation();
  const { language } = i18next;
  const [customers, setCustomers] = useState([]);
  const [dataView, setDataView] = useState("cards");
  const { baseUrlPms, Headers, activeLang } = useContext(AuthContext);
  const { showState, handleClose, setShowState } = useContext(ModalContext);
  const [search, setSearch] = useState("");
  const isRTL = i18next.language === 'ar';

  const handleShowAdd = () => {
    setShowState("Customer");
  };

  const [checkInId, setcheckInId] = useState();
  const checkIn = (customer) => {
    setShowState("CheckIn");
    setcheckInId(customer)
    console.log(customer.id);
  };

  const navigate = useNavigate();
  const getCustomers = () => {
    axios
      .get(`${baseUrlPms}/customer/all/`, {
        headers: Headers,
      })
      .then((res) => {
        setCustomers(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const columns = useMemo(() => [
    {
      name: t("englishName"),
      selector: (row) => row?.pms_customer_en?.customer_name_en,
      sortable: true,
      // grow: 2,
      reorder: true,
      visible: true,
      cell: (row) => (
        <div className="d-flex justify-content-between align-items-center w-100">
          <div className="w-50">{row?.pms_customer_en?.customer_name_en}</div>
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
                <Link className="dropdown-item" to={`/dashboard/customerProfile/${row.id}`}>{t("view")}</Link>
              </li>
              <li>
                <hr className="dropdown-divider w-80 m-auto opacity-75" />
              </li>
              <li>
                <a className="dropdown-item">{t("edit")}</a>
              </li>
              <li>
                <hr className="dropdown-divider w-80 m-auto opacity-75" />
              </li>
              <li>
                <button
                  className="dropdown-item"
                  onClick={() => checkIn(row.id)}
                >
                  {t("CustomerSection.customerMenu.checkIn")}
                </button>
              </li>
              <li>
                <hr className="dropdown-divider w-80 m-auto opacity-75" />
              </li>
              <li>
                <a className="dropdown-item" >
                  {t("CustomerSection.customerMenu.checkout")}
                </a>
              </li>
              <li>
                <hr className="dropdown-divider w-80 m-auto opacity-75" />
              </li>
              <li>
                <a className="dropdown-item" >
                  {t("CustomerSection.customerMenu.Blocked")}
                </a>
              </li>
              <li>
                <hr className="dropdown-divider w-80 m-auto opacity-75" />
              </li>
              <li>
                <a className="dropdown-item text-danger" >
                  {t("delete")} 
                </a>
              </li>
            </ul>
          </div>
        </div>
      ),
    },
    {
      name: t("arabicName"),
      selector: (row) => row?.pms_customer_ar?.customer_name_ar,
      sortable: true,
      visible: true,
    },
    {
      name: t("columns.phone"),
      selector: (row) => row?.customer_mobile,
      sortable: true,
    },
    {
      name: t("columns.NationalId"),
      selector: (row) => row?.customer_national_id,
      sortable: true,
      visible: true,
    },
    {
      name: t("CustomerSection.singleReq"),
      selector: (row) => row.request_count,
      sortable: true,
      visible: true,
      cell: (row) =>
        row.request_count > 0 ? (
          <div
            onClick={() => customerRequests(row.id)} // Handle click with row ID
            style={{ cursor: "pointer", color: "blue" }}
          >
            {t("CustomerSection.allSingleReq")}
          </div>
        ) : (
          <p> {t("CustomerSection.none")}</p>
        ),
    },
    {
      name: t("CustomerSection.groupReq"),
      selector: (row) => row.group_request_count,
      sortable: true,
      visible: true,
      cell: (row) =>
        row.group_request_count > 0 ? (
          <div
            onClick={() => customerGroupRequests(row.id)} // Handle click with row ID
            style={{ cursor: "pointer", color: "blue" }}
          >
            {t("CustomerSection.allGroupReq")}
          </div>
        ) : (
          <p> {t("CustomerSection.none")}</p>
        ),
    },
    // {
    //   name: "Dependents",
    //   selector: (row) => "م"
    //     // row.dependents_count_by_type.Adult ||
    //     // row.dependents_count_by_type.child
    //     ,
    //   sortable: true,
    //   cell: (row) =>
    //     row.dependents_count_by_type.Adult ||
    //     row.dependents_count_by_type.child > 0 ? (
    //       <div
    //         onClick={() => customerDependents(row.id)} // Handle click with row ID
    //         style={{ cursor: "pointer", color: "blue" }}
    //       >
    //         All Dependents
    //       </div>
    //     ) : (
    //       <p>none</p>
    //     ),
    // },
  ]);

  const filteredRows = customers?.filter(
    (row) =>
      row?.pms_customer_en?.customer_name_en &&
      row?.pms_customer_ar?.customer_name_ar
  );

  // Function to filter rows based on search input
  const filteredData = useMemo(() => {
    return filteredRows?.filter((row) => {
      return columns?.some((column) => {
        const value = column?.selector(row);
        return (
          value && value.toString().toLowerCase().includes(search.toLowerCase())
        );
      });
    });
  }, [search, filteredRows, columns]);

  const customerRequests = (customerId) => {
    navigate(`/dashboard/customerSingleRqu/${customerId}`);
  };
  const customerGroupRequests = (customerId) => {
    navigate(`/dashboard/customerGroupRqu/${customerId}`);
  };

  const customerDependents = (customerId) => {
    navigate(`/dashboard/customerDependent/${customerId}`);
  };

  const filteredCustomers = customers?.filter((customer) => {
    const customerName =
      customer?.pms_customer_en?.customer_name_en?.toLowerCase();
    const customerPhone = customer?.customer_mobile?.toLowerCase();
    const customerCountry =
      customer?.city_id_info?.governorate_info?.country_info?.pms_country_en?.country_name_en?.toLowerCase();

    const searchQuery = search.toLowerCase();

    // You can adjust this condition to include more fields or change the logic
    return (
      customerName?.includes(searchQuery) ||
      customerPhone?.includes(searchQuery) ||
      customerCountry?.includes(searchQuery)
    );
  });

  const [visibleColumns, setVisibleColumns] = useState(columns);
  const [selectAll, setSelectAll] = useState(false);

  const handleColumnVisibilityChange = (columnName) => {
    // If the column is the first column (e.g. 'User Name'), prevent any changes
    if (columnName === columns[0].name) {
      return; // Do nothing, as the first column should always be visible and disabled
    }

    // Update visibility for the selected column
    setVisibleColumns((prev) =>
      prev.map((col) =>
        col.name === columnName ? { ...col, visible: !col.visible } : col
      )
    );

    // Check if after this change, all columns (except the first) are selected
    const updatedVisibleColumns = visibleColumns.map((col) =>
      col.name === columnName ? { ...col, visible: !col.visible } : col
    );

    const allSelected = updatedVisibleColumns.every(
      (col) => col.name === columns[0].name || col.visible // Ignore the first column in the check
    );

    if (allSelected) {
      // If all columns (except the first) are selected, check "Select All"
      setSelectAll(true);
    } else {
      // If not all columns are selected, uncheck "Select All"
      setSelectAll(false);
    }
  };
  const handleSelectAll = () => {
    const newState = !selectAll;
    setSelectAll(newState);
  
    setVisibleColumns((prev) =>
      prev.map((col) => ({
        ...col,
        visible: col.name === columns[0].name ? true : newState, // Keep the first column always visible
      }))
    );
  };
  useEffect(() => {
    getCustomers();
  }, []);

  return (
    <>
      {/* start content */}
      <div className="px-content mb-auto">
        <div className="px-card mt-4">
          <div className="card-head d-flex p-4 pb-0 flex-wrap align-items-center">
            <div className="w-100 d-flex flex-wrap align-items-center">
              <div className="breadcrumbs-list mb-2 w-100">
                <ul className="d-flex">
                  <li className="breadcrumbs-item d-flex align-items-center">
                    {t("customers")}
                  </li>
                  <li className="breadcrumbs-item d-flex align-items-center active-breadcrumbs">
                    <span className="breadcrumbs-separetor ms-2">
                      <i className="fa-kit fa-right" />
                    </span>
                    {t("CustomerSection.allCustomers")}
                  </li>
                </ul>
              </div>
              <h4>{t("CustomerSection.allCustomers")}</h4>
              {/* Button trigger modal */}
              <button
                type="button"
                className="px-btn px-blue-btn create-btn ms-auto"
                data-bs-toggle="modal"
                data-bs-target="#staticBackdrop"
                onClick={handleShowAdd}
              >
                {`${t('createNew')} ${t("CustomerSection.customer")} `}
              </button>
              {/* create customer Modal */}

              <AddModal
                name="Customer"
                showState={showState}
                handleClose={handleClose}
                title={`${t('createNew')} ${t("CustomerSection.customer")}`}
                component={<CreateCustomer getCustomers={getCustomers} />}
              />
              <AddModal
                name="CheckIn"
                showState={showState}
                handleClose={handleClose}
                title={`Create New ${showState}`}
                component={<CheckIn customerId={checkInId} customers={customers} />}
              />
            </div>

            <div className="table-search w-50">
              <input
                type="search"
                className="px-form-input w-100 ps-5"
                placeholder="search"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
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
                className="filter-icon me-3"
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
            {/* view customer cards & list */}
            <div className="view-btns ps-3 d-flex">
              <button
                className="cards-view p-3 bg-transparent border-0"
                onClick={() => setDataView("cards")}
              >
                <svg
                  width={20}
                  height={21}
                  viewBox="0 0 20 21"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M3.92857 1.85631C4.125 1.85631 4.28571 2.01702 4.28571 2.21345V4.35631C4.28571 4.55273 4.125 4.71345 3.92857 4.71345H1.78571C1.58929 4.71345 1.42857 4.55273 1.42857 4.35631V2.21345C1.42857 2.01702 1.58929 1.85631 1.78571 1.85631H3.92857ZM1.78571 0.427734C0.799107 0.427734 0 1.22684 0 2.21345V4.35631C0 5.34291 0.799107 6.14202 1.78571 6.14202H3.92857C4.91518 6.14202 5.71429 5.34291 5.71429 4.35631V2.21345C5.71429 1.22684 4.91518 0.427734 3.92857 0.427734H1.78571ZM3.92857 8.99916C4.125 8.99916 4.28571 9.15988 4.28571 9.35631V11.4992C4.28571 11.6956 4.125 11.8563 3.92857 11.8563H1.78571C1.58929 11.8563 1.42857 11.6956 1.42857 11.4992V9.35631C1.42857 9.15988 1.58929 8.99916 1.78571 8.99916H3.92857ZM1.78571 7.57059C0.799107 7.57059 0 8.3697 0 9.35631V11.4992C0 12.4858 0.799107 13.2849 1.78571 13.2849H3.92857C4.91518 13.2849 5.71429 12.4858 5.71429 11.4992V9.35631C5.71429 8.3697 4.91518 7.57059 3.92857 7.57059H1.78571ZM1.78571 16.142H3.92857C4.125 16.142 4.28571 16.3027 4.28571 16.4992V18.642C4.28571 18.8384 4.125 18.9992 3.92857 18.9992H1.78571C1.58929 18.9992 1.42857 18.8384 1.42857 18.642V16.4992C1.42857 16.3027 1.58929 16.142 1.78571 16.142ZM0 16.4992V18.642C0 19.6286 0.799107 20.4277 1.78571 20.4277H3.92857C4.91518 20.4277 5.71429 19.6286 5.71429 18.642V16.4992C5.71429 15.5126 4.91518 14.7134 3.92857 14.7134H1.78571C0.799107 14.7134 0 15.5126 0 16.4992ZM11.0714 1.85631C11.2679 1.85631 11.4286 2.01702 11.4286 2.21345V4.35631C11.4286 4.55273 11.2679 4.71345 11.0714 4.71345H8.92857C8.73214 4.71345 8.57143 4.55273 8.57143 4.35631V2.21345C8.57143 2.01702 8.73214 1.85631 8.92857 1.85631H11.0714ZM8.92857 0.427734C7.94196 0.427734 7.14286 1.22684 7.14286 2.21345V4.35631C7.14286 5.34291 7.94196 6.14202 8.92857 6.14202H11.0714C12.058 6.14202 12.8571 5.34291 12.8571 4.35631V2.21345C12.8571 1.22684 12.058 0.427734 11.0714 0.427734H8.92857ZM8.92857 8.99916H11.0714C11.2679 8.99916 11.4286 9.15988 11.4286 9.35631V11.4992C11.4286 11.6956 11.2679 11.8563 11.0714 11.8563H8.92857C8.73214 11.8563 8.57143 11.6956 8.57143 11.4992V9.35631C8.57143 9.15988 8.73214 8.99916 8.92857 8.99916ZM7.14286 9.35631V11.4992C7.14286 12.4858 7.94196 13.2849 8.92857 13.2849H11.0714C12.058 13.2849 12.8571 12.4858 12.8571 11.4992V9.35631C12.8571 8.3697 12.058 7.57059 11.0714 7.57059H8.92857C7.94196 7.57059 7.14286 8.3697 7.14286 9.35631ZM11.0714 16.142C11.2679 16.142 11.4286 16.3027 11.4286 16.4992V18.642C11.4286 18.8384 11.2679 18.9992 11.0714 18.9992H8.92857C8.73214 18.9992 8.57143 18.8384 8.57143 18.642V16.4992C8.57143 16.3027 8.73214 16.142 8.92857 16.142H11.0714ZM8.92857 14.7134C7.94196 14.7134 7.14286 15.5126 7.14286 16.4992V18.642C7.14286 19.6286 7.94196 20.4277 8.92857 20.4277H11.0714C12.058 20.4277 12.8571 19.6286 12.8571 18.642V16.4992C12.8571 15.5126 12.058 14.7134 11.0714 14.7134H8.92857ZM16.0714 1.85631H18.2143C18.4107 1.85631 18.5714 2.01702 18.5714 2.21345V4.35631C18.5714 4.55273 18.4107 4.71345 18.2143 4.71345H16.0714C15.875 4.71345 15.7143 4.55273 15.7143 4.35631V2.21345C15.7143 2.01702 15.875 1.85631 16.0714 1.85631ZM14.2857 2.21345V4.35631C14.2857 5.34291 15.0848 6.14202 16.0714 6.14202H18.2143C19.2009 6.14202 20 5.34291 20 4.35631V2.21345C20 1.22684 19.2009 0.427734 18.2143 0.427734H16.0714C15.0848 0.427734 14.2857 1.22684 14.2857 2.21345ZM18.2143 8.99916C18.4107 8.99916 18.5714 9.15988 18.5714 9.35631V11.4992C18.5714 11.6956 18.4107 11.8563 18.2143 11.8563H16.0714C15.875 11.8563 15.7143 11.6956 15.7143 11.4992V9.35631C15.7143 9.15988 15.875 8.99916 16.0714 8.99916H18.2143ZM16.0714 7.57059C15.0848 7.57059 14.2857 8.3697 14.2857 9.35631V11.4992C14.2857 12.4858 15.0848 13.2849 16.0714 13.2849H18.2143C19.2009 13.2849 20 12.4858 20 11.4992V9.35631C20 8.3697 19.2009 7.57059 18.2143 7.57059H16.0714ZM16.0714 16.142H18.2143C18.4107 16.142 18.5714 16.3027 18.5714 16.4992V18.642C18.5714 18.8384 18.4107 18.9992 18.2143 18.9992H16.0714C15.875 18.9992 15.7143 18.8384 15.7143 18.642V16.4992C15.7143 16.3027 15.875 16.142 16.0714 16.142ZM14.2857 16.4992V18.642C14.2857 19.6286 15.0848 20.4277 16.0714 20.4277H18.2143C19.2009 20.4277 20 19.6286 20 18.642V16.4992C20 15.5126 19.2009 14.7134 18.2143 14.7134H16.0714C15.0848 14.7134 14.2857 15.5126 14.2857 16.4992Z"
                    fill="#939393"
                  />
                </svg>
              </button>
              <button
                className="list-view p-3 bg-transparent border-0"
                onClick={() => setDataView("list")}
              >
                <svg
                  width={20}
                  height={20}
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M1.5625 1.875C1.04297 1.875 0.625 2.29297 0.625 2.8125V4.6875C0.625 5.20703 1.04297 5.625 1.5625 5.625H3.4375C3.95703 5.625 4.375 5.20703 4.375 4.6875V2.8125C4.375 2.29297 3.95703 1.875 3.4375 1.875H1.5625ZM7.1875 2.8125C6.66797 2.8125 6.25 3.23047 6.25 3.75C6.25 4.26953 6.66797 4.6875 7.1875 4.6875H19.0625C19.582 4.6875 20 4.26953 20 3.75C20 3.23047 19.582 2.8125 19.0625 2.8125H7.1875ZM7.1875 9.0625C6.66797 9.0625 6.25 9.48047 6.25 10C6.25 10.5195 6.66797 10.9375 7.1875 10.9375H19.0625C19.582 10.9375 20 10.5195 20 10C20 9.48047 19.582 9.0625 19.0625 9.0625H7.1875ZM7.1875 15.3125C6.66797 15.3125 6.25 15.7305 6.25 16.25C6.25 16.7695 6.66797 17.1875 7.1875 17.1875H19.0625C19.582 17.1875 20 16.7695 20 16.25C20 15.7305 19.582 15.3125 19.0625 15.3125H7.1875ZM0.625 9.0625V10.9375C0.625 11.457 1.04297 11.875 1.5625 11.875H3.4375C3.95703 11.875 4.375 11.457 4.375 10.9375V9.0625C4.375 8.54297 3.95703 8.125 3.4375 8.125H1.5625C1.04297 8.125 0.625 8.54297 0.625 9.0625ZM1.5625 14.375C1.04297 14.375 0.625 14.793 0.625 15.3125V17.1875C0.625 17.707 1.04297 18.125 1.5625 18.125H3.4375C3.95703 18.125 4.375 17.707 4.375 17.1875V15.3125C4.375 14.793 3.95703 14.375 3.4375 14.375H1.5625Z"
                    fill="#4B4F56"
                  />
                </svg>
              </button>
            </div>
            {/* end view customer cards & list */}

            <div className="card-head-btns w-40 d-flex my-3 justify-content-end ms-auto">
            
            {dataView === "cards" ? (
                ""
              ) : (
              <div className="dropdown">
                <button
                  className="px-btn px-gray-btn d-flex"
                  type="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  <div className="btn-icon w-10 me-2">
                    <i className="fa-kit fa-manage-column" />
                  </div>
                  Manage Columns
                  <i className="fa-kit fa-down ms-2 mt-1" />
                </button>

                {/* <div className="collapse px-dropdown-list" id="collapseExample"> */}
                {/* <div className="card card-body"> */}
                <ul className="w-100 p-2 dropdown-menu">
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      checked={selectAll}
                      onChange={handleSelectAll}
                    />
                    <label className="mb-3 form-check-label text-primary">
                      Select All
                    </label>
                  </div>
                  {columns?.map((col, index) => (
                    <li key={index} className="mb-3">
                      <div className="form-check">
                        <input
                          // disabled={}
                          className="form-check-input"
                          type="checkbox"
                          value={col.name}
                          checked={
                            visibleColumns?.find((c) => c.name === col.name)
                              .visible
                          }
                          onChange={() =>
                            handleColumnVisibilityChange(col.name)
                          }
                          disabled={index === 0}
                        />
                        <label className="form-check-label">{col.name}</label>
                      </div>
                    </li>
                  ))}
                  {/* <ul className="dropdown-menu">
                   */}
                </ul>
                {/* </div> */}
                {/* </div> */}
              </div>
              )}
              <button className="px-btn px-gray-btn text-capitalize d-flex align-items-center justify-content-center ms-3">
                <div className="btn-icon w-20 pe-1">
                  <i className="fa-kit fa-exports" />
                </div>
                export
              </button>
            </div>
          </div>

          {/* start cards */}

          {dataView === "cards" ? (
            <div className="cards-container p-3">
              <div className="container-fluid gx-0">
                <div className="row gx-0">
                  {customers &&
                    customers
                      .filter(
                        (customer) =>
                          customer?.pms_customer_en?.customer_name_en &&
                          customer?.pms_customer_ar?.customer_name_ar
                      )
                      .map((customer) => {
                        const isBlacklisted = customer.is_blocked;
                        return (
                          <>
                            <div className="col-3" key={customer.id}>
                              <div
                                className={
                                  isBlacklisted
                                    ? "m-2 customer-view-card blacklisted-card p-3"
                                    : "m-2 customer-view-card p-3"
                                }
                              >
                                <div className="view-card-head d-flex justify-content-between">
                                  <div className=" d-flex w-90 align-items-center">
                                    <div className="card-logo me-2">
                                      <img src={bookingLogo} alt />
                                    </div>
                                    <h5 className="mb-0">
                                      {language === "ar" ?
                                        customer?.pms_customer_ar
                                          ?.customer_name_ar
                                        :
                                        customer?.pms_customer_en
                                          ?.customer_name_en
                                      }
                                    </h5>
                                  </div>
                                  <div className="actions">
                                    <div className="dropdown">
                                      <a
                                        className="btn dropdown-toggle"
                                        href="#"
                                        role="button"
                                        data-bs-toggle="dropdown"
                                        aria-expanded="false"
                                      >
                                        <svg
                                          width={6}
                                          height={24}
                                          viewBox="0 0 6 24"
                                          fill="none"
                                          xmlns="http://www.w3.org/2000/svg"
                                        >
                                          <path
                                            d="M3 16.875C2.30381 16.875 1.63613 17.1516 1.14384 17.6438C0.651562 18.1361 0.375 18.8038 0.375 19.5C0.375 20.1962 0.651562 20.8639 1.14384 21.3562C1.63613 21.8484 2.30381 22.125 3 22.125C3.69619 22.125 4.36387 21.8484 4.85616 21.3562C5.34844 20.8639 5.625 20.1962 5.625 19.5C5.625 18.8038 5.34844 18.1361 4.85616 17.6438C4.36387 17.1516 3.69619 16.875 3 16.875ZM3 9.375C2.30381 9.375 1.63613 9.65156 1.14384 10.1438C0.651562 10.6361 0.375 11.3038 0.375 12C0.375 12.6962 0.651562 13.3639 1.14384 13.8562C1.63613 14.3484 2.30381 14.625 3 14.625C3.69619 14.625 4.36387 14.3484 4.85616 13.8562C5.34844 13.3639 5.625 12.6962 5.625 12C5.625 11.3038 5.34844 10.6361 4.85616 10.1438C4.36387 9.65156 3.69619 9.375 3 9.375ZM5.625 4.5C5.625 3.80381 5.34844 3.13613 4.85616 2.64384C4.36387 2.15156 3.69619 1.875 3 1.875C2.30381 1.875 1.63613 2.15156 1.14384 2.64384C0.651562 3.13613 0.375 3.80381 0.375 4.5C0.375 5.19619 0.651562 5.86387 1.14384 6.35616C1.63613 6.84844 2.30381 7.125 3 7.125C3.69619 7.125 4.36387 6.84844 4.85616 6.35616C5.34844 5.86387 5.625 5.19619 5.625 4.5Z"
                                            fill="#A0A0A0"
                                          />
                                        </svg>
                                      </a>
                                      <ul className="dropdown-menu">
                                        <li>
                                          <Link className="dropdown-item" to={`/dashboard/customerProfile/${customer.id}`}>
                                            {t("view")}
                                          </Link>
                                        </li>
                                        <li>
                                          <hr className="dropdown-divider w-80 m-auto opacity-75" />
                                        </li>
                                        <li>
                                          <a className="dropdown-item" href>
                                            {t("edit")}
                                          </a>
                                        </li>
                                        <li>
                                          <hr className="dropdown-divider w-80 m-auto opacity-75" />
                                        </li>
                                        <li>
                                          <button
                                            className="dropdown-item"
                                            onClick={() => checkIn(customer)}>
                                            {t("CustomerSection.customerMenu.checkIn")}
                                          </button>
                                        </li>
                                        <li>
                                          <hr className="dropdown-divider w-80 m-auto opacity-75" />
                                        </li>
                                        <li>
                                          <a className="dropdown-item" >
                                            {t("CustomerSection.customerMenu.checkout")}
                                          </a>
                                        </li>
                                        <li>
                                          <hr className="dropdown-divider w-80 m-auto opacity-75" />
                                        </li>
                                        <li>
                                          <a className="dropdown-item" >
                                            {t("CustomerSection.customerMenu.Blocked")}
                                          </a>
                                        </li>
                                        <li>
                                          <hr className="dropdown-divider w-80 m-auto opacity-75" />
                                        </li>
                                        <li>
                                          <a
                                            className="dropdown-item text-danger"
                                            
                                          >
                                            {t("delete")}
                                          </a>
                                        </li>
                                      </ul>
                                    </div>
                                  </div>
                                </div>
                                <div className="view-card-body">
                                  <div className="blacklist-label my-3">
                                    {customer?.is_blocked ? "Blocked" : ""}
                                  </div>
                                  <div className="card-row d-flex">
                                    <div className="object d-flex w-20">
                                      {t("input.phone")}
                                      <div className="cell-end ms-auto">.</div>
                                    </div>
                                    <div className="content w-80 ps-5">
                                      {customer?.customer_mobile}
                                    </div>
                                  </div>
                                  <div className="card-row d-flex">
                                    <div className="object d-flex w-20">
                                      {t("geoLocationTabs.country")}
                                      <div className="cell-end ms-auto">.</div>
                                    </div>
                                    <div className="content w-80 ps-5">
                                      {
                                        customer?.city_id_info?.governorate_info
                                          ?.country_info?.pms_country_en
                                          ?.country_name_en
                                      }
                                    </div>
                                  </div>
                                  <div className="card-row d-flex">
                                    <div className="object d-flex w-20">
                                    {t("CustomerSection.id")}
                                      <div className="cell-end ms-auto">.</div>
                                    </div>
                                    <div className="content w-80 ps-5">
                                      {customer.customer_national_id}
                                    </div>
                                  </div>
                                </div>
                                <div className="separetor my-3" />
                                <div className="view-card-footer">
                                  <div className="foot-title mb-2">
                                    dependents
                                  </div>
                                  <div className="card-row d-flex">
                                    <div className="w-25 d-flex">
                                      children
                                      <div className="cell-end ms-auto pe-4">
                                        .
                                      </div>
                                    </div>
                                    <div className="w-25 ps-4">
                                      {/* {customer.dependents_count_by_type.child} */}
                                    </div>
                                    <div className="w-25 d-flex">
                                      adults
                                      <div className="cell-end ms-auto pe-4">
                                        .
                                      </div>
                                    </div>
                                    <div className="w-25 ps-4">
                                      {/* {customer.dependents_count_by_type.Adult} */}
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </>
                        );
                      })}

                  {/* pagination */}
                </div>
              </div>
            </div>
          ) : dataView === "list" ? (
            <ListTable
              filteredData={filteredData}
              visibleColumns={visibleColumns}
            />
          ) : (
            " "
          )}
          {/* end cards */}
        </div>
      </div>
      {/* end content */}
    </>
  );
};

export default AllCustomers;
