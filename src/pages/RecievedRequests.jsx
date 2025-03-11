import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import api from '../utils/api';
import FriendCard from '../components/Cards/FriendCard';
import { Link } from 'react-router-dom';
import { loadUser } from '../redux/actions/auth'

const RecievedRequests = ({ socket }) => {
	const [users, setUsers] = useState([]);
	const { user } = useSelector(state => state.auth);
	const [userInfo, setUserInfo] = useState(user);
	const [friends, setFriends] = useState([]);
	const dispatch = useDispatch();

	const getFriends = async () => {
		if (userInfo?.friend_requests.length > 0) {
			const { data } = await api.post(`/get-friends`, {
				friendIds: userInfo.friend_requests,
			});
			setFriends(data);
		}
	};

	useEffect(() => {
		dispatch(loadUser());
	}, []);

	useEffect(() => {
		setUserInfo(user)
	}, [user]);

	useEffect(() => {
		getFriends();
	}, [userInfo]);

	return (
		<div className='home_page bg-black py-8 px-6 rounded-2xl'>
			{user.payment?.membership ? (
				<>
					<div className='mb-20'>
						<div className='flex justify-between flex-wrap gap-5 items-center mb-5 sm:mb-8'>
							<h3 className='text-2xl sm:text-5xl leading-none font-bold'>
								Friend Requests
							</h3>
							{/* <Link to="/event-page" className="primary_btn !text-sm sm:!text-xl">
                      View More
                    </Link> */}
						</div>
						<div
							style={{ display: 'flex', flexWrap: 'wrap', marginTop: '50px' }}
						>
							{friends?.length > 0 ? (
								friends?.map((friend, i) => {
									return (
										<FriendCard
											data={friend}
											key={i}
											request={true}
											socket={socket}
										/>
									);
								})
							) : (
								<p>No friends requests yet !</p>
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

export default RecievedRequests;
