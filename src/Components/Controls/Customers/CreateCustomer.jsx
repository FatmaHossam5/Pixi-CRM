import FromButton from "../../Shared/FromButton/FromButton";
// import PhoneInput from "react-phone-number-input/input";
import "react-phone-number-input/style.css";
import PhoneInput from "react-phone-number-input";
import { useContext, useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { AuthContext } from "../../Helpers/Context/AuthContext";
import useCountry from "./../../Helpers/Hook/useCountry";
import useGovernoraties from "./../../Helpers/Hook/useGovernoraties";
import useCities from "./../../Helpers/Hook/useCities";
import axios from "axios";
import { ModalContext } from "../../Helpers/Context/ModalContext";
import { useTranslation } from "react-i18next";
import Select from "react-select";
import i18next from "i18next";
import { ToastContext } from "../../Helpers/Context/ToastContext ";

const CreateCustomer = ({ getCustomers }) => {
  const { t } = useTranslation();
  const { language } = i18next;
  const { showToast } = useContext(ToastContext);

  const {
    baseUrlPms,
    Headers,
    userId,
    orgId,
    setIsLoading,
    setIsDisabled,
    isDisabled,
  } = useContext(AuthContext);
  const { modelState, closeModal, setModelState, handleClose } =
    useContext(ModalContext);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    control,
  } = useForm({ mode: "all" });

  const [customerType, setCustomerType] = useState();

  const getCustomerType = () => {
    axios
      .get(`${baseUrlPms}/customer_type/all/`, {
        headers: Headers,
      })
      .then((res) => {
        setCustomerType(res.data);
        console.log(res.data);
      })
      .catch((error) => { });
  };

  const [ageGroup, setAgeGroup] = useState();
  const getAgeGroup = () => {
    axios
      .get(`${baseUrlPms}/age_group/all/`, {
        headers: Headers,
      })
      .then((res) => {
        setAgeGroup(res.data);
        console.log(res.data);
      })
      .catch((error) => { });
  };

  const [file, setFile] = useState("");
  const addCustomer = async (data) => {
    setIsLoading(true);
    setIsDisabled(true);
    console.log(data);
    console.log(file);

    const formData = new FormData();
    formData.append("created_by", userId);
    formData.append("updated_by", userId);
    formData.append("customer_national_id", data["customer_national_id"]);
    formData.append("customer_mobile", data["customer_mobile"]);
    formData.append("customer_other_phone", data["customer_other_phone"]);
    formData.append("customer_email", data["customer_email"]);
    formData.append("city_id", data["city_id"]);
    formData.append(
      "customer_national_id_file",
      file
    );
    formData.append("customer_type_id", data["customer_type_id"]);
    formData.append("age_group_id", data["age_group_id"]);

    try {
      const customerData = await axios.post(
        `${baseUrlPms}/customer/store/`,
        formData,
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

      if (
        (customerData.status &&
          customerDataAr.status &&
          customerDataEn.status == 200) ||
        201
      ) {

        showToast('success', customerData.data.message || t("msg.customerMsg"));

      }
    } catch (error) {
      showToast('error', t("msg.errorMessage"));

    } finally {
      handleClose();
      reset();
      getCustomers();
      setIsLoading(false);
      setIsDisabled(false);
    }
  };

  const { countries } = useCountry();
  const { governates, handleCountryChange } = useGovernoraties();
  const { cities, handleGovernateChange } = useCities();

  useEffect(() => {
    getCustomerType();
    getAgeGroup();
  }, []);


  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);  // Store the file name
    }
  };

  return (
    <>
      <form
        className={`d-flex flex-wrap justify-content-end ${isDisabled ? "disabled-layer" : ""
          }`}
        onSubmit={handleSubmit(addCustomer)}
      >
        <div className="form-inputs d-flex w-100 px-3">
          <div className="input-package mt-3 pe-2 d-flex flex-column w-50">
            <label className="mb-2 modal-label">
              {`${t("CustomerSection.customer")} ${t("input.englishNameLabel")}`}
            </label>
            <input
              type="text"
              placeholder={t("input.englishPlaceholder")}
              className={`px-form-input w-100`}
              {...register("customer_name_en", {
                required: true,
                pattern: /^[A-Za-z\s]+(?:\d+)?$/,
              })}
              disabled={isDisabled}
            />
            {errors?.customer_name_en?.type === "required" && (
              <p className="text-danger m-0">{t("input.fieldRequired")}</p>
            )}
            {errors?.customer_name_en?.type === "pattern" && (
              <p className="text-danger m-0">{t("input.onlyEnglishAllowed")}</p>
            )}
          </div>

          <div className="input-package mt-3 ps-2 d-flex flex-column w-50">
            <label className="mb-2 modal-label" htmlFor>
              {`${t("CustomerSection.customer")} ${t("input.arabicNameLabel")}`}
            </label>
            <input
              type="text"
              placeholder={t("input.arabicPlaceholder")}
              className={`px-form-input w-100`}
              {...register("customer_name_ar", {
                required: true,
                pattern: /^[\u0600-\u06FF\s]+(?:\d+)?$/,
              })}
              disabled={isDisabled}
            />
            {errors?.customer_name_ar?.type === "required" && (
              <p className="text-danger m-0">{t("input.fieldRequired")}</p>
            )}
            {errors?.customer_name_ar?.type === "pattern" && (
              <p className="text-danger m-0">{t("input.onlyArabicAllowed")}</p>
            )}
          </div>
        </div>

        <div className="form-inputs d-flex w-100 px-3">
          <div className="input-package mt-3 pe-2 d-flex flex-column w-50">
            <label className="mb-2 modal-label">{t("input.AddressEn")}</label>
            <input
              type="text"
              placeholder={t("input.AddressEn")}
              className={`px-form-input w-100`}
              {...register("customer_address_en", {
                required: true,
                pattern: /^\d{1,6}\s[\w\s.,#-]+(?:\s*,?\s*[\w\s.,#-]*)?$/,
              })}
              disabled={isDisabled}
            />
            {errors?.customer_address_en?.type === "required" && (
              <p className="text-danger m-0">{t("input.fieldRequired")}</p>
            )}
            {errors?.customer_address_en?.type === "pattern" && (
              <p className="text-danger m-0">{t("CustomerSection.addressErrorMsg")}</p>
            )}
          </div>

          <div className="input-package mt-3 ps-2 d-flex flex-column w-50">
            <label className="mb-2 modal-label" htmlFor>
              {t("input.AddressAr")}
            </label>
            <input
              type="text"
              placeholder={t("input.AddressAr")}
              className={`px-form-input w-100`}
              {...register("customer_address_ar", {
                required: true,
                pattern:
                  /^\d{1,6}\s[\w\u0600-\u06FF\s.,#-]+(?:\s*,?\s*[\w\u0600-\u06FF\s.,#-]*)?$/,
              })}
              disabled={isDisabled}
            />
            {errors?.customer_address_ar?.type === "required" && (
              <p className="text-danger m-0">{t("input.fieldRequired")}</p>
            )}
            {errors?.customer_address_ar?.type === "pattern" && (
              <p className="text-danger m-0">{t("input.onlyArabicAllowed")}</p>
            )}
          </div>
        </div>

        <div className="form-inputs d-flex w-100 px-3">
          <div className="input-package mt-3 d-flex flex-wrap pe-2 w-50">
            <label className="mb-2 w-100">{t("input.phone")}</label>

            <Controller
              name="customer_mobile"
              control={control}
              rules={{ required: true }}
              render={({ field: { onChange, value } }) => (
                <PhoneInput
                  international
                  countryCallingCodeEditable={false}
                  defaultCountry="EG"
                  value={value}
                  onChange={onChange}
                  className={`px-form-input w-100`}
                  //   {...register("customer_mobile", {
                  //     required: true,
                  //   })}
                  isDisabled={isDisabled}
                />
              )}
            />
          </div>
          <div className="input-package mt-3 d-flex flex-wrap ps-2 w-50">
            <label className="mb-2 w-100">{t("input.otherPhone")}</label>

            <Controller
              name="customer_other_phone"
              control={control}
              rules={{ required: true }}
              render={({ field: { onChange, value } }) => (
                <PhoneInput
                  international
                  countryCallingCodeEditable={false}
                  defaultCountry="EG"
                  value={value}
                  onChange={onChange}
                  className={`px-form-input w-100`}
                  //   {...register("customer_mobile", {
                  //     required: true,
                  //   })}
                  isDisabled={isDisabled}
                />
              )}
            />
          </div>
        </div>

        <div className="form-inputs d-flex w-100 px-3">
          <div className="input-package mt-3 d-flex flex-column w-100">
            <label className="mb-2 modal-label">{t("input.email")}</label>
            <input
              type="email"
              className={`px-form-input`}
              placeholder={t("input.emailPlaceholder")}
              {...register("customer_email")}
              disabled={isDisabled}
            />
          </div>
        </div>
        <div className="form-inputs d-flex w-100 px-3">
          <div className="input-package mt-3 w-100">
            <label className htmlFor>
              {t("input.nationalID")}
            </label>
            <div className="id">
              <input
                type="text"
                className="px-form-input id-input-number w-100"
                placeholder={t("input.nationalIDPlaceholder")}
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
                accept="image/*, application/pdf"
                onChange={handleFileChange}
              />

              {/* Display the file name if available */}
              {file && (
                <div className="file-name m-0">
                  <p className="m-0">Selected File: {file.name}</p>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="form-inputs d-flex w-100 px-3">
          <div className="input-package mt-3  d-flex flex-wrap justify-content-between w-100">
            <label className="w-100">{t("input.address")}</label>
            <Controller
              control={control}
              name="pms_country_id"
              render={({ field }) => (
                <Select
                  {...field}
                  isMulti
                  placeholder={`${t("selectInput.select")} ${t("geoLocationTabs.countries")}`}

                  options={countries?.map((country) => ({
                    value: country.id,
                    label: country?.mis_country_en?.country_name_en,
                  }))}
                  isClearable
                  // value={ho ? { value: selectedHotel, label: hotels.find(hotel => hotel.id === selectedHotel)?.hotel_info?.pms_hotel_en?.hotel_name_en } : null}
                  onChange={(selectedOptions) => {
                    field.onChange(selectedOptions);  // Pass selected options to React Hook Form
                    handleCountryChange(selectedOptions);  // Call handleCountryChange with selected options
                  }}
                  className={`px-login-input w-30 ${isDisabled ? "disabled-input" : ""
                    } `}
                  classNamePrefix="select"
                  isDisabled={isDisabled}
                />
              )}
            />
            <Controller
              control={control}
              name="pms_governorate_id"
              render={({ field }) => (
                <Select
                  {...field}
                  isMulti
                  placeholder={`${t("selectInput.select")} ${t("geoLocationTabs.governorates")}`}
                  options={governates?.map((gov) => ({
                    value: gov.id,
                    label: gov?.mis_governorate_en?.governorate_name_en,
                  }))}
                  isClearable
                  onChange={(selectedOptions) => {
                    field.onChange(selectedOptions);  // Pass selected options to React Hook Form
                    handleGovernateChange(selectedOptions);  // Call handleCountryChange with selected options
                  }}
                  className={`px-login-input w-30 ${isDisabled ? "disabled-input" : ""}`}
                  classNamePrefix="select"
                  isDisabled={isDisabled}
                />
              )}
            />

            <Controller
              name="pms_city_id"
              control={control}
              render={({ field }) => (
                <Select
                  {...field}
                  isMulti
                  placeholder={`${t("selectInput.select")} ${t("geoLocationTabs.cities")}`}

                  options={cities && cities?.map((city) => ({
                    value: city.id,
                    label: city?.mis_city_en?.city_name_en,
                  }))}
                  isClearable
                  // value={ho ? { value: selectedHotel, label: hotels.find(hotel => hotel.id === selectedHotel)?.hotel_info?.pms_hotel_en?.hotel_name_en } : null}
                  // onChange={(selectedOption) => {
                  //   setSelectedHotel(selectedOption ? selectedOption.value : null);
                  //   field.onChange(selectedOption);
                  // }}
                  className={`px-login-input w-30 bg-none ${isDisabled ? "disabled-input" : ""
                    } `}
                  classNamePrefix="select"
                  isDisabled={isDisabled}
                />
              )}
            />
          </div>
        </div>

        <div className="form-inputs d-flex w-100 px-3">
          <div className="input-package mt-3 pe-2 d-flex flex-wrap flex-column w-50">
            <label className="mb-2 modal-label">{t("customer-type")}</label>
            <select
              type="text"
              className="px-login-input "
              {...register("customer_type_id")}
            // onChange={(e) =>
            // changeStatus(room.id, e.target.value)
            // }
            >
              <option value=""> {`${t("selectInput.choose")} ${t("customer-type")}`}</option>
              {customerType &&
                customerType.map((type) => {
                  return (
                    <option key={type.id} value={type.id}>
                      {language === "ar" ?
                        type?.pms_customer_type_ar?.customer_type_name_ar
                        :
                        type?.pms_customer_type_en?.customer_type_name_en}
                    </option>
                  );
                })}
            </select>
          </div>

          <div className="input-package mt-3 ps-2 d-flex flex-wrap flex-column w-50">
            <label className="mb-2 modal-label">{t("dependentsSection.ageGroup")}</label>
            <select
              type="text"
              className="px-login-input "
              {...register("age_group_id", { required: true })}
            // onChange={(e) =>
            // changeStatus(room.id, e.target.value)
            // }
            >
              <option value="">{`${t("selectInput.choose")} ${t("dependentsSection.ageGroup")}`}</option>
              {ageGroup &&
                ageGroup.map((group) => {
                  return (
                    <option key={group.id} value={group.id}>
                      {language === "ar" ?
                        group?.pms_age_group_ar?.age_group_name_ar
                        : group?.pms_age_group_en?.age_group_name_en}
                    </option>
                  );
                })}
              {errors?.age_group_id?.type == "required" ? <p className="text-danger m-0"></p> : ""}
            </select>
          </div>
        </div>
        <FromButton reset={reset} />
      </form>
    </>
  );
};

export default CreateCustomer;
