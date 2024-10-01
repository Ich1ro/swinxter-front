import { useEffect, useState } from "react";
import axios from "axios";
import { IoCloseCircleSharp } from "react-icons/io5";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import api from "../../utils/api";
function EditClubPage() {
const[areaname,setAreaName]=useState([]);
const [image, setImage] = useState();
const [video, setVideo] = useState([]);
const[clubimages,setClubImages]=useState([])
const[coverimage,setCoverImage]=useState(null)
  const [selectlocation,setSelectedLocation]=useState([])
  const [SelectedImage, setSelectedImage] = useState([]);
const [SelectedVideo, setSelectedVideo] = useState(null);
const {clubId} = useParams();
const {user} = useSelector((state)=>state.auth);
const [userInfo,setUserInfo]=useState(user);
useEffect(()=>{
  setUserInfo(user)
},[])
  const navigate = useNavigate();
  const [club, setClub] = useState({
    club_name: "",
    Location: "",
    introduction: "",
    contact:"",
    email:"",
    website:"",

    Description: "",
    club_type: "",
  });

  const getClub = async () => {
    const { data } = await api.get(`/getClub/${clubId}`);

    setClub({
      club_name: data.clubname,
      Location: data.location?.display_name,
      introduction: data.introduction,
      email:data.email,
      website:data.website,
      contact:data.contact,
      Description: data.description,
      club_type: data.clubtype,
    });

    setSelectedImage(data.image);
    setSelectedVideo(data.video);
    setCoverImage(data.mainImage)
    setImage(data.mainImage)
    setClubImages(data.image)
    setVideo(data.video)
  };


  useEffect(()=>{
    axios.get(`https://us1.locationiq.com/v1/search?key=pk.9f0f98671dda49d28f0fdd64e6aa2634&q=${club['Location']}&format=json`).then((res)=>{ setAreaName(res.data)
    //  console.log(res.data);
     }).catch((err)=>console.log(err))
 },[club['Location']])

 const handleLocation =async(e)=>{;
  let value= e.target.value;
  const url= value?`https://us1.locationiq.com/v1/search?key=pk.9f0f98671dda49d28f0fdd64e6aa2634&q=${value}&format=json`:'';
  try{
    if(url){
      await axios.get(url).then((res)=>{ setAreaName(res.data)
      // console.log(res.data);
      }).catch((err)=>console.log(err))
      setClub({...club,['Location']:value})
     
    }else{
      setClub({...club,['Location']:value})
    }
  }catch(err){
    console.log(err)
  }
 
}

  useEffect(() => {
    getClub();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setClub({ ...club, [name]: value });
  };


const handleCoverChange=(e)=>{
const file = e.target.files[0];
    setCoverImage(file)
    if (!file) {
      return;
    } else {
      setImage(URL.createObjectURL(e.target.files[0]));
    }
  
}


const handleImageChange = (e) => {
  const file = Array.from(e.target.files);
      setSelectedImage([...SelectedImage,e.target.files[0]])
      if (!file) {
        return;
      } else {
        setClubImages([...clubimages,URL.createObjectURL(e.target.files[0])]);
      }
    };



    const removeimages=(index)=>{
      const update=clubimages.filter((el,i)=>i!==index  )
      const fil_data = SelectedImage.filter((el,i)=>i!==index)
        setClubImages(update)
        setSelectedImage(fil_data)
     }


  const handleVideoChange = (e) => {
   const file = Array.from(e.target.files)
    setSelectedVideo(file)
    if (!file) {
      return;
    } else {
      setVideo([...video,URL.createObjectURL(e.target.files[0])]);
    }
  };


  const removevideo=(index)=>{
    const update=video.filter((el,i)=>i!==index  )
    const fil_video = SelectedVideo.filter((el,i)=>i!==index)
    setSelectedVideo(fil_video)
    setVideo(update)
  }

  // ---------------------Update club data----------------
  const handleUpdate = async (e) => {
    e.preventDefault();
    const formData = new FormData();

    if (SelectedImage) {
      SelectedImage.forEach((image) => formData.append("image", image));
    }
    if (SelectedVideo) {
      SelectedVideo.forEach((video) => formData.append("video", video));
    }
    formData.append("clubname", club.club_name);
    formData.append("location", JSON.stringify(selectlocation));
    formData.append("description", club.Description);
    formData.append("clubtype", club.club_type);
    formData.append("introduction", club.introduction);
    formData.append("email", club.email);
    formData.append("website", club.website);
    formData.append("contact",club.contact)
    formData.append("ownerId", userInfo._id);

    try {
      const { data } = await api.put(
        `/update_club/${clubId}`,
        formData
      );

      if (data) {
        setClub({
          club_name: "",
          Location: "",
          introduction: "",
          contact:"",
          email:"",
          website:"",
          Description: "",
          club_type: "",
        });
        setSelectedImage(null);
        setSelectedVideo(null);
        toast.success("🦄Club Updated Successfully!", {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
        navigate("/club-page");
      } else {
        toast.error("🦄 Failed to Update Event!", {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="bg-white rounded-40px">
      <div className="text-center p-5 py-10 text-black">
        <h3 className="text-2xl sm:text-4xl mb-2">Edit your Club</h3>
        <p className="text-lg">Let’s Edit Your Notorious Club</p>
      </div>
      <div className="flex flex-wrap bg-black rounded-40px ">
        <div className="w-full md:w-3/5 xl:w-full 2xl:w-3/5 ">
          <div className="sign-up__form flex flex-col justify-center gap-30 py-6 px-6 lg:py-11 lg:px-14">
            <h2 className="text-white text-2xl sm:text-3xl xl:text-5xl text-center xl:text-start font-bold mb-6">
              Club Details
            </h2>

            <form
              className="flex flex-col justify-center gap-y-4 sm:gap-y-6"
              autoComplete="off"
            >
              <div className="flex flex-wrap rounded-md input_field_2">
                <label
                  htmlFor="club_name"
                  className="rounded-l-md w-full md:w-[120px] xl:w-[195px] sm:h-[49px] flex items-center justify-start sm:px-2 lg:px-4 text-sm mb-1 sm:mb-0 md:text-text-xs xl:text-lg text-white  font-normal leading-5 xl:leading-29 text-center 
                                            lg:text-start"
                >
                  Club Name*
                </label>
                <input
                  type="text"
                  id="club_name"
                  name="club_name"
                  value={club.club_name}
                  onChange={handleChange}
                  autoComplete="off"
                  className="bg-black border md:rounded-l-none rounded-md md:border-none md:border-l-2 md:rounded-r-md border-orange focus:outline-none focus-visible:none w-full md:w-[calc(100%-120px)] xl:w-[calc(100%-195px)] h-[49px] text-gray font-normal xl:text-lg rounded-r-md text-sm px-2 xl:px-4 py-2.5 text-start placeholder:text-lg placeholder:text-gray items-center flex justify-between"
                  required
                />
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
                  value={club.Location}
                  autocomplete="off"
                  className="bg-black border md:rounded-l-none rounded-md md:border-none md:border-l-2 md:rounded-r-md border-orange focus:outline-none focus-visible:none w-full md:w-[calc(100%-120px)] xl:w-[calc(100%-195px)] h-[49px] text-gray font-normal xl:text-lg rounded-r-md text-sm px-2 xl:px-4 py-2.5 text-start placeholder:text-lg placeholder:text-gray items-center flex justify-between"
                  required
                />

<div>
            
            {areaname.length!==0 && areaname.map((el,i)=>(
              <div style={{display:"flex",direction:"column", gap:"20px"}}>
               <div onClick={()=>{
                 setClub({...club,['Location']:el.display_name})
                 setSelectedLocation(el)
             setAreaName([])
             }} style={{width:"100%",border:0,borderBottom:"3px solid black",padding:"3px"}}>
           {el.display_name}</div>
              </div>
            ))} 
                        
                          </div>
              </div>
              <div className="flex flex-wrap rounded-md input_field_2">
                <label
                  htmlFor="introduction"
                  className="rounded-l-md w-full md:w-[120px] xl:w-[195px] sm:h-[49px] flex items-center justify-start sm:px-2 lg:px-4 text-sm mb-1 sm:mb-0 md:text-text-xs xl:text-lg text-white  font-normal leading-5 xl:leading-29 text-center 
                                            lg:text-start"
                >
                  Introduction
                </label>
                <input
                  type="text"
                  id="introduction"
                  name="introduction"
                  value={club.introduction}
                  onChange={handleChange}
                  style={{ whiteSpace: 'pre-line' }}
                  autoComplete="off"
                  className="bg-black border md:rounded-l-none rounded-md md:border-none md:border-l-2 md:rounded-r-md border-orange focus:outline-none focus-visible:none w-full md:w-[calc(100%-120px)] xl:w-[calc(100%-195px)] h-[49px] text-gray font-normal xl:text-lg rounded-r-md text-sm px-2 xl:px-4 py-2.5 text-start placeholder:text-lg placeholder:text-gray items-center flex justify-between"
                  required
                />
              </div>
              <div className="flex flex-wrap rounded-md input_field_2">
                <label
                  htmlFor="contact"
                  className="rounded-l-md w-full md:w-[120px] xl:w-[195px] sm:h-[49px] flex items-center justify-start sm:px-2 lg:px-4 text-sm mb-1 sm:mb-0 md:text-text-xs xl:text-lg text-white  font-normal leading-5 xl:leading-29 text-center 
                                            lg:text-start"
                >
                  Contact
                </label>
                <input
                  type="text"
                  id="contact"
                  name="contact"
                  value={club.contact}
                  onChange={handleChange}
                  onKeyPress={(event) => {
                    if (!/[0-9]/.test(event.key)) {
                      event.preventDefault();
                    }
                  }}
                  autoComplete="off"
                  className="bg-black border md:rounded-l-none rounded-md md:border-none md:border-l-2 md:rounded-r-md border-orange focus:outline-none focus-visible:none w-full md:w-[calc(100%-120px)] xl:w-[calc(100%-195px)] h-[49px] text-gray font-normal xl:text-lg rounded-r-md text-sm px-2 xl:px-4 py-2.5 text-start placeholder:text-lg placeholder:text-gray items-center flex justify-between"
                  required
                />
              </div>
              <div className="flex flex-wrap rounded-md input_field_2">
                <label
                  htmlFor="email"
                  className="rounded-l-md w-full md:w-[120px] xl:w-[195px] sm:h-[49px] flex items-center justify-start sm:px-2 lg:px-4 text-sm mb-1 sm:mb-0 md:text-text-xs xl:text-lg text-white  font-normal leading-5 xl:leading-29 text-center 
                                            lg:text-start"
                >
                  Email
                </label>
                <input
                  type="text"
                  id="email"
                  name="email"
                  value={club.email}
                  onChange={handleChange}
                  autoComplete="off"
                  className="bg-black border md:rounded-l-none rounded-md md:border-none md:border-l-2 md:rounded-r-md border-orange focus:outline-none focus-visible:none w-full md:w-[calc(100%-120px)] xl:w-[calc(100%-195px)] h-[49px] text-gray font-normal xl:text-lg rounded-r-md text-sm px-2 xl:px-4 py-2.5 text-start placeholder:text-lg placeholder:text-gray items-center flex justify-between"
                  required
                />
              </div>
              <div className="flex flex-wrap rounded-md input_field_2">
                <label
                  htmlFor="website"
                  className="rounded-l-md w-full md:w-[120px] xl:w-[195px] sm:h-[49px] flex items-center justify-start sm:px-2 lg:px-4 text-sm mb-1 sm:mb-0 md:text-text-xs xl:text-lg text-white  font-normal leading-5 xl:leading-29 text-center 
                                            lg:text-start"
                >
                  Website
                </label>
                <input
                  type="text"
                  id="website"
                  name="website"
                  value={club.website}
                  onChange={handleChange}
                  autoComplete="off"
                  className="bg-black border md:rounded-l-none rounded-md md:border-none md:border-l-2 md:rounded-r-md border-orange focus:outline-none focus-visible:none w-full md:w-[calc(100%-120px)] xl:w-[calc(100%-195px)] h-[49px] text-gray font-normal xl:text-lg rounded-r-md text-sm px-2 xl:px-4 py-2.5 text-start placeholder:text-lg placeholder:text-gray items-center flex justify-between"
                  required
                />
              </div>
              <div className="flex flex-col gap-30">
                <label
                  htmlFor="Description"
                  className="gradient w-full h-[49px] flex items-center justify-center text-lg text-white  font-normal leading-29 rounded-md mb-6"
                >
                  Description
                </label>
                <div className="p-[2px] gradient rounded-md">
                  <textarea
                    type="text"
                    id="Description"
                    rows={3}
                    name="Description"
                    value={club.Description}
                    onChange={handleChange}
                    style={{ whiteSpace: 'pre-line' }}
                    className="bg-black focus:outline-none focus-visible:none w-full border-gradient3 text-gray font-normal xl:text-lg rounded-md text-sm px-2 xl:px-4 py-2.5 text-center md:text-start items-center flex justify-between"
                    required
                  ></textarea>
                </div>
              </div>
              <div className="grid sm:grid-cols-2 gap-4">
               
              <label className="flex w-full bg-gray-900 py-[10px] px-4 text-lg items-center cursor-pointer rounded-md">
                  <span className="w-6 block mr-2">
                    <img src="images/gallery-icon.png" alt="gallery-icon" />
                  </span>
                  Upload Cover  Image
                  <input
                    type="file"
                    className="hidden"
                    multiple
                    onChange={(e)=>handleCoverChange(e)}
                  />
                </label>
                <div className="relative w-full">
                  <div className="preview_img relative z-[1] bg-white/50 rounded-md">
                 
                    {image && 
                    <>
                       <img className="w-full object-contain max-h-[100px]" src={image} />
                    <span className="preview_close absolute top-0 transform translate-x-[40%] -translate-y-[50%] right-0 object-contain text-xl z-[1] w-5 h-5 rounded-full bg-orange 
                    text-black" onClick={(e)=>setImage('')}><IoCloseCircleSharp/></span>
                    </>
                    }
                  </div>
                </div>
               
               
                <label className="flex w-full bg-gray-900 py-[10px] px-4 text-lg items-center cursor-pointer rounded-md">
                  <span className="w-6 block mr-2">
                    <img src="images/gallery-icon.png" alt="gallery-icon" />
                  </span>
                  Upload Club Images
                  <input
                    type="file"
                    className="hidden"
                    multiple
                    onChange={(e) => handleImageChange(e)}
                  />
                </label>

                <div className="grid grid-cols-2 gap-2"> 
                {clubimages.map((el,i)=>(
                  <>
                    <div key={i} className="preview_img relative z-[1] bg-white/50 rounded-md">
                  
                    {clubimages && 
                    <>
                      <img className="w-full object-contain max-h-[100px]" src={el} />
                    <span className="preview_close absolute top-0 transform translate-x-[40%] -translate-y-[50%] right-0 object-contain text-xl z-[1] w-5 h-5 rounded-full bg-orange text-black"
                     onClick={()=>removeimages(i)}>
                      <IoCloseCircleSharp /></span>
                      </>
                      }
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
                  Upload Club Videos
                  <input
                    type="file"
                    className="hidden"
                    multiple
                    onChange={(e)=>handleVideoChange(e)}
                  />
                </label>


                <div>
{video.map((el,i)=>
  <div key={i} className="preview_img relative z-[1] bg-white/50 rounded-md">

 

 {video &&
 <>
  <video  src={el} width="750" height="500" controls ></video>
 <span className="preview_close absolute top-0 transform translate-x-[40%] -translate-y-[50%] right-0 object-contain text-xl z-[1] w-5 h-5 rounded-full bg-orange text-black"
                     onClick={()=>removevideo(i)}>
                      <IoCloseCircleSharp /></span>
                      </>
                      }
 </div>
 )}


  
</div>
        



              </div>
              <div>
                <p className="text-lg">CLUB TYPE *</p>
              </div>
              <div className="radio_btn_wrapper">
                <div className="radio_field">
                  <input
                    type="radio"
                    id="private_place"
                    className="hidden"
                    name="club_type"
                    value="Private Place"
                    checked={club.club_type === "Private Place"}
                    onChange={handleChange}
                  />
                  <label htmlFor="private_place">
                    <span className="radio_circle"></span>
                    <span className="radio_text">Private Place</span>
                  </label>
                </div>
                <div className="radio_field">
                  <input
                    type="radio"
                    id="public_place"
                    className="hidden"
                    name="club_type"
                    value="Public Place"
                    checked={club.club_type === "Public Place"}
                    onChange={handleChange}
                  />
                  <label htmlFor="public_place">
                    <span className="radio_circle"></span>
                    <span className="radio_text">Public Place</span>
                  </label>
                </div>
                <div className="radio_field">
                  <input
                    type="radio"
                    id="virtual_date"
                    className="hidden"
                    name="club_type"
                    value="Virtual Date"
                    checked={club.club_type === "Virtual Date"}
                    onChange={handleChange}
                  />
                  <label htmlFor="virtual_date">
                    <span className="radio_circle"></span>
                    <span className="radio_text">Virtual Date</span>
                  </label>
                </div>
              </div>
              {/* <p>{formErrors.introduction}</p> */}
              <button
                className="gradient !py-3 w-full !text-lg xl:!text-25px capitalize !font-bold flex justify-center items-center text-white rounded-xl primary_btn"
                onClick={handleUpdate}
              >
                Update
              </button>
            </form>
          </div>
        </div>
        <div className="md:w-2/5 xl:w-full 2xl:w-2/5">
          <img
            src="images/create-club-mod.png"
            alt="Create-club"
            className="block h-full w-full rounded-t-40px md:p-0 p-5 rounded-b-40px md:rounded-b-none md:rounded-br-40px md:rounded-r-40px xl:rounded-b-40px xl:rounded-tl-40px 2xl:rounded-l-none 2xl:rounded-r-40px object-cover object-center aspect-square md:aspect-auto xl:aspect-square 2xl:md:aspect-auto"
          />
        </div>
      </div>
    </div>
  );
}

export default EditClubPage;
