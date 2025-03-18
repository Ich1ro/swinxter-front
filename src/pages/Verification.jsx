import React, { useEffect } from 'react';
import loadVouched from '../utils/vouched';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom'
import { loadUser } from '../redux/actions/auth'

const Verification = () => {
	const location = useLocation()
	const { user } = useSelector(state => state.auth);
	const dispatch = useDispatch()
	useEffect(() => {
		dispatch(loadUser())
	}, []);
	useEffect(() => {
		console.log(user);
		console.log(location);
	}, [user]);

	useEffect(() => {
		if (user && user?._id) {
			loadVouched(user, location?.state);
		}
	}, [user]);

	if(!user) {
		return null
	}

	return <div id='vouched-element' style={{ height: '100%' }}></div>;
};

export default Verification;
