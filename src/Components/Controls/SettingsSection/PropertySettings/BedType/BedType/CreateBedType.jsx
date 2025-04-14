import React, { useContext, useEffect, useState } from 'react'
import { useForm, useWatch } from 'react-hook-form';
import { ModalContext } from '../../../../../Helpers/Context/ModalContext';
import { AuthContext } from '../../../../../Helpers/Context/AuthContext';
import axios from 'axios';
import FromButton from '../../../../../Shared/FromButton/FromButton';
import { useTranslation } from 'react-i18next';
import { ToastContext } from '../../../../../Helpers/Context/ToastContext ';
import useBranchSelection from '../../../../../Helpers/Hook/useBranchSelection';
import BranchSelector from '../../../../../Shared/BranchSelector/BranchSelector';
import InputForrModal from '../../../../../Shared/InputForModal/InputForrModal';
import { useData } from '../../../../../Helpers/Context/useData';


const CreateBedType = ({
  isEditMode,
  initialData,
  onClose,
  fetchBranchesForSelectedBedType,
  branchesTags,
  collectedId,
  setCollectedId,
}) => {
  const [data, setData] = useState([]);

  const { t } = useTranslation();
  // const { fetchData } = useData();

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
        bed_type_name_en: initialData?.bed_type_name_en || '',
        bed_type_name_ar: initialData?.bed_type_name_ar || '',
      }
      : {},
    mode: 'all',
  });

  const { setModelState, handleClose } = useContext(ModalContext);
  const { showToast } = useContext(ToastContext);
  const {
    baseUrlPms,
    Headers,
    userId,
    setIsLoading,
    setIsDisabled,

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

  const bedTypeId = isEditMode ? initialData?.id : null;

  const bedTypeNameAr = useWatch({ control, name: 'bed_type_name_ar' });
  const bedTypeNameEn = useWatch({ control, name: 'bed_type_name_en' });
  const isDisabled = !(bedTypeNameAr?.length > 0 && bedTypeNameEn?.length > 0);
  const createMainBedType = async (data) => {
    const response = await axios.post(
      `${baseUrlPms}/bed_type/store/`,
      {
        created_by: userId,
        updated_by: userId,
      },
      { headers: Headers }
    );
    return response.data.data.id;
  };

  const createBedTypeAr = async (bedTypeId, nameAr) => {
    await axios.post(
      `${baseUrlPms}/bed_type_ar/store/`,
      {
        pms_bed_type_id: bedTypeId,
        bed_type_name_ar: nameAr,
      },
      { headers: Headers }
    );
  };

  const createBedTypeEn = async (bedTypeId, nameEn) => {
    await axios.post(
      `${baseUrlPms}/bed_type_en/store/`,
      {
        pms_bed_type_id: bedTypeId,
        bed_type_name_en: nameEn,
      },
      { headers: Headers }
    );
  };

  const associateBedTypeWithBranches = async (bedTypeId) => {
    const allSelectedBranchIds = Object.entries(selectedBranches).flatMap(([hotelName, branches]) =>
      Object.keys(branches).map((branchId) => parseInt(branchId))
    );
    const branchPromises = allSelectedBranchIds.map((branchId) =>
      axios.post(
        `${baseUrlPms}/bed_type_branch/store/`,
        {
          created_by: userId,
          updated_by: userId,
          bed_type_id: bedTypeId,
          branch_id: branchId,
        },
        { headers: Headers }
      )
    );

    await Promise.all(branchPromises);
  };

  const handleCreateOrUpdateBedType = async (data) => {
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
      let bedTypeId;

      if (isCreating) {
        bedTypeId = await createMainBedType(data);
        await Promise.all([
          createBedTypeAr(bedTypeId, data.bed_type_name_ar),
          createBedTypeEn(bedTypeId, data.bed_type_name_en),
        ]);
        if (hasSelectedBranches) {
          await associateBedTypeWithBranches(bedTypeId);
        }
      } else {
        bedTypeId = initialData.id;
        await Promise.all([
          axios.patch(
            `${baseUrlPms}/bed_type/${bedTypeId}/update/`,
            {
              ...data,
              updated_by: userId,
              created_by: userId,
            },
            { headers: Headers }
          ),
          axios.patch(
            `${baseUrlPms}/bed_type_ar/${bedTypeId}/update/`,
            {
              pms_bed_type_id: bedTypeId,
              bed_type_name_ar: data.bed_type_name_ar,
            },
            { headers: Headers }
          ),
          axios.patch(
            `${baseUrlPms}/bed_type_en/${bedTypeId}/update/`,
            {
              pms_bed_type_id: bedTypeId,
              bed_type_name_en: data.bed_type_name_en,
            },
            { headers: Headers }
          ),
        ]);
      }

      showToast(
        'success',
        t(isCreating ? 'msg.bedTypeCreatedMsg' : 'msg.bedTypeUpdatedMsg')
      );
      reset();
      setSelectedBranches({});
      if (!isCreating) {
        onClose();
      }
      handleClose();
      fetchData();
    } catch (error) {
      showToast('error', t('msg.errorMessage'));
      console.error('Error during Bed Type operation:', error);
    } finally {
      setIsLoading(false);
      setIsDisabled(false);
    }
  };

  useEffect(() => {
    if (isEditMode && initialData) {
      fetchBranchesForSelectedBedType(initialData.id);
    }
  }, [isEditMode, initialData]);
  const fetchData = () => {
    axios.get(`${baseUrlPms}/bed_type/all/`, { headers: Headers })
      .then(res => setData(res.data))
      .catch(err => console.log(err));
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <form className="d-flex flex-wrap justify-content-end" onSubmit={handleSubmit(handleCreateOrUpdateBedType)}>
        <div className="form-inputs d-flex w-100">
          <div className="input-package mt-3 pe-2 d-flex flex-column w-100">

            <BranchSelector
              mode="BedType"
              hotels={hotels}
              handleHotelSelection={handleHotelSelection}
              handleToggle={handleToggle}
              isBranchChecked={isBranchChecked}
              isHotelChecked={isHotelChecked}
              isHotelIndeterminate={isHotelIndeterminate}
              fetchBranches={fetchBranchesForSelectedBedType}
              branchesTags={branchesTags}
              collectedId={collectedId}
              reset={reset}
              setCollectedId={setCollectedId}
              isEditMode={isEditMode}
              itemId={bedTypeId}
            />
            <div className="form-inputs form-margin d-flex w-100 form-inputs-row custom-form-inputs  ">
              <InputForrModal
                label={`${t('bed-type')} ${t('input.englishNameLabel')}`}
                type="text"
                placeholder={t('input.englishPlaceholder')}
                register={register}
                name="bed_type_name_en"
                validationRules={{
                  required: t('input.fieldRequired'),
                  pattern: {
                    value: /^[A-Za-z\s]+$/,
                    message: t('input.onlyEnglishAllowed'),
                  },
                }}
                errors={errors.bed_type_name_en}
                className="pe-2 w-50"
              />
              <InputForrModal
                label={`${t('bed-type')} ${t('input.arabicNameLabel')}`}
                type="text"
                placeholder={t('input.arabicPlaceholder')}
                register={register}
                name="bed_type_name_ar"
                validationRules={{
                  required: t('input.fieldRequired'),
                  pattern: {
                    value: /^[\u0600-\u06FF\s]+$/,
                    message: t('input.onlyArabicAllowed'),
                  },
                }}
                errors={errors.bed_type_name_ar}
                className="ps-2 w-50"
              />
            </div>

          </div>
        </div>
        <FromButton reset={reset} buttonLabel={isEditMode ? t('edit') : t('add')} />

      </form>

    </>
  );
}

export default CreateBedType