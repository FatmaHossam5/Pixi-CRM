import { Carousel } from "react-bootstrap";
import Tabs from "../Tabs/Tabs";

const TabsCarousel = ({ slides, activeTab, onTabClick, currentIndex, onSelect, language }) => {

  return (
    <div className="w-100 Carousel-parent">

    <Carousel
      activeIndex={currentIndex}
      onSelect={onSelect}
      interval={null}
      wrap={false}
      prevIcon={
        <span
          className={`carousel-control-prev-icon custom-prev-icon ${
            language === "ar" ? "rtl-icon" : ""
          }`}
          aria-hidden="true"
        />
      }
      nextIcon={
        <span
          className={`carousel-control-next-icon custom-next-icon ${
            language === "ar" ? "rtl-icon" : ""
          }`}
          aria-hidden="true"
        />
      }
    >
      {slides.map((slide, index) => (
        <Carousel.Item key={index}>
          <div className="px-taps">
          {/* <Tabs tabs={slide} activeTab={activeTab} onTabClick={onTabClick} /> */}

          </div>
        </Carousel.Item>
      ))}
    </Carousel>
    </div>

  );
};

export default TabsCarousel;
