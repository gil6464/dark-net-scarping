import React from "react";
import axios from "axios";

//* This function serach paste for each letter in the input, and show you in "live" the results

function SerachBar({ setPastes, setLoading }) {
  async function handleChange(event) {
    setLoading(true);
    const value = event.target.value;
    const response = await axios.get(
      `http://localhost:3001?searchText=${value}`
    );
    setPastes(response.data);
    setLoading(false);
  }
  return (
    <div className="inputDiv">
      <input
        id="searchInput"
        onChange={handleChange}
        placeholder="Search by title"
      ></input>
    </div>
  );
}

export default SerachBar;
