import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import api from '../utils/api';
import { MidLoading } from '../components/M_used/Loading';
import { Pagination } from 'rsuite';
import BannerCard from '../components/Banner/BannerCard'

const BannerPage = () => {
	const [banner, setBanner] = useState([]);
	const [loading, setLoading] = useState(false);
	const { user } = useSelector(state => state.auth);
	const navigate = useNavigate();

	const getBanner = async () => {
		setLoading(true);
		const { data } = await api.get(`/get-banners/${user?.bannerId}`);
		setLoading(false);
		setBanner([data]);
	};

	useEffect(() => {
		if (user && user?._id && user?.bannerId) {
			getBanner();
		}
	}, [user]);

	return (
		<div className='bg-black pt-0 sm:pt-8 py-8 px-6 rounded-2xl min-h-full'>
				<>
					{!loading ? (
						<>
							<div className='top-0 bg-black z-[9] py-5 flex justify-between'>
								<div className='flex justify-end items-center text-center flex-wrap gap-2 sm:gap-5 flex-1'>
									<div className='flex gap-8 items-center'>
										{user?.role === 'business' &&
											!user?.bannerId && (
												<div
													className='inline-flex gap-1 items-center cursor-pointer'
													onClick={() => navigate('/create-banner')}
												>
													<img
														src='images/add-icon.png'
														alt='add-icon'
														className='max-w-full cursor-pointer w-5'
													/>
													<span>Add a Banner</span>
												</div>
											)}
									</div>
								</div>
							</div>
							<div className='w-full'>
								{banner.map((el, i) => (
									<>
										<div className='h-full bg-light-grey rounded-2xl' key={i}>
											<BannerCard key={i} banner={el} />
										</div>
									</>
								))}
							</div>
							{banner.length === 0 && (
								<p>You don't have banners available.</p>
							)}
						</>
					) : (
						<MidLoading />
					)}
				</>
			
		</div>
	);
};

export default BannerPage;
