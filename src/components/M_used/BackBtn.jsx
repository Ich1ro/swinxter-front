import React from 'react'
import { FaArrowLeft } from 'react-icons/fa6'
import { useNavigate } from 'react-router-dom'

export const BackBtn = () => {
    const navigate = useNavigate()
  return (
       <span className="absolute top-12 left-5 primary_btn cursor-pointer !text-sm !py-2 !px-3 !leading-none !py-3" onClick={()=>navigate(-1)}>
    <span className="text-sm inline-flex items-center mr-2"><FaArrowLeft /></span>Back
  </span>
  )
}
