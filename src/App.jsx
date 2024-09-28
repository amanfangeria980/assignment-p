import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import MainLayout from "./layout/MainLayout";
import HomePage from "./pages/HomePage";
import SearchPage from "./pages/SearchPage";

const router = createBrowserRouter([
    {
        path: "/",
        element: <MainLayout />,
        children: [
            {
                path: "",
                element: <HomePage />,
            },
            {
                path: "/search",
                element: <SearchPage />,
            },
        ],
    },
]);
const App = () => {
    return (
        <RouterProvider router={router}>
            <div></div>
        </RouterProvider>
    );
};

export default App;
