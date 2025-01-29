import React, { useEffect, useRef, useState } from 'react';
import toast from 'react-hot-toast';
import { IoCloseCircleSharp } from 'react-icons/io5';
import { useSelector } from 'react-redux';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import api from '../utils/api';
import getCoordinatesFromAWS from '../utils/client-location';
import Loading from '../components/M_used/Loading';
// import image from '/images/gallery-icon.png';

const RegisterBusiness = () => {
	const [form, setForm] = useState({
		business_name: '',
		Location: '',
		introduction: '',
		Description: '',
		website: '',
		email: '',
		contact: '',
		business_type: '',
		state: '',
		city: '',
		country: '',
		address: '',
		// club_type: '',
	});
	const [clubimages, setclubimages] = useState([]);
	const [clubvideo, setclubvideo] = useState([]);
	const [loading, setLoading] = useState(false);
	const [SelectedImage, setSelectedImage] = useState([]);
	const [SelectedVideo, setSelectedVideo] = useState([]);
	const [coverImage, setCoverImage] = useState(null);
	const [formErrors, setformErrors] = useState({});
	const navigate = useNavigate();
	const { userId, email } = useParams();
	const [areaname, setAreaName] = useState([]);
	const [selectlocation, setSelectedLocation] = useState([]);
	const { user } = useSelector(state => state.auth);
	const [userInfo, setUserInfo] = useState(user);
	const { state } = useLocation();
	useEffect(() => {
		setUserInfo(user);
	}, []);
	const debouncedSearch = useRef(null);
	const [showResults, setShowResults] = useState(false);
	const DEBOUNCE_DELAY = 300;

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

	const handleInput = e => {
		
		e.preventDefault();
		const { name, value } = e.target;
		console.log(name);
		console.log(value);
		setForm({ ...form, [name]: value });
	};

	const handleClub = async e => {
		e.preventDefault();
		const formData = new FormData();

		const coords = await getCoordinatesFromAWS(form.state, form.city);

		const location = {
			city: form.city,
			state: form.state,
			country: form.country,
			address: form.address,
		};

		const geometry = {
			type: 'Point',
			coordinates: coords,
		};

		formData.append('business_name', form.business_name);
		formData.append('business_type', form.business_type);
		formData.append('description', form.Description);
		formData.append('website', form.website);
		formData.append('email', form.email);
		formData.append('contact', form.contact);
		formData.append('mainImage', coverImage);
		formData.append('introduction', form.introduction);
		formData.append('ownerId', userId);
		formData.append('location', JSON.stringify(location));
		formData.append('geometry', JSON.stringify(geometry));

		try {
			const userEmail = state?.email;
			setLoading(true);
			const data = await api.post(`/create_club`, formData);
			if (!data) {
				setLoading(false);
				toast.error('🦄 Failed to Create Event!');
			} else {
				setLoading(false);
				toast.success('🦄Club Created Successfully!');
				setForm({
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
				navigate(`/verify_email/${userId}/${email}`, { state: { email: email }})
			}
		} catch (error) {
			toast.error('Something went wrong!');
			setLoading(false);
			console.log(error);
		}
	};

	return (
		<div className='min-h-screen bg-black-20 text-white grid content-between'>
			<div className='overflow-hidden'>
				{/* <Header /> */}
				<div className='sign_up__block pt-65px mt-40 mb-40'>
					<div className='container mx-auto relative z-1'>
						<div className='sign-up__header pt-10 pb-20 bg-white flex flex-col justify-center items-center rounded-t-3xl md:rounded-t-86'>
							<p className='text-2xl sm:text-3xl xl:text-40px text-black  font-normal'>
								Register Your Business
							</p>
							<p className='text-lg text-black  font-body_font'>
								Get Started it’s easy
							</p>
						</div>
						<div className='sign-up__body px-5 lg:px-10 rounded-3xl md:rounded-t-58 md:rounded-r-58 bg-black mt-[-50px] md:rounded-58 relative  border-b-2 border-t-[1px] border-orange py-5'>
							<h1 className='text-white text-2xl sm:text-3xl xl:text-5xl text-center xl:text-start font-bold mb-4'>
								LOCATION
							</h1>

							<div className='bg-[#202020] grid grid-cols-2 px-10 pt-5'>
								<span>State *</span>
								<input
									type='text'
									className='w-80 border-2 border-orange rounded-[5px] h-[27px] text-black px-5 font-light'
									placeholder='State'
									onChange={handleInput}
									value={form.state}
									name='state'
								/>
							</div>
							<div className='bg-[#202020] grid grid-cols-2 px-10 pt-5'>
								<span>City *</span>
								<input
									type='text'
									className='w-80 border-2 border-orange rounded-[5px] h-[27px] text-black px-5 font-light'
									placeholder='City'
									onChange={handleInput}
									value={form.city}
									name='city'
								/>
							</div>
							<div className='bg-[#202020] grid grid-cols-2 px-10 py-5'>
								<span>Country *</span>
								<input
									type='text'
									className='w-80 border-2 border-orange rounded-[5px] h-[27px] text-black px-5 font-light'
									placeholder='Country'
									onChange={handleInput}
									value={form.country}
									name='country'
								/>
							</div>

							<h1 className='text-white text-2xl sm:text-3xl xl:text-5xl text-center xl:text-start font-bold mb-4 py-3'>
								Main Info
							</h1>

							<div
								className='bg-[#202020] flex align-middle justify-between px-10 py-5'
								style={{ paddingBottom: '0' }}
							>
								<span>Business Name *</span>
								<input
									type='text'
									className='w-80 border-2 border-orange rounded-[5px] h-[27px] text-black px-5 font-light'
									placeholder='Business Name'
									onChange={handleInput}
									value={form.business_name}
									name='business_name'
								/>
							</div>

							<div
								className='bg-[#202020] grid grid-cols-2 px-10 pt-5 py-5'
								style={{ paddingBottom: '0' }}
							>
								<span>Business Type *</span>
								<select
									className='bg-[#202020] text-white text-end'
									name='business_type'
									value={form.business_type}
									onChange={handleInput}
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

							<div
								className='bg-[#202020] flex align-middle justify-between px-10 py-5'
								style={{ paddingBottom: '0' }}
							>
								<span>Introduction *</span>
								<input
									type='text'
									className='w-80 border-2 border-orange rounded-[5px] h-[27px] text-black px-5 font-light'
									// placeholder='Country'
									onChange={handleInput}
									value={form.introduction}
									name='introduction'
								/>
							</div>

							<div
								className='bg-[#202020] flex align-middle justify-between px-10 py-5'
								style={{ paddingBottom: '0' }}
							>
								<span>Contact *</span>
								<input
									type='text'
									className='w-80 border-2 border-orange rounded-[5px] h-[27px] text-black px-5 font-light'
									placeholder='Enter contact number'
									onChange={handleInput}
									value={form.contact}
									name='contact'
								/>
							</div>

							<div
								className='bg-[#202020] flex align-middle justify-between px-10 py-5'
								style={{ paddingBottom: '0' }}
							>
								<span>Email *</span>
								<input
									type='email'
									className='w-80 border-2 border-orange rounded-[5px] h-[27px] text-black px-5 font-light'
									placeholder='name@flowbite.com'
									onChange={handleInput}
									value={form.email}
									name='email'
								/>
							</div>

							<div
								className='bg-[#202020] flex align-middle justify-between px-10 py-5'
								style={{ paddingBottom: '0' }}
							>
								<span>Website URL *</span>
								<input
									type='text'
									className='w-80 border-2 border-orange rounded-[5px] h-[27px] text-black px-5 font-light'
									placeholder='https://your-business.com'
									onChange={handleInput}
									value={form.website}
									name='website'
								/>
							</div>

							<div
								className='bg-[#202020] px-10 py-5 w-full'
								style={{ paddingBottom: '20px', marginBottom: '20px' }}
							>
								<div className='grid sm:grid-cols-2 gap-4 items-start'>
									<label className='flex w-full bg-gray-900 py-[10px] px-4 text-lg items-center cursor-pointer rounded-md'>
										<span className='w-6 block mr-2'>
											<img src='/images/gallery-icon.png' alt='gallery-icon' />
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
								</div>

								{/* <div className='flex flex-wrap rounded-md input_field_2'>
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
									// value={club.introduction}
									// onChange={handleChange}
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
									// value={club.contact}
									// onChange={handleChange}
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
										//   value={club.email}
										//   onChange={handleChange}
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
									// value={club.website}
									// onChange={handleChange}
									autoComplete='off'
									className='bg-black border md:rounded-l-none rounded-md md:border-none md:border-l-2 md:rounded-r-md border-orange focus:outline-none focus-visible:none w-full md:w-[calc(100%-120px)] xl:w-[calc(100%-195px)] h-[49px] text-gray font-normal xl:text-lg rounded-r-md text-sm px-2 xl:px-4 py-2.5 text-start placeholder:text-lg placeholder:text-gray items-center flex justify-between'
									placeholder='https://hot-date.vercel.app'
									required
								/>
							</div> */}

								<div
								className='bg-[#202020] flex flex-col items-center justify-center px-10 py-5'
								style={{ paddingBottom: '0' }}
							>
								<span style={{ marginBottom: '20px'}}>Description</span>
								<textarea
									type='text'
									className='w-full border-2 border-orange rounded-[5px] h-[100px] text-black px-5 font-light'
									// placeholder='Country'
									onChange={handleInput}
									value={form.Description}
									name='Description'
									style={{ marginBottom: '20px'}}
								/>
							</div>

							{/* <div className='flex flex-col gap-30'>
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
										//   value={club.Description}
										//   onChange={handleChange}
										style={{ whiteSpace: 'pre-line' }}
										className='bg-black focus:outline-none focus-visible:none w-full border-gradient3 text-gray font-normal xl:text-lg rounded-md text-sm px-2 xl:px-4 py-2.5 text-center md:text-start items-center flex justify-between'
										required
									></textarea>
								</div>
							</div> */}

								{/* <label className='flex w-full bg-gray-900 py-[10px] px-4 text-lg items-center cursor-pointer rounded-md'>
									<span className='w-6 block mr-2'>
										<img src='images/gallery-icon.png' alt='gallery-icon' />
									</span>
									Upload Club Images
									<input
										type='file'
										className='hidden'
										multiple
										  onChange={(e) => handleClubimages(e)}
									/>
								</label>

								<div className="grid grid-cols-2 gap-2">
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
										  onChange={(e)=>handleVideoChange(e)}
									/>
								</label>

								<div className='preview_img_wrapper'>
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
										//   checked={club.club_type === "Private Place"}
										//   onChange={handleChange}
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
										//   checked={club.club_type === "Public Place"}
										//   onChange={handleChange}
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
										//   checked={club.club_type === "Virtual Date"}
										//   onChange={handleChange}
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
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default RegisterBusiness;
