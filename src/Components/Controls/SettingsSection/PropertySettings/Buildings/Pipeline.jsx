import axios from "axios";
import { useEffect, useState } from "react";
import DynamicSectionForTabs from "../../../../Shared/DynamicSectionForTabs/DynamicSectionForTabs";
import CreatePipeline from "./CreatePipeline";

const Pipeline = () => {

  const [data, setData] = useState([])



  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`https://tenant1.billiqa.com/api/pipelines?per_page=4`);
        const pipelines = response.data.data.data;
        console.log(pipelines);
        
        const flattened = pipelines.flatMap(pipeline =>
          pipeline.stages.data.map(stage => ({
            stageName: stage.name,
            createdAt: stage.created_at || pipeline.created_at,
            updatedAt: stage.updated_at || pipeline.updated_at,
            pipelineName: pipeline.name,
          }))
        );
        setData(flattened);
        console.log(data);
      }
      catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);
  const columnsConfig = [
    {
      name: 'Stages Name',
      selector: row => row.stageName,
      cell: row => <div>{row.stageName}</div>,
    },
    {
      name: 'Pipeline',
      selector: row => row.pipelineName,
      cell: row => <div>{row.pipelineName}</div>,
    },
   
    {
      name: 'Created Date',
      selector: row => row.createdAt,
      cell: row => <div>{new Date(row.createdAt).toLocaleDateString()}</div>,
    },
    {
      name: 'Update',
      selector: row => row.updatedAt,
      cell: row => <div>{new Date(row.updatedAt).toLocaleDateString()}</div>,
    },
  ];
  const filterFn = (row) => row.stageName;

  return (
    <>
    
          <DynamicSectionForTabs
            data={data}
            fetchData={() => setData()} // Refetch dummy data if needed
            createComponent={<CreatePipeline refetch={() => setData()} />}
            translationKey="Pipeline"
            columnsConfig={columnsConfig}
            filterFn={filterFn}
          />
    </>
  );
};

export default Pipeline;
