import axios from 'axios';
import React, { useEffect, useState } from 'react';
import UserCard from '../components/Cards/UserCard';
import { forEach } from 'rsuite/esm/internals/utils/ReactChildren';

const AdvancedSearch = () => {
	const BASE_URL = process.env.REACT_APP_BASE_URL;
	const [data, setData] = useState(null);
	const [filters, setFilters] = useState({
		accountType: 'single',
		relationship: '',
		single: {
			bodyType: [],
			gender: '',
			piercings: '',
			circumcised: '',
			tattoos: '',
			smoking: '',
			drinking: '',
			drugs: '',
			ethnicBackground: '',
			experience: '',
			looksImportant: '',
			intelligence: '',
			sexuality: '',
			ageRange: [],
			interests: [],
			location: '',
			heightRange: [],
			weightRange: [],
		},
		person1: {
			bodyType: [],
			gender: 'female',
			piercings: '',
			// circumcised: '',
			tattoos: '',
			smoking: '',
			drinking: '',
			drugs: '',
			ethnicBackground: '',
			experience: '',
			looksImportant: '',
			intelligence: '',
			sexuality: '',
			ageRange: [],
			interests: [],
			location: '',
			heightRange: [],
			weightRange: [],
		},
		person2: {
			bodyType: [],
			gender: 'male',
			piercings: '',
			circumcised: '',
			tattoos: '',
			smoking: '',
			drinking: '',
			drugs: '',
			ethnicBackground: '',
			experience: '',
			looksImportant: '',
			intelligence: '',
			sexuality: '',
			ageRange: [],
			interests: [],
			location: '',
			heightRange: [],
			weightRange: [],
		},
	});

	useEffect(() => {
		console.log(filters);
	}, [filters]);

	const handleCheckboxChange = (person, category, value) => {
		setFilters(prev => ({
			...prev,
			[person]: {
				...prev[person],
				[category]: prev[person][category].includes(value)
					? prev[person][category].filter(item => item !== value)
					: [...prev[person][category], value],
			},
		}));
	};

	const handleInputChange = (person, field, value) => {
		setFilters(prev => ({
			...prev,
			[person]: {
				...prev[person],
				[field]: value,
			},
		}));
	};

	const convertLbsToKg = weightStr => {
		const lbs = parseFloat(weightStr.split(' ')[0]);
		return lbs ? (lbs * 0.453592).toFixed(2) : null;
	};

	const handleSubmit = async event => {
		event.preventDefault();
		console.log('filters', filters);

		const filtersCopy = { ...filters };

		if (filtersCopy.single && filtersCopy.single.weightRange) {
			filtersCopy.single.weightRange = filtersCopy.single.weightRange.map(
				weight => convertLbsToKg(`${weight} lbs`)
			);
		}

		if (filtersCopy.person1 && filtersCopy.person1.weightRange) {
			filtersCopy.person1.weightRange = filtersCopy.person1.weightRange.map(
				weight => convertLbsToKg(`${weight} lbs`)
			);
		}

		if (filtersCopy.person2 && filtersCopy.person2.weightRange) {
			filtersCopy.person2.weightRange = filtersCopy.person2.weightRange.map(
				weight => convertLbsToKg(`${weight} lbs`)
			);
		}
		try {
			const response = await axios.post(
				`${BASE_URL}/api/advanced-search`,
				filtersCopy
			);
			setData(response.data);
			console.log('result:', response.data);
		} catch (error) {
			console.error('Error:', error);
		}
	};

	return (
		<div
			className='home_page bg-black py-8 px-6 rounded-2xl'
			style={{
				display: 'flex',
				justifyContent: 'space-between',
				position: 'relative',
				flexDirection: 'column',
			}}
		>
			<h1 style={{ marginBottom: '15px', fontSize: '20px' }}>
				Advanced Search
			</h1>
			<form
				onSubmit={handleSubmit}
				style={{ display: 'flex', flexDirection: 'column', width: '100%' }}
			>
				<div
					style={{
						backgroundColor: 'rgb(42 45 55 / var(--tw-bg-opacity))',
						marginBottom: '15px',
						padding: '10px',
						borderRadius: '10px',
					}}
				>
					<h2 style={{ marginBottom: '10px' }}>Account Type</h2>

					<div style={{ display: 'flex', alignItems: 'center' }}>
						<label
							style={{
								display: 'flex',
								alignItems: 'center',
								marginRight: '20px',
							}}
						>
							<input
								type='radio'
								name='accountType'
								value='single'
								checked={filters.accountType === 'single'}
								onChange={() =>
									setFilters({
										...filters,
										accountType: 'single',
										person1: {
											bodyType: [],
											gender: 'female',
											piercings: '',
											// circumcised: '',
											tattoos: '',
											smoking: '',
											drinking: '',
											drugs: '',
											ethnicBackground: '',
											experience: '',
											looksImportant: '',
											ageRange: [],
											interests: [],
											location: '',
											heightRange: [],
											weightRange: [],
										},
										person2: {
											bodyType: [],
											gender: 'male',
											piercings: '',
											circumcised: '',
											tattoos: '',
											smoking: '',
											drinking: '',
											drugs: '',
											ethnicBackground: '',
											experience: '',
											looksImportant: '',
											ageRange: [],
											interests: [],
											location: '',
											heightRange: [],
											weightRange: [],
										},
									})
								}
							/>
							Single
						</label>
						<label style={{ display: 'flex', alignItems: 'center' }}>
							<input
								type='radio'
								name='accountType'
								value='couple'
								checked={filters.accountType === 'couple'}
								onChange={() =>
									setFilters({
										...filters,
										accountType: 'couple',
										single: {
											bodyType: [],
											gender: '',
											piercings: '',
											circumcised: '',
											tattoos: '',
											smoking: '',
											drinking: '',
											drugs: '',
											ethnicBackground: '',
											experience: '',
											looksImportant: '',
											ageRange: [],
											interests: [],
											location: '',
											heightRange: [],
											weightRange: [],
										},
									})
								}
							/>
							Couple
						</label>
					</div>
				</div>

				{filters.accountType === 'single' && (
					<div
						style={{
							display: 'flex',
							flexDirection: 'column',
							backgroundColor: 'rgb(42 45 55 / var(--tw-bg-opacity))',
							marginBottom: '15px',
							padding: '10px',
							borderRadius: '10px',
						}}
					>
						<h2>Gender</h2>
						<label
							style={{
								display: 'flex',
								alignItems: 'center',
								marginRight: '20px',
							}}
						>
							<input
								type='radio'
								name={`gender${filters.single.gender}`}
								value={filters.single.gender}
								checked={filters.single.gender === ''}
								onChange={() =>
									setFilters({
										...filters,
										single: {
											...filters.single,
											gender: '',
										},
									})
								}
							/>
							All
						</label>
						<label
							style={{
								display: 'flex',
								alignItems: 'center',
								marginRight: '20px',
							}}
						>
							<input
								type='radio'
								name={`relationship${filters.single.gender}`}
								value={filters.single.gender}
								checked={filters.single.gender === 'male'}
								onChange={() =>
									setFilters({
										...filters,
										single: {
											...filters.single,
											gender: 'male',
										},
									})
								}
							/>
							Male
						</label>
						<label
							style={{
								display: 'flex',
								alignItems: 'center',
								marginRight: '20px',
							}}
						>
							<input
								type='radio'
								name={`relationship${filters.single.gender}`}
								value={filters.single.gender}
								checked={filters.single.gender === 'female'}
								onChange={() =>
									setFilters({
										...filters,
										single: {
											...filters.single,
											gender: 'female',
										},
									})
								}
							/>
							Female
						</label>
						<label style={{ display: 'flex', alignItems: 'center' }}>
							<input
								type='radio'
								name={`relationship${filters.single.gender}`}
								value={filters.single.gender}
								checked={filters.single.gender === 'transgender'}
								onChange={() =>
									setFilters({
										...filters,
										single: {
											...filters.single,
											gender: 'transgender',
										},
									})
								}
							/>
							Transgender
						</label>
					</div>
				)}

				<div
					style={{
						display: 'flex',
						flexDirection: 'column',
						backgroundColor: 'rgb(42 45 55 / var(--tw-bg-opacity))',
						marginBottom: '15px',
						padding: '10px',
						borderRadius: '10px',
					}}
				>
					<h2 style={{ marginBottom: '10px' }}>Relationship</h2>
					<label
						style={{
							display: 'flex',
							alignItems: 'center',
							marginRight: '20px',
						}}
					>
						<input
							type='radio'
							name={`relationship${filters.gender}`}
							value={filters.relationship}
							checked={filters.relationship === ''}
							onChange={() =>
								setFilters({
									...filters,
									relationship: '',
								})
							}
						/>
						Not important
					</label>
					<label
						style={{
							display: 'flex',
							alignItems: 'center',
							marginRight: '20px',
						}}
					>
						<input
							type='radio'
							name={`relationship${filters.gender}`}
							value={filters.relationship}
							checked={filters.relationship === 'Monogamous'}
							onChange={() =>
								setFilters({
									...filters,
									relationship: 'Monogamous',
								})
							}
						/>
						Monogamous
					</label>
					<label
						style={{
							display: 'flex',
							alignItems: 'center',
							marginRight: '20px',
						}}
					>
						<input
							type='radio'
							name={`relationship${filters.gender}`}
							value={filters.relationship}
							checked={filters.relationship === 'Open-Minded'}
							onChange={() =>
								setFilters({
									...filters,
									relationship: 'Open-Minded',
								})
							}
						/>
						Open-Minded
					</label>
					<label style={{ display: 'flex', alignItems: 'center' }}>
						<input
							type='radio'
							name={`relationship${filters.gender}`}
							value={filters.relationship}
							checked={filters.relationship === 'Swinger'}
							onChange={() =>
								setFilters({
									...filters,
									relationship: 'Swinger',
								})
							}
						/>
						Swinger
					</label>
					<label style={{ display: 'flex', alignItems: 'center' }}>
						<input
							type='radio'
							name={`relationship${filters.gender}`}
							value={filters.relationship}
							checked={filters.relationship === 'Polyamorous'}
							onChange={() =>
								setFilters({
									...filters,
									relationship: 'Polyamorous',
								})
							}
						/>
						Polyamorous
					</label>
				</div>

				{filters.accountType === 'single' ? (
					<SingleFilter
						filters={filters.single}
						handleCheckboxChange={(category, value) =>
							handleCheckboxChange('single', category, value)
						}
						handleInputChange={(field, value) =>
							handleInputChange('single', field, value)
						}
					/>
				) : (
					<div
						className='couple-filters'
						style={{ display: 'flex', justifyContent: 'space-between' }}
					>
						<div style={{ width: '47%' }}>
							<h3 style={{ textAlign: 'center', marginBottom: '10px' }}>
								Female
							</h3>
							<SingleFilter
								filters={filters.person1}
								handleCheckboxChange={(category, value) =>
									handleCheckboxChange('person1', category, value)
								}
								handleInputChange={(field, value) =>
									handleInputChange('person1', field, value)
								}
							/>
						</div>
						<div style={{ width: '47%' }}>
							<h3 style={{ textAlign: 'center', marginBottom: '10px' }}>
								Male
							</h3>
							<SingleFilter
								filters={filters.person2}
								handleCheckboxChange={(category, value) =>
									handleCheckboxChange('person2', category, value)
								}
								handleInputChange={(field, value) =>
									handleInputChange('person2', field, value)
								}
							/>
						</div>
					</div>
				)}

				<button
					type='submit'
					style={{
						marginTop: '20px',
						backgroundColor: 'rgb(42 45 55 / var(--tw-bg-opacity))',
						padding: '10px',
						borderRadius: '10px',
					}}
				>
					Search
				</button>
			</form>
			{data && (
				<div
					style={{
						display: 'flex',
						flexWrap: 'wrap',
						marginTop: '20px',
						justifyContent: 'center',
					}}
				>
					{data.map((user, i) => (
						<UserCard key={i} userInfo={user} />
					))}
				</div>
			)}
		</div>
	);
};

const SingleFilter = ({ filters, handleCheckboxChange, handleInputChange }) => (
	<>
		<div
			style={{
				backgroundColor: 'rgb(42 45 55 / var(--tw-bg-opacity))',
				marginBottom: '15px',
				padding: '10px',
				borderRadius: '10px',
			}}
		>
			<h1 style={{ marginBottom: '10px' }}>Body</h1>
			<div style={{ display: 'flex' }}>
				<div style={{ marginRight: '15px' }}>
					<h3>Body Type</h3>
					<div style={{ display: 'flex', flexDirection: 'column' }}>
						{['Slim', 'Athletic', 'Average'].map(type => (
							<label
								key={type}
								style={{ display: 'flex', alignItems: 'center' }}
							>
								<input
									type='checkbox'
									value={type}
									checked={filters.bodyType.includes(type)}
									onChange={() => handleCheckboxChange('bodyType', type)}
								/>
								{type}
							</label>
						))}
					</div>
				</div>

				<div style={{ marginRight: '15px' }}>
					<h3>Piercings</h3>
					<div style={{ display: 'flex', flexDirection: 'column' }}>
						<label
							style={{
								display: 'flex',
								alignItems: 'center',
								marginRight: '20px',
							}}
						>
							<input
								type='radio'
								name={`piercings${filters.gender}`}
								value={filters.piercings}
								checked={filters.piercings === ''}
								onChange={() => handleInputChange('piercings', '')}
							/>
							Not important
						</label>
						<label
							style={{
								display: 'flex',
								alignItems: 'center',
								marginRight: '20px',
							}}
						>
							<input
								type='radio'
								name={`piercings${filters.gender}`}
								value={filters.piercings}
								checked={filters.piercings === 'Yes'}
								onChange={() => handleInputChange('piercings', 'Yes')}
							/>
							Yes
						</label>
						<label style={{ display: 'flex', alignItems: 'center' }}>
							<input
								type='radio'
								name={`piercings${filters.gender}`}
								value={filters.piercings}
								checked={filters.piercings === 'No'}
								onChange={() => handleInputChange('piercings', 'No')}
							/>
							No
						</label>
					</div>
				</div>
				<div style={{ marginRight: '15px' }}>
					{filters.gender !== 'female' && (
						<>
							<h3>Circumcised</h3>
							<div style={{ display: 'flex', flexDirection: 'column' }}>
								<label
									style={{
										display: 'flex',
										alignItems: 'center',
										marginRight: '20px',
									}}
								>
									<input
										type='radio'
										name={`circumcised${filters.gender}`}
										value={filters.circumcised}
										checked={filters.circumcised === ''}
										onChange={() => handleInputChange('circumcised', '')}
									/>
									Not important
								</label>
								<label
									style={{
										display: 'flex',
										alignItems: 'center',
										marginRight: '20px',
									}}
								>
									<input
										type='radio'
										name={`circumcised${filters.gender}`}
										value={filters.circumcised}
										checked={filters.circumcised === 'Yes'}
										onChange={() => handleInputChange('circumcised', 'Yes')}
									/>
									Yes
								</label>
								<label style={{ display: 'flex', alignItems: 'center' }}>
									<input
										type='radio'
										name={`circumcised${filters.gender}`}
										value={filters.circumcised}
										checked={filters.circumcised === 'No'}
										onChange={() => handleInputChange('circumcised', 'No')}
									/>
									No
								</label>
							</div>
						</>
					)}
				</div>
				<div>
					<h3>Tattoos</h3>
					<div style={{ display: 'flex', flexDirection: 'column' }}>
						<label
							style={{
								display: 'flex',
								alignItems: 'center',
								marginRight: '20px',
							}}
						>
							<input
								type='radio'
								name={`tattoos${filters.gender}`}
								value={filters.tattoos}
								checked={filters.tattoos === ''}
								onChange={() => handleInputChange('tattoos', '')}
							/>
							Not important
						</label>
						<label
							style={{
								display: 'flex',
								alignItems: 'center',
								marginRight: '20px',
							}}
						>
							<input
								type='radio'
								name={`tattoos${filters.gender}`}
								value={filters.tattoos}
								checked={filters.tattoos === 'Yes'}
								onChange={() => handleInputChange('tattoos', 'Yes')}
							/>
							Yes
						</label>
						<label style={{ display: 'flex', alignItems: 'center' }}>
							<input
								type='radio'
								name={`tattoos${filters.gender}`}
								value={filters.tattoos}
								checked={filters.tattoos === 'No'}
								onChange={() => handleInputChange('tattoos', 'No')}
							/>
							No
						</label>
						<label style={{ display: 'flex', alignItems: 'center' }}>
							<input
								type='radio'
								name={`tattoos${filters.gender}`}
								value={filters.tattoos}
								checked={filters.tattoos === 'A few'}
								onChange={() => handleInputChange('tattoos', 'A few')}
							/>
							A few
						</label>
					</div>
				</div>
			</div>
		</div>

		<div
			style={{
				backgroundColor: 'rgb(42 45 55 / var(--tw-bg-opacity))',
				marginBottom: '15px',
				padding: '10px',
				borderRadius: '10px',
			}}
		>
			<h3 style={{ marginBottom: '10px' }}>Habits</h3>
			<div style={{ display: 'flex' }}>
				<div style={{ display: 'flex', flexDirection: 'column' }}>
					<h2>Smoking</h2>
					<label
						style={{
							display: 'flex',
							alignItems: 'center',
							marginRight: '20px',
						}}
					>
						<input
							type='radio'
							name={`smoking${filters.gender}`}
							value={filters.smoking}
							checked={filters.smoking === ''}
							onChange={() => handleInputChange('smoking', '')}
						/>
						Not important
					</label>
					<label
						style={{
							display: 'flex',
							alignItems: 'center',
							marginRight: '20px',
						}}
					>
						<input
							type='radio'
							name={`smoking${filters.gender}`}
							value={filters.smoking}
							checked={filters.smoking === 'Yes'}
							onChange={() => handleInputChange('smoking', 'Yes')}
						/>
						Yes
					</label>
					<label style={{ display: 'flex', alignItems: 'center' }}>
						<input
							type='radio'
							name={`smoking${filters.gender}`}
							value={filters.smoking}
							checked={filters.smoking === 'No'}
							onChange={() => handleInputChange('smoking', 'No')}
						/>
						No
					</label>
					<label style={{ display: 'flex', alignItems: 'center' }}>
						<input
							type='radio'
							name={`smoking${filters.gender}`}
							value={filters.smoking}
							checked={filters.smoking === 'Occasionaly'}
							onChange={() => handleInputChange('smoking', 'Occasionaly')}
						/>
						Occasionaly
					</label>
				</div>

				<div style={{ display: 'flex', flexDirection: 'column' }}>
					<h2>Drinking</h2>
					<label
						style={{
							display: 'flex',
							alignItems: 'center',
							marginRight: '20px',
						}}
					>
						<input
							type='radio'
							name={`drinking${filters.gender}`}
							value={filters.drinking}
							checked={filters.drinking === ''}
							onChange={() => handleInputChange('drinking', '')}
						/>
						Not important
					</label>
					<label
						style={{
							display: 'flex',
							alignItems: 'center',
							marginRight: '20px',
						}}
					>
						<input
							type='radio'
							name={`drinking${filters.gender}`}
							value={filters.drinking}
							checked={filters.drinking === 'Not your business'}
							onChange={() =>
								handleInputChange('drinking', 'Not your business')
							}
						/>
						Not your business
					</label>
					<label
						style={{
							display: 'flex',
							alignItems: 'center',
							marginRight: '20px',
						}}
					>
						<input
							type='radio'
							name={`drinking${filters.gender}`}
							value={filters.drinking}
							checked={filters.drinking === 'Like a fish'}
							onChange={() => handleInputChange('drinking', 'Like a fish')}
						/>
						Like a fish
					</label>
					<label style={{ display: 'flex', alignItems: 'center' }}>
						<input
							type='radio'
							name={`drinking${filters.gender}`}
							value={filters.drinking}
							checked={filters.drinking === 'Like a cactus'}
							onChange={() => handleInputChange('drinking', 'Like a cactus')}
						/>
						Like a cactus
					</label>
					<label style={{ display: 'flex', alignItems: 'center' }}>
						<input
							type='radio'
							name={`drinking${filters.gender}`}
							value={filters.drinking}
							checked={filters.drinking === 'I drink if offered'}
							onChange={() =>
								handleInputChange('drinking', 'I drink if offered')
							}
						/>
						I drink if offered
					</label>
				</div>

				<div style={{ display: 'flex', flexDirection: 'column' }}>
					<h2>Drugs</h2>
					<label
						style={{
							display: 'flex',
							alignItems: 'center',
							marginRight: '20px',
						}}
					>
						<input
							type='radio'
							name={`drugs${filters.gender}`}
							value={filters.drugs}
							checked={filters.drugs === ''}
							onChange={() => handleInputChange('drugs', '')}
						/>
						Not important
					</label>
					<label
						style={{
							display: 'flex',
							alignItems: 'center',
							marginRight: '20px',
						}}
					>
						<input
							type='radio'
							name={`drugs${filters.gender}`}
							value={filters.drugs}
							checked={filters.drugs === 'Not your business'}
							onChange={() => handleInputChange('drugs', 'Not your business')}
						/>
						Not your business
					</label>
					<label
						style={{
							display: 'flex',
							alignItems: 'center',
							marginRight: '20px',
						}}
					>
						<input
							type='radio'
							name={`drugs${filters.gender}`}
							value={filters.drugs}
							checked={filters.drugs === 'No, thanks'}
							onChange={() => handleInputChange('drugs', 'No, thanks')}
						/>
						No, thanks
					</label>
					<label style={{ display: 'flex', alignItems: 'center' }}>
						<input
							type='radio'
							name={`drugs${filters.gender}`}
							value={filters.drugs}
							checked={filters.drugs === 'Yes, thanks'}
							onChange={() => handleInputChange('drugs', 'Yes, thanks')}
						/>
						Yes, thanks
					</label>
					<label style={{ display: 'flex', alignItems: 'center' }}>
						<input
							type='radio'
							name={`drugs${filters.gender}`}
							value={filters.drugs}
							checked={filters.drugs === 'More, thanks'}
							onChange={() => handleInputChange('drugs', 'More, thanks')}
						/>
						More, thanks
					</label>
				</div>
			</div>
		</div>

		<div
			style={{
				backgroundColor: 'rgb(42 45 55 / var(--tw-bg-opacity))',
				marginBottom: '15px',
				padding: '10px',
				borderRadius: '10px',
			}}
		>
			<div style={{ display: 'flex', flexDirection: 'column' }}>
				<h2 style={{ marginBottom: '10px' }}>Ethnic Background</h2>
				<label
					style={{ display: 'flex', alignItems: 'center', marginRight: '20px' }}
				>
					<input
						type='radio'
						name={`ethnicBackground${filters.gender}`}
						value={filters.ethnicBackground}
						checked={filters.ethnicBackground === ''}
						onChange={() => handleInputChange('ethnicBackground', '')}
					/>
					All
				</label>
				<label
					style={{ display: 'flex', alignItems: 'center', marginRight: '20px' }}
				>
					<input
						type='radio'
						name={`ethnicBackground${filters.gender}`}
						value={filters.ethnicBackground}
						checked={filters.ethnicBackground === 'Caucasian'}
						onChange={() => handleInputChange('ethnicBackground', 'Caucasian')}
					/>
					Caucasian
				</label>
				<label
					style={{ display: 'flex', alignItems: 'center', marginRight: '20px' }}
				>
					<input
						type='radio'
						name={`ethnicBackground${filters.gender}`}
						value={filters.ethnicBackground}
						checked={filters.ethnicBackground === 'Hispanic/Latin'}
						onChange={() =>
							handleInputChange('ethnicBackground', 'Hispanic/Latin')
						}
					/>
					Hispanic/Latin
				</label>
				<label style={{ display: 'flex', alignItems: 'center' }}>
					<input
						type='radio'
						name={`ethnicBackground${filters.gender}`}
						value={filters.ethnicBackground}
						checked={filters.ethnicBackground === 'Black/African-American'}
						onChange={() =>
							handleInputChange('ethnicBackground', 'Black/African-American')
						}
					/>
					Black/African-American
				</label>
				<label style={{ display: 'flex', alignItems: 'center' }}>
					<input
						type='radio'
						name={`ethnicBackground${filters.gender}`}
						value={filters.ethnicBackground}
						checked={filters.ethnicBackground === 'Asian'}
						onChange={() => handleInputChange('ethnicBackground', 'Asian')}
					/>
					Asian
				</label>
				<label style={{ display: 'flex', alignItems: 'center' }}>
					<input
						type='radio'
						name={`ethnicBackground${filters.gender}`}
						value={filters.ethnicBackground}
						checked={filters.ethnicBackground === 'Indian'}
						onChange={() => handleInputChange('ethnicBackground', 'Indian')}
					/>
					Indian
				</label>
				<label style={{ display: 'flex', alignItems: 'center' }}>
					<input
						type='radio'
						name={`ethnicBackground${filters.gender}`}
						value={filters.ethnicBackground}
						checked={filters.ethnicBackground === 'Indigenous'}
						onChange={() => handleInputChange('ethnicBackground', 'Indigenous')}
					/>
					Indigenous
				</label>
				<label style={{ display: 'flex', alignItems: 'center' }}>
					<input
						type='radio'
						name={`ethnicBackground${filters.gender}`}
						value={filters.ethnicBackground}
						checked={filters.ethnicBackground === 'Middle Eastern'}
						onChange={() =>
							handleInputChange('ethnicBackground', 'Middle Eastern')
						}
					/>
					Middle Eastern
				</label>
				<label style={{ display: 'flex', alignItems: 'center' }}>
					<input
						type='radio'
						name={`ethnicBackground${filters.gender}`}
						value={filters.ethnicBackground}
						checked={filters.ethnicBackground === 'Other'}
						onChange={() => handleInputChange('ethnicBackground', 'Other')}
					/>
					Other
				</label>
			</div>
		</div>

		<div
			style={{
				display: 'flex',
				backgroundColor: 'rgb(42 45 55 / var(--tw-bg-opacity))',
				marginBottom: '15px',
				padding: '10px',
				borderRadius: '10px',
			}}
		>
			<div style={{ display: 'flex', flexDirection: 'column' }}>
				<h2>Experience</h2>
				<label
					style={{ display: 'flex', alignItems: 'center', marginRight: '20px' }}
				>
					<input
						type='radio'
						name={`experience${filters.gender}`}
						value={filters.experience}
						checked={filters.experience === ''}
						onChange={() => handleInputChange('experience', '')}
					/>
					Not important
				</label>
				<label
					style={{ display: 'flex', alignItems: 'center', marginRight: '20px' }}
				>
					<input
						type='radio'
						name={`experience${filters.gender}`}
						value={filters.experience}
						checked={filters.experience === 'Curious'}
						onChange={() => handleInputChange('experience', 'Curious')}
					/>
					Curious
				</label>
				<label
					style={{ display: 'flex', alignItems: 'center', marginRight: '20px' }}
				>
					<input
						type='radio'
						name={`experience${filters.gender}`}
						value={filters.experience}
						checked={filters.experience === 'Newbie'}
						onChange={() => handleInputChange('experience', 'Newbie')}
					/>
					Newbie
				</label>
				<label style={{ display: 'flex', alignItems: 'center' }}>
					<input
						type='radio'
						name={`experience${filters.gender}`}
						value={filters.experience}
						checked={filters.experience === 'Intermediate'}
						onChange={() => handleInputChange('experience', 'Intermediate')}
					/>
					Intermediate
				</label>
				<label style={{ display: 'flex', alignItems: 'center' }}>
					<input
						type='radio'
						name={`experience${filters.gender}`}
						value={filters.experience}
						checked={filters.experience === 'Advanced'}
						onChange={() => handleInputChange('experience', 'Advanced')}
					/>
					Advanced
				</label>
			</div>

			<div style={{ display: 'flex', flexDirection: 'column' }}>
				<h2>Intelligence</h2>
				<label
					style={{ display: 'flex', alignItems: 'center', marginRight: '20px' }}
				>
					<input
						type='radio'
						name={`intelligence${filters.gender}`}
						value={filters.intelligence}
						checked={filters.intelligence === ''}
						onChange={() => handleInputChange('intelligence', '')}
					/>
					All
				</label>
				<label
					style={{ display: 'flex', alignItems: 'center', marginRight: '20px' }}
				>
					<input
						type='radio'
						name={`intelligence${filters.gender}`}
						value={filters.intelligence}
						checked={filters.intelligence === 'Low Importance'}
						onChange={() => handleInputChange('intelligence', 'Low Importance')}
					/>
					Low Importance
				</label>
				<label
					style={{ display: 'flex', alignItems: 'center', marginRight: '20px' }}
				>
					<input
						type='radio'
						name={`intelligence${filters.gender}`}
						value={filters.intelligence}
						checked={filters.intelligence === 'Medium Importance'}
						onChange={() =>
							handleInputChange('intelligence', 'Medium Importance')
						}
					/>
					Medium Importance
				</label>
				<label style={{ display: 'flex', alignItems: 'center' }}>
					<input
						type='radio'
						name={`intelligence${filters.gender}`}
						value={filters.intelligence}
						checked={filters.intelligence === 'High Importance'}
						onChange={() =>
							handleInputChange('intelligence', 'High Importance')
						}
					/>
					High Importance
				</label>
				<label style={{ display: 'flex', alignItems: 'center' }}>
					<input
						type='radio'
						name={`intelligence${filters.gender}`}
						value={filters.intelligence}
						checked={filters.intelligence === 'No'}
						onChange={() => handleInputChange('intelligence', 'No')}
					/>
					No
				</label>
			</div>

			<div style={{ display: 'flex', flexDirection: 'column' }}>
				<h2>Looks Important</h2>
				<label
					style={{ display: 'flex', alignItems: 'center', marginRight: '20px' }}
				>
					<input
						type='radio'
						name={`looksImportant${filters.gender}`}
						value={filters.looksImportant}
						checked={filters.looksImportant === ''}
						onChange={() => handleInputChange('looksImportant', '')}
					/>
					All
				</label>
				<label
					style={{ display: 'flex', alignItems: 'center', marginRight: '20px' }}
				>
					<input
						type='radio'
						name={`looksImportant${filters.gender}`}
						value={filters.looksImportant}
						checked={filters.looksImportant === 'Low Importance'}
						onChange={() =>
							handleInputChange('looksImportant', 'Low Importance')
						}
					/>
					Low Importance
				</label>
				<label
					style={{ display: 'flex', alignItems: 'center', marginRight: '20px' }}
				>
					<input
						type='radio'
						name={`looksImportant${filters.gender}`}
						value={filters.looksImportant}
						checked={filters.looksImportant === 'Medium Importance'}
						onChange={() =>
							handleInputChange('looksImportant', 'Medium Importance')
						}
					/>
					Medium Importance
				</label>
				<label style={{ display: 'flex', alignItems: 'center' }}>
					<input
						type='radio'
						name={`looksImportant${filters.gender}`}
						value={filters.looksImportant}
						checked={filters.looksImportant === 'High Importance'}
						onChange={() =>
							handleInputChange('looksImportant', 'High Importance')
						}
					/>
					High Importance
				</label>
				<label style={{ display: 'flex', alignItems: 'center' }}>
					<input
						type='radio'
						name={`looksImportant${filters.gender}`}
						value={filters.looksImportant}
						checked={filters.looksImportant === 'No'}
						onChange={() => handleInputChange('looksImportant', 'No')}
					/>
					No
				</label>
			</div>
		</div>

		<div
			style={{
				backgroundColor: 'rgb(42 45 55 / var(--tw-bg-opacity))',
				marginBottom: '15px',
				padding: '10px',
				borderRadius: '10px',
			}}
		>
			<div style={{ display: 'flex', flexDirection: 'column' }}>
				<h2 style={{ marginBottom: '10px' }}>Sexuality</h2>
				<label
					style={{ display: 'flex', alignItems: 'center', marginRight: '20px' }}
				>
					<input
						type='radio'
						name={`sexuality${filters.gender}`}
						value={filters.sexuality}
						checked={filters.sexuality === ''}
						onChange={() => handleInputChange('sexuality', '')}
					/>
					All
				</label>
				<label
					style={{ display: 'flex', alignItems: 'center', marginRight: '20px' }}
				>
					<input
						type='radio'
						name={`sexuality${filters.gender}`}
						value={filters.sexuality}
						checked={filters.sexuality === 'Straight'}
						onChange={() => handleInputChange('sexuality', 'Straight')}
					/>
					Straight
				</label>
				<label
					style={{ display: 'flex', alignItems: 'center', marginRight: '20px' }}
				>
					<input
						type='radio'
						name={`sexuality${filters.gender}`}
						value={filters.sexuality}
						checked={filters.sexuality === 'Bi-Sexual'}
						onChange={() => handleInputChange('sexuality', 'Bi-Sexual')}
					/>
					Bi-Sexual
				</label>
				<label style={{ display: 'flex', alignItems: 'center' }}>
					<input
						type='radio'
						name={`sexuality${filters.gender}`}
						value={filters.sexuality}
						checked={filters.sexuality === 'Bi-Curious'}
						onChange={() => handleInputChange('sexuality', 'Bi-Curious')}
					/>
					Bi-Curious
				</label>
				<label style={{ display: 'flex', alignItems: 'center' }}>
					<input
						type='radio'
						name={`sexuality${filters.gender}`}
						value={filters.sexuality}
						checked={filters.sexuality === 'Gay'}
						onChange={() => handleInputChange('sexuality', 'Gay')}
					/>
					Gay
				</label>
				<label style={{ display: 'flex', alignItems: 'center' }}>
					<input
						type='radio'
						name={`sexuality${filters.gender}`}
						value={filters.sexuality}
						checked={filters.sexuality === 'Pansexual'}
						onChange={() => handleInputChange('sexuality', 'Pansexual')}
					/>
					Pansexual
				</label>
			</div>
		</div>

		{/* <div
			style={{
				backgroundColor: 'rgb(42 45 55 / var(--tw-bg-opacity))',
				marginBottom: '15px',
				padding: '10px',
				borderRadius: '10px',
			}}
		>
			<h3 style={{marginBottom: '10px'}}>Interests</h3>
			<div style={{ display: 'flex', flexDirection: 'column' }}>
				{['Sports', 'Music', 'Travel', 'Reading', 'Cooking'].map(interest => (
					<label
						key={interest}
						style={{ display: 'flex', alignItems: 'center' }}
					>
						<input
							type='checkbox'
							value={interest}
							checked={filters.interests.includes(interest)}
							onChange={() => handleCheckboxChange('interests', interest)}
						/>
						{interest}
					</label>
				))}
			</div>
		</div> */}

		<div
			style={{
				backgroundColor: 'rgb(42 45 55 / var(--tw-bg-opacity))',
				marginBottom: '15px',
				padding: '10px',
				borderRadius: '10px',
			}}
		>
			<h3 style={{ marginBottom: '10px' }}>Age</h3>
			<div>
				<input
					type='number'
					value={filters.ageRange[0]}
					onChange={e =>
						handleInputChange('ageRange', [
							parseInt(e.target.value),
							filters.ageRange[1],
						])
					}
					style={{
						backgroundColor: 'white',
						color: 'black',
						borderRadius: '5px',
						padding: '0 10px',
						maxWidth: '100px',
						marginRight: '15px',
					}}
					placeholder='Min'
				/>
				<input
					type='number'
					value={filters.ageRange[1]}
					onChange={e =>
						handleInputChange('ageRange', [
							filters.ageRange[0],
							parseInt(e.target.value),
						])
					}
					style={{
						backgroundColor: 'white',
						color: 'black',
						borderRadius: '5px',
						padding: '0 10px',
						maxWidth: '100px',
					}}
					placeholder='Max'
				/>
			</div>

			{/* <h3>Location</h3>
		<input
			type='text'
			value={filters.location}
			onChange={e => handleInputChange('location', e.target.value)}
			placeholder='City, State'
		/> */}

			<h3 style={{ marginBottom: '10px' }}>Height</h3>
			<div>
				<input
					type='number'
					value={filters.heightRange[0]}
					onChange={e =>
						handleInputChange('heightRange', [
							parseInt(e.target.value),
							filters.heightRange[1],
						])
					}
					style={{
						borderRadius: '5px',
						padding: '0 10px',
						maxWidth: '100px',
						marginRight: '15px',
						backgroundColor: 'white',
						color: 'black',
					}}
					placeholder='Min'
				/>
				<input
					type='number'
					value={filters.heightRange[1]}
					onChange={e =>
						handleInputChange('heightRange', [
							filters.heightRange[0],
							parseInt(e.target.value),
						])
					}
					style={{
						backgroundColor: 'white',
						color: 'black',
						borderRadius: '5px',
						padding: '0 10px',
						maxWidth: '100px',
					}}
					placeholder='Max'
				/>
			</div>

			<h3 style={{ marginBottom: '10px' }}>Weight</h3>
			<div>
				<input
					type='number'
					value={filters.weightRange[0]}
					onChange={e =>
						handleInputChange('weightRange', [
							e.target.value,
							filters.weightRange[1],
						])
					}
					style={{
						borderRadius: '5px',
						padding: '0 10px',
						maxWidth: '100px',
						marginRight: '15px',
						backgroundColor: 'white',
						color: 'black',
					}}
					placeholder='Min'
				/>
				<input
					type='number'
					value={filters.weightRange[1]}
					onChange={e =>
						handleInputChange('weightRange', [
							filters.weightRange[0],
							e.target.value,
						])
					}
					style={{
						backgroundColor: 'white',
						color: 'black',
						borderRadius: '5px',
						padding: '0 10px',
						maxWidth: '100px',
					}}
					placeholder='Max'
				/>
			</div>
		</div>
	</>
);

export default AdvancedSearch;
