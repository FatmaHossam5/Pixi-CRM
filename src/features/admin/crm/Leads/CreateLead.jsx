import React, { useContext, useEffect } from "react";
import { useForm } from "react-hook-form";
import { ToastContext } from "../../../../Helpers/Context/ToastContext ";
import useContact from "../../../../Helpers/Hook/useContact";
import useSource from "../../../../Helpers/Hook/useSource";
import FromButton from "../../../../Shared/FromButton/FromButton";
import SectionTitle from "../../../../Template/SectionTitle/SectionTitle";
const CreateLead = ({ initialData = {} }) => {

  const { showToast } = useContext(ToastContext);
  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm({  mode: "all",
    defaultValues: initialData,});




  const { source } = useSource();
  const { contact } = useContact();



  // If initialData changes (for example, when editing a lead), reset the form fields.
  useEffect(() => {
    reset(initialData);
  }, [initialData, reset]);

  const onSubmit = (data) => {
    // Handle create or update logic here.
    // For example, you might send data to your API and then show a toast:
    console.log("Form submitted data:", data);
    showToast("Lead saved successfully!");
    // Optionally, reset the form or close the offcanvas.
  };
  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="form-inputs  w-100 px-3 custom-form-inputs form-inputs-row">
          <SectionTitle title="Contact Info" />
          <div className="mb-3">
            <label className="form-label">Contact Name</label>
            <select 
            name="contact"
            {...register("contact")}
              className="form-select"
              style={{
                backgroundColor: "#f8f9fa", // Light gray background
                border: "1px solid #ddd", // Soft border
                borderRadius: "2px", // Rounded corners
                padding: "8px",
              }}>
              <option value="">Select Contact</option>
              {contact && contact.length > 0 && contact.map((item) => (
                <option key={item.id} value={item.id}>
                  {item.name}
                </option>
              ))}
            </select>

          </div>
          <div className="form-group mb-3">
            <label htmlFor="contactNumber">Contact Number</label>
            <input type="text"
              className="form-control"
              id="contactNumber"
              placeholder="Enter contact number"
              style={{ height: "48px047" }} />
          </div>
          <div className="form-group mb-3">
            <label htmlFor="contactEmail">Contact Email</label>
            <input type="text"
              className="form-control"
              id="contactEmail"
              placeholder="Enter contact email"
              style={{ height: "48px047" }} />
          </div>
          <div className="mb-3">
            <label className="form-label">Source</label>
            <select
              name="source"
              className="form-select"
              style={{
                backgroundColor: "#f8f9fa", // Light gray background
                border: "1px solid #ddd", // Soft border
                borderRadius: "2px", // Rounded corners
                padding: "8px",
              }}
            >
              <option value="">Select Source</option>
              {
                source.map((item) => (
                  <option key={item.id} value={item.id}>
                    {item.name}
                  </option>
                ))}

            </select>
          </div>
          <SectionTitle title="Lead Info" />
          <div className="mb-3">
            <label className="form-label">Pipeline</label>
            <select name="pipeline"
              className="form-select"
              style={{
                backgroundColor: "#f8f9fa", // Light gray background
                border: "1px solid #ddd", // Soft border
                borderRadius: "2px", // Rounded corners
                padding: "8px",
              }}>
              <option value="">Select Pipeline</option>
              {contact && contact.length > 0 && contact.map((item) => (
                <option key={item.id} value={item.id}>
                  {item.name}
                </option>
              ))}
            </select>
          </div>
          <div className="mb-3">
            <label className="form-label">Stage</label>
            <select name="stage"
              className="form-select"
              style={{
                backgroundColor: "#f8f9fa", // Light gray background
                border: "1px solid #ddd", // Soft border
                borderRadius: "2px", // Rounded corners
                padding: "8px",
              }}>
              <option value="">Select Stage</option>
              {contact && contact.length > 0 && contact.map((item) => (
                <option key={item.id} value={item.id}>
                  {item.name}
                </option>
              ))}
            </select>
          </div>
          <div className="mb-3">
            <label className="form-label">Status</label>
            <select name="status"
              className="form-select"
              style={{
                backgroundColor: "#f8f9fa", // Light gray background
                border: "1px solid #ddd", // Soft border
                borderRadius: "2px", // Rounded corners
                padding: "8px",
              }}>
              <option value="">Select Status</option>
              {contact && contact.length > 0 && contact.map((item) => (
                <option key={item.id} value={item.id}>
                  {item.name}
                </option>
              ))}
            </select>
          </div>
          <div className="mb-3">
            <label className="form-label">Industry</label>
            <select name="industry"
              className="form-select"
              style={{
                backgroundColor: "#f8f9fa", // Light gray background
                border: "1px solid #ddd", // Soft border
                borderRadius: "2px", // Rounded corners
                padding: "8px",
              }}>
              <option value="">Select Industry</option>
              {contact && contact.length > 0 && contact.map((item) => (
                <option key={item.id} value={item.id}>
                  {item.name}
                </option>
              ))}
            </select>
          </div>
          <div className="mb-3">
            <label className="form-label">Service</label>
            <select name="service"
              className="form-select"
              style={{
                backgroundColor: "#f8f9fa", // Light gray background
                border: "1px solid #ddd", // Soft border
                borderRadius: "2px", // Rounded corners
                padding: "8px",
              }}>
              <option value="">Select Service</option>
              {contact && contact.length > 0 && contact.map((item) => (
                <option key={item.id} value={item.id}>
                  {item.name}
                </option>
              ))}
            </select>
          </div>
          <div className="mb-3">
            <label className="form-label">SubService</label>
            <select name="service"
              className="form-select"
              style={{
                backgroundColor: "#f8f9fa", // Light gray background
                border: "1px solid #ddd", // Soft border
                borderRadius: "2px", // Rounded corners
                padding: "8px",
              }}>
              <option value="">Select SubService</option>
              {contact && contact.length > 0 && contact.map((item) => (
                <option key={item.id} value={item.id}>
                  {item.name}
                </option>
              ))}
            </select>
          </div>
          <div className="form-group mb-3">
            <label htmlFor="value">Value</label>
            <input type="text"
              className="form-control"
              id="value"
              placeholder="Enter Value"
              style={{ height: "48px047" }} />
          </div>
          <SectionTitle title="Agent Info" />
          <div className="mb-3">
            <label className="form-label">Leader</label>
            <select name="leader"
              className="form-select"
              style={{
                backgroundColor: "#f8f9fa", // Light gray background
                border: "1px solid #ddd", // Soft border
                borderRadius: "2px", // Rounded corners
                padding: "8px",
              }}>
              <option value="">Select Leader</option>
              {contact && contact.length > 0 && contact.map((item) => (
                <option key={item.id} value={item.id}>
                  {item.name}
                </option>
              ))}
            </select>
          </div>
          <div className="mb-3">
            <label className="form-label">Sales Agent</label>
            <select name="sales agent"
              className="form-select"
              style={{
                backgroundColor: "#f8f9fa", // Light gray background
                border: "1px solid #ddd", // Soft border
                borderRadius: "2px", // Rounded corners
                padding: "8px",
              }}>
              <option value="">Select SalesAgent</option>
              {contact && contact.length > 0 && contact.map((item) => (
                <option key={item.id} value={item.id}>
                  {item.name}
                </option>
              ))}
            </select>
          </div>
        </div>
        <FromButton reset={reset} />
      </form>
    </>
  );
};

export default CreateLead;
