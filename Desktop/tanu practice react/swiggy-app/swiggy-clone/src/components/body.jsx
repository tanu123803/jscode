import { useState, useEffect } from "react";
import { DATA_URL } from "../utilis/constant";
import { Search, Filter, X } from "lucide-react";
import ResturantCard from "./ResturantCard";

export default function Body() {
  const [resList, setResList] = useState([]);
  const [filteredResturant, setFilteredresturant] = useState([]);
  const [search, setSearch] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isFilterActive, setIsFilterActive] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    try {
      setIsLoading(true);
      const data = await fetch(DATA_URL);
      const res = await data.json();
      const items =
        res?.data?.cards?.[1]?.card?.card?.gridElements?.infoWithStyle?.restaurants || [];

      setResList(items);
      setFilteredresturant(items);
    } catch (exception) {
      console.log("error", exception);
    } finally {
      setIsLoading(false);
    }
  }

  const handleSearch = () => {
    const filteredRes = resList.filter((ele) =>
      ele.info.name.toLowerCase().includes(search.toLowerCase())
    );
    setFilteredresturant(filteredRes);
  };

  const handleFilterTopRated = () => {
    if (isFilterActive) {
      setFilteredresturant(resList);
      setIsFilterActive(false);
    } else {
      const filteredData = resList.filter((ele) => ele.info.avgRating >= 4.3);
      setFilteredresturant(filteredData);
      setIsFilterActive(true);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-10">
      {/* Header Section */}
      <div className="mb-6 sm:mb-8">
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-800 mb-2">
          Restaurants with online food delivery
        </h1>
        <p className="text-gray-600 text-sm sm:text-base">
          Discover the best food & drinks near you
        </p>
      </div>

      {/* Search and Filter Section */}
      <div className="mb-8 space-y-4">
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
          {/* Search Bar */}
          <div className="flex-1 relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              className="w-full pl-12 pr-4 py-3 sm:py-3.5 text-gray-700 bg-white border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
              placeholder="Search for restaurants and food"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              onKeyPress={handleKeyPress}
            />
          </div>

          {/* Search Button */}
          <button
            className="bg-orange-500 hover:bg-orange-600 text-white font-semibold px-6 sm:px-8 py-3 sm:py-3.5 rounded-xl transition-all duration-200 active:scale-95 shadow-sm hover:shadow-md"
            onClick={handleSearch}
          >
            Search
          </button>
        </div>

        {/* Filter Buttons */}
        <div className="flex flex-wrap gap-3">
          <button
            className={`flex items-center gap-2 font-medium px-4 py-2.5 rounded-xl transition-all duration-200 ${
              isFilterActive
                ? "bg-orange-500 text-white shadow-md"
                : "bg-white text-gray-700 border border-gray-300 hover:border-gray-400"
            }`}
            onClick={handleFilterTopRated}
          >
            {isFilterActive ? <X size={18} /> : <Filter size={18} />}
            <span className="text-sm sm:text-base">
              {isFilterActive ? "Clear Filter" : "Top Rated (4.3+)"}
            </span>
          </button>
        </div>
      </div>

      {/* Restaurant Grid */}
      {isLoading ? (
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-center">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-orange-500 border-t-transparent"></div>
            <p className="mt-4 text-gray-600 font-medium">Loading restaurants...</p>
          </div>
        </div>
      ) : filteredResturant.length === 0 ? (
        <div className="text-center py-16">
          <p className="text-xl text-gray-600 mb-2">No restaurants found</p>
          <p className="text-gray-500">Try adjusting your search or filters</p>
        </div>
      ) : (
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-6">
            {filteredResturant.length} Restaurant{filteredResturant.length !== 1 ? "s" : ""} found
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-8">
            {filteredResturant.map((ele) => (
              <ResturantCard key={ele.info.id} res={ele} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
