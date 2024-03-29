import React from "react";
import { Link } from "react-router-dom";

const Button = ({ color, colorWeight, asLink, className, ...props }) => {
  if (!color) color = "slate";
  if (!colorWeight) colorWeight = "600";
  const classes = `${className} bg-${color}-${colorWeight} hover:opacity-90 active:opacity-80 disabled:opacity-75 disabled:cursor-not-allowed disabled:hover:opacity-100 disabled:active:opacity-100 disabled:focus:ring-0 focus:outline-none focus:ring focus:ring-${color}-300 text-white px-4 py-2 rounded-lg transition-colors`;
  return asLink ? (
    <Link
      className={`${classes} block ${
        className && className.includes("w-") ? "" : "w-fit"
      } text-center`}
      {...props}
      color="unset"
    />
  ) : (
    <button className={classes} {...props} color="unset" />
  );
};

// Button.defaultProps = { color: "slate" };

export default Button;
