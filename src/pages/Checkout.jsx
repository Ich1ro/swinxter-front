import React from 'react'
import CheckoutCard from '../components/Cards/CheckoutCard'
import { useParams } from 'react-router-dom'
import './styles/checkout.css'


const Checkout = () => {
    const title = useParams().title;
    const price = useParams().price;
    const month_freq = useParams().month_freq;
  return (
    <div className='checkout'>
        <CheckoutCard title={title} price={price} month_freq={month_freq}/>
    </div>
  )
}

export default Checkout