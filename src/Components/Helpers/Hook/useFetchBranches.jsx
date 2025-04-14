import axios from 'axios';
import React, { useState } from 'react'

export default function useFetchBranches(url, params, headers) {
    const [branchesTags, setBranchesTags] = useState([]);
    const [collectedId, setCollectedId] = useState([]);


    const fetchBranches = async (id) => {
        try {
          const response = await axios.get(url, { params: { ...params, id }, headers });
          const branchesInfo = response.data.map((branch) => branch.branch_info.pms_branch_en.branch_name_en);
          const branchIds = response.data.map((item) => item.id);
          setBranchesTags(branchesInfo);
          setCollectedId(branchIds);
        } catch (error) {
          console.error("Error fetching branches:", error);
        }
      };
      return { branchesTags, collectedId, fetchBranches };
}
