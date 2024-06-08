"use client";

import React, { useState } from 'react';
import { useEffect } from 'react';
import { getFolders } from '../../lib/firebase';



const FilesTable = () => {

    
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
    <table className="min-w-full divide-y divide-gray-200">
    <thead>
      <tr>
        <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
          File Name
        </th>
        <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
          Folder
        </th>
        <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
          URL
        </th>
      </tr>
    </thead>
    <tbody className="bg-white divide-y divide-gray-200">
      {Object.keys(folders).map((folderName) =>
        folders[folderName].map((file, index) => (
          <tr key={`${folderName}-${index}`}>
            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
              {file.name}
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
              {folderName}
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-blue-500">
              <a href={file.url} target="_blank" rel="noopener noreferrer">
                File URL
              </a>
            </td>
          </tr>
        ))
      )}
    </tbody>
  </table>
  )
}

export default FilesTable
