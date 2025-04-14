import React from 'react';
import { Modal } from 'react-bootstrap';

const SuccessModal = ({ show, closeModal, message }) => {
  return (
    <Modal show={show} onHide={closeModal} centered className="modal "   backdrop="static">
      <div className="right-login d-flex flex-column justify-content-center w-100">
        <Modal.Header closeButton className='pb-0'>
          <Modal.Title>
            <h4 className="m-0 ps-4">
              <i className="fa-solid fa-circle-check pe-2" />
              Access Granted
            </h4>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <span className="gray-text">{message}</span>
        </Modal.Body>
      </div>
    </Modal>
  );
};

export default SuccessModal;
