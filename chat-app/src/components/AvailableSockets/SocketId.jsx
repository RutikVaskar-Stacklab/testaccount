import React, { useContext } from 'react'
import ChatContext from '../../context/chatContext';

const SocketId = ({name, id}) => {
    const { setCurrentUser,socket } = useContext(ChatContext);

    const handleSocket = (id)=>{
        setCurrentUser(id)
    } 

  return (
    <div className='flex border-cyan-500 w-80 border rounded-md bg-fuchsia-600 m-1 p-1 cursor-pointer ' onClick={()=>{handleSocket(id)}}>
        <h4 className='mr-2' >{id===socket?.id?`me - ${name}`:name}</h4> -  <p className='ml-2'>{id}</p>

    </div>
  )
}

export default SocketId
