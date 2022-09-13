import React, { useState } from "react";
import { Link } from "react-router-dom";

const Navbar = ({ userName }) => {
  const [showProfile, setShowProfile] = useState(false);

  return (
    <nav className="flex w-full justify-between items-center px-8 py-4 border-b-2 mb-4">
      <Link to="/">
        <h1 className="text-primary text-4xl font-bold">Inventory</h1>
      </Link>
      <ul className="flex gap-2 items-center">
        <li>
          <Link className="hover:bg-slate-200 p-2 rounded-lg transition" to="/">
            Products
          </Link>
        </li>
        <li>
          <Link
            className="hover:bg-slate-200 p-2 rounded-lg transition"
            to="/category"
          >
            Categories
          </Link>
        </li>
        <li className="relative">
          <button
            className="hover:bg-slate-200 p-2 rounded-lg transition"
            onClick={() => setShowProfile(!showProfile)}
          >
            Profile
          </button>
          <ul
            className={`${
              showProfile ? "flex" : "hidden"
            } absolute top-full right-0 bg-slate-100 border border-slate-300 py-2 rounded-lg w-max flex flex-col`}
            style={{ top: "110%" }}
          >
            <h4 className="text-center font-bold border-b-2 pb-2 border-slate-300">
              {userName}
            </h4>
            <li className="w-full">
              <Link
                to="/update"
                className="hover:bg-slate-200 block px-6 py-1 transition-colors"
                onClick={() => {
                  setShowProfile(false);
                }}
              >
                Update Name
              </Link>
            </li>
            <li className="w-full">
              <Link
                to="/update-pass"
                className="hover:bg-slate-200 block px-6 py-1 transition-colors"
                onClick={() => {
                  setShowProfile(false);
                }}
              >
                Update Password
              </Link>
            </li>
            <li className="w-full">
              <Link
                to="/logout"
                className="hover:bg-slate-200 block px-6 py-1 transition-colors"
                onClick={() => {
                  setShowProfile(false);
                }}
              >
                Logout
              </Link>
            </li>
          </ul>
        </li>
      </ul>
      <script src="https://unpkg.com/@themesberg/flowbite@latest/dist/flowbite.bundle.js"></script>
    </nav>
  );
};

export default Navbar;
