import React from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import BotMessage from '../Floating_Btn/Bot';
import { useLocation } from 'react-router-dom';
// import "../../pages/Auth/css/signup_login.css";
export const Layout = ({ children }) => {
	let location = useLocation();
	const { pathname } = location;

	if (pathname !== '/login') {
		return (
			<>
				<div className='min-h-screen bg-black-20 text-white grid content-between'>
					<div className='overflow-hidden'>
						<Navbar />
						{children}
					</div>
					<Footer />
				</div>
			</>
		);
	}

	return (
		<>
			<div className='min-h-screen bg-black-20 text-white grid content-between'>
				<Navbar />
				{children}
				<Footer />
			</div>
		</>
	);
};
