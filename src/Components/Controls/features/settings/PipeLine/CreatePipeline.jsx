import axios from "axios";
import { useState } from "react";
import { Button, Form, InputGroup } from "react-bootstrap";


const CreatePipeline = () => {
  const [pipelineName, setPipelineName] = useState('');
  const [stages, setStages] = useState([{ id: Date.now(), name: ''}]);

  const handleStageChange = (index, field, value) => {
    const updatedStages = [...stages];
    updatedStages[index][field] = value;
    setStages(updatedStages);
  };

  const handleAddStage = () => {
    setStages([...stages, { id: Date.now(), name: '',  color: '#000000'}]);
  };

  const handleRemoveStage = (index) => {
    const updatedStages = stages.filter((_, i) => i !== index);
    setStages(updatedStages);
  };

  const handleClear = () => {
    setPipelineName('');
    setStages([{ id: Date.now(), name: '', color: '#000000' }]);
  };
  const handleCreate = async () => {
    try {
      const payload = {
        name: pipelineName,
        stages: stages.map(stage => ({ name: stage.name }))
      };
  
      const response = await axios.post('https://tenant1.billiqa.com/api/pipelines', payload);
      console.log('Pipeline created:', response.data);
  
      // Optionally clear the form after successful create
      handleClear();
    } catch (error) {
      console.error('Error creating pipeline:', error);
    }
  };
  return (
    <div className="container" >
     
      <div className="mb-3">
        <label className="form-label">Pipeline Name</label>
        <input
          type="text"
          className="form-control "
          placeholder="Enter Pipeline Name"
          style={{ height: '48px' }}
          value={pipelineName}
          onChange={(e) => setPipelineName(e.target.value)}
        />
      </div>

      <label className="form-label mb-2">Stages Name</label>
      {stages.map((stage, index) => (
        <div className="mb-2 d-flex" key={stage.id}>
          <span className="me-2 mt-2">≡</span>
          <input
            type="text"
            className="form-control"
            placeholder="Enter Stage Name"
            value={stage.name}
            onChange={(e) => handleStageChange(index, 'name', e.target.value)}
            style={{ height: '48px' }}
          />
         <input
            type="color"
            className="form-control form-control-color"
            value={stage.color}
            onChange={(e) => handleStageChange(index, 'color', e.target.value)}
            title="Choose color"
            style={{ height: '48px', width: '60px', marginLeft: '10px' }}
          />
          {index === 0 ? (
            <button type="button" className="btn btn-outline-primary ms-2"  style={{ height: '48px',width:
              '68px'
             }} onClick={handleAddStage}>+</button>
          ) : (
            <button type="button" className="btn btn-danger ms-2"style={{ height: '48px',width:
              '68px'
             }} onClick={() => handleRemoveStage(index)}><i className="fa-regular fa-trash" />
</button>
          )}
        </div>
      ))}

      <div className="d-flex justify-content-end mt-4 gap-4">
        <button type="button" className="btn btn-outline-primary" style={{ height: '52px',width:
              '160px'
             }}onClick={handleClear}>Clear</button>
        <button type="button" className="btn btn-primary"  style={{ height: '52px',width:
              '160px'
             }} onClick={handleCreate}>Create</button>
      </div>
    </div>
  );
 
};

export default CreatePipeline;
