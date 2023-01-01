import React from "react";

const Pagination = ({
  usersPerPage,
  totalUsers,
  paginate,
  prevPage,
  nextPage,
  currentPage,
}) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalUsers / usersPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <nav>
      <ul className="pagination">
        <li className="page-item">
          <button onClick={() => prevPage()} className="page-link">
            Prev
          </button>
        </li>
        {pageNumbers.map((number) => (
          <li key={number} className="page-item">
            <button onClick={() => paginate(number)} className="page-link">
              {number}
            </button>
          </li>
        ))}
        <li className="page-item">
          <button onClick={() => nextPage()} className="page-link">
            Next
          </button>
        </li>
      </ul>
      <p>
        Page {currentPage} of {pageNumbers.length}
      </p>
    </nav>
  );
};

export default Pagination;