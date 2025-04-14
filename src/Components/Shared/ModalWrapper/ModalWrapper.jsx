import React from 'react'
import { Modal } from 'react-bootstrap'

export default function ModalWrapper({ isOpen, onClose, title, children }) {
    return (
        <>
            <Modal show={isOpen} onHide={onClose} centered>
                <Modal.Header closeButton>
                    <h4>{title}</h4>
                </Modal.Header>
                <Modal.Body>{children}</Modal.Body>
            </Modal>
        </>

    )
}
