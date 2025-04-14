import axios from "axios";
import  { useContext, useEffect, useState } from "react";
import { AuthContext } from "../Context/AuthContext";

const useHotel = () => {
  const { baseUrlPms, Headers ,orgId } = useContext(AuthContext);

  const [hotels, setHotels] = useState([]);
  // const [hotelId, setHotelId] = useState();
  const [selectedHotelId, setSelectedHotelId] = useState(null);


  const getHotels = () => {
    axios
      .get(`${baseUrlPms}/organization_hotel/all/?organization_id=${orgId}`, {
        headers: Headers,
      })
      .then((res) => {
        setHotels(res.data);
           })
      .catch((error) => {
       
      });
  };

  useEffect(() => {
    getHotels();
  }, []);

  return { hotels };
};


export default useHotel;
