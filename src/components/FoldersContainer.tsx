"use client";

import React, { useState,useEffect } from 'react'
import Folder from './Folder'
import { getFolders } from '../../lib/firebase';

const FoldersContainer = () => {
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
    }, [])

  return (
    <div className="flex flex-wrap ml-4 gap-10 max-sm:flex-col max-sm:items-start">
    {Object.entries(folders).map((FolderData) => (
      <Folder key={FolderData} title={FolderData[0]} files={FolderData[1]}/>
    ))}
  </div>
  )
}

export default FoldersContainer
