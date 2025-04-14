import { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { ModalContext } from "../../../Helpers/Context/ModalContext";
import { AuthContext } from "../../../Helpers/Context/AuthContext";
import axios from "axios";
import { ToastContext } from "../../../Helpers/Context/ToastContext ";
import { useTranslation } from 'react-i18next';

const CheckIn = ({ customerId, customers }) => {
  const { modelState, closeModal, setModelState, handleClose } =
    useContext(ModalContext);
  const { showToast } = useContext(ToastContext);
  const { t } = useTranslation();

  const {
    baseUrlPms,
    Headers,
    userId,
    setIsLoading,
    setIsDisabled,
    isDisabled,
  } = useContext(AuthContext);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    reset,
    control,
  } = useForm({ mode: "all" });

  const date = new Date();
  const localDate = date.toLocaleString();

  const [reservation, setReservation] = useState([]);

  const [customerReq, setCustomerReq] = useState();
  const QuickCheckInData = async () => {
    try {
      const response = await axios.get(
        `${baseUrlPms}/request/all/?customer_id=${customerId.id}`,
        {
          headers: Headers,
        }
      );
      console.log(
        response.data[0]?.customer_info.pms_customer_en.customer_name_en
      );
      setCustomerReq(response.data);
      setValue(
        "customer_name_en",
        customerId.pms_customer_en.customer_name_en
      );
    } catch (error) {
      console.error("Error fetching quick check-in data:", error);
    }
  };

  const getReservation = async (reqId) => {
    try {
      const response = await axios.get(
        `${baseUrlPms}/reservation/all/?request_id=${reqId}`,
        {
          headers: Headers,
        }
      );
      const data = response.data;
      setReservation(data);
      console.log(data);

      // setValue("room_id", data.room_id);
    } catch (error) {
      console.error("Error fetching reservation data:", error);
    }
  };

  const arr = [];
  const resArr = (x) => {
    arr.push(x);
    console.log(arr);
  };

  // const [resId, setResId] = useState(null);
  const reservationUpdate = () => {
    console.log(arr);
    if (arr.length > 0) {
      for (let index = 0; index < arr.length; index++) {
        const resID = arr[index];
        console.log(resID);

        try {
          const update = axios.patch(
            `${baseUrlPms}/reservation/${resID}/update/`,

            {
              is_check_in: true,
            },
            {
              headers: Headers,
            }
          );
          if (update.status == 200 || 201) {
            setModelState({
              status: "success",
              message: "Checked in successfully!",
            });
            showToast('success', update.data.message || t("msg.checkInMsg"));
          }
        } catch (error) {
          showToast('error', t("msg.errorMessage"));
        } finally {
          handleClose();
          reset();
          // getCustomers();
        }
      }
    }

  };

  useEffect(() => {
    QuickCheckInData();
  }, [customerId.id]);


  return (
    <>
      <form
        onSubmit={handleSubmit(reservationUpdate)}
        className="d-flex flex-wrap justify-content-end"
      >
        <div className="form-inputs d-flex flex-wrap w-100 px-3">
          <div className="input-package mt-3 d-flex flex-column w-100">
            <label className="mb-2 modal-label" htmlFor="customer-seacr">
              search for customer
            </label>

            <select
              className={`px-login-input ${isDisabled ? "disabled-input" : ""}`}
              {...register("customer_name_en")}
              disabled
            >
              <option value="">Choose customer</option>
              {customers &&
                customers?.map((customer) => (
                  <option
                    key={customer?.customer_id}
                    value={customer?.customer_id}
                  >
                    {customer?.pms_customer_en?.customer_name_en}
                  </option>
                ))}
            </select>
          </div>
        </div>

        <div className="form-inputs d-flex w-100 px-3">
          <div className="input-package mt-3 pe-2 d-flex flex-column w-50">
            <label className="mb-2 modal-label" htmlFor="Referance Number">
              Referance Number
            </label>
            <select
              className={`px-form-input w-100`}
              onChange={(e) => getReservation(e.target.value)}
            >
              <option value=""> choose request</option>
              {/* {console.log(customerReq) */}

              {customerReq &&
                customerReq?.map((req) => {
                  return (
                    <option value={req.id} key={req.id}>
                      {req.id}
                    </option>
                  );
                })}
            </select>
          </div>
          <div className="input-package mt-3 ps-2 d-flex flex-column w-50">
            <label className="mb-2 modal-label" >
              Room
            </label>

            <select
              className={`px-login-input ${isDisabled ? "disabled-input" : ""}`}
              onChange={(e) => resArr(e.target.value)}
            // {...register("room_id",{required:true})}
            >
              <option> choose </option>
              {reservation &&
                reservation?.map((res) => {
                  return (
                    <option value={res.id} key={res.id}>
                      {res.room_info.pms_room_en.room_name_en}
                    </option>
                  );
                })}
            </select>
          </div>
        </div>

        <div className="add-by mt-3 d-flex w-100 px-3">
          <div className="label">Check In Date {localDate}</div>
        </div>

        <div className="w-100 d-flex justify-content-end mt-3 p-4">
          <button className="px-btn px-white-btn" onClick={handleClose}>cancel</button>
          <button type="submit" className="px-btn px-blue-btn ms-3">
            check in
          </button>
        </div>
        {/* <FromButton reset={reset} /> */}
      </form>
    </>
  );
};

export default CheckIn;


