import React from "react";
import "./PersonCard.css";

function PersonCard({ person, onClick }) {
    const backGroundStyle = {
        backgroundImage: `url(${person.profile_path})`,
        backgroundSize: "cover",
    };

    // Function to create a string of movie/series titles
    const getKnownForTitles = () => {
        return person.known_for
            .map(kf => kf.title || kf.name) // Use either 'title' or 'name' depending on which is available
            .join(", "); // Join titles with a comma and a space
    }

    return (
        <div className="person-card" onClick={onClick}>
            <div className="profile-container" style={backGroundStyle}></div>
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
