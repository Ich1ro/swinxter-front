import React, { useState } from 'react'
import api from '../../utils/api';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const BlockCard = ({data,forceRender}) => {
  const [unblocked,setUnblocked] = useState(false);
  const {user} = useSelector((state) => state.auth);
  const navigate = useNavigate()

  const handleUnblock = async () => {
    await api.post("/unblockuser",{
      userId: user._id,
      blockId: data._id
    });
    setUnblocked(true);
  }

  const handleBlock = async () => {
    await api.post("/blockuser",{
      userId: user._id,
      blockId: data._id
    });
    setUnblocked(false);
  }

  return (
    <div className='friends_card'>
        <div className='friends_card_dp'>
        {data?.image?
          <img
            src={data?.image}
            alt="book-model"
            className="w-full h-full object-center object-cover aspect-[5/4] rounded-2xl"
          />:(data?.gender==="male"?(<img src="/images/boy-avatar.jpg" alt="boy" />):data?.gender==="female"? (<img src="/images/girl-avatar.jpg" alt="girl"  />):(<img src="/images/trans avatar.png" alt="trans"  />))
        }
        </div>
        <h1 style={{fontSize: "20px", fontWeight: "600", display: "flex", justifyContent: "center", marginTop: "50px"}}>{data.username}</h1>  
        <div className='friends_card_actionbox'>
        <div className="grid justify-stretch gap-2 mt-3 event_card_button_wrap items-start" style={{width: "200px", margin: "20px auto"}}>
                <button
                  className="primary_btn !py-1 !text-sm !leading-[28px] !px-1 w-full !text-[12px]"        
                  onClick={unblocked?handleBlock:handleUnblock} 
                >
                  {
                    unblocked?
                    "Block"
                    :
                    "Unblock"
                  }
                </button>
                <button
                  className="primary_btn !py-1 !text-sm !leading-[28px] !px-1 w-full !text-[12px]"      
                  onClick={() => { navigate(`/user-detail?id=${data._id}`)}}   
                >
                  View Profile
                </button>
          </div>
        </div>
    </div>
  )
}

export default BlockCard