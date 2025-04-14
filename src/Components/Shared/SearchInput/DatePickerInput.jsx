import { useState } from 'react'
import Flatpickr from 'react-flatpickr'
import 'flatpickr/dist/themes/material_blue.css'



function DatePickerInput({ onHandleChange, keepMenuOpen }) {

  const [date, setDate] = useState([]);

  const handleDate = (selectedDates) => {
    setDate(selectedDates[0])
    onHandleChange(selectedDates[0]);
    keepMenuOpen()
  }


  return (
    <>

      <div className="p-3">
        <div className="px-calendar w-100 ">
          <Flatpickr className="px-form-input filter-calendar w-100 "
            value={date}
            onChange={handleDate}
            options={{
              enableTime: true,
              dateFormat: "m-y-d",
              clickOpens: true,
              closeOnSelect: false
            }}
            placeholder='MM-DD-YY' />
          <i
            className="fa-regular fa-calendar-days fa-xl px-calendar-icon"></i>
        </div>

      </div>


    </>
  )
}

export default DatePickerInput



