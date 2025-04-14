import React, { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { ModalContext } from "../../../../Helpers/Context/ModalContext";
import { AuthContext } from "../../../../Helpers/Context/AuthContext";
import axios from "axios";
import FromButton from "../../../../Shared/FromButton/FromButton";
import { useTranslation } from "react-i18next";
import i18next from "i18next";
import { ToastContext } from "../../../../Helpers/Context/ToastContext ";
import useBranchSelection from "../../../../Helpers/Hook/useBranchSelection";
import BranchSelector from "../../../../Shared/BranchSelector/BranchSelector";
const CreatePaymentAccount = ({ initialData,
  onClose,
  isEditMode,
  fetchBranchesForSelectedPaymentType,
  branchesTags,
  collectedId,
  setCollectedId,
  refetch = () => { } }) => {
  const { t } = useTranslation();
  const { language } = i18next;
  const { showToast } = useContext(ToastContext);
  const { handleClose } = useContext(ModalContext);
  const { reset, handleSubmit, formState: { errors }, register, control } = useForm({
    defaultValues: isEditMode ? {
      payment_account_category_id: initialData?.payment_account_category_id || "",
      payment_account_description_ar: initialData?.payment_account_description_ar || "",
      payment_account_description_en:initialData?.payment_account_description_en
    }
      : {}, mode: "all"
  });
  const paymentAccountId = isEditMode ? initialData?.id : null;

  const {
    baseUrlPms,
    Headers,
    userId,
    setIsLoading,
    setIsDisabled,
    isDisabled,
  } = useContext(AuthContext);
  const {
    hotels,
    selectedBranches,
    handleToggle,
    handleHotelSelection,
    isBranchChecked,
    isHotelChecked,
    isHotelIndeterminate,
    setSelectedBranches,
  } = useBranchSelection(baseUrlPms, Headers, language, showToast);
  



  const createMainPaymentAccount = async (paymentNumber,paymentCategory) => {
    
    const response = await axios.post(
      `${baseUrlPms}/payment_account/store/`,
      {
        created_by: userId,
        updated_by: userId,
        payment_account_number: paymentNumber,
        payment_account_category_id: paymentCategory
      },
      { headers: Headers }
     
    );
    
    return response.data.data.id; // Return Room Type ID
  };
  

  // Function to create an Arabic version of the room type
  const createPaymentAccountAr = async (paymentAccountId, PayAccountNameAr) => {
    await axios.post(
      `${baseUrlPms}/payment_account_ar/store/`,
      { pms_payment_account_id: paymentAccountId, payment_account_description_ar: PayAccountNameAr },
      { headers: Headers }
    );
  };

  // Function to create an English version of the room type
  const createPaymentAccountEn = async (paymentAccountId, PayAccountNameEn) => {
    await axios.post(
      `${baseUrlPms}/payment_account_en/store/`,
      { pms_payment_account_id: paymentAccountId, payment_account_description_en: PayAccountNameEn },
      { headers: Headers }
    );
  };

  // Function to associate the created room type with selected branches
  const associatePaymentAccountWithBranches = async (paymentAccountId) => {
    // Collect all selected branch IDs
    const allSelectedBranchIds = Object.entries(selectedBranches).flatMap(([hotelName, branches]) =>
      Object.keys(branches).map((branchId) => parseInt(branchId))
    );


    // Create association requests for each branch
    const branchPromises = allSelectedBranchIds.map((branchId) =>
      axios.post(
        `${baseUrlPms}/payment_account_branch/store/`,
        {
          created_by: userId,
          updated_by: userId,
          payment_account_id: paymentAccountId,
          branch_id: branchId,
        },
        { headers: Headers }
      )
    );

    await Promise.all(branchPromises); // Wait for all API calls to complete
  };


  // Main handler for form submission
  const createPaymentAccount = async (data) => {
 
    
    const isCreating = !isEditMode;
    // Ensure at least one branch is selected
    const hasSelectedBranches = Object.values(selectedBranches).some(
      (branches) => Object.keys(branches).length > 0
    );
    if (isCreating && !hasSelectedBranches) {
      showToast("error", t("msg.selectBranchError"));
      return;
    }
    setIsLoading(true);
    setIsDisabled(true);
    try {
      let paymentAccountId;
      if (isCreating) {
        // Step 1: Create main Room Type and get ID
        const paymentAccountId = await createMainPaymentAccount(data.payment_account_number,data.payment_account_category_id);
        // Step 2: Create translations for the Room Type
        await Promise.all([
          createPaymentAccountAr(paymentAccountId, data.payment_account_description_ar),
          createPaymentAccountEn(paymentAccountId, data.payment_account_description_en)
        ]);
        // Step 3: Associate Room Type with selected branches
        if (hasSelectedBranches) {
          await associatePaymentAccountWithBranches(paymentAccountId);
        }
      } else {
        paymentAccountId = initialData.id;
        console.log(paymentAccountId);

        await Promise.all([
          axios.patch(`${baseUrlPms}/payment_account/${paymentAccountId}/update/`, {
            ...data,
            updated_by: userId,
            created_by: userId,
          }, { headers: Headers }),
          axios.patch(`${baseUrlPms}/payment_account_ar/${paymentAccountId}/update/`, {
            pms_payment_account_id: paymentAccountId,
            payment_account_description_ar: data.payment_account_description_ar,
          }, { headers: Headers }),
          axios.patch(`${baseUrlPms}/payment_account_en/${paymentAccountId}/update/`, {
            pms_payment_account_id: paymentAccountId,
            payment_account_description_en: data.payment_account_description_en,
          }, { headers: Headers }),
        ]);

      }
      // Show success message
      showToast("success", t(isCreating ? "msg.accountTypeMsg" : "msg.updateaccountCategoryMsg"));
      reset({});

      setSelectedBranches({});// Clear selected branches
      if (!isCreating) {
        onClose();
        refetch();
      }
      handleClose();
      refetch(); // Call refetch here to refresh the data
    }
    catch (error) {
      // Show error message
      showToast("error", t("msg.errorMessage"));
      console.error("Error during AccountCategory creation:", error);
    } finally {
      setIsLoading(false);
      setIsDisabled(false);
    }
  };

  useEffect(() => {
    if (isEditMode && initialData?.id) {
      // Fetch branches only if it's in edit mode and roomTypeId is available
      fetchBranchesForSelectedPaymentType(initialData.id);
    }
  }, []);
  const [accountCategory, setAccountCategory] = useState();
  const getAccountCategory = () => {
    axios
      .get(`${baseUrlPms}/payment_account_category/all/`, {
        headers: Headers,
      })
      .then((res) => {
        setAccountCategory(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const [accountType, setAccountType] = useState();
  const getAccountType = () => {
    axios
      .get(`${baseUrlPms}/account_type/all/`, {
        headers: Headers,
      })
      .then((res) => {
        setAccountType(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  useEffect(() => {
    getAccountCategory();
    getAccountType();
  }, []);
  
    useEffect(() => {
      if (isEditMode && initialData?.id) {
        // Fetch branches only if it's in edit mode and roomTypeId is available
        fetchBranchesForSelectedPaymentType (initialData.id);
      }
    }, []);
  

  return (
    <>
      <form
        className="d-flex flex-wrap justify-content-end "
        onSubmit={handleSubmit(createPaymentAccount)}
      >
         <div className="form-inputs d-flex w-100 px-3">
         <BranchSelector
           mode="AccountType"
            hotels={hotels}
            handleHotelSelection={handleHotelSelection}
            handleToggle={handleToggle}
            isBranchChecked={isBranchChecked}
            isHotelChecked={isHotelChecked}
            isHotelIndeterminate={isHotelIndeterminate}
            fetchBranches={fetchBranchesForSelectedPaymentType}
            branchesTags={branchesTags}
            itemId={paymentAccountId}
            collectedId={collectedId}
            setCollectedId={setCollectedId}
            isEditMode={isEditMode}
          />
         </div>
        <div className="form-inputs d-flex w-100 px-3">
          <div className="input-package mt-3 pe-2 d-flex flex-column w-50">
            <label className="mb-2" htmlFor>
              {`${t("paymentTab.paymentAccount.paymentAccount")} ${t("input.englishNameLabel")}`}
            </label>
            <input
              type="text"
              placeholder={t("input.englishPlaceholder")}
              className={`px-form-input w-100 ${isDisabled ? "disabled-input" : ""
                }`}
              disabled={isDisabled}
              {...register("payment_account_description_en", {
                required: true,
                pattern: /^[A-Za-z\s]+(?:\d+)?$/,
              })}
            />
            {errors?.payment_account_description_en?.type === "required" && (
              <p className="text-danger ">{t("input.fieldRequired")}</p>
            )}
            {errors?.payment_account_description_en?.type === "pattern" && (
              <p className="text-danger ">{t("input.onlyEnglishAllowed")}</p>
            )}
          </div>
          <div className="input-package mt-3 ps-2 d-flex flex-column w-50">
            <label className="mb-2">
              {`${t("paymentTab.paymentAccount.paymentAccount")} ${t("input.arabicNameLabel")}`}
            </label>
            <input
              type="text"
              placeholder={t("input.arabicPlaceholder")}
              className={`px-form-input w-100 ${isDisabled ? "disabled-input" : ""
                }`}
              {...register("payment_account_description_ar", {
                required: true,
                pattern: /^[\u0600-\u06FF\s]+(?:\d+)?$/,
              })}
              disabled={isDisabled}
            />
            {errors?.payment_account_description_ar?.type === "required" && (
              <p className="text-danger ">{t("input.fieldRequired")}</p>
            )}
            {errors?.payment_account_description_ar?.type === "pattern" && (
              <p className="text-danger ">{t("input.onlyArabicAllowed")}</p>
            )}
          </div>
        </div>
        <div className="form-inputs d-flex w-100 px-3">
          <div className="input-package mt-3 pe-2 d-flex flex-column w-100">
            <label className="mb-2" htmlFor>
              {t("paymentTab.paymentAccount.paymentNumber")}
            </label>
            <input
              type="text"
              placeholder={t("paymentTab.paymentAccount.placeholder")}
              className={`px-form-input w-100 ${isDisabled ? "disabled-input" : ""
                }`}
              disabled={isDisabled}
              {...register("payment_account_number", {
                required: true,
              })}
            />
            {errors?.payment_account_number?.type === "required" && (
              <p className="text-danger ">{t("input.fieldRequired")}</p>
            )}
          </div>
        </div>

        <div className="form-inputs d-flex w-100 px-3">
          <div className="input-package mt-3 pe-2 d-flex flex-column w-50">
            <label className="mb-2" htmlFor>
              {`${t("selectInput.select")} ${t("paymentTab.accountCategory")}`}
            </label>
            <select
              name="hotel"
              className={`px-login-input ${isDisabled ? "disabled-input" : ""}`}
              disabled={isDisabled}
              {...register("payment_account_category_id")}
            >
              <option value="">{`${t("selectInput.choose")} ${t("paymentTab.accountCategory")}`}</option>
              {accountCategory &&
                accountCategory?.map((category, index) => {
                  return (
                    <option key={index} value={category?.id}>
                      {
                        language === "ar" ? category?.pms_payment_account_category_ar
                          .payment_account_category_name_ar :
                          category?.pms_payment_account_category_en?.payment_account_category_name_en
                      }
                    </option>
                  );
                })}
            </select>
          </div>
          <div className="input-package mt-3 ps-2 d-flex flex-column w-50">
            <label className="mb-2" htmlFor>
              {`${t("selectInput.select")} ${t("paymentTab.accountType")}`}
            </label>
            <select
              name="hotel"
              className={`px-login-input ${isDisabled ? "disabled-input" : ""}`}
              disabled={isDisabled}
              {...register("account_type_id")}
            >
              <option value="">{`${t("selectInput.choose")} ${t("paymentTab.accountType")}`}</option>
              {accountType &&
                accountType?.map((type, index) => {
                  return (
                    <option key={index} value={type?.id}>
                      {language === "ar" ? type?.pms_account_type_ar.account_type_name_ar :
                        type?.pms_account_type_en?.account_type_name_en}
                    </option>
                  );
                })}
            </select>
          </div>
        </div>
        <FromButton reset={reset} />
      </form>
    </>
  );
};

export default CreatePaymentAccount;
