import React from "react";
import "./PersonCard.css";

function PersonCard({person, onClick}) {

    // Function to create a string of movie/series titles
    const getKnownForTitles = () => {
        return person.known_for
            .map(kf => kf.title || kf.name) // Use either 'title' or 'name' depending on which is available
            .join(", "); // Join titles with a comma and a space
    }

    return (
        <div className="person-card" onClick={onClick}>
            <div className="profile-container">
                <img className={"profile-image"} src={person.profile_path} alt={person + "'s profile image"}
                     loading={"lazy"}
                     onError={(e) => {
                         e.target.alt = "image not found";
                         e.target.src = "https://www.movienewz.com/img/films/poster-holder.jpg"
                     }}/>
            </div>
            <div className="people-name">
                <h3>{person.name}</h3>
            </div>
            <div className="people-known-for">
                {getKnownForTitles()}
            </div>
        </div>
    );
}

export default PersonCard;
