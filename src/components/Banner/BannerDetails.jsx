import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import api from '../../utils/api'

const BannerDetails = () => {
	const data = useParams()
	const [banner, setBanner] = useState(null)

	const getBanner = async () => {
		const data = await api.get(`get-banners/${data._id}`)
		setBanner(data)
	}

	useEffect(() => {
		if(data?.id) {
			getBanner()
		}
	}, [data])
  return (
	<div className=''>
		<h1>Banner Details</h1>
	</div>
  )
}

export default BannerDetails