import { Modal } from "react-bootstrap";
import Loader from "../Loader/Loader";
import { useContext } from "react";
import { AuthContext } from "../../Helpers/Context/AuthContext";
import { ModalContext } from "../../Helpers/Context/ModalContext";

const EditButton = () => {
    const {  isLoading, isDisabled } = useContext(AuthContext);
    const { handleClose } = useContext(ModalContext);

 
    return (
      <>
        <Modal.Footer className="mt-4">
          <div className="d-flex text-center">
            <button
              type="button"
              className={`px-btn px-gray-btn me-3 d-flex justify-content-center ${isDisabled ? 'custom-not-allowed' : ''}
              data-bs-dismiss="modal" `}
              onClick={handleClose}
              disabled={isDisabled}
            >
             Close
            </button>
            {/* <button type="submit" className="px-btn px-blue-btn">
              Add
            </button> */}
            {isLoading ? (
              <div className="px-btn bg-transparent d-flex ">
                <Loader />
              </div>
            ) : (
              <button type="submit" className="px-btn px-blue-btn">
                Save
              </button>
            )}
          </div>
        </Modal.Footer>
      </>
    );
}

export default EditButton