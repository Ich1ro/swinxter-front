import React, { useEffect, useState } from 'react';
import api from '../utils/api';
import { useSelector } from 'react-redux';
import MyMediaAddNew from './MyMediaAddNew';
import { useNavigate, useParams } from 'react-router-dom';

const MyMediaUniversal = () => {
	const { user } = useSelector(state => state.auth);
	const [userInfo, setUserInfo] = useState(user);
	const [addNew, setAddNew] = useState(false);
	const [filteredMedia, setFilteredMedia] = useState([]);
	const [isActivePublic, setIsActivePublic] = useState(true);
	const [isHide, setIsHide] = useState(true);
	const navigate = useNavigate()

	const { type } = useParams();

	useEffect(() => {
		setUserInfo(user);
	}, [user]);

	useEffect(() => {
		console.log(filteredMedia);
	}, [filteredMedia]);

	useEffect(() => {
		if (type === 'photos') {
			setFilteredMedia(
				isActivePublic
					? userInfo?.mymedia?.filter(media => media.isPublic)
					: userInfo?.mymedia?.filter(media => !media.isPublic)
			);
		} else {
			setFilteredMedia(
				isActivePublic
					? userInfo?.videos?.filter(media => media.isPublic)
					: userInfo?.videos?.filter(media => !media.isPublic)
			);
		}
	}, [isActivePublic, userInfo, type]);

	return (
		<>
			{addNew ? (
				<div className='home_page bg-black py-8 px-6 rounded-2xl'>
					<MyMediaAddNew
						user={user}
						type={type}
						setAddNew={setAddNew}
						setUserInfo={setUserInfo}
					/>
				</div>
			) : (
				<div className='home_page bg-black py-8 px-6 rounded-2xl'>
					<div className='mb-20' style={{}}>
						<div className='flex justify-between flex-wrap gap-5 items-center mb-5 sm:mb-8'>
							<h3 className='text-2xl sm:text-5xl leading-none font-bold'>
								{type === 'photos' ? 'My Photos' : 'My Videos'}
							</h3>
							<button
								style={{ width: '150px' }}
								className='primary_btn !py-1 !text-sm !leading-[28px] !px-1 !text-[12px]'
								onClick={() => setAddNew(true)}
							>
								Add New
							</button>
						</div>
						<div
							className='flex justify-between flex-wrap gap-5 items-center mb-5 sm:mb-8'
							style={{ padding: '0 35%' }}
						>
							<button
								style={
									!isActivePublic
										? { width: '150px', opacity: '.5' }
										: { width: '150px' }
								}
								className='primary_btn !py-1 !text-sm !leading-[28px] !px-1 !text-[12px]'
								onClick={() => setIsActivePublic(true)}
							>
								Public
							</button>
							<button
								style={
									isActivePublic
										? { width: '150px', opacity: '.5' }
										: { width: '150px' }
								}
								className='primary_btn !py-1 !text-sm !leading-[28px] !px-1 !text-[12px]'
								onClick={() => setIsActivePublic(false)}
							>
								Private
							</button>
						</div>
						{!isActivePublic && (user.privatePassword !== '' && user.privatePassword) && (
							<div
								style={{
									width: '100%',
									display: 'flex',
									justifyContent: 'center',
									marginBottom: '20px',
								}}
							>
								<p>Private Password: {!isHide ? user?.privatePassword : '*'.repeat(user?.privatePassword.length)}</p>
								<button className='inline-flex rounded-md items-center gap-1 gradient text-sm sm:text-sm font-semibold cursor-pointer px-2 ml-3' onClick={() => setIsHide(!isHide)}>{isHide ? 'Show' : 'Hide'}</button>
								<button className='inline-flex rounded-md items-center gap-1 gradient text-sm sm:text-sm font-semibold cursor-pointer px-2 ml-3' onClick={() => navigate('/edit-detail')}>Edit</button>
							</div>
						)}

						<div style={{ display: 'flex', flexWrap: 'wrap' }}>
							{filteredMedia.length > 0
								? filteredMedia.map((item, i) => (
										<div
											style={{
												padding: '10px',
												borderRadius: '10px',
												backgroundColor: '#2A2D37',
												marginRight: '10px',
											}}
											key={i}
										>
											<div
												style={{
													width: '250px',
													height: '200px',
													display: 'flex',
													alignItems: 'center',
													justifyContent: 'center',
												}}
											>
												{type === 'photos' ? (
													<img
														src={item?.image || item}
														alt=''
														srcset=''
														style={
															{
																// width: '250px',
																// height: '200px',
															}
														}
													/>
												) : (
													<video
														controls
														src={item?.video || item}
														alt=''
														srcset=''
														style={
															{
																// width: '250px',
																// height: '200px',
															}
														}
													></video>
												)}
											</div>
											<div style={{ display: 'flex', marginTop: '20px' }}>
												<button
													style={{ marginRight: '10px' }}
													className='primary_btn !py-1 !text-sm !leading-[28px] !px-1 w-full !text-[12px]'
													// onClick={message}
												>
													Edit
												</button>
												<button
													style={{ marginLeft: '10px' }}
													className='primary_btn !py-1 !text-sm !leading-[28px] !px-1 w-full !text-[12px]'
													// onClick={message}
												>
													Delete
												</button>
											</div>
										</div>
								  ))
								: null}
						</div>
					</div>
				</div>
			)}
		</>
	);
};

export default MyMediaUniversal;
