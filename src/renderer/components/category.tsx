import React from 'react';
import { Link } from 'react-router-dom';
import {
  Category as CategoryType,
  Question as QuestionType,
} from '../../model';
import Question from './question';
import CreateQuestion from '../pages/CreateQuestion';

const Category: React.FC<{
  category: CategoryType;
  setCategory: React.Dispatch<React.SetStateAction<CategoryType[]>>;
}> = ({ category, setCategory }) => {
  // TODO
  const questionsDisplay = category.questions.map((question) => (
    <li key={question.id}>
      <Question question={question} />
    </li>
  ));

  const handleAddQuestion = (question: QuestionType) => {
    setCategory((curCategories) => {
      const foundCategory: CategoryType = curCategories.find(
        (curCategory) => curCategory.id === category.id,
      )!;
      const newCategory = { ...foundCategory };
      const newQuestions = [...newCategory.questions, question];
      newCategory.questions = newQuestions;
      let categoryIdx;
      for (let i = 0; i < curCategories.length; i++) {
        if (category.id === curCategories[i].id) {
          categoryIdx = i;
        }
      }

      const newCategories = [...curCategories];
      newCategories[categoryIdx!] = newCategory;
      return newCategories;
    });
  };

  return (
    <div>
      <h3>{category.title}</h3>
      <ul>{questionsDisplay}</ul>
      <Link to={`/categories/${category.id}`}> Text</Link>

      <CreateQuestion
        numQuestions={category.questions.length}
        addQuestion={handleAddQuestion}
      />
    </div>
  );
};

export default Category;
