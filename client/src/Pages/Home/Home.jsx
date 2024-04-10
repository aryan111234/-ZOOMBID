import React, { useEffect } from "react";
import "../../App.css";
import { GetProducts } from "../../apicalls/product";
import { message, Input } from "antd";
import { setLoader } from "../../redux/loadersSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import Filters from "./Filters";
import { IoSearch, IoClose, IoFilter } from "react-icons/io5";

const Home = () => {
  const [showFilters, setShowFilters] = React.useState(true);
  const [searchQuery, setSearchQuery] = React.useState("");
  const [products, setProducts] = React.useState([]);
  const [filters, setFilters] = React.useState({
    status: "approved",
    category: [],
    condition: [],
  });
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const getData = async () => {
    try {
      dispatch(setLoader(true));
      const response = await GetProducts({ ...filters, search: searchQuery });
      dispatch(setLoader(false));
      if (response.success) {
        setProducts(response.data);
      }
    } catch (error) {
      dispatch(setLoader(false));
      message(error.message);
    }
  };

  const handleSearch = () => {
    getData();
  };

  useEffect(() => {
    getData();
  }, [filters, searchQuery]);

  return (
    <div>
      <div className="flex gap-4">
        {showFilters && (
          <Filters
            showFilters={showFilters}
            setShowFilters={setShowFilters}
            filters={filters}
            setFilters={setFilters}
          />
        )}
        <div className="flex flex-col gap-5 w-full">
          <div className="flex items-center">
            {!showFilters && (
              <IoFilter
                size={24}
                className="cursor-pointer mr-5"
                onClick={() => setShowFilters(!showFilters)}
              />
            )}
            <input
              type="text"
              placeholder="Search Products here"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="border border-gray-300 rounded border-solid w-full p-2 focus:outline-none focus:ring focus:ring-gray-100"
            />
            <IoSearch
              size={22}
              className="cursor-pointer border border-gray-300 rounded border-solid p-2 h-[42px] w-14 bg-[#14ae5c] text-white ml-2"
              onClick={handleSearch}
            />
          </div>
          <div
            className={`
        grid gap-5 ${showFilters ? "grid-cols-3" : "grid-cols-4"}
        `}
          >
            {products?.map((product) => {
              return (
                <div
                  className="border border-gray-300 rounded border-solid flex flex-col gap-2 pb-2 cursor-pointer"
                  key={product._id}
                  onClick={() => navigate(`/product/${product._id}`)}
                >
                  <img
                    src={product.images[0]}
                    alt=""
                    className="w-full h-52 object-cover"
                  />
                  <div className="px-2 flex flex-col gap-1">
                    <h1 className="text-lg font-semibold ">{product.name}</h1>
                    <p className="text-sm overflow-hidden whitespace-nowrap overflow-ellipsis">
                      {product.description}
                    </p>
                    <span className="flex items-center justify-between text-lg font-semibold text-green-500">
                      Rs. {product.price}
                      <p className="text-sm font-normal text-black">
                        {product.condition}
                      </p>
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;