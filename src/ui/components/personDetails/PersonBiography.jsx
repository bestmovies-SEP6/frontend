
import React from "react";
import "../personDetails/PersonBiography.css";

function PersonBiography({personData}) {
    return (
        <div className={"person-biography-container"}>
            <h1>{personData.name}</h1>

            <div className={"person-biography"}>
                <h2>Biography</h2>
                <ParagraphComponent paragraph={personData.biography}/>
            </div>

            <div className={"known-for"}>
                <h2>Known For</h2>
                <div className={"known-for-container"}></div>
            </div>
        </div>
    );
}

function ParagraphComponent({paragraph}) {
    const regex = /(?:\.|\?|\!)\s([^\.!?]*?)$/;
    let match = paragraph.match(regex);

    const lastIndex = match ? paragraph.lastIndexOf(match[1]) : paragraph.length;
    const mainText = paragraph.substring(0,lastIndex);
    const lastSentence = match ? match[1] : "";

    return (
        <>
            <p>{mainText}</p>
            {lastSentence && <p>{lastSentence}</p>}
        </>
    )
}

export {PersonBiography};
