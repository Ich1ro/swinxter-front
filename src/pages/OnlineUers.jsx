import React from 'react';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import api from '../utils/api';
import { useEffect } from 'react';
import UserCard from '../components/Cards/UserCard';
import { Link, useLocation } from 'react-router-dom';

const OnlineUers = () => {
	const [users, setUsers] = useState([]);
	const { user } = useSelector(state => state.auth);
	const [userInfo, setUserInfo] = useState(user);
	const location = useLocation();

	const getVisitedUsers = async () => {
		let userArr = [];
		const { data } = await api.get(`/active_users`, { withCredentials: true });
		data.users.map(d => {
			if (d._id !== userInfo._id && !userInfo.blockedby.includes(d._id)) {
				userArr.push(d);
			}
		});
		setUsers(userArr);
	};

	useEffect(() => {
		getVisitedUsers();
	}, []);

	console.log(users);

  if (location.pathname === '/home' && users.length === 0) {
		return null;
	}

	return (
		<div className='home_page bg-black py-8 px-6 rounded-2xl'>
			{/* {userInfo?.payment?.membership ? ( */}
			<div className='mb-20'>
				<div className='flex justify-between flex-wrap gap-5 items-center mb-5 sm:mb-8'>
					<h3 className='text-2xl sm:text-5xl leading-none font-bold'>
						Online Users
					</h3>
					{location.pathname === '/home' && (
						<Link
							to='/onlineusers'
							className='primary_btn !text-sm sm:!text-xl'
						>
							View More
						</Link>
					)}
				</div>
				{location.pathname === '/home' ? (
					<div className='grid sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 2xl:grid-cols-4 gap-6'>
						{users.map((user, i) => (
							<UserCard key={i} userInfo={user} />
						))}
					</div>
				) : (
					<div className='grid sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 2xl:grid-cols-3 gap-6'>
						{users.map((user, i) => (
							<UserCard key={i} userInfo={user} />
						))}
					</div>
				)}
			</div>
			{/* // ) : (
      //   <div
      //     style={{
      //       height: '400px',
      //       display: 'flex',
      //       justifyContent: 'center',
      //       alignItems: 'center',
      //       fontSize: '24px',
      //       flexDirection: 'column',
      //     }}
      //   >
      //     <h1 style={{ marginBottom: '30px' }}>
      //       You need to buy a membership to access the feature
      //     </h1>
      //     <Link to='/membership' className='primary_btn !text-sm sm:!text-xl'>
      //       Buy membership
      //     </Link>
      //   </div>
      // )} */}
		</div>
	);
};

export default OnlineUers;
