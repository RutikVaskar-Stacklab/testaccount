import React from 'react'

const ShowUsers = ({id,name}) => {


    
  return (
    <div className='bg-white m-2 p-1 w-80 font-bold rounded-2xl px-5 border-2 border-slate-600 text-slate-700'>
        {name}
    </div>
  )
}

export default ShowUsers
