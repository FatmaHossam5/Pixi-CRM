import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { AuthContext } from "../../../../Helpers/Context/AuthContext";
import Select from "react-select";
import useCountry from "../../../../Helpers/Hook/useCountry";
import useGovernoraties from "../../../../Helpers/Hook/useGovernoraties";
import useCities from "../../../../Helpers/Hook/useCities";

const CustomerDetails = ({ register, errors, setValue }) => {
  // const {
  //   register,
  //   handleSubmit,
  //   formState: { errors },
  //   setValue,
  // } = useForm({ mode: "all" });

  const { baseUrlPms, Headers, userId } = useContext(AuthContext);
  const { countries } = useCountry();
  const { governates, handleCountryChange } = useGovernoraties();
  const { cities, handleGovernateChange } = useCities();
  const [customers, setCustomers] = useState([]);
  // const [customerMobile, setCustomerMobile] = useState([]);

  const getCustomers = () => {
    axios
      .get(`${baseUrlPms}/customer/all/`, {
        headers: Headers,
      })
      .then((res) => {
        setCustomers(res.data);
      })
      .catch((error) => {
        console.log(error);

      });
  };
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const getCustomer = (mobile) => {
    axios
      .get(`${baseUrlPms}/customer/all/?customer_mobile=${mobile}`, {
        headers: Headers,
      })
      .then((res) => {
        setValue("customer_email", res.data[0].customer_email);
        setValue("customer_mobile", res.data[0].customer_mobile);
        setValue(
          "customer_whatsapp_phone",
          res.data[0].customer_whatsapp_phone
        );
        setValue(
          "customer_name_ar",
          res.data[0].pms_customer_ar.customer_name_ar
        );
        setValue(
          "customer_name_en",
          res.data[0].pms_customer_en.customer_name_en
        );
        setValue(
          "customer_address_en",
          res.data[0].pms_customer_en.customer_address_en
        );
        setValue(
          "customer_address_ar",
          res.data[0].pms_customer_ar.customer_address_ar
        );
        setValue("city_id", res.data[0].city_id);
        setValue("national_id", res.data[0].national_id);

      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleCustomerChange = (selectedOption) => {
    setSelectedCustomer(selectedOption);
    if (selectedOption) {
      getCustomer(selectedOption.value);
    }
  };

  // const customerOptions = customers
  //   ? customers.map((customer) => ({
  //       value: customer.customer_mobile,
  //       label: customer.customer_mobile,
  //     }))
  //   : [];
  
  useEffect(() => {
    getCustomers();
  }, []);

  return (
    <>
      <div className="reservation-section">
        <h5 className="section-title ">customer's information</h5>
        <div className="header-search d-none d-lg-flex w-100 react-select-test">
          <i className="fa-kit fa-search z-3 position-absolute " />
          <Select
            className=" w-100 border-0 test  "
            classNamePrefix="react-select"
            placeholder="Search by customer phone"
            value={selectedCustomer}
            onChange={handleCustomerChange}
            // options={customerOptions}
            aria-label="Mobile Number Options"
            isClearable
          />
        </div>
        {/* <ComboBox className="px-login-input w-100">
                    <div>
                      <Input
                        className="border-0 test ps-4"
                        aria-label="Mobile Number"
                        placeholder="Search by customer phone"
                      />
                      <i className="fa-kit fa-search" />
                    </div>
                    <Popover aria-label="Mobile Number Options">
                      <ListBox
                        className="test select m-0"
                        aria-label="Options List"
                      >
                        {customers &&
                          customers.map((customer, index) => {
                            return (
                              <ListBoxItem onClick={()=>getCustomer(customer.customer_mobile)} value={customer.customer_mobile} key={index}>
                                {customer?.customer_mobile}
                              </ListBoxItem>
                            );
                          })}
                      </ListBox>
                    </Popover>
                  </ComboBox> */}

        <div className="form-inputs d-flex w-100">
          <div className="input-package mt-3 pe-2 d-flex flex-column w-50">
            <label className="mb-2">customer arabic name</label>
            <input
              type="text"
              placeholder={t("input.arabicPlaceholder")}
              className="px-form-input w-100 "
              {...register("customer_name_ar", {
                required: true,
                pattern: /^[\u0600-\u06FF\s]+(?:\d+)?$/,
              })}
            />
            {errors?.customer_name_ar?.type === "required" && (
              <p className="text-danger ">{t("input.fieldRequired")}</p>
            )}
            {errors?.customer_name_ar?.type === "pattern" && (
              <p className="text-danger ">{t("input.onlyArabicAllowed")}</p>
            )}
          </div>
          <div className="input-package mt-3 ps-2 d-flex flex-column w-50">
            <label className="mb-2" htmlFor>
              customer english name
            </label>
            <input
              type="text"
              placeholder={t("input.englishPlaceholder")}
              className="px-form-input w-100 "
              {...register("customer_name_en", {
                required: true,
                pattern: /^[A-Za-z\s]+(?:\d+)?$/,
              })}
            />
            {errors?.customer_name_en?.type === "required" && (
              <p className="text-danger ">{t("input.fieldRequired")}</p>
            )}
            {errors?.customer_name_en?.type === "pattern" && (
              <p className="text-danger ">{t("input.onlyEnglishAllowed")}</p>
            )}
          </div>
        </div>
        <div className="input-package mt-3  d-flex flex-column w-100">
          <label className htmlFor>
            phone number
          </label>
          <input
            type="text"
            placeholder="enter phone number"
            className="px-form-input w-100 m-auto"
            {...register("customer_mobile", {
              required: true,
            })}
          />
          {errors?.customer_mobile?.type === "required" && (
            <p className="text-danger">This feild is required</p>
          )}
        </div>
        <div className="input-package mt-3  d-flex flex-column w-100">
          <label className htmlFor>
            what's app number
          </label>
          <input
            type="text"
            placeholder="enter what's app number"
            className="px-form-input w-100 m-auto"
            {...register("customer_whatsapp_phone")}
          />
        </div>
        <div className="input-package mt-3  d-flex flex-column w-100">
          <label className htmlFor>
            email
          </label>
          <input
            type="text"
            placeholder="enter email"
            className="px-form-input w-100 m-auto"
            {...register("customer_email")}
          />
        </div>
        <div className="input-package mt-3  d-flex flex-wrap justify-content-between w-100">
          <label className="w-100" htmlFor>
            address
          </label>
          <select
            type="text"
            className="px-login-input w-30 "
            onChange={handleCountryChange}
          >
            <option value="" disabled selected>
              Select country
            </option>
            {countries &&
              countries.map((country) => (
                <option key={country.id} value={country.id}>
                  {/* {country.country_iso} */}
                  {country?.results?.mis_country_en?.country_name_en}
                </option>
              ))}
          </select>

          <select
            type="text"
            className="px-login-input w-30 "
            onChange={handleGovernateChange}
          >
            <option value="" disabled selected>
              Select governorate
            </option>
            {governates &&
              governates.map((governate) => (
                <option key={governate.id} value={governate.id}>
                  {governate?.mis_governorate_en?.governorate_name_en}
                </option>
              ))}
          </select>

          <select
            type="text"
            className="px-login-input w-30 "
            {...register("city_id")}
          >
            <option value="">select city</option>
            {cities &&
              cities.map((city) => (
                <option key={city.id} value={city.id}>
                  {city.mis_city_en.city_name_en}
                </option>
              ))}
          </select>
        </div>
        <div className="form-inputs d-flex w-100">
          <div className="input-package mt-3 pe-2 d-flex flex-column w-50">
            <label className="mb-2" htmlFor>
              address details in arabic
            </label>
            <input
              type="text"
              placeholder=" arabic address details"
              className="px-form-input w-100"
              {...register("customer_address_ar", {
                required: true,
                pattern: /^[\u0600-\u06FF\s]+(?:\d+)?$/,
              })}
            />
            {errors?.customer_address_ar?.type === "required" && (
              <p className="text-danger ">{t("input.fieldRequired")}</p>
            )}
          </div>
          <div className="input-package mt-3 ps-2 d-flex flex-column w-50">
            <label className="mb-2" htmlFor>
              address details in english
            </label>
            <input
              type="text"
              placeholder=" english address details"
              className="px-form-input w-100 "
              {...register("customer_address_en", {
                required: true,
                pattern: /^[A-Za-z\s]+(?:\d+)?$/,
              })}
            />
            {errors?.customer_address_en?.type === "required" && (
              <p className="text-danger ">{t("input.fieldRequired")}</p>
            )}
          </div>
        </div>
        <div className="input-package mt-3  d-flex flex-column w-100">
          <label className htmlFor>
            national id
          </label>
          <input
            type="text"
            placeholder="NAtional id"
            className="px-form-input w-100 m-auto"
            {...register("national_id", {
              required: true,
            })}
          />
          {errors?.national_id?.type === "required" && (
            <p className="text-danger">This feild is required</p>
          )}
        </div>
        <div className="form-inputs d-flex w-100">
          <div className="input-package mt-3 pe-2 d-flex flex-column w-50">
            <label className="mb-2" htmlFor>
              adults number
            </label>
            <input
              type="text"
              placeholder=" Enter adults number"
              className="px-form-input w-100 "
              {...register("adult_number", {
                required: true,
              })}
            />
            {errors?.adult_number?.type === "required" && (
              <p className="text-danger">This feild is required</p>
            )}
          </div>
          <div className="input-package mt-3 ps-2 d-flex flex-column w-50">
            <label className="mb-2" htmlFor>
              children number
            </label>
            <input
              type="text"
              placeholder=" Enter children number"
              className="px-form-input w-100 "
              {...register("child_number", {
                required: true,
              })}
            />
            {errors?.child_number?.type === "required" && (
              <p className="text-danger">This feild is required</p>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default CustomerDetails;
