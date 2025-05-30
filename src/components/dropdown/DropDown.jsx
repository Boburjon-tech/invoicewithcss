import { useState,useRef,useEffect } from "react";
import arrow_down from "../../images/arrow-down.png";
import arrow_up from "../../images/arrow-up.png";
import "./dropdown.css";
import { useMediaQuery } from "../../hooks/useMediaQuery";

function DropDown({ onChange }) {
  const isMobile = useMediaQuery("(max-width:578px)")

  const [box, setBox] = useState(false);
  const [selectedStatuses, setSelectedStatuses] = useState([]);
  const dropdownRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setBox(false);
      }
    }

    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  const handleCheckboxChange = (status) => {
    let updatedStatuses = [];
    setSelectedStatuses((prev) => {
      updatedStatuses = prev.includes(status)
        ? prev.filter((i) => i !== status)
        : [...prev, status];
      return updatedStatuses;
    });

    setTimeout(() => {
      onChange && onChange(updatedStatuses);
    }, 0); 
  };

  return (
    <div className="custom-select" ref={dropdownRef}>
      <div className="select-box">
        <button type="button" onClick={() => setBox(!box)}>
          {isMobile ? "Filter" : "Filter by status"}
          {box ? <img src={arrow_up} alt="up" /> : <img src={arrow_down} alt="down" />}
        </button>
      </div>

      {box && (
        <div className="checkbox-dropdown">
          {["draft", "pending", "paid"].map((status) => (
            <label key={status}>
              <input
                type="checkbox"
                name="status"
                value={status}
                checked={selectedStatuses.includes(status)}
                onChange={() => handleCheckboxChange(status)}
              />
              {status.charAt(0).toUpperCase() + status.slice(1)}
            </label>
          ))}
        </div>
      )}
    </div>
  );
}

export default DropDown;
