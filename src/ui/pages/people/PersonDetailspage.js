import React from "react";
import "./PersonDetailsPage.css";
import {useParams} from "react-router-dom";
import {usePersonDetailsByPersonIdQuery} from "../../../redux/features/api/peopleApi";
import {PersonInfo} from "../../components/personDetails/PersonInfo";
import {PersonBiography} from "../../components/personDetails/PersonBiography";

/*function PersonDetailsPage() {


    return (
        <div className="person-details">
            <div className="person-details-left">
                <img src={person.profile_path} alt={person.name} />
                <div className="person-details-social-media">
                    <p>Social Media</p>
                </div>
                <h3>Personal Info</h3>
                <div className={"person-details-Known-For"}>
                    <p>Known For</p>
                    <p>{person.known_for_department}</p>
                </div>
                <div className={"person-details-gender"}>
                    <p>Gender</p>
                    <p>{person.gender_string}</p>
                </div>

                <div className="person-details-birthday">
                    <p>Birthday</p>
                    <p>{person.birthday}</p>
                </div>
                <div className="person-details-place-of-birth">
                    <p>Place of Birth</p>
                    <p>{person.place_of_birth}</p>
                </div>
                <div className="person-details-also-known-as">
                    <p>Also Known As</p>
                    <p>{person.also_known_as}</p>
                </div>
            </div>
            <div className="person-details-right">
                <div className="person-details-header">
                    <div className="person-summary">
                        <h2>{person.name}</h2>
                        <p className="person-biography">{person.biography}</p>
                    </div>
                </div>
                <div className="person-known-for">
                    <h3>Known For</h3>
                    <div className="known-for-list">
                        {person.combined_credits.cast.map((movie, index) => (
                            <div key={index} className="known-for-item">
                                <img src={movie.poster_path || "default_poster.jpg"} alt={movie.title} />
                                <div className="known-for-item-details">
                                    <h3>{movie.title}</h3>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}*/

function PersonDetailsPage() {
    const {personId} = useParams();
    const {data: person, isLoading: isLoadingPerson} = usePersonDetailsByPersonIdQuery(personId)
    // Handle loading state
    if (isLoadingPerson) {
        return <div>Loading...</div>;
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

export default PersonDetailsPage;
