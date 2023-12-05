
import FilterAltOutlinedIcon from '@mui/icons-material/FilterAltOutlined';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import React from "react";

export default function SearchBarComponent() {

    return (
        <div className="search">
            <div className={"filter_button"}>
                <FilterAltOutlinedIcon/>
                Filter
            </div>
            <div className={"search-field"}>
                <input className={"search-text"} type="text" placeholder={"Search movies..."}/>
            </div>
            <div className={"search-icon"}>
                <SearchOutlinedIcon/>
            </div>


        </div>
    );
}

