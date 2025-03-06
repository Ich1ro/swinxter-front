import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { loadUser } from '../redux/actions/auth';
import './styles/verify.css';
import api from '../utils/api';

const VerificationPaymentSuccess = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const { user } = useSelector(state => state.auth);
	const [isActive, setIsActive] = useState(false);

	const verifyPayment = async () => {
		const data = await api.get(`/banner-payment-success/${user?.bannerId}`);

		console.log(data);
		
		if (data?.data?.data === 'success') {
			setIsActive(true);
		}
	};

	useEffect(() => {
		dispatch(loadUser());
	}, []);

	useEffect(() => {
		if (user && user?._id && user?.bannerId) {
			verifyPayment();
		}
	}, [user]);

	return (
		<div className='verification-success'>
			<h2>Success</h2>
			<p>Congrats payment is complete</p>
			<button
				className='ok-button'
				disabled={!isActive}
				onClick={() =>
					navigate(`/banners`, {
						replace: true,
					})
				}
			>
				Back to website
			</button>
		</div>
	);
};

export default VerificationPaymentSuccess;
