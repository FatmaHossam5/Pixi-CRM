import React, { useEffect, useState } from "react";

const CustomBranchSelector = ({ hotels, onBranchSelect }) => {
    const [selectedHotel, setSelectedHotel] = useState(""); // Selected hotel
    const [filteredBranches, setFilteredBranches] = useState([]); // Branches for the selected hotel
    const [selectedBranch, setSelectedBranch] = useState(""); // Selected branch
  
    useEffect(() => {
      // Update branches when the selected hotel changes
      const hotel = hotels?.find((hotel) => hotel.hotelName === selectedHotel);
      setFilteredBranches(hotel ? hotel.branches : []);
      setSelectedBranch(""); // Reset branch selection
    }, [selectedHotel, hotels]);
  
    const handleHotelChange = (e) => {
      setSelectedHotel(e.target.value);
    };
  
    const handleBranchChange = (e) => {
      const branchId = e.target.value;
      setSelectedBranch(branchId);
      onBranchSelect(branchId); // Pass selected branch to parent component
    };
  
    return (
      <div className="branch-selector col-12 d-flex ">
        {/* Hotel Selector */}
        <div className="form-group col-6 ">
          <label>Hotel</label>
          <select
            className="form-control"
            value={selectedHotel}
            onChange={handleHotelChange}
          >
            <option value="">Select Hotel</option>
            {hotels.map((hotel) => (
              <option key={hotel.hotelName} value={hotel.hotelName}>
                {hotel.hotelName}
              </option>
            ))}
          </select>
        </div>
  
        {/* Branch Selector */}
        <div className="form-group col-6 ms-2">
          <label>Branch</label>
          <select
            className="form-control"
            value={selectedBranch}
            onChange={handleBranchChange}
            disabled={!filteredBranches.length} // Disable if no branches available
          >
            <option value="">Select Branch</option>
            {filteredBranches.map((branch) => (
              <option key={branch.branchId} value={branch.branchId}>
                {branch.branchName}
              </option>
            ))}
          </select>
        </div>
      </div>
    );
};

export default CustomBranchSelector;
