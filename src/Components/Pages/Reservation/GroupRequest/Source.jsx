import React, { useEffect, useState } from "react";
import DynamicSectionForTabs from "../../../Shared/DynamicSectionForTabs/DynamicSectionForTabs";
import CreateSource from "./CreateSource";
import axios from "axios";


const Source = () => {
  const [data, setData] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`https://tenant1.billiqa.com/api/sources?per_page=4`, { headers: Headers });
        console.log(response);

        if (response.data.status) {

          // Assuming API returns an array of clients inside response.data.data.data
          setData(response.data.data.data);
          console.log(data);

        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);
  const columnsConfig = [
    // {
    //   name: "ID",
    //   selector: (row) => row?.id,
    //   sortable: true,
    //   // width: "100px",
    //   visible: true
    // },
    {
      name: "Source",
      selector: (row) => {
        const imageUrl = row.image_url.startsWith('http') ? row.image_url : `https://${row.image_url}`
        return (
          <div className="d-flex align-items-center">
            <img src={imageUrl} alt="Source" style={{
              width: "40px",
              height: "40px",
              borderRadius: '50%',
              objectFit: "cover",
              marginRight: '10px'

            }} />
            <span>{row.name}</span>
          </div>
        )
      }
    }

    // {
    //   name: "Created At",
    //   selector: (row) => new Date(row.created_at).toLocaleString(),
    //   sortable: true,
    //   width: "200px",
    //   visible:true
    // },
    // {
    //   name: "Updated At",
    //   selector: (row) => new Date(row.updated_at).toLocaleString(),
    //   sortable: true,
    //   width: "200px",

    // },
  ];
  const filterFn = (row) => row.name;
  return (
    <>

      <DynamicSectionForTabs
        data={data}
        fetchData={() => setData(dummyData)} // Refetch dummy data if needed
        createComponent={<CreateSource refetch={() => setData(dummyData)} />}
        translationKey="Source"
        columnsConfig={columnsConfig}
        filterFn={filterFn}
      />
    </>
  );
};

export default Source;
