import React, { useState } from 'react'
import api from '../utils/api';
import { useSelector } from 'react-redux';

const MyMedia = () => {
    const {user} = useSelector((state)=>state.auth);
    const [userInfo,setUserInfo]=useState(user);

    return (
        <div className="home_page bg-black py-8 px-6 rounded-2xl">
          <div className="mb-20">
            <div className="flex justify-between flex-wrap gap-5 items-center mb-5 sm:mb-8">
              <h3  className="text-2xl sm:text-5xl leading-none font-bold">
                My Media
              </h3>
            </div>
            <div style={{display: "flex", flexWrap: "wrap"}}>    
                {userInfo?.mymedia?.length > 0 ? userInfo.mymedia.map((img,i) => 
                    <div style={{
                        padding: "10px",
                        borderRadius: "10px",
                        backgroundColor: "#2A2D37",
                        marginRight: "10px",
                    }} key={i}>
                        <img src={img} alt="" srcset="" style={{
                            width: "250px",
                            height: "200px",
                        }} />
                        <div style={{display: "flex", marginTop: "20px"}}>
                            <button
                            style={{marginRight: "10px"}}
                            className="primary_btn !py-1 !text-sm !leading-[28px] !px-1 w-full !text-[12px]"
                            // onClick={message}
                            >
                                Message
                            </button>  
                            <button
                            style={{marginLeft: "10px"}}
                            className="primary_btn !py-1 !text-sm !leading-[28px] !px-1 w-full !text-[12px]"
                            // onClick={message}
                            >
                                Message
                            </button>  
                        </div>
                    </div>)
                :null}
            </div>
          </div>
      </div>
      )
}

export default MyMedia