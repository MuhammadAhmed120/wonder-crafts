import { Box, Typography, Modal, IconButton, TextField } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import Image from 'next/image';

import { collection, query, getDocs } from 'firebase/firestore';
import { firestore } from '@/app/firebase';

import moment from 'moment';

import CustomButton from '../button';

const styles = {
    bgcolor: 'white',
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 600,
    maxWidth: '100%',
    height: 'auto',
    borderRadius: 4,
    p: 0,
    outline: 'none',
    overflowX: 'hidden',
    overflowY: 'auto'
}

const ViewModal = ({ open, onClose, selectedCheckIn }) => {
    const formatDate = (dateString) => {
        if (!dateString) return ''; 
        
        const date = moment(dateString, 'Do MMM, YYYY', true);

        // Check if the date is valid
        if (!date.isValid()) return '';

        // Format the date as a "datetime-local" string
        const formattedDate = date.format('YYYY-MM-DDTHH:mm');
        return formattedDate;
    };

    return (
        <Modal open={open} onClose={onClose}>
            <Box
                sx={styles}
            >
                {/* MODAL HEADER */}
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2, p: 1, px: 2, bgcolor: '#F8F8F8' }}>
                    <Typography variant="p" sx={{ flexGrow: 1, textAlign: 'left', fontWeight: "500" }}>Detail</Typography>
                    <IconButton onClick={onClose}>
                        <CloseIcon />
                    </IconButton>
                </Box>

                {/* MODAL CONTENT */}
                <Box sx={{ display: 'flex', justifyContent: 'space-between', paddingX: 3, paddingY: 1, gap: 2, flexDirection: { xs: 'column', md: 'row' } }}>
                    {/* LEFT CONTENT */}
                    <Box sx={{ width: { xs: '100%', md: '50%' } }}>
                        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <Typography variant="body1" sx={{ flexBasis: '40%', fontWeight: '600' }}>Booking ID</Typography>
                                <TextField size='small' value={selectedCheckIn?.booking_ID || ''} variant="outlined" sx={{ flexBasis: '40%' }} hiddenLabel disabled />
                            </Box>
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <Typography variant="body1" sx={{ flexBasis: '40%', fontWeight: '600' }}>Rooms</Typography>
                                <TextField size='small' value={selectedCheckIn?.rooms || '4'} variant="outlined" sx={{ flexBasis: '15%' }} hiddenLabel disabled />
                            </Box>
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <Typography variant="body1" sx={{ flexBasis: '40%', fontWeight: '600' }}>Number of Guests</Typography>
                                <TextField size='small' value={selectedCheckIn?.guests || '4'} variant="outlined" sx={{ flexBasis: '15%' }} hiddenLabel disabled />
                            </Box>
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <Typography variant="body1" sx={{ flexBasis: '40%', fontWeight: '600' }}>Booked Date</Typography>
                                <TextField type='datetime-local' value={formatDate(selectedCheckIn?.booked_date || '')} size='small' variant="outlined" sx={{ flexBasis: '50%' }} hiddenLabel disabled />
                            </Box>
                        </Box>
                    </Box>

                    {/* RIGHT CONTENT */}
                    <Box sx={{ width: { xs: '100%', md: '50%' } }}>
                        <Box
                            sx={{
                                border: '2px dashed #cccccc',
                                borderRadius: 1,
                                padding: '20px',
                                textAlign: 'center',
                                bgcolor: '#f0f0f0',
                                height: 200,
                                width: '100%',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                            }}
                            position="relative"
                        >
                            {/* Display image */}
                            <Image
                                src={selectedCheckIn?.image}
                                alt={`${selectedCheckIn?.title} CheckIn Image`}
                                fill
                                style={{ objectFit: 'cover' }}
                                placeholder="blur"
                                blurDataURL={"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNcsuDqNAAGugKxwB4eewAAAABJRU5ErkJggg=="}
                            />
                        </Box>
                    </Box>
                </Box>

                {/* MODAL FOOTER */}
                <Box sx={{ display: 'flex', justifyContent: 'flex-end', borderTop: '1px solid gainsboro', gap: 1 }} padding={2}>
                    <CustomButton variant="outlined" onClick={onClose}>
                        Close
                    </CustomButton>
                    <CustomButton variant="contained" onClick={onClose}>
                        Ok
                    </CustomButton>
                </Box>
            </Box>
        </Modal>
    );
};

export default ViewModal;