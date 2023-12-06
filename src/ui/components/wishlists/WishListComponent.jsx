import "./WishListComponent.css"
import {useSelector} from "react-redux";
import {selectIsLoggedIn} from "../../../redux/features/state/authState";
import {useGetWishlistsQuery} from "../../../redux/features/api/wishlistApi";
import {useNavigate} from "react-router-dom";
import LoadingComponent from "../loading/loadingComponent";
import {toast} from "react-toastify";
import FlatMoviesList from "../flatMovieCard/FlatMovieCard";
import React from "react";

function WishListComponent(){
    const isLoggedIn = useSelector(selectIsLoggedIn);
    const {data: wishLists, error} = useGetWishlistsQuery();

    const navigate = useNavigate();
    if (!isLoggedIn) {
        return <div className={"login-required"} onClick={() => navigate("/authenticate")}>
            Login to see your wishlists
        </div>
    }

    if (!wishLists) {
        return <LoadingComponent/>
    }
    if (error) {
        toast.error(error.data, {
            autoClose: false,
        });
    }
    return <div className={"wishlists-container"}>
        <FlatMoviesList movies={wishLists}/>
    </div>
}

export default  WishListComponent;