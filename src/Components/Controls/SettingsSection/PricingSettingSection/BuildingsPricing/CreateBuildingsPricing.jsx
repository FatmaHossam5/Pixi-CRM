import axios from "axios";
import { useContext, useState } from "react";
import { AuthContext } from "../../../../Helpers/Context/AuthContext";
import useBranch from "../../../../Helpers/Hook/useBranch";
import useBuilding from "../../../../Helpers/Hook/useBuilding";
import useFloor from "../../../../Helpers/Hook/useFloor";
import { Breadcrumb } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import SharedPricingSections from "../PricingSections/SharedPricingSections/SharedPricingSections";
import { useForm } from "react-hook-form";

const CreateBuildingsPricing = () => {
  const { baseUrlPms, Headers, userId } = useContext(AuthContext);

  const { branchs } = useBranch();
  const { building, handleBranchChange } = useBuilding();
  const { handleFloorChange } = useFloor();
  const [branch, setBranch] = useState();
  const navigate = useNavigate();

  const { register, control, handleSubmit,
    formState: { errors }, } = useForm({ mode: "all" });

  const [seasons, setSeasons] = useState();
  const getSeasons = (branchId) => {
    axios
      .get(`${baseUrlPms}/branch_season/all/?branch_id=${branchId}`, {
        headers: Headers,
      })
      .then((res) => {
        setSeasons(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const createBuildingPricing = async (data)=> {
    const postPricingData = async (extraData) => {
      return await axios.post(
        `${baseUrlPms}/building_pricing_rule/store/`,
        {
          created_by: userId,
          updated_by: userId,
          building_id: data.building_id,
          currency_id: 1,
          ...extraData,
        },
        { headers: Headers }
      );
    };

    try {
      // First call for weekday pricing
      await postPricingData({
        weekday_branch_season_id: data.weekday_branch_season_id,
        special_day_branch_season_id: null,
        weekend_branch_season_ids: null,
        building_price: data.building_price_work_day,
      });
      if (data.workDays && data.workDays.length !== 0) {
        for (let index = 0; index < data.workDays.length; index++) {
          const workday = data.workDays[index];
          console.log(workday);

          await postPricingData({
            weekday_branch_season_id: workday.weekday_branch_season_id,
            special_day_branch_season_id: null,
            weekend_branch_season_ids: null,
            building_price: workday.building_price_work_day,
          });
        }
      }

      // Second call for special day pricing
      await postPricingData({
        special_day_branch_season_id: data.special_day_branch_season_id,
        weekday_branch_season_id: null,
        weekend_branch_season_ids: null,
        building_price: data.building_price_special_day,
      });
      if (data.specialDays && data.specialDays.length !== 0) {
        for (let index = 0; index < data.specialDays.length; index++) {
          const specialDay = data.specialDays[index];
          console.log(specialDay);

          await postPricingData({
            special_day_branch_season_id:
              specialDay.special_day_branch_season_id,
            weekday_branch_season_id: null,
            weekend_branch_season_ids: null,
            building_price: specialDay.building_price_special_day,
          });
        }
      }

      // Third call for weekend pricing
      await postPricingData({
        special_day_branch_season_id: null,
        weekday_branch_season_id: null,
        weekend_branch_season_ids: JSON.parse(localStorage.getItem("weekends")),
        building_price: data.building_price_week_end,
      });
      if (data.weekendDays && data.weekendDays.length !== 0) {
        for (let index = 0; index < data.weekendDays.length; index++) {
          const weekendDay = data.weekendDays[index];
          console.log(weekendDay);

          await postPricingData({
            special_day_branch_season_id: null,
            weekday_branch_season_id: null,
            weekend_branch_season_ids: weekendDay.weekend_branch_season_ids,
            building_price: weekendDay.building_price_week_end,
          });
        }
      }

      localStorage.removeItem("weekends");
      navigate("/dashboard/pricing");

    } catch (error) {
      console.error("Error in creating pricing:", error);
    }
  }

  return (
    <>
      <div className="px-content mb-auto mt-3">
        <div className="px-card p-4 text-capitalize ">
          <div className="card-head d-flex px-4 align-items-center pb-0">
            <div className="w-100 d-flex flex-wrap align-items-center">
              <div className="breadcrumbs-list mb-2 w-100">
                <Breadcrumb>
                  {/* <Breadcrumb.Item href="#">Home</Breadcrumb.Item> */}
                  <Breadcrumb.Item>Pricing</Breadcrumb.Item>
                  <Breadcrumb.Item>
                    <Link to={"/dashboard/pricing"}>Buildings Pricing</Link>
                  </Breadcrumb.Item>
                  <Breadcrumb.Item active>
                    Add New Building Price
                  </Breadcrumb.Item>
                </Breadcrumb>
              </div>

              <h3 className="mb-0 px-sub-taps w-50 me-auto">
                Add New Building Price
              </h3>
            </div>
          </div>
          <form
            onSubmit={handleSubmit(createBuildingPricing)}
            className="d-flex flex-wrap mt-2 "
          >
            <div className="reservation-side w-100  p-4 ">
              <div className="section-head d-flex justify-content-between ">
                <h5 className="section-title ">Building Details</h5>
              </div>
              {/* Building Details */}
              <div className="form-inputs container-fluid  gx-0">
                <div className="row ">
                  <div className="col-4">
                    <div className="input-package mt-4">
                      <label className="w-100">Branch</label>
                      <select
                        type="text"
                        className="px-login-input w-100 "
                        onChange={(e) => {
                          handleBranchChange(e);
                          getSeasons(e.target.value);
                          setBranch(e.target.value);
                        }}
                      >
                        <option value="">Select branch</option>
                        {branchs &&
                          branchs?.map((branch) => {
                            return (
                              <option
                                key={branch.unit_reference_id}
                                value={branch.unit_reference_id}
                              >
                                {branch?.pms_branch_en?.branch_name_en}
                              </option>
                            );
                          })}
                      </select>
                    </div>
                  </div>
                  <div className="col-4">
                    <div className="input-package mt-4">
                      <label className="w-100">Building</label>
                      <select
                        type="text"
                        className="px-login-input w-100 "                       
                        {...register("building_id", {
                          required: true,
                        })}
                      >
                        <option value="">Choose building</option>
                        {building &&
                          building.map((build) => {
                            return (
                              <option
                                key={build.unit_reference_id}
                                value={build?.unit_reference_id}
                              >
                                {build?.pms_building_en?.building_name_en}
                              </option>
                            );
                          })}
                      </select>
                      {errors?.building_id?.type === "required" && (
                        <p className="text-danger m-0">field is required</p>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              <div className="separetor mt-5" />
            </div>

            <SharedPricingSections
              control={control}
              register={register}
              seasons={seasons}
              branch={branch}
              errors={errors}
            />

            <div className="Room-side  w-100 ">{/* add on Information */}</div>
            <div className="w-100 d-flex justify-content-end mt-3 p-4">
              <button className="px-btn px-white-btn">cancel</button>
              <button type="submit" className="px-btn px-blue-btn ms-3">
                save
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default CreateBuildingsPricing;
