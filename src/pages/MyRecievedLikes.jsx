import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import api from '../utils/api';
import FriendCard from '../components/Cards/FriendCard';
import { Link } from 'react-router-dom';
const MyRecievedLikes = () => {
	const [users, setUsers] = useState([]);
	const { user } = useSelector(state => state.auth);
	const [userInfo, setUserInfo] = useState(user);
	const [friends, setFriends] = useState([]);
	console.log(user);

	const getFriends = async () => {
		if (user?.superlike?.recieved.length > 0) {
			const { data } = await api.post(`/get-friends`, {
				friendIds: user?.superlike?.recieved,
			});
			setFriends(data);
		}
		// const currentUser = await api.get(`/user_details/${user._id}`);
		// currentUser.data.sent_requests.map(async ele => {
		// 	console.log(ele);
		// 	if (ele && ele !== 'undefined') {
		// 		const { data } = await api.get(`/user_details/${ele}`);
		// 		setFriends(prev => {
		// 			const isAlreadyFriend = prev.some(friend => friend._id === data._id);

		// 			if (!isAlreadyFriend) {
		// 				return [...prev, data];
		// 			}

		// 			return prev;
		// 		});
		// 	}
		// });
	};

	useEffect(() => {
		getFriends();
	}, []);

	return (
		<div className='home_page bg-black py-8 px-6 rounded-2xl'>
			{user.payment?.membership ? (
				<>
					<div className='mb-20'>
						<div className='flex justify-between flex-wrap gap-5 items-center mb-5 sm:mb-8'>
							<h3 className='text-2xl sm:text-5xl leading-none font-bold'>
								Recieved Likes
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
									return <FriendCard data={friend} key={i} request={false} />;
								})
							) : (
								<p>No likes recieved yet !</p>
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

export default MyRecievedLikes;
