import axios from 'axios';
import React from 'react'
import { useState } from 'react';
import PhoneInput from 'react-phone-input-2';
import "react-phone-input-2/lib/style.css";


export default function CreateContacts() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    address: "",
    area_id: "",
  });
  const [imagePreview, setImagePreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const baseUrl = 'https://tenant1.billiqa.com/api'
  // Handle Image Upload
  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setImagePreview(URL.createObjectURL(file));
    }
  }

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handlePhoneChange = (value,country) => {
    setFormData({ ...formData,   phone: `+${value}` });
  };

  // Handle Submit - API Call
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccessMessage(null);

    try {
      const response = await axios.post(`${baseUrl}/clients`, formData);

      if (response.data) {
        setSuccessMessage("Client created successfully!");
        console.log(formData);

        setFormData({
          name: "",
          phone: "",
          email: "",
          address: "",
          area_id: "",
        });
      }
      console.log(formData);

    } catch (err) {
      console.log(formData);
      setError("Failed to create client. Please try again.");
    }

    setLoading(false);
  };
  return (
    <div>
      <form onSubmit={handleSubmit} className='py-4'>

        <div className="text-center my-3">
          <div
            className="border rounded  mx-auto"
            style={{ height: "102px", overflow: "hidden", width: "240px" }}

          >
            {imagePreview ? (
              <img
                src={imagePreview}
                alt="Preview"
                className="rounded"
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
            ) : (
              <div className=' ' style={{
                fontSize: "3rem", backgroundColor: "#E7E4E4", height
                  : "100%", display: "flex", justifyContent: "center", alignItems: "center"
              }}>
                <i className="fa-light fa-camera" style={{ color: "#4B4F56" }} />

              </div>
            )}
          </div>
        </div>

        {/* Upload Button */}
        <div className="text-center mb-3">
          <input
            type="file"
            id="uploadImage"
            className="d-none"
            accept="image/*"
            onChange={handleImageChange}
          />
          <label htmlFor="uploadImage" className="btn btn-outline-secondary py-2" style={{ width: "240px" }}>Upload Image</label>
        </div>
        <div>
          <div className="form-group">
            <label htmlFor="userName">User Name</label>
            <input type="text" className="form-control" id="userName" placeholder="Enter Name" style={{ height: "48px047" }} name="name" value={formData.name} onChange={handleChange} required />
          </div>
        
          <div>
            <div className="my-3 d-flex flex-column justify-content-between col-12">
              <label htmlFor="">Phone Number</label>
              <div className="row">
                <div className=" col-3 flag-container">
                  <PhoneInput
                    country={"eg"}
                    value={formData.phone}
                    onChange={handlePhoneChange}
                    containerClass=""
                    buttonClass="btn btn-light border-end-0 p-2"
                    inputClass="form-control border-0"
                    placeholder="Enter Phone Number"
                  />
                </div>
                <div className='col-9'>
                  <input type="text" name="phone" className="form-control" value={formData.phone} onChange={handleChange} required />
                </div>
              </div>
            </div>
            <div className="form-group mb-3">
            <label htmlFor="email">Email</label>
            <input type="text" className="form-control" id="email" placeholder="Enter Name" style={{ height: "48px047" }} name="email" value={formData.email} onChange={handleChange} required />
          </div>
            <div className="mb-3">
              <label className="form-label">Source</label>
              <select
                name="source"
                value={formData.source}
                onChange={handleChange}
                className="form-select"
                style={{
                  backgroundColor: "#f8f9fa", // Light gray background
                  border: "1px solid #ddd", // Soft border
                  borderRadius: "2px", // Rounded corners
                  padding: "8px",
                }}
              >
                <option value="">Select Source</option>
                <option value="friend">Friend</option>
                <option value="social">Social Media</option>
                <option value="advertisement">Advertisement</option>
              </select>
            </div>
            <div className="mb-3">
              <label className="form-label">City</label>
              <select
                name="area_id"
                value={formData.area_id}
                onChange={handleChange}
                className="form-select"
                style={{
                  backgroundColor: "#f8f9fa", // Light gray background
                  border: "1px solid #ddd", // Soft border
                  borderRadius: "2px", // Rounded corners
                  padding: "8px",
                }}
              >
                <option value="">Select City</option>
                <option value="10">City 5</option>
                <option value="9">City 6</option>
                <option value="8">City 7</option>
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="Address">Address</label>
              <input type="text" className="form-control" name="address" id="Address" placeholder="Enter Address" style={{ height: "48px047" }} value={formData.address} onChange={handleChange} />
            </div>
            <div className='d-flex justify-content-end mt-4 '>
              <div className='mt-3 mx-3'>
                <button type="submit" className="btn btn-outline-primary px-5" onClick={() => setFormData({ name: "", phone: "", email: "", address: "", area_id: "" })}> clear</button>
              </div>
              <div className="text-center mt-3 ">
                <button type="submit" className="btn btn-primary px-5"> Create</button>
              </div>

            </div>
          </div>
        </div>
        {error && <div className="alert alert-danger mt-3">{error}</div>}
        {successMessage && <div className="alert alert-success mt-3">{successMessage}</div>}
      </form>



    </div>
  )
}
