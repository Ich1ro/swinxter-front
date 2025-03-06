import React from 'react';
import './style/banners.css';
import { useNavigate } from 'react-router-dom';

const BannerCard = ({ banner }) => {
	const navigate = useNavigate();
	const getStatus = (isPaid, isApprove) => {
		if (!isPaid && !isApprove)
			return { text: 'Pending Approval', color: 'gray' };
		if (!isPaid && isApprove)
			return { text: 'Awaiting Payment', color: 'orange' };
		if (isPaid && !isApprove)
			return { text: 'Payment Received', color: 'blue' };
		if (isPaid && isApprove) return { text: 'Active', color: 'green' };
		return { text: 'Unknown', color: 'red' };
	};

	const status = getStatus(banner.isPaid, banner.isApprove);

	return (
		<div
			className='banner-card'
		>
			<div className='banner-card-title-wrapper'>
				<div className='banner-card-empty'></div>
				<h1 className='banner-card-title'>{banner?.title}</h1>
				{(!banner?.isPaid && banner?.isApprove) || (!banner?.isPaid && !banner?.isApprove) ? (
					<button
						className='pay_button'
						onClick={() =>
							(window.location.href =
								'https://collectcheckout.com/r/whgh2qkzi99xhzuqjo9bqqbo18avqn')
						}
					>
						Pay
					</button>
				) : (
					<div className='banner-card-empty'></div>
				)}
			</div>
			<div className='banner-card-status' style={{ color: status?.color }}>
				Status: {status?.text}
			</div>
			<div className='banner-card-status'>Page: {banner?.page}</div>
			<img className='banner-card-image' src={banner?.imgUrl} alt='logo' />
		</div>
	);
};

export default BannerCard;
