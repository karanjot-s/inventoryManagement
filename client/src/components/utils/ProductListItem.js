import React from "react";
import { Link } from "react-router-dom";
import Button from "./Button";

const Product = ({ product, category }) => {
  const productLink = `/product/${product._id}`;
  return (
    <div className="shadow-lg border-2 w-64 rounded-lg px-6 py-4 bg-slate-50">
      <ul>
        <li className="text-lg font-bold mb-2">
          <Link to={productLink}>{product.name}</Link>
        </li>
        <li className="bg-slate-400 rounded-full text-white px-4 py-1 w-fit text-sm mb-4">
          <Link to={`/category/${category._id}`}>{category.name}</Link>
        </li>
        <li>{product.detail}</li>
        <Button
          asLink
          to={productLink}
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

export default Product;
