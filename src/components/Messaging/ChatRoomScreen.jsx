import React, { useContext, useState } from 'react'
import 'stream-chat-react/dist/css/v2/index.css';
import "./styles/chatRoomScreen.css";
import {
  Channel,
  ChannelHeader,
  MessageList,
  MessageInput,
  Thread,
  Window,
} from 'stream-chat-react';
// import { useChatContext } from '../../Context/ChatContext';
import { ZegoUIKitPrebuilt } from '@zegocloud/zego-uikit-prebuilt';
import { ZIM } from 'zego-zim-web';
import { MdCall } from "react-icons/md";
import { useSelector } from "react-redux";
import { useEffect } from 'react';
import api from '../../utils/api';
import { useChatContext } from 'stream-chat-react';
import { MdDelete } from "react-icons/md";



const ChatRoomScreen = () => {
  const {user} = useSelector((state)=>state.auth);
  const {channel} = useChatContext();
  let zp;

  const getTargetId = () => {
    if(channel){
    const members = channel.state.members;
    for (let userId in members) {
      const member = members[userId];
      if(member.user.id !== user._id){
        return member.user;
      }
    }
    }
  }

  async function generateToken(userID) {
    const token = await api.get(`/zego_token?userID=${userID}&expired_ts=7200`);
    return token.data;
  }

  const initVideo = async () => {
    if(!user){
        return ;
    }
    const  token   = await generateToken(user._id);
    const KitToken = ZegoUIKitPrebuilt.generateKitTokenForProduction(
      1687841660, 
      token,
      null,
      user._id,
      user.username
    );
    zp = ZegoUIKitPrebuilt.create(KitToken);
    zp.addPlugins({ ZIM });
    zp.setCallInvitationConfig({
      // The callback for the call invitation is accepted before joining the room (a room is used for making a call), which can be used to set up the room config. The Call Kit enables you to join the room automatically, and the room config adapts according to the specific call type (ZegoInvitationType).
      onSetRoomConfigBeforeJoining: (callType) => {
        return {
         // ...,
         showScreenSharingButton: false,
         showMyCameraToggleButton: false
         // ...
        }
      },
    })
  }

  useEffect(() => {
    initVideo();
  },[channel])

  const handleSend = async(callType) => {
    const targetUser = getTargetId();
    console.log(targetUser.id);
    const callee = {
      userID: targetUser.id,
      userName: targetUser.name,
    }
    if (!callee) {
      alert('userID cannot be empty!!');
      return;
    }
    // send call invitation
    zp.sendCallInvitation({
      callees: [callee],
      callType: callType,
      timeout: 60,
    })
      .then((res) => {
        console.warn(res);
        if (res.errorInvitees.length) {
          alert('The user dose not exist or is offline.');
        }
      })
      .catch((err) => {
        console.error(err);
      });
  }

  return (
    <div className='chatroomscreen'>
        <Channel>
          <Window>
            <div style={{position: "relative"}}>
            <button onClick={() => {handleSend(ZegoUIKitPrebuilt.InvitationTypeVoiceCall)}} style={{position: "absolute", top:"50%", right: "70px", zIndex: "999", transform: "translateY(-50%)"}}><MdCall style={{fontSize: "24px"}}/></button>
            <button onClick={() => {channel.delete()}}style={{position: "absolute", top:"50%", right: "30px", zIndex: "999", transform: "translateY(-50%)"}}><MdDelete style={{fontSize: "24px"}}/></button>
              <ChannelHeader />
            </div>
            <MessageList />
            <MessageInput />
          </Window>
        </Channel>
    </div>
  )
}

export default ChatRoomScreen