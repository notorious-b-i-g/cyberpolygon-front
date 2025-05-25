import React, { useState } from 'react';
import { useNavigate, Link as RouterLink, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import {
  AppBar,
  Box,
  Toolbar,
  IconButton,
  Typography,
  Menu,
  Container,
  Avatar,
  Button,
  Tooltip,
  MenuItem,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
  Stack,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import HomeIcon from '@mui/icons-material/Home';
import SchoolIcon from '@mui/icons-material/School';
import AssignmentIcon from '@mui/icons-material/Assignment';
import CodeIcon from '@mui/icons-material/Code';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import QuizIcon from '@mui/icons-material/Quiz';
import LogoutIcon from '@mui/icons-material/Logout';
import LoginIcon from '@mui/icons-material/Login';
import { logout } from '../../redux/slices/authSlice';
import authApi from '../../api/auth';
import { ThemeToggleButton } from '../ui';
import { useTheme } from '../../theme/ThemeContext';

const Navbar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector(state => state.user || { user: null });
  const isAuthenticated = authApi.isAuthenticated();
  const location = useLocation();
  
  const [anchorElUser, setAnchorElUser] = useState(null);
  const [drawerOpen, setDrawerOpen] = useState(false);

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleDrawerToggle = () => {
    setDrawerOpen(!drawerOpen);
  };

  const handleLogout = async () => {
    try {
      await authApi.logout();
      dispatch(logout());
      navigate('/auth');
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error('Logout error:', error);
    }
    handleCloseUserMenu();
  };

  // Все доступные пункты меню
  const allMenuItems = [
    { title: 'Главная', path: '/', icon: <HomeIcon />, public: true },
    { title: 'Статьи', path: '/resources', icon: <MenuBookIcon />, public: true },
    { title: 'Учебные треки', path: '/tracks', icon: <SchoolIcon />, public: true },
    { title: 'Задания', path: '/tasks', icon: <AssignmentIcon />, public: false },
    { title: 'Тесты', path: '/tests', icon: <QuizIcon />, public: false }
  ];

  // Только для авторизованных - "Терминал" спрятан в боковое меню
  const privateMenuItems = [
    { title: 'Терминал', path: '/terminal', icon: <CodeIcon /> }
  ];

  // Фильтруем меню в зависимости от статуса авторизации
  const visibleMenuItems = allMenuItems.filter(item => item.public || isAuthenticated);

  const userMenuItems = isAuthenticated
    ? [
        { title: 'Профиль', path: '/profile', action: () => navigate('/profile') },
        { title: 'Выйти', action: handleLogout },
      ]
    : [{ title: 'Войти', path: '/auth', action: () => navigate('/auth') }];

  const drawer = (
    <Box sx={{ width: 260 }} role="presentation" onClick={handleDrawerToggle}>
      <Box sx={{ p: 2, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Typography variant="h6" component={RouterLink} to="/" sx={{ 
          color: 'text.primary', 
          textDecoration: 'none',
          fontWeight: 700
        }}>
          CyberPolygon
        </Typography>
      </Box>
      <Divider />
      <List>
        {visibleMenuItems.map((item) => (
          <ListItem
            button
            key={item.title}
            component={RouterLink}
            to={item.path}
          >
            <ListItemIcon sx={{ minWidth: 40, color: 'primary.main' }}>{item.icon}</ListItemIcon>
            <ListItemText primary={item.title} />
          </ListItem>
        ))}
        {isAuthenticated && privateMenuItems.map((item) => (
          <ListItem
            button
            key={item.title}
            component={RouterLink}
            to={item.path}
          >
            <ListItemIcon sx={{ minWidth: 40, color: 'primary.main' }}>{item.icon}</ListItemIcon>
            <ListItemText primary={item.title} />
          </ListItem>
        ))}
      </List>
      <Divider />
      <List>
        {isAuthenticated ? (
          <>
            <ListItem button component={RouterLink} to="/profile">
              <ListItemIcon sx={{ minWidth: 40, color: 'primary.main' }}>
                <AccountCircleIcon />
              </ListItemIcon>
              <ListItemText primary="Профиль" />
            </ListItem>
            <ListItem button onClick={handleLogout}>
              <ListItemIcon sx={{ minWidth: 40, color: 'secondary.main' }}>
                <LogoutIcon />
              </ListItemIcon>
              <ListItemText primary="Выйти" />
            </ListItem>
          </>
        ) : (
          <ListItem button component={RouterLink} to="/auth">
            <ListItemIcon sx={{ minWidth: 40, color: 'primary.main' }}>
              <LoginIcon />
            </ListItemIcon>
            <ListItemText primary="Войти" />
          </ListItem>
        )}
      </List>
    </Box>
  );

  return (
    <AppBar position="sticky" sx={{ boxShadow: '0 4px 20px rgba(0,0,0,0.15)' }}>
      <Container maxWidth="lg">
        <Toolbar disableGutters sx={{ minHeight: { xs: 64, md: 70 } }}>
          {/* Мобильное меню */}
          <Box sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }}>
            <IconButton
              size="large"
              aria-label="меню навигации"
              onClick={handleDrawerToggle}
              color="inherit"
              edge="start"
            >
              <MenuIcon />
            </IconButton>
            <Drawer
              anchor="left"
              open={drawerOpen}
              onClose={handleDrawerToggle}
              sx={{ 
                '& .MuiDrawer-paper': { 
                  backgroundColor: 'background.paper',
                  boxSizing: 'border-box' 
                } 
              }}
            >
              {drawer}
            </Drawer>
          </Box>

          {/* Логотип */}
          <Typography
            variant="h6"
            component={RouterLink}
            to="/"
            sx={{
              fontWeight: 700,
              color: 'inherit',
              textDecoration: 'none',
              letterSpacing: '.1rem',
              mr: { xs: 0, md: 4 }
            }}
          >
            CyberPolygon
          </Typography>

          {/* Десктопное меню */}
          <Box
            sx={{
              flexGrow: 1,
              display: { xs: 'none', md: 'flex' }
            }}
          >
            {visibleMenuItems.map((page) => (
              <Button
                key={page.title}
                component={RouterLink}
                to={page.path}
                sx={{
                  color: 'inherit',
                  mx: 0.8,
                  py: 1,
                  display: 'block',
                  textTransform: 'none',
                  fontSize: '1rem',
                  fontWeight: 500
                }}
              >
                {page.title}
              </Button>
            ))}
          </Box>

          {/* Тема */}
          <ThemeToggleButton sx={{ mr: 1 }} />

          {/* Пользовательское меню */}
          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title={isAuthenticated ? 'Меню профиля' : 'Авторизация'}>
              <IconButton
                onClick={handleOpenUserMenu}
                sx={{ p: 0 }}
                aria-label="меню пользователя"
              >
                {isAuthenticated && user ? (
                  <Avatar
                    alt={user.username || 'User'}
                    src={user.avatar || ''}
                    sx={{ width: 36, height: 36, bgcolor: 'primary.main' }}
                  >
                    {!user.avatar && (user.first_name?.[0] || user.username?.[0] || '?')}
                  </Avatar>
                ) : (
                  <Avatar sx={{ width: 36, height: 36, bgcolor: 'primary.main' }}>
                    <AccountCircleIcon />
                  </Avatar>
                )}
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {userMenuItems.map((item) => (
                <MenuItem key={item.title} onClick={() => { handleCloseUserMenu(); item.action(); }}>
                  <Typography textAlign="center">{item.title}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Navbar; 