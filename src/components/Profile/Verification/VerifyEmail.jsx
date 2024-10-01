import React from "react";

import { useLocation } from "react-router-dom";

const VerifyEmail = () => {
  const {state} = useLocation();

  return (
    <div className="bg-black-20">
      <div className="min-h-[350px] md:min-h-[320px] flex justify-center items-end bg-black rounded-b-50px">
        <div className="container mx-auto pb-20 text-center">
          <h3 className="font-secondary_font text-40px">Verify Email</h3>
          <p className="text-lg">
            We've sent an email to {state} to verify your email address
            and activate your account. The link in the email will expire in 24
            hrs
          </p>
        </div>
      </div>
      <div className="pt-10 container mx-auto">
      
      </div>
      <div className="audit-dating__block relative py-4 md:py-16 md:pt-0 container mx-auto mt-14">
        <div className="flex flex-col md:flex-row justify-center items-center text-center gap-6 py-71px">
      
          <h2 className="text-white text-2xl sm:text-3xl xl:text-40px">
            #Best Adult Dating Site
          </h2>
        </div>
      </div>
    </div>
  );
};

export default VerifyEmail;
