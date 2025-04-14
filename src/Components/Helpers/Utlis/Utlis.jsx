import axios from "axios";

export const createMainItem = async (endpoint, userId, Headers) => {
  const response = await axios.post(
    endpoint,
    { created_by: userId, updated_by: userId },
    { headers: Headers }
  );
  return response.data.data.id;
};

export const createTranslation = async (endpoint, itemId, name, Headers) => {


  
  await axios.post(
    endpoint,
    {[`pms_${endpoint.split("/")[4].split("_").slice(0, 2).join("_")}_id`]: itemId, [`${endpoint.split("/")[1]}_name`]: name },
    { headers: Headers }
  );
};

export const associateItemWithBranches = async (endpoint, itemId, selectedBranches, userId, Headers) => {
  const allSelectedBranchIds = Object.entries(selectedBranches).flatMap(([hotelName, branches]) =>
    Object.keys(branches).map((branchId) => parseInt(branchId))
  );

  const branchPromises = allSelectedBranchIds.map((branchId) =>
    axios.post(
      endpoint,
      {
        created_by: userId,
        updated_by: userId,
        [`${endpoint.split("/")[1]}_id`]: itemId,
        branch_id: branchId,
      },
      { headers: Headers }
    )
  );

  await Promise.all(branchPromises);
};
