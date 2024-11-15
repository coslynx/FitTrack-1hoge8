import React, { useContext } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { AppBar, Toolbar, Typography, Button, Avatar } from '@mui/material';
import AuthContext from '../context/AuthContext';

const Header: React.FC = () => {
  const router = useRouter();
  const { isAuthenticated, user, login, logout } = useContext(AuthContext);

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Fitness Tracker
        </Typography>

        <div>
          <Link href="/dashboard">
            <Button variant="contained" color="primary">
              Dashboard
            </Button>
          </Link>
          <Link href="/goals">
            <Button variant="contained" color="primary">
              Goals
            </Button>
          </Link>
        </div>

        {isAuthenticated ? (
          <div>
            <Typography variant="body2" color="textSecondary">
              Welcome, {user?.firstName}!
            </Typography>
            <Avatar src={user?.profilePicture} alt={user?.firstName} />
            <Button variant="contained" onClick={logout}>
              Logout
            </Button>
          </div>
        ) : (
          <Button variant="contained" onClick={login}>
            Login
          </Button>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Header;