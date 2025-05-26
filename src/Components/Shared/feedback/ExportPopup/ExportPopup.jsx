// import { useContext } from "react";
// import FromButton from "../FromButton/FromButton";
// import { ModalContext } from "../../Helpers/Context/ModalContext";
// import { AuthContext } from "../../Helpers/Context/AuthContext";
// import { useForm } from "react-hook-form";

// const ExportPopup = ({ headers }) => {
//   const {
//     register,
//     formState: { errors },
//     reset,
//   } = useForm({ mode: "all" });

//   const {
//     isDisabled,
//   } = useContext(AuthContext);

//   return (
//     <>
//       <form
//         className={`d-flex flex-wrap justify-content-end ${
//           isDisabled ? "disabled-layer" : ""
//         }`}
//         // onSubmit={handleSubmit(createPurchase)}
//       >
//         <div className=" w-100 px-3">
//           <div className="">
//             <label className="fw-bold mb-3">- Table Attributes</label>
//           </div>

//           <div className=" form-inputs d-flex flex-wrap w-100">
//             {headers &&
//               headers?.map((head, key) => {
//                 return (
//                   <div className="input-package pe-2 d-flex  w-25  mb-2">
//                     <input type="checkbox" /> <span className="ms-2">{head}</span>
//                   </div>
//                 );
//               })}
//           </div>
//         </div>

//         <div className="form-inputs d-flex w-100 px-3">
//           <div className="input-package mt-3 pe-2 d-flex flex-column w-50">
//             <label className="mb-2">Number of Records</label>
//             <input
//               type="number"
//               placeholder="Enter Number of Records"
//               className="px-form-input w-100 "
//               {...register("number_of_items")}
//               disabled={isDisabled}
//             />
//           </div>
//           <div className="input-package mt-3 ps-2 d-flex flex-column w-50">
//             <label className="mb-2">File Type</label>
//             <select
//               name="FileType"
//               className="px-login-input"
//               //   {...register("FileType", {
//               //     required: true,
//               //   })}
//               disabled={isDisabled}
//             >
//               <option value="">Select File Type</option>
//             </select>
//             {errors?.vendor_id?.type === "required" && (
//               <p className="text-danger ">field is required</p>
//             )}
//           </div>
//         </div>

//         <FromButton reset={reset} />
//       </form>{" "}
//     </>
//   );
// };

// export default ExportPopup;

// import React, { useContext, useState } from "react";
// import FromButton from "../FromButton/FromButton";
// import { ModalContext } from "../../Helpers/Context/ModalContext";
// import { AuthContext } from "../../Helpers/Context/AuthContext";
// import { useForm } from "react-hook-form";

// const ExportPopup = ({
//   headers,
//   handleHeadersSelected,
//   selectedHeaders,
//   setSelectedHeaders,
// }) => {
//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//     reset,
//   } = useForm({ mode: "all" });
//   const { isDisabled } = useContext(AuthContext);
//   const { handleClose } = useContext(ModalContext);

//   // State to track selected headers
//   //   const [selectedHeaders, setSelectedHeaders] = useState([]);

//   // Handle checkbox change
//   const handleCheckboxChange = (header) => {
//     if (selectedHeaders.includes(header)) {
//       // Remove header if already selected
//       setSelectedHeaders(selectedHeaders.filter((h) => h !== header));
//     } else {
//       // Add header to selected list
//       setSelectedHeaders([...selectedHeaders, header]);
//     }
//   };

//   // Call the parent handler to update the selected headers
//   const handleSubmitt = () => {
//     try {
//       if (selectedHeaders.length !== 0) {
//         handleHeadersSelected(selectedHeaders);
//         console.log(selectedHeaders);
//       }
//     } catch (error) {
//       console.log(error);
//     } finally {
//       // }
//       handleClose();
//       selectedHeaders?.splice(0, selectedHeaders.length);
//       // console.log(selectedHeaders);
//       // reset();
//     }
//   };

//   return (
//     <>
//       <form
//         className={`d-flex flex-wrap justify-content-end ${
//           isDisabled ? "disabled-layer" : ""
//         }`}
//         onSubmit={handleSubmit(handleSubmitt)} // This will trigger when the "Add" button is clicked
//       >
//         <div className="w-100 px-3">
//           <label className="fw-bold mb-3">- Table Attributes</label>
//           <div className="form-inputs d-flex flex-wrap w-100">
//             {headers?.map((head, key) => (
//               <div key={key} className="input-package pe-2 d-flex w-25 mb-2">
//                 <input
//                   type="checkbox"
//                   value={head}
//                   onChange={() => handleCheckboxChange(head)}
//                 />
//                 <span className="ms-2">{head}</span>
//               </div>
//             ))}
//           </div>
//         </div>

//         <div className="form-inputs d-flex w-100 px-3">
//           <div className="input-package mt-3 pe-2 d-flex flex-column w-50">
//             <label className="mb-2">Number of Records</label>
//             <input
//               type="number"
//               placeholder="Enter Number of Records"
//               className="px-form-input w-100"
//               // {...register("number_of_items")}
//               disabled={isDisabled}
//             />
//           </div>
//           <div className="input-package mt-3 ps-2 d-flex flex-column w-50">
//             <label className="mb-2">File Type</label>
//             <select
//               name="FileType"
//               className="px-login-input"
//               disabled={isDisabled}
//             >
//               <option value="">Select File Type</option>
//               <option value="pdf">PDF</option>
//               <option value="excel">Excel</option>
//               <option value="csv">CSV</option>
//             </select>

//           </div>
//         </div>

//         <FromButton reset={reset} />
//       </form>
//     </>
//   );
// };

// export default ExportPopup;

import React, { useContext, useState } from "react";
import { ModalContext } from "../../Helpers/Context/ModalContext";
import { useForm } from "react-hook-form";
import Flatpickr from "react-flatpickr";
import "flatpickr/dist/themes/material_blue.css";
import { useLocation } from "react-router-dom";

const ExportPopup = ({
  headers,
  fileType,
  setFileType,
  handleAdvancedExport,
  selectedHeaders,
  setSelectedHeaders,
}) => {
  const { handleClose } = useContext(ModalContext);
  // const [selectedHeaders, setSelectedHeaders] = useState([]);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    control,
  } = useForm({ mode: "all" });

  const location = useLocation();
  console.log(location.pathname);

  // Handle checkbox change for selecting headers
  // const handleCheckboxChange = (header) => {
  //   if (selectedHeaders.includes(header)) {
  //     setSelectedHeaders(selectedHeaders.filter((h) => h !== header));

  //   } else {
  //     setSelectedHeaders([...selectedHeaders, header]);
  //   }
  // };
  const handleCheckboxChange = (header) => {
    setSelectedHeaders(
      (prevSelected) =>
        prevSelected.includes(header)
          ? prevSelected.filter((h) => h !== header) // Remove header if already selected
          : [...prevSelected, header] // Add header if not selected
    );
  };
  console.log(selectedHeaders);
  // console.log(header);

  // Submit and call the export function
  const handleSubmitt = (data) => {
    console.log(data.number_of_items);

    if (selectedHeaders.length > 0 && fileType) {
      handleAdvancedExport(selectedHeaders, fileType, data.number_of_items); // Call export with selected headers and file type
      handleClose();
      selectedHeaders.length = 0;
      console.log(selectedHeaders);
      reset();
    } else {
      alert("Please select columns and file type.");
    }
  };

  return (
    <>
      <form
        className="d-flex flex-wrap justify-content-end"
        onSubmit={handleSubmit(handleSubmitt)}
      >
        <div className="w-100 px-3">
          {
            /* eslint-disable no-constant-condition */
            [
              "/dashboard/allAddonRequest",
              "/dashboard/allSingleRequest",
              "/dashboard/allGroupRequest",
            ].includes(location.pathname) ? (
              <div className="form-inputs d-flex align-items-end justify-content-between w-100 mb-2">
                <div className="input-package mt-4 pe-2 d-flex flex-column w-50 ">
                  <label className htmlFor>
                    from
                  </label>
                  <div className="px-calendar w-100">
                    <Flatpickr
                      id="datePicker"
                      className="px-form-input w-100"
                      placeholder="YY/MM/DD"
                      dateFormat="Y-m-d"
                      // onChange={(e) => {
                      //   if (e.length > 0) {
                      //     setStartDate(e[0]);
                      //   }
                      // }}
                    />
                    <i className="fa-regular fa-calendar-days fa-xl px-calendar-icon" />
                  </div>
                </div>

                <div className="input-package mt-4 ps-2  d-flex flex-column w-50 ">
                  <label className htmlFor>
                    to
                  </label>
                  <div className="px-calendar w-100">
                    <Flatpickr
                      id="datePicker"
                      className="px-form-input w-100"
                      placeholder="YY/MM/DD"
                      // onChange={(e) => setEndDate(e[0])}
                    />
                    <i className="fa-regular fa-calendar-days fa-xl px-calendar-icon" />
                  </div>
                </div>
              </div>
            ) : (
              ""
            )
          }
          <label className="fw-bold mb-3">- Table Attributes</label>
          <div className="form-inputs d-flex flex-wrap w-100">
            {headers?.map((head, key) => (
              <div key={key} className="input-package pe-2 d-flex w-25 mb-2">
                <input
                  type="checkbox"
                  value={head}
                  onChange={() => handleCheckboxChange(head)}
                />
                <span className="ms-2">{head}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="form-inputs d-flex w-100 px-3">
          <div className="input-package mt-3 pe-2 d-flex flex-column w-50">
            <label className="mb-2">Number of Records</label>
            <input
              type="number"
              placeholder="Enter Number of Records"
              className="px-form-input w-100"
              {...register("number_of_items")}
              // disabled={isDisabled}
            />
          </div>
          <div className="input-package mt-3 ps-2 d-flex flex-column w-50">
            <label className="mb-2">File Type</label>
            <select
              name="FileType"
              className="px-login-input"
              value={fileType}
              {...register("type")}
              onChange={(e) => setFileType(e.target.value)}
            >
              <option value="">Select File Type</option>
              <option value="pdf">PDF</option>
              <option value="excel">Excel</option>
              <option value="csv">CSV</option>
            </select>
          </div>
        </div>

        <div className="w-100 d-flex justify-content-end px-3 mt-3">
          <button type="submit" className="px-btn">
            Export
          </button>
        </div>
      </form>
    </>
  );
};

export default ExportPopup;
