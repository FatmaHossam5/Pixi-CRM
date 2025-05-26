const DropdownActions = ({ onEdit, onDelete }) => { 
  
  
  return(
  <div className="dropdown align-center w-60">
  <button
    className="btn dropdown-toggle"
    type="button"
    data-bs-toggle="dropdown"
    aria-expanded="false"
  >
    <i className="fa-regular fa-ellipsis actions"></i>
  </button>
  <ul className="dropdown-menu">
    <li>
      <button className="dropdown-item" onClick={onEdit}>
        <i className="fa-kit fa-edit"></i> Edit
      </button>
    </li>
    <li>
      <button className="dropdown-item text-danger" onClick={onDelete}>
        <i className="fa-kit fa-delete"></i> Delete
      </button>
    </li>
  </ul>
</div>
 )}

   
  ;
  export default DropdownActions