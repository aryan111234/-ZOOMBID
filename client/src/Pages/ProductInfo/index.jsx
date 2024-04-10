import React, { useEffect, useState } from "react";
import { Alert, Button, message } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { FaRegEye } from "react-icons/fa";

import {
  GetAllBids,
  GetProductById,
  GetProducts,
  UpdateViewCount,
} from "../../apicalls/product";
import { setLoader } from "../../redux/loadersSlice";
import Divider from "../../Components/Divider";
import moment from "moment";
import BidModal from "./BidModal";

const ProductInfo = () => {
  const [viewCount, setViewCount] = useState(null);
  const { user } = useSelector((state) => state.users);
  const [showAddNewBid, setShowAddNewBid] = React.useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = React.useState(0);
  const [product, setProduct] = React.useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id } = useParams();
  const getData = async () => {
    try {
      dispatch(setLoader(true));
      const response = await GetProductById(id);
      dispatch(setLoader(false));
      if (response.success) {
        const bidsResponse = await GetAllBids({ product: id });
        setProduct({
          ...response.data,
          bids: bidsResponse.data,
        });
      }
    } catch (error) {
      dispatch(setLoader(false));
      message(error.message);
    }
  };

  const isBidAccepted = () => {
    return product.bids.some((bid) => bid.status === "accepted");
  };

  useEffect(() => {
    getData();

    // Call the UpdateViewCount function when the component mounts
    UpdateViewCount(id)
      .then((updatedViewCount) => {
        // Set the view count in the component state
        setViewCount(updatedViewCount);
      })
      .catch((error) => {
        message(error.message);
      });
  }, []);
  return (
    product && (
      <div className="mt-6">
        <div className="grid grid-cols-2 gap-5">
          <div className="flex flex-col gap-2">
            <img
              src={product.images[selectedImageIndex]}
              alt="Product image"
              className="w-full h-96 object-cover rounded-md"
            />

            <div className="flex gap-5">
              {product.images.map((image, index) => {
                return (
                  <img
                    className={`w-20 h-20 object-cover rounded-md cursor-pointer ${
                      selectedImageIndex === index
                        ? "border-2 border-green-500 border-solid p-[2px]"
                        : ""
                    }`}
                    onClick={() => setSelectedImageIndex(index)}
                    src={image}
                    alt=""
                  />
                );
              })}
            </div>
            <span className="flex gap-2 items-center">
              <FaRegEye size={18} />
              {viewCount} Views
            </span>
          </div>

          {/* Product Details */}
          <div className="flex flex-col gap-3">
            <div className="flex flex-col gap-1">
              <h1 className="text-2xl font-semibold">{product.name}</h1>
              <span className="font-medium text-green-500">
                {product.condition}
              </span>
              <span className="font-medium text-sm">
                Posted: {moment(product.createdAt).fromNow()}
              </span>
              <span>{product.description}</span>
            </div>
            <Divider />
            <div className="flex flex-col">
              <h1 className="text-xl font-semibold">Item Details</h1>
              <div className="flex justify-between mt-2">
                <span>Price</span>
                <span>Rs. {product.price}</span>
              </div>
              <div className="flex justify-between mt-2">
                <span>Category</span>
                <span>{product.category}</span>
              </div>
              <div className="flex justify-between mt-2">
                <span>Papers Available</span>
                <span>{product.papersAvailable ? "Yes" : "No"}</span>
              </div>
            </div>
            <Divider />
            <div className="flex flex-col">
              <h1 className="text-xl font-semibold">Seller Details</h1>
              <div className="flex justify-between mt-2">
                <span>Name</span>
                <span>{product.seller.name}</span>
              </div>
              <div className="flex justify-between mt-2">
                <span>Email</span>
                <span>{product.seller.email}</span>
              </div>
            </div>

            <Divider />

            <div className="flex flex-col">
              <div className="flex justify-between items-center">
                <h1 className="text-xl font-semibold">Bids</h1>
                <Button
                  onClick={() => setShowAddNewBid(!showAddNewBid)}
                  disabled={user._id === product.seller._id || isBidAccepted()}
                >
                  Place a Bid
                </Button>
              </div>
              {isBidAccepted() && (
                <Alert
                  message="This item has been sold. Bids are no longer accepted."
                  banner
                  className="mt-3 rounded-md"
                />
              )}
              {product.ShowProductBids &&
                product.bids?.map((bid) => {
                  return (
                    <div
                      key={bid._id}
                      className="border border-gray-300 border-solid p-3 rounded mt-4"
                    >
                      <div className="flex justify-between mt-2">
                        <span>Name</span>
                        <span>{bid.buyer.name}</span>
                      </div>
                      <div className="flex justify-between mt-2">
                        <span>Bid Amount</span>
                        <span>Rs. {bid.bidAmount}</span>
                      </div>
                      <div className="flex justify-between mt-2">
                        <span>Bid Placed On</span>
                        <span>{moment(bid.createdAt).calendar()}</span>
                      </div>
                    </div>
                  );
                })}
            </div>
          </div>
        </div>
        {showAddNewBid && (
          <BidModal
            product={product}
            reloadData={getData}
            showBidModal={showAddNewBid}
            setShowBidModal={setShowAddNewBid}
            price={product.price}
          />
        )}
      </div>
    )
  );
};

export default ProductInfo;
