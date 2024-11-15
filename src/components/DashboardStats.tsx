import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { Bar } from 'react-chartjs-2';
import moment from 'moment';
import { User } from '../models/User';
import axios from 'axios';

interface DashboardStatsProps {
  user: User;
}

const DashboardStats: React.FC<DashboardStatsProps> = ({ user }) => {
  const router = useRouter();
  const [userData, setUserData] = useState<any[]>([]);
  const [goalsData, setGoalsData] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await axios.get(`/api/users/${user.id}/progress`);
        setUserData(response.data.progress);
        setGoalsData(response.data.goals);
      } catch (error) {
        setError(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserData();
  }, [user.id]);

  const prepareChartData = () => {
    const weightData = userData.map((dataPoint) => ({
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
    <div className="dashboard-stats">
      <Bar data={prepareChartData()} />
      {/* Render other stats and data as needed */}
    </div>
  );
};

export default DashboardStats;