import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../Helpers/Context/AuthContext";
import axios from "axios";
import useCities from "../../../Helpers/Hook/useCities";
import useGovernoraties from "../../../Helpers/Hook/useGovernoraties";
import useCountry from "../../../Helpers/Hook/useCountry";
import { useNavigate } from "react-router-dom";
import { FormProvider, useForm } from "react-hook-form";
import Select from "react-select";
import Flatpickr from "react-flatpickr";
import "flatpickr/dist/themes/material_blue.css";
import CustomerDetails from "./RequestForms/CustomerDetails";
import ErrorModal from "../../../Shared/ErrorModal/ErrorModal";
import SuccessModal from "../../../Shared/SuccessModal/SuccessModal";
import DependentsInformation from "./RequestForms/DependentsInformation";
import ReservationInformationOld from "./RequestForms/ReservationInformationOld";
import AddonInformation from "./RequestForms/AddonInformation";

const SingleRequestSectionOld = () => {
  const [dependentsTypes, setDependentsTypes] = useState([]);
  const { baseUrlPms, Headers, userId } = useContext(AuthContext);
  // const { countries } = useCountry();
  // const { governates, handleCountryChange } = useGovernoraties();
  // const { cities, handleGovernateChange } = useCities();
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    control,
  } = useForm({ mode: "all" });
  const navigate = useNavigate();
  // Dependent Information
  /* dependent type select menu */
  const getDependentType = () => {
    axios
      .get(`${baseUrlPms}/dependant_type/all/`, {
        headers: Headers,
      })
      .then((res) => {
        setDependentsTypes(res.data);
      })
      .catch((error) => {});
  };

  const [dependentsRelationships, setDependentsRelationships] = useState([]);
  const getDependentRelationship = () => {
    axios
      .get(`${baseUrlPms}/dependant_relationship/all/`, {
        headers: Headers,
      })
      .then((res) => {
        setDependentsRelationships(res.data);
      })
      .catch((error) => {});
  };

  const createDependent = async (data, reset) => {
    try {
      const depensent = await axios.post(
        `${baseUrlPms}/dependant/store/`,
        {
          created_by: userId,
          updated_by: userId,
          pms_customer_id: data.pms_customer_id,
          dependant_type_id: data.dependant_type_id,
          dependant_relationship_id: data.dependant_relationship_id,
        },
        {
          headers: Headers,
        }
      );

      const depensentId = depensent.data.id;

      await axios.post(
        `${baseUrlPms}/dependant_ar/store/`,
        {
          pms_dependant_id: depensentId,
          dependant_name_ar: data.dependant_name_ar,
        },
        {
          headers: Headers,
        }
      );

      await axios.post(
        `${baseUrlPms}/dependant_en/store/`,
        {
          pms_dependant_id: depensentId,
          dependant_name_en: data.dependant_name_en,
        },
        {
          headers: Headers,
        }
      );

      // Swal.fire({
      //   title: "Dependant added successfully",
      //   icon: "success",
      // });
      // navigate(-1)
      // reset();
    } catch (error) {
      // Swal.fire({
      //   title: error.message,
      //   icon: "error",
      // });
    }
  };

  //Add Customer

  const addCustomer = async (data) => {
    try {
      const customerData = await axios.post(
        `${baseUrlPms}/customer/store/`,
        {
          created_by: userId,
          updated_by: userId,
          national_id: data.national_id,
          customer_mobile: data.customer_mobile,
          customer_whatsapp_phone: data.customer_whatsapp_phone,
          customer_email: data.customer_email,
          city_id: data.city_id,
        },
        {
          headers: Headers,
        }
      );

      const customerId = customerData.data.data.id;

      const customerDataAr = await axios.post(
        `${baseUrlPms}/customer_ar/store/`,
        {
          pms_customer_id: customerId,
          customer_name_ar: data.customer_name_ar,
          customer_address_ar: data.customer_address_ar,
        },
        {
          headers: Headers,
        }
      );

      const customerDataEn = await axios.post(
        `${baseUrlPms}/customer_en/store/`,
        {
          pms_customer_id: customerId,
          customer_name_en: data.customer_name_en,
          customer_address_en: data.customer_address_en,
        },
        {
          headers: Headers,
        }
      );

      const RequestData = await axios.post(
        `${baseUrlPms}/request/store/`,
        {
          customer_id: customerId,
          group_request_id: data.group_request_id,
          created_by: userId,
          updated_by: userId,
          adult_number: data.adult_number,
          child_number: data.child_number,
        },
        {
          headers: Headers,
        }
      );

      if (
        // eslint-disable-next-line no-constant-condition
        (customerData.status &&
          customerDataAr.status &&
          customerDataEn.status &&
          RequestData == 200) ||
        201
      ) {
        setModelState({
          status: "success",
          message: customerData.data.message || "Customer Added Successful",
        });
        // navigate("/AllCustomers");
      } else {
        setModelState({
          status: "error",
          message:
            customerData.response?.data?.message || "Failed to Add Customer",
        });
      }
    } catch (error) {
      setModelState({
        status: "error",
        message: error.response?.data?.message || "Failed to Add Customer",
      });
    }
  };

  useEffect(() => {
    getDependentType();
    // getCustomers();
    getDependentRelationship();
  }, []);

  const [modelState, setModelState] = useState({
    status: "close",
    message: "",
  });
  const handleClose = () => setModelState({ status: "close", message: "" });
  const [sections, setSections] = useState([]);

  const addSection = () => {
    setSections([...sections, { id: sections.length + 1 }]);
  };

  const [rSections, setRSections] = useState([]);

  const addRSection = () => {
    setRSections([...rSections, { id: rSections.length + 1 }]);
  };

  return (
    <>
      {/* start content */}
      <div className="px-content mb-auto mt-3">
        <div className="px-card p-4 text-capitalize ">
          <h3 className="w-100 blue-text ps-4 mb-2">single request </h3>
        
          <form
            onSubmit={handleSubmit(addCustomer)}
            className="d-flex flex-wrap mt-2 "
          >
            <div className="reservation-side w-50 p-4 vertical-separetor">
              <CustomerDetails
                register={register}
                errors={errors}
                // control={control}
                setValue={setValue}
              />
              {sections.map((section) => (
                <DependentsInformation
                  key={section.id}
                  id={section.id}
                  sections={sections}
                  setSections={setSections}
                />
              ))}
              <div className="text-end mt-3">
                <button
                  className="px-btn px-blue-btn px-add-btn"
                  type="button"
                  onClick={addSection}
                >
                  Add dependent
                </button>
              </div>
              {/* <button
                    className="px-btn px-blue-btn px-add-btn"
                    onClick={addSection}
                    type="button"
                  >
                    Add Reservation Section
                  </button> */}
            </div>
            <div className="reservation-side w-50 ">
              <ReservationInformationOld
                register={register}
                errors={errors}
                control={control}
                addRSection={addRSection}
              />

              {rSections.map((section) => (
                <ReservationInformationOld
                  key={section.id}
                  id={section.id}
                  rSections={rSections}
                  setRSections={setRSections}
                />
              ))}

              <AddonInformation
                register={register}
                errors={errors}
                control={control}
              />
              <div className="reservation-section p-4">
                <div className="section-head d-flex justify-content-between ">
                  <h5 className="section-title ">additional Information</h5>
                  <button className="px-btn px-blue-btn px-add-btn">
                    <i className="fa-kit fa-add" />
                  </button>
                </div>
                <div className="form-inputs d-flex w-100">
                  {/* <div className="input-package mt-4 pe-2 d-flex flex-column w-50 ">
                    <label className htmlFor>
                      from
                    </label>
                    <div className="px-calendar w-100">
                      <input
                        className="px-form-input w-100"
                        placeholder="YY/MM/DD"
                        id="datePicker"
                      />
                      <i className="fa-regular fa-calendar-days fa-xl px-calendar-icon" />
                    </div>
                  </div>
                  <div className="input-package mt-4 ps-2 d-flex flex-column w-50 ">
                    <label className htmlFor>
                      to
                    </label>
                    <div className="px-calendar w-100">
                      <input
                        className="px-form-input w-100"
                        placeholder="YY/MM/DD"
                        id="datePicker"
                      />
                      <i className="fa-regular fa-calendar-days fa-xl px-calendar-icon" />
                    </div>
                  </div> */}
                </div>
                <div className="form-inputs mt-3  d-flex flex-wrap justify-content-between w-100">
                  <div className="input-package w-100 ">
                    <label className="w-100" htmlFor>
                      channel booking
                    </label>
                    <input
                      type="text"
                      className="px-form-input w-100"
                      placeholder="enter channel booking"
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="w-100 d-flex justify-content-end mt-3 p-4">
              <button className="px-btn px-white-btn">cancel</button>
              <button className="px-btn px-blue-btn ms-3" type="submit">
                save
              </button>
            </div>
          </form>

         
        </div>
      </div>
      {/* end content */}
      
    </>
  );
};

export default SingleRequestSectionOld;
