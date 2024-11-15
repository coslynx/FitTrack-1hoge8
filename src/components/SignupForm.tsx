import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { TextField, Button } from '@mui/material';
import { useSnackbar } from 'notistack';
import axios from 'axios';
import { User } from '../models/User';

const SignupForm: React.FC = () => {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const { enqueueSnackbar } = useSnackbar();

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setIsLoading(true);
    setError('');

    if (!email || !password) {
      setError('Please fill in all fields.');
      enqueueSnackbar('Please fill in all fields.', { variant: 'error' });
      return;
    }

    try {
      const response = await axios.post('/api/auth/signup', { email, password });
      const user = response.data as User;

      // Handle successful signup - store token or session data for future requests
      // ... (Implement logic for token storage or session management)

      router.push('/login'); // Redirect to the login page
    } catch (error) {
      setError(error.message);
      enqueueSnackbar(error.message, { variant: 'error' });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col w-full max-w-sm p-4 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">Sign Up</h2>

      <TextField
        label="Email"
        type="email"
        value={email}
        onChange={handleEmailChange}
        required
        margin="normal"
        className="mb-2"
      />

      <TextField
        label="Password"
        type="password"
        value={password}
        onChange={handlePasswordChange}
        required
        margin="normal"
        className="mb-2"
      />

      {error && <div className="text-red-500">{error}</div>}

      <Button
        type="submit"
        variant="contained"
        color="primary"
        disabled={isLoading}
        className="mt-4"
      >
        {isLoading ? 'Signing Up...' : 'Sign Up'}
      </Button>
    </form>
  );
};

export default SignupForm;