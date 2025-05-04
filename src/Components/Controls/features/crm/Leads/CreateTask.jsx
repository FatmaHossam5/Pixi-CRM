import React from 'react'

export default function CreateTask() {
    const handleSubmit = (e) => {
        e.preventDefault();
        // handle the form submission logic
        alert("Task form submitted!");
      };
  return (
   
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="taskName" className="form-label">
              Task Name
            </label>
            <input type="text" className="form-control" id="taskName" placeholder="Enter Task Name" style={{width:"496px" ,height:'48px'}} />
          </div>
    
          <div className="mb-3">
            <label htmlFor="taskDescription" className="form-label">
              Task Description
            </label>
            <textarea className="form-control" id="taskDescription" placeholder="Enter description"style={{width:"496px" ,height:'160px'}} />
          </div>
    
          <div className="mb-3">
            <label htmlFor="dueDate" className="form-label">
              Due Date
            </label>
            <input type="date" className="form-control" id="dueDate"style={{width:"496px" ,height:'48px'}}  />
          </div>
          <div className="mb-3">
            <label htmlFor="dueTime" className="form-label">
            Due time
            </label>
            <input type="time" className="form-control" id="dueTime"style={{width:"496px" ,height:'48px'}}  />
          </div>
          <div style={{width:"496px" }} className="mt-5">
          <div className="d-flex justify-content-end  gap-2" >
            <button type="button" className="btn btn-secondary " onClick={() => window.history.back()} style={{width:"160px" ,height:'52px'}}>
              Clear
            </button>
            <button type="submit" className="btn btn-primary"style={{width:"160px" ,height:'52px'}}>
              Create
            </button>
          </div>
          </div>
    
        </form>
      );
 
}
