import React from "react";
import { CDN_URL } from "../utilis/constant";
import { Star, Clock } from "lucide-react";

const ResturantCard = ({ res }) => {
  const { cloudinaryImageId, name, cuisines, avgRating, sla, areaName } = res?.info;

  return (
    <div className="restaurant-card group cursor-pointer transition-all duration-300 hover:scale-[1.02]">
      {/* Image Container */}
      <div className="relative h-48 sm:h-52 md:h-56 overflow-hidden rounded-2xl">
        <img
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
          src={`${CDN_URL}${cloudinaryImageId}`}
          alt={name}
          loading="lazy"
        />
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent">
          {/* Offer Badge */}
          {res.info?.aggregatedDiscountInfoV3?.header && (
            <div className="absolute bottom-3 left-3 right-3">
              <p className="text-white font-extrabold text-xl md:text-2xl drop-shadow-lg">
                {res.info?.aggregatedDiscountInfoV3?.header}{" "}
                {res.info?.aggregatedDiscountInfoV3?.subHeader}
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Restaurant Details */}
      <div className="mt-3 px-1">
        <h3 className="font-bold text-lg md:text-xl text-gray-800 truncate mb-2" title={name}>
          {name}
        </h3>

        {/* Rating and Delivery Time */}
        <div className="flex items-center gap-2 mb-2 flex-wrap">
          <div className="flex items-center gap-1 bg-green-600 text-white px-2 py-1 rounded-lg">
            <Star size={14} fill="white" />
            <span className="text-sm font-semibold">{avgRating}</span>
          </div>
          <span className="text-gray-400">•</span>
          <div className="flex items-center gap-1 text-gray-700">
            <Clock size={14} />
            <span className="text-sm font-semibold">{sla.slaString}</span>
          </div>
        </div>

        {/* Cuisines */}
        <p className="text-gray-500 text-sm truncate mb-1">
          {cuisines?.join(", ")}
        </p>

        {/* Area Name */}
        <p className="text-gray-600 text-sm font-medium">{areaName}</p>
      </div>
    </div>
  );
};

// HOC FOR PROMOTED RESTAURANT
export const withResturantPromoted = (ResturantCard) => {
  return (props) => {
    return (
      <div className="relative">
        <div className="absolute -top-2 -left-2 bg-black text-white px-3 py-1 rounded-lg text-xs font-bold z-10 shadow-lg">
          Promoted
        </div>
        <ResturantCard {...props} />
      </div>
    );
  };
};

export default ResturantCard;