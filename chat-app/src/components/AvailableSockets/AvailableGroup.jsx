import React, { useContext } from 'react'
import ChatContext from '../../context/chatContext';
import GroupSocket from './GroupSocket';

const AvailableGroup = () => {
  const { allRooms } = useContext(ChatContext);
  const result = allRooms.reduce((acc, curr) => {
    const { name, id } = curr;
    if (!acc[name]) {
      acc[name] = { name, ids: [] };
    }
    acc[name].ids.push(id);
    return acc;
  }, {});
  
  // Convert the result back to an array of objects
  const finalResult = Object.values(result);
  // console.log( finalResult)
  
   
  return (
    <>
    <div>
      {finalResult?.map((user,i)=>{
        return  <GroupSocket key={i} name={user.name} id={user.ids} />
      })}
    </div>
    </>
  )
}

export default AvailableGroup
