import React from 'react';
import { useLoaderData, Link } from 'react-router-dom';
import {
  Category as CategoryType,
  Question as QuestionType,
} from '../../model';
import Question from '../components/question';
import { loadData } from '../../main/save_manager';
import CreateQuestionPage from './CreateQuestion';

interface LoaderData {
  category: CategoryType;
  categoryQuestions: QuestionType[];
}

const CategoryDetailsPage: React.FC<{}> = () => {
  const { category, categoryQuestions }: LoaderData = useLoaderData();
  console.log('data: ', category);

  const questionsDisplay = categoryQuestions.map((question) => (
    <Question question={question} />
  ));

  return (
    <div>
      <h1>CATEGORY DETAILS</h1>
      <h2>{category.title}</h2>
      {questionsDisplay}
      <button type="button">
        <Link to="/index.html">BACK</Link>
      </button>

      <CreateQuestionPage categoryId={category.id} />
    </div>
  );
};

export async function loader({ request, params }) {
  const { id } = params;
  console.log('-----------------');
  try {
    const categories: CategoryType[] =
      await window.electron.ipcRenderer.fetchCategories();

    // when load category and question, do it in one query
    // const questions: QuestionType[] =
    //   await window.electron.ipcRenderer.getQuestionsByCategoryId(id);
    console.log('categories: ', categories);
    const targetCategory = categories.filter(
      (category) => category.id === Number(id),
    )[0];

    const categoryQuestions: QuestionType[] =
      await window.electron.ipcRenderer.getQuestionsByCategoryId(id);
    // TODO: make check to see if targetCategory isn't null
    console.log('target cate: ', targetCategory);
    return {
      category: targetCategory || null,
      categoryQuestions: categoryQuestions || null,
    };
  } catch (error) {
    console.log('GOT error in details loader: ', error);
    return null;
  }
}

export default CategoryDetailsPage;
