import React, { useEffect } from 'react';
import loadVouched from '../utils/vouched';
import { useSelector } from 'react-redux';

const Verification = () => {
	const { user } = useSelector(state => state.auth);
	useEffect(() => {
		console.log(user);
	}, [user]);

	useEffect(() => {
		if (user) {
			loadVouched(user);
		}
	}, [user]);

	return <div id='vouched-element' style={{ height: '100%' }}></div>;
};

export default Verification;
