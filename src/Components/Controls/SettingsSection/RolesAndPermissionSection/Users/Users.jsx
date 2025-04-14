import { useContext, useEffect, useState } from "react";
import GeneralTable from "../../../../Shared/GeneralTable/GeneralTable";
import { Link, useParams } from "react-router-dom";
import DeleteModal from "../../../../Shared/DeleteModal/DeleteModal";
import { ModalContext } from "../../../../Helpers/Context/ModalContext";
import { AuthContext } from "../../../../Helpers/Context/AuthContext";
import axios from "axios";
import AddModal from "../../../../Shared/AddModal/AddModal";
import CreateUser from "../../AllUsers/CreateUser";
import AddUser from "./AddUser";

const Users = () => {
  const { roleId } = useParams();

  const { Headers, baseUrlMis } = useContext(AuthContext);

  const {
    modelState,
    closeModal,
    setModelState,
    showState,
    handleClose,
    setShowState,
  } = useContext(ModalContext);

  const [allUsers, setAllUsers] = useState([]);

  const getAllUsers = () => {
    // &branch_id=${roleId}
    axios
      .get(`${baseUrlMis}/user_controle/all/?group_id=${roleId}`, {
        headers: Headers,
      })
      .then((res) => {
        setAllUsers(res.data);
      })
      .catch((error) => {});
  };

  const filteredRows = allUsers?.filter(
    (row) => row?.username
    //  &&
    //   row?.username
  );
  const [hideDirector, setHideDirector] = useState({
    Email: false,
    Phone: false,
  });
  // const [hidePhone, setHidePhone] = useState(false);

  // Helper function to dynamically access row values
  const getDynamicValue = (row, field) => {
    // Field is dynamically passed, and it can be "username", "email", etc.
    return row[field] || "N/A"; // Return field value or a default value if not present
  };
  const columns = [
    {
      name: "User Name",

      // selector: (row) => row?.username,
      selector: (row) => getDynamicValue(row, "username"), // Dynamic access using the helper function
      sortable: true,
      visible: true,
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
                  View
                </button>
              </li>
              <li>
                <a className="dropdown-item">Edit</a>
              </li>
              <li>
                <button
                  onClick={() => deleteUser(row.id)}
                  className="dropdown-item text-danger"
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
      name: "Email",
      // selector: (row) => row?.email,
      selector: (row) => getDynamicValue(row, "email"), // Same dynamic access

      sortable: true,
      // omit: hideDirector.Email,
      visible: true,
    },
    {
      name: "Phone",
      // selector: (row) => row?.user_phone,
      selector: (row) => getDynamicValue(row, "user_phone"), // Same dynamic access
      sortable: true,
      // omit: hideDirector.Phone,
      visible: true,
    },
  ];

  const deleteUser = (id) => {
    setModelState({ status: "delete" });
    console.log(id);
  };

  const handleDelete = () => {
    console.log("delete users");
  };

  const handelShowAdd = () => {
    setShowState("addUser");
  };

  console.log(hideDirector);

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
        className="tab-pane mt-4 fade show active"
        id="pills-hotel"
        role="tabpanel"
        aria-labelledby="pills-hotel-tab"
        tabIndex={0}
      >
        <div className="px-card">
          <div className="card-head d-flex p-4 align-items-center">
            <div className="w-100 d-flex flex-wrap align-items-center justify-content-end">
              <button
                onClick={handelShowAdd}
                className="px-btn px-blue-btn ms-3"
              >
                Add New User
              </button>

              <AddModal
                name="addUser"
                showState={showState}
                handleClose={handleClose}
                title="Create New user"
                component={<CreateUser getAllUsers={getAllUsers} />}
              />
            </div>
          </div>
          {/* component */}

          <GeneralTable filteredRows={filteredRows} columns={columns} />
        </div>
      </div>
    </>
  );
};

export default Users;
