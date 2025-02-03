import React, { useEffect, useState } from 'react';
import './css/friendsCard.css';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import api from '../../utils/api';
import { useCustomChatContext } from '../../Context/ChatContext';
import { loadUser } from '../../redux/actions/auth';

const FriendCard = ({ data, request, getFriends }) => {
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

	const unlike = async () => {
		try {
			await api
				.post(`/remove-superlike`, {
					userId: userInfo._id,
					superlikeId: data._id,
				})
				window.location.reload();
		} catch (e) {
			console.log(e);
		}
	};

	const message = async () => {
		startDMChatRoom(data);
		navigate('/messaging');
	};

	useEffect(() => {
		console.log(location.pathname);
	}, [location]);

	return (
		<div className='friends_card'>
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
						View Profile
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
	);
};

export default FriendCard;
