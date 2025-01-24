import React, { useDebugValue, useEffect, useState } from 'react';
import api from '../utils/api';
import { useDispatch, useSelector } from 'react-redux';
import MyMediaAddNew from './MyMediaAddNew';
import { useNavigate, useParams } from 'react-router-dom';
import EditMediaPopup from '../components/Profile/EditMediaPopup/EditMediaPopup';
import { loadUser } from '../redux/actions/auth';

const MyMediaUniversal = () => {
	const { user } = useSelector(state => state.auth);
	const [userInfo, setUserInfo] = useState(user);
	const [addNew, setAddNew] = useState(false);
	const [filteredMedia, setFilteredMedia] = useState([]);
	const [isActivePublic, setIsActivePublic] = useState(true);
	const [isHide, setIsHide] = useState(true);
	const [selectedMedia, setSelectedMedia] = useState(null);
	const navigate = useNavigate();
	const dispatch = useDispatch();

	const { type } = useParams();

	const handleSaveMedia = async updatedMedia => {
		const updatedList = filteredMedia.map(media =>
			media._id === updatedMedia._id ? updatedMedia : media
		);
		await api
			.post(
				`/update_media/${user._id}/${type === 'photos' ? 'media' : 'videos'}`,
				{
					media: {...updatedList[0]},
				}
			)
			.then(() => dispatch(loadUser()));
		// setFilteredMedia(updatedList);
		// setUserInfo({
		// 	...userInfo,
		// 	[type === 'photos' ? 'mymedia' : 'videos']: updatedList,
		// });
	};

	const onDelete = async item => {
		if (type === 'photos') {
			await api
				.post(`/delete_media/${user._id}`, {
					mediaId: item._id,
				})
				.then(() => dispatch(loadUser()));
		} else {
			await api
				.post(`/delete_video/${user._id}`, {
					videoId: item._id,
				})
				.then(() => dispatch(loadUser()));
		}
	};

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
			{selectedMedia && (
				<EditMediaPopup
					media={selectedMedia}
					onClose={() => setSelectedMedia(null)}
					onSave={handleSaveMedia}
				/>
			)}
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
							<div style={{gap: '20px', display: 'flex'}}>
								<button
									style={{ width: '150px' }}
									className='primary_btn !py-1 !text-sm !leading-[28px] !px-1 !text-[12px]'
									onClick={() => navigate(-1)}
								>{`<- BACK`}</button>
								<button
									style={{ width: '150px' }}
									className='primary_btn !py-1 !text-sm !leading-[28px] !px-1 !text-[12px]'
									onClick={() => setAddNew(true)}
								>
									Add New
								</button>
							</div>
						</div>
						<div className='flex justify-center flex-wrap gap-5 items-center mb-5 sm:mb-8 w-full'>
							<div
								className='flex justify-center flex-wrap gap-5 items-center sm:mb-8'
								style={{ width: '500px' }}
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
						</div>
						{!isActivePublic &&
							user.privatePassword !== '' &&
							user.privatePassword && (
								<div
									style={{
										width: '100%',
										display: 'flex',
										justifyContent: 'center',
										marginBottom: '20px',
									}}
								>
									<p>
										Private Password:{' '}
										{!isHide
											? user?.privatePassword
											: '*'.repeat(user?.privatePassword.length)}
									</p>
									<button
										className='inline-flex rounded-md items-center gap-1 gradient text-sm sm:text-sm font-semibold cursor-pointer px-2 ml-3'
										onClick={() => setIsHide(!isHide)}
									>
										{isHide ? 'Show' : 'Hide'}
									</button>
									<button
										className='inline-flex rounded-md items-center gap-1 gradient text-sm sm:text-sm font-semibold cursor-pointer px-2 ml-3'
										onClick={() => navigate('/edit-detail')}
									>
										Edit
									</button>
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
											{type === 'photos' ? (
												<div
													style={{
														width: '250px',
														height: '200px',
														display: 'flex',
														alignItems: 'center',
														justifyContent: 'center',
													}}
												>
													<img
														src={item?.image || item}
														alt=''
														srcset=''
														className='main-image'
														style={{ maxHeight: '200px' }}
													/>
												</div>
											) : (
												<video
													controls
													src={item?.video || item}
													alt=''
													srcset=''
													style={{
														width: '250px',
														height: '200px',
													}}
												></video>
											)}
											<div style={{ display: 'flex', marginTop: '20px' }}>
												<button
													style={{ marginRight: '10px' }}
													className='primary_btn !py-1 !text-sm !leading-[28px] !px-1 w-full !text-[12px]'
													onClick={() => setSelectedMedia(item)}
												>
													Edit
												</button>
												<button
													style={{ marginLeft: '10px' }}
													className='primary_btn !py-1 !text-sm !leading-[28px] !px-1 w-full !text-[12px]'
													onClick={() => onDelete(item)}
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
