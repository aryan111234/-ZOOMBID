import React, { useEffect, useState } from "react";
import { Tabs, message, Divider } from "antd";
import Products from "./Products";
import Users from "./Users";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setLoader } from "../../redux/loadersSlice";
import { FaUsers } from "react-icons/fa";
import { IoMdCart } from "react-icons/io";
import { MdPlaylistAddCheck } from "react-icons/md";
import { FaRegClock } from "react-icons/fa6";
import { GetProducts } from "../../apicalls/product";
import { GetAllUsers } from "../../apicalls/users";

const Admin = () => {
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.users);
  const [totalUsers, setTotalUsers] = useState(0);
  const [totalListings, settotalListings] = useState(0);
  const [approvedListings, setApprovedListings] = useState(0);
  const [pendingListings, setPendingListings] = useState(0);

  const dispatch = useDispatch();
  const getData = async () => {
    try {
      dispatch(setLoader(true));
      const response = await GetProducts(null);
      dispatch(setLoader(false));
      if (response.success) {
        settotalListings(response.data.length);
        const approvedListings = response.data.filter(
          (product) => product.status === "approved"
        );
        const approvedListingsCount = approvedListings.length;
        setApprovedListings(approvedListingsCount);
        const pendingListings = response.data.filter(
          (product) => product.status === "pending"
        );
        const pendingListingsCount = pendingListings.length;
        setPendingListings(pendingListingsCount);
      }
    } catch (error) {
      dispatch(setLoader(false));
      message(error.message);
    }
  };

  const fetchTotalUsers = async () => {
    try {
      const usersData = await GetAllUsers();
      setTotalUsers(usersData.data.length);
    } catch (error) {
      message(error.message);
    }
  };

  useEffect(() => {
    if (user.role !== "admin") {
      navigate("/");
    }
    getData();
    fetchTotalUsers();
  }, []);

  return (
    <div>
      <Divider />
      <div className="flex gap-4 my-4">
        <div className="w-80 bg-[#FFF3E5] p-4 flex gap-4 rounded-md">
          <FaUsers
            size={48}
            className="text-white bg-[#FB8C00] rounded-full p-2"
          />
          <div>
            <h1 className="text-xs font-medium text-zinc-500">TOTAL USERS</h1>
            <h1 className="text-xl font-bold ">{totalUsers}</h1>
          </div>
        </div>
        <div className="w-80 bg-[#EAEFFF] p-4 flex  gap-4 rounded-md">
          <IoMdCart
            size={48}
            className="text-white bg-[#2962FF] rounded-full p-2"
          />
          <div>
            <h1 className="text-xs font-medium text-zinc-500">
              TOTAL LISTINGS
            </h1>
            <h1 className="text-xl font-bold ">{totalListings}</h1>
          </div>
        </div>
        <div className="w-80 bg-[#EBF8ED] p-4 flex  gap-4 rounded-md">
          <MdPlaylistAddCheck
            size={48}
            className="text-white bg-[#33B647] rounded-full p-2"
          />
          <div>
            <h1 className="text-xs font-medium text-zinc-500">
              APPROVED LISTINGS
            </h1>
            <h1 className="text-xl font-bold ">{approvedListings}</h1>
          </div>
        </div>
        <div className="w-80 bg-[#FEEAEC] p-4 flex  gap-4 rounded-md">
          <FaRegClock
            size={48}
            className="text-white bg-[#F23045] rounded-full p-2"
          />
          <div>
            <h1 className="text-xs font-medium text-zinc-500">
              PENDING LISTINGS
            </h1>
            <h1 className="text-xl font-bold ">{pendingListings}</h1>
          </div>
        </div>
      </div>

      <Tabs>
        <Tabs.TabPane tab="Products" key="1">
          <Products />
        </Tabs.TabPane>
        <Tabs.TabPane tab="Users" key="2">
          <Users />
        </Tabs.TabPane>
      </Tabs>
    </div>
  );
};

export default Admin;