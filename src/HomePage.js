import React, { useState , useEffect} from 'react';
import { Button, Container, Typography, Box, Dialog, DialogContent, DialogTitle } from '@mui/material';
import { Link } from 'react-router-dom';
import Signup from './Signup';
import Login from './Login';
import Orders from './Orders';
import { useAuth } from './AuthContext';

const HomePage = () => {
  const [loginopen, setLoginOpen] = useState(false);
  const handleLoginOpen = () => setLoginOpen(true);
  const handleLoginClose = () => setLoginOpen(false);

  const [signupopen, setSignupOpen] = useState(false);
  const handleSignupOpen = () => setSignupOpen(true);
  const handleSignupClose = () => setSignupOpen(false);

  const { isLoggedin, setIsLoggedin } = useAuth();

  return (
    <Container
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'stretch',
        height: '100vh',
        width: '100vw',
        padding: '10px',
      }}
    >
      <Box style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography variant="h4" gutterBottom>
          Website
        </Typography>
        {isLoggedin ? (
          <Button 
            variant="contained" 
            color="primary" 
            style={{ margin: '10px', borderRadius: '10px' ,'&:hover': { boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)', backgroundColor: '#0062cc', transform: 'scale(1.05)'}}}
            onClick={() => {setIsLoggedin(false)}}>
            Log Out
          </Button>
        ) :
        <Box style={{ display: 'flex', justifyContent: 'center' }}>
          <Button
            variant="contained"
            color="primary"
            size="large"
            style={{ margin: '10px', borderRadius: '10px' ,'&:hover': { boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)', backgroundColor: '#0062cc', transform: 'scale(1.05)'}}}
            component={Link}
            onClick={handleSignupOpen}
          >
            Sign Up
          </Button>
          <Button
            variant="contained"
            color="primary"
            size="large"
            style={{ margin: '10px', borderRadius: '10px' ,'&:hover': { boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)', backgroundColor: '#0062cc', transform: 'scale(1.05)'}}}
            onClick={handleLoginOpen}
          >
            Log In
          </Button>
        </Box>
        }
      </Box>

      {isLoggedin &&(
        <Box style={{ flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <Orders />
      </Box>
      )}

      <Dialog open={loginopen} onClose={handleLoginClose} maxWidth="sm" fullWidth>
        <DialogContent style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', maxHeight: '80vh' }}>
          <Box style={{ width: '100%', maxHeight: '50vh', overflow: 'hidden' }}>
            <Login />
          </ Box >
        </DialogContent>
      </Dialog>

      <Dialog open={signupopen} onClose={handleSignupClose} maxWidth="sm" fullWidth>
        <DialogContent>
          <Signup />
        </DialogContent>
      </Dialog>
    </Container>
  );
};

export default HomePage; 