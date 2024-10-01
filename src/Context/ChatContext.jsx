import { Children, createContext, useContext,useEffect, useState,useRef } from "react";
import { StreamChat } from "stream-chat";
import { Chat, useChatContext } from "stream-chat-react";
import { useSelector } from "react-redux";
import { MidLoading } from "../components/M_used/Loading";
import { useLocation, useNavigate } from "react-router-dom";
import { ZegoUIKitPrebuilt } from '@zegocloud/zego-uikit-prebuilt';
import { ZIM } from 'zego-zim-web';



export const ChatContext = createContext({});

const ChatContextProvider = ({children}) => {
    const {user} = useSelector
    ((state)=>state.auth);
    const [chatClient, setChatClient] = useState();
    const initChatCalled = useRef(false); // Ref to track if initChat has been called
    const [unread,setUnread] = useState();
    // const [zp,setZP] = useState(null);
    let zp;

    console.log(user._id)

    const initChat = async() => {
        if(!user || initChatCalled.current){
            return ;
        }
        initChatCalled.current = true;
        const client = StreamChat.getInstance("hxd9x3ag7hx3");

        await client.connectUser({
            id: user._id,
            name: user.username,
            image: user.image
        },user.stream_token);

        setUnread(client.user.total_unread_count);

        setChatClient(client);

        return () => {
            setChatClient(null); // ADD THIS LINE!
            chatClient.disconnectUser(); 
          }
    };

    useEffect(() => {
        if(user){
        initChat();
        }
    },[user])

    const startDMChatRoom = async (chatUser) => {
        const newChannel = chatClient.channel("messaging", {
            members: [user._id, chatUser._id]
        });
        await newChannel.watch();
    }

    const deleteChat = async (event) => {
        await event.destroy();
    }

    const value = {startDMChatRoom,setChatClient,unread, deleteChat,zp,chatClient}


    if(!chatClient){
        return(
            <MidLoading />
        )
    }

    return(
        <Chat client={chatClient} theme='str-chat__theme-dark'>
            <ChatContext.Provider value={value}>
                {children}
            </ChatContext.Provider>
        </Chat>
    )
}

export const useCustomChatContext = () => useContext(ChatContext);

export default ChatContextProvider;