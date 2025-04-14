import axios from "axios";
import FromButton from "../../../../../Shared/FromButton/FromButton";
import { useContext, useEffect } from "react";
import { useForm } from "react-hook-form";
import { AuthContext } from "../../../../../Helpers/Context/AuthContext";
import { ModalContext } from "../../../../../Helpers/Context/ModalContext";
import { useTranslation } from "react-i18next";
import { ToastContext } from "../../../../../Helpers/Context/ToastContext ";
import useBranchSelection from "../../../../../Helpers/Hook/useBranchSelection";
import InputForrModal from "../../../../../Shared/InputForModal/InputForrModal";
import BranchSelector from "../../../../../Shared/BranchSelector/BranchSelector";
import { useData } from "../../../../../Helpers/Context/useData";

const CreateCategory = ({ onClose, isEditMode, initialData,fetchBranchesForSelectedCategory,branchesTags,collectedId,setCollectedId }) => {
  const { t } = useTranslation();
  const { showToast } = useContext(ToastContext);
  const{fetchData}=useData();
  const {
    baseUrlPms,
    Headers,
    userId,
    setIsLoading,
    setIsDisabled,
    isDisabled
  } = useContext(AuthContext);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: isEditMode
      ? {
        category_name_en: initialData?.category_name_en || "",
        category_name_ar: initialData?.category_name_ar || "",
      }
      : {},
  });
  const {  handleClose } = useContext(ModalContext);
  const {
    hotels,
    selectedBranches,
    handleToggle,
    handleHotelSelection,
    isBranchChecked,
    isHotelChecked,
    isHotelIndeterminate,
    setSelectedBranches,
  } = useBranchSelection(baseUrlPms, Headers, t, showToast);
  const categoryId = isEditMode ? initialData?.id : null;

  // Create main category
  const createMainCategory = async () => {
    const response = await axios.post(
      `${baseUrlPms}/category/store/`,
      {
        created_by: userId,
        updated_by: userId,
      },
      { headers: Headers }
    );
    return response.data.data.id; // Return category ID
  };
  // Create Arabic category name
  const createCategoryArabic = async (categoryId, categoryNameAr) => {
    await axios.post(
      `${baseUrlPms}/category_ar/store/`,
      {
        pms_category_id: categoryId,
        category_name_ar: categoryNameAr,
      },
      { headers: Headers }
    );
  };
  // Create English category name
  const createCategoryEnglish = async (categoryId, categoryNameEn) => {
    await axios.post(
      `${baseUrlPms}/category_en/store/`,
      {
        pms_category_id: categoryId,
        category_name_en: categoryNameEn,
      },
      { headers: Headers }
    );
  };


  // Associate category with branches
  const associateCategoryWithBranches = async (categoryId) => {
    const allSelectedBranchIds = Object.entries(selectedBranches).flatMap(([hotelName, branches]) =>
      Object.keys(branches).map((branchId) => parseInt(branchId))
    );

    const branchPromises = allSelectedBranchIds.map((branchId) =>
      axios.post(
        `${baseUrlPms}/category_branch/store/`,
        {
          created_by: userId,
          updated_by: userId,
          category_id: categoryId,
          branch_id: branchId,
        },
        { headers: Headers }
      )
    );

    await Promise.all(branchPromises);
  };

  const handleCreateCategory = async (data) => {
    setIsLoading(true);
    setIsDisabled(true);

    try {
      const hasSelectedBranches = Object.values(selectedBranches).some(
        (branches) => Object.keys(branches).length > 0
      );
      let categoryId;

      if (isEditMode) {
        categoryId = initialData.id;

        // Update main vendor details
        await axios.patch(`${baseUrlPms}/category/${categoryId}/update/`, {
          created_by:userId,
          updated_by: userId,
        }, { headers: Headers });

        // Update localized names
        await Promise.all([
          axios.patch(`${baseUrlPms}/category_ar/${categoryId}/update/`, {
            pms_category_id: categoryId,
            category_name_ar: data.category_name_ar,
          }, { headers: Headers }),
          axios.patch(`${baseUrlPms}/category_en/${categoryId}/update/`, {
            pms_category_id: categoryId,
            category_name_en: data.category_name_en,
          }, { headers: Headers }),
        ]);
      } else {
        // Step 1: Create main category
        categoryId = await createMainCategory();

        // Step 2: Create Arabic and English names
        await Promise.all([
          createCategoryArabic(categoryId, data.category_name_ar),
          createCategoryEnglish(categoryId, data.category_name_en),
        ]);

        // Step 3: Associate category with branches
        if (hasSelectedBranches) {
          await associateCategoryWithBranches(categoryId);}
       
      }
      showToast("success", t(isEditMode ? "msg.updateCategoryMsg" : "msg.categoryMsg"));
      reset({});

      setSelectedBranches({});// Clear selected branches
      if (isEditMode) {
        onClose();
      }
      handleClose();
      fetchData();
   
      reset();
      onClose();
    } catch (error) {
      console.error("Error creating/updating category:", error);
      showToast("error", "Failed to create/update category.");
    } finally {
      setIsLoading(false);
      setIsDisabled(false);
    }
  };





  useEffect(() => {
    if (isEditMode && initialData?.id) {
      // Fetch branches only if it's in edit mode and roomTypeId is available
      fetchBranchesForSelectedCategory(initialData.id);
    }
  }, []);

  return (
    <>

      <form onSubmit={handleSubmit(handleCreateCategory)}>
        <div className="form-inputs d-flex w-100">
          <div className="input-package mt-3 pe-2 d-flex flex-column w-100">

            {/* Branch Selector */}
            <BranchSelector
              mode="Category"
              hotels={hotels}
              handleHotelSelection={handleHotelSelection}
              handleToggle={handleToggle}
              isBranchChecked={isBranchChecked}
              isHotelChecked={isHotelChecked}
              isHotelIndeterminate={isHotelIndeterminate}
              setSelectedBranches={setSelectedBranches}
              fetchBranches={fetchBranchesForSelectedCategory}
              branchesTags={branchesTags}
              collectedId={collectedId}
              setCollectedId={setCollectedId}
              isEditMode={isEditMode}
              itemId={categoryId}
            />

          </div>
        </div>


        <div className="form-inputs d-flex w-100">    
               {/* Category English Name */}
      <InputForrModal
        label="Category English Name"
        type="text"
        placeholder="Enter Category English Name"
        register={register}
        name="category_name_en"
        validationRules={{
          required: "English name is required",
        }}
        errors={errors.category_name_en}
      />
            {/* Category Arabic Name */}
            <InputForrModal
        label="Category Arabic Name"
        type="text"
        placeholder="Enter Category Arabic Name"
        register={register}
        name="category_name_ar"
        validationRules={{
          required: "Arabic name is required",
        }}
        errors={errors.category_name_ar}
      />
          </div>
            {/* Submit Button */}
      <FromButton reset={reset} buttonLabel={isEditMode ? "Update Category" : "Create Category"} />
        </form>
        </>
      );
};

      export default CreateCategory;
