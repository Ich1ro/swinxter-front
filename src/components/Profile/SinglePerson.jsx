import axios from "axios";
import React, { useContext, useEffect, useRef, useState } from "react";
import { BiChevronDown } from 'react-icons/bi';
import { CiEdit } from 'react-icons/ci';
import { IoCloseCircleSharp } from "react-icons/io5";
import { useLocation, useNavigate,useParams } from "react-router-dom";
import { toast } from "react-toastify";
import "./signup.css";
const SinglePerson = () => {
  const [image, setImage] = useState();
  const [terms, setTerms] = useState(false);
  const [popup, setPopup] = useState(false);
  const [isActive, setIsActive] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [person1, setPerson1] = useState({
    Month: "",
    Day: "",
    Year: "",
  });
  const [isGenderSelected, setIsGenderSelected] = useState(false);
  const [isPhotoUploaded, setIsPhotoUploaded] = useState(false);

  const [bodyhair, SetBodyHair] = useState([]);
  const [interest, setInterest] = useState({
    male: [], // Initialize the "male" key as an empty array
    male_male: [],
    female: [],
    female_female: [],
    male_female: [],
    transgender: [],
  });
  const [form, setForm] = useState({
    body_type: "",
    height: "",
    weight: "",
    ethnic: "",
    smoking: "",
    piercing: "",
    tattoo: "",
    Drinking:"",
    Relationship:"",
    Drugs:"",
    Language:"",
    circumcised: "",
    looks: "",
    intelligence: "",
    sexuality: "",
    relationship: "",
    experience: "",
    image: "",
    slogan: "",
    introduction: "",
    gender: "",
    personName:""
  });
  const { userId } = useParams();
  const {state} = useLocation();
 
  const navigate = useNavigate();
  const ref = useRef(null);
  const ref2 = useRef(null);
  const BASE_URL = process.env.REACT_APP_BASE_URL;
  
  const weights = [];

  for (let kg = 36; kg <= 182; kg++) {
    const lbs = (kg * 2.20462).toFixed(2);
    weights.push(`${kg} kg (${lbs} lbs)`);
  }
  const heights = [
    "4'1\" (124.46 cm)",
    "4'2\" (127.00 cm)",
    "4'3\" (129.54 cm)",
    "4'4\" (132.08 cm)",
    "4'5\" (134.62 cm)",
    "4'6\" (137.16 cm)",
    "4'7\" (139.70 cm)",
    "4'8\" (142.24 cm)",
    "4'9\" (144.78 cm)",
    "4'10\" (147.32 cm)",
    "4'11\" (149.86 cm)",
    "5'0\" (152.40 cm)",
    "5'1\" (154.94 cm)",
    "5'2\" (157.48 cm)",
    "5'3\" (160.02 cm)",
    "5'4\" (162.56 cm)",
    "5'5\" (165.10 cm)",
    "5'6\" (167.64 cm)",
    "5'7\" (170.18 cm)",
    "5'8\" (172.72 cm)",
    "5'9\" (175.26 cm)",
    "5'10\" (177.80 cm)",
    "5'11\" (180.34 cm)",
    "6'0\" (182.88 cm)",
    "6'1\" (185.42 cm)",
    "6'2\" (187.96 cm)",
    "6'3\" (190.50 cm)",
    "6'4\" (193.04 cm)",
    "6'5\" (195.58 cm)",
    "6'6\" (198.12 cm)",
    "6'7\" (200.66 cm)",
    "6'8\" (203.20 cm)",
    "6'9\" (205.74 cm)",
    "6'10\" (208.28 cm)",
    "7'0\" (210.82 cm)",
    "7'1\" (213.36 cm)",
    "7'2\" (215.90 cm)",
    "7'3\" (218.44 cm)",
    "7'4\" (220.98 cm)",
    "7'5\" (223.52 cm)",
    "7'6\" (226.06 cm)",
    "7'7\" (228.60 cm)",
    "7'8\" (231.14 cm)",
    "7'9\" (233.68 cm)",
    "7'10\" (236.22 cm)",
    "7'11\" (238.76 cm)",
    "8'0\" (241.30 cm)",
  ];
  const ethnic = [
    "Caucasian",

    "Hispanic/Latin",

    "Black/African-American",

    "Asian",

    "Indian",

    "Indigenous",

    "Middle Eastern",

    "Other",
  ];
  const bodytype = [
    "Slim",

    "Athletic",

    "Average",

    "Nicely Shaped",

    "More of me to Love",

    "Huggable and heavy",
  ];
  const hair = [
    {
      name: "Arms",
      label: "arm",
    },
    {
      name: "Bikni",
      label: "bikni",
    },
    {
      name: "Buns",
      label: "buns",
    },
    {
      name: "Tummy",
      label: "tummy",
    },
    {
      name: "Chest",
      label: "chest",
    },
    {
      name: "Everywhere",
      label: "everywhere",
    },
    {
      name: "Treasure",
      label: "treasure",
    },
    {
      name: "Arm Pit",
      label: "arm pit",
    },
    {
      name: "Shave",
      label: "shave",
    },
    {
      name: "Smooth",
      label: "smooth",
    },
  ];

  const months = [
    { value: "01", label: "January" },
    { value: "02", label: "February" },
    { value: "03", label: "March" },
    { value: "04", label: "April" },
    { value: "05", label: "May" },
    { value: "06", label: "June" },
    { value: "07", label: "July" },
    { value: "08", label: "August" },
    { value: "09", label: "September" },
    { value: "10", label: "October" },
    { value: "11", label: "November" },
    { value: "12", label: "December" },
  ];

  // Generate an array of days (1-31)
  const days = Array.from({ length: 31 }, (_, i) => {
    const dayValue = (i + 1).toString().padStart(2, "0");
    return { value: dayValue, label: (i + 1).toString() };
  });
  // Generate an array of years (adjust the range as needed)
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 100 }, (_, i) => {
    const yearValue = (currentYear - i).toString();
    return { value: yearValue, label: yearValue };
  });

  useEffect(() => {
    function handleClickOutside(event) {
      if (ref.current && !ref.current.contains(event.target)) {
        handleDeactivate(event);
      }
    }
  
    function handleDeactivate(event) {
      setIsActive(false);
      if (ref2.current && !ref2.current.contains(event.target)) {
        setIsEditing(false);
      }
    }
  
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref, ref2]);
  

  const handleOpenOptions = (e) => {
    setIsActive(true);
  };

  const handlechange = (e) => {
    const { name, value } = e.target;
    setPerson1({ ...person1, [name]: value });
  };

  const handleInput = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  }

  useEffect(()=>{
    if(form['gender']){
      setIsGenderSelected(true)
    }else{
      setIsGenderSelected(false)
    }
    
    },[form['gender']])

 

  const handleBodyhair = (e) => {
    const data = bodyhair;
    if (data.includes(e.target.value)) {
      const filter_data = data.filter((el) => el !== e.target.value);
      SetBodyHair(filter_data);
    } else {
      data.push(e.target.value);
      SetBodyHair(data);
    }
  };

  const handleimage = async (e) => {
    const file = e.target.files[0];
    if (!file) {
      return;
    } else {
      setImage(URL.createObjectURL(e.target.files[0]));
    }

    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    };
    const formData = new FormData();
    formData.append("image", file);
    const { data } = await axios.put(
      `${BASE_URL}/api/upload_image/${userId}`,
      formData,
      config
    );
    if (data) {
      setIsPhotoUploaded(true);
      toast.success("Image Uploaded");
    } else {
      toast.error("failed to Upload Image");
    }
  };

  const handleEditClick =()=>{
    setIsEditing(true)
  }
  const handleInterest = (event) => {
    const { name, value, checked } = event.target;

    // Create a copy of the interest object to avoid mutating state directly
    const updatedInterest = { ...interest };

    // If the checkbox is checked, add the value to the corresponding array, otherwise remove it
    if (checked) {
      updatedInterest[name] = [...updatedInterest[name], value];
    } else {
      updatedInterest[name] = updatedInterest[name]?.filter(
        (item) => item !== value
      );
    }

    // Update the state with the modified interest object
    setInterest(updatedInterest);
  };
  const { Month, Day, Year } = person1;
  const date = new Date(`${Year}-${Month}-${Day}`);
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, "0"); // Add 1 to month because it's zero-indexed
  const day = date
    .getDate()
    .toString()
    .padStart(2, "0");
  const formattedDate = `${year}/${month}/${day}`;



  const handleSave = async () => {
    if (!terms) {
      setPopup(true);
      return;
    }

    const formData = new FormData();
    formData.append("userId", userId);

    formData.append("interests", JSON.stringify(interest));
    formData.append("slogan", form.slogan);
    formData.append("introduction", form.introduction);
    formData.append("gender", form.gender);
    formData.append("body_type", form.body_type);
    formData.append("DOB", formattedDate);
    formData.append("body_hair", bodyhair);
    formData.append("ethnic_background", form.ethnic);
    formData.append("height", form.height);
    formData.append("weight", form.weight);
    formData.append("smoking", form.smoking);
    formData.append("piercings", form.piercing);
    formData.append("tattoos", form.tattoo);
    formData.append("Drinking",form.Drinking);
    formData.append("Relationship",form.Relationship);
    formData.append("Drugs",form.Drugs);
    formData.append("Language",form.Language);
    formData.append("circumcised", form.circumcised);
    formData.append("looks_important", form.looks);
    formData.append("intelligence", form.intelligence);
    formData.append("sexuality", form.sexuality);
    formData.append("relationship_status", form.relationship);
    formData.append("experience", form.experience);
    formData.append("personName",form.personName)
    try {
      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
        },  withCredentials: true
      };
   
      const { data } = await axios.put(
        `${BASE_URL}/api/update`,
        formData,
        config
      );

      if (isGenderSelected && isPhotoUploaded) {
      if (data) {
        navigate("/verify_email",{state:state?.email});
      } else {
        toast.error("Cannot Update");
      }
    }
    else{
      isPhotoUploaded?
      toast.error("Gender field is required"):toast("Image is required")
    }
    } catch (error) {
      console.log(error);
    }
  };

 
  return (
    <>
      <div className="min-h-screen bg-black-20 text-white grid content-between">
        <div className="overflow-hidden">
          {/* <Header /> */}
          <div className="sign_up__block pt-65px mt-40">
            <div className="container mx-auto relative z-1">
              <div className="sign-up__header pt-10 pb-20 bg-white flex flex-col justify-center items-center rounded-t-3xl md:rounded-t-86">
                <p className="text-2xl sm:text-3xl xl:text-40px text-black  font-normal">
                  Sign Up
                </p>
                <p className="text-lg text-black  font-body_font">
                  Get Started it’s easy
                </p>
              </div>
              <div className="sign-up__body px-5 lg:px-10 rounded-3xl md:rounded-t-58 md:rounded-r-58 bg-black mt-[-50px] md:rounded-58 relative  border-b-2 border-t-[1px] border-orange">
                <form>
                  <h2 className="text-white text-2xl sm:text-3xl xl:text-5xl text-center xl:text-start font-bold mb-6 mt-10">
                    PHOTOS
                  </h2>
                  <div>
                    <label htmlFor="add_photos">
                      <input
                        id="add_photos"
                        type="file"
                        className="hidden"
                        name="image"
                        onChange={handleimage}
                      />
                      {image ? (
                        <span
                          className="primary_btn gradient  px-8 bg-gradient-to-r from-[#F79220]
 to-[#F94A2B] rounded-lg py-2"
                        >
                          Change Photo
                        </span>
                      ) : (
                        <span
                          className="primary_btn gradient  px-8 bg-gradient-to-r from-[#F79220]
 to-[#F94A2B] rounded-lg py-2"
                        >
                          Add Photo
                        </span>
                      )}
                    </label>
                    <span className="px-5">jpg/png, max 25MB/Photo</span>
                    <div className="block mt-5">
                    <div className="relative inline-block"> <img src={image} className="w-[64px]" />
                    {image && (<span
                    className="preview_close absolute top-0 transform
                     translate-x-[40%] -translate-y-[50%] right-0 object-contain text-xl z-[1] w-5
                      h-5 rounded-full bg-orange text-black cursor-pointer" 
                      onClick={(e)=>setImage('')}><IoCloseCircleSharp /></span>)}
                    </div>
                    </div>
                   

                  </div>
                </form>

                <div className="my-4">
                  <h1 className="text-white text-2xl sm:text-3xl xl:text-5xl text-center xl:text-start font-bold ">
                    INTERESTS
                  </h1>

                  <form>
                    <div className="grid grid-cols-3 mb-5">
                      <span className="text-sm font-light ">
                        Select all that apply
                      </span>
                      <span className="text-sm font-normal text-center">
                        SWINGERS
                      </span>
                      <span className="text-sm font-normal text-center">
                        HOOKUPS / MEETUPS
                      </span>
                    </div>

                    <div className="grid grid-cols-3 mt-3">
                      <span className="text-sm font-semi-bold">
                        Couple Male/Female
                      </span>

                      <div className="it_checkbox">
                        <input
                          type="checkbox"
                          id="swingers"
                          name="male_female"
                          value="swingers"
                          onChange={handleInterest}
                        />
                        <label
                          htmlFor="swingers"
                          className="check__box"
                        ></label>
                      </div>
                      <div className="it_checkbox">
                        <input
                          type="checkbox"
                          id="Hookups"
                          name="male_female"
                          value="hookup"
                          onChange={handleInterest}
                        />
                        <label htmlFor="Hookups" className="check__box"></label>
                      </div>
                    </div>
                    <div className="grid grid-cols-3 mt-3">
                      <span className="text-sm font-semi-bold">
                        Couple Female/Female
                      </span>

                      <div className="it_checkbox">
                        <input
                          type="checkbox"
                          id="swingers1"
                          name="female_female"
                          value="swingers"
                          onChange={handleInterest}
                        />
                        <label
                          htmlFor="swingers1"
                          className="check__box"
                        ></label>
                      </div>
                      <div className="it_checkbox">
                        <input
                          type="checkbox"
                          id="Hookups1"
                          name="female_female"
                          value="hookup"
                          onChange={handleInterest}
                        />
                        <label
                          htmlFor="Hookups1"
                          className="check__box"
                        ></label>
                      </div>
                    </div>
                    <div className="grid grid-cols-3 mt-3">
                      <span className="text-sm font-semi-bold">
                        Couple Male/Male
                      </span>
                      <div className="it_checkbox">
                        <input
                          type="checkbox"
                          id="swingers2"
                          name="male_male"
                          value="swingers"
                          onChange={handleInterest}
                        />
                        <label
                          htmlFor="swingers2"
                          className="check__box"
                        ></label>
                      </div>
                      <div className="it_checkbox">
                        <input
                          type="checkbox"
                          id="Hookups2"
                          name="male_male"
                          value="hookup"
                          onChange={handleInterest}
                        />
                        <label
                          htmlFor="Hookups2"
                          className="check__box"
                        ></label>
                      </div>
                    </div>
                    <div className="grid grid-cols-3 mt-3">
                      <span className="text-sm font-semi-bold">Female</span>
                      <div className="it_checkbox">
                        <input
                          type="checkbox"
                          id="swingers3"
                          name="female"
                          value="swingers"
                          onChange={handleInterest}
                        />
                        <label
                          htmlFor="swingers3"
                          className="check__box"
                        ></label>
                      </div>
                      <div className="it_checkbox">
                        <input
                          type="checkbox"
                          id="Hookups3"
                          name="female"
                          value="hookup"
                          onChange={handleInterest}
                        />
                        <label
                          htmlFor="Hookups3"
                          className="check__box"
                        ></label>
                      </div>
                    </div>
                    <div className="grid grid-cols-3 mt-3">
                      <span className="text-sm font-semi-bold">Male</span>
                      <div className="it_checkbox">
                        <input
                          type="checkbox"
                          id="swingers4"
                          name="male"
                          value="swinger"
                          onChange={handleInterest}
                        />
                        <label
                          htmlFor="swingers4"
                          className="check__box"
                        ></label>
                      </div>
                      <div className="it_checkbox">
                        <input
                          type="checkbox"
                          id="Hookups4"
                          name="male"
                          value="hookup"
                          onChange={handleInterest}
                        />
                        <label
                          htmlFor="Hookups4"
                          className="check__box"
                        ></label>
                      </div>
                    </div>
                    <div className="grid grid-cols-3 mt-3 ">
                      <span className="text-sm font-semi-bold">
                        Transgender
                      </span>
                      <div className="it_checkbox">
                        <input
                          type="checkbox"
                          id="swingers5"
                          name="transgender"
                          value="swingers"
                          onChange={handleInterest}
                        />
                        <label
                          htmlFor="swingers5"
                          className="check__box"
                        ></label>
                      </div>
                      <div className="it_checkbox">
                        <input
                          type="checkbox"
                          id="Hookups5"
                          name="transgender"
                          value="hookup"
                          onChange={handleInterest}
                        />
                        <label
                          htmlFor="Hookups5"
                          className="check__box"
                        ></label>
                      </div>
                    </div>
                  </form>
                </div>

                <div className="mt-10">
                  <h1 className="text-white text-2xl sm:text-3xl xl:text-5xl text-center xl:text-start font-bold ">
                    ABOUT US
                  </h1>
                  <div>
                    <input
                      placeholder="Your dummmy slogan"
                      className="w-full border-2 border-orange rounded-[5px] h-[40px] text-black px-5 font-light"
                      type="text"
                      name="slogan"
                      id="slogan"
                      value={form.slogan}
                      onChange={handleInput}
                      maxLength="100"
                    />
                    <h1 className="font-light text-sm py-2">
                      {100 - form.slogan.length} characters left
                    </h1>
                  </div>
                  <div>
                    <textarea
                      placeholder="Introduction"
                      className="w-full border-2 border-orange h-[80px] rounded-[5px] text-black px-5 font-light py-6"
                      type="text"
                      name="introduction"
                      value={form.introduction}
                      onChange={handleInput}
                      style={{ whiteSpace: 'pre-line' }}
                      maxLength={500}
                    />
                    <h1 className="font-light text-sm py-2">
                      {500 - form.introduction.length} characters left
                    </h1>
                  </div>
                </div>

                <div>
                  <div>
                    <h1 className="text-white text-2xl sm:text-3xl xl:text-5xl text-center xl:text-start font-bold ">
                      DETAILS
                    </h1>
                  </div>

                  <div className="text-end flex items-center justify-end pb-0">
                  {isEditing ? (
                    <div ref={ref2}>
    <input
      type="text"
      className="w-80 border-2 border-orange rounded-[5px] h-[27px] text-black px-5 font-light"
      placeholder="Person1 Name"
      onKeyUp={(e) => {
        if (e.key === 'Enter') {
          setIsEditing(false);
        }
      }}
      onChange={handleInput}
      value={form.personName}
      name="personName"
    />
</div>

) : (
  <p className="text-end flex items-center justify-end">
    {form.personName ? form.personName : 'Person 1'}{' '}
    <span className="text-lg ml-2 inline-flex items-center">
      <CiEdit onClick={handleEditClick} />
    </span>
  </p>
)}

                      </div>
                    <div className="bg-[#202020] grid grid-cols-2   px-10 pt-5">
                      <p className="">Birthday *</p>
                      <div className="text-end">
                        <select
                          className="bg-[#202020]"
                          name="Month"
                          value={person1.Month}
                          onChange={handlechange}
                        >
                          <option value="">Month</option>
                          {months.map((month) => (
                            <option key={month.value} value={month.value}>
                              {month.label}
                            </option>
                          ))}
                        </select>

                        <select
                          className="bg-[#202020]"
                          name="Day"
                          value={person1.Day}
                          onChange={handlechange}
                        >
                          <option value="">Day</option>
                          {days.map((day) => (
                            <option key={day.value} value={day.value}>
                              {day.label}
                            </option>
                          ))}
                        </select>

                        <select
                          className="bg-[#202020]"
                          name="Year"
                          value={person1.Year}
                          onChange={handlechange}
                        >
                          <option value="">Year</option>
                          {years.filter(year => currentYear - parseInt(year.value) > 18).map((year) => (
                            <option key={year.value} value={year.value}>
                              {year.label}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>

                    <div className="bg-[#202020] grid grid-cols-2 px-10 pt-5">
                      <span>Gender *</span>
                      <select
                        className="bg-[#202020] text-white text-end"
                        name="gender"
                        value={form.gender}
                        onChange={handleInput}
                      >
                        <option value="">Please Select </option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                        <option value="transgender">Transgender</option>
                      </select>
                    </div>
                    <div className="bg-[#202020] grid grid-cols-2 px-10 pt-5">
                      <span>Body Hair</span>
                      <div
                           ref={ref}
                        className={`select_ctmBox ${isActive ? "active" : ""}`}
                      >
                        <div
                     
                          className="select_label"
                          name="bodyhair"
                          onClick={handleOpenOptions}
                        >
                          {bodyhair.length === 0
                            ? "Please select"
                            : bodyhair.map((el) => <span>{el},</span>)}
                             <span className="select_label_icon"><BiChevronDown /></span>
                        </div>

                        <div className="select_options">
                          {hair.map((el, i) => (
                            <div className="optionBox" key={i}>
                              <span>{el.name}</span>
                              <div className="input_option">
                                <input
                                  id={el.label}
                                  type="checkbox"
                                  name={el.name}
                                  value={el.name}
                                  onChange={handleBodyhair}
                                />
                                <label htmlFor={el.label}></label>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="bg-[#202020] grid grid-cols-2 px-10 pt-5">
                      <span>Body Type</span>
                      <select
                        className="bg-[#202020] text-white text-end "
                        name="body_type"
                        value={form.body_type}
                        onChange={handleInput}
                      >
                        <option value="">Please select</option>
                        {bodytype.map((body, i) => (
                          <option key={i} value={body}>
                            {body}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="bg-[#202020] grid grid-cols-2 px-10 pt-5">
                      <span>Ethnic background</span>
                      <select
                        className="bg-[#202020] text-white text-end"
                        name="ethnic"
                        value={form.ethnic}
                        onChange={handleInput}
                      >
                        <option value="">Please select</option>
                        {ethnic.map((ethnic, i) => (
                          <option key={i} value={ethnic}>
                            {ethnic}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="bg-[#202020] grid grid-cols-2 px-10 pt-5">
                      <span>Height</span>
                      <select
                        className="bg-[#202020] text-white text-end"
                        name="height"
                        value={form.height}
                        onChange={handleInput}
                      >
                        <option value="">Please Select</option>
                        {heights.map((height, i) => (
                          <option key={i} value={height}>
                            {height}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="bg-[#202020] grid grid-cols-2 px-10 pt-5">
                      <span>Weight</span>
                      <select
                        className="bg-[#202020] text-white text-end"
                        name="weight"
                        value={form.weight}
                        onChange={handleInput}
                      >
                        <option value="">Please Select</option>
                        {weights.map((weight, i) => (
                          <option key={i} value={weight}>
                            {weight}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="bg-[#202020] grid grid-cols-2 px-10 pt-5">
                      <span>Smoking</span>
                      <select
                        className="bg-[#202020] text-white text-end"
                        name="smoking"
                        value={form.smoking}
                        onChange={handleInput}
                      >
                        <option value="">Please Select </option>
                        <option value="no">No</option>
                        <option value="yes">Yes</option>
                        <option value="occasionaly">Occasionaly</option>
                      </select>
                    </div>
                    <div className="bg-[#202020] grid grid-cols-2 px-10 pt-5">
                      <span>Piercings</span>
                      <select
                        className="bg-[#202020] text-white text-end"
                        name="piercing"
                        value={form.piercing}
                        onChange={handleInput}
                      >
                        <option value="">Please Select</option>
                        <option value="no"> No</option>
                        <option value="yes"> Yes</option>
                      </select>
                    </div>
                    <div className="bg-[#202020] grid grid-cols-2 px-10 pt-5">
                      <span>Tattoos</span>
                      <select
                        className="bg-[#202020] text-white text-end"
                        name="tattoo"
                        value={form.tattoo}
                        onChange={handleInput}
                      >
                        <option value="">Please Select</option>
                        <option value="no">No</option>
                        <option value="yes"> Yes</option>
                        <option value="a few">A Few</option>
                      </select>
                    </div>
                    <div className="bg-[#202020] grid grid-cols-2 px-10 pt-5">
                      <span>Drinking</span>
                      <select
                        className="bg-[#202020] text-white text-end"
                        name="Drinking"
                         value={form.Drinking}
                         onChange={handleInput}
                      >
                        <option value="">Please Select</option>
                        <option value="Not your business">Not your business </option>
                        <option value="Like a cactus"> Like a cactus</option>
                        <option value="I drink if offered">I drink if offered</option>
                        <option value="Like a fish">Like a fish</option>
                      </select>
                    </div>
                    <div className="bg-[#202020] grid grid-cols-2 px-10 pt-5">
                      <span>Drugs</span>
                      <select
                        className="bg-[#202020] text-white text-end"
                        name="Drugs"
                        value={form.Drugs}
                        onChange={handleInput}
                      >
                        <option value="">Please Select</option>
                        <option value="Not your business">Not your business</option>
                        <option value="No, thanks"> No, thanks</option>
                        <option value="Yes, thanks ">Yes, thanks </option>
                        <option value="More, thanks">More, thanks</option>
                      </select>
                    </div>
                    <div className="bg-[#202020] grid grid-cols-2 px-10 pt-5">
                      <span>Relationship Status</span>
                      <select
                        className="bg-[#202020] text-white text-end"
                        name="Relationship"
                        value={form.Relationship}
                        onChange={handleInput}
                      >
                        <option value="">Please Select</option>
                        <option value="Single">Single</option>
                        <option value="Married">Married</option>
                        <option value="FWB">FWB</option>
                      </select>
                    </div>
                    <div className="bg-[#202020] grid grid-cols-2 px-10 pt-5">
                      <span>Circumcised</span>
                      <select
                        className="bg-[#202020] text-white text-end"
                        name="circumcised"
                        value={form.circumcised}
                        onChange={handleInput}
                      >
                        <option value="">Please Select</option>
                        <option value="no">No</option>
                        <option value="yes">Yes</option>
                      </select>
                    </div>
                    <div className="bg-[#202020] grid grid-cols-2 px-10 pt-5">
                      <span>Looks are important?</span>
                      <select
                        className="bg-[#202020] text-white text-end"
                        name="looks"
                        value={form.looks}
                        onChange={handleInput}
                      >
                        <option value="">Please Select</option>
                        <option value="low importance">Low Importance</option>
                        <option value="medium importance">
                          Medium Importance
                        </option>
                        <option value="very importance">Very Importance</option>
                        <option value="no">No</option>
                      </select>
                    </div>
                    <div className="bg-[#202020] grid grid-cols-2 px-10 pt-5">
                      <span>Intelligence is important?</span>
                      <select
                        className="bg-[#202020] text-white text-end"
                        name="intelligence"
                        value={form.intelligence}
                        onChange={handleInput}
                      >
                        <option value="">Please Select</option>
                        <option value="low importance">Low Importance</option>
                        <option value="medium importance">
                          Medium Importance
                        </option>
                        <option value="very importance">Very Importance</option>
                        <option value="no">No</option>
                      </select>
                    </div>
                    <div className="bg-[#202020] grid grid-cols-2 px-10 pt-5">
                      <span>Sexuality</span>
                      <select
                        className="bg-[#202020] text-white text-end"
                        name="sexuality"
                        value={form.sexuality}
                        onChange={handleInput}
                      >
                        <option value="">Please Select</option>
                        <option value="straight">Straight </option>
                        <option value="bi-sexual">Bi-Sexual</option>
                        <option value="bi-curious">Bi-Curious</option>
                        <option value="gay">Gay</option>
                        <option value="pansexual">Pansexual</option>
                      </select>
                    </div>
                    <div className="bg-[#202020] grid grid-cols-2 px-10 pt-5">
                      <span>Relationship Orientation</span>
                      <select
                        className="bg-[#202020] text-white text-end"
                        name="relationship"
                        value={form.relationship}
                        onChange={handleInput}
                      >
                        <option value="">Please Select</option>
                        <option value="monogamous">Monogamous</option>
                        <option value="open-minded"> Open-Minded</option>
                        <option value="swinger">Swinger</option>
                        <option value="polyamorous">Polyamorous</option>
                      </select>
                    </div>
                    <div className="bg-[#202020] grid grid-cols-2 px-10 pt-5">
                      <span>Language</span>
                      <input className="max-w-[450px] border-2 border-orange rounded-[5px] h-[40px] text-black px-5 font-light ml-auto" type="text" placeholder="Languages"  onChange={handleInput} name="Language" value={form.Language}></input>
                    </div>
                    
                    <div className="bg-[#202020] grid grid-cols-2 px-10 py-5 gap-56">
                      <div>
                        <span>Experience Level</span>
                      </div>

                      <div className="flex  gap-10 text-end">
                        <div class="ngBox flex items-center">
                          <div class="it_checkbox">
                            <input
                              type="radio"
                              name="experience"
                              id="curious"
                              value="curious"
                              onChange={handleInput}
                              checked={form.experience === "curious"}
                            />
                            <label for="curious" class="check__box"></label>
                          </div>
                          <span className="ms-2">Curious</span>
                        </div>

                        <div class="ngBox flex items-center">
                          <div class="it_checkbox">
                            <input
                              type="radio"
                              name="experience"
                              id="newbie"
                              value="newbie"
                              onChange={handleInput}
                              checked={form.experience === "newbie"}
                            />
                            <label for="newbie" class="check__box"></label>
                          </div>
                          <span className="ms-2">Newbie</span>
                        </div>

                        <div class="ngBox flex items-center">
                          <div class="it_checkbox">
                            <input
                              type="radio"
                              name="experience"
                              id="intermediate"
                              value="intermediate"
                              onChange={handleInput}
                              checked={form.experience === "intermediate"}
                            />
                            <label
                              for="intermediate"
                              class="check__box"
                            ></label>
                          </div>
                          <span className="ms-2">Intermediate</span>
                        </div>

                        <div class="ngBox flex items-center">
                          <div class="it_checkbox">
                            <input
                              type="radio"
                              name="experience"
                              id="advanced"
                              value="advanced"
                              onChange={handleInput}
                              checked={form.experience === "advanced"}
                            />
                            <label for="advanced" class="check__box"></label>
                          </div>
                          <span className="ms-2">Advanced</span>
                        </div>
                      </div>
                    </div>
             

                  <div className="it_checkbox flex gap-4 justify-start">
                    <input
                      type="checkbox"
                      id="terms"
                      name="terms"
                      value="terms"
                      onChange={() => setTerms(!terms)}
                    />
                    <label htmlFor="terms" className="check__box !ml-0"></label>
                    <span className="block w-full">
                      By creating your account, you consider yourself/yourselves
                      above 18 and you agree to the Terms of Service and Privacy
                      Policy of Swinxter®
                    </span>
                  </div>

                  <div className="flex justify-center py-5">
                    <button
                      onClick={handleSave}
                      className=" px-8 bg-gradient-to-r from-[#F79220]
 to-[#F94A2B] rounded-lg py-2 w-[50%] "
                    >
                      Save
                    </button>
                  </div>
                </div>
              </div>

              <div className="audit-dating__block relative my-16">
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
        </div>
        {/* <Footer /> */}
      </div>
      <div
        className={`fixed top-0 left-0 w-full h-screen items-center justify-center z-[9999] bg-black/70 ${
          popup ? "flex" : "hidden"
        } `}
      >
        <div className="w-full max-w-md p-10 rounded-md shadow-lg bg-white grid justify-items-center">
          <h3 className="text-xl text-center font-semibold">
            Please agree to our Terms & Conditions
          </h3>
          <span
            className="primary_btn gradient mt-5 px-8 bg-gradient-to-r from-[#F79220] to-[#F94A2B] rounded-lg py-2 cursor-pointer"
            onClick={() => setPopup(false)}
          >
            Ok
          </span>
        </div>
      </div>
    </>
  );
};

export default SinglePerson;