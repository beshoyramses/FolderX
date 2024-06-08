"use client"

import React, { useEffect, useState } from 'react';
import { getRecentFiles } from '../../../../lib/firebase';

interface File {
  id: string;
  name: string;
  url: string;
  openedAt: {
    toDate(): Date;
  };
}

const Page: React.FC = () => {
  const [recentFiles, setRecentFiles] = useState<File[]>([]);

  useEffect(() => {
    const fetchRecentFiles = async () => {
      const files = await getRecentFiles();
      setRecentFiles(files);
    };

    fetchRecentFiles();
  }, []);

  return (
    <section className='px-4 py-6'>
      <h2 className='text-[24px] text-gray-500 font-bold'>Recent Files</h2>

      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 py-8'>
        {recentFiles.map((file: File) => (
          <div key={file.id} className='p-4 border rounded'>
            <a href={file.url} target='_blank' rel='noopener noreferrer' className='text-blue-500'>
              {file.name}
            </a>
            <p className='text-gray-400'>{new Date(file.openedAt.toDate()).toLocaleString()}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Page;
