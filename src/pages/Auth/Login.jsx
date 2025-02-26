import { useGoogleLogin } from '@react-oauth/google';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import ReCAPTCHA from 'react-google-recaptcha';
import { useDispatch } from 'react-redux';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import BotMessage from '../../components/Floating_Btn/Bot';
import { loadUser } from '../../redux/actions/auth';
import { LOGIN_SUCCESS } from '../../redux/actions/types';
import api from '../../utils/api';
import './css/signup_login.css';

const Login = () => {
	const location = useLocation();
	const from = location.state?.from?.pathname || '/home';
	const [loading, setLoading] = useState(false);
	const [login, setLogin] = useState({ identifier: '', password: '' });
	const [loginErrors, setLoginErrors] = useState({});
	const [rememberMe, setRememberMe] = useState(false);
	const [captcha, setCaptcha] = useState();
	const Captcha_Key = process.env.REACT_APP_CAPTCHA_KEY;
	const BASE_URL = process.env.REACT_APP_BASE_URL;
	const [showPopup, setShowPopup] = useState(false);
	const [popupMessage, setPopupMessage] = useState('');
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const [userData, setUserData] = useState(null);
	let ans;

	const handleChange = e => {
		const { name, value } = e.target;
		setLogin({ ...login, [name]: value });
	};

	const onChangeCaptcha = value => {
		setCaptcha(value);
	};

	useEffect(() => {
		if (login.identifier || login.password) {
			setLoginErrors(validate(login));
		}
	}, [login]);

	const validate = value => {
		let errors = {};
		const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
		if (!value.identifier) {
			errors.identifier = 'Username or email is required';
		} else if (
			!emailRegex.test(value.identifier) &&
			value.identifier.includes('@')
		) {
			errors.identifier = 'Please enter a valid email';
		}
		if (!value.password) {
			errors.password = 'Password is required';
		}
		return errors;
	};

	// const handleLogin = async e => {
	// 	e.preventDefault();
	// 	if (Object.keys(loginErrors).length === 0) {
	// 		try {
	// 			setLoading(true);
	// 			let ans;
	// 			if (
	// 				login.identifier === 'test@gmail.com' ||
	// 				login.identifier === 'swinxter@gmail.com'
	// 			) {
	// 				const { data } = await api.post(`/login4`, login, {
	// 					withCredentials: true,
	// 				});
	// 				ans = data;
	// 			} else {
	// 				const { data } = await api.post(`/login`, login, {
	// 					withCredentials: true,
	// 				});
	// 				ans = data;
	// 			}

	// 			if (!ans.data) {
	// 				setLoading(false);
	// 				toast.error('🦄 Login Failed!', {
	// 					position: 'top-right',
	// 					autoClose: 2000,
	// 					hideProgressBar: false,
	// 					closeOnClick: true,
	// 					pauseOnHover: true,
	// 					draggable: true,
	// 					progress: undefined,
	// 					theme: 'colored',
	// 				});
	// 			} else {
	// 				setLoading(false);
	// 				dispatch({
	// 					type: LOGIN_SUCCESS,
	// 					payload: ans,
	// 				});
	// 				dispatch(loadUser());

	// 				setLogin({ identifier: '', password: '' });
	// 				setRememberMe(false);
	// 				toast.success('🦄 Login Successful', {
	// 					position: 'top-right',
	// 					autoClose: 2000,
	// 					hideProgressBar: false,
	// 					closeOnClick: true,
	// 					pauseOnHover: true,
	// 					draggable: true,
	// 					progress: undefined,
	// 					theme: 'colored',
	// 				});
	// 				navigate(from, { replace: true });
	// 			}
	// 		} catch (error) {
	// 			setLoading(false);
	// 			toast.error(error?.response?.data, {
	// 				position: 'top-right',
	// 				autoClose: 2000,
	// 				hideProgressBar: false,
	// 				closeOnClick: true,
	// 				pauseOnHover: true,
	// 				draggable: true,
	// 				progress: undefined,
	// 				theme: 'colored',
	// 			});
	// 		}
	// 	} else {
	// 		toast.error('🦄 Please fill all the fields correctly!', {
	// 			position: 'top-right',
	// 			autoClose: 2000,
	// 			hideProgressBar: false,
	// 			closeOnClick: true,
	// 			pauseOnHover: true,
	// 			draggable: true,
	// 			progress: undefined,
	// 			theme: 'colored',
	// 		});
	// 	}
	// };

	const handleCancel = () => {
		dispatch({
			type: LOGIN_SUCCESS,
			payload: userData,
		});
		dispatch(loadUser());
		setLogin({ identifier: '', password: '' });
		setRememberMe(false);
		navigate(`${from}?isVerify=false`, { replace: true });
	};

	const handleLogin = async e => {
		e.preventDefault();

		if (Object.keys(loginErrors).length === 0) {
			if (!captcha) {
				toast.error('Fill the captcha');
				return;
			}

			toast.promise(
				(async () => {
					setLoading(true);

					if (
						login.identifier === 'test@gmail.com' ||
						login.identifier === 'swinxter@gmail.com'
					) {
						const { data } = await api.post(`/login4`, login, {
							withCredentials: true,
						});
						setUserData(data);
						ans = data;
					} else {
						const { data } = await api.post(`/login`, login, {
							withCredentials: true,
						});
						setUserData(data);
						ans = data;
					}

					console.log('ans.data', ans.data);

					if (!ans.data) {
						setLoading(false);
						throw new Error('🦄 Login Failed!');
					} else {
						setLoading(false);
						// dispatch({
						// 	type: LOGIN_SUCCESS,
						// 	payload: ans.data,
						// });

						console.log(
							'ans?.data?.isAccountVerify',
							ans?.data?.isAccountVerify
						);

						if (
							ans?.data?.isAccountVerify === undefined ||
							ans?.data?.isAccountVerify === false
						) {
							setShowPopup(true);
						} else {
							dispatch({
								type: LOGIN_SUCCESS,
								payload: ans.data,
							});
							dispatch(loadUser());
							navigate(`${from}`, { replace: true });
						}
						// dispatch(loadUser());

						// setLogin({ identifier: '', password: '' });
						// setRememberMe(false);

						// navigate(`${from}?isVerify=false`, { replace: true });
					}
				})(),
				{
					loading: 'Logging in...',
					success: '🦄 Login Successful',
					error: err => {
						setLoading(false);
						return err.response.data || '🦄 Login Failed!';
					},
				}
			);
		} else {
			toast.error('🦄 Please fill all the fields correctly!');
		}
	};

	//   onSuccess: (credentialResponse) => {
	//     setCookie("token", credentialResponse.credential, {
	//       path: "/",
	//       secure: true, // Make sure to set secure for SameSite=None
	//       sameSite: "none", // SameSite attribute set to None for cross-site requests
	//     });
	//     navigate("/");
	//   },
	//   onError: () => {
	//     toast.error("🦄 Login Failed!", {
	//       position: "top-right",

	//       autoClose: 2000,
	//       hideProgressBar: false,
	//       closeOnClick: true,
	//       pauseOnHover: true,
	//       draggable: true,
	//       progress: undefined,
	//       theme: "colored",
	//     });
	//   },
	// });

	// const googleLogin = useGoogleLogin({
	// 	onSuccess: async tokenResponse => {
	// 		const userInfo = await axios.get(
	// 			'https://www.googleapis.com/oauth2/v3/userinfo',
	// 			{ headers: { Authorization: `Bearer ${tokenResponse.access_token} ` } }
	// 		);

	// 		const { data } = await axios.post(`${BASE_URL}/api/register`, {
	// 			email: userInfo?.data.email,
	// 			username: userInfo?.data.name,
	// 			logintype: 'google',
	// 		});

	// 		if (!data) {
	// 			toast.error('failed to create user');
	// 		} else {
	// 			navigate('/');

	// 			toast.success('🦄 Login Successful!', {
	// 				position: 'top-right',
	// 				autoClose: 2000,
	// 				hideProgressBar: false,
	// 				closeOnClick: true,
	// 				pauseOnHover: true,
	// 				draggable: true,
	// 				progress: undefined,
	// 				theme: 'colored',
	// 			});
	// 		}
	// 	},
	// 	onError: errorResponse => console.log(errorResponse),
	// });
	return (
		<>
			{showPopup && (
				<div className='popup-overlay'>
					<div className='popup-content'>
						<h2>Verify Your Identity</h2>
						<p>
							To continue using our platform, we need to confirm that you are a
							real person. This is a one-time verification process to enhance
							security and prevent fraudulent activity.
						</p>
						<p>Verification Fee: $9</p>
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
										state: userData?.data?._id,
									})
								}
								className='ok-button'
							>
								OK
							</button>
							<button onClick={handleCancel} className='cancel-button'>
								Cancel
							</button>
						</div>
					</div>
				</div>
			)}
			<div className='sign_up__block pt-65px' style={{ marginTop: '225px' }}>
				<div className='container mx-auto relative z-1'>
					<div className='sign-up__body grid grid-cols-1 md:grid-cols-2 rounded-3xl md:rounded-t-58 md:rounded-r-58 bg-black mt-[-50px] md:rounded-58 relative border-b-2 border-t-[1px] border-orange'>
						<div className='sign-up__form flex flex-col justify-center gap-30 py-6 px-6 lg:py-11 lg:px-14'>
							<h2 className='text-white text-2xl sm:text-3xl xl:text-5xl text-start font-bold mb-6'>
								Nice to see you again
							</h2>
							<form
								className='flex flex-col justify-center gap-y-4 sm:gap-y-6'
								autoComplete='off'
							>
								<div>
									<div className='flex flex-wrap rounded-md input_field'>
										<label
											htmlFor='identifier'
											className='input-title rounded-l-md sm:w-[150px] xl:w-[195px] mb-1 sm:mb-0 sm:h-[49px] flex items-center justify-center lg:justify-start ps-0 lg:ps-4 text-sm xl:text-lg text-white font-normal leading-5 xl:leading-29 text-center lg:text-start'
										>
											Username/Email
										</label>
										<input
											name='identifier'
											value={login.identifier}
											onChange={e => handleChange(e)}
											type='text'
											id='identifier'
											autoComplete='off'
											className='bg-black border rounded-md sm:border-none sm:border-l-2 border-orange focus:outline-none focus-visible:none w-full sm:w-[calc(100%-150px)] xl:w-[calc(100%-195px)] h-[49px] border-gradient3 text-gray font-normal xl:text-lg sm:rounded-none sm:rounded-r-md text-sm px-2 xl:px-4 py-2.5 text-start placeholder:text-lg placeholder:text-gray items-center flex justify-between'
											placeholder='Username or Email'
											required
										/>
									</div>
									{loginErrors.identifier && (
										<p className='w-full capitalize text-s p-1'>
											{loginErrors.identifier}
										</p>
									)}
								</div>
								<div className='flex flex-wrap rounded-md input_field'>
									<label
										htmlFor='password'
										className='rounded-l-md sm:w-[150px] xl:w-[195px] mb-1 sm:mb-0 sm:h-[49px] flex items-center justify-center lg:justify-start ps-0 lg:ps-4 text-sm xl:text-lg text-white font-normal leading-5 xl:leading-29 text-center lg:text-start'
									>
										Password
									</label>
									<input
										name='password'
										value={login.password}
										onChange={e => handleChange(e)}
										type='password'
										id='password'
										autoComplete='off'
										className='bg-black border rounded-md sm:border-none sm:border-l-2 border-orange focus:outline-none focus-visible:none w-full sm:w-[calc(100%-150px)] xl:w-[calc(100%-195px)] h-[49px] border-gradient3 text-gray font-normal xl:text-lg sm:rounded-none sm:rounded-r-md text-sm px-2 xl:px-4 py-2.5 text-start placeholder:text-lg placeholder:text-gray items-center flex justify-between'
										placeholder='Password'
										required
									/>
								</div>
								{loginErrors.password && (
									<p className='w-full capitalize text-s p-1'>
										{loginErrors.password}
									</p>
								)}

								<div className='flex flex-wrap gap-y-5 items-center justify-between'>
									<div className='flex items-center'>
										<div className='flex items-center h-5'>
											<input
												id='remember'
												type='checkbox'
												onChange={() => setRememberMe(!rememberMe)}
												value={rememberMe}
												className='sm:w-[29px] sm:h-[31px] border border-gray-300 rounded bg-gray-50 focus:ring-3
                                                        focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800 
                                                        dark:focus:ring-offset-gray-800'
												required
											/>
										</div>
										<label
											htmlFor='remember'
											className='ml-2 text-sm md:text-lg font-normal text-gray'
											style={{ marginBottom: '0' }}
										>
											Remember Me{' '}
										</label>
									</div>
									<p className='text-sm xl:text-lg font-normal leading-29 forgot-password-text bg-gradient-to-r from-orange to-red-500 bg-clip-text cursor-pointer'>
										<Link to='/forgot'>Forgot Password?</Link>
									</p>
								</div>
								<div className='flex items-center recaptcha_field mb-6'>
									<ReCAPTCHA sitekey={Captcha_Key} onChange={onChangeCaptcha} />
								</div>
								{!loading ? (
									<button
										className='gradient !py-3 w-full uppercase flex justify-center items-center text-white rounded-xl primary_btn'
										style={{ fontSize: '20px' }}
										onClick={e => handleLogin(e)}
									>
										Login
									</button>
								) : (
									<div
										className='inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]'
										role='status'
									>
										<span className='!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]'>
											Loading...
										</span>
									</div>
								)}
							</form>
						</div>
						<div className='sign-up__image relative rounded-b-3xl md:rounded-r-58'>
							<img
								src='images/lovely-couples.png'
								alt=''
								className='rounded-b-3xl rounded-r-none md:rounded-r-58 object-cover h-full blurred-edge'
							/>
							<div className='sign-up__image-content absolute bottom-24 left-0 px-5 md:px-20 text-start'>
								<p className='text-xl sm:text-3xl md:text-4xl xl:text-35px text-white'>
									Login to the
								</p>
								<h2 className='text-2xl sm:text-4xl md:text-4xl xl:text-5xl text-white font-bold leading-10 md:leading-45 xl:leading-65'>
									World's Best Adult Dating Site
								</h2>
							</div>
						</div>
					</div>
					<div className='audit-dating__block relative my-16'>
						<div className='flex flex-col md:flex-row justify-center items-center text-center gap-6 py-71px'>
							<h2 className='text-white text-2xl sm:text-3xl xl:text-40px'>
								You Only Live Once - Be a Swinxter
							</h2>
						</div>
					</div>
				</div>
				<BotMessage />
			</div>
		</>
	);
};

export default Login;
