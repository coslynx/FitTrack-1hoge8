import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { Button, Typography, Grid, Card, CardContent, CardHeader } from '@mui/material';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { Bar } from 'react-chartjs-2';
import moment from 'moment';
import axios from 'axios';
import { User } from '../../models/User';
import { Goal } from '../../models/Goals';

const DashboardPage: React.FC = () => {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null); 
  const [goals, setGoals] = useState<Goal[]>([]);
  const [progressData, setProgressData] = useState<any[]>([]); 
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      setError(null);

      try {
        // Fetch user data from API (use axios)
        const userResponse = await axios.get('/api/users/me', { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } }); 
        setUser(userResponse.data);

        // Fetch goals from API 
        const goalsResponse = await axios.get('/api/goals', { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } });
        setGoals(goalsResponse.data);

        // Fetch progress data for this user
        const progressResponse = await axios.get(`/api/users/${userResponse.data.id}/progress`, { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } });
        setProgressData(progressResponse.data);
      } catch (error: any) {
        setError(error.message);
        // Log the error for debugging
        console.error('Error fetching data:', error); 
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  const prepareChartData = () => {
    const weightData = progressData.map((dataPoint) => ({
      date: moment(dataPoint.date).format('MMM DD'),
      weight: dataPoint.weight,
    }));

    return {
      labels: weightData.map((dataPoint) => dataPoint.date),
      datasets: [
        {
          label: 'Weight (kg)',
          data: weightData.map((dataPoint) => dataPoint.weight),
          backgroundColor: 'rgba(54, 162, 235, 0.2)',
          borderColor: 'rgba(54, 162, 235, 1)',
          borderWidth: 1,
        },
      ],
    };
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="container mx-auto mt-10">
      <Typography variant="h4" gutterBottom>
        Dashboard
      </Typography>

      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Card>
            <CardHeader title="User Profile" />
            <CardContent>
              {/* Display user profile details */}
              <Typography variant="body2" color="textSecondary">
                Name: {user?.firstName} {user?.lastName}
              </Typography>
              {/* Display user profile picture */}
              {user?.profilePicture && (
                <img src={user.profilePicture} alt={user.firstName} className="w-24 h-24 rounded-full" />
              )} 
              {/* Display other profile details as needed */}
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={6}>
          <Card>
            <CardHeader title="Weight Progress" />
            <CardContent>
              <Bar data={prepareChartData()} />
            </CardContent>
          </Card>
        </Grid>

        {/* Render other stats and data as needed (e.g., Goals, Recent Activity, etc.) */}
      </Grid>
    </div>
  );
};

export default DashboardPage;