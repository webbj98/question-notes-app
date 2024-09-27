import {
  MemoryRouter as Router,
  Routes,
  Route,
  createBrowserRouter,
  RouterProvider,
  createRoutesFromElements,
  BrowserRouter,
} from 'react-router-dom';
import icon from '../../assets/icon.svg';
import './App.css';
import CategoryQuestionPage from './pages/Categories';
import CategoryDetailsPage, {
  loader as categoryDetailsLoader,
} from './pages/CategoryDetails';
import RootLayoutPage from './pages/RootLayout';
import NotFoundPage from './pages/NotFound';
import QuestionDetailsPage, {
  loader as questionDetailsLoader,
} from './pages/QuestionDetails';
import CategoryContextProvider from './store/categoryContext';

function Hello() {
  return (
    <div>
      <CategoryQuestionPage />
    </div>
  );
}

export default function App() {
  const router = createBrowserRouter([
    {
      path: '/index.html',
      element: <CategoryQuestionPage />,
    },
    {
      path: 'categories',
      element: <CategoryQuestionPage />,
    },
    {
      path: '/categories/:id',
      element: <CategoryDetailsPage />,
      loader: categoryDetailsLoader,
    },
    {
      path: '/questions/:id',
      element: <QuestionDetailsPage />,
      loader: questionDetailsLoader,
    },
  ]);

  // return <RouterProvider router={router} />;
  // const router = createBrowserRouter(
  //   createRoutesFromElements(
  //     <>
  //       <Route path="/index.html" element={<RootLayoutPage />}>
  //         <Route index element={<CategoryQuestionPage />} />
  //         <Route path="categories" element={<CategoryQuestionPage />} />
  //         <Route
  //           path="categories/:id"
  //           element={<CategoryDetailsPage />}
  //           loader={categoryDetailsLoader}
  //         />
  //         <Route path='*' element={<NotFoundPage />} />
  //       </Route>
  //       ,
  //     </>,
  //   ),
  // );

  // return (
  //   <BrowserRouter>
  //     <Routes>
  //       <Route path="/index.html" element={<RootLayoutPage />}>
  //         <Route index element={<CategoryQuestionPage />} />
  //         <Route path="categories" element={<CategoryQuestionPage />} />
  //         <Route
  //           path="categories/:id"
  //           element={<CategoryDetailsPage />}
  //           loader={categoryDetailsLoader}
  //         />
  //         <Route path='*' element={<NotFoundPage />} />
  //       </Route>
  //       <Route
  //           path="/categories/:id"
  //           element={<CategoryDetailsPage />}
  //           loader={categoryDetailsLoader}
  //         />
  //     </Routes>
  //   </BrowserRouter>
  // );
  return (
    <CategoryContextProvider>
      <RouterProvider router={router} />
    </CategoryContextProvider>
  );
  // return (
  //   <Router>
  //     <Routes>
  //       <Route path="/" element={<CategoryQuestionPage />} />
  //       <Route path="categories" element={<CategoryQuestionPage />} />
  //       <Route
  //         path="categories/:id"
  //         element={<CategoryDetailsPage />}
  //         loader={categoryDetailsLoader}
  //       />
  //     </Routes>
  //   </Router>
  // );
}
