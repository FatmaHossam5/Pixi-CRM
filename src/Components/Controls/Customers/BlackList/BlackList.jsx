import Breadcrumb from "react-bootstrap/Breadcrumb";
import AddModal from "../../../Shared/AddModal/AddModal";
import CreateBlackList from "./CreateBlackList";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { ModalContext } from "../../../Helpers/Context/ModalContext";
import { AuthContext } from "../../../Helpers/Context/AuthContext";
import GeneralTable from "../../../Shared/GeneralTable/GeneralTable";
import { format } from "date-fns";
import BlockedCustomerDetails from "./BlockedCustomerDetails";
import { useTranslation } from "react-i18next";
import i18next from "i18next";
import { ToastContext } from "../../../Helpers/Context/ToastContext ";

const BlackList = () => {
  const { t } = useTranslation();
  const { language } = i18next;
  const { baseUrlPms, Headers } = useContext(AuthContext);
  const { showState, handleClose, setShowState, setModelState } =
    useContext(ModalContext);
  const { showToast } = useContext(ToastContext);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return format(date, "MMMM dd, yyyy ");
  };

  const handleShowAdd = () => {
    setShowState("BlackList");
  };

  const [id, setId] = useState();
  const [removeId, setRemoveId] = useState();

  const [blackLists, setBlackLists] = useState([]);
  const getBlackLists = () => {
    axios
      .get(`${baseUrlPms}/blacklist/all/`, {
        headers: Headers,
      })
      .then((res) => {
        setBlackLists(res.data);
        console.log(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const filteredRows = blackLists?.filter(
    (row) =>
      row?.customer_info?.pms_customer_en.customer_name_en &&
      row?.customer_info?.pms_customer_ar.customer_name_ar
  );

  const handelView = (id, removeId) => {
    setShowState("ViewDetails");
    setId(id);
    console.log(id, removeId);

    setRemoveId(removeId);
  };

  const Remove = (rowId) => {
    console.log(rowId);

    axios.patch(
      `${baseUrlPms}/change_blocked_customer/${rowId}/update_blacklist/`,
      {
        is_blocked: false
      },
      {
        headers: Headers,
      }
    ).then((res) => {
      showToast('success', t("msg.removefromBlocked"));

      // }
    }).catch((error) => {
      showToast('error', t("msg.errorMessage"));


    }).finally(() => {
      handleClose();
      getBlackLists()
      // setIsLoading(false);
      // setIsDisabled(false);
    })
  };

  const columns = [
    {
      name: t("englishName"),
      selector: (row) => row?.customer_info?.pms_customer_en?.customer_name_en,
      sortable: true,
      reorder: true,
      visible: true,
      cell: (row) => (
        <div className="d-flex justify-content-between align-items-center w-100">
          <div className="w-50">
            {row?.customer_info.pms_customer_en?.customer_name_en}
          </div>
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
                <button
                  className="dropdown-item"
                  onClick={() => handelView(row.customer_id, row.id)}
                >
                  {t("view")}
                </button>
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
                  className="dropdown-item text-danger"
                  onClick={() => Remove(row.id)}
                >
                  {t("BlacklistSection.remove")}
                </button>
              </li>
            </ul>
          </div>
        </div>
      ),
    },
    {
      name: t("arabicName"),
      selector: (row) => row?.customer_info?.pms_customer_ar?.customer_name_ar,
      sortable: true,
      visible: true,
    },
    {
      name: t("BlacklistSection.addedBy"),
      selector: (row) => row?.created_user_info.username,
      sortable: true,
      visible: true,
    },
    {
      name: t("BlacklistSection.addedAt"),
      selector: (row) => formatDate(row?.created_at),
      sortable: true,
      visible: true,
    },
    {
      name: t("BlacklistSection.updatedBy"),
      selector: (row) => row.updated_user_info.username,
      sortable: true,
      visible: true,
    },
    {
      name: t("BlacklistSection.updatedAt"),
      selector: (row) => formatDate(row.updated_at),
      sortable: true,
      visible: true,
    },
  ];

  useEffect(() => {
    getBlackLists();
  }, []);

  return (
    <>

      <div className="px-content mb-auto">
        <div className="px-card pb-2 mt-4">
          <div className="card-head d-flex p-4 pb-0 flex-wrap align-items-center">
            <div className="w-100 d-flex flex-wrap align-items-center">
              <div className="breadcrumbs-list mb-2 w-100">

                <Breadcrumb>
                  {/* <Breadcrumb.Item href="#">Home</Breadcrumb.Item> */}
                  <Breadcrumb.Item>{t("customers")}</Breadcrumb.Item>
                  <Breadcrumb.Item active>{t("blackList")}</Breadcrumb.Item>
                </Breadcrumb>
              </div>
              <h4>{t("blackList")}</h4>
              {/* Button trigger modal */}
              <button
                type="button"
                className="px-btn px-blue-btn create-btn ms-auto"
                onClick={handleShowAdd}
              >
                {t("BlacklistSection.addCustomerToBlacklist")}
              </button>
              <AddModal
                name="BlackList"
                showState={showState}
                handleClose={handleClose}
                title={`${t('BlacklistSection.createBlackListed')}`}

                component={
                  <CreateBlackList getBlackLists={getBlackLists} />
                }
              />

              <AddModal
                name="ViewDetails"
                showState={showState}
                handleClose={handleClose}
                title={t("BlacklistSection.blackListedCustomerDetails")}
                component={
                  <BlockedCustomerDetails
                    id={id}
                    remove={() => Remove(removeId)}
                  />
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

export default BlackList;
