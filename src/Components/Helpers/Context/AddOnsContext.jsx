import React, { createContext, useContext, useState } from "react";
import axios from "axios";

const AddOnsContext = createContext();

export const useAddOns = () => {
  return useContext(AddOnsContext);
};

export const AddOnsProvider = ({ children, baseUrlPms, Headers, organization_id, showToast }) => {
  const [mergedData, setMergedData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchAndMergeData = async (selectedAddonsId = null) => {
    const addonsParams = selectedAddonsId ? { addons_id: selectedAddonsId } : {};
    setIsLoading(true);

    try {
      const [addonsResponse, branchesResponse] = await Promise.all([
        axios.get(`${baseUrlPms}/addons/all/`, { params: { organization_id }, headers: Headers }),
        axios.get(`${baseUrlPms}/addons_branch/all/`, { params: { organization_id,...addonsParams  }, headers: Headers }),
      ]);

      const addons = addonsResponse.data;
      const branches = branchesResponse.data;

      const merged = addons.map((addon) => {
        const matchingBranch = branches.find((branch) => branch?.addons_info?.id === addon?.id);
        return {
          ...addon,
          addon_price: matchingBranch?.addon_price || "N/A",
        };
      });

      setMergedData(merged);
    } catch (error) {
      showToast("error", "Failed to fetch AddOns data");
      console.error("Error fetching AddOns data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const addNewAddOn = (newAddOn) => {
    setMergedData((prev) => [newAddOn, ...prev]); // Add new AddOn to the top
  };
  return (
    <AddOnsContext.Provider value={{ mergedData, isLoading, fetchAndMergeData, addNewAddOn,setMergedData }}>
      {children}
    </AddOnsContext.Provider>
  );
};
