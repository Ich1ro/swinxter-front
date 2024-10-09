import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import api from '../utils/api';
import UserCard from '../components/Cards/UserCard';
import { IoSearchOutline } from 'react-icons/io5';

const AllUsers = () => {
	const [users, setUsers] = useState([]);
	const { user } = useSelector(state => state.auth);
	const [filteredUsers, setFilteredUsers] = useState([]);
	const [userInfo, setUserInfo] = useState(user);
	const [search, setSearch] = useState('');
	const [filters, setFilters] = useState({
		male: false,
		female: false,
		transgender: false,
	});
	const [profileTypes, setProfileTypes] = useState({
		single: false,
		couple: false,
	});

	const handleGenderChange = e => {
		const { name, checked } = e.target;
		setFilters(prevFilters => ({
			...prevFilters,
			[name]: checked,
		}));
	};

	const handleProfileTypeChange = e => {
		const { name, checked } = e.target;
		setProfileTypes(prevProfileTypes => ({
			...prevProfileTypes,
			[name]: checked,
		}));
	};

	const handleSearch = e => {
		setSearch(e.target.value);
	};

	const getAllUsers = async () => {
		let userArr = [];
		const { data } = await api.get(`/users`);
		data.map(d => {
			if (d._id !== userInfo._id && !userInfo.blockedby.includes(d._id)) {
				userArr.push(d);
			}
		});
		setUsers(userArr);
	};

	useEffect(() => {
		getAllUsers();
	}, []);

	useEffect(() => {
		let filtered = users.filter(user => {
			const matchesSearch = user.username
				.toLowerCase()
				.includes(search.trim().toLowerCase());

			const matchesGender =
				(filters.male && user.gender === 'male') ||
				(filters.female && user.gender === 'female') ||
				(filters.transgender && !user.gender && user.profile_type === 'single') ||
				(!filters.male && !filters.female && !filters.transgender);

			const matchesProfileType =
				(profileTypes.single && user.profile_type === 'single') ||
				(profileTypes.couple && user.profile_type === 'couple') ||
				(!profileTypes.single && !profileTypes.couple);

			return matchesSearch && matchesGender && matchesProfileType;
		});
		console.log(filtered);
		
		setFilteredUsers(filtered);
	}, [search, filters, users, profileTypes]);

	useEffect(() => {
		console.log(filteredUsers);
		
	}, [filteredUsers])

	// let filteredUsers = users.filter(user => {
	// 	return user.username.toLowerCase().includes(search.trim().toLowerCase());
	// });

	return (
		<div
			className='home_page bg-black py-8 px-6 rounded-2xl'
			style={{
				display: 'flex',
				justifyContent: 'space-between',
				position: 'relative',
			}}
		>
			<div
				className='text-white bg-light-grey px-5 py-5 rounded-2xl'
				style={{
					width: '20%',
					height: '100vh',
					position: 'sticky',
					top: '15px',
				}}
			>
				<p
					style={{ fontWeight: '500', fontSize: '18px', marginBottom: '20px' }}
				>
					Filters
				</p>
				<p style={{ fontSize: '18px', marginBottom: '10px' }}>Gender:</p>
				<div style={{ padding: '0 10px', marginBottom: '20px' }}>
					<div
						style={{
							display: 'flex',
							alignItems: 'center',
							marginBottom: '10px',
						}}
					>
						<input
							type='checkbox'
							name='male'
							checked={filters.male}
							onChange={handleGenderChange}
							style={{ width: '20px', marginRight: '10px' }}
						/>
						<p>Male</p>
					</div>
					<div
						style={{
							display: 'flex',
							alignItems: 'center',
							marginBottom: '10px',
						}}
					>
						<input
							type='checkbox'
							name='female'
							checked={filters.female}
							onChange={handleGenderChange}
							style={{ width: '20px', marginRight: '10px' }}
						/>
						<p>Female</p>
					</div>
					<div
						style={{
							display: 'flex',
							alignItems: 'center',
							marginBottom: '10px',
						}}
					>
						<input
							type='checkbox'
							name='transgender'
							checked={filters.transgender}
							onChange={handleGenderChange}
							style={{ width: '20px', marginRight: '10px' }}
						/>
						<p>Transgender</p>
					</div>
				</div>
				<p style={{ fontSize: '18px', marginBottom: '10px' }}>Profile Type:</p>
				<div style={{ padding: '0 10px', marginBottom: '20px' }}>
					<div
						style={{
							display: 'flex',
							alignItems: 'center',
							marginBottom: '10px',
						}}
					>
						<input
							type='checkbox'
							name='single'
							checked={profileTypes.single}
							onChange={handleProfileTypeChange}
							style={{ width: '20px', marginRight: '10px' }}
						/>
						<p>Single</p>
					</div>
					<div
						style={{
							display: 'flex',
							alignItems: 'center',
							marginBottom: '10px',
						}}
					>
						<input
							type='checkbox'
							name='couple'
							checked={profileTypes.couple}
							onChange={handleProfileTypeChange}
							style={{ width: '20px', marginRight: '10px' }}
						/>
						<p>Couple</p>
					</div>
				</div>
			</div>
			<div className='mb-20' style={{ width: '75%' }}>
				<div className='mb-5 sm:mb-8'>
					<div className='relative text-white'>
						<span className='absolute top-1/2 left-5 transform -translate-y-1/2 text-2xl flex items-center'>
							<IoSearchOutline />
						</span>
						<input
							type='search'
							className='outline-none border-none w-full px-5 pl-16 h-14 bg-light-grey rounded-xl'
							onChange={handleSearch}
						/>
					</div>
				</div>
				<div style={{ display: 'flex', flexWrap: 'wrap' }}>
					{filteredUsers.map((user, i) => (
						<UserCard key={i} userInfo={user} />
					))}
				</div>
			</div>
		</div>
	);
};

export default AllUsers;
