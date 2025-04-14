import { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { AuthContext } from "../../../../../Helpers/Context/AuthContext";
import axios from "axios";
import ErrorModal from "../../../../../Shared/ErrorModal/ErrorModal";
import SuccessModal from "../../../../../Shared/SuccessModal/SuccessModal";
import FromButton from "../../../../../Shared/FromButton/FromButton";
import { ModalContext } from "../../../../../Helpers/Context/ModalContext";
// import { useParams } from "react-router-dom";

const CreateBuildingFacilities = ({getFacilities, buildId}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ mode: "all" });
  // const { branchId } = useParams;

  const { modelState, closeModal, setModelState, handleClose } =
    useContext(ModalContext);

  const { baseUrlPms, Headers, userId } = useContext(AuthContext);

  const facility_Building = async (data) => {
    try {
      const facilityBuildingData = await axios.post(
        `${baseUrlPms}/facility_building/store/`,
        {
          created_by: userId,
          updated_by: userId,
          facility_id: data.facility_id,
          building_id: buildId,
        },
        {
          headers: Headers,
        }
      );

      if (facilityBuildingData.status === 200 || 201) {
        handleClose();
        getFacilities();
        setModelState({
          status: "success",
          message: "yes",
        });
        
        //   reset()
      } else {
        setModelState({
          status: "error",
          message: "Invaild",
        });
      }
    } catch (error) {
      setModelState({
        status: "error",
        message: "Invaild",
      });
    }
  };

  const [allFacilities, setAllFacilities] = useState([]);

  const AllFacilities = () => {
    axios
      .get(`${baseUrlPms}/facility/all/`, {
        headers: Headers,
      })
      .then((res) => {
        setAllFacilities(res.data);
      })
      .catch((error) => {});
  };

  useEffect(() => {
    AllFacilities();
  }, []);

  return (
    <>
     
      <form
        className="d-flex flex-wrap justify-content-end"
        onSubmit={handleSubmit(facility_Building)}
      >
        <div className="form-inputs d-flex w-100">
          <div className="input-package mt-3 px-3 d-flex flex-column w-100">
            <label className="mb-2" htmlFor>
              Facility
            </label>
            <select
              className=" px-login-input w-100 "
              {...register("facility_id", {
                required: true,
              })}
            >
              {" "}
              <option value="">select facility</option>
              {allFacilities &&
                allFacilities.map((facility) => {
                  return (
                    <option key={facility.id} value={facility.id}>
                      {facility.pms_facility_en.facility_name_en}
                    </option>
                  );
                })}
            </select>
            {errors?.facility_id?.type === "required" && (
              <p className="text-danger ">{t("input.fieldRequired")}</p>
            )}
          </div>
        </div>

        <FromButton />
      </form>
    </>
  );
};

export default CreateBuildingFacilities;
