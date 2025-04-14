import React, { useEffect, useState, useContext } from "react";
import Select from "react-select";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import axios from "axios";
import { AuthContext } from "../../../../../Helpers/Context/AuthContext";
import { ToastContext } from "../../../../../Helpers/Context/ToastContext ";
import { ModalContext } from "../../../../../Helpers/Context/ModalContext";
import { useData } from "../../../../../Helpers/Context/useData";


const CreateSpecialDays = () => {
  const { baseUrlPms, Headers, userId, setIsLoading } = useContext(AuthContext);
  const { showToast } = useContext(ToastContext);
  const [branches, setBranches] = useState([]);
  const [seasons, setSeasons] = useState([]);
  const [selectedBranch, setSelectedBranch] = useState(null);
  const [selectedSeason, setSelectedSeason] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);
  const [dateRange, setDateRange] = useState({ start: null, end: null });
    const { handleClose, setModelState } = useContext(ModalContext);
  const{fetchData}=useData();

  // Fetch branches when the component loads
  useEffect(() => {
    const fetchBranches = async () => {
      try {
        const response = await axios.get(`${baseUrlPms}/branch/all/`, { headers: Headers });
        const branchOptions = response.data.filter((branch) => branch.pms_branch_en?.branch_name_en).map((branch) => ({
          value: branch.unit_reference_id,
          label: branch.pms_branch_en?.branch_name_en,
        }));
        setBranches(branchOptions);

        // Automatically set the first branch as selected, if available
        if (branchOptions.length > 0) {
          const defaultBranch = branchOptions[0];
          setSelectedBranch(defaultBranch);
          fetchSeasons(defaultBranch.value);
        }
      } catch (err) {
        showToast("error", "Failed to fetch branches");
      }
    };

    fetchBranches();
  }, [baseUrlPms, Headers, showToast]);

  // Fetch seasons dynamically based on branch selection
  const fetchSeasons = async (branchId) => {
    try {
      const response = await axios.get(`${baseUrlPms}/branch_season/all/`, {
        params: { branch_id: branchId },
        headers: Headers,
      });
      console.log(response);
      
      const seasonOptions = response.data.filter((season) => season?.season_info?.pms_season_en?.season_name_en).map((season) => ({

        value: season.id,
        label: season?.season_info?.pms_season_en?.season_name_en, 
        startDate: new Date(season?.season_info?.season_start_date),
        endDate: new Date(season?.season_info?.season_end_date),
      }));
      setSeasons(seasonOptions);

      // Automatically set the first season as selected, if available
      if (seasonOptions.length > 0) {
        const defaultSeason = seasonOptions[0];
        setSelectedSeason(defaultSeason);
        setDateRange({ start: defaultSeason.startDate, end: defaultSeason.endDate });
      }
    } catch (err) {
      showToast("error", "Failed to fetch seasons");
    }
  };

  // Handle branch selection change
  const handleBranchChange = (selectedOption) => {
    setSelectedBranch(selectedOption);
    setSelectedSeason(null);
    setDateRange({ start: null, end: null });
    setSelectedDate(null);
    fetchSeasons(selectedOption.value);
  };

  // Handle season selection change
  const handleSeasonChange = (selectedOption) => {
    setSelectedSeason(selectedOption);
    setDateRange({ start: selectedOption.startDate, end: selectedOption.endDate });
    setSelectedDate(null);
  };

  // Correct date offset for backend compatibility
  const correctDateOffset = (date) => {
    const userTimezoneOffset = date.getTimezoneOffset() * 60000; // Convert offset to milliseconds
    return new Date(date.getTime() - userTimezoneOffset);
  };

  // Fetch special day ID
  const fetchSpecialDayId = async (date) => {
    try {
      setIsLoading(true);
      const correctedDate = correctDateOffset(date);
      const response = await axios.post(
        `${baseUrlPms}/special_day/store/`,
        {
          created_by: userId,
          updated_by: userId,
          special_day_date: correctedDate.toISOString().split("T")[0],
        },
        { headers: Headers }
      );
      return response.data.data.id; // Ensure the correct path to the ID
    } catch (err) {
      showToast("error", "Failed to fetch special day ID");
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  // Handle adding a special day
  const handleAddSpecialDay = async () => {
    if (!selectedSeason || !selectedDate) {
      showToast("error", "Please select a valid season and date.");
      return;
    }

    try {
      const id = await fetchSpecialDayId(selectedDate);
      if (!id) {
        showToast("error", "Failed to retrieve special day ID.");
        return;
      }

      await axios.post(
        `${baseUrlPms}/special_day_branch_season/store/`,
        {
          branch_season_id: selectedSeason.value,
          special_day_id: id,
          created_by: userId,
          updated_by: userId,
        },
        { headers: Headers }
      );
      showToast("success", "Special day created successfully!");
      setSelectedDate(null);
      handleClose();
      fetchData();
    
    } catch (err) {
      showToast("error", "Failed to create special day.");
    }
  };

  return (
    <div className="modal-content p-4">
      <h5>Create New Special Day</h5>

      {/* Branch Selector */}
      <div className="mb-3">
        <label>Select Branch</label>
        <Select
          options={branches}
          value={selectedBranch}
          onChange={handleBranchChange}
          placeholder="Choose a branch"
        />
      </div>

      {/* Season Selector */}
      <div className="mb-3">
        <label>Select Season</label>
        <Select
          options={seasons}
          value={selectedSeason}
          onChange={handleSeasonChange}
          placeholder="Choose a season"
        />
      </div>

      {/* Date Picker with Range Restriction */}
      <div className="mb-3">
        <label>Select Special Day</label>
        <DatePicker
          selected={selectedDate}
          onChange={(date) => setSelectedDate(date)}
          minDate={dateRange.start}
          maxDate={dateRange.end}
          placeholderText={`Pick a date between ${
            dateRange.start ? dateRange.start.toLocaleDateString() : "N/A"
          } and ${dateRange.end ? dateRange.end.toLocaleDateString() : "N/A"}`}
          className="form-control"
        />
      </div>

      {/* Add Button */}
      <button
        className="btn btn-primary mt-3"
        disabled={!selectedSeason || !selectedDate}
        onClick={handleAddSpecialDay}
      >
        Add Special Day
      </button>
    </div>
  );
};

export default CreateSpecialDays;
