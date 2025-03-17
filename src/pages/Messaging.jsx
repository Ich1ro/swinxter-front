import React, { useEffect, useState } from 'react';
import ChatRooms from '../components/Messaging/ChatRooms';
import ChatRoomScreen from '../components/Messaging/ChatRoomScreen';
import ChatContextProvider, {
	useCustomChatContext,
} from '../Context/ChatContext';
import 'stream-chat-react/dist/css/v2/index.css';
import { useSelector } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
import { useChatContext } from 'stream-chat-react';

const Messaging = () => {
	const [userInfo, setUserInfo] = useState(null);
	const { user } = useSelector(state => state.auth);
	const location = useLocation();
	const searchParams = new URLSearchParams(location.search);
	const chatId = searchParams.get('chatId');

	useEffect(() => {
		setUserInfo(user);
	}, [user?.payment?.membership]);

	// useEffect(() => {
	// 	console.log('client', chatClient);
	// 	console.log('chatId', chatId);

	// 	if (!chatClient || !chatId) return;
	// 	const newChannel = chatClient.channel('messaging', chatId);

	// 	newChannel
	// 		.watch()
	// 		.then(() => setActiveChannel(newChannel))
	// 		.catch(error => console.error('Ошибка при загрузке канала:', error));
	// }, [chatClient, chatId]);

	if (userInfo?.payment?.membership) {
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
