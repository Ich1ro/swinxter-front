import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import api from '../utils/api';
import UserCard from '../components/Cards/UserCard';
import FriendCard from '../components/Cards/FriendCard';
import { Link } from 'react-router-dom';
import { loadUser } from '../redux/actions/auth'

const MyFriends = () => {
	const [users, setUsers] = useState([]);
	const { user } = useSelector(state => state.auth);
	const [userInfo, setUserInfo] = useState(user);
	const [friends, setFriends] = useState([]);
	const dispatch = useDispatch()

	const getFriends = async () => {
		if (user?.friends?.length > 0) {
			const { data } = await api.post(`/get-friends`, {
				friendIds: user.friends,
			});
			setFriends(data);
		}
	};

	useEffect(() => {
		dispatch(loadUser());
	}, []);

	useEffect(() => {
		getFriends();
	}, [user]);

	return (
		<div className='home_page bg-black py-8 px-6 rounded-2xl'>
			{user.payment?.membership ? (
				<>
					<div className='mb-20'>
						<div className='flex justify-between flex-wrap gap-5 items-center mb-5 sm:mb-8'>
							<h3 className='text-2xl sm:text-5xl leading-none font-bold'>
								My Friends
							</h3>
							{/* <Link to="/event-page" className="primary_btn !text-sm sm:!text-xl">
                View More
              </Link> */}
						</div>
						<div
							style={{ display: 'flex', flexWrap: 'wrap', marginTop: '50px' }}
						>
							{friends.length > 0 ? (
								friends?.map((friend, i) => {
									return <FriendCard data={friend} key={i} />;
								})
							) : (
								<p>No friends yet !</p>
							)}
						</div>
					</div>
				</>
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

export default MyFriends;
