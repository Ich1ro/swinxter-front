import React, { useEffect, useState } from "react";
import { Link,useLocation,useNavigate } from "react-router-dom";
import { calculateAge } from "../../utils/CalculateAge";
import CoupleDetailPage from "./CoupleDetailid";
import { useSelector } from "react-redux";
import api from "../../utils/api";

const UserDetailPage = () => {
  const [age, setAge] = useState("");
  const [age2,setage2]=useState("")
  const {user} = useSelector
  ((state)=>state.auth);
  const [userInfo,setUserInfo]=useState();  
  const location = useLocation();
  const navigate = useNavigate();
  const [sent,setSent] = useState(0);

  const getUser = async () =>{
    const id = location.search.split("=")[1]
    const { data } = await api.get(`/user_details/${id}`);
    setUserInfo(data);
    if(user.sent_requests.includes(data._id)){
      setSent(1);
    }
    else{
      setSent(0);
    }
  }

  useEffect(()=>{
    if(location.search.length > 0){
      getUser();
    }
    else{
      setUserInfo(user) 
    }
  },[])

  console.log(userInfo)

useEffect(() => {
    if (userInfo?.profile_type === "single") {
      setAge(calculateAge(userInfo?.DOB));
    } else {
      setAge(calculateAge(userInfo?.couple?.person1.DOB));
      setage2(calculateAge(userInfo?.couple?.person2.DOB));
    }
}, []);

const handleRemove = async () => {
  try{
    await api.put(`/remove_friend/${user?._id}/${userInfo?._id}`)
    window.location.reload();
    navigate("/my_friends");
  }catch(e){
    console.log(e);
  }
}

const handleSendRequest = async () => {
  try{
    await api.put(`/send_request/${user?._id}/${userInfo?._id}`);
    window.location.reload();
  }catch(e){
    console.log(e);
  }
}
const handleCancelRequest = async () => {
  try{
    await api.put(`/cancel_request/${user?._id}/${userInfo?._id}`);
    window.location.reload();
  }catch(e){
    console.log(e);
  }
}

const RenderedStyle={
"color":`${userInfo?.gender=== 'male'?'#3A97FE':userInfo?.gender=== 'female'?'#FF2A90':'#cf00cf'}`
}

  return (<>

{userInfo?.profile_type==="single"?
 <div className="bg-black-20">
 <div className="min-h-[130px] md:min-h-[130px] flex justify-center items-end bg-black rounded-b-50px">
  
 </div>
 <div className="pt-10 container px-5 mx-auto">
   <div className="flex flex-wrap items-stretch bg-black rounded-2xl max-w-5xl mx-auto">
     <div className="w-full sm:w-2/5 md:w-1/5">

      {userInfo?.image   ?

       <img
         src={userInfo?.image}
         alt="book-model"
         className="w-full h-full object-center object-cover aspect-[5/4] rounded-2xl"
       
       />:
       
     (  userInfo?.gender==="male"?(<img src="/images/boy-avatar.jpg" alt="boy" />):userInfo?.gender==="female"? (<img src="/images/girl-avatar.jpg" alt="girl"  />)
               :(<img src="/images/trans avatar.png" alt="trans"  />))
      }
     </div>
     <div className="w-full sm:w-3/5 md:w-4/5 border-b-2 sm:border-b-0 sm:border-r-2 border-orange rounded-2xl">
       <div className="h-full p-5 grid content-between rounded-2xl max-w-3xl gap-y-10">
         <div>
           <div className="flex flex-wrap sm:flex-nowrap justify-between sm:gap-5">
             <h3 className="flex items-center text-lg sm:text-[22px] font-bold gap-2 font-body_font">
               {userInfo?.username}
               <p className="flex items-center text-sm font-light gap-1">
                 <span className="block w-3 h-3 rounded-full bg-green-500 font-body_font"></span>
                 Online
               </p>
             </h3>
           </div>
           <div className="text-lg flex items-center gap-2  mt-1 font-body_font">




            <span style={RenderedStyle}> 
              {age}
            </span>
             

           </div>
         </div>
         {
          location.search.length > 0 ? 
         <div className="grid justify-stretch gap-2 mt-3 event_card_button_wrap items-start" style={{width: "300px"}}>
                {
                  user.friends.includes(userInfo?._id)? <button
                  className="primary_btn !py-1 !text-sm !leading-[28px] !px-1 w-full !text-[12px]"
                  onClick={handleRemove}
                >
                  Remove Friend
                </button>:
                (sent === 1?
                <button
                  className="primary_btn !py-1 !text-sm !leading-[28px] !px-1 w-full !text-[12px]"
                  onClick={handleCancelRequest}
                >
                  Cancel Friend Request
                </button>:
                (user.sent_requests.includes(userInfo?._id)?
                <button
                  className="primary_btn !py-1 !text-sm !leading-[28px] !px-1 w-full !text-[12px]"
                  onClick={handleCancelRequest}
                >
                  Cancel Friend Request
                </button>:<button
                  className="primary_btn !py-1 !text-sm !leading-[28px] !px-1 w-full !text-[12px]"
                  onClick={handleSendRequest}
                >
                  Send Friend Request
                </button>))
                }
                <a href="https://social-messenger-iota.vercel.app/" target="_blank">
                <button
                  className="primary_btn !py-1 !text-sm !leading-[28px] !px-1 w-full !text-[12px]"
                >
                  Message
                </button>     
                </a>
          </div>:null}
       </div>
     </div>
   </div>
   <div className="p-5 bg-light-grey rounded-xl mt-6  max-w-5xl mx-auto">
    <h3 className="text-2xl text-orange">Slogan</h3>
   <p className="text-lg font-body_font my-2">{userInfo?.slogan}</p>
   <h3 className="text-2xl text-orange mt-5">Introduction</h3>
  <p className="text-lg font-body_font" dangerouslySetInnerHTML={{ __html: userInfo?.introduction?.replace(/\n/g, '<br />') }}></p>
   </div>

   <div className="max-w-5xl mx-auto pt-20">
     <div className="px-8">
       <span className="inline-block py-3 px-8 text-lg rounded-t-lg bg-white text-black min-w-[200px] text-center">
         Profile
       </span>
     </div>
     <div className="bg-white rounded-lg py-10 px-3 lg:px-8 items-start">
       <div className="grid gap-y-5">
         <div className="p-5 bg-black-20 rounded-2xl w-[100%] ">
           <div className="flex justify-between gap-3 font-normal pb-3 mb-3 border-b border-orange">
             <p className="text-base sm:text-2xl">Profile</p>
             {
              location.search.length>0?null:
             <Link
               to="/edit-detail"
               className="cursor-pointer text-xs sm:text-lg"
             >
               Edit
             </Link>
             }

           </div>
         
           <div className="text-sm sm:text-lg grid grid-cols-2 gap-3 mb-2">
               <span className="block font-body_font text-lg">Interest :</span>
               <span className={`block text-right font-body_font`} style={RenderedStyle}>
           
               </span>
             </div>
           <div className="text-sm sm:text-lg grid grid-cols-2 gap-3 border-b border-[#666] py-[5px] ">
               <span>Male</span>
                 <div>
                 <span className="block text-right">
                 {userInfo?.interests?.male?.map((el,i)=>(
                   <>
            
            <span key={i}>{i !== 0 && <span>, </span>}{el}</span>
       
               </>
                 ))}
                 
                 </span>
                 </div>
             </div>
             <div className="text-sm sm:text-lg grid grid-cols-2 gap-3 border-b border-[#666] py-[5px]">
               <span>Male Female</span>
                 <div>
                 <span className="block text-right">
                 {userInfo?.interests?.male_female?.map((el,i)=>(
                   <>
              
               <span key={i}>{i !== 0 && <span>, </span>}{el}</span>
         
               </>
                 ))}
                 </span>
                 </div>
             </div>
             <div className="text-sm sm:text-lg grid grid-cols-2 gap-3 border-b border-[#666] py-[5px]">
               <span>Female </span>
                 <div>
                 <span className="block text-right">
                 {userInfo?.interests?.female?.map((el,i)=>(
                   <span key={i}> {i !== 0 && <span>, </span>}{el}</span>
                 ))}
                 </span>
                 </div>
             </div>
             <div className="text-sm sm:text-lg grid grid-cols-2 gap-3 border-b border-[#666] py-[5px]">
               <span>Female Female </span>
                 <div>
                 <span className="block text-right">
                 {userInfo?.interests?.female_female?.map((el,i)=>(
               <span key={i}> {i !== 0 && <span>, </span>}{el}</span>
                 ))}
                 </span>
                 </div>
             </div> 
              <div className="text-sm sm:text-lg grid grid-cols-2 gap-3 ">
               <span>Male Male</span>
                 <div>
                 <span className="block text-right">
                 {userInfo?.interests?.male_male?.map((el,i)=>(
                   <span key={i}> {i !== 0 && <span>, </span>}{el}</span>
                 ))}
                 </span>
                 </div>
             </div> 
         </div>
         <div className="p-5 bg-black-20 rounded-2xl">
           <div className="grid grid-cols-2 gap-3 font-normal pb-3 mb-3 border-b border-orange">
             <p className="text-base sm:text-2xl">Details</p>
             <p className={`text-right flex items-center justify-end text-xl`} style={RenderedStyle}>
               
               {userInfo?.gender==="male"?(<img src="/images/Male.png" alt="Male" className="h-[26px] mr-1" />):userInfo?.gender==="female"? (<img src="/images/Female.png" alt="Male" className="h-[26px] mr-1" />)
               :(<img src="/images/Trans.png" alt="trans" className="h-[26px] mr-1" />)}
                {userInfo?.personName}</p>
           </div>
           <div className="grid">
             <div className="text-sm sm:text-lg grid grid-cols-2 gap-3 border-b border-[#666] py-[5px] ">
               <span className="block font-body_font">
                 Ethnic Background:
               </span>
               <span className={`block text-right font-body_font`} style={RenderedStyle}>
                 {userInfo?.ethnic_background}
               </span>
             </div>
             <div className="text-sm sm:text-lg grid grid-cols-2 gap-3 border-b border-[#666] py-[5px]">
               <span className="block font-body_font">Experience:</span>
               <span className={`block text-right font-body_font`} style={RenderedStyle}>
                 {userInfo?.experience}
               </span>
             </div>
             <div className="text-sm sm:text-lg grid grid-cols-2 gap-3 py-[5px] border-b border-[#666]">
               <span className="block font-body_font">Gender:</span>
               <span className={`block text-right font-body_font`} style={RenderedStyle}>
                 {userInfo?.gender}
               </span>
             </div>
           </div>
           <div className="grid">
             <div className="text-sm sm:text-lg grid grid-cols-2 gap-3 border-b border-[#666] py-[5px] ">
               <span className="block font-body_font">Birthdate:</span>
               <span className={`block text-right font-body_font`} style={RenderedStyle}>
                 {userInfo?.DOB}
               </span>
             </div>
             <div className="text-sm sm:text-lg grid grid-cols-2 gap-3 border-b border-[#666] py-[5px] ">
               <span className="block font-body_font">
             Sexuality
               </span>
               <span className={`block text-right font-body_font`} style={RenderedStyle}>
                 {userInfo?.sexuality}
               </span>
             </div>
             <div className="text-sm sm:text-lg grid grid-cols-2 gap-3 border-b border-[#666] py-[5px] ">
               <span className="block font-body_font">Height:</span>
               <span className={`block text-right font-body_font`} style={RenderedStyle}>
                 {userInfo?.height}
               </span>
             </div>
             <div className="text-sm sm:text-lg grid grid-cols-2 gap-3 border-b border-[#666] py-[5px] ">
               <span className="block font-body_font">Weight:</span>
               <span className={`block text-right font-body_font`} style={RenderedStyle}>
                 {userInfo?.weight}
               </span>
             </div>
             <div className="text-sm sm:text-lg grid grid-cols-2 gap-3 border-b border-[#666] py-[5px] ">
               <span className="block font-body_font">Body Type:</span>
               <span className={`block text-right font-body_font`} style={RenderedStyle}>
                 {userInfo?.body_type}
               </span>
             </div>
             <div className="text-sm sm:text-lg grid grid-cols-2 gap-3 border-b border-[#666] py-[5px] ">
               <span className="block font-body_font">Body Hair:</span>
               <span className="block text-right">
               {userInfo?.body_hair?.map((el, i) => (
                 <span className={` font-body_font`} style={RenderedStyle} key={i}>
           {el} {i!==0 && i !== userInfo?.body_hair.length-1  && <span>, </span>}
                  
                 </span>
               ))}
               </span>
             </div>
             <div className="text-sm sm:text-lg grid grid-cols-2 gap-3 border-b border-[#666] py-[5px] ">
               <span className="block font-body_font">Piercings:</span>
               <span className={`block text-right font-body_font`} style={RenderedStyle}>
                 {userInfo?.piercings}
               </span>
             </div>
             <div className="text-sm sm:text-lg grid grid-cols-2 gap-3 border-b border-[#666] py-[5px] ">
               <span className="block font-body_font">Looks:</span>
               <span className={`block text-right font-body_font`} style={RenderedStyle}>
                 {userInfo?.looks_important}
               </span>
             </div>
             <div className="text-sm sm:text-lg grid grid-cols-2 gap-3 border-b border-[#666] py-[5px] ">
               <span className="block font-body_font">Smoking:</span>
               <span className={`block text-right font-body_font`} style={RenderedStyle}>
                 {userInfo?.smoking}
               </span>
             </div>
             <div className="text-sm sm:text-lg grid grid-cols-2 gap-3 border-b border-[#666] py-[5px] ">
               <span className="block font-body_font">Tattoos:</span>
               <span className={`block text-right font-body_font`} style={RenderedStyle}>
                 {userInfo?.tattoos}
               </span>
             </div>
             <div className="text-sm sm:text-lg grid grid-cols-2 gap-3 py-[5px] border-b border-[#666]">
               <span className="block font-body_font">Relation:</span>
               <span className={`block text-right font-body_font`} style={RenderedStyle}>
                 {userInfo?.relationship_status}
               </span>
             </div>
             <div className="text-sm sm:text-lg grid grid-cols-2 gap-3 py-[5px] border-b border-[#666]">
               <span className="block font-body_font">Drinking:</span>
               <span className={`block text-right font-body_font`} style={RenderedStyle}>
                 {userInfo?.Drinking}
               </span>
             </div>
             <div className="text-sm sm:text-lg grid grid-cols-2 gap-3 py-[5px] border-b border-[#666]">
               <span className="block font-body_font">Drugs:</span>
               <span className={`block text-right font-body_font`} style={RenderedStyle}>
                 {userInfo?.Drugs}
               </span>
             </div>
             <div className="text-sm sm:text-lg grid grid-cols-2 gap-3 py-[5px] border-b border-[#666] ">
               <span className="block font-body_font">Relationship Status:</span>
               <span className={`block text-right font-body_font`} style={RenderedStyle}>
                 {userInfo?.Relationship}
               </span>
             </div>
             <div className="text-sm sm:text-lg grid grid-cols-2 gap-3 py-[5px]">
               <span className="block font-body_font">Language:</span>
               <span className={`block text-right font-body_font`} style={RenderedStyle}>
                 {userInfo?.Language}
               </span>
             </div>
           </div>
         </div>
       </div>
     </div>
   </div>
 </div>
 <div className="audit-dating__block relative py-4 md:py-16 md:pt-0 container mx-auto mt-14">
   <div className="flex flex-col md:flex-row justify-center items-center text-center gap-6 py-71px">
     <h2 className="text-white text-base sm:text-2xl md:text-3xl xl:text-40px">
       #1 Adult Dating Site
     </h2>
   </div>
 </div>
</div>:
<CoupleDetailPage age={age} age2={age2} userInfo={userInfo} handleRemove={handleRemove} handleSendRequest={handleSendRequest} handleCancelRequest={handleCancelRequest}/>
}
   
    </>
  );
};

export default UserDetailPage;