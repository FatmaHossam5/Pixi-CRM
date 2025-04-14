import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../Context/AuthContext";

const useBranchOld = () => {
    const { baseUrlPms, Headers } = useContext(AuthContext);
    const [selectedHotel, setSelectedHotel] = useState(
        localStorage.getItem("Hotel_id") || null // Set from localStorage if no hotel is selected
    );
    const [branchs, setBranchs] = useState([]);
    const [allBranchs, setAllBranchs] = useState([]);
    // console.log(branchs);

    const getBranches = () => {
        axios
            .get(`${baseUrlPms}/branch/all/`, { headers: Headers })
            .then((res) => setAllBranchs(res.data))
            .catch((error) => console.error("Error fetching branches:", error));
    };

    const fetchBranch = async (hotelId) => {
        try {
            const response = await axios.get(
                `${baseUrlPms}/branch/all/?hotel_id=${hotelId}`,
                { headers: Headers }
            );
            setBranchs(response.data);
        } catch (error) {
            console.error("Error fetching branch:", error);
        }
    };

    useEffect(() => {
        getBranches(); // Fetch all branches

        if (selectedHotel) {
            fetchBranch(selectedHotel); // Fetch specific branches if hotel is selected
        }
    }, [baseUrlPms, Headers, selectedHotel]);

    const handleHotelChange = (event) => {
        const hotelId = event.target.value;
        setSelectedHotel(hotelId);
        localStorage.setItem("idHotel", hotelId); // Save hotel ID to localStorage
    };

    return { branchs, handleHotelChange, allBranchs };
};

export default useBranchOld;