import React from 'react';
import { Category as CategoryType } from '../../model';
import Question from './question';

const Category: React.FC<{ category: CategoryType }> = ({ category }) => {
  // TODO
  const questionsDisplay = category.questions.map((question) => (
    <li key={question.id}>
      <Question question={question} />
    </li>
  ));
  return (
    <div>
      <h1>{category.title}</h1>
      <ul>{questionsDisplay}</ul>
    </div>
  );
};

export default Category;
