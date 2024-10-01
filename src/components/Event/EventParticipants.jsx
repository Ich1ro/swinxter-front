import React from "react";
import { BsChevronRight } from "react-icons/bs";
import { FaArrowLeft } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";

const EventParticipants = () => {
  const navigate = useNavigate()
  return (
    <div className="bg-black pt-0 sm:pt-8 py-8 px-6 rounded-2xl xl:rounded-r-none min-h-full">
      <span className="primary_btn cursor-pointer !text-sm !py-2 !px-3 !leading-none !py-3" onClick={()=>navigate(-1)}>
        <span className="text-sm inline-flex items-center mr-2"><FaArrowLeft /></span>Back
      </span>
      <div className="grid grid-cols-3 gap-5 mt-5">
        <div
          className="w-full cursor-pointer p-3 bg-light-grey rounded-2xl flex flex-wrap sm:grid grid-cols-2 items-stretch"
          //   onClick={() => handleClick(clubs._id)}
        >
          <div className="w-2/5 sm:w-full relative overflow-hidden">
            <img
              src="images/fuck-buddies.png"
              alt="event-img"
              className="w-full object-cover h-full absolute top-0 left-0 rounded-2xl"
            />
          </div>
          <div className="w-3/5 sm:w-full px-4 pr-6 grid content-between relative">
            <div className="">
              <h3 className="text-base sm:text-md sm:leading-5 break-all">
                BENJIBAYBEE
              </h3>
              <p className="my-2 text-sm text-[#0075ff]">36</p>
              <div className="flex w-full flex-wrap items-center gap-1">
                <img
                  src="images/Male.png"
                  alt="male-user"
                  className="h-[18px]"
                />
                <img src="images/Female.png" alt="woman" className="h-[18px]" />
                <img
                  src="images/malefemale.png"
                  alt="couple"
                  className="h-[15px]"
                />
                <img
                  src="images/malemale.png"
                  alt="couple"
                  className="h-[15px]"
                />
                <img
                  src="images/femaleFemale.png"
                  alt="couple"
                  className="h-[15px]"
                />
                <img src="images/Trans.png" alt="couple" className="h-[15px]" />
              </div>
              <div className="flex flex-wrap justify-between gap-x-3 gap-y-2 text-xs my-2 mt-4">
                <p className="flex items-center gap-1 font-light text-xs font-body_font">
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
                  Hesse, Ger..
                </p>
                352miles
              </div>
              <p>Hi i am text</p>
            </div>

            <span className="flex text-base absolute top-1/2 right-0 transform -translate-y-1/2">
              <BsChevronRight />
            </span>
          </div>
        </div>
        <div
          className="w-full cursor-pointer p-3 bg-light-grey rounded-2xl flex flex-wrap sm:grid grid-cols-2 items-stretch"
          //   onClick={() => handleClick(clubs._id)}
        >
          <div className="w-2/5 sm:w-full relative overflow-hidden">
            <img
              src="images/fuck-buddies.png"
              alt="event-img"
              className="w-full object-cover h-full absolute top-0 left-0 rounded-2xl"
            />
          </div>
          <div className="w-3/5 sm:w-full px-4 pr-6 grid content-between relative">
            <div className="">
              <h3 className="text-base sm:text-md sm:leading-5 break-all">
                Dummy User
              </h3>
              <p className="my-2 text-sm text-[#0075ff]">30</p>
              <div className="flex w-full flex-wrap items-center gap-1">
                <img
                  src="images/Male.png"
                  alt="male-user"
                  className="h-[18px]"
                />
                <img src="images/Female.png" alt="woman" className="h-[18px]" />
                <img
                  src="images/malefemale.png"
                  alt="couple"
                  className="h-[15px]"
                />
                <img src="images/Trans.png" alt="couple" className="h-[15px]" />
              </div>
              <div className="flex flex-wrap justify-between gap-x-3 gap-y-2 text-xs my-2 mt-4">
                <p className="flex items-center gap-1 font-light text-xs font-body_font">
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
                  Hesse, Gersss..
                </p>
                456miles
              </div>
              <p>Hi i am dummy text</p>
            </div>

            <span className="flex text-base absolute top-1/2 right-0 transform -translate-y-1/2">
              <BsChevronRight />
            </span>
          </div>
        </div>
      </div>
      
    </div>
  );
};

export default EventParticipants;
