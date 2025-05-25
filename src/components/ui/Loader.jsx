import React from 'react';
import { Box, CircularProgress, Skeleton, Stack } from '@mui/material';

const Loader = ({ variant = 'spinner' }) => {
  if (variant === 'skeleton') {
    return (
      <Box sx={{ width: '100%', p: 2 }}>
        <Stack spacing={2}>
          <Skeleton variant="rectangular" width="100%" height={60} />
          <Skeleton variant="rectangular" width="100%" height={40} />
          <Skeleton variant="rectangular" width="100%" height={40} />
        </Stack>
      </Box>
    );
  }

  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', p: 4 }}>
      <CircularProgress />
    </Box>
  );
};

export default Loader; 