import Image from "next/image";
import React, { useState } from "react";
import { addRecentFile, deleteFile, starFile, unStar } from "../../lib/firebase";
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import { Dialog, DialogTrigger, DialogContent } from "@/components/ui/dialog";
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';

const File = ({ file }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [isStarred, setIsStarred] = useState(false);

  const handleFileClick = (file) => {
    console.log(file);
    addRecentFile(file);
  };

  const handleIconClick = (event) => {
    event.stopPropagation();
    setAnchorEl(event.currentTarget);
  };

  const handleDeleteFile = async () => {
    await deleteFile(file.folder, file.name);
    handleClose();
  };

  const handleStarFile = async () => {
    if (isStarred) {
      await unStar(file.name);
    } else {
      await starFile(file);
    }
    setIsStarred(!isStarred); // Toggle the starred state
    handleClose();
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const isVideo = file.name.split('.').pop().toLowerCase() === 'mp4';

  return (
    <>
      <Dialog>
        <DialogTrigger>
          <div className="relative flex flex-col shadow w-fit cursor-pointer items-center height-[300px] mb-10 p-5">
            <MoreHorizIcon
              aria-label="more"
              aria-controls="icon-menu"
              aria-haspopup="true"
              onClick={handleIconClick}
              className="absolute top-0 right-2 text-gray-600 z-40"
            />
            <div className="relative w-[234px] h-[161px] rounded overflow-hidden flex items-center justify-center" onClick={() => { handleFileClick(file) }}>
              {isVideo ? (
                <h2>Video</h2>
              ) : (
                <Image
                  src={file.url}
                  layout="fill"
                  style={{ objectFit: "cover" }}
                  alt="file"
                />
              )}
            </div>
            <div className="text-center p-2 px-4 text-gray-600">
              {file.name}
            </div>
          </div>
        </DialogTrigger>

        <DialogContent className="flex items-center justify-center bg-gray-400 flex-col">
          <div className="relative w-[400px] h-[400px] rounded overflow-hidden mb-20px flex items-center justify-center">
            {isVideo ? (
              <video width="320" height="240" controls>
                <source src={file.url} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            ) : (
              <Image
                src={file.url}
                layout="fill"
                style={{ objectFit: "cover" }}
                alt="image"
              />
            )}
          </div>

          <h2>{file.name}</h2>
        </DialogContent>
      </Dialog>

      <Menu
        id="icon-menu"
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem onClick={handleDeleteFile}>Delete</MenuItem>
        <MenuItem onClick={handleStarFile}>{isStarred ? 'Unstar' : 'Star'}</MenuItem>
      </Menu>
    </>
  );
};

export default File;
