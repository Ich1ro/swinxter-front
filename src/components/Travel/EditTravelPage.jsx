import axios from 'axios';
import Multiselect from 'multiselect-react-dropdown';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import api from '../../utils/api';
import { useSelector } from 'react-redux';
function EditTravelPage() {
	const [areaname, setAreaName] = useState([]);
	const currentDate = new Date().toISOString()?.slice(0, 16);
	const [selectedOption, setSelectedOption] = useState(null);
	const [selectlocation, setSelectedLocation] = useState([]);
	const options = ['M', 'F', 'MF', 'MM', 'FF', 'T'];
	const [userToken, setUserToken] = useState('');
	const [travel, setTravel] = useState({
		Location: '',
		start_date: '',
		end_date: '',
		description: '',
	});
	const { travelid } = useParams();
	const navigate = useNavigate();
	const { user } = useSelector(state => state.auth);
	const [userInfo, setUserInfo] = useState(user);

	const getTravel = async () => {
		try {
			const { data } = await api.get(`/travel/${travelid}`);
			setTravel({
				Location: data?.locationto?.display_name,
				start_date: data?.startDate,
				end_date: data?.endDate,
				description: data?.description,
			});

			setSelectedOption(data?.interested);
		} catch (error) {
			console.log(error);
		}
	};
	useEffect(() => {
		setUserInfo(user);
		getTravel();
	}, []);

	const handleSelect = data => {
		setSelectedOption(data);
	};

	const handleChange = e => {
		const { value, name } = e.target;
		setTravel({ ...travel, [name]: value });
	};

	useEffect(() => {
		axios
			.get(
				`https://us1.locationiq.com/v1/search?key=pk.9f0f98671dda49d28f0fdd64e6aa2634&q=${travel['Location']}&format=json`
			)
			.then(res => {
				setAreaName(res.data);
			})
			.catch(err => console.log(err));
	}, [travel['Location']]);

	const handleLocation = async e => {
		let value = e.target.value;
		const url = value
			? `https://us1.locationiq.com/v1/search?key=pk.9f0f98671dda49d28f0fdd64e6aa2634&q=${value}&format=json`
			: '';
		try {
			if (url) {
				await axios
					.get(url)
					.then(res => {
						setAreaName(res.data);
						console.log(res.data);
					})
					.catch(err => console.log(err));
				setTravel({ ...travel, ['Location']: value });
			} else {
				setTravel({ ...travel, ['Location']: value });
			}
		} catch (err) {
			console.log(err);
		}
	};

	// _______________________UPDATE THE DATA____________________________
	const handleTravelSubmit = async e => {
		e.preventDefault();
		const formdata = new FormData();

		formdata.append('locationto', JSON.stringify(selectlocation));
		formdata.append('startDate', travel.start_date);
		formdata.append('endDate', travel.end_date);
		formdata.append('interested', JSON.stringify(selectedOption));
		formdata.append('description', travel.description);
		const headers = {
			'Content-Type': 'multipart/form-data',
			token: userToken,
		};
		const updateTravelPromise = api.put(
			`/update_travel?travelId=${travelid}`,
			formdata,
			{ headers }
		);

		toast.promise(updateTravelPromise, {
			loading: 'Updating travel...',
			success: 'Travel updated successfully!',
			error: 'Something went wrong. Please try again.',
		});

		try {
			const { data } = await updateTravelPromise;

			if (data) {
				navigate('/my-travel');
			}
		} catch (error) {
			console.error('Error updating travel:', error);
		}
	};

	return (
		<div className='bg-white rounded-40px'>
			<div className='text-center p-5 py-10 text-black'>
				<h3 className='text-2xl sm:text-4xl mb-2'>Edit Your Travel Page</h3>
				<p className='text-lg'>Let's Create a Notorious Travel</p>
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
							<div className='flex flex-wrap rounded-md input_field_2'>
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
									value={travel.Location}
									autocomplete='off'
									className='bg-black border md:rounded-l-none rounded-md md:border-none md:border-l-2 md:rounded-r-md border-orange focus:outline-none focus-visible:none w-full md:w-[calc(100%-120px)] xl:w-[calc(100%-195px)] h-[49px] text-gray font-normal xl:text-lg rounded-r-md text-sm px-2 xl:px-4 py-2.5 text-start placeholder:text-lg placeholder:text-gray items-center flex justify-between'
									required
								/>
								<div>
									{areaname.length !== 0 &&
										areaname.map((el, i) => (
											<div
												style={{
													display: 'flex',
													direction: 'column',
													gap: '20px',
												}}
											>
												<div
													onClick={() => {
														setTravel({
															...travel,
															['Location']: el.display_name,
														});
														setSelectedLocation(el);
														setAreaName([]);
													}}
													style={{
														width: '100%',
														border: 0,
														borderBottom: '3px solid black',
														padding: '3px',
													}}
												>
													{el.display_name}
												</div>
											</div>
										))}
								</div>
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
									min={travel.start_date || currentDate}
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
									className='ctm_multi_select'
									options={options} // Options to display in the dropdown
									selectedValues={selectedOption} // Preselected value to persist in dropdown
									onSelect={handleSelect} // Function will trigger on select event
									onRemove={handleSelect}
									// displayValue="label" // Property name to display in the dropdown options
									isObject={false}
									placeholder='Welcome For'
									// style={{
									//     chips: {
									//         background: "orange",
									//     },
									//     multiselectContainer: {
									//         color: "black",
									//     },
									//     searchBox: {
									//         border: "1px solid orange",
									//         // "border-bottom": "1px ",
									//         "border-radius": "5px",
									//     },
									// }}
								/>
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
										onChange={e => handleChange(e)}
										style={{ whiteSpace: 'pre-line' }}
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
}
export default EditTravelPage;
