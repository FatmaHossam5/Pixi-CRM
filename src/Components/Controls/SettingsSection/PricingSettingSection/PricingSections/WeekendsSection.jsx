import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../../Helpers/Context/AuthContext";
import useBuilding from "../../../../Helpers/Hook/useBuilding";
import axios from "axios";

const WeekendsSection = ({
  seasons,
  id,
  register,
  errors,
  location,
  addWEDSection,
  branch,
  index,
  control,
  removeWEDSection,
}) => {
  const { baseUrlPms, Headers, setArrayOfWeekends, arrayOfWeekends } =
    useContext(AuthContext);
  const [weekends, setWeekends] = useState();
  let attribute = location.pathname;

  const handleWeekendId = (seasonId) => {
    console.log(seasonId);
    axios
      .get(
        `${baseUrlPms}/weekend_branch_season/all/?branch_id=${branch}&season_id=${seasonId}`,
        {
          headers: Headers,
        }
      )
      .then((res) => {
        setWeekends(res.data);
        console.log(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    if (weekends) {
      const weekendIds = weekends.map((weekend) => weekend.id); // array of ids of weekends that i want to send
      localStorage.setItem("weekends", JSON.stringify(weekendIds));
    }
  }, [weekends]);

  return (
    <>
      <div className={`reservation-side w-100 ${index >= 0 ? "px-4" : "p-4"}`}>
        {index >= 0 ? (
          ""
        ) : (
          <div className="section-head d-flex justify-content-between ">
            <h5 className="section-title ">Weekends Pricing</h5>
          </div>
        )}
        <div className="form-inputs container-fluid  gx-0">
          <div className="row ">
            <div className="col-6">
              <div className="input-package mt-4">
                <label className="w-100">Season</label>

                <select
                  type="text"
                  className="px-login-input w-100 "
                  //  {...register("weekend_branch_season_ids")}
                  onChange={(e) => handleWeekendId(e.target.value)}
                >
                  <option value="">Select Season</option>
                  {seasons &&
                    seasons?.map((season) => {
                      return (
                        <option key={season.id} value={season.season_id}>
                          {season?.season_info?.pms_season_en?.season_name_en}
                        </option>
                      );
                    })}
                </select>
              </div>
            </div>
            <div className="col-6">
              <div className="input-package mt-4">
                <label className="w-100">Weekends Price</label>

                {/* <input
                  type="text"
                  placeholder="Enter Weekends Price"
                  className="px-form-input w-100 m-auto"
                  // {...register(`weekendDays[${index}].bed_price_week_end`)}
                  {...register(
                    index >= 0
                      ? `weekendDays[${index}].bed_price_week_end`
                      : `bed_price_week_end`
                  )}
                /> */}

{attribute && attribute === "/dashboard/pricing/bedPricing" ? (
                    <>
                      <>
                      <input
                        type="text"
                        placeholder="Enter Weekends Price"
                        className="px-form-input w-100 m-auto"
                        {...register(
                          index >= 0
                            ? `weekendDays[${index}].bed_price_week_end`
                            : `bed_price_week_end`,
                          { required: true }
                        )}
                      />

                      {index >= 0
                      ? errors?.weekendDays?.[index]?.bed_price_week_end?.type ===
                          "required" && (
                          <p className="text-danger">Price is required</p>
                        )
                      : errors?.bed_price_week_end?.type === "required" && (
                          <p className="text-danger">Price is required</p>
                        )}
                      </>
                      
                    </>
                  ) : attribute &&
                    attribute === "/dashboard/pricing/roomPricing" ? (
                    <>
                    <input
                      type="text"
                      placeholder="Enter Weekends Price"
                      className="px-form-input w-100 m-auto"
                      {...register(
                        index >= 0
                          ? `weekendDays[${index}].room_price_week_end`
                          : `room_price_week_end`,
                        { required: true }
                      )}
                    />
                    {index >= 0
                      ? errors?.weekendDays?.[index]?.room_price_week_end?.type ===
                          "required" && (
                          <p className="text-danger">Price is required</p>
                        )
                      : errors?.room_price_week_end?.type === "required" && (
                          <p className="text-danger">Price is required</p>
                        )}
                    </>
                  ) : attribute &&
                    attribute === "/dashboard/pricing/floorPricing" ? (
                    <>
                    <input
                      type="text"
                      placeholder="Enter Weekends Price"
                      className="px-form-input w-100 m-auto"
                      {...register(
                        index >= 0
                          ? `weekendDays[${index}].floor_price_week_end`
                          : `floor_price_week_end`,
                        { required: true }
                      )}
                    />
                    {index >= 0
                      ? errors?.weekendDays?.[index]?.floor_price_week_end?.type ===
                          "required" && (
                          <p className="text-danger">Price is required</p>
                        )
                      : errors?.floor_price_week_end?.type === "required" && (
                          <p className="text-danger">Price is required</p>
                        )}
                    </>
                  ) : attribute &&
                    attribute === "/dashboard/pricing/buildingPricing" ? (
                    <>
                    <input
                      type="text"
                      placeholder="Enter Weekends Price"
                      className="px-form-input w-100 m-auto"
                      {...register(
                        index >= 0
                          ? `weekendDays[${index}].building_price_week_end`
                          : `building_price_week_end`,
                        { required: true }
                      )}
                    />
                    {index >= 0
                      ? errors?.weekendDays?.[index]?.building_price_week_end?.type ===
                          "required" && (
                          <p className="text-danger">Price is required</p>
                        )
                      : errors?.building_price_week_end?.type === "required" && (
                          <p className="text-danger">Price is required</p>
                        )}
                    </>
                  ) : (
                    ""
                  )}

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
                      removeWEDSection(index);
                    } else {
                      addWEDSection();
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

export default WeekendsSection;
