
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import Select from "react-select";
import { AuthContext } from "../../../../../Helpers/Context/AuthContext";
import { ModalContext } from "../../../../../Helpers/Context/ModalContext";
import { ToastContext } from '../../../../../Helpers/Context/ToastContext ';
import { useData } from "../../../../../Helpers/Context/useData";
import FromButton from "../../../../../Shared/FromButton/FromButton";

const CreateCountry = () => {
  const { t } = useTranslation();
  const { showToast } = useContext(ToastContext);
  const {handleSubmit,formState: { errors },reset,control,} = useForm({ mode: "all" });
  const {handleClose} = useContext(ModalContext);
  const {baseUrlMis,Headers,setIsLoading,isDisabled,baseUrlPms} = useContext(AuthContext);
  const [countries, setCountries] = useState([]);
  const [selectedCountries, setSelectedCountries] = useState([]);

  const { fetchData } = useData();

  // Fetch all countries
  const fetchcountries = async () => {
    try {
      const response = await axios.get(`${baseUrlMis}/country/all/`, {
        headers: Headers,
      });
      setCountries(response.data);
    } catch (error) {
      console.error("Error fetching countries:", error);
    }
  };

  const fetchSelectedCountries = async () => {
    try {
      const response = await axios.get(`${baseUrlMis}/country_saved/all/`, { headers: Headers });
      setSelectedCountries(response.data.map((country) => country.pms_country_id));
    } catch (error) {
      console.error("Error fetching selected countries:", error);
    }
  };
  useEffect(() => {
    fetchcountries();
    fetchSelectedCountries();

  }, []);

  const saveSelectedCountries = async (selectedCountries) => {

    try {
      setIsLoading(true)
      for (const countryId of selectedCountries) {
        await axios.post(
          `${baseUrlPms}/country_saved/store/`,
          {
            created_by: 2, 
            updated_by: 2,
            pms_country_id: countryId, 
            
          },
          {
            headers: Headers,
          }
        );
      }
      showToast("success", t("msg.countryMsg"));
      fetchData()
    } catch (error) {
      showToast("error", t("msg.errorMessage"));
      console.error("Error saving selected countries:", error);
    } finally {
      setIsLoading(false)
    }
  };

  const handleCountrySelection = (data) => {
    if (data.pms_country_id && data.pms_country_id.length > 0) {
      const selectedCountryIds = data.pms_country_id.map((id) => id.value);
      saveSelectedCountries(selectedCountryIds); // Pass array of IDs to be processed individually
      reset();
      handleClose();
    } else {
      showToast("error", t("msg.noCountrySelected"));
    }
  };
  // Filter out already selected countries from the options
  const getFilteredCountries = () => {
    return countries
      .filter((country) => !selectedCountries.includes(country.id))
      .map((country) => ({
        value: country.id,
        label: country.mis_country_en.country_name_en,
      }));
  };
  return (
    <form
      className={`d-flex flex-wrap justify-content-end ${isDisabled ? "disabled-layer" : ""
        }`}
      onSubmit={handleSubmit(handleCountrySelection)}
    >
      <div className="form-inputs d-flex w-100 px-3">
        <div className="input-package mt-3 pe-2 d-flex flex-column w-100">
          <label className="mb-2" htmlFor="currency_name_en">
            {t("Country")}
          </label>
          <Controller
            control={control}
            name="pms_country_id"
            rules={{ required: true }}
            render={({ field }) => (
              <Select
                {...field}
                isMulti
                placeholder={t("input.englishPlaceholder")}
                options={getFilteredCountries()}
                isClearable
                className={`border-0 w-100 ${isDisabled ? "disabled-input" : ""
                  }`}
                classNamePrefix="select"
                isDisabled={isDisabled}
              />
            )}
          />
          {errors.pms_country_id && (
            <p className="text-danger">{t("input.fieldRequired")}</p>
          )}
        </div>
      </div>
      <FromButton reset={reset} />
    </form>
  );
};

export default CreateCountry;