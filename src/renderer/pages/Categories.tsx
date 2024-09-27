import React, { useEffect, useState } from 'react';
import Category from '../components/category';
import { Category as CategoryType, Question } from '../../model';
import CreateCategoryPage from './CreateCategory';
// import { ipcRenderer } from 'electron';

// const CATEGORIES = [
//   "Didn't know how to do",
//   "Didn't know optimal",
//   'Knew what to do but ran out of time / non-optimized',
//   'Could solve but ran out of time',
//   'Finished but a little slow',
//   'Finished but do again to solidify',
//   'Finshed comfortably first try',
// ];

const TEST_DATA: CategoryType[] = [
  {
    id: 1,
    title: "Didn't know how to do",
    questions: [
      {
        id: 1,
        title: 'Some question',
        attempts: [],
        time: 30,
      },
      {
        id: 2,
        title: 'Some question 2',
        attempts: [],
        time: 30,
      },
    ],
  },
  {
    id: 2,
    title: "Didn't know optimal",
    questions: [
      {
        id: 3,
        title: 'Knew what to do but ran out of time / non-optimized',
        attempts: [],
        time: 30,
      },
    ],
  },
];
const CategoryQuestionPage: React.FC = () => {
  const [categoryData, setCategoryData] = useState<CategoryType[]>([]);
  useEffect(() => {
    async function loadSaveData() {
      try {
        console.log('do load from CATEGORIES');
        // const result = await window.electron.ipcRenderer.loadSave();
        const result2 = await window.electron.ipcRenderer.fetchCategories();
        console.log('result2: ', result2);
        // console.log("RESULT FROM load: ", result);
        setCategoryData(result2);
      } catch (error) {
        console.log('got an error');
      }
    }
    loadSaveData();
  }, []);

  const handleSaveData = () => {
    console.log('sent save message');
    window.electron.ipcRenderer.sendMessage('save', categoryData);
  };

  const handleLoadSaveData = async () => {
    // console.log('sent load save');
    // // window.electron.ipcRenderer.sendMessage('load-save');
    // const result = await window.electron.ipcRenderer.loadSave();
    // console.log("result: ", result);
    // setCategoryData(result);
    // return result;
  };

  const displayCategories = categoryData.map((category) => (
    <Category category={category} setCategory={setCategoryData} />
  ));

  return (
    <div>
      <h1>Buttons</h1>
      <button type="button" onClick={handleSaveData}>
        Save Data
      </button>
      <button type="button" onClick={handleLoadSaveData}>
        Load Data
      </button>

      <CreateCategoryPage
        numCategories={categoryData.length}
        setCategories={setCategoryData}
      />

      {displayCategories}
    </div>
  );
};

export default CategoryQuestionPage;

// export async function loader({}) {
//   try {
//     const categories = await window.electron.ipcRenderer.fetchCategories();
//     const questions = await window.electron.ipcRenderer.getQuestionsByCategoryId()
//   } catch (error) {

//   }

// }
