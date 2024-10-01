import React from 'react'
import CheckoutCard from '../components/Cards/CheckoutCard'
import { useParams } from 'react-router-dom'


const Checkout = () => {
    const title = useParams().title;
    const price = useParams().price;
    const month_freq = useParams().month_freq;
  return (
    <div style={{width: "100%", height: "110vh", display: "flex", justifyContent: "center", alignItems: "center",backgroundColor: "#111"}}>
        <CheckoutCard title={title} price={price} month_freq={month_freq}/>
    </div>
  )
}

export default Checkout