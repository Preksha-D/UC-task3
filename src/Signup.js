import React, { useState, createContext } from 'react';
import { TextField, Button, Container, Typography } from '@mui/material';
import axios from 'axios';

const Signup = () => {

  const[name, setName] = useState('');
  const[email, setEmail] = useState('');
  const[password, setPassword] = useState('');
  const[mobileno, setMobileno] = useState('');
  const[age, setAge] = useState('');

  
  const[emailerror, setEmailerror] = useState(false);
  const[moberror, setMoberror] = useState(false);
  const[passerror, setPasserror] = useState(false);

  const handleSubmit = async () => {

    const emailRegex = /^[a-zA-Z0-9._%±]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,}$/;
    const mobileRegex = /^\d{10}$/;
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

    setEmailerror(!emailRegex.test(email));
    setMoberror(!mobileRegex.test(mobileno));
    setPasserror(!passwordRegex.test(password));
    if(!emailRegex.test(email)|| !mobileRegex.test(mobileno) || !passwordRegex.test(password))
      return;
    try {
      const response = await axios.post('https://uc-fd-auth-backend.onrender.com/user/register', {
        name,
        email,
        password,
        mobileno,
        age
      })
      console.log(response);
      console.log(response.data);

      alert('Sign-up successful!');
    } catch (error) {
      if (error.response && error.response.status === 409) {
        alert('User already exists. Please log in.');
      } else {
        console.error('There was an error signing up:', error);
        alert('Sign-up failed. Try again.');
      };
    }
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
        Sign Up
      </Typography>
      <TextField label="Name" variant="outlined" margin="normal" fullWidth onChange={(e) => setName(e.target.value)} />
      <TextField label="Email" variant="outlined" margin="normal" fullWidth onChange={(e) => setEmail(e.target.value)} error = {emailerror} helperText = {emailerror ? 'Enter Valid Email' : ''}/>
      <TextField label="Password" type="password" variant="outlined" margin="normal" fullWidth onChange={(e) => setPassword(e.target.value)}  error={passerror} helperText={passerror ? 'Password must contain atleast: 8 characters, 1 Lowercase letter, 1 Uppercase letter, 1 Number and 1 Special character' : ''}/>
      <TextField label="Mobile Number" type="number" variant="outlined" margin="normal" fullWidth onChange={(e) => setMobileno(e.target.value)} error={moberror} helperText={moberror ? 'Enter a validmobile number' : ''}/>
      <TextField label="Age" type="number" variant="outlined" margin="normal" fullWidth onChange={(e) => setAge(e.target.value)}/>
      <Button variant="contained" color="primary" size="large" style={{ margin: '10px', borderRadius: '10px' ,'&:hover': { boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)', backgroundColor: '#0062cc', transform: 'scale(1.05)'}}} onClick={handleSubmit}>
        Submit
      </Button>
    </Container>
  );
};

export default Signup;