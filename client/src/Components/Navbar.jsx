import React from "react";
import { Link, useNavigate } from "react-router-dom";
import ZoomBidLogo from "../../src/images/zoombid-1.png";

const Navbar = () => {
  const navigate = useNavigate();
  return (
    <div className="flex justify-between items-center py-2 my-3">
      <img src={ZoomBidLogo} alt="zoombid logo" className="w-36 cursor-pointer" onClick={() => navigate("/")} />
      <div className="flex gap-6">
        <Link to="/login" className="text-lg">Login</Link>
        <Link to="/signup" className="text-lg">Signup</Link>
      </div>
    </div>
  );
};

export default Navbar;