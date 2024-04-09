import React, { useState } from "react";
import Navbar from "../Components/Navbar";
import { Link, useNavigate } from "react-router-dom";
import { Form, Input, Button, message } from "antd";
import { verifyOTP } from "../apicalls/users"; 
import { useDispatch } from "react-redux";
import { setLoader } from "../redux/loadersSlice";

const ForgotPassword = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [email, setEmail] = useState(""); // State for email input
  const [otp, setOTP] = useState(""); // State for OTP input
  const [newPassword, setNewPassword] = useState(""); // State for new password input

  const onFinish = async () => {
    try {
      dispatch(setLoader(true));
      const response = await verifyOTP({ email, otp, newPassword });
      dispatch(setLoader(false));
      if (response.success) {
        message.success(response.message);
        navigate("/login"); // Navigate to login page after successful password reset
      } else {
        throw new Error(response.message);
      }
    } catch (error) {
      dispatch(setLoader(false));
      message.error(error.message);
    }
  };

  const rules = [{ required: true, message: "This field is required" }];

  return (
    <div>
      <Navbar />
      <div className="flex justify-center my-12">
        <div className="w-[400px] border border-[#e0e3e4] rounded-sm px-7 py-10">
          <h1 className="text-3xl font-medium">OTP Verification</h1>
          <p className="font-medium text-base my-3">
            Enter the 6-digit verification code sent to your email.
          </p>
          <Form layout="vertical" onFinish={onFinish}>
            <Form.Item
              label="Email"
              name="email"
              className="font-semibold"
              rules={rules}
            >
              <Input
                placeholder="Email"
                className="border rounded-sm py-2"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </Form.Item>
            <Form.Item
              label="OTP"
              name="otp"
              className="font-semibold"
              rules={rules}
            >
              <Input
                placeholder="OTP"
                className="border rounded-sm py-2"
                value={otp}
                onChange={(e) => setOTP(e.target.value)}
              />
            </Form.Item>
            <Form.Item
              label="New Password"
              name="newPassword"
              className="font-semibold"
              rules={rules}
            >
              <Input.Password
                placeholder="New Password"
                className="border rounded-sm py-2"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />
            </Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              block
              className="mt-2 h-9 rounded bg-[#14ae5c] text-white text-base font-medium active:scale-[.98] active:duration-75 transition-all ease-in-out "
            >
              Reset Password
            </Button>

            <div className="mt-4 text-center text-base">
              <Link className="text-[#14ae5c] hover:text-black" to="/login">
                Back to Login
              </Link>
            </div>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;