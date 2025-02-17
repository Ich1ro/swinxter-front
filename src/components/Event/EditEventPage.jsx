import axios from 'axios';
import Multiselect from 'multiselect-react-dropdown';
import React, { useEffect, useRef, useState } from 'react';
import { IoCloseCircleSharp } from 'react-icons/io5';
import { useNavigate } from 'react-router';
import { useParams } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import api from '../../utils/api';
import getFullCoordinatesFromAWS from '../../utils/get-full-location';
const EditEventPage = () => {
	const DEBOUNCE_DELAY = 300;
	const [event, setEvent] = useState({
		event_name: '',
		Startdate: '',
		EndDate: '',
		country: '',
		state: '',
		city: '',
		address: '',
		Description: '',
		event_type: '',
	});
	const [areaname, setAreaName] = useState([]);
	const [selectlocation, setSelectedLocation] = useState([]);
	const [image, setImage] = useState();
	const [video, setVideo] = useState([]);
	const [eventimages, setEventmages] = useState([]);
	const [selectedImage, setselectedImage] = useState([]);
	const [selectedVideo, setselectedVideo] = useState(null);
	const [coverImage, setCoverImage] = useState(null);
	const [selectedOption, setSelectedOption] = useState(null);
	const [userToken, setUserToken] = useState('');
	const navigate = useNavigate();
	const BASE_URL = process.env.REACT_APP_BASE_URL;
	const options = ['M', 'F', 'MF', 'MM', 'FF', 'T'];
	const currentDate = new Date().toISOString().slice(0, 16);
	const [showResults, setShowResults] = useState(false);

	const debouncedSearch = useRef(null);
	const data = useParams();

	const eventid = data.id;
	const getEventInfo = async () => {
		try {
			const { data } = await api.get(`/get_event/${eventid}`);
			console.log(data);
			setEvent({
				event_name: data.eventName,
				Startdate: data.Startdate,
				EndDate: data.EndDate,
				country: data.location.country,
				state: data.location.region,
				city: data.location.municipality,
				address: `${data.location.address} ${data.location.street}`,
				Description: data.description,
				event_type: data.type,
			});
			setselectedImage(data.images);
			setCoverImage(data.mainImage);
			setSelectedOption(data.accepted_type);
			setImage(data.mainImage);
			setEventmages(data.images);
			setselectedVideo(data.videos);
			setVideo(data.videos);
		} catch (error) {
			console.log(error);
		}
	};

	// console.log(selectedImage, "SELECt")

	useEffect(() => {
		getEventInfo();
		// eslint-disable-next-line
	}, []);

	const handleLocation = e => {
		const { name, value } = e.target;
		setEvent({ ...event, [name]: value });
	};

	const handleResultClick = result => {
		console.log(result);
		setEvent({ ...event, ['Location']: result });
		setShowResults(false);
	};

	const handleChange = e => {
		const { name, value } = e.target;
		setEvent({ ...event, [name]: value });
	};

	const handleImageChange = e => {
		const file = Array.from(e.target.files);
		setselectedImage([...selectedImage, e.target.files[0]]);
		if (!file) {
			return;
		} else {
			setEventmages([...eventimages, URL.createObjectURL(e.target.files[0])]);
		}
	};

	const handleCoverImage = e => {
		const file = e.target.files[0];
		setCoverImage(file);
		if (!file) {
			return;
		} else {
			setImage(URL.createObjectURL(e.target.files[0]));
		}
	};

	const handleVideoChange = e => {
		const file = Array.from(e.target.files);
		setselectedVideo(file);
		if (!file) {
			return;
		} else {
			setVideo([...video, URL.createObjectURL(e.target.files[0])]);
		}
	};

	const handleEventimages = index => {
		const update = eventimages.filter((el, i) => i !== index);
		const fil_data = selectedImage.filter((el, i) => i !== index);
		setEventmages(update);
		setselectedImage(fil_data);
	};

	const handlevideo = index => {
		const update = video.filter((el, i) => i !== index);
		const fil_video = selectedVideo.filter((el, i) => i !== index);
		setselectedVideo(fil_video);
		setVideo(update);
	};

	const handleUpdateEvent = async e => {
		e.preventDefault();

		const address = `${event.address}, ${event.city}, ${event.state}, ${event.country}`;
		const location = await getFullCoordinatesFromAWS(address);

		const geometry = {
			type: 'Point',
			coordinates: location.coordinates,
		};

		if (location) {
			console.log(location);
		} else {
			alert('Unable to find the location. Please check the address.');
			return null;
		}

		let formData = new FormData();
		// console.log(selectedImage,selectedVideo);
		if (selectedImage) {
			selectedImage.forEach(image => formData.append('images', image));
		}
		if (selectedVideo) {
			selectedVideo.forEach(video => formData.append('videos', video));
		}

		formData.append('eventName', event.event_name);
		formData.append('Startdate', event.Startdate);
		formData.append('EndDate', event.EndDate);
		formData.append('location', JSON.stringify(event.Location));
		formData.append('description', event.Description);
		formData.append('mainImage', coverImage);
		formData.append('type', event.event_type);
		formData.append('accepted_type', JSON.stringify(selectedOption));
		formData.append('location', JSON.stringify(location.location));
		formData.append('geometry', JSON.stringify(geometry));
		try {
			const data = await api.put(`/update_event/${eventid}`, formData);
			if (!data) {
				toast.error('🦄 Failed to Edit Event!');
			} else {
				toast.success('Event Edited Successfully!');
				setEvent({
					event_name: '',
					Startdate: '',
					EndDate: '',
					country: '',
					state: '',
					city: '',
					address: '',
					Description: '',
					event_type: '',
				});
				setselectedImage(null);
				setselectedVideo(null);
				setSelectedOption([]);
				navigate(`/event-detail/${eventid}`);
			}
		} catch (error) {
			console.log(error);
		}
	};

	const handleSelect = data => {
		setSelectedOption(data);
	};

	return (
		<div className='bg-white rounded-40px'>
			<div className='text-center p-5 py-10 text-black'>
				<h3 className='text-2xl sm:text-4xl mb-2'>Event registration</h3>
				<p className='text-lg'>Edit your Event</p>
			</div>
			<div className='flex flex-wrap bg-black rounded-40px '>
				<div className='w-full md:w-3/5 xl:w-full 2xl:w-3/5 '>
					<div className='sign-up__form flex flex-col justify-center gap-30 py-6 px-6 lg:py-11 lg:px-14'>
						<h2 className='text-white text-2xl sm:text-3xl xl:text-5xl text-center xl:text-start font-bold mb-6'>
							Find Your Date
						</h2>

						<form
							className='flex flex-col justify-center gap-y-4 sm:gap-y-6'
							autocomplete='off'
						>
							<div className='flex flex-wrap rounded-md input_field_2'>
								<label
									htmlFor='event_name'
									className='rounded-l-md w-full md:w-[120px] xl:w-[195px] sm:h-[49px] flex items-center justify-start sm:px-2 lg:px-4 text-sm mb-1 sm:mb-0 md:text-text-xs xl:text-lg text-white  font-normal leading-5 xl:leading-29 text-center 
                                                lg:text-start'
								>
									Event Name
								</label>
								<input
									type='text'
									id='event_name'
									name='event_name'
									onChange={e => handleChange(e)}
									value={event.event_name}
									autocomplete='off'
									className='bg-black border md:rounded-l-none rounded-md md:border-none md:border-l-2 md:rounded-r-md border-orange focus:outline-none focus-visible:none w-full md:w-[calc(100%-120px)] xl:w-[calc(100%-195px)] h-[49px] text-gray font-normal xl:text-lg rounded-r-md text-sm px-2 xl:px-4 py-2.5 text-start placeholder:text-lg placeholder:text-gray items-center flex justify-between'
									required
								/>
							</div>
							{/* <p>{formErrors.email}</p> */}
							<div className='flex flex-wrap rounded-md input_field_2'>
								<label
									htmlFor='Startdate'
									className='rounded-l-md w-full md:w-[120px] xl:w-[195px] sm:h-[49px] flex items-center justify-start sm:px-2 lg:px-4 text-sm mb-1 sm:mb-0 md:text-text-xs xl:text-lg text-white  font-normal leading-5 xl:leading-29 text-center 
                                                lg:text-start'
								>
									Start Date
								</label>
								<input
									type='datetime-local'
									id='Startdate'
									name='Startdate'
									min={currentDate}
									onChange={e => handleChange(e)}
									value={event.Startdate}
									autocomplete='off'
									className='bg-black border md:rounded-l-none rounded-md md:border-none md:border-l-2 md:rounded-r-md border-orange focus:outline-none focus-visible:none w-full md:w-[calc(100%-120px)] xl:w-[calc(100%-195px)] h-[49px] text-gray font-normal xl:text-lg rounded-r-md text-sm px-2 xl:px-4 py-2.5 text-start placeholder:text-lg placeholder:text-gray items-center flex justify-between'
									placeholder='name@flowbite.com'
									required
								/>
							</div>
							<div className='flex flex-wrap rounded-md input_field_2'>
								<label
									htmlFor='EndDate'
									className='rounded-l-md w-full md:w-[120px] xl:w-[195px] sm:h-[49px] flex items-center justify-start sm:px-2 lg:px-4 text-sm mb-1 sm:mb-0 md:text-text-xs xl:text-lg text-white  font-normal leading-5 xl:leading-29 text-center 
                                                lg:text-start'
								>
									End Date
								</label>
								<input
									type='datetime-local'
									id='EndDate'
									name='EndDate'
									min={event?.Startdate || currentDate}
									onChange={e => handleChange(e)}
									value={event.EndDate}
									autocomplete='off'
									className='bg-black border md:rounded-l-none rounded-md md:border-none md:border-l-2 md:rounded-r-md border-orange focus:outline-none focus-visible:none w-full md:w-[calc(100%-120px)] xl:w-[calc(100%-195px)] h-[49px] text-gray font-normal xl:text-lg rounded-r-md text-sm px-2 xl:px-4 py-2.5 text-start placeholder:text-lg placeholder:text-gray items-center flex justify-between'
									placeholder='name@flowbite.com'
									required
								/>
							</div>
							<div className='flex flex-wrap rounded-md input_field_2'>
								<label
									htmlFor='Country'
									className='rounded-l-md w-full md:w-[120px] xl:w-[195px] sm:h-[49px] flex items-center justify-start sm:px-2 lg:px-4 text-sm mb-1 sm:mb-0 md:text-text-xs xl:text-lg text-white  font-normal leading-5 xl:leading-29 text-center 
                                            lg:text-start'
								>
									Country
								</label>
								<input
									type='text'
									id='Country'
									name='country'
									onChange={e => handleLocation(e)}
									value={event.country}
									autocomplete='off'
									className='bg-black border md:rounded-l-none rounded-md md:border-none md:border-l-2 md:rounded-r-md border-orange focus:outline-none focus-visible:none w-full md:w-[calc(100%-120px)] xl:w-[calc(100%-195px)] h-[49px] text-gray font-normal xl:text-lg rounded-r-md text-sm px-2 xl:px-4 py-2.5 text-start placeholder:text-lg placeholder:text-gray items-center flex justify-between'
									required
								/>
							</div>
							<div className='flex flex-wrap rounded-md input_field_2'>
								<label
									htmlFor='State'
									className='rounded-l-md w-full md:w-[120px] xl:w-[195px] sm:h-[49px] flex items-center justify-start sm:px-2 lg:px-4 text-sm mb-1 sm:mb-0 md:text-text-xs xl:text-lg text-white  font-normal leading-5 xl:leading-29 text-center 
                                            lg:text-start'
								>
									State
								</label>
								<input
									type='text'
									id='State'
									name='state'
									onChange={e => handleLocation(e)}
									value={event.state}
									autocomplete='off'
									className='bg-black border md:rounded-l-none rounded-md md:border-none md:border-l-2 md:rounded-r-md border-orange focus:outline-none focus-visible:none w-full md:w-[calc(100%-120px)] xl:w-[calc(100%-195px)] h-[49px] text-gray font-normal xl:text-lg rounded-r-md text-sm px-2 xl:px-4 py-2.5 text-start placeholder:text-lg placeholder:text-gray items-center flex justify-between'
									required
								/>
							</div>
							<div className='flex flex-wrap rounded-md input_field_2'>
								<label
									htmlFor='City'
									className='rounded-l-md w-full md:w-[120px] xl:w-[195px] sm:h-[49px] flex items-center justify-start sm:px-2 lg:px-4 text-sm mb-1 sm:mb-0 md:text-text-xs xl:text-lg text-white  font-normal leading-5 xl:leading-29 text-center 
                                            lg:text-start'
								>
									City
								</label>
								<input
									type='text'
									id='City'
									name='city'
									onChange={e => handleLocation(e)}
									value={event.city}
									autocomplete='off'
									className='bg-black border md:rounded-l-none rounded-md md:border-none md:border-l-2 md:rounded-r-md border-orange focus:outline-none focus-visible:none w-full md:w-[calc(100%-120px)] xl:w-[calc(100%-195px)] h-[49px] text-gray font-normal xl:text-lg rounded-r-md text-sm px-2 xl:px-4 py-2.5 text-start placeholder:text-lg placeholder:text-gray items-center flex justify-between'
									required
								/>
							</div>
							<div className='flex flex-wrap rounded-md input_field_2'>
								<label
									htmlFor='Address'
									className='rounded-l-md w-full md:w-[120px] xl:w-[195px] sm:h-[49px] flex items-center justify-start sm:px-2 lg:px-4 text-sm mb-1 sm:mb-0 md:text-text-xs xl:text-lg text-white  font-normal leading-5 xl:leading-29 text-center 
                                            lg:text-start'
								>
									Address
								</label>
								<input
									type='text'
									id='Address'
									name='address'
									onChange={e => handleLocation(e)}
									value={event.address}
									autocomplete='off'
									className='bg-black border md:rounded-l-none rounded-md md:border-none md:border-l-2 md:rounded-r-md border-orange focus:outline-none focus-visible:none w-full md:w-[calc(100%-120px)] xl:w-[calc(100%-195px)] h-[49px] text-gray font-normal xl:text-lg rounded-r-md text-sm px-2 xl:px-4 py-2.5 text-start placeholder:text-lg placeholder:text-gray items-center flex justify-between'
									required
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
										name='Description'
										onChange={e => handleChange(e)}
										value={event.Description}
										style={{ whiteSpace: 'pre-line' }}
										className='bg-black focus:outline-none focus-visible:none w-full border-gradient3 text-gray font-normal xl:text-lg rounded-md text-sm px-2 xl:px-4 py-2.5 text-center md:text-start items-center flex justify-between'
										required
									></textarea>
								</div>
							</div>
							<div className='grid sm:grid-cols-2 gap-4 items-start'>
								<label className='flex w-full bg-gray-900 py-[10px] px-4 text-lg items-center cursor-pointer rounded-md'>
									<span className='w-6 block mr-2'>
										<img src='/images/gallery-icon.png' alt='gallery-icon' />
									</span>
									Upload Cover Image
									<input
										id='single_image'
										type='file'
										className='hidden'
										accept='.jpg, .jpeg, .png'
										onChange={e => handleCoverImage(e)}
									/>
								</label>
								<div className='relative w-full'>
									<div className='preview_img relative z-[1] bg-white/50 rounded-md'>
										{image && (
											<>
												<img
													className='w-full object-contain max-h-[100px]'
													src={image}
												/>
												<span
													className='preview_close absolute top-0 transform translate-x-[40%] -translate-y-[50%] right-0 object-contain text-xl z-[1] w-5 h-5 rounded-full bg-orange 
                    text-black'
													onClick={e => setImage('')}
												>
													<IoCloseCircleSharp />
												</span>
											</>
										)}
									</div>
								</div>

								<label className='flex w-full bg-gray-900 py-[10px] px-4 text-lg items-center cursor-pointer rounded-md'>
									<span className='w-6 block mr-2'>
										<img src='/images/gallery-icon.png' alt='gallery-icon' />
									</span>
									Upload Event Images
									<input
										type='file'
										multiple
										className='hidden'
										accept='.jpg, .jpeg, .png'
										onChange={e => handleImageChange(e)}
									/>
								</label>
								<div className='grid grid-cols-2 gap-2'>
									{eventimages.map((el, i) => (
										<>
											<div
												key={i}
												className='preview_img relative z-[1] bg-white/50 rounded-md'
											>
												{eventimages && (
													<>
														<img
															className='w-full object-contain max-h-[100px]'
															src={el}
														/>
														<span
															className='preview_close absolute top-0 transform translate-x-[40%] -translate-y-[50%] right-0 object-contain text-xl z-[1] w-5 h-5 rounded-full bg-orange text-black'
															onClick={() => handleEventimages(i)}
														>
															<IoCloseCircleSharp />
														</span>
													</>
												)}
											</div>
										</>
									))}
								</div>
								<label className='flex w-full bg-gray-900 py-[10px] px-4 text-lg items-center cursor-pointer rounded-md'>
									<span className='w-6 block mr-2'>
										<img
											src='/images/video-upload-icon.png'
											alt='gallery-icon'
										/>
									</span>
									Upload Event Videos
									<input
										type='file'
										multiple
										className='hidden'
										accept='video/*'
										onChange={e => handleVideoChange(e)}
									/>
								</label>
								<div>
									{video.map((el, i) => (
										<div
											key={i}
											className='preview_img relative z-[1] bg-white/50 rounded-md'
										>
											{video && (
												<>
													<video
														src={el}
														width='750'
														height='500'
														controls
													></video>
													<span
														className='preview_close absolute top-0 transform translate-x-[40%] -translate-y-[50%] right-0 object-contain text-xl z-[1] w-5 h-5 rounded-full bg-orange text-black'
														onClick={() => handlevideo(i)}
													>
														<IoCloseCircleSharp />
													</span>
												</>
											)}
										</div>
									))}
								</div>
							</div>
							<p className='text-lg'>TYPE *</p>
							<div className='radio_btn_wrapper'>
								<div className='radio_field'>
									<input
										type='radio'
										id='private_place'
										className='hidden'
										name='event_type'
										value='Private Event'
										onChange={handleChange}
										checked={event.event_type === 'Private Event'}
									/>
									<label htmlFor='private_place'>
										<span className='radio_circle'></span>
										<span className='radio_text'>Private Event</span>
									</label>
								</div>
								<div className='radio_field'>
									<input
										type='radio'
										id='public_place'
										className='hidden'
										name='event_type'
										value='Public Event'
										onChange={handleChange}
										checked={event.event_type === 'Public Event'}
									/>
									<label htmlFor='public_place'>
										<span className='radio_circle'></span>
										<span className='radio_text'>Public Event</span>
									</label>
								</div>
								<div className='radio_field'>
									<input
										type='radio'
										id='virtual_date'
										className='hidden'
										name='event_type'
										value='Virtual Event'
										onChange={handleChange}
										checked={event.event_type === 'Virtual Event'}
									/>
									<label htmlFor='virtual_date'>
										<span className='radio_circle'></span>
										<span className='radio_text'>Virtual Event</span>
									</label>
								</div>
							</div>

							{/* <p>{formErrors.introduction}</p> */}
							<Multiselect
								className='ctm_multi_select'
								options={options} // Options to display in the dropdown
								selectedValues={selectedOption} // Preselected value to persist in dropdown
								onSelect={handleSelect} // Function will trigger on select event
								onRemove={handleSelect} // Function will trigger on remove event
								// displayValue="label" // Property name to display in the dropdown options
								isObject={false}
							/>
							<button
								className='gradient !py-3 w-full !text-lg xl:!text-25px capitalize !font-bold flex justify-center items-center text-white rounded-xl primary_btn'
								onClick={handleUpdateEvent}
							>
								Submit
							</button>
						</form>
					</div>
				</div>
				<div className='md:w-2/5 xl:w-full 2xl:w-2/5'>
					<img
						src='/images/create-event-page.png'
						alt='create-event'
						className='block h-auto w-full rounded-b-40px md:rounded-b-none md:rounded-br-40px md:rounded-r-40px xl:rounded-b-40px xl:rounded-tr-none 2xl:rounded-l-none 2xl:rounded-r-40px object-cover aspect-video md:aspect-auto xl:aspect-video 2xl:md:aspect-auto'
					/>
				</div>
			</div>
		</div>
	);
};

export default EditEventPage;
