import React from 'react';
import './css/userCard.css';
import { useNavigate } from 'react-router-dom';

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
				styles.push({ color: '#3a97fe' })
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
              marginBottom: '10px'
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
	const navigate = useNavigate();
	return (
		<div
			className='user_card'
			style={{ marginRight: '20px' }}
			onClick={() => {
				navigate(`/user-detail?id=${userInfo._id}`);
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
					<img src='images/malefemale.png' alt='' srcset='' />
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
						srcset=''
					/>
				)}
				<p style={{ fontSize: '14px' }}>
					In publishing and graphic design, Lorem ipsum is a placeholder text
					commonly used to demonstrate the visual form of a document or a
					typeface without relying on meaningful content. Lorem ipsum may be
					used as a placeholder before final copy is available.
				</p>
			</div>
		</div>
	);
};

export default UserCard;
