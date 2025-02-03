import React, { useContext, useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { IoCloseCircleSharp } from 'react-icons/io5';
import api from '../../utils/api';
import { useSelector } from 'react-redux';
import Loading from '../M_used/Loading';
import { BackBtn } from '../M_used/BackBtn';
import getCoordinatesFromAWS from '../../utils/client-location'
const CreateClubPage = () => {
	const [club, setClub] = useState({
		business_name: '',
    city: '',
    state:'',
    country: '',
    address: '',
		introduction: '',
		Description: '',
		website: '',
		email: '',
		contact: '',
		business_type: '',

	});
	const [clubimages, setclubimages] = useState([]);
	const [clubvideo, setclubvideo] = useState([]);
	const [loading, setLoading] = useState(false);
	const [SelectedImage, setSelectedImage] = useState([]);
	const [SelectedVideo, setSelectedVideo] = useState([]);
	const [coverImage, setCoverImage] = useState(null);
	const [formErrors, setformErrors] = useState({});
	const navigate = useNavigate();
	const [areaname, setAreaName] = useState([]);
	const [selectlocation, setSelectedLocation] = useState([]);
	const { user } = useSelector(state => state.auth);
	const [userInfo, setUserInfo] = useState(user);
	useEffect(() => {
		setUserInfo(user);
	}, []);
	const debouncedSearch = useRef(null);
	const [showResults, setShowResults] = useState(false);
	const DEBOUNCE_DELAY = 300;

	const handleLocation = e => {
		const value = e.target.value;
		setClub({ ...club, ['Location']: value });
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
		setClub({ ...club, ['Location']: result });
		setShowResults(false);
	};

	const validate = value => {
		let errors = {};
		const regex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
		if (!value.email) {
			errors.email = 'email is required';
		} else if (!regex.test(value.email)) {
			errors.email = 'Please enter the valid email';
		}
		return errors;
	};
	useEffect(() => {
		if (club.email) {
			setformErrors(validate(club));
		}
	}, [club]);

	const handleChange = e => {

		const { name, value } = e.target;
		console.log(name);
		console.log(value);
		
		setClub({ ...club, [name]: value });
	};

	const handleCoverImage = e => {
		const file = e.target.files[0];
		if (!file) {
			return;
		} else {
			setCoverImage(file);
		}
	};

	const clearCoverImage = () => {
		setCoverImage(null);
	};

	const handleClubimages = e => {
		const file = Array.from(e.target.files);
		setSelectedImage([...SelectedImage, e.target.files[0]]);
		if (!file) {
			return;
		} else {
			setclubimages([...clubimages, URL.createObjectURL(e.target.files[0])]);
		}
	};

	const removeImage = index => {
		console.log(index);
		const update = clubimages.filter((el, i) => i !== index);
		setclubimages(update);
	};

	const handleVideoChange = e => {
		const file = Array.from(e.target.files);

		setSelectedVideo([...SelectedVideo, e.target.files[0]]);
		if (!file) {
			return;
		} else {
			setclubvideo([...clubvideo, URL.createObjectURL(e.target.files[0])]);
		}
	};

	const RemoveVideo = index => {
		const update = clubvideo.filter((el, i) => i !== index);
		setclubvideo(update);
	};

	const handleClub = async e => {
		e.preventDefault();
		const formData = new FormData();

		const coords = await getCoordinatesFromAWS(club.state, club.city);

		const location = {
			city: club.city,
			state: club.state,
			country: club.country,
			address: club.address,
		};

		const geometry = {
			type: 'Point',
			coordinates: coords,
		};

		formData.append('business_name', club.business_name);
		formData.append('business_type', club.business_type);
		formData.append('description', club.Description);
		formData.append('website', club.website);
		formData.append('email', club.email);
		formData.append('contact', club.contact);
		formData.append('mainImage', coverImage);
		formData.append('introduction', club.introduction);
		formData.append('ownerId', user._id);
		formData.append('location', JSON.stringify(location));
		formData.append('geometry', JSON.stringify(geometry));

		try {
			setLoading(true);
			const data = await api.post(`/create_club`, formData);
			if (!data) {
				setLoading(false);
				toast.error('🦄 Failed to Create Event!');
			} else {
				setLoading(false);
				toast.success('🦄Club Created Successfully!');
				setClub({
					business_name: '',
					introduction: '',
					Description: '',
					website: '',
					email: '',
					contact: '',
					business_type: '',
					state: '',
					city: '',
					country: '',
					address: ''
				});
				setSelectedImage([]);
				setSelectedVideo([]);
				navigate(`/club-page`, { state: { email: data.email } });
			}
		} catch (error) {
			toast.error('Something went wrong!');
			setLoading(false);
			console.log(error);
		}
	};

	return (
		<div className='bg-white rounded-40px'>
			<div className='text-center p-5 py-10 text-black px-10 relative'>
				<BackBtn />
				<h3 className='text-2xl sm:text-4xl mb-2'>Create your Business</h3>
				<p className='text-lg'>Let’s Create a Notorious Business</p>
			</div>
			<div className='flex flex-wrap bg-black rounded-40px '>
				<div className='w-full md:w-3/5 xl:w-full 2xl:w-3/5 '>
					<div className='sign-up__form flex flex-col justify-center gap-30 py-6 px-6 lg:py-11 lg:px-14'>
						<h2 className='text-white text-2xl sm:text-3xl xl:text-5xl text-center xl:text-start font-bold mb-6'>
							Business Details
						</h2>

						<form
							className='flex flex-col justify-center gap-y-4 sm:gap-y-6'
							autoComplete='off'
						>
							<div className='flex flex-wrap rounded-md input_field_2'>
								<label
									htmlFor='business_name'
									className='rounded-l-md w-full md:w-[120px] xl:w-[195px] sm:h-[49px] flex items-center justify-start sm:px-2 lg:px-4 text-sm mb-1 sm:mb-0 md:text-text-xs xl:text-lg text-white  font-normal leading-5 xl:leading-29 text-center 
                                          lg:text-start'
								>
									Business Name*
								</label>
								<input
									type='text'
									id='business_name'
									name='business_name'
									value={club.business_name}
									onChange={handleChange}
									autoComplete='off'
									className='bg-black border md:rounded-l-none rounded-md md:border-none md:border-l-2 md:rounded-r-md border-orange focus:outline-none focus-visible:none w-full md:w-[calc(100%-120px)] xl:w-[calc(100%-195px)] h-[49px] text-gray font-normal xl:text-lg rounded-r-md text-sm px-2 xl:px-4 py-2.5 text-start placeholder:text-lg placeholder:text-gray items-center flex justify-between'
									required
								/>
							</div>
              <div className='flex flex-wrap rounded-md input_field'>
								<label
									htmlFor='business_type'
									className='rounded-l-md w-full md:w-[120px] xl:w-[195px] md:h-[49px] flex items-center justify-start md:px-2 lg:px-4 text-sm mb-1 md:mb-0 md:text-text-xs xl:text-base text-orange md:text-white  font-normal leading-5 xl:leading-29 text-center lg:text-start'
								>
									Business Type
								</label>
								<select
									name='business_type'
									id='business_type'
									className='bg-black border rounded-md md:rounded-none md:border-none md:border-l-2 md:rounded-r-md border-orange focus:outline-none focus-visible:none w-full md:w-[calc(100%-120px)] xl:w-[calc(100%-195px)] h-[49px] text-white font-normal xl:text-lg rounded-r-md text-sm px-2 xl:px-4 py-2.5 text-start placeholder:text-lg placeholder:text-gray items-center flex justify-between'
									value={club.business_type}
									onChange={handleChange}
								>
									<option value=''>Please Select</option>
									<option value='Club'> Club</option>
									<option value='Party organizer'> Party organizer</option>
									<option value='BnB'> BnB</option>
									<option value='Photography'> Photography</option>
									<option value='Convention'> Convention</option>
									<option value='Shop'> Shop</option>
									<option value='Author'> Author</option>
									<option value='Other'> Other</option>
								</select>
							</div>

							<div className='flex flex-wrap rounded-md input_field_2'>
								<label
									htmlFor='state'
									className='rounded-l-md w-full md:w-[120px] xl:w-[195px] sm:h-[49px] flex items-center justify-start sm:px-2 lg:px-4 text-sm mb-1 sm:mb-0 md:text-text-xs xl:text-lg text-white  font-normal leading-5 xl:leading-29 text-center 
                            lg:text-start'
								>
									State/Province
								</label>
								<input
									type='text'
									id='state'
									name='state'
									onChange={handleChange}
									value={club.state}
									autocomplete='off'
									className='bg-black border md:rounded-l-none rounded-md md:border-none md:border-l-2 md:rounded-r-md border-orange focus:outline-none focus-visible:none w-full md:w-[calc(100%-120px)] xl:w-[calc(100%-195px)] h-[49px] text-gray font-normal xl:text-lg rounded-r-md text-sm px-2 xl:px-4 py-2.5 text-start placeholder:text-lg placeholder:text-gray items-center flex justify-between'
									required
								/>
							</div>
							<div className='flex flex-wrap rounded-md input_field_2'>
								<label
									htmlFor='city'
									className='rounded-l-md w-full md:w-[120px] xl:w-[195px] sm:h-[49px] flex items-center justify-start sm:px-2 lg:px-4 text-sm mb-1 sm:mb-0 md:text-text-xs xl:text-lg text-white  font-normal leading-5 xl:leading-29 text-center 
                            lg:text-start'
								>
									City
								</label>
								<input
									type='text'
									id='city'
									name='city'
									onChange={handleChange}
									value={club.city}
									autocomplete='off'
									className='bg-black border md:rounded-l-none rounded-md md:border-none md:border-l-2 md:rounded-r-md border-orange focus:outline-none focus-visible:none w-full md:w-[calc(100%-120px)] xl:w-[calc(100%-195px)] h-[49px] text-gray font-normal xl:text-lg rounded-r-md text-sm px-2 xl:px-4 py-2.5 text-start placeholder:text-lg placeholder:text-gray items-center flex justify-between'
									required
								/>
							</div>
							<div className='flex flex-wrap rounded-md input_field_2'>
								<label
									htmlFor='country'
									className='rounded-l-md w-full md:w-[120px] xl:w-[195px] sm:h-[49px] flex items-center justify-start sm:px-2 lg:px-4 text-sm mb-1 sm:mb-0 md:text-text-xs xl:text-lg text-white  font-normal leading-5 xl:leading-29 text-center 
                            lg:text-start'
								>
									Country
								</label>
								<input
									type='text'
									id='country'
									name='country'
									onChange={handleChange}
									value={club.country}
									autocomplete='off'
									className='bg-black border md:rounded-l-none rounded-md md:border-none md:border-l-2 md:rounded-r-md border-orange focus:outline-none focus-visible:none w-full md:w-[calc(100%-120px)] xl:w-[calc(100%-195px)] h-[49px] text-gray font-normal xl:text-lg rounded-r-md text-sm px-2 xl:px-4 py-2.5 text-start placeholder:text-lg placeholder:text-gray items-center flex justify-between'
									required
								/>
							</div>
							<div className='flex flex-wrap rounded-md input_field_2'>
								<label
									htmlFor='address'
									className='rounded-l-md w-full md:w-[120px] xl:w-[195px] sm:h-[49px] flex items-center justify-start sm:px-2 lg:px-4 text-sm mb-1 sm:mb-0 md:text-text-xs xl:text-lg text-white  font-normal leading-5 xl:leading-29 text-center 
                            lg:text-start'
								>
									Address
								</label>
								<input
									type='text'
									id='address'
									name='address'
									onChange={handleChange}
									value={club.address}
									autocomplete='off'
									className='bg-black border md:rounded-l-none rounded-md md:border-none md:border-l-2 md:rounded-r-md border-orange focus:outline-none focus-visible:none w-full md:w-[calc(100%-120px)] xl:w-[calc(100%-195px)] h-[49px] text-gray font-normal xl:text-lg rounded-r-md text-sm px-2 xl:px-4 py-2.5 text-start placeholder:text-lg placeholder:text-gray items-center flex justify-between'
									required
								/>
							</div>
							<div className='flex flex-wrap rounded-md input_field_2'>
								<label
									htmlFor='introduction'
									className='rounded-l-md w-full md:w-[120px] xl:w-[195px] sm:h-[49px] flex items-center justify-start sm:px-2 lg:px-4 text-sm mb-1 sm:mb-0 md:text-text-xs xl:text-lg text-white  font-normal leading-5 xl:leading-29 text-center 
                                          lg:text-start'
								>
									Introduction
								</label>
								<input
									type='text'
									id='introduction'
									name='introduction'
									value={club.introduction}
									onChange={handleChange}
									autoComplete='off'
									style={{ whiteSpace: 'pre-line' }}
									className='bg-black border md:rounded-l-none rounded-md md:border-none md:border-l-2 md:rounded-r-md border-orange focus:outline-none focus-visible:none w-full md:w-[calc(100%-120px)] xl:w-[calc(100%-195px)] h-[49px] text-gray font-normal xl:text-lg rounded-r-md text-sm px-2 xl:px-4 py-2.5 text-start placeholder:text-lg placeholder:text-gray items-center flex justify-between'
									required
								/>
							</div>
							<div className='flex flex-wrap rounded-md input_field_2'>
								<label
									htmlFor='contact'
									className='rounded-l-md w-full md:w-[120px] xl:w-[195px] sm:h-[49px] flex items-center justify-start sm:px-2 lg:px-4 text-sm mb-1 sm:mb-0 md:text-text-xs xl:text-lg text-white  font-normal leading-5 xl:leading-29 text-center 
                                          lg:text-start'
								>
									Contact
								</label>
								<input
									type='text'
									id='contact'
									onKeyPress={event => {
										if (!/[0-9]/.test(event.key)) {
											event.preventDefault();
										}
									}}
									name='contact'
									value={club.contact}
									onChange={handleChange}
									autoComplete='off'
									className='bg-black border md:rounded-l-none rounded-md md:border-none md:border-l-2 md:rounded-r-md border-orange focus:outline-none focus-visible:none w-full md:w-[calc(100%-120px)] xl:w-[calc(100%-195px)] h-[49px] text-gray font-normal xl:text-lg rounded-r-md text-sm px-2 xl:px-4 py-2.5 text-start placeholder:text-lg placeholder:text-gray items-center flex justify-between'
									placeholder='Enter contact number'
									required
								/>
							</div>
							<div>
								<div className='flex flex-wrap rounded-md input_field_2'>
									<label
										htmlFor='email'
										className='rounded-l-md w-full md:w-[120px] xl:w-[195px] sm:h-[49px] flex items-center justify-start sm:px-2 lg:px-4 text-sm mb-1 sm:mb-0 md:text-text-xs xl:text-lg text-white  font-normal leading-5 xl:leading-29 text-center 
                                          lg:text-start'
									>
										Email
									</label>
									<input
										type='text'
										id='email'
										name='email'
										value={club.email}
										onChange={handleChange}
										autoComplete='off'
										className='bg-black border md:rounded-l-none rounded-md md:border-none md:border-l-2 md:rounded-r-md border-orange focus:outline-none focus-visible:none w-full md:w-[calc(100%-120px)] xl:w-[calc(100%-195px)] h-[49px] text-gray font-normal xl:text-lg rounded-r-md text-sm px-2 xl:px-4 py-2.5 text-start placeholder:text-lg placeholder:text-gray items-center flex justify-between'
										placeholder='name@flowbite.com'
										required
									/>
								</div>
								{formErrors.email && (
									<p className='w-full capitalize text-s p-1 min-h-[24px]'>
										{formErrors.email}
									</p>
								)}
							</div>
							<div className='flex flex-wrap rounded-md input_field_2'>
								<label
									htmlFor='website'
									className='rounded-l-md w-full md:w-[120px] xl:w-[195px] sm:h-[49px] flex items-center justify-start sm:px-2 lg:px-4 text-sm mb-1 sm:mb-0 md:text-text-xs xl:text-lg text-white  font-normal leading-5 xl:leading-29 text-center 
                                          lg:text-start'
								>
									Website URL
								</label>
								<input
									type='text'
									id='website'
									name='website'
									value={club.website}
									onChange={handleChange}
									autoComplete='off'
									className='bg-black border md:rounded-l-none rounded-md md:border-none md:border-l-2 md:rounded-r-md border-orange focus:outline-none focus-visible:none w-full md:w-[calc(100%-120px)] xl:w-[calc(100%-195px)] h-[49px] text-gray font-normal xl:text-lg rounded-r-md text-sm px-2 xl:px-4 py-2.5 text-start placeholder:text-lg placeholder:text-gray items-center flex justify-between'
									placeholder='https://hot-date.vercel.app'
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
										value={club.Description}
										onChange={handleChange}
										style={{ whiteSpace: 'pre-line' }}
										className='bg-black focus:outline-none focus-visible:none w-full border-gradient3 text-gray font-normal xl:text-lg rounded-md text-sm px-2 xl:px-4 py-2.5 text-center md:text-start items-center flex justify-between'
										required
									></textarea>
								</div>
							</div>
							<div className='grid sm:grid-cols-2 gap-4 items-start'>
								<label className='flex w-full bg-gray-900 py-[10px] px-4 text-lg items-center cursor-pointer rounded-md'>
									<span className='w-6 block mr-2'>
										<img src='images/gallery-icon.png' alt='gallery-icon' />
									</span>
									Upload Cover Image
									<input
										type='file'
										className='hidden'
										accept='.jpg, .jpeg, .png'
										onChange={e => handleCoverImage(e)}
									/>
								</label>

								<div className='relative w-full'>
									{coverImage && (
										<div className='preview_img relative z-[1] bg-white/50 rounded-md'>
											<div>
												<img
													className='w-full object-contain max-h-[100px]'
													src={URL.createObjectURL(coverImage)}
												/>
												<span
													className='preview_close absolute top-0 transform translate-x-[40%] -translate-y-[50%] right-0 object-contain text-xl z-[1] w-5 h-5 rounded-full bg-orange text-black'
													onClick={clearCoverImage}
												>
													<IoCloseCircleSharp />
												</span>
											</div>
										</div>
									)}
								</div>

								{/* <label className='flex w-full bg-gray-900 py-[10px] px-4 text-lg items-center cursor-pointer rounded-md'>
									<span className='w-6 block mr-2'>
										<img src='images/gallery-icon.png' alt='gallery-icon' />
									</span>
									Upload Club Images
									<input
										type='file'
										className='hidden'
										multiple
										onChange={e => handleClubimages(e)}
									/>
								</label> */}

								{/* <div className="grid grid-cols-2 gap-2">
                {SelectedImage.map((el, i) => (
                  <div key={i} className="preview_img relative z-[1] bg-white/50 rounded-md">
                    <img className="w-full object-contain max-h-[100px]" src={el.url} />
                    {SelectedImage && (
                      <span
                        className="preview_close absolute top-0 transform translate-x-[40%] -translate-y-[50%] right-0 object-contain text-xl z-[1] w-5 h-5 rounded-full bg-orange text-black"
                        onClick={(i) => removeImage(i)}
                      >
                        <IoCloseCircleSharp />
                      </span>
                    )}
                  </div>
                ))}
              </div> */}

								{/* <div className='gap-2 preview_img_wrapper'>
									{clubimages.map((el, i) => (
										<>
											<div
												key={i}
												className='preview_img relative z-[1] bg-white/50 rounded-md'
											>
												{clubimages && (
													<>
														<img
															className='w-full object-contain max-h-[100px]'
															src={el}
														/>
														<span
															className='preview_close absolute top-0 transform translate-x-[40%] -translate-y-[50%] right-0 object-contain text-xl z-[1] w-5 h-5 rounded-full bg-orange text-black'
															onClick={() => removeImage(i)}
														>
															<IoCloseCircleSharp />
														</span>
													</>
												)}
											</div>
										</>
									))}
								</div> */}

								{/* <label className='flex w-full bg-gray-900 py-[10px] px-4 text-lg items-center cursor-pointer rounded-md'>
									<span className='w-6 block mr-2'>
										<img
											src='images/video-upload-icon.png'
											alt='gallery-icon'
										/>
									</span>
									Upload Club Videos
									<input
										type='file'
										className='hidden'
										multiple
										onChange={e => handleVideoChange(e)}
									/>
								</label> */}

								{/* <div className='preview_img_wrapper'>
									{clubvideo.map((el, i) => (
										<div
											key={i}
											className='preview_img relative z-[1] bg-white/50 rounded-md'
										>
											<video src={el} width='750' height='500' controls></video>
											{clubvideo && (
												<span
													className='preview_close absolute top-0 transform translate-x-[40%] -translate-y-[50%] right-0 object-contain text-xl z-[1] w-5 h-5 rounded-full bg-orange text-black'
													onClick={() => RemoveVideo(i)}
												>
													<IoCloseCircleSharp />
												</span>
											)}
										</div>
									))}
								</div> */}
							</div>
							{/* <div>
								<p className='text-lg'>CLUB TYPE *</p>
							</div>
							<div className='radio_btn_wrapper'>
								<div className='radio_field'>
									<input
										type='radio'
										id='private_place'
										className='hidden'
										name='club_type'
										value='Private Place'
										checked={club.club_type === 'Private Place'}
										onChange={handleChange}
									/>
									<label htmlFor='private_place'>
										<span className='radio_circle'></span>
										<span className='radio_text'>Private Place</span>
									</label>
								</div>
								<div className='radio_field'>
									<input
										type='radio'
										id='public_place'
										className='hidden'
										name='club_type'
										value='Public Place'
										checked={club.club_type === 'Public Place'}
										onChange={handleChange}
									/>
									<label htmlFor='public_place'>
										<span className='radio_circle'></span>
										<span className='radio_text'>Public Place</span>
									</label>
								</div>
								<div className='radio_field'>
									<input
										type='radio'
										id='virtual_date'
										className='hidden'
										name='club_type'
										value='Virtual Date'
										checked={club.club_type === 'Virtual Date'}
										onChange={handleChange}
									/>
									<label htmlFor='virtual_date'>
										<span className='radio_circle'></span>
										<span className='radio_text'>Virtual Date</span>
									</label>
								</div>
							</div> */}
							{/* <p>{formErrors.introduction}</p> */}
							{!loading ? (
								<button
									className='gradient !py-3 w-full !text-lg xl:!text-25px capitalize !font-bold flex justify-center items-center text-white rounded-xl primary_btn'
									onClick={handleClub}
								>
									Submit
								</button>
							) : (
								<Loading />
							)}
						</form>
					</div>
				</div>
				<div className='md:w-2/5 xl:w-full 2xl:w-2/5'>
					<img
						src='images/create-club-mod.png'
						alt='Create-club'
						className='block w-full rounded-t-40px md:p-0 p-5 rounded-b-40px md:rounded-b-none md:rounded-br-40px md:rounded-r-40px xl:rounded-b-40px xl:rounded-tl-40px 2xl:rounded-l-none 2xl:rounded-r-40px object-cover object-center aspect-square md:aspect-auto xl:aspect-square 2xl:md:aspect-auto'
					/>
				</div>
			</div>
		</div>
	);
};

export default CreateClubPage;
