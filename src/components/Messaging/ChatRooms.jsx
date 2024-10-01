import React,{useContext, useEffect, useState} from 'react'
import { ChatContext, useCustomChatContext } from '../../Context/ChatContext'
import "./styles/chatRoom.css"
import { ChannelList } from 'stream-chat-react'
import FriendsList from './FriendsList'
import { MdAddComment } from "react-icons/md";
import { IoArrowBackSharp } from "react-icons/io5";
import { useSelector } from "react-redux";

const ChatRooms = () => {
  const options = { state: true, presence: true, watcher: true};
  const sort = { last_message_at: -1 };
  const [friends,setFriends] = useState(0);
  const {deleteChat} = useCustomChatContext();
  const {user} = useSelector
  ((state)=>state.auth);

  return (
    <div className='chatroom'>
      <div className='chatroom_header'>
          <h1>Chats</h1>
          {
            friends?
            <IoArrowBackSharp onClick={() => {setFriends(0)}} style={{cursor: "pointer"}}/>
            :
            <MdAddComment onClick={() => {setFriends(1)}} style={{cursor: "pointer"}}/>
          }
      </div>
      {
        friends?<FriendsList back={() => {setFriends(0)}}/>
        :
        <ChannelList filters={{members: { $in: [user._id] }}} showChannelSearch={true} options={options} setActiveChannelOnMount={true} />
      }
    </div>
  )
}

export default ChatRooms