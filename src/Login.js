import React , { useState, useEffect }from 'react';
import { TextField, Button, Container, Typography } from '@mui/material';
import axios from 'axios';
import { useAuth } from './AuthContext';


const Login = () => {

  const[email, setEmail] = useState('');
  const[password, setPassword] = useState('');

  const[emailerror, setEmailerror] = useState(false);
  const[passerror, setPasserror] = useState(false);

  const [ loading, setLoading] = useState(false);

  const { authUser,setAuthUser, isLoggedin, setIsLoggedin } = useAuth();

  useEffect(() => {
    console.log('Is Logged In:', isLoggedin); 
  }, [isLoggedin]);

  useEffect(() => {
    console.log('Token:', authUser);
  }, [authUser]);

  const handleSubmit = async () =>  {
    const emailRegex = /^[a-zA-Z0-9._%±]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,}$/;
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

    setLoading(true);
    setEmailerror(!emailRegex.test(email));
    setPasserror(!passwordRegex.test(password));
    if(!emailRegex.test(email)|| !passwordRegex.test(password))
      return;
    try {
      const response = await axios.post('https://uc-fd-auth-backend.onrender.com/user/login', {
        email,
        password
      })
      console.log(response);
      console.log(response.data);

      const token = response.data;
      localStorage.setItem('token', token);

      console.log('BOO');
      setAuthUser (token);

      alert('Sign-up successful!');

      setIsLoggedin(true);
      console.log(isLoggedin);

    } catch (error) {
      if (error.response && error.response.status === 409) {
        alert('User already exists. Please log in.');
      } else {
        console.error('There was an error signing up:', error);
        alert('Sign-up failed. Try again.');
      };
    }

    setLoading(false);

}

  return (
    
    <Container
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Typography variant="h4" gutterBottom>
        Log In
      </Typography>
      <TextField label="Email" variant="outlined" margin="normal" fullWidth onChange={(e) => setEmail(e.target.value)} error = {emailerror} helperText = {emailerror ? 'Enter Valid Email' : ''}/>
      <TextField label="Password" type="password" variant="outlined" margin="normal" fullWidth onChange={(e) => setPassword(e.target.value)}  error={passerror} helperText={passerror ? 'Password must contain atleast: 8 characters, 1 Lowercase letter, 1 Uppercase letter, 1 Number and 1 Special character' : ''}/>
      <Button variant="contained" color="primary" size="large" style={{ margin: '10px', borderRadius: '10px' ,'&:hover': { boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)', backgroundColor: '#0062cc', transform: 'scale(1.05)'}}} onClick={handleSubmit} disabled={loading}>
        Submit
      </Button>
    </Container>
  );
};

export default Login;