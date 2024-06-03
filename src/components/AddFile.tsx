import React, { useState } from 'react';
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    Dialog,
    DialogTrigger,
    DialogContent,
    DialogClose,
} from "@/components/ui/dialog";
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { handleUpload } from '../../lib/firebase';

const AddFile = () => {
    const [file, setFile] = useState(null);
    const [progress, setProgress] = useState(0);
    const [folderName, setFolderName] = useState("");

    const handleFileChange = (event) => {
        setFile(event.target.files[0]);
    };

    const handleFolderNameChange = (event) => {
        setFolderName(event.target.value);
    };

    const handleUploadClick = async () => {
        if (file) {
            const fileUrl = await handleUpload(file, folderName, setProgress);
            console.log('Uploaded file URL:', fileUrl);
            // Save file URL to Firestore or do something else with it
        }
    };

    return (
        <Dialog>
            <DialogTrigger>
                <AddCircleOutlineIcon className="cursor-pointer" />
            </DialogTrigger>

            <DialogContent className="flex items-center justify-center bg-gray-400">
                <Card className="w-[350px]">
                    <CardHeader>
                        <CardTitle>Upload Your File!</CardTitle>
                        <CardDescription>Upload and Store Your File in one-click.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <form>
                            <div className="grid w-full items-center gap-4">
                                <div className="flex flex-col space-y-1.5">
                                    <Label htmlFor="folderName" className='mb-2.5'>Which Folder to Add this File (if it doesn't exist will create new one)</Label>
                                    <Input id="folderName" placeholder="Folder name" value={folderName} onChange={handleFolderNameChange} />
                                </div>
                                <div className="flex flex-col space-y-1.5">
                                    <Label htmlFor="file">Upload File</Label>
                                    <Input id="file" type="file" onChange={handleFileChange} />
                                </div>
                                {progress > 0 && (
                                    <div className="mt-4">
                                        <p>Upload Progress: {progress.toFixed(2)}%</p>
                                    </div>
                                )}
                            </div>
                        </form>
                    </CardContent>
                    <CardFooter className="flex justify-between">
                        <DialogClose asChild>
                            <Button variant="outline">Close</Button>
                        </DialogClose>
                        <Button onClick={handleUploadClick}>Save</Button>
                    </CardFooter>
                </Card>
            </DialogContent>
        </Dialog>
    );
};

export default AddFile;
