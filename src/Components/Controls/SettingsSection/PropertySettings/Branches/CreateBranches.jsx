 1*0import { useContext, useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { ModalContext } from "../../../../Helpers/Context/ModalContext";
import { AuthContext } from "../../../../Helpers/Context/AuthContext";
import axios from "axios";
import FromButton from "../../../../Shared/FromButton/FromButton";
import Select from "react-select";
import useHotel from "../../../../Helpers/Hook/useHotel";
import useCountry from "./../../../../Helpers/Hook/useCountry";
import useGovernoraties from "./../../../../Helpers/Hook/useGovernoraties";
import useCities from "./../../../../Helpers/Hook/useCities";
import PhoneInput from "react-phone-number-input";
import { useTranslation } from "react-i18next";
import i18next from "i18next";
import { ToastContext } from "../../../../Helpers/Context/ToastContext ";

const CreateBranches = ({ getBranches }) => {
  const { t } = useTranslation();
  const { language } = i18next;
  const { showToast } = useContext(ToastContext);

  const [selected, setSelected] = useState("");
  const [selectedHotel, setSelectedHotel] = useState(null);
  const onSelect = (code) => setSelected(code);
  const searchable = ("Searchable", false);
  const showSecondaryOptionLabel = ("Show Secondary Option Label", false);
  const { hotels } = useHotel();
  const [showUi, setShowUi] = useState([]);

  const {
    register,
  
    control,
    formState: { errors },
    reset,
  } = useForm({ mode: "all" });

  const { modelState, closeModal, setModelState, handleClose } =
    useContext(ModalContext);

  const {
    baseUrlPms,
    Headers,
    userId,
    setIsLoading,
    setIsDisabled,
    isDisabled,
  } = useContext(AuthContext);

  const { countries } = useCountry();
  const { governates, handleCountryChange } = useGovernoraties();
  const { cities, handleGovernateChange } = useCities();

  const addNewlanguage = (e) => {
    e.preventDefault(); // Prevent form submission
    setShowUi(prev => [
      ...prev,
      {
        id: Date.now() + prev.length, // Unique ID for each element
        value: '' // Optional: store input values
      }
    ]);
  };

  // const [hotelId, setHotelId] = useState();
  const createBranches = async (data) => {
    setIsLoading(true);
    setIsDisabled(true);

    // const hotel_id = data["hotel_id"];
    const branchMain = await axios.post(
      `${baseUrlPms}/unit_reference/store/`,
      {
        created_by: userId,
        updated_by: userId
      },
      {
        headers: Headers,
      }
    );

    const mainId = branchMain.data.data.id;

    const formData = new FormData();
    formData.append("created_by", userId);
    formData.append("updated_by", userId);
    formData.append("unit_reference_id", mainId);
    formData.append("hotel_id", data["hotel_id"].value);
    // formData.append("branch_address", data["branch_address"]);
    formData.append("branch_phone", data["branch_phone"]);
    formData.append("branch_logo", fileName);
    formData.append("branch_email", data["branch_email"]);
    formData.append("branch_website", data["branch_website"]);
    formData.append("city_id", data["city_id"]);

    // console.log(data);    

    try {



      const branchData = await axios.post(
        `${baseUrlPms}/branch/store/`,

        formData,
        {
          headers: Headers,
        }
      );

      const branchId = branchData.data.data.unit_reference_id;

      const branchDataAr = await axios.post(
        `${baseUrlPms}/branch_ar/store/`,
        {
          pms_branch_id: branchId,
          branch_name_ar: data.branch_name_ar,
        },
        {
          headers: Headers,
        }
      );

      const branchDataEn = await axios.post(
        `${baseUrlPms}/branch_en/store/`,
        {
          pms_branch_id: branchId,
          branch_name_en: data.branch_name_en,
        },
        {
          headers: Headers,
        }
      );
      for (let i = 0; i < selectedAddOns.length; i++) {
        const addonsId = selectedAddOns[i].value;

        const addonsBranch = await axios.post(
          `${baseUrlPms}/addons_branch/store/`,
          {
            created_by: userId,
            updated_by: userId,
            addons_id: addonsId,
            branch_id: branchId,
          },
          {
            headers: Headers,
          }
        );
      }
      if (
        (branchData.data &&
          branchDataAr.status &&
          branchDataEn.status === 200) ||
        201
      ) {
        showToast('success', t("msg.branchMSg"));

      }
    } catch (error) {
      showToast('error', t("msg.errorMessage"));

    } finally {
      handleClose();
      getBranches();
      setIsLoading(false);
      setIsDisabled(false)
    }
  };

  const [allOns, setAllOns] = useState([]);
  const [selectedAddOns, setSelectedAddOns] = useState([]);

  const getAllAddOns = () => {
    axios
      .get(`${baseUrlPms}/addons/all/`, {
        headers: Headers,
      })
      .then((res) => {
        setAllOns(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // State to hold the file name
  const [fileName, setFileName] = useState('');

  // Handler to update the file name state
  const handleFileChange = (event) => {
    console.log(event.target.files[0]);

    const file = event.target.files[0];
    setFileName(file ? file : '');
  };
  const clearFileInput = () => {
    setFileName(''); // Reset the state for the file name
    document.getElementById("logo").value = ''; // Clear the file input element
  };

  useEffect(() => {
    getAllAddOns();
  }, []);
  const [image, setImage] = useState(null);
  const [formData, setFormData] = useState({
    userName: "",
    phone: "",
    email: "",
    source: "",
    city: "",
    address: ""
  });

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(URL.createObjectURL(file));
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted", formData);
  };
  const { register, handleSubmit, control, reset, setValue } = useForm();
  const [imagePreview, setImagePreview] = useState(null);

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setImagePreview(URL.createObjectURL(file));
      setValue("branch_logo", file); // Store file in form state
    }
  };

  const onSubmit = (data) => {
    console.log("Form Data:", data);
  };
  return (
    // <>
    //   <form

    //     onSubmit={handleSubmit(createBranches)}
    //   >
    //     <div className="form-inputs custom-form-inputs">
    //       <label className="mb-2">
    //         {`${t("branch")} ${t("input.englishNameLabel")}`}
    //       </label>
    //       <div className="d-flex align-items-center">
    //         <div className="input-package col-9 ">
    //           <input
    //             type="text"
    //             placeholder={t("input.englishPlaceholder")}
    //             className={`px-form-input w-100  ${isDisabled ? 'disabled-input' : ''}`}
    //             {...register("branch_name_en", {
    //               required: true,
    //               pattern: /^[A-Za-z\s]+(?:\d+)?$/,
    //             })}
    //             disabled={isDisabled}
    //           />
    //           {errors?.branch_name_en?.type === "required" && (
    //             <p className="text-danger">{t("input.fieldRequired")}</p>
    //           )}
    //           {errors?.branch_name_en?.type === "pattern" && (
    //             <p className="text-danger">{t("input.onlyEnglishAllowed")}</p>
    //           )}
    //         </div>
    //         <div className="d-flex align-items-center ms-2 col-3">
    //           <button className="btn btn-outline-primary w-100  " onClick={addNewlanguage}>+</button>
    //         </div>
    //       </div>
    //     </div>
    //     {showUi.map((item, index) => (
    //       <div key={item.id} className="form-inputs custom-form-inputs mt-3 d-flex align-items-center">
    //         <div className="col-6">
    //           <label>
    //             {`${t("branch")} ${t("input.englishNameLabel")} `}
    //           </label>
    //           <input
    //             type="text"
    //             placeholder={t("input.englishPlaceholder")}
    //             className={`px-form-input w-100 mt-3${isDisabled ? 'disabled-input' : ''}`}
    //             {...register(`branch_name_en_${item.id}`, {
    //               required: true,
    //               pattern: /^[A-Za-z\s]+(?:\d+)?$/,
    //             })}
    //             disabled={isDisabled}
    //           />
    //         </div>
    //         <div className="col-3 mt-4">
    //           <select name="" id="" className="form-select" onChange={(e) => onSelect(e.target.value)}>
    //             <option value="ar">Ar</option>
    //             <option value="en">En</option>
    //           </select>
    //         </div>
    //         <div className="col-2 mt-5 ">
    //           <button className="btn btn-danger w-50"  onClick={() => setShowUi(prev => prev.filter(el => el.id !== item.id))}>-</button>
    //         </div>
    //         {/* Add similar error messages for each input if needed */}
    //       </div>
    //     ))}

    //     {/* 
    //     <div className="form-inputs d-flex w-100 px-3 form-inputs-row">
    //       <div className="input-package mt-3 d-flex flex-column w-100">
    //         <label className="mb-2">{t("hotel")}</label>
    //         <Controller
    //           control={control}
    //           name="hotel_id"
    //           rules={{ required: true }}
    //           render={({ field }) => (
    //             <Select
    //               {...field}
    //               isMulti
    //               placeholder={`${t("selectInput.choose")} ${t("hotel")}`}
    //               options={
    //                 hotels &&
    //                 hotels.map((hotel) => ({
    //                   value: hotel.hotel_id,
    //                   label:
    //                     language === "ar"
    //                       ? hotel?.hotel_info?.pms_hotel_ar.hotel_name_ar
    //                       : hotel?.hotel_info?.pms_hotel_en.hotel_name_en,
    //                 }))
    //               }
    //               isClearable
    //               value={selectedHotel}
    //               onChange={(selectedOption) => {
    //                 setSelectedHotel(selectedOption);
    //                 field.onChange(selectedOption);
    //               }}
    //               className={`border-0 test border-05 w-100 ${isDisabled ? "disabled-input" : ""
    //                 } `}
    //               classNamePrefix="select"
    //               disabled={isDisabled}
    //             />
    //           )}
    //         />
    //         {errors["hotel_id"] && (
    //           <p className="text-danger m-0">{t("input.fieldRequired")}</p>
    //         )}
    //       </div>
    //     </div> */}
    //     {/* addons select */}
    //     {/* <div className="form-inputs d-flex w-100 px-3">
    //       <div className="input-package mt-3 d-flex flex-column w-100">
    //         <label className="mb-2">{`${t("selectInput.select")} ${t("hotel")}`}</label>
           
    //         <Controller
    //           control={control}
    //           name="hotel_id"
    //           render={({ field }) => (
    //             <Select
    //               {...field}
    //               placeholder={`${t("selectInput.choose")} ${t("hotel")}`}
    //               options={hotels.map((hotel) => ({
    //                 value: hotel.hotel_id,
    //                 label: language === "ar"
    //                   ? hotel?.hotel_info?.pms_hotel_ar?.hotel_name_ar
    //                   : hotel?.hotel_info?.pms_hotel_en?.hotel_name_en

    //               }))}
    //               isClearable
    //               // value={ho ? { value: selectedHotel, label: hotels.find(hotel => hotel.id === selectedHotel)?.hotel_info?.pms_hotel_en?.hotel_name_en } : null}
    //               // onChange={(selectedOption) => {
    //               //   setSelectedHotel(selectedOption ? selectedOption.value : null);
    //               //   field.onChange(selectedOption);
    //               // }}
    //               className={`border-0 test border-05 w-100 ${isDisabled ? 'disabled-input' : ''} `}
    //               classNamePrefix="select"
    //               disabled={isDisabled}
    //             />
    //           )}
    //         />
    //       </div>
    //     </div> */}

    //     {/* <div className="form-inputs d-flex justify-content-between w-100 px-3 custom-form-inputs form-inputs-row">
    //       <div className="input-package mt-3 d-flex flex-column w-30 styleSelect">
    //         <label className="mb-2 modal-label" htmlFor="country">
    //           {t("geoLocationTabs.country")}
    //         </label>
    //         <select
    //           name="country"
    //           className={`px-login-input ${isDisabled ? 'disabled-input' : ''} `}
    //           onChange={handleCountryChange}
    //           disabled={isDisabled}
    //         >
    //           <option value="" selected>
    //             {`${t("selectInput.choose")} ${t("geoLocationTabs.country")}`}
    //           </option>
    //           {countries &&
    //             countries.map((country) => (
    //               <option key={country.id} value={country.id}>
    //                 {country?.pms_country_en?.country_name_en}
    //               </option>
    //             ))}
    //         </select>
    //       </div>
    //       <div className="input-package mt-3 d-flex flex-column w-30">
    //         <label className="mb-2 modal-label" htmlFor="governorate">
    //           {t("geoLocationTabs.governorate")}
    //         </label>
    //         <select
    //           name="governorate"
    //           id="governorate"
    //           className={`px-login-input ${isDisabled ? 'disabled-input' : ''} `}
    //           onChange={handleGovernateChange}
    //           disabled={isDisabled}
    //         >
    //           <option value="" selected>
    //             {`${t("selectInput.choose")} ${t("geoLocationTabs.governorates")}
    //        `}
    //           </option>
    //           {governates &&
    //             governates.map((governate) => (
    //               <option key={governate.id} value={governate.id}>
    //                 {governate.pms_governorate_en.governorate_name_en}
    //               </option>
    //             ))}
    //         </select>
    //       </div>
    //       <div className="input-package mt-3 d-flex flex-column w-30">
    //         <label className="mb-2 modal-label" htmlFor="city">
    //           {t("geoLocationTabs.city")}
    //         </label>
    //         <select
    //           name="city"
    //           id="city"
    //           className={`px-login-input ${isDisabled ? 'disabled-input' : ''} `}
    //           {...register("city_id")}
    //           disabled={isDisabled}
    //         >
    //           <option value="">
    //             {`${t("selectInput.choose")} ${t("geoLocationTabs.city")}`}
    //           </option>
    //           {cities &&
    //             cities.map((city) => (
    //               <option key={city.id} value={city.id}>
    //                 {city.pms_city_en.city_name_en}
    //               </option>
    //             ))}
    //         </select>
    //       </div>
    //     </div> */}

    //     <div className="form-inputs px-3 custom-form-inputs form-inputs-row">
    //       <div className="input-package mt-3 d-flex flex-column input-package-columns">
    //         <label className="mb-2 modal-label" htmlFor="country">
    //           {t("geoLocationTabs.country")}
    //         </label>
    //         <select
    //           name="country"
    //           className={`px-login-input ${isDisabled ? 'disabled-input' : ''}`}
    //           onChange={handleCountryChange}
    //           disabled={isDisabled}
    //         >
    //           <option value="" selected>
    //             {`${t("selectInput.choose")} ${t("geoLocationTabs.country")}`}
    //           </option>
    //           {countries &&
    //             countries.map((country) => (
    //               <option key={country.id} value={country.id}>
    //                 {country?.pms_country_en?.country_name_en}
    //               </option>
    //             ))}
    //         </select>
    //       </div>

    //     </div>

    //     <div className="form-inputs d-flex justify-content-between w-100 px-3 custom-form-inputs form-inputs-row">
    //       <div className="input-package mt-3 d-flex flex-column input-package-columns">
    //         <label className="mb-2 modal-label" htmlFor="governorate">
    //           {t("geoLocationTabs.governorate")}
    //         </label>
    //         <select
    //           name="governorate"
    //           id="governorate"
    //           className={`px-login-input ${isDisabled ? 'disabled-input' : ''}`}
    //           onChange={handleGovernateChange}
    //           disabled={isDisabled}
    //         >
    //           <option value="" selected>
    //             {`${t("selectInput.choose")} ${t("geoLocationTabs.governorates")}`}
    //           </option>
    //           {governates &&
    //             governates.map((governate) => (
    //               <option key={governate.id} value={governate.id}>
    //                 {governate.pms_governorate_en.governorate_name_en}
    //               </option>
    //             ))}
    //         </select>
    //       </div>
    //     </div>

    //     <div className="form-inputs d-flex justify-content-between w-100 px-3 custom-form-inputs form-inputs-row">
    //       <div className="input-package mt-3 d-flex flex-column input-package-columns">
    //         <label className="mb-2 modal-label" htmlFor="city">
    //           {t("geoLocationTabs.city")}
    //         </label>
    //         <select
    //           name="city"
    //           id="city"
    //           className={`px-login-input ${isDisabled ? 'disabled-input' : ''}`}
    //           {...register("city_id")}
    //           disabled={isDisabled}
    //         >
    //           <option value="">
    //             {`${t("selectInput.choose")} ${t("geoLocationTabs.city")}`}
    //           </option>
    //           {cities &&
    //             cities.map((city) => (
    //               <option key={city.id} value={city.id}>
    //                 {city.pms_city_en.city_name_en}
    //               </option>
    //             ))}
    //         </select>
    //       </div>
    //     </div>

    //     <div className="form-inputs d-flex w-100 px-3 form-inputs-row">
    //       <div className="input-package mt-3 pe-2 d-flex flex-column w-100">
    //         <label className="mb-2">{t("input.addressEnDetails")}</label>
    //         <input
    //           type="text"
    //           placeholder={t("input.addressPlaceholder")}
    //           className={`px-form-input w-100 ${isDisabled ? "disabled-input" : ""
    //             } `}
    //           {...register("branch_address_en", {
    //             pattern: /^[A-Za-z\s]+(?:\d+)?$/,
    //           })}
    //           disabled={isDisabled}
    //         />
    //         {errors?.branch_address_en?.type === "pattern" && (
    //           <p className="text-danger m-0">{t("input.onlyEnglishAllowed")}</p>
    //         )}
    //       </div>

    //     </div>
    //     <div className="form-inputs d-flex w-100 px-3 form-inputs-row">

    //       <div className="input-package mt-3 pe-2 d-flex flex-column w-100">
    //         <label className="mb-2">{t("input.addressArDetails")}</label>
    //         <input
    //           type="text"
    //           placeholder={t("input.addressPlaceholder")}
    //           className={`px-form-input w-100 ${isDisabled ? "disabled-input" : ""
    //             } `}
    //           {...register("branch_address_ar", {
    //             pattern: /^[\u0600-\u06FF\s]+(?:\d+)?$/,
    //           })}
    //           disabled={isDisabled}
    //         />
    //         {errors?.branch_address_ar?.type === "pattern" && (
    //           <p className="text-danger m-0">{t("input.onlyArabicAllowed")}</p>
    //         )}
    //       </div>
    //     </div>

    //     <div className="form-inputs d-flex w-100 form-inputs-row">
    //       <div className="input-package mt-3 d-flex flex-wrap px-3 w-100">
    //         <label className="mb-2 w-100">{t("input.phone")}</label>

    //         <Controller
    //           name="branch_phone"
    //           control={control}
    //           rules={{ required: true }}
    //           render={({ field: { onChange, value } }) => (
    //             <PhoneInput
    //               international
    //               countryCallingCodeEditable={false}
    //               defaultCountry="EG"
    //               value={value}
    //               onChange={onChange}
    //               // className={`px-form-input w-100 ${isDisabled ? "disabled-input" : ""
    //               //   }`}
    //               disabled={isDisabled}

    //             />
    //           )}
    //         />

    //         {errors["branch_phone"] && (
    //           <p className="text-danger">{t("input.phoneFieldRequired")}</p>
    //         )}
    //       </div>
    //     </div>

    //     <div className="form-inputs d-flex w-100 px-3 form-inputs-row">
    //       <div className="input-package mt-3  d-flex flex-column w-100">
    //         <label className="mb-2">{t("input.email")}</label>
    //         <input
    //           type="text"
    //           placeholder={t("input.emailPlaceholder")}
    //           className={`px-form-input w-100 ${isDisabled ? 'disabled-input' : ''} `}
    //           {...register("branch_email", {
    //             required: true,
    //             // pattern: /^[\u0600-\u06FF\s]+(?:\d+)?$/,
    //           })}
    //           disabled={isDisabled}
    //         />
    //         {errors?.branch_email?.type === "required" && (
    //           <p className="text-danger ">{t("input.fieldRequired")}</p>
    //         )}
    //         {/* {errors?.branch_email?.type === "pattern" && (
    //             <p className="text-danger ">{t("input.onlyArabicAllowed")}</p>
    //           )} */}
    //       </div>
    //     </div>

    //     <div className="form-inputs d-flex w-100 px-3 form-inputs-row">
    //       <div className="input-package mt-3 d-flex flex-column w-100">
    //         <label className="mb-2">{t("input.website")}</label>
    //         <input
    //           type="text"
    //           placeholder={t("input.websitePlaceholder")}
    //           className={`px-form-input w-100 ${isDisabled ? 'disabled-input' : ''} `}
    //           {...register("branch_website", {
    //             required: true,
    //             // pattern: /^[\u0600-\u06FF\s]+(?:\d+)?$/,
    //           })}
    //           disabled={isDisabled}
    //         />
    //         {errors?.branch_website?.type === "required" && (
    //           <p className="text-danger ">{t("input.fieldRequired")}</p>
    //         )}
    //         {/* {errors?.branch_website?.type === "pattern" && (
    //             <p className="text-danger ">{t("input.onlyArabicAllowed")}</p>
    //           )} */}
    //       </div>
    //     </div>
    //     <div className="form-inputs d-flex w-100 px-3 form-inputs-row">
    //       <div className="input-package custom-upload-input mt-3 d-flex flex-column w-100">
    //         {/* <label className="mb-2">Logo</label>
    //         <input
    //           type="file"
    //           placeholder="Add Logo +"
    //           className="px-form-input w-100 text-center"
    //           {...register("branch_logo")}
    //         /> */}
    //         <label className="mb-2 " htmlFor="logo">
    //           {t("input.logo")}
    //         </label>
    //         <label
    //           className={`mb-2  ${fileName ? "" : "custom-upload-label"} px-form-input d-flex justify-content-center ${isDisabled ? 'disabled-input' : ''} `}
    //           htmlFor="logo"
    //         >
    //           {fileName?.name || t("input.addlogo")}
    //           {fileName?.name ? "" : <i className="fa-sharp fa-light fa-plus p-1"></i>}
    //         </label>
    //         <input
    //           id="logo"
    //           type="file"
    //           className={`custom-upload-input ${isDisabled ? 'disabled-input' : ''} `}
    //           {...register("branch_logo")}
    //           disabled={isDisabled}
    //           onChange={handleFileChange}
    //         />
    //       </div>
    //     </div>

    //     <FromButton reset={reset} clearFileInput={clearFileInput} />
    //   </form>
    // </>
    <>
    
    {/* <div className="p-6 bg-white rounded-lg shadow-md w-96 mx-auto">
      <h2 className="text-xl font-semibold mb-4">Add Contact</h2>
      <form onSubmit={handleSubmit}>
        <div className="flex flex-col items-center mb-4">
          <label className="relative cursor-pointer">
            <input type="file" accept="image/*" className="hidden" onChange={handleImageChange} />
            <div className="w-24 h-24 border rounded-full flex items-center justify-center bg-gray-200">
              {image ? <img src={image} alt="Uploaded" className="w-full h-full rounded-full object-cover" /> : <span className="text-gray-400">📷</span>}
            </div>
          </label>
        </div>

        <input type="text" name="userName" placeholder="Enter Name" value={formData.userName} onChange={handleChange} className="w-full p-2 border rounded mb-2" required />
        
        <PhoneInput international defaultCountry="EG" value={formData.phone} onChange={(value) => setFormData({ ...formData, phone: value })} className="w-full p-2 border rounded mb-2" required />
        
        <input type="email" name="email" placeholder="Enter Email" value={formData.email} onChange={handleChange} className="w-full p-2 border rounded mb-2" required />
        
        <select name="source" value={formData.source} onChange={handleChange} className="w-full p-2 border rounded mb-2">
          <option value="">Select Source</option>
          <option value="social">Social Media</option>
          <option value="website">Website</option>
        </select>
        
        <select name="city" value={formData.city} onChange={handleChange} className="w-full p-2 border rounded mb-2">
          <option value="">Select City</option>
          <option value="cairo">Cairo</option>
          <option value="alex">Alexandria</option>
        </select>
        
        <input type="text" name="address" placeholder="Enter Address" value={formData.address} onChange={handleChange} className="w-full p-2 border rounded mb-4" required />
        
        <div className="flex justify-between">
          <button type="button" className="border px-4 py-2 rounded" onClick={() => setFormData({ userName: "", phone: "", email: "", source: "", city: "", address: "" })}>Clear</button>
          <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">Create</button>
        </div>
      </form>
    </div> */}
        <form onSubmit={handleSubmit(onSubmit)} className="add-contact-form">
      <h2>Add Contact</h2>

      {/* Image Upload Section */}
      <div className="image-upload">
        {imagePreview ? (
          <img src={imagePreview} alt="Preview" className="preview-img" />
        ) : (
          <div className="placeholder-img">📷</div>
        )}
        <input
          type="file"
          accept="image/*"
          onChange={handleImageUpload}
          className="file-input"
        />
        <label className="upload-button">Upload Image</label>
      </div>

      {/* User Information */}
      <label>User Name</label>
      <input type="text" placeholder="Enter Name" {...register("user_name")} />

      <label>Phone Number</label>
      <div className="phone-input">
        <Controller
          name="phone_number"
          control={control}
          render={({ field }) => (
            <PhoneInput
              {...field}
              defaultCountry="EG"
              international
              countryCallingCodeEditable={false}
            />
          )}
        />
      </div>

      <label>Email</label>
      <input type="email" placeholder="Enter Email" {...register("email")} />

      <label>Source</label>
      <select {...register("source")}>
        <option value="">Select Source</option>
        <option value="Website">Website</option>
        <option value="Referral">Referral</option>
      </select>

      <label>City</label>
      <select {...register("city")}>
        <option value="">Select City</option>
        <option value="Cairo">Cairo</option>
        <option value="Alexandria">Alexandria</option>
      </select>

      <label>Address</label>
      <input type="text" placeholder="Enter Address" {...register("address")} />

      {/* Buttons */}
      <div className="form-buttons">
        <button type="button" onClick={() => reset()} className="clear-btn">
          Clear
        </button>
        <button type="submit" className="create-btn">
          Create
        </button>
      </div>
    </form>
    </>
  );
};

export default CreateBranches;
