import React from "react";
import { BsFacebook, BsInstagram, BsLinkedin, BsTwitter } from "react-icons/bs";
import playstore from "../Images/Google Play.png";
import appstore from "../Images/App Store.png";
import ZoomBidLogo from "../../src/Images/zoombid-1.png";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <div className="footer-container">
      <div className="contact-section">
        <img src={ZoomBidLogo} alt="ZoomBid logo" className="h-10" />
        <p className="contact contact-text">Got a Question? Call us on</p>
        <p className="contact contact-number">+977-9824074702</p>
        <p className="contact contact-email">info@ZomBid.com</p>
        <p className="contact contact-address">Ratopul, Kathmandu</p>
      </div>

      <div className="company-section">
        <h2 className="font-medium">Company</h2>
        <div className="flex flex-col gap-4 mt-2">
          <Link to="/aboutus">About Us</Link>
          <Link to="/contactus">Contact Us</Link>
          <p>Advertise With Us</p>
        </div>
      </div>

      <div className="categories-section">
        <h2 className="font-medium">Category</h2>
        <div className="flex flex-col gap-4 mt-2">
          <p>Car</p>
          <p>Bike</p>
        </div>
      </div>

      <div className="categories-section">
        <h2 className="font-medium">Follow Us</h2>
        <div className="icons">
          <BsFacebook className="social" size={22} />
          <BsInstagram className="social" size={22} />
          <BsTwitter className="social" size={22} />
          <BsLinkedin className="social" size={22} />
        </div>
      </div>

      <div className="downloadApp-section">
        <h2 className="font-medium">Download App</h2>
        <div className="store-container">
          <div className="storeIcon">
            <img src={playstore} alt="" className="img2" />
            <img src={appstore} alt="" className="img3" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
