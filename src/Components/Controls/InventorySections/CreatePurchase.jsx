import { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { ModalContext } from "../../Helpers/Context/ModalContext";
import { AuthContext } from "../../Helpers/Context/AuthContext";
import axios from "axios";
import FromButton from "../../Shared/FromButton/FromButton";
import useVendor from "../../Helpers/Hook/useVendor";
import useProduct from "./../../Helpers/Hook/useProduct";
import i18next from "i18next";
import { useTranslation } from "react-i18next";
import { ToastContext } from "../../Helpers/Context/ToastContext ";

const CreatePurchase = ({ getProducts_Vendor }) => {

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({ mode: "all" });
  const { showToast } = useContext(ToastContext);

  const { vendors } = useVendor();
  const { items } = useProduct();
  const { t } = useTranslation();
  const { language } = i18next;
  const { modelState, handleClose, setModelState } = useContext(ModalContext);

  const { baseUrlPms, Headers, userId,
    setIsLoading,
    setIsDisabled,
    isDisabled
  } = useContext(AuthContext);

  const createPurchase = async (data) => {
    setIsLoading(true);
    setIsDisabled(true);
    try {
      const itemPurchesData = await axios.post(
        `${baseUrlPms}/product_vendor/store/`,
        {
          created_by: userId,
          updated_by: userId,
          product_id: data.product_id,
          vendor_id: data.vendor_id,
          number_of_items: data.number_of_items,
          unit_price: data.unit_price
        },
        {
          headers: Headers,
        }
      );

      if (
        // eslint-disable-next-line no-constant-condition
        itemPurchesData.status == 200 ||
        201
      ) {
        showToast('success', itemPurchesData.data.message || t("msg.purchaseMsg"));
      }
    } catch (error) {
      showToast('error', t("msg.errorMessage"));
    } finally {
      handleClose();
      reset();
      setIsLoading(false);
      setIsDisabled(false);
      getProducts_Vendor()
    }
  };

  return (
    <>
      <form
        className={`d-flex flex-wrap justify-content-end ${isDisabled ? "disabled-layer" : ""
          }`}
        onSubmit={handleSubmit(createPurchase)}
      >
        <div className="form-inputs d-flex w-100">
          <div className="input-package mt-3 pe-2 d-flex flex-column w-50">
            <label className="mb-2">{t("inventories.product")}</label>
            <select
              name="category"
              className="px-login-input"
              {...register("product_id", {
                required: true,
              })}
              disabled={isDisabled}
            >
              <option value="">{`${t("selectInput.choose")} ${t("inventories.product")}`}</option>
              {items &&
                items.map((product) => {
                  return (
                    <option key={product.id} value={product.id}>
                      {language === "ar" ? product?.pms_product_ar?.product_name_ar : product?.pms_product_en?.product_name_en}
                    </option>
                  );
                })}
            </select>
            {errors?.product_id?.type === "required" && (
              <p className="text-danger ">{t("input.fieldRequired")}</p>
            )}
          </div>
          <div className="input-package mt-3 pe-2 d-flex flex-column w-50">
            <label className="mb-2">{t("inventories.vendor")}</label>
            <select
              name="category"
              className="px-login-input"
              {...register("vendor_id", {
                required: true,
              })}
              disabled={isDisabled}
            >
              <option value="">{`${t("selectInput.choose")} ${t("inventories.vendor")}`}</option>
              {vendors &&
                vendors.map((vendor) => {
                  return (
                    <option key={vendor.id} value={vendor.id}>
                      {language === "ar" ? vendor?.pms_vendor_ar?.vendor_name_ar : vendor?.pms_vendor_en?.vendor_name_en}
                    </option>
                  );
                })}
            </select>
            {errors?.vendor_id?.type === "required" && (
              <p className="text-danger ">{t("input.fieldRequired")}</p>
            )}
          </div>
        </div>

        <div className="form-inputs d-flex w-100">
          <div className="input-package mt-3 pe-2 d-flex flex-column w-50">
            <label className="mb-2">{t("inventories.minQuantity")}</label>
            <input
              type="number"
              placeholder={t("inventories.placeholderminQuantity")}
              className="px-form-input w-100 "
              {...register("number_of_items")}
              disabled={isDisabled}
            />

          </div>
          <div className="input-package mt-3 ps-2 d-flex flex-column w-50">
            <label className="mb-2">{t("inventories.unitPrice")}</label>
            <input
              type="number"
              placeholder={t("inventories.placeholderUnitPrice")}
              className="px-form-input w-100 "
              disabled={isDisabled}
              {...register("unit_price")}
            />
          </div>
        </div>

        <FromButton reset={reset} />
      </form>
    </>
  );
};

export default CreatePurchase;
