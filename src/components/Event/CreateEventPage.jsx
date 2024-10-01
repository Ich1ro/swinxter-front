import axios from "axios";
import Multiselect from "multiselect-react-dropdown";
import React, { useEffect, useRef, useState } from "react";
import { FaArrowLeft } from "react-icons/fa6";
import {
  IoCloseCircleSharp
} from "react-icons/io5";
import {
  geocodeByAddress,
  getLatLng,
} from "react-places-autocomplete";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
import api from "../../utils/api";
import { useSelector } from "react-redux";
import Loading from "../M_used/Loading";
import { BackBtn } from "../M_used/BackBtn";
const CreateEventPage = () => {
  const DEBOUNCE_DELAY = 300
  const [event, setEvent] = useState({
    event_name: "",
    StartDate: "",
    EndDate: "",
    Location: "",
    Description: "",
    event_type: "",  contact: "",
  });
  const [selectedOptions, setSelectedOptions] = useState();
  const [image, setImage] = useState();
  const [video, setVideo] = useState([]);
  const [eventimages, setEventmages] = useState([]);
  const [areaname, setAreaName] = useState([]);
  const options = ["M", "F", "MF", "MM", "FF", "T"];
  const [selectedImage, setselectedImage] = useState([]);
  const [coverImage, setCoverImage] = useState(null);
  const [selectedVideo, setselectedVideo] = useState(null);
  const [selectlocation, setSelectedLocation] = useState([]);
  const navigate = useNavigate();
  const currentDate = new Date().toISOString().slice(0, 16);
  const {user} = useSelector((state)=>state.auth);
  const [userInfo,setUserInfo]=useState(user);
  const [loading,setLoading]=useState(false)
  const [showResults, setShowResults] = useState(false);

  const debouncedSearch = useRef(null);
  useEffect(()=>{
    setUserInfo(user)
  },[])
  function handleSelect(data) {
    setSelectedOptions(data);
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEvent({ ...event, [name]: value });
  };
 console.log(event)
  const handleLocation = (e) => {
    const value = e.target.value;
    setEvent({ ...event, ['Location']: value });
    setShowResults(true);

    if (debouncedSearch.current) {
      clearTimeout(debouncedSearch.current);
    }

    debouncedSearch.current = setTimeout(async () => {
      try {
        const url = value
          ? `https://us1.locationiq.com/v1/search?key=pk.9f0f98671dda49d28f0fdd64e6aa2634&q=${value}&format=json`
          : '';

        if (url) {
          const res = await axios.get(url);
          setAreaName(res.data);
        } else {
          setAreaName([]);
        }
      } catch (err) {
        console.log(err);
      }
    }, DEBOUNCE_DELAY);
  };

  const handleResultClick = (result) => {
    console.log(result)
    setEvent({ ...event, ['Location']: (result) });
    setShowResults(false);
  };

  const handleImageChange = (e) => {
    const file = Array.from(e.target.files);
    setselectedImage([...selectedImage, e.target.files[0]]);
    if (!file) {
      return;
    } else {
      setEventmages([...eventimages, URL.createObjectURL(e.target.files[0])]);
    }
  };
  
  const handleCoverImage = (e) => {
    const file = e.target.files[0];
    setCoverImage(file);
    if (!file) {
      return;
    } else {
      setImage(URL.createObjectURL(e.target.files[0]));
    }
  };

  const handleVideoChange = (e) => {
    const file = Array.from(e.target.files);
    console.log(file, "file", URL.createObjectURL(e.target.files[0]));
    setselectedVideo(file);
    if (!file) {
      return;
    } else {
      setVideo([...video, URL.createObjectURL(e.target.files[0])]);
    }
  };

  const handleEventimages = (index) => {
    const update = eventimages.filter((el, i) => i !== index);
    setEventmages(update);
  };

  const handlevideo = (index) => {
    const update = video.filter((el, i) => i !== index);
    setVideo(update);
  };
  const handleCreateEvent = async (e) => {
    e.preventDefault();
    let formData = new FormData();
    if (selectedImage) {
      selectedImage.forEach((image) => formData.append("images", image));
    }
    if (selectedVideo) {
      selectedVideo.forEach((video) => formData.append("videos", video));
    }
 
    formData.append("eventName", event.event_name);
    formData.append("Startdate", event.StartDate);
    formData.append("EndDate", event.EndDate);
    formData.append("location", JSON.stringify(event.Location));
    formData.append("description", event.Description);
    formData.append("mainImage", coverImage);
    formData.append("contact", event.contact);
    formData.append("type", event.event_type);
    formData.append("userId", userInfo._id);
    formData.append("accepted_type", JSON.stringify(selectedOptions));
    setLoading(true)
    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    };
    try {
      const data = await api.post(`/createEvent`, formData,config);
      if (!data) {
        setLoading(false)
        toast.error("🦄 Failed to Create Event!", {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
      } else {
        setLoading(false)
        toast.success("Event Created Successfully!", {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
        setEvent({
          event_name: "",
          Date: "",
          Location: "",
          Description: "",
          event_type: "",
        });
        setselectedImage(null);
        setselectedVideo(null);
        setCoverImage(null);
        setSelectedOptions();
        navigate("/event-page");
      }
    } catch (error) {
      toast.error("Something went wrong!")
      setLoading(false)
      console.log(error);
    }
  };
  
  return (
    <div className="bg-white rounded-40px">
     
      <div className="text-center p-5 py-10 text-black px-10 relative">
      <BackBtn/>
        <h3 className="text-2xl sm:text-4xl mb-2">
          Event registration
        </h3>
  
    
        <p className="text-lg">Create your Event</p>
      </div>
      <div className="flex flex-wrap bg-black rounded-40px ">
        <div className="w-full md:w-3/5 xl:w-full 2xl:w-3/5 ">
          
          <div className="sign-up__form flex flex-col justify-center gap-30 py-6 px-6 lg:py-11 lg:px-14">
            <h2 className="text-white text-2xl sm:text-3xl xl:text-5xl text-center xl:text-start font-bold mb-6">
              Find Your Date
            </h2>

            <form
              className="flex flex-col justify-center gap-y-4 sm:gap-y-6"
              autocomplete="off"
            >
              <div className="flex flex-wrap rounded-md input_field_2">
                <label
                  htmlFor="event_name"
                  className="rounded-l-md w-full md:w-[120px] xl:w-[195px] sm:h-[49px] flex items-center justify-start sm:px-2 lg:px-4 text-sm mb-1 sm:mb-0 md:text-text-xs xl:text-lg text-white  font-normal leading-5 xl:leading-29 text-center 
                                            lg:text-start"
                >
                  Event Name
                </label>
                <input
                  type="text"
                  id="event_name"
                  name="event_name"
                  onChange={(e) => handleChange(e)}
                  value={event.event_name}
                  autocomplete="off"
                  className="bg-black border md:rounded-l-none rounded-md md:border-none md:border-l-2 md:rounded-r-md border-orange focus:outline-none focus-visible:none w-full md:w-[calc(100%-120px)] xl:w-[calc(100%-195px)] h-[49px] text-gray font-normal xl:text-lg rounded-r-md text-sm px-2 xl:px-4 py-2.5 text-start placeholder:text-lg placeholder:text-gray items-center flex justify-between"
                  required
                />
              </div>
              {/* <p>{formErrors.email}</p> */}
              <div className="flex flex-wrap rounded-md input_field_2">
                <label
                  htmlFor="StartDate"
                  className="rounded-l-md w-full md:w-[120px] xl:w-[195px] sm:h-[49px] flex items-center justify-start sm:px-2 lg:px-4 text-sm mb-1 sm:mb-0 md:text-text-xs xl:text-lg text-white  font-normal leading-5 xl:leading-29 text-center 
                                            lg:text-start"
                >
                  Start Date
                </label>
                <input
                  type="datetime-local"
                  id="StartDate"
                  name="StartDate"
                  onChange={(e) => handleChange(e)}
                  value={event.StartDate}
                  min={currentDate}
                  autocomplete="off"
                  className="bg-black border md:rounded-l-none rounded-md md:border-none md:border-l-2 md:rounded-r-md border-orange focus:outline-none focus-visible:none w-full md:w-[calc(100%-120px)] xl:w-[calc(100%-195px)] h-[49px] text-gray font-normal xl:text-lg rounded-r-md text-sm px-2 xl:px-4 py-2.5 text-start placeholder:text-lg placeholder:text-gray items-center flex justify-between"
                  placeholder="name@flowbite.com"
                  required
                />
                {/* <span className="calendar_icon"><FaRegCalendarAlt /></span> */}
              </div>
              <div className="flex flex-wrap rounded-md input_field_2">
                <label
                  htmlFor="EndDate"
                  className="rounded-l-md w-full md:w-[120px] xl:w-[195px] sm:h-[49px] flex items-center justify-start sm:px-2 lg:px-4 text-sm mb-1 sm:mb-0 md:text-text-xs xl:text-lg text-white  font-normal leading-5 xl:leading-29 text-center 
                                            lg:text-start"
                >
                  End Date
                </label>
                <input
                  min={event?.StartDate || currentDate}
                  type="datetime-local"
                  id="EndDate"
                  name="EndDate"
                  onChange={(e) => handleChange(e)}
                  value={event.EndDate}
                  autocomplete="off"
                  className="bg-black border md:rounded-l-none rounded-md md:border-none md:border-l-2 md:rounded-r-md border-orange focus:outline-none focus-visible:none w-full md:w-[calc(100%-120px)] xl:w-[calc(100%-195px)] h-[49px] text-gray font-normal xl:text-lg rounded-r-md text-sm px-2 xl:px-4 py-2.5 text-start placeholder:text-lg placeholder:text-gray items-center flex justify-between"
                  placeholder="name@flowbite.com"
                  required
                />
                {/* <span className="calendar_icon"><FaRegCalendarAlt /></span> */}
              </div>
             
              <div className="flex flex-wrap rounded-md input_field_2">
                <label
                  htmlFor="Location"
                  className="rounded-l-md w-full md:w-[120px] xl:w-[195px] sm:h-[49px] flex items-center justify-start sm:px-2 lg:px-4 text-sm mb-1 sm:mb-0 md:text-text-xs xl:text-lg text-white  font-normal leading-5 xl:leading-29 text-center 
                                            lg:text-start"
                >
                  Location
                </label>
                <input
                  type="text"
                  id="Location"
                  name="Location"
                  onChange={(e) => handleLocation(e)}
                  value={event.Location?.display_name}
                  autocomplete="off"
                  className="bg-black border md:rounded-l-none rounded-md md:border-none md:border-l-2 md:rounded-r-md border-orange focus:outline-none focus-visible:none w-full md:w-[calc(100%-120px)] xl:w-[calc(100%-195px)] h-[49px] text-gray font-normal xl:text-lg rounded-r-md text-sm px-2 xl:px-4 py-2.5 text-start placeholder:text-lg placeholder:text-gray items-center flex justify-between"
                  required
                />
                <div>
                {showResults && (
        <ul>
          {areaname.map((result) => (
            <li style={{padding:"8px",width:"100%"}} key={result.place_id} onClick={() => handleResultClick(result)}>
              {result.display_name}
            </li>
          ))}
        </ul>
      )}
                </div>
              </div>
              <div className="flex flex-wrap rounded-md input_field_2">
                <label
                  htmlFor="contact"
                  className="rounded-l-md w-full md:w-[120px] xl:w-[195px] sm:h-[49px] flex items-center justify-start sm:px-2 lg:px-4 text-sm mb-1 sm:mb-0 md:text-text-xs xl:text-lg text-white  font-normal leading-5 xl:leading-29 text-center 
                                            lg:text-start"
                >
                  Contact Info
                </label>
                <input
                  type="text"
                  id="contact"
                  name="contact"
                  onChange={handleChange}
                  value={event.contact}
                  autocomplete="off"
                  className="bg-black border md:rounded-l-none rounded-md md:border-none md:border-l-2 md:rounded-r-md border-orange focus:outline-none focus-visible:none w-full md:w-[calc(100%-120px)] xl:w-[calc(100%-195px)] h-[49px] text-gray font-normal xl:text-lg rounded-r-md text-sm px-2 xl:px-4 py-2.5 text-start placeholder:text-lg placeholder:text-gray items-center flex justify-between"
                  required
                />
              </div>
              <div className="flex flex-col gap-30">
      <label
        htmlFor="Description"
        className="gradient w-full h-[49px] flex items-center justify-center text-lg text-white font-normal leading-29 rounded-md mb-6"
      >
        Description
      </label>
      <div className="p-[2px] gradient rounded-md">
        <textarea
          id="Description"
          rows={3}
          name="Description"
          onChange={(e) => handleChange(e)}
          value={event.Description}
          className="bg-black focus:outline-none focus-visible:none w-full border-gradient3 text-gray font-normal xl:text-lg rounded-md text-sm px-2 xl:px-4 py-2.5 text-center md:text-start items-center flex justify-between"
          required
          style={{ whiteSpace: 'pre-line' }}
        ></textarea>
      </div>
    </div>
              <div className="grid sm:grid-cols-2 gap-4 items-start">
                <label className="flex w-full bg-gray-900 py-[10px] px-4 text-lg items-center cursor-pointer rounded-md">
                  <span className="w-6 block mr-2">
                    <img src="images/gallery-icon.png" alt="gallery-icon" />
                  </span>
                  Upload Cover Image
                  <input
                    type="file"
                    className="hidden"
                    onChange={(e) => handleCoverImage(e)}
                  />
                </label>

                <div className="relative w-full">
                {image && (
                  <div className="preview_img relative z-[1] bg-white/50 rounded-md">
                    <img
                      className="w-full object-contain max-h-[100px]"
                      src={image}
                    />
                    
                      <span
                        className="preview_close absolute top-0 transform
                     translate-x-[40%] -translate-y-[50%] right-0 object-contain text-xl z-[1] w-5
                      h-5 rounded-full bg-orange text-black"
                        onClick={(e) => setImage("")}
                      >
                        <IoCloseCircleSharp />
                      </span>
                  </div>
                  )}
                </div>

                <label className="flex w-full bg-gray-900 py-[10px] px-4 text-lg items-center cursor-pointer rounded-md">
                  <span className="w-6 block mr-2">
                    <img src="images/gallery-icon.png" alt="gallery-icon" />
                  </span>
                  Upload Event Images
                  <input
                    type="file"
                    multiple
                    className="hidden"
                    onChange={(e) => handleImageChange(e)}
                  />
                </label>

                <div className="gap-2 preview_img_wrapper">
                  {eventimages.map((el, i) => (
                    <>
                      <div
                        key={i}
                        className="preview_img relative z-[1] bg-white/50 rounded-md"
                      >
                        <img
                          className="w-full object-contain max-h-[100px]"
                          src={el}
                        />
                        {eventimages && (
                          <span
                            className="preview_close absolute top-0 transform translate-x-[40%] -translate-y-[50%] right-0 object-contain text-xl z-[1] w-5 h-5 rounded-full bg-orange text-black"
                            onClick={() => handleEventimages(i)}
                          >
                            <IoCloseCircleSharp />
                          </span>
                        )}
                      </div>
                    </>
                  ))}
                </div>

                <label className="flex w-full bg-gray-900 py-[10px] px-4 text-lg items-center cursor-pointer rounded-md">
                  <span className="w-6 block mr-2">
                    <img
                      src="images/video-upload-icon.png"
                      alt="gallery-icon"
                    />
                  </span>
                  Upload Event Videos
                  <input
                    type="file"
                    id="videoUpload"
                    multiple
                    className="hidden"
                    onChange={(e) => handleVideoChange(e)}
                  />
                </label>

                <div>
                  {video.map((el, i) => (
                    <div
                      key={i}
                      className="preview_img relative z-[1] bg-white/50 rounded-md"
                    >
                      <video src={el} width="750" height="500" controls></video>
                      {video && (
                        <span
                          className="preview_close absolute top-0 transform translate-x-[40%] -translate-y-[50%] right-0 object-contain text-xl z-[1] w-5 h-5 rounded-full bg-orange text-black"
                          onClick={() => handlevideo(i)}
                        >
                          <IoCloseCircleSharp />
                        </span>
                      )}
                    </div>
                  ))}
                </div>
              </div>
              <p className="text-lg">TYPE *</p>
              <div className="radio_btn_wrapper">
                <div className="radio_field">
                  <input
                    type="radio"
                    id="private_place"
                    className="hidden"
                    name="event_type"
                    value="Private Event"
                    onChange={handleChange}
                    checked={event.event_type === "Private Event"}
                  />
                  <label htmlFor="private_place">
                    <span className="radio_circle"></span>
                    <span className="radio_text">Private Event</span>
                  </label>
                </div>
                <div className="radio_field">
                  <input
                    type="radio"
                    id="public_place"
                    className="hidden"
                    name="event_type"
                    value="Public Event"
                    onChange={handleChange}
                    checked={event.event_type === "Public Event"}
                  />
                  <label htmlFor="public_place">
                    <span className="radio_circle"></span>
                    <span className="radio_text">Public Event</span>
                  </label>
                </div>
                <div className="radio_field">
                  <input
                    type="radio"
                    id="virtual_date"
                    className="hidden"
                    name="event_type"
                    value="Virtual Event"
                    onChange={handleChange}
                    checked={event.event_type === "Virtual Event"}
                  />
                  <label htmlFor="virtual_date">
                    <span className="radio_circle"></span>
                    <span className="radio_text">Virtual Event</span>
                  </label>
                </div>
              </div>

              {/* <p>{formErrors.introduction}</p> */}
              {/* <Select
                // placeholder={"Select people type"}
                value={selectedOptions}
                options={options}
                onChange={handleSelect}
                isSearchable={true}
                isMulti
              /> */}
              <Multiselect
                options={options} // Options to display in the dropdown
                selectedValues={selectedOptions} // Preselected value to persist in dropdown
                onSelect={handleSelect} // Function will trigger on select event
                onRemove={handleSelect}
                // displayValue="label" // Property name to display in the dropdown options
                isObject={false}
                placeholder="Welcome For"
                style={{
                  chips: {
                    background: "orange",
                  },
                  multiselectContainer: {
                    color: "black",
                  },
                  searchBox: {
                    border: "1px solid orange",
                    // "border-bottom": "1px ",
                    "border-radius": "5px",
                  },
                }}
              />
               {!loading?  <button
                className="gradient !py-3 w-full !text-lg xl:!text-25px capitalize !font-bold flex justify-center items-center text-white rounded-xl primary_btn"
                onClick={handleCreateEvent}
              >
                Submit
              </button>  :
               <Loading/>}
            </form>
          </div>
        </div>
        <div className="md:w-2/5 xl:w-full 2xl:w-2/5">
          <img
            src="images/create-event-page.png"
            alt="create-event"
            className="block h-auto w-full rounded-b-40px md:rounded-b-none md:rounded-br-40px md:rounded-r-40px xl:rounded-b-40px xl:rounded-tr-none 2xl:rounded-l-none 2xl:rounded-r-40px object-cover aspect-video md:aspect-auto xl:aspect-video 2xl:md:aspect-auto"
          />
        </div>
      </div>
    </div>
  );
};

export default CreateEventPage;
