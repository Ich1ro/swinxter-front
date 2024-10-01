import React, { useState } from "react";
import api from "../utils/api";
import Loading from "../components/M_used/Loading";
import { toast } from "react-toastify";

const contactCategories = [
  "Username/Password",
  "Billing Questions",
  "Delete Account",
  "Profile Questions",
  "Turn off Auto Renewal",
  "Message/Email",
  "Abuse/Spam Questions",
  "Suggestion/Feedback",
  "Press Contact",
  "Other Questions",
];
let fields={
  email: "",
  username: "",
  reason: "",
  message: "",
}
const ContactPage = () => {
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState(fields);

const handleContact = (e)=>{
const {value,name}=e.target;
setForm({...form,[name]:value})
}

const handleSubmit =(e)=> {
e.preventDefault();
setLoading(true)
api.post("/contactUs",{...form}).then((res)=>{setLoading(false)
toast.success("Email sent successfully!")}).catch((err)=>{setLoading(true)
  console.log(err)})

setForm(fields)
}

const {email,username,reason,message}=form;
  return (
    <>
      <div className="py-10 container mx-auto contact-page">
        <div className="text-center max-w-6xl mx-auto">
          <h3 className="font-secondary_font text-40px mb-5 mt-16">
            Contact Us
          </h3>
          <p className="text-sm md:text-lg">
            {/* If you need immediate help, please call our Customer Service support
            line: (669) 208-0363 24 hours a day, seven days a week. For billing
            questions, please call us toll-free: (888) 575-8383 or (669)
            208-0364 */}

If you need immediate help, please call our Customer Service support line: (+1-407-602-5244)
          </p>
        </div>
        <form
          className="flex flex-col justify-center gap-y-4 sm:gap-y-6 max-w-2xl mx-auto mt-10"
          autoComplete="off"
          onSubmit={handleSubmit}
        >
          <div>
            <div className="flex flex-wrap rounded-md input_field">
              <label
                htmlFor="email"
                className="rounded-l-md w-full md:w-[120px] xl:w-[195px] md:h-[49px] flex items-center justify-start md:px-2 lg:px-4 text-sm mb-1 md:mb-0 md:text-text-xs xl:text-base text-orange md:text-white  font-normal leading-5 xl:leading-29 text-center lg:text-start"
              >
                Email address
              </label>
              <input
                type="email"
                id="email"
                value={email}
                name="email"
                placeholder="Enter your mail"
                onChange={handleContact}
                className="bg-white border rounded-md md:rounded-none md:border-none md:border-l-2 md:rounded-r-md border-orange focus:outline-none focus-visible:none w-full md:w-[calc(100%-120px)] xl:w-[calc(100%-195px)] h-[49px] text-black font-normal xl:text-lg rounded-r-md text-sm px-2 xl:px-4 py-2.5 text-start placeholder:text-lg placeholder:text-gray items-center flex justify-between"
                required
              />
            </div>
          </div>
          <div>
            <div className="flex flex-wrap rounded-md input_field">
              <label
                htmlFor="email"
                className="rounded-l-md w-full md:w-[120px] xl:w-[195px] md:h-[49px] flex items-center justify-start md:px-2 lg:px-4 text-sm mb-1 md:mb-0 md:text-text-xs xl:text-base text-orange md:text-white  font-normal leading-5 xl:leading-29 text-center lg:text-start"
              >
                Username
              </label>
              <input
                type="text"
                id="username"
                onChange={handleContact}
                name="username"
                value={username}
                placeholder="Enter your username"
                className="bg-white border rounded-md md:rounded-none md:border-none md:border-l-2 md:rounded-r-md border-orange focus:outline-none focus-visible:none w-full md:w-[calc(100%-120px)] xl:w-[calc(100%-195px)] h-[49px] text-black font-normal xl:text-lg rounded-r-md text-sm px-2 xl:px-4 py-2.5 text-start placeholder:text-lg placeholder:text-gray items-center flex justify-between"
                required
              />
            </div>
          </div>
          <div>
            <div className="flex flex-wrap rounded-md input_field">
              <label
                htmlFor="email"
                className="rounded-l-md w-full md:w-[120px] xl:w-[195px] md:h-[49px] flex items-center justify-start md:px-2 lg:px-4 text-sm mb-1 md:mb-0 md:text-text-xs xl:text-base text-orange md:text-white  font-normal leading-5 xl:leading-29 text-center lg:text-start"
              >
                Reason
              </label>
              <select
                name="reason"
                id="reason"
                value={reason}
                onChange={handleContact}
                className="bg-white border rounded-md md:rounded-none md:border-none md:border-l-2 md:rounded-r-md border-orange focus:outline-none focus-visible:none w-full md:w-[calc(100%-120px)] xl:w-[calc(100%-195px)] h-[49px] text-black font-normal xl:text-lg rounded-r-md text-sm px-2 xl:px-4 py-2.5 text-start placeholder:text-lg placeholder:text-gray items-center flex justify-between"
              >
                <option>Select a reason</option>{" "}
                {contactCategories.map((el) => (
                  <option value={el}>{el}</option>
                ))}
              </select>
            </div>
          </div>
          <div className="p-[2px] gradient rounded-md">
            <textarea
              type="text"
              id="intro_msg"
              rows={3}
              value={message}
              onChange={handleContact}
              placeholder="Enter your message"
              name="message"
              className="bg-white focus:outline-none focus-visible:none w-full border-gradient3 text-black font-normal xl:text-lg rounded-md text-sm px-2 xl:px-4 py-2.5 items-center flex justify-between"
              required
            ></textarea>
          </div>
          {loading? <Loading/> :
            <button className="gradient !py-3 w-full !text-lg xl:!text-25px capitalize !font-bold flex justify-center items-center text-white rounded-xl primary_btn">
              Send
            </button>
          }
        </form>
      </div>
      <div className="bg-black">
        <div className="audit-dating__block relative py-4 md:py-16 container mx-auto">
          <div className="flex flex-col md:flex-row justify-center items-center text-center gap-6 py-71px">
            <h2 className="text-white text-2xl sm:text-3xl xl:text-40px">
              #Best Adult Dating Site
            </h2>
          </div>
        </div>
      </div>
    </>
  );
};

export default ContactPage;
