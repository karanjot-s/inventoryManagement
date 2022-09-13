import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Button from "../../../utils/Button";
import { useUser } from "../../../utils/Layout";
const url = process.env.API_URL;

const Product = () => {
  const { prodId } = useParams();
  const { token, categories, products } = useUser();
  const [category, setCategory] = useState();
  const [product, setProduct] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    const prod = products.find((p) => p._id == prodId && p);
    setProduct(prod);
  }, [categories]);

  useEffect(() => {
    if (!product) return;
    const cat = categories.find((c) => c._id == product.category && c);
    setCategory(cat);
  }, [product, categories]);

  const handleDelete = () => {
    if (window.confirm("Are you sure you want to delete " + product.name)) {
      deleteProd();
    }
  };

  const deleteProd = () => {
    axios({
      url: url + "/product/" + prodId,
      method: "DELETE",
      responseType: "json",
      headers: { Authorization: `Bearer ${token}` },
    }).then(() => {
      navigate("/");
    });
  };

  return (
    product &&
    category && (
      <div>
        <h2 className="text-center text-2xl font-bold">{product.name}</h2>
        <h4 className="text-center">{product.detail}</h4>
        <Link
          className="bg-slate-400 rounded-full text-white px-4 py-1 w-fit text-sm mb-4 block mt-4 m-auto"
          to={`/category/${product.category}`}
        >
          {category.name}
        </Link>
        <div className="flex justify-center items-center gap-2">
          <Button asLink to={`/product/${prodId}/update`}>
            Update
          </Button>
          <Button onClick={handleDelete} className="bg-red-600">
            Delete
          </Button>
        </div>
      </div>
    )
  );
};

export default Product;
