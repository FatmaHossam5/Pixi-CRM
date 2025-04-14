// 
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

const CreateCurrency = () => {
  const { t } = useTranslation();
  const { showToast } = useContext(ToastContext);
  const {handleSubmit,formState: { errors },reset,control,} = useForm({ mode: "all" });
  const {handleClose} = useContext(ModalContext);
  const {baseUrlMis,Headers,setIsLoading,isDisabled,baseUrlPms} = useContext(AuthContext);
  const [currencies, setCurrencies] = useState([]);
  const [selectedCurrencies, setSelectedCurrencies] = useState([]);

  const { fetchData } = useData();

  // Fetch all currencies
  const fetchCurrencies = async () => {
    try {
      const response = await axios.get(`${baseUrlMis}/currency/all/`, {
        headers: Headers,
      });
      setCurrencies(response.data);
    } catch (error) {
      console.error("Error fetching currencies:", error);
    }
  };

  const fetchSelectedCurrencies = async () => {
    try {
      const response = await axios.get(`${baseUrlMis}/currency_saved/all/`, { headers: Headers });
      setSelectedCurrencies(response.data.map((currency) => currency.pms_currency_id));
    } catch (error) {
      console.error("Error fetching selected currencies:", error);
    }
  };
  useEffect(() => {
    fetchCurrencies();
    fetchSelectedCurrencies();

  }, []);

  const saveSelectedCurrencies = async (selectedCurrencies) => {

    try {
      setIsLoading(true)
      for (const currencyId of selectedCurrencies) {
        await axios.post(
          `${baseUrlPms}/currency_saved/store/`,
          {
            created_by: 2, 
            updated_by: 2,
            pms_currency_id: currencyId, 
            
          },
          {
            headers: Headers,
          }
        );
      }
      showToast("success", t("msg.currencyMsg"));
      fetchData()
    } catch (error) {
      showToast("error", t("msg.errorMessage"));
      console.error("Error saving selected currencies:", error);
    } finally {
      setIsLoading(false)
    }
  };

  const handleCurrencySelection = (data) => {
    if (data.pms_currency_id && data.pms_currency_id.length > 0) {
      const selectedCurrencyIds = data.pms_currency_id.map((id) => id.value);
      saveSelectedCurrencies(selectedCurrencyIds); // Pass array of IDs to be processed individually
      reset();
      handleClose();
    } else {
      showToast("error", t("msg.noCurrencySelected"));
    }
  };
  // Filter out already selected currencies from the options
  const getFilteredCurrencies = () => {
    return currencies
      .filter((currency) => !selectedCurrencies.includes(currency.id))
      .map((currency) => ({
        value: currency.id,
        label: currency.mis_currency_en.currency_name_en,
      }));
  };
  return (
    <form
      className={`d-flex flex-wrap justify-content-end ${isDisabled ? "disabled-layer" : ""
        }`}
      onSubmit={handleSubmit(handleCurrencySelection)}
    >
      <div className="form-inputs d-flex w-100 px-3">
        <div className="input-package mt-3 pe-2 d-flex flex-column w-100">
          <label className="mb-2" htmlFor="currency_name_en">
            {t("Currency")}
          </label>
          <Controller
            control={control}
            name="pms_currency_id"
            rules={{ required: true }}
            render={({ field }) => (
              <Select
                {...field}
                isMulti
                placeholder={t("input.englishPlaceholder")}
                options={getFilteredCurrencies()}
                isClearable
                className={`border-0 w-100 ${isDisabled ? "disabled-input" : ""
                  }`}
                classNamePrefix="select"
                isDisabled={isDisabled}
              />
            )}
          />
          {errors.pms_currency_id && (
            <p className="text-danger">{t("input.fieldRequired")}</p>
          )}
        </div>
      </div>
      <FromButton reset={reset} />
    </form>
  );
};

export default CreateCurrency;