import axios from "axios";
import { format } from "date-fns"; // Import date-fns for date formatting
import { Arabic } from "flatpickr/dist/l10n/ar.js"; // Arabic locale for Flatpickr
import "flatpickr/dist/themes/material_blue.css";
import i18next from "i18next";
import { useContext } from "react";
import Flatpickr from "react-flatpickr";
import { Controller, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { AuthContext } from "../../../../../Helpers/Context/AuthContext";
import { ModalContext } from "../../../../../Helpers/Context/ModalContext";
import { ToastContext } from "../../../../../Helpers/Context/ToastContext ";
import { useData } from "../../../../../Helpers/Context/useData";
import useBranchSelection from "../../../../../Helpers/Hook/useBranchSelection";
import BranchSelector from "../../../../../Shared/BranchSelector/BranchSelector";
import FromButton from "../../../../../Shared/FromButton/FromButton";
import InputForrModal from "../../../../../Shared/InputForModal/InputForrModal";

const CreateSeason = ({
  initialData,
  onClose,
  isEditMode,
  fetchBranchesForSelectedSeason,
  branchesTags,
  collectedId,
  setCollectedId
}) => {


  const { t } = useTranslation();
  const { language } = i18next;
  const { showToast } = useContext(ToastContext);
  const {
    baseUrlPms,
    Headers,
    userId,
    setIsLoading,
    setIsDisabled,
    isDisabled, isLoading
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


  const { register, handleSubmit, control, formState: { errors }, reset } = useForm({
    defaultValues: isEditMode
      ? {
        season_start_date: initialData?.season_start_date
          ? new Date(initialData?.season_start_date) // Convert to Date object
          : null,
        season_end_date: initialData?.season_end_date
          ? new Date(initialData?.season_end_date) // Convert to Date object
          : null,
        season_name_en: initialData?.season_name_en || "",
        season_name_ar: initialData?.season_name_ar || "",
      }
      : {},
  }, { mode: "all" });

  const { handleClose } = useContext(ModalContext);
  const { fetchData } = useData();
  const seasonId = isEditMode ? initialData?.id : null;



  const createMainSeason = async (data) => {
    const seasonStartDate = format(new Date(data.season_start_date), "yyyy-MM-dd");
    const seasonEndDate = format(new Date(data.season_end_date), "yyyy-MM-dd");
    const response = await axios.post(`${baseUrlPms}/season/store/`, {
      created_by: userId,
      updated_by: userId,
      season_start_date: seasonStartDate,
      season_end_date: seasonEndDate
    }, { headers: Headers })
    return response.data.data.id;
  }

  const createSeasonAr = async (seasonId, seasonAr) => {
    await axios.post(`${baseUrlPms}/season_ar/store/`, {
      pms_season_id: seasonId,
      season_name_ar: seasonAr
    }, { headers: Headers })
  }
  const createSeasonEn = async (seasonId, seasonEn) => {
    await axios.post(`${baseUrlPms}/season_en/store/`, {
      pms_season_id: seasonId,
      season_name_en: seasonEn
    }, { headers: Headers })
  }
  const associateSeasonWithBranches = async (seasonId) => {
    const allSelectedBranchIds = Object.entries(selectedBranches).flatMap(([hotelName, branches]) =>
      Object.keys(branches).map((branchId) => parseInt(branchId))
    );
    const branchPromises = allSelectedBranchIds.map((branchId) =>
      axios.post(
        `${baseUrlPms}/branch_season/store/`,
        {
          created_by: userId,
          updated_by: userId,
          season_id: seasonId,
          branch_id: branchId,
        },
        { headers: Headers }
      )
    );

    await Promise.all(branchPromises); // Wait for all API calls to complete
  };
  // Handle form submission
  const createSeason = async (data) => {

    const isCreating = !isEditMode
    // Check if there are any selected branches
    const hasSelectedBranches = Object.values(selectedBranches).some(
      (branches) => Object.keys(branches).length > 0
    );
    if (isCreating && !hasSelectedBranches) {
      showToast("error", t("msg.selectBranchError"));
      return;
    }
    setIsLoading(true);
    setIsDisabled(true)

    try {
      let seasonId;
      if (isCreating) {
        const seasonId = await createMainSeason(data);
        // Step 2: Create translations for the Room View
        await Promise.all([
          createSeasonAr(seasonId, data.season_name_ar),
          createSeasonEn(seasonId, data.season_name_en)
        ]);
        if (hasSelectedBranches) {
          await associateSeasonWithBranches(seasonId)
        }
      } else {

        seasonId = initialData?.id;

        await Promise.all([
          axios.patch(`${baseUrlPms}/season/${seasonId}/update/`, {
            ...data,
            season_start_date: format(new Date(data.season_start_date), "yyyy-MM-dd"),
            season_end_date: format(new Date(data.season_end_date), "yyyy-MM-dd"),
            updated_by: userId,
            created_by: userId,
          }, { headers: Headers }),
          axios.patch(`${baseUrlPms}/season_ar/${seasonId}/update/`, {
            pms_season_id: seasonId,
            season_name_ar: data.season_name_ar,
          }, { headers: Headers }),
          axios.patch(`${baseUrlPms}/season_en/${seasonId}/update/`, {
            pms_season_id: seasonId,
            season_name_en: data.season_name_en,
          }, { headers: Headers }),
        ]);

      }

      showToast("success", t(isCreating ? "msg.seassonMsg" : "msg.updateSeasonMsg"));
      reset({});

      setSelectedBranches({});// Clear selected branches
      if (!isCreating) {
        onClose();
      }
      handleClose();
      fetchData();

    } catch (error) {
      console.error("Error occurred while creating/updating season:", error); // Log detailed error
      showToast("error")

    } finally {
      setIsLoading(false);
      setIsDisabled(false);
    }

  }



  return (
    <>

      <form
        className={`d-flex flex-wrap justify-content-end `}
        onSubmit={handleSubmit(createSeason)}

      >
        <div className="form-inputs d-flex w-100">
          <div className="input-package mt-3 pe-2 d-flex flex-column w-100">
            <BranchSelector
              mode="Season"
              hotels={hotels}
              handleHotelSelection={handleHotelSelection}
              handleToggle={handleToggle}
              isBranchChecked={isBranchChecked}
              isHotelChecked={isHotelChecked}
              isHotelIndeterminate={isHotelIndeterminate}
              fetchBranches={fetchBranchesForSelectedSeason}
              branchesTags={branchesTags}
              collectedId={collectedId}
              reset={reset}
              setCollectedId={setCollectedId}
              isEditMode={isEditMode}
              itemId={seasonId}
            />
          </div>
        </div>
        <div className="form-inputs d-flex w-100">
          <InputForrModal
            label={`${t("season")} ${t("input.englishNameLabel")}`}
            type="text"
            placeholder={t("input.englishPlaceholder")}
            register={register}
            name="season_name_en"
            validationRules={{
              required: t("input.fieldRequired"),
              pattern: {
                value: /^[A-Za-z\s]+$/,
                message: t("input.onlyEnglishAllowed"),
              },
            }}
            errors={errors.season_name_en}

            className="pe-2 w-50"
          />
          <InputForrModal
            label={`${t("season")} ${t("input.arabicNameLabel")}`}
            type="text"
            placeholder={t("input.arabicPlaceholder")}
            register={register}
            name="season_name_ar"
            validationRules={{
              required: t("input.fieldRequired"),
              pattern: {
                value: /^[\u0600-\u06FF\s]+(?:\d+)?$/,
                message: t("input.onlyArabicAllowed"),
              },
            }}
            errors={errors.season_name_ar}

            className="pe-2 w-50"
          />
        </div>
        <div className="form-inputs d-flex w-100">
          {/* Start Date Input */}
          <div className="input-package mt-3 pe-2 d-flex flex-column w-50">
            <label className="mb-2" htmlFor="season_start_date">
              {t("seasonForms.start_date")}
            </label>
            <div className="position-relative w-100">
              <Controller
                name="season_start_date"
                control={control}
                rules={{ required: true }}
                render={({ field }) => (
                  <>
                    <Flatpickr
                      {...field}
                      className="px-form-input w-100 form-control"
                      placeholder={t("seasonForms.date_placeholder")}
                      options={{
                        dateFormat: "Y-m-d",
                        locale: language === "ar" ? Arabic : "default",
                      }}

                    />
                    <i
                      className="fa-regular fa-calendar-days fa-xl position-absolute"
                      style={{
                        right: "10px",
                        top: "50%",
                        transform: "translateY(-50%)",
                        pointerEvents: "none",
                      }}
                    />
                  </>
                )}
              />
            </div>
            {errors.season_start_date?.type === "required" && (
              <p className="text-danger ps-3">{t("input.fieldRequired")}</p>
            )}
          </div>

          {/* End Date Input */}
          <div className="input-package mt-3 ps-2 d-flex flex-column w-50">
            <label className="mb-2" htmlFor="season_end_date">
              {t("seasonForms.end_date")}
            </label>
            <div className="position-relative w-100">
              <Controller
                name="season_end_date"
                control={control}
                rules={{ required: true }}
                render={({ field }) => (
                  <>
                    <Flatpickr
                      {...field}
                      className="px-form-input w-100 form-control"
                      placeholder={t("seasonForms.date_placeholder")}
                      options={{
                        dateFormat: "Y-m-d",
                        locale: language === "ar" ? Arabic : "default",
                      }}
                    />
                    <i
                      className="fa-regular fa-calendar-days fa-xl position-absolute"
                      style={{
                        right: "10px",
                        top: "50%",
                        transform: "translateY(-50%)",
                        pointerEvents: "none",
                      }}
                    />
                  </>
                )}
              />
            </div>
            {errors.season_end_date?.type === "required" && (
              <p className="text-danger ps-3">{t("input.fieldRequired")}</p>
            )}
          </div>
        </div>


        <FromButton reset={reset} isLoading={isLoading} buttonLabel={isEditMode ? "Edit Season" : "Add Season"} />
      </form>
    </>
  );
};

export default CreateSeason;
