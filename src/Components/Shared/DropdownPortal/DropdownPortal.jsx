import React from 'react';
import ReactDOM from 'react-dom';

export default function DropdownPortal({children}) {
  return ReactDOM.createPortal (
 children,
 document.body
  )
}
