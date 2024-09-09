import React from 'react';
import { ipcRenderer } from 'electron';
import Category from '../components/category';
import { Category as CategoryType } from '../../model';
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
  const displayCategories = TEST_DATA.map((category) => (
    <Category category={category} />
  ));

  const handleSaveData = () => {
    console.log('sent save message');
    window.electron.ipcRenderer.sendMessage('save', TEST_DATA);
  };

  const handleLoadSaveData = async () => {
    console.log('sent load save');
    // window.electron.ipcRenderer.sendMessage('load-save');
    // const result = await ipcRenderer.invoke('load-save');
    // console.log(result);
    // return result;
  };

  return (
    <div>
      <button type="button" onClick={handleSaveData}>
        Save Data
      </button>
      <button type="button" onClick={handleLoadSaveData}>
        Load Data
      </button>

      {displayCategories}
    </div>
  );
};

export default CategoryQuestionPage;
