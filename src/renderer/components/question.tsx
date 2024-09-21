import React from 'react';
import { Question as QuestionType } from '../../model';
import Attempt from './attempt';

const Question: React.FC<{ question: QuestionType }> = ({ question }) => {


  const attemptHistoryDisplay = question.attempts.map((attempt) => <Attempt attempt={attempt} />)
  return (
    <div>
      <h4>{question.title}</h4>
      <p>Time: {question.time}</p>
      <h5>Attempt History</h5>
      {attemptHistoryDisplay}
    </div>
  );
};

export default Question;
