import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../Helpers/Context/AuthContext";
import axios from "axios";
// import FromButton from "../../../Shared/FromButton/FromButton";
import { useForm } from "react-hook-form";

const BlockedCustomerDetails = ({ id, remove }) => {
  const { baseUrlPms, Headers } = useContext(AuthContext);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    setValue,
  } = useForm({ mode: "all" });

  // const { showState, handleClose, setShowState } = useContext(ModalContext);

  const currentDate = new Date().toLocaleDateString();

  const [details, setDetails] = useState([]);
  const getDetails = () => {
    axios
      .get(`${baseUrlPms}/blacklist/all/?customer_id=${id}`, {
        headers: Headers,
      })
      .then((res) => {
        setDetails(res.data);
        
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const [blackListsCause, setBlackListsCause] = useState([]);
  const getbBlackListCause = () => {
    axios
      .get(`${baseUrlPms}/blackList_cause/all/`, {
        headers: Headers,
      })
      .then((res) => {
        setBlackListsCause(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    getDetails();
    getbBlackListCause();
  }, []);

  const [edit, setEdit] = useState(false);
  const editCustomer = () => {
    setEdit(true);
  };
  return (
    <>
      <form
        // onSubmit={
        //     handleSubmit(createBlackList)
        // }
        className="d-flex flex-wrap justify-content-end"
      >
        <div className="form-inputs d-flex flex-wrap w-100 px-3">
          <div className="customer-info mt-3 d-flex flex-wrap w-100">
            <h5 className="name">
              {details[0]?.customer_info?.pms_customer_en.customer_name_en}
            </h5>
            <div className="date d-flex ms-auto text-danger ">
              <div className="label">blacklisted at :</div>
              <div className="number ms-3">
                {new Date(details[0]?.created_at).toLocaleDateString()}
              </div>
            </div>
            <div className="phone w-100 gray-text d-flex">
              <div className="label">phone number :</div>
              <div className="number ms-3">
                {details[0]?.customer_info?.customer_mobile}
              </div>
            </div>
            <div className="id w-100 gray-text d-flex">
              <div className="label">Identification Number :</div>
              <div className="number ms-3">
                {details[0]?.customer_info?.customer_national_id}
              </div>
            </div>
          </div>
        </div>
        <div className="form-inputs d-flex w-100 px-3">
          <div className="input-package mt-3 d-flex flex-column w-100">
            <label className="mb-2 modal-label" htmlFor="customer-seacr">
              Reasons For Being Blacklisted
            </label>

            {edit ? (
              <select
                className={`px-login-input `}
                name="customer-seacr"
                id="customer-seacr"
                {...register("cause_id")}             
              >
                <option value="">
                  choose reason
                </option>

                {blackListsCause &&
                  blackListsCause.map((cause) => (
                    <option key={cause?.id} value={cause?.id}>
                      {cause?.pms_blacklist_cause_en?.blacklist_cause_name_en}
                    </option>
                  ))}
              </select>
            ) : (
              <input
                className={`px-login-input disabled-input`}
                name="customer-seacr"
                id="customer-seacr"
                disabled="disabled"
                value={
                  details[0]?.cause_info?.pms_blacklist_cause_en
                    ?.blacklist_cause_name_en
                }
              />
            )}
            {/* <select
              className={`px-login-input`}
              name="customer-seacr"
              id="customer-seacr"
              disabled="disabled"
            // {...register("cause_id")}
              value={
                details[0]?.cause_info?.pms_blacklist_cause_en
                  ?.blacklist_cause_name_en
              }
            >
              <option value="" selected>
                {" "}
                choose reason
              </option>

              {blackListsCause &&
                blackListsCause.map((cause) => (
                  <option key={cause?.id} value={cause?.id}>
                    {cause?.pms_blacklist_cause_en?.blacklist_cause_name_en}
                  </option>
                ))}
            </select> */}

            {/* {...register("cause_id", {
                   required: true,
                 })}
            <option value="" selected>
                {" "}
                choose reason
              </option> */}
            {/* {blackListsCause &&
                blackListsCause.map((cause) => (
                  <option key={cause?.id} value={cause?.id}>
                    {cause?.pms_blacklist_cause_en?.blacklist_cause_name_en}
                  </option>
                ))} */}
            {/* </select> */}
            {/* {errors?.cause_id?.type === "required" && (
              <p className="text-danger m-0">{t("input.fieldRequired")}</p>
            )} */}
          </div>
        </div>
        <div className="form-inputs d-flex w-100 px-3">
          <div className="input-package mt-3 d-flex flex-column w-100">
            <label className="mb-2 modal-label" htmlFor="customer-seacr">
              notes
            </label>
            {edit ? (
              <textarea
                className={`px-text-area `}
                placeholder="Enter notes"
                {...register("blacklist_note")}
              />
            ) : (
              <textarea
                className={`px-text-area disabled-input`}
                placeholder="Enter notes"
                disabled="disabled"
                value={details[0]?.blacklist_note}
                //   {...register("blacklist_note")}
              />
            )}
          </div>
        </div>
        {/* <div className="add-by mt-3 d-flex w-100 px-3">
          <div className="label">added by :</div>
          <div className="content ms-3">
            {details[0]?.created_user_info?.username}
          </div>
          <div className="date ms-auto gray-text">
            {new Date(details[0]?.created_at).toLocaleDateString()}
          </div>
          
        </div> */}

        <div className="modal-footer mt-4 w-100">
          <button
            type="button"
            className="px-btn px-gray-btn me-3 d-flex justify-content-center"
            // data-bs-dismiss="modal"
            onClick={editCustomer}
          >
            edit
          </button>
          <button
            type={edit ? "submit" : "button"}
            className="px-btn px-blue-btn"
            onClick={remove}
          >
            {edit ? "save" : "remove"}
          </button>
        </div>

        {/* <FromButton 
        reset={reset}
         /> */}
      </form>
    </>
  );
};

export default BlockedCustomerDetails;
