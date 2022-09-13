import React, { useEffect, useState } from "react";
import { Outlet, useNavigate, useOutletContext } from "react-router-dom";
import axios from "axios";
import Navbar from "./Navbar";

const Layout = () => {
  const [user, setUser] = useState();
  const [token, setToken] = useState();
  const navigate = useNavigate();
  const [refreshState, setRefreshState] = useState(true);

  const refresh = () => {
    setRefreshState(!refreshState);
  };

  useEffect(() => {
    const tkn = localStorage.getItem("accessToken");
    const url = process.env.API_URL + "/check-token/" + tkn;

    if (!tkn) navigate("/login");

    loadUser(url, tkn);
  }, [refreshState]);

  const loadUser = async (url, tkn) => {
    try {
      const res = await axios({
        method: "GET",
        url: url,
        responseType: "json",
      });
      setUser(res.data.user);
      setToken(tkn);
    } catch (err) {
      console.log(err);
      localStorage.removeItem("accessToken");
      navigate("/login");
    }
  };

  return !user ? (
    <p>Loading...</p>
  ) : (
    <>
      <Navbar userName={user.name} />
      <Outlet
        context={{
          user: user,
          token: token,
          refresh: refresh,
        }}
      />
    </>
  );
};

export const useUser = () => useOutletContext();
export default Layout;
