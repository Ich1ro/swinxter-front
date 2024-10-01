import axios from "axios";
import { getPreciseDistance } from "geolib";
import React, { useContext, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import Pagination from "../components/Pagination/Pagination";
import EventCard from "../components/Event/EventCard";
import api from "../utils/api";
import { Context } from "../Context/context";
import { MidLoading } from "../components/M_used/Loading";
import { useSelector } from "react-redux";

const EventPage = () => {
  const [event, setEvent] = useState([]);
  const [events, setNew] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [filterDropdown, setFilterDropdown] = useState(false);
  const [recordsPerPage] = useState(8);
  const [loading,setLoading]=useState(false);
  const { searchquery,savedCred} = useContext(Context);
  const navigate = useNavigate();
  const [filter, setFilter] = useState({
    public: false,
    private: false,
    open_for: "",
    location: "",
    date: "",
    distance: "",
  })
  const {user} = useSelector((state)=>state.auth);


  const getEvent = async () => {
    setLoading(true)
    const { data } = await api.get(`/events?q=${searchquery}`);
    setLoading(false)
    const allEvents = data.data;
    const verifiedEvents = allEvents.filter((event) => {
      let now = new Date();
      let eventEndDate = new Date(event.EndDate);
      return event.isverify === true && eventEndDate > now;
    });
    const newestPostFirst = verifiedEvents.reverse();
    setEvent(newestPostFirst);
    setNew(newestPostFirst)
  };

  // ____________CALculate the distance_______

  const calculateDistance = (fLong, sLong, fLat, sLat) => {
    var pdis = getPreciseDistance(
      { latitude: Number(fLat), longitude: Number(fLong) },
      { latitude: Number(sLat), longitude: Number(sLong) }
    );
    const factor = 0.621371
    return ((pdis / 100) * factor).toFixed(2);
  };


  useEffect(() => {
    getEvent();
  }, [searchquery]);


  const handleChange = (e) => {
    const { value, name } = e.target;
    setFilter((prevFilter) => ({
      ...prevFilter,
      [name]: value,
    }));
   
  }

  const Handlepublicprivate = (e) => {
    const { checked, name } = e.target;
    setFilter((prevFilter) => ({
      ...prevFilter,
      [name]: checked,
    }));
   
  }

  const handleCheck = (e) => {
    e.preventDefault()
    let filtered = events;
  
    if(filter.public && filter.private){
      setEvent(filtered)
    }
    else{
    if (filter.public) {
      filtered = filtered.filter((event) => event.type === "Public Event");
      console.log(filtered)
    }
    if (filter.private) {
      filtered = filtered.filter((event) => event.type === "Private Event");
 
    }
    if (filter.open_for) {
    let data=[];
    filtered.forEach((event) => event.accepted_type.map((el)=> {
    if(el === filter.open_for){
      data.push(event);
    }}
    ));
    filtered = data;
    }
    if (filter.location) {
      filtered = filtered.filter((event) =>event.location?.display_name===filter.location
   
      );
    }
    if (filter.date) {
    
      filtered = filtered.filter((event) => {
        const formattedDate = `${event.Startdate.split('T')[0]}`;
        return formattedDate === filter.date;
      }
      )
    }
    if (filter.distance) {
      const userLatitude = savedCred?.lat
      const userLongitude = savedCred?.long;
      const location = filtered.map((event) => event?.location)

      const filteredByDistance = filtered.filter((event) => {
        const eventDistance = calculateDistance(
          userLongitude,
          event.location.lon,
          userLatitude,
          event.location.lat
        );
        
const Distance=eventDistance.slice(0,3)
        return Distance <= filter.distance;
      });
      // Update the filtered events
      filtered = filteredByDistance;
    }
    setEvent(filtered);
  }
    setFilterDropdown(false)
  }

const handleReset=()=>{
  setFilter({
    public: false,
    private: false,
    open_for: "",
    location: "",
    date: "",
    distance: "",
  })
  setEvent(events)
  setFilterDropdown(false)
}

  const lastPostIndex = currentPage * recordsPerPage;
  const firstPostIndex = lastPostIndex - recordsPerPage;
  const currentPost = event.slice(firstPostIndex, lastPostIndex);

  return (
    <div className="bg-black pt-0 sm:pt-8 py-8 px-6 rounded-2xl xl:rounded-r-none min-h-full">
      {
        user.payment?.membership?
        <>
          {!loading ?<>
          <div className="sticky top-0 bg-black z-[9] py-5 flex justify-between">
            <div className="flex flex-wrap gap-2 sm:gap-5 flex-1 justify-end">
          
              <div className="flex gap-8 items-center">
                <div className="inline-flex gap-1 items-center cursor-pointer" onClick={() => navigate("/create_event")}>
                  <img
                    src="images/add-icon.png"
                    alt="add-icon"
                    className="max-w-full cursor-pointer w-5"
                    
                  />
                  <span>Add Event</span>
                </div>
                <div className="inline-flex gap-1 items-center relative " >
                  <span className="inline-flex gap-1 items-center cursor-pointer" onClick={() => setFilterDropdown(!filterDropdown)}>
                  <img
                    src="images/filter-icon.png"
                    alt="filter-icon"
                    className="max-w-full cursor-pointer w-5"
                  />
                  
                  <span>Filter</span>
                  </span>
                  <div className={`filter_dropdown absolute w-[250px] right-0 bg-[#2A2D37] top-full ${filterDropdown ? 'Active' : ''}`}>
                    <div  className="flex justify-end text-red">
                    <button onClick={handleReset}>Reset</button>
                    </div>
                  
                    <form>
                      <div className="filter_dropbox">
                        <div className="filter_item">
                          <input type="checkbox"
                            id="private"
                            checked={filter.private}
                            name="private"
                            onChange={Handlepublicprivate}
                          />

                          <label className="toggle_switch" htmlFor="private">
                            <span className="toggle_circle"></span>
                          </label>
                          <span>Private Event</span>
                        </div>

                        <div className="filter_item">
                          <input type="checkbox"
                            id="public"
                            name="public"
                            checked={filter.public}
                            onChange={Handlepublicprivate}
                          />
                          <label className="toggle_switch" htmlFor="public">
                            <span className="toggle_circle"></span>
                          </label>
                          <span>Public Event</span>
                        </div>
                      </div>
                      <div className="my-4 mb-6">
                        <label for="cars">Open For :</label>
                        <select name="open_for" id="open_for"
                          value={filter.open_for}
                          onChange={handleChange}
                          className="w-full mt-2 py-2 px-3 border border-black bg-[#2A2D37] rounded-[5px]">
                            <option value=''>Please Select</option>
                          <optgroup label="Single">
                            <option value="M">Male</option>
                            <option value="F">Female</option>
                            <option value="T">Transgender</option>
                          </optgroup>
                          <optgroup label="Couple">
                            <option value="MM">MaleMale</option>
                            <option value="MF">MaleFemale</option>
                            <option value="FF">FemaleFemale</option>
                          </optgroup>
                        </select>
                      </div>
                      <div className="distance_filter">
                        <label htmlFor="distance" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">DISTANCE</label>
                        {filter?.distance}miles
                        <input type="range" className="w-full mb-6 h-[3px]" id="distance" name="distance"
                          value={filter.distance}
                          onChange={handleChange}
                          min={200} max={1050} />
                      </div>
                      <div>
                        <label htmlFor="date">DATE</label>
                        <input type="date" className="bg-transparent mt-2 border border-black py-2 px-3 w-full"
                          placeholder="Date" id="date" value={filter.date} name="date" onChange={handleChange} />
                      </div>
                      <div className="mt-5">
                        <label htmlFor="location">LOCATION</label>
                        <input type="text" id="location" className="outline-none rounded-[30px] mt-2 bg-white text-black border border-black py-2 px-3 w-full" placeholder=""
                          name="location"
                          value={filter.location}
                          onChange={handleChange} />
                        <input type="submit" id="submit"
                          className="outline-none rounded-[30px] mt-2 bg-[#0075ff] text-white border-none py-2 px-3 w-full cursor-pointer"
                          value="Ok"
                          onClick={handleCheck} />
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 2xl:grid-cols-4 gap-5">
            {currentPost.length>0?(currentPost.map((el, i) => (
              <>
              <div className="h-full bg-light-grey rounded-2xl" key={i}>
              <EventCard key={i} event={el} />
            </div>
            {(i!==7 && ((i + 1) % 4 === 0)) && (
              <div className="event_promo_ban">
                {/* Banner image */}
                <img className="w-full" src="images/banner.jpg" alt="Banner" />
              </div>
            )}
            </>
            ))):<p>No event available right now !</p>}
          </div>
          {currentPost.length>0?
          <Pagination
            totalPosts={event.length}
            postsPerPage={recordsPerPage}
            setCurrentPage={setCurrentPage}
            currentPage={currentPage}
          />:null }
          </>
          : <MidLoading/>}
        </>
      :
      <div style={{height: "400px", display: "flex", justifyContent: "center", alignItems: "center", fontSize: "24px"}}>
        <h1>You need to buy a membership to access the feature</h1>
      </div>
      }
    </div>
  );
};

export default EventPage;
