import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import api from '../utils/api';
import UserCard from '../components/Cards/UserCard';
import { Link } from 'react-router-dom';

const NearUsers = () => {
	const [users, setUsers] = useState([]);
	const { user } = useSelector(state => state.auth);
	const [userInfo, setUserInfo] = useState(user);

	const getRecentUsers = async () => {
		let userArr = [];
		const { data } = await api.get(`/near-users/${user.geometry.coordinates[0]}/${user.geometry.coordinates[1]}`);
		console.log(data);
		data.map(d => {
			if (d._id !== userInfo._id && !userInfo.blockedby.includes(d._id)) {
				userArr.push(d);
			}
		});
		setUsers(userArr);
	};

	useEffect(() => {
		setUserInfo(user);
	}, [user?.payment?.membership]);

	useEffect(() => {
		getRecentUsers();
	}, []);

	console.log(user);

	return (
		<>
			<div className='home_page bg-black py-8 px-6 rounded-2xl'>
				{userInfo?.payment?.membership ? (
					<div className='mb-20'>
						<div className='flex justify-between flex-wrap gap-5 items-center mb-5 sm:mb-8'>
							<h3 className='text-2xl sm:text-5xl leading-none font-bold'>
								Near Members
							</h3>
						</div>
						<div style={{ display: 'flex', flexWrap: 'wrap' }}>
							{users.map((user, i) => (
								<UserCard key={i} userInfo={user} />
							))}
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
		</>
	);
};

export default NearUsers;
