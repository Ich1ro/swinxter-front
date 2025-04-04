import React, { useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';
import { AiFillDislike, AiFillLike } from 'react-icons/ai';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useCustomChatContext } from '../Context/ChatContext';
import Loading from '../components/M_used/Loading';
import { loadUser } from '../redux/actions/auth';
import { calculateAge } from '../utils/CalculateAge';
import api from '../utils/api';
import CoupleDetailPage from './CoupleDetailPage';
import FriendCard from '../components/Cards/FriendCard';
import TravelCard2 from '../components/Travel/TravelCard2';
import './styles/verify.css';

const UserDetailPage = ({ socket }) => {
	const [age, setAge] = useState('');
	const [age2, setage2] = useState('');
	const { user } = useSelector(state => state.auth);
	const [currentUser, setCurrentUser] = useState();
	const [userInfo, setUserInfo] = useState();
	const location = useLocation();
	const navigate = useNavigate();
	const [sent, setSent] = useState(0);
	const [loading, setLoading] = useState(0);
	const { startDMChatRoom } = useCustomChatContext();
	const [blocked, setBlocked] = useState(0);
	const [isPasswordCorrect, setIsPasswordCorrect] = useState(false);
	const [isProfile, setIsProfile] = useState(true);
	const dispatch = useDispatch();
	const [friends, setFriends] = useState([]);
	const [situationships, setSituationships] = useState([]);
	const [isFriendsOpen, setIsFriendsOpen] = useState(false);
	const [showPopup, setShowPopup] = useState(false);

	const getUser = async () => {
		const currentUser = await api.get(`/user_details/${user._id}`);
		setCurrentUser(currentUser.data);
		const id = location.search.split('=')[1];
		const { data } = await api.get(`/user_details/${id}`);
		setUserInfo(data);
		if (user.sent_requests.includes(data._id)) {
			setSent(1);
		} else {
			setSent(0);
		}

		if (currentUser.data._id !== data._id) {
			await api.post(`/add_visitor/${id}`, { visitorId: currentUser.data._id });
		}
	};

	const getFriends = async () => {
		const { data } = await api.post(`/get-friends`, {
			friendIds: userInfo.friends,
		});
		setFriends(data);
	};

	const getSituationships = async () => {
		const { data } = await api.get(
			`/situationships_by_user_id/${userInfo?._id}`
		);
		setSituationships(data);
	};

	console.log(currentUser);

	useEffect(() => {
		if (location.search.length > 0) {
			getUser();
		} else {
			setUserInfo(user);
		}
	}, [location.search]);

	useEffect(() => {
		window.scrollTo(0, 0);
	}, [location.search]);

	useEffect(() => {
		if (userInfo) {
			getFriends();
			getSituationships();
		}
	}, [userInfo]);

	console.log(userInfo);

	useEffect(() => {
		if (userInfo?.profile_type === 'single') {
			setAge(calculateAge(userInfo?.DOB));
		} else {
			setAge(calculateAge(userInfo?.couple?.person1.DOB));
			setage2(calculateAge(userInfo?.couple?.person2.DOB));
		}
		if (currentUser?.blocked_users.includes(userInfo?._id)) {
			setBlocked(1);
		}
	}, [currentUser, userInfo]);

	const message = async () => {
		await startDMChatRoom(userInfo);
		// navigate('/messaging');
	};

	console.log(location.search);

	const handleRemove = async () => {
		toast(
			t => (
				<div>
					<p style={{ marginBottom: '10px' }}>
						Are you sure you want to remove this friend?
					</p>
					<div
						style={{ display: 'flex', justifyContent: 'flex-end', gap: '15px' }}
					>
						<button
							onClick={async () => {
								try {
									await api.put(`/remove_friend/${user?._id}/${userInfo?._id}`);
									navigate('/my_friends');
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
			),
			{
				duration: Infinity,
			}
		);
	};

	// const handleSendRequest = async () => {
	// 	try {
	// 		setLoading(1);
	// 		await api.put(`/send_request/${user?._id}/${userInfo?._id}`);
	// 		socket.emit('sendNotification', {
	// 			senderName: user.username,
	// 			senderId: user._id,
	// 			recieverId: userInfo._id,
	// 			recieverName: userInfo.username,
	// 			message: `${user.username} sent you a friend request`,
	// 			type: 'friendRequest',
	// 		});
	// 		const res = await api.post('/notifications', {
	// 			senderId: user._id,
	// 			recieverId: userInfo._id,
	// 			senderName: user.username,
	// 			recieverName: userInfo.username,
	// 			type: 'friendRequest',
	// 			message: `${user.username} sent you a friend request`,
	// 		});
	// 		console.log(res);
	// 		setLoading(0);
	// 		setSent(1);
	// 	} catch (e) {
	// 		console.log(e);
	// 	}
	// };

	const handleSendRequest = () => {
		const promise = new Promise(async (resolve, reject) => {
			try {
				setLoading(1);

				await api.put(`/send_request/${user?._id}/${userInfo?._id}`);

				socket.emit('sendNotification', {
					senderName: user.username,
					senderId: user._id,
					recieverId: userInfo._id,
					recieverName: userInfo.username,
					message: `${user.username} sent you a friend request`,
					type: 'friendRequest',
				});

				const res = await api.post('/notifications', {
					senderId: user._id,
					recieverId: userInfo._id,
					senderName: user.username,
					recieverName: userInfo.username,
					type: 'friendRequest',
					message: `${user.username} sent you a friend request`,
				});

				setLoading(0);
				setSent(1);
				resolve(res);
			} catch (error) {
				setLoading(0);
				reject(error);
			}
		});

		toast.promise(promise, {
			loading: 'Sending friend request...',
			success: 'Friend request sent successfully!',
			error: 'Error when sending a request!',
		});
	};

	const handleCancelRequest = async () => {
		const promise = new Promise(async (resolve, reject) => {
			try {
				setLoading(1);

				await api.put(`/cancel_request/${user?._id}/${userInfo?._id}`);
				setLoading(0);
				setSent(0);
				resolve();
			} catch (error) {
				setLoading(0);
				reject(error);
			}
		});

		toast.promise(promise, {
			loading: 'Canceling friend request...',
			success: 'Friend request canceled successfully!',
			error: 'Error when canceling the request!',
		});
	};

	const blockUser = async () => {
		try {
			setLoading(1);
			const response = await api.post('/blockuser', {
				userId: user._id,
				blockId: userInfo._id,
			});
			setLoading(0);

			if (
				response.status === 200 &&
				response.data.blocked_users.includes(userInfo._id)
			) {
				setBlocked(1);
			} else {
				setBlocked(0);
			}
		} catch (e) {
			console.log(e);
			setLoading(0);
		}
	};

	const superlike = async () => {
		console.log('clicked');
		let currentDate = Date.now();

		if (user?.superlike?.sent?.some(obj => obj?.userId === userInfo?._id)) {
			toast.error("You've already liked this user");
			return;
		}

		const superlikeData = {
			userId: user?._id,
			superlikeId: userInfo?._id,
			cooldown: Date.now(),
		};

		const notificationData = {
			senderId: user?._id,
			recieverId: userInfo?._id,
			senderName: user?.username,
			recieverName: userInfo?.username,
			message: `${user?.username} sent you a like`,
			type: 'superlike',
		};

		toast.promise(
			(async () => {
				await api.post('/superlike', superlikeData);

				socket.emit('sendNotification', notificationData);

				await api.post('/notifications', notificationData);

				await dispatch(loadUser());
			})(),
			{
				loading: 'Sending like...',
				success: `${userInfo?.username} has been liked successfully.`,
				error: 'Failed to send like, please try again.',
			}
		);
	};

	const unlike = async () => {
		try {
			toast.promise(
				(async () => {
					await api.post(`/remove-superlike`, {
						userId: user?._id,
						superlikeId: userInfo?._id,
					});
					await dispatch(loadUser());
				})(),
				{
					loading: 'Unliking...',
					success: `${userInfo?.username} has been unliked successfully.`,
					error: 'Failed to unlike, please try again.',
				}
			);
			// window.location.reload();
		} catch (e) {
			console.log(e);
		}
	};

	const RenderedStyle = {
		color: `${
			userInfo?.gender === 'male'
				? '#3A97FE'
				: userInfo?.gender === 'female'
				? '#FF2A90'
				: '#cf00cf'
		}`,
	};

	const handlePasswordSubmit = e => {
		e.preventDefault();

		console.log(e.target.pass.value);
		const pass = e.target.pass.value;

		if (pass === userInfo.privatePassword) {
			setIsPasswordCorrect(true);
		} else {
			toast.error('Incorrect password');
		}
	};

	return (
		<>
			{showPopup && (
				<div className='popup-overlay'>
					<div className='popup-content'>
						<h2>Verify Your Identity – Secure Your Membership</h2>
						<p>
							To keep our community safe and authentic, we require a one-time
							identity verification. This simple process helps prevent fraud and
							ensures a trusted environment for all members.
						</p>
						<div>
							🔒 <b>Verification Fee:</b> single member: $7 couples: $9 ($4.50
							per each)
						</div>
						<b>Why Verify?</b>
						<div className='popup-info'>
							<div>
								✅ Get <b>one extra month</b> of membership for free!
							</div>
							<div>
								✅ Pay the <b>standard membership fee</b>—unverified members pay
								<b>double</b>.
							</div>
							<div>
								✅ Enjoy a more <b>secure and trustworthy</b> platform.
							</div>
						</div>
						<div>
							This verification is handled by an{' '}
							<b>accredited third-party provider</b>, and we <b>never</b> store
							or share your personal data. Our only goal is to create a safe and
							enjoyable experience for everyone.
						</div>
						{user?.profile_type === 'couple' ? (
							<div className='button-wrapper'>
								{!user?.couple?.person1?.isVerify && (
									<button
										onClick={() =>
											navigate(`/verification`, {
												replace: true,
												state: 'person1',
											})
										}
										disabled={user?.couple?.person1?.isVerify}
										className='ok-button'
									>
										{`Verify person 1`}
									</button>
								)}
								{!user?.couple?.person2?.isVerify && (
									<button
										onClick={() =>
											navigate(`/verification`, {
												replace: true,
												state: 'person2',
											})
										}
										disabled={user?.couple?.person2?.isVerify}
										className='ok-button'
									>
										{`Verify person 2`}
									</button>
								)}

								<button
									onClick={() => setShowPopup(false)}
									className='cancel-button'
								>
									Cancel
								</button>
							</div>
						) : (
							<div className='button-wrapper'>
								<button
									onClick={() =>
										navigate(`/verification`, {
											replace: true,
											state: 'single',
										})
									}
									className='ok-button'
								>
									OK
								</button>
								<button
									onClick={() => setShowPopup(false)}
									className='cancel-button'
								>
									Cancel
								</button>
							</div>
						)}
					</div>
				</div>
			)}
			{userInfo?.profile_type === 'single' ? (
				<div className='bg-black-20'>
					<div className='min-h-[130px] md:min-h-[130px] flex justify-center items-end bg-black rounded-b-50px'></div>
					<div className='pt-10 container px-5 mx-auto'>
						<div className='flex flex-wrap items-stretch bg-black rounded-2xl max-w-5xl mx-auto'>
							<div className='w-full sm:w-2/5 md:w-1/5'>
								{userInfo?.image ? (
									<img
										src={userInfo?.image}
										alt='book-model'
										className='w-full h-full object-center object-cover aspect-[5/4] rounded-2xl main-image'
									/>
								) : userInfo?.gender === 'male' ? (
									<img src='/images/boy-avatar.jpg' alt='boy' />
								) : userInfo?.gender === 'female' ? (
									<img src='/images/girl-avatar.jpg' alt='girl' />
								) : (
									<img src='/images/trans avatar.png' alt='trans' />
								)}
							</div>
							<div className='w-full sm:w-3/5 md:w-4/5 border-b-2 sm:border-b-0 sm:border-r-2 border-orange rounded-2xl'>
								<div className='h-full p-5 grid content-between rounded-2xl max-w-3xl gap-y-10'>
									<div>
										<div className='flex flex-wrap sm:flex-nowrap justify-between sm:gap-5 items-center'>
											<h3 className='flex items-center text-lg sm:text-[22px] font-bold gap-2 font-body_font'>
												{userInfo?.username}
												<p className='flex items-center text-sm font-light gap-1'>
													<span className='block w-3 h-3 rounded-full bg-green-500 font-body_font'></span>
													Online
												</p>
											</h3>
											{location.search.length > 0
												? !userInfo?.isVerificationPaid && (
														<>
															<p className='user-not-verify'>
																This member is not verified!
															</p>
														</>
												  )
												: !currentUser?.isVerificationPaid && (
														<>
															<p
																className='user-not-verify'
																onClick={() => {
																	if (user?.profile_type === 'single') {
																		if (user?.verificationId) {
																			navigate('/verification-success');
																		} else {
																			setShowPopup(true);
																		}
																	} else {
																		if (
																			!user?.couple?.person1?.isVerify ||
																			!user?.couple?.person2?.isVerify
																		) {
																			navigate('/verification-success');
																		} else {
																			setShowPopup(true);
																		}
																	}
																}}
															>
																You are not verified!
															</p>
														</>
												  )}
											{/* {!userInfo?.isVerificationPaid && (
												<>
													<p className='user-not-verify'>This member is not verified!</p>
												</>
											)} */}
										</div>
										<div className='text-lg flex items-center gap-2  mt-1 font-body_font'>
											<span style={RenderedStyle}>{age}</span>
										</div>
									</div>
									{location.search.length > 0 &&
									location.search.split('=')[1] !== user?._id ? (
										<div
											className='flex'
											style={{
												width: '100%',
												flexWrap: 'wrap',
												justifyContent: 'center',
												gap: '10px',
											}}
										>
											{currentUser.friends.includes(userInfo?._id) ? (
												<button
													className='primary_btn'
													style={{
														fontSize: '12px',
														padding: '5px 0',
														width: '160px',
													}}
													onClick={handleRemove}
												>
													Remove Friend
												</button>
											) : currentUser.sent_requests.includes(userInfo?._id) ||
											  sent ? (
												<button
													className='primary_btn'
													style={{
														fontSize: '12px',
														padding: '5px 0',
														width: '160px',
													}}
													onClick={handleCancelRequest}
												>
													{'Cancel Request'}
												</button>
											) : (
												<button
													className='primary_btn'
													style={{
														fontSize: '12px',
														padding: '5px 0',
														width: '160px',
													}}
													onClick={handleSendRequest}
													disabled={loading}
												>
													{'Send Friend Request'}
												</button>
											)}
											<button
												className='primary_btn'
												style={{
													fontSize: '12px',
													padding: '5px 0',
													width: '160px',
												}}
												onClick={() => {
													message();
												}}
											>
												Message
											</button>
											{blocked ||
											currentUser.blocked_users.includes(userInfo._id) ? (
												<button
													className='primary_btn'
													style={{
														fontSize: '12px',
														padding: '5px 0',
														width: '160px',
													}}
													onClick={() => {
														blockUser();
													}}
												>
													Unblock
												</button>
											) : (
												<button
													className='primary_btn'
													style={{
														fontSize: '12px',
														padding: '5px 0',
														width: '160px',
													}}
													onClick={() => {
														blockUser();
													}}
												>
													Block
												</button>
											)}
											<button
												className='primary_btn'
												style={{
													fontSize: '12px',
													padding: '5px 0',
													width: '160px',
													display: 'flex',
													alignItems: 'center',
												}}
												onClick={() => {
													if (
														user?.superlike?.sent?.some(
															obj => obj?.userId === userInfo?._id
														)
													) {
														unlike();
													} else {
														superlike();
													}
												}}
											>
												{user?.superlike?.sent?.some(
													obj => obj?.userId === userInfo?._id
												) ? (
													<>
														<AiFillDislike
															style={{
																fontSize: '16px',
																marginRight: '5px',
																marginBottom: '1px',
															}}
														/>{' '}
														UnLike
													</>
												) : (
													<>
														<AiFillLike
															style={{
																fontSize: '16px',
																marginRight: '5px',
																marginBottom: '1px',
															}}
														/>{' '}
														Like
													</>
												)}
											</button>
										</div>
									) : null}
								</div>
							</div>
						</div>

						<div className='p-5 bg-light-grey rounded-xl mt-6  max-w-5xl mx-auto'>
							<div>
								<h3 className='text-2xl text-orange'>Slogan</h3>
								<p className='text-lg font-body_font my-2'>
									{userInfo?.slogan}
								</p>
							</div>
							<div
								style={{
									width: '100%',
									height: '2px',
									backgroundColor: '#F79220',
									marginTop: '16px',
								}}
							></div>
							<div>
								<h3 className='text-2xl text-orange mt-4'>Introduction</h3>
								<p
									className='text-lg font-body_font'
									dangerouslySetInnerHTML={{
										__html: userInfo?.introduction?.replace(/\n/g, '<br />'),
									}}
								></p>
							</div>
						</div>

						<div className='max-w-5xl mx-auto pt-20'>
							<div className='px-8'>
								<button
									className='inline-block py-3 sm:px-4 md:px-8 text-lg rounded-t-lg text-black min-w-[100px] md:min-w-[200px] text-center'
									style={
										isProfile
											? {
													backgroundColor: '#F79220',
													marginRight: '5px',
											  }
											: {
													backgroundColor: 'rgb(32 32 32)',
													color: 'white',
													border: '1px solid #F79220',
													borderBottom: '0',
													marginRight: '5px',
											  }
									}
									onClick={() => {
										if (!isProfile) {
											setIsProfile(true);
										}
									}}
								>
									Profile
								</button>
								<button
									className='inline-block py-3 sm:px-4 md:px-8 text-lg rounded-t-lg text-black min-w-[100px] md:min-w-[200px] text-center'
									style={
										!isProfile
											? { backgroundColor: '#F79220' }
											: {
													backgroundColor: 'rgb(32 32 32)',
													color: 'white',
													border: '1px solid #F79220',
													borderBottom: '0',
											  }
									}
									onClick={() => {
										if (isProfile) {
											setIsProfile(false);
										}
									}}
								>
									Media
								</button>
							</div>
							<div
								style={{ backgroundColor: '#F79220' }}
								className='rounded-lg py-10 px-3 lg:px-8 items-start'
							>
								{isProfile ? (
									<div className='grid gap-y-5'>
										<div className='p-5 bg-black-20 rounded-2xl w-[100%] '>
											<div className='flex justify-between gap-3 font-normal pb-3 mb-3 border-b border-orange'>
												<p className='text-base sm:text-2xl'>Profile</p>
												{location.search.length > 0 ? null : (
													<Link
														to='/edit-detail'
														className='cursor-pointer text-xs sm:text-lg'
													>
														Edit
													</Link>
												)}
											</div>

											<div className='text-sm sm:text-lg grid grid-cols-2 gap-3 mb-2'>
												<span className='block font-body_font text-lg'>
													Interest :
												</span>
												<span
													className={`block text-right font-body_font`}
													style={RenderedStyle}
												></span>
											</div>
											<div className='text-sm sm:text-lg grid grid-cols-2 gap-3 border-b border-[#666] py-[5px] '>
												<span>Male</span>
												<div>
													<span className='block text-right'>
														{userInfo?.interests?.male?.length > 0
															? 'Yes'
															: 'No'}
													</span>
												</div>
											</div>
											<div className='text-sm sm:text-lg grid grid-cols-2 gap-3 border-b border-[#666] py-[5px]'>
												<span>Male Female</span>
												<div>
													<span className='block text-right'>
														{userInfo?.interests?.male_female?.length > 0
															? 'Yes'
															: 'No'}
													</span>
												</div>
											</div>
											<div className='text-sm sm:text-lg grid grid-cols-2 gap-3 border-b border-[#666] py-[5px]'>
												<span>Female </span>
												<div>
													<span className='block text-right'>
														{userInfo?.interests?.female?.length > 0
															? 'Yes'
															: 'No'}
													</span>
												</div>
											</div>
											<div className='text-sm sm:text-lg grid grid-cols-2 gap-3 border-b border-[#666] py-[5px]'>
												<span>Female Female </span>
												<div>
													<span className='block text-right'>
														{userInfo?.interests?.female_female?.length > 0
															? 'Yes'
															: 'No'}
													</span>
												</div>
											</div>
											<div className='text-sm sm:text-lg grid grid-cols-2 gap-3 py-[5px] '>
												<span>Male Male</span>
												<div>
													<span className='block text-right'>
														{userInfo?.interests?.male_male?.length > 0
															? 'Yes'
															: 'No'}
													</span>
												</div>
											</div>
										</div>
										<div className='p-5 bg-black-20 rounded-2xl'>
											<div className='grid grid-cols-2 gap-3 font-normal pb-3 mb-3 border-b border-orange'>
												<p className='text-base sm:text-2xl'>Details</p>
												<p
													className={`text-right flex items-center justify-end text-xl`}
													style={RenderedStyle}
												>
													{userInfo?.gender === 'male' ? (
														<img
															src='/images/Male.png'
															alt='Male'
															className='h-[26px] mr-1'
														/>
													) : userInfo?.gender === 'female' ? (
														<img
															src='/images/Female.png'
															alt='Male'
															className='h-[26px] mr-1'
														/>
													) : (
														<img
															src='/images/Trans.png'
															alt='trans'
															className='h-[26px] mr-1'
														/>
													)}
													{userInfo?.personName}
												</p>
											</div>
											<div className='grid'>
												<div className='text-sm sm:text-lg grid grid-cols-2 gap-3 border-b border-[#666] py-[5px] '>
													<span className='block font-body_font'>
														Ethnic Background:
													</span>
													<span
														className={`block text-right font-body_font`}
														style={RenderedStyle}
													>
														{userInfo?.ethnic_background}
													</span>
												</div>
												<div className='text-sm sm:text-lg grid grid-cols-2 gap-3 border-b border-[#666] py-[5px]'>
													<span className='block font-body_font'>
														Experience:
													</span>
													<span
														className={`block text-right font-body_font`}
														style={RenderedStyle}
													>
														{userInfo?.experience}
													</span>
												</div>
												<div className='text-sm sm:text-lg grid grid-cols-2 gap-3 py-[5px] border-b border-[#666]'>
													<span className='block font-body_font'>Gender:</span>
													<span
														className={`block text-right font-body_font`}
														style={RenderedStyle}
													>
														{userInfo?.gender}
													</span>
												</div>
											</div>
											<div className='grid'>
												<div className='text-sm sm:text-lg grid grid-cols-2 gap-3 border-b border-[#666] py-[5px] '>
													<span className='block font-body_font'>
														Birthdate:
													</span>
													<span
														className={`block text-right font-body_font`}
														style={RenderedStyle}
													>
														{userInfo?.DOB}
													</span>
												</div>
												<div className='text-sm sm:text-lg grid grid-cols-2 gap-3 border-b border-[#666] py-[5px] '>
													<span className='block font-body_font'>
														Sexuality
													</span>
													<span
														className={`block text-right font-body_font`}
														style={RenderedStyle}
													>
														{userInfo?.sexuality}
													</span>
												</div>
												<div className='text-sm sm:text-lg grid grid-cols-2 gap-3 border-b border-[#666] py-[5px] '>
													<span className='block font-body_font'>Height:</span>
													<span
														className={`block text-right font-body_font`}
														style={RenderedStyle}
													>
														{userInfo?.height}
													</span>
												</div>
												<div className='text-sm sm:text-lg grid grid-cols-2 gap-3 border-b border-[#666] py-[5px] '>
													<span className='block font-body_font'>Weight:</span>
													<span
														className={`block text-right font-body_font`}
														style={RenderedStyle}
													>
														{userInfo?.weight}
													</span>
												</div>
												<div className='text-sm sm:text-lg grid grid-cols-2 gap-3 border-b border-[#666] py-[5px] '>
													<span className='block font-body_font'>
														Body Type:
													</span>
													<span
														className={`block text-right font-body_font`}
														style={RenderedStyle}
													>
														{userInfo?.body_type}
													</span>
												</div>
												<div className='text-sm sm:text-lg grid grid-cols-2 gap-3 border-b border-[#666] py-[5px] '>
													<span className='block font-body_font'>
														Body Hair:
													</span>
													<span className='block text-right'>
														{userInfo?.body_hair?.map((el, i) => (
															<span
																className={` font-body_font`}
																style={RenderedStyle}
																key={i}
															>
																{el}{' '}
																{i !== 0 &&
																	i !== userInfo?.body_hair.length - 1 && (
																		<span>, </span>
																	)}
															</span>
														))}
													</span>
												</div>

												<div className='text-sm sm:text-lg grid grid-cols-2 gap-3 border-b border-[#666] py-[5px] '>
													<span className='block font-body_font'>
														Piercings:
													</span>
													<span
														className={`block text-right font-body_font`}
														style={RenderedStyle}
													>
														{userInfo?.piercings}
													</span>
												</div>
												{userInfo.gender === 'male' && (
													<div className='text-sm sm:text-lg grid grid-cols-2 gap-3 border-b border-[#666] py-[5px] '>
														<span className='block font-body_font'>
															Circuncised:
														</span>
														<span
															className={`block text-right font-body_font`}
															style={RenderedStyle}
														>
															{userInfo?.circumcised}
														</span>
													</div>
												)}
												<div className='text-sm sm:text-lg grid grid-cols-2 gap-3 border-b border-[#666] py-[5px] '>
													<span className='block font-body_font'>Looks:</span>
													<span
														className={`block text-right font-body_font`}
														style={RenderedStyle}
													>
														{userInfo?.looks_important}
													</span>
												</div>
												<div className='text-sm sm:text-lg grid grid-cols-2 gap-3 border-b border-[#666] py-[5px] '>
													<span className='block font-body_font'>Smoking:</span>
													<span
														className={`block text-right font-body_font`}
														style={RenderedStyle}
													>
														{userInfo?.smoking}
													</span>
												</div>
												<div className='text-sm sm:text-lg grid grid-cols-2 gap-3 border-b border-[#666] py-[5px] '>
													<span className='block font-body_font'>Tattoos:</span>
													<span
														className={`block text-right font-body_font`}
														style={RenderedStyle}
													>
														{userInfo?.tattoos}
													</span>
												</div>
												<div className='text-sm sm:text-lg grid grid-cols-2 gap-3 py-[5px] border-b border-[#666]'>
													<span className='block font-body_font'>
														Relation:
													</span>
													<span
														className={`block text-right font-body_font`}
														style={RenderedStyle}
													>
														{userInfo?.relationship_status}
													</span>
												</div>
												<div className='text-sm sm:text-lg grid grid-cols-2 gap-3 py-[5px] border-b border-[#666]'>
													<span className='block font-body_font'>
														Drinking:
													</span>
													<span
														className={`block text-right font-body_font`}
														style={RenderedStyle}
													>
														{userInfo?.Drinking}
													</span>
												</div>
												<div className='text-sm sm:text-lg grid grid-cols-2 gap-3 py-[5px] border-b border-[#666]'>
													<span className='block font-body_font'>Drugs:</span>
													<span
														className={`block text-right font-body_font`}
														style={RenderedStyle}
													>
														{userInfo?.Drugs}
													</span>
												</div>
												<div className='text-sm sm:text-lg grid grid-cols-2 gap-3 py-[5px] border-b border-[#666] '>
													<span className='block font-body_font'>
														Relationship Status:
													</span>
													<span
														className={`block text-right font-body_font`}
														style={RenderedStyle}
													>
														{userInfo?.Relationship}
													</span>
												</div>
												<div className='text-sm sm:text-lg grid grid-cols-2 gap-3 py-[5px]'>
													<span className='block font-body_font'>
														Language:
													</span>
													<span
														className={`block text-right font-body_font`}
														style={RenderedStyle}
													>
														{userInfo?.Language}
													</span>
												</div>
											</div>
										</div>
									</div>
								) : (
									<div className='grid gap-y-5'>
										<div className='p-5 bg-black-20 rounded-2xl w-[100%] '>
											<div className='flex justify-between gap-3 font-normal pb-3 mb-3 border-b border-orange'>
												<p className='text-base sm:text-2xl'>Public Images</p>
												{location.search.length > 0 ? null : (
													<Link
														to='/my-media/photos'
														className='cursor-pointer text-xs sm:text-lg'
													>
														Edit
													</Link>
												)}
											</div>
											<div
												style={{
													display: 'flex',
													flexWrap: 'wrap',
													justifyContent: 'center',
													gap: '10px',
												}}
											>
												{userInfo?.mymedia.filter(item => item?.isPublic)
													.length > 0 ? (
													userInfo?.mymedia
														.filter(item => item?.isPublic)
														.map(item => {
															return (
																<div
																	key={item._id}
																	className='p-5 bg-light-grey rounded-2xl text-center'
																>
																	<div
																		style={{
																			display: 'flex',
																			alignItems: 'center',
																			justifyContent: 'center',
																			width: '250px',
																			height: '200px',
																			background: '#383b45',
																			marginBottom: '12px',
																		}}
																	>
																		<img
																			src={item.image}
																			alt=''
																			srcset=''
																			className='media-image'
																			style={{ maxHeight: '200px' }}
																		/>
																	</div>
																	<p>{item.description}</p>
																</div>
															);
														})
												) : (
													<p className='text-base sm:text-2xl'>
														This user has no images
													</p>
												)}
											</div>
											<div className='flex justify-between gap-3 font-normal pb-3 mb-3 border-b border-orange'>
												<p
													className='text-base sm:text-2xl'
													style={{ marginTop: '15px' }}
												>
													Private Images
												</p>
											</div>
											{userInfo?.mymedia.filter(item => !item?.isPublic)
												.length > 0 ? (
												isPasswordCorrect ? (
													<div
														style={{
															display: 'flex',
															flexWrap: 'wrap',
															justifyContent: 'center',
															gap: '10px',
														}}
													>
														{userInfo?.mymedia
															.filter(item => !item?.isPublic)
															.map(item => {
																return (
																	<div
																		key={item._id}
																		className='p-5 bg-light-grey rounded-2xl text-center'
																	>
																		<div
																			style={{
																				display: 'flex',
																				alignItems: 'center',
																				justifyContent: 'center',
																				width: '250px',
																				height: '200px',
																				background: '#383b45',
																				marginBottom: '12px',
																			}}
																		>
																			<img
																				src={item.image}
																				alt=''
																				className='media-image'
																				srcset=''
																				style={{ maxHeight: '200px' }}
																			/>
																		</div>
																		<p>{item.description}</p>
																	</div>
																);
															})}
													</div>
												) : (
													<form onSubmit={handlePasswordSubmit} style={{}}>
														<input
															type='password'
															name='pass'
															className='outline-none border-none px-3 h-10 bg-grey rounded-xl'
															placeholder='Password...'
															style={{
																marginBottom: '25px',
																width: '250px',
																backgroundColor: 'black',
																marginRight: '15px',
															}}
														/>

														<button
															style={{
																width: '150px',
																marginBottom: '20px',
																background:
																	'linear-gradient(46deg, #F79220 55.15%, #F94A2B 82%)',
															}}
															className='primary_btn !py-1 !text-sm !leading-[28px] !px-1 !text-[12px]'
															type='submit'
														>
															Check
														</button>
													</form>
												)
											) : (
												<div
													style={{
														display: 'flex',
														flexWrap: 'wrap',
														justifyContent: 'center',
														gap: '10px',
														marginBottom: '20px',
													}}
												>
													<p className='text-base sm:text-2xl'>
														This user has no private images
													</p>
												</div>
											)}
										</div>
										<div className='p-5 bg-black-20 rounded-2xl w-[100%] '>
											<div className='flex justify-between gap-3 font-normal pb-3 mb-3 border-b border-orange'>
												<p className='text-base sm:text-2xl'>Public Videos</p>
												{location.search.length > 0 ? null : (
													<Link
														to='/my-media/videos'
														className='cursor-pointer text-xs sm:text-lg'
													>
														Edit
													</Link>
												)}
											</div>
											<div
												style={{
													display: 'flex',
													flexWrap: 'wrap',
													justifyContent: 'center',
													gap: '10px',
												}}
											>
												{userInfo?.videos.filter(item => item?.isPublic)
													.length > 0 ? (
													userInfo?.videos
														.filter(item => item?.isPublic)
														.map(item => {
															return (
																<div
																	key={item._id}
																	className='p-5 bg-light-grey rounded-2xl text-center'
																>
																	<video
																		controls
																		src={item.video}
																		alt=''
																		srcset=''
																		style={{
																			width: '250px',
																			height: '200px',
																			marginBottom: '12px',
																		}}
																	></video>
																	<p>{item.description}</p>
																</div>
															);
														})
												) : (
													<p className='text-base sm:text-2xl'>
														This user has no videos
													</p>
												)}
											</div>
											<div className='flex justify-between gap-3 font-normal pb-3 mb-3 border-b border-orange'>
												<p
													className='text-base sm:text-2xl'
													style={{ marginTop: '15px' }}
												>
													Private Videos
												</p>
											</div>
											{userInfo?.videos?.length > 0 &&
											userInfo?.videos.filter(item => !item?.isPublic).length >
												0 ? (
												isPasswordCorrect ? (
													<div
														style={{
															display: 'flex',
															flexWrap: 'wrap',
															justifyContent: 'center',
															gap: '10px',
														}}
													>
														{userInfo?.videos
															.filter(item => !item?.isPublic)
															.map(item => {
																return (
																	<div
																		key={item._id}
																		className='p-5 bg-light-grey rounded-2xl text-center'
																	>
																		<video
																			controls
																			src={item.video}
																			alt=''
																			srcset=''
																			style={{
																				width: '250px',
																				height: '200px',
																				marginBottom: '12px',
																			}}
																		></video>
																		<p>{item.description}</p>
																	</div>
																);
															})}
													</div>
												) : (
													<form onSubmit={handlePasswordSubmit} style={{}}>
														<input
															type='password'
															name='pass'
															className='outline-none border-none px-3 h-10 bg-grey rounded-xl'
															placeholder='Password...'
															style={{
																marginBottom: '25px',
																width: '250px',
																backgroundColor: 'black',
																marginRight: '15px',
															}}
														/>

														<button
															style={{
																width: '150px',
																marginBottom: '20px',
																background:
																	'linear-gradient(46deg, #F79220 55.15%, #F94A2B 82%)',
															}}
															className='primary_btn !py-1 !text-sm !leading-[28px] !px-1 !text-[12px]'
															type='submit'
														>
															Check
														</button>
													</form>
												)
											) : (
												<div
													style={{
														display: 'flex',
														flexWrap: 'wrap',
														justifyContent: 'center',
														gap: '10px',
														marginBottom: '20px',
													}}
												>
													<p className='text-base sm:text-2xl'>
														This user has no private videos
													</p>
												</div>
											)}
										</div>
									</div>
								)}
							</div>
							{friends.length > 0 && (
								<>
									<div className='my-20'>
										<div className='flex justify-between flex-wrap gap-5 items-center mb-12'>
											<h3 className='text-2xl sm:text-5xl leading-none font-bold'>
												Friends
											</h3>
											{location.search.length !== 0 ? (
												<button
													onClick={() => setIsFriendsOpen(!isFriendsOpen)}
													className='primary_btn !text-sm sm:!text-xl'
												>
													View More
												</button>
											) : friends.length === 0 ? null : (
												<Link
													to='/my_friends'
													className='primary_btn !text-sm sm:!text-xl'
												>
													View More
												</Link>
											)}
										</div>
										<div className='grid sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 2xl:grid-cols-4 gap-6'>
											{friends.length > 0 ? (
												!isFriendsOpen ? (
													friends?.slice(0, 4)?.map((friend, i) => {
														return (
															<div
																style={{
																	display: 'flex',
																	alignItems: 'center',
																	justifyContent: 'center',
																}}
															>
																<FriendCard data={friend} key={i} />
															</div>
														);
													})
												) : (
													friends?.map((friend, i) => {
														return (
															<div
																style={{
																	display: 'flex',
																	alignItems: 'center',
																	justifyContent: 'center',
																}}
															>
																<FriendCard data={friend} key={i} />
															</div>
														);
													})
												)
											) : (
												<p>No friends yet !</p>
											)}
										</div>
									</div>
								</>
							)}
							{situationships.length > 0 && (
								<>
									<div className='my-20'>
										<div className='flex justify-between flex-wrap gap-5 items-center mb-12'>
											<h3 className='text-2xl sm:text-5xl leading-none font-bold'>
												Situationships
											</h3>
											{situationships.length === 0 ? null : (
												<Link
													to='/travel-page'
													className='primary_btn !text-sm sm:!text-xl'
												>
													View More
												</Link>
											)}
										</div>
										<div className='grid sm:grid-cols-2 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-3 gap-5'>
											{situationships.length > 0 &&
												situationships?.slice(0, 4)?.map((el, i) => (
													<>
														<div
															className='h-full bg-light-grey rounded-2xl'
															key={i}
														>
															<TravelCard2 key={i} travel={el} />
														</div>
													</>
												))}
										</div>
									</div>
								</>
							)}
						</div>
					</div>
					<div className='audit-dating__block relative py-4 md:py-16 md:pt-0 container mx-auto mt-14'>
						<div className='flex flex-col md:flex-row justify-center items-center text-center gap-6 py-71px'>
							{/* <h2 className='text-white text-base sm:text-2xl md:text-3xl xl:text-40px'>
								#1 Adult Dating Site
							</h2> */}
						</div>
					</div>
				</div>
			) : (
				<CoupleDetailPage
					age={age}
					age2={age2}
					userInfo={userInfo}
					superlike={() => {
						superlike();
					}}
					friends={friends}
					situationships={situationships}
					unlike={unlike}
					setShowPopup={setShowPopup}
					showPopup={showPopup}
					currentUser={currentUser}
					handleRemove={handleRemove}
					handleSendRequest={handleSendRequest}
					handleCancelRequest={handleCancelRequest}
					sent={sent}
					loading={loading}
					blockUser={blockUser}
					blocked={blocked}
					isFriendsOpen={isFriendsOpen}
					setIsFriendsOpen={setIsFriendsOpen}
				/>
			)}
		</>
	);
};

export default UserDetailPage;
