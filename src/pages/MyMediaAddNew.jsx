import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { IoCloseCircleSharp } from 'react-icons/io5';
import { useParams } from 'react-router-dom';

const MyMediaAddNew = ({ user, setAddNew }) => {
	const [image, setImage] = useState();
	const [imageData, setImageData] = useState(null);
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
		const config = {
			headers: {
				'Content-Type': 'multipart/form-data',
			},
		};
		const formData = new FormData();
		formData.append('image', imageData);
		formData.append('description', desc);

		const { data } = await axios.put(
			`${BASE_URL}/api/upload_media/${user._id}`,
			formData,
			config
		);
		if (data) {
			console.log('success', data);
		} else {
			console.log('error', data);
		}

		setAddNew(false);
	};

	useEffect(() => {
		console.log(imageData);
	}, [imageData]);

	return (
		<div
			style={{
				display: 'flex',
				flexDirection: 'column',
				position: 'absolute',
				width: '100%',
				height: '500px',
				alignItems: 'center',
				justifyContent: 'center',
				background: 'black',
			}}
		>
			<h1 style={{marginBottom: '10px', fontSize: '20px'}}>Add New Media</h1>
			<div>
				<label htmlFor='add_photos'>
					<input
						id='add_photos'
						type='file'
						className='hidden'
						name='image'
						onChange={handleimage}
					/>
					{image ? (
						<span
							className='primary_btn gradient  px-8 bg-gradient-to-r from-[#F79220]
 to-[#F94A2B] rounded-lg py-2'
						>
							Change Photo
						</span>
					) : (
						<span
							className='primary_btn gradient  px-8 bg-gradient-to-r from-[#F79220]
 to-[#F94A2B] rounded-lg py-2'
						>
							Add Photo *
						</span>
					)}
				</label>
				<span className='px-5'>jpg/png, max 25MB/Photo</span>
				<div className='mt-5 flex justify-center mb-8'>
					<div className='relative inline-block'>
						{' '}
						<img src={image} style={{maxWidth: '250px'}} />
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
			<button
				style={{ width: '150px', marginBottom: '20px' }}
				className='primary_btn !py-1 !text-sm !leading-[28px] !px-1 !text-[12px]'
				onClick={handleSave}
			>
				Save
			</button>
		</div>
	);
};

export default MyMediaAddNew;
