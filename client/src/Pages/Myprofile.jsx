import React, { useState, useEffect } from "react";
import { Form, Input, Button, message, Tabs } from "antd";
import { GetCurrentUser, UpdateUser, ChangePassword } from "../apicalls/users";
import { useDispatch } from "react-redux";
import { setLoader } from "../redux/loadersSlice";
import { FaUserCircle } from "react-icons/fa";

const { TabPane } = Tabs;

const rules = [
  {
    required: true,
    message: "Required",
  },
];

const Myprofile = () => {
  const [form] = Form.useForm();
  const [currentUser, setCurrentUser] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchCurrentUser = async () => {
      try {
        dispatch(setLoader(true));
        const response = await GetCurrentUser();
        const userData = response.data;
        dispatch(setLoader(false));
        setCurrentUser(userData);

        form.setFieldsValue({
          name: userData.name,
          email: userData.email,
          password: "",
          confirmPassword: "",
        });
      } catch (error) {
        console.error("Error fetching current user:", error);
      }
    };

    fetchCurrentUser();
  }, [form]);

  const handleProfileSave = async (values) => {
    try {
      dispatch(setLoader(true));
      const { name, email } = values;

      if (currentUser && currentUser._id) {
        dispatch(setLoader(true));

        await UpdateUser(currentUser._id, name, email);

        const updatedUserResponse = await GetCurrentUser();
        const updatedUserData = updatedUserResponse.data;
        message.success("Profile information updated successfully");

        dispatch(setLoader(false));
        setCurrentUser(updatedUserData);

        form.setFieldsValue({
          name: updatedUserData.name,
          email: updatedUserData.email,
        });
      } else {
        throw new Error("User ID is undefined or null.");
      }
    } catch (error) {
      dispatch(setLoader(false));
      message.error(error.message);
    }
  };

  const handlePasswordSave = async (values) => {
    try {
      dispatch(setLoader(true));
      const { password, confirmPassword } = values;

      if (currentUser && currentUser._id) {
        if (password !== confirmPassword) {
          throw new Error("Password and Confirm Password do not match.");
        }
        dispatch(setLoader(true));

        await ChangePassword(currentUser._id, password);

        const updatedUserResponse = await GetCurrentUser();
        const updatedUserData = updatedUserResponse.data;
        message.success("Password updated successfully");

        dispatch(setLoader(false));
        setCurrentUser(updatedUserData);

        form.setFieldsValue({
          password: "",
        });
      } else {
        throw new Error("User ID is undefined or null.");
      }
    } catch (error) {
      dispatch(setLoader(false));
      message.error(error.message);
    }
  };

  return (
    <div className="flex justify-center my-12">
      <div className="w-[400px] border border-[#e0e3e4] rounded-sm px-7 py-10">
        <h1 className="text-3xl font-medium mb-4">Edit profile</h1>
        <div className="flex justify-center my-6">
          <FaUserCircle size={76} className="text-gray-900"/>
        </div>
        <Tabs defaultActiveKey="1">
          <TabPane tab="Profile" key="1">
            <Form layout="vertical" form={form} onFinish={handleProfileSave}>
              <Form.Item
                label="Full Name"
                name="name"
                className="font-semibold"
                rules={rules}
              >
                <Input
                  placeholder="Full Name"
                  className="border rounded-sm py-2"
                />
              </Form.Item>
              <Form.Item
                label="Email"
                name="email"
                className="font-semibold"
                rules={rules}
              >
                <Input placeholder="Email" className="border rounded-sm py-2" />
              </Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                block
                className="mt-2 h-9 rounded bg-[#14ae5c] text-white text-base font-medium active:scale-[.98] active:duration-75 transition-all ease-in-out"
              >
                Save
              </Button>
            </Form>
          </TabPane>

          <TabPane tab="Password" key="2">
            <Form layout="vertical" form={form} onFinish={handlePasswordSave}>
              <Form.Item
                label="Password"
                name="password"
                className="font-semibold"
                rules={rules}
              >
                <Input.Password
                  placeholder="Password"
                  className="border rounded-sm py-2"
                />
              </Form.Item>
              <Form.Item
                label="Confirm Password"
                name="confirmPassword"
                className="font-semibold"
                rules={rules}
              >
                <Input.Password
                  placeholder="Confirm Password"
                  className="border rounded-sm py-2"
                />
              </Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                block
                className="mt-2 h-9 rounded bg-[#14ae5c] text-white text-base font-medium active:scale-[.98] active:duration-75 transition-all ease-in-out"
              >
                Save Password
              </Button>
            </Form>
          </TabPane>
        </Tabs>
      </div>
    </div>
  );
};

export default Myprofile;