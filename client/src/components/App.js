import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./routes/protected/Home";
import Login from "./routes/Login";
import Logout from "./routes/protected/user/Logout";
import UpdatePass from "./routes/protected/user/UpdatePass";
import NotFound from "./routes/NotFound";
import Layout from "./utils/Layout";
import Signup from "./routes/Signup";
import Update from "./routes/protected/user/Update";
import Forgot from "./routes/Forgot";
import ForgotLink from "./routes/ForgotLink";
import Products from "./routes/protected/product/Products";
import Product from "./routes/protected/product/Product";
import CreateProd from "./routes/protected/product/CreateProd";
import UpdateProd from "./routes/protected/product/UpdateProd";
import Categories from "./routes/protected/categories/Categories";
import CreateCategory from "./routes/protected/categories/CreateCategory";
import Category from "./routes/protected/categories/Category";
import UpdateCat from "./routes/protected/categories/UpdateCategory";
import "../app.css";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="logout" element={<Logout />} />
          <Route path="update-pass" element={<UpdatePass />} />
          <Route path="update" element={<Update />} />
          <Route path="" element={<Home />}>
            <Route index element={<Products />} />
            <Route path="product/new" element={<CreateProd />} />
            <Route path="product/:prodId" element={<Product />} />
            <Route path="product/:prodId/update" element={<UpdateProd />} />
            <Route path="category" element={<Categories />} />
            <Route path="category/new" element={<CreateCategory />} />
            <Route path="category/:catId" element={<Category />} />
            <Route path="category/:catId/update" element={<UpdateCat />} />
          </Route>
        </Route>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/forgot">
          <Route index element={<Forgot />} />
          <Route path=":userId/:userToken" element={<ForgotLink />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
