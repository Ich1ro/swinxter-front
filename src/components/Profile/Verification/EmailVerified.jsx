import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import api from "../../../utils/api";

const EmailVerified = () => {
  const { id } = useParams();
const [success,setSuccess]=useState(false)
  useEffect(() => {
    verifyEmail();
  }, []);
  const verifyEmail = async () => {
    try {
      const { data } = await api.post(`/user_verify/${id}`);
      if(data){
        setSuccess(true)
      }else{
        setSuccess(false)
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="bg-black-20">
      <div className="min-h-[350px] md:min-h-[320px] flex justify-center items-end bg-black rounded-b-50px">
        {success?
        <div className="container mx-auto pb-20 text-center">
          <h3 className="font-secondary_font text-40px">Email Verified</h3>
          <p className="text-xl">Your Email address has been verified</p>
          <p className="text-md">
            Click here to{" "}
            <Link to="/login" className="text-orange underline">
              Login
            </Link>{" "}
            with your credentials
          </p>
        </div>:   <div className="container mx-auto pb-20 text-center">
          <h3 className="font-secondary_font text-40px">Something went wrong!</h3>
          <p className="text-xl">Your Email address isn't verified</p></div> }
      </div>
      <div className="pt-10 container mx-auto"></div>
      <div className="audit-dating__block relative py-4 md:py-16 md:pt-0 container mx-auto mt-14">
        <div className="flex flex-col md:flex-row justify-center items-center text-center gap-6 py-71px">
          {/* <img
            src="images/avn_award2-1.png"
            alt="award"
            className="max-w-200px md:max-w-full"
          /> */}
          <h2 className="text-white text-2xl sm:text-3xl xl:text-40px">
            #Best Adult Dating Site
          </h2>
        </div>
      </div>
    </div>
  );
};

export default EmailVerified;
