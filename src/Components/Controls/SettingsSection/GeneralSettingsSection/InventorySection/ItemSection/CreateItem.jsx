import React, { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { AuthContext } from "../../../../../Helpers/Context/AuthContext";
import axios from "axios";
import ErrorModal from "../../../../../Shared/ErrorModal/ErrorModal";
import SuccessModal from "../../../../../Shared/SuccessModal/SuccessModal";
import FromButton from "../../../../../Shared/FromButton/FromButton";
import { ModalContext } from "../../../../../Helpers/Context/ModalContext";
import { useTranslation } from "react-i18next";
import i18next from "i18next";
import { ToastContext } from "../../../../../Helpers/Context/ToastContext ";
import useBranchSelection from "../../../../../Helpers/Hook/useBranchSelection";
import BranchSelector from "../../../../../Shared/BranchSelector/BranchSelector";
import InputForrModal from "../../../../../Shared/InputForModal/InputForrModal";
import CustomBranchSelector from "../../../../../Shared/CustomBranchSelector/CustomBranchSelector";
import { useData } from "../../../../../Helpers/Context/useData";

const CreateItem = ({ onClose = () => { }, isEditMode, initialData }) => {
  const { t } = useTranslation();
  const { language } = i18next;
  const { showToast } = useContext(ToastContext);
  const { baseUrlPms, Headers, userId, setIsLoading, setIsDisabled } = useContext(AuthContext);
 const { handleClose } = useContext(ModalContext);
   const { fetchData } = useData();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
    setValue,

  } = useForm({
    defaultValues: isEditMode
      ? {
        margin: initialData?.margin || "",
        category_id: initialData?.category_id || "",
        product_name_ar: initialData?.product_name_ar || "",
        product_description_ar: initialData?.product_description_ar || "",
        product_name_en: initialData?.product_name_en || "",
        product_description_en: initialData?.product_description_en || "",
        vendor_id: initialData?.vendor_id || "",
        number_of_items: initialData?.number_of_items || "",
        unit_price: initialData?.unit_price || "",
      }
      : {},
  });

  const {
    hotels,
    selectedBranches,
    setSelectedBranches,
  } = useBranchSelection(baseUrlPms, Headers, t, showToast);





  
  const [vendors, setVendors] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedBranch, setSelectedBranch] = useState(null);
  // Fetch categories
  const fetchCategories = async () => {
    try {
      const response = await axios.get(`${baseUrlPms}/category/all/`, { headers: Headers });
      setCategories(response.data); // Assuming API returns categories in `data`
    } catch (error) {
      console.error("Error fetching categories:", error);
      showToast("error", "Failed to fetch categories.");
    }
  };



  // Fetch vendors based on selected branch
  const fetchVendors = async (branchId) => {
    try {
      const response = await axios.get(`${baseUrlPms}/vendor_branch/all/`, {
        headers: Headers,
        params: { branch_id: branchId },
      });
      setVendors(response.data); // Assuming API returns vendors in `data`
    } catch (error) {
      console.error("Error fetching vendors:", error);
      showToast("error", "Failed to fetch vendors.");
    }
  };


  useEffect(() => {
    fetchCategories();
    if (selectedBranch) {
      fetchVendors(selectedBranch);
    }
  }, [selectedBranch]);




  // Create main product
  const createMainProduct = async (data) => {
    const response = await axios.post(
      `${baseUrlPms}/product/store/`,
      {
        created_by: userId,
        updated_by: userId,
        margin: data.margin,
        category_id: data.category_id,
branch_id: selectedBranch,
      },
      { headers: Headers }
    );
    return response.data.data.id; // Return the product_id
  };

  // Create Arabic product details
  const createProductArabic = async (productId, productNameAr, productDescriptionAr) => {
    await axios.post(
      `${baseUrlPms}/product_ar/store/`,
      {
        pms_product_id: productId,
        product_name_ar: productNameAr,
        product_description_ar: productDescriptionAr,
      },
      { headers: Headers }
    );
  };

  // Create English product details
  const createProductEnglish = async (productId, productNameEn, productDescriptionEn) => {
    await axios.post(
      `${baseUrlPms}/product_en/store/`,
      {
        pms_product_id: productId,
        product_name_en: productNameEn,
        product_description_en: productDescriptionEn,
      },
      { headers: Headers }
    );
  };
  // Associate product with vendor
  const associateProductWithVendor = async (productId, data) => {
    await axios.post(
      `${baseUrlPms}/product_vendor/store/`,
      {
        created_by: userId,
        updated_by: userId,
        product_id: productId,
        vendor_id: data.vendor_id,
        number_of_items: data.number_of_items,
        unit_price: data.unit_price,
      },
      { headers: Headers }
    );
  };
  // Handle form submission
  const handleCreateProduct = async (data) => {
    setIsLoading(true);
    setIsDisabled(true);

    try {
      let productId;

      if (isEditMode) {
        // Update logic (if required)
      } else {
        // Step 1: Create main product
        productId = await createMainProduct(data);

        // Step 2: Create Arabic and English product details
        await Promise.all([
          createProductArabic(productId, data.product_name_ar, data.product_description_ar),
          createProductEnglish(productId, data.product_name_en, data.product_description_en),
        ]);
        // Step 3: Associate product with vendor
        await associateProductWithVendor(productId, data);
        showToast("success", t(isEditMode ? "msg.updateProductMsg" : "msg.productCreated"));
      
      }
      if(isEditMode){
        onClose();
      }
reset(setSelectedBranch(null));
handleClose();
fetchData();

    } catch (error) {
      console.error("Error creating/updating product:", error);
      showToast("error", "Failed to create/update product.");
    } finally {
      setIsLoading(false);
      setIsDisabled(false);
    }
  };
  // Handle form submission



  return (
    <>

      <form
        className="d-flex flex-wrap justify-content-end"
        onSubmit={handleSubmit(handleCreateProduct)}
      >
        <div className="form-inputs d-flex w-100">
          <div className="input-package mt-3 pe-2 d-flex flex-column w-100">
        
  <CustomBranchSelector
    hotels={hotels}
    selectedBranch={selectedBranch}
    onBranchSelect={(branchId) => {
      setSelectedBranch(branchId);
      fetchVendors(branchId); // Fetch vendors based on selected branch
    }}
    t={t}
  />

          </div>
        </div>

        <div className="form-inputs d-flex w-100">
          <InputForrModal
            label="Item English Name"
            type="text"
            placeholder="Enter English Name"
            register={register}
            name="product_name_en"
            validationRules={{
              required: "English name is required",
            }}
            errors={errors.product_name_en}
          />

          {/* Arabic Name */}
          <InputForrModal
            label="Item Arabic Name"
            type="text"
            placeholder="Enter Arabic Name"
            register={register}
            name="product_name_ar"
            validationRules={{
              required: "Arabic name is required",
            }}
            errors={errors.product_name_ar}
          />
        </div>

        <div className="form-inputs d-flex col-12 mt-3">
  {/* Vendor ID */}
  <div className="form-row col-6">
            <label>Vendor</label>
            <select
              {...register("vendor_id", { required: "Vendor is required" })}
              className={`form-control ${errors.vendor_id ? "is-invalid" : ""}`}
            >
              <option value="">Choose Vendor</option>
              {vendors.map((vendor) => (
                <option key={vendor.id} value={vendor.id}>
                  {vendor?.vendor_info?.pms_vendor_en?.vendor_name_en}
                </option>
              ))}
            </select>
            {errors.vendor_id && <p className="text-danger">{errors.vendor_id.message}</p>}
          </div>
<div className="form-row col-6 ms-2">
<label>Category</label>
<select
            {...register("category_id", { required: "Category is required" })}
            className={`form-control ${errors.category_id ? "is-invalid" : ""}`}
          >
            <option value="">Choose Category</option>
            {categories?.map((category) => (
              <option key={category.id} value={category.id}>
                {category.pms_category_en?.
                  category_name_en}
              </option>
            ))}
          </select>
          {errors.category_id && <p className="text-danger">{errors.category_id.message}</p>}
</div>
  
        </div>

        <div className="form-inputs d-flex w-100">
          {/* English Description */}
          <InputForrModal
            label="Item English Description"
            type="text"
            placeholder="Enter English Description"
            register={register}
            name="product_description_en"
            validationRules={{
              required: "English description is required",
            }}
            errors={errors.product_description_en}
          />

          {/* Arabic Description */}
          <InputForrModal
            label="Item Arabic Description"
            type="text"
            placeholder="Enter Arabic Description"
            register={register}
            name="product_description_ar"
            validationRules={{
              required: "Arabic description is required",
            }}
            errors={errors.product_description_ar}
          />
        </div>
        <div className="form-inputs d-flex w-100">


{/* Minimum Quantity */}
<InputForrModal
  label="Minimum Quantity"
  type="number"
  placeholder="Enter Minimum Quantity"
  register={register}
  name="number_of_items"
  validationRules={{
    required: "Minimum quantity is required",
  }}
  errors={errors.number_of_items}
/>



</div>
        <FromButton reset={reset} buttonLabel={isEditMode ? "Update Item" : "Create Item"} />
      </form>
    </>
  );
}

export default CreateItem















//   return (
//     <>
//         <form
//         className="d-flex flex-wrap justify-content-end"
//         onSubmit={handleSubmit(handleCreateProduct)}
//       >
  
//      {/* Branch Selector */}

// {/* Custom Branch Selector */}



//         {/* Product Details */}
//         <div className="form-inputs d-flex w-100">
//           <InputForrModal
//             label="Item English Name"
//             type="text"
//             placeholder="Enter English Name"
//             register={register}
//             name="product_name_en"
//             validationRules={{ required: "English name is required" }}
//             errors={errors.product_name_en}
//           />
//           <InputForrModal
//             label="Item Arabic Name"
//             type="text"
//             placeholder="Enter Arabic Name"
//             register={register}
//             name="product_name_ar"
//             validationRules={{ required: "Arabic name is required" }}
//             errors={errors.product_name_ar}
//           />
//         </div>

//         {/* Category Selection */}
//         <div className="form-group w-100">
//           <label>{t("selectCategory")}</label>
//           <select
//             {...register("category_id", { required: "Category is required" })}
//             className={`form-control ${errors.category_id ? "is-invalid" : ""}`}
//           >
//             <option value="">{t("chooseCategory")}</option>
//             {categories.map((category) => (
//               <option key={category.id} value={category.id}>
//                 {category.pms_category_en?.category_name_en}
//               </option>
//             ))}
//           </select>
//           {errors.category_id && <p className="text-danger">{errors.category_id.message}</p>}
//         </div>

//         {/* Vendor Selection */}
//         <div className="form-group w-100">
//           <label>{t("selectVendor")}</label>
//           <select
//             {...register("vendor_id", { required: "Vendor is required" })}
//             className={`form-control ${errors.vendor_id ? "is-invalid" : ""}`}
//           >
//             <option value="">{t("chooseVendor")}</option>
//             {vendors.map((vendor) => (
//               <option key={vendor.id} value={vendor.id}>
//                 {vendor?.vendor_info?.pms_vendor_en?.vendor_name_en}
//               </option>
//             ))}
//           </select>
//           {errors.vendor_id && <p className="text-danger">{errors.vendor_id.message}</p>}
//         </div>

//         <FromButton reset={reset} buttonLabel={isEditMode ? "Update Item" : "Create Item"} />
//       </form>
//     </>
//   );
// };

// export default CreateItem;
