import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const CreateAttemptPage: React.FC<{
  questionId: number;
  categoryId: number;
}> = ({ questionId, categoryId }) => {
  const [date, setDate] = useState('');
  const [timeTaken, setTImeTaken] = useState(0);

  const handleChangeDate = (dateVal: string) => {
    setDate(dateVal);
  };

  const handleChangeTimeTaken = (timeTakenVal: string) => {
    setTImeTaken(Number(timeTakenVal));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const attemptInfo = await window.electron.ipcRenderer.createAttempt(
      date,
      timeTaken,
      categoryId,
      questionId,
    );
    console.log('attempt info: ', attemptInfo);
  };

  return (
    <div>
      <h2>Create Attempt</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="attemptDate">Date</label>
        <input
          id="attemptDate"
          type="date"
          value={date}
          onChange={(event) => handleChangeDate(event.target.value)}
        />
        <label htmlFor="attemptTimeTaken">Amount of Time Taken</label>
        <input
          id="attemptTimeTaken"
          type="number"
          value={timeTaken}
          onChange={(event) => handleChangeTimeTaken(event.target.value)}
        />
        <button type='submit'>Submit</button>
      </form>
    </div>
  );
};

export default CreateAttemptPage;
