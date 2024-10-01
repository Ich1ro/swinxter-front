import React from 'react';
import { Link } from 'react-router-dom';
import BotMessage from '../../components/Floating_Btn/Bot';

export const Home = () => {

  return (
    <>
  <section className="relative min-h-[80vh] sm:min-h-[95vh] rounded-b-2xl sm:rounded-b-50px hero_section z-[99] flex items-center">
      <div className="container mx-auto relative">
        <div className="text-white max-w-xs sm:max-w-470px sm:ml-auto">
          <p className="text-2xl sm:text-40px font-secondary_font ">
            Join the world's largest
          </p>
          <h3 className="text-3xl sm:text-5xl font-bold">
            dating and social network for adults.
          </h3>
          <Link to="/signup" className="uppercase primary_btn mt-5">
            Join now
          </Link>
        </div>
      </div>
    </section>
    <section className="text-with-image text-white py-6 md:py-8 lg:py-20 find_partner relative z-0 ">
      <div
        className="container mx-auto relative z-0 before:absolute before:content-[''] before:w-[502px] before:h-[502px] before:right-0
        before:bg-no-repeat before:bg-cover before:bg-yellow before:blur-[150px] before:rounded-full before:bottom-[-20%] before:z-[-2]"
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div className="left-block flex justify-center lg:justify-end items-center">
            <div className="inner-block max-w-500">
              <p className="text-xl xl:text-35px sm:leading-45 font-light lg:max-w-[360px] font-body_font">
                Discover endless possibilities at Swinxter.com! Connect with
                partners, find hook-ups, and
              </p>
              <h2 className="text-2xl md:text-4xl xl:text-50px sm:leading-75 font-bold mb-3 sm:mb-0">
                chat live now!
              </h2>
              <p className="text-sm md:text-base xl:text-lg mb-4 leading-29 font-body_font">
                Experience the power of our vast global community with thousands
                of members worldwide Now! Looking
                for the lifestyle? Open the door to exciting possibilities and
                connect with someone special for a passionate, intimate
                relationship or a thrilling, short-term fling. Unlock a world of
                vibrant connections and satisfy your desire for extraordinary
                sexual experiences by joining our thriving lifestyle community
                at Swinxter.com. Sign up now! SWINXTER has successfully assisted
                millions of individuals in discovering traditional partners,
                swinger groups, threesomes, and a diverse array of alternative
                partners. Join today to explore a world of exciting
                possibilities!
              </p>
              <Link className="primary_btn" to="/signup">
                Sign Up for Free Now!
              </Link>
            </div>
          </div>
          <div className="right-block flex justify-center items-center order-first sm:order-2">
            <div className="right-block">
              <img
                src="landingPage/images/partner.png"
                className="max-w-full"
                alt="partner"
              />
            </div>
          </div>
        </div>
      </div>
    </section>

    <section
      className="text-with-image  text-white py-6 md:py-8 lg:py-20 Hook__up-dating relative z-0
    before:absolute before:content-[''] lg:before:w-[502px] before:w-full before:h-[502px] before:left-0 lg:before:left-1/2
    before:bg-no-repeat before:bg-cover before:bg-violet before:blur-[200px] before:rounded-502 before:bottom-[-125px] before:z-[-2] before:-translate-x-1/2 before:transform"
    >
      <div className="container mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 p-1 rounded-2xl sm:rounded-50px gradient">
          <div className="right-block flex justify-center items-center">
            <div className="right-block-img w-full h-full">
              <img
                src="landingPage/images/medium-shot-romantic-couple-inside-1.png"
                className="w-full object-cover h-full rounded-t-2xl sm:rounded-t-46 sm:rounded-l-46 rounded-bl-none rounded-br-none lg:rounded-bl-46 lg:rounded-tr-none lg:rounded-br-none"
                alt="partner"
              />
            </div>
          </div>
          <div className="left-block flex justify-center items-center Hookup-content rounded-b-2xl roudned-r-none lg:rounded-r-46 lg:rounded-bl-none sm:rounded-b-46 bg-2e2e2e px-5">
            <div className="inner-block px-0 py-10 lg:p-14 xl:p-16">
              <p className="text-xl md:text-xl xl:text-35px sm:leading-45 font-light max-w-xs font-body_font">
                Indulge in adult dating and thrilling connections at SWINXTER®.
                Join now and experience the excitement first-hand!
              </p>
              {/* <h2 className="text-2xl md:text-4xl xl:text-50px sm:leading-75 sm:mb-0 mb-3 font-bold">
                Swinxter®
              </h2> */}
              <p className="text-sm md:text-base xl:text-lg mb-4 leading-29 max-w-420px font-body_font">
                Experience the ultimate convenience with adult dating at
                Swinxter! Our platform is designed to effortlessly connect you
                with your best adult dating matches, saving you time and effort.
                Whether you're seeking friends for adult dates or passionate
                encounters, Swinxter offers a wide range of local adult matches
                looking for lifestyle dating. Embrace the possibilities of
                hook-ups, online friendships, or intense connections with hot
                partners. Get ready to make your desires a reality – join
                Swinxter today and get it on!
              </p>
              <Link to="/signup" className="primary_btn">
                Join for Free Now!
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section className="text-with-image  text-white py-6 md:py-8 lg:py-20 meet-member relative z-0">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div className="left-block flex justify-center lg:justify-end items-center">
            <div className="inner-block max-w-500">
              <p className="text-xl md:text-xl xl:text-35px sm:leading-45 font-light font-body_font">
                Explore the exciting world of nude cam chat and connect with
                like-minded{" "}
              </p>
              <h2 className="text-2xl md:text-4xl xl:text-50px sm:leading-75 sm:mb-0 mb-3 font-bold">
                members today!
              </h2>
              <p className="text-sm md:text-base xl:text-lg mb-4 leading-29 font-body_font">
                Discover the thrill of online chatting at Swinxter.com! Join now
                and indulge in adult chat with passionate members around the
                clock. Experience the excitement of meeting new people and
                sharing quality time together. Our Adult Chat instant messenger
                ensures you can easily hook up with new adult friends whenever
                the mood strikes. Join us now and embrace the excitement!
              </p>
              <Link className="primary_btn" to="/signup">
                Register for free now!
              </Link>
            </div>
          </div>
          <div className="right-block flex justify-center items-center">
            <div className="right-block w-full lg:w-auto">
              <img
                src="landingPage/images/young-happy-smiling-beautiful-woman-lying-bed-speaking-phone-1.png"
                className="max-w-full w-full lg:w-auto"
                alt="partner"
              />
            </div>
          </div>
        </div>
      </div>
    </section>

    <section className="hero_section2 relative">
      <img
        src="landingPage/images/women-with-device.png"
        className="w-full block object-cover inset-0 md:static"
        alt=""
      />
      <div className="static md:absolute inset-0 flex items-center justify-center">
        <div className="container pt-10 pb-20 md:pb-200px">
          <div className="inner-block text-white flex flex-col justify-center xl:justify-start items-center lg:items-start text-center xl:text-start max-w-500 me-auto ms-auto lg:ms-0 lg:me-auto">
            <p className="text-xl md:text-xl xl:text-35px leading-45 font-body_font">
              Discover the ease and flexibility
            </p>
            <h2 className="text-2xl md:text-4xl xl:text-50px leading-75 font-bold">
              of hooking up on any device!
            </h2>
            <p className="text-sm md:text-base xl:text-lg mb-4 leading-29 text-cetner lg:text-left font-body_font">
              Stay connected and never miss out on the fun with SWINXTER!
              Experience the convenience of accessing all the features you enjoy
              on your computer right from your smartphone or tablet. Browse
              Swinxter® member profiles, send email messages, view cams, and
              chat directly from your mobile device. Find hook-ups anytime,
              anywhere – it's like having a party in your pocket! Join now to
              bring the excitement with you on the go.
            </p>
            <Link className="primary_btn" to="/signup">
              Join for Free Now!
            </Link>
          </div>
        </div>
      </div>
     
    </section> <BotMessage/>
    </>
  )
}
