import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import './Pagination.css';

const Pagination = ({ total_pages }) => {
    const { pageNo } = useParams();
    const currentPage = parseInt(pageNo) || 1;
    const navigate = useNavigate();

    // Determine the range of page numbers to show
    const pageNumbers = [];
    const pagesToShow = 5;
    let startPage = Math.max(currentPage - Math.floor(pagesToShow / 2), 1);
    let endPage = startPage + pagesToShow - 1;

    // Adjust if the end page goes beyond the total pages
    if (endPage > total_pages) {
        endPage = total_pages;
        startPage = Math.max(total_pages - pagesToShow + 1, 1);
    }

    for (let i = startPage; i <= endPage; i++) {
        pageNumbers.push(i);
    }

    const navigateToPage = (pageNumber) => {
        navigate(`/people/${pageNumber}`);
    };

    return (
        <div className="pagination">
            <button onClick={() => navigateToPage(currentPage - 1)} disabled={currentPage <= 1}>&laquo;</button>
            {pageNumbers.map(number => (
                <button
                    key={number}
                    onClick={() => navigateToPage(number)}
                    className={currentPage === number ? 'active' : ''}
                >
                    {number}
                </button>
            ))}
            <button onClick={() => navigateToPage(currentPage + 1)} disabled={currentPage >= total_pages}>&raquo;</button>
        </div>
    );
};

export default Pagination;
