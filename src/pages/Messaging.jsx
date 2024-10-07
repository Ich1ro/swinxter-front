import React, { useEffect, useState } from 'react';
import ChatRooms from '../components/Messaging/ChatRooms';
import ChatRoomScreen from '../components/Messaging/ChatRoomScreen';
import ChatContextProvider from '../Context/ChatContext';
import 'stream-chat-react/dist/css/v2/index.css';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const Messaging = () => {
	const [userInfo, setUserInfo] = useState(null);
	const { user } = useSelector(state => state.auth);

	useEffect(() => {
		setUserInfo(user);
	}, [user?.payement?.membership]);

	if (userInfo?.payement?.membership) {
		return (
			<ChatContextProvider>
				<div
					className='home_page bg-black rounded-2xl flex'
					style={{ width: '100%', height: '700px', overflow: 'hidden' }}
				>
					<ChatRooms />
					<ChatRoomScreen />
				</div>
			</ChatContextProvider>
		);
	} else {
		return (
			<div
				className='home_page bg-black rounded-2xl flex'
				style={{
					width: '100%',
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
		);
	}
};

export default Messaging;
