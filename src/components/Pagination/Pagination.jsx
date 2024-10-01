import React from "react";
import { Link } from "react-router-dom";

const Pagination = ({
  totalPosts,
  postsPerPage,
  setCurrentPage,
  currentPage,
}) => {
  let pages = [];

  for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
    pages.push(i);
  }

  return (
    <div className="grid gap-y-10 justify-items-center justify-center md:flex items-center md:justify-between my-10 md:my-16">
      <div className="flex-1 flex justify-center">
        {Math.ceil(totalPosts / postsPerPage) !== currentPage  ? (
          <Link
            className="primary_btn min-w-[200px] text-center h-16 inline-flex justify-center items-center"
            onClick={() => {
              setCurrentPage(currentPage + 1);
            }}
          >
            Next Page
          </Link>
        ) : (
          ""
        )}
      </div>
      <div className="flex items-center">
        {pages.map((page, i) => (
          <span
            key={i}
            className={`cursor-pointer text-sm w-8 h-8 flex items-center justify-center ${
              currentPage === page ? "border border-orange" : ""
            }`}
            onClick={() => {
              setCurrentPage(page);
            }}
          >
            {page}
          </span>
        ))}
        {/* <span className="cursor-pointer text-sm w-8 h-8 flex items-center justify-center">
          1
        </span>

        <span className="cursor-pointer text-sm w-8 h-8 flex items-center justify-center">
          3
        </span> */}
      </div>
    </div>
  );
};

export default Pagination;
