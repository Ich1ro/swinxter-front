import React, { useEffect, useState } from 'react'
import {FaStar} from "react-icons/fa";
import api from "../utils/api";
import Loading, { MidLoading } from '../components/M_used/Loading';


const WriteReview = ({productId, userInfo, setCommentRender, close, editComment}) => {
    const [rating,setRating] = useState(null);
    const [comment,setComment] = useState();
    const [starHover,setStarHover] = useState();
    const [loading,setLoading] = useState(0);

    useEffect(() => {
       if(editComment){
        setRating(editComment.rating);
        setComment(editComment.comment);
       }
    },[editComment])

    const postComment = async() => {
        setLoading(1);
        if(editComment){
          const id = editComment._id
          const config = {
            headers: {
              "Content-Type": "application/json",
            },
          };
          await api.put(`/clubs/comment/del`,{id, productId}, config);
        }
        const data = {
            productId: productId,
            userId: userInfo._id,
            comment: comment,
            rating: rating,
            userPhoto: userInfo.image,
            username: userInfo.username,
        }
        const config = {
            headers: {
              "Content-Type": "application/json",
            },
          };
        await api.post(`/clubs/comment`,data, config);
        setCommentRender();
        setLoading(0);
        close();
    } 

  return (
    <div className='w-screen h-screen fixed top-0 left-0 z-10 overscroll-none overflow-y-hidden flex justify-center items-center' style={{backgroundColor: "rgba(0,0,0,0.6)"}}>
        <div style={{borderRadius: "5px", backgroundColor: "#2A2D37", textAlign: "center", padding: "30px", boxShadow: "10px 10px 10px rgba(0,0,0,0.4)"}}>
            <h2 style={{fontSize: "24px", fontWeight: "600", color: "orange"}}>Write a review</h2>
            <p style={{marginTop:"10px"}}>Rate this business</p>
            <div className="rating_container">
              {
                [...Array(5)].map((star,index) => {
                  const currentRating = index + 1;
                  return(
                    <label>
                      <input 
                        type="radio"
                        name="rating"
                        value={currentRating}
                        onClick={() => {setRating(currentRating)}}
                      />
                      <FaStar 
                        className='rating_star' 
                        color={currentRating <= (starHover || rating) ? "#ffc107" : "#e4e5e9"} 
                        size={30}
                        onMouseEnter={() => {setStarHover(currentRating)}}
                        onMouseLeave={() => {setStarHover(null)}}
                        />
                    </label>
                  )
                })
              }
          </div>
            <textarea onChange={(e) => {setComment(e.target.value)}} placeholder='Write your thoughts here...' defaultValue={editComment?comment:null} style={{marginTop: "20px", width: "430px", height: "150px", borderRadius: "5px", padding: "10px", color: "#111"}}/>
            <div style={{display: "flex", justifyContent: "center", alignItems: "center", marginTop: "20px"}}>
            <p><span onClick={postComment} className="primary_btn cursor-pointer !text-sm !py-3 !px-10" style={{marginRight: "10px", cursor: "pointer"}}>{loading?<Loading />:"Post"}</span></p>
            <p style={{cursor: "pointer"}} onClick={close}>Cancel</p>
            </div>
        </div>
    </div>
  )
}

export default WriteReview