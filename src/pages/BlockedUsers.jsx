import React, { useEffect, useState } from 'react'
import BlockCard from '../components/Cards/BlockCard'
import { useSelector } from 'react-redux';
import api from '../utils/api';

const BlockedUsers = () => {
    const [users,setUsers] = useState([]);
    const {user} = useSelector((state)=>state.auth);
    const [userInfo,setUserInfo]=useState(user);
    const [blockedUsers,setBlockedUsers] = useState([]);

    const getBlockedUsers = async () => {
        const currentUser = await api.get(`/user_details/${userInfo._id}`);
        console.log(currentUser.data);
        currentUser.data.blocked_users.map(async ele => {
          const { data } = await api.get(`/user_details/${ele}`);
          setBlockedUsers([...blockedUsers,data])
        })
    }

    useEffect(() => {
      getBlockedUsers()
    },[])

  return (
    <div className="home_page bg-black py-8 px-6 rounded-2xl">
    <div className="mb-20">
      <div className="flex justify-between flex-wrap gap-5 items-center mb-5 sm:mb-8">
        <h3 className="text-2xl sm:text-5xl leading-none font-bold">
          Blocked Users
        </h3>
      </div>
      <div style={{display: "flex", flexWrap: "wrap", marginTop: "60px"}}>
      {
            blockedUsers.length > 0 ?
          (
            blockedUsers?.map((user,i) => {
              return(
                <BlockCard data={user} key={i}/>
              )
            })
          ):<p>No blocked users yet !</p>}
      </div>
    </div>
  </div>
  )
}

export default BlockedUsers