import React, { useContext, useEffect, useState } from 'react'
import FromButton from '../../../../../Shared/FromButton/FromButton';
import { useForm, useWatch } from 'react-hook-form';
import { ModalContext } from '../../../../../Helpers/Context/ModalContext';
import { AuthContext } from '../../../../../Helpers/Context/AuthContext';
import axios from 'axios';
import { useTranslation } from 'react-i18next';
import { ToastContext } from '../../../../../Helpers/Context/ToastContext ';
import useBranchSelection from '../../../../../Helpers/Hook/useBranchSelection';
import { useData } from '../../../../../Helpers/Context/useData';
import BranchSelector from '../../../../../Shared/BranchSelector/BranchSelector';
import InputForrModal from '../../../../../Shared/InputForModal/InputForrModal';

const CreateCustomerType = ({ isEditMode, initialData, onClose ,fetchBranchesForSelectedCustomerType,
    branchesTags,
    collectedId,
    setCollectedId,}) => {
        console.log(branchesTags);
        
    const { t } = useTranslation();
    const { showToast } = useContext(ToastContext);
    const { baseUrlPms, Headers, userId, setIsLoading, setIsDisabled, } = useContext(AuthContext);
    const { handleClose } = useContext(ModalContext);
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
        setValue,
        control,
    } = useForm({
        defaultValues: isEditMode
            ? {
                customer_type_name_en: initialData?.customer_type_name_en || '',
                customer_type_name_ar: initialData?.customer_type_name_ar || '',
                customer_type_percentage: initialData?.customer_type_percentage || '',
            }
            : {},
        mode: 'all',
    });
    const { fetchData } = useData();
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

    const [percentageValue, setPercentageValue] = useState(initialData?.customer_type_percentage || "");
    const handleMinusClick = () => {
        if (!String(percentageValue).startsWith("-")) { // Convert to string
            const updatedValue = `-${percentageValue || "0"}`;
            setPercentageValue(updatedValue);
            setValue("customer_type_percentage", updatedValue); // Sync with form
        }
    };
    const handlePlusClick = () => {
        if (String(percentageValue).startsWith("-")) { // Convert to string
            const updatedValue = String(percentageValue).slice(1);
            setPercentageValue(updatedValue);
            setValue("customer_type_percentage", updatedValue); // Sync with form
        }
    };


    const handleInputChange = (e) => {
        const value = e.target.value;
        setPercentageValue(value);
        setValue('customer_type_percentage', value); // Sync with form

    };

    const customerTypeId = isEditMode ? initialData?.id : null;
    const customerTypeNameAr = useWatch({ control, name: 'customer_type_name_ar' });
    const customerTypeNameEn = useWatch({ control, name: 'customer_type_name_en' });
    const isDisabled = !(customerTypeNameAr?.length > 0 && customerTypeNameEn?.length > 0);

    const createMainCustomerType = async (data) => {
        const response = await axios.post(
            `${baseUrlPms}/customer_type/store/`,
            {
                created_by: userId,
                updated_by: userId,
                customer_type_percentage: percentageValue,
            },
            { headers: Headers }
        );
        return response.data.data.id;
    };

    const createCustomerTypeAr = async (customerTypeId, nameAr) => {
        await axios.post(
            `${baseUrlPms}/customer_type_ar/store/`,
            {
                pms_customer_type_id: customerTypeId,
                customer_type_name_ar: nameAr,
            },
            { headers: Headers }
        );
    };

    const createCustomerTypeEn = async (customerTypeId, nameEn) => {
        await axios.post(
            `${baseUrlPms}/customer_type_en/store/`,
            {
                pms_customer_type_id: customerTypeId,
                customer_type_name_en: nameEn,
            },
            { headers: Headers }
        );
    };

    const associateCustomerTypeWithBranches = async (customerTypeId) => {
        const allSelectedBranchIds = Object.entries(selectedBranches).flatMap(([hotelName, branches]) =>
            Object.keys(branches).map((branchId) => parseInt(branchId))
        );
        const branchPromises = allSelectedBranchIds.map((branchId) =>
            axios.post(
                `${baseUrlPms}/customer_type_branch/store/`,
                {
                    created_by: userId,
                    updated_by: userId,
                    customer_type_id: customerTypeId,
                    branch_id: branchId,
                },
                { headers: Headers }
            )
        );

        await Promise.all(branchPromises);
    };

    const handleCreateCustomerType = async (data) => {
        const isCreating = !isEditMode;
        const hasSelectedBranches = Object.values(selectedBranches).some(
            (branches) => Object.keys(branches).length > 0
        );

        if (isCreating && !hasSelectedBranches) {
            showToast('error', t('msg.selectBranchError'));
            return;
        }

        setIsLoading(true);
        setIsDisabled(true);

        try {
            let customerTypeId;

            if (isCreating) {
                customerTypeId = await createMainCustomerType(data);
                await Promise.all([
                    createCustomerTypeAr(customerTypeId, data.customer_type_name_ar),
                    createCustomerTypeEn(customerTypeId, data.customer_type_name_en),
                ]);
                if (hasSelectedBranches) {
                    await associateCustomerTypeWithBranches(customerTypeId);
                }
            } else {
                customerTypeId = initialData.id;
                await Promise.all([
                    axios.patch(
                        `${baseUrlPms}/customer_type/${customerTypeId}/update/`,
                        {
                            ...data,
                            updated_by: userId,
                            created_by: userId,
                            customer_type_percentage: percentageValue,
                        },
                        { headers: Headers }
                    ),
                    axios.patch(
                        `${baseUrlPms}/customer_type_ar/${customerTypeId}/update/`,
                        {
                            pms_customer_type_id: customerTypeId,
                            customer_type_name_ar: data.customer_type_name_ar,
                        },
                        { headers: Headers }
                    ),
                    axios.patch(
                        `${baseUrlPms}/customer_type_en/${customerTypeId}/update/`,
                        {
                            pms_customer_type_id: customerTypeId,
                            customer_type_name_en: data.customer_type_name_en,
                        },
                        { headers: Headers }
                    ),
                ]);
            }

            showToast('success', t(isCreating ? 'msg.customerTypeMsg' : 'msg.updateCustomerTypeMsg'));
            reset();
            setSelectedBranches({});
            if (!isCreating) {
                onClose();
            }
            handleClose();
            fetchData();
        } catch (error) {
            showToast('error', t('msg.errorMessage'));
            console.error('Error during Channel Booking creation:', error);
        } finally {
            setIsLoading(false);
            setIsDisabled(false);
        }
    };

    useEffect(() => {
        if (isEditMode && initialData) {

            fetchBranchesForSelectedCustomerType(initialData.id);
        }
    }, []);
    // const createCustomerType = async (data) => {
    //     setIsLoading(true);
    //     setIsDisabled(true);
    //     try {
    //         const customerTypeData = await axios.post(
    //             `${baseUrlPms}/customer_type/store/`,
    //             {
    //                 created_by: userId,
    //                 updated_by: userId,
    //                 customer_type_percentage: data.customer_type_percentage,
    //             },
    //             {
    //                 headers: Headers,
    //             }
    //         );

    //         const customerTypeId = customerTypeData.data.data.id;

    //         const customerTypeDataAr = await axios.post(
    //             `${baseUrlPms}/customer_type_ar/store/`,
    //             {
    //                 pms_customer_type_id: customerTypeId,
    //                 customer_type_name_ar: data.customer_type_name_ar,
    //             },


    //             {
    //                 headers: Headers,
    //             }
    //         );

    //         const customerTypeDataEn = await axios.post(
    //             `${baseUrlPms}/customer_type_en/store/`,
    //             {
    //                 pms_customer_type_id: customerTypeId,
    //                 customer_type_name_en: data.customer_type_name_en,
    //             },
    //             {
    //                 headers: Headers,
    //             }
    //         );

    //         if (
    //             // eslint-disable-next-line no-constant-condition
    //             (customerTypeData.status &&
    //                 customerTypeDataEn.status &&
    //                 customerTypeDataAr.status === 200) ||
    //             201
    //         ) {
    //             showToast('success', t("msg.customerTypeMsg"));

    //         }
    //     } catch (error) {
    //         // setModelState({
    //         //     status: "error",
    //         //     message:
    //         //         error.response?.data?.currency_name_ar?.[0] ||
    //         //         error.response?.data?.currency_name_en?.[0] ||
    //         //         error.response?.data?.non_field_errors?.[0] ||
    //         //         error.response?.data?.currency_symbol?.[0],
    //         // });
    //         showToast('error', t("msg.errorMessage"));

    //     } finally {
    //         handleClose();
    //         reset();
    //         setIsLoading(false);
    //         setIsDisabled(false);
    //     }
    // };

    return (
        <>
       <form className="d-flex flex-wrap justify-content-end" onSubmit={handleSubmit(handleCreateCustomerType)}>
      <div className="form-inputs d-flex w-100">
        <div className="input-package mt-3 pe-2 d-flex flex-column w-100">
          <BranchSelector
            mode="CustomerType"
            hotels={hotels}
            handleHotelSelection={handleHotelSelection}
            handleToggle={handleToggle}
            isBranchChecked={isBranchChecked}
            isHotelChecked={isHotelChecked}
            isHotelIndeterminate={isHotelIndeterminate}
            fetchBranches={fetchBranchesForSelectedCustomerType}
            branchesTags={branchesTags}
            collectedId={collectedId}
            reset={reset}
            setCollectedId={setCollectedId}
            isEditMode={isEditMode}
            itemId={customerTypeId}
          />

          <div className="form-inputs form-margin d-flex w-100 ">
            <InputForrModal
              label= {`${t("customer-type")} ${t("input.englishNameLabel")}`}
              type="text"
              placeholder={t('input.englishPlaceholder')}
              register={register}
              name="customer_type_name_en"
              validationRules={{
                required: t('input.fieldRequired'),
                pattern: {
                  value: /^[A-Za-z\s]+$/,
                  message: t('input.onlyEnglishAllowed'),
                },
              }}
              errors={errors.customer_type_name_en}
              className="pe-2 w-50"
            />
            <InputForrModal
              label={`${t('customer-type')} ${t('input.arabicNameLabel')}`}
              type="text"
              placeholder={t('input.arabicPlaceholder')}
              register={register}
              name="customer_type_name_ar"
              validationRules={{
                required: t('input.fieldRequired'),
                pattern: {
                  value: /^[\u0600-\u06FF\s]+$/,
                  message: t('input.onlyArabicAllowed'),
                },
              }}
              errors={errors.customer_type_name_ar}
              className="ps-2 w-50"
            />
          </div>

          <div className="form-inputs d-flex w-100 ms-2">
            <div className="input-package mt-3 pe-2 d-flex flex-column w-50">
              <label className="mb-2" htmlFor="customer_type_percentage">
                {t('percentage.percentage')}
              </label>
              <div className="booking_percentage">
                <input
                  type="text"
                  placeholder={t('percentage.percentagePlaceholder')}
                  className="px-form-input w-100"
                  {...register("customer_type_percentage", { required: true })}
                  disabled={isDisabled}
                  value={percentageValue}
                  onChange={handleInputChange}
                />
                <div>
                  <button
                    className="booking_percentage-plus"
                    type="button"
                    onClick={handlePlusClick}
                  >
                    <i className="fa-regular fa-plus"></i>
                  </button>
                  <button
                    className="booking_percentage-minus"
                    type="button"
                    onClick={handleMinusClick}
                  >
                    <i className="fa-regular fa-minus"></i>
                  </button>
                </div>
              </div>
            </div>
          </div>
          <FromButton reset={reset}  buttonLabel={isEditMode ? "Edit" :"Add"} disabled={isDisabled} />
        </div>
      </div>
    </form>
        </>
    );
}

export default CreateCustomerType