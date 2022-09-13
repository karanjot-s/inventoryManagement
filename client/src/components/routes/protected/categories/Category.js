import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Button from "../../../utils/Button";
import { useUser } from "../../../utils/Layout";
import Product from "../../../utils/ProductListItem";
const url = process.env.API_URL;

const Category = () => {
  const { catId } = useParams();
  const { token, categories, products, refreshHome } = useUser();
  const [category, setCategory] = useState();
  const [product, setProducts] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    const cat = categories.find((c) => c._id == catId && c);
    setCategory(cat);
  }, [categories]);

  useEffect(() => {
    if (!categories) return;
    const prods = products.filter((p) => p.category == catId && p);
    setProducts(prods);
  }, [category, products]);

  const handleDelete = () => {
    if (window.confirm("Are you sure you want to delete " + category.name)) {
      deleteProd();
    }
  };

  const deleteProd = () => {
    axios({
      url: url + "/category/" + catId,
      method: "DELETE",
      responseType: "json",
      headers: { Authorization: `Bearer ${token}` },
    }).then(() => {
      refreshHome();
      navigate("/category");
    });
  };

  return (
    category && (
      <div>
        <h2 className="text-center text-2xl font-bold">{category.name}</h2>
        <p className="text-center">{category.detail}</p>
        <div className="flex justify-center items-center gap-2 mt-2">
          <Button asLink to={`/category/${catId}/update`}>
            Update
          </Button>
          <Button onClick={handleDelete} className="bg-red-600">
            Delete
          </Button>
        </div>
        <p className="text-center mt-4 mb-2 text-xl">Products</p>
        <div className="flex flex-wrap items-center justify-center gap-4">
          {product.map((prod, ind) => (
            <Product key={ind} product={prod} category={category} />
          ))}
        </div>
      </div>
    )
  );
};

export default Category;
