import React, { useContext, useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { AuthContext } from "../../../Helpers/Context/AuthContext";
import PhoneInput from "react-phone-number-input";
import axios from "axios";
import FromButton from "../../../Shared/FromButton/FromButton";
import useBranch from "../../../Helpers/Hook/useBranch";
import { ModalContext } from "../../../Helpers/Context/ModalContext";

const CreateUser = ({ getAllUsers }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    control,
  } = useForm({ mode: "all" });

  const {
    baseUrlPms,
    baseUrlMis,
    Headers,
    userId,
    orgId,
    setIsLoading,
    setIsDisabled,
    isDisabled,
  } = useContext(AuthContext);
  const { modelState, closeModal, setModelState, handleClose } =
    useContext(ModalContext);

  const { branchsData } = useBranch();

  const createUser = async (data) => {
    setIsLoading(true);
    setIsDisabled(true);
    console.log(data);
    const formData = new FormData();
    formData.append("first_name", data.first_name);
    formData.append("last_name", data.last_name);
    formData.append("username", data.username);
    formData.append("email", data.email);
    formData.append("password1", data.password1);
    formData.append("password2", data.password2);
    formData.append("user_phone", data.user_phone);
    formData.append("branch_id", data.branch_id);
    formData.append("user_photo", image);
    // if (data.user_photo && data.user_photo[0]) {
    //   formData.append("user_photo", data.user_photo[0]);
    console.log(image);

    // }
    try {
      const registration = await axios.post(
        `${baseUrlMis}/registration/`,
        formData,
        {
          headers: Headers,
        }
      );

      const uesrID = registration.data.id;

      const assignUserRole = await axios.post(
        `${baseUrlMis}/assign-user-to-group/`,
        {
          user_id: uesrID,
          group_id: data.group_id,
        },

        {
          headers: Headers,
        }
      );

      if (
        (registration.status &&
          assignUserRole.status ===
            //  paymentAccountDataEn.status &&
            // paymentAccountTypeDataEn
            200) ||
        201
      ) {
        setModelState({
          status: "success",
          message: "User created successfully!",
        });
      }
    } catch (error) {
      setModelState({
        status: "error",
        message:
          error.response?.data?.user_phone ||
          error.response?.data?.username ||
          "Invaild data",
      });
    } finally {
      handleClose();
      reset();
      getAllUsers()
      setIsLoading(false);
      setIsDisabled(false);
      // setTimeout(() => getAllUsers(), 100);
    }
  };

  const [roles, setRoles] = useState([]);
  const getRoles = () => {
    axios
      .get(`${baseUrlMis}/list_groups/`, {
        headers: Headers,
      })
      .then((res) => {
        setRoles(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const [image, setImage] = useState(null);
  const [viewImage, setViewImage] = useState(null);
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);

    if (file) {
    const imgUrl = URL.createObjectURL(file);
    setViewImage(imgUrl);
    }
  };

  useEffect(() => {
    getRoles();
  }, []);

  return (
    <>
      <form
        onSubmit={handleSubmit(createUser)}
        className={`d-flex flex-wrap ${isDisabled ? "disabled-layer" : ""}`}
      >
        <div className="form-inputs d-flex justify-content-center align-items-center flex-column px-3 mt-3 w-20">
          {/* <div className="user-img w-100 d-flex justify-content-center align-items-center p-3">
            <svg
              width={38}
              height={34}
              viewBox="0 0 38 34"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M24.8254 1.76537C26.7612 2.53587 27.3534 5.21921 28.145 6.08171C28.9366 6.94421 30.0694 7.23746 30.6961 7.23746C34.0273 7.23746 36.7279 9.93804 36.7279 13.2673V24.3744C36.7279 28.8402 33.1054 32.4627 28.6395 32.4627H9.35786C4.89011 32.4627 1.26953 28.8402 1.26953 24.3744V13.2673C1.26953 9.93804 3.97011 7.23746 7.30128 7.23746C7.92611 7.23746 9.05886 6.94421 9.85236 6.08171C10.6439 5.21921 11.2343 2.53587 13.1701 1.76537C15.1079 0.994875 22.8895 0.994875 24.8254 1.76537Z"
                stroke="#4B4F56"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M29.5317 12.2083H29.549"
                stroke="#4B4F56"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M25.0924 19.1634C25.0924 15.7977 22.365 13.0703 18.9993 13.0703C15.6337 13.0703 12.9062 15.7977 12.9062 19.1634C12.9062 22.5291 15.6337 25.2565 18.9993 25.2565C22.365 25.2565 25.0924 22.5291 25.0924 19.1634Z"
                stroke="#4B4F56"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          <input type="file" className="d-none" id="user-img" {...register("user_photo")} />
          <label
            className="gray-text mt-2 m-auto user-img-label"
            htmlFor="user-img"
          >
            <h6>Upload image</h6>
          </label> */}
          <div
            className={`user-img w-100 ${
              viewImage
                ? ""
                : "d-flex justify-content-center align-items-center p-3"
            }`}
          >
            {viewImage ? (
              <img
                src={viewImage}
                alt="User"
                style={{ width: "100%", height: "100%" }}
              />
            ) : (
              <svg
                width={38}
                height={34}
                viewBox="0 0 38 34"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M24.8254 1.76537C26.7612 2.53587 27.3534 5.21921 28.145 6.08171C28.9366 6.94421 30.0694 7.23746 30.6961 7.23746C34.0273 7.23746 36.7279 9.93804 36.7279 13.2673V24.3744C36.7279 28.8402 33.1054 32.4627 28.6395 32.4627H9.35786C4.89011 32.4627 1.26953 28.8402 1.26953 24.3744V13.2673C1.26953 9.93804 3.97011 7.23746 7.30128 7.23746C7.92611 7.23746 9.05886 6.94421 9.85236 6.08171C10.6439 5.21921 11.2343 2.53587 13.1701 1.76537C15.1079 0.994875 22.8895 0.994875 24.8254 1.76537Z"
                  stroke="#4B4F56"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M29.5317 12.2083H29.549"
                  stroke="#4B4F56"
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M25.0924 19.1634C25.0924 15.7977 22.365 13.0703 18.9993 13.0703C15.6337 13.0703 12.9062 15.7977 12.9062 19.1634C12.9062 22.5291 15.6337 25.2565 18.9993 25.2565C22.365 25.2565 25.0924 22.5291 25.0924 19.1634Z"
                  stroke="#4B4F56"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            )}
          </div>
          <input
            type="file"
            className="d-none"
            id="user-img"
            {...register("user_photo")}
            onChange={handleImageChange}
            disabled={isDisabled}
          />
          <label
            className="gray-text mt-2 m-auto user-img-label"
            htmlFor="user-img"
          >
            <h6>Upload image</h6>
          </label>
        </div>

        <div className="form-inputs d-flex flex-wrap w-80 px-3">
          <div className="input-package mt-3 pe-2 d-flex flex-column w-50">
            <label className="mb-2 modal-label" htmlFor>
              user first name
            </label>
            <input
              type="text"
              placeholder="Enter first name"
              className="px-form-input w-100 "
              {...register("first_name")}
              disabled={isDisabled}
            />
          </div>
          <div className="input-package mt-3 ps-2 d-flex flex-column w-50">
            <label className="mb-2 modal-label" htmlFor>
              user last name
            </label>
            <input
              type="text"
              placeholder="Enter last name"
              className="px-form-input w-100 "
              {...register("last_name")}
              disabled={isDisabled}
            />
          </div>

          <div className="input-package mt-3 pe-2 d-flex flex-column w-50">
            <label className="mb-2 modal-label" htmlFor>
              user name
            </label>
            <input
              type="text"
              placeholder="Enter user's name"
              className="px-form-input w-100 "
              {...register("username", {
                required: true,
                pattern: /^[a-zA-Z][a-zA-Z0-9_]{0,19}$/,
              })}
              disabled={isDisabled}
            />
            {errors?.username?.type === "required" && (
              <p className="text-danger ">field is required</p>
            )}
            {errors?.username?.type === "pattern" && (
              <p className="text-danger ">field is required</p>
            )}
          </div>
          <div className="input-package mt-3 ps-2 d-flex flex-column w-50">
            <label className="mb-2 modal-label" htmlFor>
              email
            </label>
            <input
              type="text"
              placeholder="Enter email"
              className="px-form-input w-100 "
              {...register("email")}
              disabled={isDisabled}
            />
          </div>
        </div>
        <div className="form-inputs mt-2 px-3 d-flex w-100">
          <div className="input-package mt-3 d-flex flex-wrap w-100">
            <label className="mb-2 w-100" htmlFor>
              mobile number
            </label>
            <Controller
              name="user_phone"
              control={control}
              rules={{ required: true }}
              render={({ field: { onChange, value } }) => (
                <PhoneInput
                  international
                  countryCallingCodeEditable={false}
                  defaultCountry="EG"
                  value={value}
                  onChange={onChange}
                  className={`px-form-input w-100 ${
                    isDisabled ? "disabled-input" : ""
                  }`}
                  disabled={isDisabled}
                />
              )}
            />
            {errors["user_phone"]?.type == "required" && (
              <p className="text-danger">feild is required</p>
            )}
          </div>
        </div>
        <div className="form-inputs d-flex w-100 px-3">
          <div className="input-package mt-3 pe-2 d-flex flex-column w-50">
            <label className="mb-2 modal-label" htmlFor>
              password
            </label>
            <input
              type="text"
              placeholder="Enter first name"
              className="px-form-input w-100 "
              {...register("password1")}
              disabled={isDisabled}
            />
          </div>
          <div className="input-package mt-3 ps-2 d-flex flex-column w-50">
            <label className="mb-2 modal-label" htmlFor>
              confirm password
            </label>
            <input
              type="text"
              placeholder="Enter last name"
              className="px-form-input w-100 "
              {...register("password2")}
              disabled={isDisabled}
            />
          </div>
        </div>
        <div className="form-inputs d-flex w-100 px-3">
          <div className="input-package mt-3 pe-2 d-flex flex-column w-50">
            <label className="mb-2 modal-label" htmlFor>
              select branch
            </label>
            <select
              type="text"
              className={`px-login-input  ${
                isDisabled ? "disabled-input" : ""
              }`}
              disabled={isDisabled}
              {...register("branch_id")}
            >
              <option value>select branch</option>
              {branchsData &&
                branchsData.map((branch) => (
                  <option key={branch.id} value={branch.id}>
                    {branch?.pms_branch_en?.branch_name_en}
                  </option>
                ))}
            </select>
          </div>
          <div className="input-package mt-3 ps-2 d-flex flex-column w-50">
            <label className="mb-2 modal-label" htmlFor>
              select Role
            </label>
            <select
              type="text"
              className="px-login-input "
              {...register("group_id")}
              disabled={isDisabled}
            >
              roles
              <option value="">select Role</option>
              {roles &&
                roles.map((role) => (
                  <option key={role.id} value={role.id}>
                    {role?.name}
                  </option>
                ))}
            </select>
          </div>
        </div>
        <div className="modal-footer mt-4 w-100">
          <FromButton reset={reset} />
        </div>
      </form>
    </>
  );
};

export default CreateUser;
