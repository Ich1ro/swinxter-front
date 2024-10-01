import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { BiChevronDown } from 'react-icons/bi';
import { IoCloseCircleSharp } from "react-icons/io5";
import { MdOutlineModeEditOutline } from 'react-icons/md';
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import api from "../../../utils/api";
import { loadUser } from "../../../redux/actions/auth";

const CoupleEditDetailPage = () => {
  const [image, setImage] = useState();
  const [isEditing, setIsEditing] = useState(null);
  const ref= useRef(null);
  const dispatch =useDispatch();
const {user} = useSelector((state)=>state.auth);
const [userInfo,setUserInfo]=useState(user);
useEffect(()=>{
  setUserInfo(user)
},[])
console.log(userInfo)
  const [ ctmSelect, setCtmSelect ] = useState(false);
  const [ ctmSelect2, setCtmSelect2 ] = useState(false);
  const [userDetails, setUserDetails] = useState({
    email: "",
    username: "",
    DOB: "",
    gender: "",
    body_hair: "",
    body_type: "",
    height: "",
    weight: "",
    Drinking:"",
    Drugs:"",
    Relationship:"",
    Language:"",
    ethnic_background: "",
    smoking: "",
    piercings: "",
    tattoos: "",
    circumcised: "",
    looks: "",
    intelligence: "",
    sexuality: "",
    relationship_status: "",
    experience: "",
    introduction: "",
    image: "",
    person1_Name:"",
    slogan:""
 });

const [person2,setPerson2]=useState({
    DOB: "",
    gender: "",
    body_hair: "",
    body_type: "",
    height: "",
    weight: "",
    Drinking:"",
    Drugs:"",
    Relationship:"",
    Language:"",
    ethnic_background: "",
    smoking: "",
    piercings: "",
    tattoos: "",
    circumcised: "",
    looks: "",
    intelligence: "",
    sexuality: "",
    relationship_status: "",
    experience: "",
    person2_Name:""
})
 
  const Id = userInfo._id;
  const weights = [];

  for (let kg = 36; kg <= 182; kg++) {
    const lbs = (kg * 2.20462).toFixed(2);
    weights.push(`${kg} kg (${lbs} lbs)`);
  }
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
  const Birthday = userInfo.couple?.person1?.DOB?.replace(/\//g, '-');
  const Birthday2 = userInfo.couple?.person2?.DOB?.replace(/\//g, '-');
 

  const handleEditClick = (person) => {
    setIsEditing(person);
  };


  useEffect(()=>{
    if(userInfo.image){
      setImage(userInfo?.image)
     
    }
    },[])
    

  useEffect(() => {
    function handleClickOutside(event) {
      if (ref.current && !ref.current.contains(event.target) ) {
        setIsEditing('')
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {

    if (userInfo) {
      setUserDetails({
        userId: userInfo._id,
        email: userInfo.email || "",
        username: userInfo.username || "",
        DOB: Birthday || "",
        gender: userInfo?.couple?.person1?.gender || "",
        body_hair: userInfo?.couple?.person1?.body_hair || "",
        body_type: userInfo?.couple?.person1?.body_type || "",
        height: userInfo?.couple?.person1?.height || "",
        weight: userInfo?.couple?.person1?.weight || "",
        Drinking: userInfo?.couple?.person1?.Drinking || "",
        Language: userInfo?.couple?.person1?.Language || "" ,
        Drugs: userInfo?.couple?.person1?.Drugs || "",
        Relationship: userInfo?.couple?.person1?.Relationship || "",
        ethnic_background: userInfo?.couple?.person1?.ethnic_background || "",
        smoking: userInfo?.couple?.person1?.smoking || "",
        piercings: userInfo?.couple?.person1?.piercings || "",
        tattoos: userInfo?.couple?.person1?.tattoos || "",
        circumcised: userInfo?.couple?.person1?.circumcised || "",
        looks: userInfo?.couple?.person1?.looks_important || "",
        intelligence: userInfo?.couple?.person1?.intelligence || "",
        sexuality: userInfo?.couple?.person1?.sexuality || "",
        relationship_status: userInfo?.couple?.person1?.relationship_status || "",
        experience: userInfo?.couple?.person1?.experience || "",
        introduction: userInfo?.introduction||"",
        slogan:userInfo?.slogan||"",
        person1_Name:userInfo?.couple?.person1?.person1_Name || ""
      });

      setPerson2({
       
        DOB: Birthday2 || "",
        gender: userInfo?.couple?.person2?.gender || "",
        body_hair: userInfo?.couple?.person2?.body_hair || "",
        body_type: userInfo?.couple?.person2?.body_type || "",
        height: userInfo?.couple?.person2?.height || "",
        weight: userInfo?.couple?.person2?.weight || "",
        Drinking: userInfo?.couple?.person2?.Drinking || "",
        Language: userInfo?.couple?.person2?.Language || "" ,
        Drugs: userInfo?.couple?.person2?.Drugs || "",
        Relationship: userInfo?.couple?.person2?.Relationship || "",
        ethnic_background: userInfo?.couple?.person2?.ethnic_background || "",
        smoking: userInfo?.couple?.person2?.smoking || "",
        piercings: userInfo?.couple?.person2?.piercings || "",
        tattoos: userInfo?.couple?.person2?.tattoos || "",
        circumcised: userInfo?.couple?.person2?.circumcised || "",
        looks: userInfo?.couple?.person2?.looks_important || "",
        intelligence: userInfo?.couple?.person2?.intelligence || "",
        sexuality: userInfo?.couple?.person2?.sexuality || "",
        relationship_status: userInfo?.couple?.person2?.relationship_status || "",
        experience: userInfo?.couple?.person2?.experience || "",
        person2_Name:userInfo?.couple?.person2?.person2_Name || ""
      
      })
    
    }
  }, []);
 

  const handleChange2= (e) => {
    const { name, value } = e.target;
setPerson2({...person2,[name]:value})
  };


  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserDetails( {...userDetails, [name]: value} );
  };


  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (!file) {
      return;
    } else {
      setImage(URL.createObjectURL(e.target.files[0]));
    }

    const formData = new FormData();

    formData.append("image", file);
    try {
      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
        }
      };
      const { data } = await api.put(
        `/upload_image/${userInfo?._id}`,
        formData,
        config
      );

      if (data) {
        setUserInfo(data);
        dispatch(loadUser())
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleRemove = async() => {
    setImage("")
    try {
    
      const { data } = await api.put(
        `/upload_image/${Id}`
      )
      if(data){
        setUserInfo(data)
        dispatch(loadUser())
      }
      
    }
      catch (error) {
      console.log(error)
    }
  }

  // const handleRemove = async() => {
  //   setImage("")
  //   try {
  //     const formData = new FormData();
  //     formData.append("image",image)
  //     const config = {
  //       headers: {
  //         "Content-Type": "multipart/form-data",
  //       },
  //     };
  //     const { data } = await api.put(
  //       `/upload_image/${userInfo?._id}`,formData,
  //       config
  //     )
  //     if(data){
  
  //     }
      
  //   }
  //     catch (error) {
  //     console.log(error)
  //   }
  // }
  const handleSave = async (e) => {
    e.preventDefault();
    const couple= {
      person1: {
        DOB: userDetails.DOB,
        body_hair: userDetails.body_hair,
        height: userDetails.height,
        weight: userDetails.weight,
        body_type: userDetails.body_type,
        ethnic_background: userDetails.ethnic_background,
        smoking: userDetails.smoking,
        tattoos: userDetails.tattoos,
        Drinking: userDetails.Drinking,
        Drugs: userDetails.Drugs,
        Relationship: userDetails.Relationship,
        Language: userDetails.Language,
        piercings: userDetails.piercings,
        circumcised: userDetails.circumcised,
        looks_important: userDetails.looks,
        intelligence: userDetails.intelligence,
        sexuality: userDetails.sexuality,
        relationship_status: userDetails.relationship_status,
        experience: userDetails.experience,
        gender: userDetails.gender,
        person1_Name:userDetails.person1_Name
        
      },

      person2: {
        DOB: person2.DOB,
        body_hair: person2.body_hair,
        height: person2.height,
        weight: person2.weight,
        body_type: person2.body_type,
        ethnic_background: person2.ethnic_background,
        smoking: person2.smoking,
        tattoos: person2.tattoos,
        Drinking: person2.Drinking,
        Drugs: person2.Drugs,
        Relationship: person2.Relationship,
        Language: person2.Language,
        piercings: person2.piercings,
        circumcised: person2.circumcised,
        looks_important: person2.looks,
        intelligence: person2.intelligence,
        sexuality: person2.sexuality,
        relationship_status: person2.relationship_status,
        experience: person2.experience,
        gender: person2.gender,
        person2_Name:person2.person2_Name
      },
    };
  
    try {
  

      const { data } = await api.put(
        `/update`,
        {couple:JSON.stringify(couple),userId:userInfo._id,introduction:userDetails?.introduction,slogan:userDetails.slogan}
      );
      
      if (data) {
        dispatch(loadUser())
        toast.success("Profile edit successfully")
      }
    } catch (error) {
      console.log(error);
    }
  
  };


  const handleBodyhair = (e) => {
    const selectedValue = e.target.value;
    const updatedData = [...userDetails.body_hair]; // Create a copy of the current selected data
  
    if (updatedData.includes(selectedValue)) {
      // If the selected value is already in the data, remove it
      const filterData = updatedData.filter((el) => el !== selectedValue);
      setUserDetails({ ...userDetails, body_hair: filterData });
    } else {
      // If the selected value is not in the data, add it
      updatedData.push(selectedValue);
      setUserDetails({ ...userDetails, body_hair: updatedData });
    }
  };
  const handleBodyhair2 = (e) => {
    const selectedValue = e.target.value;
    const updatedData = [...person2.body_hair]; // Create a copy of the current selected data
  
    if (updatedData.includes(selectedValue)) {
      // If the selected value is already in the data, remove it
      const filterData = updatedData.filter((el) => el !== selectedValue);
    setPerson2({...person2,['body_hair']:filterData})
    } else {
      updatedData.push(selectedValue);
   
     setPerson2({...person2,['body_hair']:updatedData})
    }
  };


  return (
    <div className="bg-black-20">
      <div className="min-h-[350px] md:min-h-[320px] flex justify-center items-end bg-black rounded-b-50px">
        <div className="container mx-auto pb-20 text-center">
          <h3 className="font-secondary_font text-40px">Edit User Details</h3>
          <p className="text-lg">Lorem Ipsum is dummy content</p>
        </div>
      </div>
      <div className="container mx-auto">
        <form className=" max-w-7xl mx-auto mt-10" autoComplete="off">
          <div className="flex items-start mb-8 max-w-xs mx-auto">
                <label className="flex w-full min-h-[53px] bg-gray-900 py-[10px] px-4 text-lg justify-center items-center cursor-pointer rounded-md">
                  <span className="w-6 block mr-2">
                    <img src="images/gallery-icon.png" alt="gallery-icon" />
                  </span>
                  Edit Profile Image
                  <input
                    type="file"
                    multiple
                    className="hidden"
                    onChange={handleImageChange}
                  />
                </label>

                <div className="block ml-4">
                  
                  <div className="relative inline-block">   {image &&<><img src={image} className="w-[64px]" />
                <span
                  className="preview_close absolute top-0 transform
                   translate-x-[40%] -translate-y-[50%] right-0 object-contain text-xl z-[1] w-5
                    h-5 rounded-full bg-orange text-black cursor-pointer flex items-center justify-center" 
                    onClick={handleRemove }><IoCloseCircleSharp /></span></> }
                  </div>
                  </div>

              </div>
          <div className="grid md:grid-cols-2 gap-x-10 justify-stretch items-start md:justify-center gap-y-4 sm:gap-y-6">
            <div className="grid gap-y-4 md:gap-y-6">
            <div className="">
                {isEditing==="person1"?
                  <input type="text"  ref={ref} placeholder="person1 Name"
                  value={userDetails.person1_Name}
                  name="person1_Name"

                  onKeyUp={(e) => {
                    if (e.key === 'Enter') {
                      setIsEditing(false);
                    }
                  }}
                  onChange={handleChange}
                  className="w-80 border-2 border-orange
                  rounded-[5px] h-[27px]
                  text-black px-5 font-light"
                  />:
                    <p className="text-2xl font-medium flex justify-between">
                    {userDetails.person1_Name ? userDetails.person1_Name : userInfo?.couple?.person1?.person1_Name? userInfo?.couple?.person1?.person1_Name :"Person 1"}
                    <span className="flex items-center text-xl cursor-pointer">
                      <MdOutlineModeEditOutline  onClick={()=>handleEditClick("person1")} /></span>
                    </p>}
                    
                </div>
              {/* <div>
                <div className="flex flex-wrap rounded-md input_field">
                  <label
                    htmlFor="email"
                    className="rounded-l-md w-full md:w-[120px] xl:w-[195px] md:min-h-[49px] flex items-center justify-start md:px-2 lg:px-4 text-sm mb-1 md:mb-0 md:text-text-xs xl:text-base text-orange md:text-white  font-normal leading-5 xl:leading-29 text-center lg:text-start"
                  >
                    Email address
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={userDetails.email}
                    onChange={handleChange}
                    className="bg-black-20 border rounded-md md:rounded-none md:border-none md:border-l-2 md:rounded-r-md border-orange focus:outline-none focus-visible:none w-full md:w-[calc(100%-120px)] xl:w-[calc(100%-195px)] h-[49px] text-white font-normal xl:text-lg rounded-r-md text-sm px-2 xl:px-4 py-2.5 text-start placeholder:text-lg placeholder:text-gray items-center flex justify-between"
                    required
                  />
                </div>
              </div>
              <div>
                <div className="flex flex-wrap rounded-md input_field">
                  <label
                    htmlFor="username"
                    className="rounded-l-md w-full md:w-[120px] xl:w-[195px] md:min-h-[49px] flex items-center justify-start md:px-2 lg:px-4 text-sm mb-1 md:mb-0 md:text-text-xs xl:text-base text-orange md:text-white  font-normal leading-5 xl:leading-29 text-center lg:text-start"
                  >
                    Username
                  </label>
                  <input
                    type="text"
                    id="username"
                    name="username"
                    value={userDetails.username}
                    onChange={handleChange}
                    className="bg-black-20 border rounded-md md:rounded-none md:border-none md:border-l-2 md:rounded-r-md border-orange focus:outline-none focus-visible:none w-full md:w-[calc(100%-120px)] xl:w-[calc(100%-195px)] h-[49px] text-white font-normal xl:text-lg rounded-r-md text-sm px-2 xl:px-4 py-2.5 text-start placeholder:text-lg placeholder:text-gray items-center flex justify-between"
                    required
                  />
                </div>
              </div> */}
              <div>
                <div className="flex flex-wrap rounded-md input_field">
                  <label
                    htmlFor="DOB"
                    className="rounded-l-md w-full md:w-[120px] xl:w-[195px] md:min-h-[49px] flex items-center justify-start md:px-2 lg:px-4 text-sm mb-1 md:mb-0 md:text-text-xs xl:text-base text-orange md:text-white  font-normal leading-5 xl:leading-29 text-center lg:text-start"
                  >
                Birthday
                  </label>
                  <input
                    type="date"
                    id="DOB"
                    name="DOB"
                    value={userDetails.DOB}
                    onChange={handleChange}
                    className="bg-black-20 border rounded-md md:rounded-none md:border-none md:border-l-2 md:rounded-r-md border-orange focus:outline-none focus-visible:none w-full md:w-[calc(100%-120px)] xl:w-[calc(100%-195px)] h-[49px] text-white font-normal xl:text-lg rounded-r-md text-sm px-2 xl:px-4 py-2.5 text-start placeholder:text-lg placeholder:text-gray items-center flex justify-between"
                  />
                </div>
              </div>
              <div className="flex flex-wrap rounded-md input_field">
                <label
                  htmlFor="gender"
                  className="rounded-l-md w-full md:w-[120px] xl:w-[195px] md:min-h-[49px] flex items-center justify-start md:px-2 lg:px-4 text-sm mb-1 md:mb-0 md:text-text-xs xl:text-base text-orange md:text-white  font-normal leading-5 xl:leading-29 text-center lg:text-start"
                >
                  Gender
                </label>
                <select
                  name="gender"
                  id="gender"
                  className="bg-black-20 border rounded-md md:rounded-none md:border-none md:border-l-2 md:rounded-r-md border-orange focus:outline-none focus-visible:none w-full md:w-[calc(100%-120px)] xl:w-[calc(100%-195px)] h-[49px] text-white font-normal xl:text-lg rounded-r-md text-sm px-2 xl:px-4 py-2.5 text-start placeholder:text-lg placeholder:text-gray items-center flex justify-between"
                  value={userDetails.gender}
                  onChange={handleChange}
                >
                  <option value="" disabled>
                    Select an option
                  </option>

                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="transgender">Transgender</option>
                </select>
              </div>

              <div className="grid items-center ctm_select_drop rounded-md input_fields relative">
                <div className="p-2 rounded-lg input_field">
                  <label
                    htmlFor="body_hair"
                    className="flex justify-between items-center w-full bg-black-20 items-stretch"
         
                  ><span className="gradient gradient rounded-l-md w-full md:w-[120px] xl:w-[195px] flex items-center justify-start md:px-2 lg:px-4 text-sm mb-1 md:mb-0 md:text-text-xs xl:text-base text-orange md:text-white  font-normal leading-5 xl:leading-29 text-center lg:text-start">
                    Body Hair</span>

                  <div
                     
                     className="select_label bg-black-20 border rounded-md md:rounded-none md:border-none md:border-l-2 md:rounded-r-md border-orange focus:outline-none focus-visible:none w-full md:w-[calc(100%-120px)] xl:w-[calc(100%-195px)] text-white font-normal xl:text-lg rounded-r-md text-sm px-2 xl:px-4 py-2.5 text-start placeholder:text-lg placeholder:text-gray items-center flex justify-between"
                     name="body_hair"
                     value={userDetails.body_hair}
                     onChange={handleChange}
                          onClick={()=>setCtmSelect(!ctmSelect)}
                   >
                     {userDetails.body_hair.length === 0
                       ?  "Please select"
                       : userDetails?.body_hair.map((el,i) => <span>
                        {el} {i!==0 && i!==userDetails?.body_hair.length-1  && <span>, </span>}
                       

                        </span>)}
                        <span className="select_label_icon"><BiChevronDown /></span>
                   </div>
                     
                  </label>
                </div>

                
                <div className={`select_ctmBox ${ctmSelect ? 'active' : ''}`}>
                  <div className="select_label" name="body_hair">
                      <span></span>
                        
                    </div>
                  <div className="select_options">
                  <div className="optionBox">Please select</div>
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
                            checked={userDetails.body_hair.includes(el.name) || el.selected}
                          />
                          <label htmlFor={el.label}></label>
                        </div>
                      </div>
                    ))}
                    </div>
                </div>
                
              
              </div>


  

              
                        <div className="flex flex-wrap rounded-md input_field">
                <label
                  htmlFor="body_type"
                  className="rounded-l-md w-full md:w-[120px] xl:w-[195px] md:min-h-[49px] flex items-center justify-start md:px-2 lg:px-4 text-sm mb-1 md:mb-0 md:text-text-xs xl:text-base text-orange md:text-white  font-normal leading-5 xl:leading-29 text-center lg:text-start"
                >
             Body Type
                </label>
                <select
                  name="body_type"
                  id="body_type"
                  className="bg-black-20 border rounded-md md:rounded-none md:border-none md:border-l-2 md:rounded-r-md border-orange focus:outline-none focus-visible:none w-full md:w-[calc(100%-120px)] xl:w-[calc(100%-195px)] h-[49px] text-white font-normal xl:text-lg rounded-r-md text-sm px-2 xl:px-4 py-2.5 text-start placeholder:text-lg placeholder:text-gray items-center flex justify-between"
                  value={userDetails.body_type}
                  onChange={handleChange}
                >
                  <option value="" disabled>
                    Select an option
                  </option>

                  <option value="Slim">Slim</option>
                  <option value="Athletic">Athletic</option>
                  <option value="Average">Average</option>
                  <option value="AthlNicely Shapedetic">Nicely Shaped</option>
                  <option value="More of me to Love">More of me to Love</option>
                  <option value="Huggable and heavy">Huggable and heavy</option>
                </select>
                
              </div>
              <div>
                <div className="flex flex-wrap rounded-md input_field">
                  <label
                    htmlFor="height"
                    className="rounded-l-md w-full md:w-[120px] xl:w-[195px] md:min-h-[49px] flex items-center justify-start md:px-2 lg:px-4 text-sm mb-1 md:mb-0 md:text-text-xs xl:text-base text-orange md:text-white  font-normal leading-5 xl:leading-29 text-center lg:text-start"
                  >
                    Height
                  </label>
                  <select
                        className="bg-black-20 border rounded-md md:rounded-none md:border-none md:border-l-2 md:rounded-r-md border-orange focus:outline-none focus-visible:none w-full md:w-[calc(100%-120px)] xl:w-[calc(100%-195px)] h-[49px] text-white font-normal xl:text-lg rounded-r-md text-sm px-2 xl:px-4 py-2.5 text-start placeholder:text-lg placeholder:text-gray items-center flex justify-between"
                        name="height"
                        value={userDetails.height}
                        onChange={handleChange}
                      >
                        <option value="">Please Select</option>
                        {heights.map((height, i) => (
                          <option key={i} value={height}>
                            {height}
                          </option>
                        ))}
                      </select>
                </div>

              </div>
              <div>       <div className="flex flex-wrap rounded-md input_field">
                <label
                  htmlFor="race"
                  className="rounded-l-md w-full md:w-[120px] xl:w-[195px] md:min-h-[49px] flex items-center justify-start md:px-2 lg:px-4 text-sm mb-1 md:mb-0 md:text-text-xs xl:text-base text-orange md:text-white  font-normal leading-5 xl:leading-29 text-center lg:text-start"
                >
                  Weight
                </label>
                <select
                        className="bg-black-20 border rounded-md md:rounded-none md:border-none md:border-l-2 md:rounded-r-md border-orange focus:outline-none focus-visible:none w-full md:w-[calc(100%-120px)] xl:w-[calc(100%-195px)] h-[49px] text-white font-normal xl:text-lg rounded-r-md text-sm px-2 xl:px-4 py-2.5 text-start placeholder:text-lg placeholder:text-gray items-center flex justify-between"
                        name="weight"
                        value={userDetails.weight}
                        onChange={handleChange}
                      >
                        <option value="">Please Select</option>
                        {weights.map((weight, i) => (
                          <option key={i} value={weight}>
                            {weight}
                          </option>
                        ))}
                      </select>
              </div></div>

<div className="flex flex-wrap rounded-md input_field">
                <label
                  htmlFor="ethnic_background"
                  className="rounded-l-md w-full md:w-[120px] xl:w-[195px] md:min-h-[49px] flex items-center justify-start md:px-2 lg:px-4 text-sm mb-1 md:mb-0 md:text-text-xs xl:text-base text-orange md:text-white  font-normal leading-5 xl:leading-29 text-center lg:text-start"
                >
                Ethnic Background
                </label>
                <select
                  name="ethnic_background"
                  id="ethnic_background"
                  className="bg-black-20 border rounded-md md:rounded-none md:border-none md:border-l-2 md:rounded-r-md border-orange focus:outline-none focus-visible:none w-full md:w-[calc(100%-120px)] xl:w-[calc(100%-195px)] h-[49px] text-white font-normal xl:text-lg rounded-r-md text-sm px-2 xl:px-4 py-2.5 text-start placeholder:text-lg placeholder:text-gray items-center flex justify-between"
                  value={userDetails.ethnic_background}
                  onChange={handleChange}
                >
                  <option value="" disabled>
                    Select an option
                  </option>

                  <option value="Caucasian">Caucasian</option>
                  <option value="Hispanic/Latin">Hispanic/Latin</option>
                  <option value="Black/African-American">Black/African-American</option>
                  <option value="Asian">Asian</option>
                  <option value="Indian">Indian</option>
                  <option value="Indigenous">Indigenous</option>
                  <option value="Middle Eastern">Middle Eastern</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <div className="flex flex-wrap rounded-md input_field">
                <label
                  htmlFor="smoking"
                  className="rounded-l-md w-full md:w-[120px] xl:w-[195px] md:min-h-[49px] flex items-center justify-start md:px-2 lg:px-4 text-sm mb-1 md:mb-0 md:text-text-xs xl:text-base text-orange md:text-white  font-normal leading-5 xl:leading-29 text-center lg:text-start"
                >
                  Smoking
                </label>
                <select
                  name="smoking"
                  id="smoking"
                  className="bg-black-20 border rounded-md md:rounded-none md:border-none md:border-l-2 md:rounded-r-md border-orange focus:outline-none focus-visible:none w-full md:w-[calc(100%-120px)] xl:w-[calc(100%-195px)] h-[49px] text-white font-normal xl:text-lg rounded-r-md text-sm px-2 xl:px-4 py-2.5 text-start placeholder:text-lg placeholder:text-gray items-center flex justify-between"
                  value={userDetails.smoking}
                  onChange={handleChange}
                >
                  <option value="" disabled>
                    Select an option
                  </option>

                  <option value="yes">Yes</option>
                  <option value="no">No</option>
                  <option value="occasionaly">Occasionaly</option>

                </select>
              </div>
              <div className="flex flex-wrap rounded-md input_field">
                <label
                  htmlFor="tattoos"
                  className="rounded-l-md w-full md:w-[120px] xl:w-[195px] md:min-h-[49px] flex items-center justify-start md:px-2 lg:px-4 text-sm mb-1 md:mb-0 md:text-text-xs xl:text-base text-orange md:text-white  font-normal leading-5 xl:leading-29 text-center lg:text-start"
                >
                  Tattoos
                </label>
                <select
                  name="tattoos"
                  id="tattoos"
                  className="bg-black-20 border rounded-md md:rounded-none md:border-none md:border-l-2 md:rounded-r-md border-orange focus:outline-none focus-visible:none w-full md:w-[calc(100%-120px)] xl:w-[calc(100%-195px)] h-[49px] text-white font-normal xl:text-lg rounded-r-md text-sm px-2 xl:px-4 py-2.5 text-start placeholder:text-lg placeholder:text-gray items-center flex justify-between"
                  value={userDetails.tattoos}
                  onChange={handleChange}
                >
                  <option value="" disabled>
                    Select an option
                  </option>

                  <option value="yes">Yes</option>
                  <option value="no">No</option>
                  <option value="a few">A few</option>
                </select>
              </div>


              <div className="flex flex-wrap rounded-md input_field">
                <label
                  htmlFor="piercings"
                  className="rounded-l-md w-full md:w-[120px] xl:w-[195px] md:min-h-[49px] flex items-center justify-start md:px-2 lg:px-4 text-sm mb-1 md:mb-0 md:text-text-xs xl:text-base text-orange md:text-white  font-normal leading-5 xl:leading-29 text-center lg:text-start"
                >
                  Piercings
                </label>
                <select
                  name="piercings"
                  id="piercings"
                  className="bg-black-20 border rounded-md md:rounded-none md:border-none md:border-l-2 md:rounded-r-md border-orange focus:outline-none focus-visible:none w-full md:w-[calc(100%-120px)] xl:w-[calc(100%-195px)] h-[49px] text-white font-normal xl:text-lg rounded-r-md text-sm px-2 xl:px-4 py-2.5 text-start placeholder:text-lg placeholder:text-gray items-center flex justify-between"
                  value={userDetails.piercings}
                  onChange={handleChange}
                >
                  <option value="" disabled>
                    Select an option
                  </option>

                  <option value="yes">Yes</option>
                  <option value="no">No</option>

                </select>
              </div>

              <div className="flex flex-wrap rounded-md input_field">
                <label
                  htmlFor="circumcised"
                  className="rounded-l-md w-full md:w-[120px] xl:w-[195px] md:min-h-[49px] flex items-center justify-start md:px-2 lg:px-4 text-sm mb-1 md:mb-0 md:text-text-xs xl:text-base text-orange md:text-white  font-normal leading-5 xl:leading-29 text-center lg:text-start"
                >
                  Circuncised
                </label>
                <select
                  name="circumcised"
                  id="circumcised"
                  className="bg-black-20 border rounded-md md:rounded-none md:border-none md:border-l-2 md:rounded-r-md border-orange focus:outline-none focus-visible:none w-full md:w-[calc(100%-120px)] xl:w-[calc(100%-195px)] h-[49px] text-white font-normal xl:text-lg rounded-r-md text-sm px-2 xl:px-4 py-2.5 text-start placeholder:text-lg placeholder:text-gray items-center flex justify-between"
                  value={userDetails.circumcised}
                  onChange={handleChange}
                >
                  <option value="" disabled>
                    Select an option
                  </option>

                  <option value="Yes">Yes</option>
                  <option value="No">No</option>

                </select>
              </div>

              <div className="flex flex-wrap rounded-md input_field">
                <label
                  htmlFor="looks"
                  className="rounded-l-md w-full md:w-[120px] xl:w-[195px] md:min-h-[49px] flex items-center justify-start md:px-2 lg:px-4 text-sm mb-1 md:mb-0 md:text-text-xs xl:text-base text-orange md:text-white  font-normal leading-5 xl:leading-29 text-center lg:text-start"
                >
                  Looks
                </label>
                <select
                  name="looks"
                  id="looks"
                  className="bg-black-20 border rounded-md md:rounded-none md:border-none md:border-l-2 md:rounded-r-md border-orange focus:outline-none focus-visible:none w-full md:w-[calc(100%-120px)] xl:w-[calc(100%-195px)] h-[49px] text-white font-normal xl:text-lg rounded-r-md text-sm px-2 xl:px-4 py-2.5 text-start placeholder:text-lg placeholder:text-gray items-center flex justify-between"
                  value={userDetails.looks}
                  onChange={handleChange}
                >
                  <option value="" disabled>
                    Select an option
                  </option>

                  <option value="low importance">Low Importance</option>
                  <option value="medium importance">
                    Medium Importance
                  </option>
                  <option value="very importance">Very Importance</option>
                  <option value="no">No</option>

                </select>
              </div>

              <div className="flex flex-wrap rounded-md input_field">
                <label
                  htmlFor="intelligence"
                  className="rounded-l-md w-full md:w-[120px] xl:w-[195px] md:min-h-[49px] flex items-center justify-start md:px-2 lg:px-4 text-sm mb-1 md:mb-0 md:text-text-xs xl:text-base text-orange md:text-white  font-normal leading-5 xl:leading-29 text-center lg:text-start"
                >
                  Intelligence
                </label>
                <select
                  name="intelligence"
                  id="intelligence"
                  className="bg-black-20 border rounded-md md:rounded-none md:border-none md:border-l-2 md:rounded-r-md border-orange focus:outline-none focus-visible:none w-full md:w-[calc(100%-120px)] xl:w-[calc(100%-195px)] h-[49px] text-white font-normal xl:text-lg rounded-r-md text-sm px-2 xl:px-4 py-2.5 text-start placeholder:text-lg placeholder:text-gray items-center flex justify-between"
                  value={userDetails.intelligence}
                  onChange={handleChange}
                >
                  <option value="" disabled>
                    Select an option
                  </option>

                  <option value="low importance">Low Importance</option>
                  <option value="medium importance">
                    Medium Importance
                  </option>
                  <option value="very importance">Very Importance</option>
                  <option value="no">No</option>

                </select>
              </div>

              <div className="flex flex-wrap rounded-md input_field">
                <label
                  htmlFor="sexuality"
                  className="rounded-l-md w-full md:w-[120px] xl:w-[195px] md:min-h-[49px] flex items-center justify-start md:px-2 lg:px-4 text-sm mb-1 md:mb-0 md:text-text-xs xl:text-base text-orange md:text-white  font-normal leading-5 xl:leading-29 text-center lg:text-start"
                >
                  Sexuality
                </label>
                <select
                  name="sexuality"
                  id="sexuality"
                  className="bg-black-20 border rounded-md md:rounded-none md:border-none md:border-l-2 md:rounded-r-md border-orange focus:outline-none focus-visible:none w-full md:w-[calc(100%-120px)] xl:w-[calc(100%-195px)] h-[49px] text-white font-normal xl:text-lg rounded-r-md text-sm px-2 xl:px-4 py-2.5 text-start placeholder:text-lg placeholder:text-gray items-center flex justify-between"
                  value={userDetails.sexuality}
                  onChange={handleChange}
                >
                  <option value="" disabled>
                    Select an option
                  </option>

                  <option value="straight">Straight </option>
                  <option value="bi-sexual">Bi-Sexual</option>
                  <option value="bi-curious">Bi-Curious</option>
                  <option value="gay">Gay</option>
                  <option value="pansexual">Pansexual</option>

                </select>
              </div>

              <div className="flex flex-wrap rounded-md input_field">
                <label
                  htmlFor="relationship_status"
                  className="rounded-l-md w-full md:w-[120px] xl:w-[195px] md:min-h-[49px] flex items-center justify-start md:px-2 lg:px-4 text-sm mb-1 md:mb-0 md:text-text-xs xl:text-base text-orange md:text-white  font-normal leading-5 xl:leading-29 text-center lg:text-start"
                >
                 Relation
                </label>
                <select
                  name="relationship_status"
                  id="relationship_status"
                  className="bg-black-20 border rounded-md md:rounded-none md:border-none md:border-l-2 md:rounded-r-md border-orange focus:outline-none focus-visible:none w-full md:w-[calc(100%-120px)] xl:w-[calc(100%-195px)] h-[49px] text-white font-normal xl:text-lg rounded-r-md text-sm px-2 xl:px-4 py-2.5 text-start placeholder:text-lg placeholder:text-gray items-center flex justify-between"
                  value={userDetails.relationship_status}
                  onChange={handleChange}
                >
                  <option value="" disabled>
                    Select an option
                  </option>

                  <option value="monogamous">Monogamous</option>
                  <option value="open-minded"> Open-Minded</option>
                  <option value="swinger">Swinger</option>
                  <option value="polyamorous">Polyamorous</option>

                </select>
              </div>

              <div className="flex flex-wrap rounded-md input_field">
                <label
                  htmlFor="experience"
                  className="rounded-l-md w-full md:w-[120px] xl:w-[195px] md:min-h-[49px] flex items-center justify-start md:px-2 lg:px-4 text-sm mb-1 md:mb-0 md:text-text-xs xl:text-base text-orange md:text-white  font-normal leading-5 xl:leading-29 text-center lg:text-start"
                >
                  Experience
                </label>
                <select
                  name="experience"
                  id="experience"
                  className="bg-black-20 border rounded-md md:rounded-none md:border-none md:border-l-2 md:rounded-r-md border-orange focus:outline-none focus-visible:none w-full md:w-[calc(100%-120px)] xl:w-[calc(100%-195px)] h-[49px] text-white font-normal xl:text-lg rounded-r-md text-sm px-2 xl:px-4 py-2.5 text-start placeholder:text-lg placeholder:text-gray items-center flex justify-between"
                  value={userDetails.experience}
                  onChange={handleChange}
                >
                  <option value="" disabled>
                    Select an option
                  </option>

                  <option value="curious">Curious</option>
                  <option value="newbie"> Newbie</option>
                  <option value="intermediate">Intermediate</option>
                  <option value="advanced">Advanced</option>

                </select>
              </div>
              <div className="flex flex-wrap rounded-md input_field">
                <label
                  htmlFor="Drinking"
                  className="rounded-l-md w-full md:w-[120px] xl:w-[195px] md:min-h-[49px] flex items-center justify-start md:px-2 lg:px-4 text-sm mb-1 md:mb-0 md:text-text-xs xl:text-base text-orange md:text-white  font-normal leading-5 xl:leading-29 text-center lg:text-start"
                >
                  Drinking
                </label>
                <select
                  name="Drinking"
                  id="Drinking"
                  className="bg-black-20 border rounded-md md:rounded-none md:border-none md:border-l-2 md:rounded-r-md border-orange focus:outline-none focus-visible:none w-full md:w-[calc(100%-120px)] xl:w-[calc(100%-195px)] h-[49px] text-white font-normal xl:text-lg rounded-r-md text-sm px-2 xl:px-4 py-2.5 text-start placeholder:text-lg placeholder:text-gray items-center flex justify-between"
                  value={userDetails.Drinking}
                  onChange={handleChange}
                >
                  <option value="" disabled>
                    Select an option
                  </option>

                  <option value="Not your business">Not your business</option>
                  <option value="Like a cactus"> Like a cactus</option>
                  <option value="I drink if offered">I drink if offered</option>
                  <option value="Like a fish">Like a fish</option>

                </select>
              </div>
              <div className="flex flex-wrap rounded-md input_field">
                <label
                  htmlFor="Drugs"
                  className="rounded-l-md w-full md:w-[120px] xl:w-[195px] md:min-h-[49px] flex items-center justify-start md:px-2 lg:px-4 text-sm mb-1 md:mb-0 md:text-text-xs xl:text-base text-orange md:text-white  font-normal leading-5 xl:leading-29 text-center lg:text-start"
                >
                  Drugs
                </label>
                <select
                  name="Drugs"
                  id="Drugs"
                  className="bg-black-20 border rounded-md md:rounded-none md:border-none md:border-l-2 md:rounded-r-md border-orange focus:outline-none focus-visible:none w-full md:w-[calc(100%-120px)] xl:w-[calc(100%-195px)] h-[49px] text-white font-normal xl:text-lg rounded-r-md text-sm px-2 xl:px-4 py-2.5 text-start placeholder:text-lg placeholder:text-gray items-center flex justify-between"
                  value={userDetails.Drugs}
                  onChange={handleChange}
                >
                  <option value="" disabled>
                    Select an option
                  </option>

                  <option value="Not your business">Not your business</option>
                  <option value="No, thanks">No, thanks</option>
                  <option value="Yes, thanks">Yes, thanks</option>
                  <option value="More, thanks">More, thanks</option>

                </select>
              </div>
              <div className="flex flex-wrap rounded-md input_field">
                <label
                  htmlFor="Drugs"
                  className="rounded-l-md w-full md:w-[120px] xl:w-[195px] md:min-h-[49px] flex items-center justify-start md:px-2 lg:px-4 text-sm mb-1 md:mb-0 md:text-text-xs xl:text-base text-orange md:text-white  font-normal leading-5 xl:leading-29 text-center lg:text-start"
                >
                  Relationship Status
                </label>
                <select
                  name="Relationship"
                  id="Relationship"
                  className="bg-black-20 border rounded-md md:rounded-none md:border-none md:border-l-2 md:rounded-r-md border-orange focus:outline-none focus-visible:none w-full md:w-[calc(100%-120px)] xl:w-[calc(100%-195px)] h-[49px] text-white font-normal xl:text-lg rounded-r-md text-sm px-2 xl:px-4 py-2.5 text-start placeholder:text-lg placeholder:text-gray items-center flex justify-between"
                  value={userDetails.Relationship}
                  onChange={handleChange}
                >
                  <option value="" disabled>
                    Select an option
                  </option>

                  <option value="Single">Single</option>
                  <option value="Married">Married</option>
                  <option value="FWB">FWB</option>
                  </select>
              </div>
              <div className="flex flex-wrap rounded-md input_field">
                <label
                  htmlFor="Language"
                  className="rounded-l-md w-full md:w-[120px] xl:w-[195px] md:min-h-[49px] flex items-center justify-start md:px-2 lg:px-4 text-sm mb-1 md:mb-0 md:text-text-xs xl:text-base text-orange md:text-white  font-normal leading-5 xl:leading-29 text-center lg:text-start"
                >
                  Language
                </label>
                <input className="bg-black-20 border rounded-md md:rounded-none md:border-none md:border-l-2 md:rounded-r-md border-orange focus:outline-none focus-visible:none w-full md:w-[calc(100%-120px)] xl:w-[calc(100%-195px)] h-[49px] text-white font-normal xl:text-lg rounded-r-md text-sm px-2 xl:px-4 py-2.5 text-start placeholder:text-lg placeholder:text-gray items-center flex justify-between"
                 id="Language" type="text" placeholder="Languages"  onChange={handleChange} name="Language" value={userDetails.Language}></input>
              </div>
              <div>
                <label
                  htmlFor="slogan_msg"
                  className="gradient w-full h-[53px] flex items-center justify-center xl:text-base text-white  font-normal leading-29 rounded-md mb-6"
                >
                  Slogan
                </label>
                <div className="p-[2px] gradient rounded-md">
                  <textarea
                    type="text"
                    id="slogan_msg"
                    rows={4}
                    name="slogan"
                    value={userDetails.slogan}
                    onChange={handleChange}
                    className="bg-black-20 focus:outline-none focus-visible:none w-full border-gradient3 text-white font-normal xl:text-lg rounded-md text-sm px-2 xl:px-4 py-2.5 items-center flex justify-between"
                  ></textarea>
                </div>
              </div>
            </div>

            {/* _______________________________PERSON 2_____________________ */}
            <div className="grid gap-y-4 md:gap-y-6">
                <div className="">
                {isEditing==="person2"?
                  <input type="text"  ref={ref} placeholder="person2 Name"
                  value={person2.person2_Name}
                  name="person2_Name"

                  onKeyUp={(e) => {
                    if (e.key === 'Enter') {
                      setIsEditing(false);
                    }
                  }}
                  onChange={handleChange2}
                  className="w-80 border-2 border-orange
                  rounded-[5px] h-[27px]
                  text-black px-5 font-light"
                  />:
                    <p className="text-2xl font-medium flex justify-between">
                    {person2.person2_Name ? person2.person2_Name :userInfo?.couple?.person2?.person2_Name? userInfo?.couple?.person2?.person2_Name : "Person 2"}
                    <span className="flex items-center text-xl cursor-pointer">
                      <MdOutlineModeEditOutline  onClick={()=>handleEditClick("person2")} /></span>
                    </p>}
                    
                </div>
    
              <div>
                <div className="flex flex-wrap rounded-md input_field">
                  <label
                    htmlFor="DOB2"
                    className="rounded-l-md w-full md:w-[120px] xl:w-[195px] md:min-h-[49px] flex items-center justify-start md:px-2 lg:px-4 text-sm mb-1 md:mb-0 md:text-text-xs xl:text-base text-orange md:text-white  font-normal leading-5 xl:leading-29 text-center lg:text-start"
                  >
                Birthday
                  </label>
                  <input
                    type="date"
                    id="DOB2"
                    name="DOB"
                    value={person2.DOB}
                    onChange={handleChange2}
                    className="bg-black-20 border rounded-md md:rounded-none md:border-none md:border-l-2 md:rounded-r-md border-orange focus:outline-none focus-visible:none w-full md:w-[calc(100%-120px)] xl:w-[calc(100%-195px)] h-[49px] text-white font-normal xl:text-lg rounded-r-md text-sm px-2 xl:px-4 py-2.5 text-start placeholder:text-lg placeholder:text-gray items-center flex justify-between"
                  />
                </div>
              </div>
              <div className="flex flex-wrap rounded-md input_field">
                <label
                  htmlFor="gender2"
                  className="rounded-l-md w-full md:w-[120px] xl:w-[195px] md:min-h-[49px] flex items-center justify-start md:px-2 lg:px-4 text-sm mb-1 md:mb-0 md:text-text-xs xl:text-base text-orange md:text-white  font-normal leading-5 xl:leading-29 text-center lg:text-start"
                >
                  Gender
                </label>
                <select
                  name="gender"
                  id="gender2"
                  className="bg-black-20 border rounded-md md:rounded-none md:border-none md:border-l-2 md:rounded-r-md border-orange focus:outline-none focus-visible:none w-full md:w-[calc(100%-120px)] xl:w-[calc(100%-195px)] h-[49px] text-white font-normal xl:text-lg rounded-r-md text-sm px-2 xl:px-4 py-2.5 text-start placeholder:text-lg placeholder:text-gray items-center flex justify-between"
                  value={person2.gender}
                  onChange={handleChange2}
                >
                  <option value="" disabled>
                    Select an option
                  </option>

                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="transgender">Transgender</option>
                </select>
              </div>

              <div className="grid items-center ctm_select_drop rounded-md input_fields relative">
                <div className="p-2 rounded-lg input_field">
                  <label
                    htmlFor="body_hair2"
                    className="flex justify-between items-center w-full bg-black-20"
         
                  ><span className="gradient gradient rounded-l-md w-full md:w-[120px] xl:w-[195px] md:min-h-[49px] flex items-center justify-start md:px-2 lg:px-4 text-sm mb-1 md:mb-0 md:text-text-xs xl:text-base text-orange md:text-white  font-normal leading-5 xl:leading-29 text-center lg:text-start">Body Hair</span>

                  <div
                     
                     className="select_label bg-black-20 border rounded-md md:rounded-none md:border-none md:border-l-2 md:rounded-r-md border-orange focus:outline-none focus-visible:none w-full md:w-[calc(100%-120px)] xl:w-[calc(100%-195px)] min-h-[49px] text-white font-normal xl:text-lg rounded-r-md text-sm px-2 xl:px-4 py-2.5 text-start placeholder:text-lg placeholder:text-gray items-center flex justify-between"
                     name="body_hair"
                     value={person2.body_hair}
                     onChange={handleChange2}
                          onClick={()=>setCtmSelect2(!ctmSelect2)}
                   >
                     {person2.body_hair.length === 0
                       ? person2.body_hair|| "Please select"
                       : person2?.body_hair.map((el,i) => <span>
                        {el}{i!==0 && i!==person2?.body_hair.length-1 && <span>, </span>}</span>)}
                        <span className="select_label_icon"><BiChevronDown /></span>
                   </div>
                     
                  </label>
                </div>

                
                <div className={`select_ctmBox ${ctmSelect2 ? 'active' : ''}`}>
                  <div className="select_label" name="body_hair">
                      <span></span>
                        
                    </div>
                  <div className="select_options">
                  <div className="optionBox">Please select</div>
                    {hair.map((el, i) => (
                      <div className="optionBox" key={i}>
                        <span>{el.name}</span>
                        <div className="input_option">
                          <input
                            id={`${el.label}2`}
                            type="checkbox"
                            name={`${el.label}2`}
                            value={el.name}
                            onChange={handleBodyhair2}
                            checked={person2.body_hair.includes(el.name) || el.selected}
                          />
                          <label htmlFor={`${el.label}2`}></label>
                        </div>
                      </div>
                    ))}
                    </div>
                </div>
                
         
              </div>


  

            
                        <div className="flex flex-wrap rounded-md input_field">
                <label
                  htmlFor="body_type2"
                  className="rounded-l-md w-full md:w-[120px] xl:w-[195px] md:min-h-[49px] flex items-center justify-start md:px-2 lg:px-4 text-sm mb-1 md:mb-0 md:text-text-xs xl:text-base text-orange md:text-white  font-normal leading-5 xl:leading-29 text-center lg:text-start"
                >
             Body Type
                </label>
                <select
                  name="body_type"
                  id="body_type2"
                  className="bg-black-20 border rounded-md md:rounded-none md:border-none md:border-l-2 md:rounded-r-md border-orange focus:outline-none focus-visible:none w-full md:w-[calc(100%-120px)] xl:w-[calc(100%-195px)] h-[49px] text-white font-normal xl:text-lg rounded-r-md text-sm px-2 xl:px-4 py-2.5 text-start placeholder:text-lg placeholder:text-gray items-center flex justify-between"
                  value={person2.body_type}
                  onChange={handleChange2}
                >
                  <option value="" disabled>
                    Select an option
                  </option>

                  <option value="Slim">Slim</option>
                  <option value="Athletic">Athletic</option>
                  <option value="Average">Average</option>
                  <option value="AthlNicely Shapedetic">Nicely Shaped</option>
                  <option value="More of me to Love">More of me to Love</option>
                  <option value="Huggable and heavy">Huggable and heavy</option>
                </select>
                
              </div>
              <div>
                <div className="flex flex-wrap rounded-md input_field">
                  <label
                    htmlFor="height2"
                    className="rounded-l-md w-full md:w-[120px] xl:w-[195px] md:min-h-[49px] flex items-center justify-start md:px-2 lg:px-4 text-sm mb-1 md:mb-0 md:text-text-xs xl:text-base text-orange md:text-white  font-normal leading-5 xl:leading-29 text-center lg:text-start"
                  >
                    Height
                  </label>
                  <select
                        className="bg-black-20 border rounded-md md:rounded-none md:border-none md:border-l-2 md:rounded-r-md border-orange focus:outline-none focus-visible:none w-full md:w-[calc(100%-120px)] xl:w-[calc(100%-195px)] h-[49px] text-white font-normal xl:text-lg rounded-r-md text-sm px-2 xl:px-4 py-2.5 text-start placeholder:text-lg placeholder:text-gray items-center flex justify-between"
                        name="height"
                        value={person2.height}
                        onChange={handleChange2}
                      >
                        <option value="">Please Select</option>
                        {heights.map((height, i) => (
                          <option key={i} value={height}>
                            {height}
                          </option>
                        ))}
                      </select>
                </div>

              </div>
              <div>       <div className="flex flex-wrap rounded-md input_field">
                <label
                  htmlFor="race2"
                  className="rounded-l-md w-full md:w-[120px] xl:w-[195px] md:min-h-[49px] flex items-center justify-start md:px-2 lg:px-4 text-sm mb-1 md:mb-0 md:text-text-xs xl:text-base text-orange md:text-white  font-normal leading-5 xl:leading-29 text-center lg:text-start"
                >
                  Weight
                </label>
                <select
                        className="bg-black-20 border rounded-md md:rounded-none md:border-none md:border-l-2 md:rounded-r-md border-orange focus:outline-none focus-visible:none w-full md:w-[calc(100%-120px)] xl:w-[calc(100%-195px)] h-[49px] text-white font-normal xl:text-lg rounded-r-md text-sm px-2 xl:px-4 py-2.5 text-start placeholder:text-lg placeholder:text-gray items-center flex justify-between"
                        name="weight"
                        value={person2.weight}
                        onChange={handleChange2}
                      >
                        <option value="">Please Select</option>
                        {weights.map((weight, i) => (
                          <option key={i} value={weight}>
                            {weight}
                          </option>
                        ))}
                      </select>
              </div></div>

<div className="flex flex-wrap rounded-md input_field">
                <label
                  htmlFor="ethnic_background2"
                  className="rounded-l-md w-full md:w-[120px] xl:w-[195px] md:min-h-[49px] flex items-center justify-start md:px-2 lg:px-4 text-sm mb-1 md:mb-0 md:text-text-xs xl:text-base text-orange md:text-white  font-normal leading-5 xl:leading-29 text-center lg:text-start"
                >
                Ethnic Background
                </label>
                <select
                  name="ethnic_background"
                  id="ethnic_background2"
                  className="bg-black-20 border rounded-md md:rounded-none md:border-none md:border-l-2 md:rounded-r-md border-orange focus:outline-none focus-visible:none w-full md:w-[calc(100%-120px)] xl:w-[calc(100%-195px)] h-[49px] text-white font-normal xl:text-lg rounded-r-md text-sm px-2 xl:px-4 py-2.5 text-start placeholder:text-lg placeholder:text-gray items-center flex justify-between"
                  value={person2.ethnic_background}
                  onChange={handleChange2}
                >
                  <option value="" disabled>
                    Select an option
                  </option>

                  <option value="Caucasian">Caucasian</option>
                  <option value="Hispanic/Latin">Hispanic/Latin</option>
                  <option value="Black/African-American">Black/African-American</option>
                  <option value="Asian">Asian</option>
                  <option value="Indian">Indian</option>
                  <option value="Indigenous">Indigenous</option>
                  <option value="Middle Eastern">Middle Eastern</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <div className="flex flex-wrap rounded-md input_field">
                <label
                  htmlFor="smoking2"
                  className="rounded-l-md w-full md:w-[120px] xl:w-[195px] md:min-h-[49px] flex items-center justify-start md:px-2 lg:px-4 text-sm mb-1 md:mb-0 md:text-text-xs xl:text-base text-orange md:text-white  font-normal leading-5 xl:leading-29 text-center lg:text-start"
                >
                  Smoking
                </label>
                <select
                  name="smoking"
                  id="smoking2"
                  className="bg-black-20 border rounded-md md:rounded-none md:border-none md:border-l-2 md:rounded-r-md border-orange focus:outline-none focus-visible:none w-full md:w-[calc(100%-120px)] xl:w-[calc(100%-195px)] h-[49px] text-white font-normal xl:text-lg rounded-r-md text-sm px-2 xl:px-4 py-2.5 text-start placeholder:text-lg placeholder:text-gray items-center flex justify-between"
                  value={person2.smoking}
                  onChange={handleChange2}
                >
                  <option value="" disabled>
                    Select an option
                  </option>

                  <option value="yes">Yes</option>
                  <option value="no">No</option>
                  <option value="occasionaly">Occasionaly</option>

                </select>
              </div>
              <div className="flex flex-wrap rounded-md input_field">
                <label
                  htmlFor="tattoos2"
                  className="rounded-l-md w-full md:w-[120px] xl:w-[195px] md:min-h-[49px] flex items-center justify-start md:px-2 lg:px-4 text-sm mb-1 md:mb-0 md:text-text-xs xl:text-base text-orange md:text-white  font-normal leading-5 xl:leading-29 text-center lg:text-start"
                >
                  Tattoos
                </label>
                <select
                  name="tattoos"
                  id="tattoos2"
                  className="bg-black-20 border rounded-md md:rounded-none md:border-none md:border-l-2 md:rounded-r-md border-orange focus:outline-none focus-visible:none w-full md:w-[calc(100%-120px)] xl:w-[calc(100%-195px)] h-[49px] text-white font-normal xl:text-lg rounded-r-md text-sm px-2 xl:px-4 py-2.5 text-start placeholder:text-lg placeholder:text-gray items-center flex justify-between"
                  value={person2.tattoos}
                  onChange={handleChange2}
                >
                  <option value="" disabled>
                    Select an option
                  </option>

                  <option value="yes">Yes</option>
                  <option value="no">No</option>
                  <option value="a few">A few</option>
                </select>
              </div>


              <div className="flex flex-wrap rounded-md input_field">
                <label
                  htmlFor="piercings2"
                  className="rounded-l-md w-full md:w-[120px] xl:w-[195px] md:min-h-[49px] flex items-center justify-start md:px-2 lg:px-4 text-sm mb-1 md:mb-0 md:text-text-xs xl:text-base text-orange md:text-white  font-normal leading-5 xl:leading-29 text-center lg:text-start"
                >
                  Piercings
                </label>
                <select
                  name="piercings"
                  id="piercings2"
                  className="bg-black-20 border rounded-md md:rounded-none md:border-none md:border-l-2 md:rounded-r-md border-orange focus:outline-none focus-visible:none w-full md:w-[calc(100%-120px)] xl:w-[calc(100%-195px)] h-[49px] text-white font-normal xl:text-lg rounded-r-md text-sm px-2 xl:px-4 py-2.5 text-start placeholder:text-lg placeholder:text-gray items-center flex justify-between"
                  value={person2.piercings}
                  onChange={handleChange2}
                >
                  <option value="" disabled>
                    Select an option
                  </option>

                  <option value="yes">Yes</option>
                  <option value="no">No</option>

                </select>
              </div>

              <div className="flex flex-wrap rounded-md input_field">
                <label
                  htmlFor="circumcised2"
                  className="rounded-l-md w-full md:w-[120px] xl:w-[195px] md:min-h-[49px] flex items-center justify-start md:px-2 lg:px-4 text-sm mb-1 md:mb-0 md:text-text-xs xl:text-base text-orange md:text-white  font-normal leading-5 xl:leading-29 text-center lg:text-start"
                >
                  Circuncised
                </label>
                <select
                  name="circumcised"
                  id="circumcised2"
                  className="bg-black-20 border rounded-md md:rounded-none md:border-none md:border-l-2 md:rounded-r-md border-orange focus:outline-none focus-visible:none w-full md:w-[calc(100%-120px)] xl:w-[calc(100%-195px)] h-[49px] text-white font-normal xl:text-lg rounded-r-md text-sm px-2 xl:px-4 py-2.5 text-start placeholder:text-lg placeholder:text-gray items-center flex justify-between"
                  value={person2.circumcised}
                  onChange={handleChange2}
                >
                  <option value="" disabled>
                    Select an option
                  </option>

                  <option value="yes">Yes</option>
                  <option value="no">No</option>

                </select>
              </div>

              <div className="flex flex-wrap rounded-md input_field">
                <label
                  htmlFor="looks2"
                  className="rounded-l-md w-full md:w-[120px] xl:w-[195px] md:min-h-[49px] flex items-center justify-start md:px-2 lg:px-4 text-sm mb-1 md:mb-0 md:text-text-xs xl:text-base text-orange md:text-white  font-normal leading-5 xl:leading-29 text-center lg:text-start"
                >
                  Looks
                </label>
                <select
                  name="looks"
                  id="looks2"
                  className="bg-black-20 border rounded-md md:rounded-none md:border-none md:border-l-2 md:rounded-r-md border-orange focus:outline-none focus-visible:none w-full md:w-[calc(100%-120px)] xl:w-[calc(100%-195px)] h-[49px] text-white font-normal xl:text-lg rounded-r-md text-sm px-2 xl:px-4 py-2.5 text-start placeholder:text-lg placeholder:text-gray items-center flex justify-between"
                  value={person2.looks}
                  onChange={handleChange2}
                >
                  <option value="" disabled>
                    Select an option
                  </option>

                  <option value="low importance">Low Importance</option>
                  <option value="medium importance">
                    Medium Importance
                  </option>
                  <option value="very importance">Very Importance</option>
                  <option value="no">No</option>

                </select>
              </div>

              <div className="flex flex-wrap rounded-md input_field">
                <label
                  htmlFor="intelligence2"
                  className="rounded-l-md w-full md:w-[120px] xl:w-[195px] md:min-h-[49px] flex items-center justify-start md:px-2 lg:px-4 text-sm mb-1 md:mb-0 md:text-text-xs xl:text-base text-orange md:text-white  font-normal leading-5 xl:leading-29 text-center lg:text-start"
                >
                  Intelligence
                </label>
                <select
                  name="intelligence"
                  id="intelligence2"
                  className="bg-black-20 border rounded-md md:rounded-none md:border-none md:border-l-2 md:rounded-r-md border-orange focus:outline-none focus-visible:none w-full md:w-[calc(100%-120px)] xl:w-[calc(100%-195px)] h-[49px] text-white font-normal xl:text-lg rounded-r-md text-sm px-2 xl:px-4 py-2.5 text-start placeholder:text-lg placeholder:text-gray items-center flex justify-between"
                  value={person2.intelligence}
                  onChange={handleChange2}
                >
                  <option value="" disabled>
                    Select an option
                  </option>

                  <option value="low importance">Low Importance</option>
                  <option value="medium importance">
                    Medium Importance
                  </option>
                  <option value="very importance">Very Importance</option>
                  <option value="no">No</option>

                </select>
              </div>

              <div className="flex flex-wrap rounded-md input_field">
                <label
                  htmlFor="sexuality2"
                  className="rounded-l-md w-full md:w-[120px] xl:w-[195px] md:min-h-[49px] flex items-center justify-start md:px-2 lg:px-4 text-sm mb-1 md:mb-0 md:text-text-xs xl:text-base text-orange md:text-white  font-normal leading-5 xl:leading-29 text-center lg:text-start"
                >
                  Sexuality
                </label>
                <select
                  name="sexuality"
                  id="sexuality2"
                  className="bg-black-20 border rounded-md md:rounded-none md:border-none md:border-l-2 md:rounded-r-md border-orange focus:outline-none focus-visible:none w-full md:w-[calc(100%-120px)] xl:w-[calc(100%-195px)] h-[49px] text-white font-normal xl:text-lg rounded-r-md text-sm px-2 xl:px-4 py-2.5 text-start placeholder:text-lg placeholder:text-gray items-center flex justify-between"
                  value={person2.sexuality}
                  onChange={handleChange2}
                >
                  <option value="" disabled>
                    Select an option
                  </option>

                  <option value="straight">Straight </option>
                  <option value="bi-sexual">Bi-Sexual</option>
                  <option value="bi-curious">Bi-Curious</option>
                  <option value="gay">Gay</option>
                  <option value="pansexual">Pansexual</option>

                </select>
              </div>

              <div className="flex flex-wrap rounded-md input_field">
                <label
                  htmlFor="relationship_status"
                  className="rounded-l-md w-full md:w-[120px] xl:w-[195px] md:min-h-[49px] flex items-center justify-start md:px-2 lg:px-4 text-sm mb-1 md:mb-0 md:text-text-xs xl:text-base text-orange md:text-white  font-normal leading-5 xl:leading-29 text-center lg:text-start"
                >
                  Realation
                </label>
                <select
                  name="relationship_status"
                  id="relationship_status"
                  className="bg-black-20 border rounded-md md:rounded-none md:border-none md:border-l-2 md:rounded-r-md border-orange focus:outline-none focus-visible:none w-full md:w-[calc(100%-120px)] xl:w-[calc(100%-195px)] h-[49px] text-white font-normal xl:text-lg rounded-r-md text-sm px-2 xl:px-4 py-2.5 text-start placeholder:text-lg placeholder:text-gray items-center flex justify-between"
                  value={person2.relationship_status}
                  onChange={handleChange2}
                >
                  <option value="" disabled>
                    Select an option
                  </option>

                  <option value="monogamous">Monogamous</option>
                  <option value="open-minded"> Open-Minded</option>
                  <option value="swinger">Swinger</option>
                  <option value="polyamorous">Polyamorous</option>

                </select>
              </div>

              <div className="flex flex-wrap rounded-md input_field">
                <label
                  htmlFor="experience2"
                  className="rounded-l-md w-full md:w-[120px] xl:w-[195px] md:min-h-[49px] flex items-center justify-start md:px-2 lg:px-4 text-sm mb-1 md:mb-0 md:text-text-xs xl:text-base text-orange md:text-white  font-normal leading-5 xl:leading-29 text-center lg:text-start"
                >
                  Experience
                </label>
                <select
                  name="experience"
                  id="experience2"
                  className="bg-black-20 border rounded-md md:rounded-none md:border-none md:border-l-2 md:rounded-r-md border-orange focus:outline-none focus-visible:none w-full md:w-[calc(100%-120px)] xl:w-[calc(100%-195px)] h-[49px] text-white font-normal xl:text-lg rounded-r-md text-sm px-2 xl:px-4 py-2.5 text-start placeholder:text-lg placeholder:text-gray items-center flex justify-between"
                  value={person2.experience}
                  onChange={handleChange2}
                >
                  <option value="" disabled>
                    Select an option
                  </option>

                  <option value="curious">Curious</option>
                  <option value="newbie"> Newbie</option>
                  <option value="intermediate">Intermediate</option>
                  <option value="advanced">Advanced</option>

                </select>
              </div>
              <div className="flex flex-wrap rounded-md input_field">
                <label
                  htmlFor="Drinking2"
                  className="rounded-l-md w-full md:w-[120px] xl:w-[195px] md:min-h-[49px] flex items-center justify-start md:px-2 lg:px-4 text-sm mb-1 md:mb-0 md:text-text-xs xl:text-base text-orange md:text-white  font-normal leading-5 xl:leading-29 text-center lg:text-start"
                >
                  Drinking
                </label>
                <select
                  name="Drinking"
                  id="Drinking2"
                  className="bg-black-20 border rounded-md md:rounded-none md:border-none md:border-l-2 md:rounded-r-md border-orange focus:outline-none focus-visible:none w-full md:w-[calc(100%-120px)] xl:w-[calc(100%-195px)] h-[49px] text-white font-normal xl:text-lg rounded-r-md text-sm px-2 xl:px-4 py-2.5 text-start placeholder:text-lg placeholder:text-gray items-center flex justify-between"
                  value={person2.Drinking}
                  onChange={handleChange2}
                >
                  <option value="" disabled>
                    Select an option
                  </option>

                  <option value="Not your business">Not your business</option>
                  <option value="Like a cactus"> Like a cactus</option>
                  <option value="I drink if offered">I drink if offered</option>
                  <option value="Like a fish">Like a fish</option>

                </select>
              </div>
              <div className="flex flex-wrap rounded-md input_field">
                <label
                  htmlFor="Drugs2"
                  className="rounded-l-md w-full md:w-[120px] xl:w-[195px] md:min-h-[49px] flex items-center justify-start md:px-2 lg:px-4 text-sm mb-1 md:mb-0 md:text-text-xs xl:text-base text-orange md:text-white  font-normal leading-5 xl:leading-29 text-center lg:text-start"
                >
                  Drugs
                </label>
                <select
                  name="Drugs"
                  id="Drugs2"
                  className="bg-black-20 border rounded-md md:rounded-none md:border-none md:border-l-2 md:rounded-r-md border-orange focus:outline-none focus-visible:none w-full md:w-[calc(100%-120px)] xl:w-[calc(100%-195px)] h-[49px] text-white font-normal xl:text-lg rounded-r-md text-sm px-2 xl:px-4 py-2.5 text-start placeholder:text-lg placeholder:text-gray items-center flex justify-between"
                  value={person2.Drugs}
                  onChange={handleChange2}
                >
                  <option value="" disabled>
                    Select an option
                  </option>

                  <option value="Not your business">Not your business</option>
                  <option value="No, thanks">No, thanks</option>
                  <option value="Yes, thanks">Yes, thanks</option>
                  <option value="More, thanks">More, thanks</option>

                </select>
              </div>
              <div className="flex flex-wrap rounded-md input_field">
                <label
                  htmlFor="Relationship"
                  className="rounded-l-md w-full md:w-[120px] xl:w-[195px] md:min-h-[49px] flex items-center justify-start md:px-2 lg:px-4 text-sm mb-1 md:mb-0 md:text-text-xs xl:text-base text-orange md:text-white  font-normal leading-5 xl:leading-29 text-center lg:text-start"
                >
                  Relationship
                </label>
                <select
                  name="Relationship"
                  id="Relationship"
                  className="bg-black-20 border rounded-md md:rounded-none md:border-none md:border-l-2 md:rounded-r-md border-orange focus:outline-none focus-visible:none w-full md:w-[calc(100%-120px)] xl:w-[calc(100%-195px)] h-[49px] text-white font-normal xl:text-lg rounded-r-md text-sm px-2 xl:px-4 py-2.5 text-start placeholder:text-lg placeholder:text-gray items-center flex justify-between"
                  value={person2.Relationship}
                  onChange={handleChange2}
                >
                  <option value="" disabled>
                    Select an option
                  </option>

                  <option value="Single">Single</option>
                  <option value="Married">Married</option>
                  <option value="FWB">FWB</option>
                  </select>
              </div>
              <div className="flex flex-wrap rounded-md input_field">
                <label
                  htmlFor="Language"
                  className="rounded-l-md w-full md:w-[120px] xl:w-[195px] md:min-h-[49px] flex items-center justify-start md:px-2 lg:px-4 text-sm mb-1 md:mb-0 md:text-text-xs xl:text-base text-orange md:text-white  font-normal leading-5 xl:leading-29 text-center lg:text-start"
                >
                  Language
                </label>
                <input className="bg-black-20 border rounded-md md:rounded-none md:border-none md:border-l-2 md:rounded-r-md border-orange focus:outline-none focus-visible:none w-full md:w-[calc(100%-120px)] xl:w-[calc(100%-195px)] h-[49px] text-white font-normal xl:text-lg rounded-r-md text-sm px-2 xl:px-4 py-2.5 text-start placeholder:text-lg placeholder:text-gray items-center flex justify-between" 
                id="Language" type="text" placeholder="Languages"  onChange={handleChange2} name="Language" value={person2.Language}></input>
              </div>
              <div>
                <label
                  htmlFor="intro_msg"
                  className="gradient w-full h-[53px] flex items-center justify-center xl:text-base text-white  font-normal leading-29 rounded-md mb-6"
                >
                  Introduction
                </label>
                <div className="p-[2px] gradient rounded-md">
                  <textarea
                    type="text"
                    id="intro_msg"
                    rows={4}
                    name="introduction"
                    value={userDetails.introduction}
                    style={{ whiteSpace: 'pre-line' }}
                    onChange={handleChange}
                    className="bg-black-20 focus:outline-none focus-visible:none w-full border-gradient3 text-white font-normal xl:text-lg rounded-md text-sm px-2 xl:px-4 py-2.5 items-center flex justify-between"
                  ></textarea>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-6 grid gap-y-6">
          
              
          </div>
          <div className="flex justify-center">
          <button
            className="gradient !py-3 w-full max-w-xs ml-auto mr-auto md:mx-0 !text-lg xl:!text-25px capitalize !font-bold mt-10 !flex justify-center items-center text-white rounded-xl primary_btn"
            onClick={handleSave}
          >
            Save
          </button>
          </div>
        </form>
        <div className="audit-dating__block relative py-16">
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

export default CoupleEditDetailPage;
