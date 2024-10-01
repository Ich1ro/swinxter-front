import React from "react";
import { FaArrowLeft } from "react-icons/fa6";

import { useNavigate,useLocation } from "react-router-dom";







export default function ClubDetailMedia(){

    const { state } = useLocation();
const navigate = useNavigate();

  return (
    <div className="bg-black pt-0 sm:pt-8 py-8 px-6 rounded-2xl xl:rounded-r-none min-h-full">
        <div className="mb-5">
      <span className="primary_btn cursor-pointer !text-sm !py-2 !px-3 !leading-none !py-3" onClick={()=>navigate(-1)}>
        <span className="text-sm inline-flex items-center mr-2"><FaArrowLeft /></span>Back
      </span>
        <h3 className="clipped_text bg-gradient-to-r from-orange to-red-500 bg-clip-text text-base sm:text-3xl md:text-5xl font-bold mt-5">
          Photos
        </h3>
      </div>
      <div className="flex flex-wrap items-stretch max-w-7xl">
        <div className="grid grid-cols-4 gap-1 p-1 bg-light-grey w-full">
            {state.photos.map((img)=>(
            <div className="img_media">
                <img src={img} alt="" className="aspect-square w-full object-cover" />
            </div>
            ))}
        </div>
      </div>
      <h3 className="clipped_text bg-gradient-to-r from-orange to-red-500 bg-clip-text text-base sm:text-3xl md:text-5xl font-bold mb-5 pt-5">
        Videos
      </h3>
      <div className="flex flex-wrap items-stretch max-w-7xl">
        <div className="grid grid-cols-4 gap-1 p-1 bg-light-grey w-full">
            {state.vidoes.map((vidoes)=>(
            <div className="img_media">
                <video src={vidoes} controls className="aspect-square w-full object-cover"></video>
            </div>
            ))}
        </div>
      </div>
    </div>
  );
};

