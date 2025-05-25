import { useTranslation } from "react-i18next";
import userImage from '../../../assets/images/user2-160x160.jpg';
import TimeAndDate from "../../Shared/TimeAndDate/TimeAndDate";
import PlayStopTimer from "../../Shared/PlayStopTimer/PlayStopTimer";
import styles from './Header.module.css';

const Header = ({ userName, userPhoto }) => {




  return (
    <>
      <div className={`${styles.pxCard} col-12 `}>
        <div className=" ps-3 pe-3 pt-2 pb-2  p-lg-3 d-flex align-items-center">
          <div className=" w-50 d-flex">
            <div className={`${styles.collapseBtn} p-2`}>
              <i className="fa-thin fa-hand-wave" />
            </div>
            <div>
              <button
                className="btn dropdown-toggle "
                type="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
              <h3 className={styles.greeting}>Hi, {userName}</h3>

              </button>

            </div>
            <TimeAndDate />
          </div>

          <div className="  d-flex align-items-center  ms-auto  ">

            <PlayStopTimer />
            <div className={`border-start mx-3 ${styles.verticalSeparator}`}></div>
            <div className="lang-btn">
              <i className="fa-regular fa-globe" />
              <div className="lang-badge">En</div>
            </div>
            <div className={`border-start mx-3 ${styles.verticalSeparator}`}></div>
            <div className="notifications p-2 light-shadow">
              <i className="fa-kit fa-notification-1" />
              <span className="badge text-bg-danger notification-number ">
                2
              </span>
            </div>
            <div className={`border-start mx-3 ${styles.verticalSeparator}`}></div>
            <div className="user-image d-none d-lg-flex ">
              <img src={userImage} alt={("userPhoto")} />
            </div>
          </div>
          {/* end right side */}
        </div>


      </div>


    </>
  );
};

export default Header;