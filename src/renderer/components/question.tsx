import React from 'react';
import { Question as QuestionType } from '../../model';

const Question: React.FC<{ question: QuestionType }> = ({ question }) => {
  return (
    <div>
      <h2>{question.title}</h2>
      <p>Time: {question.time}</p>
    </div>
  );
};

export default Question;
