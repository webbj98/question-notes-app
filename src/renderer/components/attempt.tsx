import React, { useContext } from 'react';
import { Attempt as AttemptType } from '../../model';
import './attempt.css';
import { CategoryContext } from '../store/categoryContext';

const Attempt: React.FC<{ attempt: AttemptType }> = ({ attempt }) => {
  const categoryContext = useContext(CategoryContext);
  return (
    <div>
      <div className="attemptCard">
        <div>
          <b>Date:</b> {attempt.date.toLocaleString()}{' '}
        </div>
        <div>
          <b>Category:</b>{' '}
          {categoryContext.onGetCategoryTitleById(
            attempt.performanceCategoryId,
          )}
        </div>
        <div>
          {' '}
          <b>Time Taken:</b> {attempt.timeTaken}
        </div>
      </div>
    </div>
  );
};

export default Attempt;
