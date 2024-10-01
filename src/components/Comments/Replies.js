import React, {useState} from 'react'
import { IoMdSend } from 'react-icons/io';
import { IoMdClose } from "react-icons/io";

const Replies = () => {
    const [replyBox,setReplyBox] = useState(0);
    const [viewReplies,setViewReplies] = useState(0);
    const [reply,setReply] = useState("");
    const [replyRender,setReplyRender] = useState(0);
    const [replies,setReplies] = useState([]);
  return (
    <div>
        {
        replyBox?
            <div className="replybox"> 
                <IoMdClose onClick={() => {setReplyBox(0)}} style={{color: "#555", fontSize: "18px", marginRight: "5px",cursor: "pointer"}}/>
                <input type="text" className="reply_textbox" onChange={(e) => {setReply(e.target.value)}}/>
                <IoMdSend onClick={null}/>
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
    
  )
}

export default Replies