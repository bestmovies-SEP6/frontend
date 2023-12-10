import React from "react";
import "./People.css";
import {useLocation, useNavigate} from "react-router-dom";
import { usePopularPeopleByPageNoQuery } from "../../../redux/features/api/peopleApi";
import PersonCard from "../../components/personCard/personCard";
import Pagination from "../../components/pagination/Pagination";
import {toast} from "react-toastify";

function People() {
    const navigate = useNavigate();
    const location = useLocation();
    const params = new URLSearchParams(location.search);
    let pageNo = parseInt(params.get('pageNo'));
    if (isNaN(pageNo) || pageNo < 1) pageNo = 1;

    function  onNextPageClick() {
        navigate(`/people?pageNo=${pageNo + 1}`)
    }

    function onPreviousPageClick() {
        if (pageNo === 1) return;
        navigate(`/people?pageNo=${pageNo - 1}`)
    }

    function onPageNumberClick(pageNumber) {
        navigate(`/people?pageNo=${pageNumber}`)
    }

    return (
        <>
            <div className={"people-heading hard-title"}>
                <h2>Popular Peoples</h2>
            </div>
                <PeopleCardList pageNo={pageNo} />
            <Pagination total_pages={100}
                        onNext={onNextPageClick}
                        onPrevious={onPreviousPageClick}
                        onPageClick={onPageNumberClick}/>
        </>
    );
}

function PeopleCardList({ pageNo }) {
    const navigate = useNavigate();
    const peopleByPageNo = usePopularPeopleByPageNoQuery(pageNo); // Use pageNo in the query

    const isLoading = peopleByPageNo.isLoading;
    const error = peopleByPageNo.error;

    if (error) {
        toast.update("loadingPeople", {
            render: error.data,
            type: "error",
            autoClose: false,
        })
        return <div> Something went wrong </div>
    }

    function onClickPersonCard(personId) {
        navigate(`/person-details/${personId}`);
    }

    const data = peopleByPageNo.data;
    return (
        <div>{
            !isLoading ? (
                <div className="people-container">
                    {data.map((person, index) => (
                        <PersonCard key={index} person={person} onClick={() => onClickPersonCard(person.id)} />
                    ))}
                </div>
            ) : (
                <p>Loading people...</p>
            )
        }
        </div>
    );
}

export { People };
