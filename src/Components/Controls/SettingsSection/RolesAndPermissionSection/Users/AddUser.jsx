import { useContext, useEffect, useState } from "react";
import FromButton from "../../../../Shared/FromButton/FromButton";
import { Controller, useForm } from "react-hook-form";
import Select from "react-select";
import { AuthContext } from "../../../../Helpers/Context/AuthContext";
import axios from "axios";
import { ModalContext } from "../../../../Helpers/Context/ModalContext";
import { useParams } from "react-router-dom";

const AddUser = () => {

  const {roleId} = useParams()

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = useForm({ mode: "all" });

  const { modelState, closeModal, setModelState, handleClose } =
    useContext(ModalContext);

  const { isDisabled, Headers, baseUrlMis, setIsDisabled, setIsLoading } =
    useContext(AuthContext);

  const [selectedUsers, setSelectedUsers] = useState([]);
  const [allUsers, setAllUsers] = useState([]);

  const getAllUsers = () => {
    axios
      .get(`${baseUrlMis}/user_controle/all/`, {
        headers: Headers,
      })
      .then((res) => {
        setAllUsers(res.data);
      })
      .catch((error) => {});
  };

  const AddNewUser = async (data) => {
    console.log(data);
    setIsLoading(true);
    setIsDisabled(true);

    try {
      const users = await axios.post(
        `${baseUrlMis}/assign-user-to-group/`,

        { user_id: data.users.value, group_id: roleId },
        {
          headers: Headers,
        }
      );

      if (users.status === 200 || 201) {
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
      getAllUsers();
      setIsLoading(false);
      setIsDisabled(false);
      // setTimeout(() => getAllUsers(), 100);
    }
  };

  useEffect(() => {
    getAllUsers();
  }, []);

  return (
    <>
      <form
        className={`d-flex flex-wrap justify-content-end ${
          isDisabled ? "disabled-layer" : ""
        }`}
        onSubmit={handleSubmit(AddNewUser)}
      >
        <div className="form-inputs d-flex w-100 px-3">
          <div className="input-package mt-3 d-flex flex-column w-100">
            <label className="mb-2">Select User</label>
            <Controller
              control={control}
              name="users"
              render={({ field }) => (
                <Select
                  {...field}
                  // isMulti
                  placeholder={"Select User"}
                  options={
                    allUsers &&
                    allUsers.map((user) => ({
                      value: user.id,
                      label: user?.username,
                    }))
                  }
                  isClearable
                  value={selectedUsers}
                  onChange={(selectedOption) => {
                    setSelectedUsers(selectedOption);
                    field.onChange(selectedOption);
                  }}
                  className={`border-0 test border-05 w-100 ${
                    isDisabled ? "disabled-input" : ""
                  } `}
                  classNamePrefix="select"
                  disabled={isDisabled}
                />
              )}
            />
          </div>
        </div>

        <FromButton reset={reset} />
      </form>
    </>
  );
};

export default AddUser;
