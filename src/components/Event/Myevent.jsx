import React, { useContext, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Context } from '../../Context/context';
import api from '../../utils/api';
import EventCard from './EventCard';
import Pagination from '../Pagination/Pagination';
import { useSelector } from 'react-redux';

const Myevents = () => {
	const [event, setEvent] = useState([]);
	const [currentPage, setCurrentPage] = useState(1);
	const [recordsPerPage] = useState(8);
	const { user } = useSelector(state => state.auth);
	const [userInfo, setUserInfo] = useState(user);
	useEffect(() => {
		setUserInfo(user);
	}, []);
	const { searchquery } = useContext(Context);
	const navigate = useNavigate();
	const getEvent = async () => {
		const { data } = await api.get(`/events?q=${searchquery}`);
		const allEvents = data.data;

		const verifiedEvents = allEvents.filter(
			event => event.userId === userInfo._id
		);
		const newestPostFirst = verifiedEvents.reverse();
		setEvent(newestPostFirst);
	};
	useEffect(() => {
		getEvent();
	}, [searchquery]);

	const lastPostIndex = currentPage * recordsPerPage;
	const firstPostIndex = lastPostIndex - recordsPerPage;
	const currentPost = event.slice(firstPostIndex, lastPostIndex);

	return (
		<div className='bg-black pt-0 sm:pt-8 py-8 px-6 rounded-2xl xl:rounded-r-none min-h-full'>
			{user.payment?.membership ? (
				<>
					<div className='sticky top-0 bg-black z-[9] py-5 flex justify-between'>
						<div className='flex flex-wrap gap-2 sm:gap-5 flex-1'>
							<div>
								<div className='w-full sm:w-full flex items-center'>
									<h3
										style={{
											fontSize: '24px',
											color: 'orange',
											marginRight: '10px',
											fontWeight: '600',
										}}
									>
										Create Event
									</h3>
									<img
										src='images/add-icon.png'
										alt='add-icon'
										className='max-w-full cursor-pointer'
										onClick={() => navigate('/create_event')}
									/>
								</div>
							</div>
						</div>
					</div>
					<div className='grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5'>
						{currentPost.map((el, i) => (
							<EventCard key={i} event={el} />
						))}
					</div>
					<Pagination
						totalPosts={event.length}
						postsPerPage={recordsPerPage}
						setCurrentPage={setCurrentPage}
						currentPage={currentPage}
					/>
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

export default Myevents;
