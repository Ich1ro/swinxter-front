import { getPreciseDistance } from "geolib";
import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Context } from "../Context/context";
import api from "../utils/api";
import Pagination from "../components/Pagination/Pagination";
import ClubCard from "../components/Club/ClubCard";
import { MidLoading } from "../components/M_used/Loading";
import { useSelector } from "react-redux";

const ClubPage = () => {
  const [clubs, setClubs] = useState([]);
  const [club, setNew] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [filterDropdown, setFilterDropdown] = useState(false);
  const [loading, setLoading] = useState(false);
  const [recordsPerPage] = useState(8);
  const { searchquery,savedCred} = useContext(Context);
  const navigate = useNavigate();
  const {user} = useSelector((state)=>state.auth);
  const [filter, setFilter] = useState({
    public: false,
    private: false,
    location: "",
    distance: "",
  })

  const handlereset=()=>{
    setFilter({
      public: false,
    private: false,
    location: "",
    distance: "",
    })
    setFilterDropdown(false)
    setClubs(club)
  }

  const getClubs = async () => {
    setLoading(true)
    const { data } = await api.get(`/search_club?q=${searchquery}`);
    setLoading(false)
    const allclubs=data
    const verifiedClubs = allclubs.filter((el) => el.isverify === true);
    const newestPostFirst = verifiedClubs.reverse();
    setClubs(newestPostFirst);
    setNew(newestPostFirst)
  };

  useEffect(() => {
    getClubs();
  
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

  const calculateDistance = (fLong, sLong, fLat, sLat) => {
    var pdis = getPreciseDistance(
      { latitude: Number(fLat), longitude: Number(fLong) },
      { latitude: Number(sLat), longitude: Number(sLong) }
    );
    const factor = 0.621371
    return ((pdis / 100) * factor).toFixed(2);
  };


  const handleCheck = (e) => {
 
    e.preventDefault()
    let filtered = club;
  
    if(filter.public && filter.private){
      setClubs(filtered)
    }
    else{

    if (filter.public) {
      filtered = filtered.filter((el) => el.clubtype === "Public Place");
  
    }
    if (filter.private) {
      filtered = filtered.filter((el) => el.clubtype === "Private Place");
 
    }

  



if (filter.location) {

  filtered = filtered.filter((el) =>
    el.location?.display_name === filter.location
  );
}
   
    if (filter.distance) {
      const userLatitude = savedCred?.lat
      const userLongitude = savedCred?.long;
  

     
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
   
    setClubs(filtered);
  }
  
    setFilterDropdown(false)
  }

 
  const lastPostIndex = currentPage * recordsPerPage;
  const firstPostIndex = lastPostIndex - recordsPerPage;
  const currentPost = clubs.slice(firstPostIndex, lastPostIndex);
 
  return (
    <div className="bg-black pt-0 sm:pt-8 py-8 px-6 rounded-2xl rounded-r-none min-h-full">
        {
        user.payment?.membership?
        <>
        { !loading ?<>
        <div className="sticky top-0 bg-black z-[9] py-5 flex justify-between">
          <div className="flex justify-end items-center text-center flex-wrap gap-2 sm:gap-5 flex-1">
    
            <div className="flex gap-8 items-center">
              <div className="inline-flex gap-1 items-center cursor-pointer" onClick={() => navigate("/create_club")}>
                <img
                  src="images/add-icon.png"
                  alt="add-icon"
                  className="max-w-full cursor-pointer w-5"
                  
                />
                <span>Add Club</span>
              </div>
              <div className="inline-flex gap-1 items-center relative">
              <span className="inline-flex gap-1 items-center cursor-pointer" onClick={() => setFilterDropdown(!filterDropdown)}>
                <img
                  src="images/filter-icon.png"
                  alt="filter-icon"
                  className="max-w-full cursor-pointer w-5"
                  
                />
                <span>Filter</span>
                </span>
                <div className={`filter_dropdown absolute w-[250px] right-0 bg-[#2A2D37] top-full ${filterDropdown ? 'Active' : ''}`}>
                  <div className="flex justify-end text-red">
                    <button onClick={handlereset}>Reset</button>
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
              
                    <div className="distance_filter">
                      <label htmlFor="distance" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">DISTANCE</label>
                      {filter?.distance}miles
                      <input type="range" className="w-full mb-6 h-[3px]" id="distance" name="distance"
                        value={filter.distance}
                        onChange={handleChange}
                        min={200} max={1050} />
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
        <div className="grid sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {currentPost.map((el, i) => (
            <ClubCard key={i} clubs={el} />
          ))}
        </div>
        <Pagination
          totalPosts={clubs.length}
          postsPerPage={recordsPerPage}
          setCurrentPage={setCurrentPage}
          currentPage={currentPage}
        /> </>: <MidLoading/> }
        </>
        :
        <div style={{height: "400px", display: "flex", justifyContent: "center", alignItems: "center", fontSize: "24px"}}>
          <h1>You need to buy a membership to access the feature</h1>
        </div>
      }
      </div>
    );
};

export default ClubPage;
