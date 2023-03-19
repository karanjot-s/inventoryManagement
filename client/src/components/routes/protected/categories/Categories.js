import React from "react";
import Category from "../../../utils/CategoryListItem";
import Button from "../../../utils/Button";
import { useUser } from "../../../utils/Layout";

const Categories = () => {
  const { categories, products } = useUser();

  return (
    <>
      <h2 className="text-center text-2xl mb-6">Categories</h2>
      <Button
        className="m-auto mb-5"
        asLink
        to="/category/new"
        colorWeight={"900"}
      >
        New Category
      </Button>
      <div className="flex flex-wrap items-center justify-center gap-4">
        {categories.map((cat, i) => {
          const prods = products.filter((p) => p.category === cat._id && p);
          return <Category key={i} number={prods.length} category={cat} />;
        })}
      </div>
    </>
  );
};

export default Categories;
