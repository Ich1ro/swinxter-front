import React, { useEffect, useState } from 'react';
import loadVouched from '../utils/vouched';
import { useDispatch, useSelector } from 'react-redux';
import { redirect, useLocation, useNavigate } from 'react-router-dom';
import { loadUser } from '../redux/actions/auth';
import './styles/verify.css';

const VerificationError = () => {
	const location = useLocation();
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const { user } = useSelector(state => state.auth);
	const [showPopup, setShowPopup] = useState(false);

	useEffect(() => {
		dispatch(loadUser());
	}, []);

	useEffect(() => {
		if (user && user?.profile_type === 'couple') {
			if (
				!user?.couple?.person1?.isVerify ||
				!user?.couple?.person2?.isVerify
			) {
				setShowPopup(true);
			}
		}
	}, [user]);

	return (
		<div className='verification-success'>
			{showPopup && (
				<div className='popup-overlay'>
					<div className='popup-content'>
						<h2>🔴 Verification Failed</h2>
						<p>We couldn't complete your account verification.</p>
						<b>Possible reasons:</b>
						<div className='popup-info'>
							<div>Your details match previous verification attempts.</div>
							<div>
								The provided first name and last name were already used.
							</div>
						</div>
						<b>What can you do?</b>
						<div className='popup-info'>
							<div>
								✅ Double-check your details and verify the second person
							</div>
							<div>📩 If the issue persists, contact support.</div>
						</div>
						<div className='button-wrapper'>
							{!user?.couple?.person1?.isVerify && (
								<button
									onClick={() =>
										navigate(`/verification`, {
											replace: true,
											state: 'person1',
										})
									}
									disabled={user?.couple?.person1?.isVerify}
									className='ok-button'
								>
									{user?.couple?.person1?.person1_Name
										? `Verify ${user?.couple?.person1?.person1_Name}`
										: `Verify person 1`}
								</button>
							)}
							{!user?.couple?.person2?.isVerify && (
								<button
									onClick={() =>
										navigate(`/verification`, {
											replace: true,
											state: 'person2',
										})
									}
									disabled={user?.couple?.person2?.isVerify}
									className='ok-button'
								>
									{user?.couple?.person1?.person2_Name
										? `Verify ${user?.couple?.person1?.person1_Name}`
										: `Verify person 2`}
								</button>
							)}

							<button
								onClick={() =>
									navigate(`/home`, {
										replace: true,
									})
								}
								className='cancel-button'
							>
								Cancel
							</button>
						</div>
					</div>
				</div>
			)}
			<h2>🔴 Verification Failed</h2>
			<p>We couldn't complete your account verification.</p>
			<p>
				Possible reasons: Your details match previous verification attempts. The
				provided first name and last name were already used.
			</p>
			<p>What can you do?</p>
			<p>✅ Double-check your details and verify the second person</p>
			<p>📩 If the issue persists, contact support.</p>
			<div className='button-wrapper' style={{ marginTop: '15px' }}>
				<button
					className='ok-button'
					onClick={() =>
						navigate(`/verification`, {
							replace: true,
						})
					}
				>
					Retry Verification
				</button>
				<button
					className='cancel-button'
					onClick={() =>
						navigate(`/home`, {
							replace: true,
						})
					}
				>
					Later
				</button>
			</div>
		</div>
	);
};

export default VerificationError;
