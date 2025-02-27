import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import api from '../utils/api';
import UserCard from '../components/Cards/UserCard';
import { Link, useLocation } from 'react-router-dom';
import { calculateDistance } from '../utils/utils';

const NearUsers = () => {
	const [users, setUsers] = useState([]);
	const { user } = useSelector(state => state.auth);
	const [userInfo, setUserInfo] = useState(user);
	const location = useLocation();

	console.log(location);

	const getRecentUsers = async () => {
		let userArr = [];
		const { data } = await api.get(
			`/near-users/${user.geometry.coordinates[0]}/${user.geometry.coordinates[1]}/35000000`
		);
		console.log(data);
		data?.map(d => {
			if (d._id !== userInfo._id && !userInfo.blockedby.includes(d._id)) {
				userArr.push(d);
			}
		});

		const sortedUsers = data
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
	};

	useEffect(() => {
		setUserInfo(user);
	}, [user?.payment?.membership]);

	useEffect(() => {
		getRecentUsers();
	}, []);

	console.log(user);

	if (location.pathname === '/home' && users.length === 0) {
		return null;
	}

	return (
		<>
			<div className='home_page bg-black py-8 px-6 rounded-2xl'>
				{userInfo?.payment?.membership ? (
					<div className='mb-20'>
						<div className='flex justify-between flex-wrap gap-5 items-center mb-5 sm:mb-8'>
							<h3 className='text-2xl sm:text-5xl leading-none font-bold'>
								Near Members
							</h3>
							{location.pathname === '/home' && (
								<Link
									to='/nearusers'
									className='primary_btn !text-sm sm:!text-xl'
								>
									View More
								</Link>
							)}
						</div>
						{location.pathname === '/home' ? (
							<div className='grid lg:grid-cols-2 xl:grid-cols-2 2xl:grid-cols-4 gap-6 main_users_grid'>
								{users.length > 0 &&
									users.slice(0, 4).map((user, i) => <UserCard key={i} userInfo={user} />)}
							</div>
						) : (
							<div className='grid sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 2xl:grid-cols-3 gap-6'>
								{users.length > 0 &&
									users.map((user, i) => <UserCard key={i} userInfo={user} />)}
							</div>
						)}
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
		</>
	);
};

export default NearUsers;
