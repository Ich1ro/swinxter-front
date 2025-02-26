import React, { useEffect, useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';

import { useCustomChatContext } from '../../../../Context/ChatContext';
import Footer from '../../Footer';
import DbHeader from '../Header/DbHeader';
import ModelSidebarList from './ModelSidebarList';
import Sidebar from './Sidebar';

const Main_Layout = ({ socket }) => {
	const [layout, setLayout] = useState('layout-1');
	const location = useLocation();
	const { pathname } = location;
	const { unread } = useCustomChatContext();
	useEffect(() => {
		if (
			pathname === '/create_club' ||
			pathname === '/create_event' ||
			pathname === '/event_edit' ||
			pathname === '/home' ||
			pathname === '/received_request' ||
			pathname === '/currentuser'
		) {
			setLayout('layout-1');
		} else if (
			pathname === '/event-page' ||
			pathname === '/event-detail' ||
			pathname === '/club-page' ||
			pathname === '/travel-page' ||
			pathname === '/model-page' ||
			pathname === '/agency-travel-page' ||
			pathname === '/member-models' ||
			pathname === '/event-participants'
		) {
			setLayout('layout-2');
		} else if (pathname === '/verification') {
			setLayout('layout-3');
		}
	}, [pathname]);

	useEffect(() => {
		console.log(layout);
		
	}, [])

	return (
		<>
			{layout === 'layout-3' ? (
				<>
					<Outlet />
				</>
			) : (
				<>
					<div className='main_dashboard_wrapper bg-black-20 text-white grid content-between min-h-screen'>
						<div style={{ display: 'flex', position: 'relative' }}>
							<div
								className='sidebar_wrapper w-1/5 hidden xl:block'
								style={{
									height: '100vh',
									position: 'sticky',
									top: '0',
									bottom: '0',
								}}
							>
								<div className='bg-dark-black rounded-r-2xl p-6 py-8 w-full flex justify-end sticky top-0 h-full'>
									<Sidebar unread={unread} />
								</div>
							</div>
							<div className='dashboard_body_wrap'>
								<div className='dashboard_body flex flex-wrap items-stretch min-h-screen mt-5 main-block'>
									<DbHeader socket={socket} />

									<div
										className={`${
											layout === 'layout-1'
												? 'w-full xl:w-4/5 sm:px-5'
												: 'w-full xl:w-4/5 sm:px-5'
										}`}
										style={{ width: '100%' }}
									>
										<div className='sticky top-0 h-full z-[9] outlet'>
											<Outlet />
										</div>
									</div>
									{layout === 'layout-1' && (
										<div className='w-full xl:w-1/5 hidden'>
											<div className='sticky top-0 bg-dark-black rounded-l-2xl p-6 py-8 w-full flex justify-start'>
												<ModelSidebarList />
											</div>
										</div>
									)}
								</div>
							</div>
						</div>
						<div>
							<div className='audit-dating__block my-16'>
								<div className='flex flex-col md:flex-row justify-center items-center text-center gap-6 py-71px'>
									<h2 className='text-white text-2xl sm:text-3xl xl:text-40px'>
										You Only Live Once - Be a Swinxter
									</h2>
								</div>
							</div>
							<Footer />
						</div>
					</div>
				</>
			)}
		</>
	);
};
export default Main_Layout;
