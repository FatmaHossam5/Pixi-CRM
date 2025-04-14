import axios from 'axios';
import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../Context/AuthContext';

const useBuilding = () => {
    const { baseUrlPms, Headers } = useContext(AuthContext);
    const [selectedBranch, setSelectedBranch] = useState(null);
    const [building, setBuilding] = useState([]);
   
    useEffect(() => {
      
      const fetchBuilding = async () => {
        try {
          if (selectedBranch) {
            const response = await axios.get(
              `${baseUrlPms}/building/all/?branch_id=${selectedBranch}`,
              {
                headers: Headers
              }
            );
            setBuilding(response.data);
          }
        } catch (error) {
          console.error("Error fetching building:", error);
        }
      };
  
      fetchBuilding();
    }, [baseUrlPms, Headers, selectedBranch]);
  
    const handleBranchChange = (event) => {
      setSelectedBranch(event.target.value);
    };
    return { building, handleBranchChange ,selectedBranch};
}

export default useBuilding
