import React, { useState, useContext } from "react";
import { Button } from "@mui/material";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import { useSearchTermContext } from "../contexts/SearchTermContext";

export default function SearchBarComponent() {
    const { searchTerm, setSearchTerm } = useSearchTermContext();
    const [localSearchTerm, setLocalSearchTerm] = useState("");

    const handleSearchClick = () => {
        setSearchTerm(localSearchTerm);
    };
    const handleInputChange = (e) => {
        setLocalSearchTerm(e.target.value);  // Update the context searchTerm directly
    };

    return (
        <div className="search">
            <div>
                <Button component="label" variant="contained" startIcon={<FilterAltIcon />} className="filter_button">
                    Filter
                </Button>
            </div>

            <div>
                <input
                    placeholder="Search Movie...."
                    className="search-bar"
                    value={localSearchTerm}
                    onChange={handleInputChange}// Update local state
                />
            </div>

            <SearchOutlinedIcon className="search-icon" onClick={handleSearchClick} />
        </div>
    );
}

