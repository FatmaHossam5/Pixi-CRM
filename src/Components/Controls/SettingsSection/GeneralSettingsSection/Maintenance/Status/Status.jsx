import { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../../../../../Helpers/Context/AuthContext';
import axios from 'axios';
import GeneralTable from '../../../../../Shared/GeneralTable/GeneralTable';
import { useTranslation } from 'react-i18next';

// delete component 

const Status = () => {
  const { t } = useTranslation();
  // context
  const { baseUrlPms, Headers } = useContext(AuthContext);

  // data of table
  const columns = [
    {
      name: t("englishName"),
      visible: true,
      selector: (row) => row.pms_maintenance_status_en.maintenance_status_name_en,
      sortable: true,
      reorder: true,
      cell: (row) => (
        <div className="d-flex justify-content-between align-items-center w-100">
          <div className="w-50">{row.pms_maintenance_status_en.maintenance_status_name_en}</div>
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
                <a className="dropdown-item">
                  <i className="fa-kit fa-edit"></i>{t("edit")}
                </a>
              </li>
              <li>
                <a className="dropdown-item text-danger" >
                  <i className="fa-kit fa-delete"></i>{t("delete")}
                </a>
              </li>
            </ul>
          </div>
        </div>
      ),
    },

    {
      name: t("arabicName"),
      selector: (row) => row.pms_maintenance_status_ar.maintenance_status_name_ar,
      sortable: true, visible: true,
    },
  ];

  // Status API
  // const [filter, setFilter] = useState();
  const [status, setStatus] = useState();
  const getStatus = () => {
    axios
      .get(`${baseUrlPms}/maintenance_status/all/`, {
        headers: Headers,
      })
      .then((res) => {
        setStatus(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // filter data and egnore null values
  const filteredRows = status?.filter(
    (row) =>
      row?.pms_maintenance_status_en?.maintenance_status_name_en &&
      row?.pms_maintenance_status_ar?.maintenance_status_name_ar
  );

  // call functions of Status
  useEffect(() => {
    getStatus();
  }, []);

  return (
    <>
      <GeneralTable filteredRows={filteredRows} columns={columns} />
    </>
  )
}

export default Status
