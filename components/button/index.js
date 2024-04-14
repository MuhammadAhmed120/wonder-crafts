import React from 'react';
import LoadingButton from '@mui/lab/LoadingButton';

export default function CustomButton({ children, variant, color, onClick, size, loading }) {
    return (
        <LoadingButton
            variant={variant || 'contained'}
            disableElevation
            color={color}
            loading={loading}
            size={size || 'medium'}
            onClick={onClick}
            sx={{ borderRadius: '9999px', textTransform: 'capitalize' }}
        >
            {children}
        </LoadingButton>
    );
};