import React, { useState } from 'react'

export default function useModalState() {
    const [modalState, setModalState] = useState({ isOpen: false, data: null });
  const openModal = (data = null) => setModalState({ isOpen: true, data });
  const closeModal = () => setModalState({ isOpen: false, data: null });
  return { modalState, openModal, closeModal };
}
