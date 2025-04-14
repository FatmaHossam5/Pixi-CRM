import React, { useContext, useEffect, useState } from "react";
// import "./SelectedHotel.css";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "./../../Helpers/Context/AuthContext";
import axios from "axios";
import Button from "../../Shared/Button/Button";
import Loader from "../../Shared/Loader/Loader";
import SelectHotel from "./../../Pages/SelectHotel/SelectHotel";
import { useTranslation } from "react-i18next";
import i18next from "i18next";

const SelectHotelSection = () => {
  const {
    baseUrlPms,
    Headers,
    orgId,
    userId,
    isLoading,
    setIsLoading,
    setDisabledBtn,
  } = useContext(AuthContext);
  const [selectedHotel, setSelectedHotel] = useState();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { language } = i18next;

  const getHotels = async () => {
    setIsLoading(true);
    await axios
      .get(`${baseUrlPms}/organization_hotel/all/?organization_id=${orgId}`, {
        headers: Headers,
      })
      .then((res) => {
        setSelectedHotel(res.data);
        console.log(res.data);
      })
      .catch((error) => {})
      .finally(() => setIsLoading(false));
  };

  const [hotelID, setHotelID] = useState();
  const [hotelName, setHotelName] = useState();

  const handleHotelSelection = (hotel) => {
    // console.log("Selected hotel ID:", hotelId);
    setDisabledBtn(false);
    setHotelID(hotel?.hotel_info.id);
    setHotelName(hotel?.hotel_info.pms_hotel_en.hotel_name_en);

    // navigate("/dashboard");
  };

  const SelectHotel = () => {
    localStorage.setItem("Hotel_id", hotelID);
    localStorage.setItem("Hotel_Name", hotelName);
    navigate("/dashboard");
  };
  useEffect(() => {
    getHotels();
  }, []);

  return (
    <>
      <div className="px-wrapper bg-white text-capitalize">
        <div className="container-fluid gx-0">
          <div className="row gx-0">
            <div className="col-12">
              <div className="select-hotel d-flex justify-content-center align-items-center">
                <div className="card w-30 p-4 ">
                  <h3>{t("hotelSelection.selectHotel")}</h3>
                  <div className="hotel-list">
                    {isLoading ? (
                      <Loader />
                    ) : (
                      selectedHotel &&
                      selectedHotel.map((hotel) => (
                        <>
                          <div
                            key={hotel.id}
                            className="hotel p-2 gray-text mt-4 d-flex justify-content-between"
                          >
                            <label
                              htmlFor={
                                hotel?.hotel_info?.pms_hotel_en?.hotel_name_en
                              }
                              className="hotel-icon w-95"
                            >
                              <i className="fa-light fa-hotel" />
                              {language === "ar" ? hotel?.hotel_info?.pms_hotel_ar?.hotel_name_ar :  hotel?.hotel_info?.pms_hotel_en?.hotel_name_en}
                            </label>
                            <input
                              type="radio"
                              className="hotel-radio"
                              name="hotel"
                              id={
                                hotel?.hotel_info?.pms_hotel_en?.hotel_name_en
                              }
                              onChange={() => handleHotelSelection(hotel)}
                            />
                          </div>
                          <div className="separetor mt-2" />
                        </>
                      ))
                    )}
                  </div>
                  {/* <a > */}
                  {/* <button className="px-btn px-blue-btn w-100 mt-5">continue</button> */}
                  <Button text={t("hotelSelection.continue")} onClick={SelectHotel} />
                  {/* </a> */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SelectHotelSection;
