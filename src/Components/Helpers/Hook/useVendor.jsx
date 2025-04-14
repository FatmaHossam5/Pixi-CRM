import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../Context/AuthContext";

const useVendor = () => {
  const { baseUrlPms, Headers } = useContext(AuthContext);

  const [vendors, setvendors] = useState();
  const getVendors = () => {
    axios
      .get(`${baseUrlPms}/vendor/all/`, {
        headers: Headers,
      })
      .then((res) => {
        setvendors(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    getVendors();
  }, []);

  return { vendors, getVendors };
};

export default useVendor;
