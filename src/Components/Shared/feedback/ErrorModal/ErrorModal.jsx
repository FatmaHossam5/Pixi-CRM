import { Modal } from "react-bootstrap";
import { useTranslation } from "react-i18next";

const ErrorModal = ({ show, closeModal, message }) => {
  const { t,i18n  } = useTranslation();

  return (
    <>
      <Modal show={show} onHide={closeModal} centered className="modal "  backdrop="static" dir={i18n.language === 'ar' ? 'rtl' : 'ltr'}>
        <div className="wrong-login d-flex flex-column justify-content-center w-100">
          <Modal.Header closeButton className='pb-0'> 
            <Modal.Title>
              <h4 className="m-0 ps-4">
              <i className={`fa-solid fa-circle-exclamation pe-2 ${i18n.language === 'ar' ? 'icon-rtl' : 'icon-ltr'}`}></i>
                {t('accessDenied')}
              </h4>
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <span className="gray-text">{message}</span>
          </Modal.Body>
        </div>
      </Modal>
    </>
  );
};

export default ErrorModal;
