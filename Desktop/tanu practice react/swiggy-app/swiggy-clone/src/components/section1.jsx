import React, { useRef, useState, useEffect } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { CDN_URL, DATA_URL,  } from "../utilis/constant";

const Section1 = () => {
  const [resList, setResList] = useState([]);
  const scrollRef = useRef(null);

  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    const data = await fetch(DATA_URL);
    const res = await data.json();
    const items =
      res?.data?.cards[0]?.card?.card?.gridElements?.infoWithStyle?.info || [];

    setResList(items);
  }

  const scroll = (direction) => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({
        left: direction === "left" ? -300 : 300,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="px-6 py-4 max-w-[1200px] m-auto">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">What's on your mind?</h2>
        <div className="flex gap-2">
          <button
            onClick={() => scroll("left")}
            className="w-8 h-8 bg-gray-300 rounded-full shadow-md flex justify-center items-center"
          >
            <ArrowLeft />
          </button>
          <button
            onClick={() => scroll("right")}
            className="w-8 h-8 bg-gray-300 rounded-full shadow-md flex justify-center items-center"
          >
            <ArrowRight />
          </button>
        </div>
      </div>

      <div className="relative flex items-center bg-gray-100">
        <div
          ref={scrollRef}
          className="flex overflow-x-auto gap-6 scrollbar-hide px-12 bg-gray-100"
        >
          {resList.map((ele) => (
            <div key={ele.id || ele.imageId} className="min-w-[120px]">
              <img
                src={`${CDN_URL}${ele.imageId}`}
                alt={ele.action?.text || "item"}
                className="w-28 h-28 object-cover rounded-lg"
              />
              <p className="text-center text-sm mt-1">{ele.action?.text}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Section1;
