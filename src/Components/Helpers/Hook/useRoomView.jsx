import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { AuthContext } from "../Context/AuthContext";

const useRoomView = () => {
    const { baseUrlPms, Headers } = useContext(AuthContext);
    const [selectedHotel, setSelectedHotel] = useState(localStorage.getItem("Hotel_id") || null);
    const [branches, setBranches] = useState([]);
    const [selectedBranch, setSelectedBranch] = useState(localStorage.getItem("Branch_id") || null);
    const [isBranchDisabled, setIsBranchDisabled] = useState(false); // Default is false

    // Fetch branches based on selected hotel
    const getBranches = async (hotelId) => {
        try {
            const endpoint = hotelId ? `${baseUrlPms}/view_type_branch/all/?branch_id${hotelId}` : `${baseUrlPms}/branch/all/`;
            const res = await axios.get(endpoint, { headers: Headers });
            setBranches(res.data);
            console.log(res.data);

        } catch (error) {
            console.error("Error fetching branches:", error);
        }
    };

    useEffect(() => {
        getBranches(selectedHotel);
    }, [baseUrlPms, Headers, selectedHotel]);

    // Dynamically update the isBranchDisabled based on localStorage value
    useEffect(() => {
        const branchId = localStorage.getItem("Branch_id");
        if (branchId == null) {
            setIsBranchDisabled(true);  // Disable the dropdown if Branch_id exists in localStorage
            setSelectedBranch(branchId);
            console.log(branchId)
            // Set the selected branch from localStorage
        } else {
            setIsBranchDisabled(false); // Enable the dropdown if Branch_id is null in localStorage
        }
    }, [selectedHotel]); // This will run whenever the selectedHotel changes

    const handleHotelChange = (event) => {
        const hotelId = event.target.value;
        setSelectedHotel(hotelId);
        localStorage.setItem("Hotel_id", hotelId);
        setSelectedBranch(null); // Reset branch if hotel changes
        setIsBranchDisabled(false); // Enable branch dropdown on hotel change
    };

    return { branches, selectedBranch, setSelectedBranch, isBranchDisabled, handleHotelChange };
};

export default useRoomView