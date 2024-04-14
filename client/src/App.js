import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Footer from "./Components/Footer";
import Signup from "./Pages/Signup";
import Login from "./Pages/Login";
import ProtectedPage from "./Components/ProtectedPage";
import Spinner from "./Components/Spinner";
import { useSelector } from "react-redux";
import SellerDashboard from "./Pages/SellerDashboard/SellerDashboard";
import Admin from "./Pages/Admin";
import ProductInfo from "./Pages/ProductInfo";
import Home from "./Pages/Home/Home";
import ForgotPassword from "./Pages/ForgetPassword";
import OTPVerification from "./Pages/OTPVerification";
import Myprofile from "./Pages/Myprofile";
import AboutUs from "./Pages/AboutUs";
import ContactUs from "./Pages/ContactUs";

const App = () => {
  const { loading } = useSelector((state) => state.loaders);

  return (
    <Router>
      <div>
        {loading && <Spinner />}
        <section>
          <Routes>
            <Route
              path="/"
              element={
                <ProtectedPage>
                  <Home />
                </ProtectedPage>
              }
            />
            <Route
              path="/product/:id"
              element={
                <ProtectedPage>
                  <ProductInfo />
                </ProtectedPage>
              }
            />
            <Route
              path="/SellerDashboard"
              element={
                <ProtectedPage>
                  <SellerDashboard />
                </ProtectedPage>
              }
            />
            <Route
              path="/admin"
              element={
                <ProtectedPage>
                  <Admin />
                </ProtectedPage>
              }
            />
            <Route
              path="/myprofile"
              element={
                <ProtectedPage>
                  <Myprofile />
                </ProtectedPage>
              }
            />
            {/* Other routes */}
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/forgotpassword" element={<ForgotPassword />} />
            <Route path="/otpverification" element={<OTPVerification />} />
            <Route path="/aboutus" element={<AboutUs />} />
            <Route path="/contactus" element={<ContactUs />} />
          </Routes>
        </section>
        <Footer />
      </div>
    </Router>
  );
};

export default App;
