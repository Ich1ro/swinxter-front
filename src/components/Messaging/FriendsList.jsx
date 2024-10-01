import React, {useState, useEffect} from 'react'
import "./styles/friendsList.css";
import { useSelector } from "react-redux";
import api from '../../utils/api';
import { IoArrowBackSharp } from "react-icons/io5";
import { useCustomChatContext } from '../../Context/ChatContext';



const FriendsList = ({back}) => {
    const {user} = useSelector((state)=>state.auth);
    const [userInfo,setUserInfo]=useState(user);
    const [friends,setFriends] = useState([]);
    const {startDMChatRoom} = useCustomChatContext();

    const getFriends = async () => {
        userInfo.friends.map(async ele => {
          const { data } = await api.get(`/user_details/${ele}`);
          setFriends([...friends,data])
        })
    }

    useEffect(() => {
      getFriends()
    },[userInfo])

  return (
    <div className='friendList'>
        <div className='friend_list'>
            {
                user.friends.length < 1? <p>You have no friends yet !</p>:
                <ul>
                    {
                        friends.map((d,i) => {
                            return(
                                <li onClick={() => {startDMChatRoom(d); back()}}>
                                    <span>
                                        <img src={d.image} />
                                    </span>
                                    {d.username}
                                </li>            
                            )
                        })
                    }
                </ul>
            }
        </div>
    </div>
  )
}

export default FriendsList