import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../../Helpers/Context/AuthContext";
import { useForm } from "react-hook-form";
import Dependents from "./Dependents";
import useCountry from "../../../../Helpers/Hook/useCountry";

const Customer = ({ customerId, register, setValue, setDependentsNumber,location }) => {
  const { baseUrlPms, Headers } = useContext(AuthContext);
  // const { setValue, register } = useForm();
  const [customerInfo, setCustomerInfo] = useState();
  const { countries } = useCountry();

  const customerData = () => {
    axios
      .get(`${baseUrlPms}/customer/${customerId}/show/`, {
        headers: Headers,
      })
      .then((res) => {
        // setCustomerInfo(res.data);
        console.log(res.data);

        setValue("customer_name_ar", res.data.pms_customer_ar.customer_name_ar);
        setValue("customer_name_en", res.data.pms_customer_en.customer_name_en);

        setValue("customer_mobile", res.data.customer_mobile);
        setValue(
          "customer_address_en",
          res.data.pms_customer_en.customer_address_en
        );
        setValue("customer_email", res.data.customer_email);
        setValue(
          "customer_address",
          res.data.city_id_info.governorate_info.country_info.id
        );
        setValue("customer_national_id", res.data.customer_national_id);
      })
      .catch((error) => {});
  };

  useEffect(() => {
    if(location == `/dashboard/customerSingleRqu/${customerId}/createSingleRequest`) {
      customerData();
    }else if (location == `/dashboard/customerSingleRqu/addonsReq/${customerId}/createAddonsRequest`) {
      customerData();
    }
  }, []);

  return (
    <>
      <div className="reservation-section">
        <div className="separetor my-4" />
        <h5 className="section-title ">customer's information</h5>
        <div className="d-flex">
          <div className="form-inputs d-flex w-50">
            <div className="input-package mt-3 pe-2 d-flex flex-column w-50">
              <label className="mb-2" htmlFor>
                customer english name
              </label>
              <input
                type="text"
                placeholder={t("input.englishPlaceholder")}
                className="px-form-input w-100 m-auto"
                {...register("customer_name_en")}
              />
            </div>

            <div className="input-package mt-3 px-2 d-flex flex-column w-50">
              <label className="mb-2" htmlFor>
                customer arabic name
              </label>
              <input
                type="text"
                placeholder={t("input.arabicPlaceholder")}
                className="px-form-input w-100 m-auto"
                {...register("customer_name_ar")}
              />
            </div>
          </div>
          <div className="form-inputs d-flex w-50">
            <div className="input-package mt-3  d-flex flex-column w-50 px-2">
              <label className="mb-2" htmlFor>
                phone number
              </label>
              <input
                type="text"
                placeholder="enter phone number"
                className="px-form-input w-100 m-auto"
                {...register("customer_mobile")}
              />
            </div>
            <div className="input-package mt-3  d-flex flex-column w-50 ps-2">
              <label className="mb-2">
                email
              </label>
              <input
                type="email"
                placeholder="enter email"
                className="px-form-input w-100 m-auto"
                {...register("customer_email")}
              />
            </div>
          </div>
        </div>
        <div className="form-inputs  container-fluid  gx-0">
          <div className="row ">
            <div className="col-12"></div>
            <div className="col-4">
              <div className="input-package mt-3">
                <label>address</label>
                <select
                  className="px-login-input w-100"
                  {...register("customer_address")}
                >
                  <option value="">select country</option>
                  {countries &&
                    countries.map((country) => (
                      <option key={country.id} value={country.id}>
                        {country?.pms_country_en?.country_name_en}
                      </option>
                    ))}
                </select>
              </div>
            </div>
            <div className="col-4">
              <div className="input-package mt-3">
                <label className htmlFor>
                  national ID
                </label>
                {/* <input className="px-form-input id-input-number w-100"
                 {...register("national_id")}
                /> */}
                <div className="id">
                  <input
                    type="text"
                    className="px-form-input id-input-number w-100"
                    placeholder="National Id"
                    {...register("customer_national_id")}
                  />
                  <label className="id-icon" htmlFor="id-file">
                    <svg
                      width={16}
                      height={18}
                      viewBox="0 0 16 18"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <g clipPath="url(#clip0_1950_5778)">
                        <path
                          d="M13.3826 2.36602C12.3595 1.34297 10.7001 1.34297 9.6771 2.36602L2.9271 9.11602C1.28179 10.7613 1.28179 13.4262 2.9271 15.0715C4.57241 16.7168 7.23726 16.7168 8.88257 15.0715L14.2263 9.72773C14.4443 9.50977 14.8029 9.50977 15.0209 9.72773C15.2388 9.9457 15.2388 10.3043 15.0209 10.5223L9.6771 15.866C7.59233 17.9508 4.21382 17.9508 2.13257 15.866C0.0513185 13.7812 0.047803 10.4062 2.13257 8.32148L8.88257 1.57148C10.3451 0.108984 12.7146 0.108984 14.1771 1.57148C15.6396 3.03398 15.6396 5.40352 14.1771 6.86602L7.71538 13.3277C6.72398 14.3191 5.09273 14.2277 4.21382 13.1344C3.46499 12.1992 3.53882 10.8492 4.38608 10.002L9.72632 4.66523C9.94429 4.44727 10.3029 4.44727 10.5209 4.66523C10.7388 4.8832 10.7388 5.2418 10.5209 5.45977L5.18413 10.7965C4.74116 11.2395 4.70249 11.9426 5.09272 12.4313C5.54976 13.0008 6.40054 13.05 6.91734 12.5332L13.3826 6.07148C14.4056 5.04844 14.4056 3.38906 13.3826 2.36602Z"
                          fill="#4B4F56"
                        />
                      </g>
                      <defs>
                        <clipPath id="clip0_1950_5778">
                          <rect width="15.75" height={18} fill="white" />
                        </clipPath>
                      </defs>
                    </svg>
                  </label>
                  <input
                    className="d-none id-input-file"
                    type="file"
                    id="id-file"
                    onChange={(e) => console.log(e.target.files[0])}
                  />
                </div>
              </div>
            </div>
            <div className="col-4">
              <div className="input-package mt-3">
                <label className htmlFor>
                  dependents number
                </label>
                <input
                  type="number"
                  className="px-form-input w-100"
                  placeholder="Enter dependents number"
                  onChange={(e) => setDependentsNumber(e.target.value)}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

    </>
  );
};

export default Customer;
