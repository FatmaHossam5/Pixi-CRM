import axios from "axios";
import FromButton from "../../../../../Shared/FromButton/FromButton";
import { useContext, useEffect, useState } from "react";
import { ModalContext } from "../../../../../Helpers/Context/ModalContext";
import { AuthContext } from "../../../../../Helpers/Context/AuthContext";
import { Controller, useForm } from "react-hook-form";
import Select from 'react-select';
import useGovernoraties from "../../../../../Helpers/Hook/useGovernoraties";
import useCountry from "../../../../../Helpers/Hook/useCountry";
import { useTranslation } from "react-i18next";
import i18next from "i18next";
import { ToastContext } from "../../../../../Helpers/Context/ToastContext ";

const CreateGovernorate = () => {
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
  const { governates, handleCountryChange } = useGovernoraties();
  const { countries } = useCountry();

  const createGovernorate = async (data) => {


    setIsLoading(true);
    setIsDisabled(true);

    try {
      const governorateIds = data.pms_governorate_id.map((governorate) => governorate.value); // Extract all selected country IDs

      // Create an array of promises for each country POST request
      const requests = governorateIds.map((governorateId) =>
        axios.post(
          `${baseUrlPms}/governorate_saved/store/`,
          {
            created_by: userId,
            updated_by: userId,
            pms_governorate_id: governorateId, // Send individual country ID in each request
          },
          { headers: Headers }
        )
      );

      // Wait for all requests to complete
      await Promise.all(requests);

      // If all requests succeed, set success state
      showToast('success',  t("msg.governorateMsg"));

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

  // const [governorates, setGovernorates] = useState();
  // const getGovernorate = () => {
  //   axios
  //     .get(`${baseUrlMis}/governorate/all/`, {
  //       headers: Headers,
  //     })
  //     .then((res) => {
  //       setGovernorates(res.data);
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //     });
  // };

  // useEffect(() => {
  //   getGovernorate()
  // }, [])


  return (
    <>

      <form className={`d-flex flex-wrap justify-content-end ${isDisabled ? "disabled-layer" : ""
        }`} onSubmit={handleSubmit(createGovernorate)}>

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
                  placeholder={`${t("selectInput.select")} ${t("geoLocationTabs.governorates")}
           `}

                  options={governates?.map((gov) => ({
                    value: gov.id,
                    label: gov?.mis_governorate_en?.governorate_name_en,
                  }))}
                  isClearable
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

        <FromButton reset={reset} />
      </form>
    </>
  );
}

export default CreateGovernorate
