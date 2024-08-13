import React from 'react'
import AvailableUser from './AvailableSockets/AvailableUser'
import AvailableGroup from './AvailableSockets/AvailableGroup'

const Sidebar = () => {
  return (
    <aside className='flex text-white bg-fuchsia-800 flex-col min-h-screen justify-center items-center'>
       <section className='mb-5 flex flex-col justify-center items-center'> 
        <h1 className='font-bold mb-3 '>AvailableUser </h1>
       <AvailableUser/>
       </section>
       <section className='mt-5 flex flex-col justify-center items-center'>
        <h1 className='font-bold mb-3'>Available Group</h1>
        <AvailableGroup/>
       </section>
      
    </aside>
  )
}

export default Sidebar
