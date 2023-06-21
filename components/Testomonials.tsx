import React from 'react'
import UserCard from './ui/UserCard'

const Testomonials = () => {
  return (
    <div className='container mx-auto mt-7'>
        <h2 className="font-bold text-[1.6em]">Some of the first users</h2>
        <div className='mt-3 flex flex-col gap-5 md:flex-row'>
            <UserCard/>
            <UserCard/>
            <UserCard/>
        </div>
    </div>
  )
}

export default Testomonials