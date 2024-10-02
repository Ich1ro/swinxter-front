import React from 'react';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import api from '../utils/api';
import { useEffect } from 'react';
import UserCard from '../components/Cards/UserCard';
import { Link } from 'react-router-dom';

const VisitedUser = () => {
	const [users, setUsers] = useState(null);
	const { user } = useSelector(state => state.auth);
	const [userInfo, setUserInfo] = useState(user || null);

	const getVisitedUsers = async () => {
		console.log(userInfo.visited);
		if (userInfo) {
			const { data } = await api.post(
				`/visited-users`,
				{ visitedUserIds: userInfo.visited },
				{ withCredentials: true }
			);
			setUsers(data);
		}
	};

	useEffect(() => {
		if (userInfo && userInfo.visited) {
			getVisitedUsers();
		}
	}, []);

	console.log(users);

	return (
		<div className='home_page bg-black py-8 px-6 rounded-2xl'>
			{user.payment?.membership ? (
				<div className='mb-20'>
					<div className='flex justify-between flex-wrap gap-5 items-center mb-5 sm:mb-8'>
						<h3 className='text-2xl sm:text-5xl leading-none font-bold'>
							Who viewed me
						</h3>
						{/* <Link to="/event-page" className="primary_btn !text-sm sm:!text-xl">
                View More
              </Link> */}
					</div>
					<div className='grid sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 2xl:grid-cols-4 gap-6'>
						{/* {event.slice(0, 6).map((el, i) => (
                <div className="h-full bg-light-grey rounded-2xl">
                <EventCard key={i} event={el} />
                </div>
              ))} */}
						{users ? (
							users.map((user, i) => (
								<div className='h-full bg-light-grey rounded-2xl'>
									<UserCard key={i} userInfo={user} />
								</div>
							))
						) : (
							<>No one visitors</>
						)}
					</div>
				</div>
			) : (
				<div
					style={{
						height: '400px',
						display: 'flex',
						justifyContent: 'center',
						alignItems: 'center',
						fontSize: '24px',
						flexDirection: 'column',
					}}
				>
					<h1 style={{ marginBottom: '30px' }}>
						You need to buy a membership to access the feature
					</h1>
					<Link to='/membership' className='primary_btn !text-sm sm:!text-xl'>
						Buy membership
					</Link>
				</div>
			)}
		</div>
	);
};

export default VisitedUser;
