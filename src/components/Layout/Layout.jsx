import React from 'react'
import Navbar from './Navbar'
import Footer from './Footer'
import BotMessage from '../Floating_Btn/Bot'
// import "../../pages/Auth/css/signup_login.css";
export const Layout = ({children}) => {
  return (
    <>
      <div className="min-h-screen bg-black-20 text-white grid content-between">
      <div className="overflow-hidden">
    <Navbar/>
   {children}
   </div>
   <Footer/>
   </div>
   </>
  )
}
