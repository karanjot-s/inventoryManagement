import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Button from "../utils/Button";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [cpassword, setCpassword] = useState("");
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

    if (password != cpassword) {
      setErr("Passwords do not match!");
      return;
    }

    const url = process.env.API_URL + "/signup";
    setLoading(true);
    axios({
      method: "POST",
      url: url,
      responseType: "json",
      data: {
        name: name,
        email: email,
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
        setLoading(false);
      });
  };

  return (
    <div className="w-96 mx-auto border-2 border-slate-400 rounded-xl px-10 py-6 mt-20 bg-slate-100">
      <h1 className="text-center font-bold text-3xl text-slate-700 mb-4">
        Signup
      </h1>
      {err && (
        <p className="text-center bg-red-200 py-2 rounded-lg mb-4 border-2 border-red-300 font-medium">
          {err}
        </p>
      )}
      <form
        className="flex justify-center flex-col gap-4"
        onSubmit={submitHandler}
      >
        <div>
          <label
            htmlFor="name"
            className="block text-sm font-medium text-slate-700"
          >
            Name:
          </label>
          <input
            className="mt-1 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-slate-500 focus:ring-slate-700 block w-full rounded-md sm:text-sm focus:ring-1"
            id="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="John Doe"
            required
          />
        </div>
        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-slate-700"
          >
            Email:
          </label>
          <input
            className="mt-1 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-slate-500 focus:ring-slate-700 block w-full rounded-md sm:text-sm focus:ring-1"
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="johndoe@example.com"
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
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="password123"
            required
          />
        </div>
        <div>
          <label
            htmlFor="cpassword"
            className="block text-sm font-medium text-slate-700"
          >
            Confirm Password:
          </label>
          <input
            className="mt-1 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-slate-500 focus:ring-slate-700 block w-full rounded-md sm:text-sm focus:ring-1"
            id="cpassword"
            type="password"
            value={cpassword}
            onChange={(e) => setCpassword(e.target.value)}
            placeholder="password123"
            required
          />
        </div>
        <Button type="submit" disabled={loading}>
          Signup
        </Button>
      </form>
      <p className="text-center mt-4">
        Already a User?{" "}
        <Link className="text-sky-600 underline hover:text-sky-700" to="/login">
          Login now
        </Link>
      </p>
    </div>
  );
};

export default Signup;
