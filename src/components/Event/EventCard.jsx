import axios from 'axios';
import { getPreciseDistance } from 'geolib';
import React, { useContext, useEffect, useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { FiUsers } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { Context } from '../../Context/context';
import './css/eventCard.css';
import api from '../../utils/api';
import { useSelector } from 'react-redux';
const EventCard = ({ event, loc }) => {
	const [isJoined, setIsJoined] = useState(false);
	const { savedCred } = useContext(Context);
	const navigate = useNavigate();
	const BASE_URL = process.env.REACT_APP_BASE_URL;
	const { user } = useSelector(state => state.auth);
	const [userInfo, setUserInfo] = useState(user);
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

	const handleEvent = id => {
		navigate(`/event-detail/${id}`);
	};
	const handleJoinEvent = async id => {
		let eventId = id;
		try {
			const { data } = await api.post(`/events/${eventId}/participants`, {});
			if (data) {
				if (event.type == 'Private Place') {
					toast.success('Request sent');
				}
				if (event.type == 'Public Place') {
					toast.success('Event Joined');
				}
				setIsJoined(true);
			}
		} catch (error) {
			toast.error('Request already sent');
			console.log(error);
		}
	};

	const hasUserJoined = event.participants?.some(
		participant =>
			participant.user === userInfo._id && participant?.status === 'Approved'
	);
	const hasUserPending = event.participants?.some(
		participant =>
			participant.user === userInfo._id && participant?.status === 'Pending'
	);
	// console.log(hasUserJoined,'USER JOINED')
	// console.log(hasUserPending,'USER PENDING')

	return (
		<div className='w-full cursor-pointer'>
			<img
				src={event?.mainImage}
				alt='event-img'
				className='w-full object-cover aspect-11/10 rounded-t-2xl'
				onClick={() => handleEvent(event._id)}
			/>
			<div className='bg-light-grey p-4 rounded-b-2xl grid gap-1'>
				<h3
					className='text-2xl font-semibold'
					style={{
						whiteSpace: 'nowrap',
						overflow: 'hidden',
						textOverflow: 'ellipsis',
						width: '200px',
					}}
				>
					{event?.eventName}
				</h3>
				<div className='grid gap-1'>
					<p className='text-sm'>
						{event?.type === 'Public Event' ? (
							<span className='text-red-500'>{event?.type} </span>
						) : (
							<span className='text-green-500'>{event?.type} </span>
						)}
						<span className='text-white-2 font-body_font'>
							by {event?.userId?.username}
						</span>
					</p>
					<div className='date_picker '>
						<img
							src='images/calendar-icon.png'
							alt='calendar-icon'
							style={{marginRight: '10px'}}
						/>
						
						<DatePicker
							dateFormat='yyyy/MM/dd'
							selected={new Date(event?.Startdate)}
							className='font-body_font date-picker'
							disabled
						/>
					</div>
				</div>
				<div className='flex flex-wrap justify-between gap-x-3 gap-y-2 text-sm'>
					<p className='flex items-center gap-1 font-light text-sm font-body_font'>
						{/* {event.accepted_type(includes) } */}
						<svg
							xmlns='http://www.w3.org/2000/svg'
							width='15'
							height='16'
							viewBox='0 0 18 19'
							fill='none'
						>
							<mask
								id='mask0_47_207'
								style={{ maskType: 'luminance' }}
								maskUnits='userSpaceOnUse'
								x='0'
								y='0'
								width='15'
								height='16'
							>
								<path d='M0 0.5H18V18.5H0V0.5Z' fill='white' />
							</mask>
							<g mask='url(#mask0_47_207)'>
								<path
									d='M9 17.9727C6.89063 14.8086 3.19922 10.5195 3.19922 6.82812C3.19922 3.62957 5.80145 1.02734 9 1.02734C12.1986 1.02734 14.8008 3.62957 14.8008 6.82812C14.8008 10.5195 11.1094 14.8086 9 17.9727Z'
									stroke='white'
									stroke-miterlimit='10'
									stroke-linecap='round'
									stroke-linejoin='round'
								/>
								<path
									d='M9 9.46484C7.54618 9.46484 6.36328 8.28194 6.36328 6.82812C6.36328 5.37431 7.54618 4.19141 9 4.19141C10.4538 4.19141 11.6367 5.37431 11.6367 6.82812C11.6367 8.28194 10.4538 9.46484 9 9.46484Z'
									stroke='white'
									stroke-miterlimit='10'
									stroke-linecap='round'
									stroke-linejoin='round'
								/>
							</g>
						</svg>
						{event?.location?.display_name?.length > 10
							? event?.location?.display_name?.slice(0, 10) + '..'
							: event?.location?.display_name}
					</p>
					{calculatePreciseDistance(
						event?.location?.lon,
						user?.geometry?.coordinates[0],
						event?.location?.lat,
						user?.geometry?.coordinates[1]
					)}
				</div>

				<div className='flex flex-wrap items-center justify-between '>
					<div className='flex w-[75%] flex-wrap items-center gap-1'>
						{event?.accepted_type.includes('M') ? (
							<img src='images/Male.png' alt='male-user' className='h-[18px]' />
						) : (
							''
						)}
						{event?.accepted_type.includes('F') ? (
							<img src='images/Female.png' alt='woman' className='h-[18px]' />
						) : (
							''
						)}
						{event?.accepted_type.includes('MF') ? (
							<img
								src='images/malefemale.png'
								alt='couple'
								className='h-[15px]'
							/>
						) : (
							''
						)}
						{event?.accepted_type.includes('MM') ? (
							<img
								src='images/malemale.png'
								alt='couple'
								className='h-[15px]'
							/>
						) : (
							''
						)}
						{event?.accepted_type.includes('FF') ? (
							<img
								src='images/femaleFemale.png'
								alt='couple'
								className='h-[15px]'
							/>
						) : (
							''
						)}
						{event?.accepted_type.includes('T') ? (
							<img src='images/Trans.png' alt='couple' className='h-[15px]' />
						) : (
							''
						)}
					</div>
					<div className='flex w-[25%] justify-end items-center gap-3 text-lg'>
						<FiUsers />
						<span>{event.participants.length}</span>
					</div>
				</div>
				<div className='grid justify-stretch gap-2 mt-3 event_card_button_wrap items-start'>
					{userInfo._id !== event.userId ? (
						event.type == 'Public Event' ? (
							hasUserJoined || isJoined ? (
								<button
									className='primary_btn !py-1 !text-sm !leading-[28px] !px-1 w-full !text-[12px]'
									disabled
								>
									Joined
								</button>
							) : (
								<button
									className='primary_btn !py-1 !text-sm !leading-[28px] !px-1 w-full !text-[12px]'
									onClick={() => handleJoinEvent(event._id)}
								>
									Join Now
								</button>
							)
						) : event.type == 'Private Event' ? (
							hasUserPending || isJoined ? (
								<button
									className='primary_btn !py-1 !text-sm !leading-[28px] !px-1 w-full !text-[12px]'
									onClick={() => handleJoinEvent(event._id)}
								>
									Request Sent
								</button>
							) : hasUserJoined ? (
								<button
									className='primary_btn !py-1 !text-sm !leading-[28px] !px-1 w-full !text-[12px]'
									disabled
								>
									Joined
								</button>
							) : (
								<button
									className='primary_btn !py-1 !text-sm !leading-[28px] !px-1 w-full !text-[12px]'
									onClick={() => handleJoinEvent(event._id)}
								>
									Join Request
								</button>
							)
						) : (
							''
						)
					) : (
						''
					)}
					<button
						className='primary_btn !py-1 !text-[12px] !leading-[28px] w-full'
						onClick={() => handleEvent(event._id)}
					>
						View Details
					</button>
				</div>
			</div>
		</div>
	);
};
export default EventCard;
