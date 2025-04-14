import axios from 'axios';
import { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../Context/AuthContext';

const useFloor = () => {

      const { baseUrlPms, Headers, userId } = useContext(AuthContext);
  const [selectedBuilding, setSelectedBuilding] = useState(null);
  const [floor, setFloor] = useState([]);

  useEffect(() => {
    const fetchFloor = async () => {
      try {
        if (selectedBuilding) {
          const response = await axios.get(
            `${baseUrlPms}/floor/all/?building_id=${selectedBuilding}`,
            {
              headers: Headers,
            }
          );
          setFloor(response.data);
        }
      } catch (error) {
        console.error("Error fetching floor:", error);
      }
    };

    fetchFloor();
  }, [baseUrlPms, Headers, selectedBuilding]);

  const handleFloorChange = (event) => {
    setSelectedBuilding(event.target.value);
  };
  return { floor, handleFloorChange,selectedBuilding };

}

export default useFloor
