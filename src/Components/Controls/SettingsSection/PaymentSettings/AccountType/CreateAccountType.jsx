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


const CreateAccountType = ({
  initialData,
  onClose,
  isEditMode,
  fetchBranchesForSelectedAccountType,
  branchesTags,
  collectedId,
  setCollectedId,
  refetch=()=>{} }) => {
    console.log(initialData);
    
  const { t } = useTranslation();
  const { language } = i18next;
  const { reset, handleSubmit, formState: { errors }, register, control } = useForm({
    defaultValues: isEditMode ? {
      account_type_name_en: initialData?.account_type_name_en || "",
      account_type_name_ar: initialData?.account_type_name_ar || "",
    }
      : {}, mode: "all"
  });
  const { showToast } = useContext(ToastContext);
  const { baseUrlPms, Headers, userId, setIsLoading, setIsDisabled, isLoading } = useContext(AuthContext);
  const accountTypeId = isEditMode ? initialData?.id : null;
  const accountTypeAr = useWatch({ control, name: 'account_type_name_ar' });
  const accountTypeEn = useWatch({ control, name: 'account_type_name_en' });
  const isDisabled = !(accountTypeAr?.length > 0 && accountTypeEn?.length > 0);
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
  const createMainAccountType = async () => {
    const response = await axios.post(
      `${baseUrlPms}/account_type/store/`,
      { created_by: userId, updated_by: userId },
      { headers: Headers }
    );
    return response.data.data.id; // Return Room Type ID
  };

  // Function to create an Arabic version of the room type
  const createAccountTypeAr = async (accountTypeId, AccountNameAr) => {
    await axios.post(
      `${baseUrlPms}/account_type_ar/store/`,
      { pms_account_type_id: accountTypeId, account_type_name_ar: AccountNameAr },
      { headers: Headers }
    );
  };

  // Function to create an English version of the room type
  const createAccountTypeEn = async (accountTypeId, AccountNameEn) => {
    await axios.post(
      `${baseUrlPms}/account_type_en/store/`,
      { pms_account_type_id: accountTypeId, account_type_name_en: AccountNameEn },
      { headers: Headers }
    );
  };

  // Function to associate the created room type with selected branches
  const associateAccountTypeWithBranches = async (accountTypeId) => {
    // Collect all selected branch IDs
    const allSelectedBranchIds = Object.entries(selectedBranches).flatMap(([hotelName, branches]) =>
      Object.keys(branches).map((branchId) => parseInt(branchId))
    );

    
    // Create association requests for each branch
    const branchPromises = allSelectedBranchIds.map((branchId) =>
      axios.post(
        `${baseUrlPms}/account_type_branch/store/`,
        {
          created_by: userId,
          updated_by: userId,
          account_type_id: accountTypeId,
          branch_id: branchId,
        },
        { headers: Headers }
      )
    );

    await Promise.all(branchPromises); // Wait for all API calls to complete
  };


  // Main handler for form submission
  const createAccountType= async (data) => {
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
      let accountTypeId;
      if (isCreating) {
        // Step 1: Create main Room Type and get ID
        const accountTypeId = await createMainAccountType();
        // Step 2: Create translations for the Room Type
        await Promise.all([
          createAccountTypeAr(accountTypeId, data.account_type_name_ar),
          createAccountTypeEn(accountTypeId, data.account_type_name_en)
        ]);
        // Step 3: Associate Room Type with selected branches
        if (hasSelectedBranches) {
          await associateAccountTypeWithBranches(accountTypeId);
        }
      } else {
        accountTypeId = initialData.id;
console.log(accountTypeId);

        await Promise.all([
          axios.patch(`${baseUrlPms}/account_type/${accountTypeId}/update/`, {
            ...data,
            updated_by: userId,
            created_by: userId,
          }, { headers: Headers }),
          axios.patch(`${baseUrlPms}/account_type_ar/${accountTypeId}/update/`, {
            pms_account_type_id: accountTypeId,
            account_type_name_ar: data.account_type_name_ar,
          }, { headers: Headers }),
          axios.patch(`${baseUrlPms}/account_type_en/${accountTypeId}/update/`, {
            pms_account_type_id: accountTypeId,
            account_type_name_en: data.account_type_name_en,
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
      fetchBranchesForSelectedAccountType(initialData.id);
    }
  }, []);


  return (<>
    <form className="d-flex flex-wrap justify-content-end" onSubmit={handleSubmit(createAccountType)}>
      <div className="form-inputs d-flex w-100">
        <div className="input-package mt-3 pe-2 d-flex flex-column w-100">
          <BranchSelector
           mode="AccountType"
            hotels={hotels}
            handleHotelSelection={handleHotelSelection}
            handleToggle={handleToggle}
            isBranchChecked={isBranchChecked}
            isHotelChecked={isHotelChecked}
            isHotelIndeterminate={isHotelIndeterminate}
            fetchBranches={fetchBranchesForSelectedAccountType}
            branchesTags={branchesTags}
            itemId={accountTypeId}
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
              name="account_type_name_en"
              validationRules={{
                required: t("input.fieldRequired"),
                pattern: {
                  value: /^[A-Za-z\s]+$/,
                  message: t("input.onlyEnglishAllowed"),
                },
              }}
              errors={errors.account_type_name_en}
             
              className="pe-2 w-50"
            />
            <InputForrModal
              label={`${t("accountCategory")} ${t("input.arabicNameLabel")}`}
              type="text"
              placeholder={t("input.arabicPlaceholder")}
              register={register}
              name="account_type_name_ar"
              validationRules={{
                required: t("input.fieldRequired"),
                pattern: {
                  value: /^[\u0600-\u06FF\s]+$/,
                  message: t("input.onlyArabicAllowed"),
                },
              }}
              errors={errors.account_type_name_ar}
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

export default CreateAccountType;

