import React, { useEffect } from "react";
import { useContext } from "react";
import { BsChevronRight } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import { getPreciseDistance } from "geolib";
import { Context } from "../../Context/context";

const ClubCard = ({ clubs }) => {
  const {savedCred} = useContext(Context);
  const navigate = useNavigate();
  const handleClick = (id) => {
    navigate(`/club-detail/${id}`);
  };

  const dateString = clubs.createdAt;
  const dateObj = new Date(dateString);

  const options = {
    year: "numeric",
    month: "short",
    day: "numeric",
  };


  const calculatePreciseDistance = (fLong,sLong,fLat,sLat) => {
    var pdis = getPreciseDistance(
      { latitude: Number(fLat), longitude: Number(fLong) },
      { latitude: Number(sLat), longitude: Number(sLong) }
    );
    const factor = 0.621371
    return ((pdis/100) * factor).toFixed(2);
  };
  const formattedDate = dateObj.toLocaleDateString("en-US", options);


  return (
    <div className="h-full bg-light-grey rounded-2xl grid content-between ctm_card">
    <div className="w-full cursor-pointer">
    <img
      src={clubs.mainImage}
      alt="event-img"
      className="w-full object-cover aspect-11/10 rounded-t-2xl"
      onClick={() => handleClick(clubs._id)}
    />
    <div className="bg-light-grey p-4 pb-0 rounded-b-2xl grid content-between gap-1">
      <div>
    <h3 className="text-2xl font-semibold">{clubs.clubname}</h3>
      <div className="grid gap-1">
      <p className="text-sm">
      {clubs?.clubtype === 'Public Place' ? (
        <span className="text-red-500">{clubs?.clubtype} </span>
      ) : (
      <span className="text-green-500">{clubs?.clubtype} </span>
       )}
        <span className="text-white-2 font-body_font">by {clubs.owner_name}</span>
      </p>
      <div className="flex flex-wrap justify-between gap-y-2 text-sm -mx-2">
      <p className="flex w-[65%] items-start gap-1 font-light text-sm font-body_font px-2">
       <span className="w-40px">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="15"
            height="16"
            viewBox="0 0 18 19"
            fill="none"
          >
            <mask
              id="mask0_47_207"
              style={{ maskType: "luminance" }}
              maskUnits="userSpaceOnUse"
              x="0"
              y="0"
              width="15"
              height="16"
            >
              <path d="M0 0.5H18V18.5H0V0.5Z" fill="white" />
            </mask>
            <g mask="url(#mask0_47_207)">
              <path
                d="M9 17.9727C6.89063 14.8086 3.19922 10.5195 3.19922 6.82812C3.19922 3.62957 5.80145 1.02734 9 1.02734C12.1986 1.02734 14.8008 3.62957 14.8008 6.82812C14.8008 10.5195 11.1094 14.8086 9 17.9727Z"
                stroke="white"
                stroke-miterlimit="10"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M9 9.46484C7.54618 9.46484 6.36328 8.28194 6.36328 6.82812C6.36328 5.37431 7.54618 4.19141 9 4.19141C10.4538 4.19141 11.6367 5.37431 11.6367 6.82812C11.6367 8.28194 10.4538 9.46484 9 9.46484Z"
                stroke="white"
                stroke-miterlimit="10"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </g>
          </svg>
          </span>
         {clubs?.location?.display_name<=30?<span>     {clubs?.location?.display_name}</span>:<span>     {clubs?.location?.display_name?.slice(0,10)}...</span>}
     
        </p>
        <p className="w-[35%] px-2">{ calculatePreciseDistance(clubs?.location?.lon,savedCred.long,clubs?.location?.lat,savedCred.lat).slice(0,3)}miles</p>

        
      </div>
      <div className="my-2 w-full  bg-light-grey rounded-lg">
      
          <p className="text-base font-body_font">
{clubs?.introduction?.length<=50?<span>{clubs?.introduction}</span>:<span>{clubs?.introduction?.slice(0,50)}...</span>
 }
             </p>
        </div>
      
       
      </div>
      </div>
      
    </div>
  </div>
  <div className="grid justify-stretch gap-2 event_card_button_wrap items-start p-4">
        {/* {userInfo._id !== event.userId ? (
          hasUserJoined || isJoined ? (
            <button
              className="primary_btn !py-1 !text-sm !leading-[28px]"
              disabled
            >
              Joined
            </button>
          ) : (
            <button
              className="primary_btn !py-1 !text-sm !leading-[28px]"
              onClick={() => handleJoinEvent(event._id)}
            >
              Join Now
            </button>
          )
        ) : (
          ""
        )} */}
        {/* {userInfo._id !== event.userId ? (
          event.type == "Public Event" ? (
            hasUserJoined || isJoined ? (
              <button
                className="primary_btn !py-1 !text-sm !leading-[28px] !px-1 w-full !text-[12px]"
                // onClick={() => handleJoinEvent(event._id)}
                disabled
              >
                Joined
              </button>
            ) : (
              <button
                className="primary_btn !py-1 !text-sm !leading-[28px] !px-1 w-full !text-[12px]"
                onClick={() => handleJoinEvent(event._id)}
              >
                Join Now
              </button>
            )
          ) : event.type == "Private Event" ? (
            hasUserPending || isJoined ? (
              <button
                className="primary_btn !py-1 !text-sm !leading-[28px] !px-1 w-full !text-[12px]"
                onClick={() => handleJoinEvent(event._id)}
              >
                Request Sent
              </button>
            ) : hasUserJoined ? (
              <button
                className="primary_btn !py-1 !text-sm !leading-[28px] !px-1 w-full !text-[12px]"
                // onClick={() => handleJoinEvent(event._id)}
                disabled
              >
                Joined
              </button>
            ) : (
              <button
                className="primary_btn !py-1 !text-sm !leading-[28px] !px-1 w-full !text-[12px]"
                // onClick={() => handleJoinEvent(event._id)}
              >
                Send Join Request
              </button>
            )
          ) : (
            ""
          )
        ) : (
          ""
        )} */}
        <button
          className="primary_btn !py-1 !text-[12px] !leading-[28px] w-full"
          onClick={() => handleClick(clubs._id)}
        >
          View Details
        </button>
        
      </div>
  </div>
  );
};

export default ClubCard;
