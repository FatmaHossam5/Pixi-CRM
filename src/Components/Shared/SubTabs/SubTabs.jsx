import React from "react";

const SubTabs = ({ tabs, activeTab, onTabClick }) => {
  return (
    <ul className="nav nav-pills mb-3" role="tablist">
      {tabs.map(({ id, label }) => (
        <li className="nav-item" role="presentation" key={id}>
          <button
            className={`nav-link ${activeTab === id ? "active" : ""}`}
            onClick={() => onTabClick(id)}
            type="button"
            role="tab"
            aria-selected={activeTab === id}
          >
            {label}
          </button>
        </li>
      ))}
    </ul>
  );
};

export default SubTabs;
