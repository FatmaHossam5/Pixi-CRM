import { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { AuthContext } from "../../../../../Helpers/Context/AuthContext";
import axios from "axios";
import ErrorModal from "../../../../../Shared/ErrorModal/ErrorModal";
import SuccessModal from "../../../../../Shared/SuccessModal/SuccessModal";
import FromButton from "../../../../../Shared/FromButton/FromButton";
import { ModalContext } from "../../../../../Helpers/Context/ModalContext";
// import { useParams } from "react-router-dom";

const CreateBuildingAmenities = ({ getAmenities, buildId }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ mode: "all" });
  // const { branchId } = useParams;

  const { modelState, closeModal, setModelState, handleClose } =
    useContext(ModalContext);

  const { baseUrlPms, Headers, userId } = useContext(AuthContext);

  const amenity_Building = async (data) => {
    try {
      const amenityBuildingData = await axios.post(
        `${baseUrlPms}/amenity_building/store/`,
        {
          created_by: userId,
          updated_by: userId,
          amenity_id: data.amenity_id,
          building_id: buildId,
        },
        {
          headers: Headers,
        }
      );

      if (amenityBuildingData.status === 200 || 201) {
        handleClose();
        getAmenities();
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
        message: "Invailddddddddddddddddd",
      });
    }
  };

  const [allAmenities, setAllAmenities] = useState([]);

  const AllAminities = () => {
    axios
      .get(`${baseUrlPms}/amenity/all/`, {
        headers: Headers,
      })
      .then((res) => {
        setAllAmenities(res.data);
      })
      .catch((error) => {});
  };

  useEffect(() => {
    AllAminities();
  }, []);

  return (
    <>
 
      <form
        className="d-flex flex-wrap justify-content-end"
        onSubmit={handleSubmit(amenity_Building)}
      >
        <div className="form-inputs d-flex w-100">
          <div className="input-package mt-3 px-3 d-flex flex-column w-100">
            <label className="mb-2" >
              Amenity
            </label>
            <select
              className=" px-login-input w-100 "
              {...register("amenity_id", {
                required: true,
              })}
            >
             
              <option value="">select amenity</option>
              {allAmenities &&
                allAmenities.map((aminity) => {
                  return (
                    <option key={aminity.id} value={aminity.id}>
                      {aminity?.pms_amenity_en?.amenity_name_en}
                    </option>
                  );
                })}
            </select>
            {errors?.amenity_id?.type === "required" && (
              <p className="text-danger ">{t("input.fieldRequired")}</p>
            )}
          </div>
        </div>

        <FromButton />
      </form>
    </>
  );
};

export default CreateBuildingAmenities;
