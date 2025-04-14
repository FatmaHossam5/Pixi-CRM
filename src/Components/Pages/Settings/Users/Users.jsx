// import { useContext, useEffect, useState } from "react";
// import { AuthContext } from "../../Helpers/Context/AuthContext";
// import { Link, useNavigate } from "react-router-dom";
// import { Breadcrumb } from "react-bootstrap";
// import GeneralTable from "../../Shared/GeneralTable/GeneralTable";
// import axios from "axios";
// import DeleteModal from "../../Shared/DeleteModal/DeleteModal";
// import { ModalContext } from "../../Helpers/Context/ModalContext";

import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../Helpers/Context/AuthContext";
import { ModalContext } from "../../../Helpers/Context/ModalContext";
import axios from "axios";
import DeleteModal from "../../../Shared/DeleteModal/DeleteModal";
import { Breadcrumb } from "react-bootstrap";
import { Link } from "react-router-dom";
import GeneralTable from "../../Shared/GeneralTable/GeneralTable";
import i18next from "i18next";
import { useTranslation } from "react-i18next";
import AddModal from "../../../Shared/AddModal/AddModal";
import CreateNewUser from "./CreateNewUser";
import AllUsers from "../../../Controls/SettingsSection/AllUsers/AllUsers";

const Users = () => {
  const { t } = useTranslation();
  const {language} = i18next;
  const { Headers, baseUrlMis } = useContext(AuthContext);

  const { modelState, closeModal, setModelState } = useContext(ModalContext);

  const [allUsers, setAllUsers] = useState([]);

  const getAllUsers = () => {
    axios
      .get(`${baseUrlMis}/user_controle/all/`, {
        headers: Headers,
      })
      .then((res) => {
        setAllUsers(res.data);
      })
      .catch((error) => {});
  };

  const filteredRows = allUsers?.filter(
    (row) => row?.username
  );

  const columns = [
    {
      name: t("usersSection.user"),

      selector: (row) => row?.username,
      sortable: true,
      reorder: true,
      cell: (row) => (
        <div className="d-flex justify-content-between align-items-center w-100">
          <div className="w-50">{row?.username}</div>
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
                  // onClick={() => details(row.id, row.pms_group_request_en)}
                >
                  {t("view")}
                </button>
              </li>
              <li>
                <a className="dropdown-item">{t("edit")}</a>
              </li>
              <li>
                <button onClick={() => deleteUser(row.id)} className="dropdown-item text-danger">{t("delete")}</button>
              </li>
            </ul>
          </div>
        </div>
      ),
    },

    {
      name: t("input.phone"),
      selector: (row) => row?.user_phone,
      sortable: true,
    },
    {
      name: t("input.email"),
      selector: (row) => row?.email,
      sortable: true,
    },
    {
      name: t("usersSection.role"),
      selector: (row) => {
        if (row.groups.length > 1) {
          return row.groups.map(group => group.name).join(", ");
        } else {
          return row.groups[0]?.name || "";
        }
      },
      
      sortable: true,
    },
  ];

  const deleteUser = (id) => {
    setModelState({ status: "delete" });
    console.log(id);
    
  };

  const handleDelete = () => {
    console.log("delete users");
  };

  useEffect(() => {
    getAllUsers();
  }, []);
  return (
        <>
          <DeleteModal
            show={modelState.status === "delete"}
            closeModal={closeModal}
            fun={handleDelete}
            text={"user"}
          />
          <div
            className="tab-pane fade show active"
            id="pills-hotel"
            role="tabpanel"
            aria-labelledby="pills-hotel-tab"
            tabIndex={0}
          >
            <div className="px-card">
              <div className="card-head d-flex p-4 align-items-center">
                <div className="w-100 d-flex flex-wrap align-items-center">
                  <div className="breadcrumbs-list mb-2 w-100">
                    <Breadcrumb>
                      <Breadcrumb.Item> {t('settings')}</Breadcrumb.Item>
                      <Breadcrumb.Item active>{t("users")}</Breadcrumb.Item>
                    </Breadcrumb>
                  </div>
    
                  <h3 className="mb-0 px-sub-taps w-50 me-auto">{t("users")}</h3>
    
                  <Link
                    to={"CreateGroupRequest"}
                    className="px-btn px-blue-btn ms-3"
                  >
                   {`${t("createNew")} ${t("usersSection.user")}`}
                  </Link>
               
                </div>
              </div>
              {/* component */}
    
              <GeneralTable filteredRows={filteredRows} columns={columns} />
            </div>
          </div>
        </>
      );
}

export default Users
