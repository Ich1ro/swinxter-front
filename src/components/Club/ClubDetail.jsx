import axios from "axios";
import { getPreciseDistance } from "geolib";
import React, { useContext, useEffect, useState } from "react";
import { MdOutlineModeEditOutline } from "react-icons/md";
import {
  RiDeleteBin6Line,
} from "react-icons/ri";
import { SlLocationPin } from "react-icons/sl";
import { useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Rating } from 'react-simple-star-rating';
import { toast } from "react-toastify";
import { Context } from "../../Context/context";
import api from "../../utils/api";
import { FaArrowLeft } from "react-icons/fa6";
import Comments from "../Comments/Comments";
import { IoMdSend } from "react-icons/io";
import { FaStar } from "react-icons/fa";
import WriteReview from "../../pages/WriteReview";

const ClubDetail = () => {
  const [clubData, setClubData] = useState({});
  const {savedCred } = useContext(Context);
  const BASE_URL = process.env.REACT_APP_BASE_URL;
  const [toggleRequest, setToggleRequest] = useState(false);
const [popup,setPopup]=useState(false)
const [load,setLoad]=useState(false)
const [rating, setRating] = useState(null)
const[edit,setEdit]=useState(false)
const [desc,setdesc]= useState("")
  const navigate = useNavigate();
  const[reviewId,setReviewId]=useState(null)
  const data = useParams()
  const clubid = data.id
  const calculatePreciseDistance = (fLong, sLong, fLat, sLat) => {
    var pdis = getPreciseDistance(
      { latitude: Number(fLat), longitude: Number(fLong) },
      { latitude: Number(sLat), longitude: Number(sLong) }
    );
    const factor = 0.621371;
    return ((pdis / 100) * factor).toFixed(2);
  };
const {user} = useSelector((state)=>state.auth);
const [userInfo,setUserInfo]=useState(user);
const [commentRender,setCommentRender] = useState(true);
const [writeReview, setWriteReview] = useState(0);
const [editComment, setEditComment] = useState(null);

useEffect(()=>{
  setUserInfo(user)
},[])


  const getClub = async () => {
    const { data } = await axios.get(`${BASE_URL}/api/getClub/${clubid}`);
    setClubData(data);
    
  };

  useEffect(() => {
    getClub();
  }, [popup,load,commentRender]);
  const handleSave = async () => {
     
    }

  const deleteclub = async(e) => {
   await api.delete(`/delete_club/${e}`).then((res) => {
      // console.log(res);
      if (res.data === "Club deleted successfully") {
        toast.success("Club deleted successfully");
        navigate("/club-page");
      }
    });
  };

  const postComment = async (e) => {
    // e.preventDefault();
    // const config = {
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    // };
    // const data = {
    //   userId: userInfo._id,
    //   eventId: eventInfo._id,
    //   username: userInfo.username,
    //   userPhoto: userInfo.image,
    //   comment: comment,
    // }
    // const req = await api.post('/events/comment', data, config);
    // setCommentRender(!commentRender);
  }
  
  console.log(clubData);

  return (
    <div className="bg-black pt-0 sm:pt-8 py-8 px-6 rounded-2xl xl:rounded-r-none min-h-full">
      {
        writeReview?<WriteReview  productId={clubData._id} userInfo={userInfo} setCommentRender={() => {setCommentRender(!commentRender)}} close={() => {setWriteReview(0)}} editComment={editComment}/>:null
      }
      <span className="primary_btn cursor-pointer !text-sm !py-2 !px-3 !leading-none !py-3" onClick={()=>navigate(-1)}>
        <span className="text-sm inline-flex items-center mr-2"><FaArrowLeft /></span>Back
      </span>
      <div className="flex justify-between items-center max-w-7xl">
        <h3 className="clipped_text bg-gradient-to-r from-orange to-red-500 bg-clip-text text-base sm:text-3xl md:text-5xl font-bold mb-5 pt-5">
          Club Details
        </h3>
        <div className="flex flex-wrap gap-4 justify-end">

          <span onClick={() => {setWriteReview(1)}} className="primary_btn cursor-pointer !text-sm !py-2">
            Write a review
          </span>
          <span className="primary_btn cursor-pointer !text-sm !py-2">
            Messages
          </span>
        </div>
      </div>
      <div className="flex flex-wrap items-stretch max-w-7xl">
        <div className="w-full md:w-[45%] p-5 bg-light-grey rounded-2xl">
          <img
            src={clubData?.mainImage}
            alt=""
            className="w-full aspect-4/3 rounded-2xl object-cover border-[3px] border-white"
          />
        </div>
        <div className="w-full md:w-[55%] md:pl-10 mt-5 md:mt-0">
          <div className="text-white h-full bg-light-grey rounded-2xl ">
            <div className="p-5">
              <div className="flex items-center justify-between gap-5 mb-4">
                <h3 className="text-2xl sm:text-4xl font-semibold">
                  {clubData?.clubname}
                </h3>


                {clubData?.ownerId?._id === userInfo._id &&

                  <div className="flex gap-2">
                    <Link
                      className="inline-flex items-center text-2xl"
                      to={`/editclubpage/${clubData._id}`}
                    >
                      <MdOutlineModeEditOutline />
                    </Link>
                    <div
                      className="inline-flex items-center text-2xl"

                      onClick={() => deleteclub(clubData._id)}
                    >
                      <RiDeleteBin6Line />
                    </div>
                  </div>
                }

              </div>

              <div className="flex items-center text-sm font-body_font my-4">
                <span className="flex items-center text-lg mr-3">
                  <SlLocationPin />
                </span>

                {clubData?.location?.display_name}
              </div>

              <div className="my-4">
                <p className="text-lg text-orange font-semibold">Distance</p>
                {calculatePreciseDistance(
                  clubData?.location?.lon,
                  savedCred.long,
                  clubData?.location?.lat,
                  savedCred.lat
                ).slice(0, 3)}  miles
              </div>

              <div>
                <p className="text-lg font-semibold pb-2 border-b border-white">
                  INFORMATION
                </p>

                <p className="text-base my-2">

                  {clubData?.clubtype === "Public Place" ? (
                    <span className="text-red-500">{clubData?.clubtype} </span>
                  ) : (
                    <span className="text-green-500">{clubData?.clubtype} </span>
                  )}
                  <span className="font-body_font">
                    by : {clubData.ownerId?.username}

                  </span>
                </p>
                <div className="text-base my-2">
                  <span >Introduction</span> : <span className="font-body_font" dangerouslySetInnerHTML={{ __html: clubData?.introduction?.replace(/\n/g, '<br />') }}>
             
                  </span>
                </div>

                <div className="text-base my-2">
                  <span >Contact</span> : <span className="font-body_font">
                    {clubData?.contact}
                  </span>
                </div>

                <div className="text-base my-2">
                  <span >Email</span> : <span className="font-body_font">
                    {clubData?.email}
                  </span>
                </div>
                {/* <div className="text-base my-2">
                  <span >Website</span> : <span className="font-body_font">
                    {clubData?.website}
                  </span>
                </div> */}
              </div>
            </div>
          </div>
        </div>
        <div className="mt-5">
          <ul className="flex flex-wrap text-sm font-medium text-center text-gray-500 dark:text-gray-400">
            <li className="mr-2">
              <span
                className={`inline-block px-2 py-3 rounded-lg  cursor-pointer hover:bg-gray-100  ${!toggleRequest ? "bg-orange" : "hover:text-orange"
                  }`}
                aria-current="page"
                onClick={() =>
                  navigate("/club-detail-media", {
                    state: {
                      photos: clubData?.image,
                      vidoes: clubData?.video,
                    },
                  })
                }
              >
                Photos & Videos
              </span>
            </li>

          </ul>
        </div>
        <div className="my-5 w-full p-5 bg-light-grey rounded-lg">
          <p className="text-lg text-orange font-semibold mb-3">DESCRIPTION</p>
          <p className="text-base font-body_font" dangerouslySetInnerHTML={{ __html: clubData?.description?.replace(/\n/g, '<br />') }}></p>
           
        </div>
        </div>
        <Comments productId={clubData._id} userInfo={userInfo} product={clubData} setCommentRender={() => {setCommentRender(!commentRender)}} setEditComment={(id) => {setEditComment(id)}} setWriteReview={() => {setWriteReview(true)}}/>
    </div>
  );
};
export default ClubDetail;
