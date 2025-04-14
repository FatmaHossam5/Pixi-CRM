import React from "react";

const TabContent = ({ activeTab, contentMap }) => {
  if (!contentMap[activeTab]) {
    return <div>No content available for this tab.</div>;
  }

  return (
    <div className="tab-content">
      <div
        className={`tab-pane fade show active`}
        id={`pills-${activeTab}`}
        role="tabpanel"
        aria-labelledby={`pills-${activeTab}-tab`}
        tabIndex={0}
      >
        {contentMap[activeTab]}
      </div>
    </div>
  );
};

export default TabContent;
