import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { GrStar } from 'react-icons/gr';
import { MdOutlineModeEditOutline } from 'react-icons/md';
import { RiDeleteBin6Line } from 'react-icons/ri';
import { TiPlus } from 'react-icons/ti';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import api from '../../utils/api';
import { FaArrowLeft } from 'react-icons/fa6';
export default function MyTravel() {
	const [age, setAge] = useState('');
	const [age2, setage2] = useState('');
	const BASE_URL = process.env.REACT_APP_BASE_URL;
	const [travel, setTravel] = useState([]);
	const navigate = useNavigate();
	const { user } = useSelector(state => state.auth);
	const [userInfo, setUserInfo] = useState(user);
	useEffect(() => {
		setUserInfo(user);
	}, []);
	useEffect(() => {
		if (userInfo?._id) {
			api.get(`/search_travel?q=${userInfo?._id}`).then(res => {
				const data = res.data;
				// const filterData = data.filter(data => data.userId._id === userInfo._id);
				setTravel(data);
			});
		}
	}, [userInfo]);

	console.log(travel, 'yyy');

	const formatDate = dateString => {
		const originalTimestamp = dateString;
		const date = new Date(originalTimestamp);
		const formattedDate = `${date.getUTCDate()}/${date.getUTCMonth() +
			1}/${date.getUTCFullYear()}`;
		return formattedDate;
	};

	// _____________CALCULATE AGE______________________

	const calculateAge = dateOfBirth => {
		const dob = new Date(dateOfBirth);
		const today = new Date();
		const age = today.getFullYear() - dob.getFullYear();

		if (
			today.getMonth() < dob.getMonth() ||
			(today.getMonth() === dob.getMonth() && today.getDate() < dob.getDate())
		) {
			age--;
		}

		return age;
	};

	// Use the calculateAge function to get the age for single users or couple members

	useEffect(() => {
		{
			travel.map(travel => {
				if (travel?.userId?.profile_type === 'single') {
					setAge(calculateAge(travel.userId.DOB));
				} else {
					setAge(calculateAge(travel?.userId?.couple?.person1.DOB));
					setage2(calculateAge(travel.userId.couple.person2.DOB));
				}
			});
		}
	}, [travel]);

	const deleteTravel = async id => {
		const deleteTravelPromise = axios.delete(
			`${BASE_URL}/api/delete_travel/${id}`
		);

		toast.promise(deleteTravelPromise, {
			loading: 'Deleting travel...',
			success: 'Travel deleted successfully!',
			error: 'Failed to delete travel.',
		});

		try {
			const res = await deleteTravelPromise;

			if (res.data === 'travel delete successfully') {
				navigate('/travel-page');
			}
		} catch (error) {
			console.error('Error deleting travel:', error);
		}
	};

	const handleEdit = id => {
		navigate('/edit_travel/' + id);
	};

	const handleTravel = id => {
		navigate(`/user-detail/${id}`);
	};

	return (
		<>
			<div className='bg-black py-8 px-6 rounded-2xl xl:rounded-r-none'>
				<div className='flex gap-2 flex-wrap justify-between mb-5'>
					<span
						className='primary_btn cursor-pointer !text-sm  !px-3 !leading-2 !py-3'
						onClick={() => navigate(-1)}
					>
						<span className='text-sm inline-flex items-center mr-2'>
							<FaArrowLeft />
						</span>
						Back
					</span>
					<span
						className='inline-flex rounded-md items-center gap-1 p-2 bg-orange text-sm sm:text-xl font-semibold cursor-pointer'
						onClick={() => navigate('/create_travel')}
					>
						<span className='flex items-center'>
							<TiPlus />
						</span>
						Travel Plan
					</span>
				</div>
				<div className='grid sm:grid-cols-2 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-3 gap-5'>
					{travel?.map(travel => (
						<div className='w-full cursor-pointer p-3 bg-light-grey rounded-2xl flex flex-wrap sm:grid grid-cols-2'>
							<div className='w-2/5 sm:w-full'>
								{/* <img
                src="images/travel-card-2.png"
                alt="travel-card"
                className="w-full object-cover h-full aspect-11/10 rounded-2xl"
              /> */}
								<img
									className='w-full object-cover h-full aspect-11/10 rounded-2xl'
									src={travel.image}
									onClick={() => handleTravel(travel?.userId?._id)}
								/>
							</div>
							<div className='w-3/5 sm:w-full px-4 pr-0 grid content-between relative gap-2'>
								<div className='flex items-center gap-1 text-xs'>
									<p className='flex items-center gap-1'>
										<span className='flex text-light-yellow'>
											<GrStar />
										</span>
									</p>
									<p className='text-[12px] font-medium text-bright-orange'>
										{travel.name}
									</p>
								</div>
								<div className='flex justify-between items-center'>
									<div className='text-[12px] gap-1 flex items-center'>
										{/* {userInfo.profile_type === "single" ? (
  userInfo.gender === "male" ? (
    <span className="text-navy-blue">{travel.age}</span>
  ) : userInfo.gender === "female" ? (
    <span className="text-pink-400">{travel.age}</span>
  ) : (
    <span className="text-violet">{travel.age}</span>
  )
) : (
  <div>
    {userInfo?.couple?.person1?.gender === "male" ? (
      <span className="text-navy-blue px-1">{travel.age}</span>
    ) : userInfo?.couple?.person1?.gender === "female" ? (
      <span className="text-pink-400 px-1">{travel.age}</span>
    ) : (
      <span className="text-violet px-1">{travel.age}</span>
    )}
    |
    {userInfo?.couple?.person2?.gender === "male" ? (
      <span className="text-navy-blue px-1">{travel.age2}</span>
    ) : userInfo?.couple?.person2?.gender === "female" ? (
      <span className="text-pink-400 px-1">{travel.age2}</span>
    ) : (
      <span className="text-violet px-1">{travel.age2}</span>
    )}
  </div>
)} */}

										{travel.userId.profile_type === 'single' ? (
											<div className='text-[12px] gap-1 flex items-center'>
												<span
													className={
														travel.userId.gender === 'male'
															? 'text-[#3A97FE]'
															: travel.userId.gender === 'female'
															? 'text-[#FF2A90]'
															: 'text-[#cf00cf]'
													}
												>
													{age}
												</span>
											</div>
										) : (
											<div className='text-[12px] gap-1 flex items-center'>
												<span
													className={
														travel.userId.couple.person1.gender === 'male'
															? 'text-[#3A97FE]'
															: travel.userId.couple.person1.gender === 'female'
															? 'text-[#FF2A90]'
															: 'text-[#cf00cf]'
													}
												>
													{age}
												</span>
												|
												<span
													className={
														travel.userId.couple.person2.gender === 'male'
															? 'text-[#3A97FE]'
															: travel.userId.couple.person2.gender === 'female'
															? 'text-[#FF2A90]'
															: 'text-[#cf00cf]'
													}
												>
													{age2}
												</span>
											</div>
										)}
									</div>
									<div className='flex flex-wrap gap-1'>
										<span className='w-4 h-4 flex items-center justify-center rounded-full bg-white p-1'>
											<img
												src='images/desk_icon.png'
												alt='desk_icon'
												className='max-w-full'
											/>
										</span>
										{/* <span className="w-4 h-4 flex items-center justify-center rounded-full bg-white p-1">
                <img
                  src="images/mob_icon.png"
                  alt="mob_icon"
                  className="max-w-full"
                />
              </span>
              <span className="w-4 h-4 flex items-center justify-center rounded-full bg-white p-1">
                <img
                  src="images/cal_icon.png"
                  alt="cal_icon"
                  className="max-w-full"
                />
              </span> */}
									</div>
								</div>
								<div className='flex w-[75%] flex-wrap items-center gap-1'>
									{travel?.interested.includes('M') ? (
										<img
											src='images/Male.png'
											alt='male-user'
											className='h-[18px]'
										/>
									) : (
										''
									)}
									{travel?.interested.includes('F') ? (
										<img
											src='images/Female.png'
											alt='woman'
											className='h-[18px]'
										/>
									) : (
										''
									)}
									{travel?.interested.includes('MF') ? (
										<img
											src='images/malefemale.png'
											alt='couple'
											className='h-[15px]'
										/>
									) : (
										''
									)}
									{travel?.interested.includes('MM') ? (
										<img
											src='images/malemale.png'
											alt='couple'
											className='h-[15px]'
										/>
									) : (
										''
									)}
									{travel?.interested.includes('FF') ? (
										<img
											src='images/femaleFemale.png'
											alt='couple'
											className='h-[15px]'
										/>
									) : (
										''
									)}
									{travel?.interested.includes('T') ? (
										<img
											src='images/Trans.png'
											alt='couple'
											className='h-[15px]'
										/>
									) : (
										''
									)}
								</div>
								<div>
									<p className='text-[12px] flex items-center'>
										<span className='inline-flex items-center pr-1 font-body_font'>
											{/* <img src="images/loc-icon.png" alt="Location-icon" /> */}
											{/* Delhi, IND */}
											{/* {travel.locationfrom} */}
										</span>
										<span className='px-1 inline-block border-l border-white'>
											{/* 146 min */}
										</span>
									</p>
								</div>
								<div className='flex text-[#FF0000] text-[12px] flex-wrap gap-1 leading'>
									<img src='images/loc-icon.png' alt='Location-icon' />
									{travel.locationto.display_name.length <= 20 ? (
										<span className='font-body_font'>
											{travel.locationto.display_name}
										</span>
									) : (
										<span className='font-body_font'>
											{travel.locationto.display_name?.slice(0, 17)}...
										</span>
									)}
									{/* { calculatePreciseDistance(travel?.location?.lon,savedCred.long,travel?.location?.lat,savedCred.lat).slice(0,3)}miles */}
									{/* <span>14min</span> */}
									{/* <span>|</span> */}
									<span className='font-body_font'>
										{formatDate(travel.startDate)} to{' '}
										{formatDate(travel.endDate)}
									</span>
								</div>
								<div className='flex justify-between gap-2 items-start'>
									<p className='travel_desc text-sm font-body_font'>
										{travel.description}
									</p>
									<div className='flex gap-2'>
										<div
											className='inline-flex items-center text-xl'
											onClick={() => handleEdit(travel._id)}
										>
											<MdOutlineModeEditOutline />
										</div>
										<div
											className='inline-flex items-center text-xl'
											onClick={() => deleteTravel(travel._id)}
										>
											<RiDeleteBin6Line />
										</div>
									</div>
								</div>
							</div>
						</div>
					))}
				</div>
			</div>
		</>
	);
}
