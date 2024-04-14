'use client'
import { useState } from 'react';

import { Box, Typography, IconButton, Grid } from '@mui/material';
import { FilterList } from '@mui/icons-material';

import { firestore, collection, query, orderBy } from '@/app/firebase'; // Import Firestore functions
import { useCollectionData } from 'react-firebase-hooks/firestore';

// CUSTOM COMPONENTS
import CustomLoader from '../customLoader';
import CheckInCard from './card';
import ViewModal from '../viewModal';

export default function CheckIns() {
    const [modalOpen, setModalOpen] = useState(false);
    const [selectedCheckIn, setSelectedCheckIn] = useState(null); // State to hold selected check-in

    const [checkInsData, loading, error] = useCollectionData(query(collection(firestore, 'checkIns'), orderBy('booked_date', 'asc')));

    if (loading) {
        return <CustomLoader />;
    }

    if (error) {
        return <p>Error: {error.message}</p>;
    }

    const handleOpenModal = (checkIn) => {
        console.log("checkIn | ", checkIn);
        setSelectedCheckIn(checkIn); 
        setModalOpen(true);
    };

    const handleCloseModal = () => {
        setSelectedCheckIn(null);
        setModalOpen(false);
    };

    return (
        <Box sx={{ marginTop: 5 }}>
            <ViewModal open={modalOpen} onClose={handleCloseModal} selectedCheckIn={selectedCheckIn} />

            {/* Heading */}
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                <Typography variant="h5">Added CheckIns</Typography>
                <IconButton color="primary">
                    <FilterList />
                </IconButton>
            </Box>

            {checkInsData.length === 0 &&
                <p>
                    No record found.
                </p>
            }

            {/* Cards */}
            <Grid sx={{ padding: 2 }} container spacing={2}>
                {checkInsData?.map(checkIn => (
                    <Grid item key={checkIn?.booking_ID} xs={12} sm={6} md={3}>
                        <CheckInCard onClick={handleOpenModal} checkIn={checkIn} />
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
}