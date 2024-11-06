import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';

const SuccessPaymentPage = () => {
	// const { id } = useParams();

	return (
		<div className='bg-black-20'>
			<div className='min-h-[350px] md:min-h-[320px] flex justify-center items-end bg-black rounded-b-50px'>
				<div className='container mx-auto pb-20 text-center'>
					<h3 className='text-40px'>Payment Successful</h3>
					<p className='text-xl'>
						Your payment has been successfully processed!
					</p>
					<p className='text-md'>
						Click here to go back to the{' '}
						<Link to='/home' className='text-orange underline'>
							Home Page
						</Link>{' '}
						and continue exploring.
					</p>
				</div>
			</div>
			<div className='pt-10 container mx-auto'></div>
			<div className='audit-dating__block relative py-4 md:py-16 md:pt-0 container mx-auto mt-14'>
				<div className='flex flex-col md:flex-row justify-center items-center text-center gap-6 py-71px'>
					{/* <img
            src="images/avn_award2-1.png"
            alt="award"
            className="max-w-200px md:max-w-full"
          /> */}
					<h2 className='text-white text-2xl sm:text-3xl xl:text-40px'>
						You Only Live Once - Be a Swinxter
					</h2>
				</div>
			</div>
		</div>
	);
};

export default SuccessPaymentPage;
