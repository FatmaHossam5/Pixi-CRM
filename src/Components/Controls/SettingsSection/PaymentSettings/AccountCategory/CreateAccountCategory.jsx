import React, { useContext, useEffect } from "react";
import { useForm, useWatch } from "react-hook-form";
import { ModalContext } from "../../../../Helpers/Context/ModalContext";
import { AuthContext } from "../../../../Helpers/Context/AuthContext";
import axios from "axios";
import FromButton from "../../../../Shared/FromButton/FromButton";
import { useTranslation } from "react-i18next";
import { ToastContext } from "../../../../Helpers/Context/ToastContext ";
import i18next from "i18next";
import useBranchSelection from "../../../../Helpers/Hook/useBranchSelection";
import BranchSelector from "../../../../Shared/BranchSelector/BranchSelector";
import InputForrModal from "../../../../Shared/InputForModal/InputForrModal";


const CreateAccountCategory = ({
  initialData,
  onClose,
  isEditMode,
  fetchBranchesForSelectedPaymentAccount,
  branchesTags,
  collectedId,
  setCollectedId,
  refetch=()=>{} }) => {
    console.log(initialData);
    
  const { t } = useTranslation();
  const { language } = i18next;
  const { reset, handleSubmit, formState: { errors }, register, control } = useForm({
    defaultValues: isEditMode ? {
      payment_account_category_name_en: initialData?.payment_account_category_name_en || "",
      payment_account_category_name_ar: initialData?.payment_account_category_name_ar || "",
    }
      : {}, mode: "all"
  });
  const { showToast } = useContext(ToastContext);
  const { baseUrlPms, Headers, userId, setIsLoading, setIsDisabled, isLoading } = useContext(AuthContext);
  const paymentAccountId = isEditMode ? initialData?.id : null;
  const paymentAccountAr = useWatch({ control, name: 'payment_account_category_name_ar' });
  const paymentAccountEn = useWatch({ control, name: 'payment_account_category_name_en' });
  const isDisabled = !(paymentAccountAr?.length > 0 && paymentAccountEn?.length > 0);
  const { handleClose } = useContext(ModalContext);
  
  // Custom hook for branch selection
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

  // Function to create a main room type in the primary API
  const createMainPaymentAccount = async () => {
    const response = await axios.post(
      `${baseUrlPms}/payment_account_category/store/`,
      { created_by: userId, updated_by: userId },
      { headers: Headers }
    );
    return response.data.data.id; // Return Room Type ID
  };

  // Function to create an Arabic version of the room type
  const createPaymentAccountAr = async (paymentAccountId, paymentAccountNameAr) => {
    await axios.post(
      `${baseUrlPms}/payment_account_category_ar/store/`,
      { pms_payment_account_category_id: paymentAccountId, payment_account_category_name_ar: paymentAccountNameAr },
      { headers: Headers }
    );
  };

  // Function to create an English version of the room type
  const createPaymentAccountEn = async (paymentAccountId, paymentAccountNameEn) => {
    await axios.post(
      `${baseUrlPms}/payment_account_category_en/store/`,
      { pms_payment_account_category_id: paymentAccountId, payment_account_category_name_en: paymentAccountNameEn },
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
        `${baseUrlPms}/payment_account_category_branch/store/`,
        {
          created_by: userId,
          updated_by: userId,
          payment_account_category_id: paymentAccountId,
          branch_id: branchId,
        },
        { headers: Headers }
      )
    );

    await Promise.all(branchPromises); // Wait for all API calls to complete
  };


  // Main handler for form submission
  const createPaymentAccount= async (data) => {
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
        const paymentAccountId = await createMainPaymentAccount();
        // Step 2: Create translations for the Room Type
        await Promise.all([
          createPaymentAccountAr(paymentAccountId, data.payment_account_category_name_ar),
          createPaymentAccountEn(paymentAccountId, data.payment_account_category_name_en)
        ]);
        // Step 3: Associate Room Type with selected branches
        if (hasSelectedBranches) {
          await associatePaymentAccountWithBranches(paymentAccountId);
        }
      } else {
        paymentAccountId = initialData.id;
console.log(paymentAccountId);

        await Promise.all([
          axios.patch(`${baseUrlPms}/payment_account_category/${paymentAccountId}/update/`, {
            ...data,
            updated_by: userId,
            created_by: userId,
          }, { headers: Headers }),
          axios.patch(`${baseUrlPms}/payment_account_category_ar/${paymentAccountId}/update/`, {
            pms_payment_account_category_id: paymentAccountId,
            payment_account_category_name_ar: data.payment_account_category_name_ar,
          }, { headers: Headers }),
          axios.patch(`${baseUrlPms}/payment_account_category_en/${paymentAccountId}/update/`, {
            pms_payment_account_category_id: paymentAccountId,
            payment_account_category_name_en: data.payment_account_category_name_en,
          }, { headers: Headers }),
        ]);

      }
      // Show success message
      showToast("success", t(isCreating ? "msg.accountCategoryMsg" : "msg.updateaccountCategoryMsg"));
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
      fetchBranchesForSelectedPaymentAccount(initialData.id);
    }
  }, []);


  return (<>
    <form className="d-flex flex-wrap justify-content-end" onSubmit={handleSubmit(createPaymentAccount)}>
      <div className="form-inputs d-flex w-100">
        <div className="input-package mt-3 pe-2 d-flex flex-column w-100">
          <BranchSelector
           mode="AccountCategory"
            hotels={hotels}
            handleHotelSelection={handleHotelSelection}
            handleToggle={handleToggle}
            isBranchChecked={isBranchChecked}
            isHotelChecked={isHotelChecked}
            isHotelIndeterminate={isHotelIndeterminate}
            fetchBranches={fetchBranchesForSelectedPaymentAccount}
            branchesTags={branchesTags}
            itemId={paymentAccountId}
            collectedId={collectedId}
            setCollectedId={setCollectedId}
            isEditMode={isEditMode}
          />
          <div className="form-inputs form-margin d-flex w-100">
            <InputForrModal
              label={`${t("accountCategory")} ${t("input.englishNameLabel")}`}
              type="text"
              placeholder={t("input.englishPlaceholder")}
              register={register}
              name="payment_account_category_name_en"
              validationRules={{
                required: t("input.fieldRequired"),
                pattern: {
                  value: /^[A-Za-z\s]+$/,
                  message: t("input.onlyEnglishAllowed"),
                },
              }}
              errors={errors.payment_account_category_name_en}
             
              className="pe-2 w-50"
            />
            <InputForrModal
              label={`${t("accountCategory")} ${t("input.arabicNameLabel")}`}
              type="text"
              placeholder={t("input.arabicPlaceholder")}
              register={register}
              name="payment_account_category_name_ar"
              validationRules={{
                required: t("input.fieldRequired"),
                pattern: {
                  value: /^[\u0600-\u06FF\s]+$/,
                  message: t("input.onlyArabicAllowed"),
                },
              }}
              errors={errors.payment_account_category_name_ar}
              className="ps-2 w-50"
            />
          </div>
          <FromButton reset={reset} isLoading={isLoading} buttonLabel={isEditMode ? "Edit" : "Add"} disabled={isDisabled} />
        </div>
      </div>
    </form>

  </>

  );
};

export default CreateAccountCategory;
