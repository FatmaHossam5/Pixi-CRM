import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';

const CreateSource = () => {
  const [imagePreview, setImagePreview] = useState(null);
  const[selectedFile,setSelectedFile]=useState(null);
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
  const { register, handleSubmit, formState: { errors } } = useForm();
  const handleCreateSource = (data) => {
    const formData= new FormData();
    formData.append('name',data.name);
    if(selectedFile){
      formData.append('image',selectedFile)
    }
    for (let pair of formData.entries()) {
      console.log(pair[0], pair[1]);
    }
    axios.post('https://tenant1.billiqa.com/api/sources', formData,{
      headers:{
        'Content-Type':'multipart/form-data'
      }
    }).then((res) => {
      console.log(res);

    }).catch((err) => {
      console.log(err);

    })
  }
  return (
    <>
      <div>
        <form onSubmit={handleSubmit(handleCreateSource)}>
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
          <div className="form-group">
            <label htmlFor="sourceName">Source Name</label>
            <input
              type="text"
              className="form-control"
              id="userName"
              placeholder="Enter Source Name"
              style={{ height: "48px", borderRadius: '4px' }}
              {...register('name')}
            />
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

export default CreateSource