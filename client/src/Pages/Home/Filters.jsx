import React from "react";
import { IoCloseOutline } from "react-icons/io5";

const categories = [
  {
    name: "Car",
    value: "Car",
  },
  {
    name: "Bike",
    value: "Bike",
  },
];

const condition = [
  {
    name: "Brand New",
    value: "Brand New",
  },
  {
    name: "Used-Like New",
    value: "Used-Like-New",
  },
  {
    name: "Used-Good",
    value: "Used-Good",
  },
];

const Filters = ({ showFilters, setShowFilters, filters, setFilters }) => {
  const handlePriceChange = (e, type) => {
    const value = parseInt(e.target.value);
    setFilters({
      ...filters,
      [type]: value >= 0 ? value : undefined,
    });
  };

  return (
    <div className="flex flex-col w-72">
      <div className="flex justify-between items-center">
        <h1 className="font-semibold text-lg">Filters</h1>
        <IoCloseOutline
          size={24}
          className="cursor-pointer"
          onClick={() => setShowFilters(!setShowFilters)}
        />
      </div>

      <div className="flex flex-col gap-1 mt-5">
        <h1 className="font-semibold">Categories</h1>
        <div className="flex flex-col gap-2">
          {categories.map((category) => {
            return (
              <div className="flex items-center gap-2" key={category.value}>
                <input
                  type="checkbox"
                  name="category"
                  checked={filters.category.includes(category.value)}
                  onChange={(e) => {
                    if (e.target.checked) {
                      setFilters({
                        ...filters,
                        category: [...filters.category, category.value],
                      });
                    } else {
                      setFilters({
                        ...filters,
                        category: filters.category.filter(
                          (item) => item !== category.value
                        ),
                      });
                    }
                  }}
                />
                <label htmlFor="category">{category.name}</label>
              </div>
            );
          })}
        </div>

        <h1 className="font-semibold mt-5">Condition</h1>
        <div className="flex flex-col gap-2">
          {condition.map((condition) => {
            return (
              <div className="flex items-center gap-2" key={condition.value}>
                <input
                  type="checkbox"
                  name="condition"
                  checked={filters.condition.includes(condition.value)}
                  onChange={(e) => {
                    if (e.target.checked) {
                      setFilters({
                        ...filters,
                        condition: [...filters.condition, condition.value],
                      });
                    } else {
                      setFilters({
                        ...filters,
                        condition: filters.condition.filter(
                          (item) => item !== condition.value
                        ),
                      });
                    }
                  }}
                />
                <label htmlFor="condition">{condition.name}</label>
              </div>
            );
          })}
        </div>

        {/* Price range */}
        <div className="mt-5">
          <h1 className="font-semibold">Price Range</h1>
          <div className="flex gap-2 mt-2 items-center">
            <input
              type="number"
              placeholder="Min"
              value={filters.minPrice || ""}
              onChange={(e) => handlePriceChange(e, "minPrice")}
              className="border rounded-md p-1 w-full focus:outline-none focus:ring focus:ring-gray-100"
            />
            <h1>To</h1>
            <input
              type="number"
              placeholder=" Max"
              value={filters.maxPrice || ""}
              onChange={(e) => handlePriceChange(e, "maxPrice")}
              className="border rounded-md p-1 w-full focus:outline-none focus:ring focus:ring-gray-100"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Filters;
