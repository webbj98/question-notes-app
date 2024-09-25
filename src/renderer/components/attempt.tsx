import React from 'react';
import { Attempt as AttemptType } from '../../model';

const Attempt: React.FC<{ attempt: AttemptType }> = ({ attempt }) => {
  return (
    <div>
      <p>Date: {attempt.date.toLocaleString()}</p>
      <p>Category {attempt.performanceCategoryId}</p>
      <p>Time Taken: {attempt.timeTaken}</p>
    </div>
  );
};

export default Attempt;
