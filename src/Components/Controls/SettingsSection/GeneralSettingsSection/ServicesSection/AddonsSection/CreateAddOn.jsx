import axios from "axios";
import i18next from "i18next";
import { debounce } from "lodash";
import { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { AuthContext } from "../../../../../Helpers/Context/AuthContext";
import { ModalContext } from "../../../../../Helpers/Context/ModalContext";
import { ToastContext } from "../../../../../Helpers/Context/ToastContext ";
import useBranchSelection from "../../../../../Helpers/Hook/useBranchSelection";
import BranchSelector from "../../../../../Shared/BranchSelector/BranchSelector";
import FromButton from "../../../../../Shared/FromButton/FromButton";
import InputForrModal from "../../../../../Shared/InputForModal/InputForrModal";
import { useAddOns } from "../../../../../Helpers/Context/AddOnsContext";

const CreateAddOn = ({
  initialData,
  collectedId,
  setCollectedId,
  branchesTags,
  onClose,
  isEditMode,
  fetchBranchesForSelectedAddOn}) => {
  
  
  const { t } = useTranslation();
  const { language } = i18next;
  const { showToast } = useContext(ToastContext);
  const addOnId = isEditMode ? initialData?.id : null;

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({defaultValues:{
    addons_name_en:initialData?.addons_name_en,
    addons_name_ar:initialData?.addons_name_ar,
    addons_description_en:initialData?.addons_description_en,
    addons_description_ar:initialData?.addons_description_ar,
    addon_price:initialData?.addon_price,
    is_require_dependant:initialData?.is_require_dependant

  }, mode: "all" });


  const { handleClose } = useContext(ModalContext);

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
  const debouncedHandleToggle = debounce(handleToggle, 300);
  const debouncedHandleHotelSelection = debounce(handleHotelSelection, 300);
  const [requireDependents, setRequireDependents] = useState(false);

  const { addNewAddOn,fetchAndMergeData,mergedData} = useAddOns(); // Use AddOnsProvider
  const organization_id = localStorage.getItem('organization_id');
  const[addonBranch,setAddonBranch]=useState()


  const handleRequireDependentsChange = (e) => {
    console.log("Checkbox value:", e.target.checked);

    setRequireDependents(e.target.checked);
  };


  const createMainAddOn = async () => {
    const response = await axios.post(
      `${baseUrlPms}/addons/store/`,
      { created_by: userId, updated_by: userId },
      { headers: Headers }
    );
    return response.data.data.id; // Return AddOn ID
  };
  // Function to create an Arabic version of the AddOn
  const createAddOnAr = async (addonsId, AddOnNameAr, AddOnDescAr) => {
    await axios.post(
      `${baseUrlPms}/addons_ar/store/`,
      {
        pms_addons_id: addonsId,
        addons_name_ar: AddOnNameAr,
        addons_description_ar: AddOnDescAr,
      },
      { headers: Headers }
    );
  };

  // Function to create an English version of the room type
  const createAddOnEn = async (addonsId, AddOnNameEn, AddOnDescEn) => {
    await axios.post(
      `${baseUrlPms}/addons_en/store/`,
      {
        pms_addons_id: addonsId,
        addons_name_en: AddOnNameEn,
        addons_description_en: AddOnDescEn,
      },
      { headers: Headers }
    );
  };

  // Function to associate the created room type with selected branches
  const associateAddOnWithBranches = async (addonsId, addonPrice, isRequireDependant) => {
    // Collect all selected branch IDs
    const allSelectedBranchIds = Object.entries(selectedBranches).flatMap(([hotelName, branches]) =>
      Object.keys(branches).map((branchId) => parseInt(branchId))
    );

    // Create association requests for each branch
    const branchPromises = allSelectedBranchIds.map((branchId) =>
      axios.post(
        `${baseUrlPms}/addons_branch/store/`,
        {
          created_by: userId,
          updated_by: userId,
          addons_id: addonsId,
          branch_id: branchId,
          addon_price: addonPrice,
          is_require_dependant: isRequireDependant

        },
        { headers: Headers }
      )

    );

    await Promise.all(branchPromises); // Wait for all API calls to complete
  };

  // Main handler for form submission
  const createAddOn = async (data) => {
    const isCreating = !isEditMode;

    // Ensure at least one branch is selected
    const hasSelectedBranches = Object.values(selectedBranches).some(
      (branches) => Object.keys(branches).length > 0
    );
    if (isCreating &&!hasSelectedBranches) {
      showToast("error", t("msg.selectBranchError"));
      return;
    }
    setIsLoading(true);
    setIsDisabled(true);
    try {
let addonsId;
if(isCreating){
  // Step 1: Create main Room Type and get ID
  const addonsId = await createMainAddOn();
       // Step 2: Create translations for the Room Type
       await Promise.all([
        createAddOnAr(addonsId, data.addons_name_ar, data.addons_description_ar),
        createAddOnEn(addonsId, data.addons_name_en, data.addons_description_en)
      ]);
      
      // Step 3: Associate Room Type with selected branches
      if (hasSelectedBranches) {
        await associateAddOnWithBranches(addonsId, data.addon_price,
          requireDependents);
      }
      
      const newAddOn = {
        id: addonsId,
        pms_addons_en: {
          addons_name_en: data.addons_name_en,
          addons_description_en: data.addons_description_en,
        },
        pms_addons_ar: {
          addons_name_ar: data.addons_name_ar,
          addons_description_ar: data.addons_description_ar,
        },
        addon_price: data.addon_price,
        is_require_dependant: requireDependents,
      };

      addNewAddOn(newAddOn); // Update the context state
}else{
  addonsId=initialData.id;
  
  await Promise.all([
    axios.patch(`${baseUrlPms}/addons/${addonsId}/update/`, {
      ...data,
      updated_by: userId,
      created_by: userId,
      is_require_dependant:requireDependents,
    }, { headers: Headers }),
    axios.patch(`${baseUrlPms}/addons_ar/${addonsId}/update/`, {
      pms_addons_id: addonsId,
      addons_name_ar: data.addons_name_ar,
      addons_description_ar:data.addons_description_ar
    }, { headers: Headers }),
    axios.patch(`${baseUrlPms}/addons_en/${addonsId}/update/`, {
      pms_addons_id: addonsId,
      addons_name_en: data.addons_name_en,
      addons_description_en:data.addons_description_en
    }, { headers: Headers }),
    axios.patch(`${baseUrlPms}/addons_branch/${addonsId}/update/`,{

      created_by:userId,
      updated_by:userId,
      addons_id:addonsId,
      addon_price:data.addon_price,
      is_require_dependant:requireDependents,
  
    },
  
    
    { headers: Headers })
    
  ]);

  showToast("success", t(isCreating ? "msg.addonsMsg" : "msg.updateaddonMsg"));
  reset({});

  setSelectedBranches({});// Clear selected branches
  if (!isCreating) {
    onClose();
  }
  handleClose();
 await fetchAndMergeData();
}
    
 


    }
    catch (error) {
      // Show error message
      showToast("error", t("msg.errorMessage"));
      console.error("Error during AddOn creation:", error);
    } finally {
      setIsLoading(false);
      setIsDisabled(false);
      handleClose();
    }
  };
  const addOnswithBranches=()=>{
    axios.get(`${baseUrlPms}/addons_branch/all/`,{
      params:{organization_id:organization_id},headers:Headers
    }).then((res)=>{
      
      setAddonBranch(res.data.map((addonBranch)=>addonBranch.id))
    }).catch((error)=>{
      console.log(error);
      
    })
  }
useEffect(()=>{addOnswithBranches()},[])
  return (
    <>

      <form
        className={`d-flex flex-wrap justify-content-end ${isDisabled ? "disabled-layer" : ""
          }`}
        onSubmit={handleSubmit(createAddOn)}
      >
        <div className="form-inputs d-flex w-100">
          <div className="input-package mt-3 pe-2 d-flex flex-column w-100">

            <BranchSelector
              mode="AddOn"
              hotels={hotels}
              handleHotelSelection={debouncedHandleHotelSelection}
              handleToggle={debouncedHandleToggle}
              isBranchChecked={isBranchChecked}
              isHotelChecked={isHotelChecked}
              isHotelIndeterminate={isHotelIndeterminate}
              fetchBranches={fetchBranchesForSelectedAddOn}
              branchesTags={branchesTags}
              collectedId={collectedId}
              reset={reset}
              setCollectedId={setCollectedId}
              isEditMode={isEditMode}
              itemId={addOnId}

            />
          </div>
        </div>
        <div className="form-inputs d-flex w-100">

          <InputForrModal
            label={`${t("AddOn")} ${t("input.englishNameLabel")}`}
            type="text"
            placeholder={t("input.englishPlaceholder")}
            register={register}
            name="addons_name_en"
            validationRules={{
              required: t("input.fieldRequired"),
              pattern: {
                value: /^[A-Za-z\s]+$/,
                message: t("input.onlyEnglishAllowed"),
              },
            }}
            errors={errors.addons_name_en}

            className="pe-2 w-50"
          />
          <InputForrModal
            label={`${t("AddOn")} ${t("input.arabicNameLabel")}`}
            type="text"
            placeholder={t("input.arabicPlaceholder")}
            register={register}
            name="addons_name_ar"
            validationRules={{
              required: t("input.fieldRequired"),
              pattern: {
                value: /^[\u0600-\u06FF\s]+$/,
                message: t("input.onlyArabicAllowed"),
              },
            }}
            errors={errors.addons_name_ar}
            className="ps-2 w-50"
          />
        </div>



        <div className="form-inputs d-flex w-100">
          <InputForrModal
            label={t("addOnForms.englishNameDescription")}
            type="text"
            placeholder={t("input.englishPlaceholder")}
            register={register}
            name="addons_description_en"
            validationRules={{
              required: t("input.fieldRequired"),
              pattern: {
                value: /^[A-Za-z\s]+(?:\d+)?$/,
                message: t("input.onlyEnglishAllowed"),
              },
            }}
            errors={errors.addons_description_en}

            className="pe-2 w-50"
          />
          <InputForrModal
            label={t("addOnForms.arabicNameDescription")}
            type="text"
            placeholder={t("input.arabicPlaceholder")}
            register={register}
            name="addons_description_ar"
            validationRules={{
              required: t("input.fieldRequired"),
              pattern: {
                value: /^[\u0600-\u06FF\s]+(?:\d+)?$/,
                message: t("input.onlyArabicAllowed"),
              },
            }}
            errors={errors.addons_description_ar}
            className="ps-2 w-50"
          />
        </div>


        <div className="form-inputs d-flex justify-content-between w-100 ">

          <div className="check-in mb-2 ps-3 mt-3">
            <input
              id="require-dependents"
              className="me-2 "
              type="checkbox"


              {...register("is_require_dependant", {
                onChange: (e) => handleRequireDependentsChange(e),
              })}
            />
            <label htmlFor="require-dependents">Require Dependents</label>
            {requireDependents && (
              <div className="form-inputs d-flex justify-content-between w-100 mt-4">
                <div className="input-package d-flex  align-items-start  ">
                  <div className="check-in mb-2 me-2 ">
                    <input
                      id="price-per-addon"
                      className="me-2"
                      type="radio"
                      value="price_per_addon"
                      {...register("price_type", { required: true })}
                    />
                    <label htmlFor="price-per-addon ">Price Per Addon</label>
                  </div>
                  <div className="check-in mb-2 ">
                    <input
                      id="price-per-dependent"
                      className="me-2"
                      type="radio"
                      value="price_per_dependent"
                      {...register("price_type", { required: true })}
                    />
                    <label htmlFor="price-per-dependent">Price Per Dependent</label>
                  </div>
                </div>
              </div>
            )}
          </div>


          <InputForrModal
            label={t("addOnForms.addOnsPrice")}
            type="text"
            placeholder={t("input.addPrice")}
            register={register}
            name="addon_price"
            validationRules={{
              required: t("input.fieldRequired"),

            }}
            errors={errors.addon_price}
            className="ps-2 w-50"
          />

        </div>



        <FromButton reset={reset} />
      </form >
    </>
  );
};

export default CreateAddOn;
