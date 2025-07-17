import React from 'react'
import Tbookcard from './Tbookcard'
import BookCover01 from './assets/bookcover01.jpg'
import BookCover02 from '../public/images/crimeAndPunishment.jpg'
import BookCover03 from '../public/images/theAlchemist.jpg'
import BookCover04 from '../public/images/janeEyre.jpg'
import BookCover05 from '../public/images/warAndPeace.jpg'
import BookCover06 from '../public/images/theIliad.jpg'

function Trendingbooks() {
  return (
    <div className='w-full flex justify-center bg-zinc-200 mt-10'>
      <div className='w-15/16 h-full bg-zinc-200 flex flex-col gap-10 p-5'>
        <div className='text-2xl text-[#5352ed] font-semibold flex justify-center'>
          Top Trending Books
        </div>
        <div className='grid grid-cols-3 lg:grid-cols-6 gap-6 place-items-center'>
          <Tbookcard title="Harry Potter" writer="J.K. Rowling" link={BookCover01} />
          <Tbookcard title="Crime and Punishment" writer="Fyodor Dostoevsky" link={BookCover02} />
          <Tbookcard title="The Alchemist" writer="Paulo Coelho" link={BookCover03} />
          <Tbookcard title="Jane Eyre" writer="Charlotte Brontë" link={BookCover04} />
          <Tbookcard title="War and Peace" writer="Leo Tolstoy" link={BookCover05} />
          <Tbookcard title="The Iliad" writer="Homer" link={BookCover06} />
        </div>
      </div>
    </div>

  )
}

export default Trendingbooks
