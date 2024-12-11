import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { IoCloseCircleSharp } from 'react-icons/io5';
import { useParams } from 'react-router-dom';

const MyMediaAddNew = ({ user, type, setAddNew, setUserInfo }) => {
	const [image, setImage] = useState();
	const [imageData, setImageData] = useState(null);
	const [isPublic, setIsPublic] = useState(true);
	const [privatePassword, setPrivatePassword] = useState(null);
	const [desc, setDesc] = useState('');
	const { userId } = useParams();
	const BASE_URL = process.env.REACT_APP_BASE_URL;

	const handleimage = async e => {
		const file = e.target.files[0];
		
		if (!file) {
			return;
		} else {
			setImage(URL.createObjectURL(e.target.files[0]));
		}

		setImageData(file);
		
	};

	const handleSave = async () => {
		if (privatePassword || user.privatePassword !== '' || isPublic) {
			const config = {
				headers: {
					'Content-Type': 'multipart/form-data',
				},
			};
			if (type === 'photos') {
				const formData = new FormData();
				formData.append('image', imageData);
				formData.append('description', desc);
				formData.append('isPublic', isPublic);
				if (privatePassword) {
					formData.append('privatePassword', privatePassword);
				}

				const { data } = await axios.put(
					`${BASE_URL}/api/upload_media/${user._id}`,
					formData,
					config
				);
				if (data) {
					setUserInfo(data);
					console.log('success', data);
				} else {
					console.log('error', data);
				}

				setAddNew(false);
			} else {
				const formData = new FormData();
				formData.append('video', imageData);
				formData.append('description', desc);
				formData.append('isPublic', isPublic);
				if (privatePassword) {
					formData.append('privatePassword', privatePassword);
				}

				const { data } = await axios.put(
					`${BASE_URL}/api/upload_video/${user._id}`,
					formData,
					config
				);
				if (data) {
					setUserInfo(data);
					console.log('success', data);
				} else {
					console.log('error', data);
				}

				setAddNew(false);
			}
		}
		// console.log(image);
		// console.log(imageData);
		
	};

	useEffect(() => {
		console.log(user);
	}, [user]);

	return (
		<div
			style={{
				display: 'flex',
				flexDirection: 'column',
				width: '100%',
				height: '100%',
				alignItems: 'center',
				justifyContent: 'center',
			}}
		>
			<h1 style={{ marginBottom: '10px', fontSize: '20px' }}>{type === 'photos' ? 'Add New Photo' : 'Add New Video'}</h1>
			<div>
				<label htmlFor='add_photos'>
					<input
						id='add_photos'
						type='file'
						className='hidden'
						name='image'
						onChange={handleimage}
					/>
					{
						<span
							className='primary_btn gradient  px-8 bg-gradient-to-r from-[#F79220]
 to-[#F94A2B] rounded-lg py-2'
						>
							{type === 'photos' ? 'Add Photo *' : 'Add Video *'}
						</span>
					}
				</label>
				<span className='px-5'>{type === 'photos' ? 'jpg/png, max 25MB/Photo' : 'mp4, max 100MB/video'}</span>
				<div className='mt-5 flex justify-center mb-8'>
					<div className='relative inline-block'>
						{' '}
						{type === 'photos' ? (<img src={image} style={{ maxWidth: '250px' }} />) : image ? (<video src={image} controls style={{ maxWidth: '250px' }}></video>) : <></>}
						
						{image && (
							<span
								className='preview_close absolute top-0 transform
                     translate-x-[40%] -translate-y-[50%] right-0 object-contain text-xl z-[1] w-5
                      h-5 rounded-full bg-orange text-black cursor-pointer'
								onClick={e => {
									setImage('');
								}}
							>
								<IoCloseCircleSharp />
							</span>
						)}
					</div>
				</div>
			</div>
			<input
				type='text'
				value={desc}
				onChange={e => setDesc(e.target.value)}
				className='outline-none border-none px-3 h-10 bg-light-grey rounded-xl'
				placeholder='description...'
				style={{ marginBottom: '25px', width: '250px' }}
			/>

			<div className='flex items-center mb-5'>
				<label
					className='mr-4'
					style={{ display: 'flex', alignItems: 'center' }}
				>
					<input
						type='radio'
						name='visibility'
						checked={isPublic}
						onChange={() => setIsPublic(true)}
						style={{ marginRight: '5px' }}
					/>
					<p style={{ fontSize: '14px' }}>Public</p>
				</label>
				<label style={{ display: 'flex', alignItems: 'center' }}>
					<input
						type='radio'
						name='visibility'
						checked={!isPublic}
						onChange={() => setIsPublic(false)}
						style={{ marginRight: '5px' }}
					/>
					<p style={{ fontSize: '14px' }}>Private</p>
				</label>
			</div>

			{!isPublic && user.privatePassword === '' && (
				<>
					<h2 style={{ fontSize: '20px', marginBottom: '25px' }}>
						Create password for private images*
					</h2>
					<input
						type='password'
						className='outline-none border-none px-3 h-10 bg-light-grey rounded-xl'
						placeholder='Password...'
						value={privatePassword}
						onChange={e => setPrivatePassword(e.target.value)}
						style={{ marginBottom: '25px', width: '250px' }}
					/>
				</>
			)}

			<div style={{ display: 'flex' }}>
				<button
					style={{ width: '150px', marginBottom: '20px', marginRight: '20px' }}
					className='primary_btn !py-1 !text-sm !leading-[28px] !px-1 !text-[12px]'
					onClick={() => setAddNew(false)}
				>
					Cancel
				</button>
				<button
					style={{ width: '150px', marginBottom: '20px' }}
					className='primary_btn !py-1 !text-sm !leading-[28px] !px-1 !text-[12px]'
					onClick={handleSave}
				>
					Save
				</button>
			</div>
		</div>
	);
};

export default MyMediaAddNew;
