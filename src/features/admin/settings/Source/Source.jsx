import React, { useEffect, useState } from "react";
import CreateSource from "./CreateSource";
import axios from "axios";
import DynamicSectionForTabs from "../../../../components/Shared/navigation/DynamicSectionForTabs/DynamicSectionForTabs";


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

    {
      name: "Source",
      selector: (row) => {
        const imageUrl = row.image_url.startsWith('https') ? row.image_url : `https://${row.image_url}`
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


  ];
  const filterFn = (row) => row.name;
  return (
    <>

      <DynamicSectionForTabs
        data={data}
        fetchData={() => setData(data)} // Refetch dummy data if needed
        createComponent={<CreateSource refetch={() => setData(data)} />}
        translationKey="Source"
        columnsConfig={columnsConfig}
        filterFn={filterFn}
      />
    </>
  );
};

export default Source;
