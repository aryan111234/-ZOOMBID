import { Popconfirm, Table, Tag, message } from "antd";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setLoader } from "../../../redux/loadersSlice";
import moment from "moment";
import { GetAllBids, DeleteBid } from "../../../apicalls/product";
import { RiDeleteBin6Line } from "react-icons/ri";
const UserBids = () => {
  const [bidsData, setBidsData] = React.useState([]);
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.users);

  const getData = async () => {
    try {
      dispatch(setLoader(true));
      const response = await GetAllBids({
        buyer: user._id,
      });
      dispatch(setLoader(false));
      if (response.success) {
        setBidsData(response.data);
      }
    } catch (error) {
      dispatch(setLoader(false));
      message.error(error.message);
    }
  };

  const deleteBid = async (id) => {
    try {
      dispatch(setLoader(true));
      const response = await DeleteBid(id);
      dispatch(setLoader(false));
      if (response.success) {
        message.success(response.message);
        getData();
      } else {
        throw new Error(response.message);
      }
    } catch (error) {
      dispatch(setLoader(false));
      message.error(error.message);
    }
  };

  const columns = [
    {
      title: "Product",
      dataIndex: "product",
      render: (text, record) => {
        return record.product.name;
      },
    },
    {
      title: "Seller",
      dataIndex: "seller",
      render: (text, record) => {
        return record.seller.name;
      },
    },
    {
      title: "Bid Amount",
      dataIndex: "bidAmount",
    },
    {
      title: "Message",
      dataIndex: "message",
    },
    {
      title: "Bid Date",
      dataIndex: "createdAt",
      render: (text, _record) => {
        return moment(text).format("MMMM Do, h:mm a");
      },
    },
    {
      title: "Status",
      dataIndex: "status",
      render: (text, record) => {
        let tagColor;

        switch (record.status) {
          case "accepted":
            tagColor = "success";
            break;
          case "pending":
            tagColor = "processing";
            break;
          case "rejected":
            tagColor = "error";
            break;
          default:
            tagColor = "default";
        }

        return <Tag color={tagColor}>{record.status.toUpperCase()}</Tag>;
      },
    },
    {
      title: "Action",
      dataIndex: "action",
      render: (text, record) => {
        return (
          <div className="flex justify-center">
            <Popconfirm
              title="Are you sure to block this product?"
              onConfirm={() => deleteBid(record._id)}
              okText="Yes"
              cancelText="No"
              okType="default"
            >
              <RiDeleteBin6Line className="cursor-pointer text-red-500" />
            </Popconfirm>
          </div>
        );
      },
    },
  ];

  useEffect(() => {
    getData();
  }, []);
  return (
    <div className="flex flex-col gap-4">
      <Table columns={columns} dataSource={bidsData} />
    </div>
  );
};

export default UserBids;