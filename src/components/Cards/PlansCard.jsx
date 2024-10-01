import React from 'react'
import "./css/plansCard.css";
import { Link } from 'react-router-dom';

const PlansCard = ({title,price}) => {
  return (
    <div className='plans_card'>
        <h3>{title} Package</h3>
        <h1>{price}</h1>
        <p>All services included</p>
        <Link to={`/checkout/${title}/${price}/${title.split(' ')[0]}`} target="_blank">
        <button>Select Plan</button>
        </Link>
    </div>
  )
}

export default PlansCard