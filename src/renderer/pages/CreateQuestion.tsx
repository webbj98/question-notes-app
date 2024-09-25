import React, { useState } from 'react';
import { Question } from '../../model';

const CreateQuestionPage: React.FC<{
  categoryId: number;
}> = ({ categoryId }) => {
  const [title, setTitle] = useState('');
  const [time, setTime] = useState(0);

  const handleChangeTitle = (value: string) => {
    setTitle(value);
  };

  const handleChangeTime = (value: string) => {
    setTime(Number(value));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log('title: ', title);
    const newQuestion = await window.electron.ipcRenderer.createQuestion(
      title,
      time,
      categoryId,
    );
    console.log('new Quest: ', newQuestion);
    // const question: Question = {
    //   id: numQuestions + 1,
    //   title,
    //   attempts: [],
    //   time,
    // };
    // addQuestion(question);
    // addQuestion()
  };
  return (
    <form onSubmit={(event) => handleSubmit(event)}>
      <label htmlFor="title">Title</label>
      <input
        id="title"
        value={title}
        onChange={(event) => handleChangeTitle(event.target.value)}
      />

      <label htmlFor="time">Time</label>
      <input
        id="time"
        type="number"
        value={time}
        onChange={(event) => handleChangeTime(event.target.value)}
      />

      <button type="submit">Submit</button>
    </form>
  );
};

export default CreateQuestionPage;
