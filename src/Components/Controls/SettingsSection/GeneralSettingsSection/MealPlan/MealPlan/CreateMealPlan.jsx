import React, { useContext, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { AuthContext } from '../../../../../Helpers/Context/AuthContext';
import { useTranslation } from 'react-i18next';
import axios from 'axios';
import FromButton from '../../../../../Shared/FromButton/FromButton';
import { ToastContext } from '../../../../../Helpers/Context/ToastContext ';
import { ModalContext } from '../../../../../Helpers/Context/ModalContext';
import { useData } from '../../../../../Helpers/Context/useData';
const CreateMealPlan = ({ isEditMode, initialData, onClose }) => {
  const { t } = useTranslation();
  const { showToast } = useContext(ToastContext);
  const { baseUrlPms, Headers, userId, setIsLoading, setIsDisabled } = useContext(AuthContext);
    const { handleClose } = useContext(ModalContext);
   const { fetchData } = useData();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm({
    defaultValues: isEditMode
      ? {
          accommodation_type_name_en: initialData?.accommodation_type_name_en || '',
          accommodation_type_name_ar: initialData?.accommodation_type_name_ar || '',
        }
      : {},
    mode: 'all',
  });

  const handleCreateOrUpdateMealPlan = async (data) => {
    setIsLoading(true);
    setIsDisabled(true);

    try {
      if (isEditMode) {
        await Promise.all([
          axios.patch(
            `${baseUrlPms}/accommodation_type/${initialData.id}/update/`,
            {
              ...data,
              updated_by: userId,
              created_by: userId,
            },
            { headers: Headers }
          ),
          axios.patch(
            `${baseUrlPms}/accommodation_type_ar/${initialData.id}/update/`,
            {
              pms_accommodation_type_id: initialData.id,
              accommodation_type_name_ar: data.accommodation_type_name_ar,
            },
            { headers: Headers }
          ),
          axios.patch(
            `${baseUrlPms}/accommodation_type_en/${initialData.id}/update/`,
            {
              pms_accommodation_type_id: initialData.id,
              accommodation_type_name_en: data.accommodation_type_name_en,
            },
            { headers: Headers }
          ),
        ]);
        showToast('success', t('msg.updateMealPlanMsg'));
      } else {
        const { data: accommodationData } = await axios.post(
          `${baseUrlPms}/accommodation_type/store/`,
          { created_by: userId, updated_by: userId },
          { headers: Headers }
        );

        const accommodationId = accommodationData.data.id;

        await Promise.all([
          axios.post(
            `${baseUrlPms}/accommodation_type_ar/store/`,
            { pms_accommodation_type_id: accommodationId, accommodation_type_name_ar: data.accommodation_type_name_ar },
            { headers: Headers }
          ),
          axios.post(
            `${baseUrlPms}/accommodation_type_en/store/`,
            { pms_accommodation_type_id: accommodationId, accommodation_type_name_en: data.accommodation_type_name_en },
            { headers: Headers }
          ),
        ]);
        showToast('success', t('msg.mealPlanCreatedMsg'));
      }
      reset();
      if(isEditMode) onClose();
      handleClose();
      fetchData();
    } catch (error) {
      console.error('Error during Meal Plan operation:', error);
      showToast('error', t('msg.errorMessage'));
    } finally {
      setIsLoading(false);
      setIsDisabled(false);
    }
  };

  useEffect(() => {
    if (isEditMode && initialData) {
      setValue('accommodation_type_name_en', initialData.accommodation_type_name_en);
      setValue('accommodation_type_name_ar', initialData.accommodation_type_name_ar);
    }
  }, [isEditMode, initialData]);

  return (
    <form className="d-flex flex-wrap justify-content-end" onSubmit={handleSubmit(handleCreateOrUpdateMealPlan)}>
      <div className="form-inputs d-flex w-100">
        <div className="input-package mt-3 pe-2 d-flex flex-column w-50">
          <label htmlFor="accommodation_type_name_en">{`${t('meal-plan')} ${t('input.englishNameLabel')}`}</label>
          <input
            type="text"
            {...register('accommodation_type_name_en', {
              required: t('input.fieldRequired'),
              pattern: /^[A-Za-z\s]+$/,
            })}
            className="px-form-input w-100"
          />
          {errors.accommodation_type_name_en && <p className="text-danger">{t('input.onlyEnglishAllowed')}</p>}
        </div>
        <div className="input-package mt-3 ps-2 d-flex flex-column w-50">
          <label htmlFor="accommodation_type_name_ar">{`${t('meal-plan')} ${t('input.arabicNameLabel')}`}</label>
          <input
            type="text"
            {...register('accommodation_type_name_ar', {
              required: t('input.fieldRequired'),
              pattern: /^[\u0600-\u06FF\s]+$/,
            })}
            className="px-form-input w-100"
          />
          {errors.accommodation_type_name_ar && <p className="text-danger">{t('input.onlyArabicAllowed')}</p>}
        </div>
      </div>
      <FromButton reset={reset} buttonLabel={isEditMode ? t('edit') : t('add')} />
    </form>
  );
};

export default CreateMealPlan;
