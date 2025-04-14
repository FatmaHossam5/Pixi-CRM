import React, { useContext, useEffect, useState } from "react";
import { useForm, useWatch } from "react-hook-form";
import { ModalContext } from "../../../../Helpers/Context/ModalContext";
import { AuthContext } from "../../../../Helpers/Context/AuthContext";
import axios from "axios";
import FromButton from "../../../../Shared/FromButton/FromButton";
import { useTranslation } from "react-i18next";
import { ToastContext } from "../../../../Helpers/Context/ToastContext ";
import { useData } from "../../../../Helpers/Context/useData";
import useBranchSelection from "../../../../Helpers/Hook/useBranchSelection";
import BranchSelector from "../../../../Shared/BranchSelector/BranchSelector";
import InputForrModal from "../../../../Shared/InputForModal/InputForrModal";
import i18next from "i18next";

const CreatePaymentMethod = ({
  initialData,
  onClose,
  isEditMode,
  fetchBranchesForSelectedPaymentMethod,
  branchesTags,
  collectedId,
  setCollectedId,
  refetch=()=>{} }) => {
  const { t } = useTranslation();
  const { language } = i18next;
  const { reset, handleSubmit, formState: { errors }, register, control } = useForm({
    defaultValues: isEditMode ? {
      payment_method_name_en: initialData?.payment_method_name_en || "",
      payment_method_name_ar: initialData?.payment_method_name_ar || "",
    }
      : {}, mode: "all"
  });
  const { showToast } = useContext(ToastContext);
  const { baseUrlPms, Headers, userId, setIsLoading, setIsDisabled, isLoading } = useContext(AuthContext);
  const paymentMethodId = isEditMode ? initialData?.id : null;
  const paymentMethodAr = useWatch({ control, name: 'payment_method_name_ar' });
  const paymentMethodEn = useWatch({ control, name: 'payment_method_name_en' });
  const isDisabled = !(paymentMethodAr?.length > 0 && paymentMethodEn?.length > 0);
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
  const createMainPaymentMethod = async () => {
    const response = await axios.post(
      `${baseUrlPms}/payment_method/store/`,
      { created_by: userId, updated_by: userId },
      { headers: Headers }
    );
    return response.data.data.id; // Return Room Type ID
  };

  // Function to create an Arabic version of the room type
  const createPaymentMethodAr = async (paymentMethodId, PaymentMethodNameAr) => {
    await axios.post(
      `${baseUrlPms}/payment_method_ar/store/`,
      { pms_payment_method_id: paymentMethodId, payment_method_name_ar: PaymentMethodNameAr },
      { headers: Headers }
    );
  };

  // Function to create an English version of the room type
  const createPaymentMethodEn = async (paymentMethodId, PaymentMethodNameEn) => {
    await axios.post(
      `${baseUrlPms}/payment_method_en/store/`,
      { pms_payment_method_id: paymentMethodId, payment_method_name_en: PaymentMethodNameEn },
      { headers: Headers }
    );
  };

  // Function to associate the created room type with selected branches
  const associatePaymentMethodWithBranches = async (paymentMethodId) => {
    // Collect all selected branch IDs
    const allSelectedBranchIds = Object.entries(selectedBranches).flatMap(([hotelName, branches]) =>
      Object.keys(branches).map((branchId) => parseInt(branchId))
    );

    
    // Create association requests for each branch
    const branchPromises = allSelectedBranchIds.map((branchId) =>
      axios.post(
        `${baseUrlPms}/payment_method_branch/store/`,
        {
          created_by: userId,
          updated_by: userId,
          payment_method_id: paymentMethodId,
          branch_id: branchId,
        },
        { headers: Headers }
      )
    );

    await Promise.all(branchPromises); // Wait for all API calls to complete
  };


  // Main handler for form submission
  const createPaymentMethod = async (data) => {
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
      let paymentMethodId;
      if (isCreating) {
        // Step 1: Create main Room Type and get ID
        const paymentMethodId = await createMainPaymentMethod();
        // Step 2: Create translations for the Room Type
        await Promise.all([
          createPaymentMethodAr(paymentMethodId, data.payment_method_name_ar),
          createPaymentMethodEn(paymentMethodId, data.payment_method_name_en)
        ]);
        // Step 3: Associate Room Type with selected branches
        if (hasSelectedBranches) {
          await associatePaymentMethodWithBranches(paymentMethodId);
        }
      } else {
        paymentMethodId = initialData.id;

        await Promise.all([
          axios.patch(`${baseUrlPms}/payment_method/${paymentMethodId}/update/`, {
            ...data,
            updated_by: userId,
            created_by: userId,
          }, { headers: Headers }),
          axios.patch(`${baseUrlPms}/payment_method_ar/${paymentMethodId}/update/`, {
            pms_payment_method_id: paymentMethodId,
            payment_method_name_ar: data.payment_method_name_ar,
          }, { headers: Headers }),
          axios.patch(`${baseUrlPms}/payment_method_en/${paymentMethodId}/update/`, {
            pms_payment_method_id: paymentMethodId,
            payment_method_name_en: data.payment_method_name_en,
          }, { headers: Headers }),
        ]);

      }
      // Show success message
      showToast("success", t(isCreating ? "msg.paymentMethodMsg" : "msg.updatepaymentMethodMsg"));
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
      console.error("Error during PaymentMethod creation:", error);
    } finally {
      setIsLoading(false);
      setIsDisabled(false);
    }
  };

  useEffect(() => {
    if (isEditMode && initialData?.id) {
      // Fetch branches only if it's in edit mode and roomTypeId is available
      fetchBranchesForSelectedPaymentMethod(initialData.id);
    }
  }, []);


  return (<>
    <form className="d-flex flex-wrap justify-content-end" onSubmit={handleSubmit(createPaymentMethod)}>
      <div className="form-inputs d-flex w-100">
        <div className="input-package mt-3 pe-2 d-flex flex-column w-100">
          <BranchSelector
           mode="PaymentMethod"
            hotels={hotels}
            handleHotelSelection={handleHotelSelection}
            handleToggle={handleToggle}
            isBranchChecked={isBranchChecked}
            isHotelChecked={isHotelChecked}
            isHotelIndeterminate={isHotelIndeterminate}
            fetchBranches={fetchBranchesForSelectedPaymentMethod}
            branchesTags={branchesTags}
            itemId={paymentMethodId}
            collectedId={collectedId}
            setCollectedId={setCollectedId}
            isEditMode={isEditMode}
          />
          <div className="form-inputs form-margin d-flex w-100">
            <InputForrModal
              label={`${t("paymentMethod")} ${t("input.englishNameLabel")}`}
              type="text"
              placeholder={t("input.englishPlaceholder")}
              register={register}
              name="payment_method_name_en"
              validationRules={{
                required: t("input.fieldRequired"),
                pattern: {
                  value: /^[A-Za-z\s]+$/,
                  message: t("input.onlyEnglishAllowed"),
                },
              }}
              errors={errors.payment_method_name_en}
             
              className="pe-2 w-50"
            />
            <InputForrModal
              label={`${t("paymentMethod")} ${t("input.arabicNameLabel")}`}
              type="text"
              placeholder={t("input.arabicPlaceholder")}
              register={register}
              name="payment_method_name_ar"
              validationRules={{
                required: t("input.fieldRequired"),
                pattern: {
                  value: /^[\u0600-\u06FF\s]+$/,
                  message: t("input.onlyArabicAllowed"),
                },
              }}
              errors={errors.payment_method_name_ar}
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

export default CreatePaymentMethod;
