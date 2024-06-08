"use client";

import React, { useEffect, useState } from 'react';
import { getStaredFiles, unStar } from '../../../../lib/firebase'; // Import the unstarFile function
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';

interface File {
  id: string;
  name: string;
  url: string;
}

const Page: React.FC = () => {
  const [starredFiles, setStarredFiles] = useState<File[]>([]);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  useEffect(() => {
    const fetchStarredFiles = async () => {
      const files = await getStaredFiles(); // Fetch starred files instead of deleted files
      setStarredFiles(files);
    };

    fetchStarredFiles();
  }, []);

  const handleUnstarFile = async (fileName: string) => {
    await unStar(fileName); // Call unstarFile function
    const updatedFiles = starredFiles.filter(file => file.name !== fileName); // Remove unstarred file from state
    setStarredFiles(updatedFiles);
  };

  const handleMenuClick = (event: React.MouseEvent<HTMLElement>, file: File) => {
    setAnchorEl(event.currentTarget);
    setSelectedFile(file);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setSelectedFile(null);
  };

  const handleUnstarClick = () => {
    if (selectedFile) {
      handleUnstarFile(selectedFile.name);
      handleMenuClose();
    }
  };

  return (
    <div className='px-4 py-6'>
      <h2 className='text-[24px] text-gray-500 font-bold'>Starred Files</h2>

      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 py-8'>
        {starredFiles.map(file => (
          <div key={file.id} className='p-4 border rounded flex items-center gap-10'>
            <a href={file.url} target='_blank' rel='noopener noreferrer' className='text-blue-500'>
              {file.name}
            </a>
            <IconButton onClick={(event) => handleMenuClick(event, file)}>
              <MoreHorizIcon className='relative top-1'/>
            </IconButton>
          </div>
        ))}
      </div>

      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
      >
        <MenuItem onClick={handleUnstarClick}>Unstar</MenuItem>
      </Menu>
    </div>
  );
};

export default Page;
