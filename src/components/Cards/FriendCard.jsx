import React, { useEffect, useState } from 'react';
import './css/friendsCard.css';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import api from '../../utils/api';
import { useCustomChatContext } from '../../Context/ChatContext';
import { loadUser } from '../../redux/actions/auth';
import toast from 'react-hot-toast'

const FriendCard = ({ data, request, getFriends, socket }) => {
	const [users, setUsers] = useState([]);
	const { user } = useSelector(state => state.auth);
	const [userInfo, setUserInfo] = useState(user);
	const navigate = useNavigate();
	const params = useParams();
	const location = useLocation();
	const dispatch = useDispatch();

	const { startDMChatRoom } = useCustomChatContext();

	const handleViewProfile = e => {
		e.preventDefault();
		navigate(`/user-detail?id=${data._id}`);
	};

	const acceptReq = async () => {
		try {
			await api.put(`/accept_req/${userInfo._id}/${data?._id}`);
			window.location.reload();
		} catch (e) {
			console.log(e);
		}
	};

	const decline_req = async () => {
		toast((t) => (
			<div>
				<p style={{ marginBottom: '10px' }}>Are you sure you want to decline this friend request?</p>
				<div style={{ display: 'flex', justifyContent: 'flex-end', gap: '15px' }}>
					<button
						onClick={async () => {
							try {
								await api.put(`/decline_req/${userInfo._id}/${data?._id}`);
								socket?.emit('sendNotification', {
									senderName: user.username,
									senderId: user._id,
									recieverId: data._id,
									recieverName: data.username,
									message: `${user.username} declined your friend request`,
									type: 'friendRequest',
								});
								
								await api.post('/notifications', {
									senderId: user._id,
									recieverId: data._id,
									senderName: user.username,
									recieverName: data.username,
									type: 'friendRequest',
									message: `${user.username} declined your friend request`,
								});
								
								window.location.reload();
							} catch (e) {
								console.log(e);
							}
							toast.dismiss(t.id);
						}}
						style={{
							padding: '5px 10px',
							backgroundColor: '#b64a4a',
							color: '#fff',
							border: 'none',
							borderRadius: '4px',
							cursor: 'pointer',
						}}
					>
						Yes
					</button>
					<button
						onClick={() => toast.dismiss(t.id)}
						style={{
							padding: '5px 10px',
							backgroundColor: '#4caf50',
							color: '#fff',
							border: 'none',
							borderRadius: '4px',
							cursor: 'pointer',
						}}
					>
						No
					</button>
				</div>
			</div>
		), {
			duration: Infinity,
		});
		
	};

	const unlike = async () => {
		try {
			await api.post(`/remove-superlike`, {
				userId: userInfo._id,
				superlikeId: data._id,
			});
			window.location.reload();
		} catch (e) {
			console.log(e);
		}
	};

	const message = async () => {
		await startDMChatRoom(data);
		// navigate('/messaging');
	};

	useEffect(() => {
		console.log(location.pathname);
	}, [location]);

	return (
		<div className='card_wrapper'>
			<div className='friends_card_dp'>
				{data?.image ? (
					<img
						src={data?.image}
						alt='book-model'
						className='w-full h-full object-center object-cover aspect-[5/4] rounded-2xl main-image'
					/>
				) : data?.gender === 'male' ? (
					<img src='/images/boy-avatar.jpg' alt='boy' />
				) : data?.gender === 'female' ? (
					<img src='/images/girl-avatar.jpg' alt='girl' />
				) : (
					<img src='/images/trans avatar.png' alt='trans' />
				)}
			</div>
			<div className='friends_card'>
				<h1
					style={{
						fontSize: '20px',
						fontWeight: '600',
						display: 'flex',
						justifyContent: 'center',
					}}
				>
					{data.username}
				</h1>
				<div className='friends_card_actionbox'>
					<div
						className='flex justify-stretch gap-2 mt-3 event_card_button_wrap items-center'
						style={{ width: '200px', margin: '20px auto' }}
					>
						<button
							className='primary_btn !py-1 !text-sm !leading-[28px] !px-1 w-full !text-[12px]'
							onClick={handleViewProfile}
						>
							Profile
						</button>
						{location?.pathname !== '/my-recieved-likes' &&
						location?.pathname !== '/my-sent-likes' &&
						location?.pathname !== '/sent_request' ? (
							request ? (
								<button
									className='primary_btn !py-1 !text-sm !leading-[28px] !px-1 w-full !text-[12px]'
									onClick={acceptReq}
								>
									Accept
								</button>
							) : (
								<button
									className='primary_btn !py-1 !text-sm !leading-[28px] !px-1 w-full !text-[12px]'
									onClick={message}
								>
									Message
								</button>
							)
						) : (
							<></>
						)}
						{location?.pathname !== '/my-recieved-likes' &&
						location?.pathname !== '/my-sent-likes' &&
						location?.pathname !== '/sent_request' ? (
							request && (
								<button
									className='primary_btn !py-1 !text-sm !leading-[28px] !px-1 w-full !text-[12px]'
									onClick={decline_req}
								>
									Decline
								</button>
							)
						) : (
							<></>
						)}
						{location?.pathname === '/my-sent-likes' && (
							<button
								className='primary_btn !py-1 !text-sm !leading-[28px] !px-1 w-full !text-[12px]'
								onClick={unlike}
							>
								Unlike
							</button>
						)}
					</div>
				</div>
			</div>
		</div>
	);
};

export default FriendCard;
