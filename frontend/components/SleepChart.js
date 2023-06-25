import React from 'react';
import { useQuery } from 'react-query';
import { Line } from 'react-chartjs-2';

const SleepChart = () => {
  const { data: sleepData, isLoading, isError } = useQuery('sleepData', () =>
    fetch('/api/sleep').then((response) => response.json())
  );

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (isError) {
    return <p>Error fetching sleep data</p>;
  }

  const chartData = {
    labels: sleepData.map((sleep) =>
      new Date(sleep.bedtime).toLocaleDateString()
    ),
    datasets: [
      {
        label: 'Sleep Duration (hours)',
        data: sleepData.map((sleep) =>
          calculateDuration(sleep.bedtime, sleep.wakeup)
        ),
        borderColor: 'rgb(75, 192, 192)',
        fill: false,
      },
      {
        label: 'Rating',
        data: sleepData.map((sleep) => sleep.rating),
        borderColor: 'rgb(255, 99, 132)',
        fill: false,
      },
    ],
  };

  const options = {
    responsive: true,
    scales: {
      x: {
        display: true,
        title: {
          display: true,
          text: 'Date',
        },
      },
      y: {
        beginAtZero: true,
        display: true,
        title: {
          display: true,
          text: 'Value',
        },
      },
    },
  };

  return (
    <div className="bg-white rounded shadow p-4">
      <h2 className="text-lg font-semibold mb-4">Sleep Duration and Rating Chart</h2>
      <Line data={chartData} options={options} />
    </div>
  );
};

function calculateDuration(bedtime, wakeup) {
  const diff = new Date(wakeup) - new Date(bedtime);
  return Math.floor(diff / (1000 * 60 * 60));
}

export default SleepChart;
