import { useContext, useEffect, useState } from "react";
import GeneralTable from "../../../Shared/GeneralTable/GeneralTable";
import CreateNewUser from "../../../Pages/Settings/Users/CreateNewUser";
import AddModal from "../../../Shared/AddModal/AddModal";
import { Breadcrumb } from "react-bootstrap";
import DeleteModal from "../../../Shared/DeleteModal/DeleteModal";
import axios from "axios";
import { AuthContext } from "../../../Helpers/Context/AuthContext";
import { ModalContext } from "../../../Helpers/Context/ModalContext";

const AllUsers = () => {
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
    //  &&
    //   row?.username
  );

  const columns = [
    {
      name: "User",
      visible: true,
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
      name: "Phone",
      selector: (row) => row?.user_phone,
      sortable: true,
      visible: true,
    },
    {
      name: "Email",
      selector: (row) => row?.email,
      sortable: true,
      visible: true,
    },
    {
      name: "Role",
      visible: true,
      selector: (row) => {
        if (row.groups.length > 1) {
          return row.groups.map((group) => group.name).join(", ");
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

  const handleShowAdd = () => {
    setShowState("CreateNewUser");
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
                  {/* <Breadcrumb.Item href="#">Home</Breadcrumb.Item> */}
                  <Breadcrumb.Item>Settings</Breadcrumb.Item>
                  <Breadcrumb.Item active>Users</Breadcrumb.Item>
                </Breadcrumb>
              </div>

              <h3 className="mb-0 px-sub-taps w-50 me-auto">Users</h3>

              <button
                onClick={handleShowAdd}
                className="px-btn px-blue-btn ms-3"
              >
                Create New User
              </button>

              <AddModal
                name="CreateNewUser"
                showState={showState}
                handleClose={handleClose}
                title="Add New User"
                component={<CreateNewUser />}
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

export default AllUsers;
