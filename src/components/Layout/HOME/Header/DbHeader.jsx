import React, { useContext, useState, useEffect, useRef } from 'react';
import { IoSearchOutline } from 'react-icons/io5';
import { RxCross1 } from 'react-icons/rx';
import { HiChevronDown } from 'react-icons/hi2';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import './db_header.css';
import Sidebar from '../Layout/Sidebar';
import { useSelector } from 'react-redux';
import { Context } from '../../../../Context/context';
import Notification from './Notification';
import api from '../../../../utils/api';

const DbHeader = ({ socket }) => {
	const dropdownRef = useRef(null);
	const [isOpen, setIsOpen] = useState(false);
	const [menuOpen, setMenuOpen] = useState(false);
	const [sidebar, setSidebar] = useState(true);
	const location = useLocation();
	const { pathname } = location;
	const { user } = useSelector(state => state.auth);
	const [userInfo, setUserInfo] = useState(user);
	const [realtimeNotification, setRealtimeNotification] = useState([]);
	const [notifications, setNotifications] = useState([]);
	const [notificationCount, setNotificationCount] = useState(null);
	const navigate = useNavigate();

	useEffect(() => {
		setUserInfo(user);
	}, []);

	const { searchquery, setSearchQuery, search, setSearch } = useContext(
		Context
	);
	const handleSubmit = e => {
		e.preventDefault();
		setSearch(!search);
	};

	const handleChange = e => {
		setSearchQuery(e.target.value);
	};

	const getDbNotifcations = async () => {
		const res = await api.get(`/notifications/${user._id}`);
		setNotifications(res.data);
	};

	const handleNotification = async notification => {
		console.log(notification);

		// const res = await api.post(`set-notifications/${user._id}`, {count: 0})
		const res = await api
			.get(`/notifications-status/${notification._id}`)
			.then(async () => {
				await getDbNotifcations().then(() => {
					toggleDropdown();
					if (notification.type === 'superlike') {
						navigate(`/user-detail?id=${notification.senderId}`);
					} else if (notification.type === 'friendRequest') {
						navigate('/recieved_request');
					}
				});
			});
		console.log(res);
	};

	useEffect(() => {
		if (user?._id && user.role !== 'business') {
			getDbNotifcations();
		}
	}, [user]);

	useEffect(() => {
		function handleClickOutside(event) {
			if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
				setIsOpen(false);
				// setNotificationCount(0);
			}
		}

		document.addEventListener('mousedown', handleClickOutside);
		return () => {
			document.removeEventListener('mousedown', handleClickOutside);
		};
	}, []);

	useEffect(() => {
		socket?.on('getNotification', data => {
			setRealtimeNotification(prev => [...prev, data]);
		});
	}, [socket]);

	useEffect(() => {
		console.log(realtimeNotification);

		// if (realtimeNotification && realtimeNotification?.length > 0) {
		// 	getDbNotifcations();
		// }
	}, [realtimeNotification]);

	useEffect(() => {
		if (notifications) {
			setNotificationCount(
				notifications?.filter(notification => !notification?.read)?.length
			);
		}
	}, [notifications]);

	const toggleDropdown = () => {
		setIsOpen(!isOpen);
	};

	const handleDeleteNotification = async notification => {
		await api
			.post(`/delete_notification/${user._id}`, {
				notification_id: notification._id,
			})
			.then(() => {
				getDbNotifcations();
			});
		// setNotifications(res.data);
	};

	return (
		<header className='py-8 bg-black-20 top-0 xl:static xl:bg-transparent xl:py-0 mb-4'>
			<div
				className='flex justify-between xl:justify-center items-center xl:items-start px-5'
				style={{
					alignItems: 'center',
				}}
			>
				<div className='w-1/5 pr-5 flex justify-end'>
					<Link
						to={user ? '/home' : '/'}
						className='flex justify-center w-full max-w-[15rem]'
					>
						<img
							src='/landingPage/images/SwinxterLogo-bg.svg'
							alt='Logo'
							className='cursor-pointer block'
							style={{ maxWidth: '70px' }}
							height={'auto'}
						/>
					</Link>
				</div>
				<span
					className='block xl:hidden w-10 cursor-pointer'
					onClick={() => setMenuOpen(!menuOpen)}
				>
					<img src='images/toggle-btn.png' alt='toggle' className='w-full' />
				</span>
				<div
					className={`xl:w-4/5 mobile_db_header ${
						menuOpen ? 'mobile_db_header_open' : ''
					}`}
				>
					<div
						className='flex-wrap grid xl:flex content-start xl:items-start mobile_db_header_inner relative'
						style={{
							alignItems: 'center',
						}}
					>
						<span
							className='text-xl text-white absolute top-3 right-5 flex z-9 xl:hidden cursor-pointer'
							onClick={() => setMenuOpen(false)}
						>
							<RxCross1 />
						</span>
						<Link
							to={user ? '/home' : '/'}
							className={
								menuOpen
									? 'logo-styles'
									: 'absolute top-[60px] left-5 w-full max-w-[100px] block xl:hidden'
							}
						>
							<img
								src='/landingPage/images/SwinxterLogo-bg.svg'
								alt='Logo'
								className={menuOpen ? '' : 'cursor-pointer max-w-100px block'}
							/>
						</Link>
						{/* <div className='xl:w-4/5'>
							<form onSubmit={handleSubmit}>
								<div className='relative text-white '>
									<span className='absolute top-1/2 left-5 transform -translate-y-1/2 text-2xl flex items-center'>
										<IoSearchOutline />
									</span>
									<input
										type='search'
										className='outline-none border-none w-full px-5 pl-16 h-14 bg-light-grey rounded-xl'
										onChange={handleChange}
										value={searchquery}
									/>
								</div>
							</form>
							<div className='db_header_nav w-full px-[50px]'>
								<ul className='xl:flex items-center justify-between grid gap-y-2'>
									<li
										className={`${
											pathname === '/home'
												? 'text-orange'
												: 'text-white hover:text-orange'
										}`}
									>
										<Link to='/home'>Home</Link>
									</li>
									<li
										className={`${
											pathname === '/live-chat'
												? 'text-orange'
												: 'text-white hover:text-orange'
										}`}
									>
										<Link to='/live-chat'>Live Chat</Link>
									</li>
									<li
										className={`${
											pathname === '/travel-page'
												? 'text-orange'
												: 'text-white hover:text-orange'
										}`}
									>
										<Link to='/travel-page'>Situationship</Link>
									</li>
								</ul>
							</div>
						</div> */}
						<div
							className='flex items-center xl:pl-5 flex-wrap order-first xl:order-2 xl:mt-0 xl:mb-0 mb-5 w-full header-notification'
							style={{ position: 'relative' }}
						>
							{/* <div className="cursor-pointer w-10 flex justify-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="23"
                  height="22"
                  viewBox="0 0 23 22"
                  fill="none"
                >
                  <path
                    d="M22.2697 17.3665L20.9716 13.5886C21.5974 12.3095 21.928 10.887 21.9302 9.45563C21.9341 6.96685 20.9712 4.61366 19.2189 2.82957C17.4662 1.04513 15.1307 0.0406396 12.6425 0.00122114C10.0624 -0.0395506 7.63723 0.941851 5.81399 2.76505C4.05592 4.52308 3.0808 6.84074 3.04994 9.31742C1.31718 10.622 0.294444 12.656 0.297805 14.8286C0.29942 15.8453 0.528248 16.8559 0.961851 17.7697L0.067711 20.3718C-0.0859904 20.8191 0.0262845 21.3048 0.360752 21.6393C0.596128 21.8747 0.906456 22 1.2256 22C1.35988 22 1.49572 21.9778 1.62821 21.9323L4.23031 21.0382C5.14418 21.4718 6.15479 21.7006 7.17146 21.7022C7.17513 21.7022 7.17862 21.7022 7.18229 21.7022C9.38719 21.7021 11.4367 20.653 12.7365 18.8778C14.0892 18.8422 15.4276 18.5147 16.6375 17.9228L20.4154 19.221C20.5728 19.2751 20.7342 19.3014 20.8938 19.3014C21.273 19.3014 21.6418 19.1525 21.9216 18.8727C22.319 18.4752 22.4524 17.8981 22.2697 17.3665ZM7.1822 20.3718C7.17936 20.3718 7.17635 20.3718 7.17351 20.3718C6.27365 20.3705 5.38004 20.1486 4.58944 19.7304C4.42688 19.6444 4.23603 19.6295 4.0622 19.6892L1.39401 20.6061L2.31085 17.9379C2.37057 17.7641 2.35573 17.5732 2.26973 17.4107C1.85145 16.6201 1.62961 15.7265 1.62821 14.8266C1.62598 13.3791 2.18906 12.0071 3.17374 10.9798C3.49537 12.9405 4.42985 14.7473 5.87833 16.17C7.31612 17.5823 9.12344 18.4814 11.0735 18.7754C10.0438 19.7903 8.65583 20.3718 7.1822 20.3718ZM20.9808 17.932C20.9429 17.9698 20.898 17.9801 20.8476 17.9627L16.8032 16.573C16.733 16.5489 16.6599 16.5369 16.5871 16.5369C16.4798 16.5369 16.3728 16.5629 16.276 16.6141C15.1213 17.225 13.8164 17.549 12.5024 17.551C12.4981 17.551 12.4941 17.551 12.4898 17.551C8.08686 17.551 4.45001 13.9743 4.38026 9.57244C4.34512 7.35554 5.1884 5.27203 6.75471 3.70573C8.32101 2.13942 10.4049 1.29644 12.6215 1.33137C17.0276 1.40125 20.6067 5.04482 20.5999 9.45353C20.5978 10.7676 20.2739 12.0725 19.6631 13.2271C19.5771 13.3897 19.5622 13.5805 19.6219 13.7544L21.0116 17.7987C21.0289 17.8494 21.0186 17.8942 20.9808 17.932Z"
                    fill="white"
                  />
                  <path
                    d="M16.4526 5.91528H8.527C8.15962 5.91528 7.86182 6.21313 7.86182 6.58046C7.86182 6.94785 8.15966 7.24565 8.527 7.24565H16.4526C16.82 7.24565 17.1178 6.9478 17.1178 6.58046C17.1178 6.21313 16.82 5.91528 16.4526 5.91528Z"
                    fill="white"
                  />
                  <path
                    d="M16.4526 8.65088H8.527C8.15962 8.65088 7.86182 8.94872 7.86182 9.31606C7.86182 9.6834 8.15966 9.98124 8.527 9.98124H16.4526C16.82 9.98124 17.1178 9.6834 17.1178 9.31606C17.1178 8.94872 16.82 8.65088 16.4526 8.65088Z"
                    fill="white"
                  />
                  <path
                    d="M13.4018 11.3866H8.527C8.15962 11.3866 7.86182 11.6844 7.86182 12.0518C7.86182 12.4192 8.15966 12.717 8.527 12.717H13.4018C13.7692 12.717 14.067 12.4191 14.067 12.0518C14.067 11.6844 13.7692 11.3866 13.4018 11.3866Z"
                    fill="white"
                  />
                </svg>
              </div> */}
							<div
								className='notificationDrp relative ml-2 w-10 flex justify-center'
								ref={dropdownRef}
							>
								<div className='cursor-pointer' onClick={toggleDropdown}>
									{notificationCount > 0 ? (
										<div className='notification_indicator'>
											<p>{notificationCount}</p>
										</div>
									) : null}
									<svg
										onClick={toggleDropdown}
										xmlns='http://www.w3.org/2000/svg'
										width='20'
										height='23'
										viewBox='0 0 20 23'
										fill='none'
									>
										<path
											d='M16.8889 11.6827V9.55553C16.8889 6.45234 14.8262 3.82217 12 2.9631V1.99999C12 0.897197 11.1028 0 10 0C8.89722 0 8.00003 0.897197 8.00003 1.99999V2.9631C5.17381 3.82217 3.11115 6.45229 3.11115 9.55553V11.6827C3.11115 14.4086 2.07213 16.9933 0.185518 18.9607C0.00062972 19.1535 -0.0513257 19.438 0.053474 19.6837C0.158274 19.9294 0.399606 20.0888 0.666717 20.0888H6.73377C7.04345 21.6085 8.39029 22.7555 10 22.7555C11.6098 22.7555 12.9565 21.6085 13.2663 20.0888H19.3333C19.6004 20.0888 19.8417 19.9294 19.9465 19.6837C20.0513 19.438 19.9994 19.1535 19.8145 18.9607C17.9279 16.9933 16.8889 14.4085 16.8889 11.6827ZM9.33336 1.99999C9.33336 1.6324 9.63242 1.33333 10 1.33333C10.3676 1.33333 10.6667 1.6324 10.6667 1.99999V2.69901C10.4473 2.67786 10.2249 2.66666 10 2.66666C9.77513 2.66666 9.55278 2.67786 9.33336 2.69901V1.99999ZM10 21.4222C9.13091 21.4222 8.38989 20.8648 8.11469 20.0888H11.8853C11.6101 20.8648 10.8691 21.4222 10 21.4222ZM2.1036 18.7555C3.62186 16.7203 4.44448 14.2574 4.44448 11.6827V9.55553C4.44448 6.4922 6.9367 3.99999 10 3.99999C13.0633 3.99999 15.5556 6.4922 15.5556 9.55553V11.6827C15.5556 14.2574 16.3782 16.7203 17.8965 18.7555H2.1036Z'
											fill='white'
										/>
										<path
											d='M18.6665 9.55552C18.6665 9.9237 18.965 10.2222 19.3332 10.2222C19.7014 10.2222 19.9998 9.9237 19.9998 9.55552C19.9998 6.88442 18.9597 4.37318 17.0709 2.48443C16.8106 2.22412 16.3885 2.22408 16.1281 2.48443C15.8678 2.74479 15.8678 3.16688 16.1281 3.42723C17.7651 5.06416 18.6665 7.24055 18.6665 9.55552Z'
											fill='white'
										/>
										<path
											d='M0.666665 10.2222C1.03484 10.2222 1.33333 9.92367 1.33333 9.5555C1.33333 7.24057 2.23484 5.06418 3.87172 3.42725C4.13208 3.16689 4.13208 2.74481 3.87172 2.48445C3.61141 2.2241 3.18928 2.2241 2.92892 2.48445C1.04017 4.3732 0 6.88439 0 9.5555C0 9.92367 0.298488 10.2222 0.666665 10.2222Z'
											fill='white'
										/>
									</svg>
								</div>
								<div className={`dropdownList ${isOpen ? 'show' : 'hide'}`}>
									<ul>
										
										{notifications.length > 0 ?
											notifications.map((notification, i) => (
												<div className='notification_wrapper'>
													<button
														className='notification_button'
														disabled={notification.read}
														onClick={() => handleNotification(notification)}
														key={i}
													>
														<svg
															xmlns='http://www.w3.org/2000/svg'
															width='20'
															height='23'
															viewBox='0 0 20 23'
															fill='none'
														>
															{' '}
															<path
																d='M16.8889 11.6827V9.55553C16.8889 6.45234 14.8262 3.82217 12 2.9631V1.99999C12 0.897197 11.1028 0 10 0C8.89722 0 8.00003 0.897197 8.00003 1.99999V2.9631C5.17381 3.82217 3.11115 6.45229 3.11115 9.55553V11.6827C3.11115 14.4086 2.07213 16.9933 0.185518 18.9607C0.00062972 19.1535 -0.0513257 19.438 0.053474 19.6837C0.158274 19.9294 0.399606 20.0888 0.666717 20.0888H6.73377C7.04345 21.6085 8.39029 22.7555 10 22.7555C11.6098 22.7555 12.9565 21.6085 13.2663 20.0888H19.3333C19.6004 20.0888 19.8417 19.9294 19.9465 19.6837C20.0513 19.438 19.9994 19.1535 19.8145 18.9607C17.9279 16.9933 16.8889 14.4085 16.8889 11.6827ZM9.33336 1.99999C9.33336 1.6324 9.63242 1.33333 10 1.33333C10.3676 1.33333 10.6667 1.6324 10.6667 1.99999V2.69901C10.4473 2.67786 10.2249 2.66666 10 2.66666C9.77513 2.66666 9.55278 2.67786 9.33336 2.69901V1.99999ZM10 21.4222C9.13091 21.4222 8.38989 20.8648 8.11469 20.0888H11.8853C11.6101 20.8648 10.8691 21.4222 10 21.4222ZM2.1036 18.7555C3.62186 16.7203 4.44448 14.2574 4.44448 11.6827V9.55553C4.44448 6.4922 6.9367 3.99999 10 3.99999C13.0633 3.99999 15.5556 6.4922 15.5556 9.55553V11.6827C15.5556 14.2574 16.3782 16.7203 17.8965 18.7555H2.1036Z'
																fill='white'
															/>{' '}
															<path
																d='M18.6665 9.55552C18.6665 9.9237 18.965 10.2222 19.3332 10.2222C19.7014 10.2222 19.9998 9.9237 19.9998 9.55552C19.9998 6.88442 18.9597 4.37318 17.0709 2.48443C16.8106 2.22412 16.3885 2.22408 16.1281 2.48443C15.8678 2.74479 15.8678 3.16688 16.1281 3.42723C17.7651 5.06416 18.6665 7.24055 18.6665 9.55552Z'
																fill='white'
															/>{' '}
															<path
																d='M0.666665 10.2222C1.03484 10.2222 1.33333 9.92367 1.33333 9.5555C1.33333 7.24057 2.23484 5.06418 3.87172 3.42725C4.13208 3.16689 4.13208 2.74481 3.87172 2.48445C3.61141 2.2241 3.18928 2.2241 2.92892 2.48445C1.04017 4.3732 0 6.88439 0 9.5555C0 9.92367 0.298488 10.2222 0.666665 10.2222Z'
																fill='white'
															/>{' '}
														</svg>
														<span>{notification.message}</span>
													</button>
													<button
														onClick={() =>
															handleDeleteNotification(notification)
														}
														className='close_button'
													>
														x
													</button>
												</div>
											)) : (<div style={{display: 'flex', width: '100%', justifyContent: 'center'}}>
												You dont have notifications
											</div>)
										}
									</ul>
								</div>
							</div>
							<div
								className='ml-4 w-10 cursor-pointer flex items-center header-notification-item'
								style={{ height: '56px' }}
								onClick={() => setSidebar(!sidebar)}
							>
								<Link to={'/user-detail'}>
									{userInfo?.profile_type === 'couple' ? (
										<img
											src={
												userInfo?.image
													? userInfo?.image
													: 'images/couple-avatar.jpg'
											}
											className='block rounded-md object-contain'
										/>
									) : (
										<img
											src={
												userInfo?.image
													? userInfo?.image
													: userInfo?.gender === 'male'
													? '/images/boy-avatar.jpg'
													: userInfo?.gender === 'female'
													? '/images/girl-avatar.jpg'
													: '/images/trans avatar.png'
											}
											className='block rounded-md object-contain'
										/>
									)}
								</Link>
								<span className='flex xl:hidden text-base'>
									<HiChevronDown />
								</span>
							</div>
							<div
								className={`block w-full xl:hidden sidebar_normal ${
									sidebar ? 'sidebar_open' : ''
								}`}
							>
								<Sidebar
									closeMenu={() => {
										setMenuOpen(false);
									}}
								/>
							</div>
						</div>
					</div>
				</div>
			</div>
		</header>
	);
};

export default DbHeader;
