'use client';

import Image from 'next/image';
import { useState } from 'react';

import { Box, Typography } from '@mui/material';

// CUSTOM BUTTON
import CustomButton from '../button';

// MODAL
import AddModal from '../addModal';

// STYLES
import styles from './hero.module.css';


export default function HeroSection() {
    const [modalOpen, setModalOpen] = useState(false);

    const handleOpenModal = () => {
        setModalOpen(true);
    };

    const handleCloseModal = () => {
        setModalOpen(false);
    };

    return (
        <Box position="relative" sx={{ overflow: 'hidden' }}>
            <AddModal open={modalOpen} onClose={handleCloseModal} />

            <Box position="relative" className={styles.heroImg}>
                {/* Hero Image */}
                <Image
                    src="/hero-image.jpg"
                    alt="Hero"
                    fill
                    className={styles.imgComp}
                />
                {/* Black overlay on the left */}
                <Box
                    position="absolute"
                    top={0}
                    left={-20}
                    bottom={0}
                    width={{ xs: '75%', lg: '35%' }}
                    sx={{
                        backgroundImage: 'linear-gradient(to right, rgba(0, 0, 0, 1) 10%, rgba(0, 0, 0, 0.4) 70%)',
                        filter: 'blur(20px)',
                        padding: 0,
                    }}
                />
            </Box>

            {/* Text Overlay */}
            <Box
                position="absolute"
                top={0}
                left={0}
                right={0}
                bottom={0}
                display="flex"
                alignItems='center'
                justifyContent='flex-start'
                p={{ xs: 2, md: 4 }}
                color="white"
                zIndex={1}
            >
                <Box
                    bgcolor="transparent"
                    textAlign="left"
                >
                    {/* Heading */}
                    <Typography variant='h5' gutterBottom sx={{ fontWeight: 'bold' }}>
                        Hi! 👋 Ahmed Khan
                    </Typography>

                    {/* Description */}
                    <Typography variant="body1" paragraph>
                        Lorem ipsum dolor sit amen, something important to say here
                    </Typography>

                    {/* Button */}
                    <CustomButton color="primary" onClick={handleOpenModal} size="large">
                        Add Check In
                    </CustomButton>
                </Box>
            </Box >
        </Box >
    );
};