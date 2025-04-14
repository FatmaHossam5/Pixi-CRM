import React, { useContext, useEffect, useState } from 'react';
import { useForm, useWatch } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import axios from 'axios';
import FromButton from '../../../../../Shared/FromButton/FromButton';
import BranchSelector from '../../../../../Shared/BranchSelector/BranchSelector';
import InputForrModal from '../../../../../Shared/InputForModal/InputForrModal';
import { AuthContext } from '../../../../../Helpers/Context/AuthContext';
import { ModalContext } from '../../../../../Helpers/Context/ModalContext';
import { useData } from '../../../../../Helpers/Context/useData';
import useBranchSelection from '../../../../../Helpers/Hook/useBranchSelection';
import { ToastContext } from '../../../../../Helpers/Context/ToastContext ';

const CreateChannelBooking = ({
  fetchBranchesForSelectedChannelBooking ,
  branchesTags,
  collectedId,
  setCollectedId,
  isEditMode,
  onClose,
  initialData
}) => {
  const { t } = useTranslation();
  const { showToast } = useContext(ToastContext);
  const { baseUrlPms, Headers, userId, setIsLoading, setIsDisabled, isLoading } = useContext(AuthContext);
  const { handleClose } = useContext(ModalContext);
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

  const {
    register,
    handleSubmit,
    reset,
    control,
    setValue,
    formState: { errors }
  } = useForm({
    defaultValues: isEditMode
      ? {
          channel_booking_name_en: initialData?.channel_booking_name_en || "",
          channel_booking_name_ar: initialData?.channel_booking_name_ar || "",
          channel_booking_percentage: initialData?.channel_booking_percentage || "",
        }
      : {},
    mode: 'all',
  });
  const [percentageValue, setPercentageValue] = useState(initialData?.channel_booking_percentage || "");
  const handleMinusClick = () => {
    if (!String(percentageValue).startsWith("-")) { // Convert to string
      const updatedValue = `-${percentageValue || "0"}`;
      setPercentageValue(updatedValue);
      setValue("channel_booking_percentage", updatedValue); // Sync with form
    }
  };
  const handlePlusClick = () => {
    if (String(percentageValue).startsWith("-")) { // Convert to string
      const updatedValue = String(percentageValue).slice(1);
      setPercentageValue(updatedValue);
      setValue("channel_booking_percentage", updatedValue); // Sync with form
    }
  };
  

  const handleInputChange = (e) => {
    const value = e.target.value;
    setPercentageValue(value);
    setValue('channel_booking_percentage', value); // Sync with form

  };

  const channelBookingId = isEditMode ? initialData?.id : null;
  const channelBookingNameAr = useWatch({ control, name: 'channel_booking_name_ar' });
  const channelBookingNameEn = useWatch({ control, name: 'channel_booking_name_en' });
  const isDisabled = !(channelBookingNameAr?.length > 0 && channelBookingNameEn?.length > 0);

  const createMainChannelBooking = async (data) => {
    const response = await axios.post(
      `${baseUrlPms}/channel_booking/store/`,
      {
        created_by: userId,
        updated_by: userId,
        channel_booking_percentage: percentageValue,
      },
      { headers: Headers }
    );
    return response.data.data.id;
  };

  const createChannelBookingAr = async (channelBookingId, nameAr) => {
    await axios.post(
      `${baseUrlPms}/channel_booking_ar/store/`,
      {
        pms_channel_booking_id: channelBookingId,
        channel_booking_name_ar: nameAr,
      },
      { headers: Headers }
    );
  };

  const createChannelBookingEn = async (channelBookingId, nameEn) => {
    await axios.post(
      `${baseUrlPms}/channel_booking_en/store/`,
      {
        pms_channel_booking_id: channelBookingId,
        channel_booking_name_en: nameEn,
      },
      { headers: Headers }
    );
  };

  const associateChannelBookingWithBranches = async (channelBookingId) => {
    const allSelectedBranchIds = Object.entries(selectedBranches).flatMap(([hotelName, branches]) =>
      Object.keys(branches).map((branchId) => parseInt(branchId))
    );
    const branchPromises = allSelectedBranchIds.map((branchId) =>
      axios.post(
        `${baseUrlPms}/channel_booking_branch/store/`,
        {
          created_by: userId,
          updated_by: userId,
          channel_booking_id: channelBookingId,
          branch_id: branchId,
        },
        { headers: Headers }
      )
    );

    await Promise.all(branchPromises);
  };

  const handleCreateChannelBooking = async (data) => {
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
      let channelBookingId;

      if (isCreating) {
        channelBookingId = await createMainChannelBooking(data);
        await Promise.all([
          createChannelBookingAr(channelBookingId, data.channel_booking_name_ar),
          createChannelBookingEn(channelBookingId, data.channel_booking_name_en),
        ]);
        if (hasSelectedBranches) {
          await associateChannelBookingWithBranches(channelBookingId);
        }
      } else {
        channelBookingId = initialData.id;
        await Promise.all([
          axios.patch(
            `${baseUrlPms}/channel_booking/${channelBookingId}/update/`,
            {
              ...data,
              updated_by: userId,
              created_by: userId,
              channel_booking_percentage: percentageValue,
            },
            { headers: Headers }
          ),
          axios.patch(
            `${baseUrlPms}/channel_booking_ar/${channelBookingId}/update/`,
            {
              pms_channel_booking_id: channelBookingId,
              channel_booking_name_ar: data.channel_booking_name_ar,
            },
            { headers: Headers }
          ),
          axios.patch(
            `${baseUrlPms}/channel_booking_en/${channelBookingId}/update/`,
            {
              pms_channel_booking_id: channelBookingId,
              channel_booking_name_en: data.channel_booking_name_en,
            },
            { headers: Headers }
          ),
        ]);
      }

      showToast('success', t(isCreating ? 'msg.channelBookingMsg' : 'msg.updateChannelMsg'));
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

      fetchBranchesForSelectedChannelBooking(initialData.id);
    }
  }, []);
console.log(collectedId);

  return (
    <form className="d-flex flex-wrap justify-content-end" onSubmit={handleSubmit(handleCreateChannelBooking)}>
      <div className="form-inputs d-flex w-100">
        <div className="input-package mt-3 pe-2 d-flex flex-column w-100">
          <BranchSelector
            mode="ChannelBooking"
            hotels={hotels}
            handleHotelSelection={handleHotelSelection}
            handleToggle={handleToggle}
            isBranchChecked={isBranchChecked}
            isHotelChecked={isHotelChecked}
            isHotelIndeterminate={isHotelIndeterminate}
            fetchBranches={fetchBranchesForSelectedChannelBooking}
            branchesTags={branchesTags}
            collectedId={collectedId}
            reset={reset}
            setCollectedId={setCollectedId}
            isEditMode={isEditMode}
            itemId={channelBookingId}
          />

          <div className="form-inputs form-margin d-flex w-100 ">
            <InputForrModal
              label={`${t('channel-booking')} ${t('input.englishNameLabel')}`}
              type="text"
              placeholder={t('input.englishPlaceholder')}
              register={register}
              name="channel_booking_name_en"
              validationRules={{
                required: t('input.fieldRequired'),
                pattern: {
                  value: /^[A-Za-z\s]+$/,
                  message: t('input.onlyEnglishAllowed'),
                },
              }}
              errors={errors.channel_booking_name_en}
              className="pe-2 w-50"
            />
            <InputForrModal
              label={`${t('channel-booking')} ${t('input.arabicNameLabel')}`}
              type="text"
              placeholder={t('input.arabicPlaceholder')}
              register={register}
              name="channel_booking_name_ar"
              validationRules={{
                required: t('input.fieldRequired'),
                pattern: {
                  value: /^[\u0600-\u06FF\s]+$/,
                  message: t('input.onlyArabicAllowed'),
                },
              }}
              errors={errors.channel_booking_name_ar}
              className="ps-2 w-50"
            />
          </div>

          <div className="form-inputs d-flex w-100 ms-2">
            <div className="input-package mt-3 pe-2 d-flex flex-column w-50">
              <label className="mb-2" htmlFor="channel_booking_percentage">
                {t('percentage.percentage')}
              </label>
              <div className="booking_percentage">
                <input
                  type="text"
                  placeholder={t('percentage.percentagePlaceholder')}
                  className="px-form-input w-100"
                  {...register("channel_booking_percentage", { required: true })}
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
          <FromButton reset={reset} isLoading={isLoading} buttonLabel={isEditMode ? t('btn.edit') : t('btn.add')} disabled={isDisabled} />
        </div>
      </div>
    </form>
  );
};

export default CreateChannelBooking;
