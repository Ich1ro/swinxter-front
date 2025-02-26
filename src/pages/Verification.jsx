import React, { useEffect } from 'react';
import loadVouched from '../utils/vouched'
import { useLocation } from 'react-router-dom'

const Verification = () => {
	const location = useLocation();
    const userId = location.state;
	useEffect(() => {
		console.log(userId);
	}, []);

	useEffect(() => {
		loadVouched(userId);
	}, []);

	return <div id='vouched-element' style={{ height: '100%' }}></div>;
};

export default Verification;
