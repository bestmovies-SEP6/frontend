import React from "react";
import "./People.css";
import { useNavigate, useParams } from "react-router-dom";
import { usePopularPeopleByPageNoQuery } from "../../../redux/features/api/peopleApi";
import PersonCard from "../../components/personCard/personCard";
import LoadingComponent from "../../components/loading/loadingComponent";
import ErrorComponent from "../../components/error/errorComponent";
import Pagination from "../../components/pagination/Pagination";

function People() {
    const { pageNo } = useParams();
    const currentPage = parseInt(pageNo) || 1;

    return (
        <>
            <div className={"people-heading"}>
                <h2>Popular People</h2>
            </div>
            <div className={"people-container"}>
                <PeopleCardList pageNo={currentPage} />
            </div>
            <Pagination total_pages={100}/>
        </>
    );
}

function PeopleCardList({ pageNo }) {
    const navigate = useNavigate();
    const peopleByPageNo = usePopularPeopleByPageNoQuery(pageNo); // Use pageNo in the query

    const isLoading = peopleByPageNo.isLoading;
    const error = peopleByPageNo.error;

    if (isLoading) return <LoadingComponent />;
    if (error) return <ErrorComponent error={error} />;

    function onClickPersonCard(personId) {
        navigate(`/person/${personId}`);
    }

    const data = peopleByPageNo.data;
    return (
        <div>
            {data?.length > 0 ? (
                <div className="people-container">
                    {data.map((person, index) => (
                        <PersonCard key={index} person={person} onClick={() => onClickPersonCard(person.id)} />
                    ))}
                </div>
            ) : (
                <p>No People Found</p>
            )}
        </div>
    );
}

export { People };
