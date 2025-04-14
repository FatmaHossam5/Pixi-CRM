import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../Context/AuthContext";

const useProduct = () => {
  const { baseUrlPms, Headers } = useContext(AuthContext);

  const [items, setItems] = useState();
  const getItems = () => {
    axios
      .get(`${baseUrlPms}/product/all/`, {
        headers: Headers,
      })
      .then((res) => {
        setItems(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    getItems();
  }, []);

  return { items };
};

export default useProduct;
