import React, { useEffect, useState } from 'react'
import { useSelector } from "react-redux";
import api from '../utils/api'
import UserCard from '../components/Cards/UserCard';
import { calculateDistance } from '../utils/utils'


const RecentUser = () => {
    const [users,setUsers] = useState([]);
    const {user} = useSelector((state)=>state.auth);
    const [userInfo,setUserInfo]=useState(user);

    const getRecentUsers = async () => {
        let userArr = [];
        const { data } = await api.get(`/recent_users`);
        data.users.map(d => {
          if(d._id!== userInfo._id && !userInfo.blockedby.includes(d._id)) {
                userArr.push(d);
            }
        })
        const sortedUsers = data.users
              .filter(
                d => d._id !== userInfo._id && !userInfo.blockedby.includes(d._id)
              )
              .map(user => {
                if (user.geometry?.coordinates && userInfo.geometry?.coordinates) {
                  const distance = calculateDistance(
                    userInfo.geometry.coordinates[0],
                    user.geometry.coordinates[0],
                    userInfo.geometry.coordinates[1],
                    user.geometry.coordinates[1]
                  );
                  return { ...user, distance };
                }
                return { ...user, distance: null };
              })
              .sort((a, b) => {
                if (a.distance === null) return 1;
                if (b.distance === null) return -1;
                return a.distance - b.distance;
              });
            console.log(sortedUsers);
        setUsers(sortedUsers);
    }

    useEffect(() => {
        getRecentUsers();
    },[])

  return (
    <div className="home_page bg-black py-8 px-6 rounded-2xl">
      <div className="mb-20">
        <div className="flex justify-between flex-wrap gap-5 items-center mb-5 sm:mb-8">
        <h3 className="text-2xl sm:text-5xl leading-none font-bold">
            New Members
          </h3>
        </div>
        <div className='grid sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 2xl:grid-cols-3 gap-6'>
           {
            users.map((user,i) => (
                <UserCard key={i} userInfo={user}/>
            ))
          }
        </div>
      </div>
  </div>
  )
}

export default RecentUser