import React,{useEffect, useState} from 'react'
import "./css/comments.css";
import { IoMdClose } from "react-icons/io";
import { IoMdSend } from "react-icons/io";
import api from '../../utils/api';

const Comments = ({comment, eventId, userInfo, eventInfo}) => {
    const [replyBox,setReplyBox] = useState(0);
    const [viewReplies,setViewReplies] = useState(0);
    const [reply,setReply] = useState("");
    const [replyRender,setReplyRender] = useState(0);
    const [replies,setReplies] = useState([]);

    useEffect(() => {
        filterReply();
    },[replyRender])

    const postReply = async() => {
        const data = {
            eventId: eventId,
            userId: userInfo._id,
            reply: reply,
            replyPhoto: userInfo.image,
            replyName: userInfo.username,
        }
        const config = {
            headers: {
              "Content-Type": "application/json",
            },
          };
        await api.post(`/events/reply`,data, config);
        setReplyBox(!replyRender);
    } 

    const filterReply = () => {
        const replies = eventInfo.replies;
        const filteredReplies = replies.filter(reply => reply.userId===comment.userId);
        setReplies(filteredReplies);

    }

  return (
    <div className="all_comments_container">
              <div className="main_comment">
                  <div className="comment_head">
                      <div>
                        <img src={comment.userPhoto} width="50px" height="50px"/>
                      </div>
                    <div>
                      <p className="comment_username">{comment.username}</p>
                      <div>
                        <p className="comment_text">{comment.comment}</p>
                          {
                            replyBox?<div className="replybox"> 
                                <IoMdClose onClick={() => {setReplyBox(0)}} style={{color: "#555", fontSize: "18px", marginRight: "5px",cursor: "pointer"}}/>
                                <input type="text" className="reply_textbox" onChange={(e) => {setReply(e.target.value)}}/>
                                <IoMdSend onClick={postReply}/>
                            </div>
                            :
                            <div style={{display: "flex", alignItems: "center"}}>
                              <p className="reply_btn" onClick={() => {setReplyBox(1)}}>Reply</p>
                              {
                                viewReplies?<p className="reply_btn" onClick={() => {setViewReplies(0)}}>Hide Replies</p>:<p className="reply_btn" onClick={() => {setViewReplies(1)}}>View Replies</p>
                              }
                            </div>
                          }
                      </div>
                      {
                        viewReplies?(
                            replies.length>0?
                            replies.map(reply => {
                                return (
                                    <div className="allreply_box">
                                    <div className="main_comment" style={{margin: "0 0"}}>
                                        <div className="comment_head">
                                            <div>
                                            <img src={reply.replyPhoto} width="50px" height="50px"/>
                                            </div>
                                        <div>
                                            <p className="comment_username">{reply.replyName}</p>
                                            <div>
                                            <p className="comment_text">{reply.reply}</p>
                                            </div>
                                        </div>
                                        </div>
                                    </div>
                                    </div>
                                )
                            }):<p style={{marginTop: "5px", color: "#999", fontSize: "14px"}}>No replies yet.</p>
                        )
                        :
                        null
                      }
                    </div>
                  </div>
              </div>
        </div>
  )
}

export default Comments