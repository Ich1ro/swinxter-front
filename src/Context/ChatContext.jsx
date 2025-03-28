import {
	Children,
	createContext,
	useContext,
	useEffect,
	useState,
	useRef,
} from 'react';
import { StreamChat } from 'stream-chat';
import { Chat, useChatContext } from 'stream-chat-react';
import { useSelector } from 'react-redux';
import { MidLoading } from '../components/M_used/Loading';
import { useLocation, useNavigate } from 'react-router-dom';
import { ZegoUIKitPrebuilt } from '@zegocloud/zego-uikit-prebuilt';
import { ZIM } from 'zego-zim-web';

export const ChatContext = createContext({});

const ChatContextProvider = ({ children }) => {
	const { user } = useSelector(state => state.auth);
	const [chatClient, setChatClient] = useState();
	const initChatCalled = useRef(false); // Ref to track if initChat has been called
	const [unread, setUnread] = useState();
	const navigate = useNavigate();
	const location = useLocation();
	const searchParams = new URLSearchParams(location.search);
	const chatId = searchParams.get('chatId');
	// const [activeChannel, setActiveChannel] = useState(null);
	// const [zp,setZP] = useState(null);
	const { client, setActiveChannel } = useChatContext();

	let zp;

	console.log(user._id);

	// useEffect(() => {
	// 	console.log('client', chatClient);
	// 	console.log('chatId', chatId);

	// 	if (!chatClient || !chatId) return;
	// 	const newChannel = chatClient.channel('messaging', chatId);
	// 	console.log('-----------------------------', newChannel);

	// 	newChannel.watch();
	// 	setActiveChannel(newChannel)
	// 	// .catch(error => console.error('Ошибка при загрузке канала:', error));
	// }, [chatClient, chatId]);

	const initChat = async () => {
		console.log('chatClient', chatClient);

		if (!user || initChatCalled.current) {
			return;
		}

		initChatCalled.current = true;

		try {
			if (chatClient && chatClient.userID === user._id) {
				console.log('User is already connected to chat. No need to reconnect.');
				return;
			}

			if (chatClient) {
				await chatClient.disconnectUser();
				setChatClient(null);
				console.log('logout success', chatClient);
			}

			const client = StreamChat.getInstance('hxd9x3ag7hx3');

			await client.connectUser(
				{
					id: user._id,
					name: user.username,
					image: user.image,
				},
				user.stream_token
			);

			setUnread(client.user.total_unread_count);
			setChatClient(client);
			console.log('User successfully connected to chat!', client.userID);
		} catch (error) {
			console.error('Error connecting user to chat:', error);
		}
	};

	useEffect(() => {
		if (user && !chatClient) {
			initChat();
		}
	}, [user, chatClient]);

	useEffect(() => {
		console.log('chatClient', chatClient);
		console.log('client', client);
	}, [chatClient, client]);

	const startDMChatRoom = async chatUser => {
		const newChannel = chatClient.channel('messaging', {
			members: [user._id, chatUser._id],
		});
		// setActiveChannel(newChannel);
		await newChannel.create();

		await newChannel.watch();
		// setChatClient(prev => ({
		// 	...prev,
		// 	activeChannel: newChannel,
		// }));
		console.log('newChannel.id', newChannel.id);
		
		navigate(`/messaging/${newChannel.id}`);
	};

	const deleteChat = async event => {
		await event.destroy();
	};

	const value = {
		startDMChatRoom,
		setChatClient,
		// activeChannel,
		unread,
		deleteChat,
		zp,
		chatClient,
	};

	return (
		<>
			{chatClient ? (
				<Chat client={chatClient} theme='str-chat__theme-dark'>
					<ChatContext.Provider value={value}>{children}</ChatContext.Provider>
				</Chat>
			) : (
				<MidLoading />
			)}
		</>
	);
};

export const useCustomChatContext = () => useContext(ChatContext);

export default ChatContextProvider;
