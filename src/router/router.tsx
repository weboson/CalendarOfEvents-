import { createBrowserRouter } from "react-router-dom";
import Lauout from "../pages/Lauout";
import ErrorPage from "../pages/ErrorPage";
import Home from "../pages/Home";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <Lauout />,
        errorElement: <ErrorPage />,
        children: [
            {
                index: true,
                element: <Home />
            }
        ]
    },
])