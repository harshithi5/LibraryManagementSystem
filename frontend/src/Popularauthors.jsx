import React from 'react'
import Pauthorcard from './Pauthorcard'
import Dharamveer from './assets/dharamveer.jpg'
import Kafka from './assets/kafka.jpg'
import Irodov from './assets/irodov.jpg'
import HC from './assets/hcverma.jpg'
import JK from './assets/JK.jpg'
import Robert from './assets/robertfrost.jpg'


function Popularauthors() {
  return (
    <div className='w-full flex justify-center bg-zinc-200 mt-10'>
  <div className='w-15/16 h-full bg-zinc-200 flex flex-col gap-10 p-5'>
    <div className='text-2xl text-[#5352ed] font-semibold flex'>Popular Authors</div>
    <div className='grid grid-cols-3 lg:grid-cols-6 gap-6 place-items-center'>
      <Pauthorcard link={Dharamveer} name="Dharamveer Bharti" />
      <Pauthorcard link={JK} name="J.K. Rowling" />
      <Pauthorcard link={HC} name="H.C. Verma" />
      <Pauthorcard link={Kafka} name="Franz Kafka" />
      <Pauthorcard link={Irodov} name="I.E. Irodov" />
      <Pauthorcard link={Robert} name="Robert Frost" />
    </div>
  </div>
</div>

  )
}

export default Popularauthors
