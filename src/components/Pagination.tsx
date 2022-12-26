import React from 'react';
import {PaginationProps} from '../types/@types';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faArrowLeft, faArrowRight} from '@fortawesome/free-solid-svg-icons';

const Pagination = (props: PaginationProps) => {
  const {users, onPageChange, currentPage} = props;
  const pageCount = Math.ceil(users.length / 7);

  if (pageCount <= 1) {
    return null;
  }

  const pages = [];
  for (let i = 1; i <= pageCount; i++) {
    pages.push(i);
  }

  return (
    <div className="flex justify-between items-center p-7">
      <button
        key={'previous'}
        className="bg-white hover:bg-gray-100 text-gray-800 px-4 py-1 border border-gray-400 rounded shadow text-sm h-fit"
        onClick={() => onPageChange(currentPage - 1)}
      >
        <FontAwesomeIcon icon={faArrowLeft} /> Previous
      </button>
      <nav className="flex items-center justify-center p-2">
        {pages.map(page => (
          <button
            key={page}
            className={`text-gray-500 hover:text-black focus:text-black m-1 p-1 px-3 hover:bg-gray-200 rounded focus:bg-gray-200 ${
              currentPage === page && 'bg-gray-200 text-black'
            }`}
            onClick={() => onPageChange(page)}
          >
            {page}
          </button>
        ))}
      </nav>
      <button
        key={'next'}
        className="bg-white hover:bg-gray-100 text-gray-800 px-4 py-1 border border-gray-400 rounded shadow text-sm h-fit"
        onClick={() => onPageChange(currentPage + 1)}
      >
        Next <FontAwesomeIcon icon={faArrowRight} />
      </button>
    </div>
  );
};

export default Pagination;
