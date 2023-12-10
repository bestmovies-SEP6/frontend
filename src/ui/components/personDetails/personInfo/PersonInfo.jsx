import React from "react";

import "./PersonInfo.css"

function PersonInfo({personData}) {
    return (
        <div className={"person-info-container"}>
            <div className={"person-image"}>
                <img src={personData.profile_path} className={"person-img"} alt={personData.name}/>
            </div>
            <div className={"person-social-medias"}>
                <p>Social Media Links</p>
            </div>

            <div className={"personal-info"}>
                <h3>Personal Info</h3>

                <div className={"known-for"}>
                    <h5>Known For</h5>
                    <p>{personData.known_for_department}</p>
                </div>

                <div className={"known-credits"}>
                    <h5>Known Credits</h5>
                    <p>Known credits</p>
                </div>

                <div className={"gender"}>
                    <h5>Gender</h5>
                    <p>{personData.gender_string}</p>
                </div>

                <div className={"birthday"}>
                    <h5>Birthday</h5>
                    <p>{personData.birthday}</p>
                </div>

                <div className={"place-of-birth"}>
                    <h5>Place Of Birth</h5>
                    <p>
                        {personData.place_of_birth}
                    </p>
                </div>

                <div className={"also-known-as"}>
                    <h5>Also Known As</h5>
                    {personData.also_known_as.map(known => <p>{known}</p>)}
                </div>
            </div>
        </div>
    )
}

export {PersonInfo}