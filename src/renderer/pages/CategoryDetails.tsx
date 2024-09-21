import React from 'react';
import { useLoaderData, Link } from 'react-router-dom';
import { Category as CategoryType } from '../../model';
import Question from '../components/question';
import { loadData } from '../../main/save_manager';
import CreateQuestionPage from './CreateQuestion';

const CategoryDetailsPage: React.FC<{}> = () => {
  const data: CategoryType = useLoaderData();
  console.log('data: ', data);

  const questionsDisplay = data.questions.map((question) => (
    <Question question={question} />
  ));

  return (
    <div>
      <h1>CATEGORY DETAILS</h1>
      <h2>{data.title}</h2>
      {questionsDisplay}
      <button type="button">
        <Link to="/index.html">BACK</Link>
      </button>

      <CreateQuestionPage />
    </div>
  );
};

export async function loader({ request, params }) {
  const { id } = params;
  console.log('-----------------');
  try {
    const categories: CategoryType[] =
      await window.electron.ipcRenderer.loadSave();
    // load just one category
    console.log('categories: ', categories);
    const targetCategory = categories.filter(
      (category) => category.id === Number(id),
    )[0];
    // TODO: make check to see if targetCategory isn't null
    console.log('target cate: ', targetCategory);
    return targetCategory || null;
  } catch (error) {
    console.log('GOT error in details loader: ', error);
    return null;
  }
}

export default CategoryDetailsPage;
