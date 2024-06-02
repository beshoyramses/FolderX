import React, { Children } from "react";
import GridOnIcon from "@mui/icons-material/GridOn";
import Folder from "@/components/Folder";
import File from "@/components/File";
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';

const page = () => {
  return (
    <section className="flex flex-col w-[80%]">
      <div className="flex items-center justify-between w-[98%] h-[75px] px-4 border-b border-b-gray-300 max-sm:w-[210px] max-sm:flex-grow">
        <h2 className="text-[24px]">My Drive</h2>
        <div className="flex items-center gap-5">
        <AddCircleOutlineIcon className="cursor-pointer"/>
        <GridOnIcon className="cursor-pointer"/>
        </div>
      </div>
      <div>
        <h2 className="px-4 py-4 text-gray-500 font-bold">Folders</h2>
        <div className="flex items-center ml-4 gap-10 max-sm:flex-col max-sm:items-start">
          <Folder title={"title text"} />
          <Folder title={"title text"} />
          <Folder title={"title text"} />
          <Folder title={"title text"} />
        </div>
        <h2 className="px-4 py-4 text-gray-500 font-bold">Files</h2>
        <div className="px-4 grid-columns">
           <File />
           <File />
           <File />
           <File />
           <File />
           <File />
           <File />
           <File />
           <File />
           <File />
           <File />
           <File />
           <File />
           <File />
           <File />
           <File />
           <File />
           <File />
           <File />
           <File />
           <File />
           <File />
           <File />
           <File />
           <File />
        </div>
      </div>
    </section>
  );
};

export default page;
