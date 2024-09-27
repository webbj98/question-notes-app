import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Category as CategoryType,
  Question as QuestionType,
} from '../../model';
import Question from './question';
import CreateQuestion from '../pages/CreateQuestion';
import './category.css';

const Category: React.FC<{
  category: CategoryType;
  setCategory: React.Dispatch<React.SetStateAction<CategoryType[]>>;
}> = ({ category, setCategory }) => {
  // TODO
  // const questionsDisplay = category.questions.map((question) => (
  //   <li key={question.id}>
  //     <Question question={question} />
  //   </li>
  // ));
  const [loading, setLoading] = useState(false);
  const [categoryQuestions, setCategoryQuestions] = useState<QuestionType[]>(
    [],
  );
  useEffect(() => {
    async function getCategoryQuestions() {
      const currCategoryQuestions: QuestionType[] =
        await window.electron.ipcRenderer.getQuestionsByCategoryId(category.id);
      setCategoryQuestions(currCategoryQuestions);
    }
    setLoading(true);
    getCategoryQuestions();
    setLoading(false);
  }, [category.id]);

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

  const questionsDisplay = categoryQuestions.map((question: QuestionType) => {
    return (
      <div>
        <Link to={`/questions/${question.id}`}>{question.title}</Link>
      </div>
    );
  });

  return (
    <div>
      <h3>
        <Link to={`/categories/${category.id}`} className="categoryTitle">
          {' '}
          {category.title}
        </Link>
      </h3>

      {/* TODO: make loading symbol */}
      <ul>{questionsDisplay}</ul>

      {/* <CreateQuestion
        numQuestions={category.questions.length}
        addQuestion={handleAddQuestion}
      /> */}
    </div>
  );
};

export default Category;
