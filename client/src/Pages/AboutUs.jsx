import React from "react";
import ProtectedPage from "../Components/ProtectedPage";
import Navbar from "../Components/Navbar";
import aboutimg from "../Images/aboutpage.jpg";

const AboutUs = () => {
  return (
    <div>
      {localStorage.getItem("token") ? <ProtectedPage /> : <Navbar />}
      <div className="flex gap-4 mt-4">
        <div className="w-1/2  border-gray-400 rounded-lg p-6 bg-[#fafafa]">
          <h1 className="text-4xl font-bold mb-2 leading-tight">
            Our story<br></br> begins with{" "}
            <span className="text-4xl font-bold text-[#14ae5c]">you</span>
          </h1>
          <p className="text-justify">
            Zinbech is all about you - Our 
          </p>
        </div>
        <div className="w-1/2 flex justify-end">
          <img
            src={aboutimg}
            alt="About us image"
            className="w-10/12 rounded-lg"
          />
        </div>
      </div>
      <div className="gap-4 mt-6 border-gray-400 rounded-lg p-6 bg-[#fafafa]">
        <h1 className="font-bold mb-3 text-xl">
          Frequently Asked Questions (FAQs)
        </h1>
        <h1 className="font-semibold">
          1. What Benefits do I get as a member?
        </h1>
        <div className="mt-2">
          <li>24/7 marketplace for your products and services.</li>
          <li>
            Online catalog for your product reaching to consumer effectively.
          </li>
          <li>
            Your own control panel. From where you have total control over ads.
          </li>
          <li>
            Add, edit & delete your ads immediately with minimum time and
            effort.
          </li>
          <li>
            Add, edit & delete your ads immediately with minimum time and
            effort.
          </li>
          <li>
            View ad traffic and hits to know how your products affect the
            customers.
          </li>
          <li>
            Upload image for your ad to provide visual information for your ads.
          </li>
          <li>
            Bidding feature where buyers and sellers can openly negotiate prices
            before finalizing a deal.
          </li>
        </div>
        <h1 className="font-semibold mt-3">
          2. How can I register in the site?
        </h1>
        <div className="mt-2 w-3/4 text-justify">
          If you want to sell and buy your product then you just have to
          register as member at ZoomBid  first. Just click on Signup at top of
          the website to get started. Fill in your contact details mentioned in
          online registration form and submit.
        </div>
        <h1 className="font-semibold mt-3">
          {" "}
          3. How do I post an ad for my product or services in the site?
        </h1>
        <div className="mt-2 w-3/4 text-justify">
          Once you have registered an account, then you just have to login to
          the site. Once logged in, go to 'My Listings Page' button in Menu.Then
          click Add Product button which opens Product form. Then fill up the
          form with description, price of your product and other required fields
          and click on save button.
        </div>
        <h1 className="font-semibold mt-3">
          {" "}
         4. Can I change the details of product later?
        </h1>
        <div className="mt-2 w-3/4 text-justify">
          Yes. You can change the details of your products later whenever you
          require it. Just login to your account and click on 'My Listings'
          option from the menu. You will see list of all the ads you have posted
          in the site. From there you can edit your ad, change/upload your
          product picture or delete.
        </div>
        <h1 className="font-semibold mt-3">
          {" "}
          5. Can I change my personal information and password later?
        </h1>
        <div className="mt-2 w-3/4 text-justify">
          Yes. You can change your personal information whenever you want. You
          need to login to your account and click on 'My Profile' which is
          revaled after hovering in your name.Now you can update your profile
          details and password.
        </div>
      </div>
    </div>
  );
};

export default AboutUs;