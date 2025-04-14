import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { Breadcrumb } from "react-bootstrap";
import { Link } from "react-router-dom";
import { AuthContext } from "../../../../Helpers/Context/AuthContext";

const CreateRole = () => {

  const { baseUrlMis, Headers } = useContext(AuthContext);

  const [rolesAndPermissions, setRolesAndPermissions] = useState();
  const getRolesAndPermissions = () => {
    axios
      .get(`${baseUrlMis}/custom_list_permissions/`, {
        headers: Headers,
      })
      .then((res) => {
        setRolesAndPermissions(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    getRolesAndPermissions();
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
            <div className="w-100 d-flex flex-wrap align-items-center"> 
              <div className="breadcrumbs-list mb-2 w-100">
                <Breadcrumb>
                  {/* <Breadcrumb.Item href="#">Home</Breadcrumb.Item> */}
                  <Breadcrumb.Item>Settings</Breadcrumb.Item>
                  <Breadcrumb.Item>
                    <Link to={"/dashboard/rolesAndPermission"}>
                      Role And Permission
                    </Link>
                  </Breadcrumb.Item>
                  <Breadcrumb.Item active>Create New Role</Breadcrumb.Item>
                </Breadcrumb>
              </div>

              <h3 className="mb-0 px-sub-taps w-50 me-auto">Create New Role</h3>

              <div className="card-body create-new-role">
                    <form action className="d-flex flex-wrap w-100">
                      <div className="form-inputs d-flex w-100">
                      <div className="input-package mt-3 pe-2 d-flex flex-column w-50">
                          <label className="mb-2 modal-label" htmlFor>
                            Role english name
                          </label>
                          <input
                            type="text"
                            placeholder="Enter Role name"
                            className="px-form-input w-100 m-auto"
                          />
                        </div>
                        <div className="input-package mt-3 ps-2 d-flex flex-column w-50">
                          <label className="mb-2 modal-label" htmlFor>
                            Role arabic name
                          </label>
                          <input
                            type="text"
                            placeholder="Enter Role name"
                            className="px-form-input w-100 m-auto"
                          />
                        </div>                     
                      </div>
                      <h6 className="mt-4">permissions</h6>
                      <div className="accordion w-100 ">
                        <div className="accordion-item ">
                          <h2 className="accordion-header">
                            <button
                              className="accordion-button collapsed"
                              type="button"
                              data-bs-toggle="collapse"
                              data-bs-target="#room-settings-accordion"
                              aria-expanded="true"
                              aria-controls="room-settings-accordion"
                            >
                              <input id="room-settings" type="checkbox" />
                              <label
                                className="ms-2 text-capitalize"
                                htmlFor="room-settings"
                              >
                                <h6 className="m-0">room settings</h6>
                              </label>
                            </button>
                          </h2>
                          <div
                            id="room-settings-accordion"
                            className="accordion-collapse collapse "
                          >
                            <div className="accordion-body gray-text">
                              {/*--------- start room type --------*/}
                              <div className="room-type ">
                                <div className="container-fluid">
                                  <div className="row">
                                    <div className="col-4">room type</div>
                                    <div className="col-4">
                                      <div className="d-flex align-items-center ">
                                        select all
                                        <div className="ms-3 switch-container d-flex align-items-center">
                                          <label className="switch">
                                            <input
                                              type="checkbox"
                                              id="toggle-switch"
                                            />
                                            <span className="slider" />
                                          </label>
                                        </div>
                                      </div>
                                    </div>
                                    <div className="col-4">
                                      <ul>
                                        <li className="d-flex justify-content-between mb-3">
                                          <span className="gray-text">
                                            Create new room type
                                          </span>
                                          <div className="ms-3 switch-container d-flex align-items-center">
                                            <label className="switch">
                                              <input
                                                type="checkbox"
                                                id="toggle-switch"
                                              />
                                              <span className="slider" />
                                            </label>
                                          </div>
                                        </li>
                                        <li className="d-flex justify-content-between my-3">
                                          <span className="gray-text">
                                            Search and filter room types table{" "}
                                          </span>
                                          <div className="ms-3 switch-container d-flex align-items-center">
                                            <label className="switch">
                                              <input
                                                type="checkbox"
                                                id="toggle-switch"
                                              />
                                              <span className="slider" />
                                            </label>
                                          </div>
                                        </li>
                                        <li className="d-flex justify-content-between my-3">
                                          <span className="gray-text">
                                            Manage room types table columns
                                          </span>
                                          <div className="ms-3 switch-container d-flex align-items-center">
                                            <label className="switch">
                                              <input
                                                type="checkbox"
                                                id="toggle-switch"
                                              />
                                              <span className="slider" />
                                            </label>
                                          </div>
                                        </li>
                                        <li className="d-flex justify-content-between my-3">
                                          <span className="gray-text">
                                            Exporting room types table data
                                          </span>
                                          <div className="ms-3 switch-container d-flex align-items-center">
                                            <label className="switch">
                                              <input
                                                type="checkbox"
                                                id="toggle-switch"
                                              />
                                              <span className="slider" />
                                            </label>
                                          </div>
                                        </li>
                                        <li className="d-flex justify-content-between my-3">
                                          <span className="gray-text">
                                            Edit room types table data
                                          </span>
                                          <div className="ms-3 switch-container d-flex align-items-center">
                                            <label className="switch">
                                              <input
                                                type="checkbox"
                                                id="toggle-switch"
                                              />
                                              <span className="slider" />
                                            </label>
                                          </div>
                                        </li>
                                        <li className="d-flex justify-content-between my-3">
                                          <span className="gray-text">
                                            Delete room types table data
                                          </span>
                                          <div className="ms-3 switch-container d-flex align-items-center">
                                            <label className="switch">
                                              <input
                                                type="checkbox"
                                                id="toggle-switch"
                                              />
                                              <span className="slider" />
                                            </label>
                                          </div>
                                        </li>
                                        <li className="d-flex justify-content-between my-3">
                                          <span className="gray-text">
                                            View room types table data
                                          </span>
                                          <div className="ms-3 switch-container d-flex align-items-center">
                                            <label className="switch">
                                              <input
                                                type="checkbox"
                                                id="toggle-switch"
                                              />
                                              <span className="slider" />
                                            </label>
                                          </div>
                                        </li>
                                      </ul>
                                    </div>
                                  </div>
                                </div>
                              </div>
                              {/*---------- end room type ---------*/}
                              {/*--------- start room view --------*/}
                              <div className="room-view mt-4">
                                <div className="container-fluid">
                                  <div className="row">
                                    <div className="col-4">room view</div>
                                    <div className="col-4">
                                      <div className="d-flex align-items-center ">
                                        select all
                                        <div className="ms-3 switch-container d-flex align-items-center">
                                          <label className="switch">
                                            <input
                                              type="checkbox"
                                              id="toggle-switch"
                                            />
                                            <span className="slider" />
                                          </label>
                                        </div>
                                      </div>
                                    </div>
                                    <div className="col-4">
                                      <ul>
                                        <li className="d-flex justify-content-between mb-3">
                                          <span className="gray-text">
                                            Create new room view
                                          </span>
                                          <div className="ms-3 switch-container d-flex align-items-center">
                                            <label className="switch">
                                              <input
                                                type="checkbox"
                                                id="toggle-switch"
                                              />
                                              <span className="slider" />
                                            </label>
                                          </div>
                                        </li>
                                        <li className="d-flex justify-content-between my-3">
                                          <span className="gray-text">
                                            Search and filter room views table{" "}
                                          </span>
                                          <div className="ms-3 switch-container d-flex align-items-center">
                                            <label className="switch">
                                              <input
                                                type="checkbox"
                                                id="toggle-switch"
                                              />
                                              <span className="slider" />
                                            </label>
                                          </div>
                                        </li>
                                        <li className="d-flex justify-content-between my-3">
                                          <span className="gray-text">
                                            Manage room views table columns
                                          </span>
                                          <div className="ms-3 switch-container d-flex align-items-center">
                                            <label className="switch">
                                              <input
                                                type="checkbox"
                                                id="toggle-switch"
                                              />
                                              <span className="slider" />
                                            </label>
                                          </div>
                                        </li>
                                        <li className="d-flex justify-content-between my-3">
                                          <span className="gray-text">
                                            Exporting room views table data
                                          </span>
                                          <div className="ms-3 switch-container d-flex align-items-center">
                                            <label className="switch">
                                              <input
                                                type="checkbox"
                                                id="toggle-switch"
                                              />
                                              <span className="slider" />
                                            </label>
                                          </div>
                                        </li>
                                        <li className="d-flex justify-content-between my-3">
                                          <span className="gray-text">
                                            Edit room views table data
                                          </span>
                                          <div className="ms-3 switch-container d-flex align-items-center">
                                            <label className="switch">
                                              <input
                                                type="checkbox"
                                                id="toggle-switch"
                                              />
                                              <span className="slider" />
                                            </label>
                                          </div>
                                        </li>
                                        <li className="d-flex justify-content-between my-3">
                                          <span className="gray-text">
                                            Delete room views table data
                                          </span>
                                          <div className="ms-3 switch-container d-flex align-items-center">
                                            <label className="switch">
                                              <input
                                                type="checkbox"
                                                id="toggle-switch"
                                              />
                                              <span className="slider" />
                                            </label>
                                          </div>
                                        </li>
                                        <li className="d-flex justify-content-between my-3">
                                          <span className="gray-text">
                                            View room views table data
                                          </span>
                                          <div className="ms-3 switch-container d-flex align-items-center">
                                            <label className="switch">
                                              <input
                                                type="checkbox"
                                                id="toggle-switch"
                                              />
                                              <span className="slider" />
                                            </label>
                                          </div>
                                        </li>
                                      </ul>
                                    </div>
                                  </div>
                                </div>
                              </div>
                              {/*---------- end room view ---------*/}
                              {/*--------- start room status --------*/}
                              <div className="room-status mt-4">
                                <div className="container-fluid">
                                  <div className="row">
                                    <div className="col-4">room status</div>
                                    <div className="col-4">
                                      <div className="d-flex align-items-center ">
                                        select all
                                        <div className="ms-3 switch-container d-flex align-items-center">
                                          <label className="switch">
                                            <input
                                              type="checkbox"
                                              id="toggle-switch"
                                            />
                                            <span className="slider" />
                                          </label>
                                        </div>
                                      </div>
                                    </div>
                                    <div className="col-4">
                                      <ul>
                                        <li className="d-flex justify-content-between mb-3">
                                          <span className="gray-text">
                                            Create new room status
                                          </span>
                                          <div className="ms-3 switch-container d-flex align-items-center">
                                            <label className="switch">
                                              <input
                                                type="checkbox"
                                                id="toggle-switch"
                                              />
                                              <span className="slider" />
                                            </label>
                                          </div>
                                        </li>
                                        <li className="d-flex justify-content-between my-3">
                                          <span className="gray-text">
                                            Search and filter room status table{" "}
                                          </span>
                                          <div className="ms-3 switch-container d-flex align-items-center">
                                            <label className="switch">
                                              <input
                                                type="checkbox"
                                                id="toggle-switch"
                                              />
                                              <span className="slider" />
                                            </label>
                                          </div>
                                        </li>
                                        <li className="d-flex justify-content-between my-3">
                                          <span className="gray-text">
                                            Manage room status table columns
                                          </span>
                                          <div className="ms-3 switch-container d-flex align-items-center">
                                            <label className="switch">
                                              <input
                                                type="checkbox"
                                                id="toggle-switch"
                                              />
                                              <span className="slider" />
                                            </label>
                                          </div>
                                        </li>
                                        <li className="d-flex justify-content-between my-3">
                                          <span className="gray-text">
                                            Exporting room status table data
                                          </span>
                                          <div className="ms-3 switch-container d-flex align-items-center">
                                            <label className="switch">
                                              <input
                                                type="checkbox"
                                                id="toggle-switch"
                                              />
                                              <span className="slider" />
                                            </label>
                                          </div>
                                        </li>
                                        <li className="d-flex justify-content-between my-3">
                                          <span className="gray-text">
                                            Edit room status table data
                                          </span>
                                          <div className="ms-3 switch-container d-flex align-items-center">
                                            <label className="switch">
                                              <input
                                                type="checkbox"
                                                id="toggle-switch"
                                              />
                                              <span className="slider" />
                                            </label>
                                          </div>
                                        </li>
                                        <li className="d-flex justify-content-between my-3">
                                          <span className="gray-text">
                                            Delete room status table data
                                          </span>
                                          <div className="ms-3 switch-container d-flex align-items-center">
                                            <label className="switch">
                                              <input
                                                type="checkbox"
                                                id="toggle-switch"
                                              />
                                              <span className="slider" />
                                            </label>
                                          </div>
                                        </li>
                                        <li className="d-flex justify-content-between my-3">
                                          <span className="gray-text">
                                            View room status table data
                                          </span>
                                          <div className="ms-3 switch-container d-flex align-items-center">
                                            <label className="switch">
                                              <input
                                                type="checkbox"
                                                id="toggle-switch"
                                              />
                                              <span className="slider" />
                                            </label>
                                          </div>
                                        </li>
                                      </ul>
                                    </div>
                                  </div>
                                </div>
                              </div>
                              {/*---------- end room view ---------*/}
                            </div>
                          </div>
                        </div>
                        <div className="accordion-item ">
                          <h2 className="accordion-header">
                            <button
                              className="accordion-button collapsed"
                              type="button"
                              data-bs-toggle="collapse"
                              data-bs-target="#Services-settings-accordion"
                              aria-expanded="true"
                              aria-controls="Services-settings-accordion"
                            >
                              <input id="room-settings" type="checkbox" />
                              <label
                                className="ms-2 text-capitalize"
                                htmlFor="room-settings"
                              >
                                <h6 className="m-0">Services Settings</h6>
                              </label>
                            </button>
                          </h2>
                          <div
                            id="Services-settings-accordion"
                            className="accordion-collapse collapse "
                          >
                            <div className="accordion-body gray-text">
                              {/*--------- start room type --------*/}
                              <div className="room-type ">
                                <div className="container-fluid">
                                  <div className="row">
                                    <div className="col-4">room type</div>
                                    <div className="col-4">
                                      <div className="d-flex align-items-center ">
                                        select all
                                        <div className="ms-3 switch-container d-flex align-items-center">
                                          <label className="switch">
                                            <input
                                              type="checkbox"
                                              id="toggle-switch"
                                            />
                                            <span className="slider" />
                                          </label>
                                        </div>
                                      </div>
                                    </div>
                                    <div className="col-4">
                                      <ul>
                                        <li className="d-flex justify-content-between mb-3">
                                          <span className="gray-text">
                                            Create new room type
                                          </span>
                                          <div className="ms-3 switch-container d-flex align-items-center">
                                            <label className="switch">
                                              <input
                                                type="checkbox"
                                                id="toggle-switch"
                                              />
                                              <span className="slider" />
                                            </label>
                                          </div>
                                        </li>
                                        <li className="d-flex justify-content-between my-3">
                                          <span className="gray-text">
                                            Search and filter room types table{" "}
                                          </span>
                                          <div className="ms-3 switch-container d-flex align-items-center">
                                            <label className="switch">
                                              <input
                                                type="checkbox"
                                                id="toggle-switch"
                                              />
                                              <span className="slider" />
                                            </label>
                                          </div>
                                        </li>
                                        <li className="d-flex justify-content-between my-3">
                                          <span className="gray-text">
                                            Manage room types table columns
                                          </span>
                                          <div className="ms-3 switch-container d-flex align-items-center">
                                            <label className="switch">
                                              <input
                                                type="checkbox"
                                                id="toggle-switch"
                                              />
                                              <span className="slider" />
                                            </label>
                                          </div>
                                        </li>
                                        <li className="d-flex justify-content-between my-3">
                                          <span className="gray-text">
                                            Exporting room types table data
                                          </span>
                                          <div className="ms-3 switch-container d-flex align-items-center">
                                            <label className="switch">
                                              <input
                                                type="checkbox"
                                                id="toggle-switch"
                                              />
                                              <span className="slider" />
                                            </label>
                                          </div>
                                        </li>
                                        <li className="d-flex justify-content-between my-3">
                                          <span className="gray-text">
                                            Edit room types table data
                                          </span>
                                          <div className="ms-3 switch-container d-flex align-items-center">
                                            <label className="switch">
                                              <input
                                                type="checkbox"
                                                id="toggle-switch"
                                              />
                                              <span className="slider" />
                                            </label>
                                          </div>
                                        </li>
                                        <li className="d-flex justify-content-between my-3">
                                          <span className="gray-text">
                                            Delete room types table data
                                          </span>
                                          <div className="ms-3 switch-container d-flex align-items-center">
                                            <label className="switch">
                                              <input
                                                type="checkbox"
                                                id="toggle-switch"
                                              />
                                              <span className="slider" />
                                            </label>
                                          </div>
                                        </li>
                                        <li className="d-flex justify-content-between my-3">
                                          <span className="gray-text">
                                            View room types table data
                                          </span>
                                          <div className="ms-3 switch-container d-flex align-items-center">
                                            <label className="switch">
                                              <input
                                                type="checkbox"
                                                id="toggle-switch"
                                              />
                                              <span className="slider" />
                                            </label>
                                          </div>
                                        </li>
                                      </ul>
                                    </div>
                                  </div>
                                </div>
                              </div>
                              {/*---------- end room type ---------*/}
                              {/*--------- start room view --------*/}
                              <div className="room-view mt-4">
                                <div className="container-fluid">
                                  <div className="row">
                                    <div className="col-4">room view</div>
                                    <div className="col-4">
                                      <div className="d-flex align-items-center ">
                                        select all
                                        <div className="ms-3 switch-container d-flex align-items-center">
                                          <label className="switch">
                                            <input
                                              type="checkbox"
                                              id="toggle-switch"
                                            />
                                            <span className="slider" />
                                          </label>
                                        </div>
                                      </div>
                                    </div>
                                    <div className="col-4">
                                      <ul>
                                        <li className="d-flex justify-content-between mb-3">
                                          <span className="gray-text">
                                            Create new room view
                                          </span>
                                          <div className="ms-3 switch-container d-flex align-items-center">
                                            <label className="switch">
                                              <input
                                                type="checkbox"
                                                id="toggle-switch"
                                              />
                                              <span className="slider" />
                                            </label>
                                          </div>
                                        </li>
                                        <li className="d-flex justify-content-between my-3">
                                          <span className="gray-text">
                                            Search and filter room views table{" "}
                                          </span>
                                          <div className="ms-3 switch-container d-flex align-items-center">
                                            <label className="switch">
                                              <input
                                                type="checkbox"
                                                id="toggle-switch"
                                              />
                                              <span className="slider" />
                                            </label>
                                          </div>
                                        </li>
                                        <li className="d-flex justify-content-between my-3">
                                          <span className="gray-text">
                                            Manage room views table columns
                                          </span>
                                          <div className="ms-3 switch-container d-flex align-items-center">
                                            <label className="switch">
                                              <input
                                                type="checkbox"
                                                id="toggle-switch"
                                              />
                                              <span className="slider" />
                                            </label>
                                          </div>
                                        </li>
                                        <li className="d-flex justify-content-between my-3">
                                          <span className="gray-text">
                                            Exporting room views table data
                                          </span>
                                          <div className="ms-3 switch-container d-flex align-items-center">
                                            <label className="switch">
                                              <input
                                                type="checkbox"
                                                id="toggle-switch"
                                              />
                                              <span className="slider" />
                                            </label>
                                          </div>
                                        </li>
                                        <li className="d-flex justify-content-between my-3">
                                          <span className="gray-text">
                                            Edit room views table data
                                          </span>
                                          <div className="ms-3 switch-container d-flex align-items-center">
                                            <label className="switch">
                                              <input
                                                type="checkbox"
                                                id="toggle-switch"
                                              />
                                              <span className="slider" />
                                            </label>
                                          </div>
                                        </li>
                                        <li className="d-flex justify-content-between my-3">
                                          <span className="gray-text">
                                            Delete room views table data
                                          </span>
                                          <div className="ms-3 switch-container d-flex align-items-center">
                                            <label className="switch">
                                              <input
                                                type="checkbox"
                                                id="toggle-switch"
                                              />
                                              <span className="slider" />
                                            </label>
                                          </div>
                                        </li>
                                        <li className="d-flex justify-content-between my-3">
                                          <span className="gray-text">
                                            View room views table data
                                          </span>
                                          <div className="ms-3 switch-container d-flex align-items-center">
                                            <label className="switch">
                                              <input
                                                type="checkbox"
                                                id="toggle-switch"
                                              />
                                              <span className="slider" />
                                            </label>
                                          </div>
                                        </li>
                                      </ul>
                                    </div>
                                  </div>
                                </div>
                              </div>
                              {/*---------- end room view ---------*/}
                              {/*--------- start room status --------*/}
                              <div className="room-status mt-4">
                                <div className="container-fluid">
                                  <div className="row">
                                    <div className="col-4">room status</div>
                                    <div className="col-4">
                                      <div className="d-flex align-items-center ">
                                        select all
                                        <div className="ms-3 switch-container d-flex align-items-center">
                                          <label className="switch">
                                            <input
                                              type="checkbox"
                                              id="toggle-switch"
                                            />
                                            <span className="slider" />
                                          </label>
                                        </div>
                                      </div>
                                    </div>
                                    <div className="col-4">
                                      <ul>
                                        <li className="d-flex justify-content-between mb-3">
                                          <span className="gray-text">
                                            Create new room status
                                          </span>
                                          <div className="ms-3 switch-container d-flex align-items-center">
                                            <label className="switch">
                                              <input
                                                type="checkbox"
                                                id="toggle-switch"
                                              />
                                              <span className="slider" />
                                            </label>
                                          </div>
                                        </li>
                                        <li className="d-flex justify-content-between my-3">
                                          <span className="gray-text">
                                            Search and filter room status table{" "}
                                          </span>
                                          <div className="ms-3 switch-container d-flex align-items-center">
                                            <label className="switch">
                                              <input
                                                type="checkbox"
                                                id="toggle-switch"
                                              />
                                              <span className="slider" />
                                            </label>
                                          </div>
                                        </li>
                                        <li className="d-flex justify-content-between my-3">
                                          <span className="gray-text">
                                            Manage room status table columns
                                          </span>
                                          <div className="ms-3 switch-container d-flex align-items-center">
                                            <label className="switch">
                                              <input
                                                type="checkbox"
                                                id="toggle-switch"
                                              />
                                              <span className="slider" />
                                            </label>
                                          </div>
                                        </li>
                                        <li className="d-flex justify-content-between my-3">
                                          <span className="gray-text">
                                            Exporting room status table data
                                          </span>
                                          <div className="ms-3 switch-container d-flex align-items-center">
                                            <label className="switch">
                                              <input
                                                type="checkbox"
                                                id="toggle-switch"
                                              />
                                              <span className="slider" />
                                            </label>
                                          </div>
                                        </li>
                                        <li className="d-flex justify-content-between my-3">
                                          <span className="gray-text">
                                            Edit room status table data
                                          </span>
                                          <div className="ms-3 switch-container d-flex align-items-center">
                                            <label className="switch">
                                              <input
                                                type="checkbox"
                                                id="toggle-switch"
                                              />
                                              <span className="slider" />
                                            </label>
                                          </div>
                                        </li>
                                        <li className="d-flex justify-content-between my-3">
                                          <span className="gray-text">
                                            Delete room status table data
                                          </span>
                                          <div className="ms-3 switch-container d-flex align-items-center">
                                            <label className="switch">
                                              <input
                                                type="checkbox"
                                                id="toggle-switch"
                                              />
                                              <span className="slider" />
                                            </label>
                                          </div>
                                        </li>
                                        <li className="d-flex justify-content-between my-3">
                                          <span className="gray-text">
                                            View room status table data
                                          </span>
                                          <div className="ms-3 switch-container d-flex align-items-center">
                                            <label className="switch">
                                              <input
                                                type="checkbox"
                                                id="toggle-switch"
                                              />
                                              <span className="slider" />
                                            </label>
                                          </div>
                                        </li>
                                      </ul>
                                    </div>
                                  </div>
                                </div>
                              </div>
                              {/*---------- end room view ---------*/}
                            </div>
                          </div>
                        </div>
                        <div className="accordion-item ">
                          <h2 className="accordion-header">
                            <button
                              className="accordion-button collapsed"
                              type="button"
                              data-bs-toggle="collapse"
                              data-bs-target="#Seasons-settings-accordion"
                              aria-expanded="true"
                              aria-controls="Seasons-settings-accordion"
                            >
                              <input id="room-settings" type="checkbox" />
                              <label
                                className="ms-2 text-capitalize"
                                htmlFor="room-settings"
                              >
                                <h6 className="m-0">Seasons Settings</h6>
                              </label>
                            </button>
                          </h2>
                          <div
                            id="Seasons-settings-accordion"
                            className="accordion-collapse collapse "
                          >
                            <div className="accordion-body gray-text">
                              {/*--------- start room type --------*/}
                              <div className="room-type ">
                                <div className="container-fluid">
                                  <div className="row">
                                    <div className="col-4">room type</div>
                                    <div className="col-4">
                                      <div className="d-flex align-items-center ">
                                        select all
                                        <div className="ms-3 switch-container d-flex align-items-center">
                                          <label className="switch">
                                            <input
                                              type="checkbox"
                                              id="toggle-switch"
                                            />
                                            <span className="slider" />
                                          </label>
                                        </div>
                                      </div>
                                    </div>
                                    <div className="col-4">
                                      <ul>
                                        <li className="d-flex justify-content-between mb-3">
                                          <span className="gray-text">
                                            Create new room type
                                          </span>
                                          <div className="ms-3 switch-container d-flex align-items-center">
                                            <label className="switch">
                                              <input
                                                type="checkbox"
                                                id="toggle-switch"
                                              />
                                              <span className="slider" />
                                            </label>
                                          </div>
                                        </li>
                                        <li className="d-flex justify-content-between my-3">
                                          <span className="gray-text">
                                            Search and filter room types table{" "}
                                          </span>
                                          <div className="ms-3 switch-container d-flex align-items-center">
                                            <label className="switch">
                                              <input
                                                type="checkbox"
                                                id="toggle-switch"
                                              />
                                              <span className="slider" />
                                            </label>
                                          </div>
                                        </li>
                                        <li className="d-flex justify-content-between my-3">
                                          <span className="gray-text">
                                            Manage room types table columns
                                          </span>
                                          <div className="ms-3 switch-container d-flex align-items-center">
                                            <label className="switch">
                                              <input
                                                type="checkbox"
                                                id="toggle-switch"
                                              />
                                              <span className="slider" />
                                            </label>
                                          </div>
                                        </li>
                                        <li className="d-flex justify-content-between my-3">
                                          <span className="gray-text">
                                            Exporting room types table data
                                          </span>
                                          <div className="ms-3 switch-container d-flex align-items-center">
                                            <label className="switch">
                                              <input
                                                type="checkbox"
                                                id="toggle-switch"
                                              />
                                              <span className="slider" />
                                            </label>
                                          </div>
                                        </li>
                                        <li className="d-flex justify-content-between my-3">
                                          <span className="gray-text">
                                            Edit room types table data
                                          </span>
                                          <div className="ms-3 switch-container d-flex align-items-center">
                                            <label className="switch">
                                              <input
                                                type="checkbox"
                                                id="toggle-switch"
                                              />
                                              <span className="slider" />
                                            </label>
                                          </div>
                                        </li>
                                        <li className="d-flex justify-content-between my-3">
                                          <span className="gray-text">
                                            Delete room types table data
                                          </span>
                                          <div className="ms-3 switch-container d-flex align-items-center">
                                            <label className="switch">
                                              <input
                                                type="checkbox"
                                                id="toggle-switch"
                                              />
                                              <span className="slider" />
                                            </label>
                                          </div>
                                        </li>
                                        <li className="d-flex justify-content-between my-3">
                                          <span className="gray-text">
                                            View room types table data
                                          </span>
                                          <div className="ms-3 switch-container d-flex align-items-center">
                                            <label className="switch">
                                              <input
                                                type="checkbox"
                                                id="toggle-switch"
                                              />
                                              <span className="slider" />
                                            </label>
                                          </div>
                                        </li>
                                      </ul>
                                    </div>
                                  </div>
                                </div>
                              </div>
                              {/*---------- end room type ---------*/}
                              {/*--------- start room view --------*/}
                              <div className="room-view mt-4">
                                <div className="container-fluid">
                                  <div className="row">
                                    <div className="col-4">room view</div>
                                    <div className="col-4">
                                      <div className="d-flex align-items-center ">
                                        select all
                                        <div className="ms-3 switch-container d-flex align-items-center">
                                          <label className="switch">
                                            <input
                                              type="checkbox"
                                              id="toggle-switch"
                                            />
                                            <span className="slider" />
                                          </label>
                                        </div>
                                      </div>
                                    </div>
                                    <div className="col-4">
                                      <ul>
                                        <li className="d-flex justify-content-between mb-3">
                                          <span className="gray-text">
                                            Create new room view
                                          </span>
                                          <div className="ms-3 switch-container d-flex align-items-center">
                                            <label className="switch">
                                              <input
                                                type="checkbox"
                                                id="toggle-switch"
                                              />
                                              <span className="slider" />
                                            </label>
                                          </div>
                                        </li>
                                        <li className="d-flex justify-content-between my-3">
                                          <span className="gray-text">
                                            Search and filter room views table{" "}
                                          </span>
                                          <div className="ms-3 switch-container d-flex align-items-center">
                                            <label className="switch">
                                              <input
                                                type="checkbox"
                                                id="toggle-switch"
                                              />
                                              <span className="slider" />
                                            </label>
                                          </div>
                                        </li>
                                        <li className="d-flex justify-content-between my-3">
                                          <span className="gray-text">
                                            Manage room views table columns
                                          </span>
                                          <div className="ms-3 switch-container d-flex align-items-center">
                                            <label className="switch">
                                              <input
                                                type="checkbox"
                                                id="toggle-switch"
                                              />
                                              <span className="slider" />
                                            </label>
                                          </div>
                                        </li>
                                        <li className="d-flex justify-content-between my-3">
                                          <span className="gray-text">
                                            Exporting room views table data
                                          </span>
                                          <div className="ms-3 switch-container d-flex align-items-center">
                                            <label className="switch">
                                              <input
                                                type="checkbox"
                                                id="toggle-switch"
                                              />
                                              <span className="slider" />
                                            </label>
                                          </div>
                                        </li>
                                        <li className="d-flex justify-content-between my-3">
                                          <span className="gray-text">
                                            Edit room views table data
                                          </span>
                                          <div className="ms-3 switch-container d-flex align-items-center">
                                            <label className="switch">
                                              <input
                                                type="checkbox"
                                                id="toggle-switch"
                                              />
                                              <span className="slider" />
                                            </label>
                                          </div>
                                        </li>
                                        <li className="d-flex justify-content-between my-3">
                                          <span className="gray-text">
                                            Delete room views table data
                                          </span>
                                          <div className="ms-3 switch-container d-flex align-items-center">
                                            <label className="switch">
                                              <input
                                                type="checkbox"
                                                id="toggle-switch"
                                              />
                                              <span className="slider" />
                                            </label>
                                          </div>
                                        </li>
                                        <li className="d-flex justify-content-between my-3">
                                          <span className="gray-text">
                                            View room views table data
                                          </span>
                                          <div className="ms-3 switch-container d-flex align-items-center">
                                            <label className="switch">
                                              <input
                                                type="checkbox"
                                                id="toggle-switch"
                                              />
                                              <span className="slider" />
                                            </label>
                                          </div>
                                        </li>
                                      </ul>
                                    </div>
                                  </div>
                                </div>
                              </div>
                              {/*---------- end room view ---------*/}
                              {/*--------- start room status --------*/}
                              <div className="room-status mt-4">
                                <div className="container-fluid">
                                  <div className="row">
                                    <div className="col-4">room status</div>
                                    <div className="col-4">
                                      <div className="d-flex align-items-center ">
                                        select all
                                        <div className="ms-3 switch-container d-flex align-items-center">
                                          <label className="switch">
                                            <input
                                              type="checkbox"
                                              id="toggle-switch"
                                            />
                                            <span className="slider" />
                                          </label>
                                        </div>
                                      </div>
                                    </div>
                                    <div className="col-4">
                                      <ul>
                                        <li className="d-flex justify-content-between mb-3">
                                          <span className="gray-text">
                                            Create new room status
                                          </span>
                                          <div className="ms-3 switch-container d-flex align-items-center">
                                            <label className="switch">
                                              <input
                                                type="checkbox"
                                                id="toggle-switch"
                                              />
                                              <span className="slider" />
                                            </label>
                                          </div>
                                        </li>
                                        <li className="d-flex justify-content-between my-3">
                                          <span className="gray-text">
                                            Search and filter room status table{" "}
                                          </span>
                                          <div className="ms-3 switch-container d-flex align-items-center">
                                            <label className="switch">
                                              <input
                                                type="checkbox"
                                                id="toggle-switch"
                                              />
                                              <span className="slider" />
                                            </label>
                                          </div>
                                        </li>
                                        <li className="d-flex justify-content-between my-3">
                                          <span className="gray-text">
                                            Manage room status table columns
                                          </span>
                                          <div className="ms-3 switch-container d-flex align-items-center">
                                            <label className="switch">
                                              <input
                                                type="checkbox"
                                                id="toggle-switch"
                                              />
                                              <span className="slider" />
                                            </label>
                                          </div>
                                        </li>
                                        <li className="d-flex justify-content-between my-3">
                                          <span className="gray-text">
                                            Exporting room status table data
                                          </span>
                                          <div className="ms-3 switch-container d-flex align-items-center">
                                            <label className="switch">
                                              <input
                                                type="checkbox"
                                                id="toggle-switch"
                                              />
                                              <span className="slider" />
                                            </label>
                                          </div>
                                        </li>
                                        <li className="d-flex justify-content-between my-3">
                                          <span className="gray-text">
                                            Edit room status table data
                                          </span>
                                          <div className="ms-3 switch-container d-flex align-items-center">
                                            <label className="switch">
                                              <input
                                                type="checkbox"
                                                id="toggle-switch"
                                              />
                                              <span className="slider" />
                                            </label>
                                          </div>
                                        </li>
                                        <li className="d-flex justify-content-between my-3">
                                          <span className="gray-text">
                                            Delete room status table data
                                          </span>
                                          <div className="ms-3 switch-container d-flex align-items-center">
                                            <label className="switch">
                                              <input
                                                type="checkbox"
                                                id="toggle-switch"
                                              />
                                              <span className="slider" />
                                            </label>
                                          </div>
                                        </li>
                                        <li className="d-flex justify-content-between my-3">
                                          <span className="gray-text">
                                            View room status table data
                                          </span>
                                          <div className="ms-3 switch-container d-flex align-items-center">
                                            <label className="switch">
                                              <input
                                                type="checkbox"
                                                id="toggle-switch"
                                              />
                                              <span className="slider" />
                                            </label>
                                          </div>
                                        </li>
                                      </ul>
                                    </div>
                                  </div>
                                </div>
                              </div>
                              {/*---------- end room view ---------*/}
                            </div>
                          </div>
                        </div>
                        <div className="accordion-item ">
                          <h2 className="accordion-header">
                            <button
                              className="accordion-button collapsed"
                              type="button"
                              data-bs-toggle="collapse"
                              data-bs-target="#Currency-settings-accordion"
                              aria-expanded="true"
                              aria-controls="Currency-settings-accordion"
                            >
                              <input id="room-settings" type="checkbox" />
                              <label
                                className="ms-2 text-capitalize"
                                htmlFor="room-settings"
                              >
                                <h6 className="m-0">Currency Settings</h6>
                              </label>
                            </button>
                          </h2>
                          <div
                            id="Currency-settings-accordion"
                            className="accordion-collapse collapse "
                          >
                            <div className="accordion-body gray-text">
                              {/*--------- start room type --------*/}
                              <div className="room-type ">
                                <div className="container-fluid">
                                  <div className="row">
                                    <div className="col-4">room type</div>
                                    <div className="col-4">
                                      <div className="d-flex align-items-center ">
                                        select all
                                        <div className="ms-3 switch-container d-flex align-items-center">
                                          <label className="switch">
                                            <input
                                              type="checkbox"
                                              id="toggle-switch"
                                            />
                                            <span className="slider" />
                                          </label>
                                        </div>
                                      </div>
                                    </div>
                                    <div className="col-4">
                                      <ul>
                                        <li className="d-flex justify-content-between mb-3">
                                          <span className="gray-text">
                                            Create new room type
                                          </span>
                                          <div className="ms-3 switch-container d-flex align-items-center">
                                            <label className="switch">
                                              <input
                                                type="checkbox"
                                                id="toggle-switch"
                                              />
                                              <span className="slider" />
                                            </label>
                                          </div>
                                        </li>
                                        <li className="d-flex justify-content-between my-3">
                                          <span className="gray-text">
                                            Search and filter room types table{" "}
                                          </span>
                                          <div className="ms-3 switch-container d-flex align-items-center">
                                            <label className="switch">
                                              <input
                                                type="checkbox"
                                                id="toggle-switch"
                                              />
                                              <span className="slider" />
                                            </label>
                                          </div>
                                        </li>
                                        <li className="d-flex justify-content-between my-3">
                                          <span className="gray-text">
                                            Manage room types table columns
                                          </span>
                                          <div className="ms-3 switch-container d-flex align-items-center">
                                            <label className="switch">
                                              <input
                                                type="checkbox"
                                                id="toggle-switch"
                                              />
                                              <span className="slider" />
                                            </label>
                                          </div>
                                        </li>
                                        <li className="d-flex justify-content-between my-3">
                                          <span className="gray-text">
                                            Exporting room types table data
                                          </span>
                                          <div className="ms-3 switch-container d-flex align-items-center">
                                            <label className="switch">
                                              <input
                                                type="checkbox"
                                                id="toggle-switch"
                                              />
                                              <span className="slider" />
                                            </label>
                                          </div>
                                        </li>
                                        <li className="d-flex justify-content-between my-3">
                                          <span className="gray-text">
                                            Edit room types table data
                                          </span>
                                          <div className="ms-3 switch-container d-flex align-items-center">
                                            <label className="switch">
                                              <input
                                                type="checkbox"
                                                id="toggle-switch"
                                              />
                                              <span className="slider" />
                                            </label>
                                          </div>
                                        </li>
                                        <li className="d-flex justify-content-between my-3">
                                          <span className="gray-text">
                                            Delete room types table data
                                          </span>
                                          <div className="ms-3 switch-container d-flex align-items-center">
                                            <label className="switch">
                                              <input
                                                type="checkbox"
                                                id="toggle-switch"
                                              />
                                              <span className="slider" />
                                            </label>
                                          </div>
                                        </li>
                                        <li className="d-flex justify-content-between my-3">
                                          <span className="gray-text">
                                            View room types table data
                                          </span>
                                          <div className="ms-3 switch-container d-flex align-items-center">
                                            <label className="switch">
                                              <input
                                                type="checkbox"
                                                id="toggle-switch"
                                              />
                                              <span className="slider" />
                                            </label>
                                          </div>
                                        </li>
                                      </ul>
                                    </div>
                                  </div>
                                </div>
                              </div>
                              {/*---------- end room type ---------*/}
                              {/*--------- start room view --------*/}
                              <div className="room-view mt-4">
                                <div className="container-fluid">
                                  <div className="row">
                                    <div className="col-4">room view</div>
                                    <div className="col-4">
                                      <div className="d-flex align-items-center ">
                                        select all
                                        <div className="ms-3 switch-container d-flex align-items-center">
                                          <label className="switch">
                                            <input
                                              type="checkbox"
                                              id="toggle-switch"
                                            />
                                            <span className="slider" />
                                          </label>
                                        </div>
                                      </div>
                                    </div>
                                    <div className="col-4">
                                      <ul>
                                        <li className="d-flex justify-content-between mb-3">
                                          <span className="gray-text">
                                            Create new room view
                                          </span>
                                          <div className="ms-3 switch-container d-flex align-items-center">
                                            <label className="switch">
                                              <input
                                                type="checkbox"
                                                id="toggle-switch"
                                              />
                                              <span className="slider" />
                                            </label>
                                          </div>
                                        </li>
                                        <li className="d-flex justify-content-between my-3">
                                          <span className="gray-text">
                                            Search and filter room views table{" "}
                                          </span>
                                          <div className="ms-3 switch-container d-flex align-items-center">
                                            <label className="switch">
                                              <input
                                                type="checkbox"
                                                id="toggle-switch"
                                              />
                                              <span className="slider" />
                                            </label>
                                          </div>
                                        </li>
                                        <li className="d-flex justify-content-between my-3">
                                          <span className="gray-text">
                                            Manage room views table columns
                                          </span>
                                          <div className="ms-3 switch-container d-flex align-items-center">
                                            <label className="switch">
                                              <input
                                                type="checkbox"
                                                id="toggle-switch"
                                              />
                                              <span className="slider" />
                                            </label>
                                          </div>
                                        </li>
                                        <li className="d-flex justify-content-between my-3">
                                          <span className="gray-text">
                                            Exporting room views table data
                                          </span>
                                          <div className="ms-3 switch-container d-flex align-items-center">
                                            <label className="switch">
                                              <input
                                                type="checkbox"
                                                id="toggle-switch"
                                              />
                                              <span className="slider" />
                                            </label>
                                          </div>
                                        </li>
                                        <li className="d-flex justify-content-between my-3">
                                          <span className="gray-text">
                                            Edit room views table data
                                          </span>
                                          <div className="ms-3 switch-container d-flex align-items-center">
                                            <label className="switch">
                                              <input
                                                type="checkbox"
                                                id="toggle-switch"
                                              />
                                              <span className="slider" />
                                            </label>
                                          </div>
                                        </li>
                                        <li className="d-flex justify-content-between my-3">
                                          <span className="gray-text">
                                            Delete room views table data
                                          </span>
                                          <div className="ms-3 switch-container d-flex align-items-center">
                                            <label className="switch">
                                              <input
                                                type="checkbox"
                                                id="toggle-switch"
                                              />
                                              <span className="slider" />
                                            </label>
                                          </div>
                                        </li>
                                        <li className="d-flex justify-content-between my-3">
                                          <span className="gray-text">
                                            View room views table data
                                          </span>
                                          <div className="ms-3 switch-container d-flex align-items-center">
                                            <label className="switch">
                                              <input
                                                type="checkbox"
                                                id="toggle-switch"
                                              />
                                              <span className="slider" />
                                            </label>
                                          </div>
                                        </li>
                                      </ul>
                                    </div>
                                  </div>
                                </div>
                              </div>
                              {/*---------- end room view ---------*/}
                              {/*--------- start room status --------*/}
                              <div className="room-status mt-4">
                                <div className="container-fluid">
                                  <div className="row">
                                    <div className="col-4">room status</div>
                                    <div className="col-4">
                                      <div className="d-flex align-items-center ">
                                        select all
                                        <div className="ms-3 switch-container d-flex align-items-center">
                                          <label className="switch">
                                            <input
                                              type="checkbox"
                                              id="toggle-switch"
                                            />
                                            <span className="slider" />
                                          </label>
                                        </div>
                                      </div>
                                    </div>
                                    <div className="col-4">
                                      <ul>
                                        <li className="d-flex justify-content-between mb-3">
                                          <span className="gray-text">
                                            Create new room status
                                          </span>
                                          <div className="ms-3 switch-container d-flex align-items-center">
                                            <label className="switch">
                                              <input
                                                type="checkbox"
                                                id="toggle-switch"
                                              />
                                              <span className="slider" />
                                            </label>
                                          </div>
                                        </li>
                                        <li className="d-flex justify-content-between my-3">
                                          <span className="gray-text">
                                            Search and filter room status table{" "}
                                          </span>
                                          <div className="ms-3 switch-container d-flex align-items-center">
                                            <label className="switch">
                                              <input
                                                type="checkbox"
                                                id="toggle-switch"
                                              />
                                              <span className="slider" />
                                            </label>
                                          </div>
                                        </li>
                                        <li className="d-flex justify-content-between my-3">
                                          <span className="gray-text">
                                            Manage room status table columns
                                          </span>
                                          <div className="ms-3 switch-container d-flex align-items-center">
                                            <label className="switch">
                                              <input
                                                type="checkbox"
                                                id="toggle-switch"
                                              />
                                              <span className="slider" />
                                            </label>
                                          </div>
                                        </li>
                                        <li className="d-flex justify-content-between my-3">
                                          <span className="gray-text">
                                            Exporting room status table data
                                          </span>
                                          <div className="ms-3 switch-container d-flex align-items-center">
                                            <label className="switch">
                                              <input
                                                type="checkbox"
                                                id="toggle-switch"
                                              />
                                              <span className="slider" />
                                            </label>
                                          </div>
                                        </li>
                                        <li className="d-flex justify-content-between my-3">
                                          <span className="gray-text">
                                            Edit room status table data
                                          </span>
                                          <div className="ms-3 switch-container d-flex align-items-center">
                                            <label className="switch">
                                              <input
                                                type="checkbox"
                                                id="toggle-switch"
                                              />
                                              <span className="slider" />
                                            </label>
                                          </div>
                                        </li>
                                        <li className="d-flex justify-content-between my-3">
                                          <span className="gray-text">
                                            Delete room status table data
                                          </span>
                                          <div className="ms-3 switch-container d-flex align-items-center">
                                            <label className="switch">
                                              <input
                                                type="checkbox"
                                                id="toggle-switch"
                                              />
                                              <span className="slider" />
                                            </label>
                                          </div>
                                        </li>
                                        <li className="d-flex justify-content-between my-3">
                                          <span className="gray-text">
                                            View room status table data
                                          </span>
                                          <div className="ms-3 switch-container d-flex align-items-center">
                                            <label className="switch">
                                              <input
                                                type="checkbox"
                                                id="toggle-switch"
                                              />
                                              <span className="slider" />
                                            </label>
                                          </div>
                                        </li>
                                      </ul>
                                    </div>
                                  </div>
                                </div>
                              </div>
                              {/*---------- end room view ---------*/}
                            </div>
                          </div>
                        </div>
                        <div className="accordion-item ">
                          <h2 className="accordion-header">
                            <button
                              className="accordion-button collapsed"
                              type="button"
                              data-bs-toggle="collapse"
                              data-bs-target="#Geo-location-settings-accordion"
                              aria-expanded="true"
                              aria-controls="Geo-location-settings-accordion"
                            >
                              <input id="Geo-location-settings" type="checkbox" />
                              <label
                                className="ms-2 text-capitalize"
                                htmlFor="Geo-location-settings"
                              >
                                <h6 className="m-0">Geo Location Settings</h6>
                              </label>
                            </button>
                          </h2>
                          <div
                            id="Geo-location-settings-accordion"
                            className="accordion-collapse collapse "
                          >
                            <div className="accordion-body gray-text">
                              {/*--------- start room type --------*/}
                              <div className="room-type ">
                                <div className="container-fluid">
                                  <div className="row">
                                    <div className="col-4">room type</div>
                                    <div className="col-4">
                                      <div className="d-flex align-items-center ">
                                        select all
                                        <div className="ms-3 switch-container d-flex align-items-center">
                                          <label className="switch">
                                            <input
                                              type="checkbox"
                                              id="toggle-switch"
                                            />
                                            <span className="slider" />
                                          </label>
                                        </div>
                                      </div>
                                    </div>
                                    <div className="col-4">
                                      <ul>
                                        <li className="d-flex justify-content-between mb-3">
                                          <span className="gray-text">
                                            Create new room type
                                          </span>
                                          <div className="ms-3 switch-container d-flex align-items-center">
                                            <label className="switch">
                                              <input
                                                type="checkbox"
                                                id="toggle-switch"
                                              />
                                              <span className="slider" />
                                            </label>
                                          </div>
                                        </li>
                                        <li className="d-flex justify-content-between my-3">
                                          <span className="gray-text">
                                            Search and filter room types table{" "}
                                          </span>
                                          <div className="ms-3 switch-container d-flex align-items-center">
                                            <label className="switch">
                                              <input
                                                type="checkbox"
                                                id="toggle-switch"
                                              />
                                              <span className="slider" />
                                            </label>
                                          </div>
                                        </li>
                                        <li className="d-flex justify-content-between my-3">
                                          <span className="gray-text">
                                            Manage room types table columns
                                          </span>
                                          <div className="ms-3 switch-container d-flex align-items-center">
                                            <label className="switch">
                                              <input
                                                type="checkbox"
                                                id="toggle-switch"
                                              />
                                              <span className="slider" />
                                            </label>
                                          </div>
                                        </li>
                                        <li className="d-flex justify-content-between my-3">
                                          <span className="gray-text">
                                            Exporting room types table data
                                          </span>
                                          <div className="ms-3 switch-container d-flex align-items-center">
                                            <label className="switch">
                                              <input
                                                type="checkbox"
                                                id="toggle-switch"
                                              />
                                              <span className="slider" />
                                            </label>
                                          </div>
                                        </li>
                                        <li className="d-flex justify-content-between my-3">
                                          <span className="gray-text">
                                            Edit room types table data
                                          </span>
                                          <div className="ms-3 switch-container d-flex align-items-center">
                                            <label className="switch">
                                              <input
                                                type="checkbox"
                                                id="toggle-switch"
                                              />
                                              <span className="slider" />
                                            </label>
                                          </div>
                                        </li>
                                        <li className="d-flex justify-content-between my-3">
                                          <span className="gray-text">
                                            Delete room types table data
                                          </span>
                                          <div className="ms-3 switch-container d-flex align-items-center">
                                            <label className="switch">
                                              <input
                                                type="checkbox"
                                                id="toggle-switch"
                                              />
                                              <span className="slider" />
                                            </label>
                                          </div>
                                        </li>
                                        <li className="d-flex justify-content-between my-3">
                                          <span className="gray-text">
                                            View room types table data
                                          </span>
                                          <div className="ms-3 switch-container d-flex align-items-center">
                                            <label className="switch">
                                              <input
                                                type="checkbox"
                                                id="toggle-switch"
                                              />
                                              <span className="slider" />
                                            </label>
                                          </div>
                                        </li>
                                      </ul>
                                    </div>
                                  </div>
                                </div>
                              </div>
                              {/*---------- end room type ---------*/}
                              {/*--------- start room view --------*/}
                              <div className="room-view mt-4">
                                <div className="container-fluid">
                                  <div className="row">
                                    <div className="col-4">room view</div>
                                    <div className="col-4">
                                      <div className="d-flex align-items-center ">
                                        select all
                                        <div className="ms-3 switch-container d-flex align-items-center">
                                          <label className="switch">
                                            <input
                                              type="checkbox"
                                              id="toggle-switch"
                                            />
                                            <span className="slider" />
                                          </label>
                                        </div>
                                      </div>
                                    </div>
                                    <div className="col-4">
                                      <ul>
                                        <li className="d-flex justify-content-between mb-3">
                                          <span className="gray-text">
                                            Create new room view
                                          </span>
                                          <div className="ms-3 switch-container d-flex align-items-center">
                                            <label className="switch">
                                              <input
                                                type="checkbox"
                                                id="toggle-switch"
                                              />
                                              <span className="slider" />
                                            </label>
                                          </div>
                                        </li>
                                        <li className="d-flex justify-content-between my-3">
                                          <span className="gray-text">
                                            Search and filter room views table{" "}
                                          </span>
                                          <div className="ms-3 switch-container d-flex align-items-center">
                                            <label className="switch">
                                              <input
                                                type="checkbox"
                                                id="toggle-switch"
                                              />
                                              <span className="slider" />
                                            </label>
                                          </div>
                                        </li>
                                        <li className="d-flex justify-content-between my-3">
                                          <span className="gray-text">
                                            Manage room views table columns
                                          </span>
                                          <div className="ms-3 switch-container d-flex align-items-center">
                                            <label className="switch">
                                              <input
                                                type="checkbox"
                                                id="toggle-switch"
                                              />
                                              <span className="slider" />
                                            </label>
                                          </div>
                                        </li>
                                        <li className="d-flex justify-content-between my-3">
                                          <span className="gray-text">
                                            Exporting room views table data
                                          </span>
                                          <div className="ms-3 switch-container d-flex align-items-center">
                                            <label className="switch">
                                              <input
                                                type="checkbox"
                                                id="toggle-switch"
                                              />
                                              <span className="slider" />
                                            </label>
                                          </div>
                                        </li>
                                        <li className="d-flex justify-content-between my-3">
                                          <span className="gray-text">
                                            Edit room views table data
                                          </span>
                                          <div className="ms-3 switch-container d-flex align-items-center">
                                            <label className="switch">
                                              <input
                                                type="checkbox"
                                                id="toggle-switch"
                                              />
                                              <span className="slider" />
                                            </label>
                                          </div>
                                        </li>
                                        <li className="d-flex justify-content-between my-3">
                                          <span className="gray-text">
                                            Delete room views table data
                                          </span>
                                          <div className="ms-3 switch-container d-flex align-items-center">
                                            <label className="switch">
                                              <input
                                                type="checkbox"
                                                id="toggle-switch"
                                              />
                                              <span className="slider" />
                                            </label>
                                          </div>
                                        </li>
                                        <li className="d-flex justify-content-between my-3">
                                          <span className="gray-text">
                                            View room views table data
                                          </span>
                                          <div className="ms-3 switch-container d-flex align-items-center">
                                            <label className="switch">
                                              <input
                                                type="checkbox"
                                                id="toggle-switch"
                                              />
                                              <span className="slider" />
                                            </label>
                                          </div>
                                        </li>
                                      </ul>
                                    </div>
                                  </div>
                                </div>
                              </div>
                              {/*---------- end room view ---------*/}
                              {/*--------- start room status --------*/}
                              <div className="room-status mt-4">
                                <div className="container-fluid">
                                  <div className="row">
                                    <div className="col-4">room status</div>
                                    <div className="col-4">
                                      <div className="d-flex align-items-center ">
                                        select all
                                        <div className="ms-3 switch-container d-flex align-items-center">
                                          <label className="switch">
                                            <input
                                              type="checkbox"
                                              id="toggle-switch"
                                            />
                                            <span className="slider" />
                                          </label>
                                        </div>
                                      </div>
                                    </div>
                                    <div className="col-4">
                                      <ul>
                                        <li className="d-flex justify-content-between mb-3">
                                          <span className="gray-text">
                                            Create new room status
                                          </span>
                                          <div className="ms-3 switch-container d-flex align-items-center">
                                            <label className="switch">
                                              <input
                                                type="checkbox"
                                                id="toggle-switch"
                                              />
                                              <span className="slider" />
                                            </label>
                                          </div>
                                        </li>
                                        <li className="d-flex justify-content-between my-3">
                                          <span className="gray-text">
                                            Search and filter room status table{" "}
                                          </span>
                                          <div className="ms-3 switch-container d-flex align-items-center">
                                            <label className="switch">
                                              <input
                                                type="checkbox"
                                                id="toggle-switch"
                                              />
                                              <span className="slider" />
                                            </label>
                                          </div>
                                        </li>
                                        <li className="d-flex justify-content-between my-3">
                                          <span className="gray-text">
                                            Manage room status table columns
                                          </span>
                                          <div className="ms-3 switch-container d-flex align-items-center">
                                            <label className="switch">
                                              <input
                                                type="checkbox"
                                                id="toggle-switch"
                                              />
                                              <span className="slider" />
                                            </label>
                                          </div>
                                        </li>
                                        <li className="d-flex justify-content-between my-3">
                                          <span className="gray-text">
                                            Exporting room status table data
                                          </span>
                                          <div className="ms-3 switch-container d-flex align-items-center">
                                            <label className="switch">
                                              <input
                                                type="checkbox"
                                                id="toggle-switch"
                                              />
                                              <span className="slider" />
                                            </label>
                                          </div>
                                        </li>
                                        <li className="d-flex justify-content-between my-3">
                                          <span className="gray-text">
                                            Edit room status table data
                                          </span>
                                          <div className="ms-3 switch-container d-flex align-items-center">
                                            <label className="switch">
                                              <input
                                                type="checkbox"
                                                id="toggle-switch"
                                              />
                                              <span className="slider" />
                                            </label>
                                          </div>
                                        </li>
                                        <li className="d-flex justify-content-between my-3">
                                          <span className="gray-text">
                                            Delete room status table data
                                          </span>
                                          <div className="ms-3 switch-container d-flex align-items-center">
                                            <label className="switch">
                                              <input
                                                type="checkbox"
                                                id="toggle-switch"
                                              />
                                              <span className="slider" />
                                            </label>
                                          </div>
                                        </li>
                                        <li className="d-flex justify-content-between my-3">
                                          <span className="gray-text">
                                            View room status table data
                                          </span>
                                          <div className="ms-3 switch-container d-flex align-items-center">
                                            <label className="switch">
                                              <input
                                                type="checkbox"
                                                id="toggle-switch"
                                              />
                                              <span className="slider" />
                                            </label>
                                          </div>
                                        </li>
                                      </ul>
                                    </div>
                                  </div>
                                </div>
                              </div>
                              {/*---------- end room view ---------*/}
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="d-flex justify-content-end mt-4 w-100">
                        <button
                          type="button"
                          className="px-btn btn px-white-btn me-4"
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
      </div>
    </>
  );
};

export default CreateRole;
