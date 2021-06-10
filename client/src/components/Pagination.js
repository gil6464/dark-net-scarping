import React from "react";

function Pagination({ pastesPerPage, totalPastes, paginate }) {
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(totalPastes / pastesPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <div>
      <ul className="nav-link">
        {pageNumbers.map(number => (
          <li key={number} className="page-list">
            <a onClick={() => paginate(number)} href="!#">
              {number}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Pagination;
