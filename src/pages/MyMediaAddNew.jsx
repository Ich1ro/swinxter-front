import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';
import { IoCloseCircleSharp } from 'react-icons/io5';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { loadUser } from '../redux/actions/auth';

const MyMediaAddNew = ({ user, type, setAddNew, setUserInfo }) => {
	const [image, setImage] = useState();
	const [imageData, setImageData] = useState(null);
	const [isPublic, setIsPublic] = useState(true);
	const [isSaving, setIsSaving] = useState(false);
	const [privatePassword, setPrivatePassword] = useState(null);
	const [desc, setDesc] = useState('');
	const { userId } = useParams();
	const BASE_URL = process.env.REACT_APP_BASE_URL;
	const dispatch = useDispatch();

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
		setIsSaving(true);

		const config = {
			headers: {
				'Content-Type': 'multipart/form-data',
			},
		};

		const formData = new FormData();
		formData.append('description', desc);
		formData.append('isPublic', isPublic);

		if (privatePassword) {
			formData.append('privatePassword', privatePassword);
		}

		let uploadPromise;
		let uploadUrl;

		if (type === 'photos') {
			formData.append('image', imageData);
			uploadUrl = `${BASE_URL}/api/upload_media/${user._id}`;
		} else {
			formData.append('video', imageData);
			uploadUrl = `${BASE_URL}/api/upload_video/${user._id}`;
		}

		const uploadMediaPromise = axios.put(uploadUrl, formData, config);

		toast.promise(uploadMediaPromise, {
			loading: 'Uploading...',
			success:
				type === 'photos'
					? 'Image saved successfully!'
					: 'Video saved successfully!',
			error: type === 'photos' ? 'Image save error!' : 'Video save error!',
		});

		try {
			const { data } = await uploadMediaPromise;

			if (data) {
				setUserInfo(data);
				dispatch(loadUser());
				setIsSaving(false);
				setAddNew(false);
				console.log('success', data);
			}
		} catch (error) {
			console.log('error', error);
			setIsSaving(false);
		}
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
			<h1 style={{ marginBottom: '10px', fontSize: '20px' }}>
				{type === 'photos' ? 'Add New Photo' : 'Add New Video'}
			</h1>
			<div>
				<label htmlFor='add_photos'>
					{type === 'photos' ? (
						<input
							id='add_photos'
							type='file'
							className='hidden'
							name='image'
							accept='.jpg, .jpeg, .png'
							onChange={handleimage}
						/>
					) : (
						<input
							id='add_photos'
							type='file'
							className='hidden'
							name='image'
							accept='video/*'
							onChange={handleimage}
						/>
					)}
					{
						<span
							className='primary_btn gradient  px-8 bg-gradient-to-r from-[#D4AF37]
 to-[#F94A2B] rounded-lg py-2'
						>
							{type === 'photos' ? 'Add Photo *' : 'Add Video *'}
						</span>
					}
				</label>
				<span className='px-5'>
					{type === 'photos'
						? 'jpg/png, max 25MB/Photo'
						: 'mp4, max 100MB/video'}
				</span>
				<div className='mt-5 flex justify-center mb-8'>
					<div className='relative inline-block'>
						{' '}
						{type === 'photos' ? (
							<img src={image} style={{ maxWidth: '250px' }} />
						) : image ? (
							<video src={image} controls style={{ maxWidth: '250px' }}></video>
						) : (
							<></>
						)}
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

			{!isPublic && (user.privatePassword === '' || !user.privatePassword) && (
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
					disabled={isSaving}
				>
					Cancel
				</button>
				<button
					style={{ width: '150px', marginBottom: '20px' }}
					className='primary_btn !py-1 !text-sm !leading-[28px] !px-1 !text-[12px]'
					onClick={handleSave}
					disabled={isSaving}
				>
					Save
				</button>
			</div>
		</div>
	);
};

export default MyMediaAddNew;
