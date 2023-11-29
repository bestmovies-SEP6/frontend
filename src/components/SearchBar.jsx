import React, { useState } from "react";
import "../css/SearchBar.css";
import SearchIcon from "../images/search.svg";

export function SearchBar({ setMovies }) {
  const [query, setQuery] = useState("");

  const [searchTerm, setSeacrhTerm] = useState("");
  const API_URL = "http://www.omdbapi.com/?i=tt3896198&apikey=e8ebe675";

  const searchMovies = async (title) => {
    const res = await fetch(`${API_URL}&s=${title}`);
    const data = await res.json();
    setMovies(data.Search)
    console.log(data.Search);
  };

  const handleSearch = () => {
    searchMovies(searchTerm);
  };

  return (
    <div className="search">
      <div className="filter">
        <button className="filter-btn">
          <i className="filter-icon">Filter</i> {/* Replace with your icon */}
        </button>
      </div>
      <div className="search-input-div">
        <input
          placeholder="Search movies..."
          value={searchTerm}
          onChange={(e) => setSeacrhTerm(e.target.value)}
        />
      </div>
      <div className="search-icon">
        <button onClick={handleSearch}>
          <img src={SearchIcon} alt="Search Icon" />
        </button>
      </div>
    </div>
  );
}

export default SearchBar;
