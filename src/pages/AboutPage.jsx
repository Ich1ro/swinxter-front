import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const AboutPage = () => {
  const {isAuthenticated} = useSelector((state)=>state.auth);
  return (
    <div className="bg-black-20">
      <div className="min-h-[700px] relative flex items-center justify-center z-1">
        <img
          src="images/about-ban.png"
          alt="about-ban"
          className="absolute top-0 left-0 w-full h-full -z-1 object-cover"
        />
        <div className="container mx-auto text-center">
          <h3 className="text-4xl font-secondary_font mb-2">
            Join us now to connect with like-minded individuals and experience a
            whole new
          </h3>
          <p className="text-5xl font-bold mb-5">world of possibilities!</p>
          {!isAuthenticated ? (
            <Link className="primary_btn" to="/signup">
              JOIN NOW!
            </Link>
          ) : (
            ""
          )}
        </div>
      </div>
      <section className="text-with-image  text-white py-6 md:py-8 lg:py-20 meet-member relative z-0">
        <div className="container mx-auto">
          <div className="flex flex-wrap gap-y-10 pt-10 lg:pt-0">
            <div className="w-full lg:w-2/5 left-block flex justify-center text-center lg:text-start items-center">
              <div className="inner-block max-w-[415px]">
                <p className="text-2xl md:text-3xl lg:text-35px lg:leading-45 font-light max-w-[270px] mb-5 mx-auto lg:mx-0 ">
                  Welcome to Swinxter
                </p>
                <p className="text-sm md:text-base xl:text-lg mb-5 lg:leading-29 mx-auto lg:mx-0 font-body_font">
                  where embracing your adult self is celebrated! We encourage
                  you to live life on your terms, without worrying about
                  judgment from others. Our social networking platform treats
                  you like the independent, expressive individual you are. So,
                  go ahead and express yourself freely, knowing that you are
                  part of a community that values your uniqueness. Join us now
                  and experience the true joy of being an adult!
                </p>
                {!isAuthenticated ? (
                  <Link className="primary_btn" to="/signup">
                    JOIN NOW!
                  </Link>
                ) : (
                  ""
                )}
              </div>
            </div>
            <div className="w-full lg:w-3/5 right-block flex justify-center items-center rounded-2xl lg:rounded-58">
              <div className="right-block w-full rounded-2xl lg:rounded-58">
                <img
                  src="landingPage/images/couple-love-kissing-bed-home.png"
                  className="w-full rounded-2xl lg:rounded-58"
                  alt="partner"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="my-5 mb-0">
        <div className="container mx-auto">
          <div className="gradient rounded-50px p-[2px] text-center">
            <div className="rounded-50px bg-black p-5 py-14">
              <h3 className="text-2xl lg:text-4xl font-light mb-8 max-w-5xl mx-auto">
                Since 2023, our mission at Swinxter has been to connect you with
                intriguing, exciting, and fun individuals who share your
                interests.
              </h3>
              <p className="text-base leading-8 lg:text-lg mb-8 max-w-6xl mx-auto font-body_font">
                We understand that sexuality is diverse and personal, and we
                provide a world where you can freely embrace your authentic
                self. Our goal is to offer opportunities and experiences that
                allow you to live life passionately and explore your sensual
                side to the fullest. At Swinxter, we bring together a community
                of like-minded individuals who cherish the freedom of expressing
                their desires and passions. Joining our platform means becoming
                part of a wild yet caring community where passion, exploration,
                and meaningful engagement are celebrated. Find your dream lover
                tonight, unleash your imagination, and connect with fellow
                members to elevate your passion to new heights. We believe in
                celebrating your uniqueness, embracing your gender, appearance,
                and turn-ons. Our platform is here for you to level up your
                sexual life and experience the joy of embracing life
                passionately. This is just the beginning of a passionate
                friendship. Welcome to your new life of exploration and
                fulfilment. Welcome to Swinxter!
              </p>
              {!isAuthenticated ? (
                <Link className="primary_btn" to="/signup">
                  JOIN NOW!
                </Link>
              ) : (
                ""
              )}
            </div>
          </div>
        </div>
      </section>
      <div className="">
        <div className="audit-dating__block relative py-4 md:py-16 container mx-auto">
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
    </div>
  );
};

export default AboutPage;
