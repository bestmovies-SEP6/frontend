import FilterAltOutlinedIcon from '@mui/icons-material/FilterAltOutlined';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import React, {useState} from "react";
import {useNavigate} from "react-router-dom";
import {toast} from "react-toastify";

export default function SearchBarComponent() {

    const [searchText, setSearchText] = useState("");
    const navigate = useNavigate();

    function onFilterButtonClick() {
        navigate("/filter")
    }

    function onSearchIconClick() {
        if (!searchText || searchText.trim().length === 0) {
            toast.error("Please enter a search query to search for movies", {
                toastId: "searchQueryRequired",

            })
            return;
        }

        setSearchText("")
        navigate(`/filter?query=${searchText.trim()}`)
    }

    return (
        <div className="search">
            <div onClick={onFilterButtonClick} className={"filter_button"}>
                <FilterAltOutlinedIcon/>
                Filter
            </div>
            <div className={"search-field"}>
                <input className={"search-text"} type="text" placeholder={"Search movies..."}
                       value={searchText} onChange={(e) => setSearchText(e.target.value)}/>
            </div>
            <div className={"search-icon"} onClick={onSearchIconClick}>
                <SearchOutlinedIcon/>
            </div>


        </div>
    );
}

