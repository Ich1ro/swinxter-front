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
		const data = await api.get(`/verification-payment-success/${user?._id}`);

		console.log(data);
		
		if (data?.data?.data === 'success') {
			setIsActive(true);
		}
	};

	useEffect(() => {
		dispatch(loadUser());
	}, []);

	useEffect(() => {
		if (user && user?._id && !isActive) {
			verifyPayment();
		}
	}, [user, isActive]);

	useEffect(() => {
		if (isActive) {
			dispatch(loadUser());
		}
	}, [isActive]);

	return (
		<div className='verification-success'>
			<h2>Success</h2>
			<p>Congrats payment is complete</p>
			<button
				className='ok-button'
				disabled={!isActive}
				onClick={() =>
					navigate(`/home`, {
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
