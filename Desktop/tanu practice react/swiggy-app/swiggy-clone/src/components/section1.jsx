import React, { useRef, useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { CDN_URL, DATA_URL } from "../utilis/constant";

const Section1 = () => {
  const [resList, setResList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(true);
  const scrollRef = useRef(null);

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (scrollRef.current) {
        const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
        setShowLeftArrow(scrollLeft > 0);
        setShowRightArrow(scrollLeft < scrollWidth - clientWidth - 10);
      }
    };

    const scrollElement = scrollRef.current;
    if (scrollElement) {
      scrollElement.addEventListener("scroll", handleScroll);
      handleScroll(); // Initial check
    }

    return () => {
      if (scrollElement) {
        scrollElement.removeEventListener("scroll", handleScroll);
      }
    };
  }, [resList]);

  async function fetchData() {
    try {
      setIsLoading(true);
      const data = await fetch(DATA_URL);
      const res = await data.json();
      const items =
        res?.data?.cards[0]?.card?.card?.gridElements?.infoWithStyle?.info || [];

      setResList(items);
    } catch (exception) {
      console.log("error", exception);
    } finally {
      setIsLoading(false);
    }
  }

  const scroll = (direction) => {
    if (scrollRef.current) {
      const scrollAmount = window.innerWidth < 640 ? 200 : 400;
      scrollRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
      {/* Header */}
      <div className="flex justify-between items-center mb-6 sm:mb-8">
        <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-800">
          What's on your mind?
        </h2>
        <div className="hidden sm:flex gap-2">
          <button
            onClick={() => scroll("left")}
            disabled={!showLeftArrow}
            className={`w-9 h-9 rounded-full shadow-md flex justify-center items-center transition-all duration-200 ${
              showLeftArrow
                ? "bg-gray-300 hover:bg-gray-400 cursor-pointer"
                : "bg-gray-100 cursor-not-allowed opacity-50"
            }`}
            aria-label="Scroll left"
          >
            <ChevronLeft size={20} className="text-gray-700" />
          </button>
          <button
            onClick={() => scroll("right")}
            disabled={!showRightArrow}
            className={`w-9 h-9 rounded-full shadow-md flex justify-center items-center transition-all duration-200 ${
              showRightArrow
                ? "bg-gray-300 hover:bg-gray-400 cursor-pointer"
                : "bg-gray-100 cursor-not-allowed opacity-50"
            }`}
            aria-label="Scroll right"
          >
            <ChevronRight size={20} className="text-gray-700" />
          </button>
        </div>
      </div>

      {/* Carousel */}
      {isLoading ? (
        <div className="flex items-center justify-center h-40">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-orange-500 border-t-transparent"></div>
        </div>
      ) : (
        <div className="relative">
          <div
            ref={scrollRef}
            className="flex overflow-x-auto gap-4 sm:gap-6 lg:gap-8 pb-4 scrollbar-hide scroll-smooth"
            style={{
              scrollbarWidth: "none",
              msOverflowStyle: "none",
            }}
          >
            {resList.map((ele) => (
              <div
                key={ele.id || ele.imageId}
                className="flex-shrink-0 cursor-pointer group transition-transform duration-200 hover:scale-105"
              >
                <div className="w-28 h-28 sm:w-32 sm:h-32 lg:w-36 lg:h-36">
                  <img
                    src={`${CDN_URL}${ele.imageId}`}
                    alt={ele.action?.text || "Food item"}
                    className="w-full h-full object-cover rounded-full transition-all duration-200"
                    loading="lazy"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Section1;
