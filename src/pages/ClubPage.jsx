import { getPreciseDistance } from 'geolib';
import React, { useContext, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Context } from '../Context/context';
import api from '../utils/api';
import Pagination from '../components/Pagination/Pagination';
import ClubCard from '../components/Club/ClubCard';
import { MidLoading } from '../components/M_used/Loading';
import { useSelector } from 'react-redux';

const ClubPage = () => {
	const [clubs, setClubs] = useState([]);
	const [club, setNew] = useState([]);
	const [banners, setBanners] = useState([]);
	const [currentPage, setCurrentPage] = useState(1);
	const [filterDropdown, setFilterDropdown] = useState(false);
	const [loading, setLoading] = useState(false);
	const [recordsPerPage] = useState(8);
	const { searchquery, savedCred } = useContext(Context);
	const navigate = useNavigate();
	const { user } = useSelector(state => state.auth);

	const [filter, setFilter] = useState({
		businessTypes: [],
	});

	const handlereset = () => {
		setFilter({
			businessTypes: [],
		});
		setFilterDropdown(false);
		setClubs(club);
	};

	const getClubs = async () => {
		setLoading(true);
		const { data } = await api.get(`/search_club?q=${searchquery}`);
		const getBanners = async () => {
			const {data} = await api.get(`/get_banner_by_page/${'business'}`);
			setBanners(data)
		};
		getBanners()
		setLoading(false);
		const allclubs = data;
		const verifiedClubs = allclubs.filter(el => el.isverify === true);
		const newestPostFirst = verifiedClubs.reverse();
		setClubs(newestPostFirst);

		setNew(newestPostFirst);
	};

	useEffect(() => {
		getClubs();
	}, [searchquery]);

	const handleChange = e => {
		const { value, name } = e.target;
		setFilter(prevFilter => ({
			...prevFilter,
			[name]: value,
		}));
	};

	const Handlepublicprivate = e => {
		const { checked, name } = e.target;

		setFilter(prevFilter => ({
			...prevFilter,
			[name]: checked,
		}));
	};

	const calculateDistance = (fLong, sLong, fLat, sLat) => {
		var pdis = getPreciseDistance(
			{ latitude: Number(fLat), longitude: Number(fLong) },
			{ latitude: Number(sLat), longitude: Number(sLong) }
		);
		const factor = 0.621371;
		return ((pdis / 100) * factor).toFixed(2);
	};

	const handleBusinessTypeChange = (e, type) => {
		if (e.target.checked) {
			setFilter(prev => ({
				...prev,
				businessTypes: [...prev.businessTypes, type],
			}));
		} else {
			setFilter(prev => ({
				...prev,
				businessTypes: prev.businessTypes.filter(t => t !== type),
			}));
		}
	};

	const handleCheck = e => {
		e.preventDefault();
		if (filter.businessTypes.length === 0) {
			setClubs(club);
		} else {
			const filtered = club.filter(el =>
				filter.businessTypes.includes(el.business_type)
			);
			setClubs(filtered);
		}

		setFilterDropdown(false);
	};

	useEffect(() => {
		console.log(filter);
	}, [filter]);

	const lastPostIndex = currentPage * recordsPerPage;
	const firstPostIndex = lastPostIndex - recordsPerPage;
	const currentPost = clubs.slice(firstPostIndex, lastPostIndex);

	return (
		<div className='bg-black pt-0 sm:pt-8 py-8 px-6 rounded-2xl min-h-full'>
			{user.payment?.membership ? (
				<>
					{!loading ? (
						<>
							<div className='sticky top-0 bg-black z-[9] py-5 flex justify-between'>
								<div className='flex justify-end items-center text-center flex-wrap gap-2 sm:gap-5 flex-1'>
									<div className='flex gap-8 items-center'>
										{user.role === 'business' && (
											<div
												className='inline-flex gap-1 items-center cursor-pointer'
												onClick={() => navigate('/create_club')}
											>
												<img
													src='images/add-icon.png'
													alt='add-icon'
													className='max-w-full cursor-pointer w-5'
												/>
												<span>Add a Business</span>
											</div>
										)}
										<div className='inline-flex gap-1 items-center relative'>
											<span
												className='inline-flex gap-1 items-center cursor-pointer'
												onClick={() => setFilterDropdown(!filterDropdown)}
											>
												<img
													src='images/filter-icon.png'
													alt='filter-icon'
													className='max-w-full cursor-pointer w-5'
												/>
												<span>Filter</span>
											</span>
											<div
												className={`filter_dropdown absolute w-[250px] right-0 bg-[#2A2D37] top-full ${
													filterDropdown ? 'Active' : ''
												}`}
											>
												<div className='flex justify-end text-red'>
													<button onClick={handlereset}>Reset</button>
												</div>
												<form>
													<div className='filter_dropbox'>
														{[
															'Club',
															'Party organizer',
															'BnB',
															'Photography',
															'Convention',
															'Shop',
															'Author',
															'Other',
														].map(type => (
															<div className='filter_item' key={type}>
																<input
																	type='checkbox'
																	id={type}
																	name={type}
																	checked={filter.businessTypes.includes(type)}
																	onChange={e =>
																		handleBusinessTypeChange(e, type)
																	}
																/>
																<label className='toggle_switch' htmlFor={type}>
																	<span className='toggle_circle'></span>
																</label>
																<span>{type}</span>
															</div>
														))}
													</div>
													<div className='mt-5'>
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
							</div>
							<div className='grid sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 2xl:grid-cols-4 gap-5'>
								{currentPost.map((el, i) => (
									<>
										<div className='h-full bg-light-grey rounded-2xl' key={i}>
											<ClubCard key={i} clubs={el} />
										</div>
										{i !== 7 && (i + 1) % 4 === 0 && (
											<div className='event_promo_ban'>
												{/* Banner image */}
												<img
													className='w-full'
													src={banners.length > 0 ? banners[0].imgUrl : `images/banner.jpg`}
													alt='Banner'
												/>
											</div>
										)}
									</>
								))}
							</div>
							{clubs.length === 0 ? (
								club.length === 0 ? (
									<p>No businesses available.</p>
								) : (
									<p>
										No businesses match your selection. Please update the filter
										criteria.
									</p>
								)
							) : (
								<Pagination
									totalPosts={clubs.length}
									postsPerPage={recordsPerPage}
									setCurrentPage={setCurrentPage}
									currentPage={currentPage}
								/>
							)}
						</>
					) : (
						<MidLoading />
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

export default ClubPage;
