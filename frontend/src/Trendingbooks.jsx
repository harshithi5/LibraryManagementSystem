import React from 'react'
import Tbookcard from './Tbookcard'
import BookCover01 from './assets/bookcover01.jpg'

function Trendingbooks() {
  return (
    <div className='w-full flex justify-center bg-zinc-200 mt-10'>
      <div className='w-15/16 h-full bg-zinc-200 flex flex-col gap-10 p-5'>
        <div className='text-2xl text-[#5352ed] font-semibold flex justify-center'>
          Top Trending Books
        </div>
        <div className='grid grid-cols-3 lg:grid-cols-6 gap-6 place-items-center'>
          <Tbookcard title="Harry Potter" writer="J.K. Rowling" link={BookCover01} />
          <Tbookcard title="Harry Potter" writer="J.K. Rowling" link={BookCover01} />
          <Tbookcard title="Harry Potter" writer="J.K. Rowling" link={BookCover01} />
          <Tbookcard title="Harry Potter" writer="J.K. Rowling" link={BookCover01} />
          <Tbookcard title="Harry Potter" writer="J.K. Rowling" link={BookCover01} />
          <Tbookcard title="Harry Potter" writer="J.K. Rowling" link={BookCover01} />
        </div>
      </div>
    </div>

  )
}

export default Trendingbooks
