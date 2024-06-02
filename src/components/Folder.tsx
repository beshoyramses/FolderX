import React from 'react';
import FolderIcon from '@mui/icons-material/Folder';

const Folder = (props: FolderProps) => {
  return (
    <div className='px-4 text-gray-600 p-2 pr-[77px] border border-gray-300 w-fit flex items-center gap-2 rounded cursor-pointer hover:bg-gray-200 hover:text-gray-800'>
        <FolderIcon />
        {props.title}
    </div>
  );
};

export default Folder;
