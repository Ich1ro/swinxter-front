import { React } from "react";
import { GrStar } from "react-icons/gr";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { calculateAge } from "../../utils/CalculateAge";

const TravelCard2 = ({ travel }) => {
  const [age, setAge] = useState("");
  const [age2,setage2]=useState("");
  const navigate = useNavigate();

  const handleTravel = (id) => {
    navigate(`/user-detail?id=${id}`)
  };

  const formatDate = (dateString) => {
    const originalTimestamp = dateString;
    const date = new Date(originalTimestamp);
    const formattedDate = `${date.getUTCDate()}/${date.getUTCMonth() + 1}/${date.getUTCFullYear()}`;
    return formattedDate;
  };
  
  useEffect(() => {
    if (travel?.userId?.profile_type === "single") {
      setAge(calculateAge(travel?.userId?.DOB));
    } else {
      setAge(calculateAge(travel?.userId?.couple?.person1.DOB));
      setage2(calculateAge(travel?.userId?.couple?.person2.DOB));
    }
  }, [travel]);

  return (
    <div
      className="w-full cursor-pointer p-3 bg-light-grey rounded-2xl flex flex-wrap sm:grid grid-cols-2"
      onClick={()=>handleTravel(travel?.userId?._id)}
    >
      <div className="w-2/5 sm:w-full">
     

        <img
          className="w-full object-cover h-full aspect-11/10 rounded-2xl"
          src={travel.image}
          // onClick={()=>handleTravel(travel._id)}
        />
      </div>
      <div className="w-3/5 sm:w-full px-4 pr-0 grid content-between relative gap-2">
        <div className="flex items-center gap-1 text-xs">
          <p className="flex items-center gap-1">
            <span className="flex text-light-yellow">
              <GrStar />
            </span>
          </p>
          <p className="text-[12px] font-medium text-bright-orange">
            {travel.name}
          </p>
        </div>
        <div className="flex justify-between items-center">
          <div className="text-[12px] gap-1 flex items-center">
            {/* {userInfo.gender === "male" ?<span className="text-navy-blue">{travel.age}</span>:<span className="text-pink-400">{travel.age}</span>} */}
            
            {travel?.userId?.profile_type === "single" ? (
    <div className="text-[12px] gap-1 flex items-center">
      <span className={travel?.userId?.gender === "male" ? "text-[#3A97FE]" : travel?.userId?.gender === "female"? "text-[#FF2A90]":"text-[#cf00cf]"}>
        {age}
      </span>
    </div>
  ) : (
    <div className="text-[12px] gap-1 flex items-center">
      <span className={travel?.userId?.couple?.person1?.gender === "male" ? "text-[#3A97FE]" :travel?.userId?.couple?.person1?.gender === "female"? "text-[#FF2A90]":"text-[#cf00cf]"}>
        {age} 
      </span>
   |
      <span className={travel?.userId?.couple?.person2?.gender === "male" ? "text-[#3A97FE]" :travel?.userId?.couple?.person2?.gender === "female"? "text-[#FF2A90]":"text-[#cf00cf]"}>
        {age2} 
      </span>
    </div>
  )}
        
          </div>
          <div className="flex flex-wrap gap-1">
            <span className="w-4 h-4 flex items-center justify-center rounded-full bg-white p-1">
              <img
                src="images/desk_icon.png"
                alt="desk_icon"
                className="max-w-full"
              />
            </span>
            {/* <span className="w-4 h-4 flex items-center justify-center rounded-full bg-white p-1">
              <img
                src="images/mob_icon.png"
                alt="mob_icon"
                className="max-w-full"
              />
            </span>
            <span className="w-4 h-4 flex items-center justify-center rounded-full bg-white p-1">
              <img
                src="images/cal_icon.png"
                alt="cal_icon"
                className="max-w-full"
              />
            </span> */}
          </div>
        </div>
        <div className="flex w-[75%] flex-wrap items-center gap-1">
            {travel?.interested?.includes("M") ? (
              <img src="images/Male.png" alt="male-user" className="h-[18px]"/>
            ) : (
              ""
            )}
            {travel?.interested?.includes("F") ? (
              <img src="images/Female.png" alt="woman" className="h-[18px]" />
            ) : (
              ""
            )}
            {travel?.interested?.includes("MF") ? (
              <img src="images/malefemale.png" alt="couple" className="h-[15px]"  />
            ) : (
              ""
            )}
                {travel?.interested?.includes("MM") ? (
              <img src="images/malemale.png" alt="couple"  className="h-[15px]" />
            ) : (
              ""
            )}
                 {travel?.interested?.includes("FF") ? (
              <img src="images/femaleFemale.png" alt="couple"  className="h-[15px]"  />
            ) : (
              ""
            )}
                     {travel?.interested?.includes("T") ? (
              <img src="images/Trans.png" alt="couple"  className="h-[15px]"  />
            ) : (
              ""
            )}
          </div>
        <div>
          <p className="text-[12px] flex items-center">
            <span className="inline-flex items-center pr-1 font-body_font">
              {/* <img src="images/loc-icon.png" alt="Location-icon" /> */}
              {/* Delhi, IND */}
              {/* {travel.locationfrom} */}
            </span>
            <span className="px-1 inline-block border-l border-white">
              {/* 146 min */}
            </span>
          </p>
        </div>
        <div className="flex text-[12px] flex-wrap gap-1 leading">
        <img src="images/loc-icon.png" alt="Location-icon" />
        {travel?.locationto?.display_name?.length<=20 ?
         <span className="font-body_font">{travel?.locationto?.display_name}</span> :
         <span className="font-body_font">{travel?.locationto?.display_name?.slice(0,17)}...</span>
        }
         {/* <span className="font-body_font">{travel.locationto.display_name}</span> */}
          {/* { calculatePreciseDistance(travel?.location?.lon,savedCred.long,travel?.location?.lat,savedCred.lat).slice(0,3)}miles */}
          {/* <span>14min</span> */}
          {/* <span>|</span> */}
          <span className="font-body_font">
          {formatDate(travel.startDate)} to {formatDate(travel.endDate)}
          </span>
        </div>
        <p className="text-sm"><span className="text-orange">Resort:</span>{" "}{travel.resort}</p>
        <p className="travel_desc text-sm font-body_font text-[#FF0000]">{travel.description}</p>
      </div>
    </div>
  );
};

export default TravelCard2;
