import { useForm, Controller } from "react-hook-form";
import AddonsRequest from "../../ReservationSection/SingleRequestSection/FormComponents/AddonsRequest";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../Helpers/Context/AuthContext";
import Customer from "../../ReservationSection/SingleRequestSection/FormComponents/Customer";
import Dependents from "../../ReservationSection/SingleRequestSection/FormComponents/Dependents";
import { useLocation, useParams } from "react-router-dom";
import axios from "axios";
import { format } from "date-fns";
import { ToastContext } from "../../../Helpers/Context/ToastContext ";


const CreateAddonsReq = () => {
  const { showToast } = useContext(ToastContext);

  const location = useLocation()
  console.log(location);


  const { baseUrlPms, Headers, userId } = useContext(AuthContext);
  const { requestId } = useParams();
  const CusID = localStorage.getItem("CusId")
  const [dependentsNumber, setDependentsNumber] = useState();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    control,
  } = useForm({ mode: "all" });
  const [dependentsRelationships, setDependentsRelationships] = useState([]);
  const getDependentRelationship = () => {
    axios
      .get(`${baseUrlPms}/dependant_relationship/all/`, {
        headers: Headers,
      })
      .then((res) => {
        setDependentsRelationships(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const [dependentsTypes, setDependentsTypes] = useState([]);
  const getDependentType = () => {
    axios
      .get(`${baseUrlPms}/age_group/all/`, {
        headers: Headers,
      })
      .then((res) => {
        setDependentsTypes(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const post_AddOns = async (data) => {
    console.log(data);
    console.log(data.addons_start_date);

    const addonsStartDate = format(
      new Date(data.addons_start_date),
      "yyyy-MM-dd"
    );
    const addonsEndDate = format(
      new Date(data.addons_end_date),
      "yyyy-MM-dd"
    );
    try {
      const requestAddOns = await axios.post(
        `${baseUrlPms}/request_addons/store/`,
        {
          created_by: userId,
          updated_by: userId,
          request_id: requestId,
          addons_id: data.addons_id,
          addon_price: data.addon_price,
          number_of_dependants: data.number_of_dependants,
          addons_start_date: addonsStartDate,
          addons_end_date: addonsEndDate,
        },
        {
          headers: Headers,
        }
      );
      showToast('success',  t("msg.addonsReq"));

    } catch (error) {
      showToast('error', t("msg.errorMessage"));
    }
  };

  useEffect(() => {
    getDependentType();
    getDependentRelationship();
  }, []);

  return (
    <>
      <div className="px-content mb-auto mt-3">
        <div className="px-card p-4 text-capitalize ">
          <h3 className="w-100 blue-text ps-4 mb-2">add on request </h3>
          <form onSubmit={handleSubmit(post_AddOns)} className="d-flex flex-wrap mt-2 ">
            <div className="reservation-side w-100  p-4 ">
              <AddonsRequest
                control={control}
                register={register}
                Controller={Controller}
              />

              <Customer
                location={location.pathname}
                customerId={CusID}
                register={register}
                setValue={setValue}
                setDependentsNumber={setDependentsNumber}
              />
              {/* Dependents Information */}
              <Dependents
                dependentsNumber={dependentsNumber}
                register={register}
                dependentsRelationships={dependentsRelationships}
                dependentsTypes={dependentsTypes}
              />
            </div>
            <div className="w-100 d-flex justify-content-end mt-3 p-4">
              <button className="px-btn px-white-btn">cancel</button>
              <button type="submit" className="px-btn px-blue-btn ms-3">save</button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default CreateAddonsReq;
