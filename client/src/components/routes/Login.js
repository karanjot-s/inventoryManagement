import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Button from "../utils/Button";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      navigate("/");
    }
  });

  const submitHandler = (e) => {
    e.preventDefault();
    const url = process.env.API_URL + "/signin";
    setLoading(true);
    axios({
      method: "POST",
      url: url,
      responseType: "json",
      data: {
        email: email,
        password: password,
      },
    })
      .then((res) => {
        localStorage.setItem("accessToken", res.data.token);
        navigate("/");
      })
      .catch((err) => {
        setErr(err.response.data.error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <div className="w-96 mx-auto border-2 border-slate-400 rounded-xl px-10 py-6 mt-20 bg-slate-100">
      <h1 className="text-center font-bold text-3xl text-slate-700 mb-4">
        Login
      </h1>
      {err && (
        <p className="text-center bg-red-200 py-2 rounded-lg mb-4 border-2 border-red-300 font-medium">
          {err}
        </p>
      )}
      <form
        onSubmit={submitHandler}
        className="flex justify-center flex-col gap-4"
      >
        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-slate-700"
          >
            Email:
          </label>
          <input
            className="mt-1 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-slate-500 focus:ring-slate-700 block w-full rounded-md sm:text-sm focus:ring-1"
            type="email"
            id="email"
            value={email}
            placeholder="johndoe@example.com"
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label
            htmlFor="password"
            className="block text-sm font-medium text-slate-700"
          >
            Password:
          </label>
          <input
            className="mt-1 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-slate-500 focus:ring-slate-700 block w-full rounded-md sm:text-sm focus:ring-1"
            type="password"
            id="password"
            placeholder="password123"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <p className="text-end -mt-4">
          <Link
            to="/forgot"
            className="text-sky-600 underline hover:text-sky-700"
          >
            Forgot password?
          </Link>
        </p>
        <Button type="submit" disabled={loading}>
          Login
        </Button>
      </form>
      <p className="text-center mt-4">
        New User?{" "}
        <Link
          to="/signup"
          className="text-sky-600 underline hover:text-sky-700"
        >
          Sign up now
        </Link>
      </p>
    </div>
  );
};

export default Login;
