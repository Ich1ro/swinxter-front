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
					<h2>Why my membership fee is doubled?</h2>
						<div>
						Verify Your Identity – Get one extra month of membership for FREE and Secure Your Membership at regular price
						</div>
						<div>
						To keep our community safe and authentic, we require a one-time identity verification. This simple process helps prevent fraud and ensures a trusted environment for all members.
						</div>
						<div>
							🔒 <b>Verification Fee:</b> single member: $7 couples: $9 ($4.50 per
							each)
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
							This verification is handled by an <b>accredited third-party
							provider</b>, and we <b>never</b> store or share your personal data. Our only
							goal is to create a safe and enjoyable experience for everyone.
						</div>
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
