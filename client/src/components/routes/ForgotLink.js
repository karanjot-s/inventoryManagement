import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import Button from "../utils/Button";

const ForgotLink = () => {
  const [password, setPassword] = useState("");
  const [cpassword, setCPassword] = useState("");
  const [name, setName] = useState("");
  const [err, setErr] = useState("");
  const [loading, setLoading] = useState(true);
  const [disabled, setDisabled] = useState(false);
  const navigate = useNavigate();
  const { userId, userToken } = useParams();

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      navigate("/");
    }
  });

  useEffect(() => {
    const url = process.env.API_URL + "/verify-token";

    axios({
      url: url,
      method: "POST",
      responseType: "json",
      data: {
        userId,
        token: userToken,
      },
    })
      .then((res) => {
        setName(res.data.name);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const submitHandler = (e) => {
    e.preventDefault();

    if (password !== cpassword) {
      setErr("Passwords do not match");
      return;
    }

    const url = process.env.API_URL + "/reset-pass";
    setDisabled(true);
    axios({
      method: "POST",
      url: url,
      responseType: "json",
      data: {
        userId: userId,
        token: userToken,
        password: password,
      },
    })
      .then((res) => {
        navigate("/login");
      })
      .catch((err) => {
        setErr(err.response.data.error);
      })
      .finally(() => {
        setDisabled(false);
      });
  };

  return loading ? (
    <p>Loading...</p>
  ) : (
    <div className="w-96 mx-auto border-2 border-slate-400 rounded-xl px-10 py-6 mt-20 bg-slate-100">
      <h1 className="text-center font-bold text-3xl text-slate-700 mb-4">
        Reset
      </h1>
      {err && (
        <p className="text-center bg-red-200 py-2 rounded-lg mb-4 border-2 border-red-300 font-medium">
          {err}
        </p>
      )}
      {name ? <p>For - {name}</p> : ""}
      <form
        onSubmit={submitHandler}
        className="flex justify-center flex-col gap-4"
      >
        <div>
          <label htmlFor="password">Enter new Password:</label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="cpassword">Confirm Password</label>
          <input
            id="cpassword"
            type="password"
            value={cpassword}
            onChange={(e) => setCPassword(e.target.value)}
            required
          />
        </div>
        <Button type="submit" disabled={disabled}>
          Reset Password
        </Button>
      </form>
      <p className="text-center mt-4">
        <Link to="/login" className="text-sky-600 underline hover:text-sky-700">
          Login
        </Link>
      </p>
    </div>
  );
};

export default ForgotLink;
