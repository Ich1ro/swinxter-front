import React, { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import api from '../utils/api';
import UserCard from '../components/Cards/UserCard';
import { IoSearchOutline } from 'react-icons/io5';
import { CheckTreePicker } from 'rsuite';
import './styles/rsuite.css';
import 'rsuite/CheckTreePicker/styles/index.css';
import { calculateDistance } from '../utils/utils';

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
		coupleMaleMale: false,
		coupleFemaleFemale: false,
		coupleMaleFemale: false,
	});
	// const [profileTypes, setProfileTypes] = useState({
	// 	single: false,
	// 	couple: false,
	// });
	const [weightFrom, setWeightFrom] = useState(null);
	const [weightTo, setWeightTo] = useState(null);
	const [ageFrom, setAgeFrom] = useState(null);
	const [ageTo, setAgeTo] = useState(null);
	const [selectedTreePicker, setSelectedTreePicker] = useState([]);
	const [radius, setRadius] = useState(null);
	const [filtersOpen, setFiltersOpen] = useState(false);

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

		setSelectedTreePicker(selectedItems);
	};

	// const handleProfileTypeChange = e => {
	// 	const { name, checked } = e.target;
	// 	setProfileTypes(prevProfileTypes => ({
	// 		...prevProfileTypes,
	// 		[name]: checked,
	// 	}));
	// };

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

		const sortedUsers = data
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
	};

	function calculateAge(DOB) {
		const birthDate = new Date(DOB);
		const today = new Date();
		let age = today.getFullYear() - birthDate.getFullYear();
		const monthDiff = today.getMonth() - birthDate.getMonth();

		if (
			monthDiff < 0 ||
			(monthDiff === 0 && today.getDate() < birthDate.getDate())
		) {
			age--;
		}
		return age;
	}

	function extractWeightInKg(weightString) {
		const kgMatch = weightString?.match(/^(\d+)\s*kg/);
		return kgMatch ? parseInt(kgMatch[1], 10) : null;
	}

	const handleSearchNear = async () => {
		let userArr = [];
		const { data } = await api.get(
			`/near-users/${user.geometry?.coordinates[0]}/${
				user.geometry?.coordinates[1]
			}/${+radius * 1609}`
		);
		console.log(data);
		data.map(d => {
			if (d._id !== userInfo._id && !userInfo.blockedby.includes(d._id)) {
				userArr.push(d);
			}
		});
		setUsers(userArr);
	};

	const handleFilters = () => {
		setFiltersOpen(!filtersOpen);
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
		{
			label: 'Relationship',
			value: 43,
			children: [
				{
					label: 'Monogamous',
					value: 44,
				},
				{
					label: 'Open-Minded',
					value: 45,
				},
				{
					label: 'Swinger',
					value: 46,
				},
				{
					label: 'Polyamorous',
					value: 47,
				},
			],
		},
		{
			label: 'Ethnic Background',
			value: 48,
			children: [
				{
					label: 'Caucasian',
					value: 49,
				},
				{
					label: 'Hispanic/Latin',
					value: 50,
				},
				{
					label: 'Black/African-American',
					value: 51,
				},
				{
					label: 'Asian',
					value: 52,
				},
				{
					label: 'Indian',
					value: 53,
				},
				{
					label: 'Indigenous',
					value: 54,
				},
				{
					label: 'Middle Eastern',
					value: 55,
				},
				{
					label: 'Other',
					value: 56,
				},
			],
		},
		{
			label: 'Experience',
			value: 57,
			children: [
				{
					label: 'Curious',
					value: 58,
				},
				{
					label: 'Newbie',
					value: 59,
				},
				{
					label: 'Intermediate',
					value: 60,
				},
				{
					label: 'Advanced',
					value: 61,
				},
			],
		},
		{
			label: 'Intelligence',
			value: 62,
			children: [
				{
					label: 'Low Importance',
					value: 63,
				},
				{
					label: 'Medium Importance',
					value: 64,
				},
				{
					label: 'High Importance',
					value: 65,
				},
				{
					label: 'No',
					value: 66,
				},
			],
		},
		{
			label: 'Looks Important',
			value: 67,
			children: [
				{
					label: 'Low Importance',
					value: 68,
				},
				{
					label: 'Medium Importance',
					value: 69,
				},
				{
					label: 'High Importance',
					value: 70,
				},
				{
					label: 'No',
					value: 71,
				},
			],
		},
		{
			label: 'Sexuality',
			value: 72,
			children: [
				{
					label: 'Straight',
					value: 73,
				},
				{
					label: 'Bi-Sexual',
					value: 74,
				},
				{
					label: 'Bi-Curious',
					value: 75,
				},
				{
					label: 'Gay',
					value: 76,
				},
				{
					label: 'Pansexual',
					value: 77,
				},
			],
		},
	];

	const suppressResizeObserverError = error => {
		if (
			error.message ===
			'ResizeObserver loop completed with undelivered notifications.'
		) {
			return;
		}
		console.error(error);
	};

	window.addEventListener('error', suppressResizeObserverError);
	window.addEventListener('unhandledrejection', event =>
		suppressResizeObserverError(event.reason)
	);

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
				(user.profile_type === 'couple' &&
					((filters.coupleMaleMale &&
						user.couple.person1.gender === 'male' &&
						user.couple.person2.gender === 'male') ||
						(filters.coupleFemaleFemale &&
							user.couple.person1.gender === 'female' &&
							user.couple.person2.gender === 'female') ||
						(filters.coupleMaleFemale &&
							((user.couple.person1.gender === 'male' &&
								user.couple.person2.gender === 'female') ||
								(user.couple.person1.gender === 'female' &&
									user.couple.person2.gender === 'male'))))) ||
				(!filters.male &&
					!filters.female &&
					!filters.transgender &&
					!filters.coupleMaleMale &&
					!filters.coupleFemaleFemale &&
					!filters.coupleMaleFemale);

			// const matchesAgeSingle =
			// 	user.profile_type === 'single' &&
			// 	(ageFrom === null || calculateAge(user.DOB) >= ageFrom) &&
			// 	(ageTo === null || calculateAge(user.DOB) <= ageTo);

			// const matchesAgeCouple =
			// 	user.profile_type === 'couple' &&
			// 	(ageFrom === null ||
			// 		calculateAge(user.couple.person1.DOB) >= ageFrom ||
			// 		calculateAge(user.couple.person2.DOB) >= ageFrom) &&
			// 	(ageTo === null ||
			// 		calculateAge(user.couple.person1.DOB) <= ageTo ||
			// 		calculateAge(user.couple.person2.DOB) <= ageTo);

			// const matchesAge = matchesAgeSingle || matchesAgeCouple;

			const userWeightKg = extractWeightInKg(user.weight);
			const matchesWeightSingle =
				user.profile_type === 'single' &&
				userWeightKg !== null &&
				(weightFrom === null || userWeightKg >= weightFrom) &&
				(weightTo === null || userWeightKg <= weightTo);

			const coupleWeight1Kg = extractWeightInKg(user.couple?.person1?.weight);
			const coupleWeight2Kg = extractWeightInKg(user.couple?.person2?.weight);
			const matchesWeightCouple =
				user.profile_type === 'couple' &&
				coupleWeight1Kg !== null &&
				coupleWeight2Kg !== null &&
				(weightFrom === null ||
					coupleWeight1Kg >= weightFrom ||
					coupleWeight2Kg >= weightFrom) &&
				(weightTo === null ||
					coupleWeight1Kg <= weightTo ||
					coupleWeight2Kg <= weightTo);

			const matchesWeight = matchesWeightSingle || matchesWeightCouple;

			const groupedSelections = {
				bodyType: [],
				piercings: [],
				circumcised: [],
				tattoos: [],
				smoking: [],
				drinking: [],
				drugs: [],
				relationship: [],
				ethnicBackground: [],
				experience: [],
				intelligence: [],
				looksImportant: [],
				sexuality: [],
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
				if ([44, 45, 46, 47].includes(selected))
					groupedSelections.relationship.push(selected);
				if ([49, 50, 51, 52, 53, 54, 55, 56].includes(selected))
					groupedSelections.ethnicBackground.push(selected);
				if ([58, 59, 60, 61].includes(selected))
					groupedSelections.experience.push(selected);
				if ([63, 64, 65, 66].includes(selected))
					groupedSelections.intelligence.push(selected);
				if ([68, 69, 70, 71].includes(selected))
					groupedSelections.looksImportant.push(selected);
				if ([73, 74, 75, 76, 77].includes(selected))
					groupedSelections.sexuality.push(selected);
			});

			const matchesTreePickerSingle =
				user.profile_type === 'single' &&
				(groupedSelections.bodyType.length === 0 ||
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
							(selected === 22 && user?.circumcised?.toLowerCase() === 'yes') ||
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
							(selected === 42 && user?.drugs?.toLowerCase() === 'more, thanks')
					)) &&
				(groupedSelections.relationship.length === 0 ||
					groupedSelections.relationship.some(
						selected =>
							(selected === 44 &&
								user.relationship?.toLowerCase() === 'monogamous') ||
							(selected === 45 &&
								user.relationship?.toLowerCase() === 'open-minded') ||
							(selected === 46 &&
								user.relationship?.toLowerCase() === 'swinger') ||
							(selected === 47 &&
								user.relationship?.toLowerCase() === 'polyamorous')
					)) &&
				(groupedSelections.ethnicBackground.length === 0 ||
					groupedSelections.ethnicBackground.some(
						selected =>
							(selected === 49 &&
								user.ethnic_background?.toLowerCase() === 'caucasian') ||
							(selected === 50 &&
								user.ethnic_background?.toLowerCase() === 'hispanic/latin') ||
							(selected === 51 &&
								user.ethnic_background?.toLowerCase() ===
									'black/african-american') ||
							(selected === 52 &&
								user.ethnic_background?.toLowerCase() === 'asian') ||
							(selected === 53 &&
								user.ethnic_background?.toLowerCase() === 'indian') ||
							(selected === 54 &&
								user.ethnic_background?.toLowerCase() === 'indigenous') ||
							(selected === 55 &&
								user.ethnic_background?.toLowerCase() === 'middle eastern') ||
							(selected === 56 &&
								user.ethnic_background?.toLowerCase() === 'other')
					)) &&
				(groupedSelections.experience.length === 0 ||
					groupedSelections.experience.some(
						selected =>
							(selected === 58 &&
								user.experience?.toLowerCase() === 'curious') ||
							(selected === 59 &&
								user.experience?.toLowerCase() === 'newbie') ||
							(selected === 60 &&
								user.experience?.toLowerCase() === 'intermediate') ||
							(selected === 61 && user.experience?.toLowerCase() === 'advanced')
					)) &&
				(groupedSelections.intelligence.length === 0 ||
					groupedSelections.intelligence.some(
						selected =>
							(selected === 63 && user.intelligence === 'Low Importance') ||
							(selected === 64 && user.intelligence === 'Medium Importance') ||
							(selected === 65 && user.intelligence === 'High Importance') ||
							(selected === 66 && user.intelligence === 'No')
					)) &&
				(groupedSelections.looksImportant.length === 0 ||
					groupedSelections.looksImportant.some(
						selected =>
							(selected === 68 && user.looks_important === 'Low Importance') ||
							(selected === 69 &&
								user.looks_important === 'Medium Importance') ||
							(selected === 70 && user.looks_important === 'High Importance') ||
							(selected === 71 && user.looks_important === 'No')
					)) &&
				(groupedSelections.sexuality.length === 0 ||
					groupedSelections.sexuality.some(
						selected =>
							(selected === 73 &&
								user.sexuality?.toLowerCase() === 'straight') ||
							(selected === 74 &&
								user.sexuality?.toLowerCase() === 'bi-sexual') ||
							(selected === 75 &&
								user.sexuality?.toLowerCase() === 'bi-curious') ||
							(selected === 76 && user.sexuality?.toLowerCase() === 'gay') ||
							(selected === 77 && user.sexuality?.toLowerCase() === 'pansexual')
					));

			const matchesTreePickerCouple =
				user.profile_type === 'couple' &&
				(groupedSelections.bodyType.length === 0 ||
					groupedSelections.bodyType.some(
						selected =>
							(selected === 3 &&
								(user.couple.person1.body_type?.toLowerCase() === 'slim' ||
									user.couple.person2.body_type?.toLowerCase() === 'slim')) ||
							(selected === 4 &&
								(user.couple.person1.body_type?.toLowerCase() === 'athletic' ||
									user.couple.person2.body_type?.toLowerCase() ===
										'athletic')) ||
							(selected === 5 &&
								(user.couple.person1.body_type?.toLowerCase() === 'average' ||
									user.couple.person2.body_type?.toLowerCase() === 'average'))
					)) &&
				(groupedSelections.piercings.length === 0 ||
					groupedSelections.piercings.some(
						selected =>
							(selected === 18 &&
								(user.couple.person1.piercings?.toLowerCase() === 'yes' ||
									user.couple.person2.piercings?.toLowerCase() === 'yes')) ||
							(selected === 19 &&
								(user.couple.person1.piercings?.toLowerCase() === 'no' ||
									user.couple.person2.piercings?.toLowerCase() === 'no'))
					)) &&
				(groupedSelections.circumcised.length === 0 ||
					groupedSelections.circumcised.some(
						selected =>
							(selected === 22 &&
								(user.couple.person1.circumcised?.toLowerCase() === 'yes' ||
									user.couple.person2.circumcised?.toLowerCase() === 'yes')) ||
							(selected === 23 &&
								(user.couple.person1.circumcised?.toLowerCase() === 'no' ||
									user.couple.person2.circumcised?.toLowerCase() === 'no'))
					)) &&
				(groupedSelections.tattoos.length === 0 ||
					groupedSelections.tattoos.some(
						selected =>
							(selected === 25 &&
								(user.couple.person1.tattoos?.toLowerCase() === 'yes' ||
									user.couple.person2.tattoos?.toLowerCase() === 'yes')) ||
							(selected === 26 &&
								(user.couple.person1.tattoos?.toLowerCase() === 'no' ||
									user.couple.person2.tattoos?.toLowerCase() === 'no')) ||
							(selected === 27 &&
								(user.couple.person1.tattoos?.toLowerCase() === 'a few' ||
									user.couple.person2.tattoos?.toLowerCase() === 'a few'))
					)) &&
				(groupedSelections.smoking.length === 0 ||
					groupedSelections.smoking.some(
						selected =>
							(selected === 30 &&
								(user.couple.person1.smoking?.toLowerCase() === 'yes' ||
									user.couple.person2.smoking?.toLowerCase() === 'yes')) ||
							(selected === 31 &&
								(user.couple.person1.smoking?.toLowerCase() === 'no' ||
									user.couple.person2.smoking?.toLowerCase() === 'no')) ||
							(selected === 32 &&
								(user.couple.person1.smoking?.toLowerCase() ===
									'occasionally' ||
									user.couple.person2.smoking?.toLowerCase() ===
										'occasionally'))
					)) &&
				(groupedSelections.drinking.length === 0 ||
					groupedSelections.drinking.some(
						selected =>
							(selected === 34 &&
								(user.couple.person1.Drinking === 'Not your business' ||
									user.couple.person2.Drinking === 'Not your business')) ||
							(selected === 35 &&
								(user.couple.person1.Drinking === 'Like a fish' ||
									user.couple.person2.Drinking === 'Like a fish')) ||
							(selected === 36 &&
								(user.couple.person1.Drinking === 'Like a cactus' ||
									user.couple.person2.Drinking === 'Like a cactus')) ||
							(selected === 37 &&
								(user.couple.person1.Drinking === 'I drink if offered' ||
									user.couple.person2.Drinking === 'I drink if offered'))
					)) &&
				(groupedSelections.drugs.length === 0 ||
					groupedSelections.drugs.some(
						selected =>
							(selected === 39 &&
								(user.couple.person1.Drugs?.toLowerCase() ===
									'not your business' ||
									user.couple.person2.Drugs?.toLowerCase() ===
										'not your business')) ||
							(selected === 40 &&
								(user.couple.person1.Drugs?.toLowerCase() === 'no, thanks' ||
									user.couple.person2.Drugs?.toLowerCase() === 'no, thanks')) ||
							(selected === 41 &&
								(user.couple.person1.Drugs?.toLowerCase() === 'yes, thanks' ||
									user.couple.person2.Drugs?.toLowerCase() ===
										'yes, thanks')) ||
							(selected === 42 &&
								(user.couple.person1.Drugs?.toLowerCase() === 'more, thanks' ||
									user.couple.person2.Drugs?.toLowerCase() === 'more, thanks'))
					)) &&
				(groupedSelections.relationship.length === 0 ||
					groupedSelections.relationship.some(
						selected =>
							(selected === 44 &&
								(user.couple.person1.relationship === 'Monogamous' ||
									user.couple.person2.relationship === 'Monogamous')) ||
							(selected === 45 &&
								(user.couple.person1.relationship === 'Open-Minded' ||
									user.couple.person2.relationship === 'Open-Minded')) ||
							(selected === 46 &&
								(user.couple.person1.relationship === 'Swinger' ||
									user.couple.person2.relationship === 'Swinger')) ||
							(selected === 47 &&
								(user.couple.person1.relationship === 'Polyamorous' ||
									user.couple.person2.relationship === 'Polyamorous'))
					)) &&
				(groupedSelections.ethnicBackground.length === 0 ||
					groupedSelections.ethnicBackground.some(
						selected =>
							(selected === 49 &&
								(user.couple.person1.ethnic_background === 'Caucasian' ||
									user.couple.person2.ethnic_background === 'Caucasian')) ||
							(selected === 50 &&
								(user.couple.person1.ethnic_background === 'Hispanic/Latin' ||
									user.couple.person2.ethnic_background ===
										'Hispanic/Latin')) ||
							(selected === 51 &&
								(user.couple.person1.ethnic_background ===
									'Black/African-American' ||
									user.couple.person2.ethnic_background ===
										'Black/African-American')) ||
							(selected === 52 &&
								(user.couple.person1.ethnic_background === 'Asian' ||
									user.couple.person2.ethnic_background === 'Asian')) ||
							(selected === 53 &&
								(user.couple.person1.ethnic_background === 'Indian' ||
									user.couple.person2.ethnic_background === 'Indian')) ||
							(selected === 54 &&
								(user.couple.person1.ethnic_background === 'Indigenous' ||
									user.couple.person2.ethnic_background === 'Indigenous')) ||
							(selected === 55 &&
								(user.couple.person1.ethnic_background === 'Middle Eastern' ||
									user.couple.person2.ethnic_background ===
										'Middle Eastern')) ||
							(selected === 56 &&
								(user.couple.person1.ethnic_background === 'Other' ||
									user.couple.person2.ethnic_background === 'Other'))
					)) &&
				(groupedSelections.experience.length === 0 ||
					groupedSelections.experience.some(
						selected =>
							(selected === 58 &&
								(user.couple.person1.experience === 'Curious' ||
									user.couple.person2.experience === 'Curious')) ||
							(selected === 59 &&
								(user.couple.person1.experience === 'Newbie' ||
									user.couple.person2.experience === 'Newbie')) ||
							(selected === 60 &&
								(user.couple.person1.experience === 'Intermediate' ||
									user.couple.person2.experience === 'Intermediate')) ||
							(selected === 61 &&
								(user.couple.person1.experience === 'Advanced' ||
									user.couple.person2.experience === 'Advanced'))
					)) &&
				(groupedSelections.intelligence.length === 0 ||
					groupedSelections.intelligence.some(
						selected =>
							(selected === 63 &&
								(user.couple.person1.intelligence === 'Low Importance' ||
									user.couple.person2.intelligence === 'Low Importance')) ||
							(selected === 64 &&
								(user.couple.person1.intelligence === 'Medium Importance' ||
									user.couple.person2.intelligence === 'Medium Importance')) ||
							(selected === 65 &&
								(user.couple.person1.intelligence === 'High Importance' ||
									user.couple.person2.intelligence === 'High Importance')) ||
							(selected === 66 &&
								(user.couple.person1.intelligence === 'No' ||
									user.couple.person2.intelligence === 'No'))
					)) &&
				(groupedSelections.looksImportant.length === 0 ||
					groupedSelections.looksImportant.some(
						selected =>
							(selected === 68 &&
								(user.couple.person1.looks_important === 'Low Importance' ||
									user.couple.person2.looks_important === 'Low Importance')) ||
							(selected === 69 &&
								(user.couple.person1.looks_important === 'Medium Importance' ||
									user.couple.person2.looks_important ===
										'Medium Importance')) ||
							(selected === 70 &&
								(user.couple.person1.looks_important === 'High Importance' ||
									user.couple.person2.looks_important === 'High Importance')) ||
							(selected === 71 &&
								(user.couple.person1.looks_important === 'No' ||
									user.couple.person2.looks_important === 'No'))
					)) &&
				(groupedSelections.sexuality.length === 0 ||
					groupedSelections.sexuality.some(
						selected =>
							(selected === 73 &&
								(user.couple.person1.sexuality === 'Straight' ||
									user.couple.person2.sexuality === 'Straight')) ||
							(selected === 74 &&
								(user.couple.person1.sexuality === 'Bi-Sexual' ||
									user.couple.person2.sexuality === 'Bi-Sexual')) ||
							(selected === 75 &&
								(user.couple.person1.sexuality === 'Bi-Curious' ||
									user.couple.person2.sexuality === 'Bi-Curious')) ||
							(selected === 76 &&
								(user.couple.person1.sexuality === 'Gay' ||
									user.couple.person2.sexuality === 'Gay')) ||
							(selected === 77 &&
								(user.couple.person1.sexuality === 'Pansexual' ||
									user.couple.person2.sexuality === 'Pansexual'))
					));

			const matchesTreePicker =
				selectedTreePicker.length === 0 ||
				matchesTreePickerSingle ||
				matchesTreePickerCouple;

			return (
				matchesSearch && matchesGender
				// matchesAge &&
				// matchesWeight
			);
		});
		console.log(filtered);

		setFilteredUsers(prev => (prev !== filtered ? filtered : prev));
	}, [
		search,
		filters,
		users,
		selectedTreePicker,
		ageFrom,
		ageTo,
		weightFrom,
		weightTo,
	]);

	useEffect(() => {
		console.log(filters);
	}, [filters]);

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
				// position: 'relative',
			}}
		>
			<div
				className={
					filtersOpen
						? 'sidebar-filters-open'
						: 'text-white bg-light-grey px-5 py-5 rounded-2xl sidebar-filters'
				}
			>
				<p
					style={{ fontWeight: '500', fontSize: '18px', marginBottom: '20px' }}
				>
					Filters
				</p>
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
					<div
						style={{
							display: 'flex',
							alignItems: 'center',
							marginBottom: '10px',
						}}
					>
						<input
							type='checkbox'
							name='coupleMaleMale'
							checked={filters.coupleMaleMale}
							onChange={handleGenderChange}
							style={{ width: '20px', marginRight: '10px' }}
						/>
						<p>Male/Male</p>
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
							name='coupleFemaleFemale'
							checked={filters.coupleFemaleFemale}
							onChange={handleGenderChange}
							style={{ width: '20px', marginRight: '10px' }}
						/>
						<p>Female/Female</p>
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
							name='coupleMaleFemale'
							checked={filters.coupleMaleFemale}
							onChange={handleGenderChange}
							style={{ width: '20px', marginRight: '10px' }}
						/>
						<p>Male/Female</p>
					</div>
				</div>
				{/* <p style={{ fontSize: '18px', marginBottom: '10px' }}>Profile Type:</p>
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
				</div> */}
				<p style={{ fontSize: '18px', marginBottom: '10px' }}>Age:</p>
				<div
					style={{
						display: 'flex',
						width: '100%',
						alignItems: 'center',
						justifyContent: 'space-between',
						marginBottom: '10px',
					}}
				>
					<label>From:</label>
					<input
						type='number'
						style={{
							maxWidth: '100px',
							backgroundColor: '#1f1f1f',
							color: '#fff',
							border: '1px solid #333',
							borderRadius: '8px',
							padding: '5px 10px',
							outline: 'none',
							fontSize: '14px',
						}}
						placeholder='Min age'
						value={ageFrom || ''}
						onChange={e =>
							setAgeFrom(e.target.value ? parseInt(e.target.value) : null)
						}
					/>
				</div>
				<div
					style={{
						display: 'flex',
						width: '100%',
						alignItems: 'center',
						justifyContent: 'space-between',
						marginBottom: '20px',
					}}
				>
					<label>To:</label>
					<input
						type='number'
						placeholder='Max age'
						style={{
							maxWidth: '100px',
							backgroundColor: '#1f1f1f',
							color: '#fff',
							border: '1px solid #333',
							borderRadius: '8px',
							padding: '5px 10px',
							outline: 'none',
							fontSize: '14px',
						}}
						value={ageTo || ''}
						onChange={e =>
							setAgeTo(e.target.value ? parseInt(e.target.value) : null)
						}
					/>
				</div>
				<p style={{ fontSize: '18px', marginBottom: '10px' }}>Weight:</p>
				<div
					style={{
						display: 'flex',
						width: '100%',
						alignItems: 'center',
						justifyContent: 'space-between',
						marginBottom: '10px',
					}}
				>
					<label>From:</label>
					<input
						type='number'
						style={{
							maxWidth: '100px',
							backgroundColor: '#1f1f1f',
							color: '#fff',
							border: '1px solid #333',
							borderRadius: '8px',
							padding: '5px 10px',
							outline: 'none',
							fontSize: '14px',
						}}
						placeholder='Min weight'
						value={weightFrom || ''}
						onChange={e =>
							setWeightFrom(e.target.value ? parseInt(e.target.value) : null)
						}
					/>
				</div>
				<div
					style={{
						display: 'flex',
						width: '100%',
						alignItems: 'center',
						justifyContent: 'space-between',
						marginBottom: '20px',
					}}
				>
					<label>To:</label>
					<input
						type='number'
						placeholder='Max weight'
						style={{
							maxWidth: '100px',
							backgroundColor: '#1f1f1f',
							color: '#fff',
							border: '1px solid #333',
							borderRadius: '8px',
							padding: '5px 10px',
							outline: 'none',
							fontSize: '14px',
						}}
						value={weightTo || ''}
						onChange={e =>
							setWeightTo(e.target.value ? parseInt(e.target.value) : null)
						}
					/>
				</div>

				<p style={{ fontSize: '18px', marginBottom: '10px' }}>Near me:</p>

				<div
					style={{
						display: 'flex',
						width: '100%',
						alignItems: 'center',
						justifyContent: 'space-between',
					}}
				>
					<label style={{ margin: '0' }}>Radius in miles:</label>
					<input
						type='number'
						placeholder='Radius'
						style={{
							maxWidth: '80px',
							backgroundColor: '#1f1f1f',
							color: '#fff',
							border: '1px solid #333',
							borderRadius: '8px',
							padding: '5px 10px',
							outline: 'none',
							fontSize: '14px',
						}}
						value={radius || ''}
						onChange={e => setRadius(e.target.value)}
					/>
				</div>
				{radius && (
					<div style={{ display: 'flex', justifyContent: 'space-between' }}>
						<button
							onClick={handleSearchNear}
							style={{
								background: 'black',
								padding: '5px 10px',
								borderRadius: '8px',
								marginTop: '15px',
								width: '40%',
								backgroundColor: '#1f1f1f',
							}}
						>
							Search
						</button>
						<button
							onClick={handleSearchNear}
							style={{
								background: 'black',
								padding: '5px 10px',
								borderRadius: '8px',
								marginTop: '15px',
								width: '40%',
								backgroundColor: '#1f1f1f',
							}}
						>
							clear
						</button>
					</div>
				)}

				{/* <p style={{ fontSize: '18px', marginBottom: '10px' }}>
					Advanced Search:
				</p>
				<CheckTreePicker
					ref={checkTreePickerRef}
					// defaultExpandAll
					data={data}
					searchable={false}
					onChange={handleCheckTreeChange}
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
				/> */}
			</div>
			<div className='mb-20 sidebar-users'>
				<div className='mb-5 sm:mb-8'>
					<div className='text-white search-block flex items-center'>
						<span className='text-2xl flex items-center search_icon'>
							<IoSearchOutline />
						</span>
						<input
							type='search'
							className='outline-none border-none w-full px-5 pl-16 h-14 bg-light-grey rounded-xl search-block-input'
							onChange={handleSearch}
						/>
						<button className='search-block-button' onClick={handleFilters}>
							Filters
						</button>
					</div>
				</div>
				<div className='all-users-grid'>
					{filteredUsers.map((user, i) => (
						<UserCard key={i} userInfo={user} />
					))}
				</div>
			</div>
		</div>
	);
};

export default AllUsers;
