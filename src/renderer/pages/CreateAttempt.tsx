import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Category } from '../../model';

const CreateAttemptPage: React.FC<{
  questionId: number;
  categoryId: number;
  categories: Category[];
}> = ({ questionId, categoryId, categories }) => {
  const [date, setDate] = useState('');
  const [timeTaken, setTImeTaken] = useState(0);
  const [selectedCategoryId, setSelectedCategoryId] = useState(categoryId);

  const handleChangeDate = (dateVal: string) => {
    setDate(dateVal);
  };

  const handleChangeTimeTaken = (timeTakenVal: string) => {
    setTImeTaken(Number(timeTakenVal));
  };

  const handleChangeCategory = (curCategoryId: string) => {
    setSelectedCategoryId(Number(curCategoryId));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const attemptInfo = await window.electron.ipcRenderer.createAttempt(
      date,
      timeTaken,
      selectedCategoryId,
      questionId,
    );
    console.log('attempt info: ', attemptInfo);
  };

  const categoryOptions = categories.map((category) => (
    <option value={category.id}>{category.title}</option>
  ));

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

        <label htmlFor="performanceCategory" />
        <select
          name="performanceCategory"
          id="performanceCategory"
          onChange={(event) => handleChangeCategory(event.target.value)}
        >
          {categoryOptions}
        </select>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default CreateAttemptPage;
