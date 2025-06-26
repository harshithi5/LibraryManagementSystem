import React from 'react'

function Tbookcard(props) {
  return (
    <div className='flex flex-col gap-1 justify-center w-28'>
      <div className='h-40 w-30 bg-white flex'>
        <img src={props.link} className='h-full w-full'/>
      </div>
      <div className='text-black font-medium text-sm'>{props.title}</div>
      <div className='text-zinc-700 font-normal text-xs'>{props.writer}</div>
    </div>
  )
}

export default Tbookcard
