import axios from 'axios';
import Multiselect from 'multiselect-react-dropdown';
import React, { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import api from '../../utils/api';
import { BackBtn } from '../M_used/BackBtn';
const CreateTravelPage = () => {
	const DEBOUNCE_DELAY = 300;
	const [areaname, setAreaName] = useState([]);
	const [selectlocation, setSelectedLocation] = useState([]);
	const [resorts, setResorts] = useState([]);
	const [selectedOptions, setSelectedOptions] = useState();
	const [showResults, setShowResults] = useState(false);
	const options = ['M', 'F', 'MF', 'MM', 'FF', 'T'];
	const [travel, setTravel] = useState({
		Location: '',
		start_date: '',
		resort: '',
		end_date: '',
		description: '',
		userInfo: '',
	});
	const { user } = useSelector(state => state.auth);
	const [userInfo, setUserInfo] = useState(user);
	const debouncedSearch = useRef(null);
	useEffect(() => {
		setUserInfo(user);
	}, []);
	useEffect(() => {
		setUserInfo(user);
	}, []);
	const navigate = useNavigate();
	const currentDate = new Date().toISOString()?.slice(0, 16);

	const handleChange = e => {
		const { value, name } = e.target;
		setTravel({ ...travel, [name]: value });
	};

	function handleSelect(data) {
		setSelectedOptions(data);
	}

	const handleLocation = e => {
		const value = e.target.value;
		setTravel({ ...travel, ['Location']: value });
		setShowResults(true);

		if (debouncedSearch.current) {
			clearTimeout(debouncedSearch.current);
		}

		debouncedSearch.current = setTimeout(async () => {
			try {
				const url = value
					? `https://us1.locationiq.com/v1/search?key=pk.9f0f98671dda49d28f0fdd64e6aa2634&q=${value}&format=json`
					: '';

				if (url) {
					const res = await axios.get(url);
					setAreaName(res.data);
				} else {
					setAreaName([]);
				}
			} catch (err) {
				console.log(err);
			}
		}, DEBOUNCE_DELAY);
	};

	const handleResultClick = result => {
		setTravel({ ...travel, ['Location']: result });
		setShowResults(false);
	};

	const handleTravelSubmit = async e => {
		e.preventDefault();
		const formdata = new FormData();
		formdata.append('image', userInfo.image);
		formdata.append('name', userInfo.username);
		formdata.append('locationto', JSON.stringify(travel?.Location));
		formdata.append('startDate', travel.start_date);
		formdata.append('resort', travel.resort);
		formdata.append('endDate', travel.end_date);
		formdata.append('interested', JSON.stringify(selectedOptions));
		formdata.append('description', travel.description);
		formdata.append('userId', userInfo._id);

		if (
			!travel.description ||
			!travel.end_date ||
			!travel.start_date ||
			selectedOptions.length === 0
		) {
			toast.error(' Please fill in all the required fields.');
			return;
		}
		const config = {
			headers: {
				'Content-Type': 'multipart/form-data',
			},
		};
		console.log(formdata);
		const travelCreationPromise = api.post(`/createTravle`, formdata, config);

		toast.promise(travelCreationPromise, {
			loading: 'Creating travel...',
			success: '🦄 Travel created successfully!',
			error: '🦄 Failed to create travel!',
		});

		try {
			const { data } = await travelCreationPromise;

			if (data) {
				setTravel({
					Location: '',
					start_date: '',
					resort: '',
					end_date: '',
					description: '',
				});
				setSelectedOptions();
				navigate('/travel-page');
			}
		} catch (error) {
			console.error('Error creating travel:', error);
		}
	};

	console.log(travel);

	const options2 = [
		{ value: 'Astoria Current', label: 'Astoria Current' },
		{ value: 'Taj Hotel', label: 'Taj Hotel' },
		{ value: 'Motel Magic', label: 'Motel Magic' },
		{ value: 'Southern Resort', label: 'Southern Resort' },
		{ value: 'Countryside Inn', label: 'Countryside Inn' },
		{ value: 'Blossom Bed', label: 'Blossom Bed' },
	];

	const getResorts = async () => {
		const resorst = await api.get(`/get_resorts`);
		setResorts(resorst.data);
	};

	useEffect(() => {
		getResorts();
	}, []);

	useEffect(() => {
		console.log(resorts);
		
	}, [resorts]);

	return (
		<div className='bg-white rounded-40px'>
			<div className='text-center p-5 py-10 text-black px-10 relative'>
				<BackBtn />
				<h3 className='text-2xl sm:text-4xl mb-2'>
					Create Your Situationship Plan
				</h3>
				<p className='text-lg'>Let’s Create a Notorious Travel</p>
			</div>
			<div className='flex flex-wrap bg-black rounded-40px '>
				<div className='w-full md:w-3/5 xl:w-full 2xl:w-3/5 '>
					<div className='sign-up__form flex flex-col justify-center gap-30 py-6 px-6 lg:py-11 lg:px-5 lg:pl-10'>
						<h2 className='text-white text-2xl sm:text-3xl xl:text-5xl text-center xl:text-start font-bold mb-6'>
							Destination Details
						</h2>

						<form
							className='flex flex-col justify-center gap-y-4 sm:gap-y-6'
							autoComplete='off'
						>
							{/* <div className="flex flex-wrap rounded-md input_field_2">
                <label
                  htmlFor="loc_to"
                  className="rounded-l-md w-full md:w-[120px] xl:w-[195px] sm:h-[49px] flex items-center justify-start sm:px-2 lg:px-4 text-sm mb-1 sm:mb-0 md:text-text-xs xl:text-lg text-white  font-normal leading-5 xl:leading-29 text-center 
                                                    lg:text-start"
                >
                  Traveling To
                </label>
                <input
                  type="text"
                  id="loc_to"
                  name="loc_to"
                  value={travel.loc_to}
                  onChange={handleChange}
                  autoComplete="off"
                  className="bg-black border md:rounded-l-none rounded-md md:border-none md:border-l-2 md:rounded-r-md border-orange focus:outline-none focus-visible:none w-full md:w-[calc(100%-120px)] xl:w-[calc(100%-195px)] h-[49px] text-gray font-normal xl:text-lg rounded-r-md text-sm px-2 xl:px-4 py-2.5 text-start placeholder:text-lg placeholder:text-gray items-center flex justify-between"
                  // placeholder="name@flowbite.com"
                  required
                />
              </div> */}
							{/* <div className='flex flex-wrap rounded-md input_field_2'>
								<label
									htmlFor='Location'
									className='rounded-l-md w-full md:w-[120px] xl:w-[195px] sm:h-[49px] flex items-center justify-start sm:px-2 lg:px-4 text-sm mb-1 sm:mb-0 md:text-text-xs xl:text-lg text-white  font-normal leading-5 xl:leading-29 text-center 
                                            lg:text-start'
								>
									Location
								</label>
								<input
									type='text'
									id='Location'
									name='Location'
									onChange={e => handleLocation(e)}
									value={travel.Location?.display_name}
									autocomplete='off'
									className='bg-black border md:rounded-l-none rounded-md md:border-none md:border-l-2 md:rounded-r-md border-orange focus:outline-none focus-visible:none w-full md:w-[calc(100%-120px)] xl:w-[calc(100%-195px)] h-[49px] text-gray font-normal xl:text-lg rounded-r-md text-sm px-2 xl:px-4 py-2.5 text-start placeholder:text-lg placeholder:text-gray items-center flex justify-between'
									required
								/>
								{showResults && (
									<ul>
										{areaname.map(result => (
											<li
												style={{ padding: '8px', width: '100%' }}
												key={result.place_id}
												onClick={() => handleResultClick(result)}
											>
												{result.display_name}
											</li>
										))}
									</ul>
								)}
							</div> */}
							<div className='flex flex-wrap rounded-md input_field_2'>
								<label
									htmlFor='start_date'
									className='rounded-l-md w-full md:w-[120px] xl:w-[195px] sm:h-[49px] flex items-center justify-start sm:px-2 lg:px-4 text-sm mb-1 sm:mb-0 md:text-text-xs xl:text-lg text-white  font-normal leading-5 xl:leading-29 text-center 
                                                    lg:text-start'
								>
									Resort
								</label>
								<select
									className='bg-black border rounded-md md:rounded-none md:border-none md:border-l-2 md:rounded-r-md border-orange focus:outline-none focus-visible:none w-full md:w-[calc(100%-120px)] xl:w-[calc(100%-195px)] h-[49px] text-white font-normal xl:text-lg rounded-r-md text-sm px-2 xl:px-4 py-2.5 text-start placeholder:text-lg placeholder:text-gray items-center flex justify-between'
									onChange={handleChange}
									name='resort'
								>
									<option value={''}>Please select</option>
									{resorts.length > 0
										? resorts.map(el => (
												<option key={el._id} value={el.name}>
													{el.name}
												</option>
										  ))
										: ''}
								</select>
							</div>

							<div className='flex flex-wrap rounded-md input_field_2'>
								<label
									htmlFor='start_date'
									className='rounded-l-md w-full md:w-[120px] xl:w-[195px] sm:h-[49px] flex items-center justify-start sm:px-2 lg:px-4 text-sm mb-1 sm:mb-0 md:text-text-xs xl:text-lg text-white  font-normal leading-5 xl:leading-29 text-center 
                                                    lg:text-start'
								>
									Start Date
								</label>
								<input
									type='datetime-local'
									id='start_date'
									name='start_date'
									value={travel.start_date}
									onChange={e => handleChange(e)}
									autoComplete='off'
									min={currentDate}
									className='bg-black border md:rounded-l-none rounded-md md:border-none md:border-l-2 md:rounded-r-md border-orange focus:outline-none focus-visible:none w-full md:w-[calc(100%-120px)] xl:w-[calc(100%-195px)] h-[49px] text-gray font-normal xl:text-lg rounded-r-md text-sm px-2 xl:px-4 py-2.5 text-start placeholder:text-lg placeholder:text-gray items-center flex justify-between'
									// placeholder="name@flowbite.com"
									required
								/>
							</div>
							<div className='flex flex-wrap rounded-md input_field_2'>
								<label
									htmlFor='end_date'
									className='rounded-l-md w-full md:w-[120px] xl:w-[195px] sm:h-[49px] flex items-center justify-start sm:px-2 lg:px-4 text-sm mb-1 sm:mb-0 md:text-text-xs xl:text-lg text-white  font-normal leading-5 xl:leading-29 text-center 
                                                    lg:text-start'
								>
									End Date
								</label>
								<input
									min={travel?.start_date || currentDate}
									type='datetime-local'
									id='end_date'
									name='end_date'
									value={travel.end_date}
									onChange={e => handleChange(e)}
									autoComplete='off'
									className='bg-black border md:rounded-l-none rounded-md md:border-none md:border-l-2 md:rounded-r-md border-orange focus:outline-none focus-visible:none w-full md:w-[calc(100%-120px)] xl:w-[calc(100%-195px)] h-[49px] text-gray font-normal xl:text-lg rounded-r-md text-sm px-2 xl:px-4 py-2.5 text-start placeholder:text-lg placeholder:text-gray items-center flex justify-between'
									// placeholder="name@flowbite.com"
									required
								/>
							</div>
							<div>
								<Multiselect
									options={options} // Options to display in the dropdown
									selectedValues={selectedOptions} // Preselected value to persist in dropdown
									onSelect={handleSelect} // Function will trigger on select event
									onRemove={handleSelect}
									// displayValue="label" // Property name to display in the dropdown options
									isObject={false}
									placeholder='Welcome For'
									style={{
										chips: {
											background: 'orange',
										},
										multiselectContainer: {
											color: 'black',
										},
										searchBox: {
											border: '1px solid orange',
											// "border-bottom": "1px ",
											'border-radius': '5px',
										},
									}}
								/>
								{/* <div className="flex flex-wrap rounded-md input_field">
                  <label
                    htmlFor="interests"
                    className="rounded-l-md w-full md:w-[120px] xl:w-[195px] md:h-[49px] flex items-center justify-start md:px-2 lg:px-4 text-sm mb-1 md:mb-0 md:text-text-xs xl:text-lg text-white  font-normal leading-5 xl:leading-29 text-center lg:text-start"
                  >
                    Interests
                  </label>
                  <select
                    name="interests"
                    id="interests"
                    value={travel.interests}
                    onChange={handleChange}
                    className="bg-black border rounded-md md:rounded-none md:border-none md:border-l-2 md:rounded-r-md border-orange focus:outline-none focus-visible:none w-full md:w-[calc(100%-120px)] xl:w-[calc(100%-195px)] h-[49px] text-white font-normal xl:text-lg rounded-r-md text-sm px-2 xl:px-4 py-2.5 text-start placeholder:text-lg placeholder:text-gray items-center flex justify-between"
                  >
                    <option value="m">M</option>
                    <option value="f">F</option>
                    <option value="mm">MM</option>
                    <option value="ff">FF</option>
                    <option value="mf">MF</option>
                  </select>
                </div> */}
								{/* {formErrors.email && (<p className="w-full capitalize text-xs p-1">{formErrors.email}</p>)} */}
							</div>
							<div className='flex flex-col gap-30'>
								<label
									htmlFor='Description'
									className='gradient w-full h-[49px] flex items-center justify-center text-lg text-white  font-normal leading-29 rounded-md mb-6'
								>
									Description
								</label>
								<div className='p-[2px] gradient rounded-md'>
									<textarea
										type='text'
										id='Description'
										rows={3}
										name='description'
										value={travel.description}
										style={{ whiteSpace: 'pre-line' }}
										onChange={handleChange}
										className='bg-black focus:outline-none focus-visible:none w-full border-gradient3 text-gray font-normal xl:text-lg rounded-md text-sm px-2 xl:px-4 py-2.5 text-center md:text-start items-center flex justify-between'
										required
									></textarea>
								</div>
							</div>
							<button
								className='gradient !py-3 w-full !text-lg xl:!text-25px capitalize !font-bold flex justify-center items-center text-white rounded-xl primary_btn'
								onClick={handleTravelSubmit}
							>
								Submit
							</button>
						</form>
					</div>
				</div>
				<div className='md:w-2/5 xl:w-full 2xl:w-2/5  md:p-5'>
					<img
						src='images/lovely-couples.png'
						alt='Create-travel'
						className='block h-full w-full rounded-40px md:p-0 p-5 rounded-b-40px  object-cover object-center aspect-square md:aspect-auto xl:aspect-square 2xl:md:aspect-auto'
					/>
				</div>
			</div>
		</div>
	);
};

export default CreateTravelPage;
