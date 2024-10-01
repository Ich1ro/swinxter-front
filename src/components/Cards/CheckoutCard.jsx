import React,{useState} from 'react'
import "./css/checkoutCard.css";
import { useSelector } from "react-redux";
import { Link } from 'react-router-dom';
import { toast } from "react-toastify";
import api from '../../utils/api';

const CheckoutCard = ({title,price,month_freq}) => {
  const {user} = useSelector
  ((state)=>state.auth);

  const [details,setDetails] = useState({
    name: "",
    ccnumber: "",
    expmonth: "",
    expyear: "",
  })
  const [agreement,setAgreement] = useState(false);

  const handleChange = e => {
    setDetails({
   ...details,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if(!agreement){
      toast.error("You need to agree with the terms and conditions");;
    }
    else{
      const res = await api.post("/create-subscription",{
        ccnumber: details.ccnumber,
        expmm: details.expmonth,
        expyy: details.expyear,
        userId: user._id,
        amount: price.slice(1),
        month_freq,
      });
      console.log(res);
    }
  }

  const date = new Date();
  const day = date.getDate();
  const month = date.getMonth();
  const year = date.getFullYear();

  return (
    <div className='checkout_card_holder'>
      <div className='checkout_billing'>
        <h3>Billing Details</h3>
        <div className='billing_detail_sec'>
          <div>
            <p>Payment to: </p>
            <p>Swinxter Inc</p>
          </div>
          <div>
            <p>Name: </p>
            <p>{user.username}</p>
          </div>
          <div>
            <p>Plan: </p>
            <p>{title}</p>
          </div>
          <div>
            <p>Date: </p>
            <p>{month}/{day}/{year}</p>
          </div>
          <div>
            <p>Price: </p>
            <p>{price}</p>
          </div>
          <div>
            <p>Recurring: </p>
            <p>{price==="Free"?"No":"Yes"}</p>
          </div>
          <hr></hr>
          <div>
            <p>total: </p>
            <p>{price}</p>
          </div>
        </div>
        <p style={{marginTop: "10px", color: "#fff", marginLeft: "10px"}}>* You will be billed by Swinxter</p>
      </div>
      <div className='checkout_card'>
        <h3>Membership Payment</h3>
        <p><span style={{fontWeight: "600"}}>Member: </span>{user.username}</p>
        <p><span style={{fontWeight: "600"}}>Membership:</span> {title} Plan ({price})<span style={{marginLeft: "0", fontSize: "14px", color: "#777", fontWeight: "600"}}> - (Non Refundable Charges)</span></p>
        <div className='input_holder'>
          <p>Name on the Card: </p>
          <input type="text" placeholder='Name on the card' name="name" onChange={handleChange}/>
        </div>
        <div className='input_holder'>
          <p>Card Number:</p>
          <input type="number" placeholder='Card Number (Do not use spaces)' name="ccnumber" onChange={handleChange}/>
        </div>
        <div className='accepted_card_icons'>
          <img src='/images/visa.png' style={{width: "50px"}}/>
          <img src='/images/mastercard.png' style={{width: "50px"}}/>
          <img src='/images/american-express.png' style={{width: "50px"}}/>
          <img src='/images/dicover.png' style={{width: "50px"}}/>
        </div>
        <div className='input_holder'>
            <p>Expiry Month:</p>
            <input type="number" min="1" max="12" maxLength="2" placeholder='MM' style={{width: "20%",marginLeft: "7px"}} name='expmonth' onChange={handleChange}/>
            <p style={{transform: "translateX(50px)"}}>Expiry Year:</p>
            <input type="text" placeholder='YYYY' maxLength={4} style={{width: "20%"}} name='expyear' onChange={handleChange}/>
        </div>
        {/* <div className='input_holder'>
            <p>CVV:</p>
            <input type="text" placeholder='CVV' style={{width: "45%", marginLeft: "-5px"}}/>
        </div> */}
        <div style={{display: "flex", alignItems: "center"}}>
          <label for="tnc" style={{color: "orange", width: "100%"}}>* You will be charged according to the selected package amount either after the expiry of the package or from the date of purchase(Subject to package modification or cancellation from your side.)</label>
        </div>
        <div style={{display: "flex", alignItems: "center"}}>
          <label for="tnc" style={{color: "orange", width: "100%"}}>* You will recieve a reminder email days before your billing date or amount deduction.</label>
        </div>
        <div style={{display: "flex", alignItems: "center"}}>
          <input type="checkbox" id="tnc" name="tnc" value="tnc" onChange={(e) => {setAgreement(e.target.checked)}} style={{width: "20px", padding: "0", margin: "0 10px"}}/>
          <label for="tnc" style={{color: "orange", width: "100%"}}>I agree to <Link style={{cursor: "pointer"}} to="/legal/terms" target='_blank'>Terms & Conditions</Link> and <Link to="/legal/privacy" target="_blank">Privacy Policy</Link></label>
        </div>
        <button onClick={handleSubmit}>Proceed</button>
        <p style={{textAlign: "center", marginTop: "30px", color: "#777"}}>For questions regarding payments, please contact support.</p>
      </div>
    </div>
  )
}

export default CheckoutCard