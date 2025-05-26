
import { useContext, useState } from "react";
import { ModalContext } from "../../Helpers/Context/ModalContext";
import AddFormOffcanvas from "../AddFormOffcanvas/AddFormOffcanvas";
import ExportForms from "../ExportForms/ExportForms";
import ManageColumnsForm from "../ManageColumnsForm/ManageColumnsForm";
import FilterationIcon from './FilterationIcon';
// import "jspdf-autotable"
import jsPDF from "jspdf";
import "jspdf-autotable";
import * as XLSX from "xlsx";

const SearchInput = ({
  search,
  setSearch,
  columns,
  handleColumnVisibilityChange,
  visibleColumns,
  setVisibleColumns,
  selectAll,
  setSelectAll,
  downloadCSV,
  filteredData,
  filteredRows,
  selectedRows,
  handleOtherAction,
  handleDelete,
  extraHeaderControls 
}) => {
  const [fileType, setFileType] = useState(""); // New state for file type
  const [isToggleOn, setIsToggleOn] = useState(true);


  // Handle "Select All" checkbox
  const handleSelectAll = () => {
    const newState = !selectAll;
    setSelectAll(newState);

    setVisibleColumns((prev) =>
      prev.map((col) => ({
        ...col,
        visible: col.name === columns[0].name ? true : newState,
      }))
    );
  };


  // Handle saving the visibility settings (e.g., persist in localStorage or API)
  const handleSaveVisibility = () => {
    console.log("Saved Columns Visibility:", visibleColumns);
    // Here you can persist the `visibleColumns` state to localStorage or call an API
    localStorage.setItem("columnsVisibility", JSON.stringify(visibleColumns));
  };



  const [headers, setHeaders] = useState(
    visibleColumns.map((col) => col.label || col.name)
  );
  const [selectedHeaders, setSelectedHeaders] = useState([]);

  const handleAdvancedExport = (selectedHeaders, fileType, numberOfRecords) => {
    // Create a mapping of selected headers to their corresponding columns
    const selectedColumns = visibleColumns.filter((col) =>
      col.visible && selectedHeaders.includes(col.label || col.name)
    );
    console.log(numberOfRecords);

   


    // Filter data based on selected columns
    const filteredData = filteredRows.map((row) => {
      return selectedColumns.reduce((acc, col) => {
        let value = typeof col.selector === "function" ? col.selector(row) : row[col.name] || "";

        if (typeof value === "object" && value !== null) {
          value = Array.isArray(value)
            ? value.map((item) => (typeof item === "object" ? JSON.stringify(item) : item)).join(", ")
            : JSON.stringify(value);
        }

        acc[col.label || col.name] = value;
        return acc;
      }, {});
    });

    // Now call the appropriate export function with filteredData
    if (fileType === "pdf") {
      exportPDF(filteredData, selectedColumns, numberOfRecords);
    } else if (fileType === "excel") {
      exportExcel(filteredData, selectedColumns, numberOfRecords);
    } else if (fileType === "csv") {
      exportCSV(filteredData, selectedColumns, numberOfRecords);
    }
  };

  // Existing export functions...
  async function loadFont(url) {
    try {
      const response = await fetch(url);
      if (!response.ok) throw new Error("Network response was not ok");
      const arrayBuffer = await response.arrayBuffer();
      const binaryString = String.fromCharCode(...new Uint8Array(arrayBuffer));
      return binaryString;
    } catch (error) {
      console.error("Failed to load font:", error);
      return null; // Return null if loading fails
    }
  }

  // PDF export function
  const exportPDFDropDown = () => {
    const doc = new jsPDF();

    const myFont = loadFont('../../Fonts/Amiri.ttf');
    // Add the font to jsPDF
    doc.addFileToVFS("MyFont.ttf", myFont);
    doc.addFont("MyFont.ttf", "MyFont", "normal");
    doc.setFont("MyFont");
    const visibleCols = visibleColumns.filter((col) => col.visible);
    const headers = visibleCols.map((col) => col.label || col.name);
    const rowData = filteredRows?.map((row) =>
      visibleCols.map((col) => {
        let value;
        if (typeof col.selector === "function") {
          value = col.selector(row);
        } else {
          value = row[col.name] || "";
        }
        if (typeof value === "object" && value !== null) {
          if (Array.isArray(value)) {
            return value
              .map((item) =>
                typeof item === "object" ? JSON.stringify(item) : item
              )
              .join(", ");
          }
          return JSON.stringify(value);
        }
        return value;
      })
    );



    doc.text("Table Export", 10, 10);
    doc.autoTable({
      head: [headers],
      body: rowData,
      styles: { fontSize: 8 },
      theme: "grid",
      margin: { top: 15 },
      pageBreak: "auto",
      didDrawPage: (data) => {
        doc.setFontSize(8);
        doc.text(
          "Page " + doc.internal.getCurrentPageInfo().pageNumber,
          4.5,
          3.8
        );
      },
    });

    doc.save("table.pdf");
  };



  const exportPDF = (data, columns, isRTL) => {
    const doc = new jsPDF();
  
    // Get only visible columns
    const selectedColumns = columns.filter((col) => col.visible);
    const headers = selectedColumns.map((col) => col.label || col.name);
  
    // Filter data
    const rows = data.map((row) =>
      selectedColumns.map((col) => {
        let value = row[col.name];
        return typeof value === "object" && value !== null ? JSON.stringify(value) : value;
      })
    );
  
    doc.autoTable({
      head: [headers],
      body: rows,
      styles: { font: "Amiri", fontSize: 10, halign: isRTL ? "right" : "left" },
      theme: "grid",
      margin: { top: 15 },
    });
  
    doc.save("table.pdf");
  };
  
  const exportCSVDropDown = () => {
    // Extract headers
    const visibleCols = visibleColumns.filter((col) => col.visible);
    const headers = visibleCols.map((col) => col.label || col.name).join(",");

    // Extract data using selectors
    const csvRows = filteredRows.map((row) =>
      visibleCols
        .map((col) => {
          let value;
          if (typeof col.selector === "function") {
            value = col.selector(row);
          } else {
            value = row[col.name] || "";
          }
          // Handle nested objects or arrays
          if (typeof value === "object" && value !== null) {
            if (Array.isArray(value)) {
              value = value
                .map((item) =>
                  typeof item === "object" ? JSON.stringify(item) : item
                )
                .join(", ");
            } else {
              value = JSON.stringify(value);
            }
          }
          // Sanitize CSV values by escaping quotes
          if (
            typeof value === "string" &&
            (value.includes(",") || value.includes('"'))
          ) {
            value = `"${value.replace(/"/g, '""')}"`;
          }
          return value;
        })
        .join(",")
    );
    const csvContent = [headers, ...csvRows].join("\n");
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", "table.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };




  const exportCSV = (data, columns) => {
    const headers = columns.map((col) => col.label || col.name).join(",");
    const rows = data
      .map((row) =>
        columns
          .map((col) => {
            let value = row[col.name];
            if (typeof value === "object" && value !== null) {
              value = JSON.stringify(value);
            }
            return `"${value}"`; // Escape quotes for CSV
          })
          .join(",")
      )
      .join("\n");

    const csvContent = [headers, ...rows].join("\n");
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", "table.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const exportExcel = (data, columns) => {
    const headers = columns.map((col) => col.label || col.name);
    const rows = data.map((row) =>
      columns.map((col) => {
        let value = row[col.name];
        if (typeof value === "object" && value !== null) {
          value = JSON.stringify(value);
        }
        return value;
      })
    );

    const worksheet = XLSX.utils.aoa_to_sheet([headers, ...rows]);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");
    XLSX.writeFile(workbook, "table.xlsx");
  };
  const exportExcelDropDown = () => {
    const dataToExport = filteredRows.map((row) =>
      visibleColumns.reduce((acc, col) => {
        let value;
        if (typeof col.selector === "function") {
          value = col.selector(row);
        } else {
          value = row[col.name] || "";
        }
        if (typeof value === "object" && value !== null) {
          if (Array.isArray(value)) {
            value = value
              .map((item) =>
                typeof item === "object" ? JSON.stringify(item) : item
              )
              .join(", ");
          } else {
            value = JSON.stringify(value);
          }
        }
        acc[col.label || col.name] = value;
        return acc;
      }, {})
    );

    const worksheet = XLSX.utils.json_to_sheet(dataToExport);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");
    XLSX.writeFile(workbook, "table.xlsx");
  };

  const { showState, handleClose, setShowState } = useContext(ModalContext);

  const handleShowAdd = () => {
    setShowState("export");
  };
  // Handle filtration icon click
  const handleFiltrationClick = () => {
    console.log('Filtration icon clicked!');
    // Add your filtration logic here or open a filtration modal
  };



  
  const [showManageColumns, setShowManageColumns] = useState("");

  const handleOpenManageColumns = () => {
    console.log("Opening Manage Columns"); // Debugging log
    setShowManageColumns("Manage Columns");  // Must match the name prop
  };

  const handleCloseManageColumns = () => {
    console.log("Closing Manage Columns");
    setShowManageColumns("");
  };


  const [showExport, setShowExport] = useState("");
  const handleOpenExport = () => {
    console.log("Opening export"); // Debugging log
    setShowExport("export");  // Must match the name prop
  };
const handleCloseExport = () => { 
  setShowExport("")
}


const handleExportPDF = () => {
  exportPDF(filteredRows, visibleColumns, isRTL);
};

const handleExportExcel = () => {
  exportExcel(filteredRows, visibleColumns);
};

const handleExportCSV = () => {
  exportCSV(filteredRows, visibleColumns);
};
  return (
    <>
      <AddFormOffcanvas
        name="export"
        showState={showExport}
        handleClose={handleCloseExport}
        title={`Advanced Export`}
        formComponent={
     

          <ExportForms
            handleClose={handleClose}
            handleExportPDF={handleExportPDF}
            handleExportExcel={handleExportExcel}
            handleExportCSV={handleExportCSV}
          />
        }
      />
      <div className="table-actions  d-flex ">
        <div className="table-search col-4" >
          <input
            type="search"
            className="px-form-input"
            placeholder="search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{
              width: '100%',
              height: '48px',
              padding: '12px 16px 12px 40px',
              borderRadius: '51px',
              border: '1px solid #ccc',
            }}
          />
          <svg
            className="search-icon"
            width={20}
            height={20}
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            style={{
              position: 'absolute',
              left: '15px', // Adjust as needed
              top: '50%',
              transform: 'translateY(-50%)',
            }}
          >
            <circle
              cx="9.8055"
              cy="9.8055"
              r="7.49047"
              stroke="#939393"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M15.0153 15.4043L17.9519 18.3333"
              stroke="#939393"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
      
          {/* Filtration Icon */}
          <div>
            <FilterationIcon onClick={handleFiltrationClick} />
          </div>

        </div>
        <div className=" ms-4 col-4 d-flex">
          {selectedRows.length > 0 && (
            <div className="bulk-actions d-flex align-items-center ms-1 ">
              <button
               
                className="btn btn-primary d-flex align-items-center justify-content-center py-3 px-5 me-3"
                style={{ height: '32px', borderRadius: '25px',  width: '97px' }}
              >
                <i className="fa-light fa-list-check" />
                <span style={{ margin: "0px 10px" }}>
                  {selectedRows?.length}
                </span>
                <i className="fa-kit fa-add" onClick={handleOtherAction}  style={{ cursor: 'pointer' }}/>

              </button>
              <button
                onClick={handleDelete}
                className="btn btn-danger  d-flex align-items-center justify-content-center"
                style={{ height: '32px', padding: '10px 16px', borderRadius: '25px'   ,gap: '8px',width: '103px' }}
              >
                <i className="fa-kit fa-delete " />
                <span>Delete</span>
              </button>
              <div className="form-check form-switch ms-3 d-flex align-items-center">
        <input
          type="checkbox"
          className="form-check-input"
          id="bulkToggle"
          checked={isToggleOn}
          onChange={() => setIsToggleOn(!isToggleOn)}
          style={{ 
            width: '48px',
            height: '24x',
            padding:"13px 38px",
            gap: '8px'
          }}
        />
        <label 
          className="form-check-label ms-2 mt-1" 
          htmlFor="bulkToggle"
          style={{ fontSize: '14px', color: '#1877F2' ,fontWeight: '600'}}
        >
        Active
        </label>
      </div>
            </div>
          )}
        </div>
        <div className="d-flex justify-content-end align-items-center col-4  ">
        <div>
          {extraHeaderControls}
        </div>
        <div className="  ms-3 me-5">
          <div className="dropdown">
            <button
              className="btn dropdown-toggle gen-action"
              type="button"
              id="dropdownMenuButton"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              <i className="fa-light fa-table-layout fa-2xl"></i>
              <i className="fa-kit fa-down ms-2 mt-1" />
            </button>
            <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton">
              <li>
                <button className="dropdown-item" onClick={handleOpenManageColumns}>

                  <i className="fa-kit fa-manage-column" /> Manage Columns
                </button>
              </li>
              <li>
                <button className="dropdown-item" onClick={handleOpenExport}>
                  <i className="fa-kit fa-exports" /> export
                </button>
              </li>
              <li>
                <button className="dropdown-item" onClick={exportExcelDropDown}>Export Excel</button>
              </li>
              <li>
                <button className="dropdown-item" onClick={handleShowAdd}>Advanced Export</button>
              </li>
            </ul>
          </div>
        </div>
        </div>
      </div >
  
      {/* Manage Columns Offcanvas */}
      <AddFormOffcanvas
        name="Manage Columns"
        showState={showManageColumns}
        handleClose={handleCloseManageColumns}
        title="Manage Columns"
        headerClassName="custom-header"
        formComponent={
          <ManageColumnsForm
            selectAll={selectAll}
            handleSelectAll={handleSelectAll}
            columns={columns}
            visibleColumns={visibleColumns}
            handleColumnVisibilityChange={handleColumnVisibilityChange}
            handleSaveVisibility={handleSaveVisibility}

          />
        }
      />
    </>
  );
};

export default SearchInput;


