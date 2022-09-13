import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../../../utils/Button";
import { useUser } from "../../../utils/Layout";

const CreateCategory = () => {
  const { token, refreshHome } = useUser();
  const [name, setName] = useState("");
  const [detail, setDetail] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const createProd = (e) => {
    e.preventDefault();
    const url = process.env.API_URL + "/category";
    axios({
      url: url,
      method: "POST",
      responseType: "json",
      headers: { Authorization: `Bearer ${token}` },
      data: {
        name,
        detail,
      },
    })
      .then(() => {
        refreshHome();
        navigate("/category");
      })
      .catch((err) => {
        if (err.error) {
          setError(err.error);
        } else {
          setError("Something went wrong");
        }
      });
  };

  return (
    <div className="w-96 mx-auto border-2 border-slate-400 rounded-xl px-10 py-6 mt-20 bg-slate-100">
      {error && (
        <p className="text-center bg-red-200 py-2 rounded-lg mb-4 border-2 border-red-300 font-medium">
          {error}
        </p>
      )}
      <form
        onSubmit={createProd}
        className="flex justify-center flex-col gap-4"
      >
        <div>
          <label className="block text-sm font-medium text-slate-700">
            Category Name:
          </label>
          <input
            className="mt-1 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-slate-500 focus:ring-slate-700 block w-full rounded-md sm:text-sm focus:ring-1"
            value={name}
            placeholder="New Category"
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700">
            Details:
          </label>
          <input
            className="mt-1 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-slate-500 focus:ring-slate-700 block w-full rounded-md sm:text-sm focus:ring-1"
            value={detail}
            placeholder="This is another category"
            onChange={(e) => setDetail(e.target.value)}
          />
        </div>

        <Button type="submit">Create</Button>
      </form>
    </div>
  );
};

export default CreateCategory;
