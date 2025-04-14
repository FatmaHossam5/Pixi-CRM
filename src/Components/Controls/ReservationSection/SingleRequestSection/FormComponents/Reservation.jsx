import { useContext, useEffect, useState } from "react";
import Flatpickr from "react-flatpickr";
import "flatpickr/dist/themes/material_blue.css";
import axios from "axios";
import { AuthContext } from "../../../../Helpers/Context/AuthContext";
import { Controller } from "react-hook-form";

const Reservation = ({
  id,
  rSections,
  setRSections,
  register,
  error,
  setEndDate,
  setStartDate,
  nightCount,
  addRSection,
  // control,
  // errors,
}) => {
  const { baseUrlPms, Headers } = useContext(AuthContext);

  const [accommodation, setAccommodation] = useState([]);
  const [isCheck, setIsCheck] = useState(false);
  const currentTime = new Date().toLocaleTimeString();

  const getAccommodation = () => {
    axios
      .get(`${baseUrlPms}/accommodation_type/all/`, {
        headers: Headers,
      })
      .then((res) => {
        setAccommodation(res.data);
      })
      .catch((error) => {});
  };

  // Rooms Types API
  const [roomType, setRoomType] = useState();
  const getRoomsType = () => {
    axios
      .get(`${baseUrlPms}/room_type/all/`, {
        headers: Headers,
      })
      .then((res) => {
        setRoomType(res.data);
      })
      .catch((error) => {});
  };

  // Rooms Views API
  const [roomView, setRoomView] = useState();
  const getRoomsView = () => {
    axios
      .get(`${baseUrlPms}/view_type/all/`, {
        headers: Headers,
      })
      .then((res) => {
        setRoomView(res.data);
      })
      .catch((error) => {});
  };

  const [roomTypeId, setRoomTypeId] = useState("");
  const [roomViewId, setRoomViewId] = useState("");

  const [room, setRoom] = useState();
  const getRooms = () => {
    if (roomTypeId || roomViewId) {
      axios
        .get(
          `${baseUrlPms}/room/all/?room_type_id=${roomTypeId}&view_type_id=${roomViewId}`,
          {
            headers: Headers,
          }
        )
        .then((res) => {
          setRoom(res.data);
        })
        .catch((error) => {});
    }
  };

  useEffect(() => {
    getAccommodation();
    getRoomsType();
    getRoomsView();
    // getRooms();
  }, []);

  // calling room number
  useEffect(() => {
    getRooms();
  }, [roomTypeId, roomViewId, baseUrlPms, Headers]);

  //   const removeSection = () => {
  //     setRSections((elementID) => elementID.filter((x) => x.id !== id));
  //   };
  return (
    <>
      <div className="reservation-section">
        <div className="form-inputs d-flex align-items-end justify-content-between w-100">
          <div className="input-package mt-4  d-flex flex-column w-25 ">
            <label className htmlFor>
              from
            </label>
            <div className="px-calendar w-100">
              <Flatpickr
                id="datePicker"
                className="px-form-input w-100"
                placeholder="YY/MM/DD"
                dateFormat="Y-m-d"
                onChange={(e) => {
                  if (e.length > 0) {
                    setStartDate(e[0]);
                  }
                }}
              />
              <i className="fa-regular fa-calendar-days fa-xl px-calendar-icon" />
            </div>
          </div>
          <div className="input-package mt-3  d-flex flex-column w-15">
            {/* <Controller
              name="reservation_night_count"
              control={control}
              rules={{ validate: (value) => value > 0 }}
              render={({ field }) => (
                <input
                  className={`px-login-input ${nightCount < 0 ? "text-danger" : "" } `}
                  {...field}
                  type="number"
                  placeholder="Night Count"
                  value={nightCount}
                  disabled
                />
              )}
            />
           */}
            <input
              disabled
              type="number"
              className={`px-login-input ${nightCount < 0 ? "text-danger" : "" } `}
              // defaultValue="Night Count: 5"
              placeholder="Night Count"
              value={nightCount}
            />
          </div>

          <div className="input-package mt-4  d-flex flex-column w-25 ">
            <label className htmlFor>
              to
            </label>
            <div className="px-calendar w-100">
              <Flatpickr
                id="datePicker"
                className="px-form-input w-100"
                placeholder="YY/MM/DD"
                onChange={(e) => setEndDate(e[0])}
              />
              <i className="fa-regular fa-calendar-days fa-xl px-calendar-icon" />
            </div>
          </div>
          <div className="input-package mt-4  d-flex flex-column w-25 ">
            <label className htmlFor>
              meal plan
            </label>
            <select
              name
              id
              className="px-login-input"
              {...register("accommodation_type_id")}
            >
              <option value="">Select</option>
              {accommodation &&
                accommodation?.map((item) => (
                  <option value={item.id} key={item.id}>
                    {item?.pms_accommodation_type_en.accommodation_type_name_en}
                  </option>
                ))}
            </select>
          </div>
        </div>
        {nightCount < 0 && <p className="text-danger m-0">positive only</p>}
        <div className="form-inputs  container-fluid  gx-0">
          <div className="row ">
            <div className="col-4">
              <div className="input-package mt-4">
                <label className="w-100" htmlFor>
                  room type
                </label>
                <select
                  type="text"
                  className="px-login-input w-100 "
                  onChange={(e) => setRoomTypeId(e.target.value)}
                >
                  <option value="">select room type</option>
                  {roomType &&
                    roomType?.map((room) => {
                      return (
                        <option key={room.id} value={room.id}>
                          {room.pms_room_type_en.room_type_name_en}
                        </option>
                      );
                    })}
                </select>
              </div>
            </div>
            <div className="col-4">
              <div className="input-package mt-4">
                <label className="w-100" htmlFor>
                  room view
                </label>
                <select
                  type="text"
                  className="px-login-input w-100 "
                  onChange={(e) => setRoomViewId(e.target.value)}
                >
                  <option value="">select room view</option>
                  {roomView &&
                    roomView?.map((room) => {
                      return (
                        <option key={room.id} value={room.id}>
                          {room.pms_view_type_en.view_type_name_en}
                        </option>
                      );
                    })}
                </select>
              </div>
            </div>
            <div className="col-4">
              <div className="input-package mt-4">
                <label className="w-100" htmlFor>
                  room number
                </label>
                <select
                  type="text"
                  className="px-login-input w-100 "
                  {...register("room_id", { required: true })}
                >
                  <option value="">select room</option>

                  {room &&
                    room?.map((roomItem) => {
                      return (
                        <option key={roomItem.id} value={roomItem?.id}>
                          {roomItem?.pms_room_en?.room_name_en}
                        </option>
                      );
                    })}
                </select>
              </div>
            </div>
          </div>
        </div>
        <div className="w-100 text-primary mt-5 d-flex ">
          <div className="check-in">
            <input
              id="remember-me"
              className="me-2"
              type="checkbox"
              {...register("is_check_in")}
              onChange={() => setIsCheck(!isCheck)}
            />
            <label htmlFor="remember-me">check in </label>
            <div className="check-in-time">
              {isCheck ? `check in hour ${currentTime}` : ""}
            </div>
          </div>
          <div className="actions-btn ms-auto">
            <button className="px-btn px-white-btn" type="button">
              Duplicate
            </button>
            <button
              className="px-btn px-blue-btn ms-3"
              type="button"
              onClick={addRSection}
            >
              add room
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Reservation;
