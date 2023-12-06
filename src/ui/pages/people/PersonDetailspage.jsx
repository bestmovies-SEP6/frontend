import React from "react";
import "./PersonDetailsPage.css";
import {useParams} from "react-router-dom";
import {usePersonDetailsByPersonIdQuery} from "../../../redux/features/api/peopleApi";
import {PersonInfo} from "../../components/personDetails/PersonInfo";
import {PersonBiography} from "../../components/personDetails/PersonBiography";
import LoadingComponent from "../../components/loading/loadingComponent";
function PersonDetailspage() {
    const {personId} = useParams();
    const {data: person, isLoading: isLoadingPerson} = usePersonDetailsByPersonIdQuery(personId)
    // Handle loading state
    if (isLoadingPerson) {
        return <LoadingComponent/>
    }
    // Check if person data is available after loading
    if (!person) {
        return <div>No person data found</div>;
    }
    return (
        <div className={"person-details-container"}>
            <PersonInfo personData={person}/>
            <PersonBiography personData={person}/>
        </div>
    )
}

export default PersonDetailspage;
