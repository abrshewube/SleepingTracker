import React, { useState } from 'react';
import { useMutation, useQueryClient } from 'react-query';
import axios from 'axios';

const SleepForm = ({ onSubmit }) => {
  const [bedtime, setBedtime] = useState('');
  const [wakeup, setWakeup] = useState('');
  const [rating, setRating] = useState('');
  const [comment, setComment] = useState('');

  const queryClient = useQueryClient();

  const createSleep = useMutation((newSleep) => {
    return axios.post('/api/sleep', newSleep).then((response) => response.data);
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    const newSleep = {
      bedtime,
      wakeup,
      rating: parseInt(rating),
      comment,
    };

    createSleep.mutate(newSleep, {
      onSuccess: () => {
        queryClient.invalidateQueries('sleepData');
        onSubmit();
      },
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-4">
        <label htmlFor="bedtime" className="block mb-1 font-semibold">
          Bedtime
        </label>
        <input
          type="time"
          id="bedtime"
          className="block w-full border-gray-300 rounded p-2"
          value={bedtime}
          onChange={(e) => setBedtime(e.target.value)}
          required
        />
      </div>
      <div className="mb-4">
        <label htmlFor="wakeup" className="block mb-1 font-semibold">
          Wakeup
        </label>
        <input
          type="time"
          id="wakeup"
          className="block w-full border-gray-300 rounded p-2"
          value={wakeup}
          onChange={(e) => setWakeup(e.target.value)}
          required
        />
      </div>
      <div className="mb-4">
        <label htmlFor="rating" className="block mb-1 font-semibold">
          Rating
        </label>
        <input
          type="number"
          id="rating"
          className="block w-full border-gray-300 rounded p-2"
          min="1"
          max="10"
          value={rating}
          onChange={(e) => setRating(e.target.value)}
          required
        />
      </div>
      <div className="mb-4">
        <label htmlFor="comment" className="block mb-1 font-semibold">
          Comment
        </label>
        <textarea
          id="comment"
          className="block w-full border-gray-300 rounded p-2"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />
      </div>
      <button
        type="submit"
        className="bg-blue-500 text-white font-semibold py-2 px-4 rounded"
        disabled={createSleep.isLoading}
      >
        Add Sleep
      </button>
    </form>
  );
};

export default SleepForm;
