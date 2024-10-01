import React from 'react'
import { Link } from 'react-router-dom'

const ModelSidebarList = () => {
    return (
        <div className='w-full xl:w-60'>
            <div className='grid grid-cols-2 gap-5 xl:block'>
                <div className='mb-6 cursor-pointer'>
                    <h3 className='text-center text-base xl:text-lg py-6 px-5 rounded-t-2xl bg-orange'>495 Live Pro Models</h3>
                    <img src="images/sidebar_model.png" alt="model" className='w-full rounded-b-2xl' />
                </div>
                <div className='mb-6 cursor-pointer'>
                    <h3 className='text-center text-base xl:text-lg py-6 px-5 rounded-t-2xl bg-orange'>495 Live Pro Models</h3>
                    <img src="images/sidebar_model.png" alt="model" className='w-full rounded-b-2xl' />
                </div>
            </div>
            <Link className='primary_btn w-full'>View More Models</Link>
        </div>
    )
}

export default ModelSidebarList