import axios from "axios";
import { useCallback, useContext, useEffect, useState } from "react";
import { AuthContext } from "../Context/AuthContext";
import { ToastContext } from "../Context/ToastContext ";

// Function to group branches by their respective hotels based on language preference
const groupBranchesByHotel = (branches, language) => {
  if (!Array.isArray(branches)) {
    console.warn("Invalid branches data:", branches);
    return [];
  }

  return Object.values(
    branches.reduce((acc, branch) => {
      const hotelId = branch?.hotel_info?.id;
      const hotelName =
        language === "ar"
          ? branch?.hotel_info?.pms_hotel_ar?.hotel_name_ar
          : branch?.hotel_info?.pms_hotel_en?.hotel_name_en;

      if (!hotelId || !hotelName) {
        console.warn("Branch missing hotelId or hotelName:", branch);
        return acc;
      }

      if (!acc[hotelId]) {
        acc[hotelId] = {
          hotelName,
          branches: [],
        };
      }

      const branchName =
        language === "ar"
          ? branch?.pms_branch_ar?.branch_name_ar
          : branch?.pms_branch_en?.branch_name_en;

      if (branchName) {
        acc[hotelId].branches.push({
          branchId: branch.unit_reference_id,
          branchName,
        });
      }

      return acc;
    }, {})
  );
};

// Custom hook to manage branch selection logic
const useBranchSelection = (language) => {
  const [hotels, setHotels] = useState([]);// Stores grouped hotel data
  const [selectedBranches, setSelectedBranches] = useState({});// Tracks selected branches
  const { showToast } = useContext(ToastContext);
  const { baseUrlPms, Headers, setIsLoading } = useContext(AuthContext);
  const organization_id = localStorage.getItem('organization_id');


  // Fetch branches from API and group them by hotels
  const fetchBranches = useCallback(() => {
    axios.get(`${baseUrlPms}/branch/all/`,{params:{organization_id:organization_id},headers: Headers}).then((response) => {
      console.log(response);
      
      const groupedHotels = groupBranchesByHotel(response.data || [], language);
      console.log(groupedHotels);
      
      setHotels(groupedHotels);
    }).catch((error) => {
      showToast("error", error.response.statusText || "Failed to fetch branches.");
    })




  }, [baseUrlPms, Headers, showToast, language])

  useEffect(() => { fetchBranches();// Automatically fetch branches on mount or when dependencies change

   }, [fetchBranches])




  // Toggles selection of a branch within a hotel
  const handleToggle = (hotelName, branch) => {
    if (!hotelName) {
      console.error("Invalid hotelName:", hotelName); // Log the error
      return;
    }
    setSelectedBranches((prev) => {
      const hotelBranches = prev[hotelName] || {};
      if (hotelBranches[branch?.branchId]) {
        delete hotelBranches[branch?.branchId];
      } else {
        hotelBranches[branch?.branchId] = true;
      }
      return { ...prev, [hotelName]: { ...hotelBranches } };
    });
  };
  // Toggles selection of all branches within a hotel

  const handleHotelSelection = (hotel) => {
    if (!hotel?.hotelName) {
      console.error("Invalid hotel object:", hotel); // Log the error
      return;
    }
    const isAllSelected = hotel?.branches?.every(
      (branch) => selectedBranches[hotel.hotelName]?.[branch.branchId]
    );
  
    setSelectedBranches((prev) => ({
      ...prev,
      [hotel.hotelName]: isAllSelected
        ? {}
        : Object.fromEntries(
            (hotel?.branches || []).map((branch) => [branch.branchId, true])
          ),
    }));
  };
  
  // Checks if a specific branch is selected
  const isBranchChecked = (hotelName, branch) => {
    return selectedBranches[hotelName]?.[branch?.branchId] || false;
  };
 // Checks if all branches within a hotel are selected
  const isHotelChecked = (hotel) => {
    return hotel.branches.every((branch) => isBranchChecked(hotel.hotelName, branch));
  };
// Checks if some but not all branches within a hotel are selected
  const isHotelIndeterminate = (hotel) => {
    const branchSelections = hotel.branches.map((branch) =>
      isBranchChecked(hotel.hotelName, branch)
    );
    return branchSelections.some(Boolean) && !branchSelections.every(Boolean);
  };
  useEffect(() => {
    console.log("Hotels data in useBranchSelection:", hotels);
    hotels.forEach((hotel) => {
      if (!hotel.hotelName) {
        console.error("Hotel missing hotelName:", hotel);
      }
    });
  }, [hotels]);
  return {
    hotels,
    selectedBranches,
    handleToggle,
    handleHotelSelection,
    isBranchChecked,
    isHotelChecked,
    isHotelIndeterminate,
    setSelectedBranches,
  };
};

export default useBranchSelection;
