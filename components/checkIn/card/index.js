import Image from 'next/image';
import { Box, Typography, Avatar, Card, CardContent } from '@mui/material';

const CheckInCard = ({ checkIn, onClick }) => {
    const handleClick = () => {
        onClick(checkIn); // Pass checkIn data to onClick function
    };

    return (
        <Card
            sx={{
                borderRadius: '12px',
                cursor: 'pointer',
                ":hover": {
                    background: '#f9f9f9'
                }
            }}
            onClick={handleClick}
        >
            <CardContent>
                {/* Image */}
                <Box sx={{ height: 130, width: '100%', position: 'relative', overflow: 'hidden', mb: 2, borderRadius: '12px' }}>
                    <Image
                        src={checkIn.image}
                        alt={`CheckIn Image ${checkIn.id}`}
                        fill
                        style={{ objectFit: 'cover' }}
                        placeholder="blur"
                        blurDataURL={"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNcsuDqNAAGugKxwB4eewAAAABJRU5ErkJggg=="}
                    />
                    <Typography variant="p" gutterBottom sx={{ position: 'absolute', top: 10, right: 10, background: '#7B5AFF', padding: '6px 8px', borderRadius: 9999, fontSize: 13, fontWeight: 500, border: '1px solid #7B5AFF' }} color="common.white">{checkIn.status || 'Checked In'}</Typography>
                </Box>

                {/* Title */}
                <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold' }}>{checkIn.title.length > 10 ? `${checkIn.title.slice(0, 9)}...` : checkIn.title|| 'N/A'}</Typography>

                {/* Date */}
                <Typography variant="body2" color="text.secondary" gutterBottom>{checkIn.booked_date || 'N/A'}</Typography>

                {/* Avatar */}
                <Box sx={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'center' }}>
                    <Avatar alt="Owner" src={`/avatar-${checkIn.id}.jpg`} sx={{ width: 32, height: 32 }} />
                    <Typography variant="body2" ml={1} sx={{ fontWeight: '700' }}>Owner: {checkIn.owner || 'Ahmed Khan'}</Typography>
                </Box>
            </CardContent>
        </Card>
    );
}

export default CheckInCard;