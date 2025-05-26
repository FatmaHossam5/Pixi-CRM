import i18next from "i18next";
import { Modal } from "react-bootstrap";

const AddModal = ({ showState,
  handleClose,
  component,
  title,
  name,
  headerClassName = "modal-header",
  bodyClassName = "modal-body",
  modalClassName = "",
  headerStyle = {},
  bodyStyle = {}, }) => {


  const isRTL = i18next.language === 'ar';
  const modalId = `${name}-modal`;
  return (
    <Modal
      dir={isRTL ? 'rtl' : 'ltr'}
      show={showState === name}
      onHide={handleClose}
      centered
   
      backdrop="static"
      className={`modal ${modalClassName} `}
      aria-labelledby={`${modalId}-title`}
      aria-describedby={`${modalId}-content`}
    

    >

      <Modal.Header
        closeButton
        className={headerClassName}
        style={headerStyle}
        id={`${modalId}-title`}
      >
        <Modal.Title>
          <h4 className="w-100 modal-title px-3">{title}</h4>
        </Modal.Title>
      </Modal.Header>

      <Modal.Body
        className={`ms-0 ${bodyClassName}`}
        style={bodyStyle}
        id={`${modalId}-content`}
      >
        {component || <p>No content provided.</p>}
      </Modal.Body>


    </Modal>

  )
}
export default AddModal;

