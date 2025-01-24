import React, { useContext, useEffect, useState } from 'react';
import { RiEqualizerLine } from 'react-icons/ri';
import { TiPlus } from 'react-icons/ti';
import { Link, useNavigate } from 'react-router-dom';
import { Context } from '../Context/context';
import Pagination from '../components/Pagination/Pagination';
import TravelCard2 from '../components/Travel/TravelCard2';
import api from '../utils/api';
import { useSelector } from 'react-redux';

const TravelPage = () => {
	const [travel, setTravel] = useState([]);
	const [travels, setNew] = useState([]);
	const [resorts, setResorts] = useState([]);
	const navigate = useNavigate();
	const [recordsPerPage] = useState(6);
	const [currentPage, setCurrentPage] = useState(1);
	const [filterDropdown, setFilterDropdown] = useState(false);
	const [loading, setLoading] = useState(false);
	const { user } = useSelector(state => state.auth);
	const [userInfo, setUserInfo] = useState(user);
	useEffect(() => {
		setUserInfo(user);
	}, []);
	const { searchquery } = useContext(Context);
	const [filter, setFilter] = useState({
		open_for: '',
		location: '',
		resort: '',
		date: '',
	});

	const handleChange = e => {
		const { value, name } = e.target;
		setFilter(prevFilter => ({
			...prevFilter,
			[name]: value,
		}));
	};

	const handleCheck = e => {
		e.preventDefault();
		let filtered = travels;
		if (filter.open_for.length > 0) {
			filtered = filtered.filter(el =>
				el.interested.some(interest => interest === filter.open_for)
			);
		}
		if (filter.resort) {
			filtered = filtered.filter(el => {
				return el.resort === filter.resort;
			});
		}

		if (filter.date) {
			filtered = filtered.filter(el => {
				const formattedDate = `${el?.startDate?.split('T')[0]}`;

				return formattedDate === filter.date;
			});
		}

		if (filter.location) {
			const filterKeywords = filter.location.split(' ');
			console.log(filterKeywords);
			filtered = filtered.filter(el => {
				return filterKeywords.some(keyword => {
					console.log(keyword);
					return el?.locationto?.display_name
						?.toLowerCase()
						?.includes(keyword.toLowerCase());
				});
			});
		}
		setTravel(filtered);
		setFilterDropdown(false);
	};

	const handleReset = () => {
		setFilter({
			open_for: '',
			location: '',
			date: '',
		});

		setTravel(travels);
		setFilterDropdown(false);
	};
	const getTravel = async () => {
		const { data } = await api.get(`/search_travel?q=${searchquery}`);

		const newPost = data.reverse();
		setTravel(newPost);
		setNew(newPost);
		setLoading(false);
	};

	useEffect(() => {
		setLoading(true);
		getTravel();
	}, [searchquery]);

	const lastPostIndex = currentPage * recordsPerPage;
	const firstPostIndex = lastPostIndex - recordsPerPage;
	const currentPost = travel?.slice(firstPostIndex, lastPostIndex);
	const isUserTravelPlan = currentPost?.some(
		el => el?.userId?._id === userInfo?._id
	);

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
		setResorts(resorst)
	}

	useEffect(() => {
		getResorts()
	}, [])


	return (
		<div className='bg-black py-8 px-6 rounded-2xl'>
			{user.payment?.membership ? (
				<>
					{!loading ? (
						<>
							<div className='flex justify-between flex-wrap gap-5 items-center mb-5'>
								<h3 className='text-2xl 2xl:text-5xl sm:text-2xl leading-none font-bold'>
									Situationship
								</h3>
								<div className='flex gap-2 flex-wrap'>
									<span
										className='inline-flex rounded-md items-center gap-1 p-2 bg-orange text-sm 2xl:text-xl sm:text-sm font-semibold cursor-pointer'
										onClick={() => navigate('/create_travel')}
									>
										<span className='flex items-center'>
											<TiPlus />
										</span>
										Situationship Plan
									</span>
									{/* <span className="inline-flex rounded-md items-center gap-1 p-2 px-6 bg-red-color text-sm 2xl:text-xl font-semibold cursor-pointer">
                <span className="flex items-center">
                  <img
                    src="images/map-icon.png"
                    alt="map-icon"
                    className="w-6 block"
                  />
                </span>{" "}
                Map
              </span> */}
									{isUserTravelPlan && (
										<Link
											to='/my-travel'
											className='gradient inline-flex rounded-md items-center gap-1 p-2 px-6 bg-orange 2xl:text-xl text-sm font-semibold cursor-pointer'
										>
											My Situationship Plans
										</Link>
									)}
									<div className='inline-flex relative rounded-md items-center gap-1 p-2 px-6 bg-orange text-sm 2xl:text-xl font-semibold cursor-pointer'>
										<span
											className='inline-flex gap-1'
											onClick={() => setFilterDropdown(!filterDropdown)}
										>
											<span className='flex items-center'>
												<RiEqualizerLine />
											</span>
											<span>Filter</span>
										</span>
										<div
											className={`filter_dropdown absolute w-[250px] right-0 bg-[#2A2D37] top-full ${
												filterDropdown ? 'Active' : ''
											}`}
										>
											<div className='flex justify-end text-red'>
												<button onClick={handleReset}>Reset</button>
											</div>
											<form>
												<div className='my-4 mb-6'>
													<label for='cars'>Open For :</label>
													<select
														name='open_for'
														id='open_for'
														value={filter.open_for}
														onChange={handleChange}
														className='w-full mt-2 py-2 px-3 border border-black bg-[#2A2D37] rounded-[5px]'
													>
														<option value=''>Please Select</option>
														<optgroup label='Single'>
															<option value='M'>Male</option>
															<option value='F'>Female</option>
															<option value='T'>Transgender</option>
														</optgroup>
														<optgroup label='Couple'>
															<option value='MM'>MaleMale</option>
															<option value='MF'>MaleFemale</option>
															<option value='FF'>FemaleFemale</option>
														</optgroup>
													</select>
												</div>
												<div className='my-4 mb-6'>
													<label for='cars'>Resort :</label>
													<select
														name='resort'
														id='resort'
														className='w-full mt-2 py-2 px-3 border border-black bg-[#2A2D37] rounded-[5px]'
														onChange={handleChange}
													>
														<option value=''>Please Select</option>
														{resorts.length > 0 && resorts.map(el => (
															<option value={el.name}>{el.name}</option>
														))}
													</select>
												</div>
												{/* <div className="distance_filter">
                        <label htmlFor="distance" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">DISTANCE</label>
                        {filter?.distance}
                        miles
                        <input type="range" className="w-full mb-6 h-[3px]" id="distance" name="distance"
                          value={filter.distance}
                          onChange={handleChange}
                          min={200} max={1050} />
                      </div> */}
												<div>
													<label htmlFor='date'>DATE</label>
													<input
														type='date'
														className='bg-transparent mt-2 border border-black py-2 px-3 w-full'
														placeholder='Date'
														id='date'
														value={filter.date}
														name='date'
														onChange={handleChange}
													/>
												</div>
												<div className='mt-5'>
													<label htmlFor='location'>LOCATION</label>
													<input
														type='text'
														id='location'
														className='outline-none rounded-[30px] mt-2 bg-white text-black border border-black py-2 px-3 w-full'
														placeholder=''
														name='location'
														value={filter.location}
														onChange={handleChange}
													/>
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
								</div>
							</div>
							<div className='grid sm:grid-cols-2 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-3 gap-5'>
								{currentPost.map((el, i) => (
									<TravelCard2 key={i} travel={el} />
								))}
							</div>
							<Pagination
								totalPosts={travel.length}
								postsPerPage={recordsPerPage}
								setCurrentPage={setCurrentPage}
								currentPage={currentPage}
							/>
						</>
					) : (
						<div className='w-full min-h-screen text-3xl flex items-center justify-center'>
							<div className='transform -translate-y-[90px]'>
								<svg
									aria-hidden='true'
									role='status'
									class='inline mr-3 w-10 h-10 text-white animate-spin'
									viewBox='0 0 100 101'
									fill='none'
									xmlns='http://www.w3.org/2000/svg'
								>
									<path
										d='M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z'
										fill='#E5E7EB'
									></path>
									<path
										d='M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z'
										fill='currentColor'
									></path>
								</svg>
								Loading...
							</div>
						</div>
					)}
				</>
			) : (
				<div
					style={{
						height: '400px',
						display: 'flex',
						justifyContent: 'center',
						alignItems: 'center',
						fontSize: '24px',
						flexDirection: 'column',
					}}
				>
					<h1 style={{ marginBottom: '30px' }}>
						You need to buy a membership to access the feature
					</h1>
					<Link to='/membership' className='primary_btn !text-sm sm:!text-xl'>
						Buy membership
					</Link>
				</div>
			)}
		</div>
	);
};

export default TravelPage;
