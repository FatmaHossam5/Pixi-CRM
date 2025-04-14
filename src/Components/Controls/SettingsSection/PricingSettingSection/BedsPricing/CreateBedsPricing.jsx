import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../../Helpers/Context/AuthContext";
import { Breadcrumb } from "react-bootstrap";
import useBranch from "../../../../Helpers/Hook/useBranch";
import useBuilding from "../../../../Helpers/Hook/useBuilding";
import useFloor from "../../../../Helpers/Hook/useFloor";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import SharedPricingSections from "../PricingSections/SharedPricingSections/SharedPricingSections";
import Loader from "../../../../Shared/Loader/Loader";

const CreateBedsPricing = () => {
  const {
    baseUrlPms,
    Headers,
    userId,
    setIsLoading,
    isLoading,
    setIsDisabled,
    isDisabled,
  } = useContext(AuthContext);
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({ mode: "all" });
  // const location = useLocation()
  // console.log(location.pathname);
  // console.log(errors);

  const { branchs } = useBranch();
  const { building, handleBranchChange } = useBuilding();
  const { floor, handleFloorChange } = useFloor();
  const [branch, setBranch] = useState();
  const navigate = useNavigate();

  const [roomView, setRoomView] = useState();
  const getRoomsView = (branchId) => {
    axios
      .get(`${baseUrlPms}/view_type_branch/all/?branch_id=${branchId}`, {
        headers: Headers,
      })
      .then((res) => {
        setRoomView(res.data);
      })
      .catch((error) => {});
  };

  const [roomType, setRoomType] = useState();
  const getRoomsType = (branchId) => {
    axios
      .get(`${baseUrlPms}/room_type_branch/all/?branch_id=${branchId}`, {
        headers: Headers,
      })
      .then((res) => {
        setRoomType(res.data);
      })
      .catch((error) => {});
  };

  const [bedType, setBedType] = useState();
  const getBedType = (branchId) => {
    axios
      .get(`${baseUrlPms}/bed_type_branch/all/?branch_id=${branchId}`, {
        headers: Headers,
      })
      .then((res) => {
        setBedType(res.data);
      })
      .catch((error) => {});
  };

  const [seasons, setSeasons] = useState();
  const getSeasons = (branchId) => {
    axios
      .get(`${baseUrlPms}/branch_season/all/?branch_id=${branchId}`, {
        headers: Headers,
      })
      .then((res) => {
        setSeasons(res.data);
        console.log(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  /** not used **/

  const [allWeekendIds, setAllWeekendIds] = useState({});

  const updateWeekendIds = (index, weekendIds) => {
    setAllWeekendIds((prev) => ({
      ...prev,
      [index]: weekendIds,
    }));
  };
  // console.log(allWeekendIds);

  /** **/
  const createBedPricing = async (data) => {
    console.log(data);
    setIsLoading(true);
    setIsDisabled(true);
    // console.log(isLoading);
    // console.log("up");
    
    const postPricingData = async (extraData) => {
      return await axios.post(
        `${baseUrlPms}/bed_pricing_rule/store/`,
        {
          created_by: userId,
          updated_by: userId,
          floor_id: data.floor_id,
          bed_type_id: data.bed_type_id,
          view_type_id: data.view_type_id,
          room_type_id: data.room_type_id,
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
        bed_price: data.bed_price_work_day,
      });
      if (data.workDays && data.workDays.length !== 0) {
        for (let index = 0; index < data.workDays.length; index++) {
          const workday = data.workDays[index];
          console.log(workday);

          await postPricingData({
            weekday_branch_season_id: workday.weekday_branch_season_id,
            special_day_branch_season_id: null,
            weekend_branch_season_ids: null,
            bed_price: workday.bed_price_work_day,
          });
        }
      }

      // Second call for special day pricing
      await postPricingData({
        special_day_branch_season_id: data.special_day_branch_season_id,
        weekday_branch_season_id: null,
        weekend_branch_season_ids: null,
        bed_price: data.bed_price_special_day,
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
            bed_price: specialDay.bed_price_special_day,
          });
        }
      }

      // Third call for weekend pricing
      await postPricingData({
        special_day_branch_season_id: null,
        weekday_branch_season_id: null,
        weekend_branch_season_ids: JSON.parse(localStorage.getItem("weekends")),
        bed_price: data.bed_price_week_end,
      });
      if (data.weekendDays && data.weekendDays.length !== 0) {
        for (let index = 0; index < data.weekendDays.length; index++) {
          const weekendDay = data.weekendDays[index];
          console.log(weekendDay);

          await postPricingData({
            special_day_branch_season_id: null,
            weekday_branch_season_id: null,
            weekend_branch_season_ids: weekendDay.weekend_branch_season_ids,
            bed_price: weekendDay.bed_price_week_end,
          });
        }
      }
      // console.log("down");
      // console.log(isLoading);
      
      // localStorage.removeItem("weekends");
      // navigate("/dashboard/pricing");
    } catch (error) {
      console.error("Error in creating pricing:", error);
    } 
    finally {
      setIsLoading(false);
      setIsDisabled(false);
    }
  };

  return (
    <>
      <div className="px-content mb-auto mt-3">
        <div className="px-card p-4 text-capitalize ">
          <div className="card-head d-flex p-4 align-items-center pb-0">
            <div className="w-100 d-flex flex-wrap align-items-center">
              <div className="breadcrumbs-list mb-2 w-100">
                <Breadcrumb>
                  {/* <Breadcrumb.Item href="#">Home</Breadcrumb.Item> */}
                  <Breadcrumb.Item>Pricing</Breadcrumb.Item>
                  <Breadcrumb.Item>
                    <Link to={"/dashboard/pricing"}>Beds Pricing</Link>
                  </Breadcrumb.Item>
                  <Breadcrumb.Item active>Add New Bed Price</Breadcrumb.Item>
                </Breadcrumb>
              </div>

              <h3 className="mb-0 px-sub-taps w-50 me-auto">
                Add New Bed Price
              </h3>
            </div>
          </div>
          <form
            onSubmit={handleSubmit(createBedPricing)}
            className="d-flex flex-wrap mt-2 "
          >
            <div className="reservation-side w-100  p-4 ">
              <div className="section-head d-flex justify-content-between ">
                <h5 className="section-title ">Bed Details</h5>
              </div>
              {/* Bed Details */}
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
                          getRoomsView(e.target.value);
                          getRoomsType(e.target.value);
                          getSeasons(e.target.value);
                          getBedType(e.target.value);
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
                        onChange={handleFloorChange}
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
                    </div>
                  </div>
                  <div className="col-4">
                    <div className="input-package mt-4">
                      <label className="w-100">Floor</label>
                      <select
                        type="text"
                        className="px-login-input w-100 "
                        {...register("floor_id", {
                          required: true,
                        })}
                      >
                        <option value="">Select floor</option>
                        {floor &&
                          floor.map((Floor) => {
                            return (
                              <option
                                key={floor.unit_reference_id}
                                value={Floor?.unit_reference_id}
                              >
                                {Floor?.pms_floor_en?.floor_name_en}
                              </option>
                            );
                          })}
                      </select>
                      {errors?.floor_id?.type === "required" && (
                        <p className="text-danger m-0">field is required</p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
              <div className="form-inputs container-fluid  gx-0">
                <div className="row ">
                  <div className="col-4">
                    <div className="input-package mt-4">
                      <label className="w-100">room type</label>
                      <select
                        type="text"
                        className="px-login-input w-100 "
                        {...register("room_type_id", {
                          required: true,
                        })}
                      >
                        <option value="">select room type</option>
                        {roomType &&
                          roomType?.map((room) => {
                            return (
                              <option key={room.id} value={room.id}>
                                {
                                  room?.room_type_info?.pms_room_type_en
                                    ?.room_type_name_en
                                }
                              </option>
                            );
                          })}
                      </select>
                      {errors?.room_type_id?.type === "required" && (
                        <p className="text-danger m-0">field is required</p>
                      )}
                    </div>
                  </div>
                  <div className="col-4">
                    <div className="input-package mt-4">
                      <label className="w-100" htmlFor>
                        room view
                      </label>
                      <select
                        type="text"
                        className="px-login-input w-100 "
                        {...register("view_type_id", {
                          required: true,
                        })}
                      >
                        <option value="">select room view</option>
                        {roomView &&
                          roomView?.map((room) => {
                            return (
                              <option key={room.id} value={room.id}>
                                {
                                  room?.view_type_info?.pms_view_type_en
                                    ?.view_type_name_en
                                }
                              </option>
                            );
                          })}
                      </select>
                      {errors?.view_type_id?.type === "required" && (
                        <p className="text-danger m-0">field is required</p>
                      )}
                    </div>
                  </div>

                  <div className="col-4">
                    <div className="input-package mt-4">
                      <label className="w-100" htmlFor>
                        bed type
                      </label>
                      <select
                        type="text"
                        className="px-login-input w-100 "
                        {...register("bed_type_id", {
                          required: true,
                        })}
                      >
                        <option value="">select bed type</option>
                        {bedType &&
                          bedType?.map((bed, index) => {
                            return (
                              <option key={index} value={bed?.id}>
                                {
                                  bed?.bed_type_info?.pms_bed_type_en
                                    ?.bed_type_name_en
                                }
                              </option>
                            );
                          })}
                      </select>
                      {errors?.bed_type_id?.type === "required" && (
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
              updateWeekendIds={updateWeekendIds}
              // location={location.pathname}
              errors={errors}
            />

            <div className="Room-side  w-100 ">{/* add on Information */}</div>
            <div className="w-100 d-flex justify-content-end mt-3 p-4 flex-wrap">
              <button className="px-btn px-white-btn">cancel</button>
              {/* {isLoading ? (
                <Loader />
              ) : ( */}
                <button type="submit" className="px-btn px-blue-btn ms-3">
                  save
                </button>
              {/* )} */}
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default CreateBedsPricing;
