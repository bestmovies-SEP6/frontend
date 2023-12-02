import React, { useState, useContext } from "react";
import { Button } from "@mui/material";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import {useNavigate} from "react-router-dom";

export default function SearchBarComponent() {
    const navigate = useNavigate(); // useNavigate instead of useHistory
    return <></>;

    // return (
    //     <div className="search">
    //         <div>
    //             <Button component="label" variant="contained" startIcon={<FilterAltIcon />} className="filter_button">
    //                 Filter
    //             </Button>
    //         </div>
    //
    //         <div>
    //             <input
    //                 placeholder="Search Movie...."
    //                 className="search-bar"
    //                 value={searchTerm}
    //                 onChange={handleInputChange}// Update local state
    //             />
    //         </div>
    //
    //         <SearchOutlinedIcon className="search-icon" onClick={handleSearchClick} />
    //     </div>
    // );
}

