import axios from 'axios';
import { eachDayOfInterval, endOfYear, format, getDay, startOfYear,addYears } from 'date-fns';
import React, { useContext, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { MultiSelect } from 'react-multi-select-component';
import Select from 'react-select';
import { AuthContext } from '../../../../../Helpers/Context/AuthContext';
import { ToastContext } from '../../../../../Helpers/Context/ToastContext ';
import FromButton from '../../../../../Shared/FromButton/FromButton';



const CreateWorkDays = () => {
  const { t } = useTranslation();
  const { showToast } = useContext(ToastContext);
  const [selectedWeekendDays, setSelectedWeekendDays] = useState([]);
  const [branches, setBranches] = useState([]);
  const [selectedBranch, setSelectedBranch] = useState(null);
  const [workDays, setWorkDays] = useState([]);
  
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    control
  } = useForm({ mode: "all" });

  const {
    baseUrlPms,
    userId,
    Headers
  } = useContext(AuthContext);



  useEffect(() => {
    const fetchBranches = async () => {
      try {
        const response = await axios.get(`${baseUrlPms}/branch/all/`, { headers: Headers });
        const branchOptions = response.data.map((branch) => ({
          value: branch.unit_reference_id,
          label: branch.pms_branch_en?.branch_name_en,
        }));
        setBranches(branchOptions);
      } catch (err) {
        showToast("error", "Failed to fetch branches");
      }
    };
    fetchBranches();
  }, []);
  const handleBranchChange = (option) => {
    setSelectedBranch(option.value);
  };

  const dayOptions = [
    { label: "Sunday", value: "Sun" },
    { label: "Monday", value: "Mon" },
    { label: "Tuesday", value: "Tue" },
    { label: "Wednesday", value: "Wed" },
    { label: "Thursday", value: "Thu" },
    { label: "Friday", value: "Fri" },
    { label: "Saturday", value: "Sat" },
  ];

  const postWithRetry = async (url, data, headers, retries = 3) => {
    for (let attempt = 1; attempt <= retries; attempt++) {
      try {
        const response = await axios.post(url, data, { headers });
        return response;
      } catch (error) {
        console.error(`Attempt ${attempt} failed for ${url}:`, error);
        if (attempt === retries) throw error; // Throw error if all retries fail
      }
    }
  };
  const handleWeekendChange = (selectedOptions) => {
    const selectedDays = selectedOptions ? selectedOptions.map((option) => option.value) : [];
    setSelectedWeekendDays(selectedDays);

    // Calculate remaining workdays
    const remainingDays = dayOptions
      .filter((day) => !selectedDays.includes(day.value))
      .map((day) => day.label);
    setWorkDays(remainingDays);
  };


  // function to get Id
  const saveWeekendDays = async () => {
    if (!selectedBranch) {
      alert("Please select a branch first.");
      return;
    }
    if (selectedWeekendDays.length === 0) {
      alert("Please select at least one weekend day.");
      return;
    }


    try {
        // Step 1: Define the 3-year date range
      const yearStart = startOfYear(new Date());// Start of the current year
      const yearEnd =  endOfYear(addYears(new Date(), 1))// End of the 3rd year from now

       // Step 2: Generate all dates in the 3-year range
      const allDates = eachDayOfInterval({ start: yearStart, end: yearEnd });
       // Step 3: Filter dates to match the selected weekend days
      const weekendDates = allDates
        .filter((date) => selectedWeekendDays.includes(["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"][getDay(date)]))
        .map((date) => format(date, "yyyy-MM-dd")); // Format dates to 'YYYY-MM-DD'

      console.log("Calculated Weekend Dates:", weekendDates);

      // Step 3: Loop through each date and send a separate request
      for (const weekendDate of weekendDates) {
        console.log("Sending Date:", weekendDate);
        const response =    await postWithRetry(
          `${baseUrlPms}/weekend/store/`,
          {

            weekend_date: weekendDate, // Send one date at a time
            created_by: userId,
            updated_by: userId,
          },
          Headers 
        );
        if (!response.data?.id) {
          console.error(`ID not returned for weekend date ${weekendDate}. Skipping...`);
          continue; // Skip this date if ID is missing
        }
        const weekendId = response.data.id;
        await axios.post(
          `${baseUrlPms}/weekend_branch_season/store/`,
          {
            weekend_id: weekendId, // Use the ID from the previous response
            branch_id: selectedBranch,
            created_by: userId,
            updated_by: userId,
          },
          { headers: Headers }
        );
        console.log(`Weekend date ${weekendDate} associated with branch ${selectedBranch}.`);
      }

      alert("All weekend days saved successfully!");
    } catch (err) {
      console.error("Error saving weekend days:", err);
      alert("Failed to save weekend days.");
    }
  };
  return (
    <form
      className="d-flex flex-wrap justify-content-end"
      onSubmit={handleSubmit(saveWeekendDays)}

    >
      <div className="form-inputs d-flex w-100 px-3">
        <div className="mb-3 col-12">
          <label>Select Branch</label>
          <Select
            options={branches}
            onChange={handleBranchChange}
            placeholder="Select a Branch"
          />
        </div>
   
      </div>
      <div className='col-12'>
      <label>Weekend Days</label>
      <MultiSelect
          options={dayOptions}
          value={dayOptions.filter((day) =>
            selectedWeekendDays.includes(day.value)
          )}
          onChange={handleWeekendChange}
          labelledBy="Select Weekend Days"
        />
      </div>
 
      <div className="mb-3 col-12 mt-2 d-flex">
        <span>Work Days Are:</span>
        <p className='text-secondary'>  {workDays.length > 0 ? workDays.join(", ") : "All days are workdays."}</p>
      </div>

      <FromButton reset={reset} />
    </form>
  );
};

export default CreateWorkDays;
