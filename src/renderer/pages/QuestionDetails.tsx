import React, { useState } from 'react';
import { useLoaderData } from 'react-router-dom';
import {
  Attempt as AttemptType,
  Question as QuestionType,
  Category as CategoryType,
} from '../../model';
import Attempt from '../components/attempt';

interface LoaderData {
  question: QuestionType;
  questionAttempts: AttemptType[];
  currentCategory: CategoryType;
}

const QuestionDetailsPage: React.FC = () => {
  const { question, currentCategory, questionAttempts }: LoaderData =
    useLoaderData();

    console.log('ques attempts:  ', questionAttempts)

  const attemptHistoryDisplay = questionAttempts.map((attempt) => (
    <Attempt attempt={attempt} />
  ));
  return (
    <div>
      <h1>{question.title}</h1>
      <h3>Time: {question.time} </h3>
      <h3>Category: {currentCategory.title}</h3>
      {attemptHistoryDisplay}
    </div>
  );
};

export default QuestionDetailsPage;

export async function loader({ request, params }) {
  const { id } = params;

  try {
    console.log('');
    const question: QuestionType =
      await window.electron.ipcRenderer.getQuestionsById(id);

    // TODO: Replace with getCategoryById
    const categories: CategoryType[] =
      await window.electron.ipcRenderer.fetchCategories();

    // console.log('categories: ', categories);
    const targetCategory = categories.filter(
      (category) => category.id === question.categoryId,
    )[0];
    console.log('target category: ', targetCategory)

    const attempts: AttemptType[] =
      await window.electron.ipcRenderer.getAttemptsByQuestionId(id);

    console.log('attempts:, ', attempts);
    return {
      question,
      currentCategory: targetCategory,
      questionAttempts: attempts,
    };
  } catch (error) {
    console.log('error: ', error);
    return error;
  }
}
