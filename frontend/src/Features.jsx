import React from 'react'
import Featurecard from './Featurecard'
import Books01 from './assets/books01.svg'
import Bell from './assets/Bell.svg'
import Graph from './assets/graph.svg'
import Cart from './assets/cart.svg'
import Calendar from './assets/calendar.svg'
import Custcare from './assets/custcare.svg'

function Features() {
  return (
    <div className='w-full flex justify-center bg-zinc-200'>
      <div className='w-15/16 h-full bg-[#5352ed] flex flex-col gap-5 p-5 pl-15'>
        <div className='text-2xl text-white font-semibold'>Some of our Features include:</div>
        <div className='grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-8'>
          <Featurecard content="Borrow Books" link={Books01} />
          <Featurecard content="Deadline Notifications" link={Bell} />
          <Featurecard content="Get The Trends" link={Graph} />
          <Featurecard content="Make Your Library" link={Cart} />
          <Featurecard content="Availability Dates" link={Calendar} />
          <Featurecard content="24 Hours Support" link={Custcare} />
        </div>
      </div>
    </div>

  )
}

export default Features
