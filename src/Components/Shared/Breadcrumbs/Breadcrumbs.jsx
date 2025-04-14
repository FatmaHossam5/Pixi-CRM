import React from "react";

const Breadcrumbs = ({ breadcrumbs, isRTL = false }) => {
  return (
    <ul className="d-flex mt-3">
      {breadcrumbs.map((crumb, index) => (
        <li
          key={index}
          className={`breadcrumbs-item d-flex align-items-center ${
            index === breadcrumbs.length - 1 ? "active-breadcrumbs" : ""
          }`}
        >
          {index > 0 && (
            <span className="breadcrumbs-separator ms-2">
              <i className={`fa-kit ${isRTL ? "fa-left" : "fa-right"}`} />
            </span>
          )}
          {crumb}
        </li>
      ))}
    </ul>
  );
};

export default Breadcrumbs;
