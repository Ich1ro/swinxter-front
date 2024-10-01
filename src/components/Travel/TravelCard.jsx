import React, { useEffect, useState } from "react";
import api from "../../utils/api";

const TravelCard = ({ travel }) => {
  const [travelOwner, setTravelOwner] = useState("");
  const handleClick = () => {
    window.open(travel.website_url, "_blank");
  };

  useEffect(() => {
    getuserDetail();
  }, []);

  const getuserDetail = async () => {
    try {
      const { data } = await api.get(
        `/findOne/${travel.userId}`
      );
      if (data) {
        setTravelOwner(data.username);
      } else {
        console.log("Owner not Exist");
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div
      className="w-full cursor-pointer p-3 bg-light-grey rounded-2xl"
      onClick={handleClick}
    >
      <div>
        {/* <img
              src="images/fuck-buddies.png"
              alt="fuck-buddies"
           
            /> */}
        <img
          src={travel.image}
          className="w-full object-cover aspect-video rounded-t-2xl"
        />
      </div>
      <div className="grid sm:grid-cols-2 mt-4">
        <div className="flex flex-wrap 2xl:flex-nowrap gap-x-1 gap-y-2">
          <h3 className="text-base sm:text-lg leading-5 break-all">
            {travelOwner}
          </h3>
          <div className="flex flex-wrap gap-1">
            <span className="flex w-4 h-[14px] bg-white text-bright-orange text-[10px] justify-center items-center">
              {travel.min_age_range}
            </span>
            <span className="flex w-4 h-[14px] bg-white text-bright-orange text-[10px] justify-center items-center">
              {travel.max_age_range}
            </span>
          </div>
        </div>
        <p className="text-[10px] sm:justify-end flex items-center">
          <span className="px-1 inline-block text-lg">
            {travel.locationfrom}
          </span>
          {/* <span className="px-1 inline-block border-l border-white">  
                146 min
              </span> */}
        </p>
      </div>
      <p className="text-s font-body_font my-2 pb-2">
        {travel.locationto} | {travel.startDate} to {travel.endDate}
      </p>
      <p className="text-s font-body_font w-11/12">{travel.description}</p>
    </div>
  );
};

export default TravelCard;
