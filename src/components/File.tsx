import Image from 'next/image'
import React from 'react'

const File = ({fileName}) => {
  return (
    <div className='flex flex-col shadow w-fit cursor-pointer items-center'>
      <Image src={fileName.url} width={234} height={161} alt='file' className='rounded'/>
      <div className='text-left p-2 px-4 text-gray-600'>
        {fileName.name}
      </div>
    </div>
  )
}

export default File
