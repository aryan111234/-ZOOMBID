import React, { useState, useEffect } from "react";
import { Avatar, Badge, Dropdown, Menu, message, Button } from "antd";
import { useNavigate } from "react-router-dom";
import { GetCurrentUser } from "../apicalls/users";
// import { AiOutlineMenu } from "react-icons/ai";
import { BiUser } from "react-icons/bi";
import { RiArrowDropDownLine } from "react-icons/ri";
import { MdOutlineLogout } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { setLoader } from "../redux/loadersSlice";
import { SetUser } from "../redux/usersSlice";
import { IoMdNotificationsOutline } from "react-icons/io";
import Notifications from "./Notifications";
import {
  GetAllNotifications,
  ReadAllNotifications,
} from "../apicalls/notifications";
import ZoomBidLogo from "../../src/Images/zoombid-1.png";

//UserProfileButton component
const UserProfileButton = ({ user }) => {
  const navigate = useNavigate();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/Login");
  };
  const navigateProfile = () => {
    navigate("/myprofile");
  };

  const menu = (
    <Menu>
      <Menu.Item
        key="1"
        icon={<BiUser size={18} />}
        onClick={() => {
          navigateProfile();
        }}
      >
        My profile
      </Menu.Item>
      <Menu.Item
        key="2"
        icon={<MdOutlineLogout size={18} />}
        onClick={() => {
          handleLogout();
        }}
      >
        Logout
      </Menu.Item>
    </Menu>
  );

  return (
    <Dropdown
      overlay={menu}
      visible={isDropdownOpen}
      onVisibleChange={(visible) => setIsDropdownOpen(visible)}
    >
      <div className="relative z-10">
        <div className="bg-white py-2 px-3 rounded flex items-center gap-1 cursor-pointer">
          <BiUser size={18} />
          <span>{user.name}</span>
          <RiArrowDropDownLine size={22} />
        </div>
      </div>
    </Dropdown>
  );
};

const ProtectedPage = ({ children }) => {
  const [notifications = [], setNotifications] = useState([]);
  const [showNotifications, setShowNotifications] = useState(false);
  const { user } = useSelector((state) => state.users);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const validateToken = async () => {
    try {
      dispatch(setLoader(true));
      const response = await GetCurrentUser();
      dispatch(setLoader(false));
      if (response.success) {
        dispatch(SetUser(response.data));
      } else {
        navigate("/Login");
        message.error(response.message);
      }
    } catch (error) {
      dispatch(setLoader(false));
      navigate("/Login");
      message.error(error.message);
    }
  };

  const getNotifications = async () => {
    try {
      const response = await GetAllNotifications();
      if (response.success) {
        setNotifications(response.data);
      } else {
        throw new Error(response.message);
      }
    } catch (error) {
      message.error(error.message);
    }
  };

  const readNotifications = async () => {
    try {
      const response = await ReadAllNotifications();
      if (response.success) {
        getNotifications();
      } else {
        throw new Error(response.message);
      }
    } catch (error) {
      message.error(error.message);
    }
  };

  useEffect(() => {
    if (localStorage.getItem("token")) {
      validateToken();
      getNotifications();
    } else {
      navigate("/Login");
    }
  }, []);

  return (
    user && (
      <div>
        {/* Header */}
        <div className="flex justify-between items-center py-2 my-3">
          <img
            src={ZoomBidLogo}
            alt="zoombid logo"
            className="cursor-pointer w-36"
            onClick={() => navigate("/")}
          />
          <div className="flex items-center">
            <Button
              type="primary"
              onClick={() => {
                if (user.role === "user") {
                  navigate("/SellerDashboard");
                } else {
                  navigate("/admin");
                }
              }}
              className="flex justify-center items-center px-4 mx-2 rounded bg-[#14ae5c] text-white text-base font-medium active:scale-[.98] active:duration-75 transition-all ease-in-out"
            >
              {user.role === "admin" ? "Dashboard" : "My Listings"}
            </Button>
            <UserProfileButton user={user} />
            <Badge
              count={
                notifications?.filter((notification) => !notification.read)
                  .length
              }
              onClick={() => {
                readNotifications();
                setShowNotifications(true);
              }}
              className="cursor-pointer"
            >
              <Avatar
                className="flex justify-center"
                shape="circle"
                icon={<IoMdNotificationsOutline size={28} />}
              />
            </Badge>
          </div>
        </div>
        <div>{children}</div>

        {
          <Notifications
            notifications={notifications}
            reloadNotifications={getNotifications}
            showNotifications={showNotifications}
            setShowNotifications={setShowNotifications}
          />
        }
      </div>
    )
  );
};

export default ProtectedPage;
