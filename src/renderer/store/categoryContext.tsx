import { createContext, useEffect, useState } from 'react';
import { Category as CategoryType } from '../../model';

export const CategoryContext = createContext({
  catagoryIdMap: {},
  onGetCategoryTitleById: () => {},
});

export default function CategoryContextProvider({ children }) {
  const [categoryIdMap, setCategoryIdMap] = useState<Map<number, string>>(
    new Map<number, string>(),
  );

  useEffect(() => {
    async function getCategories() {
      try {
        const categories: CategoryType[] =
          await window.electron.ipcRenderer.fetchCategories();
        const tempCategoryMap = new Map<number, string>();
        categories.map((category) =>
          tempCategoryMap.set(category.id, category.title),
        );
        // for (const category of categories.entries()) {
        //   tempCategoryMap.set(category.id, category.title);
        // };
        setCategoryIdMap(tempCategoryMap);
      } catch (error) {
        console.log('error: ', error);
        // return error;
      }
    }
    getCategories();
  }, []);

  const handleGetCategoryTitleById = (id: number): string | undefined => {
    return categoryIdMap.get(id);
  };

  // MAYBE WRAP this
  const ctxVals = {
    onGetCategoryTitleById: handleGetCategoryTitleById,
  };

  return (
    <CategoryContext.Provider value={ctxVals}>
      {children}
    </CategoryContext.Provider>
  )
}
