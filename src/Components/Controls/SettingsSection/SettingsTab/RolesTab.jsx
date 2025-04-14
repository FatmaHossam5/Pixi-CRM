import { Breadcrumb } from 'react-bootstrap'
import { Link, useParams } from 'react-router-dom';

const RolesTab = () => {
  const { roleName } = useParams();

  return (
    <>
      
      <div className="px-card p-4 pb-0">
        <div className="container-fluid">
          <div className="row">
            <div className="col-12 gx-0">
              <div className="card-head d-flex flex-wrap  ">
                <div className="breadcrumbs-list mb-2 w-100">
                  <Breadcrumb>
                    {/* <Breadcrumb.Item href="#">Home</Breadcrumb.Item> */}
                    <Breadcrumb.Item>Settings</Breadcrumb.Item>
                    <Breadcrumb.Item active >
                    <Link to={"/dashboard/rolesAndPermission"}>
                    
                      Roles and Permission
                    </Link>
                    </Breadcrumb.Item>
                    <Breadcrumb.Item active>{roleName}</Breadcrumb.Item>
                  </Breadcrumb>
                </div>
                <div className="page-name pt-2  pb-2 w-100">
                  <h3> {roleName} </h3>
                  {/*----------------- start taps -----------------*/}
                  <div className="px-taps">
                    <ul
                      className="nav nav-pills mt-3"
                      id="pills-tab"
                      role="tablist"
                    >
                      <li className="nav-item" role="presentation">
                        <button
                          className="nav-link active ms-0"
                          id="pills-Users-tab"
                          data-bs-toggle="pill"
                          data-bs-target="#pills-Users"
                          type="button"
                          role="tab"
                          aria-controls="pills-Users"
                          aria-selected="true"
                        >
                          Users
                        </button>
                      </li>
                      <li className="nav-item" role="presentation">
                        <button
                          className="nav-link"
                          id="pills-Permission-tab"
                          data-bs-toggle="pill"
                          data-bs-target="#pills-Permission"
                          type="button"
                          role="tab"
                          aria-controls="pills-Permission"
                          aria-selected="false"
                        >
                          Permission
                        </button>
                      </li>
                    </ul>
                  </div>
                  {/*------------------ end taps ------------------*/}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default RolesTab
