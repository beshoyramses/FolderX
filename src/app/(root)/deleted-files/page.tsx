"use client";

import React, { useEffect, useState } from 'react';
import { getDeletedFiles, restoreFile } from '../../../../lib/firebase';
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
  const [deletedFiles, setDeletedFiles] = useState<File[]>([]);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  useEffect(() => {
    const fetchDeletedFiles = async () => {
      const files = await getDeletedFiles();
      setDeletedFiles(files);
    };

    fetchDeletedFiles();
  }, []);

  const handleRestoreFile = async (fileId: string) => {
    await restoreFile(fileId);
    setDeletedFiles(deletedFiles.filter(file => file.id !== fileId));
  };

  const handleMenuClick = (event: React.MouseEvent<HTMLElement>, file: File) => {
    setAnchorEl(event.currentTarget);
    setSelectedFile(file);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setSelectedFile(null);
  };

  const handleRestoreClick = () => {
    if (selectedFile) {
      handleRestoreFile(selectedFile.id);
      handleMenuClose();
    }
  };

  return (
    <div className='px-4 py-6'>
      <h2 className='text-[24px] text-gray-500 font-bold'>Deleted Files</h2>

      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 py-8'>
        {deletedFiles.map(file => (
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
        <MenuItem onClick={handleRestoreClick}>Restore</MenuItem>
      </Menu>
    </div>
  );
};

export default Page;
