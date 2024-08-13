import React, { useContext } from 'react'
import ChatContext from '../../context/chatContext';
import SocketId from './SocketId';

const AvailableUser = () => {
    const { addUsers, setCurrentUser } = useContext(ChatContext);
    const handleSocket = () =>{
      setCurrentUser(null)
  } 
  return (
    <>
    <div>
      {addUsers?.map((user,i)=>{
        return  <SocketId key={i} name={user.name} id={user.id} />
      })}
    </div>
    <div className='flex border-cyan-500 border rounded-md bg-green-400 m-1 p-1 cursor-pointer ' onClick={handleSocket}>
    <h4 className='mr-2 w-56' >Send to </h4> -  <p className='ml-2'> EveryOne</p>

</div></>
  )
}

export default AvailableUser
