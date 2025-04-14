import React, { useEffect, useRef, useState } from 'react';
import DropdownPortal from '../../Shared/DropdownPortal/DropdownPortal'

export default function Dropdown({ dropdownContent, id, openDropdownId, setOpenDropdownId, onDelete }) {

  const [dropdownStyles, setDropdownStyles] = useState({});
  const buttonRef = useRef();
  const toggleDropdown = () => {
    console.log(openDropdownId);
    
    if (openDropdownId === id) {
   
      
      setOpenDropdownId(null)
    } else {
      setOpenDropdownId(id)
    }
    
   

  }

  useEffect(() => {
 
    if (openDropdownId === id && buttonRef.current) {
      const { top, left, height } = buttonRef.current.getBoundingClientRect();
      setDropdownStyles({
        position: 'absolute',
        top: `${top + height + window.scrollY}px`,
        left: `${left + window.screenX}px`,
        zIndex: 1000,
        display: 'block',
      })
    }
  
   
  }, [openDropdownId, id])
  
  const handleOutsideClick = (event) => {
    if (openDropdownId === id && !event.target.closest('.dropdown-menu') ) {
      setOpenDropdownId(null);
    }
  };
  useEffect(() => {
    if (openDropdownId === id) {
      window.addEventListener('click', handleOutsideClick);
    } else {
      window.removeEventListener('click', handleOutsideClick);
    }

    return () => {
      window.removeEventListener('click', handleOutsideClick); 
    };
  }, [openDropdownId, id]);
  return (
    <>
      <button 
      ref={buttonRef} 
      onClick={toggleDropdown} 
      className='btn p-0 dropdown-toggle ts '>
        <svg width="18" height="7" viewBox="0 0 25 7" fill="none" xmlns="http://www.w3.org/2000/svg" >
          <path d="M17.9909 3.5C17.9909 4.31223 18.3185 5.09118 18.9016 5.66551C19.4848 6.23984 20.2757 6.5625 21.1003 6.5625C21.925 6.5625 22.7159 6.23984 23.299 5.66551C23.8822 5.09118 24.2098 4.31223 24.2098 3.5C24.2098 2.68777 23.8822 1.90882 23.299 1.33449C22.7159 0.760156 21.925 0.4375 21.1003 0.4375C20.2757 0.4375 19.4848 0.760156 18.9016 1.33449C18.3185 1.90882 17.9909 2.68777 17.9909 3.5ZM9.10678 3.5C9.10678 4.31223 9.43438 5.09118 10.0175 5.66551C10.6006 6.23984 11.3915 6.5625 12.2162 6.5625C13.0409 6.5625 13.8318 6.23984 14.4149 5.66551C14.9981 5.09118 15.3257 4.31223 15.3257 3.5C15.3257 2.68777 14.9981 1.90882 14.4149 1.33449C13.8318 0.760156 13.0409 0.4375 12.2162 0.4375C11.3915 0.4375 10.6006 0.760156 10.0175 1.33449C9.43438 1.90882 9.10678 2.68777 9.10678 3.5ZM3.3321 0.4375C2.50742 0.4375 1.71652 0.760156 1.13339 1.33449C0.550257 1.90882 0.222656 2.68777 0.222656 3.5C0.222656 4.31223 0.550257 5.09118 1.13339 5.66551C1.71652 6.23984 2.50742 6.5625 3.3321 6.5625C4.15677 6.5625 4.94767 6.23984 5.53081 5.66551C6.11394 5.09118 6.44154 4.31223 6.44154 3.5C6.44154 2.68777 6.11394 1.90882 5.53081 1.33449C4.94767 0.760156 4.15677 0.4375 3.3321 0.4375Z" fill="#4B4F56" />
        </svg>
      </button>
      {openDropdownId === id && (<DropdownPortal>
        <div className='dropdown-menu' style={dropdownStyles}>
          {React.Children.map(dropdownContent, child =>
            child.props.children.type === 'a' && child.props.children.props.onClick
              ? React.cloneElement(child, { onClick: () => onDelete(id) })
              : child
          )}
        </div>
      </DropdownPortal>)}

    </>
  )
}
