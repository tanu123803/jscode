import React from "react";
import { CDN_URL } from "../utilis/constant";

const ResturantCard= ({res})=>{
    const {cloudinaryImageId,name,cuisines,avgRating,sla,areaName} = res?.info


    return(
        <div className="resturant-card rounded-2xl overflow-hidden hover:shadow-lg transition-all duration">
            <div className="relativeh-52 overflow-hidden">
                <img className="w-full h-full object-cover" src={`${CDN_URL+cloudinaryImageId}`} alt={name} />
                <div className="absolute inset-0 bg-gradient-to-from-black/70 to-transparent">
                    {/*offer badge*/}
                    {res.info?.aggregateddiscountInfov3?.header&&(
                        <div className="absolute bottom-3 left-3 text-white font-bold text-xl">{res.info?.aggregateddiscountInfov3?.header}</div>
                    )}
                </div>
            </div>
            {/*Resturant Details*/}
            <div>
                <h3 className="font-bold text-xl truncate" title={name}>{name }</h3>
                {/*rating*/}
                <div className="flex items-center mt-1 mb-2">
                    <div className="flex items-center gap-1">
                        <div className="bg-green-600 text-white p-1 rounded-full w-6 h-6  flex items-center justify-center text-xs">
                            <span>★</span>
                        </div>
                        <span className="ml-0.5">{avgRating}</span>
                    </div>
                    <span className="mx-2 text-grey-800">·</span>
                    <span className="text-gray-800 font-semibold">{sla.slaString}</span>
                </div>
                {/*cuisines*/}
                <p className="text-gray-500 text-5m truncate">{cuisines.join(" ,")}</p>
                <p>{areaName}</p>
            </div>
        </div>
    )
}
//HOC FOR PROMOTED RESTURANT
export const withResturantPromoted = (ResturantCard)=>{
    return(props)=>{
        <div className="relative">
            <div className="absolute top-0 left-0 bg-black text-white px-2 py-1m-2 rounded f-m">
                Promoted
            </div>
            <ResturantCard {...props}/>
        </div>
    }
}


export default ResturantCard