// src/components/GoalForm.tsx
import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { TextField, Button } from '@mui/material';
import { useSnackbar } from 'notistack';
import axios from 'axios';
import { Goal } from '../models/Goals'; // Import the goal model

interface GoalFormProps {
  goalId?: number; // Optional goal ID for editing existing goals
}

const GoalForm: React.FC<GoalFormProps> = ({ goalId }) => {
  const router = useRouter();
  const [goalType, setGoalType] = useState('');
  const [targetValue, setTargetValue] = useState('');
  const [timeframe, setTimeframe] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const { enqueueSnackbar } = useSnackbar();

  // Function to handle form submission
  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setIsLoading(true);
    setError('');

    // Basic validation - adapt to your specific needs
    if (!goalType || !targetValue || !timeframe) {
      setError('Please fill in all fields.');
      enqueueSnackbar('Please fill in all fields.', { variant: 'error' });
      setIsLoading(false);
      return;
    }

    const newGoal: Goal = {
      goalType,
      targetValue,
      timeframe,
      // ... other fields 
    };

    try {
      let response;
      if (goalId) {
        // Update existing goal
        response = await axios.put(`/api/goals/${goalId}`, newGoal);
      } else {
        // Create new goal
        response = await axios.post('/api/goals', newGoal);
      }

      enqueueSnackbar('Goal saved successfully!', { variant: 'success' });
      router.push('/goals'); // Redirect to the goals page
    } catch (error) {
      setError(error.message);
      enqueueSnackbar(error.message, { variant: 'error' });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col w-full max-w-sm p-4 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">
        {goalId ? 'Edit Goal' : 'Create New Goal'}
      </h2>

      <TextField
        label="Goal Type"
        select
        value={goalType}
        onChange={(e) => setGoalType(e.target.value)}
        required
        margin="normal"
        className="mb-2"
      >
        <option value="weight loss">Weight Loss</option>
        <option value="muscle gain">Muscle Gain</option>
        <option value="running distance">Running Distance</option>
        {/* ... Add other goal types */}
      </TextField>

      <TextField
        label="Target Value"
        type="number"
        value={targetValue}
        onChange={(e) => setTargetValue(e.target.value)}
        required
        margin="normal"
        className="mb-2"
      />

      <TextField
        label="Timeframe"
        type="date"
        value={timeframe}
        onChange={(e) => setTimeframe(e.target.value)}
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
        {isLoading ? 'Saving...' : 'Save Goal'}
      </Button>
    </form>
  );
};

export default GoalForm;