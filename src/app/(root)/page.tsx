"use client";

import React, { useState, useEffect } from 'react';
import GridOnIcon from '@mui/icons-material/GridOn';
import Folder from '@/components/Folder';
import File from '@/components/File';
import AddFile from '@/components/AddFile';
import { getFolders } from '../../../lib/firebase';

const Page = () => {
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
        <section className="flex flex-col w-[80%]">
            <div className="flex items-center justify-between w-[98%] h-[75px] px-4 border-b border-b-gray-300 max-sm:w-[210px] max-sm:flex-grow">
                <h2 className="text-[24px]">My Drive</h2>
                <div className="flex items-center gap-5">
                    <AddFile />
                    <GridOnIcon className="cursor-pointer" />
                </div>
            </div>
            <div>
                <h2 className="px-4 py-4 text-gray-500 font-bold">Folders</h2>
                <div className="flex flex-wrap ml-4 gap-10 max-sm:flex-col max-sm:items-start">
                    {Object.keys(folders).map((folderName) => (
                        <Folder key={folderName} title={folderName.split("").slice(8,)} />
                    ))}
                </div>
                <h2 className="px-4 py-4 text-gray-500 font-bold">Files</h2>
                <div className="px-4 grid grid-cols-4 gap-4">
                    {Object.keys(folders).map((folderName) => (
                        folders[folderName].map((file, index) => (
                            <File key={`${folderName}-${index}`} fileName={file} />
                        ))
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Page;
