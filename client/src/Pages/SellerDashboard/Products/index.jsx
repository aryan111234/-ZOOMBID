import React, { useEffect, useState } from "react";
import { Button, Popconfirm, Table, Tag, message } from "antd";
import ProductsForm from "./ProductsForm";
import { useDispatch, useSelector } from "react-redux";
import { DeleteProduct, GetProducts } from "../../../apicalls/product";
import { setLoader } from "../../../redux/loadersSlice";
import { BiEdit } from "react-icons/bi";
import { RiDeleteBin6Line } from "react-icons/ri";
import { LiaCommentsDollarSolid } from "react-icons/lia";
import moment from "moment";
import Bids from "./Bids";

function Products() {
  const [showBids, setShowBids] = React.useState(false);
  const [selectedProduct, setSelectedProduct] = React.useState(null);
  const [products, setProducts] = React.useState([]);
  const [showProductForm, setShowProductForm] = useState(false);
  const { user } = useSelector((state) => state.users);
  const dispatch = useDispatch();
  const getData = async () => {
    try {
      dispatch(setLoader(true));
      const response = await GetProducts({
        seller: user._id,
      });
      dispatch(setLoader(false));
      if (response.success) {
        setProducts(response.data);
      }
    } catch (error) {
      dispatch(setLoader(false));
      message(error.message);
    }
  };

  const deleteProduct = async (id) => {
    try {
      dispatch(setLoader(true));
      const response = await DeleteProduct(id);
      dispatch(setLoader(false));
      if (response.success) {
        message.success(response.message);
        getData();
      } else {
        message.error(response.message);
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
            className="w-20 h-20 object-cover rounded-md"
          />
        );
      },
    },
    {
      title: "Name",
      dataIndex: "name",
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
      title: "Condition",
      dataIndex: "condition",
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
      title: "Added On",
      dataIndex: "createdAt",
      render: (text, record) =>
        moment(record.createdAt).format("DD-MM-YYYY hh:mm A"),
    },
    {
      title: "Views",
      dataIndex: "viewCount",
    },
    {
      title: "Action",
      dataIndex: "action",
      render: (text, record) => {
        return (
          <div className="flex gap-5 cursor-pointer">
            <BiEdit
              size={18}
              onClick={() => {
                setSelectedProduct(record);
                setShowProductForm(true);
              }}
            />
           <Popconfirm
          title="Are you sure to delete this product?"
          onConfirm={() => deleteProduct(record._id)}
          okText="Yes"
          cancelText="No"
          okType="default"
        >
          <RiDeleteBin6Line size={18} />
        </Popconfirm>
            <LiaCommentsDollarSolid
              size={18}
              onClick={() => {
                setSelectedProduct(record);
                setShowBids(true);
              }}
            />
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
      <div className="flex justify-end">
        <Button
          type="default"
          onClick={() => {
            setSelectedProduct(null);
            setShowProductForm(true);
          }}
        >
          Add Product
        </Button>
      </div>
      <Table className="mt-4" columns={columns} dataSource={products} />
      {showProductForm && (
        <ProductsForm
          showProductForm={showProductForm}
          setShowProductForm={setShowProductForm}
          selectedProduct={selectedProduct}
          getData={getData}
        />
      )}

      {showBids && (
        <Bids
          showBidsModal={showBids}
          setShowBidsModal={setShowBids}
          selectedProduct={selectedProduct}
        />
      )}
    </div>
  );
}

export default Products;