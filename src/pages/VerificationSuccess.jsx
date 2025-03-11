import React, { useEffect, useState } from 'react';
import loadVouched from '../utils/vouched';
import { useDispatch, useSelector } from 'react-redux';
import { redirect, useLocation, useNavigate } from 'react-router-dom';
import { loadUser } from '../redux/actions/auth';
import './styles/verify.css';

const VerificationSuccess = () => {
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
						<h2>Verify Your Identity – Secure Your Membership</h2>
						<p>
							To keep our community safe and authentic, we require a one-time
							identity verification. This simple process helps prevent fraud and
							ensures a trusted environment for all members.
						</p>
						<div>
							🔒 <b>Verification Fee:</b> single member: $7 couples: $9 ($4.50
							per each)
						</div>
						<b>Why Verify?</b>
						<div className='popup-info'>
							<div>
								✅ Get <b>one extra month</b> of membership for free!
							</div>
							<div>
								✅ Pay the <b>standard membership fee</b>—unverified members pay
								<b>double</b>.
							</div>
							<div>
								✅ Enjoy a more <b>secure and trustworthy</b> platform.
							</div>
						</div>
						<div>
							This verification is handled by an{' '}
							<b>accredited third-party provider</b>, and we <b>never</b> store
							or share your personal data. Our only goal is to create a safe and
							enjoyable experience for everyone.
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
			<h2>Success</h2>
			<p>Congrats verification is complete</p>
			<p>You need to pay</p>
			<div className='button-wrapper' style={{ marginTop: '15px' }}>
				<button
					className='ok-button'
					onClick={() =>
						user?.profile_type === 'single'
							? (window.location.href =
									'https://collectcheckout.com/r/31dlu37dgkwoznxxt3z52tns71naxk')
							: (window.location.href =
									'https://collectcheckout.com/r/9qt9gewal2voxqumnpyioazwcq80nv')
					}
				>
					OK
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

export default VerificationSuccess;
