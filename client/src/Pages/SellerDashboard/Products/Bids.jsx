import { Button, Modal, Table, Tag, message } from "antd";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setLoader } from "../../../redux/loadersSlice";
import { GetAllBids, UpdateBidStatus } from "../../../apicalls/product";
import moment from "moment";

const Bids = ({ showBidsModal, setShowBidsModal, selectedProduct }) => {
  const [bidsData, setBidsData] = React.useState([]);
  const dispatch = useDispatch();

  const getData = async () => {
    try {
      dispatch(setLoader(true));
      const response = await GetAllBids({
        product: selectedProduct._id,
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

  const onStatusUpdate = async (id, status) => {
    try {
      dispatch(setLoader(true));
      const response = await UpdateBidStatus(id, status);
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
      title: "Name",
      dataIndex: "name",
      render: (text, record) => {
        return record.buyer.name;
      },
    },
    {
      title: "Bid Amount",
      dataIndex: "bidAmount",
    },
    {
      title: "Bid Date",
      dataIndex: "createdAt",
      render: (text, _record) => {
        return moment(text).format("MMMM Do, h:mm a");
      },
    },
    {
      title: "Message",
      dataIndex: "message",
    },
    {
      title: "Contact Details",
      dataIndex: "contactDetails",
      render: (text, record) => {
        return (
          <div>
            <p>Phone: {record.mobile}</p>
            <p>Email: {record.buyer.email}</p>
          </div>
        );
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
        const { status, _id } = record;
        return (
          <div className="flex gap-3">
            {status === "pending" && (
              <Button
                type="default"
                onClick={() => onStatusUpdate(_id, "accepted")}
              >
                Accept
              </Button>
            )}
            {status === "pending" && (
              <Button danger onClick={() => onStatusUpdate(_id, "rejected")}>
                Reject
              </Button>
            )}
            {status === "accepted" && (
              <div className="flex gap-3">
                <Button type="default" disabled>
                  Accept
                </Button>
                <Button danger disabled>
                  Reject
                </Button>
              </div>
            )}
            {status === "rejected" && (
              <div className="flex gap-3">
                <Button type="default" disabled>
                  Accept
                </Button>
                <Button danger disabled>
                  Reject
                </Button>
              </div>
            )}
          </div>
        );
      },
    },
  ];

  useEffect(() => {
    if (selectedProduct) {
      getData();
    }
  }, [selectedProduct]);
  return (
    <Modal
      open={showBidsModal}
      onCancel={() => setShowBidsModal(false)}
      centered
      width={1400}
      footer={null}
    >
      <div className="flex flex-col gap-4">
        <h1 className="text-2xl font-semibold text-center">Bids</h1>
        <h1 className="text-lg">Item: {selectedProduct.name}</h1>
        <Table columns={columns} dataSource={bidsData} />
      </div>
    </Modal>
  );
};

export default Bids;