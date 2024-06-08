import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import SearchIcon from '@mui/icons-material/Search';

const Header = () => {
  return (
    <header className='w-full flex flex-wrap items-center justify-between px-4 py-4 sm:px-6 md:px-10 border-b-2'>
      
      <Link href={"/"} className="flex-shrink-0 mr-4">
        <Image src={"/logo.svg"} width={95} height={32} alt="logo" />
      </Link>

     

      <div className='flex items-center mt-4 sm:mt-0'>
        <div className='bg-gray-200 max-w-xs px-4 py-2 border border-gray-300 rounded-lg flex items-center mr-3'>
          <input type="text" placeholder='Search' className='bg-gray-200 flex-grow outline-none' />
          <SearchIcon className='text-gray-500' />
        </div>
        <Image src={"https://avatar.iran.liara.run/public"} alt='user' width={35} height={35} />
      </div>

    </header>
  );
}

export default Header;
