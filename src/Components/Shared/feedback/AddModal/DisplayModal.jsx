import React, { useContext, useEffect } from 'react'
import SuccessModal from '../SuccessModal/SuccessModal';
import ErrorModal from '../ErrorModal/ErrorModal';
import { ModalContext } from '../../Helpers/Context/ModalContext';

const DisplayModal = () => {

    const { modelState, closeModal } =
    useContext(ModalContext); 
  return (
    <>
      <ErrorModal
        show={modelState.status === "error"}
        closeModal={closeModal}
        message={modelState.message}
      />
      <SuccessModal
        show={modelState.status === "success"}
        closeModal={closeModal}
        message={modelState.message}
      />
    </>
  )
}

export default DisplayModal
