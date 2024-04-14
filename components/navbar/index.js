'use client';
import { AppBar, Toolbar, Box, Typography, IconButton, Avatar, Collapse, Menu, MenuItem } from '@mui/material';
import { ExpandMore, InfoOutlined, NotificationsOutlined } from '@mui/icons-material';

// CUSTOM BUTTON
import CustomButton from '../button';
import { useState } from 'react';

export default function Navbar() {
    const [anchorEl, setAnchorEl] = useState(null);

    const handleMenuClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };
    return (
        <AppBar
            position="sticky"
            color="transparent"
            elevation={4}
            sx={{
                boxShadow: '14px 17px 40px 0px #7090B014',
                margin: '0 auto',
                top: 26,
                borderRadius: '9999px',
                padding: 0.5,
            }}
        >
            <Toolbar sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 1, backgroundColor: 'white', borderRadius: '9999px' }}>
                {/* Left Side Content */}
                <Box sx={{ display: 'flex', alignItems: 'center', marginLeft: { xs: 2, lg: 4 } }}>
                    {/* Logo */}
                    <Box sx={{ width: '38px', height: '38px', backgroundColor: '#6B46C1', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <Typography variant="body2" color="inherit">Logo</Typography>
                    </Box>
                </Box>


                {/* Right Side Content */}
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    {/* Button */}
                    <Box sx={{ display: { xs: 'none', md: 'inline-flex' } }}>
                        <CustomButton color="primary">
                            <Typography variant="body1" color="inherit">
                                Feedback
                            </Typography>
                        </CustomButton>
                    </Box>

                    {/* Noti Icon */}
                    <IconButton sx={{ color: '#718096', display: { xs: 'none', md: 'inline-flex' } }}>
                        <NotificationsOutlined />
                    </IconButton>

                    {/* Info Icon */}
                    <IconButton sx={{ color: '#718096', display: { xs: 'none', md: 'inline-flex' } }}>
                        <InfoOutlined />
                    </IconButton>

                    {/* Avatar */}
                    <Avatar alt="User Avatar" src="/avatar.png" sx={{ display: { xs: 'none', md: 'inline-flex' } }} />

                    {/* ExpandMore Icon for small screens */}
                    <IconButton sx={{ color: '#718096', display: { xs: 'inline-flex', md: 'none' } }} onClick={handleMenuClick}>
                        <ExpandMore />
                    </IconButton>

                    {/* Dropdown Menu */}
                    <Menu
                        anchorEl={anchorEl}
                        open={Boolean(anchorEl)}
                        onClose={handleMenuClose}
                        sx={{ textAlign: 'center' }}
                        anchorOrigin={{
                            vertical: 'bottom',
                            horizontal: 'right',
                        }}
                        transformOrigin={{
                            vertical: 'top',
                            horizontal: 'right',
                        }}
                        getcontentanchorel={null}
                    >
                        {/* Menu Items */}
                        <MenuItem onClick={handleMenuClose}>
                            {/* Button */}
                            <CustomButton color="primary">
                                <Typography variant="body1">
                                    Feedback
                                </Typography>
                            </CustomButton>
                        </MenuItem>
                        <MenuItem onClick={handleMenuClose}>
                            {/* Noti Icon */}
                            <IconButton sx={{ color: '#718096' }}>
                                <NotificationsOutlined />
                            </IconButton>
                            <Typography sx={{ color: 'black' }} variant="body2">
                                Notifications
                            </Typography>
                        </MenuItem>
                        <MenuItem onClick={handleMenuClose}>
                            {/* Info Icon */}
                            <IconButton sx={{ color: '#718096' }}>
                                <InfoOutlined />
                            </IconButton>
                            <Typography sx={{ color: 'black' }} variant="body2">
                                Information
                            </Typography>
                        </MenuItem>
                        <MenuItem onClick={handleMenuClose}>
                            {/* Avatar */}
                            <Avatar alt="User Avatar" src="/avatar.png" />
                        </MenuItem>
                    </Menu>
                </Box>

            </Toolbar>
        </AppBar>
    )
}
// <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
//     {/* Button */}
//     <Box sx={{ display: { xs: 'none', md: 'inline-flex' } }}>
//         <CustomButton color="primary">
//             <Typography variant="body1" color="inherit">
//                 Feedback
//             </Typography>
//         </CustomButton>
//     </Box>

//     {/* Noti Icon */}
//     <IconButton sx={{ color: '#718096' }}>
//         <NotificationsOutlined />
//     </IconButton>

//     {/* Info Icon */}
//     <IconButton sx={{ color: '#718096' }}>
//         <InfoOutlined />
//     </IconButton>

//     {/* Avatar */}
//     <Avatar alt="User Avatar" src="/hero-image.jpg" />

//     {/* Menu Icon */}
//     <IconButton sx={{ color: '#718096' }}>
//         <ExpandMore />
//     </IconButton>
// </Box>