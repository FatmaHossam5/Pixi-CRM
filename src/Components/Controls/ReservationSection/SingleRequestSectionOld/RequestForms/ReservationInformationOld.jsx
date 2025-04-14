import React from 'react'
import Flatpickr from "react-flatpickr";
import "flatpickr/dist/themes/material_blue.css";

const ReservationInformation = ({ id, rSections, setRSections, addRSection }) => {
  return (
    <>
        <div className="reservation-section p-4">
                <div className="section-head d-flex justify-content-between ">
                  <h5 className="section-title ">Reservation Information</h5>
                  <button className="px-btn px-blue-btn px-add-btn"
                  type='button'
                  onClick={addRSection}>
                    <i className="fa-kit fa-add" />
                  </button>
                </div>
                <div className="form-inputs d-flex w-100">
                  <div className="input-package mt-4 pe-2 d-flex flex-column w-50 ">
                    <label className htmlFor>
                      from
                    </label>
                    <div className="px-calendar w-100">
                      {/* <input
                        className="px-form-input w-100"
                        placeholder="YY/MM/DD"
                        id="datePicker"
                      /> */}
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
                <div className="input-package mt-3  d-flex flex-column w-100">
                  <label className="mb-2" htmlFor>
                    night count
                  </label>
                  <input
                    type="number"
                    className="px-form-input"
                    placeholder="Night count"
                  />
                </div>
                <div className="form-inputs mt-3  d-flex flex-wrap justify-content-between w-100">
                  <div className="input-package w-30 ">
                    <label className="w-100" htmlFor>
                      room type
                    </label>
                    <select type="text" className="px-login-input w-100 ">
                      <option value>select type</option>
                      <option value="egypt">egypt</option>
                      <option value="sudia arabia">sudia arabia</option>
                    </select>
                  </div>
                  <div className="input-package w-30 ">
                    <label className="w-100" htmlFor>
                      room view
                    </label>
                    <select type="text" className="px-login-input w-100 ">
                      <option value>select view</option>
                      <option value="egypt">egypt</option>
                      <option value="sudia arabia">sudia arabia</option>
                    </select>
                  </div>
                  <div className="input-package w-30 ">
                    <label className="w-100" htmlFor>
                      room number
                    </label>
                    <select type="text" className="px-login-input w-100 ">
                      <option value>select room</option>
                      <option value="egypt">egypt</option>
                      <option value="sudia arabia">sudia arabia</option>
                    </select>
                  </div>
                </div>
                <div className="input-package mt-3  d-flex flex-column w-100">
                  <label className="mb-2" htmlFor>
                    Accommodation Type
                  </label>
                  <select type="text" className="px-login-input w-100 ">
                    <option value>select type</option>
                    <option value="egypt">egypt</option>
                    <option value="sudia arabia">sudia arabia</option>
                  </select>
                </div>
                <div className="remember-me w-100 text-primary mt-4 d-flex justify-content-center">
                  <input id="remember-me" className="me-2" type="checkbox" />
                  <label htmlFor="remember-me">check in </label>
                </div>
                <div className="separetor mt-3" />
              </div>
    </>
  )
}

export default ReservationInformation