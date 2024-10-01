import React, { useState } from 'react';
import Loading from '../components/M_used/Loading';
import api from '../utils/api';
import { useSelector } from 'react-redux';

const AccountPage = () => {
  const [success,setSuccess] = useState(false);
  const [oldPass,setOldPass] = useState();
  const [newPass,setNewPass] = useState();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const {user} = useSelector((state)=>state.auth);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try{
      const {data} = await api.put(`/changePassword`,{old_password: oldPass,new_password: newPass, confirm_password: newPass});
      setSuccess(true);
    }catch(e) {
      setError("Error updating password");
      console.log(e);
    }
    setLoading(false);
  }

  const convertDate = (dateStr) => {
    let date = new Date(dateStr);
    let options = { month: 'short', day: 'numeric', year: 'numeric' };
    let formattedDate = date.toLocaleDateString('en-US', options);
    return formattedDate;
  }

  const calcDiff = (dateStr1,dateStr2) => {
      // Convert to Date objects
      let date1 = new Date(dateStr1);
      let date2 = new Date(dateStr2);
  
      // Ensure date1 is earlier than date2
      if (date1 > date2) {
          [date1, date2] = [date2, date1];
      }
  
      // Calculate difference in months
      let yearsDifference = date2.getFullYear() - date1.getFullYear();
      let monthsDifference = (date2.getMonth() - date1.getMonth()) + (yearsDifference * 12);
      let daysDifference = date2.getDate() - date1.getDate();
  
      // Adjust monthsDifference and daysDifference accordingly
      if (daysDifference < 0) {
          monthsDifference--;
          let previousMonth = (date2.getMonth() === 0 ? 11 : date2.getMonth() - 1);
          let previousMonthYear = (previousMonth === 11 ? date2.getFullYear() - 1 : date2.getFullYear());
          let daysInPreviousMonth = new Date(previousMonthYear, previousMonth + 1, 0).getDate();
          daysDifference += daysInPreviousMonth;
      }
  
      // Check if the difference is less than 31 days
      if (monthsDifference === 0 && daysDifference < 31) {
          return `${daysDifference} day(s)`;
      } else {
          return `${monthsDifference} month(s)`;
      }
  }

  console.log(oldPass, newPass);

    return (
        <div className="home_page bg-black py-8 px-6 rounded-2xl">
          <div className="mb-20">
            <div className="flex justify-between flex-wrap gap-5 items-center mb-5 sm:mb-8">
              <h3  className="text-2xl sm:text-5xl leading-none font-bold">
                My Account
              </h3>
            </div>
            <div className="w-full px-5 py-7" style={{marginTop: "50px", display: "flex", justifyContent: "space-between", flexWrap: "wrap", color: "orange", fontWeight: "600", fontSize: "20px", backgroundColor: "#2A2D37", borderRadius: "10px"}}>
                <div>
                  <p style={{marginBottom: "20px"}}>Joined: <span style={{color: "orange", fontWeight: "400"}}>Aug 29, 2023</span></p>
                  <p>Last Payment: <span style={{color: "orange", fontWeight: "400"}}>{convertDate(user.payment?.last_payment)}</span></p>
                </div>
                <div>
                  <p style={{marginBottom: "20px"}}>Membership: <span style={{color: "orange", fontWeight: "400"}}>Limited access</span></p>
                  <p>Expire/Renew Date: <span style={{color: "orange", fontWeight: "400"}}>{convertDate(user.payment?.membership_expiry)}</span></p>
                </div>
                <div>
                  <p>Days until expiration: <span style={{color: "orange", fontWeight: "400"}}>{calcDiff(user.payment?.last_payment,user.payment?.membership_expiry)}</span></p> 
                </div>
            </div>
            <div className='w-full flex justify-center my-20'>
              <button style={{outline: "2px solid #BA0021", padding: "12px 30px", borderRadius: "10px", color: "#BA0021"}}>Delete account</button>
            </div>
            <div className='w-full my-30 px-5 py-7' style={{backgroundColor: "#2A2D37", borderRadius: "10px"}}>
                <h3 className='text-xl font-bold'>Change Password</h3>
                <div>
                  <input type="password" onChange={(e) => {setOldPass(e.target.value)}} placeholder="Old Password" className='w-200 px-5 py-3 border-2 border-gray-300 rounded-md my-5 text-black' />
                  <input type="password" onChange={(e) => {setNewPass(e.target.value)}} placeholder="New Password" className='w-200 px-5 py-3 border-2 border-gray-300 rounded-md my-5 mx-5 text-black' />
                  <button className='primary_btn text-lg' onClick={handleSubmit}>{loading?<Loading />: "Change Password"}</button>
                </div>
                {
                  success?
                    <p style={{marginLeft: "2px", color:"orange"}}>Password has been changed !</p>
                    :null
                  }
                {
                  error.length>0?
                    <p style={{marginLeft: "2px", color:"orange"}}>{error}</p>
                    :null
                  }
            </div>
        </div>
        </div>
      )
}

export default AccountPage