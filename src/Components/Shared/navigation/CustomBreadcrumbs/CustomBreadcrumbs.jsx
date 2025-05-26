import React from 'react'
import { Link } from 'react-router-dom';

export default function CustomBreadcrumbs({
    breadcrumb = [],
    title = '',
    tabs = [],
  }) {
  return (
    <div className="px-card px-5 pt-4 pb-0">
    <div className="breadcrumb mb-2">
      {breadcrumb.map((item, index) => (
        <span key={index} className="breadcrumb-item">
          {item.path ? (
            <Link to={item.path}>{item.label}</Link>
          ) : (
            <span>{item.label}</span>
          )}
          {index < breadcrumb.length - 1 && <span className="mx-1"></span>}
        </span>
      ))}
    </div>

    <h3 className="mb-3 px-sub-taps">{title}</h3>

    <ul className="nav nav-pills mb-2">
      {tabs.map((tab, index) => (
        <li className="nav-item" key={index}>
          <button
            className={`nav-link ${tab.active ? 'active' : ''}`}
            onClick={tab.onClick}
          >
            {tab.label}
          </button>
        </li>
      ))}
    </ul>
  </div>
  )
}
