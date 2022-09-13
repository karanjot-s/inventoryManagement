import React from "react";
import { Link } from "react-router-dom";
import Button from "./Button";

const Category = ({ category, number }) => {
  const catLink = `/category/${category._id}`;
  return (
    <div className="shadow-lg border-2 w-64 rounded-lg px-6 py-4 bg-slate-50">
      <ul>
        <li className="text-lg font-bold mb-2">
          <Link to={catLink}>{category.name}</Link>
        </li>
        <li className="bg-slate-400 rounded-full text-white px-4 py-1 w-fit text-sm mb-4">
          Products - {number}
        </li>
        <li>{category.detail}</li>
        <Button
          asLink
          to={catLink}
          color="slate"
          className="mt-4 px-6"
          onClick={() => {
            console.log("h");
          }}
        >
          View
        </Button>
      </ul>
    </div>
  );
};

export default Category;
