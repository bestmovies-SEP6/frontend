import React from 'react';
import {useLocation, useNavigate} from 'react-router-dom';
import './Pagination.css';

const Pagination = ({ total_pages, onNext, onPrevious, onPageClick }) => {
    const location =useLocation();

    const params = new URLSearchParams(location.search);
    let pageNo = parseInt(params.get('pageNo'));
    if (isNaN(pageNo) || pageNo < 1) pageNo = 1;


    // Determine the range of page numbers to show
    const pageNumbers = [];
    const pagesToShow = 5;
    let startPage = Math.max(pageNo - Math.floor(pagesToShow / 2), 1);
    let endPage = startPage + pagesToShow - 1;

    // Adjust if the end page goes beyond the total pages
    if (endPage > total_pages) {
        endPage = total_pages;
        startPage = Math.max(total_pages - pagesToShow + 1, 1);
    }

    for (let i = startPage; i <= endPage; i++) {
        pageNumbers.push(i);
    }

    return (
        <div className="pagination">
            <button onClick={onPrevious} disabled={pageNo <= 1}>&laquo;</button>
            {pageNumbers.map(number => (
                <button
                    key={number}
                    onClick={() => onPageClick(number)}
                    className={pageNo === number ? 'active' : ''}
                >
                    {number}
                </button>
            ))}
            <button onClick={onNext} disabled={pageNo >= total_pages}>&raquo;</button>
        </div>
    );
};

export default Pagination;
