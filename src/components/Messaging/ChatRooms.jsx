import React, { useContext, useEffect, useState } from 'react';
import { ChatContext, useCustomChatContext } from '../../Context/ChatContext';
import './styles/chatRoom.css';
import {
	ChannelList,
	ChannelListMessenger,
	getChannel,
	useChannelListContext,
	useChatContext,
} from 'stream-chat-react';
import FriendsList from './FriendsList';
import { MdAddComment } from 'react-icons/md';
import { IoArrowBackSharp } from 'react-icons/io5';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';

const DEFAULT_CHANNEL_ID = 'messaging';
const DEFAULT_CHANNEL_TYPE = 'messaging';

const List = props => {
	const { chatId } = useParams();
	const navigate = useNavigate();
	const { client, channel, setActiveChannel } = useChatContext();
	const { setChannels } = useChannelListContext();

	useEffect(() => {
		// if (!chatId) return navigate(`/${DEFAULT_CHANNEL_ID}`);
		if (chatId) {
			if (channel?.id === chatId || !client) return;
			let subscription;
			if (!channel?.id || channel?.id !== chatId) {
				subscription = client.on('channels.queried', event => {
					const loadedChannelData = event.queriedChannels?.channels.find(
						response => response.channel.id === chatId
					);
          	console.log('loadedChannelData', loadedChannelData);
          
					if (loadedChannelData) {
						setActiveChannel(client.channel(DEFAULT_CHANNEL_TYPE, chatId));
						subscription?.unsubscribe();
						return;
					}
					return getChannel({
						client,
						id: chatId,
						type: DEFAULT_CHANNEL_TYPE,
					}).then(newActiveChannel => {
						setActiveChannel(newActiveChannel);
						setChannels(channels => {
							return [
								newActiveChannel,
								...channels.filter(
									ch => ch.data?.cid !== newActiveChannel.data?.cid
								),
							];
						});
					});
				});
			}
			return () => {
				subscription?.unsubscribe();
			};
		}
	}, [channel?.id, chatId, setChannels, client, navigate, setActiveChannel]);

	useEffect(() => {
		console.log(channel);
		console.log(chatId);
	}, [channel?.id, chatId, setChannels, client, navigate, setActiveChannel]);
	return <ChannelListMessenger {...props} />;
};

const ChatRooms = () => {
	const options = { state: true, presence: true, watcher: true };
	const sort = { last_message_at: -1 };
	const [friends, setFriends] = useState(0);
	const { deleteChat } = useCustomChatContext();
	const { user } = useSelector(state => state.auth);

	useEffect(() => {
		console.log(friends);
	}, [friends]);

	return (
		<div className='chatroom'>
			<div className='chatroom_header'>
				<h1>Messages</h1>
				{friends ? (
					<IoArrowBackSharp
						onClick={() => {
							setFriends(0);
						}}
						style={{ cursor: 'pointer' }}
					/>
				) : (
					<MdAddComment
						onClick={() => {
							setFriends(1);
						}}
						style={{ cursor: 'pointer' }}
					/>
				)}
			</div>
			{friends ? (
				<FriendsList
					back={() => {
						setFriends(0);
					}}
				/>
			) : (
				<ChannelList
					filters={{ members: { $in: [user._id] } }}
					showChannelSearch={true}
					options={options}
					setActiveChannelOnMount={false}
					List={List}
				/>
			)}
		</div>
	);
};

export default ChatRooms;
