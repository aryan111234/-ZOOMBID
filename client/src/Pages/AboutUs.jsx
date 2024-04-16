import React from "react";
import ProtectedPage from "../Components/ProtectedPage";
import Navbar from "../Components/Navbar";
import aboutimg from "../Images/aboutpage.jpg";

const AboutUs = () => {
  return (
    <div className="container mx-auto px-4">
      {localStorage.getItem("token") ? <ProtectedPage /> : <Navbar />}
      <div className="flex flex-col items-center gap-4 mt-4">
        <div className="w-full lg:w-1/2 border-gray-400 rounded-lg p-6 bg-[#fafafa]">
          <h1 className="text-4xl font-bold mb-2 leading-tight">
            Our story<br></br> begins with{" "}
            <span className="text-4xl font-bold text-[#14ae5c]">you</span>
          </h1>
          <p className="text-justify">
            ZoomBid is all about your satisfaction.
          </p>
        </div>
        <div className="w-full lg:w-1/2 flex justify-center">
          <img
            src={aboutimg}
            alt="About us image"
            className="w-10/12 rounded-lg"
          />
        </div>
      </div>
      <div className="gap-4 mt-6 w-full lg:w-1/2 border-gray-400 rounded-lg p-6 bg-[#fafafa]">
        <h1 className="font-bold mb-3 text-xl">
          Frequently Asked Questions (FAQs)
        </h1>
        <h1 className="font-semibold">
          1. What Benefits do I get as a member?
        </h1>
        <div className="mt-2">
          <ul>
            <li>24/7 marketplace for your products and services.</li>
            <li>
              Online catalog for your product reaching to consumer effectively.
            </li>
            <li>
              Your own control panel. From where you have total control over
              ads.
            </li>
            <li>
              Add, edit & delete your ads immediately with minimum time and
              effort.
            </li>
            <li>View ad traffic and hits to know customer interest.</li>
            <li>
              Upload image for your ad to provide visual information for your
              ads.
            </li>
            <li>
              Bidding feature where buyers and sellers can negotiate prices
              openly.
            </li>
          </ul>
        </div>
        <h1 className="font-semibold mt-3">
          2. How can I register on the site?
        </h1>
        <div className="mt-2 w-full text-justify">
          If you want to sell and buy your product, register as a member at
          ZoomBid by clicking on Signup at the top of the website. Fill in your
          contact details in the online registration form and submit.
        </div>
        <h1 className="font-semibold mt-3">
          3. How do I post an ad for my product or services?
        </h1>
        <div className="mt-2 w-full text-justify">
          After registering an account, login to the site. Go to 'My Listings
          Page' in the Menu, then click 'Add Product' to open the product form.
          Fill out the form with description, price, and other required fields,
          then click 'Save'.
        </div>
        <h1 className="font-semibold mt-3">
          4. Can I change the details of my product later?
        </h1>
        <div className="mt-2 w-full text-justify">
          Yes, login to your account and click 'My Listings' from the menu. Edit
          your ad, change/upload the product picture, or delete as needed.
        </div>
        <h1 className="font-semibold mt-3">
          5. Can I change my personal information and password later?
        </h1>
        <div className="mt-2 w-full text-justify">
          Yes, login to your account, hover over your name to reveal 'My
          Profile', then update your details and password.
        </div>
      </div>
    </div>
  );
};

export default AboutUs;

