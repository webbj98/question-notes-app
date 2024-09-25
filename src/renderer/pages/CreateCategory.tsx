import React, { useState } from 'react';
import { Category } from '../../model';

const CreateCategoryPage: React.FC<{
  numCategories: number;
  setCategories: React.Dispatch<React.SetStateAction<Category[]>>;
}> = ({ numCategories, setCategories }) => {
  const [title, setTitle] = useState('');

  const handleChangeTitle = (newTitle: string) => {
    setTitle(newTitle);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const result = window.electron.ipcRenderer.createCategory(title);
    console.log('created category: ', result);
    setCategories((curCategories) => {
      const newCategory: Category = {
        id: numCategories + 1,
        title,
        questions: [],
      };
      return [...curCategories, newCategory];
    });
  };

  return (
    <form onSubmit={(event) => handleSubmit(event)}>
      <h2>Create Category</h2>

      <label htmlFor="title">Title</label>
      <input
        id="title"
        value={title}
        onChange={(event) => handleChangeTitle(event.target.value)}
      />
      <button type="submit">Submit</button>
    </form>
  );
};

export default CreateCategoryPage;
