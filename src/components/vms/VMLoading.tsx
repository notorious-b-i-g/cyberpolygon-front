import React from 'react';
import { Box, Skeleton, Card, CardContent } from '@mui/material';

const VMLoading: React.FC = () => {
  return (
    <Card sx={{ minWidth: 275 }}>
      <CardContent>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
          <Skeleton variant="text" width={150} height={40} />
          <Skeleton variant="rectangular" width={80} height={24} />
        </Box>
        <Skeleton variant="text" width="100%" height={20} />
        <Skeleton variant="text" width="100%" height={20} />
        <Skeleton variant="text" width="100%" height={20} />
        <Box sx={{ mt: 2 }}>
          <Skeleton variant="text" width={100} height={20} />
          <Skeleton variant="text" width={150} height={20} />
          <Skeleton variant="text" width={150} height={20} />
          <Skeleton variant="text" width={150} height={20} />
        </Box>
        <Box sx={{ mt: 2, display: 'flex', gap: 1 }}>
          <Skeleton variant="circular" width={40} height={40} />
          <Skeleton variant="circular" width={40} height={40} />
          <Skeleton variant="circular" width={40} height={40} />
        </Box>
      </CardContent>
    </Card>
  );
};

export default VMLoading; 