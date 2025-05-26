import { useState } from 'react';
import Select from 'react-select';
import { components } from 'react-select';
import DatePickerInput from './DatePickerInput';
// import DatePickerInput from '../datePickerInput/datePickerInput';

const CustomOption = (props) => {
  if (props.data.value === 'datepicker') {
    return (
      <div className="special-date-option" >
        <DatePickerInput title='select a date' onMouseDown={(e) => {
          e.stopPropagation();
        }} onHandleChange={(date) => {
          props.selectedOptions({ value: date, label: date })
        }}
          keepMenuOpen={props.selectProps.keepMenuOpen} />
      </div>
    );
  }
  return (
    <>
      <components.Option {...props}>
        {props.data.label}
      </components.Option>
    </>
  )
}


function FilterSelect() {
  const options = [

    {
      value: 'empty', label: 'empty'
    },
    {
      value: 'filled', label: 'filled'
    },
    {
      value: 'reserved', label: 'reserved'
    },
    {
      value: "123", label: "123"
    },
    {
      value: 'datepicker', label: 'Date Picker'
    },
  ]
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [menuIsOpen, setMenuIsOpen] = useState(false);
  const handleChange = (selected) => {
    setSelectedOptions(selected);
    setMenuIsOpen(false); // Close the menu when an option other than datepicker is selected
  }

  const handleMenuOpen = () => {
    setMenuIsOpen(true); // Open the menu
  };


  const customStyles = {
    option: (provided, state) => ({
      ...provided,
      color: state.isSelected ? "white" : "#7F7F7F",
      backgroundColor: state.isSelected ? "blue" : "#F8F8F8",
    }),
    menu: (provided, state) => ({
      ...provided,
      backgroundColor: '#F8F8F8',
      marginBlock: 0,
      borderRadius: '0 0 5px 5px',
      boxShadow: 'none',
      zIndex: 10,
    }),
    menuList: (provided) => ({
      ...provided,
      maxHeight: '10rem',
      overflowY: 'auto',
      paddingRight: 10,
      '&::-webkit-scrollbar': {
        width: 6,
      },
      '&::-webkit-scrollbar-thumb': {
        backgroundColor: '#ccc',
        borderRadius: '10px',
      },
      '&::-webkit-scrollbar-track': {
        backgroundColor: 'transparent',
      },
      ':hover': {
        '&::-webkit-scrollbar-thumb': {
          backgroundColor: '#999',
        },
      }
    }),
    multiValue: (provided) => ({
      ...provided,
      backgroundColor: "#1877F2",
    }),
    multiValueLabel: (provided) => ({
      ...provided,
      color: "white",
    }),
    multiValueRemove: (provided) => ({
      ...provided,
      color: "white",
      ':hover': {
        backgroundColor: "#1877F2",
        color: 'white',
      },
    }),
  };


  return (
    <>
      <div className="py-4 px-4 ">
        <h5>test</h5>
        <Select isMulti options={options}
          closeMenuOnSelect={false}
          value={selectedOptions}
          onChange={handleChange}
          styles={customStyles}
          components={{ Option: CustomOption }}
          menuIsOpen={menuIsOpen}  // Control the menu visibility
          onMenuOpen={handleMenuOpen}
          onMenuClose={() => setMenuIsOpen(false)} />
      </div>
    </>
  )
}

export default FilterSelect




