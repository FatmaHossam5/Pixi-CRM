import { useContext } from "react";
import { Modal } from "react-bootstrap";
import { AuthContext } from "../../Helpers/Context/AuthContext";
import Loader from "../../feedback/Loader/Loader";
import { useTranslation } from "react-i18next";

const FromButton = ({ reset ,clearFileInput,buttonLabel,disabled }) => {
  const { t } = useTranslation()
  const { isLoading, isDisabled } = useContext(AuthContext);
  const handleClear = () => {
    reset();
    clearFileInput(); // Call the function to clear the file input

  };

  return (
    <>
      <Modal.Footer className="mt-4">
        <div className="d-flex text-center custom-form-inputs btn-custom-sapce">
          <button
            type="button"
            className={`px-btn px-gray-btn me-3 d-flex justify-content-center ${isDisabled ? 'custom-not-allowed' : ''}
            data-bs-dismiss="modal" `}
            onClick={handleClear}
            disabled={isDisabled}
          >
            {t("formButton.clear")}
          </button>
          {/* <button type="submit" className="px-btn px-blue-btn">
            Add
          </button> */}
          {isLoading ? (
            <div className="px-btn bg-transparent d-flex ">
              <Loader />
            </div>
          ) : (
            <button type="submit" className={`px-btn px-blue-btn ${disabled ? "px-disabled-btn" : ""}`} disabled={disabled}>
             {buttonLabel || t("formButton.add")} 
            </button>
          )}
        </div>
      </Modal.Footer>
    </>
  );
};

export default FromButton;
