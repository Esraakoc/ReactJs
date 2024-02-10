import React from "react";
import Dropdown from "react-bootstrap/Dropdown";
function AddDropdown({dropdownButton, options, bgColor}) {
  return (
    <div>
      <Dropdown style={{border: "1px solid black", borderRadius: "5px"}}>
        <Dropdown.Toggle
          variant={bgColor}
          id="dropdown-basic"
        >
          {dropdownButton}
        </Dropdown.Toggle>
        <Dropdown.Menu>
          {options.map((option) => (
            <Dropdown.Item>{option}</Dropdown.Item>
          ))}
        </Dropdown.Menu>
      </Dropdown>
    </div>
  );
}

export default AddDropdown;
