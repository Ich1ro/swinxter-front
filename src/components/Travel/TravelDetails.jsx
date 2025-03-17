import axios from 'axios';
import { getPreciseDistance } from 'geolib';
import React, { useContext, useEffect, useState } from 'react';
import { MdOutlineModeEditOutline } from 'react-icons/md';
import {
	RiCheckboxCircleLine,
	RiCloseCircleLine,
	RiDeleteBin6Line,
} from 'react-icons/ri';
import { SlLocationPin } from 'react-icons/sl';
import { useSelector } from 'react-redux';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { Context } from '../../Context/context';
import api from '../../utils/api';
import { MidLoading } from '../M_used/Loading';
import { FaArrowLeft } from 'react-icons/fa6';
import './css/eventDetailPage.css';
import { IoMdSend } from 'react-icons/io';
// import Comments from './Comments';
import { useCustomChatContext } from '../../Context/ChatContext';

const TravelDetails = () => {
	const [travelInfo, setTravelInfo] = useState({});
	const { user } = useSelector(state => state.auth);
	const [userInfo, setUserInfo] = useState(user);
	const [loading, setLoading] = useState(false);
	const { savedCred } = useContext(Context);
	const BASE_URL = process.env.REACT_APP_BASE_URL;
	const [toggleRequest, setToggleRequest] = useState(false);
	const [updateList, setUpdateList] = useState(false);
	const navigate = useNavigate();
	const data = useParams();
	const travelId = data.id;
	const [comment, setComment] = useState('');
	const [commentRender, setCommentRender] = useState(true);
	const { startDMChatRoom } = useCustomChatContext();

	useEffect(() => {
		setUserInfo(user);
	}, []);

	const calculatePreciseDistance = (fLong, sLong, fLat, sLat) => {
		var pdis = getPreciseDistance(
			{ latitude: Number(fLat), longitude: Number(fLong) },
			{ latitude: Number(sLat), longitude: Number(sLong) }
		);
		const factor = 0.621371;
		const result = ((pdis / 1000) * factor).toFixed(0);

		return `${isNaN(result) ? '' : result + 'miles'}`;
	};

	const [cancleRequest, setCancleRequest] = useState(false);
	const getEvent = async () => {
		try {
			setLoading(true);
			const { data } = await api.get(`/travel/${travelId}`);
			console.log(data);

			setTravelInfo(data);
			setLoading(false);
			// getPendingReq(data);
		} catch (error) {
			setLoading(false);
			console.log(error);
		}
	};

	const getPendingReq = async data => {
		const pendingParticipants = data.participants?.filter(
			participant => participant?.status === 'Pending'
		);

		const pendingUserData = [];

		for (const el of pendingParticipants) {
			try {
				let id = el.user;
				const { data } = await api.get(`/findone/${id}`);
				pendingUserData.push(data);
			} catch (error) {
				console.log(error);
			}
		}
		// setPendingUser(pendingUserData);
	};

	useEffect(() => {
		getEvent();
		// eslint-disable-next-line
	}, [updateList, cancleRequest, commentRender]);

	let formattedTime;
	let formattedEndTime;
	const EndDateString = travelInfo.endDate;
	const inputDateString = travelInfo.startDate;
	const parsedDate = new Date(inputDateString);
	const parseEndDate = new Date(EndDateString);

	console.log(inputDateString);
	console.log(EndDateString);

	const monthNames = [
		'Jan',
		'Feb',
		'Mar',
		'Apr',
		'May',
		'Jun',
		'Jul',
		'Aug',
		'Sep',
		'Oct',
		'Nov',
		'Dec',
	];
	// const handleCancle = async () => {
	// 	const requestData = {
	// 		eventId: eventid,
	// 		userId: userInfo._id,
	// 	};
	// 	await api.post(`/delPart`, requestData).then(res => {
	// 		setCancleRequest(true);
	// 		// setIsJoined(false);
	// 	});
	// };
	const day = parsedDate.getDate();
	const monthIndex = parsedDate.getMonth();
	const year = parsedDate.getFullYear();
	const formattedDate = `${monthNames[monthIndex]} ${day} ${year}`;
	if (inputDateString) {
		const time = inputDateString.split('T')[1];
		const [hours, minutes] = time.split(':');
		const date = new Date(0, 0, 0, hours, minutes);
		formattedTime = date.toLocaleTimeString([], {
			hour: '2-digit',
			minute: '2-digit',
		});
	}

	const endday = parseEndDate.getDate();
	const endmonthIndex = parseEndDate.getMonth();
	const endyear = parseEndDate.getFullYear();
	const endformattedDate = `${monthNames[endmonthIndex]} ${endday} ${endyear}`;
	if (EndDateString) {
		const time = EndDateString.split('T')[1];
		const [hours, minutes] = time.split(':');
		const date = new Date(0, 0, 0, hours, minutes);
		formattedEndTime = date.toLocaleTimeString([], {
			hour: '2-digit',
			minute: '2-digit',
		});
	}
	console.log(endformattedDate);
	// const handleJoin = async () => {
	// 	try {
	// 		const { data } = await api.post(`/events/${eventid}/participants`, {});
	// 		if (data) {
	// 			if (travelInfo.type === 'Private Place') {
	// 				toast.success('Request sent');
	// 			}
	// 			if (travelInfo.type === 'Public Place') {
	// 				toast.success('Event Joined');
	// 			}
	// 			// setIsJoined(true);
	// 		} else {
	// 			toast.error('Request Already sent');
	// 		}
	// 	} catch (error) {
	// 		toast.error('Something went wrong');
	// 		console.log(error);
	// 	}
	// };
	// const hasUserJoined = travelInfo.participants?.some(
	// 	participant =>
	// 		participant.user === userInfo._id && participant?.status === 'Approved'
	// );

	// const hasUserPending = travelInfo.participants?.some(
	// 	participant =>
	// 		participant.user === userInfo._id && participant?.status === 'Pending'
	// );

	// const handlePendingUser = async (userId, status) => {
	// 	try {
	// 		const { data } = await api.post(`/events/${eventid}/${userId}`, {
	// 			status,
	// 		});
	// 		if (data) {
	// 			if (status === 'Approved') {
	// 				toast.success('User Added to Event');
	// 			} else {
	// 				toast.success('User Removed');
	// 			}
	// 			setUpdateList(!updateList);
	// 		}
	// 	} catch (error) {
	// 		console.log(error);
	// 	}
	// };

	// const deleteEvent = e => {
	// 	axios.delete(`${BASE_URL}/api/delete_event/${e}`).then(res => {
	// 		console.log(res);
	// 		if (res.data === 'Event is deleted successfully') {
	// 			toast.success('Event deleted successfully');
	// 			navigate('/event-page');
	// 		}
	// 	});
	// };
	console.log(loading, 'l');

	const postComment = async e => {
		e.preventDefault();
		const config = {
			headers: {
				'Content-Type': 'application/json',
			},
		};
		const data = {
			userId: userInfo._id,
			eventId: travelInfo._id,
			username: userInfo.username,
			userPhoto: userInfo.image,
			comment: comment,
		};
		const req = await api.post('/events/comment', data, config);
		setCommentRender(!commentRender);
	};

	const message = async () => {
		await startDMChatRoom(travelInfo.userId);
		// navigate('/messaging');
	};

	return (
		<div className='bg-black pt-0 sm:pt-8 py-8 px-6 rounded-2xl min-h-full'>
			{!loading ? (
				<>
					<span
						className='primary_btn cursor-pointer !text-sm !py-2 !px-3 !leading-none !py-3'
						onClick={() => navigate(-1)}
					>
						<span className='text-sm inline-flex items-center mr-2'>
							<FaArrowLeft />
						</span>
						Back
					</span>
					<div className='flex justify-between items-center max-w-7xl'>
						<h3 className='clipped_text bg-gradient-to-r from-orange to-red-500 bg-clip-text text-base sm:text-3xl md:text-5xl font-bold mb-5 pt-5'>
							Situationship Details
						</h3>
						<div className='flex flex-wrap gap-4 justify-end'>
							<span
								className='primary_btn cursor-pointer !text-sm !py-2'
								onClick={() =>
									navigate(`/user-detail?id=${travelInfo.userId._id}`)
								}
							>
								Owner
							</span>
							{travelInfo.userId?._id !== userInfo._id ? (
								<span
									className='primary_btn cursor-pointer !text-sm !py-2'
									onClick={message}
								>
									Message
								</span>
							) : null}
						</div>
					</div>
					<div className='flex flex-wrap items-stretch max-w-7xl'>
						<div className='w-full md:w-[45%] p-5 bg-light-grey rounded-2xl'>
							<img
								src={travelInfo.image}
								alt=''
								className='w-full aspect-4/3 rounded-2xl object-cover border-[3px] border-white'
							/>
						</div>
						<div className='w-full md:w-[55%] xl:pl-5 xxl:pl-10 mt-5 md:mt-0'>
							<div className='text-white h-full bg-light-grey rounded-2xl '>
								<div className='p-5'>
									{/* <div className='flex flex-wrap items-center justify-between gap-y-1 gap-x-5 mb-4'>
										<h3 className='text-2xl xxl:text-4xl font-semibold'>
											{travelInfo.eventName}
										</h3>
										{travelInfo.userId?._id === userInfo._id ? (
											<div className='flex gap-2'>
												<Link
													className='inline-flex items-center text-2xl'
													to={`/event_edit/${travelInfo._id}`}
												>
													<MdOutlineModeEditOutline />
												</Link>
												<div
													className='inline-flex items-center text-2xl'
													onClick={() => deleteEvent(travelInfo._id)}
												>
													<RiDeleteBin6Line />
												</div>
											</div>
										) : travelInfo.type === 'Private Event' ? (
											hasUserPending || isJoined ? (
												<div className='flex gap-3'>
													<button
														// className="primary_btn !py-1 !text-sm !leading-[28px]"
														className='text-red-500'
														disabled
													>
														Awaiting for Approval..
													</button>
													<button
														className='primary_btn !py-1 !text-sm !leading-[28px]'
														onClick={handleCancle}
													>
														Cancel Request
													</button>
												</div>
											) : hasUserJoined ? (
												<div className='flex gap-2'>
													<button
														className='primary_btn !py-1 !text-sm !leading-[28px]'
														disabled
													>
														Joined
													</button>
													<button
														className='primary_btn !py-1 !text-sm !leading-[28px]'
														onClick={handleCancle}
													>
														Cancel Request
													</button>
												</div>
											) : (
												<button
													className='primary_btn !py-1 !text-sm !leading-[28px]'
													onClick={handleJoin}
												>
													Send Join Request
												</button>
											)
										) : travelInfo.type === 'Public Event' ? (
											hasUserJoined || isJoined ? (
												<div className='flex gap-2'>
													<button
														className='primary_btn !py-1 !text-sm !leading-[28px]'
														disabled
													>
														Joined
													</button>
													<button
														className='primary_btn !py-1 !text-sm !leading-[28px]'
														onClick={handleCancle}
													>
														Cancel Request
													</button>
												</div>
											) : (
												<button
													className='primary_btn !py-1 !text-sm !leading-[28px]'
													onClick={handleJoin}
												>
													Join Now
												</button>
											)
										) : (
											''
										)}
									</div> */}
									<div className='grid sm:flex flex-wrap items-start gap-1 sm:gap-1 justify-between'>
										<div className='text-sm'>
											<span className='inline-block mr-1 font-body_font'>
												Start Date :
											</span>{' '}
											{formattedDate} {formattedTime}
										</div>
										<div className='text-sm'>
											<span className='inline-block mr-1 font-body_font'>
												End Date :
											</span>
											{endformattedDate} {formattedEndTime}
										</div>
									</div>
									<div className='flex items-center text-sm font-body_font my-4'>
										<span className='flex items-center text-lg mr-3'>
											<SlLocationPin />
										</span>
										{travelInfo?.location?.address &&
										travelInfo?.location?.street &&
										travelInfo?.location?.municipality &&
										travelInfo?.location?.country ? (
											<>
												{`${travelInfo?.location?.address} ${travelInfo?.location?.street}, ${travelInfo?.location?.municipality}, ${travelInfo?.location?.country}`}
											</>
										) : (
											<>{travelInfo?.resort}</>
										)}
									</div>

									{travelInfo?.location?.address &&
									travelInfo?.location?.street &&
									travelInfo?.location?.municipality &&
									travelInfo?.location?.country ? (
										<div className='my-4'>
											<p className='text-lg text-orange font-semibold'>
												Distance
											</p>
											{calculatePreciseDistance(
												// travelInfo?.location?.lon,
												// savedCred.long,
												// travelInfo?.location?.lat,
												// savedCred.lat
												travelInfo?.geometry?.coordinates[0],
												user?.geometry?.coordinates[0],
												travelInfo?.geometry?.coordinates[1],
												user?.geometry?.coordinates[1]
											)}
										</div>
									) : (
										<></>
									)}

									<div>
										<p className='text-lg font-semibold pb-2 border-b border-white'>
											INFORMATION
										</p>
										<p className='text-base my-2'>
											{/* <span className="font-semibold">{travelInfo.type} BY : </span> */}

											<span className='font-body_font'>
												Created by : {travelInfo.name}
											</span>
										</p>
										<p className='text-base my-2 flex items-center gap-2'>
											<span className='text-orange'>Description:</span>
											<span>{travelInfo?.description}</span>
										</p>
										<p className='text-base my-2 flex items-center gap-2'>
											<span className='font-semibold'>WELCOMING </span>
											<span className='flex items-center gap-1'>
												{travelInfo?.interested?.map((el, i) => (
													<>
														{el === 'M' && (
															<img
																src='/images/Male.png'
																alt='male-user'
																className='h-[26px]'
															/>
														)}
														{el === 'F' && (
															<img
																src='/images/Female.png'
																alt='woman'
																className='h-[26px]'
															/>
														)}
														{el === 'MM' && (
															<img
																src='/images/malemale.png'
																alt='couple'
																className='h-[22px]'
															/>
														)}
														{el === 'FF' && (
															<img
																src='/images/femaleFemale.png'
																alt='couple'
																className='h-[22px]'
															/>
														)}
														{el === 'MF' && (
															<img
																src='/images/malefemale.png'
																alt='couple'
																className='h-[22px]'
															/>
														)}
														{el === 'T' && (
															<img
																src='/images/Trans.png'
																alt='trans'
																className='h-[22px]'
															/>
														)}
													</>
												))}
											</span>
										</p>

										{/* <p className='text-base'>
											<span className='font-semibold'>
												Total Number of Participants :
												<span className='font-body_font font-normal'>
													{travelInfo.participants?.length - pendingUser.length}
												</span>
											</span>
										</p> */}
									</div>
								</div>
							</div>
						</div>
						{/* <div className='mt-5'>
							<ul className='flex flex-wrap text-sm font-medium text-center text-gray-500 dark:text-gray-400'>
								<li className='mr-2'>
									<span
										className={`inline-block px-2 py-3 rounded-lg  cursor-pointer hover:bg-gray-100  ${
											!toggleRequest ? 'bg-orange' : 'hover:text-orange'
										}`}
										aria-current='page'
										onClick={() =>
											navigate('/event-detail-media', {
												state: {
													photos: travelInfo.images,
													vidoes: travelInfo.videos,
												},
											})
										}
									>
										Photos & Videos
									</span>
								</li>
								{travelInfo.userId?._id === userInfo._id && (
									<li className='mr-2'>
										<span
											className={`inline-block px-2 py-3 rounded-lg  cursor-pointer hover:bg-gray-100  ${
												toggleRequest ? 'bg-orange' : 'hover:text-orange'
											}`}
											onClick={() => setToggleRequest(true)}
										>
											Pending Request ( {pendingUser.length} )
										</span>
									</li>
								)}
							</ul>
						</div>
						<div className='my-5 w-full p-5 bg-light-grey rounded-lg'>
							<p className='text-lg text-orange font-semibold mb-3'>
								DESCRIPTION
							</p>
							<p
								className='text-base font-body_font'
								dangerouslySetInnerHTML={{
									__html: travelInfo?.description?.replace(/\n/g, '<br />'),
								}}
							></p>
						</div> */}
						{/* <div className="my-5 w-full p-5 bg-light-grey rounded-lg">
        <p className="text-lg text-orange font-semibold mb-3">Comments</p>
        <input type="text" placeholder="Write a comment" onChange={(e) => {setComment(e.target.value)}} id="comment_box"/>
        <button id="btn_post" onClick={postComment}><IoMdSend /></button>
        {
          travelInfo?.comments?
          (travelInfo.comments.map((comment,i) => {
            return(
              <Comments comment={comment} eventId={eventid} userInfo={userInfo} travelInfo={travelInfo}/>
            )
          }))
          :
          null
        }
      </div> */}
						{/* Photos and Videos */}

						{/* {toggleRequest ? (
							<div className='w-full grid gap-5 mt-5'>
								{pendingUser.map((user, i) => (
									<div
										className='flex flex-wrap justify-between max-w-3xl'
										key={i}
									>
										<span className='w-[70%]'>{user.username}</span>
										<div className='text-3xl justify-end flex gap-2 w-[30%]'>
											<span className='text-green-color'>
												<RiCheckboxCircleLine
													onClick={() =>
														handlePendingUser(user._id, 'Approved')
													}
												/>
											</span>
											<span className='text-red-1'>
												<RiCloseCircleLine
													onClick={() =>
														handlePendingUser(user._id, 'Rejected')
													}
												/>
											</span>
										</div>
									</div>
								))}
							</div>
						) : (
							<div></div>
						)} */}

						{/* {!toggleRequest && (
  
      )}
   
      {toggleRequest && (
     
      )} */}
					</div>
				</>
			) : (
				<MidLoading />
			)}
		</div>
	);
};
export default TravelDetails;
