import { useState, useEffect } from "react";
import { DATA_URL } from "../utilis/constant";
import { Search, Filter } from "lucide-react";   // ✅ import Filter icon
import ResturantCard from "./ResturantCard";

export default function Body() {
  const [resList, setResList] = useState([]);
  const [filteredResturant, setFilteredresturant] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    const data = await fetch(DATA_URL);
    const res = await data.json();
    const items =
      res?.data?.cards?.[1]?.card?.card?.gridElements?.infoWithStyle?.restaurants || [];

    setResList(items);
    setFilteredresturant(items);
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">
          Hungry? We got you covered
        </h1>
        <p className="text-gray-600">
          Discover the best food & Drink in Bangalore
        </p>
      </div>

      {/* Search and filter */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-8">
        <div className="w-full md:w-1/2 relative flex gap-2">
          <Search className="absolute left-3 top-3 text-gray-500" /> {/* ✅ Icon visible */}
          <input
            type="text"
            className="w-full p-3 pl-10 outline-none text-gray-700 border rounded"
            placeholder="Enter Search query"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <button
            className="bg-orange-500 text-white px-6 py-3 rounded"
            onClick={() => {
              const filteredRes = resList.filter((ele) =>
                ele.info.name.toLowerCase().includes(search.toLowerCase())
              );
              setFilteredresturant(filteredRes);
            }}
          >
            Search
          </button>
        </div>

        <div className="w-full md:w-auto">
          <button
            className="flex items-center gap-2 bg-white border border-gray-300 font-medium py-3 px-4 rounded-lg"  
            onClick={() => {
              const filteredData = resList.filter(
                (ele) => ele.info.avgRating > 4.4 // ✅ corrected property name
              );
              setFilteredresturant(filteredData);
            }}
          >
            <Filter size={16} /> {/* ✅ Correct icon */}
            <span>Top rated restaurants</span>
          </button>
        </div>
      </div>

      {/* Restaurant grid */}
      {filteredResturant.length === 0 ? (   
        <p>Loading...</p>
      ) : (
        <div>
          <h2 className="text-2xl font-bold text-gray-800 mb-6">
            {filteredResturant.length} Restaurants to explore
          </h2>
          <div>
            {filteredResturant.map((ele) => (
              <ResturantCard key={ele.info.id} res={ele} /> 
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
