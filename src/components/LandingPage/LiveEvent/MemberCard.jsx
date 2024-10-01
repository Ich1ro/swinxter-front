import React from "react";

const MemberCard = () => {
  return (
    <div className="cursor-pointer">
      <div className="relative">
        <img
          src="landingPage/images/broadcast-card-img.png"
          alt="broadcast-card-img"
          className="w-full object-cover object-center aspect-2/3 rounded-t-xl"
        />
        <div className="absolute bottom-0 left-0 p-2 flex items-center gap-1 text-black">
          <span className="w-6 h-6 rounded-full bg-black flex items-center justify-center">
            <img
              src="landingPage/images/view-icon.png"
              alt="view-icon"
              className="w-3"
            />
          </span>
          <p>10</p>
        </div>
      </div>
      <div className="bg-white text-black p-3 pb-5 rounded-b-xl">
        <h3 className="text-lg mb-1">EvansShell</h3>
        <div className="flex flex-wrap gap-x-5 gap-y-2 text-sm">
          <span>22 F</span>
          <span>East Tallassee, AL</span>
        </div>
      </div>
    </div>
  );
};

export default MemberCard;
