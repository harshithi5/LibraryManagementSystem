import React from 'react'
import Icon from './assets/MobileLib.svg'

function Welcome({onSignupClick}) {
  return (
    <div className='h-120 w-full bg-zinc-200 flex'>

        {/* left */}
      <div className='p-10 h-full w-3/5 flex flex-col gap-5'>
        <div className='text-4xl font-bold text-[#5352ed]'>Welcome To Zen's Library</div>
        <div className='text-sm pl-1 flex flex-col gap-2 text-zinc-800'>
            <div>Track your Reading and Build your Library.</div>
            <div>Discover your next Favourite Book.</div>
            <div>Check the Top Trending Authors.</div>
            <div>Get Notified about the Dates.</div>
        </div>
        <button onClick={onSignupClick} className="bg-[#ff7f56] text-white px-4 py-3 mt-10 rounded-lg font-medium h-12 cursor-pointer w-65 flex items-center justify-center">
                    Get Started For Free
        </button>
        <div className='text-sm flex flex-col gap-1 mt-5'>
            <div className='text-[#5352ed]'>Visit us:</div>
            <div>Address: A-14/15, North Campus, IIT Mandi</div>
        </div>
      </div>

      {/* right */}
      <div className='h-full w-2/5 relative'>
        <img src={Icon} className='h-125 absolute bottom-0 -left-25' />
      </div>
    </div>
  )
}

export default Welcome
