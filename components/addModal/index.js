import Image from 'next/image';
import React, { useState } from 'react';
import CustomButton from '../button';

import { Modal, Typography, IconButton, TextField, Box, Icon } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';

import { useCollectionData } from 'react-firebase-hooks/firestore'; // Import react-firebase-hooks
import { storage, firestore, ref, uploadBytes, getDownloadURL, collection, doc, addDoc } from '@/app/firebase';

import moment from 'moment';

const AddModal = ({ open, onClose }) => {
    const [dragging, setDragging] = useState(false);
    const [image, setImage] = useState(null);
    const [file, setFile] = useState(null);
    const [title, setTitle] = useState('');
    const [uploading, setUploading] = useState(false)
    const [loader, setLoader] = useState(false)
    const checkInsCollectionRef = collection(firestore, 'checkIns');
    const [checkIns] = useCollectionData(checkInsCollectionRef);

    const handleDragEnter = (e) => {
        e.preventDefault();
        setDragging(true);
    };

    const handleDragLeave = (e) => {
        e.preventDefault();
        setDragging(false);
    };

    const handleDrop = (e) => {
        e.preventDefault();
        setDragging(false);
        const file = e?.dataTransfer?.files[0];
        setImage(URL.createObjectURL(file))
        setFile(file);
    };

    const handleFileInputChange = (e) => {
        const file = e?.target?.files[0];
        setImage(URL.createObjectURL(file))
        setFile(file);
    };

    const checkBookingIDExists = (id) => {
        return checkIns.some(checkIn => checkIn.booking_ID === id);
    };

    const generateBookingID = () => {
        let booking_ID;

        do {
            booking_ID = Math.random().toString(36).substring(7);
        } while (checkBookingIDExists(booking_ID))

        return booking_ID;
    };

    // ADDING DATA TO FIREBASE
    const handleAddCheckIn = async () => {
        setLoader(true)
        setUploading(true)
        try {
            if (!title || !image || !file?.type?.startsWith('image/')) {
                setUploading(false);
                setLoader(false)
                console.log("Please add something.");
                return;
            }

            // Create a storage reference for the image
            const storageRef = ref(storage, `images/${file?.name}`);

            // Upload the image to Firebase Storage
            const snapshot = await uploadBytes(storageRef, file);
            const downloadURL = await getDownloadURL(snapshot.ref);

            const booking_ID = generateBookingID()

            const checkInData = {
                booking_ID,
                title,
                image: downloadURL,
                booked_date: moment().format('Do MMM, YYYY'),
            };

            await addDoc(checkInsCollectionRef, checkInData);

            setLoader(false)
            setUploading(false)
            setTitle('');
            setImage(null);
            onClose();
        } catch (error) {
            setLoader(false)
            setUploading(false)
            console.error('Error adding check-in:', error);
        }
    };


    return (
        <Modal open={open} onClose={onClose}>
            <Box
                sx={{
                    bgcolor: 'white',
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: 500,
                    maxWidth: '100%',
                    borderRadius: 4,
                    p: 0,
                    outline: 'none',
                    overflowX: 'hidden',
                    overflowY: 'auto'
                }}
            >
                {/* MODAL HEADER */}
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2, p: 1, px: 2, bgcolor: '#F8F8F8' }}>
                    <Typography variant="p" sx={{ flexGrow: 1, textAlign: 'left', fontWeight: "500" }}>Add Check In</Typography>
                    <IconButton onClick={onClose}>
                        <CloseIcon />
                    </IconButton>
                </Box>

                {/* MODAL CONTENT */}
                <Box sx={{ paddingX: 3, paddingY: 1 }}>
                    {/* TITLE INPUT */}
                    <Box sx={{ mb: 2 }}>
                        <Typography variant="body1" sx={{ mb: 1 }}>Title</Typography>
                        <TextField label="Title" size='small' variant="outlined" fullWidth onChange={(e) => setTitle(e.target.value)} />
                    </Box>

                    {/* IMAGE INPUT */}
                    <Box sx={{ mb: 2 }}>
                        <Typography variant="body1" sx={{ mb: 1 }}>Upload Image</Typography>
                        <label htmlFor="upload-image" className='cursor-pointer'>
                            <input
                                type="file"
                                id="upload-image"
                                style={{ display: 'none' }}
                                onChange={handleFileInputChange}
                            />
                            <Box
                                sx={{
                                    border: '2px dashed #cccccc',
                                    borderRadius: 1,
                                    padding: '20px',
                                    textAlign: 'center',
                                    cursor: 'pointer',
                                    bgcolor: dragging ? '#f0f0f0' : 'transparent',
                                    height: 200,
                                    width: '100%',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    ":hover": {
                                        bgcolor: '#f0f0f0'
                                    }
                                }}
                                position="relative"
                                onDragEnter={handleDragEnter}
                                onDragOver={(e) => e.preventDefault()}
                                onDragLeave={handleDragLeave}
                                onDrop={handleDrop}
                            >
                                {
                                    uploading ? (
                                        <Typography variant="body2">Uploading...</Typography>
                                    ) : (
                                        <>
                                            {image ? (
                                                <Image src={image} fill alt="Uploaded" style={{ objectFit: 'contain' }} />
                                            ) : (
                                                <Box>
                                                    <Icon fontSize="large" color='primary'>
                                                        <CloudUploadIcon fontSize='large' sx={{ mb: 3 }} />
                                                    </Icon>
                                                    <Typography variant="body1">{dragging ? 'Drop here' : 'Click or drag file to this area to upload'}</Typography>
                                                </Box>)}
                                        </>
                                    )
                                }
                            </Box>
                        </label>
                    </Box>
                </Box>

                {/* MODAL FOOTER */}
                <Box sx={{ display: 'flex', justifyContent: 'flex-end', borderTop: '1px solid gainsboro', gap: 1 }} padding={2}>
                    <CustomButton variant="outlined" onClick={onClose}>
                        Close
                    </CustomButton>
                    <CustomButton loading={loader} variant="contained" onClick={handleAddCheckIn}>
                        Add
                    </CustomButton>
                </Box>
            </Box>
        </Modal>
    );
};

export default AddModal;