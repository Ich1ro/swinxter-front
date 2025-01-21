import React, { useEffect, useState } from 'react';
import { BsChevronRight } from 'react-icons/bs';
import { FaArrowLeft } from 'react-icons/fa6';
import { useNavigate, useParams } from 'react-router-dom';
import api from '../../utils/api'
import UserCard from '../Cards/UserCard'

const EventParticipants = () => {
  const [users, setUsers] = useState([])
  const { id } = useParams();
	const getEvent = async () => {
		try {
			const { data } = await api.get(`/get_participants/${id}`);
			setUsers(data);
		} catch (error) {
			console.log(error);
		}
	};

  useEffect(() => {
    getEvent()
  }, [])

  useEffect(() => {
    console.log(users);
  }, [users])
	const navigate = useNavigate();

	return (
		<div className='bg-black pt-0 sm:pt-8 py-8 px-6 rounded-2xl min-h-full'>
			<span
				className='primary_btn cursor-pointer !text-sm !py-2 !px-3 !leading-none !py-3'
				onClick={() => navigate(-1)}
			>
				<span className='text-sm inline-flex items-center mr-2'>
					<FaArrowLeft />
				</span>
				Back
			</span>
      <div
      style={{marginTop: '20px'}}
				className='all-users-grid'
					// style={{
					// 	display: 'flex',
					// 	flexWrap: 'wrap',
					// 	marginTop: '20px',
					// 	justifyContent: 'center',
					// }}
				>
					{users.map((user, i) => (
						<UserCard key={i} userInfo={user} />
					))}
				</div>
		</div>
	);
};

export default EventParticipants;
