import { Link, useParams } from "react-router-dom";
import GeneralTable from "../../../../Shared/GeneralTable/GeneralTable";
import DeleteModal from "../../../../Shared/DeleteModal/DeleteModal";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { ModalContext } from "../../../../Helpers/Context/ModalContext";
import { AuthContext } from "../../../../Helpers/Context/AuthContext";

const Permissions = () => {
  const { roleId } = useParams();

  const { Headers, baseUrlMis } = useContext(AuthContext);

  const { modelState, closeModal, setModelState } = useContext(ModalContext);

  const [allPermissions, setAllPermissions] = useState([]);

  const getAllPermissions = () => {
    axios
      .get(`${baseUrlMis}/list-assign-user-to-group/?group_id=${roleId}`, {
        headers: Headers,
      })
      .then((res) => {
        setAllPermissions(res.data);
      })
      .catch((error) => {});
  };

  const filteredRows = allPermissions?.filter(
    (row) => row?.name
    //  &&
    //   row?.username
  );

  const columns = [
    {
      name: "User Name",
      visible: true,
      selector: (row) => row?.name,
      sortable: true,
      reorder: true,
      cell: (row) => (
        <div className="d-flex justify-content-between align-items-center w-100">
          <div className="w-50">{row?.name}</div>
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
                <button onClick={() => deletePermission(row.id)} className="dropdown-item text-danger">Delete</button>
              </li>
            </ul>
          </div>
        </div>
      ),
    }
  ];

  const deletePermission = (id) => {
    setModelState({ status: "delete" });
    console.log(id);
    
  };

  const handleDelete = () => {
    console.log("delete permission");
  };

  useEffect(() => {
    getAllPermissions();
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
                
                  <Link
                    to={"/dashboard/rolesAndPermission/roleDetails/createRole"}
                    className="px-btn px-blue-btn ms-3"
                  >
                    Create New Permission
                  </Link>
                  {/* 
                    <AddModal
                      name="Hotel"
                      showState={showState}
                      handleClose={handleClose}
                      title="Create New Hotel"
                      component={<CreateHotel getHotels={getHotels} />}
                    /> */}
                </div>
              </div>
              {/* component */}
    
              <GeneralTable filteredRows={filteredRows} columns={columns} />
            </div>
          </div>
        </>
      );
}

export default Permissions
