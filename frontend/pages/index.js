import React, { useState } from 'react';
import { useQuery } from 'react-query';
import SleepCard from '../components/SleepCard';
import SleepForm from '../components/SleepForm';
import SleepChart from '../components/SleepChart';

const Home = () => {
  const [showForm, setShowForm] = useState(false);

  const { data: sleepData, isLoading, isError, refetch } = useQuery(
    'sleepData',
    () => fetch('/api/sleep').then((response) => response.json())
  );

  const handleAddSleep = () => {
    setShowForm(false);
    refetch();
  };

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (isError) {
    return <p>Error fetching sleep data</p>;
  }

  return (
    <div className="max-w-lg mx-auto py-8">
      <h1 className="text-2xl font-semibold mb-4">Sleep Tracker</h1>
      <button
        className="bg-blue-500 text-white font-semibold py-2 px-4 rounded mb-4"
        onClick={() => setShowForm(!showForm)}
      >
        {showForm ? 'Hide Form' : 'Add Sleep'}
      </button>
      {showForm && <SleepForm onSubmit={handleAddSleep} />}
      <h2 className="text-lg font-semibold mb-4">Sleep Records</h2>
      {sleepData.length === 0 ? (
        <p>No sleep records found.</p>
      ) : (
        sleepData.map((sleep) => <SleepCard key={sleep.id} sleep={sleep} />)
      )}
      <SleepChart />
    </div>
  );
};

export default Home;
