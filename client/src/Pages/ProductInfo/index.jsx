import React, { useEffect, useState } from "react";
import { Alert, Button, message } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { FaRegEye } from "react-icons/fa";
import moment from "moment";
import BidModal from "./BidModal";
import Divider from "../../Components/Divider";
import {
  GetAllBids,
  GetProductById,
  UpdateViewCount,
} from "../../apicalls/product";
import { setLoader } from "../../redux/loadersSlice";

const ProductInfo = () => {
  const { user } = useSelector((state) => state.users);
  const dispatch = useDispatch();
  const { id } = useParams();
  const navigate = useNavigate();

  const [viewCount, setViewCount] = useState(null);
  const [showAddNewBid, setShowAddNewBid] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [product, setProduct] = useState(null);

  // Define fetchData function
  const fetchData = async () => {
    try {
      dispatch(setLoader(true));

      // Fetch product data by ID
      const productResponse = await GetProductById(id);
      if (!productResponse.success) {
        throw new Error(productResponse.message || "Failed to fetch product");
      }

      // Fetch all bids for the product
      const bidsResponse = await GetAllBids({ product: id });

      // Update the component state with fetched data
      setProduct({
        ...productResponse.data,
        bids: bidsResponse.data,
      });

      // Update view count
      const updatedViewCount = await UpdateViewCount(id);
      setViewCount(updatedViewCount);

      dispatch(setLoader(false));
    } catch (error) {
      dispatch(setLoader(false));
      message.error(error.message || "An error occurred");
    }
  };

  useEffect(() => {
    fetchData(); // Call fetchData immediately after defining it

    // Clean-up function for the effect (optional)
    return () => {
      // Perform clean-up (if needed)
    };
  }, [id, dispatch]);

  const isBidAccepted = () => {
    return product?.bids?.some((bid) => bid.status === "accepted");
  };

  const handlePlaceBid = () => {
    setShowAddNewBid(true);
  };

  if (!product) {
    return <p>Loading...</p>;
  }

  return (
    <div className="mt-6">
      <div className="grid grid-cols-2 gap-5">
        <div className="flex flex-col gap-2">
          <img
            src={product.images[selectedImageIndex]}
            alt="Product image"
            className="w-full h-96 object-cover rounded-md"
          />

          <div className="flex gap-5">
            {product.images.map((image, index) => (
              <img
                key={index}
                className={`w-20 h-20 object-cover rounded-md cursor-pointer ${
                  selectedImageIndex === index
                    ? "border-2 border-green-500 border-solid p-[2px]"
                    : ""
                }`}
                onClick={() => setSelectedImageIndex(index)}
                src={image}
                alt=""
              />
            ))}
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
              <span>Tax Cleared</span>
              <span>{product.taxCleared ? "Yes" : "No"}</span>
            </div>
          </div>
          <Divider />
          <div className="flex flex-col">
            <h1 className="text-xl font-semibold">Seller Details</h1>
            <div className="flex justify-between mt-2">
              <span>Name</span>
              <span>{product.seller?.name}</span>
            </div>
            <div className="flex justify-between mt-2">
              <span>Email</span>
              <span>{product.seller?.email}</span>
            </div>
          </div>

          <Divider />

          <div className="flex flex-col">
            <div className="flex justify-between items-center">
              <h1 className="text-xl font-semibold">Bids</h1>
              <Button
                onClick={handlePlaceBid}
                disabled={user?._id === product.seller?._id || isBidAccepted()}
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
              product.bids?.map((bid) => (
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
              ))}
          </div>
        </div>
      </div>
      {showAddNewBid && (
        <BidModal
          product={product}
          reloadData={fetchData} // Pass fetchData as prop to BidModal
          showBidModal={showAddNewBid}
          setShowBidModal={setShowAddNewBid}
          price={product.price}
        />
      )}
    </div>
  );
};

export default ProductInfo;
