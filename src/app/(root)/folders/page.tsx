"use client";

import React, { useEffect, useState } from 'react';
import { getFolders } from '../../../../lib/firebase';
import FoldersContainer from '@/components/FoldersContainer';

interface Folder {
  id: string;
  name: string;
  // Add any other properties here
}

const Page: React.FC = () => {
  const [folders, setFolders] = useState<Folder[]>([]);

  useEffect(() => {
    const fetchFolders = async () => {
      try {
        const foldersData = await getFolders();
        setFolders(foldersData);
        console.log("Fetched Folders Data: ", foldersData);
      } catch (error) {
        console.error("Error fetching folders: ", error);
      }
    };

    fetchFolders();
  }, []);

  return (
    <div className='px-4 py-6 flex flex-col gap-7'>
      <h2 className='text-[24px] text-gray-500 font-bold'>Your Folders</h2>
      <FoldersContainer folders={folders} />
    </div>
  );
};

export default Page;
