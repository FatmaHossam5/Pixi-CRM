import React, { useContext, useEffect, useState } from "react";
import FromButton from "../../../Shared/FromButton/FromButton";
import axios from "axios";
import { AuthContext } from "../../../Helpers/Context/AuthContext";
import { useForm } from "react-hook-form";
import { ModalContext } from "../../../Helpers/Context/ModalContext";
import { useTranslation } from "react-i18next";
import i18next from "i18next";
import { ToastContext } from "../../../Helpers/Context/ToastContext ";

const CreateBlackList = ({ getBlackLists }) => {
  const {
    baseUrlPms,
    Headers,
    userId,
    setIsLoading,
    setIsDisabled,
    isDisabled,
    admin,
  } = useContext(AuthContext);
  const { modelState, closeModal, setModelState, handleClose } =
    useContext(ModalContext);
  const { t } = useTranslation();
  const { language } = i18next;
  const { showToast } = useContext(ToastContext);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({ mode: "all" });

  const [blackListsCause, setBlackListsCause] = useState([]);
  const getbBlackListCause = () => {
    axios
      .get(`${baseUrlPms}/blackList_cause/all/`, {
        headers: Headers,
      })
      .then((res) => {
        setBlackListsCause(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const [customers, setCustomers] = useState([]);
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

  const createBlackList = async (data) => {
    const hotelId = localStorage.getItem("Hotel_id");
    setIsLoading(true);
    setIsDisabled(true);

    try {
      const blackLists = await axios.post(
        `${baseUrlPms}/blacklist/store/`,
        {
          created_by: userId,
          updated_by: userId,
          hotel_id: hotelId,
          customer_id: data.customer_id,
          cause_id: data.cause_id,
          blacklist_note: data.blacklist_note,
        },
        {
          headers: Headers,
        }
      );

      if (blackLists.status == 200 || 201) {

        showToast('success',  t("msg.blockedCustomer"));

      }
    } catch (error) {
      showToast('error', t("msg.errorMessage"));

    } finally {
      handleClose();
      reset();
      getBlackLists();
      setIsLoading(false);
      setIsDisabled(false);
    }
  };
  useEffect(() => {
    getbBlackListCause();
    getCustomers();
  }, []);
  const currentDate = new Date().toLocaleDateString();

  return (
    <>
      <form
        onSubmit={handleSubmit(createBlackList)}
        className="d-flex flex-wrap justify-content-end"
      >
        <div className="form-inputs d-flex flex-wrap w-100 px-3">
          <div className="input-package mt-3 d-flex flex-column w-100">
            <label className="mb-2 modal-label" htmlFor="customer-seacr">
              {`${t("selectInput.select")} ${t("CustomerSection.customer")}`}
            </label>
            <select
              className={`px-login-input ${isDisabled ? "disabled-input" : ""}`}
              name="customer-seacr"
              id="customer-seacr"
              disabled={isDisabled}
              {...register("customer_id", {
                required: true,
              })}
            >
              <option value=""> {`${t("selectInput.choose")} ${t("CustomerSection.customer")}`}</option>
              {customers &&
                customers.map((customer) => (

                  <option
                    key={customer?.id}
                    value={customer?.id}
                    disabled={`${customer.is_blocked == true
                      ? "disabled"
                      : ""
                      }`}
                    className={`${customer.is_blocked == true
                      ? "text-danger"
                      : ""
                      }`}
                  >
                    {language === "ar" ? customer?.pms_customer_ar?.customer_name_ar : customer?.pms_customer_en?.customer_name_en}
                  </option>
                ))}
            </select>
            {errors?.customer_id?.type === "required" && (
              <p className="text-danger m-0">{t("input.fieldRequired")}</p>
            )}
          </div>

        </div>
        <div className="form-inputs d-flex w-100 px-3">
          <div className="input-package mt-3 d-flex flex-column w-100">
            <label className="mb-2 modal-label" htmlFor="customer-seacr">
              {t("BlacklistSection.BlacklistedReasons")}

            </label>
            <select
              className={`px-login-input ${isDisabled ? "disabled-input" : ""}`}
              name="customer-seacr"
              id="customer-seacr"
              disabled={isDisabled}
              {...register("cause_id", {
                required: true,
              })}
            >
              <option value="" selected>
                {" "}
                {`${t("selectInput.choose")} ${t("BlacklistSection.reason")}`}
              </option>
              {blackListsCause &&
                blackListsCause.map((cause) => (
                  <option key={cause?.id} value={cause?.id}>
                    {language === "ar" ? cause?.pms_blacklist_cause_ar?.blacklist_cause_name_ar : cause?.pms_blacklist_cause_en?.blacklist_cause_name_en}
                  </option>
                ))}
            </select>
            {errors?.cause_id?.type === "required" && (
              <p className="text-danger m-0">{t("input.fieldRequired")}</p>
            )}
          </div>
        </div>
        <div className="form-inputs d-flex w-100 px-3">
          <div className="input-package mt-3 d-flex flex-column w-100">
            <label className="mb-2 modal-label" htmlFor="customer-seacr">
              {t("BlacklistSection.notes")}
            </label>
            <textarea
              className={`px-text-area ${isDisabled ? "disabled-input" : ""}`}
              placeholder="Enter notes"
              disabled={isDisabled}
              {...register("blacklist_note")}
            />
          </div>
        </div>
        <div className="add-by mt-3 d-flex w-100 px-3">
          <div className="label">{t("BlacklistSection.addedBy")} :</div>
          <div className="content ms-3">{admin}</div>
          <div className="date ms-auto gray-text">{currentDate}</div>{" "}
          {/* date */}
        </div>

        <FromButton reset={reset} />
      </form>
    </>
  );
};

export default CreateBlackList;
