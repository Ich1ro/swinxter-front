import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { calculateAge } from '../utils/CalculateAge';
import Loading from '../components/M_used/Loading';
import { useCustomChatContext } from '../Context/ChatContext';
import { StreamChat } from 'stream-chat';
import api from '../utils/api';
import { AiFillLike } from 'react-icons/ai';
import '../components/Users/user.css';

const CoupleDetailPage = ({
	userInfo,
	currentUser,
	superlike,
	handleRemove,
	handleSendRequest,
	handleCancelRequest,
	sent,
	loading,
	blockUser,
	blocked,
}) => {
	const location = useLocation();
	const [age, setAge] = useState('');
	const [age2, setage2] = useState('');
	const { user } = useSelector(state => state.auth);
	const { startDMChatRoom } = useCustomChatContext();
	const navigate = useNavigate();
	const [isProfile, setIsProfile] = useState(true);
	const [isPasswordCorrect, setIsPasswordCorrect] = useState(false);
	// const [userInfo,setUserInfo]=useState(user);
	// useEffect(()=>{
	//   setUserInfo(user)
	// },[])
	const message = async () => {
		startDMChatRoom(userInfo);
		navigate('/messaging');
	};

	const handlePasswordSubmit = e => {
		e.preventDefault();

		console.log(e.target.pass.value);
		const pass = e.target.pass.value;

		if (pass === userInfo.privatePassword) {
			setIsPasswordCorrect(true);
		}
	};

	const RenderedStyle = {
		color: `${
			userInfo?.couple?.person1?.gender === 'male'
				? '#3A97FE'
				: userInfo?.couple?.person1?.gender === 'female'
				? '#FF2A90'
				: '#f139f1'
		}`,
	};

	const RenderStyle2 = {
		color: `${
			userInfo?.couple?.person2?.gender === 'male'
				? '#3A97FE'
				: userInfo?.couple?.person2?.gender === 'female'
				? '#FF2A90'
				: '#f139f1'
		}`,
	};

	useEffect(() => {
		setAge(calculateAge(userInfo?.couple?.person1.DOB));
		setage2(calculateAge(userInfo?.couple?.person2.DOB));
	});

	return (
		<div className='bg-black-20'>
			<div className='min-h-[130px] md:min-h-[130px] flex justify-center items-end bg-black rounded-b-50px'></div>
			<div className='pt-10 container px-5 mx-auto'>
				<div className='flex flex-wrap items-stretch bg-black rounded-2xl max-w-5xl mx-auto'>
					<div className='w-full sm:w-2/5 md:w-1/5'>
						{userInfo?.image ? (
							<img
								src={userInfo?.image}
								alt='book-model'
								className='w-full h-full object-center object-cover aspect-[5/4] rounded-2xl main-image'
							/>
						) : (
							<img
								src='/images/couple-avatar.jpg'
								alt='book-model'
								className='w-full h-full object-center object-cover aspect-[5/4] rounded-2xl main-image'
							/>
						)}
					</div>
					<div className='w-full sm:w-3/5 md:w-4/5 border-b-2 sm:border-b-0 sm:border-r-2 border-orange rounded-2xl'>
						<div className='h-full p-5 grid content-between rounded-2xl max-w-3xl gap-y-10'>
							<div>
								<div className='flex flex-wrap sm:flex-nowrap justify-between sm:gap-5'>
									<h3 className='flex items-center text-lg sm:text-[22px] font-bold gap-2 font-body_font'>
										{userInfo?.username}
										<p className='flex items-center text-sm font-light gap-1'>
											<span className='block w-3 h-3 rounded-full bg-green-500 font-body_font'></span>
											Online
										</p>
									</h3>
								</div>
								<div className='text-lg flex items-center gap-2  mt-1 font-body_font'>
									{/* <span>
      
                    {userInfo?.couple?.person1?.gender === "male"
                      ? "M"
                      : userInfo?.gender === "female"
                      ? "F"
                      : userInfo?.gender === "others"
                      ? "T"
                      : ""}
                  </span>
                  |
                  <span>
      
      {userInfo?.couple?.person2?.gender === "male"
        ? "M"
        : userInfo?.gender === "female"
        ? "F"
        : userInfo?.gender === "others"
        ? "T"
        : ""}
    </span> */}
									<span style={RenderedStyle}>{age}</span>|
									<span style={RenderStyle2}>{age2}</span>
								</div>
							</div>
							{location.search.length > 0 &&
							location.search.split('=')[1] !== user?._id ? (
								<div className='flex' style={{ width: '100%' }}>
									{currentUser?.friends.includes(userInfo?._id) ? (
										<button
											className='primary_btn'
											style={{
												fontSize: '12px',
												padding: '5px 0',
												width: '180px',
												marginRight: '10px',
											}}
											onClick={handleRemove}
										>
											Remove Friend
										</button>
									) : currentUser?.sent_requests.includes(userInfo?._id) ||
									  sent ? (
										<button
											className='primary_btn'
											style={{
												fontSize: '12px',
												padding: '5px 0',
												width: '180px',
												marginRight: '10px',
											}}
											onClick={handleCancelRequest}
										>
											{loading ? <Loading /> : 'Cancel Request'}
										</button>
									) : (
										<button
											className='primary_btn'
											style={{
												fontSize: '12px',
												padding: '5px 0',
												width: '180px',
												marginRight: '10px',
											}}
											onClick={handleSendRequest}
										>
											{loading ? <Loading /> : 'Send Friend Request'}
										</button>
									)}
									{/* <div style={{display: "flex", width: "300px"}}> */}
									<button
										className='primary_btn'
										style={{
											fontSize: '12px',
											padding: '5px 0',
											width: '180px',
											marginRight: '10px',
										}}
										onClick={() => {
											message();
										}}
									>
										Message
									</button>
									{blocked ||
									currentUser?.blocked_users.includes(userInfo?._id) ? (
										<button
											className='primary_btn'
											style={{
												fontSize: '12px',
												padding: '5px 0',
												width: '180px',
												marginRight: '10px',
											}}
											onClick={() => {
												blockUser();
											}}
										>
											Unblock
										</button>
									) : (
										<button
											className='primary_btn'
											style={{
												fontSize: '12px',
												padding: '5px 0',
												width: '180px',
												marginRight: '10px',
											}}
											onClick={() => {
												blockUser();
											}}
										>
											Block
										</button>
									)}
									<button
										className='primary_btn'
										style={{
											fontSize: '12px',
											padding: '5px 0',
											width: '180px',
											marginRight: '10px',
											display: 'flex',
											alignItems: 'center',
										}}
										onClick={() => {
											superlike();
										}}
									>
										<AiFillLike
											style={{
												fontSize: '16px',
												marginRight: '5px',
												marginBottom: '1px',
											}}
										/>{' '}
										Superlike
									</button>
									{/* </div>  */}
								</div>
							) : null}
							{/* <p className="text-lg font-body_font">{userInfo?.slogan}</p>
              <p className="text-lg font-body_font">{userInfo?.introduction}</p> */}
						</div>
					</div>
				</div>
				<div className='p-5 bg-light-grey rounded-xl mt-6  max-w-5xl mx-auto'>
					<h3 className='text-2xl text-orange'>Slogan</h3>
					<p className='text-lg font-body_font my-2'>{userInfo?.slogan}</p>
					<h3 className='text-2xl text-orange mt-5'>Introduction</h3>
					<p
						className='text-lg font-body_font'
						dangerouslySetInnerHTML={{
							__html: userInfo?.introduction?.replace(/\n/g, '<br />'),
						}}
					></p>
				</div>
				<div className='max-w-5xl mx-auto pt-20'>
					<div className='px-8'>
						<button
							className='inline-block py-3 px-8 text-lg rounded-t-lg text-black min-w-[200px] text-center'
							style={
								isProfile
									? {
											backgroundColor: 'rgb(247 146 32)',
											marginRight: '5px',
									  }
									: {
											backgroundColor: 'rgb(32 32 32)',
											color: 'white',
											border: '1px solid rgb(247 146 32)',
											borderBottom: '0',
											marginRight: '5px',
									  }
							}
							onClick={() => {
								if (!isProfile) {
									setIsProfile(true);
								}
							}}
						>
							Profile
						</button>
						<button
							className='inline-block py-3 px-8 text-lg rounded-t-lg text-black min-w-[200px] text-center'
							style={
								!isProfile
									? { backgroundColor: 'rgb(247 146 32)' }
									: {
											backgroundColor: 'rgb(32 32 32)',
											color: 'white',
											border: '1px solid rgb(247 146 32)',
											borderBottom: '0',
									  }
							}
							onClick={() => {
								if (isProfile) {
									setIsProfile(false);
								}
							}}
						>
							Media
						</button>
					</div>
					<div
						className='rounded-lg py-10 px-3 lg:px-8 items-start'
						style={{ backgroundColor: 'rgb(247 146 32)' }}
					>
						{isProfile ? (
							<div className='grid gap-y-5'>
								<div className='p-5 bg-black-20 rounded-2xl w-[100%]'>
									<div className='flex justify-between gap-3 font-normal pb-3 mb-3 border-b border-orange'>
										<p className='text-base sm:text-2xl'>Profile</p>
										{location.search.length > 0 ? null : (
											<Link
												to='/editcouple-detail'
												className='cursor-pointer text-xs sm:text-lg'
											>
												Edit
											</Link>
										)}
									</div>
									<div className='text-sm sm:text-lg grid grid-cols-2 gap-3 mb-2'>
										<span className='block font-body_font text-lg'>
											Interest :
										</span>
										<span
											className={`block text-right font-body_font male_login_data`}
										></span>
									</div>
									<div className='text-sm sm:text-lg grid grid-cols-2 gap-3 border-b border-[#666] py-[5px] '>
										<span>Male</span>
										<div>
											<span className='block text-right'>
												{userInfo?.interests?.male?.map((el, i) => (
													<span key={i}>
														{i !== 0 && <span>, </span>}
														{el}
													</span>
												))}
											</span>
										</div>
									</div>
									<div className='text-sm sm:text-lg grid grid-cols-2 gap-3 border-b border-[#666] py-[5px]'>
										<span>Male Female</span>
										<div>
											<span className='block text-right'>
												{userInfo?.interests?.male_female?.map((el, i) => (
													<span key={i}>
														{i !== 0 && <span>, </span>}
														{el}
													</span>
												))}
											</span>
										</div>
									</div>
									<div className='text-sm sm:text-lg grid grid-cols-2 gap-3 border-b border-[#666] py-[5px]'>
										<span>Female </span>
										<div>
											<span className='block text-right'>
												{userInfo?.interests?.female?.map((el, i) => (
													<span key={i}>
														{' '}
														{i !== 0 && <span>, </span>}
														{el}
													</span>
												))}
											</span>
										</div>
									</div>
									<div className='text-sm sm:text-lg grid grid-cols-2 gap-3 border-b border-[#666] py-[5px]'>
										<span>Female Female </span>
										<div>
											<span className='block text-right'>
												{userInfo?.interests?.female_female?.map((el, i) => (
													<span key={i}>
														{' '}
														{i !== 0 && <span>, </span>}
														{el}
													</span>
												))}
											</span>
										</div>
									</div>
									<div className='text-sm sm:text-lg grid grid-cols-2 gap-3 '>
										<span>Male Male</span>
										<div>
											<span className='block text-right'>
												{userInfo?.interests?.male_male?.map((el, i) => (
													<span key={i}>
														{' '}
														{i !== 0 && <span>, </span>}
														{el}
													</span>
												))}
											</span>
										</div>
									</div>
								</div>
								<div className='p-5 bg-black-20 rounded-2xl'>
									<div className='grid grid-cols-3 gap-3 font-normal pb-3 mb-3 border-b border-orange'>
										<p className='text-base sm:text-2xl'>Details</p>

										{/* <p className={`text-right flex items-center justify-end text-xl`} style={RenderedStyle}>
               
									{userInfo?.gender==="male"?(<img src="images/male.png" alt="Male" className="h-[26px] mr-1" />):userInfo?.gender==="female"? (<img src="images/female.png" alt="Male" className="h-[26px] mr-1" />)
									:(<img src="images/trans.png" alt="trans" className="h-[26px] mr-1" />)}
										{userInfo?.personName}</p> */}

										<p
											className={`text-center flex items-center justify-center text-xl`}
											style={RenderedStyle}
										>
											{userInfo?.couple?.person1?.gender === 'female' ? (
												<img
													src='images/Female.png'
													alt='Female'
													className='h-[26px] mr-1'
												/>
											) : userInfo?.couple?.person1?.gender === 'male' ? (
												<img
													src='images/Male.png'
													alt='male'
													className='h-[26px] mr-1'
												/>
											) : (
												<img
													src='images/Trans.png'
													alt='trans'
													className='h-[26px] mr-1'
												/>
											)}
											{userInfo?.couple?.person1?.person1_Name}
										</p>

										<p
											className={`text-center flex items-center justify-end text-xl`}
											style={RenderStyle2}
										>
											{userInfo?.couple?.person2?.gender === 'female' ? (
												<img
													src='/images/Female.png'
													alt='Female'
													className='h-[26px] mr-1'
												/>
											) : userInfo?.couple?.person2?.gender === 'male' ? (
												<img
													src='/images/Male.png'
													alt='male'
													className='h-[26px] mr-1'
												/>
											) : (
												<img
													src='/images/Trans.png'
													alt='trans'
													className='h-[26px] mr-1'
												/>
											)}
											{userInfo?.couple?.person2?.person2_Name}
										</p>
									</div>
									<div className='grid'>
										{/* <div className="text-sm sm:text-lg grid grid-cols-3 gap-3 border-b border-[#666] py-[5px]">
                    <span className="block font-body_font">Member Since:</span>
                    <span className={`block text-center font-body_font female_login_data_2`}>
                    10 / 05 /1996
                    </span>
                    <span className={`block text-right font-body_font male_login_data`}>
                      {formattedDate}
                    </span>
                  </div> */}
										<div className='text-sm sm:text-lg grid grid-cols-3 gap-3 border-b border-[#666] py-[5px] '>
											<span className='block font-body_font'>Birthday:</span>
											<span
												className={`block text-center font-body_font`}
												style={RenderedStyle}
											>
												{userInfo?.couple?.person1?.DOB}
											</span>
											<span
												className={`block text-right font-body_font`}
												style={RenderStyle2}
											>
												{userInfo?.couple?.person2?.DOB}
											</span>
										</div>
										<div className='text-sm sm:text-lg grid grid-cols-3 gap-3 py-[5px] border-b border-[#666]'>
											<span className='block font-body_font'>Gender:</span>
											<span
												className={`block text-center font-body_font`}
												style={RenderedStyle}
											>
												{userInfo?.couple?.person1?.gender}
											</span>
											<span
												className={`block text-right font-body_font`}
												style={RenderStyle2}
											>
												{userInfo?.couple?.person2?.gender}
											</span>
										</div>
										<div className='text-sm sm:text-lg grid grid-cols-3 gap-3 border-b border-[#666] py-[5px] '>
											<span className='block font-body_font'>Body Hair:</span>
											<div className='block text-center'>
												{userInfo?.couple?.person1?.body_hair?.map((el, i) => (
													<span
														className={` font-body_font`}
														style={RenderedStyle}
														key={i}
													>
														{el}{' '}
														{i !== 0 &&
															i !== userInfo?.couple?.person1?.body_hair && (
																<span>, </span>
															)}
													</span>
												))}
											</div>
											<div className='text-right'>
												{userInfo?.couple?.person2?.body_hair?.map((el, i) => (
													<span
														className={`block  font-body_font`}
														style={RenderStyle2}
														key={i}
													>
														{el}
														{i !== 0 &&
															i !==
																userInfo?.couple?.person2?.body_hair.length -
																	1 && <span>, </span>}
													</span>
												))}
											</div>
										</div>
										<div className='text-sm sm:text-lg grid grid-cols-3 gap-3 border-b border-[#666] py-[5px] '>
											<span className='block font-body_font'>Height:</span>
											<span
												className={`block text-center font-body_font`}
												style={RenderedStyle}
											>
												{userInfo?.couple?.person1?.height}
											</span>
											<span
												className={`block text-right font-body_font`}
												style={RenderStyle2}
											>
												{userInfo?.couple?.person2?.height}
											</span>
										</div>
										<div className='text-sm sm:text-lg grid grid-cols-3 gap-3 border-b border-[#666] py-[5px] '>
											<span className='block font-body_font'>Weight:</span>
											<span
												className={`block text-center font-body_font`}
												style={RenderedStyle}
											>
												{userInfo?.couple?.person1?.weight}
											</span>
											<span
												className={`block text-right font-body_font`}
												style={RenderStyle2}
											>
												{userInfo?.couple?.person2?.weight}
											</span>
										</div>
										<div className='text-sm sm:text-lg grid grid-cols-3 gap-3 border-b border-[#666] py-[5px] '>
											<span className='block font-body_font'>Body Type:</span>
											<span
												className={`block text-center font-body_font`}
												style={RenderedStyle}
											>
												{userInfo?.couple?.person1?.body_type}
											</span>
											<span
												className={`block text-right font-body_font`}
												style={RenderStyle2}
											>
												{userInfo?.couple?.person2?.body_type}
											</span>
										</div>
										<div className='text-sm sm:text-lg grid grid-cols-3 gap-3 border-b border-[#666] py-[5px] '>
											<span className='block font-body_font'>
												Ethnic Background:
											</span>
											<span
												className={`block text-center font-body_font`}
												style={RenderedStyle}
											>
												{userInfo?.couple?.person1?.ethnic_background}
											</span>
											<span
												className={`block text-right font-body_font`}
												style={RenderStyle2}
											>
												{userInfo?.couple?.person2?.ethnic_background}
											</span>
										</div>
										<div className='text-sm sm:text-lg grid grid-cols-3 gap-3 border-b border-[#666] py-[5px] '>
											<span className='block font-body_font'>Smoking:</span>
											<span
												className={`block text-center font-body_font`}
												style={RenderedStyle}
											>
												{userInfo?.couple?.person1?.smoking}
											</span>
											<span
												className={`block text-right font-body_font`}
												style={RenderStyle2}
											>
												{userInfo?.couple?.person2?.smoking}
											</span>
										</div>
										<div className='text-sm sm:text-lg grid grid-cols-3 gap-3 border-b border-[#666] py-[5px] '>
											<span className='block font-body_font'>Piercings:</span>
											<span
												className={`block text-center font-body_font`}
												style={RenderedStyle}
											>
												{userInfo?.couple?.person1?.piercings}
											</span>
											<span
												className={`block text-right font-body_font`}
												style={RenderStyle2}
											>
												{userInfo?.couple?.person2?.piercings}
											</span>
										</div>

										<div className='text-sm sm:text-lg grid grid-cols-3 gap-3 border-b border-[#666] py-[5px] '>
											<span className='block font-body_font'>Tattoos:</span>
											<span
												className={`block text-center font-body_font`}
												style={RenderedStyle}
											>
												{userInfo?.couple?.person1?.tattoos}
											</span>
											<span
												className={`block text-right font-body_font`}
												style={RenderStyle2}
											>
												{userInfo?.couple?.person2?.tattoos}
											</span>
										</div>
										<div className='text-sm sm:text-lg grid grid-cols-3 gap-3 border-b border-[#666] py-[5px] '>
											<span className='block font-body_font'>Circumcised:</span>
											<span
												className={`block text-center font-body_font`}
												style={RenderedStyle}
											>
												{userInfo?.couple?.person1?.circumcised}
											</span>
											<span
												className={`block text-right font-body_font`}
												style={RenderStyle2}
											>
												{userInfo?.couple?.person2?.circumcised}
											</span>
										</div>

										<div className='text-sm sm:text-lg grid grid-cols-3 gap-3 border-b border-[#666] py-[5px] '>
											<span className='block font-body_font'>Looks:</span>
											<span
												className={`block text-center font-body_font`}
												style={RenderedStyle}
											>
												{userInfo?.couple?.person1?.looks_important}
											</span>
											<span
												className={`block text-right font-body_font`}
												style={RenderStyle2}
											>
												{userInfo?.couple?.person2?.looks_important}
											</span>
										</div>
										<div className='text-sm sm:text-lg grid grid-cols-3 gap-3 border-b border-[#666] py-[5px] '>
											<span className='block font-body_font'>
												Intelligence:
											</span>
											<span
												className={`block text-center font-body_font`}
												style={RenderedStyle}
											>
												{userInfo?.couple?.person1?.intelligence}
											</span>
											<span
												className={`block text-right font-body_font`}
												style={RenderStyle2}
											>
												{userInfo?.couple?.person2?.intelligence}
											</span>
										</div>
										<div className='text-sm sm:text-lg grid grid-cols-3 gap-3 border-b border-[#666] py-[5px] '>
											<span className='block font-body_font'>Sexuality</span>
											<span
												className={`block text-center font-body_font`}
												style={RenderedStyle}
											>
												{userInfo?.couple?.person1?.sexuality}
											</span>
											<span
												className={`block text-right font-body_font`}
												style={RenderStyle2}
											>
												{userInfo?.couple?.person2?.sexuality}
											</span>
										</div>
										<div className='text-sm sm:text-lg grid grid-cols-3 gap-3 py-[5px] border-b border-[#666] '>
											<span className='block font-body_font'>Relation:</span>
											<span
												className={`block text-center font-body_font`}
												style={RenderedStyle}
											>
												{userInfo?.couple?.person1?.relationship_status}
											</span>
											<span
												className={`block text-right font-body_font`}
												style={RenderStyle2}
											>
												{userInfo?.couple?.person2?.relationship_status}
											</span>
										</div>
										<div className='text-sm sm:text-lg grid grid-cols-3 gap-3  py-[5px]  border-b border-[#666]'>
											<span className='block font-body_font'>Experience:</span>
											<span
												className={`block text-center font-body_font`}
												style={RenderedStyle}
											>
												{userInfo?.couple?.person1?.experience}
											</span>
											<span
												className={`block text-right font-body_font`}
												style={RenderStyle2}
											>
												{userInfo?.couple?.person2?.experience}
											</span>
										</div>
										<div className='text-sm sm:text-lg grid grid-cols-3 gap-3 py-[5px] border-b border-[#666] '>
											<span className='block font-body_font'>Drinking</span>
											<span
												className={`block text-center font-body_font`}
												style={RenderedStyle}
											>
												{userInfo?.couple?.person1?.Drinking}
											</span>
											<span
												className={`block text-right font-body_font`}
												style={RenderStyle2}
											>
												{userInfo?.couple?.person2?.Drinking}
											</span>
										</div>
										<div className='text-sm sm:text-lg grid grid-cols-3 gap-3 py-[5px] border-b border-[#666] '>
											<span className='block font-body_font'>Drugs</span>
											<span
												className={`block text-center font-body_font`}
												style={RenderedStyle}
											>
												{userInfo?.couple?.person1?.Drugs}
											</span>
											<span
												className={`block text-right font-body_font`}
												style={RenderStyle2}
											>
												{userInfo?.couple?.person2?.Drugs}
											</span>
										</div>
										<div className='text-sm sm:text-lg grid grid-cols-3 gap-3 py-[5px] border-b border-[#666] '>
											<span className='block font-body_font'>
												Relationship Status:
											</span>
											<span
												className={`block text-center font-body_font`}
												style={RenderedStyle}
											>
												{userInfo?.couple?.person1?.Relationship}
											</span>
											<span
												className={`block text-right font-body_font`}
												style={RenderStyle2}
											>
												{userInfo?.couple?.person2?.Relationship}
											</span>
										</div>
										<div className='text-sm sm:text-lg grid grid-cols-3 gap-3 py-[5px]'>
											<span className='block font-body_font'>Language:</span>
											<span
												className={`block text-center font-body_font`}
												style={RenderedStyle}
											>
												{userInfo?.couple?.person1?.Language}
											</span>
											<span
												className={`block text-right font-body_font`}
												style={RenderStyle2}
											>
												{userInfo?.couple?.person2?.Language}
											</span>
										</div>
									</div>
								</div>
							</div>
						) : (
							<div className='grid gap-y-5'>
								<div className='p-5 bg-black-20 rounded-2xl w-[100%] '>
									<div className='flex justify-between gap-3 font-normal pb-3 mb-3 border-b border-orange'>
										<p className='text-base sm:text-2xl'>Public Images</p>
									</div>
									<div
										style={{
											display: 'flex',
											flexWrap: 'wrap',
											justifyContent: 'center',
											gap: '10px',
										}}
									>
										{userInfo?.mymedia.filter(item => item?.isPublic).length >
										0 ? (
											userInfo?.mymedia
												.filter(item => item?.isPublic)
												.map(item => {
													return (
														<div
															key={item._id}
															className='p-5 bg-light-grey rounded-2xl text-center'
														>
															<img
																src={item.image}
																alt=''
																srcset=''
																style={{
																	width: '250px',
																	height: '200px',
																	marginBottom: '12px',
																}}
															/>
															<p>{item.description}</p>
														</div>
													);
												})
										) : (
											<p className='text-base sm:text-2xl'>
												This user has no images
											</p>
										)}
									</div>
									<div className='flex justify-between gap-3 font-normal pb-3 mb-3 border-b border-orange'>
										<p
											className='text-base sm:text-2xl'
											style={{ marginTop: '15px' }}
										>
											Private Images
										</p>
									</div>
									{isPasswordCorrect ? (
										<div
											style={{
												display: 'flex',
												flexWrap: 'wrap',
												justifyContent: 'center',
												gap: '10px',
											}}
										>
											{userInfo?.mymedia.filter(item => !item?.isPublic)
												.length > 0 ? (
												userInfo?.mymedia
													.filter(item => !item?.isPublic)
													.map(item => {
														return (
															<div
																key={item._id}
																className='p-5 bg-light-grey rounded-2xl text-center'
															>
																<img
																	src={item.image}
																	alt=''
																	srcset=''
																	style={{
																		width: '250px',
																		height: '200px',
																		marginBottom: '12px',
																	}}
																/>
																<p>{item.description}</p>
															</div>
														);
													})
											) : (
												<p className='text-base sm:text-2xl'>
													This user has no images
												</p>
											)}
										</div>
									) : (
										<form onSubmit={handlePasswordSubmit} style={{}}>
											<input
												type='password'
												name='pass'
												className='outline-none border-none px-3 h-10 bg-grey rounded-xl'
												placeholder='Password...'
												style={{
													marginBottom: '25px',
													width: '250px',
													backgroundColor: 'black',
													marginRight: '15px',
												}}
											/>

											<button
												style={{
													width: '150px',
													marginBottom: '20px',
													background:
														'linear-gradient(46deg, #F79220 55.15%, #F94A2B 82%)',
												}}
												className='primary_btn !py-1 !text-sm !leading-[28px] !px-1 !text-[12px]'
												type='submit'
											>
												Check
											</button>
										</form>
									)}
								</div>
								<div className='p-5 bg-black-20 rounded-2xl w-[100%] '>
									<div className='flex justify-between gap-3 font-normal pb-3 mb-3 border-b border-orange'>
										<p className='text-base sm:text-2xl'>Public Videos</p>
									</div>
									<div
										style={{
											display: 'flex',
											flexWrap: 'wrap',
											justifyContent: 'center',
											gap: '10px',
										}}
									>
										{userInfo?.videos.filter(item => item?.isPublic).length >
										0 ? (
											userInfo?.videos
												.filter(item => item?.isPublic)
												.map(item => {
													return (
														<div
															key={item._id}
															className='p-5 bg-light-grey rounded-2xl text-center'
														>
															<video
																controls
																src={item.video}
																alt=''
																srcset=''
																style={{
																	width: '250px',
																	height: '200px',
																	marginBottom: '12px',
																}}
															></video>
															<p>{item.description}</p>
														</div>
													);
												})
										) : (
											<p className='text-base sm:text-2xl'>
												This user has no videos
											</p>
										)}
									</div>
									<div className='flex justify-between gap-3 font-normal pb-3 mb-3 border-b border-orange'>
										<p
											className='text-base sm:text-2xl'
											style={{ marginTop: '15px' }}
										>
											Private Videos
										</p>
									</div>
									{isPasswordCorrect ? (
										<div
											style={{
												display: 'flex',
												flexWrap: 'wrap',
												justifyContent: 'center',
												gap: '10px',
											}}
										>
											{userInfo?.videos.filter(item => !item?.isPublic).length >
											0 ? (
												userInfo?.videos
													.filter(item => !item?.isPublic)
													.map(item => {
														return (
															<div
																key={item._id}
																className='p-5 bg-light-grey rounded-2xl text-center'
															>
																<video
																	controls
																	src={item.video}
																	alt=''
																	srcset=''
																	style={{
																		width: '250px',
																		height: '200px',
																		marginBottom: '12px',
																	}}
																></video>
																<p>{item.description}</p>
															</div>
														);
													})
											) : (
												<p className='text-base sm:text-2xl'>
													This user has no videos
												</p>
											)}
										</div>
									) : (
										<form onSubmit={handlePasswordSubmit} style={{}}>
											<input
												type='password'
												name='pass'
												className='outline-none border-none px-3 h-10 bg-grey rounded-xl'
												placeholder='Password...'
												style={{
													marginBottom: '25px',
													width: '250px',
													backgroundColor: 'black',
													marginRight: '15px',
												}}
											/>

											<button
												style={{
													width: '150px',
													marginBottom: '20px',
													background:
														'linear-gradient(46deg, #F79220 55.15%, #F94A2B 82%)',
												}}
												className='primary_btn !py-1 !text-sm !leading-[28px] !px-1 !text-[12px]'
												type='submit'
											>
												Check
											</button>
										</form>
									)}
								</div>
							</div>
						)}
					</div>
				</div>
			</div>
			<div className='audit-dating__block relative py-4 md:py-16 md:pt-0 container mx-auto mt-14'>
				<div className='flex flex-col md:flex-row justify-center items-center text-center gap-6 py-71px'>
					<h2 className='text-white text-base sm:text-2xl md:text-3xl xl:text-40px'>
						#1 Adult Dating Site
					</h2>
				</div>
			</div>
		</div>
	);
};

export default CoupleDetailPage;
