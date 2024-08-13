import React, { useContext } from 'react'
import ChatContext from '../../context/chatContext';

const GroupSocket = ({name, id}) => {
    const { setCurrentUser} = useContext(ChatContext);

    const handleSocket = (id)=>{
        setCurrentUser(id)
    } 

  return (
    <div className='flex flex-col border-cyan-500 text-black w-80 border rounded-md bg-fuchsia-300 m-1 p-1 cursor-pointer ' onClick={()=>{handleSocket(id)}}>
        <h1 className='mr-2 font-bold text-red-500' >Group Name:  {name}</h1> 
        <span className='text-green-700'>Users:</span>
        {id?.map((id)=>{
            return <p key={id} className='ml-2'>{id}</p>
        })}

    </div>
  )
}
export default GroupSocket
