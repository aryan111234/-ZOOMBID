import React, { useEffect, useState } from "react";
import { Button, Popconfirm, Table, Tag, message } from "antd";
import { useDispatch } from "react-redux";
import { GetProducts, UpdateProductStatus } from "../../apicalls/product";
import { setLoader } from "../../redux/loadersSlice";
import moment from "moment";
import ProductInfo from "./ProductInfo";

function Products() {
  const [products, setProducts] = React.useState([]);
  const [showProductInfo, setshowProductInfo] = React.useState(false);
  const [productInfoId, setProductInfoId] = React.useState(null);
  const dispatch = useDispatch();
  const getData = async () => {
    try {
      dispatch(setLoader(true));
      const response = await GetProducts(null);
      dispatch(setLoader(false));
      if (response.success) {
        setProducts(response.data);
      }
    } catch (error) {
      dispatch(setLoader(false));
      message(error.message);
    }
  };

  const onStatusUpdate = async (id, status) => {
    try {
      dispatch(setLoader(true));
      const response = await UpdateProductStatus(id, status);
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
      dataIndex: "image",
      render: (text, record) => {
        return (
          <img
            src={record?.images?.length > 0 ? record.images[0] : ""}
            alt="Product Image"
            className="w-20 h-20 object-cover rounded-md cursor-pointer"
            onClick={() => {
              setshowProductInfo(true);
              setProductInfoId(record._id);
            }}
          />
        );
      },
    },
    {
      title: "Name",
      dataIndex: "name",
    },
    {
      title: "Seller",
      dataIndex: "name",
      render: (text, record) => {
        return record.seller.name;
      },
    },
    {
      title: "Price",
      dataIndex: "price",
    },
    {
      title: "Category",
      dataIndex: "category",
    },
    {
      title: "Added On",
      dataIndex: "createdAt",
      render: (text, record) =>
        moment(record.createdAt).format("DD-MM-YYYY hh:mm A"),
    },
    {
      title: "Status",
      dataIndex: "status",

      render: (text, record) => {
        let tagColor;

        switch (record.status) {
          case "approved":
            tagColor = "success";
            break;
          case "pending":
            tagColor = "processing";
            break;
          case "rejected":
            tagColor = "error";
            break;
          case "blocked":
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
          <div className="flex gap-3 justify-center">
            {status === "pending" && (
              <Button
                type="default"
                onClick={() => onStatusUpdate(_id, "approved")}
              >
                Approve
              </Button>
            )}
            {status === "pending" && (
              <Button danger onClick={() => onStatusUpdate(_id, "rejected")}>
                Reject
              </Button>
            )}
            {status === "approved" && (
              <Popconfirm
                title="Are you sure to block this product?"
                onConfirm={() => onStatusUpdate(_id, "blocked")}
                okText="Yes"
                cancelText="No"
                okType="default"
              >
                <Button danger>Block</Button>
              </Popconfirm>
            )}
            {status === "blocked" && (
              <Button onClick={() => onStatusUpdate(_id, "approved")}>
                Unblock
              </Button>
            )}
            {status === "rejected" && (
              <div className="flex gap-3">
                <Button type="default" disabled>
                  Approve
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
    getData();
  }, []);

  return (
    <div>
      <Table className="mt-4" columns={columns} dataSource={products} />

      {/* more product info */}
      {showProductInfo && (
        <ProductInfo
          showProductInfo={showProductInfo}
          setshowProductInfo={setshowProductInfo}
          id={productInfoId}
        />
      )}
    </div>
  );
}

export default Products;