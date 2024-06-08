"use client";

import React, { useState } from 'react';
import { useEffect } from 'react';
import File from './File';
import { getFolders } from '../../lib/firebase';



const FilesContainer = () => {

  const [folders, setFolders] = useState({});

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
    <div className="grid-columns">
            {Object.keys(folders).map((folderName) =>
              folders[folderName].map((file, index) => (
                <File key={`${folderName}-${index}`} file={file} />
              ))
            )}
    </div>
  )
}

export default FilesContainer
