import React from 'react';
import { IconButton, Tooltip, Box } from '@mui/material';
import Brightness4Icon from '@mui/icons-material/Brightness4'; 
import Brightness7Icon from '@mui/icons-material/Brightness7';
import { useTheme } from '../../theme/ThemeContext';

const ThemeToggleButton = ({ sx = {} }) => {
  const { isDarkMode, toggleTheme } = useTheme();

  return (
    <Box sx={{ position: 'relative', zIndex: 10 }}>
      <Tooltip
        title={isDarkMode ? 'Светлая тема' : 'Тёмная тема'}
        placement="bottom"
        arrow
      >
        <IconButton
          onClick={toggleTheme}
          color="inherit"
          sx={{ 
            p: 1, 
            borderRadius: 1.5,
            transition: 'transform 0.2s',
            '&:hover': {
              transform: 'rotate(12deg)'
            },
            ...sx 
          }}
        >
          {isDarkMode ? <Brightness7Icon /> : <Brightness4Icon />}
        </IconButton>
      </Tooltip>
    </Box>
  );
};

export default ThemeToggleButton; 