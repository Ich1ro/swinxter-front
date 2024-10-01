import React, {useEffect, useState} from 'react'
import { useSelector } from "react-redux";
import api from '../utils/api'
import UserCard from '../components/Cards/UserCard';
import { IoSearchOutline } from "react-icons/io5";

const AllUsers = () => {
    const [users,setUsers] = useState([]);
    const {user} = useSelector((state)=>state.auth);
    const [userInfo,setUserInfo]=useState(user);
    const [search,setSearch] = useState("");

    const handleSearch = (e) => {
        setSearch(e.target.value);
    }

    const getAllUsers = async () => {
        let userArr = [];
        const { data } = await api.get(`/users`);
        data.map(d => {
            if(d._id!== userInfo._id && !userInfo.blockedby.includes(d._id)) {
                userArr.push(d);
            }
        })
        setUsers(userArr);
    }

    useEffect(() => {
        getAllUsers();
    },[])

    let filteredUsers = users.filter(user => {return user.username.includes(search)});

  return (
    <div className="home_page bg-black py-8 px-6 rounded-2xl">
      <div className="mb-20">
        <div className="mb-5 sm:mb-8">
            <div className="relative text-white ">
                <span className="absolute top-1/2 left-5 transform -translate-y-1/2 text-2xl flex items-center">
                <IoSearchOutline />
                </span>
                <input
                type="search"
                className="outline-none border-none w-full px-5 pl-16 h-14 bg-light-grey rounded-xl"
                onChange={handleSearch}
                />
            </div>
        </div>
        <div style={{display: "flex", flexWrap: "wrap"}}>
            {
                filteredUsers.map((user,i) => (
                    <UserCard key={i} userInfo={user}/>
                ))
            }
        </div>
      </div>
  </div>
  )
}

export default AllUsers