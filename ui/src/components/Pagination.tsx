import "./Pagination.css"
import React from 'react';

interface PaginationProps {
    currentPage: number;
    totalPages: number;
    pageGroup: number;
    onPageChange: (pageNumber: number) => void;
    onPrevGroup: () => void;
    onNextGroup: () => void;
}

const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPages, pageGroup, onPageChange, onPrevGroup, onNextGroup }) => {
    const maxPageGroup = Math.ceil(totalPages / 5);
    
    return (
        <div className="pagination">
            <button onClick={onPrevGroup} disabled={pageGroup === 0}>{'<<'}</button>
            {Array.from({ length: Math.min(5, totalPages - pageGroup * 5) }, (_, index) => {
                const pageNumber = pageGroup * 5 + index + 1;
                return (
                    <button
                        key={pageNumber}
                        onClick={() => onPageChange(pageNumber)}
                        className={currentPage === pageNumber ? 'active' : ''}
                    >
                        {pageNumber}
                    </button>
                );
            })}
            <button onClick={onNextGroup} disabled={pageGroup >= maxPageGroup - 1}>{'>>'}</button>
        </div>
    );
};

export default Pagination;
