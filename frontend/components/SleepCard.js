import React from 'react';
import { useMutation, useQueryClient } from 'react-query';
import axios from 'axios';

const SleepCard = ({ sleep }) => {
  const queryClient = useQueryClient();

  const deleteSleep = useMutation((id) => {
    return axios.delete(`/api/sleep/${id}`).then(() => {
      queryClient.invalidateQueries('sleepData');
    });
  });

  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this sleep record?')) {
      deleteSleep.mutate(sleep.id);
    }
  };

  return (
    <div className="bg-white rounded shadow p-4 mb-4">
      <div className="flex justify-between mb-2">
        <h3 className="text-lg font-semibold">Sleep Record</h3>
        <button
          className="text-red-600 font-semibold"
          onClick={handleDelete}
          disabled={deleteSleep.isLoading}
        >
          Delete
        </button>
      </div>
      <p>
        <strong>Bedtime:</strong> {new Date(sleep.bedtime).toLocaleTimeString()}
      </p>
      <p>
        <strong>Wakeup:</strong> {new Date(sleep.wakeup).toLocaleTimeString()}
      </p>
      <p>
        <strong>Duration:</strong> {calculateDuration(sleep.bedtime, sleep.wakeup)} hours
      </p>
      <p>
        <strong>Rating:</strong> {sleep.rating}/10
      </p>
      <p>
        <strong>Comment:</strong> {sleep.comment}
      </p>
    </div>
  );
};

function calculateDuration(bedtime, wakeup) {
  const diff = new Date(wakeup) - new Date(bedtime);
  return Math.floor(diff / (1000 * 60 * 60));
}

export default SleepCard;
