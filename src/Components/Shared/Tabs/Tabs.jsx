// Generate slides dynamically based on the provided tabs and number of tabs per slide


import React, { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";

export const generateSlides = (tabs, tabsPerSlide = 10) => {
  const slides = [];
  for (let i = 0; i < tabs.length; i += tabsPerSlide) {
    slides.push(tabs.slice(i, i + tabsPerSlide));
  }
  return slides;
};


const Tabs = ({ tabs, activeTab, onTabClick }) => {
  const { t } = useTranslation();

  const scrollContainerRef = useRef(null);
  const [isOverflowing, setIsOverflowing] = useState(false);

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const handleResize = () => {
      const hasOverflow = container.scrollWidth > container.clientWidth;
      setIsOverflowing(hasOverflow);
    };

    const observer = new ResizeObserver(handleResize);
    observer.observe(container);

    // Initial check
    handleResize();

    return () => {
      observer.unobserve(container);
    };
  }, []); // Empty dependency array ensures effect runs once on mount
  
  const scrollLeft = () => {

    scrollContainerRef.current.scrollBy({ left: -150, behavior: "smooth" });
  };
  const scrollRight = () => {
    scrollContainerRef.current.scrollBy({ left: 150, behavior: "smooth" });
  };
  return (
    <div className="px-scroll-tabs-container d-flex " >


       {isOverflowing && (
        <button className="scroll-btn left" onClick={scrollLeft}>
          <i className="fa-light fa-chevron-left"></i>
        </button>
      )}

      <ul className="px-scroll-tabs nav nav-pills" id="pills-tab" role="tablist" ref={scrollContainerRef}>
        {/* Scroll Buttons */}

        {tabs.map((tab) => (
          <li className="nav-item" role="presentation" key={tab}>
            <button
              className={`nav-link ${activeTab === tab.toLowerCase() ? "active" : ""}`}
              onClick={() => onTabClick(tab.toLowerCase())}
              type="button"
            >
              {t(tab)}
            </button>
          </li>
        ))}
        {/* Scroll Buttons */}

      </ul>
      {isOverflowing && (
        <button className="scroll-btn right" onClick={scrollRight}>
          <i className="fa-light fa-chevron-right"></i>
        </button>
      )}

    </div>

  );
};

export default Tabs;
