"use client";

import React from 'react';
import { SidebarLinks } from '../../constants';
import Link from 'next/link';
import { usePathname } from 'next/navigation';


const Sidebar = () => {

    const pathName = usePathname();

  return (
    <div className='flex flex-col gap-2 px-10 py-5 max-sm:px-0 max-sm:py-5 border-r border-r-gray-300'>
      {SidebarLinks.map((link) => {
        const isActive = pathName === link.route; 

        return (
          <Link
            href={link.route}
            key={link.label}
            className={`flex items-center gap-1 text-gray-500 p-4 py-2 ${isActive ? 'sidebar-item-active' : 'sidebar-item'} max-sm:text-[13px]`}
          >
            <link.icon />
            <span>{link.label}</span>
          </Link>
        );
      })}
    </div>
  );
};

export default Sidebar;
