import Image from 'next/image'
import React from 'react'

const File = () => {
  return (
    <div className='flex flex-col shadow w-fit cursor-pointer'>
      <Image src={"/file.svg"} width={234} height={161} alt='file' className='rounded'/>
      <div className='text-left p-2 px-4 text-gray-600'>
        The Weekend
      </div>
    </div>
  )
}

export default File
