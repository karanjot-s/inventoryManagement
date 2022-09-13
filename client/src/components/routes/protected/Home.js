import axios from "axios";
import React, { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { useUser } from "../../utils/Layout";

const Home = () => {
  const context = useUser();
  const [categories, setCategories] = useState();
  const [products, setProducts] = useState();
  const [refreshState, setRefreshState] = useState(false);
  const url = process.env.API_URL;

  const refreshHome = () => {
    setRefreshState(!refreshState);
  };

  useEffect(() => {
    axios(url + "/product/all", {
      method: "GET",
      responseType: "json",
      headers: { Authorization: `Bearer ${context.token}` },
    })
      .then((res) => {
        setCategories(res.data.category);
        setProducts(res.data.products);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [refreshState]);

  return !(categories && products) ? (
    <p>Loading...</p>
  ) : (
    <Outlet context={{ ...context, categories, products, refreshHome }} />
  );
};

export default Home;
