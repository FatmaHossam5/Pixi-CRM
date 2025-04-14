import { useFieldArray } from "react-hook-form";
import SpecialDaysSection from "../SpecialDaysSection";
import WeekendsSection from "../WeekendsSection";
import WorkDaysSection from "../WorkDaysSection";
import { useLocation } from "react-router-dom";

const SharedPricingSections = ({ control, register, seasons,branch,errors }) => {
  const {
    fields: workDaysFeild,
    append: appendWorkDays,
    remove: removeWorkDays,
  } = useFieldArray({
    control,
    name: "workDays", // Field array for the workDays
  });

  const location = useLocation()
// console.log(errors);

  const {
    fields: spcialDaysFeild,
    append: appendSpcialDays,
    remove: removeSpcialDays,
  } = useFieldArray({
    control,
    name: "specialDays",
  });

  const {
    fields: weekendDaysFeild,
    append: appendWEDSection,
    remove: removeWEDSection,
    update: updateWEDSection
  } = useFieldArray({
    control,
    name: "weekendDays",
  });


  const addWDSection = () => {
    appendWorkDays({
      weekday_branch_season_id: "",
      room_price_work_day: "",
    });
  };

  const addSDSection = () => {
    appendSpcialDays({
      special_day_branch_season_id: "",
      room_price_special_day: "",
    });
  };

  const addWEDSection = () => {
    appendWEDSection({
      weekend_branch_season_ids: [],
      room_price_week_end: "",
    });
  };

  return (
    <>
      {/* start 3 shared component */}
      {/* Work Days Pricing */}

      <WorkDaysSection
        seasons={seasons}
        register={register}
        addWDSection={addWDSection}
        workDaysFeild={workDaysFeild}
        control={control}
        location={location}
        errors={errors}
      />

      {workDaysFeild.map((field, index) => (
        <WorkDaysSection
          key={field.id}
          id={field.id}
          register={register}
          index={index}
          field={field}
          control={control}
          seasons={seasons}
          workDaysFeild={workDaysFeild}
          addWDSection={addWDSection}
          removeWorkDays={() => removeWorkDays(index)} // Remove the section
          location={location}
          errors={errors}
        />
      ))}
      <div className="separetor mt-3" />
      {/* Special Days Pricing */}

      <SpecialDaysSection
        seasons={seasons}
        register={register}
        addSDSection={addSDSection}
        control={control}
        location={location}
        errors={errors}
      />

      {spcialDaysFeild.map((field, index) => (
        <SpecialDaysSection
          key={field.id}
          id={field.id}
          register={register}
          index={index}
          field={field}
          control={control}
          seasons={seasons}
          addSDSection={addSDSection}
          removeSpcialDays={() => removeSpcialDays(index)} // Remove the section
          location={location}
          errors={errors}
        />
      ))}
      <div className="separetor mt-3" />

      {/* Weekends Pricing */}

      <WeekendsSection
        seasons={seasons}
        register={register}
        addWEDSection={addWEDSection}
        control={control}
        branch={branch}
        updateWEDSection={updateWEDSection}
        weekendDaysFeild={weekendDaysFeild}
        location={location}
        errors={errors}
      />

      {weekendDaysFeild.map((field, index) => (
        <WeekendsSection
          key={field.id}
          id={field.id}
          register={register}
          index={index}
          field={field}
          control={control}
          seasons={seasons}
          addWEDSection={addWEDSection}
          removeWEDSection={() => removeWEDSection(index)} // Remove the section
          updateWEDSection={updateWEDSection}
          weekendDaysFeild={weekendDaysFeild}
          location={location}
          branch={branch}
          errors={errors}/>
      ))}

      {/* end 3 shared component */}
    </>
  );
};

export default SharedPricingSections;
