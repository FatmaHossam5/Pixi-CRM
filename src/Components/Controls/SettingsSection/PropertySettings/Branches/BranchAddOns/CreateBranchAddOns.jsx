import { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { AuthContext } from "../../../../../Helpers/Context/AuthContext";
import axios from "axios";
import FromButton from "../../../../../Shared/FromButton/FromButton";
import { ModalContext } from "../../../../../Helpers/Context/ModalContext";

const CreateBranchAddOns = ({ getAddOns,branchId }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ mode: "all" });
  
  const { setModelState, handleClose } =
    useContext(ModalContext);

  const { baseUrlPms, Headers, userId } = useContext(AuthContext);

  const AddOnsToBranch = async (data) => {
    try {
      const addonsBranchData = await axios.post(
        `${baseUrlPms}/addons_branch/store/`,
        {
          created_by: userId,
          updated_by: userId,
          addons_id: data.addons_id,
          branch_id: branchId,
          
        },
        {
          headers: Headers,
        }
      );

      if (
       ( addonsBranchData.status === 200) ||
        201
      ) {
       
        setModelState({
          status: "success",
          message: "yes",
        });
        handleClose();
        getAddOns();
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


  const [allOns, setAllOns] = useState([]);
  const getAllAddOns = () => {
    axios
      .get(`${baseUrlPms}/addons/all/`, {
        headers: Headers,
      })
      .then((res) => {
        setAllOns(res.data);
      })
      .catch((error) => {
      
      });
  };

  useEffect(() => {

    getAllAddOns()
  }, []);

  

  return (
    <>
      
      <form
        className="d-flex flex-wrap justify-content-end"
        onSubmit={handleSubmit(AddOnsToBranch)}
      >
        <div className="form-inputs d-flex w-100">
          <div className="input-package mt-3 px-3 d-flex flex-column w-100">
            <label className="mb-2" htmlFor>
              Add Ons
            </label>
            <select
              className=" px-login-input w-100 "
              {...register("addons_id", {
                required: true,
              })}
            > <option value="">select ons</option>
            {allOns &&
              allOns.map((on) => {
                return (
                  <option key={on.id} value={on.id}>
                    {on?.pms_addons_en?.addons_name_en}
                  </option>
                );
              })}
          </select>
            {errors?.addons_id?.type === "required" && (
              <p className="text-danger ">{t("input.fieldRequired")}</p>
            )}
            
          </div>
        </div>

        <FromButton />
      </form>
    </>
  );
};

export default CreateBranchAddOns;
