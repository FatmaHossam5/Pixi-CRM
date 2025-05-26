// const ExportForms = () => {
//     const handleSaveFile = () => {
//         const fileName = "exported_file.txt"; // Default filename
//         const fileContent = "This is a test file content."; // Sample content

//         // Create a Blob (binary large object) containing file data
//         const blob = new Blob([fileContent], { type: "text/plain" });

//         // Create a URL for the Blob
//         const fileURL = URL.createObjectURL(blob);

//         // Create a temporary link element
//         const link = document.createElement("a");
//         link.href = fileURL;
//         link.download = fileName; // Set filename for download

//         // Append to document and trigger click to open "Save As" dialog
//         document.body.appendChild(link);
//         link.click();

//         // Cleanup
//         document.body.removeChild(link);
//         URL.revokeObjectURL(fileURL);
//     };

//     return (
//         <>
//             <form className="d-flex flex-column">
//                 <div className="form-inputs d-flex gap-3 px-3">
//                     {/* File Name Input */}
//                     <div className="input-package mt-3 d-flex flex-column flex-grow-1">
//                         <label className="mb-2">File Name</label>
//                         <input
//                             type="text"
//                             placeholder="Enter File Name"
//                             className="px-form-input"
//                         />
//                     </div>

//                     {/* Save File Button */}
//                     <div className="input-package mt-3 d-flex flex-column flex-grow-1 mb-2">
//                         <label className="mb-2">Save File</label>
//                         <button
//                             type="button"
//                             className="btn btn-outline-primary"
//                             onClick={handleSaveFile}
//                         >
//                             Browse
//                         </button>
//                     </div>
//                 </div>

//                 <div className="form-inputs d-grid" style={{ gridTemplateColumns: "100%" }}>
//                     <div className="input-package mt-3 d-flex flex-column">
//                         <label className="mb-2">File Type</label>
//                         <select name="FileType" className="px-login-input">
//                             <option value="">Select File Type</option>
//                             <option value="pdf">PDF</option>
//                             <option value="excel">Excel</option>
//                             <option value="csv">CSV</option>
//                         </select>
//                     </div>
//                 </div>

//                 <div className="d-flex justify-content-end px-3 mt-3">
//                     <button type="submit" className="px-btn">
//                         Export
//                     </button>
//                 </div>
//             </form>
//         </>
//     );
// };

// export default ExportForms;
// const ExportForms = ({handleClose,handleExportCSV ,handleExportExcel ,handleExportPDF }) => {
//     const handleSaveFile = () => {
//         // Example: Get file name from input (default to 'exported_file')
//         const fileName = document.getElementById("fileNameInput")?.value || "exported_file";
//         const fileType = document.getElementById("fileTypeSelect")?.value || "txt";

//         // Define file content (can be dynamic)
//         const fileContent = "This is a test file content."; // Replace with actual content

//         // Create a Blob (binary large object)
//         const blob = new Blob([fileContent], { type: "text/plain" });

//         // Create a URL for the Blob
//         const fileURL = URL.createObjectURL(blob);

//         // Create a temporary link element
//         const link = document.createElement("a");
//         link.href = fileURL;
//         link.download = `${fileName}.${fileType}`; // Set filename with selected type

//         // Append to document and trigger click (opens "Save As" window)
//         document.body.appendChild(link);
//         link.click();

//         // Cleanup
//         document.body.removeChild(link);
//         URL.revokeObjectURL(fileURL);
//            handleClose();
//     };

//     return (
//         <>
//             <form className="d-flex flex-column">
//                 <div className="form-inputs d-flex gap-3 px-3">
//                     {/* File Name Input */}
//                     <div className="input-package mt-3 d-flex flex-column flex-grow-1">
//                         <label className="mb-2">File Name</label>
//                         <input
//                             id="fileNameInput"
//                             type="text"
//                             placeholder="Enter File Name"
//                             className="px-form-input"
//                         />
//                     </div>

//                     {/* Save File Button */}
//                     <div className="input-package mt-3 d-flex flex-column flex-grow-1">
//                         <label className="mb-2">Save File</label>
//                         <button
//                             type="button"
//                             className="btn btn-outline-primary"
//                             onClick={handleSaveFile}
//                         >
//                             Browse
//                         </button>
//                     </div>
//                 </div>

//                 <div className="form-inputs d-grid" style={{ gridTemplateColumns: "100%" }}>
//                     <div className="input-package mt-3 d-flex flex-column">
//                         <label className="mb-2">File Type</label>
//                         <select id="fileTypeSelect" name="FileType" className="px-login-input">
//                             <option value="txt">Text (.txt)</option>
//                             <option value="csv">CSV (.csv)</option>
//                             <option value="json">JSON (.json)</option>
//                         </select>
//                     </div>
//                 </div>

//                 <div className="d-flex justify-content-end px-3 mt-3">
//                     <button type="button" className="px-btn">
//                         Export
//                     </button>
//                 </div>
//             </form>
//         </>
//     );
// };

// export default ExportForms;


import { useState } from "react";
import { Dropdown, Button } from "react-bootstrap";

const ExportForms = ({ handleClose, handleExportCSV, handleExportExcel, handleExportPDF }) => {
    const [fileName, setFileName] = useState("");
    return (
        <form className="d-flex flex-column">
            <div className="form-inputs d-flex gap-3 px-3">
                {/* File Name Input */}
                <div className="input-package mt-3 d-flex flex-column flex-grow-1">
                    <label className="mb-2">File Name</label>
                    <input id="fileNameInput" type="text" placeholder="Enter File Name" className="px-form-input"
                    
                    
                    />
                </div>
            </div>

            {/* Dropdown Export Options */}
            <div className="d-flex justify-content-end px-3 mt-3">
                <Dropdown>
                    <Dropdown.Toggle variant="primary" className="px-btn">
                        Export
                    </Dropdown.Toggle>

                    <Dropdown.Menu>
                        <Dropdown.Item onClick={handleExportCSV}>Export as CSV</Dropdown.Item>
                        <Dropdown.Item onClick={handleExportExcel}>Export as Excel</Dropdown.Item>
                        <Dropdown.Item onClick={handleExportPDF}>Export as PDF</Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
            </div>
        </form>
    );
};

export default ExportForms;
