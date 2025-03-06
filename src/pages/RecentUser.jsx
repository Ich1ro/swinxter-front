import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import api from '../utils/api';
import UserCard from '../components/Cards/UserCard';
import { calculateDistance } from '../utils/utils';
import { Link, useLocation } from 'react-router-dom';

const RecentUser = () => {
	const [users, setUsers] = useState([]);
	const [usersData, serUsersData] = useState([]);
	const { user } = useSelector(state => state.auth);
	const [userInfo, setUserInfo] = useState(user);
	const [filterDropdown, setFilterDropdown] = useState(false);
	const location = useLocation();

	const [filter, setFilter] = useState({
		genderType: [],
	});

	const handlereset = () => {
		setFilter({
			genderType: [],
		});
		setFilterDropdown(false);
		setUsers(usersData);
	};

	const getRecentUsers = async () => {
		let userArr = [];
		const { data } = await api.get(`/recent_users`);
		data.users.map(d => {
			if (d._id !== userInfo._id && !userInfo.blockedby.includes(d._id)) {
				userArr.push(d);
			}
		});
		const sortedUsers = data.users
			.filter(
				d => d._id !== userInfo._id && !userInfo.blockedby.includes(d._id)
			)
			.map(user => {
				if (user.geometry?.coordinates && userInfo.geometry?.coordinates) {
					const distance = calculateDistance(
						userInfo.geometry?.coordinates[0],
						user.geometry?.coordinates[0],
						userInfo.geometry?.coordinates[1],
						user.geometry?.coordinates[1]
					);
					return { ...user, distance };
				}
				return { ...user, distance: null };
			})
			.sort((a, b) => {
				if (a.distance === null) return 1;
				if (b.distance === null) return -1;
				return a.distance - b.distance;
			});
		console.log(sortedUsers);
		setUsers(sortedUsers);
		serUsersData(sortedUsers);
	};

	const handleGenderChange = (e, type) => {
		const newFilter = e.target.checked
			? [...filter.genderType, type]
			: filter.genderType.filter(g => g !== type);
		setFilter(prev => ({ ...prev, genderType: newFilter }));
	};

	const handleCheck = e => {
		e.preventDefault();
		let filteredUsers = usersData;

		if (filter.genderType.length > 0) {
			filteredUsers = filteredUsers.filter(user => {
				if (
					filter.genderType.includes('Couples') &&
					user.profile_type === 'couple'
				) {
					return true;
				} else if (filter.genderType.includes('Male') && user.gender === 'male') {
					return true;
				} else if (filter.genderType.includes('Female') && user.gender === 'female') {
					return true;
				} else if (filter.genderType.includes('Transgender') && user.profile_type !== 'couple' && user.gender !== 'male' && user.gender !== 'female') {
					return true;
				}
			});
		}

		setUsers(filteredUsers);
		setFilterDropdown(false);
	};

	useEffect(() => {
		getRecentUsers();
	}, []);

	if (location.pathname === '/home' && users.length === 0) {
		return null;
	}

	return (
		<>
			<div className='home_page bg-black py-8 px-6 rounded-2xl'>
				<div className='mb-20'>
					<div className='flex justify-between flex-wrap gap-5 items-center mb-5 sm:mb-8'>
						<h3 className='text-2xl sm:text-5xl leading-none font-bold'>
							New Members
						</h3>
						{location.pathname === '/home' ? (
							<Link
								to='/recentuser'
								className='primary_btn !text-sm sm:!text-xl'
							>
								View More
							</Link>
						) : (
							<div className='inline-flex gap-1 items-center relative'>
								<span
									className='inline-flex gap-1 items-center cursor-pointer'
									onClick={() => setFilterDropdown(!filterDropdown)}
								>
									<img
										src='images/filter-icon.png'
										alt='filter-icon'
										className='max-w-full cursor-pointer w-5'
									/>
									<span>Filter</span>
								</span>
								<div
									className={`filter_dropdown absolute w-[250px] right-0 bg-[#2A2D37] top-full ${
										filterDropdown ? 'Active' : ''
									}`}
								>
									<div className='flex justify-end text-red'>
										<button onClick={handlereset}>Reset</button>
									</div>
									<form>
										<div className='filter_dropbox'>
											{['Couples', 'Female', 'Male', 'Transgender'].map(
												type => (
													<div className='filter_item' key={type}>
														<input
															type='checkbox'
															id={type}
															name={type}
															checked={filter.genderType.includes(type)}
															onChange={e => handleGenderChange(e, type)}
														/>
														<label className='toggle_switch' htmlFor={type}>
															<span className='toggle_circle'></span>
														</label>
														<span>{type}</span>
													</div>
												)
											)}
										</div>
										<div className='mt-5'>
											<input
												type='submit'
												id='submit'
												className='outline-none rounded-[30px] mt-2 bg-[#0075ff] text-white border-none py-2 px-3 w-full cursor-pointer'
												value='Ok'
												onClick={handleCheck}
											/>
										</div>
									</form>
								</div>
							</div>
						)}
					</div>
					{location.pathname === '/home' ? (
						<div className='grid sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 2xl:grid-cols-4 gap-6'>
							{users.slice(0, 4).map((user, i) => (
								<UserCard key={i} userInfo={user} />
							))}
						</div>
					) : (
						<div className='grid sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 2xl:grid-cols-3 gap-6'>
							{users.map((user, i) => (
								<UserCard key={i} userInfo={user} />
							))}
						</div>
					)}
				</div>
			</div>
		</>
	);
};

export default RecentUser;
