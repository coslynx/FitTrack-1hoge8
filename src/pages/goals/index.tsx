import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { Typography, Grid, Card, CardContent, CardHeader, List, ListItem, ListItemButton, ListItemText, TextField, Button } from '@mui/material';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { Bar } from 'react-chartjs-2';
import moment from 'moment';
import axios from 'axios';
import { Goal } from '../../models/Goals';

const GoalsPage: React.FC = () => {
  const router = useRouter();
  const [goals, setGoals] = useState<Goal[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchGoals = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const response = await axios.get('/api/goals', {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        });

        setGoals(response.data); 
      } catch (error: any) {
        setError(error.message);
        console.error('Error fetching goals:', error); 
      } finally {
        setIsLoading(false);
      }
    };

    fetchGoals(); 
  }, []);

  const handleCreateGoal = () => {
    router.push('/goals/create'); 
  };

  return (
    <div className="container mx-auto mt-10">
      <Typography variant="h4" gutterBottom>
        Your Goals
      </Typography>

      {isLoading && <p>Loading Goals...</p>}

      {error && <p>Error fetching goals: {error.message}</p>}

      <Grid container spacing={3}> 
        <Grid item xs={12}>
          <Card>
            <CardHeader title="Your Active Goals" />
            <CardContent>
              <List>
                {goals.map((goal) => (
                  <ListItem key={goal.id} disablePadding>
                    <ListItemButton onClick={() => router.push(`/goals/${goal.id}`)}>
                      <ListItemText
                        primary={goal.goalType}
                        secondary={
                          <>
                            <Typography variant="body2" color="textSecondary">
                              Target: {goal.targetValue}
                            </Typography>
                            <Typography variant="body2" color="textSecondary">
                              Deadline: {moment(goal.deadline).format('MMM DD, YYYY')}
                            </Typography>
                          </>
                        }
                      />
                    </ListItemButton>
                  </ListItem>
                ))}
              </List>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Button variant="contained" color="primary" onClick={handleCreateGoal}>
        Create New Goal
      </Button>
    </div>
  );
};

export default GoalsPage;