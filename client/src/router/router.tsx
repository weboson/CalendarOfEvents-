import { createBrowserRouter } from 'react-router-dom';
import Layout from '../pages/Layout';
import Home from '../pages/Home';
import ErrorPage from '../pages/ErrorPage';
import Recipes from '../pages/Recipes';
import Mealschedules from '../components/Mealschedules/Mealschedules';
import Auth from '../pages/Auth';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />, // используется главный шаблон (Lauout.tsx), где header, monitor, <Outlet> и к примеру, footer
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: '/recipes',
        element: <Recipes />,
      },
      {
        path: '/mealschedules',
        element: <Mealschedules />
      },
      {
        path: '/auth',
        element: <Auth />
      },
    ],
  },
]);
