import { useContext, useState } from "react";
import useBuilding from "../../../../Helpers/Hook/useBuilding";
import { AuthContext } from "../../../../Helpers/Context/AuthContext";
import axios from "axios";

const SpecialDaysSection = ({
  seasons,
  id,
  register,
  errors,

  addSDSection,
  removeSpcialDays,
  index,
  control,
  location
}) => {
  const { baseUrlPms, Headers } = useContext(AuthContext);

  const [specialDay, setSpecialDay] = useState();
  let attribute = location.pathname;

  const getSpecialDays = (specialDaysIds) => {
    axios
      .get(
        `${baseUrlPms}/special_day_branch_season/all/?branch_season_id=${specialDaysIds}`,
        {
          headers: Headers,
        }
      )
      .then((res) => {
        setSpecialDay(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <>
      <div className={`reservation-side w-100  ${index >= 0 ? "px-4" : "p-4"}`}>
        {index >= 0 ? (
          ""
        ) : (
          <div className="section-head d-flex justify-content-between ">
            <h5 className="section-title ">Special Days Pricing</h5>
          </div>
        )}

        <div className="form-inputs container-fluid  gx-0">
          <div className="row ">
            <div className="col-4">
              <div className="input-package mt-4">
                <label className="w-100">Season</label>
                <select
                  type="text"
                  className="px-login-input w-100 "
                  onChange={(e) => getSpecialDays(e.target.value)}
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
            <div className="col-4">
              <div className="input-package mt-4">
                <label className="w-100">Special Days</label>
                <select
                  type="text"
                  className="px-login-input w-100"
                  // {...register(`specialDays[${index}].special_day_branch_season_id`)}
                  {...register(index >= 0 ? `specialDays[${index}].special_day_branch_season_id` : `special_day_branch_season_id`)}
                >
                  <option value="">Select Special Days</option>
                  {specialDay &&
                    specialDay?.map((day) => {
                      return (
                        <option key={day.id} value={day.id}>
                          {day?.special_day_info?.special_day_date}
                        </option>
                      );
                    })}
                </select>
              </div>
            </div>
            <div className="col-4">
              <div className="input-package mt-4">
                <label className="w-100">Special Day Price</label>


                   {/* {...register(index >= 0 ?
                      `specialDays[${index}].bed_price_special_day`
                       : `bed_price_special_day`)} */}
               

                  {attribute && attribute === "/dashboard/pricing/bedPricing" ? (
                    <>
                      <input
                        type="text"
                        placeholder="Enter special day Price"
                        className="px-form-input w-100 m-auto"
                        {...register(
                          index >= 0
                            ? `specialDays[${index}].bed_price_special_day`
                            : `bed_price_special_day`,
                          { required: true }
                        )}
                      />
                      {index >= 0
                    ? errors?.specialDays?.[index]?.bed_price_special_day?.type ===
                        "required" && (
                        <p className="text-danger">Price is required</p>
                      )
                    : errors?.bed_price_special_day?.type === "required" && (
                        <p className="text-danger">Price is required</p>
                      )}
                    </>
                  ) : attribute &&
                    attribute === "/dashboard/pricing/roomPricing" ? (

                   <>
                    <input
                      type="text"
                      placeholder="Enter special day Price"
                      className="px-form-input w-100 m-auto"
                      {...register(
                        index >= 0
                          ? `specialDays[${index}].room_price_special_day`
                          : `room_price_special_day`,
                        { required: true }
                      )}
                    />
                     {index >= 0
                    ? errors?.specialDays?.[index]?.room_price_special_day?.type ===
                        "required" && (
                        <p className="text-danger">Price is required</p>
                      )
                    : errors?.room_price_special_day?.type === "required" && (
                        <p className="text-danger">Price is required</p>
                      )}
                   </>
                  ) : attribute &&
                    attribute === "/dashboard/pricing/floorPricing" ? (
                    <>
                    <input
                      type="text"
                      placeholder="Enter special day Price"
                      className="px-form-input w-100 m-auto"
                      {...register(
                        index >= 0
                          ? `specialDays[${index}].floor_price_special_day`
                          : `floor_price_special_day`,
                        { required: true }
                      )}
                    />
                     {index >= 0
                    ? errors?.specialDays?.[index]?.floor_price_special_day?.type ===
                        "required" && (
                        <p className="text-danger">Price is required</p>
                      )
                    : errors?.floor_price_special_day?.type === "required" && (
                        <p className="text-danger">Price is required</p>
                      )}
                    </>
                  ) : attribute &&
                    attribute === "/dashboard/pricing/buildingPricing" ? (
                 <>
                    <input
                      type="text"
                      placeholder="Enter special day Price"
                      className="px-form-input w-100 m-auto"
                      {...register(
                        index >= 0
                          ? `specialDays[${index}].building_price_special_day`
                          : `building_price_special_day`,
                        { required: true }
                      )}
                    />
                  {index >= 0
                    ? errors?.specialDays?.[index]?.building_price_special_day?.type ===
                        "required" && (
                        <p className="text-danger">Price is required</p>
                      )
                    : errors?.building_price_special_day?.type === "required" && (
                        <p className="text-danger">Price is required</p>
                      )}
                 </>
                  ) : (
                    ""
                  )}

                   {/* {...register(`specialDays[${index}].room_price_special_day`)} */}
               
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
                      removeSpcialDays(index);
                    } else {
                      addSDSection();
                    }
                  }}
                >
                  {index >= 0 ? "remove" : "add price"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SpecialDaysSection;
