import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form';
import PhoneInput from 'react-phone-input-2';
import useRole from '../../../../hooks/useRole';

export default function CreateUsers() {
    const [imagePreview, setImagePreview] = useState(null);
    const[selectedFile,setSelectedFile]=useState(null);
    const { register, handleSubmit, setValue, formState: { errors }, reset } = useForm();

    const{role}=useRole();

    const [formData, setFormData] = useState({
        name: "",
        phone: "",
        email: "",
        password: "",
        password_confirmation: "",
        
      });
    const handleImageChange = (event) => {
      const file = event.target.files[0];
      if (file) {
        setSelectedFile(file); 
      }
    };

    
      useEffect(() => {
        if (selectedFile) {
          const objectUrl = URL.createObjectURL(selectedFile);
          setImagePreview(objectUrl);
          return () => URL.revokeObjectURL(objectUrl); // Cleanup when component unmounts or file changes
        }
      }, [selectedFile]); 
      const handleCreateUser = async (data) => {
        console.log(data);
        
        try {
          const response = await axios.post('https://tenant1.billiqa.com/api/users', data);
          console.log(response);
          reset();
        } catch (error) {
          console.error("Error creating user:", error);
        }
      };
    
      const handlePhoneChange = (value) => {
        setValue("phone", `+${value}`);
      };
    
    return (
        <>
          <div>
            <form onSubmit={handleSubmit(handleCreateUser)}>
              <div className=' border rounded mx-auto'
                style={{
                  height: '102px',
                  width: '240px',
                  overflow: "hidden",
                  backgroundColor: "#E7E4E4",
                  fontSize: "3rem",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center"
                }}>
                {imagePreview ? (
                  <img
                    src={imagePreview}
                    alt='imagePreview'
    
                  />) :
                  (
                    <i className="fa-light fa-camera" style={{ color: "#4B4F56" }} />
    
                  )}
              </div>
    
              <div className="text-center mb-3 mt-2">
                <input
                  type="file"
                  id="uploadImage"
                  className="d-none "
                  accept="image/*"
                  onChange={handleImageChange}
                 
                  
    
                />
                <label htmlFor="uploadImage" className="btn btn-outline-secondary py-2" style={{ width: "240px" }}>Upload Image</label>
              </div>
              <div className="form-group mb-3">
                <label htmlFor="userName">User Name</label>
                <input
                  type="text"
                  className="form-control"
                  id="userName"
                  placeholder="Enter name"
                  style={{ height: "48px", borderRadius: '4px' }}
                  {...register('name', { required: true })}
                />
              </div>
              <div className="form-group mb-3">
                <label htmlFor="email">Email</label>
                <input
                  type="text"
                  className="form-control"
                  id="email"
                  placeholder="Enter Email"
                  style={{ height: "48px", borderRadius: '4px' }}
                  {...register('email', { required: true })}
                />
              </div>
              <div className="my-3 d-flex flex-column justify-content-between col-12">
              <label htmlFor="">Phone Number</label>
              <div className="row">
                <div className=" col-3 flag-container">
                  <PhoneInput
                    country={"eg"}
                    onChange={handlePhoneChange}
                    containerClass=""
                    buttonClass="btn btn-light border-end-0 p-2"
                    inputClass="form-control border-0"
                    placeholder="Enter Phone Number"
                  />
                </div>
                <div className='col-9'>
                  <input type="text" name="phone" className="form-control"  {...register('phone', { required: true })} />
                </div>
              </div>
            </div>
            <div className="form-group mb-3">
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  className="form-control"
                  id="password"
                  placeholder="Enter password"
                  style={{ height: "48px", borderRadius: '4px' }}
                  {...register('password', { required: true })}
                />
              </div>
              <div className="form-group mb-3">
                <label htmlFor="Cpassword">confirm password</label>
                <input
                  type="password"
                  className="form-control"
                  id="Cpassword"
                  placeholder="Enter password"
                  style={{ height: "48px", borderRadius: '4px' }}
                  {...register('password_confirmation', { required: true })}
                />
              </div>
              <div className="mb-3">
            <label className="form-label">Role</label>
            <select
              name="role"
              className="form-select"
              style={{
                backgroundColor: "#f8f9fa", // Light gray background
                border: "1px solid #ddd", // Soft border
                borderRadius: "2px", // Rounded corners
                padding: "8px",
              }}
              {...register('role', { required: true })}
            >
              <option value="">Select Role</option>
              {
                role.map((item) => (
                  <option key={item.id} value={item.id}>
                    {item.name}
                  </option>
                ))}

            </select>
          </div>
              <div className='mt-5 d-flex justify-content-end gap-3'>
    
                <button className='btn btn-outline-primary' style={{ width: '160px', height: '52px' }}>Clear</button>
    
    
                <button className='btn btn-primary' style={{ width: '160px', height: '52px' }}>Add</button>
    
              </div>
            </form>
          </div>
        </>
      )
    
}





