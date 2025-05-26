import { Modal } from "react-bootstrap";

const DeleteModal = ({ show, closeModal, id, fun, text }) => {
  return (
    <Modal
      show={show}
      onHide={closeModal}
      centered
      className="modal d-flex justify-content-center"
      backdrop="static"
    >
      <div className="">
        <Modal.Header>
          <Modal.Title className=" m-auto wrong-message">
            <i className="fa-regular fa-circle-exclamation fs-1"></i>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <span className="gray-text">
            Are you sure you want to delete this {text}?
          </span>
        </Modal.Body>
        <Modal.Footer>
          <button type="button" onClick={closeModal} className="px-btn bg-transparent">
            Cancel
          </button>
          <button
            type="button"
            className="px-btn px-minus-btn"
            onClick={fun}
          >
            Yes, delete
          </button>
        </Modal.Footer>
      </div>
    </Modal>
  );
};

export default DeleteModal;
