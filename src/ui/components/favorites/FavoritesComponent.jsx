import {useSelector} from "react-redux";
import {selectIsLoggedIn} from "../../../redux/features/state/authState";
import {useGetFavoritesQuery} from "../../../redux/features/api/favoritesApi";
import {useNavigate} from "react-router-dom";
import LoadingComponent from "../loading/loadingComponent";
import {toast} from "react-toastify";
import FlatMoviesList from "../flatMovieCard/FlatMovieCard";
import React from "react";

function FavoritesComponent(){
    const isLoggedIn = useSelector(selectIsLoggedIn);
    const {data: favorites, error} = useGetFavoritesQuery();

    const navigate = useNavigate();
    if (!isLoggedIn) {
        return <div className={"login-required"} onClick={() => navigate("/authenticate")}>
            Login to see your favorites
        </div>
    }

    if (!favorites) {
        return <LoadingComponent/>
    }
    if (error) {
        toast.error(error.data, {
            autoClose: false,
        });
    }
    return <div className={"wishlists-container"}>
        <FlatMoviesList movies={favorites}/>
    </div>
}

export default  FavoritesComponent;