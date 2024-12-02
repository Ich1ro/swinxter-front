import React, { useEffect, useState } from 'react';
import api from '../utils/api';
import { useSelector } from 'react-redux';
import MyMediaAddNew from './MyMediaAddNew';

const MyMedia = () => {
	const { user } = useSelector(state => state.auth);
	const [userInfo, setUserInfo] = useState(user);
	const [addNew, setAddNew] = useState(false);

	useEffect(() => {
		setUserInfo(user)
	}, [user])

	return (
		<>
			{addNew ? (
				<div className='home_page bg-black py-8 px-6 rounded-2xl'>
					<MyMediaAddNew user={user} setAddNew={setAddNew} setUserInfo={setUserInfo} />
				</div>
			) : (
				<div className='home_page bg-black py-8 px-6 rounded-2xl'>
					<div className='mb-20' style={{}}>
						<div className='flex justify-between flex-wrap gap-5 items-center mb-5 sm:mb-8'>
							<h3 className='text-2xl sm:text-5xl leading-none font-bold'>
								My Media
							</h3>
							<button
								style={{ width: '150px' }}
								className='primary_btn !py-1 !text-sm !leading-[28px] !px-1 !text-[12px]'
								onClick={() => setAddNew(true)}
							>
								Add New
							</button>
						</div>
						<div style={{ display: 'flex', flexWrap: 'wrap' }}>
							{userInfo?.mymedia?.length > 0
								? userInfo.mymedia.map((item, i) => (
										<div
											style={{
												padding: '10px',
												borderRadius: '10px',
												backgroundColor: '#2A2D37',
												marginRight: '10px',
											}}
											key={i}
										>
											<img
												src={item?.image || item}
												alt=''
												srcset=''
												style={{
													width: '250px',
													height: '200px',
												}}
											/>
											<div style={{ display: 'flex', marginTop: '20px' }}>
												<button
													style={{ marginRight: '10px' }}
													className='primary_btn !py-1 !text-sm !leading-[28px] !px-1 w-full !text-[12px]'
													// onClick={message}
												>
													Edit
												</button>
												<button
													style={{ marginLeft: '10px' }}
													className='primary_btn !py-1 !text-sm !leading-[28px] !px-1 w-full !text-[12px]'
													// onClick={message}
												>
													Delete
												</button>
											</div>
										</div>
								  ))
								: null}
						</div>
					</div>
				</div>
			)}
		</>
	);
};

export default MyMedia;
