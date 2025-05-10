import React, { useState } from 'react'
import DynamicSectionForTabs from '../../../../Shared/DynamicSectionForTabs/DynamicSectionForTabs'
import CreateTasksSettings from './CreateTasksSettings';

export default function TasksSettings() {
  const [data, setData] = useState([]);
  const columnsConfig = [
    {
      name: "ID",
      selector: (row) => row?.id,
      sortable: true,
      // width: "100px",
      visible: true
    },
    {
      name: "Name",
      selector: (row) => row.name,
      sortable: true,
      // width: "200px",
      visible: true
    },
    {
      name: "Email",
      selector: (row) => row.email,
      sortable: true,
      // width: "250px",
      visible: true
    },
    {
      name: "Area",
      selector: (row) => row.area?.title || "-",
      sortable: true,
      visible: true,
    },
    {
      name: "Source",
      // if you just want the name (for sorting/filtering):
      selector: (row) => row.source?.name || "-",
      sortable: true,
      visible: true,
      // custom cell to show image + name
      cell: (row) =>
        row.source ? (
          <div style={{ display: "flex", alignItems: "center" }}>
            <img
              src={
                // prepend protocol if not included
                row.source.image_url.startsWith("http")
                  ? row.source.image_url
                  : `https://${row.source.image_url}`
              }
              alt={row.source.name}
              style={{
                width: 32,
                height: 32,
                objectFit: "cover",
                borderRadius: "50%",
                marginRight: 8,
              }}
            />
            <span>{row?.source?.name}</span>
          </div>
        ) : (
          "-"
        ),
    },

  ];




  // filter data and egnore null values
  const filterFn = (row) => row.name;
  return (
  
    <>

      <DynamicSectionForTabs
        data={data}
        fetchData={() => setData()} // Refetch dummy data if needed
        createComponent={<CreateTasksSettings refetch={() => setData()} />}
        translationKey="TaskSettinges"
        columnsConfig={columnsConfig}
        filterFn={filterFn}
      />
  
    </>
  )
}
