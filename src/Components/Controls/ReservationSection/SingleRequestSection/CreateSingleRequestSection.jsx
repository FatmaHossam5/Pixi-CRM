import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { AuthContext } from "../../../Helpers/Context/AuthContext";
import { useForm, Controller } from "react-hook-form";
import { useLocation, useParams } from "react-router-dom";
import { format } from "date-fns";
import Reservation from "./FormComponents/Reservation";
import Customer from "./FormComponents/Customer";
import AddonsRequest from "./FormComponents/AddonsRequest";
import AadditionalInformationRequest from "./FormComponents/AadditionalInformationRequest";
import Dependents from "./FormComponents/Dependents";
import { ModalContext } from "../../../Helpers/Context/ModalContext";
import PaymentInformation from "./FormComponents/PaymentInformation";

const CreateSingleRequestSection = () => {
  const location = useLocation();

  const { customerId } = useParams();
  const { baseUrlPms, Headers, userId } = useContext(AuthContext);
  const { setModelState } = useContext(ModalContext);
  const [sections, setSections] = useState([]);

  const [dependentsNumber, setDependentsNumber] = useState();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    control,
  } = useForm({ mode: "all" });

  const addSection = () => {
    setSections([...sections, { id: sections.length + 1 }]);
  };
  const [rSections, setRSections] = useState([]);

  const addRSection = () => {
    setRSections([...rSections, { id: rSections.length + 1 }]);
  };

  // State for dates and night count
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [nightCount, setNightCount] = useState();

  // Calculate night count
  useEffect(() => {
    if (startDate && endDate) {
      const start = new Date(startDate);
      const end = new Date(endDate);
      const diffTime = end - start;
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      setNightCount(diffDays);
      console.log(start, end, diffTime);
    }
  }, [startDate, endDate]);

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

  // add new reservation
  const createReservation = async (data) => {
    console.log(data);

    try {
      const requestData = await axios.post(
        `${baseUrlPms}/request/store/`,
        {
          created_by: userId,
          updated_by: userId,
          customer_id: customerId,
          // adult_number: 5,
          // child_number: 2
        },
        {
          headers: Headers,
        }
      );

      const reqID = requestData.data.data.id;

      console.log(reqID);

      const formattedStartDate = format(new Date(startDate), "yyyy-MM-dd");
      const formattedEndDate = format(new Date(endDate), "yyyy-MM-dd");

      // console.log(formattedStartDate);
      // console.log(formattedEndDate);

      const reservationData = await axios.post(
        `${baseUrlPms}/reservation/store/`,
        {
          created_by: userId,
          updated_by: userId,
          reservation_start_date: formattedStartDate,
          reservation_end_date: formattedEndDate,
          request_id: reqID,
          reservation_night_count: nightCount,
          is_check_in: data.is_check_in,
          is_check_out: false,
          room_id: data.room_id,
          accommodation_type_id: data.accommodation_type_id,
          payment_account_id: 3,
          visit_purpose_id: data.visit_purpose_id,
        },
        {
          headers: Headers,
        }
      );

      const reservationId = reservationData.data.data.id;

      const dependent = await axios.post(
        `${baseUrlPms}/dependant/store/`,
        {
          created_by: userId,
          updated_by: userId,
          pms_customer_id: customerId,
          // dependant_type_id: data.dependant_type_id,
          age_group_id: data.age_group_id,
          dependant_relationship_id: data.dependant_relationship_id,
          dependant_national_id: data.dependant_national_id,
          dependant_age: data.dependant_age,
        },
        {
          headers: Headers,
        }
      );
      const dependentId = dependent.data.data.id;
      await axios.post(
        `${baseUrlPms}/dependant_ar/store/`,
        {
          pms_dependant_id: dependentId,
          dependant_name_ar: data.dependant_name_ar,
        },
        {
          headers: Headers,
        }
      );

      await axios.post(
        `${baseUrlPms}/dependant_en/store/`,
        {
          pms_dependant_id: dependentId,
          dependant_name_en: data.dependant_name_en,
        },
        {
          headers: Headers,
        }
      );

      //Request Dependent (Old API)
      // await axios.post(
      //   `${baseUrlPms}/request_dependant/store/`,
      //   {
      //     created_by: userId,
      //     updated_by: userId,
      //     request_id: reqID,
      //     dependant_id: dependentId,
      //   },
      //   {
      //     headers: Headers,
      //   }
      // );

      //Reservation Dependent (New API)
      await axios.post(
        `${baseUrlPms}/reservation_dependant/store/`,
        {
          created_by: userId,
          updated_by: userId,
          reservation_id: reservationId,
          dependant_id: dependentId,
        },
        {
          headers: Headers,
        }
      );


      const addonsStartDate = format(
        new Date(data.addons_start_date),
        "yyyy-MM-dd"
      );
      const addonsEndDate = format(
        new Date(data.addons_end_date),
        "yyyy-MM-dd"
      );
      const requestAddOns = await axios.post(
        `${baseUrlPms}/request_addons/store/`,
        {
          created_by: userId,
          updated_by: userId,
          request_id: reqID,
          addons_id: data.addons_id,
          addons_start_date: addonsStartDate,
          addons_end_date: addonsEndDate,
          addon_price: 12,
          number_of_dependants: data.number_of_dependants,
        },
        {
          headers: Headers,
        }
      );

      if (reservationData.status === 200 || 201) {
        setModelState({
          status: "success",
          message: "Customer created successfully!",
        });
      }
    } catch (error) {
      console.log(error);
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
          <h3 className="w-100 blue-text ps-4 mb-2">single request </h3>
          <form
            onSubmit={handleSubmit(createReservation)}
            className="d-flex flex-wrap mt-2 "
          >
            <div className="reservation-side w-100  p-4 ">
              <div className="section-head d-flex justify-content-between ">
                <h5 className="section-title ">Reservation Information</h5>
              </div>
              {/* Resrvation Information */}
              <Reservation
                register={register}
                sections={sections}
                setSections={setSections}
                setStartDate={setStartDate}
                setEndDate={setEndDate}
                nightCount={nightCount}
                addRSection={addRSection}
              // control={control}
              // errors={errors}
              />
              {rSections.map((section) => {
                return (
                  <Reservation
                    key={section.id}
                    id={section.id}
                    register={register}
                    setStartDate={setStartDate}
                    setEndDate={setEndDate}
                    nightCount={nightCount}
                    rSections={rSections}
                    setRSections={setRSections}
                  // control={control}
                  />
                );
              })}

              {/* customer information */}


              <Customer
                location={location.pathname}
                customerId={customerId}
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

              <div className="separetor mt-4" />
            </div>

            <div className="reservation-side  w-100 ">
              {/* add on Information */}
              <AddonsRequest
                control={control}
                register={register}
                Controller={Controller}
              />
              {/* additional Information */}
              <AadditionalInformationRequest register={register} />

              {/* payment  Information */}
              <PaymentInformation register={register} />
            </div>

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

export default CreateSingleRequestSection;
