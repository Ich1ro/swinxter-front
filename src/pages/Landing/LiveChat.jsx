import React from "react";
import MemberCard from "../../components/LandingPage/LiveEvent/MemberCard";
import { useSelector } from "react-redux";
import BotMessage from "../../components/Floating_Btn/Bot";

const LiveChatPage = () => {
  const {isAuthenticated} = useSelector((state)=>state.auth);
  return (
    <div className="bg-black-20">
      <div className="live_chat_sec min-h-[700px] relative flex items-end justify-start z-1">
        <img
          src="landingPage/images/live-chat-banner.png"
          alt="live-chat-banner"
          className="absolute top-0 left-0 w-full h-full -z-1 object-cover object-center"
        />
        <div className="relative max-w-7xl mx-auto pb-5 sm:pb-20 px-5 z-1">
          <h3 className="text-2xl sm:text-4xl font-secondary_font mb-2">
            Live Member Webcams & Chat on Swinxter Adult Dating Site
          </h3>
          <p className="text-3xl sm:text-5xl font-bold mb-2 max-w-xl">
            Experience the thrill of live member cams & indulge in sizzling live
            sex chat at Swinxter.com
          </p>
          <p className="text-sm sm:text-lg font-body_font">
            Our streaming webcams with live chat allow our members to connect in
            real-time, no matter where they are. With cam-to-cam sessions,
            online sex dating and cybersex chat reach new, interactive levels of
            excitement. Whether you identify as a man, woman, transgender, or a
            swinger couple, Swinxter member cams offer a gateway to partners
            eager to share your wildest fantasies. Join the fun and connect with
            thousands of members online right now! Embrace the excitement and
            satisfaction that awaits you at Swinxter.com.
          </p>
        </div>
      </div>
      <div className="py-10">
        <div className="container mx-auto">
          <div className="text-center">
            <h3 className="text-2xl md:text-5xl font-bold mb-3">
              Real Members Broadcasting
            </h3>
            <p className="text-base md:text-lg font-body_font">
              In just 4 minutes, you can dive into a scintillating live webcam
              chat with some of the hottest people worldwide. Experience the
              excitement around the clock, 24/7, at Swinxter.com. Don't miss out
              on this thrilling opportunity to connect with like-minded
              individuals and create unforgettable moments in real-time. Join us
              now and start chatting live with the sexiest people in the world!
            </p>
          </div>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-5 mt-10">
            <MemberCard />
            <MemberCard />
            <MemberCard />
            <MemberCard />
            <MemberCard />
          </div>
        </div>
      </div>
      <div className="audit-dating__block relative py-4 md:py-16 md:pt-0 container mx-auto">
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
      {!isAuthenticated && <BotMessage/> }
    </div>
  );
};

export default LiveChatPage;
