import React from "react";
import { Link } from "react-router-dom";
import { Button, Form, Input, message } from "antd";
import { RegisterUser } from "../apicalls/users";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setLoader } from "../redux/loadersSlice";
import Navbar from "../Components/Navbar";

const rules = [
  {
    required: true,
    message: "required",
  },
];

const Signup = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onFinish = async (values) => {
    try {
      dispatch(setLoader(true));
      const response = await RegisterUser(values);
      dispatch(setLoader(false));
      if (response.success) {
        message.success(response.message);
        navigate("/login");
      } else {
        throw new Error(response.message);
      }
    } catch (error) {
      dispatch(setLoader(false));
      message.error(error.message);
    }
  };

  useEffect(() => {
    if (localStorage.getItem("token")) {
      navigate("/");
    }
  }, []);

  return (
    <>
      <Navbar />
      <div className="flex justify-center my-12">
        <div className="w-[400px] border border-[#e0e3e4] rounded-sm px-7 py-10">
          <h1 className="text-3xl font-medium">Create an account</h1>
          <p className="font-medium text-base my-3">
            Enter your details below{" "}
          </p>
          <Form layout="vertical" onFinish={onFinish}>
            <Form.Item
              label="Full Name"
              name="name"
              className="font-semibold"
              rules={rules}
            >
              <Input placeholder="Name" className="border rounded-sm py-2" />
            </Form.Item>
            <Form.Item
              label="Email"
              name="email"
              className="font-semibold"
              rules={rules}
            >
              <Input placeholder="Email" className="border rounded-sm py-2" />
            </Form.Item>
            <Form.Item
              label="Password"
              name="password"
              className="font-semibold"
              rules={rules}
            >
              <Input.Password
                type="password"
                placeholder="Password"
                className="border rounded-sm py-2"
              />
            </Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              block
              className="mt-2 h-9 rounded bg-[#14ae5c] text-white text-base font-medium active:scale-[.98] active:duration-75 transition-all ease-in-out "
            >
              Sign Up
            </Button>

            <div className="mt-4 text-center text-base">
              Already have an account?{" "}
              <Link className="text-[#14ae5c] hover:text-black" to="/login">
                Login
              </Link>
            </div>
          </Form>
        </div>
      </div>
    </>
  );
};

export default Signup;