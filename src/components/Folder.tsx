import React, { useState } from 'react';
import FolderIcon from '@mui/icons-material/Folder';
import FileIcon from '@mui/icons-material/Description'; // Assuming you have a file icon

const Folder = (props: FolderProps) => {
  const [isClicked, setIsClicked] = useState(false);

  const handleFolderClick = () => {
    setIsClicked(!isClicked);
  }

  return (
    <>
      <div className={`px-4 text-gray-600 p-2 pr-[77px] border border-gray-300 w-[220px] flex flex-wrap items-center gap-2 rounded cursor-pointer hover:bg-gray-200 hover:text-gray-800`} onClick={handleFolderClick}>
        <FolderIcon />
        {props.title}
      </div>
      {isClicked && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 z-50">
          <div className="bg-white p-4 rounded-md shadow-lg">
            <h2 className="text-xl mb-4">{props.title}</h2>
            <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'>
              {props.files.map(file => (
                <div key={file.id} className='p-4 border rounded'>
                  <a href={file.url} target='_blank' rel='noopener noreferrer' className='text-blue-500'>
                    <FileIcon className="w-6 h-6 mr-2 inline-block" />
                    {file.name}
                  </a>
                </div>
              ))}
            </div>
            <button onClick={handleFolderClick} className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">Close</button>
          </div>
        </div>
      )}
    </>
  );
};

export default Folder;
