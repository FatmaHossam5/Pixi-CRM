// import axios from "axios";

import axios from "axios";

// const useRoomCreation = (baseUrlPms, Headers, userId, showToast) => {
//     const createMainEntity = async (endpoint) => {
//       const response = await axios.post(`${baseUrlPms}/${endpoint}/store/`, 
//         { created_by: userId, updated_by: userId }, 
//         { headers: Headers }
//       );
//       return response.data.data.id;
//     };
  
//     const createTranslation = async (endpoint, entityId, nameField, nameValue) => {
//       await axios.post(`${baseUrlPms}/${endpoint}/store/`, 
//         { [`pms_${endpoint}_id`]: entityId, [nameField]: nameValue }, 
//         { headers: Headers }
//       );
//     };
  
//     return { createMainEntity, createTranslation };
//   };
//   export default useRoomCreation;

const useRoomCreation = (baseUrl, headers, userId, showToast) => {
    const createMainEntity = async (endpoint) => {
      const response = await axios.post(
        `${baseUrl}/${endpoint}/store/`,
        { created_by: userId, updated_by: userId },
        { headers }
      );
      return response.data.data.id;
    };
  
    const createTranslation = async (endpoint, entityId, nameField, nameValue) => {
      await axios.post(
        `${baseUrl}/${endpoint}/store/`,
        { [`pms_${endpoint}_id`]: entityId, [nameField]: nameValue },
        { headers }
      );
    };
  
    const associateWithBranches = async (endpoint, entityId, selectedBranches) => {
      const allBranchIds = Object.values(selectedBranches)
        .flatMap(branches => Object.keys(branches).map(id => parseInt(id)));
      const promises = allBranchIds.map(branchId =>
        axios.post(`${baseUrl}/${endpoint}/store/`, {
          created_by: userId,
          updated_by: userId,
          view_type_id: entityId,
          branch_id: branchId,
        }, { headers })
      );
      await Promise.all(promises);
    };
  
    return { createMainEntity, createTranslation, associateWithBranches };
  };
  export default useRoomCreation