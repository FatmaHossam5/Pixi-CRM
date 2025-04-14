import React from "react";
import Flatpickr from "react-flatpickr";

const AddonInformation = () => {
  return (
    <>
      <div className="reservation-section p-4">
        <div className="section-head d-flex justify-content-between ">
          <h5 className="section-title ">add on Information</h5>
          <button className="px-btn px-blue-btn px-add-btn">
            <i className="fa-kit fa-add" />
          </button>
        </div>
        <div className="form-inputs d-flex w-100">
          <div className="input-package mt-4 pe-2 d-flex flex-column w-50 ">
            <label className htmlFor>
              from
            </label>
            <div className="px-calendar w-100">
            <Flatpickr
                        id="datePicker"
                        className="px-form-input w-100"
                        placeholder="YY/MM/DD"
                        // options={{
                        //   mode: "multiple",
                        //   dateFormat: "YY/MM/DD",
                        //   defaultDate: "",
                        // }}
                        // onChange={handleDateChange}
                      />
              <i className="fa-regular fa-calendar-days fa-xl px-calendar-icon" />
            </div>
          </div>
          <div className="input-package mt-4 ps-2 d-flex flex-column w-50 ">
            <label className htmlFor>
              to
            </label>
            <div className="px-calendar w-100">
            <Flatpickr
                        id="datePicker"
                        className="px-form-input w-100"
                        placeholder="YY/MM/DD"
                        // options={{
                        //   mode: "multiple",
                        //   dateFormat: "YY/MM/DD",
                        //   defaultDate: "",
                        // }}
                        // onChange={handleDateChange}
                      />
              <i className="fa-regular fa-calendar-days fa-xl px-calendar-icon" />
            </div>
          </div>
        </div>
        <div className="form-inputs mt-3  d-flex flex-wrap justify-content-between w-100">
          <div className="input-package w-50 pe-2 ">
            <label className="w-100" htmlFor>
              service name
            </label>
            <select type="text" className="px-login-input w-100 ">
              <option value>select service</option>
              <option value="egypt">egypt</option>
              <option value="sudia arabia">sudia arabia</option>
            </select>
          </div>
          <div className="input-package w-50 ps-2 ">
            <label className="w-100" htmlFor>
              service number
            </label>
            <input type="text" className="px-form-input w-100" />
          </div>
        </div>
        <div className="separetor mt-3" />
      </div>
    </>
  );
};

export default AddonInformation;
