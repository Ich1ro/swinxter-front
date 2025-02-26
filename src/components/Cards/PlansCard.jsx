import React, { useState } from 'react';
import './css/plansCard.css';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const PlansCard = ({ title, price, priceWithoutVerification }) => {
	const [showTooltip, setShowTooltip] = useState(false);
	const [showPopup, setShowPopup] = useState(false);
	const { user } = useSelector(state => state.auth);
	const navigate = useNavigate();
	return (
		<div className='plans_card'>
			{showPopup && (
				<div className='popup-overlay'>
					<div className='popup-content'>
						<h2>Verify Your Identity</h2>
						<p>
							To continue using our platform, we need to confirm that you are a
							real person. This is a one-time verification process to enhance
							security and prevent fraudulent activity.
						</p>
						<b>Verification Fee: $9</b>
						<div className='popup-info'>
							<div>
								• After completing verification, you will receive{' '}
								<b>one extra month</b> of membership for <b>free</b>.
							</div>
							<div>
								• Our membership prices will become lower after you pass
								verification, making access to premium access even more
								affordable.
							</div>
						</div>
						<b>
							We do not store or share your personal data—our goal is simply to
							ensure a safe and trusted environment for all users.
						</b>
						<div className='button-wrapper'>
							<button
								onClick={() =>
									navigate(`/verification`, {
										replace: true,
										state: user?.data?._id,
									})
								}
								className='ok-button'
							>
								OK
							</button>
							<button
								onClick={() => setShowPopup(false)}
								className='cancel-button'
							>
								Cancel
							</button>
						</div>
					</div>
				</div>
			)}
			<h3>{title} Package</h3>
			{priceWithoutVerification && (
				<div className='price-container'>
					<h4>{priceWithoutVerification}</h4>
					<div
						className='info-icon'
						onMouseEnter={() => setShowTooltip(true)}
						onMouseLeave={() => setShowTooltip(false)}
						onClick={() => setShowPopup(true)}
					>
						!{/* {showTooltip && ( */}
						<div className='tooltip'>
							Complete verification to get a lower price!
						</div>
						{/* )} */}
					</div>
				</div>
			)}
			<h1>{price}</h1>
			<p>All services included</p>
			<Link
				to={`/checkout/${title}/${price}/${title.split(' ')[0]}`}
				target='_blank'
			>
				<button>Select Plan</button>
			</Link>
		</div>
	);
};

export default PlansCard;
