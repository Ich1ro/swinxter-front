import React,{useState} from 'react'
import "./css/friendsCard.css";
import { useSelector } from "react-redux";
import { useNavigate } from 'react-router-dom';
import api from '../../utils/api';
import { useCustomChatContext } from '../../Context/ChatContext';

const FriendCard = ({data,request}) => {
  const [users,setUsers] = useState([]);
  const {user} = useSelector((state)=>state.auth);
  const [userInfo,setUserInfo]=useState(user);
  const navigate = useNavigate();
  const {startDMChatRoom} = useCustomChatContext();

  const handleViewProfile = (e) => {
    e.preventDefault();
    navigate(`/user-detail?id=${data._id}`)
  }

  const acceptReq = async () => {
    try{
      await api.put(`/accept_req/${userInfo._id}/${data?._id}`);
      window.location.reload();
    }
    catch(e){
      console.log(e);
    }

  }
  
  const message = async () => {
    startDMChatRoom(data);
    navigate("/messaging");
  }

  return (
    <div className='friends_card'>
        <div className='friends_card_dp'>
        {data?.image?
          <img
            src={data?.image}
            alt="book-model"
            className="w-full h-full object-center object-cover aspect-[5/4] rounded-2xl"
          />:(data?.gender==="male"?(<img src="/images/boy-avatar.jpg" alt="boy" />):data?.gender==="female"? (<img src="/images/girl-avatar.jpg" alt="girl"  />):(<img src="/images/trans avatar.png" alt="trans"  />))
        }
        </div>
        <h1 style={{fontSize: "20px", fontWeight: "600", display: "flex", justifyContent: "center", marginTop: "50px"}}>{data.username}</h1>  
        <div className='friends_card_actionbox'>
        <div className="grid justify-stretch gap-2 mt-3 event_card_button_wrap items-start" style={{width: "200px", margin: "20px auto"}}>
                <button
                  className="primary_btn !py-1 !text-sm !leading-[28px] !px-1 w-full !text-[12px]"
                  onClick={handleViewProfile}
                >
                  View Profile
                </button>
                {
                  request?<button className="primary_btn !py-1 !text-sm !leading-[28px] !px-1 w-full !text-[12px]" onClick={acceptReq}>Accept</button>  
                  :
                  <button
                    className="primary_btn !py-1 !text-sm !leading-[28px] !px-1 w-full !text-[12px]"
                    onClick={message}
                  >
                    Message
                  </button>     
                }
          </div>
        </div>
    </div>
  )
}

export default FriendCard