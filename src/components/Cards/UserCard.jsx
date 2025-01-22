import React from 'react';
import './css/userCard.css';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import toast from 'react-hot-toast'

const calculateAge = dob => {
	const today = new Date();
	const birthDate = new Date(dob);
	let age = today.getFullYear() - birthDate.getFullYear();
	const monthDifference = today.getMonth() - birthDate.getMonth();
	if (
		monthDifference < 0 ||
		(monthDifference === 0 && today.getDate() < birthDate.getDate())
	) {
		age--;
	}
	return isNaN(age) ? 'Unspecified' : age;
};

const UserAge = ({ userInfo }) => {
	const { DOB, profile_type, gender, couple } = userInfo;

	let ageDisplay;

	if (DOB && DOB !== '') {
		const age = calculateAge(DOB);
		ageDisplay = `${isNaN(age) ? 'unspecified' : age}`;
	} else if (
		profile_type === 'couple' &&
		couple?.person1?.DOB &&
		couple?.person2?.DOB
	) {
		const age1 = calculateAge(couple.person1.DOB);
		const age2 = calculateAge(couple.person2.DOB);
		ageDisplay = `${isNaN(age1) ? 'unspecified' : age1}/${
			isNaN(age2) ? 'Unspecified' : age2
		}`;
	} else {
		ageDisplay = 23;
	}

	const getAgeStyle = (gender, isCouple, couple) => {
		if (isCouple) {
			const styles = [];

			if (couple.person1.gender === 'male') {
				styles.push({ color: '#3a97fe' });
			} else if (couple.person1.gender === 'female') {
				styles.push({ color: '#ff00ff' });
			} else {
				styles.push({
					background: 'linear-gradient(#3a97fe, #ff00ff) text',
					WebkitBackgroundClip: 'text',
					WebkitTextFillColor: 'transparent',
				});
			}

			if (couple.person2.gender === 'male') {
				styles.push({ color: '#3a97fe' });
			} else if (couple.person2.gender === 'female') {
				styles.push({ color: '#ff00ff' });
			} else {
				styles.push({
					background: 'linear-gradient(#3a97fe, #ff00ff) text',
					WebkitBackgroundClip: 'text',
					WebkitTextFillColor: 'transparent',
				});
			}

			return styles;
		} else {
			if (gender === 'male') {
				return { color: '#3a97fe' };
			} else if (gender === 'female') {
				return { color: '#ff00ff' };
			} else {
				return {
					background: 'linear-gradient(#3a97fe, #ff00ff) text',
					WebkitBackgroundClip: 'text',
					WebkitTextFillColor: 'transparent',
				};
			}
		}
	};

	const ageStyle =
		profile_type === 'couple'
			? getAgeStyle(null, true, couple)
			: getAgeStyle(gender, false);

	return (
		<div style={{ display: 'flex', width: '150px' }}>
			{profile_type === 'couple' ? (
				<>
					<div
						style={{
							...ageStyle[0],
							whiteSpace: 'nowrap',
							overflow: 'hidden',
							textOverflow: 'ellipsis',
							maxWidth: '70px',
							marginBottom: '10px',
						}}
					>
						{calculateAge(couple.person1.DOB)}
					</div>
					/
					<div
						style={{
							...ageStyle[1],
							whiteSpace: 'nowrap',
							overflow: 'hidden',
							textOverflow: 'ellipsis',
							maxWidth: '70px',
						}}
					>
						{calculateAge(couple.person2.DOB)}
					</div>
				</>
			) : (
				<p style={ageStyle}>{ageDisplay}</p>
			)}
		</div>
	);
};

const UserCard = ({ userInfo }) => {
	const { user } = useSelector(state => state.auth);
	const navigate = useNavigate();
	return (
		<div
			className='user_card'
			onClick={() => {
				if (user.payment.membership) {
					navigate(`/user-detail?id=${userInfo._id}`);
				} else {
					toast((t) => (
						<span>
							You want to get a membership plan?
							<div style={{ marginTop: '10px', display: 'flex', gap: '10px' }}>
								<button
									onClick={() => {
										toast.dismiss(t.id);
										navigate('/membership');
									}}
									style={{ backgroundColor: '#b64a4a', color: 'white', padding: '5px 10px', border: 'none', borderRadius: '5px' }}
								>
									Yes
								</button>
								<button
									onClick={() => toast.dismiss(t.id)}
									style={{ backgroundColor: '#4caf50', color: 'white', padding: '5px 10px', border: 'none', borderRadius: '5px' }}
								>
									No
								</button>
							</div>
						</span>
					), {
						duration: 5000,
					});
				}
			}}
		>
			<div className='user_photo'>
				{userInfo?.profile_type === 'couple' ? (
					<img
						src={
							userInfo?.image ? userInfo?.image : '/images/couple-avatar.jpg'
						}
						alt=''
						srcset=''
					/>
				) : (
					<img
						src={
							userInfo?.image
								? userInfo?.image
								: userInfo?.gender === 'male'
								? '/images/boy-avatar.jpg'
								: userInfo?.gender === 'female'
								? '/images/girl-avatar.jpg'
								: '/images/trans avatar.png'
						}
						className='hidden aspect-square object-cover xl:block'
						alt=''
						srcset=''
					/>
				)}
			</div>
			<div className='user_details'>
				<p>{userInfo.username}</p>
				<UserAge userInfo={userInfo} />
				{userInfo?.profile_type === 'couple' ? (
					(() => {
						if (
							userInfo?.couple?.person1?.gender === 'male' &&
							userInfo?.couple?.person2?.gender === 'male'
						) {
							return <img src='/images/men_men.png' alt='Male/Male Couple' />;
						} else if (
							userInfo?.couple?.person1?.gender === 'female' &&
							userInfo?.couple?.person2?.gender === 'female'
						) {
							return (
								<img src='/images/girl_girl.png' alt='Female/Female Couple' />
							);
						} else if (
							userInfo?.couple?.person1?.gender === 'male' &&
							userInfo?.couple?.person2?.gender === 'female'
						) {
							return (
								<img src='/images/men_girl.png' alt='Female/Female Couple' />
							);
						} else if (
							userInfo?.couple?.person1?.gender === 'female' &&
							userInfo?.couple?.person2?.gender === 'male'
						) {
							return (
								<img src='/images/girl_men.png' alt='Female/Female Couple' />
							);
						} else {
							return (
								<img src='/images/girl_men.png' alt='Female/Female Couple' />
							);
						}
					})()
				) : (
					<img
						src={
							userInfo?.gender === 'male'
								? '/images/Male.png'
								: userInfo?.gender === 'female'
								? '/images/Female.png'
								: '/images/Trans.png'
						}
						alt=''
					/>
				)}
				{userInfo.distance ? <p>{userInfo.distance} miles</p> : <p></p>}

				{/* <p style={{ fontSize: '14px' }}>
					In publishing and graphic design, Lorem ipsum is a placeholder text
					commonly used to demonstrate the visual form of a document or a
					typeface without relying on meaningful content. Lorem ipsum may be
					used as a placeholder before final copy is available.
				</p> */}
			</div>
		</div>
	);
};

export default UserCard;
