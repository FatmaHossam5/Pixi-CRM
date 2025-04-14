import { useState } from "react";
import useBuilding from "../../../../Helpers/Hook/useBuilding";

const WorkDaysSection = ({
  seasons,
  id,
  register,
  errors,

  addWDSection,
  removeWorkDays,
  index,
  control,
  location,
}) => {
  // const [seasonBranch,setSeasonBranch] = useState()
  let attribute = location.pathname;
  return (
    <>
      <div className={`reservation-side w-100 ${index >= 0 ? "px-4" : "p-4"}`}>
        {index >= 0 ? (
          ""
        ) : (
          <div className="section-head d-flex justify-content-between ">
            <h5 className="section-title ">Work Days Pricing</h5>
          </div>
        )}

        <div className="form-inputs container-fluid  gx-0">
          <div className="row ">
            <div className="col-6">
              <div className={`input-package`}>
                <label className="w-100">Season</label>
                <select
                  type="text"
                  className="px-login-input w-100 "
                  // onChange={(e) => setSeasonBranch(e.target.value)}

                  {...register(
                    index >= 0
                      ? `workDays[${index}].weekday_branch_season_id`
                      : `weekday_branch_season_id`
                  )}

                  // {`workDays[${index}].weekday_branch_season_id`}
                >
                  <option value="">Select Season</option>
                  {seasons &&
                    seasons?.map((season) => {
                      return (
                        <option key={season.id} value={season.id}>
                          {season?.season_info?.pms_season_en?.season_name_en}
                        </option>
                      );
                    })}
                </select>
              </div>
            </div>
            <div className="col-6">
              <div className={`input-package`}>
                <label className="w-100">Work Day Price</label>
                {attribute && attribute === "/dashboard/pricing/bedPricing" ? (
                  <>
                    <input
                      type="text"
                      placeholder="Enter Work Day Price"
                      className="px-form-input w-100 m-auto"
                      {...register(
                        index >= 0
                          ? `workDays[${index}].bed_price_work_day`
                          : `bed_price_work_day`,
                        { required: true }
                      )}
                    />

                    {index >= 0
                      ? errors?.workDays?.[index]?.bed_price_work_day?.type ===
                          "required" && (
                          <p className="text-danger">Price is required</p>
                        )
                      : errors?.bed_price_work_day?.type === "required" && (
                          <p className="text-danger">Price is required</p>
                        )}
                     </>
                ) : attribute &&
                  attribute === "/dashboard/pricing/roomPricing" ? (
                    <>
                  <input
                    type="text"
                    placeholder="Enter Work Day Price"
                    className="px-form-input w-100 m-auto"
                    {...register(
                      index >= 0
                        ? `workDays[${index}].room_price_work_day`
                        : `room_price_work_day`,
                      { required: true }
                    )}
                  />
                  {index >= 0
                    ? errors?.workDays?.[index]?.room_price_work_day?.type ===
                        "required" && (
                        <p className="text-danger">Price is required</p>
                      )
                    : errors?.room_price_work_day?.type === "required" && (
                        <p className="text-danger">Price is required</p>
                      )} </>
                ) :
                
                attribute &&
                  attribute === "/dashboard/pricing/floorPricing" ? (


                    <>
                  <input
                    type="text"
                    placeholder="Enter Work Day Price"
                    className="px-form-input w-100 m-auto"
                    {...register(
                      index >= 0
                        ? `workDays[${index}].floor_price_work_day`
                        : `floor_price_work_day`,
                      { required: true }
                    )}
                  />
                   {index >= 0
                    ? errors?.workDays?.[index]?.floor_price_work_day?.type ===
                        "required" && (
                        <p className="text-danger">Price is required</p>
                      )
                    : errors?.floor_price_work_day?.type === "required" && (
                        <p className="text-danger">Price is required</p>
                      )}
                </>
                
                ) : 
                
                attribute &&
                  attribute === "/dashboard/pricing/buildingPricing" ? (

                    <>
                  <input
                    type="text"
                    placeholder="Enter Work Day Price"
                    className="px-form-input w-100 m-auto"
                    {...register(
                      index >= 0
                        ? `workDays[${index}].building_price_work_day`
                        : `building_price_work_day`,
                      { required: true }
                    )}
                  />
                 {index >= 0
                    ? errors?.workDays?.[index]?.building_price_work_day?.type ===
                        "required" && (
                        <p className="text-danger">Price is required</p>
                      )
                    : errors?.building_price_work_day?.type === "required" && (
                        <p className="text-danger">Price is required</p>
                      )}
                </>
                ) : (
                  ""
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="w-100 text-primary mt-5 d-flex ">
          <div className="actions-btn ms-auto">
            <button
              className={`px-btn ${
                index >= 0 ? "px-minus-btn" : " px-blue-btn"
              } ms-3`}
              type="button"
              // onClick={remove}
              onClick={() => {
                if (index >= 0) {
                  removeWorkDays(index);
                } else {
                  addWDSection();
                }
              }}
            >
              {index >= 0 ? "remove" : "add price"}
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default WorkDaysSection;
