import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useUser } from "../../../utils/Layout";
import Button from "../../../utils/Button";

const Update = () => {
  const { user, token, refresh } = useUser();
  const [name, setName] = useState(user ? user.name : "");
  const [err, setErr] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const submitHandler = (e) => {
    e.preventDefault();
    const url = process.env.API_URL + "/user/update";
    setLoading(true);
    axios({
      method: "POST",
      url: url,
      responseType: "json",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      data: {
        name: name,
      },
    })
      .then((res) => {
        refresh();
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
          <label className="block text-sm font-medium text-slate-700">
            Your Name:
          </label>
          <input
            className="mt-1 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-slate-500 focus:ring-slate-700 block w-full rounded-md sm:text-sm focus:ring-1"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <Button type="submit" disabled={loading}>
          Update
        </Button>
        <Button asLink to="/" className="w-full opacity-70" color={"slate"}>
          Cancel
        </Button>
      </form>
    </div>
  );
};

export default Update;
