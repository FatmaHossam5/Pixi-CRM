import axios from "axios";
import { AuthContext } from "../../../../Helpers/Context/AuthContext";
import { useContext, useState, useEffect } from "react";
import Flatpickr from "react-flatpickr";
import "flatpickr/dist/themes/material_blue.css";
// import {Controller} from "react-hook-form";

const AddonsRequest = ({ control, register, Controller }) => {
  const { baseUrlPms, Headers } = useContext(AuthContext);

  const [allOns, setAllOns] = useState([]);

  const getAllAddOns = () => {
    axios
      .get(`${baseUrlPms}/addons/all/`, {
        headers: Headers,
      })
      .then((res) => {
        setAllOns(res.data);
      })
      .catch((error) => {});
  };
  useEffect(() => {
      getAllAddOns();
    
  }, []);

  return (
    <>
      <div className="reservation-section">
        <div className="section-head d-flex justify-content-between ">
          <h5 className="section-title ">add on Information</h5>
        </div>

        <div className="form-inputs d-flex flex-wrap w-100">
          <div className="input-package  pe-2 d-flex flex-column w-25 ">
            <label>from</label>
            <div className="px-calendar w-100">
              <Controller
                name="addons_start_date"
                control={control}
                render={({ field }) => (
                  <Flatpickr
                    {...field}
                    className="px-form-input w-100"
                    placeholder="YY/MM/DD"
                    options={{ dateFormat: "Y-m-d" }}
                  />
                )}
              />
              <i className="fa-regular fa-calendar-days fa-xl px-calendar-icon" />
            </div>
          </div>
          <div className="input-package  px-2 d-flex flex-column w-25 ">
            <label>to</label>
            <div className="px-calendar w-100">
              <Controller
                name="addons_end_date"
                control={control}
                render={({ field }) => (
                  <Flatpickr
                    {...field}
                    className="px-form-input w-100"
                    placeholder="YY/MM/DD"
                    options={{ dateFormat: "Y-m-d" }}
                  />
                )}
              />
              <i className="fa-regular fa-calendar-days fa-xl px-calendar-icon" />
            </div>
          </div>
          <div className="input-package w-25 px-2 ">
            <label className="w-100">service name</label>
            <select
              type="text"
              className="px-login-input w-100 "
              {...register("addons_id")}
            >
              <option value="">select service name</option>
              {allOns &&
                allOns.map((on) => {
                  return (
                    <option key={on.id} value={on.id}>
                      {on?.pms_addons_en?.addons_name_en}
                    </option>
                  );
                })}
            </select>
          </div>
          <div className="input-package w-25 ps-2 ">
            <label className="w-100">dependant number</label>
            <input
              type="text"
              className="px-form-input w-100"
              {...register("number_of_dependants")}
            />
          </div>
          <div className="sercive-price blue-text w-100 mt-3 d-flex">
            <div className="label">service price:</div>
            <div className="number ms-2"> 1200$</div>
          </div>
        </div>
        <div className="actions  d-flex w-100">
          <button className="px-btn px-blue-btn ms-auto">add addon</button>
        </div>
      </div>
    </>
  );
};

export default AddonsRequest;
