import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import moment from 'moment';
import { Goal } from '../models/Goals';
import { Typography, List, ListItem, ListItemText, ListItemButton } from '@mui/material';

const GoalList: React.FC = () => {
  const router = useRouter();
  const [goals, setGoals] = useState<Goal[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchGoals = async () => {
      try {
        const response = await axios.get('/api/goals'); // Replace with your actual API endpoint
        setGoals(response.data);
      } catch (error) {
        setError(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchGoals();
  }, []);

  const handleGoalClick = (goalId: number) => {
    router.push(`/goals/${goalId}`);
  };

  return (
    <div>
      <Typography variant="h4" gutterBottom>
        Your Goals
      </Typography>
      {isLoading && <p>Loading Goals...</p>}
      {error && <p>Error fetching goals: {error.message}</p>}
      <List>
        {goals.map((goal) => (
          <ListItem key={goal.id} disablePadding>
            <ListItemButton onClick={() => handleGoalClick(goal.id)}>
              <ListItemText
                primary={goal.goalType}
                secondary={
                  <>
                    <Typography variant="body2" color="textSecondary">
                      Target: {goal.targetValue}
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                      Created: {moment(goal.createdAt).format('MMM DD, YYYY')}
                    </Typography>
                  </>
                }
              />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </div>
  );
};

export default GoalList;