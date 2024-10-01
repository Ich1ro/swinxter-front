import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Context } from "../Context/context";
import ClubCard from "../components/Club/ClubCard";
import EventCard from "../components/Event/EventCard";
import TravelCard from "../components/Travel/TravelCard";
import api from "../utils/api";
import { useSelector } from "react-redux";
const Main_Home = () => {
  const [event, setEvent] = useState([]);
  const [clubs, setClubs] = useState([]);
  const [travel, setTravel] = useState([]);
  const { searchquery,setSavedCred } = useContext(Context);
  const {user} = useSelector((state)=>state.auth);

 useEffect(()=>{
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(success, error);
    } else {
      console.log("Geolocation not supported");
    }
    function success(position) {
      const latitude = position.coords.latitude;
      const longitude = position.coords.longitude;
      setSavedCred({long:longitude,lat:latitude})
    }
    function error() {
      console.log("Unable to retrieve your location");
    }
},[])

  const getEvent = async () => {
    const { data } = await api.get(`/events?q=${searchquery}`);
    const allEvents = data.data;
    const verifyEvents = allEvents.filter((event) => {
      let now = new Date();
      let eventEndDate = new Date(event.EndDate);
      return event.isverify === true && eventEndDate > now;
  });
  
    setEvent(verifyEvents.reverse());

    verifyEvents.map((el)=> console.log(el?.location))


  };
  const getClubs = async () => {
    const { data } = await api.get(
      `/search_club?q=${searchquery}`
    );
    const verifiedClubs = data.filter((club) => club.isverify === true);
    setClubs(verifiedClubs.reverse());
  };

  const getTravel = async () => {
    const { data } = await api.get(
      `/search_travel?q=${searchquery}`
    );
    const verifyTravel = data.filter((travel) => travel.isVerify === true);
    console.log(typeof(verifyTravel));
    setTravel(verifyTravel.reverse());
  };

  // const getModels = async () => {
  //   const { data } = await api.get(`${BASE_URL}/api/models?q=${searchquery}`);
  //   setModels(data.data);
  // };

  useEffect(() => {
    getEvent();
    getClubs();
    // getModels();
    getTravel();
  }, [searchquery]);

  console.log(typeof(travel));


  return (
    <div className="home_page bg-black py-8 px-6 rounded-2xl">
      {
        user.payment.membership?
        <>
          <div className="mb-20">
            <div className="flex justify-between flex-wrap gap-5 items-center mb-5 sm:mb-8">
              <h3 className="text-2xl sm:text-5xl leading-none font-bold">
                Events
              </h3>
              {
                (event.length === 0?null:
                  <Link to="/event-page" className="primary_btn !text-sm sm:!text-xl">
                    View More
                  </Link>)
              }
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 2xl:grid-cols-4 gap-6">
              {event.length === 0?<p>No event available right now !</p>:event.slice(0, 6).map((el, i) => (
                <div className="h-full bg-light-grey rounded-2xl">
                <EventCard key={i} event={el} />
                </div>
              ))}
            </div>
          </div>                   
          {clubs.length === 0 ? ("") : (
            <div className="mb-20">
              <div className="flex justify-between flex-wrap gap-5 items-center mb-5 sm:mb-8">
                <h3 className="text-2xl sm:text-5xl leading-none font-bold">
                  Clubs
                </h3>
                <Link to="/club-page" className="primary_btn !text-sm sm:!text-xl">
                  View More
                </Link>
              </div>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-4 gap-6">
                {clubs.slice(0, 6).map((el, i) => (
                  <ClubCard key={i} clubs={el} />
                ))}
              </div>
            </div>
          )}
        </>
        :
        <div style={{height: "400px", display: "flex", justifyContent: "center", alignItems: "center", fontSize: "24px"}}>
          <h1>You need to buy a membership to access the feature</h1>
        </div>
      }
    </div>
  );
};
export default Main_Home;




{/* travel section starts  */}
      {/* {travel.length === 0 ? (
        ""
      ) : (
        <div className="mb-20">
          <div className="flex justify-between flex-wrap gap-5 items-center mb-5 sm:mb-8">
            <h3 className="text-2xl sm:text-5xl leading-none font-bold">
              Travel
            </h3>
            <Link
              to="/travel-page"
              className="primary_btn !text-sm sm:!text-xl"
            >
              View More
            </Link>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {travel.slice(0, 6).map((el, i) => (
              <TravelCard key={i} travel={el} />
            ))}
          </div>
        </div>
      )} */}