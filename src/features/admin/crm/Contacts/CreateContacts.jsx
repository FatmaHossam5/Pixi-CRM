import axios from 'axios';
import React, { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import PhoneInput from 'react-phone-input-2';
import "react-phone-input-2/lib/style.css";
import { toast } from "react-toastify";
import useSource from '../../../../hooks/useSource';
import useLocationData from '../../../../hooks/useLocationData';


export default function CreateContacts({ refetch, initialData = {}, isEditMode = false, handleClose }) {
  // for image preview only
  const [imagePreview, setImagePreview] = useState(initialData.image_url || null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  const baseUrl = 'https://tenant1.billiqa.com/api';
  const { source } = useSource();
  const {
    countries, cities, areas,
    selectedCountry, setSelectedCountry,
    selectedCity, setSelectedCity,
    setSelectedArea
  } = useLocationData();
  console.log(cities);

  // React Hook Form setup
  const {
    register,
    handleSubmit,
    control,
    setValue,
    reset,
    formState: { errors }
  } = useForm({
    defaultValues: {
      name: initialData.name || '',
      phone: initialData.phone || '',
      email: initialData.email || '',
      address: initialData.address || '',
      source: initialData.source?.id ? String(initialData.source.id) : '',
      area_id: initialData.area?.id ? String(initialData.area.id) : '',
    }
  });


  const onSubmit = async data => {
    setLoading(true);
    setError(null);
    setSuccessMessage(null);

    try {
      // If you need to include an uploaded file, switch to FormData here
      const payload = { ...data };

      await axios.post(`${baseUrl}/clients`, payload);


      toast.success(isEditMode ? "Client updated!" : "Client created!");
      refetch();

      handleClose();

      if (!isEditMode) {
        reset({ name: '', phone: '', email: '', address: '', source: '', area_id: '' });
        setSelectedCountry(null);
        setSelectedCity(null);
        setSelectedArea(null);
        setImagePreview(null);
      }
    } catch {
      setError('Failed to save client. Please try again.');
      toast.error('Failed to save client. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // image handler stays the same
  const handleImageChange = e => {
    const file = e.target.files[0];
    if (file) setImagePreview(URL.createObjectURL(file));
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)} className='py-4'>
        {/* Image Preview */}

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
          {/* Name */}

          <div className="form-group">
            <label htmlFor="userName">User Name</label>
            <input
              {...register('name', { required: true })}
              type="text"
              className="form-control"
              placeholder="Enter Name"
              style={{ height: '48px' }}
            />
            {errors.name && <small className="text-danger">Name is required.</small>}
          </div>
          {/* Phone (Controller) */}

          <div>
            <div className="my-3 d-flex flex-column justify-content-between col-12">
              <label htmlFor="">Phone Number</label>

              <Controller
                name="phone"
                control={control}
                rules={{ required: true }}
                render={({ field }) => (
                  <div className="row">
                    <div className="col-3 flag-container">
                      {/* react-phone-input-2 */}
                      <PhoneInput
                        country="eg"
                        value={field.value}
                        onChange={field.onChange}
                        containerClass=""
                        buttonClass="btn btn-light border-end-0 p-2"
                        inputClass="form-control border-0"
                        placeholder="Enter Phone Number"
                      />
                    </div>
                    <div className="col-9">
                      {/* mirror in a normal text input if you really need it */}
                      <input
                        type="text"
                        className="form-control"
                        {...field}
                        required
                      />
                    </div>
                  </div>
                )}
              />
              {errors.phone && (
                <small className="text-danger">Phone is required.</small>
              )}
            </div>
          </div>
          {/* Email */}

          <div className="form-group mb-3">
            <label htmlFor="email">Email</label>
            <input
              {...register('email', { required: true })}
              type="email"
              className="form-control"
              placeholder="Enter Email"
              style={{ height: '48px' }}
            />
            {errors.email && <small className="text-danger">Valid email is required.</small>}          </div>
          {/* Source select */}
          <div className="mb-3">
            <label className="form-label">Source</label>
            <select
              {...register('source', { required: true })}
              className="form-select"
              style={{ backgroundColor: '#f8f9fa', border: '1px solid #ddd', borderRadius: '2px', padding: '8px' }}
            >
              <option value="">Select Source</option>
              {source.map(s => (
                <option key={s.id} value={s.id}>{s.name}</option>
              ))}
            </select>
            {errors.source && <small className="text-danger">Source is required.</small>}
          </div>

          {/* City/Area select */}
          <div className="mb-3">
            <label className="form-label">Country</label>
            <select
              className="form-select mb-2"
              style={{
                backgroundColor: "#f8f9fa",
                border: "1px solid #ddd",
                borderRadius: "2px",
                padding: "8px",
              }}
              value={selectedCountry || ''}
              onChange={e => {
                const c = e?.target?.value;
                setSelectedCountry(c);
                setSelectedCity(null);
                setValue('area_id', '');
              }}
            >
              <option value="">Select Country</option>
              {countries.map(c => (
                <option key={c.id} value={c.id}>{c?.title}</option>
              ))}
            </select>

            <label className="form-label">City</label>
            <select
              className="form-select mb-2"
              style={{
                backgroundColor: "#f8f9fa",
                border: "1px solid #ddd",
                borderRadius: "2px",
                padding: "8px",
              }}
              value={selectedCity || ''}
              onChange={e => {
                const ct = e.target.value;
                setSelectedCity(ct);
                setValue('area_id', '');
              }}
              disabled={!selectedCountry}
            >
              <option value="">Select City</option>
              {cities.map(c => (
                <option key={c.id} value={c.id}>{c?.title}</option>
              ))}
            </select>

            <label className="form-label">Area</label>
            <select
              {...register('area_id', { required: true })}
              className="form-select"
              style={{
                backgroundColor: "#f8f9fa",
                border: "1px solid #ddd",
                borderRadius: "2px",
                padding: "8px",
              }}
              disabled={!selectedCity}
            >
              <option value="">Select Area</option>
              {areas.map(a => (
                <option key={a.id} value={a.id}>{a.title}</option>
              ))}
            </select>
            {errors.area_id && <small className="text-danger">Area is required.</small>}
          </div>



          {/* Address */}
          <div className="form-group mb-3">
            <label>Address</label>
            <input
              {...register('address')}
              type="text"
              className="form-control"
              placeholder="Enter Address"
              style={{ height: '48px' }}
            />
          </div>
          <div className='d-flex justify-content-end mt-4 '>
            <div className='mt-3 mx-3'>
              <button type="submit" className="btn btn-outline-primary px-5" onClick={() => {
                reset({ name: '', phone: '', email: '', address: '', source: '', area_id: '' });
                setImagePreview(null);
              }}> clear</button>
            </div>
            <div className="text-center mt-3 ">
              <button type="submit" className="btn btn-primary px-5" disabled={loading}>           {isEditMode ? 'Update' : 'Create'}
              </button>
            </div>

          </div>
        </div>
        {/* Feedback */}
        {error && <div className="alert alert-danger mt-3">{error}</div>}
        {successMessage && <div className="alert alert-success mt-3">{successMessage}</div>}
      </form >

    </div>

  )
}
