import React from "react";
import { Form, Input, message } from "antd"; // Import message from antd
import { Button } from "antd";
import { Link } from "react-router-dom";
import Divider from "../../components/Divider";
import { RegisterUser } from "../../apicalls/users";

const rules = [
  {
    required: true,
    message: "required",
  },
];

function Register() {
  const onFinish = async (values) => {
    try {
      const response = await RegisterUser(values);
      if (response.success) {
        message.success(response.message);
      } else {
        throw new Error(response.message);
      }
    } catch (error) {
      message.error(error.message);
    }
  };

  return (
    <div className="h-screen bg-primary flex justify-center items-center">
      <div className="bg-white p-5 rounded w-[450px]">
        <h1 className="text-primary text-2xl">
          ZoomBid - <span className="text-gray-400 text-xl">REGISTER</span>
        </h1>
        <Divider />
        <Form layout="vertical" onFinish={onFinish}>
          <Form.Item label="Name" name="name" rules={rules}>
            <Input placeholder="Name" />
          </Form.Item>
          <Form.Item label="Email" name="email" rules={rules}>
            <Input placeholder="Email" />
          </Form.Item>
          <Form.Item
            label="Password"
            name="password"
            htmlFor="password"
            rules={rules}
          >
            <Input
              id="password"
              type="password"
              placeholder="Password"
            />
          </Form.Item>

          <Form.Item style={{ justifyContent: "center" }}>
            <Button
              type="primary"
              htmlType="submit"
              className="mt-2"
              style={{ width: "100%", height: "45px", backgroundColor: "Pink" }}
            >
              Register
            </Button>
          </Form.Item>

          <div className="mt-5 text-center">
            <span className="text-gray-500">
              Already have an account?{" "}
              <Link to="/login" className="text-primary">
                Login
              </Link>
            </span>
          </div>
        </Form>
      </div>
    </div>
  );
}

export default Register;