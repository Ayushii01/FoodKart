import React from "react";
import {CDN_URL} from "../utils/constants";
const Restrocard=(props)=>{
    const {resData}= props;
 
    const{cloudinaryImageId,name,cuisines,avgRating,costForTwo,areaName,sla} = resData?.info;
 
    return (
        <div className="restro-card w-[250px] h-[350px] m-4 px-[10px] py-[5px] rounded-[5px] transition duration-300 ease-in-out hover:scale-110 shadow-lg bg-gray-300 bg-opacity-50 text-white">
            <img className="restro-logo w-[300px] h-[150px] rounded-[5px]" src={CDN_URL+cloudinaryImageId}/>
            <div className="flex flex-col gap-2 px-1">
                <h3 className=" font-Arvo text-xl font-bold truncate">{name}</h3>
                <div className="flex items-center">
                    <div className=" w-[75%]">
                        <h5 className=" font-Arvo text-sm truncate">
                            {cuisines?.join(", ")}
                        </h5>
                        <div className="flex items-center space-x-1">
                            <img
                                className="h-5 w-4 opacity-90"
                                src="https://www.clipartmax.com/png/small/207-2072371_or-combined-to-be-gigantic-location-icon-in-orange-color.png"
                                alt=""
                            />
                            <h5 className=" font-Arvo text-sm font-medium text-[#eeecec] space-y-[5px]">{areaName}</h5>
                        </div>
                    </div>
                    {/* <h5>{avgRating} stars</h5>
                    <h5>{costForTwo}</h5> */}
                </div>
                    
                <span>
                    <h4 className="font-Arvo text-sm ">{sla?.lastMileTravelString ?? '2.0 km'}</h4>
                    <h4 className="font-Arvo text-sm ">{costForTwo ?? '₹200 for two'}</h4>
                    {avgRating < 4 ? (
                    <h4 className="heading pt-0 pr-5 text-base w-12 h-6 bg-red-600 text-white font-medium rounded-md">
                      ⭐{avgRating}
                    </h4>
                  ) : (
                    <h4 className="heading pt-0 pr-5 text-base w-12 h-6 bg-green-600 text-white font-medium rounded-md">
                      ⭐{avgRating}
                    </h4>
                  )}
                </span>
            </div>
      </div>
    )
 };

export default Restrocard;