/* eslint-disable react/prop-types */
import { createContext, useState } from "react";


export const ModalContext = createContext({});

export default function ModalContextProvider(props) {
  
 
    // close btn of form modal 

  const [showState, setShowState] = useState("close");
  console.log(showState);
  
  const handleClose = () => setShowState("close");

  // close btn of success and error modal
  const [modelState, setModelState] = useState({ status: "close", message: "" });
  const closeModal = () => {
    setModelState({ status: "close", message: "" });
  };
  
  return (
    <ModalContext.Provider
      value={{
        showState,
        handleClose,
        setShowState,
        
        closeModal,
        modelState,
        setModelState
      }}
    >
      {props.children}
    </ModalContext.Provider>
  );
}
