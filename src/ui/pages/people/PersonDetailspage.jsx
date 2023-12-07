import React from "react";
import "./PersonDetailsPage.css";
import {useParams} from "react-router-dom";
import {usePersonDetailsByPersonIdQuery} from "../../../redux/features/api/peopleApi";
import {PersonInfo} from "../../components/personDetails/PersonInfo";
import {PersonBiography} from "../../components/personDetails/PersonBiography";
import LoadingComponent from "../../components/loading/loadingComponent";
import {toast} from "react-toastify";
function PersonDetailsPage() {
    const {personId} = useParams();
    const {data: person, isLoading: isLoadingPerson, error : isError} = usePersonDetailsByPersonIdQuery(personId)

    // Handle loading state
    if (isLoadingPerson) {
        return <LoadingComponent/>
    }

    // Handle error state
    if (isError) {
        toast.update("loadingPersonDetailsPage", {
            render: isError.data,
            type: "error",
            autoClose: false,
        })
        return <div></div>
    }
    return (
            <div className={"person-details-container"}>
                <PersonInfo personData={person}/>
                <PersonBiography personData={person}/>
            </div>
    )
}

export default PersonDetailsPage;
