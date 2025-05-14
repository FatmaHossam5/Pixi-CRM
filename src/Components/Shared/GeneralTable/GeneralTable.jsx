import { useEffect, useMemo, useState } from "react";
import DataTable from "react-data-table-component";
import SearchInput from "../SearchInput/SearchInput";

const GeneralTable = ({ filteredRows, columns,extraHeaderControls,  customContent, viewMode }) => {
 
  const [search, setSearch] = useState("");
  const [visibleColumns, setVisibleColumns] = useState(
    columns?.map((col) => ({ ...col, visible: true })) // Default all columns to visible
  );
  const [selectAll, setSelectAll] = useState(false);
  const [selectedRows, setSelectedRows] = useState([]);
  const [toggleCleared, setToggleCleared] = useState(false);
  // Download CSV function
  const downloadCSV = (data) => {
    const csvRows = [];
    const headers = Object.keys(data[0]); // Get headers from the first row of data
    csvRows.push(headers.join(',')); // Add headers to CSV

    for (const row of data) {
      csvRows.push(Object.values(row).join(',')); // Add each row of data
    }

    const csvString = csvRows.join('\n');
    const blob = new Blob([csvString], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.setAttribute('href', url);
    a.setAttribute('download', 'data.csv');
    a.click();
  };

  // Custom styles for the DataTable
  const customStyles = {
    table: {
      style: {
        tableLayout: 'fixed',
      },
    },
    headRow: {
      style: {
        borderTopStyle: 'solid',
        borderTopWidth: '1px',
        borderColor: "#0000001A",
        borderLeftStyle: 'solid',
        borderLeftWidth: '1px',
      },
    },
    rows: {
      style: {
        minHeight: "72px",
        fontSize: "1rem",
        borderBottomStyle: 'solid',
        borderBottomWidth: '2px',
        borderColor: "#0000001A",
      },
    },
    headCells: {
      style: {
        backgroundColor: "#f9f9f9",
        color: "#000",
        paddingLeft: "8px",
        paddingRight: "8px",
        fontSize: "1rem",
        borderRightStyle: 'solid',
        borderRightWidth: '1px',
        borderColor: "#0000001A",
      },
    },
    cells: {
      style: {
        paddingLeft: "8px",
        paddingRight: "8px",
        fontSize: "1rem",
        borderRightStyle: 'solid',
        borderRightWidth: '1px',
        borderColor: "#0000001A",
      },
    },
    tableWrapper: {
      style: {
        overflowX: 'auto',
      },
    },
  };


  // Load saved column visibility from localStorage on component mount
  useEffect(() => {
    const savedVisibility = localStorage.getItem("columnsVisibility");
    if (savedVisibility) {
      const parsedVisibility = JSON.parse(savedVisibility);
      const mergedVisibility = columns.map((col) => {
        const savedColumn = parsedVisibility.find((c) => c.name === col.name);
        return {
          ...col,
          visible: savedColumn ? savedColumn.visible : true,
        };
      });
      setVisibleColumns(mergedVisibility);
    }
  }, [columns]);

  // Handle column visibility change
  const handleColumnVisibilityChange = (columnName) => {
    if (columnName === columns[0].name) return; // Skip the first column (usually selectable rows)

    setVisibleColumns((prev) =>
      prev.map((col) =>
        col.name === columnName ? { ...col, visible: !col.visible } : col
      )
    );

    const updatedVisibleColumns = visibleColumns.map((col) =>
      col.name === columnName ? { ...col, visible: !col.visible } : col
    );

    const allSelected = updatedVisibleColumns.every(
      (col) => col.name === columns[0].name || col.visible
    );

    setSelectAll(allSelected);
  };

  // Filter data based on search and visible columns
  const filteredData = useMemo(() => {
    return filteredRows?.filter((row) =>
      visibleColumns
        .filter((col) => col.visible)
        .some((column) => {
          const value = column.selector ? column.selector(row) : row[column.name];
          return value && value.toString().toLowerCase().includes(search.toLowerCase());
        })
    );
  }, [search, filteredRows, visibleColumns]);

  // Handle row selection
  const handleRowSelected = ({ selectedRows }) => {
    setSelectedRows(selectedRows);
  };

  // Handle delete action
  const handleDelete = () => {
    console.log("Deleting rows:", selectedRows);
    setToggleCleared(!toggleCleared);
    setSelectedRows([]);
  };

  // Handle other actions (e.g., clear selection)
  const handleOtherAction = () => {
    setSelectedRows([]);
    setToggleCleared((prev) => !prev);
  };

  return (
    <div className="px-content mb-auto mt-3">
      <div className="col-12">
        <div className="table-responsive px-table-container">
        <SearchInput
              search={search}
              setSearch={setSearch}
              handleColumnVisibilityChange={handleColumnVisibilityChange}
              visibleColumns={visibleColumns}
              setVisibleColumns={setVisibleColumns}
              columns={columns}
              selectAll={selectAll}
              setSelectAll={setSelectAll}
              downloadCSV={downloadCSV}
              filteredData={filteredData}
              filteredRows={filteredRows}
              selectedRows={selectedRows}
              handleDelete={handleDelete}
              handleOtherAction={handleOtherAction}
              extraHeaderControls={extraHeaderControls}
            />
        {viewMode === 'board' && customContent ? (
    <div className="pt-3">{customContent}</div>
  ) : (
          <div>
     
            <DataTable
              columns={visibleColumns.filter((col) => col.visible)}
              data={filteredData}
              selectableRows
              pagination
              customStyles={customStyles}
              onSelectedRowsChange={handleRowSelected}
              clearSelectedRows={toggleCleared}
              sortIcon={
                <i
                  className="fa-solid fa-sort fa-xl"
                  style={{
                    color: "#0000001A",
                    display: "inline-block",
                    paddingTop: "8px",
                    paddingBottom: "8px",
                    textShadow: "0 0 2px #0000001A",
                    fontSize: "20px",
                  }}
                />
              }
            />
          </div>
  )}
        </div>
      </div>
    </div>
  );
};

export default GeneralTable;