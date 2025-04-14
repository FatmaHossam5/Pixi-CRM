


import React, { useContext, useEffect } from "react";
import Select, { components } from "react-select";
import { AuthContext } from "../../Helpers/Context/AuthContext";
import axios from "axios";
import { Dropdown, Form } from "react-bootstrap";
import { useRef } from "react";
import { Bed } from "lucide-react";
export default function BranchSelector({
  mode = "RoomType",
  hotels,
  handleHotelSelection,
  handleToggle,
  isBranchChecked,
  isHotelChecked,
  isHotelIndeterminate,
  fetchBranches,
  branchesTags,
  itemId,
  collectedId,
  setCollectedId,
  isEditMode,
}) {
  const { baseUrlPms, Headers } = useContext(AuthContext);
  console.log({ hotels, branchesTags, collectedId });


  const entityConfig = {
    RoomType: {
      deleteUrl: `${baseUrlPms}/room_type_branch/{id}/delete/`
    },
    RoomView: {
      deleteUrl: `${baseUrlPms}/view_type_branch/{id}/delete/`
    },
    RoomStatus: {
      deleteUrl: `${baseUrlPms}/room_status_branch/{id}/delete/`
    },
    AddOn: {
      deleteUrl: `${baseUrlPms}/addons_branch/{id}/delete/`
    },
    Season:{
       deleteUrl: `${baseUrlPms}/branch_season/{id}/delete/`
    },
    Vendor:{
      deleteUrl: `${baseUrlPms}/vendor_branch/{id}/delete/`
    },
    Category:{
      deleteUrl: `${baseUrlPms}/category_branch/{id}/delete/`
    },
    Item:{
      deleteUrl: `${baseUrlPms}/product_vendor/{id}/delete/`
    },
    ChannelBooking:{
      deleteUrl: `${baseUrlPms}/channel_booking_branch/{id}/delete/`
   },
   CustomerType:{
    deleteUrl: `${baseUrlPms}/customer_type_branch/{id}/delete/`
 },
 BedType:{
  deleteUrl: `${baseUrlPms}/bed_type_branch/{id}/delete/`
  }};
  const {deleteUrl} = entityConfig[mode] || {};
  console.log("Delete URL:", deleteUrl);
  // Function to handle branch deletion
  const DeleteBranch = (branchId) => {

    if (!branchId) {
      console.error("Branch ID is undefined"); // Log error if branchId is invalid
      return;
    }

    axios
      .delete(deleteUrl.replace("{id}", branchId), { headers: Headers })
      .then((res) => {
        console.log("Branch deleted successfully:", res.data); // Success log
        // Refresh the list of branches
        fetchBranches(itemId)
      })
      .catch((error) => {
        console.error("Error deleting branch:", error); // Error log
      });
  };

  // Custom MultiValueRemove component for the `x` button
  const MultiValueRemove = (props) => {
    const { data } = props; // `data` contains the branch info (label and value)

    
    return (
      <components.MultiValueRemove {...props}>
        <i
          className="fa-solid fa-xmark"
          onClick={(e) => {
            e.stopPropagation(); // Prevent event bubbling
            DeleteBranch(data.value); // Delete branch by ID
          }}
        ></i>
      </components.MultiValueRemove>
    );
  };

  // Effect to fetch branches in edit mode
  useEffect(() => {
    if (isEditMode && itemId) {
      fetchBranches(itemId); // Fetch branches when modal opens
    }
  }, [isEditMode, itemId, fetchBranches]);

  // Format options for React-Select
  const branchOptions = branchesTags?.map((branch, index) => ({
    label: branch,
    value: collectedId[index], // Ensure collectedId[index] is valid
  }))?.filter(option => option.value !== null);

  return (
    <div className="branch-selector">
      {isEditMode ? (
        // Edit Mode: Display selected branches in React-Select
        <Select
          isMulti
          options={branchOptions}
          value={branchOptions?.filter(option => collectedId?.includes(option.value))} // Show only selected branches
          components={{
            MultiValueRemove: (props) => <MultiValueRemove {...props} />,
          }}
        />
      ) : (
        // Create Mode: Dropdown to select hotels and branches
        <Dropdown>
          <Dropdown.Toggle
            variant="outline-secondary"
            id="dropdown-basic"
            className="w-100"
          >
            Select Branch
          </Dropdown.Toggle>
          <Dropdown.Menu
            style={{ width: "100%", maxHeight: "300px", overflowY: "auto" }}
          >
            {hotels?.map((hotel, hotelIndex) => (
              <div
                key={hotelIndex}
                style={{ padding: "10px", borderBottom: "1px solid #ccc" }}
              >
                {/* Hotel Checkbox */}
                <Form.Group>
                  <Form.Check
                    type="checkbox"
                    label={hotel.hotelName}
                    onChange={() => handleHotelSelection(hotel)}
                    checked={isHotelChecked(hotel)}
                    ref={(el) => {
                      if (el) el.indeterminate = isHotelIndeterminate(hotel);
                    }}
                  />
                </Form.Group>

                {/* Branch Checkboxes */}
                <div style={{ paddingLeft: "15px" }}>
                  {hotel.branches.length === 0 ? (
                    <p>No branches available for this hotel.</p>
                  ) : (
                    hotel.branches.map((branch) => (
                      <Form.Check
                        key={branch.branchId}
                        type="checkbox"
                        label={branch.branchName}
                        onChange={() => handleToggle(hotel?.hotelName, branch)}
                        checked={isBranchChecked(hotel.hotelName, branch)}
                      />
                    ))
                  )}
                </div>
              </div>
            ))}
          </Dropdown.Menu>
        </Dropdown>
      )}
    </div>
  );
}
