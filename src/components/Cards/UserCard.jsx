import React from 'react'
import "./css/userCard.css"
import { useNavigate } from "react-router-dom";


const UserCard = ({userInfo}) => {
  // console.log(userInfo);
  
  const navigate = useNavigate();
  return (
    <div className="user_card" style={{marginRight: "20px"}} onClick={() => {navigate(`/user-detail?id=${userInfo._id}`)}}>
      <div className='user_photo'>
      {userInfo?.profile_type==="couple"?
        <img src={userInfo?.image?userInfo?.image:"/images/couple-avatar.jpg"} alt="" srcset=""/>
      :
      <img
          src={userInfo?.image?userInfo?.image: userInfo?.gender==="male" ? "/images/boy-avatar.jpg"  :userInfo?.gender==="female" ? "/images/girl-avatar.jpg"  : "/images/trans avatar.png"}
          className="hidden aspect-square object-cover xl:block"
          alt="" srcset=""
        />
      }
      </div>
      <div className='user_details'>
        <p>{userInfo.username}</p>
        <p>{23}</p>
        {userInfo?.profile_type==="couple" ? 
          <img src='images/malefemale.png' alt="" srcset=""/> 
          : 
          <img
          src={userInfo?.gender==="male" ? "/images/Male.png" : userInfo?.gender==="female" ? "/images/Female.png"  : "/images/Trans.png"}
          alt="" srcset=""
          />
        }
        <p style={{fontSize: "14px"}}>In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to demonstrate the visual form of a document or a typeface without relying on meaningful content. Lorem ipsum may be used as a placeholder before final copy is available.</p>
      </div>
    </div>
  )
}

export default UserCard