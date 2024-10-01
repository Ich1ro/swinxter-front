import React, { useEffect, useState } from 'react'
import "./comments.css";
import {FaStar} from "react-icons/fa";
import { IoMdSend } from 'react-icons/io';
import { IoMdClose } from "react-icons/io";
import api from '../../utils/api';
import { MdDelete } from "react-icons/md";
import { MdEdit } from "react-icons/md";


const Comments = ({productId, userInfo, product, setCommentRender,setEditComment,setWriteReview}) => {
    const [rating,setRating] = useState(null);
    const [comment,setComment] = useState();
    const [starHover,setStarHover] = useState();
    const [id,setId] = useState(null);

    const postComment = async() => {
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
    } 

    const deleteComment = async(id) => {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      await api.put(`/clubs/comment/del`,{id, productId}, config);
      setCommentRender();
    }
   

  return (
    <div className="my-5 w-full p-5 bg-light-grey rounded-lg">
          <p className="text-lg text-orange font-semibold mb-3">Comments</p>
          {/* <div className="rating_container">
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
                        size={20}
                        onMouseEnter={() => {setStarHover(currentRating)}}
                        onMouseLeave={() => {setStarHover(null)}}
                        />
                    </label>
                  )
                })
              }
          </div>
          <input type="text" placeholder="Write a comment" onChange={(e) => {setComment(e.target.value)}} id="comment_box"/>
          <button id="btn_post" onClick={postComment}><IoMdSend /></button> */}
          <div className='comments_container'>
          {
            product.comments && product.comments.sort((a,b) => (new Date(a.timestamp) < new Date(b.timestamp) ? 1: -1)).map((comment,i) => {
                return(
                    <div className="main_comment">
                        <div className="comment_head">
                            <div>
                            <img src="/images/boy-avatar.jpg" width="50px" height="50px"/>
                            </div>
                            <div>
                                <div className="rating_container">
                                    {
                                        [...Array(5)].map((star,index) => {
                                        const currentRating = index + 1;
                                        return(
                                            <FaStar 
                                                className='rating_star cm' 
                                                color={currentRating <= (comment.rating) ? "#ffc107" : "#e4e5e9"} 
                                                size={15}
                                            />
                                        )
                                        })
                                    }
                                </div>
                                <p className="comment_username">{comment.username}</p>
                                <div style={{position: "relative"}}>
                                    <p className="comment_text">{comment.comment}</p>
                                    { 
                                      comment.username === userInfo.username?
                                      <div style={{position: "absolute", top: "50%",right: "0", transform: "translate(100%,-50%)", display:"flex", justifyContent: "space-between", alignItems: "center" }}>
                                        <MdEdit style={{marginRight: "15px" ,fontSize: "20px", color: "#fff", cursor: "pointer"}} onClick={() => {setEditComment(comment);setWriteReview();}}/>
                                        <MdDelete style={{fontSize: "20px", color: "#fff", cursor: "pointer"}} onClick={() => {deleteComment(comment._id)}}/>
                                      </div>
                                      :null
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                )
            })
          }
          </div>
      </div>
  )
}

export default Comments