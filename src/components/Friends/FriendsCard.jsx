
import { useState } from "react";
import { toast } from "react-toastify";
import api from "../../utils/api";
import ConfirmPopUP from "../popup/ConfirmPopUP";


function FriendsCard({user,state,setState,type}){
    const [popup, setPopup] = useState(false)
    const [confirm, setConfirm] = useState(null)
const PENDING = type === "pending";

const handleconfirm=async(id)=>{
    await api.patch(`/accept-pending-request/${id}`,{}).then((res)=>{ setState(!state)
        toast("Friend Request Accepted")}).catch((err)=>console.log(err))
}

const handleDeleteConfirm=async()=>{
    await api.patch(`/cancel-pending-request/${confirm}`,{}).then((res)=>{setState(!state) 
      setPopup(false);
toast("Friend Request Deleted")}).catch((err)=>console.log(err))
}

const handleDelete=async(id)=>{
    setPopup(true)
    setConfirm(id)
}

return(
    <>
    
    <div className="max-w-[250px] w-full bg-light-grey shadow-lg rounded-lg my-4 flex justify-center justify-between flex-col items-center flex-wrap mt-[10px] border-2">
        <div className="py-4 px-6 pb-0 ">
        <img className="w-16 mx-auto -mt-8 h-16 object-cover object-center rounded-full" 
            src={PENDING ? user?.from?.image:user?.to?.image}/>
            <div className="text-center mt-6">
                <h1 className="text-2xl font-semibold break-all text-gray-800">{PENDING ? user?.from?.username :user?.to?.username  }</h1>
            </div>
        </div>
        <div className="flex items-center justify-center mt-4 text-gray-700 gap-3 pb-6">
       { PENDING &&   <button className="inline-flex rounded-md items-center gap-1 p-2 bg-orange text-sm sm:text-sm px-4 font-semibold cursor-pointer " onClick={()=>handleconfirm(user?._id)}>Confirm</button>}
            <button className="inline-flex rounded-md items-center gap-1 p-2 bg-dark-black text-sm sm:text-sm px-4 font-semibold cursor-pointer "onClick={()=>handleDelete(user?._id)}>Delete</button>
        </div>
        <ConfirmPopUP handleDeleteConfirm={handleDeleteConfirm} setPopup={setPopup} popup={popup}  />
    </div>
    </>
)
}export default FriendsCard;