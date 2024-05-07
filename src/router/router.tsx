import { createBrowserRouter } from "react-router-dom";
import Lauout from "../pages/Lauout";
import ErrorPage from "../pages/ErrorPage";
import Home from "../pages/Home";
import Recipes from "../pages/Recipes";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <Lauout />, // используется главный шаблон (Lauout.tsx), где header, monitor, <Outlet> и к примеру, footer
        errorElement: <ErrorPage />,
        children: [
            {
                index: true,
                element: <Home />
            },
            {
                path: "/recipes",
                element: <Recipes />,
              },
        ],
    },
    
])