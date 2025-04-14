import DataTable from "react-data-table-component";

const ListTable = ({filteredData, columns, visibleColumns}) => {

  // styling of table
  const customStyles = {
    header: {
      style: {
        backgroundColor: "#4CAF50", // Change this to your desired color
        color: "#949494", // Text color
        fontSize: "1.2rem",
      },
    },
    rows: {
      style: {
        minHeight: "72px", // override the row height
        fontSize: "1rem",
      },
    },
    headCells: {
      style: {
        backgroundColor: "#f9f9f9", // Change this to your desired color
        color: "#000", // Text color
        paddingLeft: "8px", // override the cell padding for head cells
        paddingRight: "8px",
        fontSize: "1rem",
      },
    },
    cells: {
      style: {
        paddingLeft: "8px", // override the cell padding for data cells
        paddingRight: "8px",
        fontSize: "1rem",
      },
    },
  };
  
  return (
    <>
      <div className="px-content mb-auto mt-3">
        <div className="container-fluid">
          <div className="row">
            <div className="col-12 gx-0">
              <div className="table-responsive px-table-container">
                <DataTable
                  columns={visibleColumns?.filter((col) => col.visible)}
                  // columns={columns}
                  data={filteredData}
                  selectableRows
                  pagination
                  className="px-table table-borderless min-vh-0"
                  customStyles={customStyles}
                  sortIcon={<i className="fa-kit fa-sort-by "></i>}
                  subHeader
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ListTable;
