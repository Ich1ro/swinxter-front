import { MdOutlineClose } from "react-icons/md";

function ConfirmPopUP({setPopup,popup,handleDeleteConfirm,}){
return(
    <>
    {popup && 
        <>
            <div className="popup_overlay"></div>
            <div className="confirm_popup">
                <div className="flex justify-end mb-2">
                    <span onClick={()=>setPopup(false)} className="cursor-pointer text-xl text-black"><MdOutlineClose /></span>
                </div>
                <h3 className="text-black text-xl">Are you sure you want to remove</h3>
                <div className="flex justify-center gap-2 align-center mt-6">
                    <button onClick={handleDeleteConfirm} className="inline-flex rounded-md items-center gap-1 p-2 gradient text-sm sm:text-sm px-4 font-semibold cursor-pointer">Yes</button>
                    <button onClick={()=>setPopup(false)} className="inline-flex rounded-md items-center gap-1 p-2 gradient text-sm sm:text-sm px-4 font-semibold cursor-pointer">Cancel</button>
                </div>
               
            </div>
        </>
        
        }
        </>
)
}export default ConfirmPopUP;