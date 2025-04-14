import axios from "axios";
import FromButton from "../../../../../Shared/FromButton/FromButton";
import { useContext, useEffect, useState } from "react";
import { ModalContext } from "../../../../../Helpers/Context/ModalContext";
import { AuthContext } from "../../../../../Helpers/Context/AuthContext";
import { Controller, useForm } from "react-hook-form";
import Select from 'react-select';
import useCountry from "../../../../../Helpers/Hook/useCountry";
import useGovernoraties from "../../../../../Helpers/Hook/useGovernoraties";
import useCities from "../../../../../Helpers/Hook/useCities";
import { useTranslation } from "react-i18next";
import i18next from "i18next";
import { ToastContext } from "../../../../../Helpers/Context/ToastContext ";

const CreateCity = () => {
  const { t } = useTranslation();
  const { language } = i18next;
  const { showToast } = useContext(ToastContext);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    control
  } = useForm({ mode: "all" });

  const { setModelState, handleClose } =
    useContext(ModalContext);

  const { baseUrlPms, baseUrlMis, Headers, userId, setIsLoading,
    setIsDisabled,
    isDisabled, } = useContext(AuthContext);

  const { countries } = useCountry();
  const { governates, handleCountryChange } = useGovernoraties();
  const { cities, handleGovernateChange } = useCities();

  const createCity = async (data) => {
    console.log(data);
    setIsLoading(true);
    setIsDisabled(true);
    try {
      const cityIds = data.pms_city_id.map((country) => country.value); // Extract all selected country IDs

      // Create an array of promises for each country POST request
      const requests = cityIds.map((cityId) =>
        axios.post(
          `${baseUrlPms}/city_saved/store/`,
          {
            created_by: userId,
            updated_by: userId,
            pms_city_id: cityId, // Send individual city ID in each request
          },
          { headers: Headers }
        )
      );

      // Wait for all requests to complete
      await Promise.all(requests);

      // If all requests succeed, set success state
      showToast('success',  t("msg.cityMsg"));

    } catch (error) {
      // Handle any error from any request
      showToast('error', "msg.errorMessage");

    } finally {
      handleClose();
      reset();
      setIsLoading(false);
      setIsDisabled(false);
    }
  };

  return (
    <>

      <form className={`d-flex flex-wrap justify-content-end ${isDisabled ? "disabled-layer" : ""
        }`} onSubmit={handleSubmit(createCity)}>
        <div className="form-inputs d-flex w-100 px-3">
          <div className="input-package mt-3 pe-2 d-flex flex-column w-100">
            <label className="mb-2" htmlFor="currency_name_en">
              {t("geoLocationTabs.country")}
            </label>
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
                  className={`border-0 test border-05 w-100 ${isDisabled ? "disabled-input" : ""
                    } `}
                  classNamePrefix="select"
                  isDisabled={isDisabled}
                />
              )}
            />
            {errors.currency_name_en?.type === "required" && (
              <p className="text-danger">{t("input.fieldRequired")}</p>
            )}
            {errors.currency_name_en?.type === "pattern" && (
              <p className="text-danger">{t("input.onlyEnglishAllowed")}</p>
            )}
          </div>
        </div>
        <div className="form-inputs d-flex w-100 px-3">
          <div className="input-package mt-3 pe-2 d-flex flex-column w-100">
            <label className="mb-2" htmlFor="currency_name_en">
              {t("geoLocationTabs.governorate")}
            </label>

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
                  className={`border-0 test border-05 w-100 ${isDisabled ? "disabled-input" : ""}`}
                  classNamePrefix="select"
                  isDisabled={isDisabled}
                />
              )}
            />

            {errors.pms_governorate_id?.type === "required" && (
              <p className="text-danger">{t("input.fieldRequired")}</p>
            )}
            {errors.pms_governorate_id?.type === "pattern" && (
              <p className="text-danger">{t("input.onlyEnglishAllowed")}</p>
            )}
          </div>
        </div>

        <div className="form-inputs d-flex w-100 px-3">
          <div className="input-package mt-3 pe-2 d-flex flex-column w-100">
            <label className="mb-2" htmlFor="currency_name_en">
              {t("geoLocationTabs.city")}
            </label>

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
                  className={`border-0 test border-05 w-100 ${isDisabled ? "disabled-input" : ""
                    } `}
                  classNamePrefix="select"
                  isDisabled={isDisabled}
                />
              )}
            />

            {errors.city_name_en?.type === "required" && (
              <p className="text-danger">{t("input.fieldRequired")}</p>
            )}
            {errors.city_name_en?.type === "pattern" && (
              <p className="text-danger">{t("input.onlyEnglishAllowed")}</p>
            )}
          </div>
        </div>

        <FromButton reset={reset} />
      </form>
    </>
  );
}

export default CreateCity
