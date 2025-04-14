import axios from "axios";
import FromButton from "../../../../../Shared/FromButton/FromButton";
import { useContext, useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { AuthContext } from "../../../../../Helpers/Context/AuthContext";
import { ModalContext } from "../../../../../Helpers/Context/ModalContext";
import PhoneInput from "react-phone-number-input";
import EditButton from "../../../../../Shared/EditBuuton/EditButton";
import { useTranslation } from "react-i18next";
import { ToastContext } from "../../../../../Helpers/Context/ToastContext ";
import useVendor from "../../../../../Helpers/Hook/useVendor";
import BranchSelector from "../../../../../Shared/BranchSelector/BranchSelector";
import InputForrModal from "../../../../../Shared/InputForModal/InputForrModal";
import useBranchSelection from "../../../../../Helpers/Hook/useBranchSelection";
import { useData } from "../../../../../Helpers/Context/useData";


const CreateVendor = ({ onClose,
  initialData,
  isEditMode,
  branchesTags,
  collectedId,
  setCollectedId,
  fetchBranchesForSelectedVendor, }) => {
  const { t } = useTranslation();
  const { showToast } = useContext(ToastContext);

console.log(initialData);

const{fetchData}=useData();
const vendorId = isEditMode ? initialData?.id : null;
  const { register, handleSubmit, reset, formState: { errors } } = useForm({
    defaultValues: isEditMode
      ? {
        vendor_name_en: initialData?.vendor_name_en || "",
        vendor_name_ar: initialData?.vendor_name_ar || "",
        vendor_email: initialData?.vendor_email || "",
        vendor_mobile: initialData?.vendor_mobile || "",
        vendor_whatsapp_phone: initialData?.vendor_whatsapp_phone || "",
      }
      : {},
  });

  const { setModelState, handleClose } = useContext(ModalContext);

  const {
    baseUrlPms,
    Headers,
    userId,
    isDisabled,
    setIsLoading,
    setIsDisabled

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
  } = useBranchSelection(baseUrlPms, Headers, t, showToast);



  const createMainVendor = async (data) => {
    const response = await axios.post(`${baseUrlPms}/vendor/store/`, {
      created_by: userId,
      updated_by: userId,
      vendor_email: data.vendor_email,
      vendor_mobile: data.vendor_mobile,
      vendor_whatsapp_phone: data.vendor_whatsapp_phone,
    }, { headers: Headers });
    return response.data.data.id; // Return the vendor_id
  };
  const createVendorArabic = async (vendorId, vendorNameAr) => {
    await axios.post(`${baseUrlPms}/vendor_ar/store/`, {
      pms_vendor_id: vendorId,
      vendor_name_ar: vendorNameAr,
    }, { headers: Headers });
  };
  const createVendorEnglish = async (vendorId, vendorNameEn) => {
    await axios.post(`${baseUrlPms}/vendor_en/store/`, {
      pms_vendor_id: vendorId,
      vendor_name_en: vendorNameEn,
    }, { headers: Headers });
  };
  // Associate vendor with branches
  const associateVendorWithBranches = async (vendorId) => {
    const allSelectedBranchIds = Object.entries(selectedBranches).flatMap(([hotelName, branches]) =>
      Object.keys(branches).map((branchId) => parseInt(branchId))
    );
    const branchPromises = allSelectedBranchIds.map((branchId) =>
      axios.post(
        `${baseUrlPms}/vendor_branch/store/`,
        {
          created_by: userId,
          updated_by: userId,
          vendor_id: vendorId,
          branch_id: branchId,
        },
        { headers: Headers }
      )
    );

    await Promise.all(branchPromises); // Wait for all API calls to complete
  };
  // Handle form submission
  const handleCreateVendor = async (data) => {
    setIsLoading(true);
    setIsDisabled(true);

    try {
      const hasSelectedBranches = Object.values(selectedBranches).some(
        (branches) => Object.keys(branches).length > 0
      );
      let vendorId;

      if (isEditMode) {
        vendorId = initialData.id;

        // Update main vendor details
        await axios.patch(`${baseUrlPms}/vendor/${vendorId}/update/`, {
          vendor_email: data.vendor_email,
          vendor_mobile: data.vendor_mobile,
          vendor_whatsapp_phone: data.vendor_whatsapp_phone,
          updated_by: userId,
        }, { headers: Headers });

        // Update localized names
        await Promise.all([
          axios.patch(`${baseUrlPms}/vendor_ar/${vendorId}/update/`, {
            vendor_name_ar: data.vendor_name_ar,
          }, { headers: Headers }),
          axios.patch(`${baseUrlPms}/vendor_en/${vendorId}/update/`, {
            vendor_name_en: data.vendor_name_en,
          }, { headers: Headers }),
        ]);
      } else {
        // Step 1: Create main vendor
        vendorId = await createMainVendor(data);

        // Step 2: Create Arabic and English names
        await Promise.all([
          createVendorArabic(vendorId, data.vendor_name_ar),
          createVendorEnglish(vendorId, data.vendor_name_en),
        ]);

        // Step 3: Associate vendor with branches
        if (hasSelectedBranches) {
        await associateVendorWithBranches(vendorId);}
      }

      showToast("success", t(isEditMode ? "msg.updateVendorMsg" : "msg.vendorMsg"));
      reset({});

      setSelectedBranches({});// Clear selected branches
      if (isEditMode) {
        onClose();
      }
      handleClose();
      fetchData();
    } catch (error) {
      console.error("Error creating/updating vendor:", error);
      showToast("error", "Failed to create/update vendor.");
    } finally {
      setIsLoading(false);
      setIsDisabled(false);
    }
  };

  useEffect(() => {
    if (isEditMode && initialData?.id) {
      // Fetch branches only if it's in edit mode and roomTypeId is available
      fetchBranchesForSelectedVendor(initialData.id);
    }
  }, []);
  return (
    <form onSubmit={handleSubmit(handleCreateVendor)}>
      <div className="form-inputs d-flex w-100">
        <div className="input-package mt-3 pe-2 d-flex flex-column w-100">
          {/* Branch Selector */}
          <BranchSelector
            mode="Vendor"
            hotels={hotels}
            handleHotelSelection={handleHotelSelection}
            handleToggle={handleToggle}
            isBranchChecked={isBranchChecked}
            isHotelChecked={isHotelChecked}
            isHotelIndeterminate={isHotelIndeterminate}
            branchesTags={branchesTags}
            collectedId={collectedId}
            setCollectedId={setCollectedId}
            setSelectedBranches={setSelectedBranches}
            fetchBranches={fetchBranchesForSelectedVendor}
            isEditMode={isEditMode}
            itemId={vendorId}
          />

        </div>
      </div>
      <div className="form-inputs d-flex w-100">
        {/* Vendor English Name */}
        <InputForrModal
          label="Vendor English Name"
          type="text"
          placeholder="Enter Vendor English Name"
          register={register}
          name="vendor_name_en"
          validationRules={{ required: "English name is required" }}
          errors={errors.vendor_name_en}
        />
        {/* Vendor Arabic Name */}
        <InputForrModal
          label="Vendor Arabic Name"
          type="text"
          placeholder="Enter Vendor Arabic Name"
          register={register}
          name="vendor_name_ar"
          validationRules={{ required: "Arabic name is required" }}
          errors={errors.vendor_name_ar}
        />
      </div>
      <div className="form-inputs d-flex w-100">

      {/* Vendor Mobile */}
      <InputForrModal
        label="Vendor Mobile"
        type="text"
        placeholder="Enter Vendor Mobile"
        register={register}
        name="vendor_mobile"
        validationRules={{ required: "Mobile number is required" }}
        errors={errors.vendor_mobile}
      />

      {/* Vendor WhatsApp */}
      <InputForrModal
        label="Vendor WhatsApp"
        type="text"
        placeholder="Enter Vendor WhatsApp"
        register={register}
        name="vendor_whatsapp_phone"
        validationRules={{ required: "WhatsApp number is required" }}
        errors={errors.vendor_whatsapp_phone}
      />
      </div>
      {/* Vendor Email */}
      <InputForrModal
        label="Vendor Email"
        type="email"
        placeholder="Enter Vendor Email"
        register={register}
        name="vendor_email"
        validationRules={{
          required: "Email is required",
          pattern: {
            value: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
            message: "Invalid email format",
          },
        }}
        errors={errors.vendor_email}
      />








      {/* Submit Button */}
      <FromButton buttonLabel={isEditMode ? "Update Vendor" : "Create Vendor"} />
    </form>
  );
};

export default CreateVendor;
