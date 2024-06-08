"use client";

import React, { useState } from 'react';
import GridOnIcon from '@mui/icons-material/GridOn';
import TableViewIcon from '@mui/icons-material/TableView';
import AddFile from '@/components/AddFile';
import FilesContainer from '@/components/FilesContainer';
import FoldersContainer from '@/components/FoldersContainer';
import FilesTable from '@/components/FilesTable';

const Page: React.FC = () => {
  const [isGridView, setIsGridView] = useState<boolean>(true); // State to manage view mode

  const toggleView = () => {
    setIsGridView(!isGridView); // Toggle the view mode
  };

  return (
    <section className='flex flex-col w-[80%]'>
      <div className='flex items-center justify-between w-[98%] h-[75px] px-4 border-b border-b-gray-300 max-sm:w-[210px] max-sm:flex-grow'>
        <h2 className='text-[24px]'>My Drive</h2>
        <div className='flex items-center gap-5'>
          <AddFile />
          <div onClick={toggleView} className='cursor-pointer'>
            {isGridView ? <TableViewIcon /> : <GridOnIcon />}
          </div>
        </div>
      </div>
      <div>
        <h2 className='px-4 py-4 text-gray-500 font-bold'>Folders</h2>
        <FoldersContainer />
        <h2 className='px-4 py-4 text-gray-500 font-bold'>Files</h2>
        {isGridView ? (
          <div className='px-4'>
            <FilesContainer />
          </div>
        ) : (
          <FilesTable />
        )}
      </div>
    </section>
  );
};

export default Page;
