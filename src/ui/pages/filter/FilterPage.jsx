import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";

import "./FilterPage.css"


import {useLocation, useNavigate} from "react-router-dom";
import {toast} from "react-toastify";
import WishListComponent from "../../components/wishlists/WishListComponent";
import MovieCardListComponent from "../../components/movieCardList/MovieCardListComponent";
import {
    usePopularMoviesQuery,
    useSearchMoviesQuery, useTopRatedMoviesQuery,
    useTrendingMoviesQuery
} from "../../../redux/features/api/moviesApi";
import LoadingComponent from "../../components/loading/loadingComponent";
import Pagination from "../../components/pagination/Pagination";
import React, {useState} from "react";
import FilterAltOutlinedIcon from "@mui/icons-material/FilterAltOutlined";


function FilterPage() {
    const location = useLocation();
    const navigate = useNavigate();
    const params = new URLSearchParams(location.search);
    let pageNo = parseInt(params.get('pageNo'));
    if (isNaN(pageNo) || pageNo < 1) pageNo = 1;

    const query = params.get('query');
    const region = params.get('region');
    const year = params.get('year');


    const [searchQuery, setSearchQuery] = useState(query);
    const [searchRegion, setSearchRegion] = useState(region);
    const [searchYear, setSearchYear] = useState(year);


    let showSearchResults = false;

    if (query) {
        console.log("query is present", query);
        showSearchResults = true;
    }
    if (!query && pageNo !== 1) {
        toast.error("Search query is required for filtering", {
            toastId: "searchQueryRequired",
        })
    }

    function onFilterClick() {
        navigateToPage(1);
    }

    function navigateToPage(pageNumber) {
        const navigateAddress = new URLSearchParams();

        if (pageNumber)
            navigateAddress.append('pageNo', pageNumber);

        if (searchQuery)
            navigateAddress.append('query', searchQuery);

        if (searchRegion) {
            navigateAddress.append('region', searchRegion);
        }
        if (searchYear) {
            navigateAddress.append('year', searchYear);
        }
        navigate(`/filter?${navigateAddress.toString()}`)
    }

    return <div className={"whole-container"}>
        <div className={"navbar-excluded"}>
            <div className={"content-section"}>
                <div className={"filter-container"}>
                    <div className="hard-title">
                        Filter
                    </div>
                    <div className={"filter-options"}>
                        <div className={"options"}>
                            <div className={"option"}>
                                <input className={"search-input"} type="text" placeholder={"Search movies..."}
                                       value={searchQuery} onChange={e => setSearchQuery(e.target.value)}/>
                            </div>
                            <div className={"option"}>
                                <input className={"search-input"} type="text" placeholder={"Region"}
                                       value={searchRegion} onChange={e => setSearchRegion(e.target.value)}/>

                            </div>
                            <div className={"option"}>

                                <DatePicker className={"search-input date-picker"}
                                            placeholderText={"Year"}
                                            selected={searchYear ? new Date(searchYear, 1, 1) : null}
                                            onChange={date => {
                                                console.log(date);
                                                if (!date || date === '') {
                                                    setSearchYear(null);
                                                } else {
                                                    setSearchYear(date.getFullYear())

                                                }
                                            }
                                            }
                                            dateFormat="yyyy"
                                            maxDate={new Date()}
                                            minDate={new Date(1920, 1, 1)}
                                            showYearPicker/>
                            </div>
                        </div>


                        <div onClick={onFilterClick} className={"filter-button"}>
                            <button className={"filter_button"}>
                                <FilterAltOutlinedIcon/>
                                Filter
                            </button>
                        </div>
                    </div>
                    {showSearchResults ?
                        <SearchMoviesComponent pageNo={pageNo} query={query} region={region} year={year} navigateToPage={navigateToPage}/> :
                        <FirstPageUnSearchedComponent/>}
                </div>
            </div>
            <div className="wishlists-section">
                <div className="hard-title">
                    Wishlists
                </div>
                <WishListComponent/>
            </div>
        </div>

    </div>
}


function SearchMoviesComponent({pageNo, query, region, year, navigateToPage}) {

    const {data, isLoading, error} = useSearchMoviesQuery({pageNo, query, region, year});
    if (isLoading) {
        toast.loading("Loading movies ...", {
            toastId: "loadingSearchMovies",
            autoClose: false,
        })
    }
    if (data) {
        toast.dismiss("loadingSearchMovies");
    }

    if (error) {
        console.log(error);
        toast.dismiss("loadingSearchMovies");
        toast.error(error.data, {
            autoClose: false,
        });
        return <p className={"hard-title"}> Something went wrong ...</p>
    }

    function onNextPageClick() {
        navigateToPage(pageNo + 1);
    }

    function onPreviousPageClick() {
        if (pageNo === 1) return;
        navigateToPage(pageNo - 1);
    }


    return isLoading ? <LoadingComponent/> :
        <div>
            <MovieCardListComponent movies={data.results}/>
            <Pagination total_pages={data.total_pages}
                        pageNo={pageNo}
                        onNext={onNextPageClick}
                        onPrevious={onPreviousPageClick}
                        onPageClick={navigateToPage}/>

        </div>

}

function FirstPageUnSearchedComponent() {
    const trending = useTrendingMoviesQuery();
    const popular = usePopularMoviesQuery();
    const topRated = useTopRatedMoviesQuery();

    const isLoading = trending.isLoading || popular.isLoading || topRated.isLoading;


    return isLoading ? <LoadingComponent/> :
        <MovieCardListComponent movies={getUniqueMovies(trending.data, popular.data, topRated.data).slice(0, 28)}/>

}

function getUniqueMovies(trending, popular, topRated) {
    const allMovies = [...trending, ...popular, ...topRated];
    // Remove duplicates
    const uniqueMoviesMap = new Map();
    allMovies.forEach(movie => uniqueMoviesMap.set(movie.id, movie));
    return Array.from(uniqueMoviesMap.values());
}

export default FilterPage;