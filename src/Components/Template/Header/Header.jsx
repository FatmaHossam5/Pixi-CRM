import { useTranslation } from "react-i18next";
import userImage from '../../../assets/images/user2-160x160.jpg'
import TimeAndDate from "../../Shared/TimeAndDate/TimeAndDate";
import PlayStopTimer from "../../Utlis/PlayStopTimer";
import ThemeToggle from "../ThemeToggle/ThemeToggle";
const Header = ({ userName, userPhoto }) => {
  const { t, i18n } = useTranslation();

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng); // Change language in i18next
    localStorage.setItem('language', lng); // Save to localStorage
    document.documentElement.setAttribute('lang', lng); // Update HTML lang attribute
    document.documentElement.setAttribute('dir', lng === 'ar' ? 'rtl' : 'ltr'); // Update direction for RTL languages
  };


  return (
    <>
      <div className="px-card  col-12 ">
        <div className="upper-header ps-3 pe-3 pt-2 pb-2  p-lg-3 d-flex align-items-center">
          {/* start header left side  */}
          <div className="left-side-links w-50 d-flex">
            <div className="collaps-btn p-2">
              <i className="fa-thin fa-hand-wave" />
            </div>
            {/* Large button groups (default and split) */}
            <div className="btn-group  vertical-separetor">
              <button
                className="btn dropdown-toggle "
                type="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                <h3 className="m-0 px-main-color-blue" style={{ color: '#1877F2' }}>
                  {t("Hi")} ,{userName} <ThemeToggle />
                </h3>
              </button>

            </div>
            <TimeAndDate />
          </div>
          {/* end header left side */}
          {/* start header middle part  */}

          {/* end header middle part  */}
          {/* start right side */}
          <div className="right-side-links  d-flex align-items-center  ms-auto  ">
            {/* <div className="play-btn p-2">
              <i className="fa-thin fa-play" />
            </div> */}
              <PlayStopTimer />
            <div className="border-start mx-3 vertical-separator"></div>
            <div className="lang-btn">
           <i className="fa-regular fa-globe" />
           <div className="lang-badge">En</div>
            </div>
            <div className="border-start mx-3 vertical-separator"></div>
            <div className="notifications p-2 light-shadow">
              <i className="fa-kit fa-notification-1" />
              <span className="badge text-bg-danger notification-number ">
                2
              </span>
            </div>
            <div className="border-start mx-3 vertical-separator" ></div>
            <div className="user-image d-none d-lg-flex ">
              <img src={userImage} alt={t("userPhoto")} />
            </div>
          </div>
          {/* end right side */}
        </div>


      </div>


    </>
  );
};

export default Header;