import React, { useState, useEffect } from "react";
import Button from "../../../utils/Button";
import { useUser } from "../../../utils/Layout";
import Product from "../../../utils/ProductListItem";

const Products = () => {
  const { categories, products } = useUser();

  return (
    <>
      <h2 className="text-center text-2xl mb-6">Products</h2>
      <Button className="m-auto mb-5 bg-slate-900" asLink to="/product/new">
        New Product
      </Button>
      <div className="flex flex-wrap items-center justify-center gap-4">
        {products.map((prod, i) => {
          const cat = categories.find((c) => c._id == prod.category && c);
          return <Product key={i} product={prod} category={cat} />;
        })}
      </div>
    </>
  );
};

export default Products;
