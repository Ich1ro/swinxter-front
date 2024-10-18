import React, { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import api from '../utils/api';
import UserCard from '../components/Cards/UserCard';
import { IoSearchOutline } from 'react-icons/io5';
import { CheckTreePicker } from 'rsuite';
import './styles/rsuite.css';
import 'rsuite/CheckTreePicker/styles/index.css';

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
	const [selectedTreePicker, setSelectedTreePicker] = useState([]);

	const checkTreePickerRef = useRef(null);
	const sidebarRef = useRef(null);

	const handleGenderChange = e => {
		const { name, checked } = e.target;
		setFilters(prevFilters => ({
			...prevFilters,
			[name]: checked,
		}));
	};

	const getAllValues = node => {
		let values = [node.value];

		if (node.children) {
			node.children.forEach(child => {
				values = values.concat(getAllValues(child));
			});
		}

		return values;
	};

	const handleCheckTreeChange = value => {
		console.log(value);
		const selectedItems = [];

		const traverse = nodes => {
			nodes.forEach(node => {
				if (value.includes(node.value)) {
					selectedItems.push(...getAllValues(node));
				}

				if (node.children) {
					traverse(node.children);
				}
			});
		};

		traverse(data);

		console.log(selectedItems);

		setSelectedTreePicker(selectedItems);
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

	const data = [
		{
			label: 'Body',
			value: 1,
			children: [
				{
					label: 'Body Type',
					value: 2,
					children: [
						{
							label: 'Slim',
							value: 3,
						},
						{
							label: 'Athletic',
							value: 4,
						},
						{
							label: 'Avarage',
							value: 5,
						},
					],
				},
				// {
				// 	label: 'Body Hair',
				// 	value: 6,
				// 	children: [
				// 		{
				// 			label: 'Arms',
				// 			value: 7,
				// 		},
				// 		{
				// 			label: 'Bikini',
				// 			value: 8,
				// 		},
				// 		{
				// 			label: 'Buns',
				// 			value: 9,
				// 		},
				// 		{
				// 			label: 'Tummy',
				// 			value: 10,
				// 		},
				// 		{
				// 			label: 'Chest',
				// 			value: 11,
				// 		},
				// 		{
				// 			label: 'Everywhere',
				// 			value: 12,
				// 		},
				// 		{
				// 			label: 'Treasure',
				// 			value: 13,
				// 		},
				// 		{
				// 			label: 'Arm Pit',
				// 			value: 14,
				// 		},
				// 		{
				// 			label: 'Shave',
				// 			value: 15,
				// 		},
				// 		{
				// 			label: 'Smooth',
				// 			value: 16,
				// 		},
				// 	],
				// },
				{
					label: 'Piercings',
					value: 17,
					children: [
						{
							label: 'Yes',
							value: 18,
						},
						{
							label: 'No',
							value: 19,
						},
					],
				},
				{
					label: 'Circumcised',
					value: 21,
					children: [
						{
							label: 'Yes',
							value: 22,
						},
						{
							label: 'No',
							value: 23,
						},
					],
				},
				{
					label: 'Tattoos',
					value: 24,
					children: [
						{
							label: 'Yes',
							value: 25,
						},
						{
							label: 'No',
							value: 26,
						},
						{
							label: 'A few',
							value: 27,
						},
					],
				},
			],
		},
		{
			label: 'Bad habits',
			value: 28,
			children: [
				{
					label: 'Smoking',
					value: 29,
					children: [
						{
							label: 'Yes',
							value: 30,
						},
						{
							label: 'No',
							value: 31,
						},
						{
							label: 'Occasionaly',
							value: 32,
						},
					],
				},
				{
					label: 'Drinking',
					value: 33,
					children: [
						{
							label: 'Not your business',
							value: 34,
						},
						{
							label: 'Like a fish',
							value: 35,
						},
						{
							label: 'Like a cactus',
							value: 36,
						},
						{
							label: 'I drink if offered',
							value: 37,
						},
					],
				},
				{
					label: 'Drugs',
					value: 38,
					children: [
						{
							label: 'Not your business',
							value: 39,
						},
						{
							label: 'No, thanks',
							value: 40,
						},
						{
							label: 'Yes, thanks',
							value: 41,
						},
						{
							label: 'More, thanks',
							value: 42,
						},
					],
				},
			],
		},
	];

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
				(filters.transgender &&
					!user.gender &&
					user.profile_type === 'single') ||
				(!filters.male && !filters.female && !filters.transgender);

			const matchesProfileType =
				(profileTypes.single && user.profile_type === 'single') ||
				(profileTypes.couple && user.profile_type === 'couple') ||
				(!profileTypes.single && !profileTypes.couple);

			const groupedSelections = {
				bodyType: [],
				piercings: [],
				circumcised: [],
				tattoos: [],
				smoking: [],
				drinking: [],
				drugs: [],
			};

			selectedTreePicker.forEach(selected => {
				if ([3, 4, 5].includes(selected))
					groupedSelections.bodyType.push(selected);
				if ([18, 19].includes(selected))
					groupedSelections.piercings.push(selected);
				if ([22, 23].includes(selected))
					groupedSelections.circumcised.push(selected);
				if ([25, 26, 27].includes(selected))
					groupedSelections.tattoos.push(selected);
				if ([30, 31, 32].includes(selected))
					groupedSelections.smoking.push(selected);
				if ([34, 35, 36, 37].includes(selected))
					groupedSelections.drinking.push(selected);
				if ([39, 40, 41, 42].includes(selected))
					groupedSelections.drugs.push(selected);
			});

			const matchesTreePicker =
				selectedTreePicker.length === 0 ||
				((groupedSelections.bodyType.length === 0 ||
					groupedSelections.bodyType.some(
						selected =>
							(selected === 3 && user?.body_type?.toLowerCase() === 'slim') ||
							(selected === 4 &&
								user?.body_type?.toLowerCase() === 'athletic') ||
							(selected === 5 && user?.body_type?.toLowerCase() === 'average')
					)) &&
					(groupedSelections.piercings.length === 0 ||
						groupedSelections.piercings.some(
							selected =>
								(selected === 18 && user?.piercings?.toLowerCase() === 'yes') ||
								(selected === 19 && user?.piercings?.toLowerCase() === 'no')
						)) &&
					(groupedSelections.circumcised.length === 0 ||
						groupedSelections.circumcised.some(
							selected =>
								(selected === 22 &&
									user?.circumcised?.toLowerCase() === 'yes') ||
								(selected === 23 && user?.circumcised?.toLowerCase() === 'no')
						)) &&
					(groupedSelections.tattoos.length === 0 ||
						groupedSelections.tattoos.some(
							selected =>
								(selected === 25 && user?.tattoos?.toLowerCase() === 'yes') ||
								(selected === 26 && user?.tattoos?.toLowerCase() === 'no') ||
								(selected === 27 && user?.tattoos?.toLowerCase() === 'a few')
						)) &&
					(groupedSelections.smoking.length === 0 ||
						groupedSelections.smoking.some(
							selected =>
								(selected === 30 && user?.smoking?.toLowerCase() === 'yes') ||
								(selected === 31 && user?.smoking?.toLowerCase() === 'no') ||
								(selected === 32 &&
									user?.smoking?.toLowerCase() === 'occasionally')
						)) &&
					(groupedSelections.drinking.length === 0 ||
						groupedSelections.drinking.some(
							selected =>
								(selected === 34 && user?.drinking === 'Not your business') ||
								(selected === 35 && user?.drinking === 'Like a fish') ||
								(selected === 36 && user?.drinking === 'Like a cactus') ||
								(selected === 37 && user?.drinking === 'I drink if offered')
						)) &&
					(groupedSelections.drugs.length === 0 ||
						groupedSelections.drugs.some(
							selected =>
								(selected === 39 &&
									user?.drugs?.toLowerCase() === 'not your business') ||
								(selected === 40 &&
									user?.drugs?.toLowerCase() === 'no, thanks') ||
								(selected === 41 &&
									user?.drugs?.toLowerCase() === 'yes, thanks') ||
								(selected === 42 &&
									user?.drugs?.toLowerCase() === 'more, thanks')
						)));

			// const matchesTreePicker = selectedTreePicker.length === 0 ||  ( // Проверка по Body Type
			// 	selectedTreePicker.filter(selected =>
			// 	  [3, 4, 5].includes(selected) // 3 - Slim, 4 - Athletic, 5 - Average
			// 	).every(selected =>
			// 	  (selected === 3 && user?.body_type?.toLowerCase() === 'slim') ||
			// 	  (selected === 4 && user?.body_type?.toLowerCase() === 'athletic') ||
			// 	  (selected === 5 && user?.body_type?.toLowerCase() === 'average')
			// 	) &&
			// 	// Проверка по Piercings
			// 	selectedTreePicker.filter(selected =>
			// 	  [18, 19].includes(selected) // 18 - Yes, 19 - No
			// 	).every(selected =>
			// 	  (selected === 18 && user?.piercings?.toLowerCase() === 'yes') ||
			// 	  (selected === 19 && user?.piercings?.toLowerCase() === 'no')
			// 	) &&
			// 	// Проверка по Circumcised
			// 	selectedTreePicker.filter(selected =>
			// 	  [22, 23].includes(selected) // 22 - Yes, 23 - No
			// 	).every(selected =>
			// 	  (selected === 22 && user?.circumcised?.toLowerCase() === 'yes') ||
			// 	  (selected === 23 && user?.circumcised?.toLowerCase() === 'no')
			// 	) &&
			// 	// Проверка по Tattoos
			// 	selectedTreePicker.filter(selected =>
			// 	  [25, 26, 27].includes(selected) // 25 - Yes, 26 - No, 27 - A few
			// 	).every(selected =>
			// 	  (selected === 25 && user?.tattoos?.toLowerCase() === 'yes') ||
			// 	  (selected === 26 && user?.tattoos?.toLowerCase() === 'no') ||
			// 	  (selected === 27 && user?.tattoos?.toLowerCase() === 'a few')
			// 	) &&
			// 	// Проверка по Smoking
			// 	selectedTreePicker.filter(selected =>
			// 	  [30, 31, 32].includes(selected) // 30 - Yes, 31 - No, 32 - Occasionally
			// 	).every(selected =>
			// 	  (selected === 30 && user?.smoking?.toLowerCase() === 'yes') ||
			// 	  (selected === 31 && user?.smoking?.toLowerCase() === 'no') ||
			// 	  (selected === 32 && user?.smoking?.toLowerCase() === 'occasionally')
			// 	) &&
			// 	// Проверка по Drinking
			// 	selectedTreePicker.filter(selected =>
			// 	  [34, 35, 36, 37].includes(selected) // 34 - Not your business, 35 - Like a fish, 36 - Like a cactus, 37 - I drink if offered
			// 	).every(selected =>
			// 	  (selected === 34 && user?.drinking === 'Not your business') ||
			// 	  (selected === 35 && user?.drinking === 'Like a fish') ||
			// 	  (selected === 36 && user?.drinking === 'Like a cactus') ||
			// 	  (selected === 37 && user?.drinking === 'I drink if offered')
			// 	) &&
			// 	// Проверка по Drugs
			// 	selectedTreePicker.filter(selected =>
			// 	  [39, 40, 41, 42].includes(selected) // 39 - Not your business, 40 - No, thanks, 41 - Yes, thanks, 42 - More, thanks
			// 	).every(selected =>
			// 	  (selected === 39 && user?.drugs?.toLowerCase() === 'not your business') ||
			// 	  (selected === 40 && user?.drugs?.toLowerCase() === 'no, thanks') ||
			// 	  (selected === 41 && user?.drugs?.toLowerCase() === 'yes, thanks') ||
			// 	  (selected === 42 && user?.drugs?.toLowerCase() === 'more, thanks')
			// 	)
			//   );

			return (
				matchesSearch &&
				matchesGender &&
				matchesProfileType &&
				matchesTreePicker
			);
		});

		setFilteredUsers(filtered);
	}, [search, filters, users, profileTypes, selectedTreePicker]);

	useEffect(() => {
		console.log(filteredUsers);
	}, [filteredUsers]);

	useEffect(() => {
		const handleScroll = () => {
			if (checkTreePickerRef.current) {
				checkTreePickerRef.current.close();
			}
		};

		window.addEventListener('scroll', handleScroll);

		return () => {
			window.removeEventListener('scroll', handleScroll);
		};
	}, []);

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
					height: 'calc(100vh - 30px)',
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
				<p style={{ fontSize: '18px', marginBottom: '10px' }}>
					Advanced Search:
				</p>
				<CheckTreePicker
					ref={checkTreePickerRef}
					defaultExpandAll
					data={data}
					searchable={false}
					onChange={handleCheckTreeChange}
					// uncheckableItemValues={[1, 2]}
					style={{
						width: 250,
						backgroundColor: '#1f1f1f',
						border: '1px solid #333',
						color: '#fff',
						borderRadius: '8px',
					}}
					placeholder='Select'
					popupStyle={{
						zIndex: 1000,
						position: 'absolute',
						backgroundColor: '#1f1f1f',
						color: '#fff',
						border: '1px solid #333',
					}}
					popupClassName='dark-popup'
				/>
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
