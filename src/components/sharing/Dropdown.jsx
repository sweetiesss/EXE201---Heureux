// src/Dropdown.js
import React, { useState, useEffect } from "react";

const Dropdown = ({ functionClick, name, arrayList, form, text }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [datas, setDatas] = useState([]);
  useEffect(() => {
    setDatas(arrayList || []);
  }, [arrayList]);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.matches(".dropbtn")) {
        setIsDropdownOpen(false);
      }
    };

    window.addEventListener("click", handleClickOutside);
    return () => {
      window.removeEventListener("click", handleClickOutside);
    };
  }, []);

  const handleOnClick = (item) => {
 
    functionClick((prev) => ({ ...prev, [name]: item?.userid }));
    console.log(form);
  };


  return (
    <div className="dropdown">
      <button onClick={toggleDropdown} className="dropbtn max-w-[8rem] min-w-[8rem] overflow-hidden px-[1rem]">
        {form?.[name] !== "" ? form?.[name] : text}
      </button>
      <div
        id="myDropdown"
        className={`dropdown-content ${
          isDropdownOpen ? "show" : ""
        } overflow-y-scroll max-h-[10rem]`}
      >
        {datas &&
          datas.map((item) => (
            <a onClick={()=>handleOnClick(item)} value={item?.userid}>
              {item?.userid}
            </a>
          ))}
      </div>
    </div>
  );
};

export default Dropdown;
